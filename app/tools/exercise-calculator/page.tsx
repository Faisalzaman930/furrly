"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";

type EnergyLevel = "very-high" | "high" | "medium" | "low" | "very-low";

const BREED_TYPES: { id: EnergyLevel; label: string; examples: string; emoji: string; baseMin: number; baseMax: number }[] = [
  { id: "very-high", label: "Working / Herding",    examples: "Border Collie, Husky, Belgian Malinois, Dalmatian", emoji: "🏃", baseMin: 120, baseMax: 180 },
  { id: "high",      label: "Sporting / Hound",     examples: "Labrador, Golden Retriever, Weimaraner, Beagle",    emoji: "⚡", baseMin: 90,  baseMax: 120 },
  { id: "medium",    label: "Terrier / Mixed breed", examples: "Jack Russell, Springer Spaniel, Cocker Spaniel",    emoji: "🐕", baseMin: 60,  baseMax: 90  },
  { id: "low",       label: "Companion / Toy",       examples: "Shih Tzu, Cavalier, Maltese, Pug, French Bulldog", emoji: "🐩", baseMin: 30,  baseMax: 45  },
  { id: "very-low",  label: "Giant / Brachycephalic", examples: "Basset Hound, Saint Bernard, English Bulldog",    emoji: "😴", baseMin: 20,  baseMax: 30  },
];

const AGE_STAGES = [
  { id: "puppy",  label: "Puppy (under 1 yr)", desc: "5 min per month of age, twice daily",         multiplier: null, isPuppy: true  },
  { id: "adult",  label: "Adult (1–7 yrs)",    desc: "Full breed recommendation applies",             multiplier: 1.0,  isPuppy: false },
  { id: "senior", label: "Senior (7+ yrs)",    desc: "Reduce by 30–40%, watch for fatigue",          multiplier: 0.65, isPuppy: false },
];

const HEALTH_FACTORS = [
  { id: "healthy",   label: "Healthy",                  multiplier: 1.0  },
  { id: "overweight", label: "Overweight / needs to lose", multiplier: 1.2  },
  { id: "recovering", label: "Recovering from injury",   multiplier: 0.4  },
  { id: "joint",     label: "Joint issues / arthritis",  multiplier: 0.6  },
];

const ACTIVITY_IDEAS: Record<EnergyLevel, { activity: string; duration: string; icon: string }[]> = {
  "very-high": [
    { activity: "Off-leash run in a field",   duration: "30–45 min",  icon: "🌿" },
    { activity: "Fetch / frisbee",            duration: "20–30 min",  icon: "🥏" },
    { activity: "Canicross or cycling",       duration: "30–60 min",  icon: "🚴" },
    { activity: "Agility or nose work",       duration: "20–30 min",  icon: "🏅" },
    { activity: "Swimming",                   duration: "15–20 min",  icon: "🏊" },
  ],
  "high": [
    { activity: "Brisk on-leash walk",        duration: "30–40 min",  icon: "🚶" },
    { activity: "Fetch in the park",          duration: "20–30 min",  icon: "🎾" },
    { activity: "Hiking",                     duration: "45–60 min",  icon: "🥾" },
    { activity: "Swimming",                   duration: "15–20 min",  icon: "🏊" },
  ],
  "medium": [
    { activity: "On-leash walk",              duration: "20–30 min",  icon: "🚶" },
    { activity: "Garden / yard play",         duration: "15–20 min",  icon: "🏡" },
    { activity: "Interactive toy session",    duration: "10–15 min",  icon: "🦴" },
  ],
  "low": [
    { activity: "Gentle leash walk",          duration: "15–20 min",  icon: "🐾" },
    { activity: "Sniff walk (slow-paced)",    duration: "20 min",     icon: "👃" },
    { activity: "Indoor play / puzzle toys",  duration: "10–15 min",  icon: "🧩" },
  ],
  "very-low": [
    { activity: "Short gentle walk",          duration: "10–15 min",  icon: "🚶" },
    { activity: "Garden potter",              duration: "10 min",     icon: "🌱" },
    { activity: "Sniff walk",                 duration: "15 min",     icon: "👃" },
  ],
};

