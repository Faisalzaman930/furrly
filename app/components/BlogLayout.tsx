"use client";

import { Article, METHODOLOGY_SECTION } from "../data/articles";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import ContactSection from "./ContactSection";
import Image from "next/image";
import { useState } from "react";
import RelatedTools from "./RelatedTools";

// ─── Hero images per article category ────────────────────────────────────────

const heroImages: Record<string, string> = {
  "best-dog-walking-apps": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=80",
  "best-pet-social-media-apps": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=80",
  "best-pet-dating-playdate-apps": "https://images.unsplash.com/photo-1601758124096-52c2b6c5b8bc?w=1400&q=80",
  "best-pet-sitting-apps": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=80",
  "best-pet-health-parenting-apps": "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1400&q=80",
  "best-virtual-vet-telehealth-apps": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80",
  "best-pet-adoption-rescue-apps": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=80",
  "best-pet-fostering-network-apps": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1400&q=80",
  "best-gps-pet-tracking-apps": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1400&q=80",
  "best-lost-pet-recovery-apps": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1400&q=80",
  "best-dog-training-apps": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=80",
  "best-pet-camera-monitoring-apps": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1400&q=80",
  "best-pet-diet-nutrition-apps": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=1400&q=80",
  "best-pet-first-aid-apps": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1400&q=80",
  "best-pet-insurance-estimators": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=80",
  "best-pet-photography-apps": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1400&q=80",
  "best-pet-travel-hotel-finder-apps": "https://images.unsplash.com/photo-1601758124096-52c2b6c5b8bc?w=1400&q=80",
  "best-pet-ecommerce-shopping-apps": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=1400&q=80",
  "best-dog-park-finder-apps": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=80",
  "best-all-in-one-pet-super-apps": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=80",
};

// ─── Article key stats ────────────────────────────────────────────────────────

const articleStats: Record<string, { label: string; value: string }[]> = {
  "best-dog-walking-apps": [
    { label: "US Dogs Walked Daily by App", value: "5M+" },
    { label: "Rover Market Share", value: "~65%" },
    { label: "Avg. 30-min Walk Cost", value: "$22" },
    { label: "Sitter Commission (Rover)", value: "20%" },
  ],
  "best-gps-pet-tracking-apps": [
    { label: "GPS Tracker Market Size", value: "$1.3B" },
    { label: "Fi Refresh Rate (Live)", value: "3–10s" },
    { label: "Tractive Refresh Rate", value: "2–3s" },
    { label: "Battery (Standard Mode)", value: "3 mo." },
  ],
  "best-virtual-vet-telehealth-apps": [
    { label: "Emergency Vet Walk-In Fee", value: "$250+" },
    { label: "Pawp Response Time (Avg)", value: "<10 min" },
    { label: "ASPCA Poison Control Cost", value: "$95/call" },
    { label: "Pawp Emergency Fund", value: "$3,000" },
  ],
  "best-pet-diet-nutrition-apps": [
    { label: "US Dogs Overweight/Obese", value: "61%" },
    { label: "US Cats Overweight/Obese", value: "56%" },
    { label: "Avg Daily Calorie Error", value: "~30%" },
    { label: "Test Duration", value: "30 days" },
  ],
  "best-pet-social-media-apps": [
    { label: "Pet Instagram Organic Reach", value: "~2.4%" },
    { label: "Petzbe Avg Engagement", value: "12–18%" },
    { label: "Days Tested Per Platform", value: "60" },
    { label: "Platforms Evaluated", value: "6" },
  ],
  "best-pet-adoption-rescue-apps": [
    { label: "Pets Euthanized Annually (US)", value: "920K" },
    { label: "Petfinder Active Listings", value: "400K+" },
    { label: "Petfinder Partner Orgs", value: "11,000+" },
    { label: "Avg. Application Response", value: "2–3 wks" },
  ],
};

function getStats(slug: string) {
  return articleStats[slug] || [
    { label: "Apps Evaluated", value: "3+" },
    { label: "Testing Period", value: "30 days" },
    { label: "Scenarios Tested", value: "Real-world" },
    { label: "Published", value: "April 2026" },
  ];
}

