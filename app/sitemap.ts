import type { MetadataRoute } from "next";
import { articles } from "./data/articles";
import { guides } from "./data/guides";
import { howToArticles } from "./data/howto";
import { symptomArticles } from "./data/symptom-articles";
import { breedArticles } from "./data/breed-articles";
import { definitionArticles } from "./data/definition-articles";
import { pillarPages } from "./data/pillars";
import { templateDocs } from "./data/templates";
import { breedsByAnimal } from "./data/breeds";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://furrly.co";
const TODAY = new Date();

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  // ── Core ─────────────────────────────────────────────────────────────────
  { url: BASE_URL,                              changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE_URL}/about`,                   changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/roadmap`,                 changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/join`,                    changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/privacy`,                 changeFrequency: "yearly",  priority: 0.4 },
  { url: `${BASE_URL}/terms`,                   changeFrequency: "yearly",  priority: 0.4 },

  // ── Feature pages ────────────────────────────────────────────────────────
  { url: `${BASE_URL}/adoption`,                changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/playdates`,               changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/social`,                  changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/fostering`,               changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/vets`,                    changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/lost-found`,              changeFrequency: "weekly",  priority: 0.9 },

  // ── Content hubs ─────────────────────────────────────────────────────────
  { url: `${BASE_URL}/resources`,               changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE_URL}/tools`,                   changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/templates`,               changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/breeds`,                  changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/breeds/dogs`,             changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/breeds/cats`,             changeFrequency: "weekly",  priority: 0.8 },

  // ── Tools ────────────────────────────────────────────────────────────────
  { url: `${BASE_URL}/tools/calorie-calculator`,  changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/water-calculator`,    changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/exercise-calculator`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/puppy-weight`,        changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/whelping-calculator`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/symptom-checker`,     changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/toxic-food`,          changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/vaccine-tracker`,     changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/breed-compare`,       changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/feeding-calculator`,  changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/age-calculator`,      changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/pet-bmi`,             changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/insurance-cost`,      changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/pet-health-quiz`,     changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/first-aid-quiz`,      changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/best-dog-quiz`,       changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/best-cat-quiz`,       changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/pet-sitter-cost`,     changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/sitting-comparison`,  changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/tools/packing-checklist`,   changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/name-generator`,      changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/photo-tips`,          changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/birthday-countdown`,  changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/pet-owner-quiz`,      changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Resource articles ───────────────────────────────────────────────────
  const resourceRoutes: MetadataRoute.Sitemap = [
    ...pillarPages.map((p) => ({
      url: `${BASE_URL}/resources/${p.slug}`,
      lastModified: TODAY,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: `${BASE_URL}/resources/${g.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...breedArticles.map((b) => ({
      url: `${BASE_URL}/resources/${b.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...howToArticles.map((h) => ({
      url: `${BASE_URL}/resources/${h.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...symptomArticles.map((s) => ({
      url: `${BASE_URL}/resources/${s.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...definitionArticles.map((d) => ({
      url: `${BASE_URL}/resources/${d.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${BASE_URL}/resources/${a.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // ── Templates ───────────────────────────────────────────────────────────
  const templateRoutes: MetadataRoute.Sitemap = templateDocs.map((t) => ({
    url: `${BASE_URL}/templates/${t.slug}`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: t.tier === 1 ? 0.8 : t.tier === 2 ? 0.7 : 0.6,
  }));

  // ── Breed pages ──────────────────────────────────────────────────────────
  const breedRoutes: MetadataRoute.Sitemap = Object.entries(breedsByAnimal).flatMap(
    ([animal, breeds]) =>
      breeds.map((b) => ({
        url: `${BASE_URL}/breeds/${animal}/${b.slug}`,
        lastModified: TODAY,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  return [...STATIC_ROUTES, ...resourceRoutes, ...templateRoutes, ...breedRoutes];
}
