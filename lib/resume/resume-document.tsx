import { Children, Fragment, type ReactNode } from "react"

import { Document, Link, Page, Text, View } from "@react-pdf/renderer"

import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  EDUCATION,
  EXPERIENCE,
  RESUME,
  RESUME_PROJECTS,
  SITE_DOMAIN_URL,
  SITE_LOCATION,
  SITE_NAME,
  SITE_SOCIALS,
  SKILL_GROUPS,
  WORKS,
} from "@/lib/site-content"

import { formatDateRange, formatYearRange } from "./format-month-year"
import { toPdfSafeText } from "./pdf-safe-text"
import { styles } from "./resume-styles"

const RESUME_PROFILE_IDS = new Set<string>(["linkedin", "github"])
const SEPARATOR = "  |  "

function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

type ContactItem = { label: string; href?: string }

function contactRows(): ContactItem[][] {
  const profiles = SITE_SOCIALS.filter((social) =>
    RESUME_PROFILE_IDS.has(social.id)
  ).map((social) => ({ label: displayUrl(social.href), href: social.href }))

  return [
    [
      { label: SITE_LOCATION },
      { label: CONTACT_EMAIL, href: CONTACT_MAILTO },
      { label: displayUrl(SITE_DOMAIN_URL), href: SITE_DOMAIN_URL },
    ],
    profiles,
  ]
}

function ContactRow({
  items,
  isFollowing,
}: {
  items: ContactItem[]
  isFollowing: boolean
}) {
  return (
    <Text
      style={
        isFollowing
          ? [styles.contactRow, styles.contactRowFollowing]
          : styles.contactRow
      }
    >
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 ? (
            <Text style={styles.contactSeparator}>{SEPARATOR}</Text>
          ) : null}
          {item.href ? (
            <Link src={item.href} style={styles.contactLink}>
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </Fragment>
      ))}
    </Text>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [first, ...rest] = Children.toArray(children)

  return (
    <View style={styles.section}>
      {/* the heading moves with its first entry, so it's never stranded at a page end */}
      <View wrap={false}>
        <View style={styles.sectionHead}>
          <View style={styles.sectionMarker} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {first}
      </View>
      {rest}
    </View>
  )
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletMarker}>•</Text>
          <Text style={styles.bulletText}>{toPdfSafeText(item)}</Text>
        </View>
      ))}
    </View>
  )
}

function EntryHead({ title, meta }: { title: string; meta: ReactNode }) {
  return (
    <>
      <Text style={styles.entryTitle}>{toPdfSafeText(title)}</Text>
      <Text style={styles.entrySubtitle}>{meta}</Text>
    </>
  )
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{SITE_NAME}</Text>
      <Text style={styles.headline}>{RESUME.headline}</Text>
      {contactRows().map((items, index) => (
        <ContactRow
          key={items[0]?.label}
          items={items}
          isFollowing={index > 0}
        />
      ))}
    </View>
  )
}

function ExperienceSection() {
  return (
    <Section title="Work Experience">
      {EXPERIENCE.map((role) => (
        <View key={role.id} style={styles.entry} wrap={false}>
          <EntryHead
            title={role.role}
            meta={`${role.organization}${SEPARATOR}${formatDateRange(role.startDate, role.endDate)}`}
          />
          <Bullets items={role.highlights} />
        </View>
      ))}
    </Section>
  )
}

type ProjectEntry = {
  id: string
  title: string
  year: number
  role: string
  link?: string
  status?: string
  summary: string
  stack: readonly string[]
}

function projectEntries(): ProjectEntry[] {
  return WORKS.flatMap((work) => [
    {
      id: work.id,
      title: work.title,
      year: work.year,
      role: work.role,
      link: work.liveSite.href,
      summary: work.summary,
      stack: work.stack,
    },
    ...RESUME_PROJECTS.filter((project) => project.afterWorkSlug === work.slug),
  ])
}

function ProjectsSection() {
  return (
    <Section title="Projects">
      {projectEntries().map((project) => (
        <View key={project.id} style={styles.entry} wrap={false}>
          <EntryHead
            title={project.title}
            meta={
              <>
                {project.role}
                {SEPARATOR}
                {project.year}
                {SEPARATOR}
                {project.link ? (
                  <Link src={project.link} style={styles.entryLink}>
                    {displayUrl(project.link)}
                  </Link>
                ) : (
                  project.status
                )}
              </>
            }
          />
          <Text style={styles.projectSummary}>
            {toPdfSafeText(project.summary)}
          </Text>
          <Text style={styles.projectStack}>
            Tech stack: {project.stack.join(", ")}
          </Text>
        </View>
      ))}
    </Section>
  )
}

function SkillsSection() {
  return (
    <Section title="Skills">
      {SKILL_GROUPS.map((group) => (
        <Text key={group.id} style={styles.skillRow}>
          <Text style={styles.skillGroupName}>{group.name}: </Text>
          {group.skills.join(", ")}
        </Text>
      ))}
    </Section>
  )
}

function EducationSection() {
  if (EDUCATION.length === 0) return null

  return (
    <Section title="Education">
      {EDUCATION.map((entry) => (
        <View key={entry.id} style={styles.entry} wrap={false}>
          <EntryHead
            title={entry.credential}
            meta={`${entry.institution}${SEPARATOR}${formatYearRange(entry.startDate, entry.endDate)}`}
          />
        </View>
      ))}
    </Section>
  )
}

export function ResumeDocument() {
  return (
    <Document
      title={`${SITE_NAME} — CV`}
      author={SITE_NAME}
      subject={RESUME.headline}
      keywords={SKILL_GROUPS.flatMap((group) => group.skills).join(", ")}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <Section title="Summary">
          <Text>{toPdfSafeText(RESUME.summary)}</Text>
        </Section>

        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </Page>
    </Document>
  )
}
