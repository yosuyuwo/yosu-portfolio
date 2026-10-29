const CDN_BASE = process.env.NEXT_PUBLIC_R2_CDN_URL?.replace(/\/$/, "")

/**
 * Resolve a `public/`-relative asset path (e.g. "/works/gaiana/cover.webp")
 * to the R2 CDN when `NEXT_PUBLIC_R2_CDN_URL` is set. Bucket keys mirror the
 * `public/` layout (see `scripts/sync-r2-assets.ts`), so without the env var
 * the same path is served from `public/` instead.
 */
export function cdnUrl(path: string): string {
  if (!CDN_BASE || /^https?:\/\//.test(path)) return path
  return `${CDN_BASE}/${path.replace(/^\//, "")}`
}
