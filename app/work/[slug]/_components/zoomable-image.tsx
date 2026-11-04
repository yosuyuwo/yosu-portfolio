"use client"

import { useCallback, useState } from "react"
import type { MouseEvent } from "react"
import { ZoomInIcon } from "lucide-react"

import { FadeInImage } from "@/app/_components/fade-in-image"
import { cn } from "@/lib/utils"

import { ImageLightbox } from "./image-lightbox"
import type { LightboxOrigin } from "./image-lightbox/_hooks/use-lightbox-flip"

function readOrigin(element: HTMLElement): LightboxOrigin {
  const image = element.querySelector("img")
  if (!image?.complete || image.naturalWidth === 0) {
    return { element, previewSrc: null, aspectRatio: null }
  }
  return {
    element,
    previewSrc: image.currentSrc,
    aspectRatio: image.naturalWidth / image.naturalHeight,
  }
}

export function ZoomableImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 70vw",
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
}) {
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null)
  const handleClosed = useCallback(() => setOrigin(null), [])

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setOrigin(readOrigin(event.currentTarget))
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
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

      <ImageLightbox
        src={src}
        alt={alt}
        origin={origin}
        onClosed={handleClosed}
      />
    </>
  )
}
