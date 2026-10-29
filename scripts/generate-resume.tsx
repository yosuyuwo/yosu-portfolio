import { mkdir } from "node:fs/promises"
import path from "node:path"

import { renderToFile } from "@react-pdf/renderer"

import { loadResumePortrait } from "@/lib/resume/load-portrait"
import { registerResumeFonts } from "@/lib/resume/register-fonts"
import { ResumeDocument } from "@/lib/resume/resume-document"

const OUTPUT_DIR = path.join(process.cwd(), "public", "resume")
const OUTPUT_FILE = path.join(OUTPUT_DIR, "yosua-yuwono-resume.pdf")

async function main() {
  registerResumeFonts()
  await mkdir(OUTPUT_DIR, { recursive: true })
  const portrait = await loadResumePortrait()
  await renderToFile(<ResumeDocument portrait={portrait} />, OUTPUT_FILE)
  console.log(`Resume written to ${path.relative(process.cwd(), OUTPUT_FILE)}`)
}

main().catch((error: unknown) => {
  console.error("Failed to generate resume PDF")
  console.error(error)
  process.exitCode = 1
})
