"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const dogVaccines = [
  { name: "Distemper, Adenovirus, Parvovirus (DHP)", schedule: "6-8 weeks, 10-12 weeks, 14-16 weeks, then every 3 years", category: "Core" },
  { name: "Rabies (1-year or 3-year)", schedule: "12-16 weeks, then according to local law", category: "Core" },
  { name: "Bordetella (Kennel Cough)", schedule: "6-8 weeks, then every 6-12 months", category: "Non-Core" },
  { name: "Leptospirosis", schedule: "10-12 weeks, 14-16 weeks, then annually", category: "Non-Core" },
  { name: "Lyme Disease", schedule: "Initial series (2 doses), then annually", category: "Non-Core" },
  { name: "Canine Influenza", schedule: "Initial series (2 doses), then annually", category: "Non-Core" }
];

const catVaccines = [
  { name: "Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia (FVRCP)", schedule: "6-8 weeks, then every 3-4 weeks until 16-20 weeks, then every 3 years", category: "Core" },
  { name: "Rabies", schedule: "12-16 weeks, then according to local law", category: "Core" },
  { name: "Feline Leukaemia (FeLV)", schedule: "Initial series (2 doses), then annually", category: "Non-Core" },
  { name: "Bordetella", schedule: "When risk is high, annually", category: "Non-Core" }
];

export default function VaccinationTracker() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [ageRange, setAgeRange] = useState<"puppy" | "adult">("puppy");

  const vaccines = petType === "dog" ? dogVaccines : catVaccines;

  return (
    <ToolLayout 
      subtitle="Preventative Care"
      title="Pet Vaccination Schedule Tracker"
      description="Stay on top of your pet's health. Get the recommended vaccination schedule for puppies, kittens, and adult dogs and cats."
      illustration={<ToolIllustration type="health" />}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              {["dog", "cat"].map((t) => (
                <button
                  key={t}
                  onClick={() => setPetType(t as "dog" | "cat")}
                  className={`flex-1 py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${petType === t ? 'bg-ebony text-white border-ebony shadow-xl' : 'bg-gray-50 text-slate-gray border-transparent hover:bg-gray-100'}`}
                >
                  <span className="text-3xl">{t === "dog" ? "🐕" : "🐈"}</span>
                  <span className="font-black uppercase tracking-widest text-[10px]">{t}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
               {["puppy", "adult"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setAgeRange(l as "puppy" | "adult")}
                    className={`flex-1 py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-[0.2em] ${ageRange === l ? 'bg-brand-start text-white border-brand-start' : 'bg-gray-50 text-slate-gray border-transparent'}`}
                  >
                    {l === "puppy" ? (petType === "dog" ? "Puppy" : "Kitten") : "Adult"}
                  </button>
                ))}
            </div>
          </div>

          <div className="bg-ebony rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">Why Vaccinate?</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">Vaccines protect your pet from deadly diseases. Core vaccines are essential for every pet, while non-core vaccines depend on your pet's lifestyle and surroundings.</p>
               </div>
               <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-xs font-medium backdrop-blur-sm">
                  <span className="font-black text-brand-start uppercase tracking-widest block mb-2 underline decoration-brand-start decoration-2 underline-offset-4">Veterinary Tip</span>
                  Always consult with your local vet for a personalized immunisation plan tailored to your area.
               </div>
            </div>
            <div className="absolute top-0 right-0 p-8 text-white/5 text-9xl font-black select-none leading-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">VAX</div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-black text-ebony uppercase tracking-widest">Recommended Vaccines</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-slate-gray">Core</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-sky-500" />
                    <span className="text-[10px] font-black uppercase text-slate-gray">Non-Core</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vaccines.map((v, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-xl relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full opacity-10 group-hover:scale-150 transition-transform ${v.category === "Core" ? "bg-emerald-500" : "bg-sky-500"}`} />
                  <div className="relative">
                    <div className="flex justify-between items-center mb-6">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${v.category === "Core" ? "bg-emerald-500" : "bg-sky-500"}`}>
                          {v.category}
                        </span>
                    </div>
                    <h4 className="text-lg font-black text-ebony leading-tight mb-4 uppercase tracking-tight">{v.name}</h4>
                    <div className="bg-white/50 p-4 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-1">Standard Schedule</p>
                       <p className="text-xs font-bold text-ebony">{v.schedule}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
