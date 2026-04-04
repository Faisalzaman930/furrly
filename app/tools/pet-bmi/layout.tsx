import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet BMI & Body Condition Score Calculator | Is My Pet Overweight?",
  description: "Check your pet's body condition score with Furrly's free BMI tool. Works for dogs, cats, rabbits, and birds. Get actionable weight and diet advice.",
  openGraph: {
    title: "Pet BMI & Body Condition Score Calculator — Furrly",
    description: "Find out if your pet is a healthy weight. Free body condition score checker for dogs, cats, rabbits, and birds — with diet recommendations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet BMI Calculator | Furrly",
    description: "Check your pet's body condition score. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
