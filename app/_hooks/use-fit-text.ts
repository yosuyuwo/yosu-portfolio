"use client"

import { useEffect, type RefObject } from "react"

const PROBE_SIZE_PX = 100

export function useFitText(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    const container = el?.parentElement
    if (!el || !container) return

    const fit = () => {
      el.style.fontSize = `${PROBE_SIZE_PX}px`
      const { paddingLeft, paddingRight } = getComputedStyle(container)
      const available =
        container.clientWidth -
        parseFloat(paddingLeft) -
        parseFloat(paddingRight)
      const ratio = available / el.scrollWidth
      el.style.fontSize = `${PROBE_SIZE_PX * ratio}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    document.fonts?.ready.then(fit)

    return () => observer.disconnect()
  }, [ref])
}
