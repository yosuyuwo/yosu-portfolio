import path from "node:path"

import { Font } from "@react-pdf/renderer"

import { PDF_FONT_FAMILY } from "./pdf-theme"

const FONT_DIR = path.join(
  process.cwd(),
  "node_modules/@fontsource/ibm-plex-sans/files"
)

const WEIGHTS = [400, 500, 600, 700] as const

let registered = false

export function registerResumeFonts() {
  if (registered) return
  registered = true

  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: WEIGHTS.map((weight) => ({
      src: path.join(FONT_DIR, `ibm-plex-sans-latin-${weight}-normal.woff`),
      fontWeight: weight,
    })),
  })

  // react-pdf's default hyphenation breaks words awkwardly (e.g. "front-
  // end"); disabling it keeps line breaks at word boundaries only.
  Font.registerHyphenationCallback((word) => [word])
}
