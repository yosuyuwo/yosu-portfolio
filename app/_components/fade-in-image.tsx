"use client"

import { useEffect, useState } from "react"
import type { ComponentProps } from "react"
import Image from "next/image"

import { MediaSkeleton } from "@/app/_components/media-skeleton"
import { cn } from "@/lib/utils"

type LoadState = "loading" | "loaded" | "failed"

// server-rendered images must paint as soon as they decode, not after hydration, so only later mounts fade in
let hasHydrated = false

export function FadeInImage({
  alt,
  className,
  onLoad,
  onError,
  skeletonClassName,
  ...props
}: ComponentProps<typeof Image> & { skeletonClassName?: string }) {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [isFading] = useState(() => hasHydrated)
  const isLoaded = loadState === "loaded"

  useEffect(() => {
    hasHydrated = true
  }, [])

  return (
    <>
      {isLoaded ? null : (
        <MediaSkeleton
          isShimmering={loadState === "loading"}
          className={skeletonClassName}
        />
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setLoadState("loaded")
          onLoad?.(event)
        }}
        onError={(event) => {
          setLoadState("failed")
          onError?.(event)
        }}
        className={cn(
          "transition-opacity duration-normal",
          (loadState === "failed" || (isFading && !isLoaded)) && "opacity-0",
          className
        )}
      />
    </>
  )
}
