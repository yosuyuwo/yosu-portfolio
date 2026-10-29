"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react"

import { handOff, leavePage } from "@/app/_lib/reveal-page"

type NavigateEvent = { preventDefault: () => void }

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function usePageTransition() {
  const router = useRouter()
  const isBusyRef = useRef(false)

  function intercept(
    event: NavigateEvent,
    href: string,
    transition: () => Promise<void>
  ): void {
    if (prefersReducedMotion()) return
    event.preventDefault()
    if (isBusyRef.current) return
    isBusyRef.current = true

    transition().then(() => {
      router.push(href, { scroll: false })
      isBusyRef.current = false
    })
  }

  return {
    fadeTo: (event: NavigateEvent, href: string) =>
      intercept(event, href, leavePage),
    handOffTo: (event: NavigateEvent, href: string, section: HTMLElement) =>
      intercept(event, href, () => handOff(section)),
  }
}
