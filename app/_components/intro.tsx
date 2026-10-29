import { INTRO } from "@/app/_lib/copy"
import { SITE_NAME } from "@/lib/site-content"

import { LocalTime } from "./local-time"

const LABEL_CLASS =
  "font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"

export function Intro() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl gap-8 px-4 pt-14 pb-12 md:grid-cols-12 md:gap-6 md:px-8 md:pt-24 md:pb-14"
    >
      <h1
        data-enter
        className="max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em] text-balance md:col-span-8"
      >
        <span className="sr-only">{SITE_NAME}, </span>
        {INTRO.lead}{" "}
        <em className="font-serif text-[1.12em] font-normal tracking-normal text-brand">
          {INTRO.emphasis}
        </em>
      </h1>

      <dl className="grid content-end gap-3 text-sm md:col-span-4">
        <div
          data-enter
          className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3"
        >
          <dt className={LABEL_CLASS}>Previously</dt>
          <dd>
            <a
              href="#about"
              className="underline decoration-border underline-offset-4 transition-colors duration-fast hover:text-brand hover:decoration-brand"
            >
              {INTRO.previously}
            </a>
          </dd>
        </div>
        <div
          data-enter
          className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3"
        >
          <dt className={LABEL_CLASS}>Based in</dt>
          <dd>
            {INTRO.location}{" "}
            <LocalTime className="font-mono text-xs text-muted-foreground" />
          </dd>
        </div>
      </dl>
    </section>
  )
}
