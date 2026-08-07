"use client"

import { useEffect, useState, type ReactNode } from "react"

import { Sidebar } from "@/app/_components/sidebar"
import { useActiveSection } from "@/app/_hooks/use-active-section"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { useEndReveal } from "../_hooks/use-end-reveal"
import { SECTIONS } from "../_lib/constants"
import { EndRevealFooter } from "./end-reveal-footer"
import { Main } from "./main"
import { MainContent } from "./main-content"
import { MobileTopBar } from "./mobile-top-bar"

export function ShellLayout({ children }: { children: ReactNode }) {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null)
  const activeSection = useActiveSection(SECTIONS, scrollEl)
  const reveal = useEndReveal(scrollEl)
  const { openMobile, setOpenMobile } = useSidebar()

  useEffect(() => {
    if (reveal > 0 && openMobile) setOpenMobile(false)
  }, [reveal, openMobile, setOpenMobile])

  const revealTransform =
    reveal > 0 ? `translate3d(0, ${-reveal}px, 0)` : undefined

  return (
    <>
      <Sidebar activeSection={activeSection} />

      <div
        className={cn(
          "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden md:pointer-events-auto md:bg-sidebar",
          reveal > 0
            ? "pointer-events-auto bg-sidebar"
            : "pointer-events-none bg-transparent",
        )}
      >
        <MobileTopBar revealTransform={revealTransform} />

        <Main openMobile={openMobile} onClose={() => setOpenMobile(false)}>
          <EndRevealFooter reveal={reveal} />
          <MainContent
            scrollRef={setScrollEl}
            style={{ transform: revealTransform }}
          >
            {children}
          </MainContent>
        </Main>
      </div>
    </>
  )
}
