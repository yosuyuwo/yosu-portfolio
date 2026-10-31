import type { ChatMessage } from "@/app/_lib/chat-schema"

import { hasPrivateTopic } from "./private-facts"

const SHORT_FOLLOW_UP_WORDS = 4
const TOPICLESS_FOLLOW_UP_WORDS = 12

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length
}

// Topics come from the latest message, so an earlier romance question can't keep its note loaded; a very short message, or a short one with no topic of its own ("why? that is rude"), borrows the message before it.
export function visitorTopicText(messages: ChatMessage[]): string {
  const visitorTexts = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
  const latest = visitorTexts.at(-1) ?? ""
  const previous = visitorTexts.at(-2) ?? ""
  const words = wordCount(latest)
  const isFollowUp =
    words <= SHORT_FOLLOW_UP_WORDS ||
    (words <= TOPICLESS_FOLLOW_UP_WORDS && !hasPrivateTopic(latest))
  return isFollowUp ? `${previous} ${latest}` : latest
}
