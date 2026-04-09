import WaitingList from "./WaitingList";

export default function WaitlistBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] py-24 md:py-32">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/80 uppercase tracking-widest mb-8">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          App Store &amp; Google Play — Coming Very Soon
        </div>

        {/* headline */}
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
          Be First.<br />
          <span className="text-transparent bg-clip-text" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, #FDE68A, #FCA5A5)" }}>
            Join the Waitlist.
          </span>
        </h2>

        {/* sub */}
        <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Furrly is launching on iOS &amp; Android soon. Drop your email and get early access before the public — built by two pet lovers, for every pet lover on the planet.
        </p>

        {/* form */}
        <div className="flex justify-center">
          <WaitingList center large />
        </div>

        <p className="mt-5 text-white/40 text-xs font-bold uppercase tracking-widest">
          No spam · One launch email · Unsubscribe anytime
        </p>

        {/* social proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "🎉", label: "Playdates" },
            { icon: "📸", label: "Social Feed" },
            { icon: "🏠", label: "Shelters" },
            { icon: "💛", label: "Adoption" },
            { icon: "🏥", label: "Vets — Soon" },
            { icon: "🔍", label: "Lost & Found — Soon" },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-2xl px-5 py-2.5">
              <span>{f.icon}</span>
              <span className="text-white/80 text-xs font-black uppercase tracking-widest">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
