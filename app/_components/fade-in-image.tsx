"use client"

import { useState } from "react"
import type { ComponentProps } from "react"
import Image from "next/image"

import { MediaSkeleton } from "@/app/_components/media-skeleton"
import { cn } from "@/lib/utils"

type LoadState = "loading" | "loaded" | "failed"

export function FadeInImage({
  alt,
  className,
  onLoad,
  onError,
  skeletonClassName,
  ...props
}: ComponentProps<typeof Image> & { skeletonClassName?: string }) {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const isLoaded = loadState === "loaded"

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
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </>
  )
}
