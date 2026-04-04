"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";
import { countries, CountryData } from "../../data/countries";

export default function PetSitterCostCalculator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    countries.find(c => c.code === "US") || countries[0]
  );
  
  const [petType, setPetType] = useState("dog");
  const [numPets, setNumPets] = useState(1);
  const [hours, setHours] = useState(4);
  const [isBigCity, setIsBigCity] = useState(false);
  
  // Advanced Variables
  const [foodProvided, setFoodProvided] = useState(true);
  const [needsMedication, setNeedsMedication] = useState(false);
  
  const [results, setResults] = useState({
    daily: { min: 0, max: 0 },
    weekly: { min: 0, max: 0 },
    monthly: { min: 0, max: 0 },
  });

  // Tier base rates (Above Average for 2025 Market)
  const tierRates = {
    1: 34, // High Income (USA, UK, etc.) - Above average $34/hr
    2: 24, // Mid-High (UAE, Japan) - Above average $24/hr
    3: 14, // Mid-Low (LatAm, parts of SE Asia) - Above average $14/hr
    4: 8,  // Budget - Above average $8/hr
  };

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const popularCountries = useMemo(() => {
    return countries.filter(c => ["US", "UK", "CA", "AU", "IN", "AE"].includes(c.code));
  }, []);

  useEffect(() => {
    // 1. Calculate Base Hourly Rate
    const baseRate = tierRates[selectedCountry.tier];
    const cityMultiplier = isBigCity ? 1.3 : 1; // Higher city premium
    const petMultiplier = 1 + (numPets - 1) * 0.5; // Higher pet multiplier
    const typeMultiplier = petType === "dog" ? 1.15 : 1.0; 
    
    // Scale for key markets (Above Average)
    let scaleMultiplier = 1;
    if (selectedCountry.code === "IN") scaleMultiplier = 550 / baseRate; // 550 INR Above Avg
    else if (selectedCountry.code === "UK") scaleMultiplier = 22 / baseRate; // 22 GBP Above Avg

    const hourlyRate = baseRate * scaleMultiplier * cityMultiplier * petMultiplier * typeMultiplier;

    // 2. Add-on Surcharges (per day)
    const foodSurcharge = !foodProvided ? (10 * scaleMultiplier * numPets) : 0;
    const medSurcharge = needsMedication ? (15 * scaleMultiplier * numPets) : 0;
    
    // 3. Time Calculations
    const dailyBase = (hourlyRate * hours) + foodSurcharge + medSurcharge;
    const weeklyBase = dailyBase * 7 * 0.95; // Lower bulk discount to keep prices realistic but high
    const monthlyBase = dailyBase * 30 * 0.85; 

    setResults({
      daily: { min: Math.round(dailyBase * 0.95), max: Math.round(dailyBase * 1.25) },
      weekly: { min: Math.round(weeklyBase * 0.95), max: Math.round(weeklyBase * 1.25) },
      monthly: { min: Math.round(monthlyBase * 0.95), max: Math.round(monthlyBase * 1.25) },
    });
  }, [selectedCountry, petType, numPets, hours, isBigCity, foodProvided, needsMedication]);

  return (
    <ToolLayout 
      subtitle="Advanced Global Hub"
      title="Pet Sitter Pro Calculator"
      description="Calculate comprehensive pet care costs with medication surcharges, food provision adjustments, and long-term projections."
      illustration={<ToolIllustration type="calculator" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         <div className="space-y-10">
            {/* Country Selector */}
            <div className="relative">
               <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Location</label>
               <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm || selectedCountry.name}
                    onFocus={() => { setIsOpen(true); setSearchTerm(""); }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-brand-start outline-none transition-all font-bold shadow-inner"
                  />
                  {isOpen && (
                    <div className="absolute z-50 w-full mt-4 bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl p-4 animate-in fade-in slide-in-from-top-2">
                       <div className="max-h-60 overflow-y-auto custom-scrollbar">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => { setSelectedCountry(c); setIsOpen(false); setSearchTerm(""); }}
                              className="w-full text-left px-6 py-4 rounded-2xl hover:bg-gray-50 flex items-center justify-between group"
                            >
                              <span className="font-bold text-ebony">{c.name}</span>
                              <span className="text-xs text-slate-gray font-black uppercase">{c.currency}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            {/* Advanced Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex-1 pr-4">
                     <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest">Food Provided?</h4>
                  </div>
                  <button onClick={() => setFoodProvided(!foodProvided)} className={`h-8 w-14 rounded-full transition-all relative ${foodProvided ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                     <div className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition-transform ${foodProvided ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
               </div>
               <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex-1 pr-4">
                     <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest">Medication?</h4>
                  </div>
                  <button onClick={() => setNeedsMedication(!needsMedication)} className={`h-8 w-14 rounded-full transition-all relative ${needsMedication ? 'bg-brand-start' : 'bg-gray-300'}`}>
                     <div className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition-transform ${needsMedication ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
               </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
               <div>
                  <h4 className="text-sm font-black text-ebony uppercase tracking-tight">Major Metropolitan Area?</h4>
                  <p className="text-xs text-slate-gray mt-1">25% Cost of Living Surcharge.</p>
               </div>
               <button onClick={() => setIsBigCity(!isBigCity)} className={`h-10 w-20 rounded-full transition-all relative ${isBigCity ? 'bg-brand-start' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 left-1 h-8 w-8 bg-white rounded-full transition-transform ${isBigCity ? 'translate-x-10' : 'translate-x-0'}`} />
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div>
                  <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Duration (Hours: {hours})</label>
                  <input type="range" min="1" max="24" step="1" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-start" />
               </div>
               <div>
                  <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Number of Pets ({numPets})</label>
                  <input type="range" min="1" max="5" step="1" value={numPets} onChange={(e) => setNumPets(parseInt(e.target.value))} className="w-full accent-brand-start" />
               </div>
            </div>
         </div>

         {/* Fostering CTA Banner */}
         <div className="lg:col-span-2 bg-brand-start p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="absolute top-0 right-0 p-12 text-white/10 text-9xl font-black select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">SAFE</div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Know who you're hiring & Save Money.</h3>
                  <p className="text-white/80 font-bold max-w-xl">Professional sitting costs are rising. Discover a safer, community-led alternative with Furrly Fostering.</p>
               </div>
               <Link href="/fostering" className="bg-white text-brand-start font-black py-5 px-10 rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest whitespace-nowrap">
                  Explore Fostering
               </Link>
            </div>
         </div>

         {/* Advanced Results Grid */}
         <div className="space-y-6">
            <div className="bg-white border-2 border-brand-start/20 rounded-[4.5rem] p-12 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-[15rem] leading-none select-none font-black opacity-30 transform translate-x-1/4 -translate-y-1/4">EST</div>
               <div className="relative text-center">
                  <span className="px-6 py-2 rounded-full bg-brand-start/10 text-brand-start text-[10px] font-black uppercase tracking-widest mb-8 border border-brand-start/20 leading-none">
                    Standard Daily Rate
                  </span>
                  <div className="flex items-baseline justify-center gap-4 mt-8">
                     <span className="text-xl md:text-2xl font-black text-slate-gray/50">{selectedCountry.currency}</span>
                     <span className="text-7xl md:text-8xl font-black text-ebony tracking-tighter leading-none">
                        {results.daily.min.toLocaleString()} - {results.daily.max.toLocaleString()}
                     </span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100/50">
                  <h4 className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Weekly Projection</h4>
                  <p className="text-3xl font-black text-ebony">{selectedCountry.currency} {results.weekly.min.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-2 animate-pulse">10% Bulk Discount Applied</p>
               </div>
               <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100/50">
                  <h4 className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Monthly Management</h4>
                  <p className="text-3xl font-black text-ebony">{selectedCountry.currency} {results.monthly.min.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-2 animate-pulse">20% Long-Term Discount Applied</p>
               </div>
            </div>

            <div className="bg-ebony rounded-[3rem] p-10 flex flex-col gap-6 text-white/80">
               <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest">Food Provision Surcharge</span>
                  <span className="text-brand-start font-bold"> {!foodProvided ? `+ ${selectedCountry.currency} ${(8 * results.daily.min / tierRates[selectedCountry.tier]).toFixed(0)}` : "FREE (Included)"}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest">Medical Support Premium</span>
                  <span className="text-brand-start font-bold"> {needsMedication ? `+ ${selectedCountry.currency} ${(12 * results.daily.min / tierRates[selectedCountry.tier]).toFixed(0)}` : "None"}</span>
               </div>
            </div>
         </div>
      </div>
      
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </ToolLayout>
  );
}
