import { isPortalHost } from "@/lib/sentrasera/host"
import { getAuth } from "@/server/sentrasera/auth"

function handler(request: Request): Promise<Response> | Response {
  const host = request.headers.get("host")
  if (!isPortalHost(host, process.env.SENTRASERA_URL)) {
    return new Response(null, { status: 404 })
  }
  return getAuth().handler(request)
}

export { handler as GET, handler as POST }
