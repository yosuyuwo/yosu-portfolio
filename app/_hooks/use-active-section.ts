"use client"

import { useEffect, useState } from "react"

import { NAV_ITEMS, type NavSectionId } from "@/app/_lib/nav"

// a section counts as active once its top crosses a line 40% down the viewport
const SPY_LINE = 0.4
const BOTTOM_TOLERANCE_PX = 4
const LAST_SECTION_ID = NAV_ITEMS[NAV_ITEMS.length - 1].id

function pickActive(sections: readonly HTMLElement[]): NavSectionId {
  const { scrollHeight } = document.documentElement
  const isAtBottom =
    window.scrollY + window.innerHeight >= scrollHeight - BOTTOM_TOLERANCE_PX
  // a short last section never reaches the line, so the page end claims it
  if (isAtBottom) return LAST_SECTION_ID

  const line = window.innerHeight * SPY_LINE
  let current: NavSectionId = NAV_ITEMS[0].id
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) {
      current = section.id as NavSectionId
    }
  }
  return current
}

export function useActiveSection(pathname: string): NavSectionId {
  const [active, setActive] = useState<NavSectionId>(NAV_ITEMS[0].id)
  const [trackedPath, setTrackedPath] = useState(pathname)

  if (trackedPath !== pathname) {
    setTrackedPath(pathname)
    setActive(NAV_ITEMS[0].id)
  }

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      setActive(pickActive(sections))
    }
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [pathname])

  return active
}
