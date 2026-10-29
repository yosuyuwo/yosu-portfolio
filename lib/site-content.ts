export const SITE_GIVEN_NAME = "Yosua"
export const SITE_FAMILY_NAME = "Yuwono"
export const SITE_NAME = `${SITE_GIVEN_NAME} ${SITE_FAMILY_NAME}`
export const SITE_SHORT_NAME = SITE_GIVEN_NAME

export const CONTACT_EMAIL = "yosuayuwono@gmail.com"
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

export const SITE_LOGO = {
  src: "/brand/logo.svg",
  alt: SITE_NAME,
  width: 54,
  height: 54,
} as const

export const SITE_HANDLE = "yosuyuwo"

export const SITE_SOCIALS = [
  { id: "email", href: CONTACT_MAILTO, label: "Email" },
  { id: "github", href: "https://github.com/yosuyuwo", label: "GitHub" },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/yosuyuwo",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/yosuyuwo/",
    label: "Instagram",
  },
] as const

export const HERO = {
  greeting: "I'm Yosua",
  title: "Product Engineer & Frontend Developer",
  bio: "I mold initial ideas into launch-ready products. I work to bridge the gap between what you want and what your users need.",
  ctaLabel: "Let's have a chat",
} as const

export const HERO_PORTRAIT = {
  src: "/profile/portrait.webp",
  alt: "Portrait of Yosua Yuwono",
  width: 960,
  height: 1280,
} as const

export const CONTACT = {
  dialogDescription:
    "Tell me about your idea or the role you're looking to fill. Submitting opens a draft in your email client, addressed straight to me.",
  ctaLabel: "Contact",
} as const

export const ABOUT_INTRO =
  "Began as a Frontend and UI/UX developer in 2020. Since 2023, I have been a full-stack product engineer. I care not only about your product but also about finding the right tools and processes that make it possible."

export const ABOUT_WORKFLOW = {
  headline: "I build with AI agents every day, but nothing ships on autopilot.",
  process:
    "Questions, prototype, spec, tested code. Every change reviewed by hand.",
} as const

export const SITE_LOCATION = "Surabaya, Indonesia"

export const EXPERIENCE = [
  {
    id: "e6",
    organization: "Techova Labs",
    role: "Co-founder, Product Engineer",
    startDate: "2026-08-01",
    endDate: null,
    blurb:
      "Co-founded a Surabaya SaaS company building AI automation; first product Terbit turns articles into Instagram content.",
    highlights: [
      "Co-founded a SaaS company building AI automation apps, one per business workflow.",
      "Building Terbit, which turns one article or script into Instagram carousels, posts and stories fitted to each brand's own template.",
    ],
  },
  {
    id: "e1",
    organization: "Quanta Labs",
    role: "Co-founder, Product Engineer",
    startDate: "2026-01-01",
    endDate: null,
    blurb:
      "Co-founded a product studio; design and build client products end to end, including Gaiana and Eastern Star Logistics.",
    highlights: [
      "Co-founded a product studio that takes client ideas from first brief to launch.",
      "Designed and built Gaiana's rental storefront and back-office end to end, moving the business off spreadsheets and shared drives and going live five months after the first commit.",
      "Delivered a freight management system, customer-side shipment tracking and a landing page for Eastern Star Logistics.",
      "Build with AI agents (Claude Code) in a spec, prototype, test-first pipeline, recording every decision and reviewing and QA-ing each change by hand before it ships.",
      "Run production on a self-managed server: CI-built images, nightly deploys, backups with restore drills, monitoring and alerts.",
    ],
  },
  {
    id: "e2",
    organization: "Morfolabs",
    role: "UI & Frontend Engineer → Product Engineer",
    startDate: "2023-08-01",
    endDate: "2026-05-01",
    blurb:
      "Planned and built tens of client products with the tech lead; reviewed outsourced work.",
    highlights: [
      "Planned and built tens of client web products with the tech lead, from the features clients asked for through to delivery.",
      "Most of that client work is under NDA and can't be shown; the public pieces include Asosiasi Blockchain Indonesia's landing page and reporting portal, Elevate Former's studio booking site and the Morfolabs company site.",
      "Reviewed outsourced work to keep it working and on course, and built internal tools for the company.",
      "Grew from implementing finished UI designs to owning what was built and why.",
    ],
  },
  {
    id: "e3",
    organization: "Centrum Ivan Merz",
    role: "Designer & Frontend Developer (contract)",
    startDate: "2022-04-01",
    endDate: "2022-10-01",
    blurb:
      "Designed and built a learning platform for older learners, starting from UX research.",
    highlights: [
      "Designed and built a learning platform for mostly older learners, starting from UX research into how they read and move through a screen.",
    ],
  },
  {
    id: "e4",
    organization: "Kantin Sehat (outclass.id)",
    role: "Frontend Developer (internship program)",
    startDate: "2021-06-01",
    endDate: "2021-10-01",
    blurb:
      "Team of four; built a mobile-first school canteen payment app from scratch.",
    highlights: [
      "Built a mobile-first school canteen payment app from scratch in a team of four; parents could see what their children bought.",
    ],
  },
  {
    id: "e5",
    organization: "Widya Mandala Accounting Games",
    role: "Game Designer & Frontend Developer",
    startDate: "2021-06-01",
    endDate: "2021-10-01",
    blurb:
      "Team of two; designed and built three real-time web games for a university event.",
    highlights: [
      "Designed and built three real-time web games for a university accounting event, plus a Socket.IO admin panel for live rooms and quiz editing.",
    ],
  },
] as const

