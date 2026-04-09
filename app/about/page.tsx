"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

// Can't export metadata from "use client" — handled via layout/head tag
// export const metadata: Metadata = { title: "About Furrly — Faizan & Faisal" };

function VolunteerForm() {
  const [form, setForm] = useState({ name: "", email: "", skills: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-black text-ebony uppercase tracking-tight mb-4">Welcome to the Pack!</h3>
        <p className="text-slate-gray text-lg max-w-md mx-auto leading-relaxed">
          Faizan & Faisal will personally reach out to you. Together we&apos;re going to do something amazing for animals everywhere.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-3">Your Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Sarah Ahmed"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-ebony placeholder:text-gray-300 focus:bg-white focus:border-brand-start outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-3">Email Address</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-ebony placeholder:text-gray-300 focus:bg-white focus:border-brand-start outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-3">How can you help?</label>
          <select
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-ebony focus:bg-white focus:border-brand-start outline-none transition-all appearance-none"
          >
            <option value="">Select your skill</option>
            <option value="developer">Software Developer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="vet">Veterinarian / Animal Expert</option>
            <option value="content">Content Writer / Editor</option>
            <option value="marketing">Marketing / Social Media</option>
            <option value="shelter">Shelter / Rescue Worker</option>
            <option value="community">Community Manager</option>
            <option value="other">Other — tell us below</option>
          </select>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-ebony uppercase tracking-widest mb-3">Tell us about yourself</label>
          <textarea
            rows={8}
            placeholder="Why do you want to volunteer? What drives you? Tell us about your pets too if you have any!"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 font-medium text-ebony placeholder:text-gray-300 focus:bg-white focus:border-brand-start outline-none transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gradient text-white font-black py-5 rounded-2xl uppercase tracking-widest text-base hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-start/20 disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>🐾 Join the Mission</>
          )}
        </button>
        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
      </div>
    </form>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] py-28 md:py-36">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🐾</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/80 uppercase tracking-widest mb-6">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
            Two Friends.<br />
            <span className="text-transparent bg-clip-text" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, #FDE68A, #FCA5A5)" }}>
              One Mission.
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto">
            Improve the livelihoods of animals all across the world — one pet owner, one adoption, one community at a time.
          </p>
        </div>
      </section>

      {/* ── FOUNDERS STORY ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Faizan */}
            <div className="space-y-6">
              <div className="w-20 h-20 bg-violet-100 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-sm">🐕🐕</div>
              <div>
                <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-2">Co-Founder</p>
                <h2 className="text-4xl font-black text-ebony uppercase tracking-tight mb-6">Faizan</h2>
              </div>
              <p className="text-lg text-slate-gray leading-relaxed">
                Faizan has grown up surrounded by animals his entire life. From the moment he could walk, there was always a dog by his side. Today he shares his home — and his heart — with two magnificent German Shepherds.
              </p>
              <p className="text-lg text-slate-gray leading-relaxed">
                Zeus and Titan, his two German Shepherds, aren&apos;t just pets to Faizan — they&apos;re family. He&apos;s spent years navigating the frustrating patchwork of apps, Facebook groups, and WhatsApp chats just to find playdates, locate a trusted vet, or help a friend rehome a dog in need.
              </p>
              <p className="text-lg text-slate-gray leading-relaxed">
                That frustration became his fuel. <strong className="text-ebony">Faizan leads product and community</strong> at Furrly — obsessing over making sure the app works as beautifully for a shepherd owner in Karachi as it does for a rescue worker in London.
              </p>
              <div className="flex gap-3 flex-wrap pt-2">
                <span className="bg-violet-50 border border-violet-100 text-violet-700 text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest">🐕 2 German Shepherds</span>
                <span className="bg-gray-50 border border-gray-100 text-slate-gray text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest">Product & Community</span>
              </div>
            </div>

            {/* Faisal */}
            <div className="space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-sm">🐺</div>
              <div>
                <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-2">Co-Founder</p>
                <h2 className="text-4xl font-black text-ebony uppercase tracking-tight mb-6">Faisal</h2>
              </div>
              <p className="text-lg text-slate-gray leading-relaxed">
                Faisal&apos;s bond with animals started in childhood — he was the kid who brought home every stray, nursed every injured bird, and argued passionately for every animal&apos;s right to be loved. That kid never really grew up, and that&apos;s a good thing.
              </p>
              <p className="text-lg text-slate-gray leading-relaxed">
                Today, Nova — his Siberian Husky — rules his apartment and his schedule. Anyone who knows Faisal knows that Nova comes first. He&apos;s experienced firsthand the stress of a lost pet, the joy of a perfect playdate match, and the heartbreak of seeing animals stuck in shelters with no digital presence.
              </p>
              <p className="text-lg text-slate-gray leading-relaxed">
                <strong className="text-ebony">Faisal leads technology and growth</strong> at Furrly — building the platform from the ground up with one belief: every animal deserves a loving home, and technology should make finding that home effortless.
              </p>
              <div className="flex gap-3 flex-wrap pt-2">
                <span className="bg-amber-50 border border-amber-100 text-amber-700 text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest">🐺 1 Siberian Husky</span>
                <span className="bg-gray-50 border border-gray-100 text-slate-gray text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest">Technology & Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MISSION ── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-4">Why We Built This</p>
          <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl mb-8 leading-tight">
            The World Needed One App.<br />Not Five.
          </h2>
          <p className="text-xl text-slate-gray leading-relaxed mb-6 max-w-3xl mx-auto">
            When Faizan&apos;s German Shepherd needed emergency care late at night, he had to search through Google, call three clinics, and hope for the best. When Faisal&apos;s Husky Nova went missing for six terrifying hours, the only tool available was a WhatsApp group.
          </p>
          <p className="text-xl text-slate-gray leading-relaxed mb-12 max-w-3xl mx-auto">
            They sat down over chai and made a decision: <strong className="text-ebony">if the tools don&apos;t exist, we build them.</strong> Not for profit. For every pet owner who&apos;s ever felt that same helplessness. For every animal in a shelter waiting to be found.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Global Mission", desc: "Built to serve pet owners and animals everywhere — not just one city or country." },
              { icon: "🆓", title: "Free Forever", desc: "Core features will always be free. We believe access to pet welfare tools should never cost you." },
              { icon: "🤝", title: "Community First", desc: "Furrly belongs to its community. Every feature is driven by real feedback from real pet owners." },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-black text-ebony text-lg uppercase tracking-tight mb-3">{v.title}</h3>
                <p className="text-slate-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER SECTION ── */}
      <section id="volunteer" className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-4">Hey you — yes, you 👋</p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl leading-tight mb-6">
              We&apos;d Love Your Help.
            </h2>
            <p className="text-xl text-slate-gray max-w-2xl mx-auto leading-relaxed">
              Furrly is completely free and always will be. It&apos;s a community project built by people who love animals. Whether you&apos;re a developer, a shelter worker, a vet, a designer, or just someone who cares deeply about animals — <strong className="text-ebony">we want you on this team.</strong>
            </p>
            <p className="text-lg text-slate-gray max-w-xl mx-auto leading-relaxed mt-4">
              Help us save animals. Help us find them homes. Help us build something that actually makes the world a little better for every pet out there. 🐾
            </p>
          </div>

          {/* What volunteers do */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: "💻", role: "Developers", desc: "Got coding skills? Help us build features that connect pets with loving families worldwide." },
              { icon: "🎨", role: "Designers", desc: "Make Furrly beautiful and easy to use for every pet owner on the planet." },
              { icon: "🏥", role: "Vets & Shelters", desc: "You&apos;re on the front lines. Help us build tools that actually work for animal welfare." },
              { icon: "❤️", role: "Pet Lovers", desc: "No skills needed — just passion. Spread the word, share stories, help animals get seen." },
            ].map((v, i) => (
              <div key={i} className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-black text-ebony text-base uppercase tracking-tight mb-3">{v.role}</h3>
                <p className="text-slate-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-sm">
            <div className="mb-12">
              <h3 className="text-3xl font-black text-ebony uppercase tracking-tight mb-3">Come on, join us 🐶🐱</h3>
              <p className="text-slate-gray text-lg leading-relaxed max-w-xl">
                Faizan & Faisal personally read every single message. We don&apos;t care how big or small your contribution is — if you love animals and want to help, you&apos;re already one of us.
              </p>
            </div>
            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* ── BACK TO HOME ── */}
      <section className="py-12 bg-gray-50 border-t border-gray-100 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-brand-start uppercase tracking-widest hover:underline">
          ← Back to Furrly
        </Link>
      </section>

    </div>
  );
}
