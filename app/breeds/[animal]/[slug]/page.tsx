import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { breedsByAnimal, getBreed, ANIMAL_LABELS } from "../../../data/breeds";
import { generateBreedContent } from "../../../data/breeds/content";
import type { BreedScores } from "../../../data/breeds";

export async function generateStaticParams() {
  const params: { animal: string; slug: string }[] = [];
  for (const [animal, breeds] of Object.entries(breedsByAnimal)) {
    for (const b of breeds) {
      params.push({ animal, slug: b.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ animal: string; slug: string }>;
}): Promise<Metadata> {
  const { animal, slug } = await params;
  const breed = getBreed(animal, slug);
  if (!breed) return {};
  const animalLabel = ANIMAL_LABELS[animal] ?? animal;
  const sizeStr = breed.size ? ` ${breed.size.toLowerCase()}` : "";
  const lifeStr = breed.lifeSpan ? ` Life expectancy: ${breed.lifeSpan}.` : "";
  return {
    title: `${breed.name} ${animalLabel.slice(0, -1)} Breed Guide — Temperament, Size & Care | Furrly`,
    description: `Complete ${breed.name} breed guide.${sizeStr ? ` Size: ${breed.size}.` : ""}${lifeStr} Temperament scores, grooming needs, training tips, health info & FAQs.`,
    alternates: { canonical: `https://furrly.co/breeds/${animal}/${slug}` },
  };
}

const SCORE_SECTIONS: { label: string; keys: (keyof BreedScores)[] }[] = [
  {
    label: "Adaptability",
    keys: ["adaptability", "apartmentFriendly", "goodForNovice", "sensitivity", "toleratesAlone", "toleratesCold", "toleratesHot"],
  },
  {
    label: "Friendliness",
    keys: ["friendliness", "affectionate", "kidFriendly", "dogFriendly", "strangerFriendly"],
  },
  {
    label: "Health & Grooming",
    keys: ["shedding", "drooling", "easyToGroom", "health", "weightGain"],
  },
  {
    label: "Trainability",
    keys: ["trainability", "easyToTrain", "intelligence", "mouthiness", "preyDrive", "barkiness", "wanderlust"],
  },
  {
    label: "Physical Needs",
    keys: ["energy", "intensity", "exerciseNeeds", "playfulness"],
  },
];

const SCORE_LABELS: Record<keyof BreedScores, string> = {
  adaptability: "Overall Adaptability",
  apartmentFriendly: "Apartment Living",
  goodForNovice: "Good for Novice Owners",
  sensitivity: "Sensitivity",
  toleratesAlone: "Tolerates Being Alone",
  toleratesCold: "Cold Weather",
  toleratesHot: "Hot Weather",
  friendliness: "Overall Friendliness",
  affectionate: "Affectionate with Family",
  kidFriendly: "Kid-Friendly",
  dogFriendly: "Dog-Friendly",
  strangerFriendly: "Friendly to Strangers",
  shedding: "Shedding",
  drooling: "Drooling",
  easyToGroom: "Easy to Groom",
  health: "General Health",
  weightGain: "Weight Gain Tendency",
  trainability: "Overall Trainability",
  easyToTrain: "Easy to Train",
  intelligence: "Intelligence",
  mouthiness: "Mouthiness",
  preyDrive: "Prey Drive",
  barkiness: "Tendency to Bark",
  wanderlust: "Wanderlust",
  energy: "Energy Level",
  intensity: "Intensity",
  exerciseNeeds: "Exercise Needs",
  playfulness: "Playfulness",
};

function ScoreBar({ score, max = 5 }: { score: number | null; max?: number }) {
  if (score === null) return <span className="text-xs text-slate-gray/40">—</span>;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-5 rounded-sm ${i < score ? "bg-brand-start" : "bg-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-gray font-black">{score}/{max}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-black text-ebony uppercase tracking-tight mb-4 pb-3 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="text-sm text-slate-gray leading-7">
          {para}
        </p>
      ))}
    </div>
  );
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ animal: string; slug: string }>;
}) {
  const { animal, slug } = await params;
  const breed = getBreed(animal, slug);
  if (!breed) notFound();

  const animalLabel = ANIMAL_LABELS[animal] ?? animal;
  const content = generateBreedContent(breed);
  const today = new Date().toISOString().split("T")[0];

  // Related breeds: same group, different slug, has image, up to 4
  const related = (breedsByAnimal[animal] ?? [])
    .filter((b) => b.slug !== breed.slug && b.group === breed.group && b.image)
    .slice(0, 4);

  // JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://furrly.co" },
      { "@type": "ListItem", position: 2, name: "Breeds", item: "https://furrly.co/breeds" },
      { "@type": "ListItem", position: 3, name: animalLabel, item: `https://furrly.co/breeds/${animal}` },
      { "@type": "ListItem", position: 4, name: breed.name, item: `https://furrly.co/breeds/${animal}/${slug}` },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-white">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="bg-ebony pt-32 pb-16 relative overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest mb-8">
              <Link href="/breeds" className="hover:text-white/60 transition-colors">Breeds</Link>
              <span>/</span>
              <Link href={`/breeds/${animal}`} className="hover:text-white/60 transition-colors">{animalLabel}</Link>
              <span>/</span>
              <span className="text-white/60">{breed.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Image */}
              <div className="flex-none w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-white/10 relative shadow-2xl">
                {breed.image ? (
                  <Image
                    src={breed.image}
                    alt={`${breed.name} dog breed`}
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-7xl">
                    {animal === "dogs" ? "🐕" : "🐈"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.25em] mb-3">
                  {breed.group ?? animalLabel}
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
                  {breed.name}
                </h1>
                <p className="text-white/40 text-xs mb-6">
                  Reviewed by the Furrly editorial team · Updated {today}
                </p>
                <div className="flex flex-wrap gap-2">
                  {breed.size && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/10 text-white/70 rounded-full">
                      {breed.size}
                    </span>
                  )}
                  {breed.lifeSpan && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/10 text-white/70 rounded-full">
                      {breed.lifeSpan}
                    </span>
                  )}
                  {breed.weight && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/10 text-white/70 rounded-full">
                      {breed.weight}
                    </span>
                  )}
                  {breed.height && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/10 text-white/70 rounded-full">
                      {breed.height}
                    </span>
                  )}
                </div>
                {/* Compare CTA */}
                <div className="mt-6">
                  <Link
                    href={`/tools/breed-compare?a=${breed.slug}`}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl transition-colors"
                  >
                    🆚 Compare with another breed
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick stats bar ──────────────────────────────────────── */}
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Size", value: breed.size },
                { label: "Life Span", value: breed.lifeSpan },
                { label: "Weight", value: breed.weight },
                { label: "Height", value: breed.height },
              ].map(({ label, value }) =>
                value ? (
                  <div key={label}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-gray mb-1">{label}</p>
                    <p className="text-sm font-black text-ebony">{value}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: rich text content */}
            <div className="lg:col-span-2 space-y-0">

              <Section title={`What is a ${breed.name}?`}>
                <Prose text={content.overview} />
              </Section>

              <Section title="Temperament & Personality">
                <Prose text={content.temperament} />
              </Section>

              <Section title="Care, Grooming & Training">
                <Prose text={content.careGrooming} />
                {/* Internal tool links */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/tools/dog-calorie-calculator"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-3 py-2 rounded-full hover:bg-brand-start/5 transition-colors"
                  >
                    🍖 Calorie Calculator
                  </Link>
                  <Link
                    href="/tools/dog-water-intake-calculator"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-3 py-2 rounded-full hover:bg-brand-start/5 transition-colors"
                  >
                    💧 Water Intake Calculator
                  </Link>
                  <Link
                    href="/tools/dog-exercise-calculator"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-3 py-2 rounded-full hover:bg-brand-start/5 transition-colors"
                  >
                    🏃 Exercise Calculator
                  </Link>
                </div>
              </Section>

              <Section title="Health & Lifespan">
                <Prose text={content.healthLifespan} />
              </Section>

              <Section title={`Is a ${breed.name} Right for You?`}>
                <Prose text={content.suitability} />
              </Section>

              {/* FAQ */}
              <Section title="Frequently Asked Questions">
                <div className="space-y-4">
                  {content.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-gray-100 rounded-2xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-black text-sm text-ebony list-none select-none hover:bg-gray-50 transition-colors">
                        {faq.q}
                        <span className="flex-none text-slate-gray group-open:rotate-180 transition-transform text-xs ml-4">▼</span>
                      </summary>
                      <div className="px-5 pb-4 pt-1">
                        <p className="text-sm text-slate-gray leading-7">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right: scores sidebar */}
            <div className="space-y-6">
              {SCORE_SECTIONS.map((section) => (
                <div key={section.label} className="bg-gray-50 rounded-3xl p-6 sticky top-24">
                  <h3 className="text-xs font-black text-ebony uppercase tracking-widest mb-5 pb-3 border-b border-gray-200">
                    {section.label}
                  </h3>
                  <div className="space-y-3">
                    {section.keys.map((key) => (
                      <div key={key} className="flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-gray leading-snug">{SCORE_LABELS[key]}</span>
                        <ScoreBar score={breed.scores[key]} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Related breeds ─────────────────────────────────────── */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-ebony uppercase tracking-tight">
                  Related {animalLabel} Breeds
                </h2>
                <Link
                  href={`/tools/breed-compare?a=${breed.slug}`}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-4 py-2 rounded-full hover:bg-brand-start/5 transition-colors"
                >
                  🆚 Compare breeds
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/breeds/${animal}/${b.slug}`}
                    className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div className="relative w-full aspect-square bg-gray-100">
                      {b.image && (
                        <Image
                          src={b.image}
                          alt={b.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-black text-ebony group-hover:text-brand-start transition-colors leading-snug">
                        {b.name}
                      </p>
                      {b.size && (
                        <p className="text-[9px] text-slate-gray uppercase tracking-widest mt-0.5">{b.size}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-ebony">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Own a {breed.name}?
            </h2>
            <p className="text-white/50 mb-8 leading-7">
              Track health records, set care reminders, and connect with other {breed.name} owners in Furrly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-brand-start text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity text-sm"
              >
                Free Pet Tools →
              </Link>
              <Link
                href={`/breeds/${animal}`}
                className="inline-flex items-center gap-2 bg-white/10 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors text-sm"
              >
                Browse All {animalLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
