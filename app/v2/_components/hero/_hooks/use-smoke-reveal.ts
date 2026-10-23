"use client"

import gsap from "gsap"
import { useEffect, type RefObject } from "react"

type Puff = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  growth: number
  life: number
  decay: number
}

const PUFFS_PER_MOVE = 3
const MAX_PUFFS = 140
const BASE_RADIUS = 0.11
const JITTER = 0.04

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
  const w = img.naturalWidth * scale
  const h = img.naturalHeight * scale
  ctx.drawImage(img, (width - w) / 2, 0, w, h)
}

function spawn(puffs: Puff[], x: number, y: number, size: number) {
  for (let i = 0; i < PUFFS_PER_MOVE; i++) {
    puffs.push({
      x: x + (Math.random() - 0.5) * size * JITTER * 2,
      y: y + (Math.random() - 0.5) * size * JITTER * 2,
      vx: (Math.random() - 0.5) * size * 0.0016,
      vy: -size * (0.0008 + Math.random() * 0.0016),
      radius: size * BASE_RADIUS * (0.6 + Math.random() * 0.7),
      growth: size * (0.0012 + Math.random() * 0.0018),
      life: 0.55 + Math.random() * 0.35,
      decay: 0.006 + Math.random() * 0.008,
    })
  }
  if (puffs.length > MAX_PUFFS) puffs.splice(0, puffs.length - MAX_PUFFS)
}

export function useSmokeReveal(
  hostRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  src: string
) {
  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = canvas.getContext("2d")
    const mask = document.createElement("canvas")
    const maskCtx = mask.getContext("2d")
    if (!ctx || !maskCtx) return

    const img = new Image()
    img.src = src
    const puffs: Puff[] = []
    let width = 0
    let height = 0
    let isRunning = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      for (const c of [canvas, mask]) {
        c.width = Math.round(width * dpr)
        c.height = Math.round(height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = () => {
      maskCtx.clearRect(0, 0, width, height)
      for (const p of puffs) {
        p.x += p.vx
        p.y += p.vy
        p.radius += p.growth
        p.life -= p.decay
        const g = maskCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
        g.addColorStop(0, `rgba(0,0,0,${Math.max(p.life, 0)})`)
        g.addColorStop(0.55, `rgba(0,0,0,${Math.max(p.life, 0) * 0.45})`)
        g.addColorStop(1, "rgba(0,0,0,0)")
        maskCtx.fillStyle = g
        maskCtx.fillRect(
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        )
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        if (puffs[i].life <= 0) puffs.splice(i, 1)
      }

      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, width, height)
      if (img.complete && img.naturalWidth) drawCover(ctx, img, width, height)
      ctx.globalCompositeOperation = "destination-in"
      ctx.drawImage(mask, 0, 0, width, height)

      if (puffs.length === 0) stop()
    }

    const start = () => {
      if (isRunning) return
      isRunning = true
      gsap.ticker.add(render)
    }

    function stop() {
      if (!isRunning) return
      isRunning = false
      gsap.ticker.remove(render)
      ctx?.clearRect(0, 0, width, height)
    }

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      spawn(
        puffs,
        event.clientX - rect.left,
        event.clientY - rect.top,
        Math.max(width, height)
      )
      start()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener("pointermove", onMove)

    return () => {
      observer.disconnect()
      host.removeEventListener("pointermove", onMove)
      gsap.ticker.remove(render)
    }
  }, [hostRef, canvasRef, src])
}
