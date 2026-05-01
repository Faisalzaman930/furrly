import React from "react";
import Link from "next/link";
import Hero from "./Hero";
import { ALL_TOOLS } from "./RelatedTools";

interface ToolLayoutProps {
  title: string;
  description: string;
  subtitle: string;
  children: React.ReactNode;
  illustration?: React.ReactNode;
  relatedToolSlugs?: string[];
  relatedArticles?: { slug: string; title: string; category: string; emoji: string }[];
}

// Per-tool related articles: curated map of tool slug → relevant resource articles
const TOOL_ARTICLES: Record<string, { slug: string; title: string; category: string; emoji: string }[]> = {
  "calorie-calculator": [
    { slug: "how-to-read-pet-food-labels", title: "How to Read a Pet Food Label", category: "Expert Guide", emoji: "🥫" },
    { slug: "how-to-choose-pet-food", title: "How to Choose the Right Pet Food", category: "How-To", emoji: "🛒" },
    { slug: "complete-guide-to-pet-nutrition", title: "Complete Guide to Pet Nutrition", category: "Pillar Guide", emoji: "🥗" },
  ],
  "water-calculator": [
    { slug: "why-is-my-dog-drinking-so-much-water", title: "Why Is My Dog Drinking So Much Water?", category: "Symptom Guide", emoji: "💧" },
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
  ],
  "exercise-calculator": [
    { slug: "complete-guide-to-dog-training", title: "Complete Guide to Dog Training", category: "Pillar Guide", emoji: "🎓" },
    { slug: "how-to-stop-dog-pulling-on-leash", title: "How to Stop Your Dog Pulling on the Lead", category: "How-To", emoji: "🦮" },
    { slug: "how-to-manage-leash-reactive-dog", title: "How to Manage a Leash-Reactive Dog", category: "How-To", emoji: "😤" },
  ],
  "puppy-weight": [
    { slug: "complete-guide-to-puppy-care", title: "Complete Guide to Puppy Care", category: "Pillar Guide", emoji: "🐶" },
    { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
    { slug: "how-to-crate-train-a-puppy", title: "How to Crate Train a Puppy", category: "How-To", emoji: "🏡" },
  ],
  "whelping-calculator": [
    { slug: "complete-guide-to-puppy-care", title: "Complete Guide to Puppy Care", category: "Pillar Guide", emoji: "🐶" },
    { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
  ],
  "symptom-checker": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
    { slug: "why-is-my-dog-not-eating", title: "Why Is My Dog Not Eating?", category: "Symptom Guide", emoji: "🍽️" },
    { slug: "why-is-my-dog-limping", title: "Why Is My Dog Limping?", category: "Symptom Guide", emoji: "🦵" },
  ],
  "toxic-food": [
    { slug: "complete-guide-to-pet-nutrition", title: "Complete Guide to Pet Nutrition", category: "Pillar Guide", emoji: "🥗" },
    { slug: "how-to-read-pet-food-labels", title: "How to Read a Pet Food Label", category: "Expert Guide", emoji: "🥫" },
    { slug: "how-to-choose-pet-food", title: "How to Choose the Right Pet Food", category: "How-To", emoji: "🛒" },
  ],
  "vaccine-tracker": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
    { slug: "what-is-kennel-cough", title: "What Is Kennel Cough?", category: "Definition", emoji: "🤧" },
    { slug: "what-is-parvo-in-dogs", title: "What Is Parvo in Dogs?", category: "Definition", emoji: "⚠️" },
  ],
  "breed-compare": [
    { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
    { slug: "introducing-pets-to-each-other", title: "Introducing Dogs & Cats to Each Other", category: "Expert Guide", emoji: "🐾" },
  ],
  "best-dog-quiz": [
    { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Guide", category: "Expert Guide", emoji: "🏠" },
    { slug: "complete-guide-to-puppy-care", title: "Complete Guide to Puppy Care", category: "Pillar Guide", emoji: "🐶" },
  ],
  "best-cat-quiz": [
    { slug: "introducing-pets-to-each-other", title: "Introducing a New Pet to the House", category: "Expert Guide", emoji: "🐾" },
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
  ],
  "feeding-calculator": [
    { slug: "how-to-read-pet-food-labels", title: "How to Read a Pet Food Label", category: "Expert Guide", emoji: "🥫" },
    { slug: "complete-guide-to-pet-nutrition", title: "Complete Guide to Pet Nutrition", category: "Pillar Guide", emoji: "🥗" },
    { slug: "how-to-switch-dog-food-safely", title: "How to Switch Dog Food Safely", category: "How-To", emoji: "🔄" },
  ],
  "pet-bmi": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
    { slug: "how-to-read-pet-food-labels", title: "How to Read a Pet Food Label", category: "Expert Guide", emoji: "🥫" },
  ],
  "insurance-cost": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
    { slug: "senior-pet-care-guide", title: "Senior Pet Care Guide", category: "Expert Guide", emoji: "👴" },
  ],
  "age-calculator": [
    { slug: "senior-pet-care-guide", title: "Senior Pet Care Guide", category: "Expert Guide", emoji: "👴" },
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
  ],
  "pet-sitter-cost": [
    { slug: "logistics-and-heartbreak-foster-parent-manual", title: "The Pet Foster Parent Manual", category: "Expert Guide", emoji: "🏠" },
  ],
  "packing-checklist": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
  ],
  "first-aid-quiz": [
    { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", category: "Pillar Guide", emoji: "❤️" },
    { slug: "dog-breathing-fast-at-rest", title: "Dog Breathing Fast at Rest", category: "Symptom Guide", emoji: "😮‍💨" },
  ],
};

