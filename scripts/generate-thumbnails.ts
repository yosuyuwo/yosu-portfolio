import path from "node:path"
import sharp from "sharp"

const WORKS_DIR = path.join(process.cwd(), "public", "works")
const OUTPUT_NAME = "thumbnail.jpg"

const CANVAS = { width: 1920, height: 1080 } as const
const GAP = 32
const RADIUS = 18
const HERO = { width: 880, height: 495 } as const
const TILE = { width: 640, height: 360 } as const
const LEFT_COLUMN_TOP = -60
const RIGHT_COLUMN_TOP = -4
const SIDE_TILE_COUNT = 3

interface ThumbnailSpec {
  slug: string
  background: string
  hero: string
  above: string
  below: string
  left: readonly string[]
  right: readonly string[]
}

interface Placement {
  file: string
  left: number
  top: number
  width: number
  height: number
  isHero?: boolean
}

const SPECS: readonly ThumbnailSpec[] = [
  {
    slug: "terbit",
    background: "#efe6d2",
    hero: "landing-hero.webp",
    above: "auth-register.webp",
    below: "landing-pricing.webp",
    left: [
      "landing-hero-dark.webp",
      "landing-schedule.webp",
      "auth-login.webp",
    ],
    right: [
      "landing-one-article.webp",
      "landing-steps.webp",
      "landing-studio.webp",
    ],
  },
  {
    slug: "gaiana",
    background: "#e9e1d4",
    hero: "home.webp",
    above: "how-to-rent.webp",
    below: "catalogue.webp",
    left: ["contact.webp", "product.webp", "faq.webp"],
    right: ["filters.webp", "calendar.webp", "home-id.webp"],
  },
  {
    slug: "wilmots",
    background: "#f1ead8",
    hero: "hero.webp",
    above: "tutorial-score.webp",
    below: "gallery.webp",
    left: ["description.webp", "what-you-get.webp", "creators.webp"],
    right: ["draw-and-place.webp", "how-to-play.webp", "navigation.webp"],
  },
  {
    slug: "morfolabs",
    background: "#151b2c",
    hero: "hero.webp",
    above: "footer.webp",
    below: "exchanges.webp",
    left: ["services.webp", "proof.webp", "faq.webp"],
    right: ["use-cases.webp", "dashboard.webp", "get-started.webp"],
  },
  {
    slug: "abi",
    background: "#e8eefb",
    hero: "hero.webp",
    above: "hero-id.webp",
    below: "dictionary.webp",
    left: ["vision-mission.webp", "members.webp", "events-grid.webp"],
    right: ["events.webp", "partners.webp", "event-detail.webp"],
  },
  {
    slug: "elevate",
    background: "#1e1e1e",
    hero: "hero.webp",
    above: "studio.webp",
    below: "sign-in.webp",
    left: ["classes.webp", "packages.webp", "schedule.webp"],
    right: ["class-detail.webp", "classes-carousel.webp", "contact.webp"],
  },
]

function columnPlacements(
  files: readonly string[],
  left: number,
  top: number
): Placement[] {
  return files.map((file, index) => ({
    file,
    left,
    top: top + index * (TILE.height + GAP),
    width: TILE.width,
    height: TILE.height,
  }))
}

function layout(spec: ThumbnailSpec): Placement[] {
  const heroLeft = Math.round((CANVAS.width - HERO.width) / 2)
  const heroTop = Math.round((CANVAS.height - HERO.height) / 2)
  const leftColumnX = heroLeft - GAP - TILE.width
  const rightColumnX = heroLeft + HERO.width + GAP

  return [
    ...columnPlacements(spec.left, leftColumnX, LEFT_COLUMN_TOP),
    ...columnPlacements(spec.right, rightColumnX, RIGHT_COLUMN_TOP),
    {
      file: spec.above,
      left: heroLeft,
      top: heroTop - GAP - HERO.height,
      ...HERO,
    },
    {
      file: spec.below,
      left: heroLeft,
      top: heroTop + HERO.height + GAP,
      ...HERO,
    },
    { file: spec.hero, left: heroLeft, top: heroTop, ...HERO, isHero: true },
  ]
}

