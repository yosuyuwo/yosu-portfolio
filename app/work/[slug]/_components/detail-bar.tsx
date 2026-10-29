import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

import { LogoMark } from "@/app/_components/logo-mark"
import { SITE_NAME } from "@/lib/site-content"

const LINK_CLASS =
  "transition-colors duration-fast hover:text-brand focus-visible:text-brand focus-visible:outline-none"

export function DetailBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6 font-mono text-[11px] tracking-[0.12em] uppercase md:px-10">
        <Link href="/" className={`flex items-center gap-2.5 ${LINK_CLASS}`}>
          <LogoMark className="h-4 text-current" />
          {SITE_NAME}
        </Link>
        <Link
          href="/#work"
          className={`group flex items-center gap-1.5 ${LINK_CLASS}`}
        >
          <ArrowLeftIcon
            aria-hidden
            className="size-3.5 transition-transform duration-normal ease-out-expo group-hover:-translate-x-0.5"
          />
          All work
        </Link>
      </div>
    </header>
  )
}
