export type SymptomCategory = 
  | "Gastrointestinal" 
  | "Respiratory" 
  | "Neurological" 
  | "Physical/Mobility" 
  | "Skin/Coat" 
  | "Emergency/Systemic" 
  | "Ocular/Head";

export interface SymptomRecord {
  name: string;
  icon: string;
  category: SymptomCategory;
  urgency: "emergency" | "vet-soon" | "monitor";
  dog: {
    description: string;
    remedy: string;
  };
  cat: {
    description: string;
    remedy: string;
  };
}

export const symptomData: SymptomRecord[] = [
  {
    name: "Vomiting (repeated)",
    icon: "🤢",
    category: "Gastrointestinal",
    urgency: "vet-soon",
    dog: {
      description: "Could indicate poisoning, bloat (GDV), or obstruction.",
      remedy: "Fast for 12-24 hrs. Offer ice cubes instead of water. Feed bland boiled chicken/rice after 12 hrs if no more vomiting."
    },
    cat: {
      description: "Hairball, IBD, poisoning, or obstruction. Cats can dehydrate very quickly.",
      remedy: "Do NOT fast for more than 12 hrs. Offer wet food and water. If vomiting more than 3x in a day, see a vet immediately."
    }
  },
  {
    name: "Seizures",
    icon: "⚡",
    category: "Neurological",
    urgency: "emergency",
    dog: {
      description: "Epilepsy, toxin ingestion, or neurological issue.",
      remedy: "Clear the area of hard objects. Do NOT put fingers in their mouth. Time the seizure. If it lasts >5 mins, it is a life-threatening emergency."
    },
    cat: {
      description: "Toxin, liver disease, or epilepsy.",
      remedy: "Keep cat in a darkened, quiet room. Do NOT restrain them. Reach out to an emergency vet immediately as feline seizures are often acute."
    }
  },
  {
    name: "Difficulty Breathing",
    icon: "😮‍💨",
    category: "Respiratory",
    urgency: "emergency",
    dog: {
      description: "Heart disease, choking, pneumonia, or heat stroke.",
      remedy: "Keep the dog calm and cool. If choking, try to clear airway only if safe. Go to emergency vet now. Do NOT wait for a regular appointment."
    },
    cat: {
      description: "Asthma, heart failure, or fluid in lungs.",
      remedy: "Avoid stress or restraint. Keep head level. Open-mouth breathing in cats is a critical emergency. Transport to vet immediately."
    }
  },
  {
    name: "Lethargy / Weakness",
    icon: "😴",
    category: "Emergency/Systemic",
    urgency: "vet-soon",
    dog: {
      description: "Anaemia, infection, pain, or metabolic disease.",
      remedy: "Check gum colour (should be pink). If pale, see vet urgently. Otherwise, monitor energy and appetite for 12-24 hrs."
    },
    cat: {
      description: "Wide range — monitor for 24hrs, then see vet.",
      remedy: "Look for hiding behaviour. If cat hasn't moved or eaten in 12 hrs, they need a vet check-up. Cats hide illness well."
    }
  },
  {
    name: "Not Eating (24hrs+)",
    icon: "🍽️",
    category: "Gastrointestinal",
    urgency: "vet-soon",
    dog: {
      description: "Stress, dental pain, nausea, or systemic illness.",
      remedy: "Try warming up food or offering plain boiled chicken. If refusal continues for 36 hrs, consult vet."
    },
    cat: {
      description: "Hepatic lipidosis risk — urgent in cats.",
      remedy: "CRITICAL: Cats MUST eat daily to avoid liver damage. Offer high-value food (tuna in water, baby food). See vet if refusal exceeds 24 hrs."
    }
  },
  {
    name: "Diarrhoea (bloody)",
    icon: "🔴",
    category: "Gastrointestinal",
    urgency: "emergency",
    dog: {
      description: "Parvovirus, HGE, or intestinal obstruction.",
      remedy: "Save a sample for the vet. Do NOT give human antidiarrheals. Seek emergency care to prevent dehydration and shock."
    },
    cat: {
      description: "Panleukopenia, parasites, or IBD.",
      remedy: "Often serious in cats. Keep hydrated with water or cat-safe electrolytes. Go to vet immediately."
    }
  },
  {
    name: "Limping",
    icon: "🦿",
    category: "Physical/Mobility",
    urgency: "vet-soon",
    dog: {
      description: "Sprain, fracture, arthritis, or Lyme disease.",
      remedy: "Restrict activity immediately. Do NOT allow jumping or stairs. Check paws for stickers or cuts. If non-weight bearing, seek vet."
    },
    cat: {
      description: "Sprain, fracture, or cat bite abscess.",
      remedy: "Look for swelling (abscess) or heat. Keep cat indoors and confined to one room until vet visit. Do NOT give human pain relief."
    }
  },
  {
    name: "Swollen Abdomen",
    icon: "🫁",
    category: "Emergency/Systemic",
    urgency: "emergency",
    dog: {
      description: "Bloat (GDV) — life-threatening. Emergency now.",
      remedy: "Look for unproductive retching (trying to vomit but nothing comes up). This is a 100% emergency. Go to the nearest clinic instantly."
    },
    cat: {
      description: "Fluid accumulation, FIP, or organ enlargement.",
      remedy: "Check for breathing distress. If the belly feels firm or painful to touch, go to emergency vet."
    }
  },
  {
    name: "Coughing",
    icon: "😮",
    category: "Respiratory",
    urgency: "vet-soon",
    dog: {
      description: "Kennel cough, heart disease, or collapsed trachea.",
      remedy: "Humidify the air (take dog into bathroom during shower). Switch to a harness instead of a collar. Note if cough is dry or wet."
    },
    cat: {
      description: "Asthma, hairball, or upper respiratory infection.",
      remedy: "Ensure no dust or strong scents (incense/perfume) near cat. If accompanied by open-mouth breathing, it is an emergency."
    }
  },
  {
    name: "Excessive Scratching",
    icon: "🤌",
    category: "Skin/Coat",
    urgency: "monitor",
    dog: {
      description: "Allergies, fleas, or skin infection.",
      remedy: "Use a flea comb to check for debris. A cool oat bath can soothe skin. Prevent licking with a cone (e-collar) if necessary."
    },
    cat: {
      description: "Fleas, mites, or allergic dermatitis.",
      remedy: "Check for flea dirt near base of tail. Use a vet-approved flea preventative. Avoid over-grooming triggers like stress."
    }
  },
  {
    name: "Hair Loss",
    icon: "🪮",
    category: "Skin/Coat",
    urgency: "vet-soon",
    dog: {
      description: "Mange, ringworm, thyroid disease, or allergies.",
      remedy: "Avoid contact with other pets until ringworm is ruled out. Check for redness or scabbing in the bald areas."
    },
    cat: {
      description: "Over-grooming (stress), ringworm, or flea allergy.",
      remedy: "Environmental enrichment can help if stress-related. Check for crusting or circular lesions. Ringworm is contagious to humans."
    }
  },
  {
    name: "Increased Thirst / Urination",
    icon: "💦",
    category: "Emergency/Systemic",
    urgency: "vet-soon",
    dog: {
      description: "Diabetes, Cushing's disease, or kidney disease.",
      remedy: "Measure water intake for 24 hrs. Ensure they always have access to fresh water. Do NOT restrict water as it may be compensating for kidney issues."
    },
    cat: {
      description: "Diabetes, hyperthyroidism, or kidney disease.",
      remedy: "Common in older cats. Check for changes in litter box usage. Collect a urine sample if possible for the vet visit."
    }
  },
  {
    name: "Eye Discharge",
    icon: "👁️",
    category: "Ocular/Head",
    urgency: "vet-soon",
    dog: {
      description: "Conjunctivitis, corneal ulcer, or allergy.",
      remedy: "Gently wipe with a warm, damp cloth. Avoid human eye drops. If squinting or the eye looks cloudy, it is an emergency."
    },
    cat: {
      description: "Cat flu, conjunctivitis, or viral infection.",
      remedy: "Keep eyes clear of crust. Isolate from other cats. Squinting indicates pain and requires immediate vet attention to save sight."
    }
  },
  {
    name: "Pale Gums",
    icon: "🫦",
    category: "Emergency/Systemic",
    urgency: "emergency",
    dog: {
      description: "Severe anaemia, shock, or internal bleeding.",
      remedy: "Check gums by lifting lip. If they look white or grey, transport to vet immediately. Keep the dog warm with a blanket."
    },
    cat: {
      description: "Anaemia, shock, or heart failure.",
      remedy: "Handle as little as possible to avoid stress. High urgency. Cats with pale gums often have critical blood or heart issues."
    }
  },
  {
    name: "Head Tilting",
    icon: "🤔",
    category: "Ocular/Head",
    urgency: "vet-soon",
    dog: {
      description: "Ear infection, vestibular disease, or brain tumour.",
      remedy: "Check ears for discharge or bad smell. Avoid getting water in ears. If accompanied by eyes flicking back and forth, it may be 'Old Dog' vestibular disease."
    },
    cat: {
      description: "Vestibular disease, ear polyp, or stroke.",
      remedy: "Keep cat in a small, low-traffic area where they can't fall. Hand-feed if they are too dizzy to reach the bowl."
    }
  },
  {
    name: "Weight Loss (rapid)",
    icon: "⚖️",
    category: "Emergency/Systemic",
    urgency: "vet-soon",
    dog: {
      description: "Cancer, diabetes, parasites, or kidney disease.",
      remedy: "Log calorie intake and weekly weight. Check stool for signs of worms. Needs a blood panel at the vet."
    },
    cat: {
      description: "Hyperthyroidism, IBD, dental pain, or cancer.",
      remedy: "Common in older cats. Note if appetite is increased (hyperthyroidism) or decreased (kidney/dental). High urgency for cats losing weight fast."
    }
  },
  {
    name: "Sneezing (repeated)",
    icon: "🤧",
    category: "Respiratory",
    urgency: "monitor",
    dog: {
      description: "Nasal foreign body, allergy, or infection.",
      remedy: "Usually not an emergency. Look for blood or thick yellow discharge. Use a humidifier to help clear nasal passages."
    },
    cat: {
      description: "Cat flu, herpesvirus, or nasal polyp.",
      remedy: "L-Lysine supplements can help viral symptoms. Boost humidity. If cat stops eating because they can't smell food, see vet."
    }
  },
  {
    name: "Collapse / Unconscious",
    icon: "🆘",
    category: "Emergency/Systemic",
    urgency: "emergency",
    dog: {
      description: "Cardiac event, severe poisoning, or shock.",
      remedy: "Check for pulse and breathing. Perform CPR if trained. Transport to vet immediately. Keep head lower than body during transport."
    },
    cat: {
      description: "Cardiac event, severe poisoning, or shock.",
      remedy: "Place in a carrier securely. Handle gently. Critical emergency. Feline collapse is often linked to underlying heart disease."
    }
  },
  {
    name: "Pawing at Face / Mouth",
    icon: "🐾",
    category: "Ocular/Head",
    urgency: "vet-soon",
    dog: {
      description: "Dental pain, foreign object, or toxin taste.",
      remedy: "Gently inspect mouth for sticks or stuck food. Check for bad breath or bleeding gums. Needs dental assessment."
    },
    cat: {
      description: "Dental disease, foreign object, or nausea.",
      remedy: "Look for 'chattering' or dropping food. Cats are prone to painful lesions (FORLs). Avoid touching if painful."
    }
  },
  // New symptoms
  {
    name: "Bloody Urine",
    icon: "🩸",
    category: "Emergency/Systemic",
    urgency: "vet-soon",
    dog: {
      description: "UTI, bladder stones, or prostate issues.",
      remedy: "Ensure plenty of water. Monitor if dog is straining to go. If they CANNOT urinate at all, it's an emergency."
    },
    cat: {
      description: "Stomach crystals, UTI, or FIC (stress-related).",
      remedy: "WATCH CLOSETLY: If a male cat strains and nothing comes out, it is a 100% FATAL emergency. Go to vet now."
    }
  },
  {
    name: "Stiff / Sore Joints",
    icon: "🦴",
    category: "Physical/Mobility",
    urgency: "monitor",
    dog: {
      description: "Arthritis, hip dysplasia, or cold weather related.",
      remedy: "Use orthopedic bedding. Controlled, low-impact walks. Consider joint supplements like Glucosamine."
    },
    cat: {
      description: "Degenerative joint disease (common in seniors).",
      remedy: "Provide steps to help them reach high surfaces. Keep bowls and litter boxes easily accessible. Gentle grooming helps."
    }
  },
  {
    name: "Bad Breath",
    icon: "🦨",
    category: "Ocular/Head",
    urgency: "monitor",
    dog: {
      description: "Dental disease, kidney issues, or gut health.",
      remedy: "Brush teeth regularly. Use dental chews. If it smells like ammonia, it may indicate kidney failure—see vet."
    },
    cat: {
      description: "Gingivitis, stomatitis, or kidney disease.",
      remedy: "Dental health is critical for cats. If breath is fruity/sweet, it may be diabetes. Schedule a check-up."
    }
  }
];
