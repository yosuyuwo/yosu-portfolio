import Link from "next/link"

import { WorkCoverMedia } from "@/app/_components/work-cover-media"
import type { WorkItem } from "@/app/_lib/work-item"
import { workYear } from "@/app/_lib/works"

export function WorkCard({
  work,
  isPriority,
}: {
  work: WorkItem
  isPriority: boolean
}) {
  const isLive = work.liveSite?.status === "live"

  return (
    <li data-enter>
      <Link
        href={`/work/${work.slug}`}
        className="group flex w-full flex-col gap-3 focus-visible:outline-none"
      >
        <span className="relative block aspect-video overflow-hidden rounded-md bg-muted ring-1 ring-border transition-[box-shadow] duration-normal group-focus-visible:ring-2 group-focus-visible:ring-brand">
          <span className="absolute inset-0 transition-transform duration-slow ease-out-expo group-hover:scale-[1.03]">
            <WorkCoverMedia
              work={work}
              priority={isPriority}
              sizes="(max-width: 640px) 100vw, 36rem"
            />
          </span>
        </span>

        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-medium tracking-[-0.01em] transition-colors duration-fast group-hover:text-brand">
            {work.title}
          </span>
          <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
            {isLive ? (
              <span
                aria-label="Live"
                className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-brand"
              />
            ) : null}
            {workYear(work)}
          </span>
        </span>
        {work.role ? (
          <span className="-mt-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            {work.role}
          </span>
        ) : null}
      </Link>
    </li>
  )
}
