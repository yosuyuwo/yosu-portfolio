"use client"

import gsap from "gsap"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react"

const CHAT_ENTER = { x: -24, duration: 0.6, ease: "expo.out" } as const
const CHAT_EXIT = { x: -12, duration: 0.2, ease: "power2.in" } as const
const NAV_ENTER = {
  y: 16,
  duration: 0.9,
  ease: "expo.out",
  stagger: 0.06,
  delay: 0.08,
} as const

interface SidebarSwapOptions {
  isOpen: boolean
  setOpen: (open: boolean) => void
  navRef: RefObject<HTMLElement | null>
  chatRef: RefObject<HTMLElement | null>
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function useSidebarSwap({
  isOpen,
  setOpen,
  navRef,
  chatRef,
}: SidebarSwapOptions) {
  const wasOpenRef = useRef(isOpen)
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // layout effect so the from-state lands before paint; the chat uses opacity, not autoAlpha, or the autofocused textarea loses focus
  useLayoutEffect(() => {
    const didOpen = isOpen && !wasOpenRef.current
    wasOpenRef.current = isOpen
    if (!didOpen || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, x: CHAT_ENTER.x },
        {
          opacity: 1,
          x: 0,
          duration: CHAT_ENTER.duration,
          ease: CHAT_ENTER.ease,
          clearProps: "transform",
        }
      )
    })
    return () => ctx.revert()
  }, [isOpen, chatRef])

  useEffect(
    () => () => {
      closeTimelineRef.current?.kill()
    },
    []
  )

  // the sidebar items are hidden as the chat starts fading, so they stagger in while it clears instead of blinking after it
  const close = useCallback(() => {
    const chat = chatRef.current
    const items = navRef.current?.querySelectorAll("[data-enter]")
    if (!chat || !items || prefersReducedMotion()) {
      setOpen(false)
      return
    }
    closeTimelineRef.current?.kill()
    closeTimelineRef.current = gsap
      .timeline()
      .to(chat, {
        opacity: 0,
        x: CHAT_EXIT.x,
        duration: CHAT_EXIT.duration,
        ease: CHAT_EXIT.ease,
        onComplete: () => setOpen(false),
      })
      .fromTo(
        items,
        { autoAlpha: 0, y: NAV_ENTER.y },
        {
          autoAlpha: 1,
          y: 0,
          duration: NAV_ENTER.duration,
          ease: NAV_ENTER.ease,
          stagger: NAV_ENTER.stagger,
          clearProps: "transform",
        },
        NAV_ENTER.delay
      )
  }, [chatRef, navRef, setOpen])

  return { close }
}
