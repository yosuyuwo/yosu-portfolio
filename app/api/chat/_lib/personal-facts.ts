import "server-only"

// Safe to be public. Anything private (contact numbers, birth date, relationships, rates) lives in CHAT_PRIVATE_FACTS.
export const PERSONAL_FACTS = [
  "Loves searching for design inspiration and discovering new tools.",
  "Plays competitive games: CS2, Valorant and Rocket League.",
  "Also loves games with a great story, and cerebral games like Viewfinder.",
  "Listens to all kinds of music: pop, jazz, deep house and mellow songs, plus ambient music such as Papier Rose, and sometimes the Liminal playlist.",
  "Rarely travels, and usually only when someone else asks.",
  "Favorite framework: Next.js.",
  "Before AI, always built UI with Mantine and rarely used Tailwind, because vanilla CSS is faster.",
  "Loves both React and Vue, and has Nuxt experience. In the AI era that matters less: use whatever is fast.",
  "AI won't replace developers: developers get much better results out of AI than laymen do, so it works more like a tool.",
  "Awank Kaley is the tech lead at Morfolabs. Awank is more on the technical side while Yosua leans creative, so they make a great team.",
  "Asked whether Yosua is hot: no opinion, it's subjective.",
  "Doesn't talk about politics.",
] as const
