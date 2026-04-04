"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

export default function PetInsuranceEstimator() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [age, setAge] = useState(1);
  const [breedType, setBreedType] = useState<"purebred" | "mixed">("mixed");
  const [coverage, setCoverage] = useState<"accident" | "comprehensive" | "premium">("comprehensive");

  const estimate = useMemo(() => {
    let base = petType === "dog" ? 25 : 15;
    
    // Age multiplier: 10% increase per year after 1
    const ageMulti = 1 + (age - 1) * 0.15;
    
    // Breed risk: Purebreds are often 20% more expensive
    const breedMulti = breedType === "purebred" ? 1.25 : 1.0;
    
    // Coverage levels
    const coverageRates = {
      accident: 0.6,
      comprehensive: 1.0,
      premium: 1.5
    };
    
    const finalMin = Math.round(base * ageMulti * breedMulti * coverageRates[coverage]);
    const finalMax = Math.round(finalMin * 1.4);
    
    return { min: finalMin, max: finalMax };
  }, [petType, age, breedType, coverage]);

  return (
    <ToolLayout 
      subtitle="Financial Planning"
      title="Pet Insurance Cost Estimator"
      description="Estimate monthly insurance premiums based on pet type, age, and coverage level. Avoid unexpected vet bills today!"
      illustration={<ToolIllustration type="calculator" />}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
               {["dog", "cat"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPetType(t as "dog" | "cat")}
                    className={`py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${petType === t ? 'bg-ebony text-white border-ebony' : 'bg-gray-50 text-slate-gray border-transparent hover:bg-gray-100'}`}
                  >
                    <span className="text-3xl">{t === "dog" ? "🐕" : "🐈"}</span>
                    <span className="font-black uppercase tracking-widest text-[10px]">{t}</span>
                  </button>
                ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
               <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] font-black text-ebony uppercase tracking-widest">Pet Age ({age} years)</label>
                  </div>
                  <input 
                    type="range" min="1" max="15" step="1" 
                    value={age} onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer accent-brand-start border border-gray-100 shadow-inner"
                  />
               </div>

               <div>
                  <label className="block text-[10px] font-black text-ebony uppercase tracking-widest mb-4">Breed Type</label>
                  <div className="flex gap-2">
                     {(["purebred", "mixed"] as const).map(type => (
                        <button key={type} onClick={() => setBreedType(type)}
                          className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${breedType === type ? 'bg-brand-start text-white border-brand-start' : 'bg-white border-gray-100 text-slate-gray'}`}>
                           {type}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-black text-ebony uppercase tracking-widest mb-6">Coverage Level</label>
               <div className="space-y-4">
                  {(["accident", "comprehensive", "premium"] as const).map(lev => (
                     <button key={lev} onClick={() => setCoverage(lev)}
                        className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all text-left ${coverage === lev ? 'bg-white border-brand-start shadow-xl ring-4 ring-brand-start/5' : 'bg-gray-50 border-transparent hover:border-gray-100'}`}>
                        <div>
                           <h4 className="text-sm font-black text-ebony uppercase tracking-tight capitalize">{lev} Plan</h4>
                           <p className="text-[10px] text-slate-gray mt-1">
                              {lev === "accident" && "Covers emergencies, fractures, and toxins."}
                              {lev === "comprehensive" && "Includes accidents, illness, and hereditary conditions."}
                              {lev === "premium" && "Full coverage plus wellness checks and dental."}
                           </p>
                        </div>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${coverage === lev ? 'bg-brand-start border-brand-start text-white' : 'bg-white border-gray-100'}`}>
                           {coverage === lev && <span className="text-[8px] font-black">✓</span>}
                        </div>
                     </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-ebony rounded-[4.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 text-white/5 text-[15rem] leading-none select-none font-black opacity-30 transform translate-x-1/4 -translate-y-1/4">COST</div>
                <div className="relative">
                   <span className="px-6 py-2 rounded-full bg-brand-start text-white text-[10px] font-black uppercase tracking-widest mb-8 border border-white/20 leading-none">Monthly Estimate</span>
                   <div className="flex items-baseline justify-center gap-4 mt-8 mb-4">
                      <span className="text-2xl font-black text-white/30">$</span>
                      <span className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{estimate.min} - {estimate.max}</span>
                   </div>
                   <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Predicted Premium Range</p>
                </div>
             </div>

             <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-black">🛡️</div>
                      <span className="text-[10px] font-black text-ebony uppercase tracking-widest">Typical Annual Limit</span>
                   </div>
                   <span className="text-sm font-black text-ebony">{coverage === "premium" ? "$Unlimited" : "$10,000"}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center text-xs font-black">💸</div>
                      <span className="text-[10px] font-black text-ebony uppercase tracking-widest">Deductible Estimate</span>
                   </div>
                   <span className="text-sm font-black text-ebony">$250 - $500</span>
                </div>
             </div>

             <div className="bg-brand-start p-10 rounded-[3rem] text-white flex items-center justify-between gap-6 hover:scale-[1.02] transition-all cursor-pointer">
                <div>
                   <h4 className="text-sm font-black uppercase tracking-tight">Need specific quotes?</h4>
                   <p className="text-[10px] text-white/80 mt-1">Get pre-approved in the Furrly app.</p>
                </div>
                <div className="text-2xl">→</div>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
