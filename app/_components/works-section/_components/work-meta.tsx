import type { ReactNode } from "react"
import { ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import type { WorkItem } from "../_lib/work-item"

export function WorkMeta({ work }: { work: WorkItem }) {
  const year = work.year ?? new Date(work.publishedAt).getFullYear()
  const rows: { label: string; value: ReactNode }[] = []

  if (work.role) rows.push({ label: "Role", value: work.role })
  rows.push({ label: "Year", value: year })
  if (work.stack?.length) {
    rows.push({ label: "Stack", value: work.stack.join(" · ") })
  }
  if (work.links?.length) {
    rows.push({
      label: "Links",
      value: (
        <span className="flex flex-wrap justify-end gap-x-3 gap-y-1">
          {work.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1 text-foreground"
            >
              {link.label}
              <ExternalLinkIcon className="size-3 opacity-50" />
            </a>
          ))}
        </span>
      ),
    })
  }

  return (
    <ul className="overflow-hidden rounded-xl bg-muted/60">
      {rows.map((row, i) => (
        <li
          key={row.label}
          className={cn(
            "flex items-baseline justify-between gap-4 px-3.5 py-2.5 text-sm",
            i > 0 && "border-t border-border/60",
          )}
        >
          <span className="shrink-0 text-muted-foreground">{row.label}</span>
          <span className="min-w-0 text-right font-medium">{row.value}</span>
        </li>
      ))}
    </ul>
  )
}
