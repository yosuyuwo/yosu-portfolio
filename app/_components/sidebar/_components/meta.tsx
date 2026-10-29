"use client"

import { LocalTime } from "@/app/_components/local-time"
import { useContactDialog } from "@/app/_hooks/use-contact-dialog"
import { INTRO } from "@/app/_lib/copy"
import { RESUME_FILE, SITE_SOCIALS } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { LINK_CLASS, META_CLASS } from "../_lib/link-class"

export function Meta() {
  const { setOpen } = useContactDialog()

  return (
    <div
      data-enter
      className={cn(
        "mt-auto flex flex-col gap-5 text-muted-foreground",
        META_CLASS
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("flex items-center gap-2 text-left", LINK_CLASS)}
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        {INTRO.availability}
      </button>

      <ul className="flex flex-col gap-1.5">
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

      <LocalTime />
    </div>
  )
}
