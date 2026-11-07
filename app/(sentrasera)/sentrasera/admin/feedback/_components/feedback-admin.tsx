"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

import { FeedbackThread } from "@/app/(sentrasera)/sentrasera/_components/feedback-thread"
import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { downloadCsv } from "@/app/(sentrasera)/sentrasera/_lib/download-csv"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTRPC } from "@/lib/trpc/client"

import { RespondForm } from "./respond-form"

const ALL = "all"
const STATUSES = ["awaiting", "responded", ALL] as const
const CSV_HEADERS = [
  "Submitted at",
  "Organization",
  "Contact",
  "Category",
  "Feedback",
  "Response",
  "Responded at",
] as const

export function FeedbackAdmin() {
  const trpc = useTRPC()
  const feedback = useQuery(trpc.sentrasera.feedback.all.queryOptions())
  const clients = useQuery(trpc.sentrasera.clients.list.queryOptions())
  const [filters, setFilters] = useQueryStates({
    status: parseAsStringLiteral(STATUSES).withDefault("awaiting"),
    client: parseAsString.withDefault(ALL),
  })

  const all = feedback.data ?? []
  const awaitingCount = all.filter((entry) => !entry.response).length
  const clientOptions = [
    { value: ALL, label: "All clients" },
    ...(clients.data?.clients ?? []).map((client) => ({
      value: client.id,
      label: client.organization || client.contactName,
    })),
  ]
  const visible = all.filter((entry) => {
    const matchesClient =
      filters.client === ALL || entry.clientId === filters.client
    if (filters.status === "awaiting") return matchesClient && !entry.response
    if (filters.status === "responded") {
      return matchesClient && Boolean(entry.response)
    }
    return matchesClient
  })

  function exportCsv() {
    downloadCsv(
      "sentrasera-feedback.csv",
      CSV_HEADERS,
      visible.map((entry) => [
        entry.createdAt,
        entry.organization,
        entry.contactName,
        entry.categoryName,
        entry.body,
        entry.response,
        entry.respondedAt,
      ])
    )
  }

  return (
    <>
      <PageHeading
        title="Feedback"
        description="Clients see your response here and on their calendar."
        actions={
          <Button
            type="button"
            variant="outline"
            disabled={visible.length === 0}
            onClick={exportCsv}
          >
            Export CSV
          </Button>
        }
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={filters.status}
          onValueChange={(status) =>
            void setFilters({ status: status as (typeof STATUSES)[number] })
          }
        >
          <TabsList>
            <TabsTrigger value="awaiting">
              Awaiting ({awaitingCount})
            </TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
            <TabsTrigger value={ALL}>All</TabsTrigger>
          </TabsList>
        </Tabs>
        <OptionSelect
          label="Filter by client"
          className="w-52"
          value={filters.client}
          options={clientOptions}
          onChange={(client) => void setFilters({ client })}
        />
      </div>

      {feedback.isPending && <RowsSkeleton />}
      {feedback.error && (
        <QueryError
          message={feedback.error.message}
          onRetry={() => void feedback.refetch()}
        />
      )}
      {feedback.data && visible.length === 0 && (
        <EmptyState
          title={
            filters.status === "awaiting" ? "Inbox clear" : "Nothing here yet"
          }
        />
      )}
      {visible.length > 0 && (
        <div className="divide-y divide-(--sera-rule) border-y border-(--sera-rule)">
          {visible.map((entry) => (
            <FeedbackThread
              key={entry.id}
              feedback={entry}
              author={entry.organization || entry.contactName}
              responseSlot={
                <RespondForm
                  key={entry.respondedAt ?? entry.id}
                  feedbackId={entry.id}
                  currentResponse={entry.response}
                />
              }
            />
          ))}
        </div>
      )}
    </>
  )
}
