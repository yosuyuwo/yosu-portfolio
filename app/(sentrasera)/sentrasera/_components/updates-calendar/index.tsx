"use client"

import { format, isValid, parse } from "date-fns"
import { parseAsString, useQueryState } from "nuqs"
import { useMemo, type ReactNode } from "react"

import { Calendar } from "@/components/ui/calendar"
import { groupByDateKey, toPilotDateKey } from "@/lib/sentrasera/dates"
import { cn } from "@/lib/utils"

import { CalendarDay, CalendarItemsContext } from "./_components/calendar-day"
import { ComingUp } from "./_components/coming-up"
import { DayPanel } from "./_components/day-panel"
import type { CalendarFeedback, CalendarUpdate } from "./types"

const DATE_FORMAT = "yyyy-MM-dd"
const MONTH_FORMAT = "yyyy-MM"

function parseOr(value: string | null, pattern: string, fallback: Date): Date {
  if (!value) return fallback
  const parsed = parse(value, pattern, fallback)
  return isValid(parsed) ? parsed : fallback
}

type Props = {
  updates: readonly CalendarUpdate[]
  feedback: readonly CalendarFeedback[]
  showAuthor?: boolean
  renderUpdateActions?: (update: CalendarUpdate) => ReactNode
}

export function UpdatesCalendar({
  updates,
  feedback,
  showAuthor = false,
  renderUpdateActions,
}: Props) {
  const [monthParam, setMonthParam] = useQueryState("month", parseAsString)
  const [dateParam, setDateParam] = useQueryState("date", parseAsString)

  const today = useMemo(() => new Date(), [])
  const selectedDate = parseOr(dateParam, DATE_FORMAT, today)
  const visibleMonth = parseOr(monthParam, MONTH_FORMAT, selectedDate)
  const selectedKey = format(selectedDate, DATE_FORMAT)
  const todayKey = format(today, DATE_FORMAT)

  const items = useMemo(
    () => ({
      updatesByDay: groupByDateKey(updates, (update) => update.scheduledFor),
      feedbackByDay: groupByDateKey(feedback, (entry) =>
        toPilotDateKey(entry.createdAt)
      ),
    }),
    [updates, feedback]
  )

  function selectDay(key: string) {
    const date = parse(key, DATE_FORMAT, today)
    void setDateParam(key)
    void setMonthParam(format(date, MONTH_FORMAT))
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <CalendarItemsContext value={items}>
        <Calendar
          mode="single"
          required
          selected={selectedDate}
          month={visibleMonth}
          weekStartsOn={1}
          className="w-full bg-transparent p-0 [--cell-size:--spacing(9)]"
          classNames={{
            root: "w-full",
            month_caption:
              "flex h-(--cell-size) items-center justify-center font-serif text-2xl",
            caption_label: "font-serif text-2xl",
            weekday:
              "flex-1 pb-2 text-left text-xs font-normal text-muted-foreground",
            week: "flex w-full border-t border-(--sera-rule)",
            day: cn(
              "group/day relative min-h-14 flex-1 border-l border-(--sera-rule) p-0 first:border-l-0 sm:min-h-24"
            ),
            today: "",
            outside: "opacity-45",
          }}
          components={{ DayButton: CalendarDay }}
          onMonthChange={(month) =>
            void setMonthParam(format(month, MONTH_FORMAT))
          }
          onSelect={(date) => selectDay(format(date, DATE_FORMAT))}
        />
      </CalendarItemsContext>

      <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">
        <DayPanel
          date={selectedDate}
          updates={items.updatesByDay.get(selectedKey) ?? []}
          feedback={items.feedbackByDay.get(selectedKey) ?? []}
          showAuthor={showAuthor}
          renderUpdateActions={renderUpdateActions}
        />
        <ComingUp updates={updates} fromKey={todayKey} onSelect={selectDay} />
      </aside>
    </div>
  )
}
