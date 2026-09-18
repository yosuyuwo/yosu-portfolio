"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomInIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { ImageLightbox } from "./image-lightbox"

export function ZoomableImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ZoomInIcon className="size-4" />
        </span>
      </button>

      <ImageLightbox src={src} alt={alt} open={open} onOpenChange={setOpen} />
    </>
  )
}
