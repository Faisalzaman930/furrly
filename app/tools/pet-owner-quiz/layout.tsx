import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Owner Quiz | What Kind of Pet Parent Are You?",
  description: "Take the 8-question pet owner quiz and find out how you score as a pet parent. Get honest feedback and tips to become the owner your pet deserves. Free by Furrly.",
  openGraph: {
    title: "Pet Owner Quiz | What Kind of Pet Parent Are You? — Furrly",
    description: "8 questions. Honest feedback. Find out how you really score as a pet parent — and how to improve. Free quiz by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Owner Quiz | Furrly",
    description: "Find out what kind of pet parent you are. Free 8-question quiz by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
