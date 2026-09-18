import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import {
  ABOUT_INTRO,
  CONTACT_EMAIL,
  EXPERIENCE,
  HERO,
  SITE_NAME,
  SITE_SOCIALS,
  SKILL_GROUPS,
  WORKS,
} from "@/lib/site-content"

import { formatDateRange } from "./format-month-year"
import { PDF_COLORS, PDF_FONT_FAMILY } from "./pdf-theme"
import { toPdfSafeText } from "./pdf-safe-text"

const RESUME_SOCIAL_IDS = new Set<string>(["email", "github", "linkedin"])

const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 9,
    color: PDF_COLORS.inkMuted,
    backgroundColor: PDF_COLORS.background,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 44,
  },
  header: {
    marginBottom: 6,
  },
  name: {
    fontSize: 23,
    fontWeight: 700,
    color: PDF_COLORS.ink,
    letterSpacing: -0.4,
  },
  tagline: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: 500,
    color: PDF_COLORS.inkSubtle,
    textTransform: "uppercase",
    letterSpacing: 1.4,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    color: PDF_COLORS.inkSubtle,
  },
  contactItem: {
    marginRight: 12,
  },
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    color: PDF_COLORS.ink,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    paddingBottom: 2,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.rule,
  },
  summaryText: {
    lineHeight: 1.4,
    color: PDF_COLORS.inkMuted,
  },
  entry: {
    marginBottom: 2,
  },
  entryHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    flex: 1,
    paddingRight: 10,
    fontSize: 10,
  },
  entryOrg: {
    fontWeight: 700,
    color: PDF_COLORS.ink,
  },
  entryRole: {
    fontWeight: 500,
    color: PDF_COLORS.inkMuted,
  },
  entryDate: {
    fontSize: 8,
    color: PDF_COLORS.inkSubtle,
    flexShrink: 0,
  },
  entryMeta: {
    marginTop: 1,
    fontSize: 8,
    color: PDF_COLORS.inkSubtle,
  },
  entryBlurb: {
    marginTop: 2,
    lineHeight: 1.4,
    color: PDF_COLORS.inkSubtle,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillGroup: {
    width: "50%",
    marginBottom: 3,
    paddingRight: 12,
  },
  skillGroupName: {
    fontSize: 8,
    fontWeight: 700,
    color: PDF_COLORS.ink,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  skillList: {
    lineHeight: 1.4,
    color: PDF_COLORS.inkSubtle,
  },
})

function resumeContactItems(): string[] {
  return SITE_SOCIALS.filter((social) => RESUME_SOCIAL_IDS.has(social.id)).map(
    (social) =>
      social.id === "email"
        ? CONTACT_EMAIL
        : social.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
  )
}

export function ResumeDocument() {
  const latestRole = EXPERIENCE[0]?.role ?? ""

  return (
    <Document title={`${SITE_NAME} — Resume`} author={SITE_NAME}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{SITE_NAME}</Text>
          <Text style={styles.tagline}>{latestRole}</Text>
          <View style={styles.contactRow}>
            {resumeContactItems().map((item) => (
              <Text key={item} style={styles.contactItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>
            {HERO.bio} {ABOUT_INTRO}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {EXPERIENCE.map((role) => (
            <View key={role.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHeadRow}>
                <Text style={styles.entryTitle}>
                  <Text style={styles.entryOrg}>{role.organization}</Text>
                  <Text style={styles.entryRole}>
                    {" "}
                    — {toPdfSafeText(role.role)}
                  </Text>
                </Text>
                <Text style={styles.entryDate}>
                  {formatDateRange(role.startDate, role.endDate)}
                </Text>
              </View>
              <Text style={styles.entryBlurb}>{role.blurb}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Work</Text>
          {WORKS.map((work) => (
            <View key={work.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHeadRow}>
                <Text style={styles.entryTitle}>
                  <Text style={styles.entryOrg}>{work.title}</Text>
                </Text>
                <Text style={styles.entryDate}>{work.year}</Text>
              </View>
              <Text style={styles.entryMeta}>
                {[work.role, work.stack?.join(" · ")]
                  .filter(Boolean)
                  .join(" · ")}
              </Text>
              <Text style={styles.entryBlurb}>{work.summary}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {SKILL_GROUPS.map((group) => (
              <View key={group.id} style={styles.skillGroup} wrap={false}>
                <Text style={styles.skillGroupName}>{group.name}</Text>
                <Text style={styles.skillList}>{group.skills.join(", ")}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}
