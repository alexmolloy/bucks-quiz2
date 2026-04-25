// ============================================================
// EDIT THIS FILE to customise the quiz for your bucks party!
// ============================================================

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

export const questions: Question[] = [
  {
    id: "q1",
    text: "What is Ritchie's favourite band?",
    answers: [
      { text: "The 1975", points: 2 },
      { text: "Sleep Token", points: 2 },
      { text: "Bring Me The Horizon", points: 1 },
      { text: "Fall Out Boy", points: 0 },
    ],
  },
  {
    id: "q2",
    text: "What is Ritchie's favourite Pokémon?",
    answers: [
      { text: "Bulbasaur", points: 2 },
      { text: "Mewtwo", points: 1 },
      { text: "Squirtle", points: 0 },
      { text: "Pikachu", points: 0 },
    ],
  },
  {
    id: "q3",
    text: "What is Ritchie's most used phrase or saying?",
    answers: [
      { text: "Two sides of a square", points: 2 },
      { text: "I'm schvitzing", points: 2 },
      { text: "Brilliant", points: 1 },
      { text: "Oy Vey", points: 0 },
    ],
  },
  {
    id: "q4",
    text: "What was/is Ritchie's greatest blind spot?",
    answers: [
      { text: "Lauren Koh", points: 2 },
      { text: "Tara Osbourne", points: 1 },
      { text: "Country Music", points: 1 },
      { text: "Missing the Crypto revolution", points: 0 },
    ],
  },
  {
    id: "q5",
    text: "What was/is Ritchie's greatest conquest?",
    answers: [
      { text: "Lauren Koh", points: 0 },
      { text: "Tara Osbourne", points: 2 },
      { text: "His inner demons", points: 1 },
      { text: "Missing the Crypto revolution", points: 0 },
    ],
  },
  {
    id: "q6",
    text: "What has Ritchie collected over the years?",
    answers: [
      { text: "Guitar pedals", points: 1 },
      { text: "Synthesizers", points: 1 },
      { text: "Pokémon cards", points: 1 },
      { text: "Regrets", points: 1 },
      { text: "All of the above", points: 2 },
    ],
  },
  {
    id: "q7",
    text: "What is one thing he is weirdly particular about?",
    answers: [
      { text: "The pronunciation of yoghurt", points: 1 },
      { text: "Sniffing his arm", points: 1 },
      { text: "Seed oils", points: 1 },
      { text: "Manscaping", points: 0 },
    ],
  },
  {
    id: "q8",
    text: "What does Ritchie hate?",
    answers: [
      { text: "Implied criticism", points: 2 },
      { text: "Wokeness", points: 1 },
      { text: "Religion", points: 0 },
      { text: "Twitter / X", points: 0 },
    ],
  },
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
    minScore: 15,
    maxScore: 15,
    name: "Dragonite",
    blurb: "The ride-or-die friend. Friendly, powerful, and always shows up when it matters. You've seen Ritchie at his best and worst and stayed anyway. Suspicious judgment, elite loyalty.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    color: "#F4A740",
  },
  {
    minScore: 14,
    maxScore: 14,
    name: "Alakazam",
    blurb: "The historian. You remember things about Ritchie he wishes you didn't. Dangerous knowledge. Could derail speeches, relationships, and possibly the wedding.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    color: "#C4A35A",
  },
  {
    minScore: 13,
    maxScore: 13,
    name: "Arcanine",
    blurb: "The protector. Fiercely loyal. If Ritchie got into trouble, you'd be first to help… and probably one of the reasons he got there.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    color: "#E8692A",
  },
  {
    minScore: 12,
    maxScore: 12,
    name: "Raichu",
    blurb: "The solid operator. Reliable and good energy. Knows enough about Ritchie to be useful, not enough to be legally concerning.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    color: "#F5C842",
  },
  {
    minScore: 11,
    maxScore: 11,
    name: "Eevee",
    blurb: "The wildcard. Plenty of potential, but unclear what kind of friend you actually are. Could evolve into greatness. Could also stay exactly like this.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    color: "#C8956C",
  },
  {
    minScore: 10,
    maxScore: 10,
    name: "Slowpoke",
    blurb: "The late realiser. You do know Ritchie… eventually. Usually a few business days after everyone else.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
    color: "#E8A0BF",
  },
  {
    minScore: 9,
    maxScore: 9,
    name: "Psyduck",
    blurb: "The confused contributor. Lots going on upstairs, none of it useful. Panics under pressure and answers with confidence and zero accuracy.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    color: "#F0D060",
  },
  {
    minScore: 8,
    maxScore: 8,
    name: "Geodude",
    blurb: "The tag-along. You're here, you exist, you've probably known Ritchie for years… and somehow learned nothing.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    color: "#9B8B7A",
  },
  {
    minScore: 7,
    maxScore: 7,
    name: "Metapod",
    blurb: "The passive observer. You've spent a lot of time around Ritchie doing absolutely nothing with it. Just sitting there. Hardening.",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    color: "#7AB87A",
  },
  {
    minScore: 0,
    maxScore: 6,
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
