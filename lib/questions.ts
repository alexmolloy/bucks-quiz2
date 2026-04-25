export const BUCK_NAME = "Ritchie";

export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface FreeTextQuestion {
  id: string;
  text: string;
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "What is Ritchie's favourite movie?",
    answers: [
      { text: "The Meg", points: 0 },
      { text: "Interstellar", points: 2 },
      { text: "Thor: Ragnarok", points: 0 },
      { text: "The Social Network", points: 1 },
    ],
  },
  {
    id: "q2",
    text: "What is Ritchie's favourite band?",
    answers: [
      { text: "Bring Me The Horizon", points: 1 },
      { text: "Fall Out Boy", points: 0 },
      { text: "Sleep Token", points: 3 },
      { text: "The 1975", points: 2 },
    ],
  },
  {
    id: "q3",
    text: "What is Ritchie's favourite Pokémon?",
    answers: [
      { text: "Psyduck", points: 1 },
      { text: "Bulbasaur", points: 3 },
      { text: "Tyranitar", points: 0 },
      { text: "Mew", points: 2 },
    ],
  },
  {
    id: "q4",
    text: "What is Ritchie's most used phrase or saying?",
    answers: [
      { text: "Oy Vey", points: 0 },
      { text: "Two sides of a square", points: 2 },
      { text: "I'm schvitzing", points: 1 },
      { text: "Tasty treat", points: 1 },
    ],
  },
  {
    id: "q5",
    text: "What was/is Ritchie's greatest blind spot?",
    answers: [
      { text: "Missing the Crypto revolution", points: 0 },
      { text: "Tara Osbourne", points: 1 },
      { text: "Lauren Koh", points: 2 },
      { text: "Country Music", points: 1 },
    ],
  },
  {
    id: "q6",
    text: "What was/is Ritchie's greatest conquest?",
    answers: [
      { text: "His inner demons", points: 1 },
      { text: "Successfully negotiating this trip with Jess", points: 1 },
      { text: "Tara Osbourne", points: 2 },
      { text: "Pointsmaxxing Woolworths rewards", points: 1 },
    ],
  },
  {
    id: "q7",
    text: "What has Ritchie collected over the years?",
    answers: [
      { text: "Synthesizers", points: 1 },
      { text: "All of the above", points: 2 },
      { text: "Pokémon cards", points: 1 },
      { text: "Guitar pedals", points: 1 },
      { text: "Regrets", points: 1 },
    ],
  },
  {
    id: "q8",
    text: "What is one thing he is weirdly particular about?",
    answers: [
      { text: "Manscaping", points: 0 },
      { text: "Sniffing his arm", points: 1 },
      { text: "The pronunciation of yoghurt", points: 1 },
      { text: "Seed oils", points: 1 },
    ],
  },
  {
    id: "q9",
    text: "What does Ritchie hate?",
    answers: [
      { text: "Twitter / X", points: 0 },
      { text: "Implied criticism", points: 2 },
      { text: "Religion", points: 0 },
      { text: "Wokeness", points: 1 },
    ],
  },
  {
    id: "q10",
    text: "What is Ritchie's least favourite body part?",
    answers: [
      { text: "Ankles", points: 0 },
      { text: "Feet", points: 2 },
      { text: "Elbow", points: 0 },
      { text: "Hands", points: 1 },
    ],
  },
  {
    id: "q11",
    text: "What is Ritchie's spirit animal?",
    answers: [
      { text: "Beaver", points: 0 },
      { text: "Fox", points: 2 },
      { text: "Dolphin", points: 0 },
      { text: "Meerkat", points: 1 },
    ],
  },
];

export const freeTextQuestions: FreeTextQuestion[] = [
  { id: "ft1", text: "What is Ritchie's stripper name?" },
  { id: "ft2", text: "Where will Ritchie be in 20 years?" },
  { id: "ft3", text: "Valiant sells. What is the first thing Ritchie buys?" },
];

export interface PokemonTier {
  minScore: number;
  maxScore: number;
  name: string;
  blurb: string;
  imageUrl: string;
  color: string;
}

export const pokemonTiers: PokemonTier[] = [
  {
    minScore: 21, maxScore: 99,
    name: "Dragonite",
    blurb: "The ride-or-die friend. Friendly, powerful, and always shows up when it matters. You've seen Ritchie at his best and worst and stayed anyway. Suspicious judgment, elite loyalty.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    color: "#F4A740",
  },
  {
    minScore: 19, maxScore: 20,
    name: "Alakazam",
    blurb: "The historian. You remember things about Ritchie he wishes you didn't. Dangerous knowledge. Could derail speeches, relationships, and possibly the wedding.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    color: "#C4A35A",
  },
  {
    minScore: 17, maxScore: 18,
    name: "Arcanine",
    blurb: "The protector. Fiercely loyal. If Ritchie got into trouble, you'd be first to help… and probably one of the reasons he got there.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    color: "#E8692A",
  },
  {
    minScore: 15, maxScore: 16,
    name: "Raichu",
    blurb: "The solid operator. Reliable and good energy. Knows enough about Ritchie to be useful, not enough to be legally concerning.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    color: "#F5C842",
  },
  {
    minScore: 13, maxScore: 14,
    name: "Eevee",
    blurb: "The wildcard. Plenty of potential, but unclear what kind of friend you actually are. Could evolve into greatness. Could also stay exactly like this.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    color: "#C8956C",
  },
  {
    minScore: 12, maxScore: 12,
    name: "Slowpoke",
    blurb: "The late realiser. You do know Ritchie… eventually. Usually a few business days after everyone else.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
    color: "#E8A0BF",
  },
  {
    minScore: 11, maxScore: 11,
    name: "Psyduck",
    blurb: "The confused contributor. Lots going on upstairs, none of it useful. Panics under pressure and answers with confidence and zero accuracy.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    color: "#F0D060",
  },
  {
    minScore: 10, maxScore: 10,
    name: "Geodude",
    blurb: "The tag-along. You're here, you exist, you've probably known Ritchie for years… and somehow learned nothing.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    color: "#9B8B7A",
  },
  {
    minScore: 9, maxScore: 9,
    name: "Metapod",
    blurb: "The passive observer. You've spent a lot of time around Ritchie doing absolutely nothing with it. Just sitting there. Hardening.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    color: "#7AB87A",
  },
  {
    minScore: 0, maxScore: 8,
    name: "Magikarp",
    blurb: "The liability. A lot of movement, no impact. Physically present for memories, spiritually absent.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    color: "#E85D5D",
  },
];

export function getPokemonForScore(score: number): PokemonTier {
  return (
    pokemonTiers.find((t) => score >= t.minScore && score <= t.maxScore) ??
    pokemonTiers[pokemonTiers.length - 1]
  );
}

export const MAX_SCORE = questions.reduce((sum, q) => {
  return sum + Math.max(...q.answers.map((a) => a.points));
}, 0);
