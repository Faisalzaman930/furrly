"use client";

import Link from "next/link";
import DownloadButtons from "./components/DownloadButtons";
import Resources from "./components/Resources";
import PhoneFrame from "./components/PhoneFrame";
import { useState, useEffect, useRef } from "react";

// Animated stat counter
function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-black text-white tabular-nums">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

const verticals = [
  { name: "Playdates", href: "/playdates", icon: "🎉", color: "bg-violet-100", description: "Find compatible pets nearby — filtered by size, breed & temperament." },
  { name: "Social", href: "/social", icon: "📸", color: "bg-pink-100", description: "A neighborhood-first feed connecting the pet owners you'll actually meet." },
  { name: "Adoption", href: "/adoption", icon: "🏠", color: "bg-amber-100", description: "Browse verified rescues and apply paperlessly — in one tap." },
  { name: "Fostering", href: "/fostering", icon: "💖", color: "bg-red-100", description: "Open your home temporarily and join a network of 10K+ foster parents." },
  { name: "Vets", href: "/vets", icon: "🏥", color: "bg-emerald-100", description: "Real-time clinic discovery, verified reviews, one-tap emergency calls." },
  { name: "Lost & Found", href: "/lost-found", icon: "🔍", color: "bg-blue-100", description: "Hyper-local alerts turn your entire neighborhood into a search party." },
];

const steps = [
  { num: "01", title: "Create Your Pet Profile", desc: "Add your pet's name, breed, age, and personality. Takes 60 seconds." },
  { num: "02", title: "Connect with Your Community", desc: "Discover local pet owners, nearby rescues, and trusted vets in your area." },
  { num: "03", title: "Access Everything Pet-Related", desc: "From playdate scheduling to emergency alerts — all from one app, on your phone." },
];

const testimonials = [
  { stars: 5, quote: "I found a playmate for my reactive dog in 2 days. The temperament filters are genuinely game-changing.", author: "Sarah L.", pet: "Cooper the Golden Retriever" },
  { stars: 5, quote: "The adoption process took 10 minutes instead of 3 weeks. I cried when I brought Luna home.", author: "Michael K.", pet: "Luna the Siamese" },
  { stars: 5, quote: "Simba went missing on a Tuesday. The neighborhood alert went out and someone found him in 2 hours.", author: "David R.", pet: "Simba the rescue cat" },
];

