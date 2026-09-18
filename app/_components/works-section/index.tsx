"use client"

import { useQueryState } from "nuqs"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { WORKS, WORKS_SECTION } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { WorkDetail } from "./_components/work-detail"
import { WorkListItem } from "./_components/work-list-item"
import type { WorkItem, WorkSection } from "./_lib/work-item"

const works: WorkItem[] = WORKS.map((rawWork) => {
  const work = rawWork as unknown as WorkItem
  return {
    ...work,
    sections: work.sections.map((section: WorkSection) => ({
      ...section,
      images: section.images ? [...section.images] : undefined,
    })),
    stack: work.stack ? [...work.stack] : undefined,
  }
})

export function WorksSection() {
  const [slug, setSlug] = useQueryState("project")
  const active = works.find((w) => w.slug === slug)

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
          if (!open) void setSlug(null)
        }}
      >
        <DialogContent
          overlayClassName="bg-black/30 supports-backdrop-filter:backdrop-blur-md"
          className={cn(
            "h-[96vh] w-[calc(100%-1.5rem)] max-w-[min(88rem,98vw)] gap-0 overflow-hidden rounded-[1.35rem] bg-background p-0 shadow-2xl ring-1 ring-black/5 sm:max-w-[min(88rem,98vw)] dark:ring-white/10"
          )}
        >
          {active ? (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <WorkDetail work={active} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
