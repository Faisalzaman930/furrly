"use client";

import { articles } from "../data/articles";
import { guides } from "../data/guides";
import { howToArticles } from "../data/howto";
import { symptomArticles } from "../data/symptom-articles";
import { breedArticles } from "../data/breed-articles";
import { definitionArticles } from "../data/definition-articles";
import { pillarPages } from "../data/pillars";
import Link from "next/link";
import ContactSection from "../components/ContactSection";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Illustrated Cover System ─────────────────────────────────────────────────

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
    { w: 22 + (h % 18), h_: 22 + (h % 18), top: 8 + (h % 28), left: 6 + ((h * 3) % 32), anim: "float-a", delay: 0, duration: 3.5, opacity: 0.35, filled: true },
    { w: 14 + ((h * 2) % 14), h_: 14 + ((h * 2) % 14), top: 48 + ((h * 5) % 28), left: 64 + ((h * 7) % 26), anim: "float-b", delay: 1.4, duration: 4.2, opacity: 0.28, filled: false },
    { w: 10 + ((h * 4) % 12), h_: 10 + ((h * 4) % 12), top: 12 + ((h * 9) % 38), left: 72 + ((h * 11) % 20), anim: "drift-x", delay: 0.7, duration: 3.0, opacity: 0.25, filled: true },
  ];
  const ring = { size: 44 + (h % 30), top: 40 + ((h * 13) % 30), left: 4 + ((h * 17) % 28) };

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)` }}>
      <div className="absolute rounded-full border-2 opacity-20" style={{ width: ring.size, height: ring.size, top: `${ring.top}%`, left: `${ring.left}%`, borderColor: p.dot, animation: `spin-slow 12s linear infinite` }} />
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

// ─── Cluster Config ───────────────────────────────────────────────────────────

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

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ r, featured = false }: { r: ResourceCard; featured?: boolean }) {
  return (
    <Link
      href={`/resources/${r.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${featured ? "md:flex-row" : ""}`}
    >
      <div className={`relative overflow-hidden flex-none ${featured ? "md:w-56 h-48 md:h-auto" : "h-44"}`}>
        <IllustratedCover slug={r.slug} type={r.type} />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gray-100 text-slate-gray">{r.category}</span>
          <span className="text-[9px] font-bold text-slate-gray/50 uppercase tracking-wider">{r.readTime}</span>
        </div>
        <h3 className={`font-black text-ebony leading-snug group-hover:text-brand-start transition-colors ${featured ? "text-lg" : "text-[14px]"}`}>{r.title}</h3>
        {r.description && <p className="text-xs text-slate-gray leading-relaxed line-clamp-2 flex-1">{r.description}</p>}
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-50">
          <span className="text-[9px] font-bold text-slate-gray/40 uppercase tracking-wider">{r.publishDate}</span>
          <span className="text-[10px] font-black text-brand-start group-hover:translate-x-0.5 transition-transform inline-block">Read →</span>
        </div>
      </div>
    </Link>
  );
}

// ─── ItemList JSON-LD ─────────────────────────────────────────────────────────

function ItemListSchema({ items }: { items: ResourceCard[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Pet Care Resources",
    "description": "Evidence-based how-to guides, breed profiles, symptom references, and expert nutrition advice for pet owners.",
    "url": "https://furrly.co/resources",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://furrly.co/resources/${item.slug}`,
      "name": item.title,
      "description": item.description,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── Inner page (uses useSearchParams) ───────────────────────────────────────

function ResourcesHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCluster = searchParams.get("cluster") ?? "all";

  const allResources: ResourceCard[] = useMemo(() => [
    ...pillarPages.map(p => ({ slug: p.slug, title: p.title, shortTitle: p.shortTitle, description: p.seoDescription, category: p.category, tags: p.tags, publishDate: p.publishDate, readTime: p.readTime, type: "pillar" as const })),
    ...guides.map(g => ({ slug: g.slug, title: g.title, shortTitle: g.shortTitle, description: g.seoDescription, category: g.category, tags: g.tags, publishDate: g.publishDate, readTime: g.readTime, type: "guide" as const })),
    ...howToArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "how-to" as const })),
    ...symptomArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "symptom" as const })),
    ...breedArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "breed" as const })),
    ...definitionArticles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: a.tags, publishDate: a.publishDate, readTime: a.readTime, type: "definition" as const })),
    ...articles.map(a => ({ slug: a.slug, title: a.title, shortTitle: a.shortTitle, description: a.seoDescription, category: a.category, tags: ["App Reviews"], publishDate: a.publishDate, readTime: "18 Min Read", type: "article" as const })),
  ], []);

  const activeClusterDef = CLUSTERS.find(c => c.id === activeCluster);
  const filteredResources = useMemo(() => {
    if (!activeClusterDef) return allResources;
    return allResources.filter(activeClusterDef.filter);
  }, [activeCluster, allResources, activeClusterDef]);

  const setCluster = (id: string) => {
    if (id === "all") router.push("/resources");
    else router.push(`/resources?cluster=${id}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <ItemListSchema items={allResources} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-white pt-20 pb-14 px-6 border-b border-gray-100">
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

          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-lg bg-brand-gradient flex items-center justify-center"><span className="text-white text-[10px]">✦</span></div>
            <span className="text-[10px] font-black text-brand-start uppercase tracking-[0.2em]">Pet Care Library</span>
          </div>

          <h1 className="text-5xl md:text-[64px] font-black text-ebony leading-[0.9] tracking-tighter mb-5">
            The complete guide<br /><span className="text-brand-gradient">to pet care.</span>
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

          <div className="flex flex-wrap gap-3">
            {[
              { n: `${howToArticles.length + guides.length}`, label: "How-to guides", icon: "⚡" },
              { n: `${breedArticles.length}`, label: "Breed profiles", icon: "🐾" },
              { n: `${articles.length}`, label: "App reviews", icon: "🏆" },
              { n: `${symptomArticles.length + definitionArticles.length}`, label: "Health references", icon: "🩺" },
              { n: `${pillarPages.length}`, label: "Complete guides", icon: "🗺" },
            ].map(s => (
              <div key={s.label} className="inline-flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5">
                <span className="text-base leading-none">{s.icon}</span>
                <div>
                  <div className="text-sm font-black text-ebony leading-none">{s.n}</div>
                  <div className="text-[9px] font-bold text-slate-gray uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══ CLUSTER NAV ═══════════════════════════════════════════════════ */}
      <nav className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100" aria-label="Topic clusters">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {/* All */}
            <Link
              href="/resources"
              onClick={(e) => { e.preventDefault(); setCluster("all"); }}
              aria-current={activeCluster === "all" ? "page" : undefined}
              className={`flex-none inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${activeCluster === "all" ? "bg-ebony text-white shadow-md" : "text-slate-gray hover:bg-gray-100"}`}
            >
              All
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${activeCluster === "all" ? "bg-white/20" : "bg-gray-100"}`}>
                {allResources.length}
              </span>
            </Link>

            {CLUSTERS.map(c => {
              const count = allResources.filter(c.filter).length;
              const isActive = activeCluster === c.id;
              return (
                <Link
                  key={c.id}
                  href={`/resources?cluster=${c.id}`}
                  onClick={(e) => { e.preventDefault(); setCluster(c.id); }}
                  aria-current={isActive ? "page" : undefined}
                  style={isActive ? { background: `linear-gradient(135deg, ${c.from}, ${c.to})` } : {}}
                  className={`flex-none inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${isActive ? "text-white shadow-md" : "text-slate-gray hover:bg-gray-100"}`}
                >
                  <span>{c.emoji}</span>
                  {c.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${isActive ? "bg-white/25" : "bg-gray-100"}`}>{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ══ CONTENT ═══════════════════════════════════════════════════════ */}
      <main>
        {activeCluster === "all" ? (

          /* ── ALL TOPICS VIEW ─────────────────────────────────────────── */
          <div>
            {/* Complete Guides — Pillar strip */}
            <section className="py-14 px-6 bg-ebony" aria-labelledby="complete-guides-heading">
              <div className="mx-auto max-w-7xl">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-brand-start font-black text-[9px] uppercase tracking-[0.2em] mb-2">Start here</p>
                    <h2 id="complete-guides-heading" className="text-2xl font-black text-white tracking-tight">Complete Topic Guides</h2>
                    <p className="text-white/40 text-xs mt-1">Everything about a topic in one place</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {allResources.filter(r => r.type === "pillar").map(r => {
                    const h = slugHash(r.slug);
                    const p = PALETTES[h % PALETTES.length];
                    return (
                      <Link key={r.slug} href={`/resources/${r.slug}`} className="group relative overflow-hidden rounded-[1.75rem] h-44 flex flex-col justify-end p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}>
                        <span className="absolute top-4 right-4 text-5xl opacity-20 group-hover:opacity-30 transition-opacity select-none" style={{ lineHeight: 1 }}>🗺</span>
                        <div className="absolute top-5 left-5 w-3 h-3 rounded-full opacity-30" style={{ background: p.dot, animation: "float-a 3.5s ease-in-out infinite" }} />
                        <span className="inline-block w-fit text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white mb-2">Complete Guide</span>
                        <h3 className="font-black text-white text-sm leading-snug group-hover:text-white/90 transition-colors">{r.shortTitle}</h3>
                        <span className="text-white/50 text-[10px] mt-1">{r.readTime}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Cluster sections — all articles rendered in HTML for crawlability */}
            {CLUSTERS.map((cluster, ci) => {
              const clusterItems = allResources.filter(cluster.filter);
              if (clusterItems.length === 0) return null;

              return (
                <section
                  key={cluster.id}
                  className={`py-14 px-6 ${ci % 2 === 0 ? "bg-white" : "bg-gray-50/70"} border-b border-gray-100 last:border-b-0`}
                  aria-labelledby={`cluster-${cluster.id}-heading`}
                >
                  <div className="mx-auto max-w-7xl">
                    <div className="flex items-start justify-between mb-8 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-none shadow-sm" style={{ background: `linear-gradient(135deg, ${cluster.from}, ${cluster.to})` }}>
                          {cluster.emoji}
                        </div>
                        <div>
                          <h2 id={`cluster-${cluster.id}-heading`} className="text-xl font-black text-ebony tracking-tight">{cluster.label}</h2>
                          <p className="text-xs text-slate-gray mt-0.5">{cluster.description}</p>
                        </div>
                      </div>
                      <Link
                        href={`/resources?cluster=${cluster.id}`}
                        onClick={(e) => { e.preventDefault(); setCluster(cluster.id); }}
                        className="flex-none text-[10px] font-black text-brand-start uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1 whitespace-nowrap mt-1"
                      >
                        All {clusterItems.length} <span>→</span>
                      </Link>
                    </div>

                    {/* All articles rendered in HTML (crawlable). Show first 3 visually. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {clusterItems.slice(0, 3).map(r => (
                        <ArticleCard key={r.slug} r={r} />
                      ))}
                    </div>

                    {/* Hidden links for the rest — in HTML for Google, invisible to users */}
                    {clusterItems.length > 3 && (
                      <div className="sr-only" aria-hidden="true">
                        {clusterItems.slice(3).map(r => (
                          <Link key={r.slug} href={`/resources/${r.slug}`} tabIndex={-1}>{r.title}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

        ) : (

          /* ── SINGLE CLUSTER VIEW ─────────────────────────────────────── */
          <div>
            {activeClusterDef && (
              <>
                {/* Cluster banner */}
                <div className="relative overflow-hidden py-16 px-6" style={{ background: `linear-gradient(145deg, ${activeClusterDef.from}, ${activeClusterDef.to})` }}>
                  {/* Breadcrumb */}
                  <nav aria-label="Breadcrumb" className="absolute top-6 left-6 flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/resources" onClick={(e) => { e.preventDefault(); setCluster("all"); }} className="hover:text-white transition-colors">Resources</Link>
                    <span>/</span>
                    <span className="text-white/80">{activeClusterDef.label}</span>
                  </nav>

                  <div className="absolute top-6 right-24 w-24 h-24 rounded-full opacity-10" style={{ background: activeClusterDef.textLight, animation: "float-a 4s ease-in-out infinite" }} />
                  <div className="absolute bottom-4 left-16 w-16 h-16 rounded-full border-2 opacity-15" style={{ borderColor: activeClusterDef.textLight, animation: "float-b 5s ease-in-out 1s infinite" }} />
                  <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full opacity-20" style={{ background: activeClusterDef.textLight, animation: "drift-x 3s ease-in-out 0.5s infinite" }} />

                  <div className="relative mx-auto max-w-7xl pt-8">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-5xl">{activeClusterDef.emoji}</span>
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-1">{activeClusterDef.label}</h1>
                        <p className="text-white/65 text-sm">{activeClusterDef.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                      {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
                    </div>
                  </div>
                </div>

                {/* Article grid — all articles visible and crawlable */}
                <section className="py-14 px-6 bg-gray-50/60">
                  <div className="mx-auto max-w-7xl">
                    {filteredResources.length > 0 ? (
                      <>
                        {filteredResources.slice(0, 1).map(r => (
                          <div key={r.slug} className="mb-8"><ArticleCard r={r} featured /></div>
                        ))}
                        {filteredResources.length > 1 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredResources.slice(1).map(r => (
                              <ArticleCard key={r.slug} r={r} />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center py-24 text-slate-gray">No articles in this topic yet.</p>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </main>

      {/* ══ EDITORIAL STANDARDS ═══════════════════════════════════════════ */}
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
            Content is updated when products change materially, veterinary guidance is revised, or reader feedback identifies inaccuracies. If you spot an error, <Link href="/contact" className="text-brand-start font-bold hover:underline">contact our editorial team</Link>.
          </p>
        </div>
      </section>

      {/* ══ RELATED LIBRARY CTA ═══════════════════════════════════════════ */}
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

      <ContactSection />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ResourcesHubContent />
    </Suspense>
  );
}
