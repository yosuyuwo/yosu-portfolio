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
        "font-(family-name:--font-v2-mono) text-[11px] tracking-[0.14em] text-(--v2-muted) uppercase",
        className
      )}
    >
      <span className="text-(--v2-accent)">({index})</span> {label}
    </p>
  )
}
