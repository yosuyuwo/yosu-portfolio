"use client"

import { useForm } from "@tanstack/react-form"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { buildMailtoUrl } from "./_lib/build-mailto-url"
import {
  CONTACT_DEFAULTS,
  CONTACT_INQUIRY_TYPES,
  contactSchema,
  type ContactInquiryType,
} from "./_lib/contact-schema"

const INQUIRY_OPTIONS: Record<
  ContactInquiryType,
  {
    title: string
    description: string
    subjectPlaceholder: string
    messagePlaceholder: string
  }
> = {
  idea: {
    title: "A project",
    description: "You have an idea to build",
    subjectPlaceholder: "e.g. Booking site for a fitness studio",
    messagePlaceholder:
      "What are you building, who is it for, and when would you like it live?",
  },
  role: {
    title: "A role",
    description: "You're hiring for your team",
    subjectPlaceholder: "e.g. Product Engineer at Acme",
    messagePlaceholder: "What's the role, and what does the team need?",
  },
}

const LABEL_CLASS =
  "font-mono text-[11px] font-normal tracking-[0.12em] text-muted-foreground uppercase"

// underlined fields echo the page's hairline rules; the inset shadow thickens the line on focus
const LINE_FIELD_CLASS =
  "rounded-none border-0 border-b border-input bg-transparent px-0 text-base shadow-none focus-visible:border-brand focus-visible:shadow-[inset_0_-1px_0_0_var(--brand)] focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm dark:bg-transparent"

type FieldErrors = Array<{ message?: string } | undefined>

type LineFieldProps = {
  name: string
  label: string
  isInvalid: boolean
  errors: FieldErrors
  children: ReactNode
}

function LineField({
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

function fieldStatus(meta: {
  isTouched: boolean
  isValid: boolean
  errors: unknown[]
}): { isInvalid: boolean; errors: FieldErrors } {
  return {
    isInvalid: meta.isTouched && !meta.isValid,
    errors: meta.errors as FieldErrors,
  }
}

export function ContactForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const form = useForm({
    defaultValues: CONTACT_DEFAULTS,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: ({ value }) => {
      window.location.href = buildMailtoUrl(value)
      onSubmitted?.()
    },
  })

  return (
    <form
      noValidate
      className="flex flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field name="inquiryType">
        {(field) => (
          <FieldSet className="gap-3">
            <FieldLegend variant="label" className={cn(LABEL_CLASS, "mb-0")}>
              What&apos;s this about?
            </FieldLegend>
            <RadioGroup
              name={field.name}
              value={field.state.value}
              onValueChange={(value) =>
                field.handleChange(value as ContactInquiryType)
              }
              className="grid-cols-2 gap-2"
            >
              {CONTACT_INQUIRY_TYPES.map((type) => (
                <FieldLabel
                  key={type}
                  htmlFor={`inquiry-${type}`}
                  className="transition-colors duration-fast hover:border-foreground/25 has-data-checked:border-brand/50 has-data-checked:bg-brand/5 dark:has-data-checked:border-brand/40 dark:has-data-checked:bg-brand/10"
                >
                  <Field orientation="horizontal" className="items-start">
                    <FieldContent>
                      <FieldTitle>{INQUIRY_OPTIONS[type].title}</FieldTitle>
                      <FieldDescription className="text-xs">
                        {INQUIRY_OPTIONS[type].description}
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      id={`inquiry-${type}`}
                      value={type}
                      className="mt-0.5 data-checked:border-brand data-checked:bg-brand"
                    />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.inquiryType}>
        {(inquiryType) => (
          <FieldGroup className="gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <form.Field name="name">
                {(field) => {
                  const status = fieldStatus(field.state.meta)
                  return (
                    <LineField name={field.name} label="Name" {...status}>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={status.isInvalid}
                        autoComplete="name"
                        placeholder="Your name"
                        className={cn("h-10", LINE_FIELD_CLASS)}
                      />
                    </LineField>
                  )
                }}
              </form.Field>
              <form.Field name="email">
                {(field) => {
                  const status = fieldStatus(field.state.meta)
                  return (
                    <LineField name={field.name} label="Email" {...status}>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={status.isInvalid}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={cn("h-10", LINE_FIELD_CLASS)}
                      />
                    </LineField>
                  )
                }}
              </form.Field>
            </div>

            <form.Field name="subject">
              {(field) => {
                const status = fieldStatus(field.state.meta)
                return (
                  <LineField name={field.name} label="Subject" {...status}>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={status.isInvalid}
                      placeholder={
                        INQUIRY_OPTIONS[inquiryType].subjectPlaceholder
                      }
                      className={cn("h-10", LINE_FIELD_CLASS)}
                    />
                  </LineField>
                )
              }}
            </form.Field>

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
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={status.isInvalid}
                      rows={4}
                      placeholder={
                        INQUIRY_OPTIONS[inquiryType].messagePlaceholder
                      }
                      className={cn(
                        "min-h-28 resize-none py-2",
                        LINE_FIELD_CLASS
                      )}
                    />
                  </LineField>
                )
              }}
            </form.Field>
          </FieldGroup>
        )}
      </form.Subscribe>

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
    </form>
  )
}
