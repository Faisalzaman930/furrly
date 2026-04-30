import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care Resources: Guides, How-Tos & Breed Profiles",
  // Item 5: updated meta description
  description: "Evidence-based pet care guides, how-tos, breed profiles, and symptom references — reviewed by vets. Free library from Furrly.",
  // Item 8: canonical prevents thin-page dilution from any query-string variants
  alternates: {
    canonical: "https://furrly.co/resources",
  },
  openGraph: {
    title: "Pet Care Resources: Guides, How-Tos & Breed Profiles | Furrly",
    description: "Evidence-based pet care guides, how-tos, breed profiles, and symptom references — reviewed by vets. Free library from Furrly.",
    type: "website",
    url: "https://furrly.co/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Care Resources | Furrly",
    description: "Evidence-based pet care guides, how-tos, breed profiles, and symptom references — reviewed by vets. Free library from Furrly.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
