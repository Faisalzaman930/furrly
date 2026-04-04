import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Sitting Platform Comparison | Rover vs Wag vs Alternatives",
  description: "Compare the top pet sitting platforms — Rover, Wag, and more — on price, safety, availability, and features. Find the best option for your pet. Free by Furrly.",
  openGraph: {
    title: "Pet Sitting Platform Comparison | Rover vs Wag vs Alternatives — Furrly",
    description: "Side-by-side comparison of Rover, Wag, and other pet sitting services. Price, safety, insurance, and features — all in one place.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Sitting Platform Comparison | Furrly",
    description: "Compare Rover, Wag, and alternatives. Find the best pet sitting platform for your needs.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
