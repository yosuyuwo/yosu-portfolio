import postgres from "postgres"

type Status = "open" | "fixed" | "ignored"

const USAGE = `Usage: pnpm chat:reports [command]

  (none) | open        problems visitors reported, newest first
  fixed                reports you marked fixed
  ignored              reports you chose to ignore
  fix <id> [note]      mark a report fixed, with an optional note
  ignore <id>          stop showing a report (spam, not a real problem)
  reopen <id>          put a report back in the open list`

function connect() {
  const url = process.env.DATABASE_URL
  if (!url || /your-password|\[your-password\]|your-project/i.test(url)) {
    throw new Error(
      "Set DATABASE_URL in .env.local to the chat_app connection string first (see supabase/chat-app-role.sql)."
    )
  }
  return postgres(url, {
    prepare: false,
    max: 1,
    ssl: "require",
    connect_timeout: 10,
  })
}

async function list(sql: ReturnType<typeof connect>, status: Status) {
  const rows = await sql`
    select id, message, context, contact, page, user_agent, note, created_at
    from public.chat_reports
    where status = ${status}
    order by created_at desc`

  if (rows.length === 0) {
    console.log(`No ${status} reports.`)
    return
  }
  for (const row of rows) {
    const when = new Date(row.created_at)
      .toISOString()
      .slice(0, 16)
      .replace("T", " ")
    const where = [row.page, row.contact && `reply to ${row.contact}`]
      .filter(Boolean)
      .join("  |  ")
    console.log(`#${row.id}  ${when}${where ? `  |  ${where}` : ""}`)
    if (row.context) console.log(`  earlier: ${row.context}`)
    console.log(`  ${row.message}`)
    if (row.user_agent) console.log(`  browser: ${row.user_agent}`)
    if (row.note) console.log(`  note: ${row.note}`)
    console.log("")
  }
  console.log(`${rows.length} ${status} report(s).`)
}

function expectOne(rows: readonly unknown[], id: number, done: string) {
  if (rows.length === 0) throw new Error(`No report with id ${id}.`)
  console.log(done)
}

function parseId(value: string | undefined): number {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`"${value}" is not a report id.\n\n${USAGE}`)
  }
  return id
}

async function run(sql: ReturnType<typeof connect>) {
  const [command = "open", idArg, ...rest] = process.argv.slice(2)

  if (command === "open" || command === "fixed" || command === "ignored") {
    return list(sql, command)
  }
  if (command === "fix") {
    const id = parseId(idArg)
    const note = rest.join(" ").trim() || null
    const rows = await sql`
      update public.chat_reports set status = 'fixed', note = ${note}
      where id = ${id} returning id`
    return expectOne(rows, id, `Marked #${id} fixed.`)
  }
  if (command === "ignore") {
    const id = parseId(idArg)
    const rows = await sql`
      update public.chat_reports set status = 'ignored' where id = ${id} returning id`
    return expectOne(rows, id, `Ignored #${id}.`)
  }
  if (command === "reopen") {
    const id = parseId(idArg)
    const rows = await sql`
      update public.chat_reports set status = 'open' where id = ${id} returning id`
    return expectOne(rows, id, `Reopened #${id}.`)
  }
  throw new Error(USAGE)
}

async function main() {
  const sql = connect()
  try {
    await run(sql)
  } finally {
    await sql.end({ timeout: 2 })
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
