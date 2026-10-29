export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
).replace(/\/$/, "")

export function absoluteUrl(path = "/"): string {
  return /^https?:\/\//.test(path) ? path : new URL(path, SITE_URL).toString()
}
