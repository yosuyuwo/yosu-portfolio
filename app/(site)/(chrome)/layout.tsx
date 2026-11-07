import type { ReactNode } from "react"

import { ChatSheet } from "@/app/_components/chat/mobile-sheet"
import { ContactFooter } from "@/app/_components/contact-footer"
import { IntroOverlay } from "@/app/_components/intro-overlay"
import { Sidebar } from "@/app/_components/sidebar"
import { TopBar } from "@/app/_components/top-bar"
import { ChatPanelProvider } from "@/app/_hooks/use-chat-panel"
import { ContactDialogProvider } from "@/app/_hooks/use-contact-dialog"
import { RAIL_GRID } from "@/app/_lib/page-grid"
import { toWorkLink } from "@/app/_lib/work-link"
import { WORK_ITEMS } from "@/app/_lib/works"

const WORK_LINKS = WORK_ITEMS.map(toWorkLink)

export default function ChromeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ContactDialogProvider>
      <ChatPanelProvider>
        <IntroOverlay />
        <div data-site-root>
          <div className={RAIL_GRID}>
            <Sidebar works={WORK_LINKS} />
            <div>
              <TopBar />
              {children}
            </div>
          </div>
          <ContactFooter />
        </div>
        <ChatSheet />
      </ChatPanelProvider>
    </ContactDialogProvider>
  )
}
