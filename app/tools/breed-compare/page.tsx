"use client";
import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const dogBreeds = [
  { name: "Labrador Retriever", size: "Large", energy: "High", grooming: "Low", lifespan: "10–12 yrs", good_with_kids: "Excellent", trainability: "Easy", shedding: "Heavy" },
  { name: "Golden Retriever", size: "Large", energy: "High", grooming: "Moderate", lifespan: "10–12 yrs", good_with_kids: "Excellent", trainability: "Easy", shedding: "Heavy" },
  { name: "French Bulldog", size: "Small", energy: "Low", grooming: "Low", lifespan: "10–12 yrs", good_with_kids: "Good", trainability: "Moderate", shedding: "Moderate" },
  { name: "German Shepherd", size: "Large", energy: "Very High", grooming: "Moderate", lifespan: "9–13 yrs", good_with_kids: "Good", trainability: "Easy", shedding: "Heavy" },
  { name: "Border Collie", size: "Medium", energy: "Very High", grooming: "Moderate", lifespan: "12–15 yrs", good_with_kids: "Good", trainability: "Very Easy", shedding: "Moderate" },
  { name: "Poodle (Standard)", size: "Medium", energy: "High", grooming: "High", lifespan: "12–15 yrs", good_with_kids: "Excellent", trainability: "Very Easy", shedding: "Minimal" },
  { name: "Beagle", size: "Small", energy: "High", grooming: "Low", lifespan: "12–15 yrs", good_with_kids: "Excellent", trainability: "Moderate", shedding: "Moderate" },
  { name: "Chihuahua", size: "Tiny", energy: "Moderate", grooming: "Low", lifespan: "14–16 yrs", good_with_kids: "Caution", trainability: "Moderate", shedding: "Low" },
  { name: "Rottweiler", size: "Large", energy: "Moderate", grooming: "Low", lifespan: "8–10 yrs", good_with_kids: "Good (with training)", trainability: "Moderate", shedding: "Moderate" },
  { name: "Dachshund", size: "Small", energy: "Moderate", grooming: "Low", lifespan: "12–16 yrs", good_with_kids: "Caution", trainability: "Challenging", shedding: "Low" },
  { name: "Australian Shepherd", size: "Medium", energy: "Very High", grooming: "Moderate", lifespan: "13–15 yrs", good_with_kids: "Good", trainability: "Very Easy", shedding: "Heavy" },
  { name: "Great Dane", size: "Giant", energy: "Moderate", grooming: "Low", lifespan: "7–10 yrs", good_with_kids: "Excellent", trainability: "Moderate", shedding: "Moderate" },
];

const catBreeds = [
  { name: "Maine Coon", size: "Large", energy: "Moderate", grooming: "High", lifespan: "12–15 yrs", good_with_kids: "Excellent", trainability: "Moderate", shedding: "Heavy" },
  { name: "Siamese", size: "Medium", energy: "High", grooming: "Low", lifespan: "12–20 yrs", good_with_kids: "Good", trainability: "Easy", shedding: "Low" },
  { name: "Persian", size: "Medium", energy: "Low", grooming: "Very High", lifespan: "12–17 yrs", good_with_kids: "Good", trainability: "Low", shedding: "Heavy" },
  { name: "Bengal", size: "Medium", energy: "Very High", grooming: "Low", lifespan: "12–16 yrs", good_with_kids: "Caution", trainability: "Easy", shedding: "Minimal" },
  { name: "Ragdoll", size: "Large", energy: "Low", grooming: "High", lifespan: "12–15 yrs", good_with_kids: "Excellent", trainability: "Moderate", shedding: "Moderate" },
  { name: "British Shorthair", size: "Medium", energy: "Low", grooming: "Low", lifespan: "12–20 yrs", good_with_kids: "Good", trainability: "Low", shedding: "Moderate" },
  { name: "Sphynx", size: "Medium", energy: "High", grooming: "Moderate (baths)", lifespan: "12–16 yrs", good_with_kids: "Excellent", trainability: "Easy", shedding: "None" },
  { name: "Scottish Fold", size: "Small", energy: "Low", grooming: "Low", lifespan: "11–14 yrs", good_with_kids: "Good", trainability: "Low", shedding: "Moderate" },
];

const fields = ["size", "energy", "grooming", "lifespan", "good_with_kids", "trainability", "shedding"] as const;
const fieldLabels: Record<string, string> = {
  size: "Size", energy: "Energy Level", grooming: "Grooming Needs",
  lifespan: "Lifespan", good_with_kids: "Good with Kids", trainability: "Trainability", shedding: "Shedding",
};

type Breed = (typeof dogBreeds)[0] | (typeof catBreeds)[0];

export default function BreedCompare() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [breedA, setBreedA] = useState<string>("");
  const [breedB, setBreedB] = useState<string>("");

  const list = species === "dog" ? dogBreeds : catBreeds;
  const a = list.find(b => b.name === breedA) as Breed | undefined;
  const b = list.find(b => b.name === breedB) as Breed | undefined;

  return (
    <ToolLayout subtitle="Side-by-Side Analysis" title="Breed Comparison Tool" description="Compare two dog or cat breeds side-by-side across size, energy, grooming, trainability, and lifespan."  illustration={<ToolIllustration type="search" />}
    >
      <div className="max-w-4xl mx-auto">
        {/* Species Toggle */}
        <div className="flex gap-4 mb-12">
          {(["dog", "cat"] as const).map(s => (
            <button key={s} onClick={() => { setSpecies(s); setBreedA(""); setBreedB(""); }}
              className={`flex-1 py-5 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 border-2 transition-all
                ${species === s ? "bg-ebony text-white border-ebony" : "bg-gray-50 border-transparent text-slate-gray hover:bg-gray-100"}`}>
              <span className="text-2xl">{s === "dog" ? "🐕" : "🐈"}</span> {s}
            </button>
          ))}
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          {[{ val: breedA, set: setBreedA, label: "Breed A" }, { val: breedB, set: setBreedB, label: "Breed B" }].map(({ val, set, label }) => (
            <div key={label}>
              <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3">{label}</label>
              <select value={val} onChange={e => set(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-6 py-4 font-bold focus:bg-white focus:border-brand-start outline-none transition-all appearance-none">
                <option value="">Select {species}...</option>
                {list.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {a && b ? (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-[3rem] overflow-hidden shadow-xl">
              {/* Header */}
              <div className="bg-gray-50 p-8 text-[10px] font-black text-slate-gray uppercase tracking-widest flex items-center">Trait</div>
              {[a, b].map((breed, i) => (
                <div key={i} className={`p-8 text-center font-black text-xl text-white uppercase tracking-tight ${i === 0 ? "bg-ebony" : "bg-brand-start"}`}>
                  {breed.name}
                </div>
              ))}
              {/* Rows */}
              {fields.map((field, fi) => (
                <>
                  <div key={`label-${fi}`} className="bg-white p-6 text-xs font-black text-slate-gray uppercase tracking-widest flex items-center border-t border-gray-100">
                    {fieldLabels[field]}
                  </div>
                  {[a, b].map((breed, bi) => (
                    <div key={`${field}-${bi}`} className={`p-6 text-center font-bold text-ebony flex items-center justify-center border-t border-gray-100 ${bi === 0 ? "bg-ebony/5" : "bg-brand-start/5"}`}>
                      {(breed as any)[field]}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-gray">
            <p className="text-6xl mb-4">🆚</p>
            <p className="font-black text-xl text-ebony uppercase">Select two breeds to compare</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
