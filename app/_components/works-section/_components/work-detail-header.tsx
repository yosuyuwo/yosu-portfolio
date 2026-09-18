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
import type { ProjectLink, WorkItem } from "../_lib/work-item"
import { WorkCoverMedia } from "./work-cover-media"

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
    <div>
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-900 md:aspect-[16/7]">
        <WorkCoverMedia work={work} sizes="100vw" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-6 md:px-10 md:pb-8">
          <p className="flex items-center gap-2 text-xs tracking-widest text-white/70 uppercase">
            {work.role ? <span>{work.role}</span> : null}
            {work.role ? <span aria-hidden>·</span> : null}
            <span>{year}</span>
          </p>
          <h1 className="mt-2 text-4xl leading-[0.95] font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            {work.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-5 md:px-10">
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
