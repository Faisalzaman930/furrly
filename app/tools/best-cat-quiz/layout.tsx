import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Cat Breed Quiz | Find Your Perfect Cat Match",
  description: "Answer 7 quick questions and discover which cat breed suits your home and lifestyle. Free cat breed quiz by Furrly — find your purrfect match.",
  openGraph: {
    title: "Best Cat Breed Quiz | Find Your Perfect Cat Match — Furrly",
    description: "Answer 7 questions and get matched with the ideal cat breed for your lifestyle, home size, and personality. Free quiz by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Cat Breed Quiz | Furrly",
    description: "Find your perfect cat breed match in 7 questions. Free quiz by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
