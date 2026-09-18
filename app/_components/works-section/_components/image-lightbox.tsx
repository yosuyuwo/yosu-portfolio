"use client"

import { useRef, useState } from "react"
import type { WheelEvent } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_INTENSITY = 0.0018

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Near-fullscreen image viewer. Scroll to zoom toward the cursor
 * position (scroll up zooms in, scroll down zooms out).
 */
export function ImageLightbox({
  src,
  alt,
  open,
  onOpenChange,
}: {
  src: string
  alt: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault()
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
      if (nextScale === MIN_SCALE) return { scale: MIN_SCALE, x: 0, y: 0 }

      const contentX = (cursorX - prev.x) / prev.scale
      const contentY = (cursorY - prev.y) / prev.scale

      return {
        scale: nextScale,
        x: cursorX - contentX * nextScale,
        y: cursorY - contentY * nextScale,
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setTransform({ scale: 1, x: 0, y: 0 })
        onOpenChange(next)
      }}
    >
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/90"
        className="h-[96vh] w-[calc(100%-1.5rem)] max-w-[98vw] gap-0 overflow-hidden rounded-xl border-0 bg-transparent p-0 ring-0 sm:max-w-[98vw]"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogClose
          render={
            <button
              type="button"
              className="fixed top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            />
          }
        >
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div
          ref={viewportRef}
          onWheel={handleWheel}
          className={cn(
            "relative h-full w-full overflow-hidden",
            transform.scale > MIN_SCALE ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: "0 0",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="98vw"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
