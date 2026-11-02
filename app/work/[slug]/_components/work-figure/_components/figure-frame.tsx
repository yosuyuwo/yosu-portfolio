import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function FigureFrame({
  title,
  note,
  className,
  children,
}: {
  title?: string
  note?: string
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={cn("flex flex-col gap-5", className)}>
      {title ? (
        <figcaption className="font-medium text-balance">{title}</figcaption>
      ) : null}
      {children}
      {note ? (
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {note}
        </p>
      ) : null}
    </figure>
  )
}
