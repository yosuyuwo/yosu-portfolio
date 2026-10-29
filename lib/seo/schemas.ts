import type { WorkItem } from "@/app/_lib/work-item"
import {
  EXPERIENCE,
  HERO_PORTRAIT,
  RESUME,
  SITE_HANDLE,
  SITE_LOCATION,
  SITE_METADATA,
  SITE_NAME,
  SITE_SOCIALS,
  SKILL_GROUPS,
} from "@/lib/site-content"
import { absoluteUrl } from "@/lib/site-url"
import { cdnUrl } from "@/lib/cdn"

const PERSON_ID = absoluteUrl("/#person")
const WEBSITE_ID = absoluteUrl("/#website")

const CITY = SITE_LOCATION.split(", ")[0]
const COUNTRY_CODE = "ID"

function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    alternateName: SITE_HANDLE,
    url: absoluteUrl("/"),
    image: absoluteUrl(cdnUrl(HERO_PORTRAIT.src)),
    jobTitle: RESUME.headline,
    description: RESUME.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressCountry: COUNTRY_CODE,
    },
    worksFor: EXPERIENCE.filter((job) => job.endDate === null).map((job) => ({
      "@type": "Organization",
      name: job.organization,
    })),
    knowsAbout: SKILL_GROUPS.flatMap((group) => group.skills),
    sameAs: SITE_SOCIALS.filter((social) => social.id !== "email").map(
      (social) => social.href
    ),
  }
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description: SITE_METADATA.description,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: absoluteUrl("/"),
        name: SITE_METADATA.title,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      personNode(),
    ],
  }
}

export function workSchema(work: WorkItem) {
  const url = absoluteUrl(`/work/${work.slug}`)
  const liveHref =
    work.liveSite?.status === "live" ? work.liveSite.href : undefined

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: work.title,
        description: work.summary,
        image: absoluteUrl(work.coverPath),
        datePublished: work.publishedAt,
        creator: { "@id": PERSON_ID },
        keywords: work.stack?.join(", "),
        sameAs: liveHref,
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: absoluteUrl("/"),
          },
          { "@type": "ListItem", position: 2, name: work.title, item: url },
        ],
      },
    ],
  }
}
