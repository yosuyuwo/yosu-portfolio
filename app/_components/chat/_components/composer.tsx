"use client"

import { useState, type KeyboardEvent, type Ref, type SubmitEvent } from "react"
import { ArrowUp, Square } from "lucide-react"

import { CHAT_COPY } from "@/app/_components/chat/_lib/copy"
import { CHAT_MAX_MESSAGE_LENGTH } from "@/app/_lib/chat-schema"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ComposerProps {
  isStreaming: boolean
  onSend: (text: string) => void
  onStop: () => void
  inputRef?: Ref<HTMLTextAreaElement>
}

export function Composer({
  isStreaming,
  onSend,
  onStop,
  inputRef,
}: ComposerProps) {
  const [draft, setDraft] = useState("")
  const actionLabel = isStreaming ? CHAT_COPY.stop : CHAT_COPY.send

  const submit = () => {
    if (!draft.trim() || isStreaming) return
    onSend(draft)
    setDraft("")
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return
    }
    event.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4">
      <div className="relative">
        <Textarea
          ref={inputRef}
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHAT_COPY.placeholder}
          aria-label={CHAT_COPY.inputLabel}
          maxLength={CHAT_MAX_MESSAGE_LENGTH}
          rows={1}
          className="max-h-40 min-h-9 resize-none rounded-[1.1875rem] pr-12 [corner-shape:squircle]"
        />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type={isStreaming ? "button" : "submit"}
                size="icon-sm"
                aria-label={actionLabel}
                disabled={!isStreaming && !draft.trim()}
                onClick={isStreaming ? onStop : undefined}
                className="absolute right-0.75 bottom-0.75"
              />
            }
          >
            {isStreaming ? <Square className="fill-current" /> : <ArrowUp />}
          </TooltipTrigger>
          <TooltipContent>{actionLabel}</TooltipContent>
        </Tooltip>
      </div>
    </form>
  )
}
