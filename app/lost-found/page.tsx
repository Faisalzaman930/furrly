import ComingSoonPage from "../components/ComingSoonPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost & Found Pets — Coming Soon | Furrly",
  description: "Furrly's Lost & Found feature is coming soon. Hyper-local alerts, GPS sighting tracking, and community coordination to reunite lost pets with their owners.",
};

export default function LostFoundPage() {
  return (
    <ComingSoonPage
      icon="🔍"
      feature="Lost & Found"
      tagline="Turn your whole neighborhood into a search party."
      description="When your pet goes missing, every second counts. Furrly will send instant push alerts to every pet owner in your area, with live GPS sighting tracking until your pet is home safe."
      phase="Phase 2"
      bullets={[
        "Instant push notifications to all users within a configurable radius",
        "Live map with GPS-tagged sighting reports from the community",
        "Photo-first missing pet alerts shareable to WhatsApp and social media",
        "Two-tap 'I found this pet' reporting with automatic owner notification",
        "QR tag integration — scan a collar tag to instantly contact the owner",
        "AI-powered breed matching to help identify unknown found pets",
      ]}
    />
  );
}
