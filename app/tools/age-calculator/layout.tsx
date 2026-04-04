import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Age Calculator | Dog & Cat Years to Human Years",
  description: "Convert your pet's age to human years instantly. Breed-specific calculations for dogs, cats, rabbits, and birds. Free pet age calculator by Furrly.",
  openGraph: {
    title: "Pet Age Calculator | Dog & Cat Years to Human Years — Furrly",
    description: "Breed-specific age conversion for dogs, cats, rabbits, and birds. Find out how old your pet really is in human years.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Age Calculator | Furrly",
    description: "Breed-specific age conversion for dogs, cats, rabbits, and birds. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
