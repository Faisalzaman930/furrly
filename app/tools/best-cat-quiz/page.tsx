"use client";

import { useState } from "react";
import Link from "next/link";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const questions = [
  {
    id: "energy",
    question: "What energy level suits you?",
    subtitle: "Cats vary wildly—from sprinters to professional sleepers.",
    options: [
      { label: "Calm & Serene", desc: "Prefers lounging and gentle play", value: "low", icon: "😴" },
      { label: "Playful Balance", desc: "Active bursts, then long naps", value: "medium", icon: "🐾" },
      { label: "High Energy", desc: "Constantly moving, climbing, exploring", value: "high", icon: "⚡" },
    ],
  },
  {
    id: "affection",
    question: "How much affection do you want?",
    subtitle: "Some cats are velcro, others are independent royalty.",
    options: [
      { label: "Independent", desc: "Happy alone, minimal lap time", value: "independent", icon: "🏰" },
      { label: "Social", desc: "Friendly but not clingy", value: "social", icon: "🤝" },
      { label: "Velcro Cat", desc: "Follows you everywhere, loves cuddles", value: "velcro", icon: "❤️" },
    ],
  },
  {
    id: "space",
    question: "Where will your cat live?",
    subtitle: "Indoor, outdoor access, or somewhere in between.",
    options: [
      { label: "Small Apartment", desc: "Mostly indoor, limited space", value: "apartment", icon: "🏙️" },
      { label: "Average Home", desc: "Indoor with some outdoor access", value: "home", icon: "🏠" },
      { label: "Large Property", desc: "Lots of outdoor freedom", value: "outdoor", icon: "🌿" },
    ],
  },
  {
    id: "grooming",
    question: "How much grooming are you up for?",
    subtitle: "Long-haired cats need daily attention. Short-haired are low maintenance.",
    options: [
      { label: "Minimal", desc: "Quick weekly brush, that's it", value: "low", icon: "✂️" },
      { label: "Moderate", desc: "A few times per week", value: "medium", icon: "🪮" },
      { label: "I Love It", desc: "Daily grooming is relaxing for me", value: "high", icon: "💅" },
    ],
  },
  {
    id: "noise",
    question: "How vocal can your cat be?",
    subtitle: "Some breeds are famously chatty. Others barely whisper.",
    options: [
      { label: "Silent Type", desc: "I want a quiet companion", value: "quiet", icon: "🤫" },
      { label: "Occasional Chirps", desc: "Some meowing is fine", value: "moderate", icon: "🗣️" },
      { label: "Bring the Drama", desc: "I love a conversational cat", value: "vocal", icon: "🎭" },
    ],
  },
  {
    id: "household",
    question: "What's your household like?",
    subtitle: "Some cats thrive with kids and dogs. Others prefer a quieter life.",
    options: [
      { label: "Solo or Couple", desc: "Just me or my partner", value: "solo", icon: "👤" },
      { label: "Family with Kids", desc: "Young children at home", value: "family", icon: "👨‍👩‍👧" },
      { label: "Other Pets", desc: "Dogs or other cats present", value: "multipet", icon: "🐕" },
    ],
  },
  {
    id: "allergies",
    question: "Any allergy concerns?",
    subtitle: "Hypoallergenic breeds produce less Fel d 1 protein.",
    options: [
      { label: "No Concerns", desc: "No known cat allergies", value: "none", icon: "✅" },
      { label: "Mild Sensitivity", desc: "Prefer lower-allergen breeds", value: "mild", icon: "🤧" },
      { label: "Strict Requirement", desc: "Need hypoallergenic only", value: "strict", icon: "🚨" },
    ],
  },
];

interface Answers {
  [key: string]: string;
}

interface CatBreed {
  name: string;
  desc: string;
  traits: string[];
  emoji: string;
  match: (a: Answers) => boolean;
  tip: string;
}

