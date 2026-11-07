import { RepeatIcon } from "lucide-react"

import type { FlowFigure as FlowFigureData } from "@/app/_lib/work-item"

import { FigureFrame } from "./figure-frame"

export function FlowFigure({ figure }: { figure: FlowFigureData }) {
  return (
    <FigureFrame title={figure.title}>
      <ol
        className="grid gap-6 md:grid-cols-(--flow-cols) md:gap-4"
        style={
          {
            "--flow-cols": `repeat(${figure.steps.length}, minmax(0, 1fr))`,
          } as React.CSSProperties
        }
      >
        {figure.steps.map((step, i) => {
          const isLast = i === figure.steps.length - 1
          return (
            <li
              key={step.title}
              className="relative flex gap-4 md:flex-col md:gap-3"
            >
              <div className="flex flex-col items-center md:flex-row">
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-chart-mine/40 bg-chart-mine/10 font-mono text-[11px] text-foreground"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {isLast ? null : (
                  <span
                    aria-hidden
                    className="w-px flex-1 bg-border md:h-px md:w-auto"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 pb-2 md:pr-4">
                <p className="leading-snug font-medium text-balance">
                  {step.title}
                </p>
                {step.detail ? (
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
      {figure.loop ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <RepeatIcon aria-hidden className="size-3.5 text-chart-mine" />
          {figure.loop}
        </p>
      ) : null}
    </FigureFrame>
  )
}
