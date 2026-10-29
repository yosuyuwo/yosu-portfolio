import Image from "next/image"

import { CoverVideo } from "@/app/_components/cover-video"
import type { WorkItem } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

/**
 * Renders a work's cover video when available, falling back to the
 * static cover image. The caller owns the wrapping `relative` container.
 */
export function WorkCoverMedia({
  work,
  className,
  priority,
  isStill,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  work: WorkItem
  className?: string
  priority?: boolean
  isStill?: boolean
  sizes?: string
}) {
  if (work.coverVideoPath && !isStill) {
    return (
      <CoverVideo
        src={work.coverVideoPath}
        poster={work.coverPath || undefined}
        className={className}
      />
    )
  }

  if (!work.coverPath) return null

  return (
    <Image
      src={work.coverPath}
      alt={`${work.title} cover`}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-top", className)}
    />
  )
}
