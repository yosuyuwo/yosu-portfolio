"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { RATING_VALUES, type QuestionKind } from "@/lib/sentrasera/schemas"

type Props = {
  questionId: string
  kind: QuestionKind
  choices: readonly string[]
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
  if (kind === "text") {
    return (
      <Textarea
        aria-label="Your answer"
        placeholder="Type your answer"
        rows={3}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (kind === "choice") {
    return (
      <RadioGroup
        aria-label="Your answer"
        value={value}
        onValueChange={(next) => onChange(String(next))}
      >
        {choices.map((choice, index) => {
          const id = `${questionId}-${index}`
          return (
            <div key={choice} className="flex items-center gap-2">
              <RadioGroupItem id={id} value={choice} />
              <Label htmlFor={id} className="font-normal">
                {choice}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">Poor</span>
      <RadioGroup
        aria-label="Your rating from 1 to 5"
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
      <span className="text-xs text-muted-foreground">Excellent</span>
    </div>
  )
}
