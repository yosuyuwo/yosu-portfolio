"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Button } from "@/components/ui/button"
import { formatPilotDateTime } from "@/lib/sentrasera/dates"
import { isValidAnswer, type QuestionKind } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

import { AnswerControl } from "./answer-control"

type Props = {
  question: {
    id: string
    prompt: string
    kind: QuestionKind
    choices: string[]
    answer: string | null
    answeredAt: string | null
  }
}

export function QuestionRow({ question }: Props) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const [isEditing, setIsEditing] = useState(question.answer === null)
  const [draft, setDraft] = useState(question.answer ?? "")
  const save = useMutation(
    trpc.sentrasera.questions.answer.mutationOptions({
      onSuccess: async () => {
        toast.success("Answer saved")
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    })
  )
  const canSave = isValidAnswer(question, draft) && !save.isPending

  return (
    <article className="grid gap-3 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
      <h3 className="text-base font-medium text-pretty">{question.prompt}</h3>

      {isEditing ? (
        <form
          className="flex flex-col items-start gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            if (canSave) save.mutate({ questionId: question.id, value: draft })
          }}
        >
          <AnswerControl
            questionId={question.id}
            kind={question.kind}
            choices={question.choices}
            value={draft}
            onChange={setDraft}
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={!canSave}>
              {save.isPending ? "Saving…" : "Save answer"}
            </Button>
            {question.answer !== null && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDraft(question.answer ?? "")
                  setIsEditing(false)
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm whitespace-pre-wrap">{question.answer}</p>
            {question.answeredAt && (
              <p className="mt-1 text-xs text-muted-foreground">
                {formatPilotDateTime(question.answeredAt)}
              </p>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </article>
  )
}
