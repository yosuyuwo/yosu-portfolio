"use client"

import { useEffect, useState } from "react"

import { END_REVEAL_PX } from "../_lib/constants"

export function useEndReveal(
  scrollEl: HTMLElement | null,
  amount = END_REVEAL_PX,
) {
  const [reveal, setReveal] = useState(0)

  useEffect(() => {
    if (!scrollEl) return

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const maxScroll = Math.max(0, scrollHeight - clientHeight)
      const start = Math.max(0, maxScroll - amount)
      const next =
        scrollTop <= start ? 0 : Math.min(amount, scrollTop - start)
      setReveal((prev) => (prev === next ? prev : next))
    }

    onScroll()
    scrollEl.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(scrollEl)

    return () => {
      scrollEl.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [scrollEl, amount])

  return reveal
}
