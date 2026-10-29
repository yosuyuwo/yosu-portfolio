const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number)
  if (!y || !m) return iso
  return `${MONTHS[m - 1]} ${y}`
}

export function formatRange(startDate: string, endDate: string | null): string {
  const start = formatMonthYear(startDate)
  if (!endDate) return `${start} – Present`
  return `${start} – ${formatMonthYear(endDate)}`
}
