import { cn } from "@/lib/utils"

import { COVER_TONES } from "../_lib/cover-tones"
import type { WorkItem } from "../_lib/work-item"

export function WorkGallery({
  work,
  index,
}: {
  work: WorkItem
  index: number
}) {
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
