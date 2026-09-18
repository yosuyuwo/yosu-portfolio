import { cn } from "@/lib/utils"

import type { WorkSection } from "../_lib/work-item"
import { ZoomableImage } from "./zoomable-image"

export function WorkDetailSection({ section }: { section: WorkSection }) {
  const images = section.images ?? []
  const [heroImage, ...restImages] = images
  const hasBody = Boolean(section.body)
  const imageSide = section.imageSide ?? "right"

  return (
    <div>
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {section.heading}
      </p>

      {hasBody && heroImage ? (
        <div className="mt-3 grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <p
            className={cn(
              "text-[17px] leading-relaxed text-foreground/90",
              imageSide === "left" && "md:order-2"
            )}
          >
            {section.body}
          </p>
          <ZoomableImage
            src={heroImage.src}
            alt={heroImage.alt}
            className={imageSide === "left" ? "md:order-1" : undefined}
          />
        </div>
      ) : hasBody ? (
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-foreground/90">
          {section.body}
        </p>
      ) : heroImage ? (
        <div className="mt-3">
          <ZoomableImage src={heroImage.src} alt={heroImage.alt} />
        </div>
      ) : null}

      {restImages.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restImages.map((image, i) => (
            <ZoomableImage
              key={`${image.src}-${i}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
