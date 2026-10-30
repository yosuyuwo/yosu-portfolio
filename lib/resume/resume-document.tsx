import { Children, Fragment, type ReactNode } from "react"

import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer"

import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  EDUCATION,
  EXPERIENCE,
  HERO_PORTRAIT,
  RESUME,
  SITE_LOCATION,
  SITE_NAME,
  SITE_SOCIALS,
  SKILL_GROUPS,
  WORKS,
} from "@/lib/site-content"

import {
  formatDateRange,
  formatMonthYear,
  formatYearRange,
} from "./format-month-year"
import { toPdfSafeText } from "./pdf-safe-text"
import { styles } from "./resume-styles"

const RESUME_PROFILE_IDS = new Set<string>(["linkedin", "github"])

function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

function contactItems(): { label: string; href?: string }[] {
  const profiles = SITE_SOCIALS.filter((social) =>
    RESUME_PROFILE_IDS.has(social.id)
  ).map((social) => ({ label: displayUrl(social.href), href: social.href }))

  return [
    { label: SITE_LOCATION },
    { label: CONTACT_EMAIL, href: CONTACT_MAILTO },
    ...profiles,
  ]
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
          <View style={styles.bulletMarker} />
          <Text style={styles.bulletText}>{toPdfSafeText(item)}</Text>
        </View>
      ))}
    </View>
  )
}

function EntryHead({ title, date }: { title: string; date: string }) {
  return (
    <View style={styles.entryHeadRow}>
      <Text style={styles.entryTitle}>{title}</Text>
      <Text style={styles.entryDate}>{date}</Text>
    </View>
  )
}

function Header({ portrait }: { portrait: Buffer }) {
  const items = contactItems()

  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.name}>{SITE_NAME}</Text>
        <Text style={styles.headline}>{RESUME.headline}</Text>
        <Text style={styles.contactRow}>
          {items.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 ? (
                <Text style={styles.contactSeparator}>{"  /  "}</Text>
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
      </View>
      <Image
        src={{ data: portrait, format: "jpg" }}
        style={styles.portrait}
        aria-label={HERO_PORTRAIT.alt}
      />
    </View>
  )
}

function ExperienceSection() {
  return (
    <Section title="Experience">
      {EXPERIENCE.map((role) => (
        <View key={role.id} style={styles.entry} wrap={false}>
          <EntryHead
            title={role.role}
            date={formatDateRange(role.startDate, role.endDate)}
          />
          <Text style={styles.entrySubtitle}>{role.organization}</Text>
          <Bullets items={role.highlights} />
        </View>
      ))}
    </Section>
  )
}

function ProjectsSection() {
  return (
    <Section title="Selected Projects">
      {WORKS.map((work) => (
        <View key={work.id} style={styles.entry} wrap={false}>
          <EntryHead title={work.title} date={String(work.year)} />
          <Text style={styles.entrySubtitle}>
            {work.role}
            {"  /  "}
            <Link src={work.liveSite.href} style={styles.entryLink}>
              {displayUrl(work.liveSite.href)}
            </Link>
          </Text>
          <Text style={styles.projectSummary}>{work.summary}</Text>
          <Text style={styles.projectStack}>
            Stack: {work.stack.join(", ")}
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
        <View key={group.id} style={styles.skillRow} wrap={false}>
          <Text style={styles.skillGroupName}>{group.name}</Text>
          <Text style={styles.skillList}>{group.skills.join(", ")}</Text>
        </View>
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
            date={formatYearRange(entry.startDate, entry.endDate)}
          />
          <Text style={styles.entrySubtitle}>{entry.institution}</Text>
        </View>
      ))}
    </Section>
  )
}

export function ResumeDocument({ portrait }: { portrait: Buffer }) {
  const updated = formatMonthYear(new Date().toISOString())

  return (
    <Document
      title={`${SITE_NAME} — CV`}
      author={SITE_NAME}
      subject={RESUME.headline}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <Header portrait={portrait} />

        <Section title="Summary">
          <Text>{RESUME.summary}</Text>
        </Section>

        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />

        <Text style={styles.footer} fixed>
          {SITE_NAME} / CV / Updated {updated}
        </Text>
      </Page>
    </Document>
  )
}
