"use client";
import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const questions = [
  { q: "How often does your pet visit the vet?", options: [{ t: "Annually or more", s: 3 }, { t: "Every 2 years", s: 2 }, { t: "Only when sick", s: 1 }, { t: "Never", s: 0 }] },
  { q: "Is your pet vaccinated and up to date?", options: [{ t: "Yes, fully", s: 3 }, { t: "Partially", s: 1 }, { t: "No", s: 0 }] },
  { q: "How would you describe their diet?", options: [{ t: "Balanced, vet-approved food", s: 3 }, { t: "Commercial food, not premium", s: 2 }, { t: "Mostly table scraps", s: 0 }, { t: "I'm not sure", s: 1 }] },
  { q: "How much exercise does your pet get daily?", options: [{ t: "30+ mins structured activity", s: 3 }, { t: "Short walks or play sessions", s: 2 }, { t: "Minimal, mostly indoors", s: 1 }, { t: "None", s: 0 }] },
  { q: "Is your pet spayed or neutered?", options: [{ t: "Yes", s: 3 }, { t: "No, but planned", s: 1 }, { t: "No", s: 0 }] },
  { q: "How is your pet's dental health?", options: [{ t: "Regular brushing or dental treats", s: 3 }, { t: "Occasional treats only", s: 2 }, { t: "I never think about it", s: 0 }] },
  { q: "Are they on flea, tick, or worm treatment?", options: [{ t: "Yes, year-round", s: 3 }, { t: "Seasonally", s: 2 }, { t: "No", s: 0 }] },
  { q: "Does your pet have an ID tag or microchip?", options: [{ t: "Both", s: 3 }, { t: "Just one", s: 1 }, { t: "Neither", s: 0 }] },
];

const results = [
  { min: 19, max: 24, label: "Superstar Pet Parent 🏆", desc: "You're doing an amazing job. Your pet is lucky to have such a dedicated guardian. Keep up the excellent preventative care!", color: "bg-emerald-500" },
  { min: 13, max: 18, label: "Caring & Committed 🌟", desc: "You clearly love your pet. A few tweaks—like more consistent vet visits or dental care—could take you to the next level.", color: "bg-sky-500" },
  { min: 7, max: 12, label: "Room to Grow 🌱", desc: "You care, but some key areas need attention. Consider scheduling a vet check-up and reviewing your pet's diet and preventatives.", color: "bg-amber-500" },
  { min: 0, max: 6, label: "Let's Level Up 🐾", desc: "Your pet needs more consistent care. Start small: book a vet visit, check their vaccinations, and explore preventative treatments.", color: "bg-red-500" },
];

export default function PetOwnerQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function answer(s: number) {
    const newScore = score + s;
    if (step < questions.length - 1) { setScore(newScore); setStep(step + 1); }
    else { setScore(newScore); setDone(true); }
  }

  const outcome = done ? results.find(r => score >= r.min && score <= r.max) : null;

  return (
    <ToolLayout subtitle="Fun Self-Assessment" title="Are You a Good Pet Owner?" description="8 quick questions to rate your pet parenthood. Shareable results — be honest!"  illustration={<ToolIllustration type="quiz" />}
    >
      <div className="max-w-xl mx-auto">
        {!done ? (
          <>
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
                <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">{Math.round((step / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full"><div className="h-full bg-brand-start rounded-full transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} /></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-ebony uppercase tracking-tight leading-tight mb-10" key={step}>{questions[step].q}</h2>
            <div className="grid grid-cols-1 gap-4" key={`opts-${step}`}>
              {questions[step].options.map(o => (
                <button key={o.t} onClick={() => answer(o.s)}
                  className="w-full text-left p-7 rounded-3xl border-2 border-gray-100 bg-gray-50 hover:bg-white hover:border-brand-start hover:shadow-xl transition-all group font-bold text-ebony group-hover:text-brand-start">
                  {o.t}
                </button>
              ))}
            </div>
          </>
        ) : outcome ? (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <div className="bg-ebony rounded-[4rem] p-12 md:p-16 relative overflow-hidden mb-8">
              <div className="text-7xl mb-6">{outcome.label.slice(-2)}</div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">{outcome.label.slice(0, -2)}</h2>
              <p className="text-white/70 font-medium">{outcome.desc}</p>
              <div className={`mt-8 inline-block px-8 py-3 ${outcome.color} rounded-full text-white text-xs font-black uppercase tracking-widest`}>Score: {score} / 24</div>
            </div>
            <button onClick={() => { setStep(0); setScore(0); setDone(false); }} className="text-xs font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors">↺ Retake Quiz</button>
          </div>
        ) : null}
      </div>
    </ToolLayout>
  );
}
