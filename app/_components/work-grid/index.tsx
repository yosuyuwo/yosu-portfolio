import { SECTIONS } from "@/app/_lib/copy"
import { WORK_ITEMS } from "@/app/_lib/works"

import { SectionLabel } from "../section-label"
import { WorkCard } from "./_components/work-card"

const PRIORITY_COUNT = 2

export function WorkGrid() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
      <div data-enter className="mb-5 flex items-baseline justify-between">
        <SectionLabel {...SECTIONS.works} />
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          {String(WORK_ITEMS.length).padStart(2, "0")} projects
        </p>
      </div>

      <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 md:gap-x-6 md:gap-y-12">
        {WORK_ITEMS.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            isPriority={index < PRIORITY_COUNT}
          />
        ))}
      </ul>
    </section>
  )
}
