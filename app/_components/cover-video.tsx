"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const VIEWPORT_MARGIN = "200px"

export function CoverVideo({
  src,
  poster,
  className,
}: {
  src: string
  poster?: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: VIEWPORT_MARGIN }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-top",
        className
      )}
      src={src}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
    />
  )
}
