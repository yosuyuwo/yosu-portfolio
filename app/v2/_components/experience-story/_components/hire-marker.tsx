import { Button } from "@/components/ui/button"

import { STORY_OUTRO } from "../../../_lib/experience-story"
import { MONO_CLASS } from "./chapter"

export function HireMarker({ onContact }: { onContact: () => void }) {
  return (
    <li
      data-chapter
      className="group/chapter relative grid gap-x-6 gap-y-4 pl-8 md:grid-cols-9 md:pl-0"
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-2.5 -translate-x-1/2 rounded-full border border-(--v2-hire) bg-(--v2-paper) transition-[background-color,scale] duration-normal ease-out-expo group-data-reached/chapter:scale-125 group-data-reached/chapter:bg-(--v2-hire)"
      />

      <span className={`${MONO_CLASS} text-(--v2-hire) md:col-span-2 md:pl-8`}>
        {STORY_OUTRO.label}
      </span>

      <div className="flex flex-col gap-4 md:col-span-7">
        <p className="max-w-[28ch] font-(family-name:--font-v2-serif) text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] italic">
          {STORY_OUTRO.line}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button
            type="button"
            onClick={onContact}
            className="group/cta h-10 gap-2 rounded-full px-5 font-(family-name:--font-v2-mono) text-[11px] tracking-[0.12em] uppercase"
          >
            {STORY_OUTRO.cta}
            <span
              aria-hidden
              className="transition-transform duration-fast group-hover/cta:translate-x-0.5"
            >
              →
            </span>
          </Button>
          <span className={`${MONO_CLASS} text-(--v2-muted)`}>
            {STORY_OUTRO.roles}
          </span>
        </div>
      </div>
    </li>
  )
}
