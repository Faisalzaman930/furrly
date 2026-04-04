import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Health Quiz | Rate Your Pet's Overall Wellbeing",
  description: "Assess your pet's health across diet, exercise, mental stimulation, and vet care. Get a personalized wellness score and actionable tips. Free by Furrly.",
  openGraph: {
    title: "Pet Health Quiz | Rate Your Pet's Overall Wellbeing — Furrly",
    description: "A comprehensive lifestyle audit for your pet. Get a wellness score across diet, exercise, mental stimulation, and vet care — with tips to improve.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Health Quiz | Furrly",
    description: "Get your pet's wellness score and personalized tips. Free quiz by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
