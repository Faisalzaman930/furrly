"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";
import { breeds, birdSpecies, BreedData } from "../../data/species";

type Species = "dog" | "cat" | "rabbit" | "bird";

export default function PetAgeCalculator() {
  const [species, setSpecies] = useState<Species>("dog");
  const [age, setAge] = useState(1);
  
  // Dog Specifics
  const [dogSize, setDogSize] = useState<BreedData["size"]>("medium");
  const [breedSearch, setBreedSearch] = useState("");
  const [isBreedOpen, setIsBreedOpen] = useState(false);

  // Bird Specifics
  const [selectedBird, setSelectedBird] = useState(birdSpecies[0]);

  const [humanAge, setHumanAge] = useState(0);
  const [lifeStage, setLifeStage] = useState({ name: "", tip: "" });

  const filteredBreeds = useMemo(() => {
    return breeds.filter(b => b.name.toLowerCase().includes(breedSearch.toLowerCase())).slice(0, 5);
  }, [breedSearch]);

  useEffect(() => {
    let calculated = 0;

    if (species === "cat") {
      if (age === 1) calculated = 15;
      else if (age === 2) calculated = 24;
      else calculated = 24 + (age - 2) * 4;
    } 
    else if (species === "rabbit") {
      calculated = 21 + (age - 1) * 6;
    }
    else if (species === "bird") {
      calculated = Math.round(age * (selectedBird.factor ?? 4));
    }
    else if (species === "dog") {
      // Dog Size Multipliers after age 2
      const year1 = 15;
      const year2 = 24;
      if (age === 1) calculated = year1;
      else if (age === 2) calculated = year2;
      else {
        let multi = 4; // Small
        if (dogSize === "medium") multi = 5;
        if (dogSize === "large") multi = 6;
        if (dogSize === "giant") multi = 8;
        calculated = year2 + (age - 2) * multi;
      }
    }

    setHumanAge(calculated);

    // Life Stage Logic
    if (calculated < 15) setLifeStage({ name: "Juvenile", tip: "Rapid growth! High-protein diet and socialization are key." });
    else if (calculated < 40) setLifeStage({ name: "Young Adult", tip: "Peak physical health. Maintain consistent exercise and training." });
    else if (calculated < 60) setLifeStage({ name: "Mature Adult", tip: "Monitor weight closely. Annual wellness exams become critical." });
    else if (calculated < 80) setLifeStage({ name: "Senior", tip: "Vision and joint health checks recommended. Bi-annual vet visits." });
    else setLifeStage({ name: "Geriatric", tip: "Focus on comfort and palliative care. Gentle, low-impact exercise." });

  }, [species, age, dogSize, selectedBird]);

  return (
    <ToolLayout 
      subtitle="Advanced Biological Model"
      relatedToolSlugs={["insurance-cost","pet-health-quiz","vaccine-tracker","symptom-checker"]}
      relatedArticles={[
        { slug: "senior-pet-care-guide", title: "Senior Pet Care Guide", category: "Expert Guide", emoji: "👴" },
        { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
      ]}
      title="Pet Human Age Calculator"
      description="Modern veterinary aging formulas for Dogs, Cats, Rabbits, and Birds. No more '7-year' myths—get the true life stage of your companion."
      illustration={<ToolIllustration type="calculator" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         <div className="space-y-10">
            {/* Species Selection */}
            <div>
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Select Species</label>
               <div className="grid grid-cols-4 gap-4">
                  {(["dog", "cat", "rabbit", "bird"] as Species[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpecies(s)}
                      className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${species === s ? 'bg-ebony text-white border-ebony' : 'bg-gray-50 text-slate-gray border-transparent hover:bg-gray-100'}`}
                    >
                      <span className="text-2xl mb-1">{s === "dog" ? "🐕" : s === "cat" ? "🐈" : s === "rabbit" ? "🐇" : "🦜"}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                    </button>
                  ))}
               </div>
            </div>

            {/* Conditional Dog Detail / Breed Search */}
            {species === "dog" && (
               <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="relative">
                     <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Quick Breed Search (Optional)</label>
                     <input 
                       type="text"
                       placeholder="Enter breed (e.g. Beagle, Great Dane...)"
                       value={breedSearch}
                       onChange={(e) => { setBreedSearch(e.target.value); setIsBreedOpen(true); }}
                       className="w-full bg-gray-50 border-2 border-transparent rounded-3xl px-8 py-4 focus:bg-white focus:border-brand-start outline-none transition-all font-bold"
                     />
                     {isBreedOpen && breedSearch && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                           {filteredBreeds.map(b => (
                              <button 
                                key={b.name}
                                onClick={() => { setDogSize(b.size); setBreedSearch(b.name); setIsBreedOpen(false); }}
                                className="w-full text-left px-8 py-3 hover:bg-gray-50 text-sm font-bold text-ebony flex justify-between"
                              >
                                <span>{b.name}</span>
                                <span className="text-[10px] uppercase text-brand-start">{b.size}</span>
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Manual Size Selection</label>
                    <div className="grid grid-cols-2 gap-4">
                       {(["small", "medium", "large", "giant"] as BreedData["size"][]).map(s => (
                          <button 
                            key={s} 
                            onClick={() => setDogSize(s)}
                            className={`py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest border-2 transition-all ${dogSize === s ? 'bg-brand-start/10 text-brand-start border-brand-start' : 'bg-gray-50 text-slate-gray border-transparent'}`}
                          >
                             {s}
                          </button>
                       ))}
                    </div>
                  </div>
               </div>
            )}

            {/* Bird Selection */}
            {species === "bird" && (
              <div className="animate-in fade-in duration-500">
                <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Bird Species</label>
                <div className="grid grid-cols-2 gap-4">
                   {birdSpecies.map(b => (
                      <button 
                        key={b.name} 
                        onClick={() => setSelectedBird(b)}
                        className={`py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest border-2 transition-all ${selectedBird.name === b.name ? 'bg-sky-500/10 text-sky-600 border-sky-500' : 'bg-gray-50 text-slate-gray border-transparent'}`}
                      >
                         {b.name}
                      </button>
                   ))}
                </div>
              </div>
            )}

            {/* Core Age Input */}
            <div>
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Pet Age (Years: {age})</label>
               <input 
                  type="range" 
                  min="0.5" 
                  max="25" 
                  step="0.5"
                  value={age}
                  onChange={(e) => setAge(parseFloat(e.target.value))}
                  className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start"
               />
               <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-slate-gray/50 uppercase tracking-widest">
                  <span>Newborn</span>
                  <span>Senior</span>
                  <span>Lifespan Limit</span>
               </div>
            </div>
         </div>

         {/* Result Visualization */}
         <div className="space-y-8">
            <div className="bg-white border-4 border-gray-50 rounded-[4.5rem] p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-inner">
               <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-[15rem] leading-none select-none font-black opacity-30 transform translate-x-1/4 -translate-y-1/4">AGE</div>
               
               <span className="px-6 py-2 rounded-full bg-brand-start/10 text-brand-start text-[10px] font-black uppercase tracking-widest mb-8 border border-brand-start/20 leading-none">
                 Equivalent Human Age
               </span>
               
               <div className="flex items-baseline gap-4 mb-4 relative">
                  <span className="text-8xl md:text-[10rem] font-black text-ebony group-hover:scale-105 transition-transform tracking-tighter leading-none">
                     {humanAge}
                  </span>
                  <span className="text-2xl font-black text-slate-gray/50 tracking-widest uppercase">Years</span>
               </div>
               
               <p className="text-2xl font-black text-ebony uppercase tracking-[0.2em] mb-12 opacity-80 decoration-brand-start decoration-4 underline underline-offset-8">
                 Scientific Projection
               </p>
               
               <div className="w-full p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-gray">
                     <span>Breed Formula</span>
                     <span className="text-ebony uppercase">{species} / {species === "dog" ? dogSize : "Standard"}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-gray">
                     <span>Metabolic Rate</span>
                     <span className="text-ebony">Species Optimized</span>
                  </div>
               </div>
            </div>

            {/* Life Stage Card */}
            <div className="bg-ebony rounded-[3rem] p-10 text-white relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 p-8 text-white/5 text-7xl font-black uppercase select-none">{lifeStage.name}</div>
               <h4 className="text-[10px] font-black text-brand-start uppercase tracking-[0.3em] mb-4">Biological Life Stage</h4>
               <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{lifeStage.name}</h3>
               <p className="text-white/60 font-medium leading-relaxed max-w-sm">
                  {lifeStage.tip}
               </p>
            </div>
         </div>
      </div>
    </ToolLayout>
  );
}
