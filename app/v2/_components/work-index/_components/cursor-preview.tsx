"use client"

import type { Ref } from "react"

import { WorkCoverMedia } from "@/app/_components/works-section/_components/work-cover-media"
import type { WorkItem } from "@/app/_components/works-section/_lib/work-item"
import { cn } from "@/lib/utils"

export function CursorPreview({
  works,
  activeIndex,
  ref,
}: {
  works: readonly WorkItem[]
  activeIndex: number
  ref: Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 hidden aspect-16/9 w-[clamp(18rem,26vw,28rem)] overflow-hidden rounded-sm bg-(--v2-line) shadow-2xl shadow-black/20 md:block"
    >
      {works.map((work, i) => (
        <div
          key={work.id}
          className={cn(
            "absolute inset-0 transition-[opacity,scale] duration-normal ease-out-expo",
            i === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
          )}
        >
          <WorkCoverMedia work={work} sizes="28rem" />
        </div>
      ))}
    </div>
  )
}
