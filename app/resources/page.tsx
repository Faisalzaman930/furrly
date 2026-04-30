"use client";

import { articles } from "../data/articles";
import { guides } from "../data/guides";
import { howToArticles } from "../data/howto";
import { symptomArticles } from "../data/symptom-articles";
import { breedArticles } from "../data/breed-articles";
import { definitionArticles } from "../data/definition-articles";
import { pillarPages } from "../data/pillars";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef, Suspense } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ResourceCard = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  type: "article" | "guide" | "how-to" | "symptom" | "breed" | "definition" | "pillar";
};

// ─── Illustrated Cover ──────────────────────────────────────────────────────────

const PALETTES = [
  { from: "#E11D48", to: "#9F1239", dot: "#fda4af", ring: "#fb7185" },
  { from: "#F97316", to: "#C2410C", dot: "#fed7aa", ring: "#fb923c" },
  { from: "#16A34A", to: "#14532D", dot: "#86efac", ring: "#4ade80" },
  { from: "#2563EB", to: "#1E3A8A", dot: "#93c5fd", ring: "#60a5fa" },
  { from: "#7C3AED", to: "#4C1D95", dot: "#c4b5fd", ring: "#a78bfa" },
  { from: "#0891B2", to: "#155E75", dot: "#67e8f9", ring: "#22d3ee" },
  { from: "#BE185D", to: "#831843", dot: "#f9a8d4", ring: "#f472b6" },
  { from: "#CA8A04", to: "#78350F", dot: "#fde68a", ring: "#fbbf24" },
];

const TYPE_ICONS: Record<string, string> = {
  "how-to":     "⚡",
  "guide":      "📖",
  "pillar":     "🗺",
  "symptom":    "🩺",
  "breed":      "🐾",
  "definition": "💡",
  "article":    "🏆",
};

function slugHash(s: string): number {
  return s.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
}

