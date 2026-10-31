import "server-only"

const BIRTH_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const TAGGED_LINE = /^\[(\w+)\]\s*(.+)$/

// Matched against the visitor's recent messages (English and Indonesian); a note is only shown to the model when its topic comes up.
const TOPIC_PATTERNS: Record<string, RegExp> = {
  age: /\bage\b|how old|birthday|\bborn\b|birth|umur|lahir|ulang tahun|zodiac/,
  contact:
    /whats\s?app|\bwa\b|phone|telepon|nomor hp|instagram|\big\b|contact|reach you|hubungi|\bdm\b/,
  origin:
    /\bborn\b|birth|where.*(from|grew|raised)|grow(ing)? up|hometown|origin|childhood|lahir|asal|poso|tentena/,
  faith:
    /religio|christian|kristen|bible|alkitab|church|gereja|faith|\bgod\b|jesus|pray|muslim|atheis/,
  health:
    /asthma|health|sick|allerg|\bpets?\b|\bdogs?\b|\bcats?\b|animal|hewan|kucing|anjing/,
  abroad:
    /abroad|overseas|move to|live in|australia|japan|singapore|malaysia|luar negeri|pindah|migrat|immigrat|relocat|karhutla|haze/,
  romance:
    /single|girlfriend|boyfriend|married|marry|wife|husband|\bdate\b|dating|relationship|love life|in love|looking for love|crush|taken|\bgf\b|\bbf\b|have a partner|got a partner|seeing (anyone|someone)|(special|someone special)|\blover\b|like (anyone|someone)|kekasih|gebetan|\bdoi\b|deket sama|dekat dengan|lagi sendiri|lajang|status hubungan|jomblo|pacar|menikah|nikah|istri|suami|cewek|cowok/,
  partner:
    /your type|looking for someone|kind of (person|girl|woman)|type of (person|girl|woman)|ideal (girl|woman|partner|person)|in a partner|romanc|what do you look for|look(ing)? for in|look(s|ing)? (as|for) a (partner|girlfriend)|(character|personality|trait|quality|qualities|criteria).{0,40}(partner|romance|relationship|girl|woman|someone)|(partner|romance|girlfriend|relationship).{0,40}(character|personality|trait|quality|criteria)|tipe|seperti apa|kayak gimana|karakter|sifat|disagreement|conflict/,
  orientation:
    /lgbt|gay|lesbian|bisexual|\btrans\b|transgender|queer|homosexual|\bhomo\b|straight|sexual orientation|sexuality|orientation|same[- ]sex|heterosexual|\bhetero\b|orientasi|\bpride\b/,
  temper:
    /anger|angry|temper|yell|violen|hurt|abus|kasar|marah|emosi|overreact|how do you react|do you react|\bcalm\b|patient|patience|\bmoody\b|sabar|tenang/,
  salary:
    /salary|gaji|\bearn|income|compensation|expected pay|pay expectation|per month|a month|monthly|per year|a year|work for d/,
  pricing:
    /pric|\brates?\b|charge|\bcost|budget|quote|quotation|\bfee|how much(?!.*\b(earn|salary|paid)\b)|tarif|harga|biaya|estimate|landing page|e-?commerce/,
  address: /address|alamat|where do you live|\bhome\b|rumah/,
}

function ageOn(year: number, month: number, day: number, now: Date): number {
  const age = now.getUTCFullYear() - year
  const hadBirthday =
    now.getUTCMonth() + 1 > month ||
    (now.getUTCMonth() + 1 === month && now.getUTCDate() >= day)
  return hadBirthday ? age : age - 1
}

// computed here because a small model gets age arithmetic wrong
function birthdayFacts(birthDate: string | undefined, now: Date): string[] {
  const match = birthDate ? BIRTH_DATE_PATTERN.exec(birthDate) : null
  if (!match) return []
  const [year, month, day] = match.slice(1).map(Number)
  const birthday = new Date(Date.UTC(2000, month - 1, day)).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", timeZone: "UTC" }
  )
  return [
    `Age: ${ageOn(year, month, day, now)}. Birthday: ${birthday}. Born in ${year}.`,
  ]
}

// a question about the kind of partner I want is not a question about my status
const STATUS_WORDS =
  /single|jomblo|taken|married|menikah|seeing|dating|have a (girlfriend|boyfriend|partner)/

function topicsIn(text: string): Set<string> {
  const lower = text.toLowerCase()
  return new Set(
    Object.entries(TOPIC_PATTERNS)
      .filter(([, pattern]) => pattern.test(lower))
      .map(([topic]) => topic)
  )
}

export function hasPrivateTopic(text: string): boolean {
  return topicsIn(text).size > 0
}

// Lines in CHAT_PRIVATE_FACTS look like "[topic] text"; an untagged line is always shown.
function noteLines(raw: string, topics: Set<string>): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const tagged = TAGGED_LINE.exec(line)
      if (!tagged) return [line]
      return topics.has(tagged[1]) ? [tagged[2]] : []
    })
}

export function privateFacts(now: Date, visitorText: string): string {
  const topics = topicsIn(visitorText)
  if (topics.has("partner") && !STATUS_WORDS.test(visitorText.toLowerCase())) {
    topics.delete("romance")
  }
  const lines = [
    ...(topics.has("age")
      ? birthdayFacts(process.env.CHAT_BIRTH_DATE, now)
      : []),
    ...noteLines(process.env.CHAT_PRIVATE_FACTS ?? "", topics),
  ]
  return lines.join("\n")
}
