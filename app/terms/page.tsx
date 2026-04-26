import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Furrly",
  description: "Read the Terms and Conditions governing your use of the Furrly platform and mobile app.",
};

const LAST_UPDATED = "April 27, 2026";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-ebony py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/70 uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">

            <Intro />

            <Section title="1. Acceptance of Terms">
              <p>By accessing or using Furrly — including our website at furrly.co, our mobile application, or any related services — you agree to be bound by these Terms. If you do not agree, please do not use the Service.</p>
              <p>We may update these Terms at any time. Continued use of the Service after changes constitutes your acceptance of the revised Terms. We will notify you of material changes via email or a notice on the site.</p>
            </Section>

            <Section title="2. Eligibility">
              <ul>
                <li>You must be at least <strong>13 years old</strong> to use Furrly.</li>
                <li>If you are under 18, you must have your parent or guardian's permission.</li>
                <li>By using Furrly, you represent that all information you provide is accurate and truthful.</li>
              </ul>
            </Section>

            <Section title="3. Your Account">
              <ul>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You are responsible for all activity that occurs under your account.</li>
                <li>Notify us immediately at <a href="mailto:hello@furrly.co">hello@furrly.co</a> if you suspect unauthorised access to your account.</li>
                <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
              </ul>
            </Section>

            <Section title="4. Acceptable Use">
              <p>You agree to use Furrly only for lawful purposes. You must not:</p>
              <ul>
                <li>Post false, misleading, or fraudulent pet listings or profiles.</li>
                <li>Harass, abuse, or harm other users or animals.</li>
                <li>Use Furrly to sell pets commercially or operate unlicensed breeding operations.</li>
                <li>Scrape, copy, or redistribute content from the platform without permission.</li>
                <li>Attempt to gain unauthorised access to our systems or other users' accounts.</li>
                <li>Use the platform to spam, phish, or distribute malware.</li>
                <li>Violate any applicable local, national, or international laws or regulations.</li>
              </ul>
              <p>We reserve the right to remove content or suspend accounts that violate these rules at our sole discretion.</p>
            </Section>

            <Section title="5. Pet Listings & Adoption">
              <p>Furrly facilitates connections between pet owners, adopters, shelters, and rescues. We are not a party to any adoption agreement and are not responsible for:</p>
              <ul>
                <li>The accuracy of pet listings posted by users or shelters.</li>
                <li>The outcome of any adoption, fostering, or rehoming arrangement.</li>
                <li>The health, temperament, or history of any pet listed on the platform.</li>
              </ul>
              <p>All pet transactions and arrangements are solely between the parties involved. We strongly encourage meeting in safe, public places and conducting due diligence before any adoption.</p>
            </Section>

            <Section title="6. User Content">
              <p>You retain ownership of content you post on Furrly (photos, bios, comments). By posting content, you grant Furrly a non-exclusive, royalty-free, worldwide licence to use, display, and distribute that content solely to operate and promote the Service.</p>
              <p>You are solely responsible for the content you post. Do not post content that is illegal, defamatory, obscene, or infringes the intellectual property rights of others.</p>
            </Section>

            <Section title="7. Playdates & In-Person Meetings">
              <p>Furrly helps users arrange pet playdates and in-person meetups. We are not responsible for any incidents, injuries, or losses that occur during or as a result of meetings arranged through the platform. You participate in playdates and meetups at your own risk.</p>
            </Section>

            <Section title="8. Volunteer Programme">
              <p>Volunteers who contribute to Furrly do so without expectation of financial compensation unless a separate written agreement has been made. We reserve the right to accept or decline volunteer applications at our discretion.</p>
            </Section>

            <Section title="9. Intellectual Property">
              <p>All Furrly branding, design, logos, code, and content (excluding user-generated content) are the intellectual property of Furrly and its founders. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>
            </Section>

            <Section title="10. Third-Party Services">
              <p>Furrly integrates with or links to third-party services (e.g. shelter directories, vet portals, app stores). We are not responsible for the content, privacy practices, or reliability of those third-party services. Use them at your own discretion.</p>
            </Section>

            <Section title="11. Disclaimers">
              <p>Furrly is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, express or implied. We do not guarantee that:</p>
              <ul>
                <li>The Service will be uninterrupted, error-free, or secure.</li>
                <li>Any pet listings, health information, or vet details on the platform are accurate or up to date.</li>
                <li>The Service will meet your specific requirements.</li>
              </ul>
            </Section>

            <Section title="12. Limitation of Liability">
              <p>To the fullest extent permitted by law, Furrly and its founders shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service — including but not limited to damages related to pet health, adoption outcomes, playdate incidents, or data loss.</p>
              <p>Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months prior to the claim (which, for free services, is £0 / $0).</p>
            </Section>

            <Section title="13. Governing Law">
              <p>These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of Furrly shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </Section>

            <Section title="14. Termination">
              <p>We reserve the right to suspend or terminate your access to Furrly at any time, with or without notice, for any reason including violation of these Terms. You may delete your account at any time by contacting us at <a href="mailto:hello@furrly.co">hello@furrly.co</a>.</p>
            </Section>

            <Section title="15. Contact Us">
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:hello@furrly.co">hello@furrly.co</a></li>
                <li>Website: <a href="https://furrly.co">furrly.co</a></li>
              </ul>
            </Section>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Link href="/privacy" className="text-sm font-bold text-brand-start hover:underline">
              Read our Privacy Policy →
            </Link>
            <Link href="/" className="text-sm font-bold text-slate-gray hover:text-ebony transition-colors">
              ← Back to Furrly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Intro() {
  return (
    <div className="bg-gray-50 rounded-3xl p-6 mb-10 border border-gray-100">
      <p className="text-sm leading-7 text-slate-gray">
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of Furrly (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), including our website at{" "}
        <a href="https://furrly.co" className="text-brand-start font-bold">furrly.co</a>{" "}
        and our mobile application (collectively, the &quot;Service&quot;). Please read these Terms carefully before using the Service.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-black text-ebony uppercase tracking-tight mb-4 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-sm leading-7 text-slate-gray space-y-3 [&_a]:text-brand-start [&_a]:font-bold [&_a:hover]:underline [&_strong]:text-ebony [&_ul]:mt-3 [&_ul]:space-y-2">
        {children}
      </div>
    </div>
  );
}
