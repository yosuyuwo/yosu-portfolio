import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { useCallback, useRef } from "react"
import { flushSync } from "react-dom"

export type LightboxOrigin = {
  element: HTMLElement
  previewSrc: string | null
  aspectRatio: number | null
}

const OPEN_DURATION_S = 0.6
const CLOSE_DURATION_S = 0.42
const CLOSE_BUTTON_DURATION_S = 0.15
const FLIGHT_EASE = "power3.inOut"
const PAGE_SCALE = 0.96
const PAGE_RADIUS_PX = 40
const PAGE_DIM = "rgba(0, 0, 0, 0.55)"
const PAGE_CLEAR = "rgba(0, 0, 0, 0)"
const FLIP_ID = "lightbox-image"
// width and height are tweened instead of scale so the thumbnail's crop opens up without stretching the image
const FLIP_VARS = { scale: false } as const
const FRAME_FLIGHT_PROPS =
  "transform,translate,rotate,scale,width,height,position,top,left,margin"

type Parts = {
  page: HTMLElement
  thumb: HTMLElement
  frame: HTMLElement
  mask: HTMLElement
  closeButton: HTMLElement
}

function findParts(stage: HTMLElement, thumb: HTMLElement): Parts | null {
  const page = document.querySelector<HTMLElement>("[data-site-root]")
  const frame = stage.querySelector<HTMLElement>("[data-lightbox-frame]")
  const mask = stage.querySelector<HTMLElement>("[data-lightbox-mask]")
  const closeButton = stage.querySelector<HTMLElement>("[data-lightbox-close]")
  if (!page || !frame || !mask || !closeButton) return null
  // Flip pairs the thumbnail's recorded state with the frame through this shared id
  thumb.dataset.flipId = FLIP_ID
  frame.dataset.flipId = FLIP_ID
  return { page, thumb, frame, mask, closeButton }
}

function motionDuration(seconds: number) {
  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  return isReduced ? 0 : seconds
}

function restorePage({ page, thumb }: Pick<Parts, "page" | "thumb">) {
  gsap.set([page, thumb], { clearProps: "all" })
  delete thumb.dataset.flipId
}

function playOpen({ page, thumb, frame, mask, closeButton }: Parts) {
  const duration = motionDuration(OPEN_DURATION_S)
  const thumbState = Flip.getState(thumb)
  const pageRect = page.getBoundingClientRect()

  gsap.set(thumb, { opacity: 0 })
  // the page is document-tall, so it has to shrink around the visible viewport, not its own centre
  gsap.set(page, {
    transformOrigin: `${window.innerWidth / 2 - pageRect.left}px ${window.innerHeight / 2 - pageRect.top}px`,
    willChange: "transform",
  })

  return gsap
    .timeline({
      defaults: { duration, ease: FLIGHT_EASE },
      onComplete: () => {
        gsap.set(frame, { clearProps: FRAME_FLIGHT_PROPS })
      },
    })
    .add(
      Flip.from(thumbState, {
        ...FLIP_VARS,
        targets: frame,
        duration,
        ease: FLIGHT_EASE,
      }),
      0
    )
    .to(page, { scale: PAGE_SCALE }, 0)
    .to(
      mask,
      {
        scale: PAGE_SCALE,
        borderRadius: PAGE_RADIUS_PX,
        backgroundColor: PAGE_DIM,
      },
      0
    )
    .to(closeButton, { opacity: 1 }, 0)
}

// Flip reads an element's own width, which ignores the zoom layer's scale, so bake the zoomed rect into the frame first
function resetZoomKeepingFramePosition(
  frame: HTMLElement,
  resetZoom: () => void
) {
  const zoomed = frame.getBoundingClientRect()
  flushSync(resetZoom)
  gsap.set(frame, { width: zoomed.width, height: zoomed.height })
  const settled = frame.getBoundingClientRect()
  gsap.set(frame, {
    x: `+=${zoomed.left - settled.left}`,
    y: `+=${zoomed.top - settled.top}`,
  })
}

function playClose(
  { page, thumb, frame, mask, closeButton }: Parts,
  resetZoom: () => void,
  onComplete: () => void
) {
  const duration = motionDuration(CLOSE_DURATION_S)
  resetZoomKeepingFramePosition(frame, resetZoom)
  const frameState = Flip.getState(frame)

  // the thumbnail sits inside the scaled page, so measure where it lands once the page is back to full size
  const pageScale = Number(gsap.getProperty(page, "scaleX"))
  gsap.set(page, { scale: 1 })
  const thumbState = Flip.getState(thumb)
  gsap.set(page, { scale: pageScale })
  Flip.fit(frame, thumbState, FLIP_VARS)

  return gsap
    .timeline({
      defaults: { duration, ease: FLIGHT_EASE },
      onComplete,
    })
    .add(
      Flip.from(frameState, {
        ...FLIP_VARS,
        targets: frame,
        duration,
        ease: FLIGHT_EASE,
      }),
      0
    )
    .to(page, { scale: 1 }, 0)
    .to(mask, { scale: 1, borderRadius: 0, backgroundColor: PAGE_CLEAR }, 0)
    .to(
      closeButton,
      { opacity: 0, duration: motionDuration(CLOSE_BUTTON_DURATION_S) },
      0
    )
}

export function useLightboxFlip({
  origin,
  resetZoom,
  onClosed,
}: {
  origin: LightboxOrigin | null
  resetZoom: () => void
  onClosed: () => void
}) {
  const partsRef = useRef<Parts | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const isClosingRef = useRef(false)

  const stageRef = useCallback(
    (stage: HTMLDivElement | null) => {
      if (!stage || !origin) return
      gsap.registerPlugin(Flip)

      const parts = findParts(stage, origin.element)
      if (!parts) return

      partsRef.current = parts
      isClosingRef.current = false
      timelineRef.current = playOpen(parts)

      return () => {
        timelineRef.current?.kill()
        restorePage(parts)
        partsRef.current = null
      }
    },
    [origin]
  )

  const close = useCallback(() => {
    const parts = partsRef.current
    if (!parts) {
      onClosed()
      return
    }
    if (isClosingRef.current) return

    isClosingRef.current = true
    timelineRef.current?.kill()
    timelineRef.current = playClose(parts, resetZoom, () => {
      restorePage(parts)
      onClosed()
    })
  }, [onClosed, resetZoom])

  return { stageRef, close }
}
