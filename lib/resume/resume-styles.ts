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
    paddingTop: 38,
    paddingBottom: 44,
    paddingHorizontal: 44,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 12,
    borderBottomWidth: 0.75,
    borderBottomColor: PDF_COLORS.ink,
  },
  headerText: {
    flex: 1,
    paddingRight: 16,
  },
  portrait: {
    width: 68,
    height: 85,
    borderRadius: 4,
    objectFit: "cover",
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
  contactLink: {
    color: PDF_COLORS.inkMuted,
    textDecoration: "none",
  },
  contactSeparator: {
    color: PDF_COLORS.rule,
  },

  section: {
    marginTop: 14,
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
    marginBottom: 8,
  },
  entryHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryTitle: {
    flex: 1,
    paddingRight: 12,
    fontSize: 9.5,
    fontWeight: 600,
    color: PDF_COLORS.ink,
  },
  entryDate: {
    fontFamily: PDF_FONTS.mono,
    fontSize: 7.5,
    color: PDF_COLORS.inkSubtle,
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
    width: 2.5,
    height: 2.5,
    marginTop: 5,
    marginRight: 7,
    marginLeft: 1,
    borderRadius: 1.25,
    backgroundColor: PDF_COLORS.inkSubtle,
  },
  bulletText: {
    flex: 1,
  },

  skillRow: {
    flexDirection: "row",
    marginBottom: 2.5,
  },
  skillGroupName: {
    width: 78,
    fontWeight: 600,
    color: PDF_COLORS.ink,
  },
  skillList: {
    flex: 1,
  },

  footer: {
    ...LABEL,
    letterSpacing: 0.6,
    position: "absolute",
    bottom: 22,
    left: 44,
    fontSize: 6.5,
    color: PDF_COLORS.inkSubtle,
  },
})
