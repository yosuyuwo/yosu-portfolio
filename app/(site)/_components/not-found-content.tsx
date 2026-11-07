"use client"

import gsap from "gsap"
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react"

import { Y_OFFSET, Y_PATH } from "@/app/_components/logo-mark"
import { TransitionLink } from "@/app/_components/transition-link"
import { skipIntro } from "@/app/_lib/intro-visit"
import { CONTENT_COLUMN, CONTENT_GRID } from "@/app/_lib/page-grid"
import { markBooted } from "@/app/_lib/reveal-page"
import { cn } from "@/lib/utils"

// the Y tips about its stem corner until the stem and right arm tip both rest on the ground
const PIVOT = "25.088 44.672"
const FALLEN_DEG = 71
const REBOUND_DEG = 65
const WOBBLE_DEG = 8
const SETTLE_DEG = 3
const VIEW_BOX = "0 0 88 44.672"

function prefersMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: no-preference)").matches
}

function useFallingY(fallenRef: RefObject<SVGPathElement | null>) {
  useEffect(() => {
    const fallen = fallenRef.current
    if (!fallen) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // the markup starts fallen so reduced motion gets the final pose; here it stands first and then falls
      fallen.removeAttribute("transform")
      gsap.set(fallen, { svgOrigin: PIVOT })
      gsap
        .timeline({ delay: 0.5 })
        .to(fallen, { rotation: WOBBLE_DEG, duration: 0.3, ease: "power1.inOut" })
        .to(fallen, { rotation: SETTLE_DEG, duration: 0.25, ease: "power1.inOut" })
        .to(fallen, { rotation: FALLEN_DEG, duration: 0.6, ease: "power3.in" })
        .to(fallen, { rotation: REBOUND_DEG, duration: 0.1, ease: "power2.out" })
        .to(fallen, { rotation: FALLEN_DEG, duration: 0.12, ease: "power2.in" })
    })
    return () => {
      gsap.killTweensOf(fallen)
      mm.revert()
    }
  }, [fallenRef])

  function standUp() {
    if (!prefersMotion()) return
    gsap.to(fallenRef.current, {
      rotation: 0,
      duration: 0.6,
      ease: "back.out(2)",
      overwrite: true,
    })
  }

  function fallOver() {
    if (!prefersMotion()) return
    gsap.to(fallenRef.current, {
      rotation: FALLEN_DEG,
      duration: 0.7,
      ease: "bounce.out",
      overwrite: true,
    })
  }

  return { standUp, fallOver }
}

export function NotFoundContent() {
  const fallenRef = useRef<SVGPathElement>(null)
  const { standUp, fallOver } = useFallingY(fallenRef)

  // leaving this page client-side mounts the intro overlay, which must not play mid-session
  useLayoutEffect(() => {
    skipIntro()
    markBooted()
  }, [])

  return (
    <main
      className={cn(
        CONTENT_COLUMN,
        CONTENT_GRID,
        "min-h-svh content-center gap-y-12 py-14"
      )}
    >
      <div className="border-b md:col-span-7">
        <svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          viewBox={VIEW_BOX}
          className="block w-full overflow-visible"
        >
          <path d={Y_PATH} fill="currentColor" className="text-foreground" />
          <g transform={`translate(${Y_OFFSET} 0)`}>
            <path
              ref={fallenRef}
              d={Y_PATH}
              fill="currentColor"
              transform={`rotate(${FALLEN_DEG} ${PIVOT})`}
              className="text-brand"
            />
          </g>
        </svg>
      </div>

      <div className="self-end md:col-span-5">
        <h1 className="text-[clamp(1.625rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">
          This page{" "}
          <em className="font-serif text-[1.12em] font-normal tracking-normal text-brand">
            fell over.
          </em>
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          The link may be old or mistyped. Everything else is still standing.
        </p>
        <TransitionLink
          href="/"
          onPointerEnter={standUp}
          onPointerLeave={fallOver}
          onFocus={standUp}
          onBlur={fallOver}
          className="mt-6 inline-block underline decoration-border underline-offset-4 transition-colors duration-fast hover:text-brand hover:decoration-brand focus-visible:text-brand focus-visible:outline-none"
        >
          Back to the homepage
        </TransitionLink>
      </div>
    </main>
  )
}
