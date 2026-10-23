"use client"

import Image from "next/image"
import { useRef } from "react"

import { HERO_PORTRAIT } from "@/lib/site-content"

import { useSmokeReveal } from "../_hooks/use-smoke-reveal"

export function SmokePortrait() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useSmokeReveal(hostRef, canvasRef, HERO_PORTRAIT.src)

  return (
    <div
      ref={hostRef}
      data-hero-portrait
      className="relative my-auto aspect-3/4 w-[42vw] max-w-[18rem] shrink-0 self-end overflow-hidden rounded-sm bg-(--v2-line) md:mt-0 md:mb-[1.2vw] md:w-[17vw]"
    >
      <Image
        src={HERO_PORTRAIT.src}
        alt={HERO_PORTRAIT.alt}
        fill
        priority
        sizes="(max-width: 768px) 42vw, 18rem"
        className="object-cover object-top grayscale motion-reduce:transition-[filter] motion-reduce:duration-slow motion-reduce:hover:grayscale-0"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  )
}
