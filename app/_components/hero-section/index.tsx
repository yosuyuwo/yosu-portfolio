"use client"

import { MailIcon } from "lucide-react"
import Image from "next/image"

import { ContactForm } from "@/app/_components/contact-form"
import { useContactDialog } from "@/app/_components/shell/_hooks/use-contact-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CONTACT,
  HERO,
  HERO_PORTRAIT,
  SITE_GIVEN_NAME,
} from "@/lib/site-content"

export function HeroSection() {
  const { open, setOpen } = useContactDialog()

  return (
    <>
      <section
        id="hero"
        className="relative grid min-h-[70svh] shrink-0 grid-cols-1 gap-8 border-b bg-background p-6 md:grid-cols-2 md:items-stretch md:gap-10 md:p-8"
      >
        <div className="flex flex-col items-start justify-end gap-4 self-end text-left md:max-w-md">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {HERO.greeting}
            </p>
            <h1 className="mt-1 text-2xl font-medium tracking-tight text-foreground">
              I&apos;m {SITE_GIVEN_NAME}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {HERO.bio}
            </p>
          </div>
          <Button type="button" onClick={() => setOpen(true)}>
            {HERO.ctaLabel}
            <MailIcon data-icon="inline-end" aria-hidden />
          </Button>
        </div>

        <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl md:mx-0 md:h-full md:max-h-[min(70svh,40rem)] md:max-w-none md:justify-self-end lg:max-w-lg">
          <Image
            src={HERO_PORTRAIT.src}
            alt={HERO_PORTRAIT.alt}
            fill
            priority
            quality={100}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 32rem"
          />
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{CONTACT.dialogTitle}</DialogTitle>
            <DialogDescription>{CONTACT.dialogDescription}</DialogDescription>
          </DialogHeader>
          <ContactForm onSubmitted={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
