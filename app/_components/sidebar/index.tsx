"use client"

import { usePathname } from "next/navigation"
import { useRef } from "react"

import dynamic from "next/dynamic"

import { loadChatPanel } from "@/app/_components/chat/_lib/load-chat-panel"
import { useActiveSection } from "@/app/_hooks/use-active-section"
import { useChatPanel } from "@/app/_hooks/use-chat-panel"
import { workSlugFromPath } from "@/app/_lib/nav"
import type { WorkLink } from "@/app/_lib/work-link"

import { Brand } from "./_components/brand"
import { Meta } from "./_components/meta"
import { NavSerif } from "./_components/nav-serif"
import { useSidebarSwap } from "./_hooks/use-sidebar-swap"

const ChatPanel = dynamic(() => loadChatPanel().then((m) => m.ChatPanel))

export function Sidebar({ works }: { works: readonly WorkLink[] }) {
  const pathname = usePathname()
  const active = useActiveSection(pathname)
  const isHome = pathname === "/"
  const { isOpen, setOpen } = useChatPanel()
  const navRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const { close } = useSidebarSwap({ isOpen, setOpen, navRef, chatRef })

  return (
    <aside className="sticky top-0 hidden h-svh min-w-0 flex-col md:flex">
      <div
        ref={navRef}
        inert={isOpen}
        className="flex min-h-0 flex-1 flex-col px-7 py-7"
      >
        <Brand isHome={isHome} />
        <nav aria-label="Main" className="mt-20">
          <NavSerif
            active={active}
            isHome={isHome}
            works={works}
            currentSlug={workSlugFromPath(pathname)}
          />
        </nav>
        <Meta />
      </div>
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute inset-0 z-10 flex flex-col border-r border-border bg-background"
        >
          <ChatPanel onClose={close} />
        </div>
      )}
    </aside>
  )
}
