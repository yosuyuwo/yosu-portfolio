"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import type { WorkItem } from "../_lib/work-item"

/**
 * Renders a work's cover video when available, falling back to the
 * static cover image. The caller owns the wrapping `relative` container.
 */
export function WorkCoverMedia({
  work,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  onError,
}: {
  work: WorkItem
  className?: string
  priority?: boolean
  sizes?: string
  onError?: () => void
}) {
  const [hasError, setHasError] = useState(false)

  if (work.coverVideoPath) {
    return (
      <video
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top",
          className
        )}
        src={work.coverVideoPath}
        poster={work.coverPath || undefined}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }

  if (!work.coverPath || hasError) return null

  return (
    <Image
      src={work.coverPath}
      alt={`${work.title} cover`}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-top", className)}
      onError={() => {
        setHasError(true)
        onError?.()
      }}
    />
  )
}
