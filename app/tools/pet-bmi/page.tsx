"use client";

import { useState, useMemo, useEffect } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";
import { breeds } from "../../data/species";

type Unit = "metric" | "imperial";
type Species = "dog" | "cat" | "rabbit" | "bird";

export default function PetBMIChecker() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [species, setSpecies] = useState<Species>("dog");
  const [breedName, setBreedName] = useState("");
  const [sex, setSex] = useState<"male" | "female" | "neutral">("male");
  const [weight, setWeight] = useState<string>("");
  const [ribFeel, setRibFeel] = useState(3);
  const [waistView, setWaistView] = useState(3);

  const filteredBreeds = useMemo(() => breeds.filter(b => b.species === species), [species]);
  const currentBreed = useMemo(() => filteredBreeds.find(b => b.name === breedName), [breedName, filteredBreeds]);

  // Handle species change to reset breed
  useEffect(() => {
    setBreedName("");
  }, [species]);

  const assessment = useMemo(() => {
    const w = parseFloat(weight);
    if (!w || !currentBreed) return null;

    // Convert weight to metric for calculation if needed
    const weightKg = unit === "metric" ? (species === "bird" ? w / 1000 : w) : (species === "bird" ? (w * 28.3495) / 1000 : w * 0.453592);
    
    const idealMin = currentBreed.minWeight;
    const idealMax = currentBreed.maxWeight;
    const idealMedian = (idealMin + idealMax) / 2;

    let scaleStatus: "under" | "ideal" | "over" | "obese" = "ideal";
    let deviation = 0;

    if (weightKg < idealMin) {
      scaleStatus = "under";
      deviation = ((idealMin - weightKg) / idealMin) * 100;
    } else if (weightKg > idealMax) {
      scaleStatus = weightKg > idealMax * 1.2 ? "obese" : "over";
      deviation = ((weightKg - idealMax) / idealMax) * 100;
    }

    // BCS influence
    const bcsScore = (ribFeel + waistView) / 2;
    
    let finalLabel = "Ideal";
    let finalColor = "text-emerald-500";
    let finalBg = "bg-emerald-50";
    let finalBorder = "border-emerald-200";
    let advice = "Your pet is in top shape! Maintain this balance with consistent exercise and measured meals.";

    if (bcsScore >= 4 || scaleStatus === "obese") {
      finalLabel = "Obese";
      finalColor = "text-red-500";
      finalBg = "bg-red-50";
      finalBorder = "border-red-200";
      advice = "Significant health risk. Consult your vet for a controlled weight loss program and joint-safe exercise.";
    } else if (bcsScore > 3.5 || scaleStatus === "over") {
      finalLabel = "Overweight";
      finalColor = "text-amber-500";
      finalBg = "bg-amber-50";
      finalBorder = "border-amber-200";
      advice = "Slightly above ideal. Increase daily activity and check caloric density of treats.";
    } else if (bcsScore < 2.5 || scaleStatus === "under") {
      finalLabel = "Underweight";
      finalColor = "text-amber-500";
      finalBg = "bg-amber-50";
      finalBorder = "border-amber-200";
      advice = "Below the healthy range. Consider higher protein feeds or checking for underlying metabolic issues with a vet.";
    }

    return { 
      label: finalLabel, color: finalColor, bg: finalBg, border: finalBorder, advice,
      deviation: Math.round(deviation), 
      idealRange: `${idealMin} - ${idealMax} ${species === "bird" ? "g" : "kg"}`,
      status: scaleStatus
    };
  }, [weight, currentBreed, ribFeel, waistView, unit, species]);

  return (
    <ToolLayout 
      subtitle="Advanced Health Analytics"
      title="Pet Weight & BMI Checker"
      description="Professional-grade assessment using breed standards and Body Condition Score (BCS) logic."
      illustration={<ToolIllustration type="calculator" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Data Input */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-gray-50/50 p-8 rounded-[3.5rem] border border-gray-100/50 shadow-inner">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-sm font-black text-ebony uppercase tracking-widest flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg bg-brand-start text-white flex items-center justify-center text-[10px]">1</span>
                  Pet Information
               </h3>
               <div className="flex bg-white rounded-full p-1 border border-gray-100">
                  <button onClick={() => setUnit("metric")} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${unit === "metric" ? 'bg-ebony text-white' : 'text-slate-gray'}`}>METRIC</button>
                  <button onClick={() => setUnit("imperial")} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${unit === "imperial" ? 'bg-ebony text-white' : 'text-slate-gray'}`}>IMPERIAL</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3 px-1">Species</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["dog", "cat", "rabbit", "bird"] as Species[]).map((s) => (
                        <button key={s} onClick={() => setSpecies(s)}
                          className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${species === s ? 'bg-ebony text-white border-ebony' : 'bg-white text-slate-gray border-transparent hover:bg-gray-100'}`}>
                          <span className="text-xl">{s === "dog" ? "🐕" : s === "cat" ? "🐈" : s === "rabbit" ? "🐇" : "🦜"}</span>
                          <span className="text-[8px] font-black uppercase">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3 px-1">Breed</label>
                     <select 
                        value={breedName} 
                        onChange={(e) => setBreedName(e.target.value)}
                        className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 font-bold focus:border-brand-start outline-none transition-all shadow-sm"
                     >
                        <option value="">Select a {species} breed...</option>
                        {filteredBreeds.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                     </select>
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                     <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3 px-1">Weight ({unit === "metric" ? (species === "bird" ? "g" : "kg") : (species === "bird" ? "oz" : "lbs")})</label>
                     <input 
                        type="number" 
                        value={weight} 
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 font-bold focus:border-brand-start outline-none transition-all shadow-sm"
                     />
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3 px-1">Biological Sex</label>
                     <div className="grid grid-cols-3 gap-2">
                        {["male", "female", "neutral"].map((s) => (
                           <button key={s} onClick={() => setSex(s as any)}
                             className={`py-4 rounded-2xl border-2 transition-all text-[8px] font-black uppercase tracking-widest ${sex === s ? 'bg-brand-start text-white border-brand-start' : 'bg-white text-slate-gray border-transparent hover:bg-gray-100'}`}>
                              {s}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-gray-50/50 p-8 rounded-[3.5rem] border border-gray-100/50 shadow-inner">
             <h3 className="text-sm font-black text-ebony uppercase tracking-widest flex items-center gap-3 mb-10">
                <span className="h-6 w-6 rounded-lg bg-brand-start text-white flex items-center justify-center text-[10px]">2</span>
                Visual Confirmation (BCS)
             </h3>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black text-ebony uppercase tracking-widest">Rib palpation</label>
                      <span className="text-xs font-bold text-brand-start">Level {ribFeel}</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={ribFeel} onChange={(e) => setRibFeel(parseInt(e.target.value))} className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer accent-brand-start" />
                    <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-gray uppercase"><span>Very Prominent</span><span>Ideal</span><span>Hidden</span></div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black text-ebony uppercase tracking-widest">Waist Appearance</label>
                      <span className="text-xs font-bold text-brand-start">Level {waistView}</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={waistView} onChange={(e) => setWaistView(parseInt(e.target.value))} className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer accent-brand-start" />
                    <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-gray uppercase"><span>Extreme Tuck</span><span>Ideal</span><span>No Tuck</span></div>
                  </div>
                </div>

                <div className="bg-brand-gradient text-white p-8 rounded-3xl relative overflow-hidden group shadow-xl">
                   <div className="relative z-10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Vet Tip</h4>
                      <p className="text-sm font-bold leading-relaxed italic">"Always feel your pet. Weight alone doesn't show muscle mass or fat distribution."</p>
                   </div>
                   <div className="absolute top-0 right-0 p-8 text-white/10 text-8xl font-black select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">🩺</div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results */}
        <div className="relative">
          {assessment ? (
            <div className={`p-10 rounded-[3.5rem] border-4 transition-all duration-500 sticky top-12 ${assessment.bg} ${assessment.border} shadow-2xl`}>
               <div className="relative z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block bg-white shadow-sm ${assessment.color}`}>
                    Assessment: {assessment.label}
                  </span>
                  
                  <div className="mb-10 text-center">
                    <div className="text-7xl font-black text-ebony tracking-tighter leading-none mb-2">
                       {assessment.deviation}%
                    </div>
                    <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest">
                       {assessment.status === "ideal" ? "Within standard range" : `From ideal ${assessment.status}`}
                    </p>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white/60 p-6 rounded-2xl border border-white/50">
                        <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-1">Breed Ideal ({species})</p>
                        <p className="font-black text-ebony">{assessment.idealRange}</p>
                     </div>

                     <div className="pb-6">
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex">
                          <div className={`h-full bg-red-400 ${assessment.label === "Obese" ? "animate-pulse" : ""} w-1/5 border-r border-white/20`} />
                          <div className={`h-full bg-amber-400 ${assessment.label === "Overweight" ? "animate-pulse" : ""} w-1/5 border-r border-white/20`} />
                          <div className={`h-full bg-emerald-500 ${assessment.label === "Ideal" ? "animate-pulse" : ""} w-1/5 border-r border-white/20`} />
                          <div className={`h-full bg-amber-400 ${assessment.label === "Underweight" ? "animate-pulse" : ""} w-1/5 border-r border-white/20`} />
                          <div className={`h-full bg-red-400 ${assessment.label === "Obese" ? "animate-pulse" : ""} w-1/5 text-xs flex justify-center items-center text-white font-black`} />
                        </div>
                        <div className="flex justify-between mt-3 px-1">
                           {["Very Under", "Under", "Ideal", "Over", "Obese"].map(l => (
                              <span key={l} className="text-[7px] font-black text-slate-gray uppercase tracking-tight">{l}</span>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mb-3">Professional Advice</p>
                        <p className="text-xs font-bold text-ebony leading-relaxed">{assessment.advice}</p>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-8 text-black/5 text-9xl font-black select-none leading-none transform translate-x-1/4 -translate-y-1/4">DATA</div>
            </div>
          ) : (
            <div className="p-16 rounded-[3.5rem] bg-gray-50 border-4 border-dashed border-gray-200 text-center sticky top-12">
               <p className="text-5xl mb-6">📉</p>
               <h3 className="text-sm font-black text-ebony uppercase tracking-widest leading-relaxed">Enter Breed & Weight <br/>to unlock analysis</h3>
            </div>
          )}
        </div>
      </div>

      <div className="mt-24 max-w-4xl mx-auto space-y-12">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-video bg-gray-100 bg-[url('https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center">
               <div className="absolute inset-0 bg-brand-gradient opacity-20" />
            </div>
            <div>
               <span className="text-[10px] font-black text-brand-start uppercase tracking-widest block mb-4">Scientific Background</span>
               <h3 className="text-3xl font-black text-ebony uppercase tracking-tight leading-tight mb-6">Why BMI alone isn't enough for pets.</h3>
               <p className="text-slate-gray leading-relaxed mb-6">Human BMI is a height-to-weight ratio. Since pets vary drastically in bone structure and breed standards, veterinarians use the **Body Condition Score (BCS)**. Our calculation uses your breed's scientific weight range combined with your hands-on rib palpation to give a truly accurate picture of health.</p>
               <ul className="space-y-4">
                  {[
                    "Standardised breed weight data (50+ breeds)",
                    "Visual tuck and rib palpation integration",
                    "Species-specific metabolism factors",
                    "Metric and Imperial support"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs font-black text-ebony">
                      <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                      {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
    </ToolLayout>
  );
}