function IllustratedCover({ slug, type }: { slug: string; type: string }) {
  const h = slugHash(slug);
  const p = PALETTES[h % PALETTES.length];
  const icon = TYPE_ICONS[type] ?? "📄";
  const shapes = [
    { w: 22 + (h % 18), h_: 22 + (h % 18), top: 8 + (h % 28),        left: 6 + ((h * 3) % 32),   anim: "float-a", delay: 0,   duration: 3.5, opacity: 0.35, filled: true  },
    { w: 14 + ((h * 2) % 14), h_: 14 + ((h * 2) % 14), top: 48 + ((h * 5) % 28),  left: 64 + ((h * 7) % 26),  anim: "float-b", delay: 1.4, duration: 4.2, opacity: 0.28, filled: false },
    { w: 10 + ((h * 4) % 12), h_: 10 + ((h * 4) % 12), top: 12 + ((h * 9) % 38),  left: 72 + ((h * 11) % 20), anim: "drift-x", delay: 0.7, duration: 3.0, opacity: 0.25, filled: true  },
  ];
  const ring = { size: 44 + (h % 30), top: 40 + ((h * 13) % 30), left: 4 + ((h * 17) % 28) };
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)` }}>
      <div className="absolute rounded-full border-2 opacity-20" style={{ width: ring.size, height: ring.size, top: `${ring.top}%`, left: `${ring.left}%`, borderColor: p.dot, animation: "spin-slow 12s linear infinite" }} />
      {shapes.map((s, i) => (
        <div key={i} className={`absolute rounded-full ${s.filled ? "" : "border-2"}`} style={{ width: s.w, height: s.h_, top: `${s.top}%`, left: `${s.left}%`, background: s.filled ? p.dot : "transparent", borderColor: s.filled ? undefined : p.ring, opacity: s.opacity, animation: `${s.anim} ${s.duration}s ease-in-out ${s.delay}s infinite` }} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="select-none" style={{ fontSize: 38, filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.25))" }}>{icon}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

// ─── Type badge config ──────────────────────────────────────────────────────────

const TYPE_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  "how-to":     { label: "How-To",         bg: "bg-blue-100",    text: "text-blue-700"    },
  "guide":      { label: "Expert Guide",   bg: "bg-emerald-100", text: "text-emerald-700" },
  "pillar":     { label: "Complete Guide", bg: "bg-gray-100",    text: "text-gray-700"    },
  "symptom":    { label: "Symptom Guide",  bg: "bg-red-100",     text: "text-red-700"     },
  "breed":      { label: "Breed Guide",    bg: "bg-purple-100",  text: "text-purple-700"  },
  "definition": { label: "Glossary",       bg: "bg-teal-100",    text: "text-teal-700"    },
  "article":    { label: "App Review",     bg: "bg-amber-100",   text: "text-amber-700"   },
};

// ─── Spoke Card (all non-pillar articles) ───────────────────────────────────────

function SpokeCard({ r }: { r: ResourceCard }) {
  const badge = TYPE_BADGE[r.type] ?? { label: r.category, bg: "bg-gray-100", text: "text-slate-gray" };
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative overflow-hidden flex-none h-36">
        <IllustratedCover slug={r.slug} type={r.type} />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className={`w-fit text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
        {/* Item 3: title is the <a>, stretched to cover full card */}
        <h3 className="font-black text-ebony leading-snug text-[14px] group-hover:text-brand-start transition-colors">
          <Link href={`/resources/${r.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {r.title}
          </Link>
        </h3>
        {r.description && (
          <p
            className="text-xs text-slate-gray leading-relaxed flex-1"
            style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}
          >
            {r.description}
          </p>
        )}
        {/* Item 15: read time at bottom-right, smallest element */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-[9px] text-slate-gray/40">{r.publishDate}</span>
          <span aria-hidden="true" style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}>{r.readTime}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hub Card (pillar complete guides) ──────────────────────────────────────────

function HubCard({ r, articleCount }: { r: ResourceCard; articleCount: number }) {
  const h = slugHash(r.slug);
  const p = PALETTES[h % PALETTES.length];
  return (
    <Link
      href={`/resources/${r.slug}`}
      className="group relative overflow-hidden rounded-[2rem] flex flex-col p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-white/10 h-full"
      style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}
    >
      <span className="absolute top-4 right-4 text-5xl opacity-15 group-hover:opacity-25 transition-opacity select-none" style={{ lineHeight: 1 }}>🗺</span>
      <div className="absolute top-5 left-5 w-3 h-3 rounded-full opacity-30" style={{ background: p.dot, animation: "float-a 3.5s ease-in-out infinite" }} />
      <span className="w-fit text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white mb-3">Complete Guide</span>
      <h3 className="font-black text-white text-sm leading-snug mb-2 group-hover:text-white/90 transition-colors">{r.shortTitle}</h3>
      <p className="text-white/55 text-xs leading-relaxed flex-1 line-clamp-2">{r.description}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
        <span className="text-white/60 text-[10px] font-bold">{articleCount} articles</span>
        <span className="text-white/40 text-[10px]">{r.readTime}</span>
      </div>
    </Link>
  );
}

// ─── Cross-ref pill for duplicate articles ──────────────────────────────────────

function CrossRefPill({ r, inSection }: { r: ResourceCard; inSection: string }) {
  return (
    <Link
      href={`/resources/${r.slug}`}
      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-2 text-xs hover:border-brand-start/30 hover:bg-brand-start/5 transition-colors"
    >
      <span className="text-slate-gray/60 text-[10px]">Also in {inSection} →</span>
      <span className="font-black text-ebony text-[11px]">{r.shortTitle}</span>
    </Link>
  );
}

// ─── Contextual tool callout ────────────────────────────────────────────────────

function ToolCallout({ icon, text, href }: { icon: string; text: string; href: string }) {
  return (
    <Link
      href={href}
      className="mt-6 flex items-center gap-3 border border-brand-start/20 rounded-2xl px-5 py-3.5 bg-brand-start/[0.03] hover:bg-brand-start/[0.06] transition-colors group"
    >
      <span className="text-xl flex-none">{icon}</span>
      <span className="text-sm font-bold text-ebony group-hover:text-brand-start transition-colors flex-1">{text}</span>
      <span className="text-brand-start font-black text-sm flex-none">→</span>
    </Link>
  );
}

// ─── Quick tools strip ──────────────────────────────────────────────────────────

const QUICK_TOOLS = [
  { name: "Symptom Checker",    desc: "Is it serious? Get a triage answer fast",          href: "/tools/symptom-checker", icon: "🩺" },
  { name: "Toxic Food Checker", desc: "Can my dog eat this? Instant safety check",         href: "/tools/toxic-food",       icon: "🚫" },
  { name: "Breed Compare",      desc: "Side-by-side comparison for any two breeds",        href: "/tools/breed-compare",    icon: "⚖️" },
  { name: "Dog Age Calculator", desc: "Convert your dog's age to human years",             href: "/tools/age-calculator",   icon: "📅" },
];

function QuickToolsStrip() {
  return (
    <section className="py-10 px-6 bg-gray-50/80 border-b border-gray-100" aria-label="Quick tools">
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em] mb-5">Free tools — quick answers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_TOOLS.map(t => (
            <Link key={t.href} href={t.href} className="group bg-white border border-gray-100 rounded-2xl p-4 hover:border-brand-start/30 hover:shadow-md transition-all">
              <span className="text-2xl mb-3 block">{t.icon}</span>
              <p className="font-black text-ebony text-sm leading-snug group-hover:text-brand-start transition-colors">{t.name}</p>
              <p className="text-xs text-slate-gray mt-1 leading-relaxed line-clamp-2">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CollectionPage JSON-LD (item 6) ────────────────────────────────────────────

function CollectionPageSchema({ items }: { items: ResourceCard[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Pet Care Resource Library",
    "url": "https://furrly.co/resources",
    "publisher": { "@type": "Organization", "name": "Furrly" },
    "hasPart": items.map(item => ({
      "@type": "Article",
      "name": item.title,
      "url": `https://furrly.co/resources/${item.slug}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── Cluster config ─────────────────────────────────────────────────────────────

type ClusterDef = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  from: string;
  to: string;
  textLight: string;
  filter: (r: ResourceCard) => boolean;
};

