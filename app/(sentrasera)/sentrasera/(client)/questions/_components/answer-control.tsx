"use client"

import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { ChoiceOption } from "@/lib/sentrasera/locale"
import { RATING_VALUES, type QuestionKind } from "@/lib/sentrasera/schemas"

type Props = {
  questionId: string
  kind: QuestionKind
  choices: readonly ChoiceOption[]
  value: string
  onChange: (value: string) => void
}

export function AnswerControl({
  questionId,
  kind,
  choices,
  value,
  onChange,
}: Props) {
  const t = useMessages()

  if (kind === "text") {
    return (
      <Textarea
        aria-label={t.questions.yourAnswer}
        placeholder={t.questions.answerPlaceholder}
        rows={3}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (kind === "choice") {
    return (
      <RadioGroup
        aria-label={t.questions.yourAnswer}
        value={value}
        onValueChange={(next) => onChange(String(next))}
      >
        {choices.map((choice, index) => {
          const id = `${questionId}-${index}`
          return (
            <div key={choice.value} className="flex items-center gap-2">
              <RadioGroupItem id={id} value={choice.value} />
              <Label htmlFor={id} className="font-normal">
                {choice.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">
        {t.questions.ratingLow}
      </span>
      <RadioGroup
        aria-label={t.questions.ratingLabel}
        className="flex w-auto gap-4"
        value={value}
        onValueChange={(next) => onChange(String(next))}
      >
        {RATING_VALUES.map((rating) => {
          const id = `${questionId}-${rating}`
          return (
            <div key={rating} className="flex flex-col items-center gap-1.5">
              <RadioGroupItem id={id} value={rating} />
              <Label htmlFor={id} className="font-normal tabular-nums">
                {rating}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
      <span className="text-xs text-muted-foreground">
        {t.questions.ratingHigh}
      </span>
    </div>
  )
}
