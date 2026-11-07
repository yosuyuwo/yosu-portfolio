import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

import type { CalendarUpdate } from "../types"

export function UpdateEntry({
  update,
  actions,
}: {
  update: CalendarUpdate
  actions?: ReactNode
}) {
  return (
    <article className="border-l-2 border-primary pl-3">
      <h3 className="text-sm font-medium">{update.title}</h3>
      {update.description && (
        <p className="mt-1 text-sm whitespace-pre-wrap text-muted-foreground">
          {update.description}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge variant={update.status === "shipped" ? "secondary" : "outline"}>
          {update.status === "shipped" ? "Shipped" : "Planned"}
        </Badge>
        {update.categoryName && (
          <Badge variant="outline">{update.categoryName}</Badge>
        )}
      </div>
      {actions && <div className="mt-2 flex gap-1">{actions}</div>}
    </article>
  )
}
