import path from "node:path"

import sharp from "sharp"

import { HERO_PORTRAIT } from "@/lib/site-content"

export const PORTRAIT_ASPECT = 4 / 5

const OUTPUT_WIDTH = 400

// headshot framing within the full-length portrait, as fractions of its width
const FRAME = { width: 0.6, centerX: 0.47, top: 0.03 } as const

export async function loadResumePortrait(): Promise<Buffer> {
  const source = path.join(process.cwd(), "public", HERO_PORTRAIT.src)
  const { width = 0 } = await sharp(source).metadata()
  const cropWidth = Math.round(width * FRAME.width)
  const cropHeight = Math.round(cropWidth / PORTRAIT_ASPECT)

  return sharp(source)
    .extract({
      left: Math.round(width * FRAME.centerX - cropWidth / 2),
      top: Math.round(width * FRAME.top),
      width: cropWidth,
      height: cropHeight,
    })
    .resize(OUTPUT_WIDTH, Math.round(OUTPUT_WIDTH / PORTRAIT_ASPECT))
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer()
}
