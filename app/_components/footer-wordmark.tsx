"use client"

import gsap from "gsap"
import { useEffect, useRef } from "react"

import { useFitText } from "@/app/_hooks/use-fit-text"
import { SITE_FAMILY_NAME, SITE_GIVEN_NAME } from "@/lib/site-content"

const REACH_PX = 320
const MAX_LIFT_PERCENT = -14
const FOLLOW_DURATION = 0.6

function splitLetters(word: string, offset: number) {
  return [...word].map((char, i) => (
    <span key={offset + i} data-letter className="inline-block">
      {char}
    </span>
  ))
}

export function FooterWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null)
  useFitText(wordmarkRef)

  useEffect(() => {
    const wordmark = wordmarkRef.current
    const footer = wordmark?.closest("footer")
    if (!wordmark || !footer) return

    const mm = gsap.matchMedia()
    mm.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      () => {
        const letters = gsap.utils.toArray<HTMLElement>(
          "[data-letter]",
          wordmark
        )
        gsap.set(letters, { "--lit": 0 })
        const movers = letters.map((el) => ({
          el,
          lift: gsap.quickTo(el, "yPercent", {
            duration: FOLLOW_DURATION,
            ease: "power3.out",
          }),
          lit: gsap.quickTo(el, "--lit", {
            duration: FOLLOW_DURATION,
            ease: "power3.out",
          }),
        }))

        const handleMove = (event: PointerEvent) => {
          for (const { el, lift, lit } of movers) {
            const rect = el.getBoundingClientRect()
            const distance = Math.hypot(
              event.clientX - (rect.left + rect.width / 2),
              event.clientY - (rect.top + rect.height / 2)
            )
            const strength =
              gsap.utils.clamp(0, 1, 1 - distance / REACH_PX) ** 2
            lift(strength * MAX_LIFT_PERCENT)
            lit(strength)
          }
        }

        const handleLeave = () => {
          for (const { lift, lit } of movers) {
            lift(0)
            lit(0)
          }
        }

        footer.addEventListener("pointermove", handleMove)
        footer.addEventListener("pointerleave", handleLeave)
        return () => {
          footer.removeEventListener("pointermove", handleMove)
          footer.removeEventListener("pointerleave", handleLeave)
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none mt-14 px-4 select-none md:col-span-2 md:px-7"
    >
      {/* mask clips anything outside the box, so pad the top to give lifted letters headroom */}
      <div
        ref={wordmarkRef}
        className="-mt-[0.3em] w-max translate-y-[0.12em] [mask-image:linear-gradient(to_bottom,black_0.54em,transparent_1.06em)] pt-[0.3em] pr-[0.06em] leading-[0.8] font-medium tracking-[-0.06em] whitespace-nowrap"
      >
        <p className="text-foreground/[0.08] max-md:text-background/[0.14] [&_[data-letter]]:[color:color-mix(in_oklch,var(--brand)_calc(var(--lit,0)*100%),currentColor)]">
          {splitLetters(SITE_GIVEN_NAME, 0)}{" "}
          <span className="font-serif font-normal tracking-normal italic">
            {splitLetters(SITE_FAMILY_NAME, SITE_GIVEN_NAME.length)}
          </span>
        </p>
      </div>
    </div>
  )
}
