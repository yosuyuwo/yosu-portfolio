import Image from "next/image"

import {
  ABOUT_INTRO,
  ABOUT_PORTRAIT,
  EXPERIENCE,
  SKILL_GROUPS,
} from "@/lib/site-content"

import { formatRange } from "./_lib/format-range"

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-full shrink-0 flex-col gap-10 border-t bg-background p-6 md:flex-row md:items-start md:gap-12 md:p-8"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">About</h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {ABOUT_INTRO}
          </p>
        </div>

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
          <dl className="grid gap-5 sm:grid-cols-2">
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

      <Image
        src={ABOUT_PORTRAIT.src}
        alt={ABOUT_PORTRAIT.alt}
        width={ABOUT_PORTRAIT.width}
        height={ABOUT_PORTRAIT.height}
        quality={100}
        className="aspect-3/4 w-full max-w-80 shrink-0 self-center rounded-lg object-cover md:sticky md:top-8 md:self-start"
      />
    </section>
  )
}
