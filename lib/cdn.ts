/**
 * Build an absolute URL for an asset on the R2 CDN.
 * Example: cdnUrl("portfolio/hero.webp")
 */
export function cdnUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_R2_CDN_URL?.replace(/\/$/, "")
  if (!base) {
    throw new Error("NEXT_PUBLIC_R2_CDN_URL is not set")
  }
  return `${base}/${path.replace(/^\//, "")}`
}
