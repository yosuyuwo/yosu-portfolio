import { chatRequestSchema, type ChatMessage } from "@/app/_lib/chat-schema"

import { isCovered } from "./_lib/coverage"
import { createInquiryTool, readInquiryEnv } from "./_lib/inquiry"
import { buildKnowledge } from "./_lib/knowledge"
import { offTopicReply, isOffTopicRequest } from "./_lib/off-topic"
import { UpstreamError, readChatEnv, streamReply } from "./_lib/openrouter"
import { acquireChatSlot, clientKey } from "./_lib/rate-limit"
import { readReport, reportReply } from "./_lib/reports"
import { getReportsStore } from "./_lib/reports-store"
import { buildSystemPrompt } from "./_lib/system-prompt"
import { uncoveredReply } from "./_lib/unanswered"
import { getUnansweredStore } from "./_lib/unanswered-store"
import { visitorTopicText } from "./_lib/visitor-text"

export const maxDuration = 30

const MAX_BODY_BYTES = 64 * 1024

function errorResponse(
  message: string,
  status: number,
  headers?: Record<string, string>
) {
  return Response.json({ error: message }, { status, headers })
}

function textResponse(body: BodyInit) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

function pathOf(url: string | null): string | null {
  if (!url) return null
  try {
    return new URL(url).pathname
  } catch {
    return null
  }
}

async function isUncovered(
  messages: ChatMessage[],
  visitorText: string,
  learnedAnswers: readonly string[],
  signal: AbortSignal
): Promise<boolean> {
  const facts = buildKnowledge(new Date(), visitorText, learnedAnswers)
  return !(await isCovered(facts, messages, signal))
}

export async function POST(request: Request) {
  if (!readChatEnv()) return errorResponse("Chat is not available.", 503)

  const slot = acquireChatSlot(clientKey(request))
  if (!slot.ok) {
    const seconds = Math.ceil(slot.retryAfterMs / 1000)
    const message =
      seconds > 1
        ? `You're sending messages too fast. Try again in ${seconds}s.`
        : "Slow down a little."
    return errorResponse(message, 429, { "Retry-After": String(seconds) })
  }

  try {
    const length = Number(request.headers.get("content-length") ?? 0)
    if (length > MAX_BODY_BYTES) {
      slot.release()
      return errorResponse("Message is too large.", 413)
    }

    const body = await request.json().catch(() => null)
    const parsed = chatRequestSchema.safeParse(body)
    if (!parsed.success) {
      slot.release()
      return errorResponse("Invalid message.", 400)
    }

    const latestMessage =
      parsed.data.messages.filter((m) => m.role === "user").at(-1)?.content ??
      ""
    if (isOffTopicRequest(latestMessage)) {
      slot.release()
      return textResponse(offTopicReply(latestMessage))
    }

    const reportsStore = getReportsStore()
    const report = reportsStore ? readReport(parsed.data.messages) : null
    if (reportsStore && report) {
      const saved = await reportsStore
        .record({
          message: report.message,
          context: report.kind === "followup" ? report.context : null,
          contact: report.contact,
          page: pathOf(request.headers.get("referer")),
          userAgent: request.headers.get("user-agent"),
        })
        .catch((error: unknown) => {
          console.error("[chat] saving the report failed", error)
          return false
        })
      if (saved) {
        slot.release()
        return textResponse(reportReply(report, latestMessage))
      }
    }

    const inquiryEnv = readInquiryEnv()
    const tool = inquiryEnv
      ? createInquiryTool(inquiryEnv, clientKey(request))
      : undefined

    const visitorText = visitorTopicText(parsed.data.messages)
    const store = getUnansweredStore()
    const learnedAnswers = store
      ? await store.learnedAnswers().catch(() => [])
      : []

    const uncovered = await isUncovered(
      parsed.data.messages,
      visitorText,
      learnedAnswers,
      request.signal
    )
    if (uncovered) {
      slot.release()
      if (store) {
        await store.record(visitorText).catch((error: unknown) => {
          console.error("[chat] saving the unanswered question failed", error)
        })
      }
      return textResponse(uncoveredReply(visitorText))
    }

    const stream = await streamReply({
      system: buildSystemPrompt({
        inquiryEnabled: Boolean(tool),
        visitorText,
        learnedAnswers,
      }),
      messages: parsed.data.messages,
      signal: request.signal,
      onFinish: slot.release,
      tool,
    })

    return textResponse(stream)
  } catch (error) {
    slot.release()
    console.error("[chat] upstream failure", error)
    if (error instanceof UpstreamError && error.status === 429) {
      return errorResponse("The assistant is busy. Try again shortly.", 503)
    }
    return errorResponse("The assistant is unavailable right now.", 502)
  }
}
