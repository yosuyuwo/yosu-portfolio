import { z } from "zod"

export const CHAT_CONTEXT_MESSAGES = 20
export const CHAT_MAX_MESSAGE_LENGTH = 1000
const CHAT_MAX_REPLY_LENGTH = 5000

const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z.string().trim().min(1).max(CHAT_MAX_MESSAGE_LENGTH),
})

const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.string().trim().min(1).max(CHAT_MAX_REPLY_LENGTH),
})

const chatMessageSchema = z.discriminatedUnion("role", [
  userMessageSchema,
  assistantMessageSchema,
])

export const chatRequestSchema = z.object({
  messages: z
    .array(chatMessageSchema)
    .min(1)
    .max(CHAT_CONTEXT_MESSAGES)
    .refine((messages) => messages.at(-1)?.role === "user", {
      message: "The last message must come from the user",
    }),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>
export type ChatRequest = z.infer<typeof chatRequestSchema>
