import WaitingList from "./WaitingList";
import Link from "next/link";

interface ComingSoonPageProps {
  icon: string;
  feature: string;
  tagline: string;
  description: string;
  phase?: string;
  bullets?: string[];
}

export default function ComingSoonPage({ icon, feature, tagline, description, phase = "Phase 2", bullets = [] }: ComingSoonPageProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] py-28 md:py-36">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="text-7xl mb-6">{icon}</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/80 uppercase tracking-widest mb-6">
            {phase} · Coming Soon
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
            {feature}
          </h1>
          <p className="text-white/70 text-xl leading-relaxed max-w-xl mx-auto mb-4 font-bold">{tagline}</p>
          <p className="text-white/50 text-base leading-relaxed max-w-lg mx-auto mb-12">{description}</p>
          <div className="flex justify-center">
            <WaitingList center large />
          </div>
          <p className="mt-5 text-white/40 text-xs font-bold uppercase tracking-widest">
            Get notified the moment this feature goes live
          </p>
        </div>
      </section>

      {/* What to expect */}
      {bullets.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-4 text-center">What to Expect</p>
            <h2 className="text-3xl font-black text-ebony uppercase tracking-tight text-center mb-12">What We&apos;re Building</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                  <div className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow">
                    {i + 1}
                  </div>
                  <p className="text-slate-gray text-sm leading-relaxed font-medium pt-1">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="py-12 bg-gray-50 border-t border-gray-100 text-center">
        <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-black text-brand-start uppercase tracking-widest hover:underline">
          ← View Full Roadmap & Vote for Features
        </Link>
      </section>
    </div>
  );
}
