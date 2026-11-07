import { toCsv } from "@/lib/sentrasera/csv"

// the BOM makes Excel read names with accents as UTF-8
const UTF8_BOM = "﻿"

export function downloadCsv(
  filename: string,
  headers: readonly string[],
  rows: readonly (readonly (string | number | null)[])[]
): void {
  const blob = new Blob([UTF8_BOM, toCsv(headers, rows)], {
    type: "text/csv;charset=utf-8",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
