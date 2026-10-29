export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const

export type NavSectionId = (typeof NAV_ITEMS)[number]["id"]
