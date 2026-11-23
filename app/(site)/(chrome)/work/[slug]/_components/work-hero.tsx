import type { ReactNode } from "react"

import { WorkCoverMedia } from "@/app/_components/work-cover-media"
import { CONTENT_GRID } from "@/app/_lib/page-grid"
import type { WorkItem } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

// next-work.tsx renders this same block so the title and cover can hand off between routes without moving
export function WorkHero({
  work,
  eyebrow,
  isPageHeader,
}: {
  work: WorkItem
  eyebrow: ReactNode
  isPageHeader: boolean
}) {
  const Title = isPageHeader ? "h1" : "h2"
  const heroAttr = isPageHeader ? { "data-hero": "" } : {}
  const anchorAttr = isPageHeader ? { "data-handoff-anchor": "" } : {}

  return (
    <div {...anchorAttr} className="pt-14 md:pt-24">
      <div className={cn(CONTENT_GRID, "gap-y-6")}>
        <div className="h-4 font-mono text-[11px] leading-4 tracking-[0.12em] text-muted-foreground uppercase md:col-span-12">
          {eyebrow}
        </div>
        <Title
          {...heroAttr}
          className="font-serif text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] font-normal tracking-[-0.03em] text-balance md:col-span-12"
        >
          {work.title}
        </Title>
        <p
          {...heroAttr}
          className="max-w-[48ch] text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-pretty text-foreground/80 md:col-span-9 md:col-start-4"
        >
          {work.summary}
        </p>
      </div>

      <div
        {...heroAttr}
        className="relative mt-12 aspect-video overflow-hidden rounded-md bg-muted ring-1 ring-border md:mt-16"
      >
        <WorkCoverMedia
          work={work}
          preload={isPageHeader}
          sizes="(max-width: 1200px) 100vw, 72rem"
        />
      </div>
    </div>
  )
}
