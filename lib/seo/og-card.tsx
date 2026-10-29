import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { SITE_NAME } from "@/lib/site-content"

export const OG_SIZE = { width: 1200, height: 630 } as const

const COLORS = {
  background: "#f6f5f0",
  foreground: "#1c1916",
  muted: "#6b665e",
  brand: "#237a4f",
} as const

function loadFont(pkg: string, file: string) {
  return readFile(
    join(process.cwd(), "node_modules/@fontsource", pkg, "files", file)
  )
}

interface OgCardProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export async function ogCard({ eyebrow, title, subtitle }: OgCardProps) {
  const [serif, sans] = await Promise.all([
    loadFont("instrument-serif", "instrument-serif-latin-400-normal.woff"),
    loadFont("geist-sans", "geist-sans-latin-500-normal.woff"),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: COLORS.background,
        color: COLORS.foreground,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          color: COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: 4,
        }}
      >
        <div style={{ width: 40, height: 2, background: COLORS.brand }} />
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: title.length > 24 ? 112 : 148,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: COLORS.muted,
              maxWidth: 940,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ fontSize: 28, color: COLORS.brand }}>{SITE_NAME}</div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Geist", data: sans, style: "normal", weight: 500 },
      ],
    }
  )
}
