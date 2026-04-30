"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";

// DER multipliers — based on WSAVA/AAHA nutritional guidelines
const DOG_FACTORS = [
  { id: "puppy-young",    label: "Puppy under 4 months",        factor: 3.0  },
  { id: "puppy-old",      label: "Puppy 4 months – 1 year",     factor: 2.0  },
  { id: "neutered",       label: "Neutered adult",               factor: 1.6  },
  { id: "intact",         label: "Intact adult",                 factor: 1.8  },
  { id: "inactive",       label: "Inactive / weight-prone adult",factor: 1.2  },
  { id: "active",         label: "Active / working adult",       factor: 2.5  },
  { id: "senior",         label: "Senior (7+ years)",            factor: 1.4  },
  { id: "weight-loss",    label: "Weight loss programme",        factor: 1.0  },
  { id: "pregnant",       label: "Pregnant (last 3 weeks)",      factor: 3.0  },
  { id: "lactating",      label: "Lactating",                    factor: 4.0  },
];

const CAT_FACTORS = [
  { id: "kitten",         label: "Kitten under 1 year",          factor: 2.5  },
  { id: "neutered",       label: "Neutered adult",               factor: 1.2  },
  { id: "intact",         label: "Intact adult",                 factor: 1.4  },
  { id: "inactive",       label: "Inactive / indoor",            factor: 1.0  },
  { id: "active",         label: "Active / outdoor",             factor: 1.6  },
  { id: "senior",         label: "Senior (11+ years)",           factor: 1.1  },
  { id: "weight-loss",    label: "Weight loss",                  factor: 0.8  },
  { id: "pregnant",       label: "Pregnant",                     factor: 2.0  },
  { id: "lactating",      label: "Lactating",                    factor: 3.0  },
];

// Common dry kibble caloric densities (kcal/cup) for reference
const KIBBLE_DENSITIES = [
  { brand: "Average dry kibble",  kcalPerCup: 350 },
  { brand: "High-protein kibble", kcalPerCup: 425 },
  { brand: "Diet / light kibble", kcalPerCup: 280 },
  { brand: "Wet food (per 100g)", kcalPerCup: 90  },
];

export default function PetCalorieCalculator() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState(10);
  const [factorId, setFactorId] = useState("neutered");

  const factors = species === "dog" ? DOG_FACTORS : CAT_FACTORS;

  const result = useMemo(() => {
    const wKg = unit === "lbs" ? weight * 0.453592 : weight;
    // RER = 70 × BW(kg)^0.75  (Kleiber's law)
    const rer = 70 * Math.pow(wKg, 0.75);
    const factor = factors.find(f => f.id === factorId)?.factor ?? 1.6;
    const der = rer * factor;
    return { rer, der, wKg, factor };
  }, [species, unit, weight, factorId, factors]);

  return (
    <ToolLayout
      subtitle="Pet Calorie Calculator"
      title="Daily Calorie Needs for Your Pet"
      description="Calculate your dog or cat's precise daily caloric requirement using the RER (Resting Energy Requirement) formula used by veterinary nutritionists."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Inputs */}
        <div className="space-y-10">
          {/* Species */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Pet Species</label>
            <div className="flex gap-4">
              {(["dog", "cat"] as const).map(s => (
                <button key={s} onClick={() => { setSpecies(s); setFactorId("neutered"); }}
                  className={`flex-1 py-5 rounded-3xl border-4 transition-all flex flex-col items-center gap-2 ${species === s ? "bg-ebony text-white border-ebony shadow-xl" : "bg-gray-50 text-slate-gray border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md"}`}>
                  <span className="text-4xl">{s === "dog" ? "🐕" : "🐈"}</span>
                  <span className="font-black uppercase tracking-tight text-xs">{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Unit + Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-ebony uppercase tracking-widest">
                Weight: <span className="text-brand-start">{weight} {unit}</span>
              </label>
              <div className="flex gap-2">
                {(["kg", "lbs"] as const).map(u => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${unit === u ? "bg-ebony text-white border-ebony" : "border-gray-200 text-slate-gray hover:border-gray-300"}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <input type="range" min="0.5" max={unit === "kg" ? 60 : 132} step="0.5" value={weight}
              onChange={e => setWeight(+e.target.value)}
              className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start" />
            <div className="flex justify-between text-[10px] font-bold text-slate-gray mt-2 uppercase tracking-tighter">
              <span>0.5</span><span>{unit === "kg" ? "60 kg" : "132 lbs"}</span>
            </div>
          </div>

          {/* Life stage / status */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Life Stage & Status</label>
            <div className="space-y-2">
              {factors.map(f => (
                <button key={f.id} onClick={() => setFactorId(f.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-all ${factorId === f.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className={`text-sm font-bold ${factorId === f.id ? "text-ebony" : "text-slate-gray"}`}>{f.label}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${factorId === f.id ? "bg-ebony text-white" : "bg-gray-200 text-slate-gray"}`}>
                    ×{f.factor}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Main result */}
          <div className="bg-ebony rounded-[2rem] p-8 text-center">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-2">Daily Calorie Target</p>
            <p className="text-7xl font-black text-white leading-none">
              {Math.round(result.der)}
            </p>
            <p className="text-white/50 text-sm mt-1">kcal / day</p>
          </div>

          {/* RER breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest">How It&apos;s Calculated</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-gray">Resting Energy Req (RER)</span>
                <span className="font-black text-ebony">{Math.round(result.rer)} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">Multiplier</span>
                <span className="font-black text-ebony">× {result.factor}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-black">
                <span className="text-ebony">Daily requirement</span>
                <span className="text-brand-start">{Math.round(result.der)} kcal</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-gray/70 leading-relaxed">
              RER = 70 × weight(kg)<sup>0.75</sup> — the standard formula from WSAVA nutritional guidelines.
            </p>
          </div>

          {/* Kibble equivalents */}
          <div>
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3">Approximate Daily Portions</p>
            <div className="space-y-2">
              {KIBBLE_DENSITIES.map(k => {
                const cups = result.der / k.kcalPerCup;
                return (
                  <div key={k.brand} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-xs text-slate-gray">{k.brand}</span>
                    <span className="font-black text-ebony text-sm">
                      {k.brand.includes("Wet") ? `${Math.round(cups * 100)} g` : `${cups.toFixed(1)} cups`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-slate-gray/60 leading-relaxed">
            These are starting-point estimates. Actual needs vary with individual metabolism. Adjust based on body condition score every 4–6 weeks. Always verify with your vet for medical conditions.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
