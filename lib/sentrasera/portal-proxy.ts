import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"

import { AUTH_COOKIE_PREFIX, LOGIN_PATH, VERIFY_PATH } from "./access"
import { isPortalAssetPath, toPortalRoutePath } from "./host"

const SIGNED_OUT_PATHS: readonly string[] = [LOGIN_PATH, VERIFY_PATH]

function resolvePortalResponse(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl
  // the portal's icon is already served from its internal path, so it must not be prefixed again
  if (isPortalAssetPath(pathname)) return NextResponse.next()

  const hasSession = Boolean(
    getSessionCookie(request, { cookiePrefix: AUTH_COOKIE_PREFIX })
  )
  if (!hasSession && !SIGNED_OUT_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(LOGIN_PATH, process.env.SENTRASERA_URL))
  }

  const rewriteTarget = request.nextUrl.clone()
  rewriteTarget.pathname = toPortalRoutePath(pathname)
  return NextResponse.rewrite(rewriteTarget)
}

// Only checks that a session cookie exists. tRPC procedures validate the session and role on every call.
export function handlePortalRequest(request: NextRequest): NextResponse {
  const response = resolvePortalResponse(request)
  response.headers.set("X-Robots-Tag", "noindex, nofollow")
  return response
}
