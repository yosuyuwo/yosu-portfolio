import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

// lerp above Lenis's 0.1 default keeps the glide short so the page still feels anchored to the wheel
const SCROLL_LERP = 0.15

let lenis: Lenis | null = null

function tick(time: number): void {
  lenis?.raf(time * 1000)
}

export function startSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger)
  const instance = new Lenis({
    lerp: SCROLL_LERP,
    anchors: true,
    autoToggle: true,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
  })
  lenis = instance
  instance.on("scroll", ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

export function scrollInstant(top: number): void {
  if (lenis) {
    lenis.scrollTo(top, { immediate: true, force: true })
    return
  }
  window.scrollTo({ top, behavior: "instant" })
}
