import { ABOUT_INTRO, ABOUT_WORKFLOW, SKILL_GROUPS } from "@/lib/site-content"

import { SECTIONS } from "@/app/_lib/copy"
import { ExperienceStory } from "./experience-story"
import { SectionLabel } from "./section-label"

const SUBHEAD_CLASS =
  "font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl gap-y-10 px-4 py-16 md:grid-cols-12 md:gap-x-6 md:gap-y-20 md:px-8 md:pt-24 md:pb-7"
    >
      <div className="md:col-span-3">
        <SectionLabel {...SECTIONS.about} className="md:sticky md:top-20" />
      </div>

      <div className="flex flex-col gap-14 md:col-span-9 md:gap-20">
        <div className="flex flex-col gap-12">
          <p className="max-w-[46ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.4] tracking-[-0.015em] text-balance">
            {ABOUT_INTRO}
          </p>

          <div className="max-w-2xl">
            <p className="text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed tracking-[-0.01em] text-pretty">
              {ABOUT_WORKFLOW.headline}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {ABOUT_WORKFLOW.process}
            </p>
          </div>
        </div>

        <div>
          <h2 className={SUBHEAD_CLASS}>Experience</h2>
          <ExperienceStory />
        </div>
      </div>

      <div className="mt-4 md:col-span-9 md:col-start-4 md:mt-0">
        <h2 className={SUBHEAD_CLASS}>Toolbox</h2>
        <dl className="mt-4 grid gap-x-6 gap-y-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id}>
              <dt className="text-sm font-medium">{group.name}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {group.skills.join(" / ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
