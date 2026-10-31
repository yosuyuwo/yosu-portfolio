import postgres from "postgres"

type Status = "open" | "answered" | "ignored"

const USAGE = `Usage: pnpm chat:questions [command]

  (none) | open        questions the chat could not answer, most asked first
  answered             questions you have answered
  ignored              questions you chose to ignore
  answer <id> <text>   answer a question; the chat uses it right away
  ignore <id>          stop showing a question (spam, off-topic)
  reopen <id>          put a question back in the open list

Write answers as a full statement the chat can say in your voice, for example:
  pnpm chat:questions answer 12 "My favorite food is nasi goreng."`

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

function formatDate(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10)
}

async function list(sql: ReturnType<typeof connect>, status: Status) {
  const rows = await sql`
    select id, question, times_asked, last_asked_at, answer
    from public.chat_unanswered
    where status = ${status}
    order by times_asked desc, last_asked_at desc`

  if (rows.length === 0) {
    console.log(`No ${status} questions.`)
    return
  }
  for (const row of rows) {
    console.log(
      `#${row.id}  asked ${row.times_asked}x  last ${formatDate(row.last_asked_at)}\n  Q: ${row.question}` +
        (row.answer ? `\n  A: ${row.answer}` : "")
    )
  }
  console.log(`\n${rows.length} ${status} question(s).`)
}

async function expectOne(rows: readonly unknown[], id: number, done: string) {
  if (rows.length === 0) throw new Error(`No question with id ${id}.`)
  console.log(done)
}

function parseId(value: string | undefined): number {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`"${value}" is not a question id.\n\n${USAGE}`)
  }
  return id
}

async function run(sql: ReturnType<typeof connect>) {
  const [command = "open", idArg, ...rest] = process.argv.slice(2)

  if (command === "open" || command === "answered" || command === "ignored") {
    return list(sql, command)
  }
  if (command === "answer") {
    const answer = rest.join(" ").trim()
    if (!answer) throw new Error(`Give the answer text.\n\n${USAGE}`)
    const id = parseId(idArg)
    const rows = await sql`
      update public.chat_unanswered set answer = ${answer}, status = 'answered'
      where id = ${id} returning id`
    return expectOne(
      rows,
      id,
      `Answered #${id}. The chat will use it within a minute.`
    )
  }
  if (command === "ignore") {
    const id = parseId(idArg)
    const rows = await sql`
      update public.chat_unanswered set status = 'ignored' where id = ${id} returning id`
    return expectOne(rows, id, `Ignored #${id}.`)
  }
  if (command === "reopen") {
    const id = parseId(idArg)
    const rows = await sql`
      update public.chat_unanswered set status = 'open', answer = null
      where id = ${id} returning id`
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
