import type { ChatMessage } from "@/app/_lib/chat-schema"

import { isIndonesian } from "./language"

const MAX_REPORT_LENGTH = 1000
const MIN_DETAIL_WORDS = 3

const PROBLEM_WORDS =
  /\b(broken|bug|bugs|buggy|error|errors|crash|crashes|crashed|glitch|glitchy|slow|laggy|freezes|frozen|typo|404|blank|missing|overlapping|misaligned|cut off)\b/i
const NEGATED_ACTION =
  /\b(don'?t|do not|doesn'?t|does not|won'?t|will not|can'?t|cannot|isn'?t|is not|not)\s+(load|loading|work|working|show|showing|display|displaying|open|opening|respond|responding|appear|appearing)\b/i

// "your site", "this page", "the images on your work page"
const SITE_REFERENCE =
  /\b(your|this|the)\s+(\w+\s+){0,2}(site|website|webpage|page|pages|portfolio|chat|chatbot|bot|form|menu|button|link|links|image|images|photo|photos|video|resume|cv|sidebar|footer|animation)\b/i

// "can you fix my website, it is broken" is a job request, not a report about this site.
const OWN_PROJECT =
  /\b(my|our)\s+(\w+\s+){0,2}(site|website|app|store|shop|page|code|project)\b/i

const QUESTION_STEM =
  /^\s*(do you|did you|have you|are there|is there|can you|could you|will you|would you|how do you|what do you|are you)\b/i

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/
const PHONE_NUMBER = /\d[\d\s().-]{7,}\d/g

const REPORT_PROMPT_EN = "Thanks for telling me."
const REPORT_PROMPT_ID = "Terima kasih sudah memberi tahu."

export type ReportRequest =
  | { kind: "new"; message: string; contact: string | null }
  | {
      kind: "followup"
      message: string
      context: string
      contact: string | null
    }

export function isBugReport(message: string): boolean {
  if (QUESTION_STEM.test(message) || OWN_PROJECT.test(message)) return false
  return (
    (PROBLEM_WORDS.test(message) || NEGATED_ACTION.test(message)) &&
    SITE_REFERENCE.test(message)
  )
}

// A reply to our own "which page and device?" question: some detail, not another chat question.
function isDetailReply(message: string): boolean {
  if (EMAIL.test(message)) return true
  const words = message.trim().split(/\s+/).length
  return words >= MIN_DETAIL_WORDS && !message.includes("?")
}

function splitContact(text: string): {
  message: string
  contact: string | null
} {
  const contact = EMAIL.exec(text)?.[0] ?? null
  const message = text
    .replace(EMAIL, "")
    .replace(PHONE_NUMBER, "[number]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_REPORT_LENGTH)
  return { message, contact }
}

function lastTwoVisitorMessages(messages: ChatMessage[]) {
  const visitor = messages.filter((m) => m.role === "user")
  return {
    latest: visitor.at(-1)?.content ?? "",
    previous: visitor.at(-2)?.content,
  }
}

export function readReport(messages: ChatMessage[]): ReportRequest | null {
  const { latest, previous } = lastTwoVisitorMessages(messages)
  const lastAssistant = messages.filter((m) => m.role === "assistant").at(-1)
  const isAnsweringOurPrompt =
    previous !== undefined &&
    messages.at(-2)?.role === "assistant" &&
    (lastAssistant?.content.startsWith(REPORT_PROMPT_EN) ||
      lastAssistant?.content.startsWith(REPORT_PROMPT_ID))

  if (isAnsweringOurPrompt && isDetailReply(latest)) {
    const { message, contact } = splitContact(latest)
    if (!message && !contact) return null
    return {
      kind: "followup",
      message: message || "(contact details only)",
      context: previous.slice(0, MAX_REPORT_LENGTH),
      contact,
    }
  }

  if (!isBugReport(latest)) return null
  const { message, contact } = splitContact(latest)
  return message ? { kind: "new", message, contact } : null
}

export function reportReply(
  report: ReportRequest,
  visitorText: string
): string {
  const indonesian = isIndonesian(visitorText)
  if (report.kind === "new") {
    return indonesian
      ? `${REPORT_PROMPT_ID} Sudah saya catat dan akan saya cek. Kalau bisa, sebutkan halaman dan perangkat yang kamu pakai, dan tambahkan emailmu kalau mau dibalas.`
      : `${REPORT_PROMPT_EN} I've noted it and I'll look into it. If you can, tell me which page and device you were on, and add your email if you'd like a reply.`
  }
  if (indonesian) {
    return report.contact
      ? "Siap, terima kasih. Sudah saya tambahkan ke laporanmu, dan saya akan email kalau butuh info lagi."
      : "Siap, terima kasih. Sudah saya tambahkan ke laporanmu."
  }
  return report.contact
    ? "Got it, thank you. I've added that to your report, and I'll email you if I need more."
    : "Got it, thank you. I've added that to your report."
}
