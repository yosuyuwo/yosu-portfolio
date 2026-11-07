import "server-only"

const RESEND_URL = "https://api.resend.com/emails"
const SEND_TIMEOUT_MS = 8000

type PortalEmail = {
  to: string
  subject: string
  text: string
}

// a failed notification must never fail the action that triggered it
export async function sendPortalEmail(email: PortalEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.SENTRASERA_FROM_EMAIL
  if (!apiKey || !from) {
    console.error("[sentrasera] email not configured, nothing sent")
    return
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email.to,
        subject: email.subject.replace(/[\r\n]+/g, " "),
        text: email.text,
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    })
    if (!response.ok) {
      console.error("[sentrasera] email rejected", response.status)
    }
  } catch (error) {
    console.error("[sentrasera] email failed", error)
  }
}

export function portalLink(path: string): string {
  return `${process.env.SENTRASERA_URL ?? ""}${path}`
}
