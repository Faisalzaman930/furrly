export interface BreedData {
  name: string;
  minWeight: number; // in kg (grams for birds)
  maxWeight: number; // in kg (grams for birds)
  species: "dog" | "cat" | "rabbit" | "bird";
  size?: "small" | "medium" | "large" | "giant"; // For dog age calculation
  factor?: number; // For bird age calculation
}

export const breeds: BreedData[] = [
  // DOGS (kg)
  { name: "Chihuahua", minWeight: 1.5, maxWeight: 3, species: "dog", size: "small" },
  { name: "Pomeranian", minWeight: 1.9, maxWeight: 3.5, species: "dog", size: "small" },
  { name: "Yorkshire Terrier", minWeight: 2, maxWeight: 3.2, species: "dog", size: "small" },
  { name: "Maltese", minWeight: 1.4, maxWeight: 3, species: "dog", size: "small" },
  { name: "Pug", minWeight: 6, maxWeight: 8, species: "dog", size: "small" },
  { name: "French Bulldog", minWeight: 8, maxWeight: 14, species: "dog", size: "small" },
  { name: "Beagle", minWeight: 9, maxWeight: 11, species: "dog", size: "medium" },
  { name: "Cocker Spaniel", minWeight: 10, maxWeight: 14, species: "dog", size: "medium" },
  { name: "Border Collie", minWeight: 12, maxWeight: 20, species: "dog", size: "medium" },
  { name: "Bulldog", minWeight: 18, maxWeight: 25, species: "dog", size: "medium" },
  { name: "Australian Shepherd", minWeight: 16, maxWeight: 32, species: "dog", size: "medium" },
  { name: "Poodle (Standard)", minWeight: 20, maxWeight: 32, species: "dog", size: "medium" },
  { name: "Boxer", minWeight: 25, maxWeight: 32, species: "dog", size: "large" },
  { name: "Golden Retriever", minWeight: 27, maxWeight: 36, species: "dog", size: "large" },
  { name: "German Shepherd", minWeight: 22, maxWeight: 40, species: "dog", size: "large" },
  { name: "Labrador Retriever", minWeight: 25, maxWeight: 36, species: "dog", size: "large" },
  { name: "Siberian Husky", minWeight: 16, maxWeight: 27, species: "dog", size: "large" },
  { name: "Rottweiler", minWeight: 35, maxWeight: 60, species: "dog", size: "large" },
  { name: "Great Dane", minWeight: 45, maxWeight: 90, species: "dog", size: "giant" },
  { name: "Saint Bernard", minWeight: 54, maxWeight: 82, species: "dog", size: "giant" },
  { name: "Mastiff", minWeight: 54, maxWeight: 100, species: "dog", size: "giant" },
  { name: "Mixed Breed (Small)", minWeight: 2, maxWeight: 10, species: "dog", size: "small" },
  { name: "Mixed Breed (Medium)", minWeight: 10, maxWeight: 25, species: "dog", size: "medium" },
  { name: "Mixed Breed (Large)", minWeight: 25, maxWeight: 45, species: "dog", size: "large" },

  // CATS (kg)
  { name: "Siamese", minWeight: 2.5, maxWeight: 5.5, species: "cat" },
  { name: "Persian", minWeight: 3.5, maxWeight: 5.5, species: "cat" },
  { name: "Maine Coon", minWeight: 5, maxWeight: 11, species: "cat" },
  { name: "British Shorthair", minWeight: 4, maxWeight: 7.5, species: "cat" },
  { name: "Ragdoll", minWeight: 4.5, maxWeight: 9, species: "cat" },
  { name: "Bengal", minWeight: 4, maxWeight: 7, species: "cat" },
  { name: "Sphynx", minWeight: 3, maxWeight: 5.5, species: "cat" },
  { name: "Abyssinian", minWeight: 3.5, maxWeight: 5, species: "cat" },
  { name: "Domestic Shorthair", minWeight: 3.5, maxWeight: 5.5, species: "cat" },
  { name: "Mixed Breed Cat", minWeight: 3.5, maxWeight: 6, species: "cat" },

  // RABBITS (kg)
  { name: "Netherland Dwarf", minWeight: 0.5, maxWeight: 1.1, species: "rabbit" },
  { name: "Holland Lop", minWeight: 1, maxWeight: 1.8, species: "rabbit" },
  { name: "Lionhead", minWeight: 1.1, maxWeight: 1.7, species: "rabbit" },
  { name: "Rex", minWeight: 3, maxWeight: 4.5, species: "rabbit" },
  { name: "Flemish Giant", minWeight: 6, maxWeight: 10, species: "rabbit" },
  { name: "English Lop", minWeight: 4, maxWeight: 5, species: "rabbit" },

  // BIRDS (grams)
  { name: "Budgie", minWeight: 30, maxWeight: 45, species: "bird", factor: 5.5 },
  { name: "Cockatiel", minWeight: 70, maxWeight: 120, species: "bird", factor: 4.2 },
  { name: "African Grey", minWeight: 350, maxWeight: 550, species: "bird", factor: 2.1 },
  { name: "Macaw (Blue & Gold)", minWeight: 900, maxWeight: 1200, species: "bird", factor: 1.5 },
  { name: "Cockatoo (Umbrella)", minWeight: 400, maxWeight: 800, species: "bird", factor: 1.8 },
  { name: "Canary", minWeight: 15, maxWeight: 25, species: "bird", factor: 6.2 },
  { name: "Lovebird", minWeight: 40, maxWeight: 60, species: "bird", factor: 5.8 },
];

export const birdSpecies = breeds.filter(b => b.species === "bird");
