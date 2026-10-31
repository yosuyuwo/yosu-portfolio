import "server-only"

import { z } from "zod"

import type { ChatMessage } from "@/app/_lib/chat-schema"
import { SITE_NAME } from "@/lib/site-content"
import { SITE_URL } from "@/lib/site-url"

import type { ChatTool } from "./inquiry"

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
const MAX_REPLY_TOKENS = 900
const MAX_JSON_TOKENS = 300
const TEMPERATURE = 0.1
const REQUEST_TIMEOUT_MS = 30_000
const DATA_PREFIX = "data: "
const ERROR_DETAIL_LIMIT = 500
const PREPARED_CALL_ID = "call_prepared"

const envSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1),
  OPENROUTER_MODEL: z.string().min(1),
})

const toolCallDeltaSchema = z.object({
  index: z.number().optional(),
  id: z.string().nullish(),
  function: z
    .object({
      name: z.string().nullish(),
      arguments: z.string().nullish(),
    })
    .optional(),
})

const chunkSchema = z.object({
  error: z.unknown().optional(),
  choices: z
    .array(
      z.object({
        delta: z.object({
          content: z.string().nullish(),
          tool_calls: z.array(toolCallDeltaSchema).nullish(),
        }),
      })
    )
    .optional(),
})

const completionSchema = z.object({
  choices: z.array(
    z.object({ message: z.object({ content: z.string().nullish() }) })
  ),
})

type ChatEnv = z.infer<typeof envSchema>
type UpstreamMessage = Record<string, unknown>

interface ToolCall {
  id: string
  name: string
  arguments: string
}

interface RoundResult {
  text: string
  toolCall: ToolCall | null
}

export class UpstreamError extends Error {
  constructor(
    readonly status: number,
    readonly detail: string
  ) {
    super(`OpenRouter responded with ${status}: ${detail}`)
  }
}

export function readChatEnv() {
  const parsed = envSchema.safeParse(process.env)
  return parsed.success ? parsed.data : null
}

function upstreamHeaders(env: ChatEnv): Record<string, string> {
  return {
    Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": SITE_URL,
    "X-Title": `${SITE_NAME} portfolio`,
  }
}

function requestBody(
  env: ChatEnv,
  messages: UpstreamMessage[],
  tool: ChatTool | undefined,
  toolChoice?: "none"
): string {
  return JSON.stringify({
    model: env.OPENROUTER_MODEL,
    stream: true,
    max_tokens: MAX_REPLY_TOKENS,
    temperature: TEMPERATURE,
    messages,
    ...(tool ? { tools: [tool.definition] } : {}),
    ...(tool && toolChoice ? { tool_choice: toolChoice } : {}),
  })
}

async function openRound(
  env: ChatEnv,
  body: string,
  signal: AbortSignal
): Promise<Response> {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    signal,
    headers: upstreamHeaders(env),
    body,
  })
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "")
    throw new UpstreamError(
      response.status,
      detail.slice(0, ERROR_DETAIL_LIMIT)
    )
  }
  return response
}

// One non-streaming call that must answer in JSON, used for narrow extraction tasks.
export async function completeJson(
  messages: UpstreamMessage[],
  signal: AbortSignal
): Promise<string> {
  const env = readChatEnv()
  if (!env)
    throw new Error("OPENROUTER_API_KEY and OPENROUTER_MODEL are required")

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    signal,
    headers: upstreamHeaders(env),
    body: JSON.stringify({
      model: env.OPENROUTER_MODEL,
      stream: false,
      max_tokens: MAX_JSON_TOKENS,
      temperature: 0,
      response_format: { type: "json_object" },
      messages,
    }),
  })
  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new UpstreamError(
      response.status,
      detail.slice(0, ERROR_DETAIL_LIMIT)
    )
  }
  const parsed = completionSchema.safeParse(await response.json())
  return parsed.success ? (parsed.data.choices[0]?.message.content ?? "") : ""
}

interface PartialToolCall {
  id: string
  name: string
  arguments: string
}

