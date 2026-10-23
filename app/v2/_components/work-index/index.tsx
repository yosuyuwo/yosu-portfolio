"use client"

import { useQueryState } from "nuqs"
import { useRef, useState } from "react"

import { WorkDetail } from "@/app/_components/works-section/_components/work-detail"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import { V2_SECTIONS } from "../../_lib/copy"
import { V2_WORKS } from "../../_lib/works"
import { SectionLabel } from "../section-label"
import { CursorPreview } from "./_components/cursor-preview"
import { WorkRow } from "./_components/work-row"
import { useCursorPreview } from "./_hooks/use-cursor-preview"

export function WorkIndex() {
  const [slug, setSlug] = useQueryState("project")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  useCursorPreview(listRef, previewRef, isHovering)

  const active = V2_WORKS.find((w) => w.slug === slug)

  return (
    <section
      id="work"
      className="mx-auto max-w-[100rem] scroll-mt-14 px-4 pt-24 pb-16 md:px-8 md:pt-40"
    >
      <div className="flex items-baseline justify-between border-b border-(--v2-line) pb-4">
        <SectionLabel {...V2_SECTIONS.works} />
        <p className="font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] text-(--v2-muted)">
          {String(V2_WORKS.length).padStart(2, "0")} projects
        </p>
      </div>

      <ul
        ref={listRef}
        className="group/list"
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
      >
        {V2_WORKS.map((work, index) => (
          <WorkRow
            key={work.id}
            work={work}
            index={index}
            onOpen={setSlug}
            onHover={setActiveIndex}
          />
        ))}
      </ul>

      <CursorPreview
        ref={previewRef}
        works={V2_WORKS}
        activeIndex={activeIndex}
      />

      <Dialog
        open={slug !== null}
        onOpenChange={(open) => {
          if (!open) void setSlug(null)
        }}
      >
        <DialogContent
          overlayClassName="bg-black/40 supports-backdrop-filter:backdrop-blur-sm"
          className="h-[96vh] w-[calc(100%-1.5rem)] max-w-[min(88rem,98vw)] gap-0 overflow-hidden rounded-md bg-background p-0 shadow-2xl ring-1 ring-black/5 sm:max-w-[min(88rem,98vw)] dark:ring-white/10"
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
