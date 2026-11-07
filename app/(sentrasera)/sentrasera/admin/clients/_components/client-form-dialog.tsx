"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"

import { TextField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { clientCreateSchema } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

import type { ClientRow } from "./clients-table"

const clientFormSchema = clientCreateSchema.extend({ isActive: z.boolean() })

type Props = {
  client: ClientRow | null
  onClose: () => void
}

export function ClientFormDialog({ client, onClose }: Props) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const handleError = (error: { message: string }) => toast.error(error.message)
  const create = useMutation(
    trpc.sentrasera.clients.create.mutationOptions({ onError: handleError })
  )
  const update = useMutation(
    trpc.sentrasera.clients.update.mutationOptions({ onError: handleError })
  )
  const form = useForm({
    defaultValues: {
      email: client?.email ?? "",
      contactName: client?.contactName ?? "",
      organization: client?.organization ?? "",
      isActive: client?.isActive ?? true,
    },
    validators: { onSubmit: clientFormSchema },
    onSubmit: async ({ value }) => {
      if (client) {
        await update.mutateAsync({
          userId: client.id,
          contactName: value.contactName,
          organization: value.organization,
          isActive: value.isActive,
        })
        toast.success("Client updated")
      } else {
        await create.mutateAsync(value)
        toast.success(`Client added. Emailing an invitation to ${value.email}`)
      }
      await invalidate()
      onClose()
    },
  })
  const isPending = create.isPending || update.isPending

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Edit client" : "Add client"}</DialogTitle>
        </DialogHeader>
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit().catch(() => undefined)
          }}
        >
          <form.Field name="organization">
            {(field) => (
              <TextField
                field={field}
                label="Organization"
                placeholder="e.g. Hotel Candra"
              />
            )}
          </form.Field>
          <form.Field name="contactName">
            {(field) => (
              <TextField
                field={field}
                label="Contact name"
                placeholder="e.g. Dewi Lestari"
              />
            )}
          </form.Field>
          {client ? (
            <form.Field name="isActive">
              {(field) => (
                <Field orientation="horizontal">
                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <FieldLabel htmlFor={field.name}>
                    Can sign in to the portal
                  </FieldLabel>
                </Field>
              )}
            </form.Field>
          ) : (
            <form.Field name="email">
              {(field) => (
                <TextField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="name@company.com"
                />
              )}
            </form.Field>
          )}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : client ? "Save changes" : "Add client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
