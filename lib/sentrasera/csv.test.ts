import assert from "node:assert/strict"
import { test } from "node:test"

import { toCsv } from "./csv"

test("quotes cells containing delimiters, quotes, and newlines", () => {
  assert.equal(
    toCsv(["a", "b"], [['one, two', 'say "hi"'], ["line\nbreak", null]]),
    'a,b\r\n"one, two","say ""hi"""\r\n"line\nbreak",'
  )
})

test("neutralizes spreadsheet formulas in client text", () => {
  assert.equal(toCsv(["a"], [["=HYPERLINK(1)"]]), "a\r\n'=HYPERLINK(1)")
  assert.equal(toCsv(["a"], [["@cmd"]]), "a\r\n'@cmd")
})

test("keeps numbers and plain text unchanged", () => {
  assert.equal(toCsv(["a", "b"], [["plain", 5]]), "a,b\r\nplain,5")
})
