import type { WorkFigure as WorkFigureData } from "@/app/_lib/work-item"

import { DecisionsFigure } from "./_components/decisions-figure"
import { FlowFigure } from "./_components/flow-figure"
import { OwnershipFigure } from "./_components/ownership-figure"
import { SpanFigure } from "./_components/span-figure"

export function WorkFigure({ figure }: { figure: WorkFigureData }) {
  switch (figure.kind) {
    case "decisions":
      return <DecisionsFigure figure={figure} />
    case "flow":
      return <FlowFigure figure={figure} />
    case "ownership":
      return <OwnershipFigure figure={figure} />
    case "span":
      return <SpanFigure figure={figure} />
  }
}