// Per-tool sibling tools to cross-link
const TOOL_SIBLINGS: Record<string, string[]> = {
  "calorie-calculator":  ["water-calculator", "exercise-calculator", "feeding-calculator", "pet-bmi"],
  "water-calculator":    ["calorie-calculator", "exercise-calculator", "feeding-calculator", "symptom-checker"],
  "exercise-calculator": ["calorie-calculator", "water-calculator", "puppy-weight", "pet-bmi"],
  "puppy-weight":        ["exercise-calculator", "calorie-calculator", "whelping-calculator", "vaccine-tracker"],
  "whelping-calculator": ["puppy-weight", "calorie-calculator", "vaccine-tracker"],
  "feeding-calculator":  ["calorie-calculator", "water-calculator", "toxic-food", "pet-bmi"],
  "symptom-checker":     ["toxic-food", "first-aid-quiz", "pet-health-quiz", "vaccine-tracker"],
  "toxic-food":          ["symptom-checker", "feeding-calculator", "calorie-calculator", "first-aid-quiz"],
  "vaccine-tracker":     ["symptom-checker", "age-calculator", "insurance-cost", "pet-health-quiz"],
  "pet-bmi":             ["calorie-calculator", "exercise-calculator", "feeding-calculator", "water-calculator"],
  "breed-compare":       ["best-dog-quiz", "best-cat-quiz", "exercise-calculator", "calorie-calculator"],
  "best-dog-quiz":       ["breed-compare", "best-cat-quiz", "exercise-calculator", "puppy-weight"],
  "best-cat-quiz":       ["breed-compare", "best-dog-quiz", "calorie-calculator", "age-calculator"],
  "age-calculator":      ["senior-pet-care-guide" as never, "insurance-cost", "pet-health-quiz", "vaccine-tracker"],
  "insurance-cost":      ["age-calculator", "vaccine-tracker", "symptom-checker", "pet-health-quiz"],
  "pet-health-quiz":     ["symptom-checker", "vaccine-tracker", "insurance-cost", "first-aid-quiz"],
  "pet-sitter-cost":     ["sitting-comparison", "packing-checklist"],
  "sitting-comparison":  ["pet-sitter-cost", "packing-checklist"],
  "packing-checklist":   ["pet-sitter-cost", "sitting-comparison", "vaccine-tracker"],
  "first-aid-quiz":      ["symptom-checker", "toxic-food", "pet-health-quiz", "vaccine-tracker"],
  "name-generator":      ["best-dog-quiz", "best-cat-quiz", "breed-compare"],
  "birthday-countdown":  ["age-calculator", "best-dog-quiz", "name-generator"],
  "photo-tips":          ["name-generator", "best-dog-quiz", "breed-compare"],
  "pet-owner-quiz":      ["pet-health-quiz", "first-aid-quiz", "age-calculator"],
};

