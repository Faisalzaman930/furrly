"use client";

import { useState } from "react";
import Logo from "../components/Logo";
import Link from "next/link";

// ── Waitlist Form ────────────────────────────────────────────────
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="text-5xl">🎉</span>
        <p className="text-xl font-black text-ebony uppercase tracking-tight">You&apos;re on the list!</p>
        <p className="text-slate-gray text-sm max-w-xs">We&apos;ll email you the moment Furrly launches on App Store &amp; Google Play.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-bold text-ebony placeholder:text-gray-400 outline-none focus:border-brand-start transition-colors"
      />
      {error && <p className="text-xs font-bold text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-brand-start/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <>🐾 Claim My Spot</>}
      </button>
      <p className="text-center text-xs text-slate-gray">No spam · One launch email · Unsubscribe anytime</p>
    </form>
  );
}

// ── Volunteer Form ───────────────────────────────────────────────
const SKILLS = [
  "Software / Engineering",
  "Design / Creative",
  "Marketing / Growth",
  "Social Media",
  "Animal Care / Rescue",
  "Shelter / Foster Network",
  "Content Writing",
  "Community Management",
  "Other",
];

function VolunteerForm() {
  const [form, setForm] = useState({ name: "", email: "", skills: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="text-5xl">🙌</span>
        <p className="text-xl font-black text-ebony uppercase tracking-tight">We&apos;ll be in touch!</p>
        <p className="text-slate-gray text-sm max-w-xs">Thank you for wanting to help. Faizan &amp; Faisal will reach out personally.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        required
        value={form.name}
        onChange={e => set("name", e.target.value)}
        placeholder="Your name"
        className="rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-bold text-ebony placeholder:text-gray-400 outline-none focus:border-brand-start transition-colors"
      />
      <input
        type="email"
        required
        value={form.email}
        onChange={e => set("email", e.target.value)}
        placeholder="your@email.com"
        className="rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-bold text-ebony placeholder:text-gray-400 outline-none focus:border-brand-start transition-colors"
      />
      <select
        value={form.skills}
        onChange={e => set("skills", e.target.value)}
        className="rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-bold text-ebony outline-none focus:border-brand-start transition-colors bg-white appearance-none"
      >
        <option value="">How can you help? (optional)</option>
        {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea
        value={form.message}
        onChange={e => set("message", e.target.value)}
        placeholder="Tell us a bit about yourself and why you want to help… (optional)"
        rows={4}
        className="rounded-2xl border-2 border-gray-200 px-5 py-4 text-sm font-bold text-ebony placeholder:text-gray-400 outline-none focus:border-brand-start transition-colors resize-none"
      />
      {error && <p className="text-xs font-bold text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-2xl bg-ebony px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <>🙋 Yes, I Want to Help</>}
      </button>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function JoinPage() {
  const [tab, setTab] = useState<"waitlist" | "volunteer">("waitlist");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ebony py-20 md:py-28">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-start/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-end/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center gap-4 mb-10">
            <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
              <Logo className="h-10 w-10" />
              <span className="text-2xl font-black tracking-tighter text-white">
                Furr<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end" style={{ WebkitTextFillColor: "transparent" }}>ly</span>
              </span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/70 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              App Store &amp; Google Play — Coming Very Soon
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
            Built by<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-[#FB923C]" style={{ WebkitTextFillColor: "transparent" }}>
              Pet Lovers.
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Join the waitlist for early access — or volunteer to help us build the app every pet parent has been waiting for.
          </p>
        </div>
      </section>

      {/* Tab switcher + Forms */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-xl px-6">

          {/* Tabs */}
          <div className="flex rounded-2xl bg-white border border-gray-200 p-1.5 mb-10 shadow-sm">
            <button
              onClick={() => setTab("waitlist")}
              className={`flex-1 rounded-xl py-3 text-sm font-black uppercase tracking-widest transition-all ${
                tab === "waitlist"
                  ? "bg-brand-gradient text-white shadow-md"
                  : "text-slate-gray hover:text-ebony"
              }`}
            >
              🐾 Join Waitlist
            </button>
            <button
              onClick={() => setTab("volunteer")}
              className={`flex-1 rounded-xl py-3 text-sm font-black uppercase tracking-widest transition-all ${
                tab === "volunteer"
                  ? "bg-ebony text-white shadow-md"
                  : "text-slate-gray hover:text-ebony"
              }`}
            >
              🙋 Volunteer
            </button>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
            {tab === "waitlist" ? (
              <>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">Get Early Access</h2>
                <p className="text-slate-gray text-sm mb-8">Be first to know when Furrly drops on iOS &amp; Android.</p>
                <WaitlistForm />

                <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: "🐾", label: "Playdates" },
                    { icon: "🏠", label: "Adoption" },
                    { icon: "🏥", label: "Vets" },
                    { icon: "🔍", label: "Lost & Found" },
                    { icon: "📸", label: "Social Feed" },
                    { icon: "💛", label: "Fostering" },
                  ].map(f => (
                    <div key={f.label} className="flex flex-col items-center gap-1.5">
                      <span className="text-2xl">{f.icon}</span>
                      <span className="text-xs font-black text-slate-gray uppercase tracking-widest">{f.label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">Help Us Build It</h2>
                <p className="text-slate-gray text-sm mb-8">We&apos;re two friends on a mission to improve the lives of animals everywhere. Every hand counts.</p>
                <VolunteerForm />
              </>
            )}
          </div>

          <p className="text-center text-xs text-slate-gray mt-6">
            Questions?{" "}
            <a href="mailto:hello@furrly.co" className="font-bold text-brand-start hover:underline">
              hello@furrly.co
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
