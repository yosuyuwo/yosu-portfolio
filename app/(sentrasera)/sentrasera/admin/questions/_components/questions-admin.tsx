"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import type { inferRouterOutputs } from "@trpc/server"
import Link from "next/link"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { useState } from "react"
import { toast } from "sonner"

import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { useCategoryOptions } from "@/app/(sentrasera)/sentrasera/_hooks/use-category-options"
import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTRPC } from "@/lib/trpc/client"
import type { AppRouter } from "@/server/trpc/root"

import { QuestionFormDialog } from "./question-form-dialog"

export type AdminQuestion =
  inferRouterOutputs<AppRouter>["sentrasera"]["questions"]["listForAdmin"][number]

const ALL = "all"
const STATE_VALUES = ["open", "retired", ALL] as const
const STATE_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "retired", label: "Retired" },
  { value: ALL, label: "Open and retired" },
]
const KIND_LABELS = {
  text: "Free text",
  choice: "Single choice",
  rating: "Rating 1–5",
} as const

type DialogState = { question: AdminQuestion | null }

function pluralizeAnswers(count: number): string {
  return `${count} ${count === 1 ? "answer" : "answers"}`
}

export function QuestionsAdmin() {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const questions = useQuery(
    trpc.sentrasera.questions.listForAdmin.queryOptions()
  )
  const categoryOptions = useCategoryOptions()
  const [filters, setFilters] = useQueryStates({
    category: parseAsString.withDefault(ALL),
    state: parseAsStringLiteral(STATE_VALUES).withDefault("open"),
  })
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const setActive = useMutation(
    trpc.sentrasera.questions.update.mutationOptions({
      onSuccess: () => invalidate(),
      onError: (error) => toast.error(error.message),
    })
  )

  const visible = (questions.data ?? []).filter((question) => {
    const matchesCategory =
      filters.category === ALL || question.categoryId === filters.category
    const matchesState =
      filters.state === ALL ||
      question.isActive === (filters.state === "open")
    return matchesCategory && matchesState
  })
  const groups = [...Map.groupBy(visible, (q) => q.categoryName)]

  return (
    <>
      <PageHeading
        title="Questions"
        description="What pilot clients are asked. Retire a question to hide it from clients while keeping its answers."
        actions={
          <Button type="button" onClick={() => setDialog({ question: null })}>
            Add question
          </Button>
        }
      />
      <div className="mb-6 flex flex-wrap gap-3">
        <OptionSelect
          label="Filter by category"
          className="w-52"
          value={filters.category}
          options={[{ value: ALL, label: "All categories" }, ...categoryOptions]}
          onChange={(category) => void setFilters({ category })}
        />
        <OptionSelect
          label="Filter by state"
          className="w-48"
          value={filters.state}
          options={STATE_OPTIONS}
          onChange={(state) =>
            void setFilters({ state: state as (typeof STATE_VALUES)[number] })
          }
        />
      </div>

      {questions.isPending && <RowsSkeleton />}
      {questions.error && (
        <QueryError
          message={questions.error.message}
          onRetry={() => void questions.refetch()}
        />
      )}
      {questions.data && groups.length === 0 && (
        <EmptyState title="No questions here">
          Add a question, or change the filters above.
        </EmptyState>
      )}

      <div className="flex flex-col gap-10">
        {groups.map(([categoryName, items]) => (
          <section key={categoryName}>
            <h2 className="border-b border-foreground/80 pb-2 font-serif text-2xl">
              {categoryName}
            </h2>
            <ul className="divide-y divide-(--sera-rule)">
              {items.map((question) => (
                <li
                  key={question.id}
                  className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 py-4"
                >
                  <div className="min-w-0 flex-1 basis-80">
                    <p className="font-medium text-pretty">{question.prompt}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">
                        {KIND_LABELS[question.kind]}
                      </Badge>
                      <Link
                        href={`/admin/answers?question=${question.id}`}
                        className="underline-offset-2 hover:text-foreground hover:underline"
                      >
                        {pluralizeAnswers(question.answerCount)}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Switch
                        aria-label={`Open: ${question.prompt}`}
                        checked={question.isActive}
                        disabled={setActive.isPending}
                        onCheckedChange={(isActive) =>
                          setActive.mutate({
                            id: question.id,
                            isActive,
                            values: {
                              categoryId: question.categoryId,
                              prompt: question.prompt,
                              kind: question.kind,
                              choices: question.choices,
                            },
                          })
                        }
                      />
                      {question.isActive ? "Open" : "Retired"}
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setDialog({ question })}
                    >
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {dialog && (
        <QuestionFormDialog
          question={dialog.question}
          categoryOptions={categoryOptions}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  )
}
