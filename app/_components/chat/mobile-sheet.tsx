"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"

import { CHAT_COPY } from "@/app/_components/chat/_lib/copy"
import { loadChatPanel } from "@/app/_components/chat/_lib/load-chat-panel"
import { useChatPanel } from "@/app/_hooks/use-chat-panel"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const ChatPanel = dynamic(() => loadChatPanel().then((m) => m.ChatPanel))

export function ChatSheet() {
  const { isOpen, setOpen } = useChatPanel()
  const isMobile = useIsMobile()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  return (
    <Sheet open={isOpen && isMobile} onOpenChange={setOpen}>
      <SheetContent
        initialFocus={inputRef}
        className="gap-0 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="sr-only">{CHAT_COPY.title}</SheetTitle>
        <ChatPanel inputRef={inputRef} />
      </SheetContent>
    </Sheet>
  )
}
