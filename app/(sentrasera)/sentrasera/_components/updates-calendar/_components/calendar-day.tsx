"use client"

import { format } from "date-fns"
import { createContext, use, type ComponentProps } from "react"
import type { DayButton } from "react-day-picker"

import { CalendarDayButton } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import type { CalendarFeedback, CalendarUpdate } from "../types"

const MAX_VISIBLE_UPDATES = 2

type CalendarItems = {
  updatesByDay: ReadonlyMap<string, readonly CalendarUpdate[]>
  feedbackByDay: ReadonlyMap<string, readonly CalendarFeedback[]>
}

export const CalendarItemsContext = createContext<CalendarItems>({
  updatesByDay: new Map(),
  feedbackByDay: new Map(),
})

export function CalendarDay({
  day,
  modifiers,
  className,
  ...props
}: ComponentProps<typeof DayButton>) {
  const { updatesByDay, feedbackByDay } = use(CalendarItemsContext)
  const key = format(day.date, "yyyy-MM-dd")
  const updates = updatesByDay.get(key) ?? []
  const feedback = feedbackByDay.get(key) ?? []
  const awaitingCount = feedback.filter((entry) => !entry.response).length
  const hiddenCount = updates.length - MAX_VISIBLE_UPDATES

  const summary = [
    updates.length > 0 && `${updates.length} updates`,
    feedback.length > 0 && `${feedback.length} feedback`,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <CalendarDayButton
      {...props}
      day={day}
      modifiers={modifiers}
      aria-label={[props["aria-label"], summary].filter(Boolean).join(", ")}
      className={cn(
        className,
        "absolute inset-0 aspect-auto h-full min-w-0 items-stretch justify-start gap-1 overflow-hidden rounded-none p-1 text-left whitespace-normal hover:bg-muted sm:p-1.5",
        "data-[selected-single=true]:bg-accent data-[selected-single=true]:text-foreground data-[selected-single=true]:hover:bg-accent"
      )}
    >
      <div
        className={cn(
          "flex size-5 items-center justify-center rounded-full text-xs tabular-nums",
          modifiers.today && "bg-primary font-medium text-primary-foreground"
        )}
      >
        {day.date.getDate()}
      </div>

      <div className="hidden min-w-0 flex-col gap-0.5 sm:flex">
        {updates.slice(0, MAX_VISIBLE_UPDATES).map((update) => (
          <div
            key={update.id}
            className={cn(
              "truncate rounded-[3px] border-l-2 border-primary bg-card px-1 py-0.5 text-[0.6875rem] leading-tight",
              update.status === "shipped" && "text-muted-foreground line-through"
            )}
          >
            {update.title}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div className="px-1 text-[0.6875rem] text-muted-foreground">
            +{hiddenCount} more
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center gap-1">
        {updates.length > 0 && (
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-primary sm:hidden"
          />
        )}
        {feedback.length > 0 && (
          <span
            aria-hidden
            className={cn(
              "size-1.5 rotate-45 rounded-[1px]",
              awaitingCount > 0
                ? "bg-(--sera-awaiting)"
                : "bg-muted-foreground"
            )}
          />
        )}
      </div>
    </CalendarDayButton>
  )
}
