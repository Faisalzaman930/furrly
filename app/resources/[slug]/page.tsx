import { articles } from "../../data/articles";
import { guides } from "../../data/guides";
import { howToArticles } from "../../data/howto";
import { symptomArticles } from "../../data/symptom-articles";
import { breedArticles } from "../../data/breed-articles";
import { definitionArticles } from "../../data/definition-articles";
import { pillarPages } from "../../data/pillars";
import BlogLayout from "../../components/BlogLayout";
import GuideLayout from "../../components/GuideLayout";
import HowToLayout from "../../components/HowToLayout";
import SymptomLayout from "../../components/SymptomLayout";
import BreedLayout from "../../components/BreedLayout";
import DefinitionLayout from "../../components/DefinitionLayout";
import PillarLayout from "../../components/PillarLayout";
import { Metadata } from "next";

export async function generateStaticParams() {
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...guides.map((g) => ({ slug: g.slug })),
    ...howToArticles.map((a) => ({ slug: a.slug })),
    ...symptomArticles.map((a) => ({ slug: a.slug })),
    ...breedArticles.map((a) => ({ slug: a.slug })),
    ...definitionArticles.map((a) => ({ slug: a.slug })),
    ...pillarPages.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);
  if (article) {
    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription,
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription,
        type: "article",
        publishedTime: article.publishDate,
        modifiedTime: article.lastUpdated,
      },
    };
  }

  const guide = guides.find((g) => g.slug === slug);
  if (guide) {
    return {
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription,
      openGraph: {
        title: guide.seoTitle || guide.title,
        description: guide.seoDescription,
        type: "article",
        publishedTime: guide.publishDate,
        modifiedTime: guide.lastUpdated,
      },
    };
  }

  const howTo = howToArticles.find((a) => a.slug === slug);
  if (howTo) {
    return {
      title: howTo.seoTitle || howTo.title,
      description: howTo.seoDescription,
      openGraph: {
        title: howTo.seoTitle || howTo.title,
        description: howTo.seoDescription,
        type: "article",
        publishedTime: howTo.publishDate,
        modifiedTime: howTo.lastUpdated,
      },
    };
  }

  const symptom = symptomArticles.find((a) => a.slug === slug);
  if (symptom) {
    return {
      title: symptom.seoTitle || symptom.title,
      description: symptom.seoDescription,
      openGraph: {
        title: symptom.seoTitle || symptom.title,
        description: symptom.seoDescription,
        type: "article",
        publishedTime: symptom.publishDate,
        modifiedTime: symptom.lastUpdated,
      },
    };
  }

  const breed = breedArticles.find((a) => a.slug === slug);
  if (breed) {
    return {
      title: breed.seoTitle || breed.title,
      description: breed.seoDescription,
      openGraph: {
        title: breed.seoTitle || breed.title,
        description: breed.seoDescription,
        type: "article",
        publishedTime: breed.publishDate,
        modifiedTime: breed.lastUpdated,
      },
    };
  }

  const definition = definitionArticles.find((a) => a.slug === slug);
  if (definition) {
    return {
      title: definition.seoTitle || definition.title,
      description: definition.seoDescription,
      openGraph: {
        title: definition.seoTitle || definition.title,
        description: definition.seoDescription,
        type: "article",
        publishedTime: definition.publishDate,
        modifiedTime: definition.lastUpdated,
      },
    };
  }

  const pillar = pillarPages.find((p) => p.slug === slug);
  if (pillar) {
    return {
      title: pillar.seoTitle || pillar.title,
      description: pillar.seoDescription,
      openGraph: {
        title: pillar.seoTitle || pillar.title,
        description: pillar.seoDescription,
        type: "article",
        publishedTime: pillar.publishDate,
        modifiedTime: pillar.lastUpdated,
      },
    };
  }

  return { title: "Not Found" };
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildArticleSchema(item: { title: string; seoDescription: string; publishDate: string; lastUpdated: string; slug: string; shortTitle: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": item.title,
    "description": item.seoDescription,
    "datePublished": item.publishDate,
    "dateModified": item.lastUpdated,
    "publisher": { "@type": "Organization", "name": "Furrly", "url": "https://furrly.app" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://furrly.app" },
        { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://furrly.app/resources" },
        { "@type": "ListItem", "position": 3, "name": item.shortTitle, "item": `https://furrly.app/resources/${item.slug}` },
      ],
    },
  };
}

function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };
}

