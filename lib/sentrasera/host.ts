export const PORTAL_ROUTE_PREFIX = "/sentrasera"
const PORTAL_LOGO_FOLDER = "/sentrasera-logo/"

function parseHostname(portalUrl: string | undefined): string | null {
  if (!portalUrl) return null
  try {
    return new URL(portalUrl).hostname.toLowerCase()
  } catch {
    return null
  }
}

export function isPortalHost(
  hostHeader: string | null,
  portalUrl: string | undefined
): boolean {
  const portalHostname = parseHostname(portalUrl)
  if (!portalHostname || !hostHeader) return false
  return hostHeader.split(":")[0].toLowerCase() === portalHostname
}

export function isPortalRoutePath(pathname: string): boolean {
  return (
    pathname === PORTAL_ROUTE_PREFIX ||
    pathname.startsWith(`${PORTAL_ROUTE_PREFIX}/`)
  )
}

export function isPortalAssetPath(pathname: string): boolean {
  if (pathname.startsWith(PORTAL_LOGO_FOLDER)) return true
  return isPortalRoutePath(pathname) && /\.[^/]+$/.test(pathname)
}

export function toPortalRoutePath(pathname: string): string {
  return pathname === "/"
    ? PORTAL_ROUTE_PREFIX
    : `${PORTAL_ROUTE_PREFIX}${pathname}`
}
