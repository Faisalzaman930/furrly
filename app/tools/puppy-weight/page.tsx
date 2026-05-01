"use client";

import { useState, useMemo } from "react";
import { Metadata } from "next";
import ToolLayout from "../../components/ToolLayout";

// Growth % of adult weight at each age (weeks) by size category
const GROWTH_TABLES: Record<string, { week: number; pct: number }[]> = {
  toy: [
    { week: 6, pct: 60 }, { week: 8, pct: 75 }, { week: 10, pct: 84 },
    { week: 12, pct: 90 }, { week: 16, pct: 96 }, { week: 20, pct: 99 }, { week: 24, pct: 100 },
  ],
  small: [
    { week: 6, pct: 52 }, { week: 8, pct: 65 }, { week: 10, pct: 74 },
    { week: 12, pct: 80 }, { week: 16, pct: 88 }, { week: 20, pct: 94 },
    { week: 24, pct: 98 }, { week: 28, pct: 100 },
  ],
  medium: [
    { week: 6, pct: 40 }, { week: 8, pct: 52 }, { week: 10, pct: 60 },
    { week: 12, pct: 66 }, { week: 16, pct: 76 }, { week: 20, pct: 83 },
    { week: 24, pct: 89 }, { week: 28, pct: 94 }, { week: 32, pct: 98 }, { week: 36, pct: 100 },
  ],
  large: [
    { week: 8, pct: 36 }, { week: 10, pct: 43 }, { week: 12, pct: 50 },
    { week: 16, pct: 60 }, { week: 20, pct: 69 }, { week: 24, pct: 77 },
    { week: 28, pct: 84 }, { week: 32, pct: 90 }, { week: 40, pct: 97 }, { week: 52, pct: 100 },
  ],
  giant: [
    { week: 8, pct: 25 }, { week: 12, pct: 35 }, { week: 16, pct: 45 },
    { week: 20, pct: 55 }, { week: 24, pct: 64 }, { week: 32, pct: 75 },
    { week: 40, pct: 85 }, { week: 52, pct: 93 }, { week: 65, pct: 100 },
  ],
};

const SIZE_CONFIG = {
  toy:    { label: "Toy",    adult: "Under 4.5 kg (10 lbs)",   examples: "Chihuahua, Pomeranian, Yorkie",    color: "bg-pink-100 text-pink-800" },
  small:  { label: "Small",  adult: "4.5–11 kg (10–25 lbs)",  examples: "Beagle, Shih Tzu, Dachshund",      color: "bg-orange-100 text-orange-800" },
  medium: { label: "Medium", adult: "11–23 kg (25–50 lbs)",   examples: "Border Collie, Cocker Spaniel",     color: "bg-blue-100 text-blue-800" },
  large:  { label: "Large",  adult: "23–45 kg (50–100 lbs)",  examples: "Labrador, Golden Retriever, GSD",   color: "bg-emerald-100 text-emerald-800" },
  giant:  { label: "Giant",  adult: "Over 45 kg (100 lbs+)",  examples: "Great Dane, Mastiff, Newfoundland", color: "bg-purple-100 text-purple-800" },
};

function interpolateGrowthPct(sizeKey: string, ageWeeks: number): number {
  const table = GROWTH_TABLES[sizeKey];
  if (ageWeeks <= table[0].week) return table[0].pct;
  if (ageWeeks >= table[table.length - 1].week) return 100;
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i], b = table[i + 1];
    if (ageWeeks >= a.week && ageWeeks <= b.week) {
      const t = (ageWeeks - a.week) / (b.week - a.week);
      return a.pct + t * (b.pct - a.pct);
    }
  }
  return 100;
}

