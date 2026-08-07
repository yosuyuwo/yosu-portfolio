import {
  SITE_FAMILY_NAME,
  SITE_GIVEN_NAME,
  SITE_NAME,
} from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { LogoMark } from "./_components/logo-mark"

export function Brand({
  className,
  href = "#hero",
  hideTextWhenCollapsed = false,
}: {
  className?: string
  href?: string
  hideTextWhenCollapsed?: boolean
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative z-10 flex min-w-0 items-center justify-start gap-2 overflow-hidden",
        className,
      )}
    >
      <LogoMark className="shrink-0" />
      <span
        className={cn(
          "flex min-w-0 flex-col",
          hideTextWhenCollapsed && "group-data-[collapsible=icon]:hidden",
        )}
      >
        <span className="truncate text-sm font-bold leading-none!">
          {SITE_GIVEN_NAME}
        </span>
        <span className="truncate text-sm font-bold leading-none!">
          {SITE_FAMILY_NAME}
        </span>
      </span>
      <span className="sr-only">{SITE_NAME}</span>
    </a>
  )
}
