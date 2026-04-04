import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Insurance Cost Estimator | How Much Is Pet Insurance?",
  description: "Estimate your monthly pet insurance premium by breed, age, and coverage level. Compare plans and find the best value for your pet. Free tool by Furrly.",
  openGraph: {
    title: "Pet Insurance Cost Estimator — Furrly",
    description: "Get a free estimate of your pet insurance premium based on breed, age, and coverage level. Make a smarter decision for your pet's health.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Insurance Cost Estimator | Furrly",
    description: "Estimate your pet insurance premium by breed, age, and coverage. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
