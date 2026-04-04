"use client";

import { useState } from "react";
import Link from "next/link";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const questions = [
  {
    id: "activity",
    question: "What's your lifestyle like?",
    subtitle: "Be honest—your dog will match your energy.",
    options: [
      { label: "Couch Potato", desc: "Relaxed days, short walks", value: "low", icon: "🛋️" },
      { label: "Weekend Warrior", desc: "Active but not obsessive", value: "medium", icon: "🚴" },
      { label: "Always Moving", desc: "Runs, hikes, outdoors every day", value: "high", icon: "🏃" },
    ],
  },
  {
    id: "space",
    question: "Where do you live?",
    subtitle: "Space matters. A great Dane in a studio is a story.",
    options: [
      { label: "Small Apartment", desc: "< 600 sq ft studio or 1-bed", value: "small", icon: "🏙️" },
      { label: "Average Home", desc: "House with a small yard", value: "medium", icon: "🏠" },
      { label: "Large Property", desc: "Big yard or rural land", value: "large", icon: "🌄" },
    ],
  },
  {
    id: "grooming",
    question: "How much grooming time can you commit?",
    subtitle: "Some dogs need salons. Others clean themselves.",
    options: [
      { label: "Minimal", desc: "Quick brush once a week", value: "low", icon: "✂️" },
      { label: "Moderate", desc: "Regular brushing & occasional groom", value: "medium", icon: "🪮" },
      { label: "Enthusiast", desc: "Daily grooming, I love it", value: "high", icon: "💅" },
    ],
  },
  {
    id: "experience",
    question: "Have you owned a dog before?",
    subtitle: "Some breeds need confident handlers.",
    options: [
      { label: "First-Time Owner", desc: "New to dogs entirely", value: "first", icon: "🌱" },
      { label: "Some Experience", desc: "Had a dog growing up or recently", value: "some", icon: "🐾" },
      { label: "Experienced", desc: "I've trained dogs confidently", value: "expert", icon: "🎓" },
    ],
  },
  {
    id: "family",
    question: "What's your household like?",
    subtitle: "Kids, other pets, or just you?",
    options: [
      { label: "Solo or Couple", desc: "Just me or my partner", value: "solo", icon: "👤" },
      { label: "Family with Kids", desc: "Young children at home", value: "family", icon: "👨‍👩‍👧" },
      { label: "Multi-Pet Home", desc: "Other dogs or cats present", value: "multipet", icon: "🐕‍🦺" },
    ],
  },
  {
    id: "allergies",
    question: "Any allergy concerns?",
    subtitle: "Hypoallergenic breeds shed less dander.",
    options: [
      { label: "No Concerns", desc: "No known allergies", value: "none", icon: "✅" },
      { label: "Mild Sensitivity", desc: "Prefer low-shedding breeds", value: "mild", icon: "🤧" },
      { label: "Strict Requirement", desc: "Need hypoallergenic only", value: "strict", icon: "🚨" },
    ],
  },
  {
    id: "purpose",
    question: "What's most important to you?",
    subtitle: "What role will this dog play in your life?",
    options: [
      { label: "Loyal Companion", desc: "Cuddles, presence, emotional bond", value: "companion", icon: "❤️" },
      { label: "Active Partner", desc: "Adventures, exercise buddy", value: "active", icon: "⛺" },
      { label: "Home Guardian", desc: "Protective, alert, watchdog", value: "guard", icon: "🔒" },
    ],
  },
];

interface Answers {
  [key: string]: string;
}

interface Breed {
  name: string;
  desc: string;
  traits: string[];
  emoji: string;
  match: (a: Answers) => boolean;
  adoptionTip: string;
}

