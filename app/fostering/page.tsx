import ComingSoonPage from "../components/ComingSoonPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Fostering — Coming Soon | Furrly",
  description: "Furrly's Fostering platform is coming soon. Open your home temporarily and get matched with pets that need you most.",
};

export default function FosteringPage() {
  return (
    <ComingSoonPage
      icon="💖"
      feature="Fostering"
      tagline="Open your home. Change a life."
      description="Fostering saves lives. Furrly will match you with pets that need a temporary home based on your space, lifestyle, and experience — making fostering as easy as possible."
      phase="Phase 2"
      bullets={[
        "Smart matching based on your home size, lifestyle, and experience",
        "Direct connection with verified shelters and rescues near you",
        "Foster care guides and 24/7 community support",
        "Track your foster pet's health, milestones and adoption progress",
        "Seamless handoff to permanent adoption when the time is right",
        "Foster alumni community — stay connected with pets you've helped",
      ]}
    />
  );
}
