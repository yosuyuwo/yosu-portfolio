"use client"

import type { ReactNode } from "react"

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import type { ContactFormApi } from "../_hooks/use-contact-form"
import { todayIso } from "../_lib/start-date"

export const LABEL_CLASS =
  "font-mono text-[11px] font-normal tracking-[0.12em] text-muted-foreground uppercase"

// underlined fields echo the page's hairline rules; the inset shadow thickens the line on focus
export const LINE_FIELD_CLASS =
  "rounded-none border-0 border-b border-input bg-transparent px-0 text-base shadow-none focus-visible:border-brand focus-visible:shadow-[inset_0_-1px_0_0_var(--brand)] focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm dark:bg-transparent"

type FieldErrors = Array<{ message?: string } | undefined>

export function fieldStatus(meta: {
  isTouched: boolean
  isValid: boolean
  errors: unknown[]
}): { isInvalid: boolean; errors: FieldErrors } {
  return {
    isInvalid: meta.isTouched && !meta.isValid,
    errors: meta.errors as FieldErrors,
  }
}

type LineFieldProps = {
  name: string
  label: string
  isInvalid: boolean
  errors: FieldErrors
  children: ReactNode
}

export function LineField({
  name,
  label,
  isInvalid,
  errors,
  children,
}: LineFieldProps) {
  return (
    <Field data-invalid={isInvalid || undefined} className="gap-1">
      <FieldLabel htmlFor={name} className={LABEL_CLASS}>
        {label}
      </FieldLabel>
      {children}
      {isInvalid ? <FieldError errors={errors} className="text-xs" /> : null}
    </Field>
  )
}

type TextFieldProps = {
  form: ContactFormApi
  name: "name" | "email" | "subject"
  label: string
  placeholder: string
  type?: "text" | "email"
  autoComplete?: string
}

export function ContactTextField({
  form,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: TextFieldProps) {
  return (
    <form.Field name={name}>
      {(field) => {
        const status = fieldStatus(field.state.meta)
        return (
          <LineField name={field.name} label={label} {...status}>
            <Input
              id={field.name}
              name={field.name}
              type={type}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={status.isInvalid}
              autoComplete={autoComplete}
              placeholder={placeholder}
              className={cn("h-10", LINE_FIELD_CLASS)}
            />
          </LineField>
        )
      }}
    </form.Field>
  )
}

export function ContactStartDateField({ form }: { form: ContactFormApi }) {
  return (
    <form.Field name="startDate">
      {(field) => {
        const status = fieldStatus(field.state.meta)
        return (
          <LineField name={field.name} label="Expected start" {...status}>
            <Input
              id={field.name}
              name={field.name}
              type="date"
              min={todayIso()}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={status.isInvalid}
              placeholder="e.g. 2026-01-15"
              className={cn("h-10", LINE_FIELD_CLASS)}
            />
          </LineField>
        )
      }}
    </form.Field>
  )
}

export function ContactMessageField({
  form,
  placeholder,
  className,
}: {
  form: ContactFormApi
  placeholder: string
  className?: string
}) {
  return (
    <form.Field name="message">
      {(field) => {
        const status = fieldStatus(field.state.meta)
        return (
          <LineField name={field.name} label="Message" {...status}>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={status.isInvalid}
              rows={4}
              placeholder={placeholder}
              className={cn(
                "min-h-28 resize-none py-2",
                LINE_FIELD_CLASS,
                className
              )}
            />
          </LineField>
        )
      }}
    </form.Field>
  )
}

export function SubmitRow() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className={LABEL_CLASS}>Opens a draft in your email app</p>
      <Button
        type="submit"
        size="lg"
        className="px-4 has-data-[icon=inline-end]:pr-3"
      >
        Send message
        <ArrowUpRight data-icon="inline-end" />
      </Button>
    </div>
  )
}
