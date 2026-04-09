"use client";
import { useState } from "react";

export default function WaitingList({ light = false, center = false }: { light?: boolean; center?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate async submit — replace with real API call
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className={`flex flex-col gap-2 ${center ? "items-center text-center" : "items-start"}`}>
        <div className={`flex items-center gap-3 rounded-2xl px-8 py-4 ${light ? "bg-white text-ebony ring-1 ring-gray-100" : "bg-white/10 text-white border border-white/20"}`}>
          <span className="text-xl">🎉</span>
          <div>
            <p className={`text-xs font-black uppercase tracking-widest ${light ? "text-brand-start" : "text-white"}`}>You&apos;re on the list!</p>
            <p className={`text-[11px] font-bold mt-0.5 ${light ? "text-slate-gray" : "text-white/60"}`}>We&apos;ll notify you the moment we launch.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${center ? "items-center justify-center" : "items-start"}`}>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={`rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all w-full sm:w-64 ${
          light
            ? "bg-gray-50 border-2 border-gray-200 text-ebony placeholder:text-gray-400 focus:border-brand-start"
            : "bg-white/10 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-white/60"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`flex items-center gap-2 rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl whitespace-nowrap disabled:opacity-70 ${
          light
            ? "bg-ebony text-white hover:bg-zinc-800"
            : "bg-white text-ebony hover:bg-gray-50"
        }`}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          "🐾 Join Waiting List"
        )}
      </button>
    </form>
  );
}