const catBreeds: CatBreed[] = [
  {
    name: "Ragdoll",
    desc: "The ultimate lap cat. Goes limp when held, endlessly affectionate and calm.",
    traits: ["Extremely Gentle", "Low Energy", "Great with Kids"],
    emoji: "🫶",
    match: (a) => a.affection === "velcro" && a.energy !== "high",
    tip: "Ragdolls are gentle giants often surrendered by families moving abroad. Find one on Furrly.",
  },
  {
    name: "Maine Coon",
    desc: "The gentle giant of cats. Dog-like personality, playful and fiercely loyal.",
    traits: ["Dog-Like", "Playful", "Large Breed"],
    emoji: "🦁",
    match: (a) => a.energy === "medium" && a.household === "family",
    tip: "Maine Coons are the most people-friendly cats. Adopt yours via Furrly.",
  },
  {
    name: "Siamese",
    desc: "Elegantly dramatic. One of the most vocal and social breeds ever.",
    traits: ["Highly Vocal", "Social", "Bond with One Owner"],
    emoji: "👑",
    match: (a) => a.noise === "vocal" && a.affection !== "independent",
    tip: "Siamese cats bond deeply with their humans. Find a Siamese rescue on Furrly.",
  },
  {
    name: "Bengal",
    desc: "Mini leopard. Athletic, curious, and needs constant mental stimulation.",
    traits: ["Very Active", "Intelligent", "Loves Water"],
    emoji: "🐆",
    match: (a) => a.energy === "high" && a.space !== "apartment",
    tip: "Bengals need space and enrichment. Find a Bengal rescue near you on Furrly.",
  },
  {
    name: "British Shorthair",
    desc: "Calm, dignified, and low-maintenance. The perfect apartment companion.",
    traits: ["Quiet", "Independent", "Low Grooming"],
    emoji: "🎩",
    match: (a) => a.energy === "low" && a.noise === "quiet" && a.space === "apartment",
    tip: "British Shorthairs are popular rescues. Check the Furrly adoption feed.",
  },
  {
    name: "Persian",
    desc: "Regal and serene. Loves luxury, calm environments, and daily grooming.",
    traits: ["Calm", "Needs Daily Grooming", "Quiet"],
    emoji: "🌸",
    match: (a) => a.grooming === "high" && a.energy === "low",
    tip: "Persians are often surrendered to shelters. Find your Persian on Furrly.",
  },
  {
    name: "Sphynx",
    desc: "Hairless, warm, and wildly affectionate. No shedding, but needs warmth.",
    traits: ["Hypoallergenic", "Velcro Cat", "No Shedding"],
    emoji: "🫥",
    match: (a) => a.allergies !== "none" && a.affection === "velcro",
    tip: "Sphynx cats are surprisingly common in rescues. Search on Furrly.",
  },
  {
    name: "Scottish Fold",
    desc: "Owlish looks, gentle nature. Loves interactive play and curious environments.",
    traits: ["Quiet", "Gentle", "Apartment-Friendly"],
    emoji: "🦉",
    match: (a) => a.noise === "quiet" && a.household === "solo",
    tip: "Scottish Folds need attentive owners. Find yours on Furrly.",
  },
  {
    name: "Abyssinian",
    desc: "Agile, athletic, and eternally curious. Loves heights, toys, and activity.",
    traits: ["High Energy", "Curious", "Loves to Climb"],
    emoji: "🏃",
    match: (a) => a.energy === "high" && a.affection === "social",
    tip: "Abyssinians are rare in shelters—act fast when one appears on Furrly.",
  },
  {
    name: "Burmese",
    desc: "The social butterfly of cats. Loves everyone—dogs, kids, strangers.",
    traits: ["Extremely Social", "Playful", "People-Oriented"],
    emoji: "🤗",
    match: (a) => a.household === "multipet" && a.affection !== "independent",
    tip: "Burmese cats thrive in busy households. Find one on Furrly.",
  },
  {
    name: "Norwegian Forest Cat",
    desc: "Built for the outdoors. Thick coat, adventurous spirit, independent nature.",
    traits: ["Outdoor-Friendly", "Independent", "Hardy"],
    emoji: "🌲",
    match: (a) => a.space === "outdoor" && a.affection === "independent",
    tip: "Norwegian Forest Cats love outdoor homes. Search local rescues on Furrly.",
  },
  {
    name: "Devon Rex",
    desc: "Mischievous, pixie-like, and hypoallergenic. Loves to be warm and close.",
    traits: ["Hypoallergenic", "Playful", "Low Shedding"],
    emoji: "🧚",
    match: (a) => a.allergies !== "none" && a.energy === "medium",
    tip: "Devon Rex cats are quirky and rare—find one on Furrly.",
  },
  {
    name: "Tonkinese",
    desc: "The perfect middle ground: social like a Siamese, gentle like a Burmese.",
    traits: ["Moderate Vocal", "Friendly", "Playful"],
    emoji: "⚖️",
    match: (a) => a.noise === "moderate" && a.energy === "medium",
    tip: "Tonkinese cats are wonderful family pets. Find an adoptable one on Furrly.",
  },
  {
    name: "Russian Blue",
    desc: "Reserved with strangers, deeply devoted to their person. Quiet and elegant.",
    traits: ["Quiet", "Loyal", "Hypoallergenic-ish"],
    emoji: "💙",
    match: (a) => a.household === "solo" && a.noise === "quiet",
    tip: "Russian Blues bond intensely with one person. Adopt yours via Furrly.",
  },
  {
    name: "Turkish Angora",
    desc: "Lively, intelligent, and strikingly beautiful. Loves attention and play.",
    traits: ["Active", "Sociable", "Long Coat"],
    emoji: "❄️",
    match: (a) => a.energy === "high" && a.grooming !== "low",
    tip: "Turkish Angoras are rare finds in rescues—search Furrly daily.",
  },
];

