import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import PhoneFrame from "../components/PhoneFrame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Social Media App | Share Your Pet's Life — Furrly",
  description: "Furrly's pet social feed puts your neighborhood first. Share photos, discover local pet owners, join breed groups, and build a real community — not a global algorithm. Free on iOS & Android.",
  openGraph: {
    title: "Pet Social Media App | Furrly",
    description: "A neighborhood-first pet social feed. Discover local owners, share your pet's story, and build a real community around the pets you'll actually meet.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "🏘️",
    title: "Neighborhood-First Feed",
    desc: "Your feed prioritizes posts from pet owners in your immediate area — people you might actually meet at the park. Less noise, more connection.",
  },
  {
    icon: "📸",
    title: "Native Pet Photography",
    desc: "Built-in photo filters and framing tools optimized for different coat types, lighting conditions, and action shots. Your pet deserves to look their best.",
  },
  {
    icon: "🐾",
    title: "Breed & Interest Groups",
    desc: "Join groups for your pet's breed, health conditions, lifestyle, or hobbies. High-signal communities with shared context instead of generic comment sections.",
  },
  {
    icon: "🎯",
    title: "Interest-Driven Algorithm",
    desc: "Our feed algorithm learns what you engage with — breed content, health updates, funny moments — and shows you more of it. No sponsored posts pushing irrelevant products.",
  },
];

const howItWorks = [
  { num: "01", title: "Create Your Pet's Profile", desc: "Add photos, breed, personality traits, and a bio. Your pet gets their own profile — searchable by local owners." },
  { num: "02", title: "Discover Your Neighborhood", desc: "See posts from pet owners within your area. React, comment, and follow the pets you want to keep up with." },
  { num: "03", title: "Join Groups That Matter", desc: "Find your breed community, join health condition support groups, or participate in monthly photo challenges." },
  { num: "04", title: "Connect Beyond the Screen", desc: "Use the feed as a launchpad for real-world playdates, local meetups, and neighbourhood pet-owner friendships." },
];

const faqs = [
  { q: "How is Furrly's social feed different from Instagram or TikTok?", a: "The key difference is the neighborhood-first algorithm. Instagram and TikTok prioritize content from accounts with large followings regardless of location. Furrly's feed is radius-based — you see the pets that live near you first. This means your engagement builds a local community you can actually interact with in real life, not just online." },
  { q: "Is there a public or private option for pet profiles?", a: "Yes. You can set your pet's profile to fully public (visible to anyone on the platform), local-only (visible only to users within your chosen radius), or friends-only (visible only to accounts you follow back). Your personal information is always separate from your pet's public profile." },
  { q: "Are there breed-specific groups?", a: "Yes. Furrly has groups for hundreds of breeds as well as mix-type groups (e.g., 'Doodle Mixes', 'Rescue Mutts'). Groups include discussion boards, photo sharing, health Q&As, and member-organized local meetups. Any user can request a new group if their breed isn't listed." },
  { q: "Can I sell pet products on the social feed?", a: "Not currently. The social feed is community-first — no vendor listings, no sponsored posts, no selling in the feed. A marketplace feature is in development for a future app update, but it will be a separate section rather than integrated into the social feed to keep it clean." },
  { q: "What content moderation does Furrly have?", a: "All posts go through automated content filtering for prohibited material (animal cruelty, graphic content, spam). Users can report any post or profile. Verified moderators review reports within 24 hours. Accounts with multiple verified reports are suspended pending review. Verified users have stricter accountability than unverified ones." },
];

const relatedResources = [
  { slug: "how-to-crate-train-a-puppy", title: "How to Crate Train a Puppy", type: "How-To" },
  { slug: "cat-body-language-decoded", title: "Cat Body Language Decoded", type: "Expert Guide" },
  { slug: "complete-guide-to-puppy-care", title: "Complete Puppy Care Guide", type: "Complete Guide" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Social — Neighborhood-First Pet Social Feed",
  "description": "A pet social media feed built around local discovery. Connect with pet owners near you, join breed groups, and build a real community.",
  "url": "https://furrly.app/social",
};

export default function SocialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-pink-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-pink-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-pink-100 border border-pink-200 text-pink-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  📸 Social Feed
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Your Pet's<br /><span className="text-pink-600">Community.</span><br />Right Outside.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  Not another global algorithm. Furrly's feed shows you pets in your neighborhood first — so the connections you make online can actually become real-world friendships.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[{ v: "Local", l: "Feed First" }, { v: "No Ads", l: "In Feed" }, { v: "Breed", l: "Groups" }].map(s => (
                    <div key={s.v} className="bg-white border border-pink-100 rounded-2xl px-5 py-3 text-center shadow-sm">
                      <p className="text-lg font-black text-ebony">{s.v}</p>
                      <p className="text-[10px] font-bold text-slate-gray uppercase tracking-widest mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <DownloadButtons />
              </div>
              {/* Phone screenshots — feed + profile */}
              <div className="flex justify-center items-end gap-4">
                <div
                  className="w-[200px] mb-6"
                  style={{ animation: "float-b 4.5s ease-in-out 0.4s infinite", transform: "rotate(-4deg)" }}
                >
                  <PhoneFrame src="/screenshots/app-social-profile.png" alt="Furrly pet profile screen" />
                </div>
                <div
                  className="w-[220px]"
                  style={{ animation: "float-a 3.5s ease-in-out 0s infinite" }}
                >
                  <PhoneFrame src="/screenshots/app-social-feed.png" alt="Furrly social feed screen" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">Why Furrly Social</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Social Media Built for Pet Parents</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-pink-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
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
              <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-3">Getting Started</p>
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Post, Connect, Meet</h2>
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

        <FaqAccordion faqs={faqs} title="Social Feed Questions Answered" />

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Know Your Pet Better</h2>
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
            <p className="text-white/40 font-black uppercase tracking-widest text-xs mb-4">Free to Join</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Your Neighborhood's Pet Community is Already Here.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Download Furrly and meet the pet owners you walk past every day.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
