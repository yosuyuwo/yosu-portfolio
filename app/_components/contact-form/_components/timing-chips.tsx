"use client"

import { Button } from "@/components/ui/button"

import type { ContactFormApi } from "../_hooks/use-contact-form"
import { addDaysIso } from "../_lib/start-date"

const TIMING_CHIPS = [
  { label: "Flexible", days: null },
  { label: "ASAP", days: 0 },
  { label: "In a month", days: 30 },
  { label: "In 3 months", days: 90 },
] as const

export function TimingChips({ form }: { form: ContactFormApi }) {
  return (
    <form.Field name="startDate">
      {(field) => (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Timing">
          {TIMING_CHIPS.map((chip) => {
            const value = chip.days === null ? "" : addDaysIso(chip.days)
            return (
              <Button
                key={chip.label}
                type="button"
                size="sm"
                variant={field.state.value === value ? "secondary" : "outline"}
                aria-pressed={field.state.value === value}
                onClick={() => field.handleChange(value)}
              >
                {chip.label}
              </Button>
            )
          })}
        </div>
      )}
    </form.Field>
  )
}
