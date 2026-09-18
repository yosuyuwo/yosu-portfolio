"use client"

import type { WorkItem } from "../_lib/work-item"
import { WorkDetailHeader } from "./work-detail-header"
import { WorkDetailSection } from "./work-detail-section"

export function WorkDetail({ work }: { work: WorkItem }) {
  const year = work.year ?? new Date(work.publishedAt).getFullYear()

  return (
    <div className="h-full overflow-y-auto">
      <WorkDetailHeader work={work} year={year} />

      <div className="pb-14">
        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-16 px-6 md:mt-24 md:gap-20 md:px-10">
          {work.sections.map((section, i) => (
            <WorkDetailSection
              key={`${section.heading}-${i}`}
              section={section}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
