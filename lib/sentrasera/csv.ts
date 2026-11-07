const FORMULA_PREFIX = /^[=+\-@\t\r]/

// spreadsheets execute cells starting with these characters, and clients write this text
function neutralizeFormula(value: string): string {
  return FORMULA_PREFIX.test(value) ? `'${value}` : value
}

function toCell(value: string | number | null): string {
  const text = neutralizeFormula(value === null ? "" : String(value))
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function toCsv(
  headers: readonly string[],
  rows: readonly (readonly (string | number | null)[])[]
): string {
  return [headers, ...rows].map((row) => row.map(toCell).join(",")).join("\r\n")
}
