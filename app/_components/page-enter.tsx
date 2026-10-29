"use client"

import gsap from "gsap"
import { useEffect } from "react"

export function PageEnter() {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-enter]",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          clearProps: "transform",
        }
      )
    })
    return () => mm.revert()
  }, [])

  return null
}
