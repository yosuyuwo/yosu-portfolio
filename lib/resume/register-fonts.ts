import path from "node:path"

import { Font } from "@react-pdf/renderer"

import { PDF_FONTS } from "./pdf-theme"

const FONTSOURCE_DIR = path.join(process.cwd(), "node_modules/@fontsource")

function fontFile(pkg: string, weight: number, style = "normal") {
  return path.join(
    FONTSOURCE_DIR,
    pkg,
    "files",
    `${pkg}-latin-${weight}-${style}.woff`
  )
}

let registered = false

export function registerResumeFonts() {
  if (registered) return
  registered = true

  Font.register({
    family: PDF_FONTS.sans,
    fonts: [400, 500, 600].map((fontWeight) => ({
      src: fontFile("geist-sans", fontWeight),
      fontWeight,
    })),
  })

  Font.register({
    family: PDF_FONTS.mono,
    fonts: [400, 500].map((fontWeight) => ({
      src: fontFile("geist-mono", fontWeight),
      fontWeight,
    })),
  })

  // react-pdf's default hyphenation breaks words awkwardly (e.g. "front-
  // end"); disabling it keeps line breaks at word boundaries only.
  Font.registerHyphenationCallback((word) => [word])
}
