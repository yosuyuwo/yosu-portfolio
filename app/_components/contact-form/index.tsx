"use client"

import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { buildMailtoUrl } from "./_lib/build-mailto-url"
import {
  CONTACT_DEFAULTS,
  CONTACT_INQUIRY_TYPES,
  CONTACT_INQUIRY_TYPE_LABELS,
  contactSchema,
  type ContactInquiryType,
} from "./_lib/contact-schema"

const MESSAGE_PLACEHOLDERS: Record<ContactInquiryType, string> = {
  idea: "What are you building?",
  role: "What's the role, and what does the team need?",
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
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid || undefined}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="name"
                  placeholder="Your name"
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid || undefined}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        />
        <form.Field
          name="inquiryType"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>What&apos;s this about?</FieldLabel>
              <Select
                items={CONTACT_INQUIRY_TYPE_LABELS}
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as ContactInquiryType)
                }
              >
                <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_INQUIRY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {CONTACT_INQUIRY_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <form.Field
          name="subject"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid || undefined}>
                <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Project or role"
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        />
        <form.Subscribe selector={(state) => state.values.inquiryType}>
          {(inquiryType) => (
            <form.Field
              name="message"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid || undefined}>
                    <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      rows={5}
                      placeholder={MESSAGE_PLACEHOLDERS[inquiryType]}
                    />
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : null}
                  </Field>
                )
              }}
            />
          )}
        </form.Subscribe>
      </FieldGroup>
      <Button type="submit" className="self-start">
        Open email
      </Button>
    </form>
  )
}
