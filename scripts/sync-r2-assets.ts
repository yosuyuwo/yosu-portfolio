import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const ASSET_DIRS = ["works", "profile"] as const
const CACHE_CONTROL = "public, max-age=604800, stale-while-revalidate=86400"

function loadLocalEnv() {
  for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file)
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set (see .env.example)`)
  return value
}

function main() {
  loadLocalEnv()
  const remote = process.env.R2_RCLONE_REMOTE ?? "r2"
  const bucket = requireEnv("R2_BUCKET")
  const passthrough = process.argv.slice(2)

  for (const dir of ASSET_DIRS) {
    const source = path.join(PUBLIC_DIR, dir)
    const target = `${remote}:${bucket}/${dir}`
    console.log(`\n→ ${path.relative(process.cwd(), source)}  ⇒  ${target}`)

    // `copy`, not `sync`: never deletes objects that only exist in the bucket.
    const result = spawnSync(
      "rclone",
      [
        "copy",
        source,
        target,
        "--checksum",
        "--progress",
        "--header-upload",
        `Cache-Control: ${CACHE_CONTROL}`,
        ...passthrough,
      ],
      { stdio: "inherit" }
    )

    if (result.error) throw result.error
    if (result.status !== 0) {
      throw new Error(`rclone exited with ${result.status} for ${dir}/`)
    }
  }
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
