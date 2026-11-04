"use client"

import { useCallback } from "react"
import { ZoomInIcon } from "lucide-react"

import { FadeInImage } from "@/app/_components/fade-in-image"
import { cn } from "@/lib/utils"

import { useZoomableImageGroup } from "./zoomable-image-group"

export function ZoomableImage({
  index,
  className,
  sizes = "(max-width: 768px) 100vw, 70vw",
}: {
  index: number
  className?: string
  sizes?: string
}) {
  const { images, open, registerThumb } = useZoomableImageGroup()
  const { src, alt } = images[index]
  const thumbRef = useCallback(
    (thumb: HTMLButtonElement) => registerThumb(index, thumb),
    [index, registerThumb]
  )

  return (
    <button
      ref={thumbRef}
      type="button"
      onClick={(event) => open(index, event.currentTarget)}
      className={cn(
        "group relative block aspect-16/9 w-full overflow-hidden rounded-2xl bg-muted",
        className
      )}
    >
      <FadeInImage
        src={src}
        alt={alt}
        fill
        className="object-cover object-top transition-[opacity,scale] duration-normal group-hover:scale-[1.02]"
        sizes={sizes}
      />
      <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ZoomInIcon className="size-4" />
      </span>
    </button>
  )
}
