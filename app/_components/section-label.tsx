import { cn } from "@/lib/utils"

export function SectionLabel({
  index,
  label,
  className,
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase",
        className
      )}
    >
      <span className="text-brand">({index})</span> {label}
    </p>
  )
}
