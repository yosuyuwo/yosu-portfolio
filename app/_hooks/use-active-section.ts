"use client"

import { useEffect, useState } from "react"

import { NAV_ITEMS, type NavSectionId } from "@/app/_lib/nav"

// a section counts as active once it crosses a line ~40% down the viewport
const SPY_MARGIN = "-40% 0px -55% 0px"

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

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id as NavSectionId)
      },
      { rootMargin: SPY_MARGIN }
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [pathname])

  return active
}
