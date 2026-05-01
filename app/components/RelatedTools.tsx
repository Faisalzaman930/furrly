import Link from "next/link";

interface Tool {
  slug: string;
  label: string;
  emoji: string;
  desc: string;
}

export const ALL_TOOLS: Tool[] = [
  { slug: "symptom-checker",    label: "Symptom Checker",       emoji: "🩺", desc: "Triage your pet's symptoms instantly" },
  { slug: "age-calculator",     label: "Pet Age Calculator",    emoji: "📅", desc: "Convert your pet's age to human years" },
  { slug: "breed-compare",      label: "Breed Compare",         emoji: "⚖️",  desc: "Compare any two breeds side by side" },
  { slug: "calorie-calculator", label: "Calorie Calculator",    emoji: "🔥", desc: "Calculate your pet's daily calorie needs" },
  { slug: "water-calculator",   label: "Water Intake",          emoji: "💧", desc: "How much water should your pet drink?" },
  { slug: "exercise-calculator",label: "Exercise Calculator",   emoji: "🏃", desc: "Daily exercise needs by breed & age" },
  { slug: "puppy-weight",       label: "Puppy Weight Predictor",emoji: "⚖️",  desc: "Estimate your puppy's adult weight" },
  { slug: "whelping-calculator",label: "Whelping Calculator",   emoji: "🐣", desc: "Calculate expected whelping due date" },
  { slug: "feeding-calculator", label: "Feeding Calculator",    emoji: "🥣", desc: "Get the right daily food portion" },
  { slug: "pet-bmi",            label: "Pet BMI Check",         emoji: "📊", desc: "Check your pet's body condition score" },
  { slug: "vaccine-tracker",    label: "Vaccine Tracker",       emoji: "💉", desc: "Track vaccination schedules" },
  { slug: "toxic-food",         label: "Toxic Food Checker",    emoji: "🚫", desc: "Check if a food is safe for your pet" },
  { slug: "best-dog-quiz",      label: "Best Dog Breed Quiz",   emoji: "🐕", desc: "Find your perfect dog breed match" },
  { slug: "best-cat-quiz",      label: "Best Cat Breed Quiz",   emoji: "🐈", desc: "Find your perfect cat breed match" },
  { slug: "insurance-cost",     label: "Insurance Estimator",   emoji: "🛡️",  desc: "Estimate your monthly pet insurance cost" },
  { slug: "pet-health-quiz",    label: "Pet Health Quiz",       emoji: "❤️",  desc: "Rate your pet's overall wellness" },
  { slug: "packing-checklist",  label: "Travel Checklist",      emoji: "🧳", desc: "Never forget an essential when travelling" },
  { slug: "photo-tips",         label: "Pet Photo Tips",        emoji: "📸", desc: "Get personalised pet photography tips" },
  { slug: "name-generator",     label: "Name Generator",        emoji: "✨", desc: "Find the perfect name for your new pet" },
  { slug: "pet-sitter-cost",    label: "Sitter Cost Calc",      emoji: "💰", desc: "Estimate pet sitting costs by location" },
  { slug: "sitting-comparison", label: "Sitter Comparison",     emoji: "📋", desc: "Compare Rover, Wag & alternatives" },
  { slug: "first-aid-quiz",     label: "First Aid Quiz",        emoji: "🆘", desc: "Test your emergency preparedness" },
  { slug: "birthday-countdown", label: "Birthday Countdown",    emoji: "🎂", desc: "Count down to your pet's birthday" },
  { slug: "pet-owner-quiz",     label: "Pet Owner Quiz",        emoji: "🏆", desc: "Rate yourself as a pet parent" },
];

export default function RelatedTools({ slugs }: { slugs: string[] }) {
  const tools = slugs
    .map(s => ALL_TOOLS.find(t => t.slug === s))
    .filter(Boolean) as Tool[];

  if (tools.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">Free Interactive Tools</p>
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight">Try These Helpful Tools</h2>
          </div>
          <Link
            href="/tools"
            className="flex-shrink-0 text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-brand-start transition-colors border-b border-brand-start pb-0.5"
          >
            All Tools →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-brand-start/30 hover:shadow-lg transition-all flex gap-4 items-start"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{tool.emoji}</span>
              <div>
                <p className="font-black text-ebony text-sm group-hover:text-brand-start transition-colors leading-snug mb-1">
                  {tool.label}
                </p>
                <p className="text-xs text-slate-gray leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
