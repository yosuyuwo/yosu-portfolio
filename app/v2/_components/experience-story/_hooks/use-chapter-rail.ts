"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, type RefObject } from "react"

const TRIGGER_LINE = "top 60%"
// a dot sits at top-1.5 (6px) and is size-2.5 (10px), so its centre is 11px down
const DOT_CENTER_PX = 11

export function useChapterRail(
  listRef: RefObject<HTMLOListElement | null>,
  fillRef: RefObject<HTMLSpanElement | null>
) {
  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    gsap.registerPlugin(ScrollTrigger)
    // the v2 wrapper, not the window, is the scroll container
    const scroller = list.closest<HTMLElement>(".v2-root") ?? undefined
    const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]", list)
    const last = chapters.at(-1)
    const rail = list.parentElement
    if (!last || !rail) return

    // the rail stops at the last dot instead of running past it
    const syncRailEnd = () =>
      rail.style.setProperty(
        "--rail-end",
        `${last.offsetHeight - DOT_CENTER_PX}px`
      )
    syncRailEnd()
    const resizeObserver = new ResizeObserver(syncRailEnd)
    resizeObserver.observe(last)
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            scroller,
            start: TRIGGER_LINE,
            endTrigger: last,
            end: TRIGGER_LINE,
            scrub: 0.4,
          },
        }
      )

      for (const chapter of chapters) {
        ScrollTrigger.create({
          trigger: chapter,
          scroller,
          start: TRIGGER_LINE,
          onEnter: () => chapter.setAttribute("data-reached", ""),
          onLeaveBack: () => chapter.removeAttribute("data-reached"),
        })
      }

      return () => {
        for (const chapter of chapters) chapter.removeAttribute("data-reached")
      }
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(fill, { scaleY: 1 })
      for (const chapter of chapters) chapter.setAttribute("data-reached", "")
    })

    return () => {
      resizeObserver.disconnect()
      mm.revert()
    }
  }, [listRef, fillRef])
}
