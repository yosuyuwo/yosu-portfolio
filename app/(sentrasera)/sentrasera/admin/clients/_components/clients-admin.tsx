"use client"

import { useQuery } from "@tanstack/react-query"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { useState } from "react"

import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  EmptyState,
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/lib/trpc/client"

import { ClientFormDialog } from "./client-form-dialog"
import { ClientsTable, type ClientRow } from "./clients-table"

const STATUS_VALUES = ["all", "active", "inactive"] as const
const STATUS_OPTIONS = [
  { value: "all", label: "All clients" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

type DialogState = { mode: "create" } | { mode: "edit"; client: ClientRow }

export function ClientsAdmin() {
  const trpc = useTRPC()
  const clients = useQuery(trpc.sentrasera.clients.list.queryOptions())
  const [filters, setFilters] = useQueryStates({
    q: parseAsString.withDefault(""),
    status: parseAsStringLiteral(STATUS_VALUES).withDefault("all"),
  })
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const search = filters.q.trim().toLowerCase()
  const visible = (clients.data?.clients ?? []).filter((client) => {
    const matchesStatus =
      filters.status === "all" ||
      client.isActive === (filters.status === "active")
    const matchesSearch =
      !search ||
      [client.organization, client.contactName, client.email].some((text) =>
        text.toLowerCase().includes(search)
      )
    return matchesStatus && matchesSearch
  })
  const hasNoClients = clients.data?.clients.length === 0

  return (
    <>
      <PageHeading
        title="Clients"
        description="Who's in the pilot, and how far each of them has got through the questions."
        actions={
          <Button type="button" onClick={() => setDialog({ mode: "create" })}>
            Add client
          </Button>
        }
      />

      {clients.isPending && <RowsSkeleton />}
      {clients.error && (
        <QueryError
          message={clients.error.message}
          onRetry={() => void clients.refetch()}
        />
      )}

      {clients.data && hasNoClients && (
        <EmptyState title="No clients yet">
          Add your first pilot client. They&apos;ll get an email inviting them to
          sign in.
        </EmptyState>
      )}

      {clients.data && !hasNoClients && (
        <>
          <div className="mb-4 flex flex-wrap gap-3">
            <Input
              aria-label="Search clients"
              placeholder="Search name, company, or email"
              className="max-w-xs"
              value={filters.q}
              onChange={(event) =>
                void setFilters({ q: event.target.value || null })
              }
            />
            <OptionSelect
              label="Filter by status"
              className="w-40"
              value={filters.status}
              options={STATUS_OPTIONS}
              onChange={(status) =>
                void setFilters({
                  status: status as (typeof STATUS_VALUES)[number],
                })
              }
            />
          </div>
          <ClientsTable
            clients={visible}
            totalQuestions={clients.data.totalQuestions}
            onEdit={(client) => setDialog({ mode: "edit", client })}
          />
        </>
      )}

      {dialog && (
        <ClientFormDialog
          client={dialog.mode === "edit" ? dialog.client : null}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  )
}
