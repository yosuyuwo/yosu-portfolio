import { LogoMark } from "@/app/_components/logo-mark"
import { SITE_FAMILY_NAME, SITE_GIVEN_NAME } from "@/lib/site-content"

export function Brand() {
  return (
    <a
      href="#top"
      data-enter
      className="group flex items-center gap-3 focus-visible:outline-none"
    >
      <LogoMark className="h-[2.1875rem] text-foreground transition-colors duration-fast group-hover:text-brand" />
      <span className="text-sm leading-[1.25] font-medium tracking-[-0.01em]">
        {SITE_GIVEN_NAME}
        <br />
        {SITE_FAMILY_NAME}
      </span>
    </a>
  )
}
