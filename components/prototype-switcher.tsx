"use client"

import { useCallback, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PrototypeSwitcherProps = {
  variants: { key: string; name: string }[]
  param?: string
  className?: string
}

export function PrototypeSwitcher({
  variants,
  param = "variant",
  className,
}: PrototypeSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get(param) ?? variants[0]?.key ?? "A"
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  )
  const label = variants[index]

  const go = useCallback(
    (nextIndex: number) => {
      const wrapped = (nextIndex + variants.length) % variants.length
      const next = variants[wrapped]
      if (!next) return
      const params = new URLSearchParams(searchParams.toString())
      params.set(param, next.key)
      router.replace(`${pathname}?${params.toString()}`)
    },
    [param, pathname, router, searchParams, variants],
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        go(index - 1)
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        go(index + 1)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [go, index])

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-zinc-50 shadow-lg",
        className,
      )}
    >
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50"
        onClick={() => go(index - 1)}
        aria-label="Previous variant"
      >
        <ChevronLeftIcon />
      </Button>
      <div className="min-w-48 px-2 text-center text-xs font-medium tracking-wide">
        {label ? `${label.key} - ${label.name}` : current}
      </div>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50"
        onClick={() => go(index + 1)}
        aria-label="Next variant"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
