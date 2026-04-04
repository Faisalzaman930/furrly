import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Feeding Calculator | How Much Should I Feed My Pet?",
  description: "Calculate the right daily food portion for your dog or cat based on weight, age, and activity level. Free pet feeding calculator by Furrly.",
  openGraph: {
    title: "Pet Feeding Calculator | How Much Should I Feed My Pet? — Furrly",
    description: "Get accurate daily feeding amounts for your dog or cat based on weight, age, and activity level. Stop guessing — feed right.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Feeding Calculator | Furrly",
    description: "Calculate the right daily food portion for your pet. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
