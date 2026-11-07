import assert from "node:assert/strict"
import { test } from "node:test"

import { isValidAnswer, questionInputSchema, signInSchema } from "./schemas"

test("text answers must be non-blank and within the limit", () => {
  const question = { kind: "text", choices: [] } as const
  assert.equal(isValidAnswer(question, "Works well"), true)
  assert.equal(isValidAnswer(question, "   "), false)
  assert.equal(isValidAnswer(question, "x".repeat(5001)), false)
})

test("choice answers must be one of the question's choices", () => {
  const question = { kind: "choice", choices: ["Yes", "No"] } as const
  assert.equal(isValidAnswer(question, "Yes"), true)
  assert.equal(isValidAnswer(question, "Maybe"), false)
})

test("rating answers must be a whole number from 1 to 5", () => {
  const question = { kind: "rating", choices: [] } as const
  assert.equal(isValidAnswer(question, "5"), true)
  assert.equal(isValidAnswer(question, "0"), false)
  assert.equal(isValidAnswer(question, "2.5"), false)
})

test("choice questions need at least two choices", () => {
  const result = questionInputSchema.safeParse({
    categoryId: "7f1f5b1e-3f2c-4a55-9d6e-0b7c2a1d4e11",
    prompt: "Which method?",
    kind: "choice",
    choices: ["Only one"],
  })
  assert.equal(result.success, false)
})

test("sign-in email is normalized so it matches the stored profile", () => {
  const result = signInSchema.parse({ email: "  Owner@Example.COM " })
  assert.equal(result.email, "owner@example.com")
})
