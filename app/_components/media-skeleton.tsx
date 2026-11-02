import { Y_OFFSET, Y_PATH } from "@/app/_components/logo-mark"
import { cn } from "@/lib/utils"

export function MediaSkeleton({
  isShimmering = true,
  className,
}: {
  isShimmering?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden bg-muted",
        className
      )}
    >
      <svg viewBox="0 0 54 45" className="w-10 text-foreground/10 md:w-12">
        <path d={Y_PATH} fill="currentColor" />
        <path
          d={Y_PATH}
          fill="currentColor"
          transform={`translate(${Y_OFFSET} 0)`}
        />
      </svg>
      {isShimmering ? (
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent motion-safe:animate-shimmer dark:via-white/[0.06]" />
      ) : null}
    </span>
  )
}