const faqs = [
  { q: "Is Furrly free to download and use?", a: "Yes — Furrly is completely free to download on iOS and Android. All core features (playdates, social feed, lost & found alerts, adoption browsing, and vet directory) are free. Premium features for rescues and businesses are available on a subscription basis." },
  { q: "How does the lost pet alert system work?", a: "When you report a lost pet, Furrly sends a push notification to every active user within a configurable radius (1–10km). Each user sees your pet's photo, description, and last-known location on a live map. When someone spots your pet, they tap 'I saw this pet' and their GPS coordinates are logged and sent to you instantly." },
  { q: "Are the rescue organizations on Furrly verified?", a: "Every rescue and shelter on the platform goes through a verification process before listings go live. We check registered charity status, operating licenses, and require agreement with our animal welfare standards. Unverified listings are clearly labeled." },
  { q: "How is Furrly different from Petfinder or Rover?", a: "Furrly is the only app that combines adoption, social networking, playdates, lost & found, and vet discovery in one unified experience. You don't need five separate apps. Your profile and pet data work across all features simultaneously." },
  { q: "What cities is Furrly available in?", a: "Furrly works globally — the app works wherever you are because it's location-based rather than city-specific. Early user concentrations are in North America, the UK, and Australia, but the community is growing rapidly worldwide." },
];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const active = verticals[activeFeature];

  return (
    <div className="bg-white">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Background orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-brand-start/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-brand-end/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-start/10 px-4 py-2 text-xs font-black text-brand-start ring-1 ring-brand-start/20 uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-brand-start animate-pulse" />
                The Pet Super-App — Now Available
              </div>
              <h1 className="text-5xl font-black tracking-tight text-ebony sm:text-7xl leading-[0.9] uppercase">
                Everything Your<br />
                <span className="text-brand-gradient">Pet Needs.</span><br />
                One App.
              </h1>
              <p className="text-xl leading-relaxed text-slate-gray max-w-lg">
                Furrly replaces five fragmented pet apps. Social networking, playdates, adoption, vet discovery, lost & found — all in one place, built for mobile-first pet parents.
              </p>
              {/* Stat chips */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { val: "50K+", label: "Pet Parents" },
                  { val: "6", label: "Core Features" },
                  { val: "4.9★", label: "App Rating" },
                  { val: "Free", label: "To Download" },
                ].map(s => (
                  <div key={s.val} className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-center">
                    <p className="text-lg font-black text-ebony leading-none">{s.val}</p>
                    <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <DownloadButtons />
              </div>
            </div>

            {/* Right — Floating phone mockups */}
            <div className="relative h-[580px] flex items-center justify-center">
              {/* Left phone */}
              <div
                className="hidden lg:block absolute left-0 z-0 w-[185px] opacity-90"
                style={{ transform: "rotate(-7deg)", animation: "float-b 4.5s ease-in-out 0.6s infinite" }}
              >
                <PhoneFrame src="/screenshots/app-adoption.png" alt="Furrly adoption feature" />
              </div>
              {/* Center phone (main) */}
              <div
                className="relative z-10 w-[230px]"
                style={{ animation: "float-a 3.5s ease-in-out 0s infinite" }}
              >
                <PhoneFrame src="/screenshots/app-playdates.png" alt="Furrly playdates feature" />
              </div>
              {/* Right phone */}
              <div
                className="hidden lg:block absolute right-0 z-0 w-[185px] opacity-90"
                style={{ transform: "rotate(7deg)", animation: "drift-x 5s ease-in-out 1.2s infinite" }}
              >
                <PhoneFrame src="/screenshots/app-social-feed.png" alt="Furrly social feed" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-ebony py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <StatCounter target={50000} suffix="+" label="Active Pet Parents" />
            <StatCounter target={6} suffix="" label="Core App Features" />
            <StatCounter target={3} suffix="min" label="To Adopt a Pet" />
            <StatCounter target={2} suffix="hrs" label="Avg. Pet Recovery Time" />
          </div>
        </div>
      </section>

      {/* ─── FEATURE SHOWCASE ─── */}
      <section id="features" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">The Ecosystem</p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-6xl leading-none">
              Six Features.<br />One App.
            </h2>
            <p className="mt-6 text-lg text-slate-gray max-w-2xl mx-auto">Stop switching between apps. Furrly unifies the entire pet ownership experience in a single, beautifully designed mobile app.</p>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {verticals.map((v, i) => (
              <button
                key={v.href}
                onClick={() => setActiveFeature(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeFeature === i
                    ? "bg-ebony text-white shadow-lg"
                    : "bg-white text-slate-gray border border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{v.icon}</span>
                {v.name}
              </button>
            ))}
          </div>

          {/* Feature detail panel */}
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
            <div>
              <div className={`w-16 h-16 ${active.color} rounded-[1.5rem] flex items-center justify-center text-3xl mb-8`}>
                {active.icon}
              </div>
              <h3 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-4">{active.name}</h3>
              <p className="text-lg text-slate-gray leading-relaxed mb-8">{active.description}</p>
              <Link
                href={active.href}
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-black px-8 py-4 rounded-[1.5rem] hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-lg"
              >
                Explore Feature →
              </Link>
            </div>
            {/* App screenshot in phone frame */}
            {(() => {
              const screenshots: Record<string, string> = {
                "/playdates": "/screenshots/app-playdates.png",
                "/social": "/screenshots/app-social-feed.png",
                "/adoption": "/screenshots/app-adoption.png",
              };
              const shot = screenshots[active.href];
              return shot ? (
                <div className="flex justify-center items-center py-4">
                  <div className="w-[260px]">
                    <PhoneFrame src={shot} alt={`Furrly ${active.name} screen`} />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 min-h-[280px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-3 w-24 bg-gray-200 rounded-full" />
                    <div className={`h-8 w-8 ${active.color} rounded-xl flex items-center justify-center text-lg`}>{active.icon}</div>
                  </div>
                  {[0, 1, 2].map(j => (
                    <div key={j} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 mb-3">
                      <div className={`w-10 h-10 ${active.color} rounded-xl flex-shrink-0`} />
                      <div className="flex-1">
                        <div className={`h-3 ${j === 0 ? "w-2/3" : j === 1 ? "w-1/2" : "w-3/4"} bg-gray-200 rounded-full mb-2`} />
                        <div className="h-2 w-1/3 bg-gray-100 rounded-full" />
                      </div>
                      <div className="h-8 w-16 bg-brand-start/10 rounded-xl" />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">Getting Started</p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Up and Running in Minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-100 z-0" />
                )}
                <div className="relative bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 bg-brand-gradient rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-black text-ebony uppercase tracking-tight mb-4">{step.title}</h3>
                  <p className="text-slate-gray leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-28 bg-ebony">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">Success Stories</p>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter sm:text-5xl">Loved by Pet Parents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <span key={j} className="text-brand-end text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-white/90 text-lg leading-relaxed italic mb-8">"{t.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">🐾</div>
                  <div>
                    <p className="font-black text-white text-sm">{t.author}</p>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-0.5">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-28 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter">Everything You Need to Know</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESOURCES ─── */}
      <Resources />

      {/* ─── CTA ─── */}
      <section id="download" className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-gradient rounded-[3.5rem] px-10 py-24 text-center shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <svg viewBox="0 0 1024 1024" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="512" cy="512" r="512" fill="url(#grad2)" />
                <defs><radialGradient id="grad2"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
              </svg>
            </div>
            <div className="relative text-center">
              <p className="text-white/70 font-black uppercase tracking-widest text-xs mb-4">Free to Download</p>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase mb-6">
                Your Pet's Life,<br />Organized.
              </h2>
              <p className="text-xl text-white/80 max-w-xl mx-auto leading-relaxed mb-12">
                Join 50,000+ pet parents who've replaced five apps with one. Download Furrly free today.
              </p>
              <div className="flex justify-center">
                <DownloadButtons light center />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline FAQ item to avoid extra import
function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-[1.5rem] overflow-hidden transition-all ${open ? "border-brand-start/30 shadow-md" : "border-gray-100"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
        <span className="font-black text-ebony text-base leading-snug">{faq.q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black transition-all ${open ? "bg-brand-start text-white rotate-45" : "bg-gray-100 text-slate-gray"}`}>+</span>
      </button>
      {open && <div className="px-7 pb-6 text-slate-gray leading-relaxed text-sm border-t border-gray-50 pt-4">{faq.a}</div>}
    </div>
  );
}
