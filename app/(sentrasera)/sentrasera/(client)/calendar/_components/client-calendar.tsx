"use client"

import { useQuery } from "@tanstack/react-query"

import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { UpdatesCalendar } from "@/app/(sentrasera)/sentrasera/_components/updates-calendar"
import { useTRPC } from "@/lib/trpc/client"

export function ClientCalendar() {
  const trpc = useTRPC()
  const t = useMessages()
  const updates = useQuery(trpc.sentrasera.updates.list.queryOptions())
  const feedback = useQuery(trpc.sentrasera.feedback.mine.queryOptions())
  const error = updates.error ?? feedback.error

  return (
    <>
      <PageHeading
        title={t.calendar.title}
        description={t.calendar.description}
      />
      {(updates.isPending || feedback.isPending) && !error && <RowsSkeleton />}
      {error && (
        <QueryError
          message={error.message}
          onRetry={() => {
            void updates.refetch()
            void feedback.refetch()
          }}
        />
      )}
      {updates.data && feedback.data && (
        <UpdatesCalendar updates={updates.data} feedback={feedback.data} />
      )}
    </>
  )
}
