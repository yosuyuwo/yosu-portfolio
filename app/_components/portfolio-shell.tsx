"use client"

import { useEffect, useState, type ReactNode } from "react"

import { AboutSection } from "@/app/_components/about-section"
import { HeroSection } from "@/app/_components/hero-section"
import {
  BrandLockup,
  PortfolioSidebar,
  useActiveSection,
  type SectionId,
} from "@/app/_components/portfolio-sidebar"
import { WibDigitalClock } from "@/app/_components/wib-clock"
import { WorksSection } from "@/app/_components/works-section"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const SECTIONS = ["works", "about"] as const satisfies readonly SectionId[]
const END_REVEAL_PX = 112

function useEndReveal(scrollEl: HTMLElement | null, amount = END_REVEAL_PX) {
  const [reveal, setReveal] = useState(0)

  useEffect(() => {
    if (!scrollEl) return

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const maxScroll = Math.max(0, scrollHeight - clientHeight)
      const start = Math.max(0, maxScroll - amount)
      const next =
        scrollTop <= start ? 0 : Math.min(amount, scrollTop - start)
      setReveal((prev) => (prev === next ? prev : next))
    }

    onScroll()
    scrollEl.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(scrollEl)

    return () => {
      scrollEl.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [scrollEl, amount])

  return reveal
}

function MobileInsetShell({
  children,
  openMobile,
  onClose,
}: {
  children: ReactNode
  openMobile: boolean
  onClose: () => void
}) {
  return (
    <div
      className={cn(
        // p-2 keeps inset shadow inside the overflow clip (esp. left on desktop)
        "pointer-events-auto relative mx-2 mb-2 flex min-h-0 flex-1 flex-col overflow-hidden p-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:m-2",
        openMobile && "max-md:translate-x-(--sidebar-width-mobile)",
      )}
    >
      {openMobile ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="absolute inset-0 z-30 cursor-default md:hidden"
          onClick={onClose}
        />
      ) : null}
      {children}
    </div>
  )
}

function PortfolioShellInner() {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
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
      <PortfolioSidebar activeSection={activeSection} />

      <div
        className={cn(
          "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden md:pointer-events-auto md:bg-sidebar",
          reveal > 0
            ? "pointer-events-auto bg-sidebar"
            : "pointer-events-none bg-transparent",
        )}
      >
        <header
          className="pointer-events-auto relative z-20 flex h-14 shrink-0 items-center gap-2 bg-sidebar px-4 text-sidebar-foreground will-change-transform md:hidden"
          style={{ transform: revealTransform }}
        >
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <BrandLockup className="min-w-0 flex-1" />
          <Button
            type="button"
            size="sm"
            variant="default"
            onClick={() => setContactOpen(true)}
          >
            Contact
          </Button>
        </header>

        <MobileInsetShell
          openMobile={openMobile}
          onClose={() => setOpenMobile(false)}
        >
          <div
            aria-hidden={reveal <= 0}
            className="absolute inset-x-2 bottom-2 z-0 flex h-28 flex-col items-center justify-end gap-1.5 bg-sidebar px-4 pb-3 md:h-20 md:flex-row md:items-end md:justify-between md:gap-4 md:px-3"
          >
            <WibDigitalClock forceAnalog bare className="md:hidden" />
            <WibDigitalClock
              forceDigital
              className="hidden shrink-0 md:flex"
            />
            <p className="text-center text-xs tracking-wide text-sidebar-foreground/55 md:text-right">
              © {new Date().getFullYear()} Yosua Yuwono. All rights reserved.
            </p>
          </div>

          <SidebarInset
            ref={setScrollEl}
            className="z-10 min-h-0 overflow-y-auto overscroll-contain rounded-xl shadow-md will-change-transform md:m-0!"
            style={{ transform: revealTransform }}
          >
            <HeroSection
              contactOpen={contactOpen}
              onContactOpenChange={setContactOpen}
            />
            <WorksSection />
            <AboutSection />

            <div
              aria-hidden
              className="shrink-0"
              style={{ height: END_REVEAL_PX }}
            />
          </SidebarInset>
        </MobileInsetShell>
      </div>
    </>
  )
}

export function PortfolioShell() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <PortfolioShellInner />
      </SidebarProvider>
    </TooltipProvider>
  )
}
