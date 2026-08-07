import { cn } from "@/lib/utils"

export function Colon({ lit }: { lit: boolean }) {
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