export default function ExerciseCalculator() {
  const [breedType, setBreedType] = useState<EnergyLevel>("high");
  const [ageStage, setAgeStage] = useState("adult");
  const [puppyMonths, setPuppyMonths] = useState(4);
  const [healthId, setHealthId] = useState("healthy");

  const result = useMemo(() => {
    const breed = BREED_TYPES.find(b => b.id === breedType)!;
    const age   = AGE_STAGES.find(a => a.id === ageStage)!;
    const health = HEALTH_FACTORS.find(h => h.id === healthId)!;

    if (age.isPuppy) {
      const minPerSession = puppyMonths * 5;
      return {
        minDay: minPerSession * 2,
        maxDay: minPerSession * 2 + 5,
        sessions: 2,
        note: `${minPerSession} min × 2 sessions/day (5 min per month of age rule)`,
        isPuppy: true,
      };
    }

    const minDay = Math.round(breed.baseMin * (age.multiplier ?? 1) * health.multiplier);
    const maxDay = Math.round(breed.baseMax * (age.multiplier ?? 1) * health.multiplier);
    return {
      minDay,
      maxDay,
      sessions: minDay >= 90 ? 3 : 2,
      note: "",
      isPuppy: false,
    };
  }, [breedType, ageStage, puppyMonths, healthId]);

  const activities = ACTIVITY_IDEAS[breedType] ?? [];

  return (
    <ToolLayout
      subtitle="Dog Exercise Calculator"
      title="How Much Exercise Does My Dog Need?"
      description="Get a personalised daily exercise recommendation for your dog based on breed energy level, age, and health status."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Inputs */}
        <div className="space-y-10">
          {/* Breed type */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Breed Energy Level</label>
            <div className="space-y-2">
              {BREED_TYPES.map(b => (
                <button key={b.id} onClick={() => setBreedType(b.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${breedType === b.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className="text-2xl flex-none mt-0.5">{b.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-black text-sm ${breedType === b.id ? "text-ebony" : "text-slate-gray"}`}>{b.label}</p>
                    <p className="text-xs text-slate-gray/70 mt-0.5">{b.examples}</p>
                  </div>
                  <span className={`flex-none text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${breedType === b.id ? "bg-ebony text-white" : "bg-gray-200 text-slate-gray"}`}>
                    {b.baseMin}–{b.baseMax} min
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Age stage */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Life Stage</label>
            <div className="space-y-2">
              {AGE_STAGES.map(a => (
                <button key={a.id} onClick={() => setAgeStage(a.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${ageStage === a.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <div className="flex-1">
                    <p className={`font-black text-sm ${ageStage === a.id ? "text-ebony" : "text-slate-gray"}`}>{a.label}</p>
                    <p className="text-xs text-slate-gray/70">{a.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {ageStage === "puppy" && (
              <div className="mt-4">
                <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-2">
                  Puppy Age: <span className="text-brand-start">{puppyMonths} months</span>
                </label>
                <input type="range" min="2" max="12" step="1" value={puppyMonths}
                  onChange={e => setPuppyMonths(+e.target.value)}
                  className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start" />
                <div className="flex justify-between text-[10px] font-bold text-slate-gray mt-1 uppercase tracking-tighter">
                  <span>2 mo</span><span>12 mo</span>
                </div>
              </div>
            )}
          </div>

          {/* Health */}
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Health Status</label>
            <div className="space-y-2">
              {HEALTH_FACTORS.map(h => (
                <button key={h.id} onClick={() => setHealthId(h.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${healthId === h.id ? "border-ebony bg-ebony/5" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}>
                  <span className={`text-sm font-bold ${healthId === h.id ? "text-ebony" : "text-slate-gray"}`}>{h.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-ebony rounded-[2rem] p-8 text-center">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-2">Daily Exercise</p>
            <p className="text-7xl font-black text-white leading-none">
              {result.minDay}
              {result.maxDay !== result.minDay && <span className="text-4xl text-white/60">–{result.maxDay}</span>}
            </p>
            <p className="text-white/50 text-sm mt-1">minutes per day</p>
            <p className="text-white/40 text-xs mt-2">{result.sessions} sessions recommended</p>
          </div>

          {result.isPuppy && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="font-black text-amber-900 text-sm mb-1">🐾 Puppy rule of thumb</p>
              <p className="text-xs text-amber-800 leading-relaxed">{result.note}</p>
              <p className="text-xs text-amber-800 mt-2 leading-relaxed">
                Over-exercising puppies can damage developing growth plates. Avoid hard surfaces, jumping, and forced long runs until 12–18 months (18–24 months for large breeds).
              </p>
            </div>
          )}

          {/* Session breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-4">Suggested Session Split</p>
            <div className="space-y-3">
              {Array.from({ length: result.sessions }, (_, i) => {
                const perSession = Math.round(result.minDay / result.sessions);
                return (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-sm font-bold text-slate-gray">Session {i + 1}</span>
                    <span className="font-black text-ebony">{perSession}–{Math.round(result.maxDay / result.sessions)} min</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity ideas */}
          <div>
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3">Activity Ideas for This Breed Type</p>
            <div className="space-y-2">
              {activities.map(a => (
                <div key={a.activity} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-xl flex-none">{a.icon}</span>
                  <span className="text-sm font-bold text-ebony flex-1">{a.activity}</span>
                  <span className="text-xs text-slate-gray flex-none">{a.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-gray/60 leading-relaxed">
            This is a general guide. Weather, individual temperament, and health conditions can significantly alter needs. Watch for signs of over-exercise: excessive panting, limping, or reluctance to continue.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
