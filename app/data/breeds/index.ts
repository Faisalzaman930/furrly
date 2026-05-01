export type { BreedDoc, CatBreedDoc, AnyBreed, BreedScores, CatScores } from "./types";
export { dogs } from "./dogs";
export { cats } from "./cats";

import { dogs } from "./dogs";
import { cats } from "./cats";
import type { BreedDoc, CatBreedDoc, AnyBreed } from "./types";

export const ANIMAL_LABELS: Record<string, string> = {
  dogs: "Dogs",
  cats: "Cats",
};

export const breedsByAnimal: Record<string, BreedDoc[] | CatBreedDoc[]> = {
  dogs,
  cats,
};

export const allBreeds: AnyBreed[] = [...dogs, ...cats];

export function getBreed(animal: string, slug: string): AnyBreed | undefined {
  return (breedsByAnimal[animal] as AnyBreed[])?.find((b) => b.slug === slug);
}
