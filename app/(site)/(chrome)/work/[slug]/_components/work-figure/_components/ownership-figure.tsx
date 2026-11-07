import type { OwnershipFigure as OwnershipFigureData } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { FigureFrame } from "./figure-frame"

function LegendItem({ isMine, label }: { isMine: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "size-2.5 shrink-0 rounded-[3px]",
          isMine ? "bg-chart-mine" : "bg-chart-others"
        )}
      />
      {label}
    </li>
  )
}

export function OwnershipFigure({ figure }: { figure: OwnershipFigureData }) {
  return (
    <FigureFrame title={figure.title}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-10">
        <ol className="flex flex-col gap-1.5 squircle border border-border bg-muted/40 p-2">
          {figure.parts.map((part) => {
            const isMine = part.owner === "me"
            return (
              <li
                key={part.label}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-sm border-l-2 px-3 py-2.5 text-sm",
                  isMine
                    ? "border-chart-mine bg-chart-mine/12 text-foreground"
                    : "border-chart-others bg-background/60 text-muted-foreground"
                )}
              >
                <span className="font-medium">{part.label}</span>
                <span className="text-xs text-muted-foreground">
                  {isMine ? "Me" : figure.otherLabel.split(" ")[0]}
                </span>
              </li>
            )
          })}
        </ol>
        <div className="flex flex-col gap-4 md:justify-center">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <LegendItem isMine label="Me" />
            <LegendItem isMine={false} label={figure.otherLabel} />
          </ul>
        </div>
      </div>
    </FigureFrame>
  )
}
