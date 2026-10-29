import { OG_SIZE, ogCard } from "@/lib/seo/og-card"
import { RESUME, SITE_LOCATION, SITE_NAME } from "@/lib/site-content"

export const alt = `${SITE_NAME} — ${RESUME.headline}`
export const size = OG_SIZE
export const contentType = "image/png"

export default function Image() {
  return ogCard({
    eyebrow: SITE_LOCATION,
    title: SITE_NAME,
    subtitle: RESUME.headline,
  })
}