export type Education = {
  id: string
  institution: string
  credential: string
  startDate: string
  endDate: string | null
}

export const EDUCATION: readonly Education[] = []

export const RESUME = {
  headline: "Product Engineer & Frontend Developer",
  summary:
    "Product engineer with five years of building web products end to end: UX research, UI design, frontend, backend and deployment. Co-founder of Quanta Labs, a product studio, and Techova Labs, an AI automation SaaS; previously nearly three years at Morfolabs shipping tens of client products. Builds with AI agents every day, then reviews and QAs every change by hand: the goal is work polished enough that people are surprised AI was involved at all.",
} as const

export const SITE_METADATA = {
  title: `${SITE_NAME} — ${RESUME.headline}`,
  description: `${SITE_NAME} is a product engineer and frontend developer in Surabaya, Indonesia, building web products end to end, from UX and design to deployment.`,
} as const

export const SKILL_GROUPS = [
  {
    id: "s1",
    name: "Programming",
    skills: [
      "HTML",
      "CSS",
      "TypeScript",
      "JavaScript",
      "PHP",
      "jQuery",
      "Java",
      "C",
      "C++",
      "C#",
      "SQL",
      "Dart",
    ],
  },
  {
    id: "s2",
    name: "Framework",
    skills: [
      "React",
      "Next.js",
      "Vue",
      "Nuxt",
      "Express",
      "Laravel",
      "Flutter",
      "Astro",
    ],
  },
  {
    id: "s3",
    name: "UI",
    skills: [
      "Tailwind",
      "CSS Modules",
      "Vanilla CSS",
      "GSAP",
      "Motion (formerly Framer Motion)",
    ],
  },
  {
    id: "s4",
    name: "Data & CMS",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Oracle",
      "Firebase",
      "Supabase",
      "Sanity",
      "Payload",
    ],
  },
  {
    id: "s5",
    name: "Design",
    skills: ["Figma", "UI Design", "Wireframing", "Prototyping"],
  },
  {
    id: "s6",
    name: "Tools",
    skills: ["Cursor", "Claude (Code, Cowork, Design)"],
  },
] as const

export const WORKS_SECTION = {
  title: "Works",
  description:
    "Products I've helped build, solo and in small teams. Each one taught me something about closing the gap between an idea and something people actually use.",
} as const

