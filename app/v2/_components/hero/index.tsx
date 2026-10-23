"use client"

import gsap from "gsap"
import { ArrowDownRightIcon } from "lucide-react"
import { useEffect, useRef } from "react"

import { SITE_FAMILY_NAME, SITE_GIVEN_NAME } from "@/lib/site-content"

import { V2_HERO } from "../../_lib/copy"
import { LocalTime } from "../local-time"
import { SmokePortrait } from "./_components/smoke-portrait"

const NAME_CLASS =
  "block text-[clamp(4.5rem,14vw,16rem)] leading-[0.8] font-semibold tracking-[-0.07em]"

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
        tl.from("[data-hero-line]", {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.09,
        })
          .from(
            "[data-hero-portrait]",
            { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4 },
            0.15
          )
          .from(
            "[data-hero-fade]",
            { opacity: 0, y: 12, duration: 1, stagger: 0.06 },
            0.5
          )
      },
      root
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-[100rem] flex-col gap-10 px-4 pt-8 pb-8 md:px-8 md:pt-10"
    >
      <p
        data-hero-fade
        className="font-(family-name:--font-v2-mono) text-[11px] tracking-[0.14em] text-(--v2-muted) uppercase"
      >
        {V2_HERO.eyebrow}
      </p>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
          <h1 aria-label={`${SITE_GIVEN_NAME} ${SITE_FAMILY_NAME}`}>
            <span aria-hidden className="block overflow-hidden pb-[0.04em]">
              <span data-hero-line className={NAME_CLASS}>
                {SITE_GIVEN_NAME}
              </span>
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className={NAME_CLASS}>
                {SITE_FAMILY_NAME}
                <span className="text-(--v2-accent)">.</span>
              </span>
            </span>
          </h1>
          <SmokePortrait />
        </div>

        <div className="mt-8 grid gap-8 border-t border-(--v2-line) pt-6 md:mt-10 md:grid-cols-12 md:gap-6">
          <p
            data-hero-fade
            className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.05] tracking-[-0.03em] md:col-span-5"
          >
            {V2_HERO.lead}{" "}
            <em className="font-(family-name:--font-v2-serif) text-[1.15em] font-normal tracking-normal text-(--v2-accent)">
              {V2_HERO.emphasis}
            </em>
          </p>
          <p
            data-hero-fade
            className="max-w-sm text-sm leading-relaxed text-(--v2-muted) md:col-span-4"
          >
            {V2_HERO.bio}
          </p>
          <div
            data-hero-fade
            className="flex items-end justify-between gap-4 font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase md:col-span-3 md:flex-col md:items-end"
          >
            <LocalTime />
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 transition-colors duration-fast hover:text-(--v2-accent)"
            >
              Scroll to work
              <ArrowDownRightIcon className="size-3.5 transition-transform duration-normal ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
