"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { WORKS, WORKS_SECTION } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { WorkGallery } from "./_components/work-gallery"
import { WorkListItem } from "./_components/work-list-item"
import { WorkMeta } from "./_components/work-meta"
import { formatListDate } from "./_lib/format-list-date"
import type { WorkItem } from "./_lib/work-item"

const works: WorkItem[] = WORKS.map((work) => ({
  ...work,
  gallery: [...work.gallery],
  stack: work.stack ? [...work.stack] : undefined,
}))

export function WorksSection() {
  const [slug, setSlug] = useState<string | null>(null)
  const active = works.find((w) => w.slug === slug)
  const activeIndex = works.findIndex((w) => w.slug === slug)

  return (
    <section
      id="works"
      className="@container flex min-h-full shrink-0 flex-col p-6 md:p-8"
    >
      <div>
        <h1 className="text-2xl font-medium tracking-tight">
          {WORKS_SECTION.title}
        </h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {WORKS_SECTION.description}
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-10 @2xl:grid-cols-2 @2xl:gap-x-8 @2xl:gap-y-12">
        {works.map((work, index) => (
          <WorkListItem
            key={work.id}
            work={work}
            index={index}
            onOpen={setSlug}
          />
        ))}
      </ul>

      <Dialog
        open={slug !== null}
        onOpenChange={(open) => {
          if (!open) setSlug(null)
        }}
      >
        <DialogContent
          overlayClassName="bg-black/30 supports-backdrop-filter:backdrop-blur-md"
          className={cn(
            "h-[min(52rem,92vh)] w-[calc(100%-1.5rem)] max-w-[min(72rem,96vw)] gap-0 overflow-hidden p-0 sm:max-w-[min(72rem,96vw)]",
            "rounded-[1.35rem] bg-background/95 shadow-2xl ring-1 ring-black/5",
            "backdrop-blur-xl dark:ring-white/10",
          )}
        >
          {active ? (
            <div className="grid h-full min-h-0 grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-2 md:overflow-hidden">
              <div className="flex min-h-0 flex-col border-b p-5 md:overflow-y-auto md:overscroll-contain md:border-r md:border-b-0 md:p-8">
                <DialogHeader className="gap-2 pr-8 text-left">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {formatListDate(active.publishedAt)}
                  </p>
                  <DialogTitle className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="text-[15px] leading-snug">
                    {active.summary}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex flex-col gap-5">
                  <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                    {active.description}
                  </p>
                  <WorkMeta work={active} />
                </div>
              </div>
              <div className="min-h-0 bg-muted/30 md:overflow-hidden">
                <WorkGallery
                  work={active}
                  index={Math.max(0, activeIndex)}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
