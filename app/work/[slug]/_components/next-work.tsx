"use client"

import { useRef } from "react"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { usePageTransition } from "@/app/_hooks/use-page-transition"
import { CONTENT_COLUMN } from "@/app/_lib/page-grid"
import type { WorkItem } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { WorkHero } from "./work-hero"

export function NextWork({ work }: { work: WorkItem }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { handOffTo } = usePageTransition()
  const href = `/work/${work.slug}`

  const eyebrow = (
    <span
      data-handoff-fade
      className="inline-flex items-center gap-1.5 transition-colors duration-fast group-hover:text-brand group-focus-visible:text-brand"
    >
      Next project
      <ArrowRightIcon
        aria-hidden
        className="size-3.5 transition-transform duration-normal ease-out-expo group-hover:translate-x-1"
      />
    </span>
  )

  return (
    // min-h-svh guarantees the page can scroll far enough to park this at the top
    <section ref={sectionRef} className={cn(CONTENT_COLUMN, "min-h-svh pb-20")}>
      <Link
        href={href}
        onNavigate={(event) => {
          if (sectionRef.current) handOffTo(event, href, sectionRef.current)
        }}
        className="group block focus-visible:outline-none"
      >
        <WorkHero work={work} eyebrow={eyebrow} isPageHeader={false} />
      </Link>
    </section>
  )
}
