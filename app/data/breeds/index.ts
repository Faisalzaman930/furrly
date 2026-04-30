export type { BreedDoc, BreedScores } from "./types";
export { dogs } from "./dogs";

import { dogs } from "./dogs";
import type { BreedDoc } from "./types";

export const ANIMAL_LABELS: Record<string, string> = {
  dogs: "Dogs",
  cats: "Cats",
};

export const allBreeds: BreedDoc[] = [...dogs];

export const breedsByAnimal: Record<string, BreedDoc[]> = {
  dogs,
};

export function getBreed(animal: string, slug: string): BreedDoc | undefined {
  return breedsByAnimal[animal]?.find((b) => b.slug === slug);
}
