"use client"

import { useState, type ReactNode } from "react"
import { ExternalLinkIcon } from "lucide-react"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const workItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  coverPath: z.string(),
  publishedAt: z.string(),
  description: z.string(),
  gallery: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
    }),
  ),
  role: z.string().optional(),
  year: z.number().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  stack: z.array(z.string()).optional(),
})

export type WorkItem = z.infer<typeof workItemSchema>

const WORKS: WorkItem[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "northline-dashboard",
    title: "Northline Dashboard",
    summary:
      "Ops dashboard for a fictional logistics team - filters, tables, calm density.",
    coverPath: "/works/northline/cover.jpg",
    publishedAt: "2025-11-01",
    description:
      "A calm operations surface for triage and routing. Emphasis on scannable tables, quiet filters, and a density that still feels hire-ready rather than dashboard-noisy.",
    gallery: [
      { src: "/works/northline/g1.jpg", alt: "Filter bar and table" },
      { src: "/works/northline/g2.jpg", alt: "Detail drawer" },
    ],
    role: "Product Engineer",
    year: 2025,
    stack: ["Next.js", "Postgres"],
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "atelier-storefront",
    title: "Atelier Storefront",
    summary:
      "Commerce-adjacent browse/detail flow with a quiet product grid.",
    coverPath: "/works/atelier/cover.jpg",
    publishedAt: "2024-06-15",
    description:
      "Browse and detail for a small catalog. Cover-led grid on the index, restrained product page, no promo chrome competing with the work.",
    gallery: [
      { src: "/works/atelier/g1.jpg", alt: "Product grid" },
      { src: "/works/atelier/g2.jpg", alt: "Product detail" },
    ],
    role: "Frontend",
    year: 2024,
    stack: ["Next.js"],
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    slug: "studio-cms",
    title: "Studio CMS",
    summary:
      "Editorial CMS shell - lists, editors, publish states without the noise.",
    coverPath: "/works/studio/cover.jpg",
    publishedAt: "2023-09-01",
    description:
      "List → editor → publish states for editorial teams. Focused on clear status and a quiet writing surface.",
    gallery: [
      { src: "/works/studio/g1.jpg", alt: "Content list" },
      { src: "/works/studio/g2.jpg", alt: "Editor" },
    ],
    role: "Full-stack",
    year: 2023,
    stack: ["Next.js", "Payload"],
  },
]

const COVER_TONES = [
  "bg-zinc-200 dark:bg-zinc-800",
  "bg-stone-200 dark:bg-stone-800",
  "bg-neutral-300 dark:bg-neutral-700",
] as const

function formatListDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

function CoverBlock({
  work,
  index,
  className,
}: {
  work: WorkItem
  index: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md animate-pulse",
        COVER_TONES[index % COVER_TONES.length],
        className,
      )}
      title={work.coverPath}
    />
  )
}

function WorkMeta({ work }: { work: WorkItem }) {
  const year = work.year ?? new Date(work.publishedAt).getFullYear()
  const rows: { label: string; value: ReactNode }[] = []

  if (work.role) rows.push({ label: "Role", value: work.role })
  rows.push({ label: "Year", value: year })
  if (work.stack?.length) {
    rows.push({ label: "Stack", value: work.stack.join(" · ") })
  }
  if (work.links?.length) {
    rows.push({
      label: "Links",
      value: (
        <span className="flex flex-wrap justify-end gap-x-3 gap-y-1">
          {work.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1 text-foreground"
            >
              {link.label}
              <ExternalLinkIcon className="size-3 opacity-50" />
            </a>
          ))}
        </span>
      ),
    })
  }

  return (
    <ul className="overflow-hidden rounded-xl bg-muted/60">
      {rows.map((row, i) => (
        <li
          key={row.label}
          className={cn(
            "flex items-baseline justify-between gap-4 px-3.5 py-2.5 text-sm",
            i > 0 && "border-t border-border/60",
          )}
        >
          <span className="shrink-0 text-muted-foreground">{row.label}</span>
          <span className="min-w-0 text-right font-medium">{row.value}</span>
        </li>
      ))}
    </ul>
  )
}

function WorkGallery({ work, index }: { work: WorkItem; index: number }) {
  const frames = [
    { src: work.coverPath, alt: `${work.title} cover` },
    ...work.gallery,
  ]

  return (
    <div className="flex flex-col gap-3 p-4 md:h-full md:overflow-y-auto md:overscroll-contain md:p-5">
      {frames.map((item, i) => (
        <div
          key={`${item.src}-${i}`}
          className={cn(
            "w-full shrink-0 rounded-xl",
            i === 0 ? "aspect-4/3" : "aspect-16/10",
            COVER_TONES[(index + i) % COVER_TONES.length],
          )}
          title={item.alt}
        />
      ))}
    </div>
  )
}

export function WorksSection() {
  const [slug, setSlug] = useState<string | null>(null)
  const active = WORKS.find((w) => w.slug === slug)
  const activeIndex = WORKS.findIndex((w) => w.slug === slug)

  return (
    <section
      id="works"
      className="@container flex min-h-full shrink-0 flex-col p-6 md:p-8"
    >
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Works</h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Selected product and frontend work. Placeholder inventory for layout.
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-10 @2xl:grid-cols-2 @2xl:gap-x-8 @2xl:gap-y-12">
        {WORKS.map((work, index) => (
          <li key={work.id}>
            <button
              type="button"
              onClick={() => setSlug(work.slug)}
              className="group w-full text-left"
            >
              <CoverBlock
                work={work}
                index={index}
                className="aspect-4/3 w-full transition-opacity group-hover:opacity-90"
              />
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-medium">{work.title}</h2>
                <span className="text-xs text-muted-foreground">
                  {formatListDate(work.publishedAt)}
                </span>
              </div>
              <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                {work.summary}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={slug !== null}
        onOpenChange={(open) => {
          if (!open) setSlug(null)
        }}
      >
        <DialogContent
          overlayClassName="bg-black/30 supports-backdrop-filter:backdrop-blur-md"
          className={cn(
            "h-[min(52rem,92vh)] w-[calc(100%-1.5rem)] max-w-[min(72rem,96vw)] gap-0 overflow-hidden p-0 sm:max-w-[min(72rem,96vw)]",
            "rounded-[1.35rem] bg-background/95 shadow-2xl ring-1 ring-black/5",
            "backdrop-blur-xl dark:ring-white/10",
          )}
        >
          {active ? (
            <div className="grid h-full min-h-0 grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-2 md:overflow-hidden">
              <div className="flex min-h-0 flex-col border-b p-5 md:overflow-y-auto md:overscroll-contain md:border-r md:border-b-0 md:p-8">
                <DialogHeader className="gap-2 pr-8 text-left">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {formatListDate(active.publishedAt)}
                  </p>
                  <DialogTitle className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="text-[15px] leading-snug">
                    {active.summary}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex flex-col gap-5">
                  <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                    {active.description}
                  </p>
                  <WorkMeta work={active} />
                </div>
              </div>
              <div className="min-h-0 bg-muted/30 md:overflow-hidden">
                <WorkGallery
                  work={active}
                  index={Math.max(0, activeIndex)}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
