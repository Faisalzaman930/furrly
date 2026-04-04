import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost Pet App | Report & Find Lost Pets Near Me — Furrly",
  description: "Lost your pet? Furrly sends hyper-local alerts to every active user in your pet's area. GPS sighting tracking, real-time updates, and community coordination — free on iOS & Android.",
  openGraph: {
    title: "Lost Pet App | Find Lost Pets Near Me — Furrly",
    description: "Hyper-local broadcast alerts when a pet goes missing. Your entire neighborhood becomes the search party. Free on iOS & Android.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "📡",
    title: "Hyper-Local Broadcast",
    desc: "The moment you report a lost pet, push notifications go to every active Furrly user within your configurable radius (1–10km). Your neighborhood mobilizes in seconds.",
  },
  {
    icon: "📍",
    title: "GPS Sighting Pins",
    desc: "When someone spots your pet, they tap 'I saw this pet' and the app logs their precise GPS coordinates. You see a real-time map of all reported sightings — not text descriptions, actual coordinates.",
  },
  {
    icon: "🗺️",
    title: "Sighting Cluster Maps",
    desc: "Multiple sighting reports automatically cluster on a map, showing you the direction your pet is moving and the highest-concentration search zone. Narrows the search with every report.",
  },
  {
    icon: "🔔",
    title: "Community Guardian Network",
    desc: "Every Furrly user in your area becomes a guardian. They see your pet's photo, description, and last-known location in their emergency feed until your pet is found.",
  },
];

const howItWorks = [
  { num: "01", title: "Report a Lost Pet", desc: "Open the app and tap 'Report Lost Pet'. Add your pet's photo, description, last known location, and contact preferences. Takes 60 seconds." },
  { num: "02", title: "Neighborhood Alert Goes Out", desc: "Every active Furrly user within your chosen radius receives an immediate push notification with your pet's photo and last known location." },
  { num: "03", title: "Sightings Come In", desc: "When users see your pet, they tap 'I saw this pet'. Their GPS coordinates are logged and you receive an instant notification with the exact location." },
  { num: "04", title: "Found. Close the Alert.", desc: "When your pet is safe, close the alert in the app. The community is notified, and the happy ending is logged on your pet's profile." },
];

const faqs = [
  { q: "How quickly does the lost pet alert go out?", a: "Alerts are sent within 30 seconds of you confirming the report. The notification goes to every active Furrly user within your chosen radius simultaneously. It also appears as a priority item in the local feed for users who have notifications off." },
  { q: "What radius does the lost pet alert cover?", a: "You choose your radius when reporting — options from 1km to 10km. You can expand the radius if no sightings come in after a period. For urban areas, a 2–3km radius is typically sufficient. For rural or semi-rural areas, up to 10km may be appropriate." },
  { q: "What if no one has Furrly in my area?", a: "Furrly's effectiveness grows with community density. In areas with lower coverage, the alert still reaches all existing users. We're actively growing the network. In the meantime, we recommend also posting on local Facebook groups and Nextdoor — Furrly doesn't replace but complements these." },
  { q: "Can I use Furrly to report a found pet?", a: "Yes. If you find a stray or lost-looking animal, open the app and tap 'Report Found Pet'. The listing goes live immediately and is visible to local users. If the owner has already filed a lost report, the app will automatically flag a potential match based on species, description, and location overlap." },
  { q: "What information is shared publicly when I report a lost pet?", a: "Your pet's photo, description, species/breed, and last known location are visible to local users. Your name and personal contact information are never shown publicly — communication happens through Furrly's in-app messaging system. You control how you want to be contacted." },
];

const relatedResources = [
  { slug: "complete-guide-to-pet-health", title: "Complete Guide to Pet Health", type: "Complete Guide" },
  { slug: "how-to-read-dog-body-language", title: "How to Read Dog Body Language", type: "How-To" },
  { slug: "senior-pet-care-guide", title: "Senior Pet Care Guide", type: "Expert Guide" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Lost & Found — Hyper-Local Pet Recovery Network",
  "description": "Report a lost pet and mobilize your entire neighborhood instantly. GPS sighting tracking and real-time community alerts.",
  "url": "https://furrly.app/lost-found",
};

export default function LostFoundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-blue-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  🔍 Lost & Found
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Every Second<br /><span className="text-blue-600">Counts.</span><br />We Move Fast.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  When your pet goes missing, Furrly turns your entire neighborhood into a search party in under 30 seconds. Hyper-local alerts, GPS sighting tracking, and real-time cluster maps.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[{ v: "30s", l: "Alert Time" }, { v: "GPS", l: "Sighting Pins" }, { v: "2hrs", l: "Avg Recovery" }].map(s => (
                    <div key={s.v} className="bg-white border border-blue-100 rounded-2xl px-5 py-3 text-center shadow-sm">
                      <p className="text-lg font-black text-ebony">{s.v}</p>
                      <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <DownloadButtons />
              </div>
              {/* Mock UI */}
              <div className="bg-ebony rounded-[3rem] p-8 shadow-2xl border border-blue-900/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-brand-start animate-pulse" />
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Live Alert Active</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 mb-4 border border-white/10">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🐕</div>
                    <div>
                      <p className="font-black text-white">Biscuit — Missing</p>
                      <p className="text-white/50 text-xs">Beagle · Last seen: Oak St Park</p>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-xs text-white/70 mb-3">
                    📍 3 sightings reported in last 30 min — <span className="text-brand-end font-bold">Elm Road area</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["0.2km", "0.5km", "0.8km"].map((d, i) => (
                      <div key={i} className="bg-blue-500/20 rounded-lg p-2 text-center">
                        <p className="text-white text-xs font-black">{d}</p>
                        <p className="text-white/50 text-[10px]">sighting {i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-brand-gradient text-white font-black py-4 rounded-2xl text-sm uppercase tracking-widest">I Spotted This Pet</button>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Your Neighborhood is the Search Party</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
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
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">The Process</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Report to Reunited</h2>
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

        <FaqAccordion faqs={faqs} title="Lost & Found Questions Answered" />

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Be Prepared Before It Happens</h2>
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

        <section className="py-24 bg-ebony">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <p className="text-white/40 font-black uppercase tracking-widest text-xs mb-4">Free to Download</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Don't Wait Until They're Lost.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Download Furrly now so your pet's profile and emergency network are ready before you ever need them.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
