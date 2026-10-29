import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { WorkCoverMedia } from "@/app/_components/work-cover-media"
import type { WorkItem } from "@/app/_lib/work-item"

export function NextWork({ work }: { work: WorkItem }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <Link
        href={`/work/${work.slug}`}
        className="group grid items-center gap-6 border-t border-border pt-8 focus-visible:outline-none sm:grid-cols-[1fr_16rem]"
      >
        <span className="flex flex-col gap-2">
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            Next project
          </span>
          <span className="flex items-center gap-3 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-medium tracking-[-0.03em] transition-colors duration-fast group-hover:text-brand group-focus-visible:text-brand">
            {work.title}
            <ArrowRightIcon
              aria-hidden
              className="size-[0.8em] stroke-[1.5] transition-transform duration-normal ease-out-expo group-hover:translate-x-1.5"
            />
          </span>
        </span>
        <span className="relative block aspect-video overflow-hidden rounded-md bg-muted ring-1 ring-border">
          <span className="absolute inset-0 transition-transform duration-slow ease-out-expo group-hover:scale-[1.03]">
            <WorkCoverMedia work={work} sizes="16rem" />
          </span>
        </span>
      </Link>
    </section>
  )
}
