import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Furrly",
  description: "Learn how Furrly collects, uses, and protects your personal data. We are committed to your privacy and the security of your information.",
};

const LAST_UPDATED = "April 27, 2026";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-ebony py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-xs font-black text-white/70 uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">

            <Intro />

            <Section title="1. Information We Collect">
              <p>We collect information you provide directly to us and information generated automatically when you use Furrly.</p>
              <h4>Information you provide:</h4>
              <ul>
                <li><strong>Account information</strong> — name, email address, password when you register.</li>
                <li><strong>Pet profiles</strong> — pet name, breed, age, photos, and health notes you choose to add.</li>
                <li><strong>Waitlist &amp; volunteer submissions</strong> — email, name, skills, and any message you submit via our forms.</li>
                <li><strong>Communications</strong> — messages or feedback you send us directly.</li>
              </ul>
              <h4>Information collected automatically:</h4>
              <ul>
                <li><strong>Usage data</strong> — pages visited, features used, time spent on the app.</li>
                <li><strong>Device data</strong> — device type, operating system, browser type, IP address.</li>
                <li><strong>Location data</strong> — approximate location (city/region) to show nearby pets and shelters. We never collect precise GPS without explicit permission.</li>
                <li><strong>Cookies &amp; analytics</strong> — we use cookies and analytics tools to understand how the site is used and improve it.</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, operate, and improve the Furrly platform and app.</li>
                <li>Send you one launch notification email when Furrly goes live (waitlist only).</li>
                <li>Respond to volunteer inquiries and coordinate with contributors.</li>
                <li>Show you relevant pets, shelters, playdates, and vets near you.</li>
                <li>Detect and prevent fraud, abuse, or violations of our Terms.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p>We do <strong>not</strong> sell your personal data to third parties. Ever.</p>
            </Section>

            <Section title="3. How We Share Your Information">
              <p>We only share your data in the following limited circumstances:</p>
              <ul>
                <li><strong>Service providers</strong> — trusted third parties who help us operate Furrly (e.g. Brevo for email, Vercel for hosting). They are contractually bound to protect your data.</li>
                <li><strong>Legal requirements</strong> — if required by law, court order, or to protect the safety of our users.</li>
                <li><strong>Business transfers</strong> — if Furrly is acquired or merges with another company, your data may be transferred as part of that transaction. We will notify you before this happens.</li>
              </ul>
            </Section>

            <Section title="4. Data Retention">
              <p>We retain your personal data for as long as your account is active or as needed to provide our services. Waitlist and volunteer submissions are retained until Furrly launches and you have had the opportunity to create an account or opt out.</p>
              <p>You may request deletion of your data at any time by emailing <a href="mailto:hello@furrly.co">hello@furrly.co</a>.</p>
            </Section>

            <Section title="5. Cookies">
              <p>We use cookies and similar tracking technologies to improve your experience. These include:</p>
              <ul>
                <li><strong>Essential cookies</strong> — required for the site to function.</li>
                <li><strong>Analytics cookies</strong> — help us understand how visitors use Furrly so we can improve it.</li>
              </ul>
              <p>You can control cookies through your browser settings. Disabling cookies may affect some features of the site.</p>
            </Section>

            <Section title="6. Your Rights">
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Access</strong> — request a copy of the data we hold about you.</li>
                <li><strong>Correction</strong> — request that we correct inaccurate data.</li>
                <li><strong>Deletion</strong> — request that we delete your data.</li>
                <li><strong>Opt-out</strong> — unsubscribe from marketing emails at any time via the link in any email we send.</li>
                <li><strong>Portability</strong> — request your data in a portable format.</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href="mailto:hello@furrly.co">hello@furrly.co</a>.</p>
            </Section>

            <Section title="7. Children's Privacy">
              <p>Furrly is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it.</p>
            </Section>

            <Section title="8. Security">
              <p>We take reasonable technical and organisational measures to protect your data against unauthorised access, loss, or misuse. However, no system is 100% secure. We encourage you to use a strong, unique password for your Furrly account.</p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>Furrly may contain links to third-party websites (e.g. shelter pages, vet directories). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.</p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the site or sending an email. Continued use of Furrly after changes take effect constitutes your acceptance of the updated policy.</p>
            </Section>

            <Section title="11. Contact Us">
              <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:hello@furrly.co">hello@furrly.co</a></li>
                <li>Website: <a href="https://furrly.co">furrly.co</a></li>
              </ul>
            </Section>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Link href="/terms" className="text-sm font-bold text-brand-start hover:underline">
              Read our Terms & Conditions →
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
        Furrly (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data when you use our website at{" "}
        <a href="https://furrly.co" className="text-brand-start font-bold">furrly.co</a>{" "}
        and our mobile application (collectively, the &quot;Service&quot;).
      </p>
      <p className="text-sm leading-7 text-slate-gray mt-3">
        By using Furrly, you agree to the collection and use of information in accordance with this policy.
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
      <div className="text-sm leading-7 text-slate-gray space-y-3 [&_a]:text-brand-start [&_a]:font-bold [&_a:hover]:underline [&_strong]:text-ebony [&_ul]:mt-3 [&_ul]:space-y-2 [&_h4]:font-black [&_h4]:text-ebony [&_h4]:uppercase [&_h4]:tracking-wide [&_h4]:text-xs [&_h4]:mt-4">
        {children}
      </div>
    </div>
  );
}
