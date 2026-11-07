"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { PageHeading } from "@/app/(sentrasera)/sentrasera/_components/page-heading"
import {
  QueryError,
  RowsSkeleton,
} from "@/app/(sentrasera)/sentrasera/_components/query-states"
import { UpdatesCalendar } from "@/app/(sentrasera)/sentrasera/_components/updates-calendar"
import type { CalendarUpdate } from "@/app/(sentrasera)/sentrasera/_components/updates-calendar/types"
import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/lib/trpc/client"

import { UpdateFormDialog } from "./update-form-dialog"

type DialogState = { update: CalendarUpdate | null }

function RemoveUpdateButton({ update }: { update: CalendarUpdate }) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const remove = useMutation(
    trpc.sentrasera.updates.remove.mutationOptions({
      onSuccess: async () => {
        toast.success("Update removed")
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    })
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button type="button" size="xs" variant="ghost">
            Remove
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove “{update.title}”?</AlertDialogTitle>
          <AlertDialogDescription>
            It disappears from every client&apos;s calendar and can&apos;t be
            restored.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction onClick={() => remove.mutate({ id: update.id })}>
            Remove update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function CalendarAdmin() {
  const trpc = useTRPC()
  const updates = useQuery(trpc.sentrasera.updates.list.queryOptions())
  const feedback = useQuery(trpc.sentrasera.feedback.all.queryOptions())
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const error = updates.error ?? feedback.error

  return (
    <>
      <PageHeading
        title="Calendar"
        description="Updates here appear on every client's calendar. Feedback is shown only to you and the client who sent it."
        actions={
          <Button type="button" onClick={() => setDialog({ update: null })}>
            Add update
          </Button>
        }
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
        <UpdatesCalendar
          showAuthor
          updates={updates.data}
          feedback={feedback.data}
          renderUpdateActions={(update) => (
            <>
              <Button
                type="button"
                size="xs"
                variant="ghost"
                onClick={() => setDialog({ update })}
              >
                Edit
              </Button>
              <RemoveUpdateButton update={update} />
            </>
          )}
        />
      )}
      {dialog && (
        <UpdateFormDialog
          update={dialog.update}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  )
}
