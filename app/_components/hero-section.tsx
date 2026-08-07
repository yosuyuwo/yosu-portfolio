"use client"

import { ContactForm } from "@/app/_components/contact-form"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const HERO_LINE =
  "Product / frontend engineer — UI-led interfaces, shipped end to end."
const HERO_SUPPORT =
  "Open to hire and collaborate. Tell me what you're building."

type HeroSectionProps = {
  contactOpen: boolean
  onContactOpenChange: (open: boolean) => void
}

export function HeroSection({
  contactOpen,
  onContactOpenChange,
}: HeroSectionProps) {
  return (
    <>
      <section
        id="hero"
        className="relative flex shrink-0 items-end justify-between gap-6 border-b bg-background px-6 py-8 md:px-8 md:py-10"
      >
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          <span className="font-medium text-foreground">{HERO_LINE}</span>{" "}
          {HERO_SUPPORT}
        </p>
        <Button
          type="button"
          variant="default"
          className="shrink-0"
          onClick={() => onContactOpenChange(true)}
        >
          Contact
        </Button>
      </section>

      <Sheet open={contactOpen} onOpenChange={onContactOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto sm:max-w-none"
        >
          <SheetHeader>
            <SheetTitle>Contact</SheetTitle>
            <SheetDescription>
              Fills a mailto draft — your email client opens on submit.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-6">
            <ContactForm onSubmitted={() => onContactOpenChange(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