const breedProfiles: Breed[] = [
  {
    name: "Golden Retriever",
    desc: "The ultimate family dog. Friendly, patient, and endlessly loyal.",
    traits: ["Family-Friendly", "Active", "Easy to Train"],
    emoji: "🦮",
    match: (a) => a.activity !== "low" && a.family === "family",
    adoptionTip: "Golden Retrievers are frequently in rescues. Download Furrly to find one near you.",
  },
  {
    name: "French Bulldog",
    desc: "The perfect apartment companion. Low energy, affectionate, and hilarious.",
    traits: ["Low Energy", "Apartment-Friendly", "Minimal Grooming"],
    emoji: "🐾",
    match: (a) => a.space === "small" && a.activity === "low",
    adoptionTip: "Frenchies need love, not space. Find an adoptable one on Furrly.",
  },
  {
    name: "Poodle (Standard)",
    desc: "Highly intelligent, hypoallergenic, and adaptable to any home size.",
    traits: ["Hypoallergenic", "Smart", "Versatile"],
    emoji: "🐩",
    match: (a) => a.allergies !== "none" || a.experience === "expert",
    adoptionTip: "Poodles are surprisingly common in rescues. Check the Furrly Adoption feed.",
  },
  {
    name: "Border Collie",
    desc: "The genius athlete. Needs mental and physical stimulation daily.",
    traits: ["Highly Active", "Intelligent", "Needs Space"],
    emoji: "🐕",
    match: (a) => a.activity === "high" && a.experience !== "first",
    adoptionTip: "Border Collies need jobs. Find a local rescue via Furrly.",
  },
  {
    name: "Shih Tzu",
    desc: "Regal, calm, and perfect for relaxed households. Low-maintenance royalty.",
    traits: ["Apartment-Friendly", "Low Energy", "Senior-Friendly"],
    emoji: "👑",
    match: (a) => a.activity === "low" && a.space === "small" && a.family === "solo",
    adoptionTip: "Shih Tzus are often surrendered to shelters. Adopt via Furrly.",
  },
  {
    name: "Labrador Retriever",
    desc: "America's most popular dog for a reason. All-around perfect.",
    traits: ["Friendly", "Trainable", "Great with Kids"],
    emoji: "🐶",
    match: (a) => a.experience === "first" && a.family === "family",
    adoptionTip: "Labs are always in shelters looking for forever homes on Furrly.",
  },
  {
    name: "German Shepherd",
    desc: "Loyal protector. Intelligent, confident, and fearlessly devoted.",
    traits: ["Guard Dog", "Loyal", "Experienced Owner Needed"],
    emoji: "🐺",
    match: (a) => a.purpose === "guard" && a.experience === "expert",
    adoptionTip: "GSDs are often retired police dogs needing loving homes. Find on Furrly.",
  },
  {
    name: "Beagle",
    desc: "Curious, energetic, and endlessly playful. A family staple.",
    traits: ["Family-Friendly", "Curious", "Vocal"],
    emoji: "🐕",
    match: (a) => a.family === "family" && a.activity === "medium",
    adoptionTip: "Beagles are one of the most common rescue breeds. Find yours on Furrly.",
  },
  {
    name: "Chihuahua",
    desc: "Big attitude in a tiny package. Perfect for small spaces.",
    traits: ["Tiny", "Feisty", "Long Lifespan"],
    emoji: "🐕",
    match: (a) => a.space === "small" && a.family === "solo",
    adoptionTip: "Chihuahuas are sadly overrepresented in shelters. Adopt via Furrly.",
  },
  {
    name: "Australian Shepherd",
    desc: "The herding genius. Thrives with active owners who have space.",
    traits: ["Highly Active", "Smart", "Needs a Job"],
    emoji: "🐕",
    match: (a) => a.activity === "high" && a.space === "large",
    adoptionTip: "Aussies deserve active homes. Find one nearby on Furrly.",
  },
  {
    name: "Cavalier King Charles Spaniel",
    desc: "Gentle, affectionate, and effortlessly elegant. Loves cuddles above all.",
    traits: ["Cuddly", "Gentle", "Apartment-Friendly"],
    emoji: "🫶",
    match: (a) => a.purpose === "companion" && a.experience === "first",
    adoptionTip: "Cavaliers are gentle souls looking for sofas and humans on Furrly.",
  },
  {
    name: "Bernese Mountain Dog",
    desc: "A gentle giant. Calm, loving, and majestic. Needs space to match their presence.",
    traits: ["Gentle Giant", "Family-Friendly", "Space Needed"],
    emoji: "🏔️",
    match: (a) => a.space === "large" && a.family === "family",
    adoptionTip: "Berners need big yards. Find a rescue on Furrly.",
  },
  {
    name: "Dachshund",
    desc: "The sausage dog. Bold, curious, and surprisingly brave for their size.",
    traits: ["Small but Brave", "Apartment-Friendly", "Moderate Exercise"],
    emoji: "🌭",
    match: (a) => a.activity === "medium" && a.space === "small",
    adoptionTip: "Dachshunds have dedicated rescues. Search on Furrly.",
  },
  {
    name: "Rottweiler",
    desc: "Confident guardian. Needs firm handling but rewards with fierce loyalty.",
    traits: ["Guardian", "Loyal", "Experienced Owner"],
    emoji: "🛡️",
    match: (a) => a.purpose === "guard" && a.space === "large",
    adoptionTip: "Rottweilers need patient and experienced owners. Find one on Furrly.",
  },
  {
    name: "Maltese",
    desc: "Hypoallergenic lap dog. Loves attention and is surprisingly fearless.",
    traits: ["Hypoallergenic", "Tiny", "Affectionate"],
    emoji: "🤍",
    match: (a) => a.allergies !== "none" && a.space === "small",
    adoptionTip: "Maltese dogs are often in breed-specific rescues. Check Furrly.",
  },
];

