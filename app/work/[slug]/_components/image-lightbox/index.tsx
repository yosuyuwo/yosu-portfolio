"use client"

import { useCallback, useRef, useState } from "react"
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  WheelEvent,
} from "react"
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

import { ThumbnailStrip } from "./_components/thumbnail-strip"
import { useLightboxFlip } from "./_hooks/use-lightbox-flip"
import { readImagePreview } from "./_lib/read-image-preview"
import type { ImagePreview } from "./_lib/read-image-preview"

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_INTENSITY = 0.0018
const NO_ZOOM = { scale: MIN_SCALE, x: 0, y: 0 }
const STRIP_SPACE = "5.5rem"
const NO_STRIP_SPACE = "0px"
const ARROW_STEP: Partial<Record<string, number>> = {
  ArrowLeft: -1,
  ArrowRight: 1,
}

export type LightboxImage = { src: string; alt: string }

export type LightboxView = ImagePreview & { index: number }

export type LightboxOpening = LightboxView & { opener: HTMLElement }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Near-fullscreen image viewer that flies out of its thumbnail. Scroll to zoom
 * toward the cursor position (scroll up zooms in, scroll down zooms out).
 */
export function ImageLightbox({
  images,
  opening,
  getThumb,
  onClosed,
}: {
  images: readonly LightboxImage[]
  opening: LightboxOpening | null
  getThumb: (index: number) => HTMLElement | undefined
  onClosed: () => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(NO_ZOOM)
  const [selected, setSelected] = useState<LightboxView | null>(null)
  const resetZoom = useCallback(() => setTransform(NO_ZOOM), [])
  const handleClosed = useCallback(() => {
    setSelected(null)
    onClosed()
  }, [onClosed])
  const { stageRef, activeThumbRef, switchTo, close } = useLightboxFlip({
    opener: opening?.opener ?? null,
    resetZoom,
    onClosed: handleClosed,
  })

  const view = selected ?? opening
  const image = view ? images[view.index] : null
  const hasStrip = images.length > 1

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
    if (!target.closest("[data-lightbox-frame], [data-lightbox-strip]")) close()
  }

  function selectImage(index: number) {
    const thumb = getThumb(index)
    if (!thumb || index === view?.index) return

    const stripButton = stripRef.current?.children[index]
    const pagePreview = readImagePreview(thumb)
    // a lazy page image may not have loaded yet, but the strip's always has
    const preview =
      pagePreview.previewSrc || !stripButton
        ? pagePreview
        : readImagePreview(stripButton)

    switchTo(thumb, () => setSelected({ ...preview, index }))
  }

  function handleStageKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = ARROW_STEP[event.key]
    if (!step || !view || !hasStrip) return
    selectImage((view.index + step + images.length) % images.length)
  }

  const aspectRatio = view?.aspectRatio ?? null
  const fitClassName = aspectRatio
    ? "object-cover object-top"
    : "object-contain"
  const stageStyle = {
    "--lightbox-strip": hasStrip ? STRIP_SPACE : NO_STRIP_SPACE,
  } as CSSProperties
  const frameStyle = aspectRatio
    ? ({ "--lightbox-aspect": aspectRatio } as CSSProperties)
    : undefined

  return (
    <Dialog
      open={opening !== null}
      onOpenChange={(next) => {
        if (!next) close()
      }}
    >
      <DialogContent
        showCloseButton={false}
        finalFocus={activeThumbRef}
        overlayClassName="bg-transparent supports-backdrop-filter:backdrop-blur-none"
        className="top-0 left-0 block size-full max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none bg-transparent p-0 ring-0 sm:max-w-none data-open:animate-none! data-closed:animate-none!"
      >
        <DialogTitle className="sr-only">{image?.alt}</DialogTitle>
        <div
          ref={stageRef}
          onClick={handleStageClick}
          onKeyDown={handleStageKeyDown}
          style={stageStyle}
          className="absolute inset-0"
        >
          <div
            data-lightbox-mask
            className="absolute inset-0 shadow-[0_0_0_100vmax_#0b0a09] [corner-shape:squircle]"
          />
          <div
            ref={viewportRef}
            onWheel={handleWheel}
            className="absolute inset-x-0 top-0 bottom-(--lightbox-strip) flex items-center justify-center"
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
                  ? "aspect-(--lightbox-aspect) w-[min(96vw,calc((92dvh-var(--lightbox-strip))*var(--lightbox-aspect)))]"
                  : "h-[calc(92dvh-var(--lightbox-strip))] w-[96vw] bg-transparent",
                transform.scale > MIN_SCALE
                  ? "cursor-zoom-out"
                  : "cursor-zoom-in"
              )}
            >
              {view?.previewSrc ? (
                <Image
                  key={view.previewSrc}
                  src={view.previewSrc}
                  alt=""
                  fill
                  unoptimized
                  className={fitClassName}
                />
              ) : null}
              {image ? (
                <FadeInImage
                  key={`${image.src}-${view?.index}`}
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={fitClassName}
                  skeletonClassName={view?.previewSrc ? "hidden" : "dark"}
                  sizes="96vw"
                />
              ) : null}
            </div>
          </div>
          {hasStrip && view ? (
            <ThumbnailStrip
              ref={stripRef}
              images={images}
              activeIndex={view.index}
              onSelect={selectImage}
            />
          ) : null}
          <DialogClose
            render={
              <button
                type="button"
                data-lightbox-chrome
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
