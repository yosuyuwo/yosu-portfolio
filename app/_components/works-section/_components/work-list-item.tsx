"use client"

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
        <CoverBlock
          work={work}
          index={index}
          className="aspect-4/3 w-full transition-opacity group-hover:opacity-90"
        />
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
