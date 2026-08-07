import { cn } from "@/lib/utils"

import { DIGIT_SEGMENTS, SEGMENTS } from "../_lib/digit-segments"

export function SevenSegmentDigit({ value }: { value: string }) {
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
