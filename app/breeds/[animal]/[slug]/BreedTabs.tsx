"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BreedDoc, CatBreedDoc, BreedScores, CatScores, AnyBreed } from "../../../data/breeds";
import type { BreedContent } from "../../../data/breeds/content";

interface Props {
  breed: AnyBreed;
  content: BreedContent | null;
  catFaqs: { q: string; a: string }[];
  dogScoreGroups: { label: string; emoji: string; color: string; keys: (keyof BreedScores)[] }[];
  dogScoreLabels: Record<keyof BreedScores, string>;
  catScoreLabels: Record<keyof CatScores, string>;
  animal: string;
  related: AnyBreed[];
  animalLabel: string;
}

function ScoreBar({ score, color = "bg-brand-start" }: { score: number | null; color?: string }) {
  if (score === null) return <span className="text-xs text-slate-gray/30">—</span>;
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-black text-slate-gray w-6 text-right">{score}/5</span>
    </div>
  );
}

function ScoreCard({ label, score, emoji }: { label: string; score: number | null; emoji: string }) {
  const val = score ?? 0;
  const pct = Math.round((val / 5) * 100);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      {/* Circular progress */}
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="#f3f4f6" strokeWidth="5" />
          <circle
            cx="28" cy="28" r="22" fill="none" stroke="#E11D48" strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - pct / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-ebony">
          {score ?? "—"}
        </span>
      </div>
      <p className="text-[10px] font-black text-slate-gray uppercase tracking-wider text-center leading-tight">
        {label}
      </p>
    </div>
  );
}

const TABS = [
  { id: "overview", label: "Overview", emoji: "📋" },
  { id: "traits", label: "Traits", emoji: "📊" },
  { id: "care", label: "Care", emoji: "✂️" },
  { id: "faq", label: "FAQ", emoji: "❓" },
];

