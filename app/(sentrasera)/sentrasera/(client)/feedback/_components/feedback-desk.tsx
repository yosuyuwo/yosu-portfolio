"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import { FeedbackThread } from "@/app/(sentrasera)/sentrasera/_components/feedback-thread"
import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTRPC } from "@/lib/trpc/client"

import { FeedbackComposer } from "./feedback-composer"

const STATUSES = ["all", "awaiting", "responded"] as const

export function FeedbackDesk() {
  const trpc = useTRPC()
  const t = useMessages()
  const feedback = useQuery(trpc.sentrasera.feedback.mine.queryOptions())
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(STATUSES).withDefault("all")
  )

  const visible = (feedback.data ?? []).filter((entry) => {
    if (status === "awaiting") return !entry.response
    if (status === "responded") return Boolean(entry.response)
    return true
  })

  return (
    <>
      <PageHeading
        title={t.feedback.title}
        description={t.feedback.description}
      />
      <div className="grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <FeedbackComposer />

        <section aria-label={t.feedback.listLabel}>
          <Tabs
            className="mb-4"
            value={status}
            onValueChange={(next) =>
              void setStatus(next as (typeof STATUSES)[number])
            }
          >
            <TabsList>
              <TabsTrigger value="all">{t.feedback.allTab}</TabsTrigger>
              <TabsTrigger value="awaiting">
                {t.feedback.awaitingTab}
              </TabsTrigger>
              <TabsTrigger value="responded">
                {t.feedback.respondedTab}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {feedback.isPending && <RowsSkeleton />}
          {feedback.error && (
            <QueryError
              message={feedback.error.message}
              onRetry={() => void feedback.refetch()}
            />
          )}
          {feedback.data && visible.length === 0 && (
            <EmptyState title={t.feedback.emptyTitle}>
              {t.feedback.emptyBody}
            </EmptyState>
          )}
          {visible.length > 0 && (
            <div className="divide-y divide-(--sera-rule) border-y border-(--sera-rule)">
              {visible.map((entry) => (
                <FeedbackThread key={entry.id} feedback={entry} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