const CLUSTERS: ClusterDef[] = [
  {
    id: "new-pet",
    label: "New Pet & Adoption",
    emoji: "🐣",
    description: "Welcoming a new dog or cat — the first weeks, rescue, and fostering",
    from: "#F97316", to: "#EA580C", textLight: "#fed7aa",
    filter: (r) =>
      r.tags.some(t => ["Puppies", "Adoption", "New Pet"].includes(t)) ||
      ["3-3-3-rule-for-rescue-dogs", "first-time-dog-owner-complete-guide",
       "complete-guide-to-puppy-care", "how-to-introduce-new-pet-to-resident-pets",
       "introducing-pets-to-each-other", "logistics-and-heartbreak-foster-parent-manual"].includes(r.slug),
  },
  {
    id: "training",
    label: "Training & Behavior",
    emoji: "🎓",
    description: "Science-backed methods from crate training to leash reactivity",
    from: "#3B82F6", to: "#1D4ED8", textLight: "#bfdbfe",
    filter: (r) =>
      r.tags.some(t => ["Training", "Behavior", "Housetraining"].includes(t)) ||
      ["complete-guide-to-dog-training", "puppy-socialization-masterclass"].includes(r.slug),
  },
  {
    id: "nutrition",
    label: "Nutrition & Feeding",
    emoji: "🥣",
    description: "Label reading, AAFCO standards, food transitions, and choosing the right diet",
    from: "#16A34A", to: "#14532D", textLight: "#86efac",
    filter: (r) =>
      r.tags.some(t => ["Nutrition", "Feeding", "Pet Food"].includes(t)) ||
      r.slug === "complete-guide-to-pet-nutrition",
  },
  {
    id: "health",
    label: "Health & Symptoms",
    emoji: "🩺",
    description: "Recognise symptoms, understand conditions, and know when to call a vet",
    from: "#E11D48", to: "#9F1239", textLight: "#fda4af",
    filter: (r) =>
      r.type === "symptom" ||
      r.slug === "complete-guide-to-pet-health" ||
      r.slug === "senior-pet-care-guide" ||
      (r.type === "definition" && r.tags.some(t =>
        ["Respiratory", "Infectious Disease", "Dog Health", "Cat Health"].includes(t)
      )),
  },
  {
    id: "breeds",
    label: "Breed Profiles",
    emoji: "🐕",
    description: "In-depth guides for every breed — traits, health risks, and care needs",
    from: "#7C3AED", to: "#4C1D95", textLight: "#c4b5fd",
    filter: (r) => r.type === "breed",
  },
  {
    id: "reviews",
    label: "App Reviews",
    emoji: "📱",
    description: "The best pet apps for walking, vets, GPS, and more — tested and ranked",
    from: "#1E293B", to: "#0F172A", textLight: "#94a3b8",
    filter: (r) => r.type === "article",
  },
];

// ─── Main hub content ────────────────────────────────────────────────────────────

