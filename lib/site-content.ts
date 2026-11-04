export const SITE_GIVEN_NAME = "Yosua"
export const SITE_FAMILY_NAME = "Yuwono"
export const SITE_NAME = `${SITE_GIVEN_NAME} ${SITE_FAMILY_NAME}`
export const SITE_SHORT_NAME = SITE_GIVEN_NAME

export const CONTACT_EMAIL = "hello@yosuayuwono.com"
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
  headline:
    "Right now, I build with AI agents every day, but nothing ships on autopilot.",
  process:
    "Questions, prototype, spec, tested code. Every change reviewed by hand. This way I can be fast while keeping quality up.",
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
    endDate: "2026-10-01",
    blurb:
      "Co-founded a product studio; designed and built client products end to end, including Gaiana and Eastern Star Logistics.",
    highlights: [
      "Co-founded a product studio that took client ideas from first brief to launch.",
      "Designed and built Gaiana's rental storefront and back-office end to end (Next.js, tRPC, PostgreSQL), moving the business off spreadsheets and shared drives and going live five months after the first commit.",
      "Covered Gaiana with about 2,500 Vitest and React Testing Library tests under an 80% coverage threshold, and hardened it for handling private customer documents.",
      "Led design, frontend and backend for Eastern Star Logistics' freight management system, customer-side shipment tracking and landing page, working with one outsourced developer.",
      "Built with AI agents (Claude Code) in a spec, prototype, test-first pipeline, recording every decision and reviewing and QA-ing each change by hand before it shipped.",
      "Ran production on a self-managed server: Docker images built in GitHub Actions, nightly deploys, backups with restore drills, monitoring and alerts.",
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
      "Built React and Next.js frontends on TanStack Query, tRPC and Zustand, with a shared Mantine-based design system, and ran an accessibility pass on the company site.",
      "Reviewed outsourced developers' work to keep it working and on course, and built internal tools for the company.",
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

export const EDUCATION: readonly Education[] = [
  {
    id: "istts-skom",
    institution: "Institut Sains dan Teknologi Terpadu Surabaya (iSTTS)",
    credential: "Bachelor of Computer Science (S.Kom.)",
    startDate: "2018-01-01",
    endDate: "2023-01-01",
  },
]

export const RESUME = {
  headline: "Product Engineer & Frontend Developer",
  summary:
    "Frontend-first product engineer with five years of building web products end to end: UX research, UI design, React and Next.js frontends, APIs and production. In the past year, the main engineer on two client products from first brief to launch. Co-founder of Techova Labs, an AI automation SaaS; previously co-founded Quanta Labs, a product studio, and spent nearly three years at Morfolabs shipping tens of client products. Builds with AI agents every day, then tests and reviews every change by hand: the goal is work polished enough that people are surprised AI was involved at all.",
} as const

export const SITE_METADATA = {
  title: `${SITE_NAME} — ${RESUME.headline}`,
  description: `${SITE_NAME} is a product engineer and frontend developer in Surabaya, Indonesia, building web products end to end, from UX and design to deployment.`,
} as const

export const SKILL_GROUPS = [
  {
    id: "s1",
    name: "Languages",
    skills: [
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "SQL",
      "PHP",
      "Java",
      "Dart",
    ],
  },
  {
    id: "s2",
    name: "Frontend",
    skills: [
      "React",
      "Next.js (App Router, Server Components)",
      "Vue",
      "Nuxt",
      "Astro",
      "Tailwind",
      "shadcn/ui",
      "Mantine",
      "GSAP",
      "Motion",
      "Flutter",
    ],
  },
  {
    id: "s3",
    name: "Data & State",
    skills: [
      "TanStack Query (React Query)",
      "Zustand",
      "tRPC",
      "REST APIs",
      "TanStack Form",
      "Zod",
      "nuqs",
      "Socket.IO",
    ],
  },
  {
    id: "s4",
    name: "Backend & CMS",
    skills: [
      "Node.js",
      "Express",
      "Laravel",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Firebase",
      "Sanity",
      "Payload",
    ],
  },
  {
    id: "s5",
    name: "Testing & Ops",
    skills: [
      "Vitest",
      "React Testing Library",
      "GitHub Actions",
      "Docker",
      "Turborepo",
      "Vercel",
      "DigitalOcean",
    ],
  },
  {
    id: "s6",
    name: "Design & Tools",
    skills: [
      "Figma",
      "UI Design",
      "Prototyping",
      "Accessibility",
      "Claude (Code, Cowork, Design)",
      "Cursor",
    ],
  },
] as const

export const WORKS_SECTION = {
  title: "Works",
  description:
    "Products I've helped build, solo and in small teams. Each one taught me something about closing the gap between an idea and something people actually use.",
} as const

export const WORKS = [
  {
    id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    slug: "terbit",
    title: "Terbit",
    summary:
      "Landing site, brand and studio interface for an AI tool that turns articles into on-brand Instagram posts.",
    coverPath: "/works/terbit/cover.webp",
    coverVideoPath: "/works/terbit/cover.webm",
    publishedAt: "2026-10-31",
    sections: [
      {
        heading: "Overview",
        body: "Terbit, from Techova Labs, the company I co-founded, turns an article link into Instagram carousels, posts and stories that fit a brand's own templates. I built its landing page, designed its logo and theme, and redesigned the three studios where teams write, edit and lay out what the AI produces. I co-create the product and keep refining its interface.",
        images: [
          {
            src: "/works/terbit/landing-hero.webp",
            alt: "Top of the Terbit landing page in the light theme, with the headline over a painted meadow and the top of the Naskah app screen",
          },
        ],
      },
      {
        heading: "A landing page that shows the product",
        body: "One scroll-driven video walks a visitor from pasting a link to a scheduled post, so the page demonstrates the product instead of describing it. Copy was written first, in Indonesian, and limited to claims the product can support.",
        figures: [
          {
            kind: "flow",
            title: "What the scroll video walks through",
            steps: [
              {
                title: "Paste an article",
                detail: "One link or script is the only input.",
              },
              {
                title: "AI writes each slide",
                detail:
                  "The text is split into a carousel, a post and a story.",
              },
              {
                title: "Laid out in the brand's template",
                detail: "Each brand's own templates, not a generic theme.",
              },
              {
                title: "Scheduled to Instagram",
                detail: "Posts land on a monthly calendar.",
              },
            ],
          },
        ],
        images: [
          {
            src: "/works/terbit/landing-steps.webp",
            alt: "The Cara kerja section: step 02, AI menulis tiap slide, beside the Studio Konten window showing six generated slides",
          },
        ],
        imageSide: "left",
      },
      {
        heading: "Brand and studio",
        body: "A Techova palette, display type and a dark sidebar across the app, plus a studio shell with its own top bar and AI assistant.",
        images: [
          {
            src: "/works/terbit/landing-hero-dark.webp",
            alt: "The Terbit landing hero in the dark theme, with the painting turned into a moonlit night sky",
          },
        ],
      },
      {
        heading: "Behind the scenes",
        figures: [
          {
            kind: "decisions",
            items: [
              {
                decision:
                  "Show the product in motion instead of in screenshots",
                why: "I prefer interactive pages to plain information. A scroll-driven video lets visitors move through the product themselves, step by step, rather than reading the feature list every generic landing page has.",
              },
              {
                decision: "Paint a landscape around an AI product",
                why: "An AI tool can feel cold and robotic, so I balanced it with scenery. It is also a nod to the writer's window: writers often keep their desk by a window and look out while they write.",
              },
            ],
          },
        ],
      },
      {
        heading: "Screens",
        images: [
          {
            src: "/works/terbit/landing-one-article.webp",
            alt: "The Satu naskah section: one article turned into three Instagram carousels in different brand styles",
            priority: "primary",
          },
          {
            src: "/works/terbit/landing-schedule.webp",
            alt: "The Jadwal section: a monthly Instagram posting calendar with scheduled carousels",
            priority: "primary",
          },
          {
            src: "/works/terbit/auth-login.webp",
            alt: "The Terbit sign-in page: a frosted card over a painted sunlit meadow",
            priority: "secondary",
          },
          {
            src: "/works/terbit/auth-register.webp",
            alt: "The Terbit sign-up page: a frosted card over the same painted meadow",
            priority: "secondary",
          },
        ],
      },
    ],
    role: "Frontend & Design",
    year: 2026,
    liveSite: { status: "live", href: "https://terbit.techovalabs.com" },
    stack: ["Next.js", "Tailwind CSS", "GSAP", "Lenis", "next-intl"],
  },
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
        body: "Renting a dress is a date problem as much as a shopping one. Customers filter by rental date, size, colour, price, occasion, length and neckline, and the size filter works from their own measurements.",
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
        body: "I wanted the calendar to ask one question: when is your event? Everything else about a rental is worked out from that date, so the customer never has to plan around it, and taken dates are blocked before they choose. One rule sits behind it, so the product page, checkout and the back-office always agree.",
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
        heading: "Behind the scenes",
        figures: [
          {
            kind: "decisions",
            items: [
              {
                decision: "Ask for one event date, not a rental period",
                why: "A customer knows the day they need the dress, not the logistics around it. Working everything else out from that one date keeps booking simple for them and leaves a single rule to keep right across the system.",
              },
              {
                decision: "Set an elegant visual direction",
                why: "I chose elegance for the store and looked to fashion houses for how to carry it. Kindred of Ireland shaped the story-led sections and the product grid. Brunello Cucinelli's earlier, minimal shop set the restraint: generous whitespace and a quiet header and navigation.",
              },
            ],
          },
        ],
      },
      {
        heading: "Screens",
        images: [
          {
            src: "/works/gaiana/catalogue.webp",
            alt: "Gaiana catalogue with search and sorting",
            priority: "primary",
          },
          {
            src: "/works/gaiana/product.webp",
            alt: "Gaiana product page with gallery, colour, size and measurements",
            priority: "secondary",
          },
          {
            src: "/works/gaiana/how-to-rent.webp",
            alt: "Gaiana How to Rent page explaining the six rental steps",
            priority: "secondary",
          },
          {
            src: "/works/gaiana/home-id.webp",
            alt: "Gaiana home page in Indonesian",
            priority: "primary",
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
        body: "Wilmot's Warehouse is a co-op board game where players stock a warehouse together and have to remember where everything went. I built the hero, the how-to-play tutorial, the navigation and the kit section of an unofficial landing page for it, and Fernando Manuel built the footer, the player quotes and the gallery. Two weeks from first commit to finished page. The game, its artwork and its copy belong to its creators and publisher.",
        images: [
          { src: "/works/wilmots/cover.png", alt: "Wilmot's Warehouse cover" },
        ],
      },
      {
        heading: "The hero is the product",
        body: "The page opens on a live grid of the game's product tiles instead of a headline. It follows the pointer on a mouse and works out its own size for every screen, so the first thing a visitor sees and touches is the thing being sold.",
        images: [
          {
            src: "/works/wilmots/hero.webp",
            alt: "Wilmot's Warehouse hero: a dark warehouse grid of face-down product tiles above the title and an Order now button",
          },
        ],
      },
      {
        heading: "Learn by playing",
        body: "Rules are hard to read and easy to play, so the how-to-play section is a small board instead of a rulebook. The visitor drags a customer card onto the right tile, the score moves, and speech bubbles explain each step as they scroll. I rebuilt it from a static first draft into the playable board in a single day.",
        figures: [
          {
            kind: "flow",
            title: "The tutorial, one step per screen",
            steps: [
              { title: "Draw & place" },
              { title: "Discuss & strategise" },
              { title: "Open the next day" },
              { title: "Repeat until empty" },
              { title: "Start the timer" },
              { title: "Calculate score" },
            ],
          },
        ],
        images: [
          {
            src: "/works/wilmots/tutorial-score.webp",
            alt: "The how-to-play board at the scoring step, with four product tiles each marked +10s",
          },
        ],
        imageSide: "left",
      },
      {
        heading: "Motion approach",
        body: "Smooth scrolling runs through Lenis on GSAP's clock, so scroll-linked motion and the tutorial steps share one timeline. Scrolling locks while the menu or a sheet is open, and the description section respects reduced-motion settings.",
        images: [
          {
            src: "/works/wilmots/description.webp",
            alt: "The description section mid-scroll, its words lighting up one by one over the tile grid",
          },
        ],
      },
      {
        heading: "Two people, one page",
        body: "Fernando Manuel and I brainstormed the page together, then split it by section. He is creative, open-minded and eager to learn new things, and the background music, switched on from the bottom-right corner, was his idea. On the last day I moved both halves into one structure, with each section's copy in its own typed file, so the finished code reads as one project rather than two.",
        figures: [
          {
            kind: "ownership",
            title: "Who built which section, top to bottom",
            otherLabel: "Fernando Manuel",
            parts: [
              { label: "Navigation and menu", owner: "me" },
              { label: "Hero tile grid", owner: "me" },
              { label: "Description", owner: "me" },
              { label: "What you get", owner: "me" },
              { label: "How to play", owner: "me" },
              { label: "Gallery", owner: "other" },
              { label: "Player quotes", owner: "other" },
              { label: "Footer conveyor", owner: "other" },
            ],
          },
        ],
      },
      {
        heading: "Behind the scenes",
        figures: [
          {
            kind: "decisions",
            items: [
              {
                decision: "Let visitors play the game before they buy it",
                why: "People choosing a board game look for reviews and play-throughs before they commit. A playable board lets them try it first-hand on the page, so the page does the job a review would instead of describing rules they still have to imagine.",
              },
              {
                decision: "Split the page by section, not by task",
                why: "Giving each of us whole sections made the work easy to divide and to merge back together. Fernando was still in college, so owning complete sections also let me mentor him through his while building mine.",
              },
            ],
          },
        ],
      },
      {
        heading: "Screens",
        images: [
          {
            src: "/works/wilmots/how-to-play.webp",
            alt: "How to play intro: the four product tiles, four customer cards and one rule card the tutorial uses",
            priority: "primary",
          },
          {
            src: "/works/wilmots/what-you-get.webp",
            alt: "What you get: the warehouse board, product tiles, customer cards, idea cards and rulebook in a bento grid",
            priority: "tertiary",
          },
          {
            src: "/works/wilmots/navigation.webp",
            alt: "The navigation overlay with the game box photo, section links, creators and publisher",
            priority: "tertiary",
          },
          {
            src: "/works/wilmots/gallery.webp",
            alt: "On the table: gallery of the game box and tiles in play, built by Fernando Manuel",
            priority: "tertiary",
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
        body: "Morfolabs is a blockchain consulting and marketing agency in Indonesia. At the owner's request I rebuilt its site, replacing an older WordPress site made by an outsourced team. Solo build, with a CMS the team edits without a developer. I built it with an AI coding workflow, writing a plan and a spec for the animation work before the code.",
        images: [
          { src: "/works/morfolabs/cover.webp", alt: "Morfolabs cover" },
        ],
      },
      {
        heading: "Motion with a purpose",
        body: '"How we work" is a staircase that scrubs with the scroll, with its own timeline for each screen size so it reads on a phone as well as on a desktop. The hero and the logo marquee move with the scroll, and a three.js grid distortion gives the visuals depth.',
      },
      {
        heading: "From code to CMS in six days",
        body: "I first gathered every line of copy into one place in code, then moved it into Payload CMS running inside the same Next.js app: nine collections and thirteen globals, with fields editors understand, such as an icon name, a button style and whether a link opens in a new tab. A seed script and a media migration carried the content across, and media is served from a CDN.",
      },
      {
        heading: "Readable by people and machines",
        body: "An accessibility pass, a sitemap, FAQ structured data and an llms.txt, so the site works for keyboard and screen-reader users and is easy for search engines and AI tools to read.",
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
        body: "Asosiasi Blockchain Indonesia (ABI) is a non-profit that brings blockchain companies and people across Indonesia together. Through Morfolabs, I built the front end of two products for it: the association's bilingual landing site, and a reporting portal where people file and follow complaints about crypto services. Team of two: I did the front end of both, admin screens included, and Awank Kaley built the backend. I have had no access to the portal since handoff.",
        images: [
          {
            src: "/works/abi/cover.webp",
            alt: "Asosiasi Blockchain Indonesia cover",
          },
        ],
      },
      {
        heading: "A site the association can edit",
        body: "Members, partners, boards, events, news and a dictionary of blockchain terms started out as lists in code. I moved them into a Sanity CMS with migration scripts in about a week, with English and Indonesian side by side in every field, so the staff keep the site current without a developer. The language lives in the URL and the site remembers the visitor's choice. A WebGL gradient and smooth scrolling share one animation loop behind it all.",
      },
      {
        heading: "A complaint, step by step",
        body: "A user signs in with email, Google or a one-time code, with optional two-factor authentication, reads a risk disclaimer, files the complaint in two steps with attachments and confirms it with a code. They then follow it on a timeline as it is handled, while admins work the same tickets from screens shaped by their role.",
        figures: [
          {
            kind: "flow",
            title: "Filing a complaint",
            steps: [
              {
                title: "Sign in",
                detail:
                  "Email, Google or a one-time code, with optional two-factor.",
              },
              { title: "Read the risk disclaimer" },
              {
                title: "File in two steps",
                detail: "What happened, then the evidence as attachments.",
              },
              { title: "Confirm with a code" },
              {
                title: "Follow it on a timeline",
                detail: "Admins work the same ticket from their own screens.",
              },
            ],
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
    id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
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
        body: "Elevate Former is a Slow Resistance Training (SRT) fitness studio. Through Morfolabs, I built the front end of its landing page and members' booking app: a timetable, class packages, reservations, payment and an account area. The client trusted me with feature decisions, not only structure and layout. Awank Kaley built the backend API, and I put a typed tRPC layer on top of TanStack Query in front of it. I also reviewed the quality of the outsourced admin panel. The logo was by an external designer.",
        images: [
          { src: "/works/elevate/cover.webp", alt: "Elevate Former cover" },
        ],
      },
      {
        heading: "Book, pay, come back",
        body: "A member browses the timetable, picks a session, buys or uses a package and pays. The booking in progress is kept on the device, so after the payment page they land back on a reservation that carries on where they left it. Reservations can be cancelled or reviewed afterwards, and transactions and the profile sit in the same account.",
        figures: [
          {
            kind: "flow",
            title: "A booking, start to finish",
            steps: [
              { title: "Browse the timetable" },
              { title: "Pick a session" },
              { title: "Buy or use a package" },
              { title: "Pay on the payment page" },
              { title: "Back to the reservation" },
            ],
            loop: "The booking in progress survives the payment redirect",
          },
        ],
      },
      {
        heading: "Phones first",
        body: "Timetable filters live in the URL, so a filtered view can be shared, sign-in slides up as a sheet on phones, and smooth scrolling switches off on small screens. Halfway through the build I moved all data fetching onto tRPC in a single day, token handling included, so every screen talks to the API the same way.",
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
