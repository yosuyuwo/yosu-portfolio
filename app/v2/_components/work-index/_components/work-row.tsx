"use client"

import { ArrowUpRightIcon } from "lucide-react"

import { WorkCoverMedia } from "@/app/_components/works-section/_components/work-cover-media"
import type { WorkItem } from "@/app/_components/works-section/_lib/work-item"

import { workYear } from "../../../_lib/works"

export function WorkRow({
  work,
  index,
  onOpen,
  onHover,
}: {
  work: WorkItem
  index: number
  onOpen: (slug: string) => void
  onHover: (index: number) => void
}) {
  const isLive = work.liveSite?.status === "live"
  const number = String(index + 1).padStart(2, "0")

  return (
    <li className="border-b border-(--v2-line) transition-opacity duration-normal group-has-[button:hover]/list:opacity-35 hover:opacity-100!">
      <button
        type="button"
        onClick={() => onOpen(work.slug)}
        onPointerEnter={() => onHover(index)}
        onFocus={() => onHover(index)}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left focus-visible:outline-none md:grid-cols-[4rem_1fr_16rem_5rem_2rem] md:py-8"
      >
        <span className="font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] text-(--v2-muted)">
          {number}
        </span>

        <span className="text-[clamp(1.875rem,4.4vw,4rem)] leading-[0.95] font-medium tracking-[-0.045em] transition-[translate,color] duration-normal ease-out-expo group-hover:translate-x-3 group-focus-visible:translate-x-3 group-focus-visible:text-(--v2-accent)">
          {work.title}
        </span>

        <span className="hidden font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] text-(--v2-muted) uppercase md:block">
          {work.role}
        </span>

        <span className="font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] text-(--v2-muted) md:text-right">
          {isLive ? (
            <span
              aria-label="Live"
              className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-(--v2-accent)"
            />
          ) : null}
          {workYear(work)}
        </span>

        <ArrowUpRightIcon
          aria-hidden
          className="hidden size-5 justify-self-end text-(--v2-accent) opacity-0 transition-[opacity,translate] duration-normal ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 md:block"
        />

        <span className="relative col-span-full mt-5 block aspect-16/9 overflow-hidden rounded-sm bg-(--v2-line) md:hidden">
          <WorkCoverMedia work={work} sizes="100vw" />
        </span>
      </button>
    </li>
  )
}
