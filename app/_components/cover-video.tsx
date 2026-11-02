"use client"

import { useEffect, useRef, useState } from "react"

import { MediaSkeleton } from "@/app/_components/media-skeleton"
import { claimVideo, releaseVideo } from "@/app/_lib/video-handoff"
import { cn } from "@/lib/utils"

const VIEWPORT_MARGIN = "200px"

type Reveal = "hidden" | "fade" | "instant"

function whenFramePainted(video: HTMLVideoElement, callback: () => void): void {
  if (typeof video.requestVideoFrameCallback === "function") {
    video.requestVideoFrameCallback(() => callback())
    return
  }
  callback()
}

// seeks once to start buffering, then re-seeks to the live playhead so the swap lands on the same frame
function takeOverFrom(
  video: HTMLVideoElement,
  source: HTMLVideoElement
): () => void {
  let isCancelled = false

  function handleSeeked() {
    whenFramePainted(video, () => {
      if (!isCancelled) releaseVideo()
    })
  }

  function handleCanPlay() {
    video.addEventListener("seeked", handleSeeked, { once: true })
    video.currentTime = source.currentTime
  }

  video.preload = "auto"
  video.currentTime = source.currentTime
  video.addEventListener("canplay", handleCanPlay, { once: true })
  void video.play().catch(releaseVideo)

  return () => {
    isCancelled = true
    video.removeEventListener("canplay", handleCanPlay)
    video.removeEventListener("seeked", handleSeeked)
  }
}

export function CoverVideo({
  src,
  hasSkeleton = true,
  className,
}: {
  src: string
  hasSkeleton?: boolean
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isTakingOverRef = useRef(false)
  const [reveal, setReveal] = useState<Reveal>("hidden")

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const source = claimVideo(src)
    isTakingOverRef.current = source !== null
    const cancelTakeOver = source ? takeOverFrom(video, source) : undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: VIEWPORT_MARGIN }
    )
    observer.observe(video)
    return () => {
      cancelTakeOver?.()
      observer.disconnect()
    }
  }, [src])

  return (
    <>
      {hasSkeleton && reveal === "hidden" ? (
        <MediaSkeleton className="motion-reduce:hidden" />
      ) : null}
      <video
        ref={videoRef}
        onLoadedData={() =>
          setReveal(isTakingOverRef.current ? "instant" : "fade")
        }
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top motion-reduce:opacity-100",
          reveal === "hidden" && "opacity-0",
          reveal === "fade" && "transition-opacity duration-normal",
          className
        )}
        src={src}
        preload="none"
        muted
        loop
        playsInline
      />
    </>
  )
}
