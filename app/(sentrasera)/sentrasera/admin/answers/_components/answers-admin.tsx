"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsString, useQueryStates } from "nuqs"

import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { useCategoryOptions } from "@/app/(sentrasera)/sentrasera/_hooks/use-category-options"
import { downloadCsv } from "@/app/(sentrasera)/sentrasera/_lib/download-csv"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPilotDateTime } from "@/lib/sentrasera/dates"
import { useTRPC } from "@/lib/trpc/client"

const ALL = "all"
const CSV_HEADERS = [
  "Category",
  "Question",
  "Organization",
  "Contact",
  "Answer",
  "Answered at",
] as const

export function AnswersAdmin() {
  const trpc = useTRPC()
  const answers = useQuery(trpc.sentrasera.questions.allAnswers.queryOptions())
  const clients = useQuery(trpc.sentrasera.clients.list.queryOptions())
  const categoryOptions = useCategoryOptions()
  const [filters, setFilters] = useQueryStates({
    client: parseAsString.withDefault(ALL),
    category: parseAsString.withDefault(ALL),
    question: parseAsString,
  })

  const clientOptions = [
    { value: ALL, label: "All clients" },
    ...(clients.data?.clients ?? []).map((client) => ({
      value: client.id,
      label: client.organization || client.contactName,
    })),
  ]
  const visible = (answers.data ?? []).filter(
    (answer) =>
      (filters.client === ALL || answer.clientId === filters.client) &&
      (filters.category === ALL || answer.categoryId === filters.category) &&
      (!filters.question || answer.questionId === filters.question)
  )

  function exportCsv() {
    downloadCsv(
      "sentrasera-answers.csv",
      CSV_HEADERS,
      visible.map((answer) => [
        answer.categoryName,
        answer.prompt,
        answer.organization,
        answer.contactName,
        answer.value,
        answer.updatedAt,
      ])
    )
  }

  return (
    <>
      <PageHeading
        title="Answers"
        description="Everything pilot clients have told you, by question."
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
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <OptionSelect
          label="Filter by client"
          className="w-52"
          value={filters.client}
          options={clientOptions}
          onChange={(client) => void setFilters({ client })}
        />
        <OptionSelect
          label="Filter by category"
          className="w-52"
          value={filters.category}
          options={[{ value: ALL, label: "All categories" }, ...categoryOptions]}
          onChange={(category) => void setFilters({ category })}
        />
        {filters.question && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => void setFilters({ question: null })}
          >
            Show all questions
          </Button>
        )}
      </div>

      {answers.isPending && <RowsSkeleton />}
      {answers.error && (
        <QueryError
          message={answers.error.message}
          onRetry={() => void answers.refetch()}
        />
      )}
      {answers.data && visible.length === 0 && (
        <EmptyState title="No answers yet">
          Answers appear here as soon as clients save them.
        </EmptyState>
      )}
      {visible.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5">Question</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="w-2/5">Answer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((answer) => (
              <TableRow key={`${answer.questionId}:${answer.clientId}`}>
                <TableCell className="align-top whitespace-normal">
                  <p className="font-medium text-pretty">{answer.prompt}</p>
                  <p className="text-xs text-muted-foreground">
                    {answer.categoryName}
                  </p>
                </TableCell>
                <TableCell className="align-top whitespace-normal">
                  <p>{answer.organization || answer.contactName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPilotDateTime(answer.updatedAt)}
                  </p>
                </TableCell>
                <TableCell className="align-top whitespace-pre-wrap">
                  {answer.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
