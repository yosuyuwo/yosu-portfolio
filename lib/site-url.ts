const VERCEL_PRODUCTION_HOST =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

// `||`, not `??`: hosts may define the variable as an empty string
export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ||
  (VERCEL_PRODUCTION_HOST && `https://${VERCEL_PRODUCTION_HOST}`) ||
  "http://localhost:3000"
).replace(/\/$/, "")

export function absoluteUrl(path = "/"): string {
  return /^https?:\/\//.test(path) ? path : new URL(path, SITE_URL).toString()
}
