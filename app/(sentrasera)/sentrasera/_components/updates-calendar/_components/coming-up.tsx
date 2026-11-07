import { format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"

import { useLocale, useMessages } from "../../portal-locale"
import { DATE_LOCALES } from "../date-locales"
import type { CalendarUpdate } from "../types"

const MAX_COMING_UP = 5

type Props = {
  updates: readonly CalendarUpdate[]
  fromKey: string
  onSelect: (dateKey: string) => void
}

export function ComingUp({ updates, fromKey, onSelect }: Props) {
  const locale = useLocale()
  const t = useMessages()
  const upcoming = updates
    .filter(
      (update) => update.scheduledFor >= fromKey && update.status === "planned"
    )
    .slice(0, MAX_COMING_UP)

  return (
    <section aria-labelledby="coming-up">
      <h2 id="coming-up" className="font-serif text-2xl">
        {t.calendar.comingUp}
      </h2>
      {upcoming.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {t.calendar.noneScheduled}
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-(--sera-rule)">
          {upcoming.map((update) => (
            <li key={update.id}>
              <Button
                type="button"
                variant="ghost"
                className="h-auto w-full justify-start gap-3 px-0 py-2.5 text-left whitespace-normal hover:bg-transparent hover:text-primary"
                onClick={() => onSelect(update.scheduledFor)}
              >
                <span className="w-12 shrink-0 text-xs text-muted-foreground tabular-nums">
                  {format(parseISO(update.scheduledFor), "d MMM", {
                    locale: DATE_LOCALES[locale],
                  })}
                </span>
                <span className="text-sm font-normal">{update.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
