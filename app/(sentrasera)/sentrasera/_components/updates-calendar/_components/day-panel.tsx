import { format } from "date-fns"
import type { ReactNode } from "react"

import { FeedbackThread } from "../../feedback-thread"
import { useLocale, useMessages } from "../../portal-locale"
import { DATE_LOCALES } from "../date-locales"
import type { CalendarFeedback, CalendarUpdate } from "../types"
import { UpdateEntry } from "./update-entry"

type Props = {
  date: Date
  updates: readonly CalendarUpdate[]
  feedback: readonly CalendarFeedback[]
  showAuthor: boolean
  renderUpdateActions?: (update: CalendarUpdate) => ReactNode
}

export function DayPanel({
  date,
  updates,
  feedback,
  showAuthor,
  renderUpdateActions,
}: Props) {
  const locale = useLocale()
  const t = useMessages()
  const isEmpty = updates.length === 0 && feedback.length === 0

  return (
    <section aria-live="polite" aria-labelledby="selected-day">
      <h2 id="selected-day" className="font-serif text-2xl">
        {format(date, "EEEE, d MMMM", { locale: DATE_LOCALES[locale] })}
      </h2>

      {isEmpty && (
        <p className="mt-2 text-sm text-muted-foreground">
          {t.calendar.nothingOnDay}
        </p>
      )}

      {updates.length > 0 && (
        <div className="mt-4 flex flex-col gap-4">
          {updates.map((update) => (
            <UpdateEntry
              key={update.id}
              update={update}
              actions={renderUpdateActions?.(update)}
            />
          ))}
        </div>
      )}

      {feedback.length > 0 && (
        <div className="mt-5 divide-y divide-(--sera-rule) border-t border-(--sera-rule)">
          {feedback.map((entry) => (
            <FeedbackThread
              key={entry.id}
              feedback={entry}
              author={
                showAuthor
                  ? entry.organization || entry.contactName
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
