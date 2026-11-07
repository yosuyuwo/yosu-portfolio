"use client"

import type { AnyFieldApi } from "@tanstack/react-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FieldProps = {
  field: AnyFieldApi
  label: string
  placeholder: string
}

function visibleErrors(field: AnyFieldApi) {
  return field.state.meta.isTouched ? field.state.meta.errors : []
}

export function TextField({
  field,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: FieldProps & { type?: string; autoComplete?: string }) {
  const errors = visibleErrors(field)
  return (
    <Field data-invalid={errors.length > 0}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={field.state.value}
        aria-invalid={errors.length > 0}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      <FieldError errors={errors} />
    </Field>
  )
}

export function TextareaField({
  field,
  label,
  placeholder,
  rows = 4,
}: FieldProps & { rows?: number }) {
  const errors = visibleErrors(field)
  return (
    <Field data-invalid={errors.length > 0}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        rows={rows}
        placeholder={placeholder}
        value={field.state.value}
        aria-invalid={errors.length > 0}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      <FieldError errors={errors} />
    </Field>
  )
}
