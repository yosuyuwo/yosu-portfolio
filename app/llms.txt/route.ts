import { WORK_ITEMS } from "@/app/_lib/works"
import {
  ABOUT_INTRO,
  CONTACT_EMAIL,
  EXPERIENCE,
  RESUME,
  RESUME_FILE,
  SITE_LOCATION,
  SITE_METADATA,
  SITE_NAME,
  SITE_SOCIALS,
} from "@/lib/site-content"
import { absoluteUrl } from "@/lib/site-url"

export const dynamic = "force-static"

function llmsTxt(): string {
  const current = EXPERIENCE.filter((job) => job.endDate === null)
    .map((job) => `- ${job.role}, ${job.organization}: ${job.blurb}`)
    .join("\n")
  const works = WORK_ITEMS.map(
    (work) =>
      `- [${work.title}](${absoluteUrl(`/work/${work.slug}`)}): ${work.summary}`
  ).join("\n")
  const profiles = SITE_SOCIALS.filter((social) => social.id !== "email")
    .map((social) => `- [${social.label}](${social.href})`)
    .join("\n")

  return `# ${SITE_NAME}

> ${SITE_METADATA.description}

${RESUME.summary}

${ABOUT_INTRO}

- Location: ${SITE_LOCATION}
- Contact: ${CONTACT_EMAIL}

## Current roles

${current}

## Selected work

${works}

## Profiles

${profiles}
- [Résumé (PDF)](${absoluteUrl(RESUME_FILE.href)})
`
}

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
