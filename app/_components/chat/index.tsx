"use client"

import { X } from "lucide-react"
import type { KeyboardEvent, RefObject } from "react"

import { Composer } from "@/app/_components/chat/_components/composer"
import { MessageList } from "@/app/_components/chat/_components/message-list"
import { Suggestions } from "@/app/_components/chat/_components/suggestions"
import { CHAT_COPY } from "@/app/_components/chat/_lib/copy"
import { SectionLabel } from "@/app/_components/section-label"
import { useChatSession } from "@/app/_hooks/use-chat-panel"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatPanelProps {
  onClose?: () => void
  inputRef?: RefObject<HTMLTextAreaElement | null>
}

export function ChatPanel({ onClose, inputRef }: ChatPanelProps) {
  const { messages, status, error, send, retry, stop } = useChatSession()
  const isStreaming = status === "streaming"

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && onClose) onClose()
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex min-h-0 flex-1 flex-col bg-background"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border pr-4 pl-6">
        <SectionLabel index="AI" label={CHAT_COPY.label} />
        {onClose && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={CHAT_COPY.close}
                  onClick={onClose}
                />
              }
            >
              <X />
            </TooltipTrigger>
            <TooltipContent>{CHAT_COPY.close}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        error={error}
        onRetry={retry}
      />
      {messages.length === 0 && <Suggestions onSuggest={send} />}
      <Composer
        isStreaming={isStreaming}
        onSend={send}
        onStop={stop}
        inputRef={inputRef}
      />
    </div>
  )
}
