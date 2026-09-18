export interface Story {
  id: string;
  fileNumber: string;
  title: string;
  caseTitle: string;
  tagline: string;
  basePath: string;
  entryUrl: string;
  thumbnail: string;
  /** localStorage key holding the collected-clue map for this story. */
  storageKey: string;
  /** Number of clues/evidence items required to solve the case. */
  totalClues: number;
}

export const stories: Story[] = [
  {
    id: 'mysterious-transformations',
    fileNumber: '01',
    title: 'Clara Denari and the Mysterious Transformations',
    caseTitle: 'The Mysterious Transformations',
    tagline: 'A stolen necklace, a city full of clues, and a crash course in Cloudinary image transformations.',
    basePath: '/',
    entryUrl: '/mysterious-transformations',
    thumbnail: 'https://res.cloudinary.com/dr60nybtj/image/upload/fl_c2pa/f_auto,q_auto/v1757947052/cd-home.png',
    storageKey: 'inventory_item',
    totalClues: 5
  },
  {
    id: 'counterfeit-countdown',
    fileNumber: '02',
    title: 'Clara Denari and the Secret Agent: The Case of the Counterfeit Countdown',
    caseTitle: 'The Counterfeit Countdown',
    tagline: "Midnight is coming for Maison Vesper. Train the Secret Agent to trust the right evidence before the launch goes out.",
    basePath: '/secret-agent',
    entryUrl: '/secret-agent',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/ecommerce/leather-bag-gray',
    storageKey: 'secret_agent_evidence',
    totalClues: 4
  }
];

// Finds the story that owns a given pathname, matching the most specific
// (longest) non-root basePath first so nested stories win over the legacy
// flat-file story that lives at '/'.
export function getStoryForPath(pathname: string): Story {
  const nested = stories
    .filter((s) => s.basePath !== '/')
    .sort((a, b) => b.basePath.length - a.basePath.length);

  const match = nested.find(
    (s) => pathname === s.basePath || pathname.startsWith(`${s.basePath}/`)
  );

  return match || stories.find((s) => s.basePath === '/')!;
}
