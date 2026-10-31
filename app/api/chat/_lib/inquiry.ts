import "server-only"

import { z } from "zod"

import type { ChatMessage } from "@/app/_lib/chat-schema"
import { CONTACT_EMAIL } from "@/lib/site-content"
import { absoluteUrl } from "@/lib/site-url"

import { extractInquiry } from "./inquiry-extract"
import { inquirySchema, type Inquiry } from "./inquiry-schema"

export { inquirySchema }

const RESEND_URL = "https://api.resend.com/emails"
const DEFAULT_FROM = "Portfolio chat <onboarding@resend.dev>"
const SEND_TIMEOUT_MS = 10_000
const WINDOW_MS = 3_600_000
const MAX_SENDS_PER_WINDOW = 3

const KIND_LABELS = {
  work: "Work inquiry",
  collaboration: "Collaboration",
  complaint: "Complaint",
  other: "Message",
} as const

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  INQUIRY_TO_EMAIL: z.string().optional(),
  INQUIRY_FROM_EMAIL: z.string().optional(),
})

export interface InquiryEnv {
  apiKey: string
  to: string
  from: string
}

export interface ChatTool {
  name: string
  definition: Record<string, unknown>
  // arguments to call the tool with when the server can already tell the call is due, so it doesn't depend on the model deciding to
  prepare?: (
    messages: ChatMessage[],
    signal: AbortSignal
  ) => Promise<string | null>
  execute: (rawArguments: string) => Promise<ToolOutcome>
}

interface ToolOutcome {
  content: string
  fallbackText: string
}

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/
const DUPLICATE_WINDOW_MS = 600_000

const sendTimes = new Map<string, readonly number[]>()
const recentInquiries = new Map<string, number>()

export function readInquiryEnv(): InquiryEnv | null {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) return null
  return {
    apiKey: parsed.data.RESEND_API_KEY,
    to: parsed.data.INQUIRY_TO_EMAIL || CONTACT_EMAIL,
    from: parsed.data.INQUIRY_FROM_EMAIL || DEFAULT_FROM,
  }
}

function acquireSendSlot(key: string, now: number): boolean {
  const recent = (sendTimes.get(key) ?? []).filter((at) => now - at < WINDOW_MS)
  if (recent.length >= MAX_SENDS_PER_WINDOW) return false
  sendTimes.set(key, [...recent, now])
  return true
}

function isDuplicate(inquiry: Inquiry, now: number): boolean {
  const key = `${inquiry.email.toLowerCase()}|${inquiry.kind}`
  const sentAt = recentInquiries.get(key)
  return sentAt !== undefined && now - sentAt < DUPLICATE_WINDOW_MS
}

function rememberInquiry(inquiry: Inquiry, now: number) {
  recentInquiries.set(`${inquiry.email.toLowerCase()}|${inquiry.kind}`, now)
}

function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim()
}

// Resend answers 403/422 when the sender address belongs to a domain that is not verified (yet).
const SENDER_REJECTED_STATUSES = new Set([403, 422])
const SUBJECT_TAG = "[Portfolio]"

function postEmail(
  env: InquiryEnv,
  from: string,
  inquiry: Inquiry
): Promise<Response> {
  const label = KIND_LABELS[inquiry.kind]
  return fetch(RESEND_URL, {
    method: "POST",
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    headers: {
      Authorization: `Bearer ${env.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [env.to],
      reply_to: inquiry.email,
      subject: `${SUBJECT_TAG} ${label} from ${singleLine(inquiry.name)}`,
      text: [
        `New message from the chat assistant on ${absoluteUrl("/")}`,
        "",
        `Type: ${label}`,
        `Name: ${singleLine(inquiry.name)}`,
        `Email: ${inquiry.email}`,
        "",
        inquiry.message,
      ].join("\n"),
    }),
  })
}

async function sendEmail(env: InquiryEnv, inquiry: Inquiry): Promise<void> {
  let response = await postEmail(env, env.from, inquiry)

  const canFallBack =
    !response.ok &&
    env.from !== DEFAULT_FROM &&
    SENDER_REJECTED_STATUSES.has(response.status)
  if (canFallBack) {
    const detail = await response.text().catch(() => "")
    console.warn(
      `[chat] sender "${env.from}" was rejected, retrying with the Resend test sender: ${detail}`
    )
    response = await postEmail(env, DEFAULT_FROM, inquiry)
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(`Resend responded with ${response.status}: ${detail}`)
  }
}

function outcome(ok: boolean, error?: string, note?: string): ToolOutcome {
  return {
    content: JSON.stringify(ok ? { ok: true, note } : { ok: false, error }),
    fallbackText: ok
      ? "Your message has been sent. I'll reply by email."
      : `I couldn't send your message. Please email ${CONTACT_EMAIL} instead.`,
  }
}

export function createInquiryTool(
  env: InquiryEnv,
  visitorKey: string
): ChatTool {
  return {
    name: "send_inquiry",
    definition: {
      type: "function",
      function: {
        name: "send_inquiry",
        description:
          "Email the visitor's message to me. Only call it after the visitor has clearly given their name, email address and what they need.",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "The visitor's name" },
            email: {
              type: "string",
              description:
                "The visitor's email address, exactly as they wrote it",
            },
            kind: {
              type: "string",
              enum: ["work", "collaboration", "complaint", "other"],
              description:
                "work: hiring me. collaboration: partnering on something. complaint: a problem or complaint.",
            },
            message: {
              type: "string",
              description:
                "What the visitor wants, in their own words, written clearly",
            },
          },
          required: ["name", "email", "kind", "message"],
        },
      },
    },
    prepare: async (messages, signal) => {
      const latest =
        messages.filter((m) => m.role === "user").at(-1)?.content ?? ""
      if (!EMAIL_PATTERN.test(latest)) return null
      const inquiry = await extractInquiry(messages, signal)
      return inquiry ? JSON.stringify(inquiry) : null
    },
    execute: async (rawArguments) => {
      let args: unknown
      try {
        args = JSON.parse(rawArguments)
      } catch {
        return outcome(
          false,
          "The arguments were not valid. Ask the visitor again."
        )
      }

      const parsed = inquirySchema.safeParse(args)
      if (!parsed.success) {
        return outcome(
          false,
          "Some details are missing or invalid. Ask the visitor for their name, a valid email address and their message."
        )
      }
      if (isDuplicate(parsed.data, Date.now())) {
        return outcome(
          true,
          undefined,
          "This visitor's message was already sent a moment ago. Do not send it again; just confirm it."
        )
      }
      if (!acquireSendSlot(visitorKey, Date.now())) {
        return outcome(
          false,
          `Too many messages from this visitor. Ask them to email ${CONTACT_EMAIL} directly.`
        )
      }

      try {
        await sendEmail(env, parsed.data)
        rememberInquiry(parsed.data, Date.now())
        return outcome(true)
      } catch (error) {
        console.error("[chat] inquiry email failed", error)
        return outcome(
          false,
          `The email could not be sent. Apologize and give ${CONTACT_EMAIL}.`
        )
      }
    },
  }
}
