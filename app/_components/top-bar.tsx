"use client"

import { LogoMark } from "@/app/_components/logo-mark"
import { NAV_ITEMS } from "@/app/_lib/nav"
import { RESUME_FILE, SITE_NAME } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const LINK_CLASS =
  "transition-colors duration-fast hover:text-brand focus-visible:text-brand focus-visible:outline-none"

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-between gap-6 px-4 font-mono text-[11px] tracking-[0.12em] uppercase">
        <a href="#top" className={cn("flex items-center gap-2.5", LINK_CLASS)}>
          <LogoMark className="h-4 text-current" />
          {SITE_NAME}
        </a>

        <nav aria-label="Main" className="flex items-center gap-5">
          {NAV_ITEMS.filter((item) => item.id !== "contact").map((item) => (
            <a key={item.id} href={`#${item.id}`} className={LINK_CLASS}>
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
        </nav>
      </div>
    </header>
  )
}
