export interface BreedScores {
  adaptability: number | null;
  apartmentFriendly: number | null;
  goodForNovice: number | null;
  sensitivity: number | null;
  toleratesAlone: number | null;
  toleratesCold: number | null;
  toleratesHot: number | null;
  friendliness: number | null;
  affectionate: number | null;
  kidFriendly: number | null;
  dogFriendly: number | null;
  strangerFriendly: number | null;
  shedding: number | null;
  drooling: number | null;
  easyToGroom: number | null;
  health: number | null;
  weightGain: number | null;
  trainability: number | null;
  easyToTrain: number | null;
  intelligence: number | null;
  mouthiness: number | null;
  preyDrive: number | null;
  barkiness: number | null;
  wanderlust: number | null;
  energy: number | null;
  intensity: number | null;
  exerciseNeeds: number | null;
  playfulness: number | null;
}

export interface CatScores {
  adaptability: number | null;
  affectionLevel: number | null;
  childFriendly: number | null;
  dogFriendly: number | null;
  energyLevel: number | null;
  grooming: number | null;
  healthIssues: number | null;
  intelligence: number | null;
  sheddingLevel: number | null;
  socialNeeds: number | null;
  strangerFriendly: number | null;
  vocalisation: number | null;
}

export interface BreedDoc {
  slug: string;
  name: string;
  animal: "dogs" | "cats";
  group: string | null;
  size: string | null;
  height: string | null;
  heightCm: number | null;
  weight: string | null;
  weightKg: number | null;
  lifeSpan: string | null;
  lifeSpanYears: number | null;
  image: string | null;
  scores: BreedScores;
}

export interface CatBreedDoc {
  slug: string;
  name: string;
  animal: "cats";
  origin: string | null;
  temperament: string | null;
  description: string | null;
  weight: string | null;
  lifeSpan: string | null;
  indoor: boolean | null;
  lap: boolean | null;
  hypoallergenic: boolean | null;
  image: string | null;
  scores: CatScores;
}

export type AnyBreed = BreedDoc | CatBreedDoc;
