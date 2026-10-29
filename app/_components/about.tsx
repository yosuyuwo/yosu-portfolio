import Image from "next/image"

import { cdnUrl } from "@/lib/cdn"
import {
  ABOUT_INTRO,
  ABOUT_WORKFLOW,
  HERO_PORTRAIT,
  RESUME,
  SITE_NAME,
  SKILL_GROUPS,
} from "@/lib/site-content"

import { SECTIONS } from "@/app/_lib/copy"
import { ExperienceStory } from "./experience-story"
import { SectionLabel } from "./section-label"

const SUBHEAD_CLASS =
  "font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"

function WorkflowQuote() {
  return (
    <figure className="group grid max-w-2xl grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-5 border-t border-border pt-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted ring-1 ring-border">
        <Image
          src={cdnUrl(HERO_PORTRAIT.src)}
          alt={HERO_PORTRAIT.alt}
          fill
          sizes="(min-width: 640px) 9rem, 6.5rem"
          className="object-cover object-top grayscale transition-[filter,scale] duration-slow ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className={SUBHEAD_CLASS}>How I work</h2>
        <blockquote className="relative text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed tracking-[-0.01em] text-pretty">
          <span
            aria-hidden
            className="absolute -top-3 -left-4 font-serif text-5xl leading-none text-brand/40 select-none sm:-left-6"
          >
            &ldquo;
          </span>
          <p>{ABOUT_WORKFLOW}</p>
        </blockquote>
        <figcaption className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          <span className="h-px w-5 bg-brand" />
          <span className="text-foreground">{SITE_NAME}</span>
          <span>{RESUME.headline}</span>
        </figcaption>
      </div>
    </figure>
  )
}

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
          <WorkflowQuote />
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
