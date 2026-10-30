"use client"

import { useForm } from "@tanstack/react-form"
import type { FormEvent } from "react"

import { buildMailtoUrl } from "../_lib/build-mailto-url"
import { CONTACT_DEFAULTS, contactSchema } from "../_lib/contact-schema"

export function useContactForm(onSubmitted?: () => void) {
  return useForm({
    defaultValues: CONTACT_DEFAULTS,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: ({ value }) => {
      window.location.href = buildMailtoUrl(value)
      onSubmitted?.()
    },
  })
}

export type ContactFormApi = ReturnType<typeof useContactForm>

export function submitHandler(form: ContactFormApi) {
  return (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }
}
