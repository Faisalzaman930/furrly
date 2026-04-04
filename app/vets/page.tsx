import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Vet Near Me | Pet Clinic Directory & 24/7 Advice — Furrly",
  description: "Find trusted vets near you on Furrly. Browse verified clinics with real reviews, emergency contacts, and hours. Track your pet's health records in one place. Free to download.",
  openGraph: {
    title: "Find a Vet Near Me | Furrly",
    description: "Real-time vet discovery, verified clinic reviews, emergency contacts, and a digital health wallet for your pet — all in the Furrly app.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "📍",
    title: "Local Clinic Discovery",
    desc: "Find verified vets near your current location. Filter by specialty (emergency, dental, exotic, etc.), opening hours, and distance. Real-time availability indicators.",
  },
  {
    icon: "⭐",
    title: "Real Verified Reviews",
    desc: "Reviews from verified Furrly pet parents — not anonymous. See what real owners say about wait times, staff quality, costs, and bedside manner before you book.",
  },
  {
    icon: "🚨",
    title: "One-Tap Emergency Call",
    desc: "Every clinic listing includes a direct emergency number. One tap dials the nearest 24/7 emergency vet. No searching during a crisis.",
  },
  {
    icon: "📋",
    title: "Digital Health Wallet",
    desc: "Store your pet's complete medical history, vaccination records, prescriptions, and lab results in one place. Share with any vet in the network in seconds.",
  },
];

const howItWorks = [
  { num: "01", title: "Open Vet Finder", desc: "The app uses your location to show all verified clinics within your chosen radius — from 1km to 50km." },
  { num: "02", title: "Filter for Your Needs", desc: "Emergency care, dental, dermatology, exotic pets. Filter by specialty, hours, accepted insurance, and user rating." },
  { num: "03", title: "Read Reviews & Call", desc: "Read verified reviews, check live hours, and dial the clinic or emergency line directly from the listing." },
  { num: "04", title: "Share Health Records", desc: "With one tap, share your pet's complete health wallet with the clinic before your visit. No paper forms." },
];

const faqs = [
  { q: "How does Furrly find vets near me?", a: "The app uses your device's location (with permission) to show verified vet clinics within your chosen radius. You can adjust the search radius from 1km to 50km, and results update in real time as you move. All listed clinics have been verified for active operating status." },
  { q: "Are the vet reviews on Furrly trustworthy?", a: "Reviews are only accepted from verified Furrly accounts — users who have completed identity verification and have an active pet profile. Anonymous reviews are not permitted. This significantly reduces fake or incentivized reviews compared to general-purpose platforms." },
  { q: "What is the pet health wallet?", a: "Your pet's digital health record — a centralized store for vaccinations, medical history, prescriptions, deworming records, and lab results. Records can be added manually, uploaded as PDFs, or transferred automatically when a vet in our network finalizes a visit. Completely portable." },
  { q: "Can Furrly replace my regular vet?", a: "No — Furrly helps you find, communicate with, and access records from your vet. We're a discovery and organization layer, not a medical provider. The 24/7 chat feature is AI-assisted guidance for triage questions — it always recommends professional consultation for anything beyond minor queries." },
  { q: "What should I do if my pet has a medical emergency?", a: "In the app, tap the emergency button on any clinic listing for a direct call. You can also access the emergency contacts from your pet's profile without opening the full directory. If your pet is in immediate danger, call your nearest emergency vet directly — don't wait for the app to load." },
];

const relatedResources = [
  { slug: "why-is-my-dog-not-eating", title: "Why Is My Dog Not Eating?", type: "Symptom Guide" },
  { slug: "what-is-kennel-cough", title: "What Is Kennel Cough?", type: "Health Glossary" },
  { slug: "dog-breathing-fast-at-rest", title: "Dog Breathing Fast at Rest", type: "Symptom Guide" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Vet Directory — Find Verified Vets Near You",
  "description": "Real-time vet discovery, verified reviews, emergency contacts, and a digital health wallet — all in the Furrly app.",
  "url": "https://furrly.app/vets",
};

export default function VetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-emerald-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  🏥 Vet Directory
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Find a Vet<br /><span className="text-emerald-600">You Can Trust.</span><br />Right Now.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  Real-time clinic discovery, verified reviews, one-tap emergency calls, and a digital health wallet for every record your vet will ever need.
                </p>
                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  {[{ v: "24/7", l: "Emergency Access" }, { v: "Real", l: "Verified Reviews" }, { v: "Free", l: "Health Wallet" }].map(s => (
                    <div key={s.v} className="bg-white border border-emerald-100 rounded-2xl px-5 py-3 text-center shadow-sm">
                      <p className="text-lg font-black text-ebony">{s.v}</p>
                      <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <DownloadButtons />
              </div>
              {/* Mock UI */}
              <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-6">Vets Near You</p>
                {[
                  { name: "City Animal Hospital", dist: "0.8km", hours: "Open 24/7", stars: "★★★★★" },
                  { name: "Paws & Claws Clinic", dist: "1.4km", hours: "Open until 8pm", stars: "★★★★½" },
                  { name: "Metro Pet Emergency", dist: "2.1km", hours: "Emergency Only", stars: "★★★★★" },
                ].map((vet) => (
                  <div key={vet.name} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-100">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🏥</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-ebony text-sm truncate">{vet.name}</p>
                      <p className="text-xs text-slate-gray">{vet.dist} · {vet.hours}</p>
                      <p className="text-xs text-amber-500">{vet.stars}</p>
                    </div>
                    <button className="flex-shrink-0 bg-brand-gradient text-white text-xs font-black px-3 py-2 rounded-xl">Call</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">What You Get</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Your Pet's Health Hub</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
                  <h3 className="font-black text-ebony text-lg uppercase tracking-tight mb-3">{b.title}</h3>
                  <p className="text-sm text-slate-gray leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">The Experience</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">From Search to Seen in Minutes</h2>
            </div>
            <div className="space-y-6">
              {howItWorks.map((step, i) => (
                <div key={i} className="flex gap-6 items-start bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg">{step.num}</div>
                  <div>
                    <h3 className="font-black text-ebony text-xl uppercase tracking-tight mb-2">{step.title}</h3>
                    <p className="text-slate-gray leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion faqs={faqs} title="Vet Finder Questions Answered" />

        {/* RELATED RESOURCES */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Know the Symptoms Before You Go</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedResources.map((r) => (
                <Link key={r.slug} href={`/resources/${r.slug}`} className="group bg-white rounded-[2rem] p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="text-[10px] font-black text-brand-start bg-brand-start/10 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{r.type}</span>
                  <h3 className="font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-ebony">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <p className="text-white/40 font-black uppercase tracking-widest text-xs mb-4">Your Pet's Health Hub</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Every Vet. Every Record. One App.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Download Furrly and never scramble for your pet's records or a nearby emergency vet again.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
