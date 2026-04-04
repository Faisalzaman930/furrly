export interface AppFeature {
  title: string;
  desc: string;
  icon?: string;
}

export interface ActionableGuideItem {
  title: string;
  content: string;
  urgency?: "LOW" | "MEDIUM" | "HIGH" | "EMERGENCY";
}

export interface AppDetail {
  slug: string;
  name: string;
  fullTitle: string;
  summary: string;
  detailedFeatures: AppFeature[];
  remedies: {
    title: string;
    description: string;
    items: ActionableGuideItem[];
  };
  mockup: {
    title: string;
    subtitle: string;
    type: "chat" | "score" | "alert" | "map";
    data: any;
  };
}

export const appDetails: Record<string, AppDetail> = {
  playdates: {
    slug: "playdates",
    name: "Playdates",
    fullTitle: "Safe, Meaningful Socialization for Every Pet.",
    summary: "Furrly Playdates isn't just about meeting up; it's about finding the perfect compatible companion while prioritizing safety and owner peace of mind.",
    detailedFeatures: [
      {
        title: "Proximity-Based Matching",
        desc: "Uses real-time GPS coordinates to find compatible pets within your immediate neighborhood, reducing travel stress.",
        icon: "📍",
      },
      {
        title: "Dynamic Compatibility Scoring",
        desc: "Our algorithm analyzes size, energy levels, and previous interactions to predict a safety and fun score before you even say hello.",
        icon: "⚡",
      },
      {
        title: "Secure Verification",
        desc: "Every owner must complete a multi-step verification process, including vaccination records and identity checks.",
        icon: "🛡️",
      },
      {
        title: "Verified Breed Groups",
        desc: "High-signal communities for specific breeds to share tailored advice and host breed-specific meetups.",
        icon: "🐩",
      }
    ],
    remedies: {
      title: "First Meetup Safety Checklist",
      description: "Follow these steps to ensure a safe and successful first playdate between two pets who haven't met.",
      items: [
        {
          title: "Neutral Territory Only",
          content: "Always meet in a neutral, outdoor space like a park or fenced field. Never meet at one owner's house for the first time.",
          urgency: "HIGH",
        },
        {
          title: "The 'Parallel Walk' Technique",
          content: "Start by walking both pets on leashes in the same direction, about 10-15 feet apart. Don't let them move toward each other immediately.",
          urgency: "MEDIUM",
        },
        {
          title: "Keep It Short",
          content: "The first interaction should last no more than 5-10 minutes. Stop while it's still going well to build positive association.",
          urgency: "LOW",
        },
        {
          title: "Monitor Body Language",
          content: "Watch for stiffening, whale-eye (white of eyes showing), or excessive panting. Separate immediately if either pet looks stressed.",
          urgency: "EMERGENCY",
        }
      ]
    },
    mockup: {
      title: "Match Compatibility",
      subtitle: "Simulated Safety Scoring",
      type: "score",
      data: { score: 92, status: "EXCELLENT", match: "Luna (Golden Retriever)" }
    }
  },
  social: {
    slug: "social",
    name: "Social",
    fullTitle: "Visual Storytelling for the Pet Community.",
    summary: "A neighborhood-first social feed built for pet visual-first storytelling and community safety.",
    detailedFeatures: [
      {
        title: "Localized Discovery",
        desc: "Content is prioritized by proximity, helping you build a real-world community at your local park.",
        icon: "📸",
      },
      {
        title: "Pet-First Privacy",
        desc: "Advanced privacy controls let you share your pet's life without compromising your personal home location.",
        icon: "🔒",
      },
      {
        title: "Community Moderation",
        desc: "User-led governance ensures the feed remains a positive, safe space for animal lovers only.",
        icon: "⚖️",
      }
    ],
    remedies: {
      title: "Community Safety & Etiquette",
      description: "Guidelines to keep Furrly Social a safe, high-signal resource for all pet guardians.",
      items: [
        {
          title: "Respect Privacy",
          content: "Avoid posting landmarks that could pin-point your exact home address. Use our 'SafeZone' filters to blur backgrounds if needed.",
          urgency: "HIGH",
        },
        {
          title: "Report Harmful Content",
          content: "If you see any content depicting animal distress or unsafe behavior, report it immediately. Our 1-tap system alerts the legal and safety team.",
          urgency: "EMERGENCY",
        },
        {
          title: "Positive Reinforcement ONLY",
          content: "We encourage sharing training tips that focus on positive reinforcement. Avoid promoting outdated or punitive training methods.",
          urgency: "MEDIUM",
        }
      ]
    },
    mockup: {
      title: "Story CreatorV2",
      subtitle: "Visual AI Tagging",
      type: "chat",
      data: { user: "Charlie", message: "Just finished a 5km run at West Park! 🐾" }
    }
  },
  lost_found: {
    slug: "lost-found",
    name: "Lost & Found",
    fullTitle: "The Neighborhood Net: Recovery at the Speed of Life.",
    summary: "When a pet is lost, every second counts. Furrly Reunited turns your neighbors into a hyper-local rescue squad.",
    detailedFeatures: [
      {
        title: "Proximity Priority Alerts",
        desc: "Users active in the pet's 5km radius receive priority notifications the moment a loss is reported.",
        icon: "🚨",
      },
      {
        title: "Sighting Cluster Mapping",
        desc: "Visual AI logs sighting reports and maps them to show the owner predicted movement patterns.",
        icon: "📍",
      },
      {
        title: "Automatic Flyer Generation",
        desc: "One tap generates digital and printable flyers with unique recovery QR codes.",
        icon: "📄",
      }
    ],
    remedies: {
      title: "Immediate Recovery Action Plan",
      description: "Do NOT panic. Follow these exact steps within the first 60 minutes of your pet going missing.",
      items: [
        {
          title: "Report on Furrly NOW",
          content: "Tap 'Report Lost Pet' in the app immediately. This activates the Neighborhood Net broadcast to everyone nearby.",
          urgency: "EMERGENCY",
        },
        {
          title: "The Scent Trail",
          content: "Place something with your scent (like a worn T-shirt) and the pet's bed outside your door. Do NOT leave food, as it might attract predators.",
          urgency: "HIGH",
        },
        {
          title: "Don't Chase",
          content: "If you or a neighbor spots the pet, do NOT chase them. Kneel down, avoid eye contact, and use a calm, inviting voice.",
          urgency: "MEDIUM",
        },
        {
          title: "Check 'Hiding Zones'",
          content: "Indoor cats rarely go far. Check under decks, inside garages, and in tight spaces within 3-4 houses of where they were lost.",
          urgency: "MEDIUM",
        }
      ]
    },
    mockup: {
      title: "Neighborhood Alert",
      subtitle: "Simulated Broadcast",
      type: "alert",
      data: { pet: "Cooper", distance: "400m", type: "LOST" }
    }
  },
  adoption: {
    slug: "adoption",
    name: "Adoption",
    fullTitle: "Digital Rescue: From Discovery to Forever.",
    summary: "We've digitized the adoption journey to make it faster, safer, and fully paperless for both rescues and pet parents.",
    detailedFeatures: [
      {
        title: "Paperless Applications",
        desc: "Submit your pre-verified profile and home-check documents to multiple rescues with a single tap.",
        icon: "📱",
      },
      {
        title: "Rescue Health Wallet",
        desc: "Automatically receive digital pet passports, vaccination history, and legal contracts on adoption day.",
        icon: "💳",
      },
      {
        title: "Trial Period Support",
        desc: "Integrated support and liability management for multi-day adoption trials.",
        icon: "🤝",
      }
    ],
    remedies: {
      title: "The First 48 Hours: Settling In",
      description: "The first two days in a new home are often overwhelming. Here is how to ensure a smooth transition.",
      items: [
        {
          title: "The 'Safe Room'",
          content: "Start your new pet in one quiet, dedicated room with their bed, water, and toys. Do NOT give them full house access immediately.",
          urgency: "MEDIUM",
        },
        {
          title: "Slow Introductions",
          content: "Keep other pets and children separated for at least 24-48 hours. Let them smell the new pet through a door first.",
          urgency: "HIGH",
        },
        {
          title: "Establish Routine",
          content: "Feeding and walks should happen at the exact same times every day starting from Day 1 to build stability.",
          urgency: "LOW",
        },
        {
          title: "Pet-Proofing Check",
          content: "Ensure all electrical cords are hidden and toxic plants are removed. Stress can lead to unusual chewing behavior.",
          urgency: "HIGH",
        }
      ]
    },
    mockup: {
      title: "Rescue Status",
      subtitle: "Simulated Tracking",
      type: "score",
      data: { score: 75, status: "VETTING PHASE", rescue: "PAWS Rescue" }
    }
  },
  vets: {
    slug: "vets",
    name: "Vets",
    fullTitle: "The Health Concierge Your Pet Deserves.",
    summary: "From 24/7 expert chat to clinic discovery, Vets is your pet's complete medical ecosystem.",
    detailedFeatures: [
      {
        title: "Instant Expert Chat",
        desc: "Connect with veterinary technicians 24/7 for immediate triage advice before you head to the clinic.",
        icon: "💬",
      },
      {
        title: "Direct Record Sync",
        desc: "Securely share medical history, lab results, and vaccination records with any clinic in our network.",
        icon: "📁",
      },
      {
        title: "Clinic CRM Integration",
        desc: "Book appointments and manage scheduling directly within the Furrly app.",
        icon: "📅",
      }
    ],
    remedies: {
      title: "Emergency Triage Guide",
      description: "If your pet shows any of these signs, seek EMERGENCY veterinary care immediately.",
      items: [
        {
          title: "Breathing Difficulties",
          content: "Excessive panting (especially in cats), gasping, or blue/pale gums.",
          urgency: "EMERGENCY",
        },
        {
          title: "Unproductive Retching",
          content: "Attempting to vomit but nothing coming out (potential sign of Bloat/GDV).",
          urgency: "EMERGENCY",
        },
        {
          title: "Sudden Collapse",
          content: "Inability to stand or sudden weakness in the hind legs.",
          urgency: "HIGH",
        },
        {
          title: "Toxin Ingestion",
          content: "If you suspect they ate chocolate, grapes, lilies, or medication, call your vet or poison control IMMEDIATELY.",
          urgency: "EMERGENCY",
        }
      ]
    },
    mockup: {
      title: "Tele-Health Preview",
      subtitle: "Simulated Vet Chat",
      type: "chat",
      data: { user: "Dr. Sarah", message: "Based on the photo, I recommend applying local pressure. How deep is the cut?" }
    }
  },
  fostering: {
    slug: "fostering",
    name: "Fostering",
    fullTitle: "Temporary Home, Permanent Impact.",
    summary: "Furrly Fostering bridges the gap between rescues and caregivers with unmatched support and resources.",
    detailedFeatures: [
      {
        title: "Supply Network",
        desc: "Access donated food, crates, and medical supplies through our local partner network.",
        icon: "📦",
      },
      {
        title: "Behavioral AI Advice",
        desc: "Instant guidance for managing transition stress and common behavioral foster challenges.",
        icon: "🐕",
      },
      {
        title: "Foster-to-Adopt Transition",
        desc: "Streamlined legal ownership transfers if the foster home becomes a forever home.",
        icon: "✍️",
      }
    ],
    remedies: {
      title: "Managing Transition Stress",
      description: "Advice for the first week of caring for a foster pet with an unknown history.",
      items: [
        {
          title: "The 'Shutdown' Period",
          content: "Anticipate that the pet may not eat or may hide for the first 72 hours. This is normal. Give them space and quiet.",
          urgency: "MEDIUM",
        },
        {
          title: "Double-Leashing",
          content: "For new fosters, always use two points of contact (a harness and a collar) to prevent flight risks during walks.",
          urgency: "HIGH",
        },
        {
          title: "Safe Cleaning",
          content: "Use enzymatic cleaners to remove urine accidents immediately; this prevents the pet from marking the same spot twice.",
          urgency: "LOW",
        }
      ]
    },
    mockup: {
      title: "Resource Finder",
      subtitle: "Simulated Logistics",
      type: "map",
      data: { location: "Downtown Hub", supplies: "Crates, Kibble", status: "AVAILABLE" }
    }
  }
};
