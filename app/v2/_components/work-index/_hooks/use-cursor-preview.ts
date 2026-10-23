"use client"

import gsap from "gsap"
import { useEffect, type RefObject } from "react"

const OFFSET_X = 28
const FOLLOW_DURATION = 0.55

export function useCursorPreview(
  listRef: RefObject<HTMLElement | null>,
  previewRef: RefObject<HTMLElement | null>,
  isVisible: boolean
) {
  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return

    gsap.set(preview, { autoAlpha: 0, scale: 0.85 })
    const x = gsap.quickTo(preview, "x", {
      duration: FOLLOW_DURATION,
      ease: "power3.out",
    })
    const y = gsap.quickTo(preview, "y", {
      duration: FOLLOW_DURATION,
      ease: "power3.out",
    })

    const onMove = (event: PointerEvent) => {
      x(event.clientX + OFFSET_X)
      y(event.clientY - preview.offsetHeight / 2)
    }

    list.addEventListener("pointermove", onMove)
    return () => {
      list.removeEventListener("pointermove", onMove)
      gsap.killTweensOf(preview)
    }
  }, [listRef, previewRef])

  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return

    gsap.to(preview, {
      autoAlpha: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.85,
      duration: isVisible ? 0.45 : 0.25,
      ease: isVisible ? "expo.out" : "power2.in",
      overwrite: "auto",
    })
  }, [isVisible, previewRef])
}
