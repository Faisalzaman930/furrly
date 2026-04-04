import Link from "next/link";
import DownloadButtons from "../components/DownloadButtons";
import FaqAccordion from "../components/FaqAccordion";
import ContactSection from "../components/ContactSection";
import PhoneFrame from "../components/PhoneFrame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Adoption App | Browse Verified Rescues & Apply in One Tap — Furrly",
  description: "Find your next pet on Furrly. Browse verified shelters and rescues, submit paperless adoption applications, and track your process — all from your phone. Free to download.",
  openGraph: {
    title: "Pet Adoption App | Furrly",
    description: "The only mobile app with end-to-end pet adoption — browse verified rescues, apply paperlessly, and get matched in minutes.",
    type: "website",
  },
};

const benefits = [
  {
    icon: "🏠",
    title: "Verified Rescue Network",
    desc: "Every shelter and rescue on Furrly is audited before going live. Registered charity status, operating licenses, and animal welfare standards are all confirmed. No unverified listings.",
  },
  {
    icon: "📋",
    title: "One-Tap Paperless Applications",
    desc: "Build your adopter profile once. Submit it to any rescue on the platform with a single tap. No PDFs, no repeated forms, no waiting for email replies.",
  },
  {
    icon: "💬",
    title: "Direct Rescue Messaging",
    desc: "Coordinate home visits, ask questions, and receive updates through encrypted in-app messaging. No sharing personal contact details until you choose to.",
  },
  {
    icon: "📁",
    title: "Digital Adoption Records",
    desc: "Your complete adoption history, health records transfer, and ownership documentation — all stored in the app and shareable with your vet in seconds.",
  },
];

const howItWorks = [
  { num: "01", title: "Create Your Adopter Profile", desc: "Add your home setup, lifestyle, experience with pets, and what you're looking for. Takes about 3 minutes." },
  { num: "02", title: "Browse Verified Listings", desc: "Search by species, breed, age, size, and temperament. Every listing comes from a verified organization." },
  { num: "03", title: "Apply in One Tap", desc: "Submit your pre-built profile to one or multiple rescues simultaneously. Track application status in real time." },
  { num: "04", title: "Meet & Bring Them Home", desc: "Coordinate your home visit via in-app chat. Complete paperwork digitally. That's it." },
];

const faqs = [
  { q: "How do I know the rescues on Furrly are legitimate?", a: "Every organization goes through a verification process before listings go live. We verify registered charity or business status, operating licenses, and require agreement with our animal welfare standards. Verified organizations display a checkmark badge. Listings without it are not active." },
  { q: "Can I apply to multiple rescues at once?", a: "Yes. Once you've built your adopter profile, you can submit it to any number of verified rescues simultaneously with one tap. You'll receive status updates for each application separately in your inbox." },
  { q: "What does the adoption process look like on Furrly?", a: "After submitting your application, the rescue reviews your profile and either approves you for a meet-and-greet or asks follow-up questions through in-app chat. Home visits can be scheduled through the app. Once the rescue confirms the adoption, digital ownership documents are issued directly to your account." },
  { q: "Is there a fee to use the adoption feature?", a: "Furrly is free to download and use. Adoption fees are set entirely by the individual rescue or shelter — Furrly does not charge adopters. Some rescues may charge a small application processing fee; this is disclosed on the listing." },
  { q: "What happens to my pet's records when I adopt?", a: "When adoption is finalized, the rescue transfers all existing medical records, vaccination history, and microchip data to your Furrly health wallet. These are permanently accessible and can be shared with any vet in our network." },
];

const relatedResources = [
  { slug: "complete-guide-to-puppy-care", title: "The Complete Guide to Puppy Care", type: "Complete Guide" },
  { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Complete Guide", type: "Expert Guide" },
  { slug: "what-is-positive-reinforcement-dog-training", title: "What Is Positive Reinforcement Training?", type: "Health Glossary" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Furrly Pet Adoption — Verified Rescues & Paperless Applications",
  "description": "Browse verified shelters and rescues, submit paperless adoption applications, and track your process on Furrly.",
  "url": "https://furrly.app/adoption",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Furrly",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
};

export default function AdoptionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-amber-50 py-20 lg:py-32">
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  🏠 Adoption Feature
                </span>
                <h1 className="text-5xl font-black text-ebony leading-[0.9] uppercase sm:text-7xl tracking-tighter">
                  Find Their<br /><span className="text-amber-600">Forever.</span><br />In One Tap.
                </h1>
                <p className="text-xl text-slate-gray leading-relaxed max-w-lg">
                  Furrly connects you directly with verified rescues. Browse real listings, submit paperless applications, and bring your next best friend home — all from your phone.
                </p>
                <DownloadButtons />
              </div>
              {/* Phone screenshot */}
              <div className="flex justify-center lg:justify-end">
                <div
                  className="w-[260px]"
                  style={{ animation: "float-a 3.5s ease-in-out infinite" }}
                >
                  <PhoneFrame src="/screenshots/app-adoption.png" alt="Furrly adoption feature — PawDiscover screen" />
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
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">Adoption Without the Paperwork</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-amber-100 rounded-[1.5rem] flex items-center justify-center text-2xl mb-6">{b.icon}</div>
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
              <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter sm:text-5xl">From Browse to Bringing Home</h2>
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
        <FaqAccordion faqs={faqs} title="Adoption Questions Answered" />

        {/* RELATED RESOURCES */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-8 text-center">Prepare for Your New Pet</h2>
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
            <p className="text-white/40 font-black uppercase tracking-widest text-xs mb-4">Free to Download</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Your Next Best Friend is Waiting.</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">Thousands of pets in verified rescues, browsable right now. One profile. One tap. Yours.</p>
            <DownloadButtons light center />
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  );
}
