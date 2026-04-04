import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Name Generator | Find the Perfect Name for Your Pet",
  description: "Generate unique pet names by species, color, and personality traits. Thousands of creative name ideas for dogs, cats, rabbits, and more. Free by Furrly.",
  openGraph: {
    title: "Pet Name Generator | Find the Perfect Name for Your Pet — Furrly",
    description: "Generate creative pet names by species, color, and personality. Find the perfect name for your new dog, cat, or rabbit. Free by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Name Generator | Furrly",
    description: "Generate the perfect name for your new pet. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
