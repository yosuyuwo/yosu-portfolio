import type { SpanFigure as SpanFigureData } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { FigureFrame } from "./figure-frame"

const TONE_CLASSES = {
  focus: "bg-chart-mine",
  hold: "bg-chart-mine/25",
  free: "border border-dashed border-border bg-transparent",
} as const

export function SpanFigure({ figure }: { figure: SpanFigureData }) {
  const columns = figure.segments.map((s) => `${s.weight}fr`).join(" ")

  return (
    <FigureFrame title={figure.title} note={figure.note}>
      <ol
        className="flex flex-col gap-1 md:grid md:grid-cols-(--span-cols) md:gap-x-0.5 md:gap-y-3"
        style={{ "--span-cols": columns } as React.CSSProperties}
      >
        {figure.segments.map((segment, i) => (
          <li
            key={`${segment.label}-${i}`}
            className="flex min-w-0 items-center gap-3 md:flex-col md:items-stretch md:gap-2"
          >
            <span
              aria-hidden
              className={cn(
                "h-8 w-14 shrink-0 rounded-[4px] md:h-14 md:w-auto",
                segment.color
                  ? "ring-1 ring-foreground/10 ring-inset"
                  : TONE_CLASSES[segment.tone]
              )}
              style={
                segment.color ? { backgroundColor: segment.color } : undefined
              }
            />
            <span
              className={cn(
                "text-sm leading-tight text-balance md:text-xs",
                segment.tone === "focus"
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {segment.label}
            </span>
          </li>
        ))}
      </ol>
    </FigureFrame>
  )
}
