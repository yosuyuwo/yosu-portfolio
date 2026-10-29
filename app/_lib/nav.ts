export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const

export type NavSectionId = (typeof NAV_ITEMS)[number]["id"]

// "work" leads home rather than to an anchor; home's own links stay in-page
export function navHref(id: NavSectionId, isHome: boolean): string {
  if (id === "work") return isHome ? "#top" : "/"
  return isHome ? `#${id}` : `/#${id}`
}

const WORK_PATH = /^\/work\/([^/]+)/

export function workSlugFromPath(pathname: string): string | null {
  return WORK_PATH.exec(pathname)?.[1] ?? null
}
