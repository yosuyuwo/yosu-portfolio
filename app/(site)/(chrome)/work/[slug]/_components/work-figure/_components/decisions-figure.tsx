import type { DecisionsFigure as DecisionsFigureData } from "@/app/_lib/work-item"

export function DecisionsFigure({ figure }: { figure: DecisionsFigureData }) {
  return (
    <ol className="flex flex-col">
      {figure.items.map((item) => (
        <li
          key={item.decision}
          className="grid gap-x-8 gap-y-3 border-t border-border py-7 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          <p className="text-lg leading-snug font-medium text-balance">
            {item.decision}
          </p>
          <p className="leading-relaxed text-pretty text-muted-foreground">
            <span className="sr-only">Why: </span>
            {item.why}
          </p>
        </li>
      ))}
    </ol>
  )
}
