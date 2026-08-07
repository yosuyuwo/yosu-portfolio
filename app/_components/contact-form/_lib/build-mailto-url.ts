import { CONTACT_MAILTO } from "@/lib/site-content"

import type { ContactValues } from "./contact-schema"

export function buildMailtoUrl(values: ContactValues): string {
  const body = [`From: ${values.name} <${values.email}>`, "", values.message].join(
    "\n",
  )
  const params = new URLSearchParams({
    subject: values.subject,
    body,
  })
  return `${CONTACT_MAILTO}?${params.toString()}`
}