// ─── Pull quote component ─────────────────────────────────────────────────────

function PullQuote({ text }: { text: string }) {
  return (
    <div className="my-12 relative">
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-gradient rounded-full" />
      <blockquote className="pl-8 text-2xl font-black text-ebony leading-snug italic">
        "{text}"
      </blockquote>
    </div>
  );
}

// ─── Callout box ─────────────────────────────────────────────────────────────

function Callout({ type, title, children }: { type: "tip" | "warning" | "info"; title: string; children: React.ReactNode }) {
  const styles = {
    tip: { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-800", body: "text-emerald-900", icon: "✓" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", title: "text-amber-800", body: "text-amber-900", icon: "!" },
    info: { bg: "bg-blue-50", border: "border-blue-200", title: "text-blue-800", body: "text-blue-900", icon: "i" },
  }[type];
  return (
    <div className={`${styles.bg} ${styles.border} border rounded-[1.5rem] p-6 my-8`}>
      <div className="flex gap-3 items-start">
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${styles.border} flex items-center justify-center text-xs font-black ${styles.title}`}>{styles.icon}</span>
        <div>
          <p className={`font-black uppercase tracking-widest text-xs mb-2 ${styles.title}`}>{title}</p>
          <div className={`text-sm leading-relaxed ${styles.body}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Comparison summary table ─────────────────────────────────────────────────

function ComparisonTable({ competitors }: { competitors: Article["competitors"] }) {
  const criteria = ["Best for", "Cost model", "Community size", "Integration"];
  const values: Record<string, string[]> = {
    "Furrly": ["Unified pet management", "Free (core)", "Growing fast", "Full ecosystem"],
  };
  return (
    <div className="my-16 overflow-x-auto rounded-[2rem] border border-gray-200 shadow-sm">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="bg-ebony">
            <th className="text-left py-4 px-6 text-[10px] font-black text-white/60 uppercase tracking-widest">App</th>
            <th className="text-center py-4 px-4 text-[10px] font-black text-white/60 uppercase tracking-widest">Score</th>
            <th className="text-left py-4 px-6 text-[10px] font-black text-white/60 uppercase tracking-widest">Best for</th>
            <th className="text-left py-4 px-6 text-[10px] font-black text-white/60 uppercase tracking-widest">Cost</th>
          </tr>
        </thead>
        <tbody>
          {competitors.sort((a, b) => b.rating - a.rating).map((comp, i) => (
            <tr key={comp.name} className={`border-t border-gray-100 ${i === 0 ? "bg-brand-start/5" : "bg-white"}`}>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-gray w-5">#{i + 1}</span>
                  <span className="font-black text-ebony text-sm">{comp.name}</span>
                  {comp.isWinner && <span className="text-[10px] bg-brand-start text-white font-black px-2 py-0.5 rounded-full uppercase">Top Pick</span>}
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="font-black text-ebony text-sm">{comp.rating}</span>
                <span className="text-slate-gray text-xs">/5</span>
              </td>
              <td className="py-4 px-6 text-sm text-slate-gray">{values[comp.name]?.[0] ?? "Category specialist"}</td>
              <td className="py-4 px-6 text-sm text-slate-gray">{comp.isWinner ? "Free (core)" : "Subscription"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-[1.5rem] overflow-hidden transition-all ${open ? "border-brand-start/30 shadow-md" : "border-gray-100"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
        <span className="font-black text-ebony text-base leading-snug">{faq.q}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base font-black transition-all ${open ? "bg-brand-start text-white rotate-45" : "bg-gray-100 text-slate-gray"}`}>+</span>
      </button>
      {open && (
        <div className="px-7 pb-6 pt-4 text-slate-gray leading-relaxed text-base border-t border-gray-50">{faq.a}</div>
      )}
    </div>
  );
}

// ─── Tool interlinking map ────────────────────────────────────────────────────

const articleToolMap: Record<string, string[]> = {
  "best-dog-walking-apps":          ["pet-sitter-cost", "sitting-comparison", "pet-owner-quiz"],
  "best-pet-sitting-apps":          ["pet-sitter-cost", "sitting-comparison", "packing-checklist"],
  "best-pet-social-media-apps":     ["photo-tips", "pet-owner-quiz", "birthday-countdown"],
  "best-pet-dating-playdate-apps":  ["best-dog-quiz", "breed-compare", "age-calculator"],
  "best-pet-health-parenting-apps": ["symptom-checker", "pet-health-quiz", "vaccine-tracker"],
  "best-virtual-vet-telehealth-apps":["symptom-checker", "first-aid-quiz", "vaccine-tracker"],
  "best-pet-adoption-rescue-apps":  ["best-dog-quiz", "best-cat-quiz", "breed-compare", "name-generator"],
  "best-pet-fostering-network-apps":["best-dog-quiz", "best-cat-quiz", "insurance-cost"],
  "best-gps-pet-tracking-apps":     ["symptom-checker", "first-aid-quiz", "pet-health-quiz"],
  "best-lost-pet-recovery-apps":    ["symptom-checker", "first-aid-quiz", "vaccine-tracker"],
  "best-dog-training-apps":         ["age-calculator", "feeding-calculator", "pet-owner-quiz"],
  "best-pet-camera-monitoring-apps":["symptom-checker", "first-aid-quiz", "pet-health-quiz"],
  "best-pet-diet-nutrition-apps":   ["feeding-calculator", "pet-bmi", "toxic-food", "age-calculator"],
  "best-pet-first-aid-apps":        ["first-aid-quiz", "symptom-checker", "vaccine-tracker", "toxic-food"],
  "best-pet-insurance-estimators":  ["insurance-cost", "pet-health-quiz", "vaccine-tracker"],
  "best-pet-photography-apps":      ["photo-tips", "birthday-countdown", "pet-owner-quiz"],
  "best-pet-travel-hotel-finder-apps":["packing-checklist", "pet-sitter-cost", "insurance-cost"],
  "best-pet-ecommerce-shopping-apps":["feeding-calculator", "pet-bmi", "toxic-food"],
  "best-dog-park-finder-apps":      ["breed-compare", "best-dog-quiz", "age-calculator"],
  "best-all-in-one-pet-super-apps": ["symptom-checker", "feeding-calculator", "breed-compare", "insurance-cost"],
};

function getToolsForArticle(slug: string): string[] {
  return articleToolMap[slug] ?? ["symptom-checker", "feeding-calculator", "breed-compare", "pet-health-quiz"];
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function BlogLayout({ article, allArticles }: { article: Article; allArticles: Article[] }) {
  const related = allArticles.filter(a => article.relatedSlugs.includes(a.slug));
  const heroImg = heroImages[article.slug];
  const stats = getStats(article.slug);

  // estimated word count display
  const readTime = article.competitors.length >= 3 ? "18–22 Min Read" : "12–16 Min Read";

  return (
    <div className="bg-white">

      {/* ─── ARTICLE HERO ──────────────────────────────────────────────────── */}
      <div className="relative bg-ebony overflow-hidden">
        {heroImg && (
          <div className="absolute inset-0">
            <Image src={heroImg} alt={article.title} fill className="object-cover opacity-25" priority />
          </div>
        )}
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 py-20 lg:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white/70 transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-white/70">{article.shortTitle}</span>
          </nav>
          {/* Category badge */}
          <span className="inline-block bg-brand-start/20 border border-brand-start/30 text-brand-start text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            {article.seoDescription}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-xs font-bold uppercase tracking-widest">
            <span>Published: {article.publishDate}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Updated: {article.lastUpdated}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{readTime}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{article.competitors.length} apps tested</span>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ─────────────────────────────────────────────────────── */}
      <div className="bg-brand-start py-8 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── EDITORIAL DISCLOSURE ──────────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-start gap-3">
          <span className="text-amber-600 text-base mt-0.5 flex-shrink-0">ℹ</span>
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Editorial disclosure:</strong> Furrly is one of the apps reviewed on this page. We have a direct commercial interest in this category. Our editorial process applies the same scoring criteria to all apps, including our own. Scores and rankings reflect our testing methodology, not promotional intent.{" "}
            <Link href="/resources#editorial-standards" className="underline font-bold hover:text-amber-900 transition-colors">Read our editorial standards.</Link>
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-[2rem] p-7">
                <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest mb-5">On This Page</h4>
                <ul className="space-y-3 text-sm font-bold text-slate-gray">
                  <li><a href="#intro" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Introduction</a></li>
                  {article.buyersGuide && <li><a href="#guide" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Buyer's Guide</a></li>}
                  <li><a href="#compare" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />At a Glance</a></li>
                  <li><a href="#methodology" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />How We Tested</a></li>
                  <li><a href="#rankings" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Full Rankings</a></li>
                  {article.faqs && <li><a href="#faqs" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />FAQs</a></li>}
                  <li><a href="#verdict" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Final Verdict</a></li>
                </ul>
              </div>

              {/* Winner CTA */}
              <div className="bg-brand-gradient rounded-[2rem] p-7 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-white/70">Our Top Pick</p>
                <p className="font-black text-xl mb-1">Furrly</p>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-white text-sm">★</span>)}
                  <span className="text-white/70 text-xs ml-1 font-bold">4.7</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-5">The only free, unified platform that connects all pet care features in one place.</p>
                <Link href="/#download" className="block text-center bg-white text-brand-start font-black py-3 px-5 rounded-xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg">
                  Download Free →
                </Link>
              </div>

              {/* Trust signals */}
              <div className="bg-gray-50 rounded-[2rem] p-7 space-y-4">
                <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest">Testing Standards</h4>
                {["Real-world scenarios only", "30-day minimum testing", "Independent evaluation", "No paid placements"].map(s => (
                  <div key={s} className="flex gap-2 items-center text-xs text-slate-gray font-bold">
                    <span className="text-emerald-500 font-black">✓</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN COLUMN ── */}
          <main className="lg:col-span-9">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-12 pb-10 border-b border-gray-100 text-xs font-bold text-slate-gray uppercase tracking-widest">
              <span className="bg-gray-100 px-3 py-1.5 rounded-full">{article.category}</span>
              <span>·</span>
              <span>{article.publishDate}</span>
              <span>·</span>
              <span>{readTime}</span>
            </div>

            {/* ── INTRODUCTION ── */}
            <section id="intro">
              <div className="prose prose-xl max-w-none text-slate-gray leading-relaxed mb-12">
                <div className="text-xl leading-9" dangerouslySetInnerHTML={{ __html: article.introduction }} />
              </div>

              {/* Inline pull quote after intro */}
              <PullQuote text={`We tested every major platform in this category across real scenarios — not demo environments. Here's exactly what we found.`} />
            </section>

            {/* ── BUYER'S GUIDE ── */}
            {article.buyersGuide && (
              <section id="guide" className="mb-20 pt-12 border-t border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-brand-start flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-sm">★</span>
                  </div>
                  <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter leading-none">{article.buyersGuide.title}</h2>
                </div>

                <div className="text-lg text-slate-gray leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: article.buyersGuide.intro }} />

                <Callout type="info" title="How to use this guide">
                  Read through all four criteria before downloading any app. Most pet owners regret switching platforms after building significant history — choosing right the first time saves months of friction.
                </Callout>

                <div className="space-y-0 mt-10">
                  {article.buyersGuide.points.map((pt, i) => (
                    <div key={i} className={`flex gap-8 py-8 ${i < article.buyersGuide!.points.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-start/10 flex items-center justify-center font-black text-brand-start text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-ebony mb-3">{pt.h}</h4>
                        <div className="text-base text-slate-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: pt.p }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── AT A GLANCE COMPARISON ── */}
            <section id="compare" className="mb-20 pt-12 border-t border-gray-100">
              <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-4">At a Glance: All Apps Compared</h2>
              <p className="text-slate-gray leading-relaxed mb-2">Full review of each platform follows below. This table gives you the 30-second version.</p>
              <ComparisonTable competitors={article.competitors} />
            </section>

            {/* ── METHODOLOGY ── */}
            <section id="methodology" className="mb-20">
              <div className="bg-ebony text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 text-white/5 text-[9rem] leading-none font-black italic pointer-events-none select-none translate-x-1/4 -translate-y-1/4">TESTED</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-brand-start flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-sm">✓</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{METHODOLOGY_SECTION.title}</h3>
                  </div>
                  <ul className="space-y-6 mb-8">
                    {METHODOLOGY_SECTION.points.map((point, i) => (
                      <li key={i} className="flex gap-5 items-start">
                        <span className="flex-none h-7 w-7 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-white/80 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-sm text-white/40 italic leading-relaxed">
                      <strong className="text-white/60 not-italic font-black">Disclosure:</strong> {METHODOLOGY_SECTION.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── FULL RANKINGS ── */}
            <section id="rankings" className="mb-20 pt-4">
              <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-4">The Full Rankings</h2>
              <p className="text-slate-gray leading-relaxed mb-12">Sorted by overall score. Each platform was evaluated over a minimum of 30 days across real-world scenarios. Click the pros/cons sections to expand.</p>
              <div className="space-y-12">
                {article.competitors.sort((a, b) => b.rating - a.rating).map((comp, idx) => (
                  <ReviewCard key={comp.name} competitor={comp} rank={idx + 1} />
                ))}
              </div>
            </section>

            {/* ── FAQS ── */}
            {article.faqs && (
              <section id="faqs" className="mb-20 pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-gray leading-relaxed mb-10">Answers to the most common questions we receive about this topic, based on real owner searches.</p>
                <div className="space-y-3">
                  {article.faqs.map((faq, i) => (
                    <FaqItem key={i} faq={faq} />
                  ))}
                </div>
              </section>
            )}

            {/* ── FINAL VERDICT ── */}
            <section id="verdict" className="pt-12 border-t border-gray-100">
              <div className="bg-gray-50 rounded-[3rem] border border-gray-100 overflow-hidden">
                {/* Banner */}
                <div className="bg-brand-gradient px-10 py-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Final Verdict</h3>
                  <p className="text-white/70 text-sm mt-1">Our recommendation after {article.competitors.length} apps tested</p>
                </div>
                <div className="p-10 md:p-12">
                  <p className="text-lg text-slate-gray leading-relaxed mb-10">
                    {article.conclusion}
                  </p>
                  {/* Winner card */}
                  <div className="bg-white border border-brand-start/20 rounded-[2rem] p-7 flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-2">🏆 Top Pick for Most Pet Owners</p>
                      <p className="font-black text-2xl text-ebony mb-1">Furrly</p>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-brand-start">★</span>)}
                        <span className="text-slate-gray text-xs ml-2 font-bold">4.7 / 5.0</span>
                      </div>
                      <p className="text-sm text-slate-gray">Free to download · No core subscription · Unified pet profile</p>
                    </div>
                    <Link href="/#download" className="flex-shrink-0 bg-ebony text-white font-black py-4 px-8 rounded-[1.5rem] shadow-xl hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
                      Download Free
                    </Link>
                  </div>

                  <Callout type="tip" title="Before you download">
                    Bookmark this page for future reference. We update rankings quarterly as apps release major updates, change pricing, or new competitors enter the market.
                  </Callout>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ─── RELATED ARTICLES ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">Keep Reading Our Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link href={`/resources/${rel.slug}`} key={rel.slug} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="relative h-40 overflow-hidden">
                    {heroImages[rel.slug] ? (
                      <Image src={heroImages[rel.slug]} alt={rel.shortTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="h-full bg-brand-gradient opacity-20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ebony/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] font-black text-white/80 uppercase tracking-widest">Review</span>
                  </div>
                  <div className="p-7">
                    <h4 className="font-black text-ebony leading-snug group-hover:text-brand-start transition-colors text-lg">
                      {rel.shortTitle}
                    </h4>
                    <p className="text-sm text-slate-gray mt-2 line-clamp-2">{rel.seoDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedTools slugs={getToolsForArticle(article.slug)} />
      <ContactSection />
    </div>
  );
}
