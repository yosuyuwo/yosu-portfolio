"use client"

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import type { ReactNode } from "react"

import { ImageLightbox } from "./image-lightbox"
import type { LightboxImage, LightboxOpening } from "./image-lightbox"
import { readImagePreview } from "./image-lightbox/_lib/read-image-preview"

type ZoomableImageGroupValue = {
  images: readonly LightboxImage[]
  open: (index: number, opener: HTMLElement) => void
  registerThumb: (index: number, thumb: HTMLElement) => () => void
}

const ZoomableImageGroupContext = createContext<ZoomableImageGroupValue | null>(
  null
)

export function useZoomableImageGroup(): ZoomableImageGroupValue {
  const group = use(ZoomableImageGroupContext)
  if (!group) {
    throw new Error("ZoomableImage must be rendered inside ZoomableImageGroup")
  }
  return group
}

/** Images in one group share a lightbox, so the viewer can move between them. */
export function ZoomableImageGroup({
  images,
  children,
}: {
  images: readonly LightboxImage[]
  children: ReactNode
}) {
  const thumbsRef = useRef(new Map<number, HTMLElement>())
  const [opening, setOpening] = useState<LightboxOpening | null>(null)

  const open = useCallback((index: number, opener: HTMLElement) => {
    setOpening({ ...readImagePreview(opener), index, opener })
  }, [])
  const registerThumb = useCallback((index: number, thumb: HTMLElement) => {
    const thumbs = thumbsRef.current
    thumbs.set(index, thumb)
    return () => {
      thumbs.delete(index)
    }
  }, [])
  const getThumb = useCallback(
    (index: number) => thumbsRef.current.get(index),
    []
  )
  const handleClosed = useCallback(() => setOpening(null), [])

  const value = useMemo(
    () => ({ images, open, registerThumb }),
    [images, open, registerThumb]
  )

  return (
    <ZoomableImageGroupContext value={value}>
      {children}
      <ImageLightbox
        images={images}
        opening={opening}
        getThumb={getThumb}
        onClosed={handleClosed}
      />
    </ZoomableImageGroupContext>
  )
}
