export type ImagePreview = {
  previewSrc: string | null
  aspectRatio: number | null
}

export function readImagePreview(element: Element): ImagePreview {
  const image = element.querySelector("img")
  if (!image?.complete || image.naturalWidth === 0) {
    return { previewSrc: null, aspectRatio: null }
  }
  return {
    previewSrc: image.currentSrc,
    aspectRatio: image.naturalWidth / image.naturalHeight,
  }
}
