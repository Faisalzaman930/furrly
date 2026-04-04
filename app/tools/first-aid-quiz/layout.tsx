import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet First Aid Quiz | Test Your Emergency Preparedness",
  description: "How ready are you for a pet emergency? Take the free pet first aid quiz and find out. Learn life-saving knowledge every pet parent should have — by Furrly.",
  openGraph: {
    title: "Pet First Aid Quiz | Test Your Emergency Preparedness — Furrly",
    description: "Quiz yourself on pet emergencies, CPR, and first aid. Find out if you're ready when it matters most. Free quiz by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet First Aid Quiz | Furrly",
    description: "Test your pet emergency preparedness. Free quiz by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
