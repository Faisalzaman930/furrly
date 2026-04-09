"use client";

import { useState } from "react";
import WaitingList from "../components/WaitingList";

const phases = [
  {
    status: "Live Now ✅",
    title: "Phase 1: Social & Discovery",
    desc: "The foundation — the core social and discovery layer that connects pet owners, shelters, and people looking to adopt.",
    items: [
      { label: "Playdates", desc: "Find compatible pets nearby filtered by size, breed & temperament." },
      { label: "Social Feed", desc: "A neighborhood-first feed connecting the pet owners you'll actually meet." },
      { label: "Shelters Directory", desc: "Browse and connect with verified shelters and rescues near you." },
      { label: "Adoption Platform", desc: "Apply to adopt paperlessly. Connect directly with owners rehoming pets." },
    ],
    color: "bg-emerald-50 text-emerald-900 border-emerald-200",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    status: "Coming Soon 🔧",
    title: "Phase 2: Commerce & Care",
    desc: "Expanding into services, marketplace and deeper community tools.",
    items: [
      { label: "Vet Discovery Portal", desc: "Real-time clinic discovery, verified reviews, one-tap emergency calls." },
      { label: "Lost & Found Network", desc: "Hyper-local alerts that turn your neighborhood into a search party." },
      { label: "Fostering Platform", desc: "Open your home temporarily — matched with pets that need you most." },
      { label: "Pet Marketplace", desc: "Multi-vendor shop for pet food, accessories and health products." },
    ],
    color: "bg-brand-start/5 text-ebony border-brand-start/20",
    dot: "bg-brand-start",
    badge: "bg-brand-start/10 text-brand-start border-brand-start/20",
  },
  {
    status: "Future Vision 🌍",
    title: "Phase 3: The Global Ecosystem",
    desc: "The long-term vision — a fully unified global platform for every aspect of animal welfare.",
    items: [
      { label: "Vet CRM & Medical Records", desc: "In-app scheduling, vaccination tracking & medical record sync." },
      { label: "Community Governance", desc: "User-led feature voting and community-driven product decisions." },
      { label: "Corporate Pet Wellness", desc: "Partnerships with pet-friendly employers and corporate wellness programs." },
      { label: "Digital Pet Passports", desc: "Blockchain-based identity and medical tracking for pets worldwide." },
    ],
    color: "bg-gray-50 text-slate-gray border-gray-200",
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600 border-gray-200",
  },
];

const initialRequests = [
  {
    category: "Health",
    title: "Digital Medical Records",
    desc: "A centralized hub to sync clinic records, vaccinations, and weight tracking in one place.",
    votes: 2150,
    status: "Phase 3",
    phase: 3,
  },
  {
    category: "Commerce",
    title: "COD (Cash on Delivery) Support",
    desc: "Native support for localized payment options in our upcoming pet marketplace.",
    votes: 1240,
    status: "Phase 2",
    phase: 2,
  },
  {
    category: "Social",
    title: "Breed-Filtered Social Feed",
    desc: "Customizable feed algorithms where users can prioritize content from specific breeds.",
    votes: 890,
    status: "Phase 2",
    phase: 2,
  },
  {
    category: "Safety",
    title: "Microchip Registry Integration",
    desc: "Link your pet's microchip directly in the app for instant identification if lost.",
    votes: 760,
    status: "Phase 3",
    phase: 3,
  },
  {
    category: "Adoption",
    title: "Video Meet-and-Greet",
    desc: "Schedule virtual introductions with shelter pets before visiting in person.",
    votes: 640,
    status: "Phase 2",
    phase: 2,
  },
  {
    category: "Community",
    title: "Pet-Friendly Places Map",
    desc: "A crowdsourced map of pet-friendly cafes, parks, hotels and beaches worldwide.",
    votes: 520,
    status: "Phase 2",
    phase: 2,
  },
];

