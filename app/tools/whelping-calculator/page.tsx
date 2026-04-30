"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function daysFromNow(d: Date): number {
  return Math.round((d.getTime() - Date.now()) / 86400000);
}

const DOG_MILESTONES = [
  { day: 0,  icon: "💞", label: "Mating / Conception",      detail: "Day 1 of gestation. Fertilisation occurs within 24–48 hours of mating." },
  { day: 22, icon: "💓", label: "Heartbeats detectable",    detail: "Ultrasound can detect fetal heartbeats from around day 22–25." },
  { day: 28, icon: "🩺", label: "First vet check",          detail: "Ultrasound confirms pregnancy and estimates litter size (days 28–35)." },
  { day: 45, icon: "🦴", label: "X-ray possible",           detail: "Puppy skeletons are now visible on X-ray for accurate count." },
  { day: 55, icon: "🏠", label: "Set up whelping box",      detail: "Prepare a quiet, warm whelping box. Introduce the mother so she adjusts." },
  { day: 58, icon: "🌡️", label: "Start temperature checks", detail: "Take rectal temperature twice daily. A drop below 37.8 °C (100 °F) signals labour within 24 hours." },
  { day: 60, icon: "🍼", label: "Labour window opens",      detail: "Normal delivery range begins. Have your vet's emergency number ready." },
  { day: 63, icon: "🐾", label: "Expected whelping date",   detail: "63 days is the average. Healthy range is 58–68 days from mating." },
  { day: 68, icon: "⚠️",  label: "Overdue — call your vet", detail: "If no labour by day 68, contact your vet immediately." },
];

const CAT_MILESTONES = [
  { day: 0,  icon: "💞", label: "Mating / Conception",      detail: "Cats are induced ovulators — ovulation occurs 24–48 hours after mating." },
  { day: 21, icon: "💓", label: "Heartbeats detectable",    detail: "Ultrasound can detect kitten heartbeats from around day 21." },
  { day: 28, icon: "🩺", label: "First vet check",          detail: "Confirm pregnancy by ultrasound (days 21–35)." },
  { day: 45, icon: "🦴", label: "X-ray possible",           detail: "Kitten skeletal structures visible on X-ray from day 45." },
  { day: 58, icon: "🏠", label: "Prepare kittening box",    detail: "Set up a warm, quiet box in a private area." },
  { day: 63, icon: "🌡️", label: "Labour window opens",      detail: "Average gestation is 65 days (range 63–69). Monitor closely." },
  { day: 65, icon: "🐾", label: "Expected kittening date",  detail: "Most cats give birth on or around day 65." },
  { day: 70, icon: "⚠️",  label: "Overdue — call your vet", detail: "If no signs of labour by day 70, seek veterinary advice." },
];

export default function WhelpingCalculator() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [matingDate, setMatingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return d.toISOString().slice(0, 10);
  });

  const milestones = species === "dog" ? DOG_MILESTONES : CAT_MILESTONES;
  const dueDay     = species === "dog" ? 63 : 65;

  const dates = useMemo(() => {
    if (!matingDate) return null;
    const base = new Date(matingDate);
    return milestones.map(m => ({
      ...m,
      date: addDays(base, m.day),
    }));
  }, [matingDate, milestones]);

  const dueDate  = dates ? dates.find(m => m.day === dueDay)?.date : null;
  const overdue  = dates ? dates.find(m => m.label.startsWith("Overdue"))?.date : null;
  const today    = new Date();

  return (
    <ToolLayout
      subtitle="Whelping Calculator"
      title="Dog & Cat Pregnancy Due Date Calculator"
      description="Enter the mating date to calculate the expected whelping date and all key pregnancy milestones for dogs and cats."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Inputs */}
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Species</label>
            <div className="flex gap-4">
              {(["dog", "cat"] as const).map(s => (
                <button key={s} onClick={() => setSpecies(s)}
                  className={`flex-1 py-5 rounded-3xl border-4 transition-all flex flex-col items-center gap-2 ${species === s ? "bg-ebony text-white border-ebony shadow-xl" : "bg-gray-50 text-slate-gray border-transparent hover:bg-white hover:border-gray-100 hover:shadow-md"}`}>
                  <span className="text-4xl">{s === "dog" ? "🐕" : "🐈"}</span>
                  <span className="font-black uppercase tracking-tight text-xs">{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-4">Mating Date</label>
            <input
              type="date"
              value={matingDate}
              onChange={e => setMatingDate(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-ebony font-bold text-base focus:outline-none focus:border-brand-start transition-colors"
            />
            <p className="text-xs text-slate-gray/60 mt-2">If mating occurred on multiple days, use the first date for the earliest estimate.</p>
          </div>

          {dueDate && (
            <div className="bg-ebony rounded-[2rem] p-7 text-center">
              <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-2">Expected Due Date</p>
              <p className="text-3xl font-black text-white leading-snug">{formatDate(dueDate)}</p>
              <p className="text-white/50 text-sm mt-1">
                {daysFromNow(dueDate) > 0
                  ? `In ${daysFromNow(dueDate)} days`
                  : daysFromNow(dueDate) === 0
                  ? "Today!"
                  : `${Math.abs(daysFromNow(dueDate))} days ago`}
              </p>
              {overdue && (
                <p className="text-white/40 text-xs mt-2">Overdue if not by {formatDate(overdue)}</p>
              )}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-black text-amber-900 text-sm mb-2">Important note</p>
            <p className="text-xs text-amber-800 leading-relaxed">
              These dates are estimates. Actual whelping can vary by ±3–5 days. Always work with a veterinarian throughout the pregnancy for health monitoring and emergency preparation.
            </p>
          </div>
        </div>

        {/* Timeline */}
        {dates && (
          <div>
            <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-5">Pregnancy Timeline</p>
            <div className="space-y-3">
              {dates.map((m, i) => {
                const isPast   = m.date < today;
                const isToday  = daysFromNow(m.date) === 0;
                const isDue    = m.day === dueDay;
                const isAlert  = m.label.startsWith("Overdue");
                return (
                  <div key={i} className={`rounded-2xl p-4 border transition-all ${isDue ? "bg-ebony border-ebony" : isAlert ? "bg-red-50 border-red-200" : isPast ? "bg-gray-50 border-gray-100 opacity-70" : "bg-white border-gray-100"}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-none mt-0.5">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={`font-black text-sm ${isDue ? "text-white" : isAlert ? "text-red-800" : "text-ebony"}`}>
                            {m.label}
                          </p>
                          {isToday && <span className="text-[9px] font-black bg-brand-start text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Today</span>}
                          {isPast && !isToday && <span className="text-[9px] font-bold text-slate-gray/50 uppercase tracking-widest">Done</span>}
                        </div>
                        <p className={`text-[11px] mt-0.5 font-bold ${isDue ? "text-white/70" : "text-slate-gray"}`}>
                          {formatDate(m.date)} · Day {m.day}
                        </p>
                        <p className={`text-xs mt-1 leading-relaxed ${isDue ? "text-white/60" : isAlert ? "text-red-700" : "text-slate-gray"}`}>
                          {m.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
