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
      <WorkHero work={work} eyebrow={eyebrow} isPageHeader />
      <div data-enter className="mt-5">
        <WorkMeta work={work} />
      </div>
    </header>
  )
}
