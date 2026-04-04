import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Sitter Cost Calculator | How Much Does Pet Sitting Cost?",
  description: "Estimate pet sitting costs by location, pet type, duration, and service level. Compare local rates and budget for your next trip. Free calculator by Furrly.",
  openGraph: {
    title: "Pet Sitter Cost Calculator — Furrly",
    description: "Get a realistic pet sitting cost estimate based on your location, pet type, and service level. Know what to expect before you book.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Sitter Cost Calculator | Furrly",
    description: "Estimate pet sitting costs by location and service. Free calculator by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
