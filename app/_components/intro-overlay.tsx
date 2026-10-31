"use client"

import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef } from "react"

import { STACK_X, Y_OFFSET, Y_PATH } from "@/app/_components/logo-mark"
import { shouldSkipIntro } from "@/app/_lib/intro-visit"
import { revealPage } from "@/app/_lib/reveal-page"
import { cdnUrl } from "@/lib/cdn"
import { HERO_PORTRAIT } from "@/lib/site-content"

const WIPE_UP_FROM = "inset(100% 0% 0% 0%)"
const WIPE_DOWN_FROM = "inset(0% 0% 100% 0%)"
const WIPE_SHOWN = "inset(0% 0% 0% 0%)"
const WIPE_DURATION = 1.3
const WIPE_EASE = "expo.inOut"
const LOGO_DELAY = 0.5
const SPLIT_DURATION = 1.3
const SPLIT_EASE = "power4.in"
const EXIT_DELAY = 1

export function IntroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (shouldSkipIntro()) {
        revealPage()
        return
      }

      const q = gsap.utils.selector(root)
      const html = document.documentElement
      const photo = q("[data-intro-photo]")
      const logo = q("[data-intro-logo]")
      const leftY = q("[data-intro-y='left']")
      const rightY = q("[data-intro-y='right']")

      html.style.overflow = "hidden"
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          html.style.overflow = ""
          gsap.set(root, { display: "none" })
        },
      })

      tl.set(q("[data-intro-y]"), { x: STACK_X })
        .fromTo(
          photo,
          { autoAlpha: 1, clipPath: WIPE_DOWN_FROM },
          { clipPath: WIPE_SHOWN, duration: WIPE_DURATION, ease: WIPE_EASE }
        )
        .fromTo(
          logo,
          { autoAlpha: 1, clipPath: WIPE_UP_FROM },
          { clipPath: WIPE_SHOWN, duration: WIPE_DURATION, ease: WIPE_EASE },
          `<${LOGO_DELAY}`
        )
        .to(leftY, { x: 0, duration: SPLIT_DURATION, ease: SPLIT_EASE })
        .to(
          rightY,
          { x: Y_OFFSET, duration: SPLIT_DURATION, ease: SPLIT_EASE },
          "<"
        )
        .set(photo, { autoAlpha: 0 })
        .set(logo, { mixBlendMode: "normal" }, "<")
        .set(leftY, { color: "var(--foreground)" }, "<")
        .set(rightY, { color: "var(--brand)" }, "<")
        .to(
          root,
          { autoAlpha: 0, y: -24, duration: 0.8, ease: "power2.inOut" },
          `+=${EXIT_DELAY}`
        )
        .add(revealPage(), "-=0.5")

      return () => {
        html.style.overflow = ""
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      data-intro
      aria-hidden
      className="fixed inset-0 z-40 grid place-items-center bg-background px-4"
    >
      <div className="relative grid place-items-center">
        <div data-intro-photo>
          <Image
            src={cdnUrl(HERO_PORTRAIT.src)}
            alt=""
            width={HERO_PORTRAIT.width}
            height={HERO_PORTRAIT.height}
            priority
            className="h-[58svh] w-auto object-cover grayscale md:h-[66svh]"
          />
        </div>

        <svg
          data-intro-logo
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 45"
          className="absolute h-14 w-auto overflow-visible text-white mix-blend-difference md:h-20"
        >
          <path data-intro-y="left" d={Y_PATH} fill="currentColor" />
          <path data-intro-y="right" d={Y_PATH} fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
