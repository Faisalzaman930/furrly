import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog Breed Quiz | Find Your Perfect Dog Match",
  description: "Answer 7 quick questions and discover which dog breed suits your lifestyle. Free dog breed quiz by Furrly — used by 50,000+ pet parents.",
  openGraph: {
    title: "Best Dog Breed Quiz | Find Your Perfect Dog Match — Furrly",
    description: "Answer 7 questions and get matched with the ideal dog breed for your lifestyle, space, and activity level. Free quiz by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dog Breed Quiz | Furrly",
    description: "Find your perfect dog breed match in 7 questions. Free quiz by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
