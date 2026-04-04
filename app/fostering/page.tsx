import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Fostering App | Become a Foster Pet Parent — Furrly",
  description: "Join Furrly's fostering network. Get matched with pets that need temporary homes, access vet sync, supply networks, and expert support. Foster your first pet in minutes. Free download.",
  openGraph: {
    title: "Pet Fostering App | Become a Foster Pet Parent — Furrly",
    description: "Furrly connects foster parents with rescues that need them. Get vet sync, behavioral support, and a community of 10,000+ experienced foster carers.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "💖",
    title: "Instant Rescue Matching",
    desc: "Tell Furrly your capacity — size, species, duration, whether you can take medical cases — and get matched with rescues that specifically need your profile. No cold-calling shelters.",
  },
  {
    icon: "🏥",
    title: "Automatic Vet Sync",
    desc: "When you take in a foster pet, their medical records transfer automatically. Your vet has full history. Prescription pickups, follow-up appointments, and vaccination records — all synced.",
  },
  {
    icon: "📦",
    title: "Supply Network Access",
    desc: "Access donated supplies from local partners — food, bedding, crates, medications. Furrly connects you with the foster support infrastructure so you're never out of pocket unexpectedly.",
  },
  {
    icon: "👥",
    title: "24/7 Foster Community",
    desc: "A private forum and chat for active foster parents. Ask questions at 2am when the new foster won't settle. Experienced members respond. Crisis support is always available.",
  },
];

const howItWorks = [
  { num: "01", title: "Build Your Foster Profile", desc: "Specify your home setup, capacity (size/species/duration), experience level, and any restrictions. This matches you with appropriate rescue requests." },
  { num: "02", title: "Get Matched with a Rescue", desc: "Rescues post foster requests with full pet details, duration, and what support they provide. You choose which requests to accept." },
  { num: "03", title: "Welcome Your Foster Pet", desc: "Medical records transfer automatically. Access behavioral notes, feeding schedules, and medical history in the app before the pet even arrives." },
  { num: "04", title: "Support Throughout", desc: "Log updates, access your supply network, and reach the foster community 24/7. When your foster is ready, the rescue coordinates the next step." },
];

const faqs = [
  { q: "Do I need experience to foster a pet on Furrly?", a: "No prior fostering experience is required for most placement types. You'll indicate your experience level in your profile, and the matching algorithm will show you requests appropriate to your level. New fosters are typically matched with stable, adult animals. Medical fosters, neonates, and behavioral cases are shown to experienced carers only." },
  { q: "Who pays for food and vet care while fostering?", a: "This varies by rescue. Most rescues cover all veterinary costs for illnesses and emergencies during your foster period. Some provide food and supplies, others offer reimbursement. Furrly's supply network can also provide donated essentials. Each foster listing clearly states what the rescue provides before you commit." },
  { q: "How long does a typical foster placement last?", a: "Duration ranges from overnight emergency boarding (when a pet needs to leave a situation immediately) to several months while a pet recovers from surgery or finds a permanent home. Each listing specifies the expected duration. You can filter by duration when browsing requests." },
  { q: "What happens if a foster isn't working out?", a: "Contact the rescue through in-app messaging. Every foster agreement includes a return process — the rescue is responsible for taking the pet back if the placement isn't working. Furrly's foster community can also offer advice for common adjustment challenges before escalating to a full return." },
  { q: "Can I adopt the pet I'm fostering?", a: "Many foster relationships end in adoption — this is called a 'foster fail' and is considered a success in the rescue community. If you want to adopt your foster pet, notify the rescue through in-app messaging. The transition from foster to adoption records is handled entirely within the app." },
];

const relatedResources = [
  { slug: "introducing-pets-to-each-other", title: "How to Introduce Pets to Each Other", type: "Expert Guide" },
  { slug: "how-to-help-dog-with-separation-anxiety", title: "How to Help a Dog with Separation Anxiety", type: "How-To" },
  { slug: "complete-guide-to-puppy-care", title: "Complete Puppy Care Guide", type: "Complete Guide" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Fostering — Become a Foster Pet Parent",
  "description": "Get matched with pets that need temporary homes, with vet sync, supply networks, and 24/7 community support.",
  "url": "https://furrly.app/fostering",
};

export default function FosteringPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-red-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-red-200/30 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-red-100 border border-red-200 text-red-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  💖 Fostering Network
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Be Their<br /><span className="text-brand-start">Safe Place.</span><br />Temporarily.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  Fostering saves lives — and Furrly makes it manageable. Get matched with the right pet, receive vet records automatically, and access a community of 10,000+ experienced fosters.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[{ v: "10K+", l: "Foster Parents" }, { v: "Auto", l: "Vet Record Sync" }, { v: "24/7", l: "Community Support" }].map(s => (
                    <div key={s.v} className="bg-white border border-red-100 rounded-2xl px-5 py-3 text-center shadow-sm">
                      <p className="text-lg font-black text-ebony">{s.v}</p>
                      <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <DownloadButtons />
              </div>
              {/* Mock UI */}
              <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-red-100">
                <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-6">Foster Requests Near You</p>
                {[
                  { name: "Gracie", detail: "Spaniel Mix · 2 weeks", rescue: "City Paws Rescue", tag: "Urgent" },
                  { name: "Mr. Socks", detail: "DSH Cat · 1 month", rescue: "Tabby Haven", tag: "Medical" },
                  { name: "Dino", detail: "Lab Puppy · 3 weeks", rescue: "PupStart Network", tag: "Puppy" },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-100">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🐾</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-ebony text-sm">{r.name}</p>
                      <p className="text-xs text-slate-gray">{r.detail} · {r.rescue}</p>
                    </div>
                    <span className={`flex-shrink-0 text-[10px] font-black px-3 py-1 rounded-full ${r.tag === "Urgent" ? "bg-red-100 text-red-800" : r.tag === "Medical" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>{r.tag}</span>
                  </div>
                ))}
                <button className="w-full mt-4 bg-brand-gradient text-white font-black py-4 rounded-2xl text-sm uppercase tracking-widest">Offer to Foster</button>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">What You Get</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Fostering with Full Support</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-red-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
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
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">From Sign-Up to Safe Home</h2>
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

        <FaqAccordion faqs={faqs} title="Fostering Questions Answered" />

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Prepare for Your Foster Pet</h2>
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
            <p className="text-white/40 font-black uppercase tracking-widest text-xs mb-4">Make a Real Difference</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">You Could Save a Life This Week.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Foster families are always needed. Download Furrly, set up your profile, and be matched with a pet that needs exactly what you can offer.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
