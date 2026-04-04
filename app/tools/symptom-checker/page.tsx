"use client";
import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";
import { symptomData, SymptomCategory, SymptomRecord } from "../../data/symptoms";

const urgencyConfig = {
  emergency: { 
    label: "Emergency — Go Now", 
    color: "bg-red-600 text-white", 
    border: "border-red-500", 
    bg: "bg-red-50", 
    tip: "Do NOT wait. Transport to an emergency clinic immediately." 
  },
  "vet-soon": { 
    label: "See a Vet Soon", 
    color: "bg-amber-500 text-white", 
    border: "border-amber-400", 
    bg: "bg-amber-50", 
    tip: "Call your vet and schedule an exam within 24 hours." 
  },
  monitor: { 
    label: "Monitor at Home", 
    color: "bg-sky-500 text-white", 
    border: "border-sky-400", 
    bg: "bg-sky-50", 
    tip: "Keep a close eye. If symptoms worsen, call your vet." 
  },
};

const categories: (SymptomCategory | "All")[] = [
  "All",
  "Emergency/Systemic",
  "Gastrointestinal",
  "Respiratory",
  "Neurological",
  "Physical/Mobility",
  "Skin/Coat",
  "Ocular/Head"
];

export default function SymptomChecker() {
  const [animal, setAnimal] = useState<"dog" | "cat">("dog");
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<(SymptomCategory | "All")>("All");

  const filteredSymptoms = useMemo(() => {
    return symptomData.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const symptom = useMemo(() => {
    return symptomData.find(s => s.name === selected);
  }, [selected]);

  return (
    <ToolLayout 
      subtitle="Advanced Diagnostic Guide" 
      title="Pet Symptom Pro Checker" 
      description="Instant urgency ratings and first-aid remedies for 40+ common pet symptoms. Always prioritize professional veterinary diagnosis."
      illustration={<ToolIllustration type="health" />}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* controls */}
        <div className="bg-gray-50 p-8 rounded-[3.5rem] border border-gray-100 shadow-inner space-y-8">
           <div className="flex flex-col md:flex-row gap-6">
              {/* Animal toggle */}
              <div className="flex gap-2 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm w-full md:w-auto">
                {(["dog", "cat"] as const).map(a => (
                  <button key={a} onClick={() => { setAnimal(a); setSelected(null); }}
                    className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                      ${animal === a ? "bg-ebony text-white shadow-lg" : "text-slate-gray hover:bg-gray-50"}`}>
                    <span className="text-xl">{a === "dog" ? "🐕" : "🐈"}</span> {a}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search symptoms (e.g. vomiting, sneezing...)" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-transparent rounded-full px-8 py-4 font-bold focus:border-brand-start outline-none transition-all shadow-sm"
                />
              </div>
           </div>

           {/* Category filter */}
           <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all
                    ${activeCategory === cat ? "bg-brand-start border-brand-start text-white shadow-md scale-105" : "bg-white border-transparent text-slate-gray hover:border-gray-200"}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Result Area */}
        {symptom && (
          <div className={`p-10 md:p-16 rounded-[4.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-500
            ${urgencyConfig[symptom.urgency].border} ${urgencyConfig[symptom.urgency].bg}`}>
            
            <div className="absolute top-0 right-0 p-12 text-ebony/5 text-[15rem] leading-none font-black select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
               {symptom.icon}
            </div>

            <div className="relative">
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                  <span className="text-6xl bg-white w-24 h-24 rounded-3xl flex items-center justify-center shadow-inner border border-gray-100">{symptom.icon}</span>
                  <div>
                    <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter leading-tight">{symptom.name}</h2>
                    <div className="flex items-center gap-3 mt-4">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md ${urgencyConfig[symptom.urgency].color}`}>
                        {urgencyConfig[symptom.urgency].label}
                      </span>
                      <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-gray-100">{symptom.category}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-gray hover:text-red-500 text-3xl font-black transition-colors">✕</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white/60 p-8 rounded-[3rem] border border-white backdrop-blur-sm">
                  <h3 className="text-[11px] font-black text-ebony uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-start"></span> Possible Causes
                  </h3>
                  <p className="text-lg font-bold text-ebony leading-relaxed">
                    {animal === "dog" ? symptom.dog.description : symptom.cat.description}
                  </p>
                </div>

                <div className="bg-ebony text-white p-8 rounded-[3rem] shadow-xl">
                  <h3 className="text-[11px] font-black text-brand-start uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-start"></span> Immediate Remedies
                  </h3>
                  <p className="text-lg font-bold leading-relaxed opacity-90 italic">
                    "{animal === "dog" ? symptom.dog.remedy : symptom.cat.remedy}"
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white/40 rounded-3xl border border-white/60">
                <p className="text-sm font-bold text-slate-gray italic max-w-xl">
                  ⚠️ {urgencyConfig[symptom.urgency].tip}
                </p>
                <Link href="/vets" className="bg-ebony text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-start transition-all whitespace-nowrap">
                   Find Local Vet 🏥
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Symptom grid */}
        <div className="space-y-6">
           <h3 className="text-[11px] font-black text-slate-gray uppercase tracking-widest px-4">Browse All Symptoms ({filteredSymptoms.length})</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSymptoms.map((s: SymptomRecord) => {
              const cfg = urgencyConfig[s.urgency];
              const isSelected = selected === s.name;
              return (
                <button 
                  key={s.name} 
                  onClick={() => {
                    setSelected(isSelected ? null : s.name);
                    if (!isSelected) {
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }
                  }}
                  className={`flex flex-col p-8 rounded-[2.5rem] border-2 text-left transition-all group relative overflow-hidden
                    ${isSelected ? `${cfg.border} ${cfg.bg} ring-4 ring-brand-start/10` : "border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1"}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">{s.icon}</span>
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>
                      {s.urgency === "emergency" ? "CRITICAL" : s.urgency === "vet-soon" ? "URGENT" : "INFO"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-ebony text-lg leading-tight uppercase mb-2">{s.name}</p>
                    <p className="text-[9px] font-black text-slate-gray/60 uppercase tracking-widest">{s.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {filteredSymptoms.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
               <p className="text-6xl mb-4">🔍</p>
               <p className="font-black text-xl text-ebony uppercase">No symptoms found for "{searchTerm}"</p>
               <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="mt-4 text-brand-start font-black uppercase text-xs hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
        
        <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 text-center">
           <h4 className="text-emerald-700 font-black text-xl mb-4">🩺 Professional Note</h4>
           <p className="text-sm text-emerald-800/80 leading-relaxed max-w-2xl mx-auto">
             This tool uses veterinary-reviewed triage data to help you decide the urgency of your pet's condition. 
             It is NOT a replacement for a clinical diagnosis. If you are in doubt, always call your nearest emergency animal hospital.
           </p>
        </div>
      </div>
    </ToolLayout>
  );
}
import Link from "next/link";