function ResourcesHubContent() {
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<string>("");
  const heroRef = useRef<HTMLElement>(null);

  const allResources: ResourceCard[] = useMemo(() => [
    ...pillarPages.map(p => ({ slug: p.slug, title: p.title, shortTitle: p.shortTitle, description: p.seoDescription, category: p.category, tags: p.tags, publishDate: p.publishDate, readTime: p.readTime, type: "pillar" as const })),
    ...guides.map(g => ({ slug: g.slug, title: g.title, shortTitle: g.shortTitle, description: g.seoDescription, category: g.category, tags: g.tags, publishDate: g.publishDate, readTime: g.readTime, type: "guide" as const })),
    ...howToArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "how-to" as const })),
    ...symptomArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "symptom" as const })),
    ...breedArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "breed" as const })),
    ...definitionArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "definition" as const })),
    ...articles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: ["App Reviews"], publishDate: a.publishDate, readTime: "18 Min Read", type: "article" as const })),
  ], []);

  // Pillar article counts from source data
  const pillarCounts = useMemo(
    () => Object.fromEntries(pillarPages.map(p => [p.slug, p.clusterArticles.length])),
    []
  );

  // Item 7: first-section map for duplicate detection
  // Pillar slugs are pre-seeded as "Complete Topic Guides" (shown in hub section above clusters)
  const slugFirstSection = useMemo(() => {
    const map = new Map<string, string>();
    allResources.filter(r => r.type === "pillar").forEach(r => map.set(r.slug, "Complete Topic Guides"));
    CLUSTERS.forEach(c => {
      allResources.filter(c.filter).forEach(r => {
        if (!map.has(r.slug)) map.set(r.slug, c.label);
      });
    });
    return map;
  }, [allResources]);

  // Item 11: scrollspy — update active section highlight in "all" view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    CLUSTERS.forEach(c => {
      const el = document.getElementById(`section-${c.id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <CollectionPageSchema items={allResources} />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-white pt-20 pb-14 px-6 border-b border-gray-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-[0.04]" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#E11D48" /></svg>
          <svg className="absolute top-8 right-64 w-12 h-12 opacity-10" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#E11D48" strokeWidth="3" /></svg>
          <svg className="absolute bottom-4 left-32 w-8 h-8 opacity-10" viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="8" fill="none" stroke="#FB923C" strokeWidth="3" /></svg>
          <svg className="absolute top-12 left-1/4 w-5 h-5 opacity-[0.07]" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#E11D48" /></svg>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-gray/50 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-brand-start transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-gray">Resources</span>
          </nav>

          {/* Item 1: "Pet Care Library" demoted to decorative label, not a heading */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-brand-gradient flex items-center justify-center"><span className="text-white text-[10px]">✦</span></div>
            <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em]">Pet Care Library</p>
          </div>

          {/* Item 1: updated H1 text — keyword-first */}
          <h1 className="text-5xl md:text-[64px] font-black text-ebony leading-[0.9] tracking-tighter mb-5">
            Pet care guides,<br /><span className="text-brand-gradient">how-tos & breed profiles</span>
          </h1>

          <p className="text-base text-slate-gray leading-relaxed max-w-2xl mb-4">
            Evidence-based how-to guides, in-depth breed profiles, symptom references, and expert nutrition advice —
            everything you need to raise a healthier, happier pet.
          </p>
          <p className="text-xs text-slate-gray/60 mb-10">
            Written and reviewed by the{" "}
            <Link href="/resources#editorial-standards" className="underline hover:text-brand-start transition-colors">Furrly editorial team</Link>
            {" "}· Content reviewed for accuracy and updated regularly.
          </p>

          {/* Item 9: stat badges as anchor links */}
          <div className="flex flex-wrap gap-3">
            {[
              { n: `${howToArticles.length + guides.length}`, label: "How-to guides",    icon: "⚡", href: "#section-training" },
              { n: `${breedArticles.length}`,                 label: "Breed profiles",   icon: "🐾", href: "#section-breeds"   },
              { n: `${articles.length}`,                      label: "App reviews",      icon: "🏆", href: "#section-reviews"  },
              { n: `${symptomArticles.length + definitionArticles.length}`, label: "Health references", icon: "🩺", href: "#section-health" },
              { n: `${pillarPages.length}`,                   label: "Complete guides",  icon: "🗺", href: "#complete-guides"  },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 hover:border-gray-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <span className="text-base leading-none">{s.icon}</span>
                <div>
                  <div className="text-sm font-black text-ebony leading-none">{s.n}</div>
                  <div className="text-[9px] font-bold text-slate-gray uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ══ STICKY CLUSTER/SECTION NAV (items 10 + 11) ═══════════════════════ */}
      <nav
        className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        aria-label="Topic filter"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {/* All tab */}
            <button
              onClick={() => { setActiveCluster("all"); setActiveSection(""); }}
              aria-current={activeCluster === "all" ? "page" : undefined}
              className={`flex-none inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${activeCluster === "all" ? "bg-ebony text-white shadow-md" : "text-slate-gray hover:bg-gray-100"}`}
            >
              All
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${activeCluster === "all" ? "bg-white/20" : "bg-gray-100"}`}>
                {allResources.length}
              </span>
            </button>

            {CLUSTERS.map(c => {
              const count = allResources.filter(c.filter).length;
              // Item 11: scrollspy highlights cluster in view when "All" mode; tab click highlights when filtered
              const isActive = activeCluster === c.id || (activeCluster === "all" && activeSection === c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => { setActiveCluster(c.id); setActiveSection(""); }}
                  aria-current={isActive ? "page" : undefined}
                  style={isActive ? { background: `linear-gradient(135deg, ${c.from}, ${c.to})` } : {}}
                  className={`flex-none inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${isActive ? "text-white shadow-md" : "text-slate-gray hover:bg-gray-100"}`}
                >
                  {/* Item 2: emoji aria-hidden, label text comes after */}
                  <span aria-hidden="true">{c.emoji}</span>
                  {c.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${isActive ? "bg-white/25" : "bg-gray-100"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ══ MAIN ══════════════════════════════════════════════════════════════ */}
      <main>
        {/* Item 16: Quick tools strip — between hero and complete guides */}
        <QuickToolsStrip />

        {/* ── Complete Topic Guides (hub section — always visible) ─────────── */}
        <section id="complete-guides" className="py-14 px-6 bg-ebony" aria-labelledby="complete-guides-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-brand-start font-black text-[9px] uppercase tracking-[0.2em] mb-2">Start here</p>
              <h2 id="complete-guides-heading" className="text-2xl font-black text-white tracking-tight">Complete Topic Guides</h2>
              <p className="text-white/40 text-xs mt-1">Everything about a topic in one place</p>
            </div>
            {/* Item 13: Hub card design — larger, with article count */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allResources.filter(r => r.type === "pillar").map(r => (
                <HubCard key={r.slug} r={r} articleCount={pillarCounts[r.slug] ?? 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Item 18a: Small inline app CTA after hub, before cluster sections */}
        <div className="py-6 px-6 bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 flex-wrap">
            <p className="text-sm font-bold text-ebony">Put it into practice — track health, log walks, find vets in Furrly.</p>
            <Link
              href="/#download"
              className="flex-none bg-brand-gradient text-white font-black text-[10px] px-6 py-2.5 rounded-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-sm"
            >
              Download free →
            </Link>
          </div>
        </div>

        {/* ── Cluster sections ──────────────────────────────────────────────── */}
        {CLUSTERS.map((cluster, ci) => {
          const clusterItems = allResources.filter(cluster.filter);
          if (clusterItems.length === 0) return null;

          // Item 10: in-place CSS filter — content always in DOM, section collapsed with max-height
          const isHidden = activeCluster !== "all" && activeCluster !== cluster.id;

          // Item 7: separate first-time cards from duplicates (already shown elsewhere)
          const firstItems = clusterItems.filter(r => slugFirstSection.get(r.slug) === cluster.label);
          const dupItems   = clusterItems.filter(r => slugFirstSection.get(r.slug) !== cluster.label);

          // Item 12: show 6 per section, rest in sr-only
          const visible = firstItems.slice(0, 6);
          const overflow = firstItems.slice(6);

          return (
            <section
              key={cluster.id}
              id={`section-${cluster.id}`}
              aria-labelledby={`cluster-${cluster.id}-heading`}
              className={`${ci % 2 === 0 ? "bg-white" : "bg-gray-50/70"} border-b border-gray-100 last:border-b-0`}
              // Item 4 + 10: CSS max-height/overflow — never display:none, content always in DOM
              style={isHidden
                ? { maxHeight: 0, overflow: "hidden", paddingTop: 0, paddingBottom: 0, borderBottomWidth: 0 }
                : { paddingTop: "3.5rem", paddingBottom: "3.5rem" }
              }
            >
              <div className="px-6 mx-auto max-w-7xl">
                <div className="flex items-start justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-none shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${cluster.from}, ${cluster.to})` }}
                      aria-hidden="true"
                    >
                      {cluster.emoji}
                    </div>
                    <div>
                      {/* Item 2: emoji aria-hidden inside h2, label text leads */}
                      <h2
                        id={`cluster-${cluster.id}-heading`}
                        className="text-xl font-black text-ebony tracking-tight"
                      >
                        <span aria-hidden="true" className="mr-1.5">{cluster.emoji}</span>
                        {cluster.label}
                      </h2>
                      <p className="text-xs text-slate-gray mt-0.5">{cluster.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCluster(cluster.id)}
                    className="flex-none text-[10px] font-black text-brand-start uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1 whitespace-nowrap mt-1"
                  >
                    All {clusterItems.length} <span>→</span>
                  </button>
                </div>

                {/* Item 12: 6 visible spoke cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visible.map(r => <SpokeCard key={r.slug} r={r} />)}
                </div>

                {/* Item 7: duplicate cross-ref pills */}
                {dupItems.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {dupItems.map(r => (
                      <CrossRefPill key={r.slug} r={r} inSection={slugFirstSection.get(r.slug) ?? ""} />
                    ))}
                  </div>
                )}

                {/* Items 17: contextual tool callouts */}
                {cluster.id === "health" && (
                  <ToolCallout icon="🩺" text="Not sure if it's serious? Try the Symptom Checker" href="/tools/symptom-checker" />
                )}
                {cluster.id === "nutrition" && (
                  <ToolCallout icon="🚫" text="Can my dog eat this? Try the Toxic Food Checker" href="/tools/toxic-food" />
                )}
                {cluster.id === "breeds" && (
                  <ToolCallout icon="⚖️" text="Compare two breeds side by side" href="/tools/breed-compare" />
                )}

                {/* Items 4 + 12: articles beyond 6 always in DOM for crawlers, visually hidden */}
                {overflow.length > 0 && (
                  <div className="sr-only" aria-hidden="true">
                    {overflow.map(r => (
                      <Link key={r.slug} href={`/resources/${r.slug}`} tabIndex={-1}>{r.title}</Link>
                    ))}
                  </div>
                )}

                {/* Duplicate slugs also always in DOM */}
                {dupItems.length > 0 && (
                  <div className="sr-only" aria-hidden="true">
                    {dupItems.map(r => (
                      <Link key={`dup-${r.slug}`} href={`/resources/${r.slug}`} tabIndex={-1}>{r.title}</Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* ── Item 18b: Big CTA (kept, no contact form after it) ───────────── */}
        <section className="py-24 px-6 bg-ebony relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #E11D48, transparent 70%)" }} />
            <svg className="absolute bottom-8 left-8 opacity-[0.04] w-40 h-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="6" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="4" />
              <circle cx="50" cy="50" r="12" fill="white" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 bg-brand-start/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-start" />
              <span className="text-[9px] font-black text-brand-start uppercase tracking-[0.2em]">Put it into practice</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">The knowledge is free.<br />The app makes it real.</h2>
            <p className="text-white/55 text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Connect with local pet owners, find breed-aware vets, track health records, and log your pet&apos;s daily wellness — all in Furrly.
            </p>
            <Link href="/#download" className="inline-block bg-brand-gradient text-white font-black py-4 px-10 rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
              Download Furrly Free
            </Link>
          </div>
        </section>

        {/* ── Editorial standards ───────────────────────────────────────────── */}
        <section id="editorial-standards" className="py-16 px-6 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-black text-ebony uppercase tracking-tight mb-4">Editorial Standards</h2>
            <p className="text-sm text-slate-gray leading-relaxed mb-3">
              All articles on Furrly are researched and written by our editorial team, which includes pet owners, trainers, and contributors with direct experience in animal care. Health and symptom content is reviewed for factual accuracy against published veterinary sources (AVMA, ASPCA, and peer-reviewed literature) before publication.
            </p>
            <p className="text-sm text-slate-gray leading-relaxed mb-3">
              <strong className="text-ebony">App Reviews disclosure:</strong> Furrly operates a pet care app and is reviewed alongside competitor products in our App Review category. We disclose this relationship on every review page. Our editorial process requires that scoring criteria are applied consistently to all apps, including our own.
            </p>
            <p className="text-sm text-slate-gray leading-relaxed">
              Content is updated when products change materially, veterinary guidance is revised, or reader feedback identifies inaccuracies. If you spot an error,{" "}
              <Link href="/contact" className="text-brand-start font-bold hover:underline">contact our editorial team</Link>.
            </p>
          </div>
        </section>
        {/* Item 18b: ContactSection removed from resources page */}
      </main>
    </div>
  );
}

// ─── Page export ────────────────────────────────────────────────────────────────

export default function ResourcesHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ResourcesHubContent />
    </Suspense>
  );
}
