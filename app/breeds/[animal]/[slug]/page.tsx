import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { breedsByAnimal, getBreed, ANIMAL_LABELS } from "../../../data/breeds";
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
  return {
    title: `${breed.name} ${animalLabel.slice(0,-1)} Breed — Size, Temperament & Care | Furrly`,
    description: `${breed.name} breed guide: size ${breed.size ?? ""}, lifespan ${breed.lifeSpan ?? ""}, temperament scores, grooming needs, and more.`,
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

export default async function BreedPage({
  params,
}: {
  params: Promise<{ animal: string; slug: string }>;
}) {
  const { animal, slug } = await params;
  const breed = getBreed(animal, slug);
  if (!breed) notFound();

  const animalLabel = ANIMAL_LABELS[animal] ?? animal;

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-ebony pt-32 pb-16 relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href={`/breeds/${animal}`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-black uppercase tracking-widest mb-8 transition-colors"
          >
            ← All {animalLabel}
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Image */}
            <div className="flex-none w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-white/10 relative shadow-2xl">
              {breed.image ? (
                <Image
                  src={breed.image}
                  alt={breed.name}
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
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                {breed.name}
              </h1>
              <div className="flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
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

      {/* Score sections */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SCORE_SECTIONS.map((section) => (
            <div key={section.label} className="bg-gray-50 rounded-3xl p-7">
              <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-6 pb-4 border-b border-gray-200">
                {section.label}
              </h2>
              <div className="space-y-4">
                {section.keys.map((key) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-gray flex-1">{SCORE_LABELS[key]}</span>
                    <ScoreBar score={breed.scores[key]} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-ebony">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Own a {breed.name}?
          </h2>
          <p className="text-white/50 mb-8">
            Track health records, set care reminders, and connect with other {breed.name} owners in Furrly.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-brand-start text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity text-sm"
          >
            Free Pet Tools →
          </Link>
        </div>
      </section>
    </div>
  );
}