function getBreedResult(answers: Answers): Breed {
  const matches = breedProfiles.filter(b => b.match(answers));
  return matches.length > 0 ? matches[0] : breedProfiles[5]; // Default: Labrador
}

export default function BestDogBreedQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Breed | null>(null);

  const currentQ = questions[step];
  const progress = ((step) / questions.length) * 100;

  function handleAnswer(value: string) {
    const updatedAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(updatedAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(getBreedResult(updatedAnswers));
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
      title="Best Dog Breed For Me"
      description="7 smart questions to match you with your ideal canine companion. Powered by veterinary breed psychology—not guesswork."
      illustration={<ToolIllustration type="quiz" />}
    >
      {!result ? (
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
              <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">{Math.round(progress)}% Complete</span>
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
                  <h3 className="text-xl font-black text-ebony group-hover:text-brand-start transition-colors uppercase tracking-tight">{opt.label}</h3>
                  <p className="text-slate-gray text-sm mt-1">{opt.desc}</p>
                </div>
                <span className="ml-auto text-gray-200 group-hover:text-brand-start font-black text-2xl transition-all group-hover:translate-x-2">→</span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-8 text-[10px] font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors flex items-center gap-2">
              ← Back
            </button>
          )}
        </div>
      ) : (
        /* Result Card */
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-12">
            <span className="px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">Your Perfect Match</span>
          </div>

          <div className="bg-ebony rounded-[4rem] p-12 md:p-16 text-center relative overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] font-black select-none">🐕</div>
            <div className="relative">
              <div className="text-8xl mb-8">{result.emoji}</div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">{result.name}</h2>
              <p className="text-white/70 text-lg font-medium max-w-md mx-auto mb-10">{result.desc}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {result.traits.map(t => (
                  <span key={t} className="px-5 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Adoption CTA */}
          <div className="bg-brand-start rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Find a {result.name} Near You</h3>
              <p className="text-white/80 text-sm">{result.adoptionTip}</p>
            </div>
            <Link href="/adoption" className="bg-white text-brand-start font-black py-4 px-8 rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest whitespace-nowrap shadow-xl">
              Browse on Furrly
            </Link>
          </div>

          <div className="text-center">
            <button onClick={restart} className="text-xs font-black text-slate-gray uppercase tracking-widest hover:text-brand-start transition-colors">
              ↺ Retake Quiz
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
