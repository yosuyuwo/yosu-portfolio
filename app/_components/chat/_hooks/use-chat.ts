"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { CHAT_CONTEXT_MESSAGES, type ChatMessage } from "@/app/_lib/chat-schema"

export type DisplayMessage = ChatMessage & { id: string }
export type ChatStatus = "idle" | "streaming" | "error"

const FALLBACK_ERROR = "Something went wrong. Please try again."
const EMPTY_REPLY_ERROR = "No answer came back. Please try again."

class ChatRequestError extends Error {}

function toRequestMessages(history: DisplayMessage[]): ChatMessage[] {
  const recent = history
    .filter((message) => message.content)
    .slice(-CHAT_CONTEXT_MESSAGES)
  const firstUser = recent.findIndex((message) => message.role === "user")
  return recent
    .slice(Math.max(firstUser, 0))
    .map(({ role, content }) => ({ role, content }))
}

async function readErrorMessage(response: Response): Promise<string> {
  const body: unknown = await response.json().catch(() => null)
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error
  }
  return FALLBACK_ERROR
}

export function useChat() {
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  const run = useCallback(async (history: DisplayMessage[]) => {
    const assistantId = crypto.randomUUID()
    const controller = new AbortController()
    abortRef.current = controller

    setError(null)
    setStatus("streaming")
    setMessages([
      ...history,
      { id: assistantId, role: "assistant", content: "" },
    ])

    const dropEmptyReply = () =>
      setMessages((current) =>
        current.filter(
          (message) => message.id !== assistantId || message.content
        )
      )

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toRequestMessages(history) }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) {
        throw new ChatRequestError(await readErrorMessage(response))
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let received = false
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (!chunk) continue
        received = true
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: message.content + chunk }
              : message
          )
        )
      }

      if (!received) {
        dropEmptyReply()
        setError(EMPTY_REPLY_ERROR)
        setStatus("error")
        return
      }
      setStatus("idle")
    } catch (caught) {
      dropEmptyReply()
      if (controller.signal.aborted) {
        setStatus("idle")
        return
      }
      setError(
        caught instanceof ChatRequestError ? caught.message : FALLBACK_ERROR
      )
      setStatus("error")
    }
  }, [])

  const send = useCallback(
    (text: string) => {
      const content = text.trim()
      if (!content || status === "streaming") return
      void run([
        ...messages,
        { id: crypto.randomUUID(), role: "user", content },
      ])
    },
    [messages, run, status]
  )

  const retry = useCallback(() => {
    if (status === "streaming" || messages.at(-1)?.role !== "user") return
    void run(messages)
  }, [messages, run, status])

  const stop = useCallback(() => abortRef.current?.abort(), [])

  return { messages, status, error, send, retry, stop }
}
