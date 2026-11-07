import { cn } from "@/lib/utils"

type Props = {
  answered: number
  total: number
  size?: "regular" | "compact"
}

// one mark per question, so progress reads as work remaining rather than an abstract percentage
export function TickStrip({ answered, total, size = "regular" }: Props) {
  const ticks = Array.from({ length: total }, (_, index) => index < answered)

  return (
    <div
      role="img"
      aria-label={`${answered} of ${total} questions answered`}
      className="flex flex-wrap gap-0.75"
    >
      {ticks.map((isDone, index) => (
        <span
          key={index}
          className={cn(
            "w-1 rounded-[1px]",
            size === "regular" ? "h-5" : "h-3",
            isDone ? "bg-primary" : "bg-(--sera-tick-empty)"
          )}
        />
      ))}
    </div>
  )
}
