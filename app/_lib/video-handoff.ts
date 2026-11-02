type VideoHandoff = {
  src: string
  video: HTMLVideoElement
  overlay: HTMLElement
  timeoutId: number
}

const RELEASE_TIMEOUT_MS = 3000

let pending: VideoHandoff | null = null

// re-parents the playing video so it outlives the outgoing route until the incoming one paints the same frame
export function liftVideo(container: HTMLElement): void {
  releaseVideo()
  const video = container.querySelector("video")
  const frame = video?.parentElement
  const src = video?.getAttribute("src")
  if (!video || !frame || !src || video.paused) return

  const rect = frame.getBoundingClientRect()
  const overlay = document.createElement("div")
  overlay.className = frame.className
  Object.assign(overlay.style, {
    position: "fixed",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: "0",
    pointerEvents: "none",
  })
  overlay.setAttribute("aria-hidden", "true")
  overlay.append(video)
  document.body.append(overlay)

  pending = {
    src,
    video,
    overlay,
    timeoutId: window.setTimeout(releaseVideo, RELEASE_TIMEOUT_MS),
  }
}

export function claimVideo(src: string): HTMLVideoElement | null {
  return pending?.src === src ? pending.video : null
}

export function releaseVideo(): void {
  if (!pending) return
  window.clearTimeout(pending.timeoutId)
  pending.video.pause()
  pending.overlay.remove()
  pending = null
}
