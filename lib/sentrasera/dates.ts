// the pilot runs in Indonesia, so a late-evening submission must land on that local day everywhere
const PILOT_TIME_ZONE = "Asia/Jakarta"

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: PILOT_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

export function toPilotDateKey(isoTimestamp: string): string {
  return dateKeyFormatter.format(new Date(isoTimestamp))
}

export function groupByDateKey<T>(
  items: readonly T[],
  getKey: (item: T) => string
): ReadonlyMap<string, readonly T[]> {
  return items.reduce<Map<string, readonly T[]>>((groups, item) => {
    const key = getKey(item)
    return new Map(groups).set(key, [...(groups.get(key) ?? []), item])
  }, new Map())
}

export function formatPilotDateTime(isoTimestamp: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: PILOT_TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoTimestamp))
}
