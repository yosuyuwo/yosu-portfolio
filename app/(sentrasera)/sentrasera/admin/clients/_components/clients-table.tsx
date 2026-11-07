"use client"

import type { inferRouterOutputs } from "@trpc/server"

import { TickStrip } from "@/app/(sentrasera)/sentrasera/_components/tick-strip"
import { Badge } from "@/components/ui/badge"
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
import type { AppRouter } from "@/server/trpc/root"

export type ClientRow =
  inferRouterOutputs<AppRouter>["sentrasera"]["clients"]["list"]["clients"][number]

type Props = {
  clients: readonly ClientRow[]
  totalQuestions: number
  onEdit: (client: ClientRow) => void
}

function statusBadge(client: ClientRow) {
  if (!client.isActive) return <Badge variant="destructive">Inactive</Badge>
  if (!client.lastLoginAt) return <Badge variant="outline">Invited</Badge>
  return <Badge variant="secondary">Active</Badge>
}

export function ClientsTable({ clients, totalQuestions, onEdit }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Last sign-in</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>
              <p className="font-medium">{client.organization}</p>
              <p className="text-xs text-muted-foreground">
                {client.contactName} · {client.email}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex max-w-56 flex-col gap-1">
                <TickStrip
                  size="compact"
                  answered={client.answered}
                  total={totalQuestions}
                />
                <span className="text-xs text-muted-foreground tabular-nums">
                  {client.answered} of {totalQuestions}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {client.lastLoginAt
                ? formatPilotDateTime(client.lastLoginAt)
                : "Never"}
            </TableCell>
            <TableCell>{statusBadge(client)}</TableCell>
            <TableCell className="text-right">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onEdit(client)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
