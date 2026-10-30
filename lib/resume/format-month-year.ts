export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function formatYearRange(
  startDate: string,
  endDate: string | null
): string {
  const start = new Date(startDate).getUTCFullYear()
  return endDate
    ? `${start} – ${new Date(endDate).getUTCFullYear()}`
    : `${start} – Present`
}

export function formatDateRange(
  startDate: string,
  endDate: string | null
): string {
  const start = formatMonthYear(startDate)
  return endDate
    ? `${start} – ${formatMonthYear(endDate)}`
    : `${start} – Present`
}
