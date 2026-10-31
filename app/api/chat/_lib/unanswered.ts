import { CONTACT_EMAIL } from "@/lib/site-content"

import { isIndonesian } from "./language"

const MIN_QUESTION_LENGTH = 8
const MAX_QUESTION_LENGTH = 300
const MAX_NORMALIZED_LENGTH = 200

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/
const PHONE_NUMBER = /\d[\d\s().-]{7,}\d/
const LINK = /https?:\/\/|www\./i

// Only the question text is ever stored, and never one that carries contact details.
export function questionToStore(raw: string): string | null {
  const question = raw.replace(/\s+/g, " ").trim().slice(0, MAX_QUESTION_LENGTH)
  if (question.length < MIN_QUESTION_LENGTH) return null
  if (
    EMAIL.test(question) ||
    PHONE_NUMBER.test(question) ||
    LINK.test(question)
  ) {
    return null
  }
  return question
}

export function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NORMALIZED_LENGTH)
}

// Sent instead of a model reply when the facts don't cover the question, so nothing gets made up.
export function uncoveredReply(visitorText: string): string {
  return isIndonesian(visitorText)
    ? `Saya belum yakin soal itu. Kamu bisa tanya saya lewat email di ${CONTACT_EMAIL}.`
    : `I'm not sure about that. You can ask me by email at ${CONTACT_EMAIL}.`
}
