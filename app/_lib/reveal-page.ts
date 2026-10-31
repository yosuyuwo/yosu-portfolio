import gsap from "gsap"

import { STACK_X, Y_OFFSET } from "@/app/_components/logo-mark"

const LOGO_SPLIT = { duration: 0.8, ease: "power3.inOut" } as const
const HANDOFF_ATTR = "data-handoff"
const ENTERED_ATTR = "data-entered"

function scrollInstant(top: number): void {
  window.scrollTo({ top, behavior: "instant" })
}

// the sidebar persists across routes, so only reveal what hasn't entered yet
function hiddenTargets(): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(
    "[data-enter]:not([data-entered]), [data-hero]:not([data-entered])"
  )
}

function markEntered(targets: Element[]): void {
  for (const el of targets) el.setAttribute(ENTERED_ATTR, "")
}

export function revealPage(): gsap.core.Timeline {
  const targets = hiddenTargets()
  const tl = gsap.timeline({ onComplete: () => markEntered(targets) })
  if (!targets.length) return tl

  tl.fromTo(
    targets,
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

  if (!targets.some((el) => el.querySelector("[data-logo-y]"))) return tl

  return tl
    .fromTo(
      "[data-logo-y='left']",
      { x: STACK_X },
      { x: 0, ...LOGO_SPLIT },
      0.3
    )
    .fromTo(
      "[data-logo-y='right']",
      { x: STACK_X },
      { x: Y_OFFSET, ...LOGO_SPLIT },
      0.3
    )
}

let isFadeQueued = false

function settleHandoff(): boolean {
  const root = document.documentElement
  if (!root.hasAttribute(HANDOFF_ATTR)) return false
  markEntered(gsap.utils.toArray("main [data-hero]"))
  root.removeAttribute(HANDOFF_ATTR)
  return true
}

function consumeQueuedFade(): boolean {
  const wasQueued = isFadeQueued
  isFadeQueued = false
  return wasQueued
}

// plain link clicks show the new route at once; only the page transitions below fade it up
export function enterRoute(): void {
  const isTransition = settleHandoff() || consumeQueuedFade()
  const hashTarget = window.location.hash
    ? document.getElementById(window.location.hash.slice(1))
    : null
  hashTarget?.scrollIntoView({ behavior: "instant" })
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  if (isTransition && !isReducedMotion) {
    revealPage()
    return
  }
  markEntered(hiddenTargets())
}

export function leavePage(): Promise<void> {
  const main = document.querySelector("main")
  return new Promise((resolve) => {
    if (!main) return resolve()
    gsap.to(main, {
      autoAlpha: 0,
      y: -16,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        scrollInstant(0)
        isFadeQueued = true
        resolve()
      },
    })
  })
}

/**
 * Scrolls `section` into the page-header slot while everything around it
 * fades, then drops the rest of the page so the incoming route's hero
 * mounts in exactly the same spot. The slot sits below whatever the page
 * renders above its hero (e.g. the back link), measured from the current page.
 */
export function handOff(section: HTMLElement): Promise<void> {
  const main = section.closest("main")
  const leaving = main
    ? Array.from(main.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement && el !== section
      )
    : []
  const fading = [
    ...leaving,
    ...section.querySelectorAll<HTMLElement>("[data-handoff-fade]"),
  ]
  const mainTop = (main?.getBoundingClientRect().top ?? 0) + window.scrollY
  const anchor = main?.querySelector<HTMLElement>("[data-handoff-anchor]")
  const slotOffset = anchor
    ? anchor.getBoundingClientRect().top + window.scrollY - mainTop
    : 0
  const targetY =
    section.getBoundingClientRect().top + window.scrollY - mainTop - slotOffset
  const scroll = { y: window.scrollY }

  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          for (const el of leaving) el.style.display = "none"
          section.style.marginTop = `${slotOffset}px`
          scrollInstant(0)
          document.documentElement.setAttribute(HANDOFF_ATTR, "")
          resolve()
        },
      })
      .to(fading, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 0)
      .to(
        scroll,
        {
          y: targetY,
          duration: 1.1,
          ease: "expo.inOut",
          onUpdate: () => scrollInstant(scroll.y),
        },
        0
      )
  })
}
