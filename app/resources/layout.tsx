import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care Resources: Guides, How-Tos & Breed Profiles",
  description: "Browse Furrly's free pet care library — expert guides, symptom explainers, breed profiles, how-to tutorials, and vet-backed advice for every pet parent.",
  openGraph: {
    title: "Pet Care Resources: Guides, How-Tos & Breed Profiles | Furrly",
    description: "Expert guides, symptom explainers, breed profiles, and how-to tutorials — all free in the Furrly pet care library.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Care Resources | Furrly",
    description: "Expert guides, symptom explainers, breed profiles, and how-to tutorials — all free in the Furrly pet care library.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
