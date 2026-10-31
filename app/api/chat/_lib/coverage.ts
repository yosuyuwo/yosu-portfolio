import "server-only"

import { z } from "zod"

import type { ChatMessage } from "@/app/_lib/chat-schema"

import { completeJson } from "./openrouter"

const RECENT_MESSAGES = 3
const SHORT_MESSAGE_WORDS = 2

const COVERAGE_PROMPT = `You decide whether a visitor's question to a person's portfolio chatbot can be answered using ONLY the facts below. Judge by meaning: the question may be in Indonesian or another language, and the facts are in English (for example "hewan peliharaan" means pets).
Reply with JSON only, in exactly this shape: {"covered": boolean}
"covered" is false when the visitor asks the person for a detail about their own life, preferences, habits, opinions, history, work or numbers that the facts do not state, even if a plausible answer could be guessed. Food, drinks, colors, pets, family, favorites, daily routines, languages spoken, instruments, travel and opinions are not covered unless the facts state them.
"covered" is true when the facts state the answer, or when the message is a greeting, thanks, small talk about the chat itself, a request to hire or collaborate, any complaint, feedback or bug report about the website (broken, slow, images not loading), a question about whether the chatbot is a human or an AI, a question about politics, relationships or sexuality (separate rules handle those), or a general request that is not about the person at all (coding help, trivia).

# Facts
`

const coverageSchema = z.object({ covered: z.boolean() })

function transcript(messages: ChatMessage[]): string {
  return messages
    .slice(-RECENT_MESSAGES)
    .map(
      (message) =>
        `${message.role === "user" ? "Visitor" : "Chatbot"}: ${message.content}`
    )
    .join("\n")
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length
}

// Small models invent a plausible answer instead of admitting they don't know, so this is decided by a separate narrow call, not by the reply itself. Any failure counts as covered, so the chat is never blocked by it.
export async function isCovered(
  facts: string,
  messages: ChatMessage[],
  signal: AbortSignal
): Promise<boolean> {
  const latest = messages.filter((m) => m.role === "user").at(-1)?.content ?? ""
  if (wordCount(latest) <= SHORT_MESSAGE_WORDS) return true

  try {
    const content = await completeJson(
      [
        { role: "system", content: `${COVERAGE_PROMPT}${facts}` },
        { role: "user", content: transcript(messages) },
      ],
      signal
    )
    const match = /\{[\s\S]*\}/.exec(content)
    const parsed = coverageSchema.safeParse(match ? JSON.parse(match[0]) : null)
    return parsed.success ? parsed.data.covered : true
  } catch (error) {
    console.error("[chat] coverage check failed", error)
    return true
  }
}
