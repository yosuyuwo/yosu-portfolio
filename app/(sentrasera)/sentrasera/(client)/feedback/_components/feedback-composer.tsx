"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { TextareaField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { useCategoryOptions } from "@/app/(sentrasera)/sentrasera/_hooks/use-category-options"
import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { feedbackSubmitSchema } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

const GENERAL = "general"
const CATEGORY_FIELD_ID = "feedback-category"

export function FeedbackComposer() {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const categoryOptions = useCategoryOptions()
  const submit = useMutation(
    trpc.sentrasera.feedback.submit.mutationOptions({
      onError: (error) => toast.error(error.message),
    })
  )
  const form = useForm({
    defaultValues: {
      categoryId: null as string | null,
      body: "",
    },
    validators: { onSubmit: feedbackSubmitSchema },
    onSubmit: async ({ value, formApi }) => {
      await submit.mutateAsync(value)
      toast.success("Feedback sent")
      formApi.reset()
      await invalidate()
    },
  })

  return (
    <form
      noValidate
      aria-label="Send feedback"
      className="flex flex-col gap-4 self-start border-t border-foreground/80 pt-4 lg:sticky lg:top-6"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit().catch(() => undefined)
      }}
    >
      <form.Field name="categoryId">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={CATEGORY_FIELD_ID}>Topic</FieldLabel>
            <OptionSelect
              id={CATEGORY_FIELD_ID}
              label="Topic"
              value={field.state.value ?? GENERAL}
              options={[
                { value: GENERAL, label: "General" },
                ...categoryOptions,
              ]}
              onChange={(value) =>
                field.handleChange(value === GENERAL ? null : value)
              }
            />
          </Field>
        )}
      </form.Field>
      <form.Field name="body">
        {(field) => (
          <TextareaField
            field={field}
            label="Your feedback"
            placeholder="What happened, and what would make it better?"
            rows={6}
          />
        )}
      </form.Field>
      <Button type="submit" disabled={submit.isPending}>
        {submit.isPending ? "Sending…" : "Send feedback"}
      </Button>
    </form>
  )
}
