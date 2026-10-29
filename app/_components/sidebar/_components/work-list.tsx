"use client"

import Link from "next/link"

import { usePageTransition } from "@/app/_hooks/use-page-transition"
import { WORK_ITEMS } from "@/app/_lib/works"
import { cn } from "@/lib/utils"

const STAGGER_MS = 40

export function WorkList({ currentSlug }: { currentSlug: string | null }) {
  const { fadeTo } = usePageTransition()
  const isOpen = currentSlug !== null

  return (
    <div
      inert={!isOpen}
      className={cn(
        "grid transition-[grid-template-rows] duration-slow ease-out-expo",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <ul className="flex min-h-0 flex-col gap-1 overflow-hidden">
        {WORK_ITEMS.map((work, i) => {
          const isCurrent = work.slug === currentSlug
          const href = `/work/${work.slug}`
          return (
            <li
              key={work.slug}
              style={{
                transitionDelay: isOpen ? `${i * STAGGER_MS}ms` : "0ms",
              }}
              className={cn(
                "transition-[opacity,translate] duration-slow ease-out-expo first:pt-2 last:pb-3",
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0"
              )}
            >
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                onNavigate={(event) => {
                  if (isCurrent) return event.preventDefault()
                  fadeTo(event, href)
                }}
                className={cn(
                  "flex items-center gap-2 text-[13px] leading-6 transition-colors duration-fast focus-visible:text-foreground focus-visible:outline-none",
                  isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px bg-brand transition-[width] duration-normal ease-out-expo",
                    isCurrent ? "w-3" : "w-0"
                  )}
                />
                <span className="truncate">{work.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