function buildPillarHowToSchema(pillar: (typeof pillarPages)[0]) {
  // Only emit HowTo for pillar pages that have a foundational "how to" chapter
  const howToChapter = pillar.chapters.find(
    (ch) => ch.anchorId === "foundational-commands" || ch.title.toLowerCase().includes("foundational")
  );
  if (!howToChapter) return null;

  // Extract the named steps from the chapter title list
  const stepNames: { name: string; text: string }[] = [
    { name: "Sit", text: "Lure from nose upward — the dog's hindquarters naturally drop. Mark the instant they touch the floor, then reward. Add the verbal cue only after the behavior is reliable." },
    { name: "Stay", text: "Build stay by extending three dimensions incrementally: duration (seconds to minutes), distance (one foot to across the room), and distraction (quiet room to outdoors). Always release with a consistent word." },
    { name: "Come (Recall)", text: "Never call your dog for anything unpleasant. The word 'come' must always predict something wonderful. Practice in low-distraction settings first, then gradually add challenges. Use the highest-value treats for recall." },
    { name: "Leave It", text: "Start with treats in a closed fist. When the dog stops nosing and moves away, mark and reward from the other hand. Progress to treats on the floor, then dropped items in the real world." },
    { name: "Loose-Leash Walking", text: "The rule is absolute: the leash never tightens from pulling and still results in forward movement. Every time the leash goes tight, stop or change direction until the dog returns to your side." },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train a Dog: The 5 Foundational Behaviors",
    "description": "The five behaviors every dog must know — sit, stay, come, leave it, and loose-leash walking — taught using positive reinforcement.",
    "step": stepNames.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.name,
      "text": s.text,
    })),
  };
}

function buildHowToSchema(article: (typeof howToArticles)[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": article.seoDescription,
    "step": article.steps.map((step) => ({
      "@type": "HowToStep",
      "position": step.number,
      "name": step.title,
      "text": step.content,
    })),
    ...(article.supplies
      ? {
          "supply": article.supplies.map((s) => ({
            "@type": "HowToSupply",
            "name": s.item,
          })),
        }
      : {}),
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);
  if (article) {
    const faqSchema = article.faqs?.length ? buildFaqSchema(article.faqs) : null;
    return (
      <>
        <JsonLd data={buildArticleSchema(article)} />
        {faqSchema && <JsonLd data={faqSchema} />}
        <BlogLayout article={article} allArticles={articles} />
      </>
    );
  }

  const guide = guides.find((g) => g.slug === slug);
  if (guide) {
    return (
      <>
        <JsonLd data={buildArticleSchema(guide)} />
        <GuideLayout guide={guide} />
      </>
    );
  }

  const howTo = howToArticles.find((a) => a.slug === slug);
  if (howTo) {
    return (
      <>
        <JsonLd data={buildArticleSchema(howTo)} />
        <JsonLd data={buildHowToSchema(howTo)} />
        {howTo.faqs?.length ? <JsonLd data={buildFaqSchema(howTo.faqs)} /> : null}
        <HowToLayout article={howTo} />
      </>
    );
  }

  const symptom = symptomArticles.find((a) => a.slug === slug);
  if (symptom) {
    return (
      <>
        <JsonLd data={buildArticleSchema(symptom)} />
        {symptom.faqs?.length ? <JsonLd data={buildFaqSchema(symptom.faqs)} /> : null}
        <SymptomLayout article={symptom} />
      </>
    );
  }

  const breed = breedArticles.find((a) => a.slug === slug);
  if (breed) {
    return (
      <>
        <JsonLd data={buildArticleSchema(breed)} />
        {breed.faqs?.length ? <JsonLd data={buildFaqSchema(breed.faqs)} /> : null}
        <BreedLayout article={breed} />
      </>
    );
  }

  const definition = definitionArticles.find((a) => a.slug === slug);
  if (definition) {
    return (
      <>
        <JsonLd data={buildArticleSchema(definition)} />
        {definition.faqs?.length ? <JsonLd data={buildFaqSchema(definition.faqs)} /> : null}
        <DefinitionLayout article={definition} />
      </>
    );
  }

  const pillar = pillarPages.find((p) => p.slug === slug);
  if (pillar) {
    const pillarHowTo = buildPillarHowToSchema(pillar);
    return (
      <>
        <JsonLd data={buildArticleSchema(pillar)} />
        {pillar.faqs?.length ? <JsonLd data={buildFaqSchema(pillar.faqs)} /> : null}
        {pillarHowTo && <JsonLd data={pillarHowTo} />}
        <PillarLayout page={pillar} />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Article not found</h1>
    </div>
  );
}
