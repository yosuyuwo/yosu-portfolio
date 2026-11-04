"use client"

import { useCallback, useRef, useState } from "react"
import type { CSSProperties, MouseEvent, WheelEvent } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import { FadeInImage } from "@/app/_components/fade-in-image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { useLightboxFlip } from "./_hooks/use-lightbox-flip"
import type { LightboxOrigin } from "./_hooks/use-lightbox-flip"

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_INTENSITY = 0.0018
const NO_ZOOM = { scale: MIN_SCALE, x: 0, y: 0 }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Near-fullscreen image viewer that flies out of its thumbnail. Scroll to zoom
 * toward the cursor position (scroll up zooms in, scroll down zooms out).
 */
export function ImageLightbox({
  src,
  alt,
  origin,
  onClosed,
}: {
  src: string
  alt: string
  origin: LightboxOrigin | null
  onClosed: () => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(NO_ZOOM)
  const resetZoom = useCallback(() => setTransform(NO_ZOOM), [])
  const { stageRef, close } = useLightboxFlip({ origin, resetZoom, onClosed })

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const viewport = viewportRef.current
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const cursorX = event.clientX - rect.left
    const cursorY = event.clientY - rect.top

    setTransform((prev) => {
      const nextScale = clamp(
        prev.scale * (1 - event.deltaY * ZOOM_INTENSITY),
        MIN_SCALE,
        MAX_SCALE
      )
      if (nextScale === MIN_SCALE) return NO_ZOOM

      const contentX = (cursorX - prev.x) / prev.scale
      const contentY = (cursorY - prev.y) / prev.scale

      return {
        scale: nextScale,
        x: cursorX - contentX * nextScale,
        y: cursorY - contentY * nextScale,
      }
    })
  }

  function handleStageClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as Element
    if (!target.closest("[data-lightbox-frame]")) close()
  }

  const aspectRatio = origin?.aspectRatio ?? null
  const fitClassName = aspectRatio
    ? "object-cover object-top"
    : "object-contain"
  const frameStyle = aspectRatio
    ? ({ "--lightbox-aspect": aspectRatio } as CSSProperties)
    : undefined

  return (
    <Dialog
      open={origin !== null}
      onOpenChange={(next) => {
        if (!next) close()
      }}
    >
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-transparent supports-backdrop-filter:backdrop-blur-none"
        className="top-0 left-0 block size-full max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none bg-transparent p-0 ring-0 sm:max-w-none data-open:animate-none! data-closed:animate-none!"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div
          ref={stageRef}
          onClick={handleStageClick}
          className="absolute inset-0"
        >
          <div
            data-lightbox-mask
            className="absolute inset-0 shadow-[0_0_0_100vmax_#0b0a09] [corner-shape:squircle]"
          />
          <div
            ref={viewportRef}
            onWheel={handleWheel}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: "0 0",
            }}
          >
            <div
              data-lightbox-frame
              style={frameStyle}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-2xl bg-muted",
                aspectRatio
                  ? "aspect-(--lightbox-aspect) w-[min(96vw,calc(92dvh*var(--lightbox-aspect)))]"
                  : "h-[92dvh] w-[96vw] bg-transparent",
                transform.scale > MIN_SCALE
                  ? "cursor-zoom-out"
                  : "cursor-zoom-in"
              )}
            >
              {origin?.previewSrc ? (
                <Image
                  src={origin.previewSrc}
                  alt=""
                  fill
                  unoptimized
                  className={fitClassName}
                />
              ) : null}
              <FadeInImage
                src={src}
                alt={alt}
                fill
                className={fitClassName}
                skeletonClassName={origin?.previewSrc ? "hidden" : "dark"}
                sizes="96vw"
              />
            </div>
          </div>
          <DialogClose
            render={
              <button
                type="button"
                data-lightbox-close
                className="fixed top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-colors hover:bg-black/70"
              />
            }
          >
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
