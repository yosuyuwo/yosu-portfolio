"use client"

import { useEffect, useRef } from "react"

import type { DisplayMessage } from "@/app/_components/chat/_hooks/use-chat"
import { CHAT_COPY } from "@/app/_components/chat/_lib/copy"
import { toPlainText } from "@/app/_components/chat/_lib/plain-text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LABEL_CLASS =
  "font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"

interface MessageListProps {
  messages: DisplayMessage[]
  isStreaming: boolean
  error: string | null
  onRetry: () => void
}

function Bubble({
  message,
  isPending,
}: {
  message: DisplayMessage
  isPending: boolean
}) {
  const isUser = message.role === "user"

  return (
    <li className={cn("grid gap-1.5", isUser && "justify-items-end")}>
      <span className={LABEL_CLASS}>
        {isUser ? "You" : CHAT_COPY.assistantName}
      </span>
      <p
        className={cn(
          "max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "rounded-lg bg-muted px-3 py-2"
            : "border-l-2 border-brand pl-3"
        )}
      >
        {isUser ? message.content : toPlainText(message.content)}
        {isPending && (
          <span className="animate-pulse text-muted-foreground">
            {CHAT_COPY.thinking}…
          </span>
        )}
      </p>
    </li>
  )
}

export function MessageList({
  messages,
  isStreaming,
  error,
  onRetry,
}: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages, error])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5">
      <ol
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="grid gap-5"
      >
        {messages.map((message, index) => (
          <Bubble
            key={message.id}
            message={message}
            isPending={
              isStreaming &&
              index === messages.length - 1 &&
              message.role === "assistant" &&
              !message.content
            }
          />
        ))}
      </ol>
      {error && (
        <div
          role="alert"
          className="mt-5 grid justify-items-start gap-2 text-sm"
        >
          <p className="text-destructive">{error}</p>
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            {CHAT_COPY.retry}
          </Button>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}
