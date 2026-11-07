import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { useCallback, useRef } from "react"
import { flushSync } from "react-dom"

const OPEN_DURATION_S = 0.6
const CLOSE_DURATION_S = 0.42
const SWITCH_DURATION_S = 0.3
const CHROME_FADE_DURATION_S = 0.15
const FLIGHT_EASE = "power3.inOut"
const SWITCH_EASE = "power3.out"
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
  frame: HTMLElement
  mask: HTMLElement
  chrome: HTMLElement[]
}

function findParts(stage: HTMLElement): Parts | null {
  const page = document.querySelector<HTMLElement>("[data-site-root]")
  const frame = stage.querySelector<HTMLElement>("[data-lightbox-frame]")
  const mask = stage.querySelector<HTMLElement>("[data-lightbox-mask]")
  if (!page || !frame || !mask) return null
  // Flip pairs the thumbnail's recorded state with the frame through this shared id
  frame.dataset.flipId = FLIP_ID
  const chrome = gsap.utils.toArray<HTMLElement>(
    stage.querySelectorAll("[data-lightbox-chrome]")
  )
  return { page, frame, mask, chrome }
}

function motionDuration(seconds: number) {
  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  return isReduced ? 0 : seconds
}

function hideThumb(thumb: HTMLElement) {
  thumb.dataset.flipId = FLIP_ID
  gsap.set(thumb, { opacity: 0 })
}

function restoreThumb(thumb: HTMLElement) {
  gsap.set(thumb, { clearProps: "all" })
  delete thumb.dataset.flipId
}

function atFullPageSize<T>(page: HTMLElement, read: () => T): T {
  const pageScale = Number(gsap.getProperty(page, "scaleX"))
  gsap.set(page, { scale: 1 })
  const result = read()
  gsap.set(page, { scale: pageScale })
  return result
}

// the page is document-tall, so it has to shrink around the visible viewport, not its own centre
function centreOriginOnViewport(page: HTMLElement) {
  const pageRect = atFullPageSize(page, () => page.getBoundingClientRect())
  gsap.set(page, {
    transformOrigin: `${window.innerWidth / 2 - pageRect.left}px ${window.innerHeight / 2 - pageRect.top}px`,
  })
}

// closing has to land on a thumbnail the viewer can see, and the page behind the image hides the jump
function scrollThumbIntoView(page: HTMLElement, thumb: HTMLElement) {
  const rect = atFullPageSize(page, () => thumb.getBoundingClientRect())
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) return
  window.scrollBy({
    top: rect.top + rect.height / 2 - window.innerHeight / 2,
    behavior: "instant",
  })
  centreOriginOnViewport(page)
}

function playOpen({ page, frame, mask, chrome }: Parts, thumb: HTMLElement) {
  const duration = motionDuration(OPEN_DURATION_S)
  // the recorded state only pairs with the frame if it was captured with the flip id on
  thumb.dataset.flipId = FLIP_ID
  const thumbState = Flip.getState(thumb)

  hideThumb(thumb)
  centreOriginOnViewport(page)
  gsap.set(page, { willChange: "transform" })

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
    .to(chrome, { opacity: 1 }, 0)
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

function playSwitch(
  frame: HTMLElement,
  resetZoom: () => void,
  applyImage: () => void
) {
  resetZoomKeepingFramePosition(frame, resetZoom)
  const frameState = Flip.getState(frame)
  gsap.set(frame, { clearProps: FRAME_FLIGHT_PROPS })
  flushSync(applyImage)

  return Flip.from(frameState, {
    ...FLIP_VARS,
    targets: frame,
    duration: motionDuration(SWITCH_DURATION_S),
    ease: SWITCH_EASE,
    onComplete: () => {
      gsap.set(frame, { clearProps: FRAME_FLIGHT_PROPS })
    },
  })
}

function playClose(
  { page, frame, mask, chrome }: Parts,
  thumb: HTMLElement,
  resetZoom: () => void,
  onComplete: () => void
) {
  const duration = motionDuration(CLOSE_DURATION_S)
  resetZoomKeepingFramePosition(frame, resetZoom)
  const frameState = Flip.getState(frame)

  // the thumbnail sits inside the scaled page, so measure where it lands once the page is back to full size
  const thumbState = atFullPageSize(page, () => Flip.getState(thumb))
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
      chrome,
      { opacity: 0, duration: motionDuration(CHROME_FADE_DURATION_S) },
      0
    )
}

export function useLightboxFlip({
  opener,
  resetZoom,
  onClosed,
}: {
  opener: HTMLElement | null
  resetZoom: () => void
  onClosed: () => void
}) {
  const partsRef = useRef<Parts | null>(null)
  const activeThumbRef = useRef<HTMLElement | null>(null)
  const flightRef = useRef<gsap.core.Timeline | null>(null)
  const switchRef = useRef<gsap.core.Timeline | null>(null)
  const isClosingRef = useRef(false)

  const stageRef = useCallback(
    (stage: HTMLDivElement | null) => {
      if (!stage || !opener) return
      gsap.registerPlugin(Flip)

      const parts = findParts(stage)
      if (!parts) return

      partsRef.current = parts
      activeThumbRef.current = opener
      isClosingRef.current = false
      flightRef.current = playOpen(parts, opener)

      return () => {
        flightRef.current?.kill()
        switchRef.current?.kill()
        gsap.set(parts.page, { clearProps: "all" })
        if (activeThumbRef.current) restoreThumb(activeThumbRef.current)
        partsRef.current = null
      }
    },
    [opener]
  )

  const switchTo = useCallback(
    (thumb: HTMLElement, applyImage: () => void) => {
      const parts = partsRef.current
      const previousThumb = activeThumbRef.current
      if (!parts || !previousThumb || isClosingRef.current) return

      if (thumb !== previousThumb) {
        restoreThumb(previousThumb)
        hideThumb(thumb)
        activeThumbRef.current = thumb
        scrollThumbIntoView(parts.page, thumb)
      }

      if (flightRef.current?.isActive()) {
        flushSync(applyImage)
        return
      }
      switchRef.current?.kill()
      switchRef.current = playSwitch(parts.frame, resetZoom, applyImage)
    },
    [resetZoom]
  )

  const close = useCallback(() => {
    const parts = partsRef.current
    const thumb = activeThumbRef.current
    if (!parts || !thumb) {
      onClosed()
      return
    }
    if (isClosingRef.current) return

    isClosingRef.current = true
    flightRef.current?.kill()
    switchRef.current?.kill()
    flightRef.current = playClose(parts, thumb, resetZoom, () => {
      gsap.set(parts.page, { clearProps: "all" })
      restoreThumb(thumb)
      onClosed()
    })
  }, [onClosed, resetZoom])

  return { stageRef, activeThumbRef, switchTo, close }
}
