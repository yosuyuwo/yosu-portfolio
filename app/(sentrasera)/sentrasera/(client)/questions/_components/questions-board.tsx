"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { TickStrip } from "@/app/(sentrasera)/sentrasera/_components/tick-strip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTRPC } from "@/lib/trpc/client"

import { QuestionRow } from "./question-row"

const STATUSES = ["pending", "answered"] as const
const ALL_CATEGORIES = "all"

export function QuestionsBoard() {
  const trpc = useTRPC()
  const questions = useQuery(
    trpc.sentrasera.questions.listForClient.queryOptions()
  )
  const [filters, setFilters] = useQueryStates({
    status: parseAsStringLiteral(STATUSES).withDefault("pending"),
    category: parseAsString.withDefault(ALL_CATEGORIES),
  })

  const all = questions.data ?? []
  const answered = all.filter((question) => question.answer !== null)
  const pending = all.filter((question) => question.answer === null)
  const inStatus = filters.status === "pending" ? pending : answered
  const visible = inStatus.filter(
    (question) =>
      filters.category === ALL_CATEGORIES ||
      question.categoryId === filters.category
  )
  const categoryOptions = [
    { value: ALL_CATEGORIES, label: "All categories" },
    ...[...new Map(all.map((q) => [q.categoryId, q.categoryName]))].map(
      ([value, label]) => ({ value, label })
    ),
  ]
  const groups = [
    ...Map.groupBy(visible, (question) => question.categoryName),
  ]

  return (
    <>
      <PageHeading
        title="Questions"
        description="Your answers shape what we build next. You can change an answer at any time."
      />

      {questions.isPending && <RowsSkeleton />}
      {questions.error && (
        <QueryError
          message={questions.error.message}
          onRetry={() => void questions.refetch()}
        />
      )}

      {questions.data && (
        <>
          <div className="mb-8 flex flex-col gap-2">
            <TickStrip answered={answered.length} total={all.length} />
            <p className="text-sm text-muted-foreground tabular-nums">
              {answered.length} of {all.length} answered
            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Tabs
              value={filters.status}
              onValueChange={(status) =>
                void setFilters({ status: status as (typeof STATUSES)[number] })
              }
            >
              <TabsList>
                <TabsTrigger value="pending">
                  Pending ({pending.length})
                </TabsTrigger>
                <TabsTrigger value="answered">
                  Answered ({answered.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <OptionSelect
              label="Filter by category"
              className="w-48"
              value={filters.category}
              options={categoryOptions}
              onChange={(category) => void setFilters({ category })}
            />
          </div>

          {groups.length === 0 && (
            <EmptyState
              title={
                filters.status === "pending"
                  ? "You're all caught up"
                  : "Nothing answered here yet"
              }
            >
              {filters.status === "pending"
                ? "New questions will appear here as the pilot goes on."
                : "Answers you give will be kept here."}
            </EmptyState>
          )}

          <div className="flex flex-col gap-10">
            {groups.map(([categoryName, items]) => (
              <section key={categoryName}>
                <h2 className="border-b border-foreground/80 pb-2 font-serif text-2xl">
                  {categoryName}
                </h2>
                <div className="divide-y divide-(--sera-rule)">
                  {items.map((question) => (
                    <QuestionRow
                      key={`${question.id}:${question.answeredAt}`}
                      question={question}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </>
  )
}
