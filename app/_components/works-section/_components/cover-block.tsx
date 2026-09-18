"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { COVER_TONES } from "../_lib/cover-tones"
import type { WorkItem } from "../_lib/work-item"
import { WorkCoverMedia } from "./work-cover-media"

export function CoverBlock({
  work,
  index,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  children,
}: {
  work: WorkItem
  index: number
  className?: string
  priority?: boolean
  sizes?: string
  children?: ReactNode
}) {
  const [hasMedia, setHasMedia] = useState(
    Boolean(work.coverVideoPath || work.coverPath)
  )

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        !hasMedia && "animate-pulse",
        COVER_TONES[index % COVER_TONES.length],
        className
      )}
    >
      <WorkCoverMedia
        work={work}
        priority={priority}
        sizes={sizes}
        onError={() => setHasMedia(false)}
      />
      {children}
    </div>
  )
}
