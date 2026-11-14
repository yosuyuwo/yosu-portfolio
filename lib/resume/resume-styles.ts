import { StyleSheet } from "@react-pdf/renderer"

import { PDF_COLORS, PDF_FONTS } from "./pdf-theme"

const LABEL = {
  fontFamily: PDF_FONTS.mono,
  textTransform: "uppercase",
  letterSpacing: 1.1,
} as const

export const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONTS.sans,
    fontSize: 9,
    lineHeight: 1.4,
    color: PDF_COLORS.inkMuted,
    backgroundColor: PDF_COLORS.background,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 44,
  },

  header: {
    paddingBottom: 12,
    borderBottomWidth: 0.75,
    borderBottomColor: PDF_COLORS.ink,
  },
  name: {
    fontSize: 25,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: -0.8,
    color: PDF_COLORS.ink,
  },
  headline: {
    ...LABEL,
    marginTop: 7,
    fontSize: 7.5,
    color: PDF_COLORS.brand,
  },
  contactRow: {
    marginTop: 7,
    fontSize: 8.5,
    color: PDF_COLORS.inkMuted,
  },
  contactRowFollowing: {
    marginTop: 3,
  },
  contactLink: {
    color: PDF_COLORS.inkMuted,
    textDecoration: "none",
  },
  contactSeparator: {
    color: PDF_COLORS.rule,
  },

  section: {
    marginTop: 12,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    marginBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_COLORS.rule,
  },
  sectionMarker: {
    width: 4,
    height: 4,
    marginRight: 6,
    borderRadius: 2,
    backgroundColor: PDF_COLORS.brand,
  },
  sectionTitle: {
    ...LABEL,
    fontSize: 7.5,
    fontWeight: 500,
    color: PDF_COLORS.ink,
  },

  entry: {
    marginBottom: 7,
  },
  entryTitle: {
    fontSize: 9.5,
    fontWeight: 600,
    color: PDF_COLORS.ink,
  },
  entrySubtitle: {
    fontSize: 9,
    color: PDF_COLORS.inkSubtle,
  },
  entryLink: {
    color: PDF_COLORS.inkSubtle,
    textDecoration: "none",
  },

  projectSummary: {
    marginTop: 3,
  },
  projectStack: {
    marginTop: 1.5,
    fontSize: 8.5,
    color: PDF_COLORS.inkSubtle,
  },

  bulletList: {
    marginTop: 3,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 1.5,
  },
  bulletMarker: {
    width: 9,
    color: PDF_COLORS.inkSubtle,
  },
  bulletText: {
    flex: 1,
  },

  skillRow: {
    marginBottom: 2.5,
  },
  skillGroupName: {
    fontWeight: 600,
    color: PDF_COLORS.ink,
  },
})
