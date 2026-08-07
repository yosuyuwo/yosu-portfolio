"use client"

import { useEffect, useState } from "react"

import type { SectionId } from "@/app/_types/section-id"

export function useActiveSection(
  sectionIds: readonly SectionId[],
  root: HTMLElement | null,
): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0] ?? "works")

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]?.target.id
        if (top === "works" || top === "about") {
          setActive(top)
        }
      },
      {
        root,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [root, sectionIds])

  return active
}
