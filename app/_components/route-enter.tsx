"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { enterRoute } from "@/app/_lib/reveal-page"

// the first load is revealed by intro-overlay.tsx; this only handles client-side route changes
export function RouteEnter() {
  const pathname = usePathname()
  const lastPathRef = useRef(pathname)

  useEffect(() => {
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname
    enterRoute()
  }, [pathname])

  return null
}
