import { CONTENT_COLUMN } from "@/app/_lib/page-grid"
import type { WorkItem } from "@/app/_lib/work-item"

import { WorkDetailHeader } from "./work-detail-header"
import { WorkDetailSection } from "./work-detail-section"

export function WorkDetail({ work }: { work: WorkItem }) {
  return (
    <article className={CONTENT_COLUMN}>
      <WorkDetailHeader work={work} />

      <div
        data-enter
        className="mt-20 flex flex-col gap-20 border-b border-border pb-24 md:mt-28 md:gap-28 md:pb-32"
      >
        {work.sections.map((section, i) => (
          <WorkDetailSection
            key={`${section.heading}-${i}`}
            section={section}
          />
        ))}
      </div>
    </article>
  )
}
