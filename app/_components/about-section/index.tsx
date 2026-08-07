import {
  ABOUT_INTRO,
  EXPERIENCE,
  SKILL_GROUPS,
} from "@/lib/site-content"

import { formatRange } from "./_lib/format-range"

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-full shrink-0 flex-col gap-10 border-t bg-background p-6 md:p-8"
    >
      <div>
        <h1 className="text-2xl font-medium tracking-tight">About</h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {ABOUT_INTRO}
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Experience
          </h2>
          <ul className="flex flex-col gap-5">
            {EXPERIENCE.map((row) => (
              <li key={row.id} className="max-w-prose">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-medium">{row.organization}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRange(row.startDate, row.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{row.role}</p>
                <p className="mt-1 text-sm">{row.blurb}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Skills
          </h2>
          <dl className="flex flex-col gap-5">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="max-w-prose">
                <dt className="text-sm font-medium">{group.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {group.skills.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
