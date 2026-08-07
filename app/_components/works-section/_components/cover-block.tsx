import { cn } from "@/lib/utils"

import { COVER_TONES } from "../_lib/cover-tones"
import type { WorkItem } from "../_lib/work-item"

export function CoverBlock({
  work,
  index,
  className,
}: {
  work: WorkItem
  index: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md animate-pulse",
        COVER_TONES[index % COVER_TONES.length],
        className,
      )}
      title={work.coverPath}
    />
  )
}
