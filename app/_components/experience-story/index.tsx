"use client"

import { useRef } from "react"

import { useContactDialog } from "@/app/_hooks/use-contact-dialog"

import { STORY_CHAPTERS, STORY_INTRO } from "@/app/_lib/experience-story"
import { WORK_ITEMS } from "@/app/_lib/works"
import { Chapter } from "./_components/chapter"
import { HireMarker } from "./_components/hire-marker"
import { useChapterRail } from "./_hooks/use-chapter-rail"

export function ExperienceStory() {
  const { setOpen } = useContactDialog()
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  useChapterRail(listRef, fillRef)

  return (
    <div className="mt-4 border-t border-border pt-8 md:pt-10">
      <p className="mb-10 flex items-baseline gap-3 md:mb-12">
        <span className="text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-semibold tracking-[-0.04em]">
          {STORY_INTRO.title}
        </span>
        <span className="font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] text-brand italic">
          {STORY_INTRO.span}
        </span>
      </p>

      <div className="relative [--rail-end:0px]">
        <span
          aria-hidden
          className="absolute top-1.5 bottom-(--rail-end) left-0 w-px bg-border"
        />
        <span
          ref={fillRef}
          aria-hidden
          className="absolute top-1.5 bottom-(--rail-end) left-0 w-px origin-top bg-brand"
        />
        <ol ref={listRef}>
          {STORY_CHAPTERS.map((chapter, index) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              index={index}
              works={WORK_ITEMS.filter((w) =>
                chapter.workSlugs.includes(w.slug)
              )}
            />
          ))}
          <HireMarker onContact={() => setOpen(true)} />
        </ol>
      </div>
    </div>
  )
}
