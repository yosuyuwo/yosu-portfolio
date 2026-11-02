import { CONTENT_GRID } from "@/app/_lib/page-grid"
import type { WorkSection } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import type { SectionLayout } from "../../_lib/section-layout"
import { GalleryGrid } from "./_components/gallery-grid"
import { SectionMedia } from "./_components/section-media"

type SectionProps = {
  section: WorkSection
}

const BODY_TEXT =
  "max-w-[60ch] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.6] text-pretty text-foreground/90"

function SplitSection({ section }: SectionProps) {
  const hero =
    section.imageSide === "left"
      ? "md:col-span-10"
      : "md:col-span-9 md:col-start-4"

  return (
    <section className={cn(CONTENT_GRID, "gap-y-6 md:gap-y-8")}>
      <h2 className="font-serif text-[1.75rem] leading-[1.05] text-balance md:col-span-3">
        {section.heading}
      </h2>
      {section.body ? (
        <p className={cn(BODY_TEXT, "md:col-span-7 md:col-start-4")}>
          {section.body}
        </p>
      ) : null}
      <SectionMedia
        section={section}
        spans={{
          figures: "md:col-span-9 md:col-start-4 md:mt-4",
          hero: cn(hero, section.body && "md:mt-4"),
          rest: "md:col-span-9 md:col-start-4",
        }}
      />
    </section>
  )
}

function StatementSection({ section }: SectionProps) {
  const hero =
    section.imageSide === "left"
      ? "md:col-span-10"
      : "md:col-span-10 md:col-start-3"

  return (
    <section className={cn(CONTENT_GRID, "gap-y-6 md:gap-y-10")}>
      <h2 className="font-serif text-[1.75rem] leading-[1.05] text-balance md:col-span-10">
        {section.heading}
      </h2>
      {section.body ? (
        <p className="max-w-[48ch] text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.45] text-pretty text-foreground md:col-span-10">
          {section.body}
        </p>
      ) : null}
      <SectionMedia
        section={section}
        spans={{
          figures: "md:col-span-10 md:col-start-3",
          hero,
          rest: "md:col-span-10 md:col-start-3",
        }}
      />
    </section>
  )
}

function WideSection({ section }: SectionProps) {
  const hero = section.imageSide === "left" ? "md:col-span-9" : "md:col-span-12"

  return (
    <section className={cn(CONTENT_GRID, "gap-y-6 md:gap-y-10")}>
      <h2 className="max-w-[14ch] font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-balance md:col-span-7">
        {section.heading}
      </h2>
      {section.body ? (
        <p
          className={cn(
            BODY_TEXT,
            "md:col-span-5 md:col-start-8 md:self-end md:text-base"
          )}
        >
          {section.body}
        </p>
      ) : null}
      <SectionMedia
        section={section}
        spans={{
          figures: "md:col-span-12",
          hero,
          rest: "md:col-span-12 lg:grid-cols-3",
        }}
      />
    </section>
  )
}

function PanelSection({ section }: SectionProps) {
  return (
    <section className="-mx-4 squircle border border-border bg-muted px-4 py-10 md:mx-0 md:px-12 md:py-14">
      <div className={cn(CONTENT_GRID, "gap-y-8 md:gap-y-10")}>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.02] text-balance md:col-span-4">
          {section.heading}
        </h2>
        {section.body ? (
          <p className={cn(BODY_TEXT, "md:col-span-8")}>{section.body}</p>
        ) : null}
        <SectionMedia
          section={section}
          spans={{
            figures: "md:col-span-12",
            hero: "md:col-span-12",
            rest: "md:col-span-12",
          }}
        />
      </div>
    </section>
  )
}

function GallerySection({ section }: SectionProps) {
  return (
    <section className={cn(CONTENT_GRID, "gap-y-6 md:gap-y-8")}>
      <h2 className="font-serif text-[1.75rem] leading-[1.05] text-balance md:col-span-12">
        {section.heading}
      </h2>
      <GalleryGrid images={section.images ?? []} />
    </section>
  )
}

const LAYOUTS = {
  split: SplitSection,
  statement: StatementSection,
  wide: WideSection,
  panel: PanelSection,
  gallery: GallerySection,
} as const

export function WorkDetailSection({
  section,
  layout,
}: SectionProps & { layout: SectionLayout }) {
  const Layout = LAYOUTS[layout]
  return <Layout section={section} />
}