function roundedMask(width: number, height: number): Buffer {
  return Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${RADIUS}" ry="${RADIUS}" fill="#fff"/></svg>`
  )
}

function borderOverlay(width: number, height: number, isDark: boolean): Buffer {
  const stroke = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"
  return Buffer.from(
    `<svg width="${width}" height="${height}"><rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${RADIUS}" ry="${RADIUS}" fill="none" stroke="${stroke}"/></svg>`
  )
}

function shadowLayer(
  placements: readonly Placement[],
  isDark: boolean
): Buffer {
  const opacity = isDark ? 0.6 : 0.16
  const rects = placements
    .map((p) => {
      const drop = p.isHero ? 28 : 14
      const fill = `rgba(0,0,0,${p.isHero ? opacity * 1.6 : opacity})`
      return `<rect x="${p.left}" y="${p.top + drop}" width="${p.width}" height="${p.height}" rx="${RADIUS}" fill="${fill}"/>`
    })
    .join("")
  return Buffer.from(
    `<svg width="${CANVAS.width}" height="${CANVAS.height}"><defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="26"/></filter></defs><g filter="url(#b)">${rects}</g></svg>`
  )
}

async function renderTile(
  dir: string,
  placement: Placement,
  isDark: boolean
): Promise<Buffer> {
  const { width, height } = placement
  return sharp(path.join(dir, placement.file))
    .resize(width, height, { fit: "cover", position: "top" })
    .composite([
      { input: roundedMask(width, height), blend: "dest-in" },
      { input: borderOverlay(width, height, isDark) },
    ])
    .png()
    .toBuffer()
}

function clipToCanvas(
  tile: Buffer,
  placement: Placement
): Promise<sharp.OverlayOptions | null> {
  const left = Math.max(0, placement.left)
  const top = Math.max(0, placement.top)
  const right = Math.min(CANVAS.width, placement.left + placement.width)
  const bottom = Math.min(CANVAS.height, placement.top + placement.height)
  if (right <= left || bottom <= top) return Promise.resolve(null)

  return sharp(tile)
    .extract({
      left: left - placement.left,
      top: top - placement.top,
      width: right - left,
      height: bottom - top,
    })
    .toBuffer()
    .then((input) => ({ input, left, top }))
}

function isDarkColor(hex: string): boolean {
  const value = Number.parseInt(hex.slice(1), 16)
  const r = (value >> 16) & 0xff
  const g = (value >> 8) & 0xff
  const b = value & 0xff
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128
}

async function generate(spec: ThumbnailSpec): Promise<string> {
  if (
    spec.left.length !== SIDE_TILE_COUNT ||
    spec.right.length !== SIDE_TILE_COUNT
  ) {
    throw new Error(`${spec.slug}: each side needs ${SIDE_TILE_COUNT} images`)
  }
  const files = [spec.hero, spec.above, spec.below, ...spec.left, ...spec.right]
  if (new Set(files).size !== files.length) {
    throw new Error(`${spec.slug}: every tile needs a different screenshot`)
  }

  const dir = path.join(WORKS_DIR, spec.slug)
  const isDark = isDarkColor(spec.background)
  const placements = layout(spec)
  const tiles = await Promise.all(
    placements.map((p) => renderTile(dir, p, isDark))
  )
  const overlays = await Promise.all(
    tiles.map((tile, index) => clipToCanvas(tile, placements[index]))
  )
  const output = path.join(dir, OUTPUT_NAME)

  await sharp({
    create: { ...CANVAS, channels: 3, background: spec.background },
  })
    .composite([
      { input: shadowLayer(placements, isDark), left: 0, top: 0 },
      ...overlays.filter((o): o is sharp.OverlayOptions => o !== null),
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(output)

  return output
}

async function main() {
  const only = process.argv.slice(2)
  const specs = only.length
    ? SPECS.filter((spec) => only.includes(spec.slug))
    : SPECS

  for (const spec of specs) {
    const output = await generate(spec)
    console.log(`✓ ${path.relative(process.cwd(), output)}`)
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
