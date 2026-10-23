"use client"

import { useSyncExternalStore } from "react"

import { getWibParts } from "@/app/_components/wib-clock/_lib/wib-time"

const TICK_MS = 1000

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, TICK_MS)
  return () => window.clearInterval(id)
}

const getSecond = () => Math.floor(Date.now() / TICK_MS)
const getServerSecond = () => null

export function LocalTime({ className }: { className?: string }) {
  const second = useSyncExternalStore(subscribe, getSecond, getServerSecond)

  if (second === null) return <span className={className}>--:--:-- WIB</span>

  const parts = getWibParts(new Date(second * TICK_MS))

  return (
    <time className={className} aria-label={`Local time ${parts.display} WIB`}>
      <span className="tabular-nums">
        {parts.display}
        <span className="text-(--v2-muted)">:{parts.second}</span>
      </span>{" "}
      WIB
    </time>
  )
}
