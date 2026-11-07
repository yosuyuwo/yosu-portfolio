import { NextResponse, type NextRequest } from "next/server"

import { isPortalHost, isPortalRoutePath } from "@/lib/sentrasera/host"
import { handlePortalRequest } from "@/lib/sentrasera/portal-proxy"

const NOT_FOUND_PATH = "/not-found"

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")
  if (isPortalHost(host, process.env.SENTRASERA_URL)) {
    return handlePortalRequest(request)
  }
  if (isPortalRoutePath(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url))
  }
  return NextResponse.next()
}

export const config = {
  // file-like paths are included so they can't reach the portfolio from the portal host, or the portal from the main host
  matcher: ["/((?!api|_next/static|_next/image).*)"],
}
