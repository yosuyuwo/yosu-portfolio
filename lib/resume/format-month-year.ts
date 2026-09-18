export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
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
