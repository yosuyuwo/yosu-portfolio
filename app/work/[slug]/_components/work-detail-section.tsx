import { CONTENT_GRID } from "@/app/_lib/page-grid"
import type { WorkSection } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { ZoomableImage } from "./zoomable-image"

export function WorkDetailSection({ section }: { section: WorkSection }) {
  const [heroImage, ...restImages] = section.images ?? []
  const heroSpan =
    section.imageSide === "left"
      ? "md:col-span-10"
      : "md:col-span-9 md:col-start-4"

  return (
    <section className={cn(CONTENT_GRID, "gap-y-6 md:gap-y-8")}>
      <h2 className="font-serif text-[1.75rem] leading-[1.05] text-balance md:col-span-3">
        {section.heading}
      </h2>

      {section.body ? (
        <p className="max-w-[60ch] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.6] text-pretty text-foreground/90 md:col-span-7 md:col-start-4">
          {section.body}
        </p>
      ) : null}

      {heroImage ? (
        <ZoomableImage
          src={heroImage.src}
          alt={heroImage.alt}
          className={cn(heroSpan, section.body && "md:mt-4")}
        />
      ) : null}

      {restImages.length ? (
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-9 md:col-start-4">
          {restImages.map((image, i) => (
            <ZoomableImage
              key={`${image.src}-${i}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