const ToolLayout = ({ title, description, subtitle, children, illustration, relatedToolSlugs, relatedArticles }: ToolLayoutProps) => {
  return (
    <div className="bg-white min-h-screen">
      <Hero
        subtitle={`Free Web Tool: ${subtitle}`}
        title={title}
        description={description}
        showDownloads={false}
        illustration={illustration}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10 pb-24">
        <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 p-8 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-brand-start transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Hub
            </Link>
            <span className="px-4 py-1 rounded-full bg-brand-start/5 text-brand-start text-[10px] font-black uppercase tracking-widest border border-brand-start/10">
              Free Community Project
            </span>
          </div>

          {children}
        </div>

        {/* ── Related Tools ─────────────────────────────────────────── */}
        {relatedToolSlugs && relatedToolSlugs.length > 0 && (() => {
          const siblings = relatedToolSlugs
            .map(s => ALL_TOOLS.find(t => t.slug === s))
            .filter(Boolean) as typeof ALL_TOOLS;
          return siblings.length > 0 ? (
            <section className="mt-16">
              <div className="flex items-end justify-between mb-6 gap-4">
                <div>
                  <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">More Free Tools</p>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight">Related Calculators</h2>
                </div>
                <Link href="/tools" className="flex-shrink-0 text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-brand-start transition-colors border-b border-brand-start pb-0.5">
                  All Tools →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {siblings.map(tool => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`}
                    className="group bg-white border border-gray-100 rounded-3xl p-5 hover:border-brand-start/30 hover:shadow-lg transition-all flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{tool.emoji}</span>
                    <div>
                      <p className="font-black text-ebony text-sm group-hover:text-brand-start transition-colors leading-snug mb-1">{tool.label}</p>
                      <p className="text-xs text-slate-gray leading-relaxed">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null;
        })()}

        {/* ── Related Articles ──────────────────────────────────────── */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between mb-6 gap-4">
              <div>
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">Go Deeper</p>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight">Related Guides</h2>
              </div>
              <Link href="/resources" className="flex-shrink-0 text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-brand-start transition-colors border-b border-brand-start pb-0.5">
                All Resources →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map(a => (
                <Link key={a.slug} href={`/resources/${a.slug}`}
                  className="group bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:bg-white hover:border-brand-start/20 hover:shadow-lg transition-all flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0">{a.emoji}</span>
                  <div>
                    <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">{a.category}</p>
                    <p className="font-black text-ebony text-sm group-hover:text-brand-start transition-colors leading-snug">{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Templates CTA ─────────────────────────────────────────── */}
        <section className="mt-12 bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">Free Downloads</p>
            <h3 className="text-lg font-black text-ebony uppercase tracking-tight">Need a pet document?</h3>
            <p className="text-sm text-slate-gray mt-1">Free contracts, health records, vaccination forms & more — no signup needed.</p>
          </div>
          <Link href="/templates" className="flex-none inline-flex items-center gap-2 bg-ebony text-white font-black uppercase tracking-widest px-6 py-3.5 rounded-2xl hover:opacity-90 transition-opacity text-xs whitespace-nowrap">
            Browse Templates →
          </Link>
        </section>

        {/* ── App CTA ───────────────────────────────────────────────── */}
        <div className="mt-12 bg-ebony rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-20 text-white/5 text-9xl font-black select-none pointer-events-none">APP</div>
          <h3 className="text-sm font-black text-brand-start uppercase tracking-widest mb-6">The End-to-End Solution</h3>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none max-w-3xl mx-auto">
            Go Beyond The Browser. <br />Download the Furrly App.
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto mb-12 text-lg">
            While our web tools provide quick insights, the full Furrly experience — including localised playmate matching, paperless adoption, and emergency GPS recovery — is only available in our all-in-one mobile app.
          </p>
          <Link href="/#download" className="inline-block bg-brand-gradient text-white font-black py-6 px-12 rounded-[2.5rem] shadow-xl hover:scale-105 active:scale-95 transition-all text-lg uppercase tracking-widest">
            Get the Full Experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export { TOOL_ARTICLES, TOOL_SIBLINGS };
export default ToolLayout;