export default function PuppyGrowthPredictor() {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [size, setSize] = useState<keyof typeof SIZE_CONFIG>("medium");
  const [ageWeeks, setAgeWeeks] = useState(8);
  const [weight, setWeight] = useState(3);

  const result = useMemo(() => {
    const wKg = unit === "lbs" ? weight * 0.453592 : weight;
    const pct = interpolateGrowthPct(size, ageWeeks);
    const adultKg = pct > 0 ? wKg / (pct / 100) : 0;
    const adultLbs = adultKg * 2.20462;

    // Milestone weights
    const table = GROWTH_TABLES[size];
    const milestones = table.map(row => ({
      week: row.week,
      kg: adultKg * (row.pct / 100),
      lbs: adultKg * 2.20462 * (row.pct / 100),
    }));

    return { adultKg, adultLbs, milestones, pct };
  }, [unit, size, ageWeeks, weight]);

  const confidenceLabel =
    ageWeeks < 6  ? "Low — too young for accuracy" :
    ageWeeks < 10 ? "Moderate" : "Good";

  return (
    <ToolLayout
      subtitle="Puppy Growth Predictor"
      relatedToolSlugs={["exercise-calculator","calorie-calculator","whelping-calculator","vaccine-tracker"]}
      relatedArticles={[
        { slug: "complete-guide-to-puppy-care", title: "Complete Guide to Puppy Care", category: "Pillar Guide", emoji: "🐶" },
        { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
        { slug: "how-to-crate-train-a-puppy", title: "How to Crate Train a Puppy", category: "How-To", emoji: "🏡" },
      ]}
      title="How Big Will My Puppy Get?"
      description="Enter your puppy's current age and weight to predict their adult size and track growth milestones."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Inputs */}
        <div className="space-y-10">
          {/* Unit */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Units</label>
            <div className="flex gap-3">
              {(["kg", "lbs"] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`flex-1 py-3 rounded-2xl font-black uppercase tracking-wide text-sm border-2 transition-all ${unit === u ? "bg-ebony text-white border-ebony" : "bg-gray-50 text-slate-gray border-transparent hover:bg-gray-100"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Breed size */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Breed Size</label>
            <div className="space-y-2">
              {(Object.entries(SIZE_CONFIG) as [keyof typeof SIZE_CONFIG, typeof SIZE_CONFIG[keyof typeof SIZE_CONFIG]][]).map(([key, cfg]) => (
                <button key={key} onClick={() => setSize(key)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${size === key ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-black text-ebony text-sm">{cfg.label}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.adult}</span>
                    </div>
                    <p className="text-xs text-slate-gray">{cfg.examples}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-none transition-all ${size === key ? "border-ebony bg-ebony" : "border-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-2">
              Current Age: <span className="text-brand-start">{ageWeeks} weeks</span>
            </label>
            <input type="range" min="4" max="52" step="1" value={ageWeeks}
              onChange={e => setAgeWeeks(+e.target.value)}
              className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start" />
            <div className="flex justify-between text-[10px] font-bold text-slate-gray mt-2 uppercase tracking-tighter">
              <span>4 wks</span><span>52 wks</span>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-2">
              Current Weight: <span className="text-brand-start">{weight} {unit}</span>
            </label>
            <input type="range" min="0.5" max={unit === "kg" ? 40 : 88} step="0.5" value={weight}
              onChange={e => setWeight(+e.target.value)}
              className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start" />
            <div className="flex justify-between text-[10px] font-bold text-slate-gray mt-2 uppercase tracking-tighter">
              <span>0.5</span><span>{unit === "kg" ? "40 kg" : "88 lbs"}</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-ebony rounded-[2rem] p-8 text-center">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-2">Estimated Adult Weight</p>
            <p className="text-6xl font-black text-white leading-none mb-1">
              {result.adultKg.toFixed(1)}
              <span className="text-2xl ml-2 text-white/60">kg</span>
            </p>
            <p className="text-white/50 text-sm">{result.adultLbs.toFixed(1)} lbs</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Confidence:</span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{confidenceLabel}</span>
            </div>
          </div>

          <div className="bg-brand-start/5 border border-brand-start/20 rounded-2xl p-5">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">Currently at</p>
            <p className="text-2xl font-black text-ebony">{result.pct.toFixed(0)}% of adult weight</p>
            <div className="mt-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-gradient rounded-full transition-all duration-500" style={{ width: `${Math.min(result.pct, 100)}%` }} />
            </div>
          </div>

          {/* Growth milestones */}
          <div>
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3">Growth Milestones</p>
            <div className="space-y-2">
              {result.milestones.map(m => (
                <div key={m.week} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${m.week === ageWeeks ? "bg-brand-start/10 border border-brand-start/30" : "bg-gray-50"}`}>
                  <span className={`text-xs font-bold ${m.week === ageWeeks ? "text-brand-start" : "text-slate-gray"}`}>Week {m.week}</span>
                  <span className="font-black text-ebony text-sm">
                    {unit === "kg" ? `${m.kg.toFixed(1)} kg` : `${m.lbs.toFixed(1)} lbs`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-gray/60 leading-relaxed">
            Estimates are based on published breed-size growth curves. Individual dogs may vary by ±15–20%. Consult your vet for precise tracking.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
