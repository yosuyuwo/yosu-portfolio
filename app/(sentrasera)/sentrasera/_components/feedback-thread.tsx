import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { formatPilotDateTime } from "@/lib/sentrasera/dates"
import { pickText } from "@/lib/sentrasera/locale"

import { useLocale, useMessages } from "./portal-locale"

type Props = {
  feedback: {
    body: string
    createdAt: string
    categoryName: string | null
    categoryNameBahasa?: string | null
    response: string | null
    respondedAt: string | null
  }
  author?: string
  responseSlot?: ReactNode
}

export function FeedbackThread({ feedback, author, responseSlot }: Props) {
  const locale = useLocale()
  const t = useMessages()

  return (
    <article className="py-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {author && (
          <span className="text-sm font-medium text-foreground">{author}</span>
        )}
        <time dateTime={feedback.createdAt}>
          {formatPilotDateTime(feedback.createdAt, locale)}
        </time>
        {feedback.categoryName && (
          <Badge variant="outline">
            {pickText(
              locale,
              feedback.categoryName,
              feedback.categoryNameBahasa ?? null
            )}
          </Badge>
        )}
      </div>
      <p className="mt-2 text-sm whitespace-pre-wrap">{feedback.body}</p>

      {feedback.response ? (
        <div className="mt-3 border-l-2 border-primary pl-3">
          <p className="text-xs font-medium text-primary">
            {t.feedback.response}
            {feedback.respondedAt &&
              ` · ${formatPilotDateTime(feedback.respondedAt, locale)}`}
          </p>
          <p className="mt-1 text-sm whitespace-pre-wrap">
            {feedback.response}
          </p>
        </div>
      ) : (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-(--sera-awaiting)"
          />
          {t.feedback.awaitingResponse}
        </p>
      )}
      {responseSlot}
    </article>
  )
}
