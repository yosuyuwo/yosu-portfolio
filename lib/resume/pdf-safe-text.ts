const PDF_GLYPH_FALLBACKS: [RegExp, string][] = [[/→/g, "->"]]

/**
 * The embedded IBM Plex Sans latin subset doesn't include every symbol used
 * in site copy (e.g. the "→" arrow) — swap those for ASCII-safe equivalents.
 */
export function toPdfSafeText(text: string): string {
  return PDF_GLYPH_FALLBACKS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    text
  )
}
