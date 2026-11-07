"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { TextareaField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import {
  OptionSelect,
  type SelectOption,
} from "@/app/(sentrasera)/sentrasera/_components/option-select"
import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  QUESTION_KINDS,
  questionInputSchema,
  type QuestionKind,
} from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

import type { AdminQuestion } from "./questions-admin"

const KIND_OPTIONS: readonly SelectOption[] = [
  { value: "text", label: "Free text" },
  { value: "choice", label: "Single choice" },
  { value: "rating", label: "Rating 1–5" },
]

function toChoices(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function isQuestionKind(value: string): value is QuestionKind {
  return (QUESTION_KINDS as readonly string[]).includes(value)
}

type Props = {
  question: AdminQuestion | null
  categoryOptions: readonly SelectOption[]
  onClose: () => void
}

export function QuestionFormDialog({
  question,
  categoryOptions,
  onClose,
}: Props) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const handleError = (error: { message: string }) => toast.error(error.message)
  const create = useMutation(
    trpc.sentrasera.questions.create.mutationOptions({ onError: handleError })
  )
  const update = useMutation(
    trpc.sentrasera.questions.update.mutationOptions({ onError: handleError })
  )
  const createCategory = useMutation(
    trpc.sentrasera.categories.create.mutationOptions({ onError: handleError })
  )
  const [newCategory, setNewCategory] = useState("")

  const form = useForm({
    defaultValues: {
      categoryId: question?.categoryId ?? categoryOptions[0]?.value ?? "",
      prompt: question?.prompt ?? "",
      kind: (question?.kind ?? "text") as QuestionKind,
      choicesText: question?.choices.join("\n") ?? "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const parsed = questionInputSchema.safeParse({
          categoryId: value.categoryId,
          prompt: value.prompt,
          kind: value.kind,
          choices: toChoices(value.choicesText),
        })
        if (parsed.success) return undefined
        const fieldNames = { choices: "choicesText" } as Record<string, string>
        return {
          fields: Object.fromEntries(
            parsed.error.issues.map((issue) => {
              const name = String(issue.path[0])
              return [fieldNames[name] ?? name, { message: issue.message }]
            })
          ),
        }
      },
    },
    onSubmit: async ({ value }) => {
      const values = {
        categoryId: value.categoryId,
        prompt: value.prompt,
        kind: value.kind,
        choices: toChoices(value.choicesText),
      }
      if (question) {
        await update.mutateAsync({
          id: question.id,
          values,
          isActive: question.isActive,
        })
      } else {
        await create.mutateAsync(values)
      }
      toast.success(question ? "Question updated" : "Question added")
      await invalidate()
      onClose()
    },
  })
  const isPending = create.isPending || update.isPending

  async function addCategory() {
    const category = await createCategory.mutateAsync({ name: newCategory })
    await invalidate()
    form.setFieldValue("categoryId", category.id)
    setNewCategory("")
  }

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{question ? "Edit question" : "Add question"}</DialogTitle>
        </DialogHeader>
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit().catch(() => undefined)
          }}
        >
          <form.Field name="prompt">
            {(field) => (
              <TextareaField
                field={field}
                label="Question"
                placeholder="e.g. How easy was it to reconcile payments last week?"
                rows={3}
              />
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="question-category">Category</FieldLabel>
                  <OptionSelect
                    id="question-category"
                    label="Category"
                    value={field.state.value}
                    options={categoryOptions}
                    onChange={field.handleChange}
                  />
                  <div className="flex gap-2">
                    <Input
                      aria-label="New category name"
                      placeholder="Or add a new category"
                      value={newCategory}
                      onChange={(event) => setNewCategory(event.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!newCategory.trim() || createCategory.isPending}
                      onClick={() => void addCategory().catch(() => undefined)}
                    >
                      Add
                    </Button>
                  </div>
                </Field>
              )}
            </form.Field>

            <form.Field name="kind">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="question-kind">Answer type</FieldLabel>
                  <OptionSelect
                    id="question-kind"
                    label="Answer type"
                    value={field.state.value}
                    options={KIND_OPTIONS}
                    onChange={(value) => {
                      if (isQuestionKind(value)) field.handleChange(value)
                    }}
                  />
                </Field>
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(state) => state.values.kind}>
            {(kind) =>
              kind === "choice" && (
                <form.Field name="choicesText">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Choices, one per line
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        rows={4}
                        placeholder={"e.g. Very easy\nManageable\nDifficult"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              )
            }
          </form.Subscribe>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