export default function BreedTabs({
  breed, content, catFaqs, dogScoreGroups, dogScoreLabels, catScoreLabels,
  animal, related, animalLabel,
}: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const isCat = breed.animal === "cats";
  const cat = isCat ? (breed as CatBreedDoc) : null;
  const dog = !isCat ? (breed as BreedDoc) : null;
  const faqs = content?.faqs ?? catFaqs ?? [];

  // Top-level scores for score cards
  const topScores = isCat && cat ? [
    { label: "Adaptability", score: cat.scores.adaptability, emoji: "🏠" },
    { label: "Affection", score: cat.scores.affectionLevel, emoji: "❤️" },
    { label: "Energy", score: cat.scores.energyLevel, emoji: "⚡" },
    { label: "Intelligence", score: cat.scores.intelligence, emoji: "🧠" },
    { label: "Grooming", score: cat.scores.grooming, emoji: "✂️" },
    { label: "Social Needs", score: cat.scores.socialNeeds, emoji: "👥" },
  ] : dog ? [
    { label: "Adaptability", score: dog.scores.adaptability, emoji: "🏠" },
    { label: "Friendliness", score: dog.scores.friendliness, emoji: "❤️" },
    { label: "Trainability", score: dog.scores.trainability, emoji: "🎓" },
    { label: "Energy", score: dog.scores.energy, emoji: "⚡" },
    { label: "Health", score: dog.scores.health, emoji: "💊" },
    { label: "Intelligence", score: dog.scores.intelligence, emoji: "🧠" },
  ] : [];

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">

      {/* Top score cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
        {topScores.map((s) => (
          <ScoreCard key={s.label} label={s.label} score={s.score} emoji={s.emoji} />
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-8 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "bg-white text-ebony shadow-sm"
                : "text-slate-gray hover:text-ebony"
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Overview ─────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {content && (
              <>
                <div className="bg-gray-50 rounded-3xl p-6">
                  <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">About the {breed.name}</h2>
                  {content.overview.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i} className="text-sm text-slate-gray leading-7 mb-3 last:mb-0">{p}</p>
                  ))}
                  {isCat && cat?.temperament && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.temperament.split(", ").map((t) => (
                        <span key={t} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-start/10 text-brand-start rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-3xl p-6">
                  <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">Temperament</h2>
                  {content.temperament.split("\n\n").map((p, i) => (
                    <p key={i} className="text-sm text-slate-gray leading-7 mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="space-y-6">
            {content && (
              <>
                <div className="bg-gray-50 rounded-3xl p-6">
                  <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">Health & Lifespan</h2>
                  {content.healthLifespan.split("\n\n").map((p, i) => (
                    <p key={i} className="text-sm text-slate-gray leading-7 mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-3xl p-6">
                  <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">Is this breed right for you?</h2>
                  {content.suitability.split("\n\n").map((p, i) => (
                    <p key={i} className="text-sm text-slate-gray leading-7 mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
              </>
            )}

            {/* Internal tool links */}
            <div className="bg-ebony rounded-3xl p-6">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Helpful Tools</p>
              <div className="space-y-2">
                {[
                  { href: "/tools/breed-compare", label: "🆚 Compare with another breed" },
                  { href: "/tools/calorie-calculator", label: "🔥 Calorie Calculator" },
                  { href: "/tools/water-calculator", label: "💧 Water Intake Calculator" },
                  ...(!isCat ? [
                    { href: "/tools/exercise-calculator", label: "🏃 Exercise Calculator" },
                    { href: "/tools/puppy-weight", label: "⚖️ Puppy Weight Predictor" },
                  ] : []),
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-3 text-white text-xs font-black transition-colors group">
                    {label}
                    <span className="text-white/30 group-hover:text-white transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related care guides */}
            <div className="bg-gray-50 rounded-3xl p-6">
              <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Care Guides</p>
              <div className="space-y-2">
                {[
                  ...(!isCat ? [
                    { href: "/resources/complete-guide-to-puppy-care", label: "Complete Guide to Puppy Care", emoji: "🐶" },
                    { href: "/resources/complete-guide-to-dog-training", label: "Complete Guide to Dog Training", emoji: "🎓" },
                    { href: "/resources/complete-guide-to-pet-health", label: "Complete Guide to Pet Health", emoji: "❤️" },
                    { href: "/resources/complete-guide-to-pet-nutrition", label: "Complete Guide to Pet Nutrition", emoji: "🥗" },
                  ] : [
                    { href: "/resources/complete-guide-to-pet-health", label: "Complete Guide to Pet Health", emoji: "❤️" },
                    { href: "/resources/complete-guide-to-pet-nutrition", label: "Complete Guide to Pet Nutrition", emoji: "🥗" },
                    { href: "/resources/senior-pet-care-guide", label: "Senior Pet Care Guide", emoji: "👴" },
                  ]),
                ].map(({ href, label, emoji }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-ebony hover:bg-white hover:shadow-sm transition-all group border border-transparent hover:border-gray-100">
                    <span className="text-base">{emoji}</span>
                    <span className="font-bold group-hover:text-brand-start transition-colors leading-snug">{label}</span>
                    <span className="ml-auto text-slate-gray/40 group-hover:text-brand-start transition-colors text-xs">→</span>
                  </Link>
                ))}
                <Link href="/resources"
                  className="flex items-center justify-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-brand-start hover:opacity-80 transition-opacity pt-1">
                  All Resources →
                </Link>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-gray-50 rounded-3xl p-6">
              <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Free Documents</p>
              <div className="space-y-2">
                {[
                  { href: "/templates/pet-medical-history-template", label: "Pet Medical History", emoji: "🏥" },
                  { href: "/templates/pet-vaccination-record-template", label: "Vaccination Record", emoji: "💉" },
                  { href: "/templates/pet-sitting-contract-template-free", label: "Pet Sitting Contract", emoji: "🐾" },
                  { href: "/templates/pet-adoption-contract-template", label: "Adoption Contract", emoji: "💛" },
                ].map(({ href, label, emoji }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-ebony hover:bg-white hover:shadow-sm transition-all group border border-transparent hover:border-gray-100">
                    <span className="text-base">{emoji}</span>
                    <span className="font-bold group-hover:text-brand-start transition-colors leading-snug">{label}</span>
                    <span className="ml-auto text-slate-gray/40 group-hover:text-brand-start transition-colors text-xs">→</span>
                  </Link>
                ))}
                <Link href="/templates"
                  className="flex items-center justify-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-brand-start hover:opacity-80 transition-opacity pt-1">
                  All Templates →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Traits ───────────────────────────────────────────── */}
      {activeTab === "traits" && (
        <div className="space-y-6">
          {isCat && cat ? (
            <div className="bg-gray-50 rounded-3xl p-6">
              <div className="space-y-4">
                {(Object.entries(catScoreLabels) as [keyof CatScores, string][]).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-4">
                    <span className="text-xs text-slate-gray w-40 shrink-0">{label}</span>
                    <ScoreBar score={cat.scores[key]} />
                  </div>
                ))}
              </div>
            </div>
          ) : dog ? (
            dogScoreGroups.map((group) => (
              <div key={group.label} className="bg-gray-50 rounded-3xl p-6">
                <div className={`flex items-center gap-3 mb-5 pb-4 border-b border-gray-200`}>
                  <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-sm`}>
                    {group.emoji}
                  </span>
                  <h3 className="text-sm font-black text-ebony uppercase tracking-widest">{group.label}</h3>
                </div>
                <div className="space-y-4">
                  {group.keys.map((key) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-xs text-slate-gray w-48 shrink-0">{dogScoreLabels[key]}</span>
                      <ScoreBar score={dog.scores[key]} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : null}
        </div>
      )}

      {/* ── Tab: Care ─────────────────────────────────────────────── */}
      {activeTab === "care" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-6">
            <h2 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">Care, Grooming & Training</h2>
            {content ? content.careGrooming.split("\n\n").map((p, i) => (
              <p key={i} className="text-sm text-slate-gray leading-7 mb-3 last:mb-0">{p}</p>
            )) : null}
          </div>
          <div className="space-y-4">
            {[
              { href: "/tools/calorie-calculator", emoji: "🍖", label: "Calorie Calculator", desc: isCat ? "Daily calorie needs for your cat" : "Find your dog's daily calorie needs" },
              { href: "/tools/water-calculator", emoji: "💧", label: "Water Intake", desc: isCat ? "How much water does your cat need?" : "How much water does your dog need?" },
              ...(!isCat ? [
                { href: "/tools/exercise-calculator", emoji: "🏃", label: "Exercise Guide", desc: "Daily exercise requirements by breed" },
                { href: "/tools/puppy-weight", emoji: "⚖️", label: "Puppy Weight Predictor", desc: "Estimate adult weight from puppy weight" },
              ] : []),
            ].map(({ href, emoji, label, desc }) => (
              <Link key={href} href={href}
                className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-colors group border border-gray-100">
                <span className="text-2xl">{emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-black text-ebony group-hover:text-brand-start transition-colors">{label}</p>
                  <p className="text-xs text-slate-gray">{desc}</p>
                </div>
                <span className="text-slate-gray group-hover:text-brand-start transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: FAQ ──────────────────────────────────────────────── */}
      {activeTab === "faq" && (
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-100 rounded-2xl overflow-hidden">
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
      )}

      {/* ── Related breeds ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-ebony uppercase tracking-tight">Related {animalLabel}</h2>
            <Link href={`/tools/breed-compare?a=${breed.slug}`}
              className="text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-4 py-2 rounded-full hover:bg-brand-start/5 transition-colors">
              🆚 Compare breeds
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((b) => (
              <Link key={b.slug} href={`/breeds/${animal}/${b.slug}`}
                className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="relative w-full aspect-square bg-gray-100">
                  {b.image && (
                    <Image src={b.image} alt={b.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-black text-ebony group-hover:text-brand-start transition-colors">{b.name}</p>
                  <p className="text-[9px] text-slate-gray uppercase tracking-widest mt-0.5">
                    {(b as BreedDoc).size ?? (b as CatBreedDoc).origin ?? ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
