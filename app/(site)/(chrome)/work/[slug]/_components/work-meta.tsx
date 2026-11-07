import {
  ExternalLinkIcon,
  GlobeIcon,
  HourglassIcon,
  LockIcon,
} from "lucide-react"

import type { ProjectLink, WorkItem } from "@/app/_lib/work-item"
import { GitHubIcon } from "@/components/icons/github-icon"
import { StackIcon } from "@/components/stack/stack-icon"
import { STACK_LINKS } from "@/components/stack/stack-links"
import { cn } from "@/lib/utils"

type LinkIcon = React.ComponentType<{ className?: string }>

const LINK_CLASS =
  "inline-flex items-center gap-1.5 transition-colors duration-fast hover:text-brand"

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
      className={cn(LINK_CLASS, "text-foreground")}
    >
      <Icon className="size-3.5" />
      {label}
      <ExternalLinkIcon className="size-3" />
    </a>
  )
}

export function WorkMeta({ work }: { work: WorkItem }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-muted-foreground">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {work.stack?.map((tech) => {
          const href = STACK_LINKS[tech]
          return (
            <li key={tech}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  <StackIcon name={tech} />
                  {tech}
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <StackIcon name={tech} />
                  {tech}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {work.liveSite || work.github ? (
        <span className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
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
  )
}
