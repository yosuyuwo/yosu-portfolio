import "server-only"

import { z } from "zod"

import type { ChatMessage } from "@/app/_lib/chat-schema"

import { inquirySchema, type Inquiry } from "./inquiry-schema"
import { completeJson } from "./openrouter"

const RECENT_MESSAGES = 8

const EXTRACT_PROMPT = `You read a chat between a website visitor and an assistant and decide whether the visitor has asked to hire, collaborate with, or complain to the website owner.
Reply with JSON only, in exactly this shape: {"ready": boolean, "name": string, "email": string, "kind": "work" | "collaboration" | "complaint" | "other", "message": string}
"ready" is true only when the VISITOR clearly wrote all three: their own name, their own email address, and what they need. Otherwise "ready" is false and the other fields may be empty strings.
Copy "name" and "email" exactly as the visitor wrote them. Never invent or guess any field. "kind": work means hiring the owner, collaboration means partnering, complaint means reporting a problem. "message": one or two plain sentences saying what the visitor needs, for example "Needs a landing page and a web app for an education project."`

const extractionSchema = z.object({
  ready: z.boolean(),
  name: z.string(),
  email: z.string(),
  kind: z.enum(["work", "collaboration", "complaint", "other"]).catch("other"),
  message: z.string(),
})

function transcript(messages: ChatMessage[]): string {
  return messages
    .slice(-RECENT_MESSAGES)
    .map(
      (message) =>
        `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`
    )
    .join("\n")
}

function parseJsonObject(text: string): unknown {
  const match = /\{[\s\S]*\}/.exec(text)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

// The model must not be able to invent the contact details: both have to appear in what the visitor typed.
function appearsInVisitorText(value: string, visitorText: string): boolean {
  return visitorText.toLowerCase().includes(value.trim().toLowerCase())
}

export async function extractInquiry(
  messages: ChatMessage[],
  signal: AbortSignal
): Promise<Inquiry | null> {
  const content = await completeJson(
    [
      { role: "system", content: EXTRACT_PROMPT },
      { role: "user", content: transcript(messages) },
    ],
    signal
  )

  const extracted = extractionSchema.safeParse(parseJsonObject(content))
  if (!extracted.success || !extracted.data.ready) return null

  const inquiry = inquirySchema.safeParse(extracted.data)
  if (!inquiry.success) return null

  const visitorText = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n")
  const firstName = inquiry.data.name.split(/\s+/)[0]
  const isGrounded =
    appearsInVisitorText(inquiry.data.email, visitorText) &&
    appearsInVisitorText(firstName, visitorText)

  return isGrounded ? inquiry.data : null
}
