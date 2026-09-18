"use client"

import { EyeIcon } from "lucide-react"

import { CoverBlock } from "./cover-block"
import { formatListDate } from "../_lib/format-list-date"
import type { WorkItem } from "../_lib/work-item"

export function WorkListItem({
  work,
  index,
  onOpen,
}: {
  work: WorkItem
  index: number
  onOpen: (slug: string) => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(work.slug)}
        className="group -m-3 w-[calc(100%+1.5rem)] rounded-lg p-3 text-left transition-colors hover:bg-muted/70"
      >
        <CoverBlock work={work} index={index} className="aspect-16/9 w-full">
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50">
            <span className="flex translate-y-2 items-center gap-1.5 text-sm font-medium text-white opacity-0 blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
              <EyeIcon className="size-4" />
              View details
            </span>
          </div>
        </CoverBlock>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-medium">{work.title}</h2>
          <span className="text-xs text-muted-foreground">
            {formatListDate(work.publishedAt)}
          </span>
        </div>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          {work.summary}
        </p>
      </button>
    </li>
  )
}
