"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { TextareaField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { OptionSelect } from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
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
  const t = useMessages()
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
    validators: {
      onSubmit: ({ value }) => {
        if (feedbackSubmitSchema.safeParse(value).success) return undefined
        const message = value.body.trim()
          ? t.feedback.bodyTooLong
          : t.feedback.bodyRequired
        return { fields: { body: { message } } }
      },
    },
    onSubmit: async ({ value, formApi }) => {
      await submit.mutateAsync(value)
      toast.success(t.feedback.sent)
      formApi.reset()
      await invalidate()
    },
  })

  return (
    <form
      noValidate
      aria-label={t.feedback.formLabel}
      className="flex flex-col gap-4 self-start border-t border-foreground/80 pt-4 lg:sticky lg:top-6"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit().catch(() => undefined)
      }}
    >
      <form.Field name="categoryId">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={CATEGORY_FIELD_ID}>
              {t.feedback.topic}
            </FieldLabel>
            <OptionSelect
              id={CATEGORY_FIELD_ID}
              label={t.feedback.topic}
              value={field.state.value ?? GENERAL}
              options={[
                { value: GENERAL, label: t.feedback.general },
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
            label={t.feedback.bodyLabel}
            placeholder={t.feedback.bodyPlaceholder}
            rows={6}
          />
        )}
      </form.Field>
      <Button type="submit" disabled={submit.isPending}>
        {submit.isPending ? t.feedback.sending : t.feedback.send}
      </Button>
    </form>
  )
}