function getResult(answers: Answers): CatBreed {
  const matches = catBreeds.filter(b => b.match(answers));
  return matches.length > 0 ? matches[0] : catBreeds[1]; // Default: Maine Coon
}

export default function BestCatBreedQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<CatBreed | null>(null);

  const currentQ = questions[step];
  const progress = (step / questions.length) * 100;

  function handleAnswer(value: string) {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(getResult(updated));
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  return (
    <ToolLayout
      subtitle="Free Interactive Quiz"
      title="Best Cat Breed For Me"
      description="7 smart questions to match you with your ideal feline companion. Based on temperament psychology, grooming needs, and lifestyle compatibility."
      illustration={<ToolIllustration type="quiz" />}
    >
      {!result ? (
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">
                Question {step + 1} of {questions.length}
              </span>
              <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-start rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500" key={step}>
            <h2 className="text-4xl md:text-5xl font-black text-ebony uppercase tracking-tight leading-none mb-4">
              {currentQ.question}
            </h2>
            <p className="text-slate-gray font-medium">{currentQ.subtitle}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700" key={`opts-${step}`}>
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full flex items-center gap-8 p-8 rounded-[2.5rem] border-2 border-gray-100 bg-gray-50 hover:bg-white hover:border-brand-start hover:shadow-xl transition-all group text-left"
              >
                <span className="text-4xl shrink-0">{opt.icon}</span>
                <div>
                  <h3 className="text-xl font-black text-ebony group-hover:text-brand-start transition-colors uppercase tracking-tight">
                    {opt.label}
                  </h3>
                  <p className="text-slate-gray text-sm mt-1">{opt.desc}</p>
                </div>
                <span className="ml-auto text-gray-200 group-hover:text-brand-start font-black text-2xl transition-all group-hover:translate-x-2">
                  →
                </span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-8 text-[10px] font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors flex items-center gap-2"
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-12">
            <span className="px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">
              Your Perfect Feline Match
            </span>
          </div>

          {/* Main result card */}
          <div className="bg-ebony rounded-[4rem] p-12 md:p-16 text-center relative overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] font-black select-none pointer-events-none">
              🐈
            </div>
            <div className="relative">
              <div className="text-8xl mb-8">{result.emoji}</div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                {result.name}
              </h2>
              <p className="text-white/70 text-lg font-medium max-w-md mx-auto mb-10">
                {result.desc}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {result.traits.map((t) => (
                  <span
                    key={t}
                    className="px-5 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Adoption CTA */}
          <div className="bg-brand-start rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                Find a {result.name} Near You
              </h3>
              <p className="text-white/80 text-sm">{result.tip}</p>
            </div>
            <Link
              href="/adoption"
              className="bg-white text-brand-start font-black py-4 px-8 rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest whitespace-nowrap shadow-xl"
            >
              Browse on Furrly
            </Link>
          </div>

          <div className="text-center">
            <button
              onClick={restart}
              className="text-xs font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors"
            >
              ↺ Retake Quiz
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
