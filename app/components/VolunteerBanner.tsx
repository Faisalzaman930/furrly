import Link from "next/link";

export default function VolunteerBanner() {
  return (
    <section className="bg-ebony py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs font-black text-brand-end uppercase tracking-widest mb-2">Hey, we need your help 🐾</p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
              Got a soft spot for animals?
            </h3>
            <p className="text-white/60 text-sm mt-2 max-w-lg leading-relaxed">
              We&apos;re two friends trying to save animals, find them loving homes, and make life better for every pet owner on the planet. Volunteer, shelter, vet, or just a pet lover — come help us. Every hand counts. 🐕🐈
            </p>
          </div>
          <Link
            href="/join"
            className="flex-shrink-0 bg-brand-gradient text-white font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-start/30 whitespace-nowrap"
          >
            🙋 Yes, I want to help →
          </Link>
        </div>
      </div>
    </section>
  );
}
