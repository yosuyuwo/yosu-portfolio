import { WibClock } from "@/app/_components/wib-clock"
import { FOOTER_COPYRIGHT_NAME } from "@/lib/site-content"

export function EndRevealFooter({ reveal }: { reveal: number }) {
  return (
    <div
      aria-hidden={reveal <= 0}
      className="absolute inset-x-2 bottom-2 z-0 flex h-28 flex-col items-center justify-end gap-1.5 bg-sidebar px-4 pb-3 md:h-20 md:flex-row md:items-end md:justify-between md:gap-4 md:px-3"
    >
      <WibClock forceAnalog bare className="md:hidden" />
      <WibClock forceDigital className="hidden shrink-0 md:flex" />
      <p className="text-center text-xs tracking-wide text-sidebar-foreground/55 md:text-right">
        © {new Date().getFullYear()} {FOOTER_COPYRIGHT_NAME}. All rights
        reserved.
      </p>
    </div>
  )
}