export default function RoadmapPage() {
  const [requests, setRequests] = useState(
    initialRequests.map(r => ({ ...r, voted: false }))
  );
  const [filter, setFilter] = useState<number | null>(null);

  function vote(idx: number) {
    setRequests(prev =>
      prev.map((r, i) =>
        i === idx ? { ...r, votes: r.voted ? r.votes - 1 : r.votes + 1, voted: !r.voted } : r
      )
    );
  }

  const sorted = [...requests]
    .filter(r => filter === null || r.phase === filter)
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = requests.reduce((s, r) => s + r.votes, 0);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-brand-start/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-start/10 px-4 py-2 text-xs font-black text-brand-start ring-1 ring-brand-start/20 uppercase tracking-widest mb-8">
              <span className="h-2 w-2 rounded-full bg-brand-start animate-pulse" />
              Building in Public
            </div>
            <h1 className="text-5xl font-black tracking-tight text-ebony sm:text-7xl leading-[0.9] uppercase mb-6">
              Our Roadmap.<br />
              <span className="text-brand-gradient">Your Votes.</span>
            </h1>
            <p className="text-xl leading-relaxed text-slate-gray max-w-2xl mb-4">
              Furrly is built by <strong className="text-ebony">Faizan & Faisal</strong> — two friends and devoted pet owners on a mission to improve the livelihoods of animals all across the world.
            </p>
            <p className="text-lg leading-relaxed text-slate-gray max-w-2xl mb-10">
              Phase 1 is live. Vote on what gets built next — every vote directly influences our development priorities.
            </p>
            <WaitingList />
          </div>
        </div>
      </section>

      {/* Phase Timeline */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-4">Development Phases</p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Where We Are</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-20 relative">
            <div className="absolute left-8 top-12 bottom-12 w-1 bg-gray-100 hidden md:block" />

            {phases.map((phase, idx) => (
              <div key={idx} className="relative md:pl-24 group">
                <div className={`absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-3xl ${phase.dot} text-white shadow-xl transition-transform group-hover:scale-110 z-10 font-bold text-xl`}>
                  {idx + 1}
                </div>
                <div className={`p-10 rounded-[4rem] border-2 shadow-sm ${phase.color} transition-all hover:shadow-2xl`}>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border ${phase.badge}`}>
                    {phase.status}
                  </div>
                  <h2 className="text-3xl font-black tracking-tight mb-3">{phase.title}</h2>
                  <p className="text-base opacity-70 mb-8 leading-relaxed">{phase.desc}</p>
                  <ul className="space-y-5">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className={`flex-none mt-1.5 h-3 w-3 rounded-full border-2 border-current ${idx === 0 ? "bg-current" : "opacity-40"}`} />
                        <div>
                          <span className="font-black text-base">{item.label}</span>
                          <span className="text-sm opacity-70 ml-2 font-medium">— {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Votes */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-base font-bold text-brand-start uppercase tracking-widest mb-4">Community Votes</h2>
              <h2 className="text-4xl font-black text-ebony tracking-tight sm:text-5xl uppercase underline decoration-brand-start decoration-8 underline-offset-8">
                Prioritise the Roadmap
              </h2>
              <p className="mt-4 text-lg text-slate-gray leading-relaxed max-w-xl">
                Vote for the features that matter most to you. The top-voted items get built first. Your input directly shapes what Faizan and Faisal build next.
              </p>
            </div>
            <div className="text-sm font-bold text-slate-gray uppercase tracking-widest">
              Total votes: {totalVotes.toLocaleString()}
            </div>
          </div>

          {/* Phase filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { label: "All Features", val: null },
              { label: "Phase 2", val: 2 },
              { label: "Phase 3", val: 3 },
            ].map(f => (
              <button
                key={String(f.val)}
                onClick={() => setFilter(f.val)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f.val
                    ? "bg-ebony text-white shadow-lg"
                    : "bg-white text-slate-gray border border-gray-200 hover:border-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((item) => {
              const origIdx = requests.findIndex(r => r.title === item.title);
              return (
                <div key={item.title} className={`flex flex-col bg-white p-10 rounded-[3rem] shadow-sm ring-1 ring-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden border-2 ${item.voted ? "border-brand-start/30" : "border-transparent"}`}>
                  <div className="absolute top-6 right-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest leading-none border ${
                      item.phase === 2
                        ? "bg-brand-start/10 text-brand-start border-brand-start/20"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      Phase {item.phase}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-black text-slate-gray uppercase tracking-widest">{item.category}</span>
                    <h3 className="mt-3 text-xl font-black text-ebony group-hover:text-brand-start transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-slate-gray leading-7 text-sm">{item.desc}</p>
                  </div>
                  <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-ebony tabular-nums">{item.votes.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-gray uppercase tracking-widest">votes</span>
                    </div>
                    <button
                      onClick={() => vote(origIdx)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-90 shadow-sm ${
                        item.voted
                          ? "bg-brand-gradient text-white shadow-brand-start/20 scale-105"
                          : "bg-gray-50 text-slate-gray hover:bg-brand-start/10 hover:text-brand-start"
                      }`}
                    >
                      <span className="text-base">{item.voted ? "✓" : "▲"}</span>
                      {item.voted ? "Voted" : "Vote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wishlist Form */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-ebony tracking-tight sm:text-4xl uppercase">Have a Great Idea?</h2>
            <p className="mt-4 text-lg text-slate-gray">Faizan & Faisal personally review every suggestion.</p>
          </div>
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-9xl transform translate-x-1/4 -translate-y-1/4 font-black">🗳️</div>
            <div className="relative">
              <h3 className="text-3xl font-black text-ebony uppercase tracking-tight mb-4">Request a Feature</h3>
              <p className="text-lg text-slate-gray leading-8 mb-12 max-w-xl">
                Shape the future of Furrly. Every piece of feedback is directly reviewed by our founders.
              </p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <label htmlFor="feature-title" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Feature Name</label>
                    <input type="text" id="feature-title" className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-brand-start outline-none transition-all font-bold placeholder:text-gray-300" placeholder="e.g., Pet Birthday Reminders" />
                  </div>
                  <div>
                    <label htmlFor="feature-impact" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">How much would this help you?</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <label key={i} className="flex-1 cursor-pointer">
                          <input type="radio" name="impact" className="sr-only peer" />
                          <div className="h-16 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-xl hover:bg-gray-100 peer-checked:bg-brand-gradient peer-checked:text-white transition-all shadow-sm">
                            {i}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <label htmlFor="feature-description" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Tell us more</label>
                    <textarea id="feature-description" rows={8} className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:bg-white focus:border-brand-start outline-none transition-all font-medium placeholder:text-gray-300" placeholder="Describe the feature and why it matters..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-gradient text-white font-black py-6 px-10 rounded-[2.5rem] shadow-xl shadow-brand-start/20 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-widest">Submit My Idea</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
