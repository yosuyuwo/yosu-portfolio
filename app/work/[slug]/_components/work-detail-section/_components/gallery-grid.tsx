import type { WorkSection } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

import { ZoomableImage } from "../../zoomable-image"

type GalleryImage = NonNullable<WorkSection["images"]>[number]
type ImagePriority = NonNullable<GalleryImage["priority"]>

const PRIORITY_LAYOUT: Record<
  ImagePriority,
  { span: string; sizes: string }
> = {
  primary: {
    span: "md:col-span-6",
    sizes: "(max-width: 768px) 100vw, 1152px",
  },
  secondary: {
    span: "md:col-span-3",
    sizes: "(max-width: 768px) 100vw, 576px",
  },
  tertiary: {
    span: "md:col-span-2",
    sizes: "(max-width: 768px) 100vw, 384px",
  },
}

export function GalleryGrid({ images }: { images: readonly GalleryImage[] }) {
  return (
    <div className="grid gap-4 md:col-span-12 md:grid-cols-6 md:gap-6">
      {images.map((image, i) => {
        const layout = PRIORITY_LAYOUT[image.priority ?? "secondary"]
        return (
          <ZoomableImage
            key={`${image.src}-${i}`}
            src={image.src}
            alt={image.alt}
            sizes={layout.sizes}
            className={cn(layout.span)}
          />
        )
      })}
    </div>
  )
}
