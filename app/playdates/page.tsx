import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import PhoneFrame from "../components/PhoneFrame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Playdate App | Find Dog Playdates Near Me — Furrly",
  description: "Find safe, compatible playmates for your dog or cat with Furrly. Proximity-based matching by breed, size & temperament. Coordinate meetups with encrypted chat. Free download.",
  openGraph: {
    title: "Pet Playdate App | Find Dog Playdates Near Me — Furrly",
    description: "AI-powered proximity matching helps you find the right playmate for your pet — filter by size, temperament, and breed. Free on iOS & Android.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "📍",
    title: "Proximity-Based Matching",
    desc: "See pets available for playdates within your chosen radius. Sorted by distance so you only meet owners you could realistically see at the park.",
  },
  {
    icon: "🎯",
    title: "Compatibility Filters",
    desc: "Filter by size, breed, energy level, play style, and whether a pet is good with dogs, cats, or children. Find genuinely compatible matches, not just nearby ones.",
  },
  {
    icon: "🔒",
    title: "Secure Owner Verification",
    desc: "Every user goes through identity verification before being able to send playdate requests. No anonymous profiles. You always know who you're meeting.",
  },
  {
    icon: "💬",
    title: "Encrypted Meetup Chat",
    desc: "Coordinate playdates through end-to-end encrypted messaging. Share meeting spots, reschedule, or cancel — without sharing personal contact info first.",
  },
];

const howItWorks = [
  { num: "01", title: "Set Your Preferences", desc: "Tell us your pet's size, breed, energy level, and play style. This filters your matches to pets that are genuinely a good fit." },
  { num: "02", title: "Browse Nearby Pets", desc: "Swipe through compatible pets in your area. See photos, personality descriptions, and compatibility scores." },
  { num: "03", title: "Send a Playdate Request", desc: "Found a great match? Send a request with a proposed location and time. The other owner accepts, declines, or suggests an alternative." },
  { num: "04", title: "Meet at the Park", desc: "Confirm through in-app chat and meet up. After the playdate, both owners can rate the experience." },
];

const faqs = [
  { q: "How does the pet compatibility matching work?", a: "When you create your pet's profile, you fill in size, breed, energy level, play style (rough-and-tumble vs. chase-only vs. sniff-and-wander), and how they do with other dogs, cats, or children. Our matching algorithm weights these factors to calculate a compatibility score with nearby pets. Higher scores mean more similar play styles and fewer risk factors." },
  { q: "Is it safe to arrange playdates with strangers?", a: "Furrly requires identity verification for all users before playdate functionality is enabled. You can see a user's verification badge, rating history, and how long they've been on the platform before agreeing to a meetup. Always meet in public, well-lit spaces — your in-app chat history is preserved for reference." },
  { q: "Can I find playdates for reactive or shy dogs?", a: "Yes. The filter system includes 'calm energy only', 'experienced owners preferred', and 'one-on-one meetups' options. Many owners of reactive or anxious dogs use Furrly specifically because they can find patient, experienced owners who understand slow introductions rather than chaotic dog park encounters." },
  { q: "What if a playdate doesn't go well?", a: "Both owners can rate the playdate after it happens. If there was an incident (injury, aggression, owner misconduct), you can file a report through the app. Reported users are reviewed and may be suspended or removed from the matching pool. Your pet's safety history on the platform is always private." },
  { q: "Does Furrly work for cats too?", a: "Yes, though cat playdates work differently. Most cat-to-cat socialization happens indoors. Furrly supports playdates for cats with appropriate filters (indoor meetups, calm environments, slow introductions). You can also connect with other cat owners in the social feed without committing to a physical meetup." },
];

const relatedResources = [
  { slug: "how-to-stop-dog-pulling-on-leash", title: "How to Stop Dog Pulling on Leash", type: "How-To" },
  { slug: "how-to-read-dog-body-language", title: "How to Read Dog Body Language", type: "How-To" },
  { slug: "complete-guide-to-dog-training", title: "Complete Guide to Dog Training", type: "Complete Guide" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Playdates — Find Dog Playdates Near You",
  "description": "Proximity-based pet matching for safe, compatible playdates. Filter by breed, size, and temperament.",
  "url": "https://furrly.app/playdates",
};

export default function PlaydatesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-violet-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 text-violet-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  🎉 Playdates Feature
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Find the Perfect<br /><span className="text-violet-600">Playmate.</span><br />In Your Area.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  Stop relying on chaotic dog parks. Furrly matches your pet with compatible companions nearby — filtered by size, temperament, and energy level.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[{ v: "Verified", l: "Owners Only" }, { v: "Filtered", l: "By Compatibility" }, { v: "Encrypted", l: "Meetup Chat" }].map(s => (
                    <div key={s.v} className="bg-white border border-violet-100 rounded-2xl px-5 py-3 text-center shadow-sm">
                      <p className="text-lg font-black text-ebony">{s.v}</p>
                      <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <DownloadButtons />
              </div>
              {/* Phone screenshot */}
              <div className="flex justify-center lg:justify-end">
                <div
                  className="w-[260px]"
                  style={{ animation: "float-a 3.5s ease-in-out infinite" }}
                >
                  <PhoneFrame src="/screenshots/app-playdates.png" alt="Furrly PawDates — pet swipe card screen" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">Why Furrly</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Socialization Done Right</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-violet-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
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
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Match. Chat. Meet.</h2>
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

        <FaqAccordion faqs={faqs} title="Playdate Questions Answered" />

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Train Before You Socialize</h2>
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
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Your Dog Deserves a Best Friend.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Thousands of verified pet owners near you. Find the right match in minutes.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
