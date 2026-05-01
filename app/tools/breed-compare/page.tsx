"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ToolLayout from "../../components/ToolLayout";
import { dogs } from "../../data/breeds/dogs";
import { cats } from "../../data/breeds/cats";
import type { BreedDoc, CatBreedDoc, BreedScores } from "../../data/breeds/types";

const ALL_BREEDS = [...dogs, ...cats];

const SCORE_GROUPS: { label: string; emoji: string; keys: (keyof BreedScores)[] }[] = [
  {
    label: "Adaptability",
    emoji: "🏠",
    keys: ["adaptability", "apartmentFriendly", "goodForNovice", "sensitivity", "toleratesAlone", "toleratesCold", "toleratesHot"],
  },
  {
    label: "Friendliness",
    emoji: "❤️",
    keys: ["friendliness", "affectionate", "kidFriendly", "dogFriendly", "strangerFriendly"],
  },
  {
    label: "Health & Grooming",
    emoji: "✂️",
    keys: ["shedding", "drooling", "easyToGroom", "health", "weightGain"],
  },
  {
    label: "Trainability",
    emoji: "🎓",
    keys: ["trainability", "easyToTrain", "intelligence", "mouthiness", "preyDrive", "barkiness", "wanderlust"],
  },
  {
    label: "Physical Needs",
    emoji: "🏃",
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

function BreedSearch({
  value,
  onChange,
  placeholder,
  exclude,
}: {
  value: BreedDoc | CatBreedDoc | null;
  onChange: (b: BreedDoc | CatBreedDoc | null) => void;
  placeholder: string;
  exclude: string | null;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query) return ALL_BREEDS.slice(0, 8);
    const q = query.toLowerCase();
    return ALL_BREEDS.filter(
      (b) => b.slug !== exclude && b.name.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, exclude]);

  return (
    <div className="relative">
      {value ? (
        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border-2 border-brand-start/30">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex-none">
            {value.image ? (
              <Image src={value.image} alt={value.name} fill className="object-cover" sizes="56px" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🐕</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-ebony text-sm">{value.name}</p>
            <p className="text-[10px] text-slate-gray uppercase tracking-widest mt-0.5">
              {(value as BreedDoc).size ?? (value as CatBreedDoc).origin} · {(value as BreedDoc).group ?? value.animal}
            </p>
          </div>
          <button
            onClick={() => { onChange(null); setQuery(""); }}
            className="flex-none text-slate-gray hover:text-ebony text-lg transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder={placeholder}
            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-brand-start rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all placeholder:text-slate-gray/50 text-ebony"
          />
          {open && results.length > 0 && (
            <div className="absolute z-20 left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto">
              {results.map((b) => (
                <button
                  key={b.slug}
                  onMouseDown={() => { onChange(b); setQuery(""); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-none">
                    {b.image ? (
                      <Image src={b.image} alt={b.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-lg">🐕</div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-ebony">{b.name}</p>
                    <p className="text-[10px] text-slate-gray uppercase tracking-widest">
                      {(b as BreedDoc).size ?? (b as CatBreedDoc).origin} · {(b as BreedDoc).group ?? b.animal}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreRow({ label, a, b }: { label: string; a: number | null; b: number | null }) {
  const aVal = a ?? 0;
  const bVal = b ?? 0;
  const winner = aVal > bVal ? "a" : bVal > aVal ? "b" : "tie";

  return (
    <div className="grid grid-cols-[1fr_160px_1fr] items-center gap-2 py-2.5 border-b border-gray-50 last:border-0">
      {/* A score */}
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs text-slate-gray font-black">{a ?? "—"}/5</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-4 rounded-sm transition-colors ${i < aVal ? (winner === "a" ? "bg-brand-start" : "bg-ebony") : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>
      {/* Label */}
      <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest text-center leading-tight">
        {label}
      </p>
      {/* B score */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-4 rounded-sm transition-colors ${i < bVal ? (winner === "b" ? "bg-brand-start" : "bg-ebony") : "bg-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-gray font-black">{b ?? "—"}/5</span>
      </div>
    </div>
  );
}

function CompareInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [breedA, setBreedA] = useState<BreedDoc | CatBreedDoc | null>(null);
  const [breedB, setBreedB] = useState<BreedDoc | CatBreedDoc | null>(null);

  // Load from URL params
  useEffect(() => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    if (a) setBreedA(ALL_BREEDS.find((br) => br.slug === a) ?? null);
    if (b) setBreedB(ALL_BREEDS.find((br) => br.slug === b) ?? null);
  }, [searchParams]);

  // Sync to URL
  const syncUrl = useCallback((a: BreedDoc | CatBreedDoc | null, b: BreedDoc | CatBreedDoc | null) => {
    const params = new URLSearchParams();
    if (a) params.set("a", a.slug);
    if (b) params.set("b", b.slug);
    router.replace(`/tools/breed-compare?${params.toString()}`, { scroll: false });
  }, [router]);

  const handleA = (b: BreedDoc | CatBreedDoc | null) => { setBreedA(b); syncUrl(b, breedB); };
  const handleB = (b: BreedDoc | CatBreedDoc | null) => { setBreedB(b); syncUrl(breedA, b); };

  // Summary scores
  const summaryA = useMemo(() => {
    if (!breedA) return null;
    const vals = Object.values(breedA.scores).filter((v): v is number => v !== null);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10;
  }, [breedA]);

  const summaryB = useMemo(() => {
    if (!breedB) return null;
    const vals = Object.values(breedB.scores).filter((v): v is number => v !== null);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10;
  }, [breedB]);

  return (
    <ToolLayout
      title="Breed Comparison"
      subtitle="Side-by-Side Analysis"
      relatedToolSlugs={["best-dog-quiz","best-cat-quiz","exercise-calculator","calorie-calculator"]}
      relatedArticles={[
        { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
        { slug: "introducing-pets-to-each-other", title: "Introducing Dogs & Cats to Each Other", category: "Expert Guide", emoji: "🐾" },
      ]}
      description="Search and compare any two dog breeds across 28 attributes — temperament, grooming, health, trainability, and more."
      illustration={<span className="text-6xl">🆚</span>}
    >
      <div className="max-w-4xl mx-auto">

        {/* Breed selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div>
            <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-2">Breed A</p>
            <BreedSearch value={breedA} onChange={handleA} placeholder="Search breeds…" exclude={breedB?.slug ?? null} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-2">Breed B</p>
            <BreedSearch value={breedB} onChange={handleB} placeholder="Search breeds…" exclude={breedA?.slug ?? null} />
          </div>
        </div>

        {breedA && breedB ? (
          <div className="space-y-6">

            {/* Header cards */}
            <div className="grid grid-cols-2 gap-4">
              {[{ breed: breedA, score: summaryA, color: "bg-ebony" }, { breed: breedB, score: summaryB, color: "bg-brand-start" }].map(({ breed, score, color }) => (
                <div key={breed.slug} className={`${color} rounded-3xl p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/10 flex-none">
                      {breed.image ? (
                        <Image src={breed.image} alt={breed.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">{breed.animal === "cats" ? "🐈" : "🐕"}</div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight">{breed.name}</p>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest mt-1">
                        {(breed as BreedDoc).group ?? (breed as CatBreedDoc).origin ?? breed.animal}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    {[
                      { l: "Size", v: (breed as BreedDoc).size ?? (breed as CatBreedDoc).origin },
                      { l: "Life Span", v: breed.lifeSpan },
                      { l: "Weight", v: breed.weight },
                      { l: "Avg Score", v: score ? `${score}/5` : "—" },
                    ].map(({ l, v }) => v ? (
                      <div key={l}>
                        <p className="text-white/40 uppercase tracking-widest font-black">{l}</p>
                        <p className="text-white font-black mt-0.5">{v}</p>
                      </div>
                    ) : null)}
                  </div>
                  <Link
                    href={`/breeds/${breed.animal}/${breed.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    Full Profile →
                  </Link>
                </div>
              ))}
            </div>

            {/* Score groups — use shared keys only */}
            {(() => {
              const aScores = breedA.scores as unknown as Record<string, number | null>;
              const bScores = breedB.scores as unknown as Record<string, number | null>;
              const sharedKeys = Object.keys(aScores).filter(k => k in bScores);
              const allLabels: Record<string, string> = { ...SCORE_LABELS,
                affectionLevel:"Affection Level", childFriendly:"Child Friendly", energyLevel:"Energy Level",
                grooming:"Grooming Needs", healthIssues:"Health Issues", sheddingLevel:"Shedding Level",
                socialNeeds:"Social Needs", strangerFriendly:"Stranger Friendly", vocalisation:"Vocalisation",
                dogFriendly:"Dog Friendly",
              };
              if (sharedKeys.length === 0) return (
                <div className="bg-gray-50 rounded-3xl p-6 text-center text-slate-gray text-sm">
                  These breeds have different trait categories — compare two dogs or two cats for a full score breakdown.
                </div>
              );
              return (
                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-xl">📊</span>
                    <h3 className="text-sm font-black text-ebony uppercase tracking-tight">Shared Traits</h3>
                  </div>
                  <div className="space-y-0">
                    {sharedKeys.map((key) => (
                      <ScoreRow key={key} label={allLabels[key] ?? key} a={aScores[key]} b={bScores[key]} />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Share */}
            <div className="bg-ebony rounded-3xl p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-black text-sm">Share this comparison</p>
                <p className="text-white/40 text-xs mt-1">The URL updates automatically — just copy and share.</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex-none text-[10px] font-black uppercase tracking-widest px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10"
              >
                📋 Copy Link
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 text-slate-gray">
            <p className="text-7xl mb-6">🆚</p>
            <p className="font-black text-2xl text-ebony uppercase tracking-tight mb-3">
              Select two breeds to compare
            </p>
            <p className="text-sm text-slate-gray max-w-sm mx-auto leading-6">
              Search from {ALL_BREEDS.length} breeds. Compare temperament, grooming, health, energy, and 24 more attributes side by side.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

export default function BreedComparePage() {
  return (
    <Suspense>
      <CompareInner />
    </Suspense>
  );
}
