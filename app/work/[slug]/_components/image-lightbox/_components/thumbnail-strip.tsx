import { useEffect } from "react"
import type { RefObject } from "react"

import { FadeInImage } from "@/app/_components/fade-in-image"

export function ThumbnailStrip({
  ref,
  images,
  activeIndex,
  onSelect,
}: {
  ref: RefObject<HTMLDivElement | null>
  images: readonly { src: string; alt: string }[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  useEffect(() => {
    ref.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
      inline: "center",
    })
  }, [ref, activeIndex])

  return (
    <div
      ref={ref}
      data-lightbox-chrome
      data-lightbox-strip
      className="fixed bottom-3 left-1/2 z-10 flex w-fit max-w-full -translate-x-1/2 [scrollbar-width:none] gap-2 overflow-x-auto p-1 opacity-0 motion-safe:scroll-smooth"
    >
      {images.map((image, index) => (
        <button
          key={`${image.src}-${index}`}
          type="button"
          aria-label={`Show ${image.alt}`}
          aria-current={index === activeIndex}
          onClick={() => onSelect(index)}
          className="relative aspect-video h-14 shrink-0 overflow-hidden rounded-lg bg-muted opacity-60 ring-white transition-[opacity,box-shadow] duration-fast outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 aria-current:opacity-100 aria-current:ring-2"
        >
          <FadeInImage
            src={image.src}
            alt=""
            fill
            loading="eager"
            sizes="100px"
            className="object-cover object-top"
            skeletonClassName="dark"
          />
        </button>
      ))}
    </div>
  )
}
