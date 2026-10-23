"use client"

import { ArrowUpRightIcon } from "lucide-react"

import { ContactForm } from "@/app/_components/contact-form"
import { useContactDialog } from "@/app/_components/shell/_hooks/use-contact-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CONTACT,
  CONTACT_EMAIL,
  FOOTER_COPYRIGHT_NAME,
  SITE_SOCIALS,
} from "@/lib/site-content"

import { V2_CONTACT, V2_SECTIONS } from "../_lib/copy"
import { LocalTime } from "./local-time"
import { SectionLabel } from "./section-label"

const META_CLASS =
  "font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase"

export function ContactFooter() {
  const { open, setOpen } = useContactDialog()

  return (
    <footer
      id="contact"
      className="border-t border-(--v2-line) bg-(--v2-ink) text-(--v2-paper)"
    >
      <div className="mx-auto max-w-[100rem] px-4 pt-16 pb-8 md:px-8 md:pt-24">
        <SectionLabel
          {...V2_SECTIONS.contact}
          className="text-(--v2-paper)/60"
        />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-(--v2-paper)/70">
          {V2_CONTACT.note}
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mt-4 flex w-full items-end justify-between gap-4 border-b border-(--v2-paper)/15 pb-6 text-left focus-visible:outline-none"
        >
          <span className="text-[clamp(4rem,15vw,15rem)] leading-[0.85] font-semibold tracking-[-0.07em] transition-colors duration-normal group-hover:text-(--v2-accent) group-focus-visible:text-(--v2-accent)">
            {V2_CONTACT.headline}
          </span>
          <ArrowUpRightIcon
            aria-hidden
            className="mb-[2vw] size-[clamp(2.5rem,7vw,7rem)] shrink-0 stroke-[1.25] transition-[translate,color] duration-normal ease-out-expo group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-(--v2-accent)"
          />
        </button>

        <div className={`mt-8 grid gap-6 md:grid-cols-12 ${META_CLASS}`}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="normal-case transition-colors duration-fast hover:text-(--v2-accent) md:col-span-4"
          >
            {CONTACT_EMAIL}
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5">
            {SITE_SOCIALS.filter((s) => s.id !== "email").map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-fast hover:text-(--v2-accent)"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <LocalTime className="md:col-span-3 md:text-right" />
        </div>

        <p className={`mt-16 text-(--v2-paper)/50 ${META_CLASS}`}>
          © {new Date().getFullYear()} {FOOTER_COPYRIGHT_NAME}
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{CONTACT.dialogTitle}</DialogTitle>
            <DialogDescription>{CONTACT.dialogDescription}</DialogDescription>
          </DialogHeader>
          <ContactForm onSubmitted={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </footer>
  )
}
