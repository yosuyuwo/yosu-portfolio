"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import { SITE_LOGO } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const Y_PATH =
  "M25.088 44.672H15.296V27.2L0 0H10.88L20.48 17.792H20.608L29.824 0H40.384L25.088 27.136V44.672Z"

const Y_OFFSET = 13
const STACK_X = Y_OFFSET / 2
const DURATION = 0.5
const EASE = "power3.out"

export function LogoMark({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const leftRef = useRef<SVGGElement>(null)
  const rightRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!svg || !left || !right) return

    const trigger = svg.closest("a")
    if (!trigger) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    gsap.set(left, { x: 0 })
    gsap.set(right, { x: Y_OFFSET })

    const stack = () => {
      const vars = reduceMotion.matches
        ? { duration: 0 }
        : { duration: DURATION, ease: EASE, overwrite: true }
      gsap.to(left, { x: STACK_X, ...vars })
      gsap.to(right, { x: STACK_X, ...vars })
    }

    const unstack = () => {
      const vars = reduceMotion.matches
        ? { duration: 0 }
        : { duration: DURATION, ease: EASE, overwrite: true }
      gsap.to(left, { x: 0, ...vars })
      gsap.to(right, { x: Y_OFFSET, ...vars })
    }

    trigger.addEventListener("pointerenter", stack)
    trigger.addEventListener("pointerleave", unstack)
    trigger.addEventListener("focus", stack)
    trigger.addEventListener("blur", unstack)

    return () => {
      trigger.removeEventListener("pointerenter", stack)
      trigger.removeEventListener("pointerleave", unstack)
      trigger.removeEventListener("focus", stack)
      trigger.removeEventListener("blur", unstack)
      gsap.killTweensOf([left, right])
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54 45"
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      aria-hidden
      className={cn("h-6.5 w-auto overflow-visible text-foreground", className)}
    >
      <g ref={leftRef}>
        <path d={Y_PATH} fill="currentColor" />
      </g>
      <g ref={rightRef}>
        <path d={Y_PATH} fill="currentColor" />
      </g>
    </svg>
  )
}
