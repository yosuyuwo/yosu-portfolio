"use client"

import { useEffect, useState } from "react"

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const WIB = "Asia/Jakarta"

const SEGMENTS = ["a", "b", "c", "d", "e", "f", "g"] as const
type Segment = (typeof SEGMENTS)[number]

const DIGIT_SEGMENTS: Record<string, Segment[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "d", "e", "g"],
  "3": ["a", "b", "c", "d", "g"],
  "4": ["b", "c", "f", "g"],
  "5": ["a", "c", "d", "f", "g"],
  "6": ["a", "c", "d", "e", "f", "g"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
}

function getWibParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: WIB,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const hour = parts.find((p) => p.type === "hour")?.value ?? "00"
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00"
  const second = parts.find((p) => p.type === "second")?.value ?? "00"
  return {
    hour,
    minute,
    second,
    hourNum: Number(hour),
    minuteNum: Number(minute),
    secondNum: Number(second),
    display: `${hour}:${minute}`,
  }
}

function SevenSegmentDigit({ value }: { value: string }) {
  const on = new Set(DIGIT_SEGMENTS[value] ?? [])

  return (
    <div className="relative h-9 w-5 shrink-0" aria-hidden>
      {SEGMENTS.map((seg) => (
        <span
          key={seg}
          className={cn(
            "absolute rounded-[1px]",
            on.has(seg)
              ? "bg-foreground shadow-[0_0_4px_rgba(255,255,255,0.35)]"
              : "bg-foreground/12",
            seg === "a" && "top-0 right-[3px] left-[3px] h-[3px]",
            seg === "d" && "right-[3px] bottom-0 left-[3px] h-[3px]",
            seg === "g" &&
              "top-1/2 right-[3px] left-[3px] h-[3px] -translate-y-1/2",
            seg === "b" && "top-[3px] right-0 h-[calc(50%-4px)] w-[3px]",
            seg === "c" && "right-0 bottom-[3px] h-[calc(50%-4px)] w-[3px]",
            seg === "f" && "top-[3px] left-0 h-[calc(50%-4px)] w-[3px]",
            seg === "e" && "bottom-[3px] left-0 h-[calc(50%-4px)] w-[3px]",
          )}
        />
      ))}
    </div>
  )
}

function Colon({ lit }: { lit: boolean }) {
  return (
    <div className="flex h-9 w-2.5 flex-col items-center justify-center gap-2">
      <span
        className={cn(
          "size-1 rounded-full",
          lit ? "bg-foreground" : "bg-foreground/20",
        )}
      />
      <span
        className={cn(
          "size-1 rounded-full",
          lit ? "bg-foreground" : "bg-foreground/20",
        )}
      />
    </div>
  )
}

function AnalogFace({
  hourNum,
  minuteNum,
  secondNum,
}: {
  hourNum: number
  minuteNum: number
  secondNum: number
}) {
  const secondDeg = secondNum * 6
  const minuteDeg = minuteNum * 6 + secondNum * 0.1
  const hourDeg = (hourNum % 12) * 30 + minuteNum * 0.5

  return (
    <svg viewBox="0 0 40 40" className="size-16" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 20 + Math.sin(angle) * 14.5
        const y1 = 20 - Math.cos(angle) * 14.5
        const x2 = 20 + Math.sin(angle) * 16.5
        const y2 = 20 - Math.cos(angle) * 16.5
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-foreground/40"
            strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
          />
        )
      })}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="10"
        className="stroke-foreground"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 20 20)`}
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="7.5"
        className="stroke-foreground"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg} 20 20)`}
      />
      <line
        x1="20"
        y1="22"
        x2="20"
        y2="6.5"
        className="stroke-foreground/70"
        strokeWidth="0.7"
        strokeLinecap="round"
        transform={`rotate(${secondDeg} 20 20)`}
      />
      <circle cx="20" cy="20" r="1.4" className="fill-foreground" />
    </svg>
  )
}

export function WibDigitalClock({
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
  const [now, setNow] = useState(() => new Date())
  const [colonLit, setColonLit] = useState(true)

  useEffect(() => {
    let intervalId = 0

    const tick = () => {
      setNow(new Date())
      setColonLit((v) => !v)
    }

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

  const { hour, minute, display, hourNum, minuteNum, secondNum } =
    getWibParts(now)

  return (
    <div
      className={cn(
        "flex gap-1 transition-all",
        !bare && "rounded-md border border-border bg-background",
        forceDigital
          ? "flex-row items-center px-2.5 py-1.5"
          : showAnalog
            ? "flex-col items-center justify-center p-1"
            : "flex-col items-center px-2.5 py-2",
        className,
      )}
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
