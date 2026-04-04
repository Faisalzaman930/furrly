import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Comparison Tool | Compare Breeds Side by Side",
  description: "Compare any two dog or cat breeds side by side — size, temperament, energy, grooming needs, and more. Free breed comparison tool by Furrly.",
  openGraph: {
    title: "Dog & Cat Breed Comparison Tool — Furrly",
    description: "Compare any two breeds side by side across size, temperament, energy, and grooming needs. Make a confident choice for your next pet.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breed Comparison Tool | Furrly",
    description: "Compare dog and cat breeds side by side. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
