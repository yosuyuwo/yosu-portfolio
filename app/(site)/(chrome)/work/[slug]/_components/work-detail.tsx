import { CONTENT_COLUMN } from "@/app/_lib/page-grid"
import type { WorkItem } from "@/app/_lib/work-item"

import { assignSectionLayouts } from "../_lib/section-layout"
import { WorkDetailHeader } from "./work-detail-header"
import { WorkDetailSection } from "./work-detail-section"

export function WorkDetail({ work }: { work: WorkItem }) {
  const layouts = assignSectionLayouts(work.sections)

  return (
    <article className={CONTENT_COLUMN}>
      <WorkDetailHeader work={work} />

      <div
        data-enter
        className="mt-24 flex flex-col gap-28 border-b border-border pb-28 md:mt-36 md:gap-44 md:pb-40"
      >
        {work.sections.map((section, i) => (
          <WorkDetailSection
            key={`${section.heading}-${i}`}
            section={section}
            layout={layouts[i]}
          />
        ))}
      </div>
    </article>
  )
}
