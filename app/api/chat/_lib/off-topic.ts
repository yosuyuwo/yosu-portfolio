import { isIndonesian } from "./language"

const TECH_TERMS =
  "react|vue|angular|svelte|next\\.?js|node|html|css|javascript|typescript|python|java|golang|rust|php|sql|regex|script|snippet|function|component|hook|class|query|algorithm|program|code|api|endpoint|unit test|dockerfile|shell command"

// "write me a React component", "generate a SQL query", "create a regex for emails"
const CODE_REQUEST = new RegExp(
  `\\b(write|create|generate|make|build|give|show|code|implement)\\s+(me|us|a|an|the|some)\\b[^.?!\\n]{0,40}\\b(${TECH_TERMS})\\b`,
  "i"
)

// "fix my code", "explain this error", "how do I center a div"
const CODE_HELP = new RegExp(
  `\\b(fix|debug|explain|refactor|review|optimi[sz]e)\\b[^.?!\\n]{0,30}\\b(this|my|the)\\b[^.?!\\n]{0,20}\\b(code|error|bug|function|component|query|script|regex|stack trace)\\b|\\bhow (do|can|to) i\\b[^.?!\\n]{0,40}\\b(${TECH_TERMS}|div|flexbox|useeffect|usestate|npm|git|docker)\\b`,
  "i"
)

const PASTED_CODE =
  /```|\b(?:const|let|var)\s+\w+\s*=|<\/[a-z][\w-]*>|\bimport\s+[\w{},\s*]+\s+from\s+['"]/

// poems, jokes, trivia, translation, plain arithmetic
const GENERAL_TASK = new RegExp(
  [
    "\\b(write|compose|draft|generate)\\s+(me\\s+)?(a|an|some)\\s+(short\\s+)?(poem|essay|story|song|joke|haiku|speech|cover letter|article|blog post)\\b",
    "\\btell me a (joke|story|riddle)\\b",
    "\\b(capital|president|prime minister|population) of\\b",
    "\\bwho (invented|discovered|wrote|painted)\\b",
    "\\btranslate\\b[^.?!\\n]{0,30}\\b(this|the following|to|into)\\b",
    "^\\s*(what is|what's|calculate|solve)\\s+[\\d\\s+\\-*/()=^.x]+\\??\\s*$",
  ].join("|"),
  "i"
)

// A real inquiry about hiring or a project is not free coding help.
const HIRING_SIGNAL =
  /\b(hire|hiring|freelance|budget|quote|pricing|price|how much|work with you|collaborat|proposal|website|web ?app|landing page|online (shop|store)|e-?commerce|for (my|our) (company|business|brand|team|startup|client|shop|store|school)|my (company|business|brand|startup))\b/i

// "Do you write tests?", "Tell me about your React experience" are about me, not requests.
const QUESTION_ABOUT_ME =
  /^\s*(do you|did you|have you|are you|how do you|what do you|what's your|what is your|tell me about|who|where|when|why do you)\b/i

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/

// Free help with code or general tasks is not what this chat is for; those messages get a fixed redirect instead of a model reply.
export function isOffTopicRequest(message: string): boolean {
  if (EMAIL.test(message) || HIRING_SIGNAL.test(message)) return false
  if (PASTED_CODE.test(message) || GENERAL_TASK.test(message)) return true
  if (QUESTION_ABOUT_ME.test(message)) return false
  return CODE_REQUEST.test(message) || CODE_HELP.test(message)
}

export function offTopicReply(visitorText: string): string {
  return isIndonesian(visitorText)
    ? "Itu di luar yang bisa saya bantu di sini. Saya senang membahas pekerjaan, latar belakang, dan minat saya."
    : "That's outside what I can help with here. I'm happy to talk about my work, background and interests."
}
