import {
  ExternalLinkIcon,
  GlobeIcon,
  HourglassIcon,
  LockIcon,
} from "lucide-react"

import { GitHubIcon } from "@/components/icons/github-icon"
import { StackIcon } from "@/components/stack/stack-icon"
import { STACK_LINKS } from "@/components/stack/stack-links"

import { formatListDate } from "../_lib/format-list-date"
import type { ProjectLink, WorkItem } from "@/app/_lib/work-item"
import { WorkCoverMedia } from "@/app/_components/work-cover-media"

type LinkIcon = React.ComponentType<{ className?: string }>

function ProjectLinkAction({
  link,
  label,
  icon: Icon,
}: {
  link?: ProjectLink
  label: string
  icon: LinkIcon
}) {
  if (!link) return null

  if (link.status === "private") {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
        <LockIcon className="size-3.5" />
        {label}
      </span>
    )
  }

  if (link.status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
        <HourglassIcon className="size-3 opacity-60" />
      </span>
    )
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-foreground hover:underline"
    >
      <Icon className="size-3.5" />
      {label}
      <ExternalLinkIcon className="size-3" />
    </a>
  )
}

export function WorkDetailHeader({
  work,
  year,
}: {
  work: WorkItem
  year: number
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 md:px-10 md:pt-16">
      <p
        data-enter
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"
      >
        {work.role ? <span>{work.role}</span> : null}
        {work.role ? <span aria-hidden>·</span> : null}
        <span>{year}</span>
      </p>
      <h1
        data-enter
        className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
      >
        {work.title}
      </h1>
      <p
        data-enter
        className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground"
      >
        {work.summary}
      </p>

      <div
        data-enter
        className="relative mt-10 aspect-video overflow-hidden rounded-md bg-muted ring-1 ring-border"
      >
        <WorkCoverMedia
          work={work}
          priority
          sizes="(max-width: 1200px) 100vw, 72rem"
        />
      </div>

      <div data-enter className="pt-5">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          {formatListDate(work.publishedAt)}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {work.stack?.length ? (
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
              {work.stack.map((tech) => {
                const href = STACK_LINKS[tech]

                return href ? (
                  <a
                    key={tech}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:underline"
                  >
                    <StackIcon name={tech} />
                    {tech}
                  </a>
                ) : (
                  <span key={tech} className="inline-flex items-center gap-1">
                    <StackIcon name={tech} />
                    {tech}
                  </span>
                )
              })}
            </span>
          ) : (
            <span />
          )}
          {work.liveSite || work.github ? (
            <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
              <ProjectLinkAction
                link={work.liveSite}
                label="Visit site"
                icon={GlobeIcon}
              />
              <ProjectLinkAction
                link={work.github}
                label="GitHub"
                icon={GitHubIcon}
              />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
