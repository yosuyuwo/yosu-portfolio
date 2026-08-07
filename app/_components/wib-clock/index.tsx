"use client"

import { useEffect, useState } from "react"

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { AnalogFace } from "./_components/analog-face"
import { Colon } from "./_components/colon"
import { SevenSegmentDigit } from "./_components/seven-segment-digit"
import { getWibParts } from "./_lib/wib-time"

export function WibClock({
  className,
  forceDigital = false,
  forceAnalog = false,
  bare = false,
}: {
  className?: string
  forceDigital?: boolean
  forceAnalog?: boolean
  bare?: boolean
}) {
  const { state } = useSidebar()
  const showAnalog =
    forceAnalog || (!forceDigital && state === "collapsed")
  const [now, setNow] = useState<Date | null>(null)
  const [colonLit, setColonLit] = useState(true)

  useEffect(() => {
    let intervalId = 0

    const tick = () => {
      setNow(new Date())
      setColonLit((v) => !v)
    }

    tick()
    const delay = 1000 - (Date.now() % 1000)
    const timeoutId = window.setTimeout(() => {
      tick()
      intervalId = window.setInterval(tick, 1000)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [])

  const shellClassName = cn(
    "flex gap-1 transition-all",
    !bare && "rounded-md border border-border bg-background",
    forceDigital
      ? "flex-row items-center px-2.5 py-1.5"
      : showAnalog
        ? "flex-col items-center justify-center p-1"
        : "flex-col items-center px-2.5 py-2",
    className,
  )

  if (!now) {
    return (
      <div className={shellClassName} aria-hidden>
        {showAnalog ? (
          <div className="size-16" />
        ) : (
          <div className="h-9 w-[5.5rem]" />
        )}
      </div>
    )
  }

  const { hour, minute, display, hourNum, minuteNum, secondNum } =
    getWibParts(now)

  return (
    <div
      className={shellClassName}
      title={`${display} WIB`}
      aria-live="polite"
      aria-label={`Western Indonesian Time ${display}`}
    >
      {showAnalog ? (
        <AnalogFace
          hourNum={hourNum}
          minuteNum={minuteNum}
          secondNum={secondNum}
        />
      ) : (
        <>
          <div className="flex items-center gap-0.5">
            <SevenSegmentDigit value={hour[0] ?? "0"} />
            <SevenSegmentDigit value={hour[1] ?? "0"} />
            <Colon lit={colonLit} />
            <SevenSegmentDigit value={minute[0] ?? "0"} />
            <SevenSegmentDigit value={minute[1] ?? "0"} />
          </div>
          <span
            className={cn(
              "font-medium tracking-wider text-foreground",
              forceDigital ? "text-[10px]" : "text-[11px]",
            )}
          >
            GMT (+7)
          </span>
        </>
      )}
    </div>
  )
}
