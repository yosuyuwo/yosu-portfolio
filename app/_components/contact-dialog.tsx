"use client"

import dynamic from "next/dynamic"

import { useContactDialog } from "@/app/_hooks/use-contact-dialog"
import { CONTACT_CTA, INTRO, SECTIONS } from "@/app/_lib/copy"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { CONTACT, CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-content"

import { LocalTime } from "./local-time"
import { SectionLabel } from "./section-label"

const ContactForm = dynamic(() =>
  import("@/app/_components/contact-form").then((m) => m.ContactForm)
)

const LABEL_CLASS =
  "font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"

function ContactAside() {
  return (
    <aside className="flex flex-col gap-5 border-b border-border p-6 md:border-r md:border-b-0 md:p-8">
      <SectionLabel {...SECTIONS.contact} />
      <DialogTitle className="text-[clamp(2rem,4vw,2.75rem)] leading-[1] font-medium tracking-[-0.04em]">
        {CONTACT_CTA.lead}{" "}
        <em className="font-serif text-[1.12em] font-normal tracking-normal text-brand">
          {CONTACT_CTA.emphasis}
        </em>
      </DialogTitle>
      <DialogDescription className="max-w-[34ch] leading-relaxed">
        {CONTACT.dialogDescription}
      </DialogDescription>

      <dl className="mt-auto hidden gap-3 border-t border-border pt-5 text-sm md:grid">
        <div className="grid gap-1">
          <dt className={LABEL_CLASS}>Email</dt>
          <dd>
            <a
              href={CONTACT_MAILTO}
              className="underline decoration-border underline-offset-4 transition-colors duration-fast hover:text-brand hover:decoration-brand"
            >
              {CONTACT_EMAIL}
            </a>
          </dd>
        </div>
        <div className="grid gap-1">
          <dt className={LABEL_CLASS}>Based in</dt>
          <dd>
            {INTRO.location}{" "}
            <LocalTime className="font-mono text-xs text-muted-foreground" />
          </dd>
        </div>
        <div className="grid gap-1">
          <dt className={LABEL_CLASS}>Status</dt>
          <dd className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            {INTRO.availability}
          </dd>
        </div>
      </dl>
    </aside>
  )
}

export function ContactDialog() {
  const { open, setOpen } = useContactDialog()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto p-0 sm:max-w-3xl md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ContactAside />
        <div className="p-6 md:p-8">
          <ContactForm onSubmitted={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
