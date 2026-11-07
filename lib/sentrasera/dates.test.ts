import assert from "node:assert/strict"
import { test } from "node:test"

import { formatPilotDateTime, groupByDateKey, toPilotDateKey } from "./dates"

test("formats timestamps in the selected language", () => {
  const timestamp = "2026-08-17T02:00:00.000Z"
  assert.match(formatPilotDateTime(timestamp), /17 Aug 2026/)
  assert.match(formatPilotDateTime(timestamp, "id"), /17 Agu 2026/)
})

test("uses the pilot's local day, not UTC", () => {
  assert.equal(toPilotDateKey("2026-11-07T18:30:00.000Z"), "2026-11-08")
  assert.equal(toPilotDateKey("2026-11-07T16:59:59.000Z"), "2026-11-07")
})

test("groups items by key and keeps their order", () => {
  const groups = groupByDateKey(
    [
      { id: 1, day: "a" },
      { id: 2, day: "b" },
      { id: 3, day: "a" },
    ],
    (item) => item.day
  )
  assert.deepEqual(
    groups.get("a")?.map((item) => item.id),
    [1, 3]
  )
  assert.equal(groups.get("b")?.length, 1)
})
