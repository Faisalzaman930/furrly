import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toxic Foods for Pets | What Can't Dogs & Cats Eat?",
  description: "Search our database of foods safe and toxic for dogs and cats. Instantly check if a food is dangerous for your pet. Free toxic food checker by Furrly.",
  openGraph: {
    title: "Toxic Foods for Pets | What Can't Dogs & Cats Eat? — Furrly",
    description: "Instantly check if a food is safe or toxic for your dog or cat. Searchable database of hundreds of foods — keep your pet safe.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toxic Food Checker for Pets | Furrly",
    description: "Check if any food is safe or toxic for your dog or cat. Free database by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
