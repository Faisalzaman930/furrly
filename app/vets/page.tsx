import ComingSoonPage from "../components/ComingSoonPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vet Discovery — Coming Soon | Furrly",
  description: "Furrly's Vet Portal is coming soon. Find trusted clinics nearby, read verified reviews, and call in one tap — all inside the Furrly app.",
};

export default function VetsPage() {
  return (
    <ComingSoonPage
      icon="🏥"
      feature="Vet Portal"
      tagline="Find trusted vets near you — in seconds."
      description="Real-time clinic discovery with verified reviews, live opening hours, and one-tap emergency calling. No more Googling at midnight when your pet needs help."
      phase="Phase 2"
      bullets={[
        "Real-time clinic discovery with live opening hours and distance",
        "Verified reviews from real pet owners in your area",
        "One-tap emergency call — no copying numbers",
        "Specialist filters: exotic pets, 24-hour emergency, home visits",
        "In-app appointment booking with calendar sync",
        "Vaccination & medical record storage linked to your pet profile",
      ]}
    />
  );
}
