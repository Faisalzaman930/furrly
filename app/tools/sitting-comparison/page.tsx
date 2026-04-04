"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

export default function PetSittingComparison() {
  const platforms = [
    { name: "Rover", price: "$$$", platform: "iOS / Android", rating: "4.8", feature: "Dog Walking & Sitting", bestFor: "Local Variety" },
    { name: "Wag!", price: "$$", platform: "iOS / Android", rating: "4.6", feature: "On-demand Walking", bestFor: "Speed" },
    { name: "TrustedHousesitters", price: "$$$$", platform: "Web / iOS", rating: "4.7", feature: "Free Sits (Membership)", bestFor: "Long Travel" },
    { name: "Meowtel", price: "$$", platform: "iOS / Android", rating: "4.9", feature: "Strictly Cats", bestFor: "Cat Owners" },
  ];

  const [filter, setFilter] = useState("");

  const filtered = platforms.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.bestFor.toLowerCase().includes(filter.toLowerCase()));

  return (
    <ToolLayout 
      subtitle="Comparison Guide"
      title="Pet Sitting App Comparison"
      description="Compare the top platforms for pet sitting and dog walking. Filter by price, availability, and specialty."
      illustration={<ToolIllustration type="calculator" />}
    >
      <div className="space-y-12">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <input 
               type="text" 
               placeholder="Search by platform or specialty..."
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="w-full md:max-w-md bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-brand-start outline-none transition-all font-bold placeholder:text-gray-300 shadow-inner"
            />
            <div className="text-xs font-black text-slate-gray uppercase tracking-widest bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
               Comparing {filtered.length} Platforms
            </div>
         </div>

         <div className="relative overflow-hidden rounded-[4rem] border border-gray-100 shadow-2xl bg-white animate-in fade-in duration-700">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50 border-b-2 border-gray-100">
                        <th className="px-10 py-10 text-xs font-black text-ebony uppercase tracking-widest">Platform</th>
                        <th className="px-10 py-10 text-xs font-black text-ebony uppercase tracking-widest">Price Tier</th>
                        <th className="px-10 py-10 text-xs font-black text-ebony uppercase tracking-widest">Availability</th>
                        <th className="px-10 py-10 text-xs font-black text-ebony uppercase tracking-widest text-center">Rating</th>
                        <th className="px-10 py-10 text-xs font-black text-ebony uppercase tracking-widest">Best For</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filtered.map((item, idx) => (
                        <tr key={idx} className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 group`}>
                           <td className="px-10 py-10">
                              <span className="text-xl font-black text-ebony group-hover:text-brand-start transition-colors uppercase tracking-tight">{item.name}</span>
                              <p className="text-xs text-slate-gray uppercase font-bold tracking-widest mt-1 opacity-60">{item.feature}</p>
                           </td>
                           <td className="px-10 py-10">
                              <span className="text-lg font-black text-brand-start">{item.price}</span>
                           </td>
                           <td className="px-10 py-10">
                              <span className="text-sm font-bold text-slate-gray uppercase tracking-widest">{item.platform}</span>
                           </td>
                           <td className="px-10 py-10 text-center">
                              <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100">★ {item.rating}</span>
                           </td>
                           <td className="px-10 py-10">
                              <span className="text-sm font-black text-ebony opacity-80 uppercase tracking-tight italic">"{item.bestFor}"</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         
         <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 p-8 text-brand-start/5 text-8xl font-black select-none pointer-events-none group-hover:scale-110 transition-transform">ℹ️</div>
            <p className="text-sm font-black text-slate-gray uppercase tracking-widest max-w-2xl mx-auto leading-relaxed relative">
               Pricing tiers indicate relative cost: $ (Free/Low Membership) to $$$$ (High-End Premium). Rankings are based on aggregated community feedback and platform reviews.
            </p>
         </div>
      </div>
    </ToolLayout>
  );
}
