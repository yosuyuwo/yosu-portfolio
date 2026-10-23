import { formatRange } from "@/app/_components/about-section/_lib/format-range"
import { Button } from "@/components/ui/button"

import type { StoryChapter } from "../../../_lib/experience-story"
import type { WorkItem } from "@/app/_components/works-section/_lib/work-item"

export const MONO_CLASS =
  "font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase"

export function Chapter({
  chapter,
  index,
  works,
  onOpenWork,
}: {
  chapter: StoryChapter
  index: number
  works: readonly WorkItem[]
  onOpenWork: (slug: string) => void
}) {
  const number = String(index + 1).padStart(2, "0")

  return (
    <li
      data-chapter
      className="group/chapter relative grid gap-x-6 gap-y-5 pb-20 pl-8 md:grid-cols-9 md:pb-28 md:pl-0"
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-2.5 -translate-x-1/2 rounded-full border border-(--v2-line) bg-(--v2-paper) transition-[background-color,border-color,scale] duration-normal ease-out-expo group-data-reached/chapter:scale-125 group-data-reached/chapter:border-(--v2-accent) group-data-reached/chapter:bg-(--v2-accent)"
      />

      <div className="flex flex-col gap-1.5 md:sticky md:top-24 md:col-span-2 md:self-start md:pl-8">
        <span className={`${MONO_CLASS} text-(--v2-accent)`}>Ch. {number}</span>
        <span className={`${MONO_CLASS} text-(--v2-muted)`}>
          {formatRange(chapter.startDate, chapter.endDate)}
        </span>
      </div>

      <div className="flex flex-col gap-6 md:col-span-7">
        <div>
          <h3 className="text-[clamp(1.75rem,3.4vw,3rem)] leading-[0.95] font-medium tracking-[-0.04em]">
            {chapter.organization}
          </h3>
          <p className={`${MONO_CLASS} mt-3 text-(--v2-muted)`}>
            {chapter.role}
          </p>
        </div>

        <p className="max-w-[28ch] font-(family-name:--font-v2-serif) text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] italic">
          {chapter.pullLine}
        </p>

        <div className="flex max-w-[60ch] flex-col gap-4 text-base leading-relaxed text-(--v2-muted)">
          {chapter.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {works.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className={`${MONO_CLASS} mr-2 text-(--v2-muted)`}>
              Shipped
            </span>
            {works.map((work) => (
              <Button
                key={work.slug}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenWork(work.slug)}
                className="group/work h-8 rounded-full border-(--v2-line) bg-transparent px-3.5 text-sm hover:border-(--v2-accent) hover:bg-transparent hover:text-(--v2-accent)"
              >
                {work.title}
                <span
                  aria-hidden
                  className="transition-transform duration-fast group-hover/work:translate-x-0.5"
                >
                  →
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}
