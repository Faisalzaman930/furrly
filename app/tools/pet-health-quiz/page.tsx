"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const questions = [
  {
    id: "diet",
    q: "How would you describe your pet's primary diet?",
    opts: [
      { t: "High-quality, vet-recommended food", s: 10 },
      { t: "Standard commercial pet food", s: 7 },
      { t: "Home-cooked with vet guidance", s: 8 },
      { t: "Mostly table scraps and leftovers", s: 2 },
    ]
  },
  {
    id: "exercise",
    q: "How many minutes of active exercise does your pet get daily?",
    opts: [
      { t: "Over 60 minutes", s: 10 },
      { t: "30 - 60 minutes", s: 8 },
      { t: "15 - 30 minutes", s: 5 },
      { t: "Less than 15 minutes", s: 2 },
    ]
  },
  {
    id: "vet",
    q: "When was your pet's last routine wellness exam?",
    opts: [
      { t: "Within the last 6 months", s: 10 },
      { t: "6 - 12 months ago", s: 8 },
      { t: "More than a year ago", s: 4 },
      { t: "Only when they seem sick", s: 1 },
    ]
  },
  {
    id: "dental",
    q: "How often do you clean your pet's teeth (brushing or treats)?",
    opts: [
      { t: "Daily", s: 10 },
      { t: "A few times a week", s: 7 },
      { t: "Once a week", s: 4 },
      { t: "Rarely or never", s: 1 },
    ]
  },
  {
    id: "weight",
    q: "How would you describe your pet's body shape?",
    opts: [
      { t: "Ideal weight (waist visible, ribs felt)", s: 10 },
      { t: "Slightly underweight or overweight", s: 6 },
      { t: "Significantly under/overweight", s: 2 },
    ]
  },
  {
    id: "mental",
    q: "How much mental stimulation (puzzles, training, play) do they get?",
    opts: [
      { t: "Multiple sessions daily", s: 10 },
      { t: "Once daily", s: 7 },
      { t: "A few times a week", s: 4 },
      { t: "Rarely", s: 1 },
    ]
  },
  {
    id: "parasites",
    q: "Are they current on flea, tick, and worm prevention?",
    opts: [
      { t: "Yes, fully up-to-date", s: 10 },
      { t: "Mostly, missed a few months", s: 6 },
      { t: "No, they're not on preventatives", s: 1 },
    ]
  },
  {
    id: "social",
    q: "How often do they interact with other pets or people?",
    opts: [
      { t: "Daily positive interactions", s: 10 },
      { t: "Frequently but not daily", s: 7 },
      { t: "Occasionally", s: 4 },
      { t: "They're mostly isolated", s: 1 },
    ]
  }
];

const scoring = [
  { min: 70, max: 80, label: "Thriving Superstar", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", desc: "Your pet's lifestyle is excellent! You're providing everything they need for a long, healthy life." },
  { min: 50, max: 69, label: "Healthy & Happy", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200", desc: "Good job! Your pet has a solid lifestyle, but a few small improvements in diet or dental care could make a big difference." },
  { min: 30, max: 49, label: "Building Habits", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", desc: "There are some gaps in your pet's routine. Focusing on more consistent exercise and vet checkups will help get them back on track." },
  { min: 0, max: 29, label: "Needs Attention", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", desc: "Your pet's current lifestyle might be impacting their longevity. Consider consulting a vet to create a health and wellness plan." }
];

export default function PetHealthQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (step < questions.length - 1) {
      setScore(newScore);
      setStep(step + 1);
    } else {
      setScore(newScore);
      setIsFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setIsFinished(false);
  };

  const result = isFinished ? scoring.find(s => score >= s.min && score <= s.max) : null;

  return (
    <ToolLayout 
      subtitle="Wellness Audit"
      title="Pet's Lifestyle Health Quiz"
      description="Score your pet's routine across diet, exercise, and medical care to see where you excel and where to improve."
      illustration={<ToolIllustration type="quiz" />}
    >
      <div className="max-w-2xl mx-auto">
        {!isFinished ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">{Math.round((step / questions.length) * 100)}%</span>
               </div>
               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-brand-start transition-all duration-700" style={{ width: `${(step / questions.length) * 100}%` }} />
               </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-ebony uppercase tracking-tight leading-tight mb-10">{questions[step].q}</h2>
            <div className="grid grid-cols-1 gap-4">
               {questions[step].opts.map((o, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(o.s)}
                    className="w-full text-left p-6 md:p-8 rounded-[2.5rem] border-2 border-transparent bg-gray-50 hover:bg-white hover:border-brand-start hover:shadow-xl transition-all group"
                  >
                    <span className="text-sm font-bold text-ebony group-hover:text-brand-start transition-colors">{o.t}</span>
                  </button>
               ))}
            </div>
          </div>
        ) : result && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <div className={`p-12 md:p-16 rounded-[4rem] border-4 ${result.bg} ${result.border} mb-10 relative overflow-hidden group`}>
               <div className="relative z-10">
                  <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border mb-8 inline-block ${result.color} ${result.border}`}>{result.label}</span>
                  <div className="text-6xl md:text-8xl font-black text-ebony tracking-tighter mb-4">{score}<span className="text-2xl text-slate-gray opacity-40">/80</span></div>
                  <p className="text-slate-gray font-medium max-w-sm mx-auto mb-8">{result.desc}</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    {["Diet", "Exercise", "Vet", "Mental"].map((t) => (
                      <span key={t} className="px-4 py-1.5 rounded-full bg-white text-[10px] font-black uppercase tracking-widest border border-gray-100/50 shadow-sm">{t}</span>
                    ))}
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-8 text-black/5 text-[15rem] font-black select-none leading-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">SCORE</div>
               <div className="absolute bottom-4 right-4 text-slate-gray/30 text-xs font-black uppercase tracking-widest italic animate-pulse">Official Audit ✓</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button onClick={restart} className="text-xs font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors">↺ RETAKE AUDIT</button>
               <button className="bg-ebony text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-ebony/20">SHARE ON SOCIAL</button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
