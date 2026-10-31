import "server-only"

import { getDatabase, type Query } from "./database"
import { normalizeQuestion, questionToStore } from "./unanswered"

const LEARNED_ANSWER_LIMIT = 30
const LEARNED_ANSWER_MAX_LENGTH = 600
const CACHE_MS = 60_000
const WRITE_WINDOW_MS = 60_000
const MAX_WRITES_PER_WINDOW = 30

export interface UnansweredStore {
  record: (question: string) => Promise<void>
  learnedAnswers: () => Promise<string[]>
}

export function createUnansweredStore(query: Query): UnansweredStore {
  let cachedAnswers: { at: number; answers: string[] } | null = null
  let recentWrites: number[] = []

  const underWriteLimit = (now: number): boolean => {
    recentWrites = recentWrites.filter((at) => now - at < WRITE_WINDOW_MS)
    if (recentWrites.length >= MAX_WRITES_PER_WINDOW) return false
    recentWrites = [...recentWrites, now]
    return true
  }

  return {
    // a repeat of the same question just bumps its counter
    async record(rawQuestion) {
      const question = questionToStore(rawQuestion)
      if (!question || !underWriteLimit(Date.now())) return

      await query`
        insert into public.chat_unanswered (question, normalized)
        values (${question}, ${normalizeQuestion(question)})
        on conflict (normalized) do update
          set times_asked = public.chat_unanswered.times_asked + 1,
              last_asked_at = now()`
    },

    async learnedAnswers() {
      const now = Date.now()
      if (cachedAnswers && now - cachedAnswers.at < CACHE_MS) {
        return cachedAnswers.answers
      }

      // cache a failure too, so a missing table or an outage doesn't add a failing call to every message
      let answers: string[] = []
      try {
        const rows = await query`
          select answer from public.chat_unanswered
          where status = 'answered' and answer is not null
          order by last_asked_at desc
          limit ${LEARNED_ANSWER_LIMIT}`
        answers = rows
          .map((row) => String(row.answer ?? "").trim())
          .filter(Boolean)
          .map((answer) => answer.slice(0, LEARNED_ANSWER_MAX_LENGTH))
      } catch (error) {
        console.error("[chat] loading learned answers failed", error)
      }
      cachedAnswers = { at: now, answers }
      return answers
    },
  }
}

let sharedStore: UnansweredStore | null = null

export function getUnansweredStore(): UnansweredStore | null {
  const query = getDatabase()
  if (!query) return null
  // shared, so the answer cache and the write limit survive across requests
  sharedStore ??= createUnansweredStore(query)
  return sharedStore
}
