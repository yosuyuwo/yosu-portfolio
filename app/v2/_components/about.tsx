import { ABOUT_INTRO, SKILL_GROUPS } from "@/lib/site-content"

import { V2_SECTIONS } from "../_lib/copy"
import { ExperienceStory } from "./experience-story"
import { SectionLabel } from "./section-label"

const SUBHEAD_CLASS =
  "font-(family-name:--font-v2-mono) text-[11px] tracking-[0.14em] text-(--v2-muted) uppercase"

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[100rem] scroll-mt-14 gap-y-16 px-4 py-24 md:grid-cols-12 md:gap-x-6 md:px-8 md:py-40"
    >
      <div className="md:col-span-3">
        <SectionLabel {...V2_SECTIONS.about} className="md:sticky md:top-24" />
      </div>

      <div className="flex flex-col gap-20 md:col-span-9 md:gap-28">
        <p className="max-w-[24ch] text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.02] tracking-[-0.04em] text-balance">
          {ABOUT_INTRO}
        </p>

        <div>
          <h2 className={SUBHEAD_CLASS}>Experience</h2>
          <ExperienceStory />
        </div>

        <div>
          <h2 className={SUBHEAD_CLASS}>Toolbox</h2>
          <dl className="mt-4 grid gap-x-6 gap-y-6 border-t border-(--v2-line) pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id}>
                <dt className="text-sm font-medium">{group.name}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-(--v2-muted)">
                  {group.skills.join(" / ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
