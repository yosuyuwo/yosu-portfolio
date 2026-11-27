"use client"

import { useEffect } from "react"

import { startSmoothScroll } from "@/app/_lib/smooth-scroll"

export function SmoothScroll() {
  useEffect(() => startSmoothScroll(), [])
  return null
}
