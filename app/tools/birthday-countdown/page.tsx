"use client";
import { useState, useEffect } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

export default function BirthdayCountdown() {
  const [dob, setDob] = useState("");
  const [petName, setPetName] = useState("");
  const [result, setResult] = useState<{ daysUntil: number; age: number; nextBirthday: string } | null>(null);

  useEffect(() => {
    if (!dob) { setResult(null); return; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const birth = new Date(dob); birth.setHours(0, 0, 0, 0);
    if (isNaN(birth.getTime()) || birth > today) { setResult(null); return; }
    const age = today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
    const nextYear = today >= new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? today.getFullYear() + 1 : today.getFullYear();
    const next = new Date(nextYear, birth.getMonth(), birth.getDate());
    const diffMs = next.getTime() - today.getTime();
    const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const nextBirthday = next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    setResult({ daysUntil, age, nextBirthday });
  }, [dob]);

  const urgency = result ? (result.daysUntil === 0 ? "today" : result.daysUntil <= 7 ? "soon" : "future") : null;
  const urgencyColor = urgency === "today" ? "text-brand-start animate-pulse" : urgency === "soon" ? "text-amber-500" : "text-ebony";

  return (
    <ToolLayout subtitle="Fun Countdown Widget" title="Pet Birthday Countdown" description="Enter your pet's birthday and get a live countdown to their next big day. Share it with the world!"  illustration={<ToolIllustration type="calendar" />}
    >
      <div className="max-w-xl mx-auto">
        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3">Pet's Name</label>
            <input type="text" placeholder="e.g. Biscuit, Luna, Max..." value={petName} onChange={e => setPetName(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-3xl px-8 py-5 font-bold focus:bg-white focus:border-brand-start outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3">Date of Birth</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent rounded-3xl px-8 py-5 font-bold focus:bg-white focus:border-brand-start outline-none transition-all" />
          </div>
        </div>

        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
            <div className="bg-ebony rounded-[4rem] p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] font-black select-none pointer-events-none">🎂</div>
              <h2 className="text-2xl font-black text-white/60 uppercase tracking-widest mb-2">{petName || "Your Pet"}'s Next Birthday</h2>
              <div className={`text-8xl md:text-[9rem] font-black tracking-tighter leading-none mb-4 ${urgencyColor}`}>
                {result.daysUntil === 0 ? "🎉" : result.daysUntil}
              </div>
              {result.daysUntil > 0 && <p className="text-white/70 font-black uppercase tracking-widest text-lg">Days Away</p>}
              {result.daysUntil === 0 && <p className="text-brand-start font-black uppercase tracking-widest text-2xl animate-pulse">Happy Birthday!</p>}
              <p className="text-white/40 text-sm mt-6 font-medium">{result.nextBirthday}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
                <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-2">Current Age</p>
                <p className="text-4xl font-black text-ebony">{result.age}</p>
                <p className="text-xs text-slate-gray font-bold uppercase mt-1">{result.age === 1 ? "year" : "years"} old</p>
              </div>
              <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
                <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-2">Next Milestone</p>
                <p className="text-4xl font-black text-ebony">{result.age + 1}</p>
                <p className="text-xs text-slate-gray font-bold uppercase mt-1">years old</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
