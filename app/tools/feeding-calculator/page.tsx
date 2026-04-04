"use client";

import { useState, useEffect } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

export default function PetFeedingCalculator() {
  const [petType, setPetType] = useState("dog");
  const [weight, setWeight] = useState(10);
  const [age, setAge] = useState("adult");
  const [feedingAmount, setFeedingAmount] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // Basic feeding logic (simplified)
    // Adult Dog: ~2-3% of body weight in calories/amount
    let base = weight * 0.25; // Base cups/units
    if (age === "puppy") base *= 1.5;
    if (age === "senior") base *= 0.8;
    if (petType === "cat") base *= 0.4;
    
    setFeedingAmount({
       min: Math.round(base * 0.9 * 10) / 10,
       max: Math.round(base * 1.1 * 10) / 10,
    });
  }, [petType, weight, age]);

  return (
    <ToolLayout 
      subtitle="Feeding Calculator"
      title="Pet Feeding Schedule"
      description="Calculate the optimal daily feeding amounts for your pet based on weight, age, and activity level."
      illustration={<ToolIllustration type="food" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
         <div className="space-y-10">
            <div>
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-6 px-2">Pet Species</label>
               <div className="flex gap-4">
                  {["dog", "cat"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPetType(t)}
                      className={`flex-1 py-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-2 ${petType === t ? 'bg-ebony text-white border-ebony shadow-xl' : 'bg-gray-50 text-slate-gray border-transparent hover:bg-white hover:border-gray-100 hover:shadow-lg'}`}
                    >
                      <span className="text-4xl">{t === "dog" ? "🐕" : "🐈"}</span>
                      <span className="font-black uppercase tracking-tight text-xs">{t}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div>
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-6 px-2">Pet Weight ({weight}kg)</label>
               <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start"
               />
               <div className="flex justify-between text-[10px] font-black text-slate-gray mt-4 uppercase tracking-tighter">
                  <span>1kg</span>
                  <span>50kg+</span>
               </div>
            </div>

            <div>
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-6 px-2">Life Stage</label>
               <div className="flex gap-4">
                  {["puppy", "adult", "senior"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setAge(s)}
                      className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-wide text-[10px] border-2 transition-all ${age === s ? 'bg-brand-start text-white border-brand-start shadow-md' : 'bg-gray-50 text-slate-gray border-transparent hover:bg-gray-100'}`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-gray-50 rounded-[4.5rem] p-16 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-inner">
            <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-9xl transform translate-x-1/4 -translate-y-1/4 select-none font-black opacity-30 group-hover:scale-110 transition-transform">Bowl</div>
            <div className="h-48 w-48 rounded-full border-8 border-white bg-white shadow-2xl flex items-center justify-center text-8xl mb-8 group-hover:rotate-12 transition-transform">🥣</div>
            <h4 className="text-sm font-black text-slate-gray uppercase tracking-widest mb-6 leading-none">Daily Feeding Recommendation</h4>
            <div className="flex items-baseline gap-2 mb-6">
               <span className="text-7xl font-black text-ebony">{feedingAmount.min}</span>
               <span className="text-2xl font-bold text-slate-gray">−</span>
               <span className="text-7xl font-black text-ebony">{feedingAmount.max}</span>
            </div>
            <p className="text-2xl font-black text-brand-start uppercase tracking-widest leading-none">Cups Per Day</p>
            <p className="mt-8 text-xs font-bold text-slate-gray max-w-xs mx-auto leading-relaxed italic opacity-80 uppercase tracking-widest">Calculations are based on 350-400 kcal per cup. Consult your vet for precise dietary medical needs.</p>
         </div>
      </div>
    </ToolLayout>
  );
}
