import assert from "node:assert/strict"
import { test } from "node:test"

import { isLocale, pickText, toChoiceOptions } from "./locale"

test("recognises only the supported locales", () => {
  assert.equal(isLocale("en"), true)
  assert.equal(isLocale("id"), true)
  assert.equal(isLocale("fr"), false)
  assert.equal(isLocale(null), false)
})

test("picks Bahasa wording only when it is selected and present", () => {
  assert.equal(pickText("id", "Taxes", "Pajak"), "Pajak")
  assert.equal(pickText("en", "Taxes", "Pajak"), "Taxes")
  assert.equal(pickText("id", "Taxes", null), "Taxes")
  assert.equal(pickText("id", "Taxes", "   "), "Taxes")
})

test("keeps English as the stored value while showing the translated label", () => {
  assert.deepEqual(toChoiceOptions("id", ["Daily", "Never"], ["Harian", "Tidak pernah"]), [
    { value: "Daily", label: "Harian" },
    { value: "Never", label: "Tidak pernah" },
  ])
})

test("shows English choices when English is selected or the translation is missing", () => {
  const english = [{ value: "Daily", label: "Daily" }]
  assert.deepEqual(toChoiceOptions("en", ["Daily"], ["Harian"]), english)
  assert.deepEqual(toChoiceOptions("id", ["Daily"], []), english)
})
