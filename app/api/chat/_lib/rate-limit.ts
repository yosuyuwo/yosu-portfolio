import "server-only"

const MIN_INTERVAL_MS = 1000
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 20
const SWEEP_THRESHOLD = 1000

const recentRequests = new Map<string, readonly number[]>()
const inFlight = new Set<string>()

type Acquired = { ok: true; release: () => void }
type Rejected = { ok: false; retryAfterMs: number }

function reject(retryAfterMs: number): Rejected {
  return { ok: false, retryAfterMs }
}

function withinWindow(times: readonly number[], now: number): number[] {
  return times.filter((at) => now - at < WINDOW_MS)
}

function sweepStale(now: number) {
  if (recentRequests.size < SWEEP_THRESHOLD) return
  for (const [key, times] of recentRequests) {
    if (withinWindow(times, now).length === 0) recentRequests.delete(key)
  }
}

// Per-instance memory: on serverless each instance counts separately, which is enough to stop one client spamming.
export function acquireChatSlot(
  key: string,
  now = Date.now()
): Acquired | Rejected {
  if (inFlight.has(key)) return reject(MIN_INTERVAL_MS)

  const recent = withinWindow(recentRequests.get(key) ?? [], now)
  const last = recent.at(-1)
  if (last !== undefined && now - last < MIN_INTERVAL_MS) {
    return reject(MIN_INTERVAL_MS - (now - last))
  }
  if (recent.length >= MAX_PER_WINDOW) {
    return reject(WINDOW_MS - (now - recent[0]))
  }

  sweepStale(now)
  recentRequests.set(key, [...recent, now])
  inFlight.add(key)

  let released = false
  return {
    ok: true,
    release: () => {
      if (released) return
      released = true
      inFlight.delete(key)
    },
  }
}

export function clientKey(request: Request): string {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim()
  return forwarded || request.headers.get("x-real-ip") || "unknown"
}
