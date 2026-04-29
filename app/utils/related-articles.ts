import { howToArticles } from "../data/howto";
import { breedArticles } from "../data/breed-articles";
import { symptomArticles } from "../data/symptom-articles";
import { definitionArticles } from "../data/definition-articles";
import { guides } from "../data/guides";
import { pillarPages } from "../data/pillars";
import { articles } from "../data/articles";
import { guide333Rescue } from "../data/guide-333-rescue";
import { guidePuppySocialization } from "../data/guide-puppy-socialization";

export interface RelatedCard {
  slug: string;
  shortTitle: string;
  readTime: string;
  typeLabel: string;
}

const pillarTitles: Record<string, string> = {
  "complete-guide-to-dog-training": "Complete Guide to Dog Training",
  "complete-guide-to-puppy-care": "Complete Guide to Puppy Care",
  "complete-guide-to-pet-health": "Complete Guide to Pet Health",
  "complete-guide-to-pet-nutrition": "Complete Guide to Pet Nutrition",
};

export function getPillarTitle(pillarSlug: string): string {
  return pillarTitles[pillarSlug] ?? "Complete Guide";
}

const ALL_ARTICLES: RelatedCard[] = [
  ...howToArticles.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "How-To Guide" })),
  ...breedArticles.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "Breed Guide" })),
  ...symptomArticles.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "Symptom Guide" })),
  ...definitionArticles.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "Health Guide" })),
  ...guides.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "Expert Guide" })),
  ...pillarPages.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: a.readTime, typeLabel: "Complete Guide" })),
  ...articles.map(a => ({ slug: a.slug, shortTitle: a.shortTitle, readTime: "18 Min Read", typeLabel: "App Review" })),
  { slug: guide333Rescue.slug, shortTitle: guide333Rescue.shortTitle, readTime: guide333Rescue.readTime, typeLabel: "Expert Guide" },
  { slug: guidePuppySocialization.slug, shortTitle: guidePuppySocialization.shortTitle, readTime: guidePuppySocialization.readTime, typeLabel: "Expert Guide" },
];

export function getRelatedArticles(slugs: string[]): RelatedCard[] {
  return slugs
    .map(slug => ALL_ARTICLES.find(a => a.slug === slug))
    .filter((a): a is RelatedCard => a !== undefined);
}