export const WORKS = [
  {
    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    slug: "gaiana",
    title: "Gaiana",
    summary:
      "Dress rental and sale storefront in Surabaya. Designed and built end to end, from catalogue to checkout to operations.",
    coverPath: "/works/gaiana/cover.webp",
    coverVideoPath: "/works/gaiana/cover.webm",
    publishedAt: "2026-10-12",
    sections: [
      {
        heading: "Overview",
        body: "Gaiana rents and sells occasion dresses. I designed and built the storefront and the back-office behind it through Quanta Labs, the studio I co-founded. It launched in October 2026 after five months of work, replacing a business that ran on Excel and Google Drive.",
        images: [
          {
            src: "/works/gaiana/home.webp",
            alt: "Gaiana home page with a full-bleed editorial hero",
          },
        ],
      },
      {
        heading: "Designed for the customer",
        body: "Renting a dress is a date problem as much as a shopping one. Customers filter by rental date, size, colour, price, occasion, length and neckline, and the size filter works from their own measurements. Those filters come from the same attributes the team uses to organise the catalogue, so nothing is maintained twice.",
        images: [
          {
            src: "/works/gaiana/filters.webp",
            alt: "Gaiana catalogue with the filter panel open",
          },
        ],
        imageSide: "left",
      },
      {
        heading: "One dress, one calendar",
        body: "The customer picks a single event date. The calendar shows when the garment arrives and when it goes back, and dates taken by other bookings are already blocked. A rental holds more than the day it is worn, so courier transit, preparation and cleaning are booked alongside it, and the same rule runs on the product page, at checkout and in the back-office.",
        images: [
          {
            src: "/works/gaiana/calendar.webp",
            alt: "Gaiana product page calendar showing arrival, event day and return",
          },
        ],
      },
      {
        heading: "How it was built",
        body: "I work with AI agents, and I don't ship slop. Each feature went from questioning to prototype to spec to tested code, with the decisions written down along the way. The goal is a product nobody would guess was built that way.",
      },
      {
        heading: "Screens",
        images: [
          {
            src: "/works/gaiana/catalogue.webp",
            alt: "Gaiana catalogue with search and sorting",
          },
          {
            src: "/works/gaiana/product.webp",
            alt: "Gaiana product page with gallery, colour, size and measurements",
          },
          {
            src: "/works/gaiana/how-to-rent.webp",
            alt: "Gaiana How to Rent page explaining the six rental steps",
          },
          {
            src: "/works/gaiana/home-id.webp",
            alt: "Gaiana home page in Indonesian",
          },
        ],
      },
    ],
    role: "Design, Frontend & Backend",
    year: 2026,
    liveSite: { status: "live", href: "https://gaiana.id" },
    stack: [
      "Next.js",
      "shadcn/ui",
      "Prisma",
      "tRPC",
      "PostgreSQL",
      "GSAP",
      "Nuqs",
      "Zod",
      "Claude",
    ],
  },
  {
    id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    slug: "wilmots",
    title: "Wilmot's Warehouse",
    summary:
      "Unofficial promotional landing page for the co-op board game Wilmot's Warehouse, where the visitor learns the rules by playing.",
    coverPath: "/works/wilmots/cover.png",
    coverVideoPath: "/works/wilmots/cover.webm",
    publishedAt: "2026-08-03",
    sections: [
      {
        heading: "Overview",
        body: "Built the hero, the how-to-play tutorial, the navigation and the kit section of an unofficial landing page for the co-op board game Wilmot's Warehouse. Two people, split by section, two weeks start to finish, animated with GSAP. The game, its artwork and its copy belong to its creators and publisher.",
        images: [
          { src: "/works/wilmots/cover.png", alt: "Wilmot's Warehouse cover" },
        ],
      },
      {
        heading: "The hero is the product",
        body: "A live grid of product tiles follows the pointer, so the page opens with the thing being sold. The section split meant each of us owned a full page section end to end, from motion timing to responsive behavior, rather than dividing by layer.",
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse section detail",
          },
          {
            src: "/works/wilmots/cover.png",
            alt: "Wilmot's Warehouse cover repeat",
          },
        ],
      },
      {
        heading: "Learn by playing",
        body: "The rulebook became a small board. Drag a customer card to the right tile and watch the score move, while speech bubbles follow the visitor's scroll through the steps.",
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse mirrored layout demo",
          },
        ],
        imageSide: "left",
      },
      {
        heading: "Motion approach",
        body: "Smooth scrolling runs through Lenis, synced to GSAP so scroll-linked motion and the tutorial steps share one clock.",
      },
      {
        heading: "Final screens",
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse final screen",
          },
          {
            src: "/works/wilmots/cover.png",
            alt: "Wilmot's Warehouse cover repeat 2",
          },
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse final screen repeat",
          },
        ],
      },
    ],
    role: "Frontend",
    year: 2026,
    liveSite: {
      status: "live",
      href: "https://wilmots-warehouse-landing.vercel.app/",
    },
    github: {
      status: "live",
      href: "https://github.com/WeCipta/Wilmots-warehouse-landing",
    },
    stack: ["Next.js", "GSAP", "Lenis", "dnd-kit", "Tailwind CSS"],
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    slug: "morfolabs",
    title: "Morfolabs",
    summary:
      "Marketing site for a blockchain consulting and marketing agency in Indonesia.",
    coverPath: "/works/morfolabs/cover.webp",
    coverVideoPath: "/works/morfolabs/cover.webm",
    publishedAt: "2026-06-11",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing site for Morfolabs, a blockchain consulting and marketing agency, at the request of the company's owner, replacing an older outsourced WordPress site. Solo build, with a CMS the team edits without a developer.",
        images: [
          { src: "/works/morfolabs/cover.webp", alt: "Morfolabs cover" },
        ],
      },
    ],
    role: "Frontend",
    year: 2026,
    liveSite: { status: "live", href: "https://morfolabs.io" },
    stack: [
      "Next.js",
      "Payload CMS",
      "Mantine",
      "GSAP",
      "Lenis",
      "Three.js",
      "Nuqs",
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    slug: "abi",
    title: "Asosiasi Blockchain Indonesia",
    summary:
      "Landing site and reporting portal for a non-profit blockchain industry association in Indonesia.",
    coverPath: "/works/abi/cover.webp",
    coverVideoPath: "/works/abi/cover.webm",
    publishedAt: "2025-12-01",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing site and reporting portal for Asosiasi Blockchain Indonesia (ABI), a non-profit mobilizing blockchain actors across Indonesia, through Morfolabs. No access to the reporting portal post-handoff. Team of two, frontend end to end with a tech lead on backend.",
        images: [
          {
            src: "/works/abi/cover.webp",
            alt: "Asosiasi Blockchain Indonesia cover",
          },
        ],
      },
    ],
    role: "Frontend",
    year: 2025,
    liveSite: { status: "live", href: "https://asosiasiblockchain.co.id" },
    stack: [
      "Next.js",
      "Mantine",
      "Sanity",
      "TanStack Query",
      "Nuqs",
      "Zod",
      "Lenis",
      "WebGL",
    ],
  },
  {
    id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    slug: "elevate",
    title: "Elevate Former",
    summary:
      "Booking site for a Slow Resistance Training studio. Full feature ownership, client gave complete trust on scope.",
    coverPath: "/works/elevate/cover.webp",
    coverVideoPath: "/works/elevate/cover.webm",
    publishedAt: "2025-04-21",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing and booking experience for a Slow Resistance Training (SRT) fitness studio. The client gave full trust on feature decisions, not just structure and layout. Data fetching runs through tRPC on top of TanStack Query, in front of the backend's external API. Also reviewed quality on the outsourced admin panel. Logo design was handled by an external designer.",
        images: [
          { src: "/works/elevate/cover.webp", alt: "Elevate Former cover" },
        ],
      },
    ],
    role: "Frontend",
    year: 2025,
    liveSite: { status: "live", href: "https://elevate-former.vercel.app/" },
    stack: ["Next.js", "Mantine", "tRPC", "TanStack Query", "Nuqs", "Zod"],
  },
] as const

export const RESUME_FILE = {
  href: "/resume/yosua-yuwono-resume.pdf",
  label: "Download CV",
} as const

export const FOOTER_COPYRIGHT_NAME = SITE_NAME
