import { ArrowLeftIcon } from "lucide-react"

import { TransitionLink } from "@/app/_components/transition-link"
import type { WorkItem } from "@/app/_lib/work-item"

import { formatListDate } from "../_lib/format-list-date"
import { WorkHero } from "./work-hero"
import { WorkMeta } from "./work-meta"

export function WorkDetailHeader({ work }: { work: WorkItem }) {
  const eyebrow = (
    <p data-enter>
      {work.role ? `${work.role} · ` : null}
      {formatListDate(work.publishedAt)}
    </p>
  )

  return (
    <header>
      <TransitionLink
        href="/"
        data-enter
        className="group inline-flex items-center gap-1.5 pt-6 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase transition-colors duration-fast hover:text-brand focus-visible:text-brand focus-visible:outline-none md:pt-10"
      >
        <ArrowLeftIcon
          aria-hidden
          className="size-3.5 transition-transform duration-normal ease-out-expo group-hover:-translate-x-0.5"
        />
        Back to home
      </TransitionLink>
      <WorkHero work={work} eyebrow={eyebrow} isPageHeader />
      <div data-enter className="mt-5">
        <WorkMeta work={work} />
      </div>
    </header>
  )
}
