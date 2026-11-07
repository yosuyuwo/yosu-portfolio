import type { WorkSection } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { WorkFigure } from "../../work-figure"
import { ZoomableImage } from "../../zoomable-image"
import { ZoomableImageGroup } from "../../zoomable-image-group"

type MediaSpans = {
  figures: string
  hero: string
  rest: string
}

export function SectionMedia({
  section,
  spans,
}: {
  section: WorkSection
  spans: MediaSpans
}) {
  const images = section.images ?? []
  const restImages = images.slice(1)

  return (
    <>
      {section.figures?.length ? (
        <div className={cn("flex flex-col gap-14 md:gap-16", spans.figures)}>
          {section.figures.map((figure, i) => (
            <WorkFigure key={`${figure.kind}-${i}`} figure={figure} />
          ))}
        </div>
      ) : null}

      {images.length ? (
        <ZoomableImageGroup images={images}>
          <ZoomableImage index={0} className={spans.hero} />

          {restImages.length ? (
            <div className={cn("grid gap-4 sm:grid-cols-2", spans.rest)}>
              {restImages.map((image, i) => (
                <ZoomableImage key={`${image.src}-${i}`} index={i + 1} />
              ))}
            </div>
          ) : null}
        </ZoomableImageGroup>
      ) : null}
    </>
  )
}
