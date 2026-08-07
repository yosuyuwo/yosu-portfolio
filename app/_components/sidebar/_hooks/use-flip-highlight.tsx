"use client"

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import gsap from "gsap"
import { Flip } from "gsap/Flip"

import { useSidebar } from "@/components/ui/sidebar"
import type { SectionId } from "@/app/_types/section-id"
import { cn } from "@/lib/utils"

import type { FlipTargetId } from "../_lib/flip-target-id"

gsap.registerPlugin(Flip)

type FlipHighlightContextValue = {
  active: SectionId
  hovered: FlipTargetId | null
  setHovered: (id: FlipTargetId | null) => void
  registerTarget: (id: FlipTargetId, node: HTMLElement | null) => void
}

const FlipHighlightContext = createContext<FlipHighlightContextValue | null>(
  null,
)

export function useFlipHighlight() {
  const ctx = useContext(FlipHighlightContext)
  if (!ctx) {
    throw new Error("useFlipHighlight must be used within FlipHighlightProvider")
  }
  return ctx
}

export function useFlipTarget(id: FlipTargetId) {
  const { hovered, setHovered, registerTarget, active } = useFlipHighlight()
  const highlighted = hovered === id || (hovered === null && active === id)

  return {
    highlighted,
    setRef: useCallback(
      (node: HTMLElement | null) => registerTarget(id, node),
      [id, registerTarget],
    ),
    onMouseEnter: useCallback(() => setHovered(id), [id, setHovered]),
  }
}

export function FlipHighlightProvider({
  active,
  children,
}: {
  active: SectionId
  children: React.ReactNode
}) {
  const { state: sidebarState, isMobile } = useSidebar()
  const [hovered, setHovered] = useState<FlipTargetId | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const targetsRef = useRef<Partial<Record<FlipTargetId, HTMLElement | null>>>(
    {},
  )
  const firstFlip = useRef(true)
  const target = hovered ?? active

  const registerTarget = useCallback(
    (id: FlipTargetId, node: HTMLElement | null) => {
      targetsRef.current[id] = node
    },
    [],
  )

  useLayoutEffect(() => {
    firstFlip.current = true
  }, [isMobile])

  useLayoutEffect(() => {
    if (isMobile) return

    const pill = pillRef.current
    const container = containerRef.current
    const item = targetsRef.current[target]
    if (!pill || !container || !item) return

    const state = Flip.getState(pill)
    const cRect = container.getBoundingClientRect()
    const bRect = item.getBoundingClientRect()

    gsap.set(pill, {
      x: bRect.left - cRect.left,
      y: bRect.top - cRect.top,
      width: bRect.width,
      height: bRect.height,
    })

    if (firstFlip.current) {
      firstFlip.current = false
      return
    }

    const tween = Flip.from(state, {
      duration: 0.45,
      ease: "power2.out",
    })

    return () => {
      tween.kill()
    }
  }, [target, sidebarState, isMobile])

  const value = useMemo(
    () => ({ active, hovered, setHovered, registerTarget }),
    [active, hovered, registerTarget],
  )

  return (
    <FlipHighlightContext.Provider value={value}>
      <div
        ref={containerRef}
        className="relative flex h-full min-h-0 flex-1 flex-col"
        onMouseLeave={() => setHovered(null)}
      >
        <div
          ref={pillRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-0 rounded-md bg-sidebar-accent",
            isMobile && "hidden",
          )}
        />
        {children}
      </div>
    </FlipHighlightContext.Provider>
  )
}
