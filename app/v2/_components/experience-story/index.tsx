"use client"

import { useQueryState } from "nuqs"
import { useRef } from "react"

import { useContactDialog } from "@/app/_components/shell/_hooks/use-contact-dialog"

import { STORY_CHAPTERS, STORY_INTRO } from "../../_lib/experience-story"
import { V2_WORKS } from "../../_lib/works"
import { Chapter } from "./_components/chapter"
import { HireMarker } from "./_components/hire-marker"
import { useChapterRail } from "./_hooks/use-chapter-rail"

export function ExperienceStory() {
  const [, setSlug] = useQueryState("project")
  const { setOpen } = useContactDialog()
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  useChapterRail(listRef, fillRef)

  return (
    <div className="mt-4 border-t border-(--v2-line) pt-10 md:pt-16">
      <p className="mb-14 flex items-baseline gap-4 md:mb-20">
        <span className="text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.06em]">
          {STORY_INTRO.title}
        </span>
        <span className="font-(family-name:--font-v2-serif) text-[clamp(1.25rem,2.4vw,2rem)] text-(--v2-accent) italic">
          {STORY_INTRO.span}
        </span>
      </p>

      <div className="relative [--rail-end:0px]">
        <span
          aria-hidden
          className="absolute top-1.5 bottom-(--rail-end) left-0 w-px bg-(--v2-line)"
        />
        <span
          ref={fillRef}
          aria-hidden
          className="absolute top-1.5 bottom-(--rail-end) left-0 w-px origin-top bg-(--v2-accent)"
        />
        <ol ref={listRef}>
          {STORY_CHAPTERS.map((chapter, index) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              index={index}
              works={V2_WORKS.filter((w) => chapter.workSlugs.includes(w.slug))}
              onOpenWork={setSlug}
            />
          ))}
          <HireMarker onContact={() => setOpen(true)} />
        </ol>
      </div>
    </div>
  )
}
