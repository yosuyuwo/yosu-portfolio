import { CoverVideo } from "@/app/_components/cover-video"
import { FadeInImage } from "@/app/_components/fade-in-image"
import type { WorkItem } from "@/app/_lib/work-item"
import { cn } from "@/lib/utils"

/**
 * Renders a work's cover image, with the cover video layered on top when
 * available. The caller owns the wrapping `relative` container.
 */
export function WorkCoverMedia({
  work,
  className,
  preload,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  work: WorkItem
  className?: string
  preload?: boolean
  sizes?: string
}) {
  const image = work.coverPath ? (
    <FadeInImage
      src={work.coverPath}
      alt={`${work.title} cover`}
      fill
      preload={preload}
      sizes={sizes}
      className={cn("object-cover object-top", className)}
    />
  ) : null

  if (!work.coverVideoPath) return image

  return (
    <>
      {image}
      <CoverVideo
        src={work.coverVideoPath}
        hasSkeleton={!image}
        className={className}
      />
    </>
  )
}
