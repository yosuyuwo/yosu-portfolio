"use client"

import {
  ContactMessageField,
  ContactStartDateField,
  ContactTextField,
  LABEL_CLASS,
  SubmitRow,
} from "./_components/line-field"
import { TimingChips } from "./_components/timing-chips"
import { submitHandler, useContactForm } from "./_hooks/use-contact-form"

export function ContactForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const form = useContactForm(onSubmitted)

  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={submitHandler(form)}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <ContactTextField
          form={form}
          name="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
        />
        <ContactTextField
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-3">
        <p className={LABEL_CLASS}>When would you like to start?</p>
        <TimingChips form={form} />
        <ContactStartDateField form={form} />
      </div>

      <ContactTextField
        form={form}
        name="subject"
        label="Subject"
        placeholder="e.g. Booking site, or a Product Engineer role"
      />
      <ContactMessageField
        form={form}
        placeholder="What are you building or hiring for, and what does the team need?"
      />
      <SubmitRow />
    </form>
  )
}
