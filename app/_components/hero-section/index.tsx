"use client"

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
import { CONTACT, HERO } from "@/lib/site-content"

export function HeroSection() {
  const { open, setOpen } = useContactDialog()

  return (
    <>
      <section
        id="hero"
        className="relative flex shrink-0 items-center justify-between gap-6 border-b bg-background px-6 py-8 md:px-8 md:py-10"
      >
        <div>
          <p className="max-w-xl text-sm leading-relaxed font-medium text-foreground md:text-base">
            {HERO.line}
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {HERO.support}
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          className="shrink-0"
          onClick={() => setOpen(true)}
        >
          {HERO.ctaLabel}
        </Button>
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
