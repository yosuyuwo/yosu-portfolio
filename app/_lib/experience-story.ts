export type StoryChapter = {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string | null
  pullLine: string
  body: readonly string[]
  workSlugs: readonly string[]
}

export const STORY_INTRO = {
  title: "Five chapters",
  span: "2021 → now",
} as const

export const STORY_OUTRO = {
  label: "Next",
  line: "Hiring? The next chapter could be on your team.",
  roles: "Open to product & frontend engineering roles",
  cta: "Get in touch",
} as const

export const STORY_CHAPTERS: readonly StoryChapter[] = [
  {
    id: "accounting-games",
    organization: "Widya Mandala Accounting Games",
    role: "Game designer & frontend developer",
    startDate: "2021-06-01",
    endDate: "2021-10-01",
    pullLine: "It started with a game about accounting.",
    body: [
      "My first real project was three games. For a university accounting event at Widya Mandala, Davin and I built a web game platform: an airplane chase where every right answer moves you forward and the last row gets burnt, a memory card game, and a Monopoly-style board with dice and pawns.",
      "I designed the visuals, including character customisation so every student played as someone that felt like their own. Behind it ran an admin panel for live rooms over Socket.IO, where the organisers could also write and edit the quiz questions.",
      "I was still a student at iSTTS. The players had a blast, and Widya Mandala came back the next year asking for a Unity game. My final exams got in the way of that one.",
    ],
    workSlugs: [],
  },
  {
    id: "kantin-sehat",
    organization: "Kantin Sehat (outclass.id)",
    role: "Frontend developer, internship program",
    startDate: "2021-06-01",
    endDate: "2021-10-01",
    pullLine: "A team of four and a blank page.",
    body: [
      "Through an internship program with outclass.id, four of us built Kantin Sehat from scratch: a mobile-first app for school canteens, where students pay for their food and parents can see what their children actually bought.",
      "There was no codebase to inherit and no mentor, only someone overseeing the program. The app was never published, but it is where I learned to speak up early and keep the whole team in the same picture.",
    ],
    workSlugs: [],
  },
  {
    id: "centrum-ivan-merz",
    organization: "Centrum Ivan Merz",
    role: "Designer & frontend developer, contract",
    startDate: "2022-04-01",
    endDate: "2022-10-01",
    pullLine: "Designing for learners who didn't grow up online.",
    body: [
      "A five-month contract to design and build a learning platform for Centrum Ivan Merz, where people attend Catholic learning classes. Most of them are older, so the work started with UX research into how older people read, move through and get lost on a screen.",
      "The requirements kept changing, the timeline stretched with them, and the platform never launched. It taught me how much a product depends on agreeing what it is before building it.",
    ],
    workSlugs: [],
  },
  {
    id: "morfolabs",
    organization: "Morfolabs",
    role: "UI & frontend engineer → product engineer",
    startDate: "2023-08-01",
    endDate: "2026-05-01",
    pullLine: "From building screens to shaping products.",
    body: [
      "My first project was frontend only: the designs were done, and my job was to check them and build them. After that, clients mostly came with the features they wanted, and Wirawan, our tech lead, and I planned and built the rest between the two of us.",
      "He led, but almost every decision was a conversation, and he talked an approach through with me before we committed to it. That is where I stopped implementing and started owning what we built and why.",
      "Over nearly three years that added up to tens of client products, most of them under NDA, plus internal tools and the company's own site. I was also in charge of outsourced work, reviewing it to keep it working and on course. I left in May 2026, looking for other opportunities.",
    ],
    workSlugs: ["abi", "morfolabs", "elevate"],
  },
  {
    id: "quanta-techova",
    organization: "Quanta Labs & Techova Labs",
    role: "Co-founder, product engineer",
    startDate: "2026-01-01",
    endDate: null,
    pullLine: "Now the whole product is the job.",
    body: [
      "In 2026 I co-founded two companies: Quanta Labs, a product studio, with Davin from the accounting game, and Techova Labs, which builds its own software.",
      "Quanta Labs takes client ideas to launch. Gaiana moved a dress-rental business off spreadsheets and shared drives onto its own storefront and back-office, five months from first commit to going live. For Eastern Star Logistics we built a freight management system, customer-side shipment tracking and their landing page.",
      "Techova Labs builds AI automation for the work that eats a team's time. Our first product, Terbit, turns one article or script into Instagram carousels, posts and stories, each in the brand's own template, in minutes.",
    ],
    workSlugs: ["gaiana"],
  },
]
