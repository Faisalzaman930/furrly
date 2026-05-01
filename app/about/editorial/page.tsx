import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Standards & Review Process",
  description: "How Furrly researches, writes, fact-checks, and updates its pet care content. Our editorial standards, sourcing policy, and veterinary review process.",
};

const SOURCES = [
  { name: "ASPCA Animal Poison Control Center", url: "https://www.aspca.org/pet-care/animal-poison-control-center", note: "Toxicology & poison safety" },
  { name: "WSAVA Global Nutrition Guidelines", url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/", note: "Veterinary nutrition standards" },
  { name: "Cornell University College of Veterinary Medicine", url: "https://www.vet.cornell.edu/", note: "Peer-reviewed clinical research" },
  { name: "American Kennel Club (AKC)", url: "https://www.akc.org/", note: "Breed standards, training, health" },
  { name: "The Cat Fanciers' Association (CFA)", url: "https://cfa.org/", note: "Cat breed profiles and health" },
  { name: "American Veterinary Medical Association (AVMA)", url: "https://www.avma.org/", note: "Veterinary best practices & policy" },
];

export default function EditorialPage() {
  return (
    <div className="bg-white">
      <div className="bg-brand-gradient py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-white/80">Editorial Standards</span>
          </nav>
          <span className="block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit mx-auto">
            Transparency
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Editorial Standards & Review Process
          </h1>
          <p className="text-white/75 text-base max-w-xl mx-auto leading-relaxed">
            How we research, write, fact-check, and keep our pet care content accurate and trustworthy.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">

        <section>
          <h2 className="text-2xl font-black text-ebony mb-4">Our Mission</h2>
          <p className="text-slate-gray leading-relaxed">
            Furrly exists to make pet ownership simpler, healthier, and more joyful. Every article, tool, and guide we publish is built around one question: <strong className="text-ebony">does this genuinely help a pet owner make a better decision?</strong> We do not publish content solely for traffic. If we can&apos;t add something useful, we don&apos;t publish it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-ebony mb-4">Who We Are</h2>
          <p className="text-slate-gray leading-relaxed mb-4">
            Furrly was founded by two pet owners — Faizan (German Shepherds Zeus and Titan) and Faisal (Husky Nova). Our editorial team combines lived experience as pet parents with research grounded in peer-reviewed veterinary science and guidelines from leading animal health organisations.
          </p>
          <p className="text-slate-gray leading-relaxed">
            We are not a replacement for a licensed veterinarian. For any medical concern, always consult your vet. Our content is designed to help you understand your options — not to substitute professional clinical judgment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-ebony mb-6">How We Create Content</h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Topic Selection", body: "We identify topics based on real questions pet owners ask — via community research, search data, and our own experiences. We prioritise topics where reliable, science-backed information is hard to find or poorly written." },
              { step: "2", title: "Research & Sourcing", body: "Every health-related claim is cross-referenced against at least two authoritative sources: peer-reviewed journals, ASPCA guidelines, WSAVA standards, AVMA policy, or accredited veterinary university publications. We link to our primary sources wherever possible." },
              { step: "3", title: "Writing", body: "Articles are written in plain language without sacrificing accuracy. We avoid sensationalism. If a topic is genuinely uncertain in the scientific literature, we say so." },
              { step: "4", title: "Internal Review", body: "Every article goes through an internal editorial review for accuracy, completeness, and clarity before publication. Health and symptom articles receive additional scrutiny against current veterinary guidelines." },
              { step: "5", title: "Updates", body: "Pet health science evolves. We review and update articles when new research, guidelines, or significant veterinary consensus changes. Each article shows its last-updated date." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-start text-white font-black text-sm flex items-center justify-center">{step}</div>
                <div>
                  <h3 className="font-black text-ebony text-base mb-1">{title}</h3>
                  <p className="text-slate-gray text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-ebony mb-4">Medical Disclaimer</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-sm text-amber-900 leading-relaxed">
              The health information on Furrly is provided for educational purposes only. It is not intended to be a substitute for professional veterinary advice, diagnosis, or treatment. Always seek the advice of a qualified veterinarian with any questions you have regarding your pet&apos;s medical condition. Never disregard professional veterinary advice or delay in seeking it because of something you have read on this website.
            </p>
            <p className="text-xs text-amber-700 mt-3 font-bold">
              For emergencies: contact your nearest emergency veterinary clinic or the ASPCA Animal Poison Control Center at 888-426-4435.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-ebony mb-6">Primary Sources We Rely On</h2>
          <div className="space-y-3">
            {SOURCES.map((s) => (
              <div key={s.url} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-grow">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-start text-sm hover:underline">{s.name}</a>
                  <p className="text-xs text-slate-gray mt-0.5">{s.note}</p>
                </div>
                <span className="text-slate-gray text-xs flex-shrink-0">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-ebony mb-4">Corrections Policy</h2>
          <p className="text-slate-gray leading-relaxed">
            If you believe any information on Furrly is inaccurate, outdated, or misleading, please contact us at{" "}
            <a href="mailto:hello@furrly.co" className="text-brand-start font-bold hover:underline">hello@furrly.co</a>. We take corrections seriously and will investigate and update content promptly when errors are confirmed.
          </p>
        </section>

        <div className="border-t border-gray-100 pt-8 flex items-center gap-4">
          <Link href="/about" className="text-sm font-bold text-slate-gray hover:text-brand-start transition-colors">← Back to About</Link>
          <Link href="/resources" className="text-sm font-bold text-slate-gray hover:text-brand-start transition-colors">Browse Resources →</Link>
        </div>
      </div>
    </div>
  );
}
