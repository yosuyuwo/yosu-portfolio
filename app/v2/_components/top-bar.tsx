"use client"

import { LogoMark } from "@/app/_components/brand/_components/logo-mark"
import { useContactDialog } from "@/app/_components/shell/_hooks/use-contact-dialog"
import { Button } from "@/components/ui/button"
import { RESUME_FILE, SITE_NAME } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { V2_HERO } from "../_lib/copy"

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
] as const

const LINK_CLASS =
  "transition-colors duration-fast hover:text-(--v2-accent) focus-visible:text-(--v2-accent) focus-visible:outline-none"

export function TopBar() {
  const { setOpen } = useContactDialog()

  return (
    <header className="sticky top-0 z-40 border-b border-(--v2-line) bg-(--v2-paper)/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between gap-6 px-4 font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase md:px-8">
        <a
          href="#top"
          className={cn("group flex items-center gap-2.5", LINK_CLASS)}
        >
          <LogoMark className="h-4 text-current" />
          {SITE_NAME}
        </a>

        <nav aria-label="Main" className="flex items-center gap-5 md:gap-8">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={LINK_CLASS}>
              {item.label}
            </a>
          ))}
          <a
            href={RESUME_FILE.href}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            CV ↗
          </a>
          <Button
            type="button"
            size="sm"
            onClick={() => setOpen(true)}
            className="hidden h-8 gap-2 rounded-full px-3.5 font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase sm:inline-flex"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--v2-accent) opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-(--v2-accent)" />
            </span>
            {V2_HERO.availability}
          </Button>
        </nav>
      </div>
    </header>
  )
}
