"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

import { useChat } from "@/app/_components/chat/_hooks/use-chat"

type ChatPanelState = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

type ChatSession = ReturnType<typeof useChat>

const ChatPanelContext = createContext<ChatPanelState | null>(null)
const ChatSessionContext = createContext<ChatSession | null>(null)

// The session lives in the root layout so a reply keeps streaming while routes change.
// Open state is a separate context so streaming chunks don't re-render the sidebar.
export function ChatPanelProvider({ children }: { children: ReactNode }) {
  const session = useChat()
  const [isOpen, setOpen] = useState(false)

  return (
    <ChatSessionContext.Provider value={session}>
      <ChatPanelContext.Provider value={{ isOpen, setOpen }}>
        <div
          data-chat={isOpen ? "open" : "closed"}
          className="[--rail:13rem] data-[chat=open]:[--rail:22rem]"
        >
          {children}
        </div>
      </ChatPanelContext.Provider>
    </ChatSessionContext.Provider>
  )
}

export function useChatPanel() {
  const ctx = useContext(ChatPanelContext)
  if (!ctx) {
    throw new Error("useChatPanel must be used within ChatPanelProvider")
  }
  return ctx
}

export function useChatSession() {
  const ctx = useContext(ChatSessionContext)
  if (!ctx) {
    throw new Error("useChatSession must be used within ChatPanelProvider")
  }
  return ctx
}
