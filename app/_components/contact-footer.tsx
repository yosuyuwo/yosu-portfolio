"use client"

import { useContactDialog } from "@/app/_hooks/use-contact-dialog"
import {
  CONTACT_EMAIL,
  FOOTER_COPYRIGHT_NAME,
  RESUME_FILE,
  SITE_SOCIALS,
} from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { CONTACT_CTA, INTRO, SECTIONS } from "@/app/_lib/copy"
import { CONTENT_COLUMN, CONTENT_GRID, RAIL_GRID } from "@/app/_lib/page-grid"
import { ContactDialog } from "./contact-dialog"
import { FooterWordmark } from "./footer-wordmark"
import { LocalTime } from "./local-time"
import { SectionLabel } from "./section-label"

const META_CLASS = "font-mono text-[11px] tracking-[0.12em] uppercase"
const MUTED_CLASS = "text-muted-foreground max-md:text-background/60"
const LINK_CLASS = "transition-colors duration-fast hover:text-brand"

const COPYRIGHT = `© ${new Date().getFullYear()} ${FOOTER_COPYRIGHT_NAME}`

// on desktop the sticky sidebar already shows these, right above the footer
function MobileMeta() {
  const { setOpen } = useContactDialog()

  return (
    <div className={cn("grid gap-5 md:hidden", META_CLASS, MUTED_CLASS)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("flex items-center gap-2 text-left", LINK_CLASS)}
      >
        <span className="size-1.5 rounded-full bg-brand" />
        {INTRO.availability}
      </button>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li>
          <a
            href={RESUME_FILE.href}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            CV ↗
          </a>
        </li>
        {SITE_SOCIALS.filter((s) => s.id !== "email").map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              {social.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <div className="flex justify-between gap-4">
        <LocalTime />
        <span>{COPYRIGHT}</span>
      </div>
    </div>
  )
}

export function ContactFooter() {
  const { setOpen } = useContactDialog()
  return (
    <footer
      id="contact"
      className={cn(
        "overflow-hidden max-md:bg-foreground max-md:text-background",
        RAIL_GRID
      )}
    >
      <div
        className={cn(
          "hidden gap-1.5 px-7 pt-20 md:grid",
          META_CLASS,
          MUTED_CLASS
        )}
      >
        <p>{COPYRIGHT}</p>
        <LocalTime />
      </div>

      <div className={cn(CONTENT_COLUMN, "pt-14 md:pt-0")}>
        <div
          className={cn(
            CONTENT_GRID,
            "gap-y-8 md:border-t md:border-border md:pt-20"
          )}
        >
          <SectionLabel
            {...SECTIONS.contact}
            className="max-md:text-background/60 md:col-span-3"
          />
          <div className="grid gap-6 md:col-span-9 md:grid-cols-9">
            <p
              className={cn(
                "text-sm leading-relaxed md:col-span-4",
                MUTED_CLASS
              )}
            >
              {CONTACT_CTA.note}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn("text-sm md:col-span-3", LINK_CLASS)}
            >
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="justify-self-start text-sm underline decoration-current/30 underline-offset-4 transition-colors duration-fast hover:text-brand hover:decoration-brand md:col-span-2 md:justify-self-end"
            >
              Get in touch ↗
            </button>
          </div>
          <MobileMeta />
        </div>
      </div>

      <FooterWordmark />

      <ContactDialog />
    </footer>
  )
}
