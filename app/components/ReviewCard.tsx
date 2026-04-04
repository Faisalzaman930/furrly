"use client";

import { Competitor } from "../data/articles";
import Link from "next/link";
import { useState } from "react";

export default function ReviewCard({ competitor, rank }: { competitor: Competitor; rank: number }) {
  const isWinner = competitor.isWinner;
  const [expanded, setExpanded] = useState(isWinner);

  return (
    <div className={`relative rounded-[2.5rem] border-2 transition-all ${
      isWinner
        ? "bg-white border-brand-start shadow-2xl shadow-brand-start/10"
        : "bg-gray-50 border-gray-100 hover:border-gray-200"
    }`}>

      {/* Winner badge */}
      {isWinner && (
        <div className="absolute -top-5 left-10 flex items-center gap-2 bg-brand-gradient text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-xl">
          🏆 Editor's Choice 2026
        </div>
      )}

      {/* Header */}
      <div className="p-8 md:p-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-black text-slate-gray/30">#{rank}</span>
              <h3 className="text-2xl font-black text-ebony uppercase tracking-tight">{competitor.name}</h3>
            </div>
            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-5 w-5 ${i < Math.floor(competitor.rating) ? "fill-brand-start" : "fill-gray-200"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-black text-ebony text-lg">{competitor.rating}</span>
              <span className="text-slate-gray text-sm">/5.0</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isWinner && (
              <Link href="/#download" className="bg-brand-gradient text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                Download Free
              </Link>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-gray font-black text-base transition-colors"
            >
              {expanded ? "−" : "+"}
            </button>
          </div>
        </div>

        {/* Short description always visible */}
        {competitor.description && (
          <div className="mt-5 text-base text-slate-gray leading-relaxed border-t border-gray-100 pt-5"
            dangerouslySetInnerHTML={{ __html: competitor.description }} />
        )}
      </div>

      {/* Expandable deep dive */}
      {expanded && (
        <div className="px-8 md:px-10 pb-10 space-y-8 border-t border-gray-100 pt-8">

          {competitor.preTestHype && (
            <div>
              <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px]">↑</span>
                The Expectations
              </h4>
              <div className="text-base leading-relaxed text-slate-gray" dangerouslySetInnerHTML={{ __html: competitor.preTestHype }} />
            </div>
          )}

          {competitor.thirtyDayReality && (
            <div>
              <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px]">30</span>
                The 30-Day Reality
              </h4>
              <div className="text-base leading-relaxed text-slate-gray" dangerouslySetInnerHTML={{ __html: competitor.thirtyDayReality }} />
            </div>
          )}

          {competitor.costAnalysis && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px]">$</span>
                Cost Analysis
              </h4>
              <div className="text-base leading-relaxed text-slate-gray" dangerouslySetInnerHTML={{ __html: competitor.costAnalysis }} />
            </div>
          )}

          {/* Pros / Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h4 className="text-emerald-700 font-black uppercase tracking-widest text-[10px] mb-4">What Works</h4>
              <ul className="space-y-2.5">
                {competitor.pros.map((pro, i) => (
                  <li key={i} className="flex gap-3 text-emerald-900 text-sm leading-relaxed">
                    <span className="text-emerald-500 font-black text-base mt-0.5 flex-shrink-0">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h4 className="text-red-700 font-black uppercase tracking-widest text-[10px] mb-4">Watch Out For</h4>
              <ul className="space-y-2.5">
                {competitor.cons.map((con, i) => (
                  <li key={i} className="flex gap-3 text-red-900 text-sm leading-relaxed">
                    <span className="text-red-500 font-black text-base mt-0.5 flex-shrink-0">−</span>
                    {con}
                  </li>
                ))}
                {competitor.cons.length === 0 && (
                  <li className="text-red-900/50 italic text-sm">No significant drawbacks found in our testing period.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
