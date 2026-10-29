import { formatRange } from "@/app/_lib/format-range"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { StoryChapter } from "@/app/_lib/experience-story"
import type { WorkItem } from "@/app/_lib/work-item"

export const MONO_CLASS = "font-mono text-[11px] tracking-[0.12em] uppercase"

export function Chapter({
  chapter,
  index,
  works,
}: {
  chapter: StoryChapter
  index: number
  works: readonly WorkItem[]
}) {
  const number = String(index + 1).padStart(2, "0")

  return (
    <li
      data-chapter
      className="group/chapter relative grid gap-x-6 gap-y-5 pb-12 pl-8 md:grid-cols-9 md:pb-16 md:pl-0"
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-2.5 -translate-x-1/2 rounded-full border border-border bg-background transition-[background-color,border-color,scale] duration-normal ease-out-expo group-data-reached/chapter:scale-125 group-data-reached/chapter:border-brand group-data-reached/chapter:bg-brand"
      />

      <div className="flex flex-col gap-1.5 md:sticky md:top-20 md:col-span-2 md:self-start md:pl-8">
        <span className={`${MONO_CLASS} text-brand`}>Ch. {number}</span>
        <span className={`${MONO_CLASS} text-muted-foreground`}>
          {formatRange(chapter.startDate, chapter.endDate)}
        </span>
      </div>

      <div className="flex flex-col gap-4 md:col-span-7">
        <div>
          <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-tight font-medium tracking-[-0.025em]">
            {chapter.organization}
          </h3>
          <p className={`${MONO_CLASS} mt-2 text-muted-foreground`}>
            {chapter.role}
          </p>
        </div>

        <p className="max-w-[28ch] font-serif text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.25] italic">
          {chapter.pullLine}
        </p>

        <div className="flex max-w-[62ch] flex-col gap-3 text-[15px] leading-relaxed text-muted-foreground">
          {chapter.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {works.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className={`${MONO_CLASS} mr-2 text-muted-foreground`}>
              Shipped
            </span>
            {works.map((work) => (
              <Link
                key={work.slug}
                href={`/work/${work.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "group/work h-8 border-border bg-transparent px-3.5 text-sm hover:border-brand hover:bg-transparent hover:text-brand"
                )}
              >
                {work.title}
                <span
                  aria-hidden
                  className="transition-transform duration-fast group-hover/work:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}
