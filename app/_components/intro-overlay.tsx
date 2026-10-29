"use client"

import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef } from "react"

import { STACK_X, Y_OFFSET, Y_PATH } from "@/app/_components/logo-mark"
import { readIntroKind } from "@/app/_lib/intro-kind"
import { revealPage } from "@/app/_lib/reveal-page"
import { cdnUrl } from "@/lib/cdn"
import { HERO_PORTRAIT } from "@/lib/site-content"

export function IntroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const kind = readIntroKind()
      if (kind === "none") {
        revealPage()
        return
      }

      const q = gsap.utils.selector(root)
      const html = document.documentElement
      const logo = root.querySelector("[data-intro-logo]")

      html.style.overflow = "hidden"
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          html.style.overflow = ""
          gsap.set(root, { display: "none" })
        },
      })

      if (kind === "photo") {
        tl.fromTo(
          q("[data-intro-photo]"),
          { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }
        ).to(
          q("[data-intro-photo]"),
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.9,
            ease: "expo.inOut",
          },
          "+=0.6"
        )
      }

      tl.set(q("[data-intro-y]"), { x: STACK_X })
        .fromTo(
          q("[data-intro-logo]"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" }
        )
        .call(() => logo?.setAttribute("data-split", ""))
        .to(q("[data-intro-y='left']"), {
          x: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .to(
          q("[data-intro-y='right']"),
          { x: Y_OFFSET, duration: 0.8, ease: "power3.inOut" },
          "<"
        )
        .to(
          root,
          { autoAlpha: 0, y: -24, duration: 0.8, ease: "power2.inOut" },
          "+=0.5"
        )
        .add(revealPage(), "-=0.5")

      return () => {
        html.style.overflow = ""
        logo?.removeAttribute("data-split")
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
          className="absolute h-14 w-auto overflow-visible text-foreground transition-colors duration-slow ease-out data-split:text-brand md:h-20"
        >
          <path data-intro-y="left" d={Y_PATH} fill="currentColor" />
          <path data-intro-y="right" d={Y_PATH} fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
