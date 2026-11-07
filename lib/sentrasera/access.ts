import type { PortalRole } from "./schemas"

export const AUTH_COOKIE_PREFIX = "sentrasera"
export const LOGIN_PATH = "/login"
export const VERIFY_PATH = "/verify"

export const HOME_BY_ROLE: Record<PortalRole, string> = {
  admin: "/admin/clients",
  client: "/questions",
}

export function resolvePortalRedirect(
  viewer: { role: PortalRole } | null,
  requiredRole: PortalRole
): string | null {
  if (!viewer) return LOGIN_PATH
  if (viewer.role !== requiredRole) return HOME_BY_ROLE[viewer.role]
  return null
}

export function buildVerifyUrl(token: string): string {
  const params = new URLSearchParams({
    token,
    callbackURL: "/",
    errorCallbackURL: LOGIN_PATH,
  })
  return `/api/auth/magic-link/verify?${params}`
}
