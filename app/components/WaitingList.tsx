"use client";
import { useState } from "react";

interface WaitingListProps {
  light?: boolean;
  center?: boolean;
  large?: boolean;
}

export default function WaitingList({ light = false, center = false, large = false }: WaitingListProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) return;
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
      <div className={`flex flex-col gap-2 ${center ? "items-center text-center" : "items-start"}`}>
        <div className={`flex items-center gap-3 rounded-2xl px-6 py-4 ${light ? "bg-white text-ebony ring-1 ring-gray-100" : "bg-white/10 text-white border border-white/20"}`}>
          <span className="text-2xl">🎉</span>
          <div>
            <p className={`text-sm font-black uppercase tracking-widest ${light ? "text-brand-start" : "text-white"}`}>
              You&apos;re on the list!
            </p>
            <p className={`text-xs font-medium mt-0.5 ${light ? "text-slate-gray" : "text-white/60"}`}>
              We&apos;ll email you the moment we launch on App Store & Google Play.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${center ? "items-center" : "items-start"}`}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 ${center ? "items-center justify-center" : "items-start"} w-full`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={`rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all ${large ? "py-5 text-base" : ""} ${
            center ? "w-full max-w-xs" : "w-full sm:w-72"
          } ${
            light
              ? "bg-gray-50 border-2 border-gray-200 text-ebony placeholder:text-gray-400 focus:border-brand-start"
              : "bg-white border-2 border-gray-300 text-ebony placeholder:text-gray-400 focus:border-brand-start"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 rounded-2xl px-8 text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl whitespace-nowrap disabled:opacity-70 ${large ? "py-5 text-sm" : "py-4"} ${
            light
              ? "bg-ebony text-white hover:bg-zinc-800 hover:scale-105"
              : "bg-white text-ebony hover:bg-gray-50 hover:scale-105"
          }`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>🐾 Join Waitlist</>
          )}
        </button>
      </form>
      {error && (
        <p className={`text-xs font-bold ${light ? "text-red-500" : "text-red-300"}`}>{error}</p>
      )}
    </div>
  );
}
