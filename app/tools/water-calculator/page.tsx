"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";

const ACTIVITY_LEVELS = [
  { id: "low",    label: "Low",    desc: "Mostly indoor, light walks",      icon: "🛋️", multiplier: 0.9  },
  { id: "normal", label: "Normal", desc: "Daily walks, moderate play",       icon: "🚶", multiplier: 1.0  },
  { id: "high",   label: "High",   desc: "Running, hiking, working dog",     icon: "🏃", multiplier: 1.4  },
];

const WEATHER = [
  { id: "cool",   label: "Cool / Indoor", icon: "❄️",  multiplier: 1.0 },
  { id: "normal", label: "Moderate",      icon: "☁️",  multiplier: 1.1 },
  { id: "hot",    label: "Hot & Humid",   icon: "☀️",  multiplier: 1.35 },
];

const DIET = [
  { id: "dry",    label: "Dry kibble",              icon: "🥣", waterFactor: 1.0  },
  { id: "mixed",  label: "Mix of wet & dry",         icon: "🍽️", waterFactor: 0.75 },
  { id: "wet",    label: "Wet / raw food only",      icon: "🥩", waterFactor: 0.5  },
];

const SIGNS = {
  dehydrated: ["Dry or tacky gums", "Skin tent (skin doesn't snap back)", "Sunken eyes", "Lethargy or weakness", "Dark-coloured urine"],
  overhydrated: ["Vomiting", "Bloating", "Hyponatremia in extreme cases (very rare)"],
};

export default function WaterCalculator() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState(10);
  const [activityId, setActivityId] = useState("normal");
  const [weatherId, setWeatherId] = useState("normal");
  const [dietId, setDietId] = useState("dry");

  const result = useMemo(() => {
    const wKg = unit === "lbs" ? weight * 0.453592 : weight;
    // Base: 50 ml/kg/day for dogs; 60 ml/kg/day for cats (cats have higher baseline need)
    const basePerKg = species === "dog" ? 50 : 60;
    const base = wKg * basePerKg;
    const activity = ACTIVITY_LEVELS.find(a => a.id === activityId)?.multiplier ?? 1;
    const weather  = WEATHER.find(w => w.id === weatherId)?.multiplier ?? 1;
    const diet     = DIET.find(d => d.id === dietId)?.waterFactor ?? 1;
    const dailyMl  = base * activity * weather * diet;
    return { dailyMl, dailyOz: dailyMl / 29.5735, cups: dailyMl / 240 };
  }, [species, unit, weight, activityId, weatherId, dietId]);

  return (
    <ToolLayout
      subtitle="Pet Water Calculator"
      title="How Much Water Should My Pet Drink?"
      description="Calculate your dog or cat's daily water intake needs based on weight, activity, weather, and diet type."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Inputs */}
        <div className="space-y-10">
          {/* Species */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Species</label>
            <div className="flex gap-4">
              {(["dog", "cat"] as const).map(s => (
                <button key={s} onClick={() => setSpecies(s)}
                  className={`flex-1 py-5 rounded-3xl border-4 transition-all flex flex-col items-center gap-2 ${species === s ? "bg-ebony text-white border-ebony shadow-xl" : "bg-gray-50 text-slate-gray border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md"}`}>
                  <span className="text-4xl">{s === "dog" ? "🐕" : "🐈"}</span>
                  <span className="font-black uppercase tracking-tight text-xs">{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
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
          </div>

          {/* Activity */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Activity Level</label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map(a => (
                <button key={a.id} onClick={() => setActivityId(a.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${activityId === a.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className={`font-black text-sm ${activityId === a.id ? "text-ebony" : "text-slate-gray"}`}>{a.label}</p>
                    <p className="text-xs text-slate-gray/70">{a.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Weather / Environment</label>
            <div className="flex gap-3">
              {WEATHER.map(w => (
                <button key={w.id} onClick={() => setWeatherId(w.id)}
                  className={`flex-1 py-3 rounded-2xl border-2 text-center transition-all ${weatherId === w.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className="text-2xl block mb-1">{w.icon}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${weatherId === w.id ? "text-ebony" : "text-slate-gray"}`}>{w.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diet */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Food Type</label>
            <div className="space-y-2">
              {DIET.map(d => (
                <button key={d.id} onClick={() => setDietId(d.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl border-2 text-left transition-all ${dietId === d.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className="text-xl">{d.icon}</span>
                  <span className={`font-bold text-sm ${dietId === d.id ? "text-ebony" : "text-slate-gray"}`}>{d.label}</span>
                  {d.id !== "dry" && <span className="ml-auto text-[10px] text-slate-gray/60 font-bold">Food provides moisture</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-ebony rounded-[2rem] p-8 text-center">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-2">Daily Water Target</p>
            <p className="text-7xl font-black text-white leading-none">{Math.round(result.dailyMl)}</p>
            <p className="text-white/50 text-sm mt-1">ml / day</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-1">In fl. oz</p>
              <p className="text-3xl font-black text-ebony">{result.dailyOz.toFixed(1)}</p>
              <p className="text-xs text-slate-gray">fl oz / day</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-1">Approx cups</p>
              <p className="text-3xl font-black text-ebony">{result.cups.toFixed(1)}</p>
              <p className="text-xs text-slate-gray">240 ml cups</p>
            </div>
          </div>

          {/* Practical tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="font-black text-blue-900 text-sm mb-2">💡 Practical tip</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              Always have fresh water available. Instead of measuring exactly, watch that your pet drains their bowl {Math.round(result.cups)} time{result.cups >= 2 ? "s" : ""} per day. If they&apos;re drinking significantly more or less, mention it to your vet.
            </p>
          </div>

          {/* Warning signs */}
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="font-black text-red-900 text-xs uppercase tracking-widest mb-3">Signs of Dehydration</p>
              <ul className="space-y-1">
                {SIGNS.dehydrated.map(s => (
                  <li key={s} className="flex gap-2 text-xs text-red-800">
                    <span className="text-red-500 font-black">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[10px] text-slate-gray/60 leading-relaxed">
            Based on standard veterinary guidelines (50–60 ml/kg/day baseline). Illness, medications, nursing, and kidney conditions significantly affect needs — always consult your vet for medical cases.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
