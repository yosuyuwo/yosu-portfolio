"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  TextareaField,
  TextField,
} from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import type { CalendarUpdate } from "@/app/(sentrasera)/sentrasera/_components/updates-calendar/types"
import { useCategoryOptions } from "@/app/(sentrasera)/sentrasera/_hooks/use-category-options"
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
import { updateInputSchema, type UpdateStatus } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

const NO_CATEGORY = "none"
const STATUS_OPTIONS = [
  { value: "planned", label: "Planned" },
  { value: "shipped", label: "Shipped" },
]

type Props = {
  update: CalendarUpdate | null
  onClose: () => void
}

export function UpdateFormDialog({ update, onClose }: Props) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const categoryOptions = useCategoryOptions()
  const handleError = (error: { message: string }) => toast.error(error.message)
  const create = useMutation(
    trpc.sentrasera.updates.create.mutationOptions({ onError: handleError })
  )
  const edit = useMutation(
    trpc.sentrasera.updates.edit.mutationOptions({ onError: handleError })
  )
  const form = useForm({
    defaultValues: {
      title: update?.title ?? "",
      description: update?.description ?? "",
      scheduledFor: update?.scheduledFor ?? "",
      status: (update?.status ?? "planned") as UpdateStatus,
      categoryId: update?.categoryId ?? null,
    },
    validators: { onSubmit: updateInputSchema },
    onSubmit: async ({ value }) => {
      if (update) {
        await edit.mutateAsync({ id: update.id, values: value })
      } else {
        await create.mutateAsync(value)
      }
      toast.success(update ? "Update saved" : "Update added")
      await invalidate()
      onClose()
    },
  })
  const isPending = create.isPending || edit.isPending

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{update ? "Edit update" : "Add update"}</DialogTitle>
        </DialogHeader>
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit().catch(() => undefined)
          }}
        >
          <form.Field name="title">
            {(field) => (
              <TextField
                field={field}
                label="Title"
                placeholder="e.g. Split bills at checkout"
              />
            )}
          </form.Field>
          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="What's changing"
                placeholder="Blank = title only"
                rows={3}
              />
            )}
          </form.Field>
          <form.Field name="scheduledFor">
            {(field) => (
              <TextField
                field={field}
                label="Date"
                type="date"
                placeholder="YYYY-MM-DD"
              />
            )}
          </form.Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="update-status">Status</FieldLabel>
                  <OptionSelect
                    id="update-status"
                    label="Status"
                    value={field.state.value}
                    options={STATUS_OPTIONS}
                    onChange={(value) =>
                      field.handleChange(value as UpdateStatus)
                    }
                  />
                </Field>
              )}
            </form.Field>
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="update-category">Category</FieldLabel>
                  <OptionSelect
                    id="update-category"
                    label="Category"
                    value={field.state.value ?? NO_CATEGORY}
                    options={[
                      { value: NO_CATEGORY, label: "No category" },
                      ...categoryOptions,
                    ]}
                    onChange={(value) =>
                      field.handleChange(value === NO_CATEGORY ? null : value)
                    }
                  />
                </Field>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