async function consumeRound(
  response: Response,
  onText: (text: string) => void
): Promise<RoundResult> {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  const calls = new Map<number, PartialToolCall>()
  let text = ""
  let buffer = ""

  const handleLine = (line: string) => {
    if (!line.startsWith(DATA_PREFIX)) return
    const payload = line.slice(DATA_PREFIX.length).trim()
    if (payload === "[DONE]") return

    const chunk = chunkSchema.safeParse(JSON.parse(payload))
    if (!chunk.success) return
    if (chunk.data.error) {
      const detail = JSON.stringify(chunk.data.error).slice(
        0,
        ERROR_DETAIL_LIMIT
      )
      throw new Error(`OpenRouter stream error: ${detail}`)
    }

    const delta = chunk.data.choices?.[0]?.delta
    if (delta?.content) {
      text += delta.content
      onText(delta.content)
    }
    for (const part of delta?.tool_calls ?? []) {
      const key = part.index ?? 0
      const call = calls.get(key) ?? { id: "", name: "", arguments: "" }
      calls.set(key, {
        id: call.id || part.id || "",
        name: call.name || part.function?.name || "",
        arguments: call.arguments + (part.function?.arguments ?? ""),
      })
    }
  }

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""
    for (const line of lines) handleLine(line.trim())
  }

  const first = [...calls.entries()].sort(([a], [b]) => a - b)[0]?.[1]
  return { text, toolCall: first?.name ? first : null }
}

async function runToolRound(
  env: ChatEnv,
  base: UpstreamMessage[],
  firstRound: RoundResult,
  tool: ChatTool,
  signal: AbortSignal,
  onText: (text: string) => void
) {
  const call = firstRound.toolCall
  if (!call || call.name !== tool.name) return

  const outcome = await tool.execute(call.arguments)
  const followUp: UpstreamMessage[] = [
    ...base,
    {
      role: "assistant",
      content: firstRound.text || null,
      tool_calls: [
        {
          id: call.id,
          type: "function",
          function: { name: call.name, arguments: call.arguments },
        },
      ],
    },
    { role: "tool", tool_call_id: call.id, content: outcome.content },
  ]

  try {
    const response = await openRound(
      env,
      requestBody(env, followUp, tool, "none"),
      signal
    )
    const reply = await consumeRound(response, onText)
    if (!reply.text) onText(outcome.fallbackText)
  } catch (error) {
    console.error("[chat] follow-up after tool call failed", error)
    onText(outcome.fallbackText)
  }
}

async function prepareToolCall(
  tool: ChatTool,
  messages: ChatMessage[],
  signal: AbortSignal
): Promise<string | null> {
  if (!tool.prepare) return null
  try {
    return await tool.prepare(messages, signal)
  } catch (error) {
    console.error("[chat] preparing the tool call failed", error)
    return null
  }
}

async function readFirstRound(
  env: ChatEnv,
  base: UpstreamMessage[],
  tool: ChatTool | undefined,
  first: Response,
  signal: AbortSignal,
  onText: (text: string) => void
): Promise<RoundResult> {
  const round = await consumeRound(first, onText)
  if (round.text || round.toolCall) return round

  // the model sometimes returns a blank completion; one retry is enough
  const retry = await openRound(env, requestBody(env, base, tool), signal)
  return consumeRound(retry, onText)
}

interface StreamReplyOptions {
  system: string
  messages: ChatMessage[]
  signal: AbortSignal
  onFinish: () => void
  tool?: ChatTool
}

export async function streamReply({
  system,
  messages,
  signal,
  onFinish,
  tool,
}: StreamReplyOptions): Promise<ReadableStream<Uint8Array>> {
  const env = readChatEnv()
  if (!env) {
    onFinish()
    throw new Error("OPENROUTER_API_KEY and OPENROUTER_MODEL are required")
  }

  const controller = new AbortController()
  const abort = AbortSignal.any([
    signal,
    controller.signal,
    AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  ])
  const base: UpstreamMessage[] = [
    { role: "system", content: system },
    ...messages,
  ]

  const preparedArguments = tool
    ? await prepareToolCall(tool, messages, abort)
    : null

  let first: Response | null = null
  if (!preparedArguments) {
    try {
      first = await openRound(env, requestBody(env, base, tool), abort)
    } catch (error) {
      onFinish()
      throw error
    }
  }

  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    async start(stream) {
      const write = (text: string) => stream.enqueue(encoder.encode(text))
      try {
        const firstRound: RoundResult =
          preparedArguments && tool
            ? {
                text: "",
                toolCall: {
                  id: PREPARED_CALL_ID,
                  name: tool.name,
                  arguments: preparedArguments,
                },
              }
            : await readFirstRound(env, base, tool, first!, abort, write)
        if (tool) await runToolRound(env, base, firstRound, tool, abort, write)
        stream.close()
      } catch (error) {
        stream.error(error)
      } finally {
        onFinish()
      }
    },
    cancel() {
      controller.abort()
    },
  })
}
