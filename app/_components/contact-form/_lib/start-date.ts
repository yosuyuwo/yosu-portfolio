const pad = (value: number) => String(value).padStart(2, "0")

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function todayIso(): string {
  return toIsoDate(new Date())
}

export function addDaysIso(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

export function formatStartDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}
