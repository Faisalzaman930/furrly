export type UrgencyLevel = "emergency" | "urgent" | "monitor" | "routine";

export interface SymptomCause {
  title: string;
  description: string;
  severity: "mild" | "moderate" | "serious";
}

export interface SymptomArticle {
  slug: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  seoDescription: string;
  category: "Symptom Guide";
  tags: string[];
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  quickAnswer: string;
  urgencyLevel: UrgencyLevel;
  urgencyLabel: string;
  introduction: string;
  causes: SymptomCause[];
  emergencyWarnings: string[];
  homeCareTips: string[];
  whenToSeeVet: string[];
  prevention: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  pillarSlug: string;
  ctaFeature: string;
  ctaText: string;
}

export const symptomArticles: SymptomArticle[] = [
  {
    slug: "why-is-my-dog-not-eating",
    title: "Why Is My Dog Not Eating? 9 Causes and What to Do",
    seoTitle: "Why Is My Dog Not Eating? Causes, What to Do (Vet Guide)",
    shortTitle: "Dog Not Eating",
    seoDescription: "Your dog won't eat? Discover 9 common causes of appetite loss in dogs — from stress to serious illness — plus clear guidance on when to wait, when to call your vet, and what to try at home.",
    category: "Symptom Guide",
    tags: ["Dog Health", "Symptoms", "Nutrition"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "10 Min Read",
    quickAnswer: "A healthy adult dog can safely skip one meal without cause for alarm. If your dog hasn't eaten for 24 hours, is showing other symptoms (vomiting, lethargy, abdominal pain), or is a puppy or senior dog, contact your vet. Most short-term appetite loss in otherwise healthy adult dogs resolves within 24–48 hours.",
    urgencyLevel: "urgent",
    urgencyLabel: "See vet if no improvement in 24 hours",
    introduction: `Appetite loss in dogs is one of the most common reasons owners contact their vet — and one of the most varied in its significance. A single skipped meal in an otherwise healthy, energetic adult dog may mean nothing. The same dog refusing food for 48 hours, combined with lethargy and a distended abdomen, is a potential emergency.

The critical skill is distinguishing between the two scenarios, which requires reading the full picture: how long has the dog been refusing food, are there any accompanying symptoms, has anything changed recently in their environment, food, or routine, and what is their current energy level and demeanor?

This guide covers the nine most common causes of appetite loss in dogs, the warning signs that indicate a vet visit is urgent rather than optional, and what you can try at home in the 24-hour window before seeking professional advice.`,
    causes: [
      {
        title: "Stress or anxiety",
        description: "Environmental changes (moving house, new family members, schedule changes, travel), loud events (fireworks, construction), or the loss of a companion animal can suppress appetite significantly. This is the most common cause of short-term food refusal in otherwise healthy dogs, and typically resolves within 24–72 hours as the dog adjusts to the stressor.",
        severity: "mild",
      },
      {
        title: "Dietary change or food preferences",
        description: "Dogs switched to a new food abruptly, or given access to a higher-value food (wet food, human food), sometimes refuse their regular diet. A dog who ate table scraps last night may find kibble unacceptable today. This is behavioral rather than medical — but it can become entrenched if consistently reinforced by offering alternatives.",
        severity: "mild",
      },
      {
        title: "Dental pain",
        description: "Broken teeth, severe periodontal disease, oral abscesses, or mouth sores make eating painful. Dogs with dental pain may show interest in food (approach the bowl, sniff) but then walk away without eating, or drop food from their mouth while attempting to chew. An estimated 80% of dogs over age 3 have some form of dental disease — many go undiagnosed for years.",
        severity: "moderate",
      },
      {
        title: "Nausea from various causes",
        description: "Nausea without vomiting is a common cause of food refusal. Causes include motion sickness, mild gastrointestinal upset, medications (antibiotics, NSAIDs), and early-stage disease processes. Signs of nausea: licking lips excessively, drooling, eating grass, and restlessness.",
        severity: "moderate",
      },
      {
        title: "Vaccination side effects",
        description: "Many dogs experience 12–24 hours of mild lethargy and reduced appetite after receiving vaccines. This is a normal immune response, not an adverse reaction. If appetite doesn't return within 24 hours post-vaccination, or if the dog shows more significant symptoms, contact your vet.",
        severity: "mild",
      },
      {
        title: "Gastrointestinal obstruction",
        description: "Foreign body ingestion (toys, socks, corn cobs, bones) can cause a complete or partial obstruction, preventing food from passing normally. This is a surgical emergency. Signs that differentiate obstruction from other causes: repeated vomiting, restlessness, abdominal distension, and a history of ingesting a non-food item.",
        severity: "serious",
      },
      {
        title: "Systemic illness",
        description: "Kidney disease, liver disease, pancreatitis, and cancer commonly suppress appetite as early or primary symptoms. Unlike behavioral food refusal, illness-related appetite loss is accompanied by other signs: lethargy, weight loss, changes in thirst or urination, or vomiting. Any appetite loss lasting more than 48 hours warrants bloodwork.",
        severity: "serious",
      },
      {
        title: "Pain from an injury or condition",
        description: "Pain from any source — orthopedic injury, abdominal pain, ear infection — reduces appetite by suppressing normal eating drive. A dog who is painful will often show reduced activity, reluctance to move, changes in posture, and sometimes vocalizing when touched in a specific area.",
        severity: "moderate",
      },
      {
        title: "Picky eating reinforced by owner behavior",
        description: "Dogs who have learned that refusing food produces a better option (wet food on top, chicken mixed in, owner hand-feeding) have a behavioral food refusal pattern rather than a medical one. The dog is healthy, normal weight, and energetic — they're simply waiting for the upgrade. This is the most overdiagnosed category and should be considered only after medical causes are ruled out.",
        severity: "mild",
      },
    ],
    emergencyWarnings: [
      "Repeated vomiting combined with food refusal — especially if the dog is also retching without producing anything",
      "Distended, hard, or painful abdomen (potential bloat/GDV — a life-threatening emergency in large breeds)",
      "Food refusal in a puppy under 6 months for more than 12 hours",
      "Food refusal in a diabetic dog who has received insulin — hypoglycemia risk",
      "Pale, white, or blue gums — indicates circulatory shock or internal bleeding",
      "Collapse, extreme weakness, or inability to stand",
      "Known or suspected ingestion of a toxic substance or foreign object",
    ],
    homeCareTips: [
      "Offer a small amount of bland food: plain boiled chicken (no seasoning) and white rice in a 1:3 ratio (1 part chicken, 3 parts rice). This is gentle on the digestive system and highly palatable.",
      "Warm the food slightly (30 seconds in microwave) to increase the aroma — this often stimulates appetite when regular food is refused.",
      "Try offering the food at the dog's regular mealtime and removing it after 20 minutes if not eaten. Don't leave food out all day — scheduled mealtimes maintain eating habits better than free-feeding.",
      "Check the food itself: kibble that has absorbed moisture, been contaminated by insects, or passed its use-by date may be rancid or unpleasant in ways you can't detect. Smell the food yourself — stale kibble often smells flat or slightly sour.",
      "Remove food competitors: if there are multiple pets, feed separately so you can confirm which dog is not eating and eliminate competition as a factor.",
    ],
    whenToSeeVet: [
      "No food eaten for 24 hours in an adult dog who is also showing reduced energy, vomiting, or behavior changes",
      "No food eaten for 12 hours in a puppy (under 6 months) — puppies are at high risk of hypoglycemia",
      "Food refusal persisting beyond 48 hours regardless of other symptoms",
      "Any combination of food refusal with: repeated vomiting, diarrhea, abdominal pain, excessive drooling, or collapse",
      "Known or suspected toxin ingestion or foreign body ingestion",
      "Unexplained weight loss over weeks even with some eating",
    ],
    prevention: [
      "Maintain consistent feeding times and a consistent diet — erratic schedules and frequent food changes are the most common causes of behavioral food refusal.",
      "Schedule annual dental examinations and cleanings as recommended by your vet — dental pain is a leading cause of appetite loss that goes undetected for months.",
      "Keep toxic substances, foreign objects, and human food out of reach — gastrointestinal obstruction and toxin ingestion are often preventable.",
      "Manage known anxiety triggers with behavioral support and, where indicated, medication — chronic stress persistently suppresses appetite.",
    ],
    faqs: [
      {
        q: "Is it normal for a dog to skip a meal?",
        a: "Occasionally skipping a meal — once every few weeks — is within normal variation for many healthy dogs, especially in warm weather or after a very active day. A dog who has skipped one meal, is otherwise acting normally (energetic, drinking water, normal bowel movements), doesn't require immediate vet attention. Monitor closely for 12–24 hours.",
      },
      {
        q: "Why won't my dog eat his food but will eat treats?",
        a: "This is almost always behavioral rather than medical. Treats are higher-value, more palatable foods — the dog isn't nauseous or ill (they're eating), they're making a preference-based choice. If this is a new behavior, rule out dental pain (mouth sensitivity that makes harder kibble uncomfortable). If there's no medical cause, the fix is establishing clear mealtime boundaries: food is offered for 20 minutes, then removed, with no alternatives offered until the next scheduled meal.",
      },
      {
        q: "My dog stopped eating after starting a new medication. Is this normal?",
        a: "Yes — many medications commonly prescribed for dogs (antibiotics, NSAIDs, antifungals) cause nausea or appetite suppression as a side effect. This is typically worse in the first 2–3 days and improves as the dog adjusts. Try giving medication with a small amount of food to reduce gastrointestinal irritation. If appetite remains completely suppressed beyond 3 days, contact your prescribing vet — an alternative medication or anti-nausea support may be appropriate.",
      },
    ],
    relatedSlugs: ["why-is-my-dog-limping", "how-to-switch-dog-food-safely", "complete-guide-to-pet-health"],
    pillarSlug: "complete-guide-to-pet-health",
    ctaFeature: "/vets",
    ctaText: "Talk to a Vet Now",
  },

  {
    slug: "why-is-my-dog-limping",
    title: "Why Is My Dog Limping? Causes, Severity Guide & When to See a Vet",
    seoTitle: "Why Is My Dog Limping? Complete Cause & Treatment Guide 2026",
    shortTitle: "Dog Limping",
    seoDescription: "Dog limping explained: causes from paw injuries to joint disease, how to assess severity at home, and clear guidance on when limping requires emergency vet care versus monitoring.",
    category: "Symptom Guide",
    tags: ["Dog Health", "Symptoms", "Orthopedics"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "11 Min Read",
    quickAnswer: "Limping in dogs ranges from minor (a thorn in the paw) to surgical emergency (complete ligament rupture). Assess severity by whether the dog is bearing any weight, whether the limb is swollen or visibly deformed, and whether the onset was sudden or gradual. Non-weight-bearing limping always warrants same-day vet evaluation.",
    urgencyLevel: "urgent",
    urgencyLabel: "Non-weight-bearing: see vet today",
    introduction: `A limping dog is one of the most common reasons owners visit the emergency vet — and one of the widest spectrums of severity. A splinter in the paw produces limping. A torn cruciate ligament produces limping. Bone cancer produces limping. The cause determines the urgency, and the urgency is determined by a brief but systematic assessment that any owner can perform at home.

The first and most important assessment: is the dog bearing any weight on the affected limb? A dog who is completely non-weight-bearing (holding the leg up entirely) is in significant pain and requires same-day veterinary evaluation. A dog who is weight-bearing but favoring a limb — taking weight but with noticeable unevenness — can be monitored for 24 hours in most cases, with exceptions noted below.

This guide walks you through the at-home assessment, the most common causes of limping by age and limb location, the home care options, and the clear threshold for emergency evaluation.`,
    causes: [
      {
        title: "Paw injury or foreign body",
        description: "The most common cause of sudden-onset limping. Check between the toes and pads for: thorns, glass, splinters, burrs, small cuts, torn or broken nails, burns from hot pavement, or ice-melt chemicals. If you find and remove a foreign body and the dog's limping resolves within an hour, no vet visit is necessary unless the wound is deep or infected.",
        severity: "mild",
      },
      {
        title: "Muscle strain or soft tissue sprain",
        description: "Overexertion, jumping from height, or sudden directional changes can cause muscle strains or ligament sprains. These typically present as gradual-onset or post-exercise limping that worsens after rest and improves briefly with gentle movement. Most resolve with 2–5 days of rest.",
        severity: "mild",
      },
      {
        title: "Cruciate ligament rupture (CCL/ACL)",
        description: "One of the most common orthopedic injuries in dogs, particularly in Labrador Retrievers, Rottweilers, Bulldogs, and overweight dogs. A complete cruciate rupture causes sudden non-weight-bearing lameness in the hind limb, often without trauma — the dog may simply step off a curb and suddenly can't put weight on the leg. This is a surgical condition — early evaluation and treatment improve outcomes significantly.",
        severity: "serious",
      },
      {
        title: "Patellar luxation",
        description: "The kneecap slips out of its groove, causing the dog to hold the leg up briefly (often for 1–3 steps) before it 'clunks' back into place and they resume walking normally. Common in small breeds (Pomeranians, French Bulldogs, Yorkshire Terriers). Intermittent, skip-step limping that self-resolves quickly and then recurs is the characteristic presentation.",
        severity: "moderate",
      },
      {
        title: "Hip or elbow dysplasia",
        description: "Malformation of the hip or elbow joint causing progressive lameness, especially in large breeds (German Shepherds, Labradors, Golden Retrievers). Usually develops gradually over months, often starting as stiffness after rest that improves with movement, then progressive worsening. Most commonly affects young dogs (6 months–2 years) when growth-related changes are most active.",
        severity: "moderate",
      },
      {
        title: "Osteoarthritis",
        description: "Degenerative joint disease causing chronic, low-grade lameness that is worse after rest and in cold weather. Affects older dogs of all breeds. Often goes undiagnosed for months because owners attribute the behavioral changes (slowing down, reluctance to jump) to aging rather than pain. Highly manageable with appropriate veterinary treatment.",
        severity: "moderate",
      },
      {
        title: "Fracture",
        description: "Bone fractures from trauma (hit by car, fall from height) cause sudden, severe non-weight-bearing lameness, often with visible swelling, deformity, or an audible 'snap' at the time of injury. This is an emergency requiring immediate veterinary stabilization.",
        severity: "serious",
      },
      {
        title: "Lyme disease or tick-borne illness",
        description: "In tick-endemic regions, Lyme disease causes a characteristic 'shifting-leg lameness' — the dog limps on one leg for a few days, then seems to recover, then limps on a different leg. This cycling pattern across different limbs without a clear injury cause is the key indicator. Treatable with antibiotics when diagnosed early.",
        severity: "moderate",
      },
    ],
    emergencyWarnings: [
      "Complete non-weight-bearing (holding leg completely up) — same-day vet evaluation",
      "Visibly deformed limb — potential fracture, do not manipulate the limb",
      "Limping after known or suspected trauma (car accident, fall, fight with another animal)",
      "Limping accompanied by: crying or yelping when the limb is touched, extreme swelling, visible wound, fever",
      "Sudden severe hind-end weakness or dragging the back legs — spinal emergency",
      "Limping with pale gums or extreme lethargy — indicates shock or internal injury",
    ],
    homeCareTips: [
      "Do a systematic paw check: examine between each toe, check each pad for cuts or embedded material, check each nail (a broken nail can be extremely painful), and check the area between the toes for swelling or redness.",
      "If you find a splinter or thorn that's superficially embedded, it can be safely removed with blunt-nosed tweezers. Clean the area with mild soap and water. If it's deeply embedded, leave it for the vet.",
      "Restrict activity for 24–48 hours: no jumping, no stairs, no rough play. Leash walks only for bathroom purposes.",
      "Apply a cool (not ice-cold) compress to visibly swollen areas for 10 minutes, 2–3 times per day. Never apply ice directly to skin.",
      "Do not give human pain medications (ibuprofen, acetaminophen, aspirin) — these are toxic to dogs. Ask your vet about safe dog-specific anti-inflammatory options if appropriate.",
    ],
    whenToSeeVet: [
      "Non-weight-bearing limping — same day, even if no other symptoms are present",
      "Limping that doesn't improve after 24–48 hours of rest",
      "Limping with visible swelling, heat in the joint, or pain when the area is touched",
      "Limping in a puppy — growing bones are more vulnerable; what looks like a sprain may be a growth plate injury",
      "Limping with systemic symptoms: fever, lethargy, not eating, vomiting",
      "Any limping after suspected trauma",
      "Intermittent limping that recurs over weeks (potential orthopaedic issue requiring imaging)",
    ],
    prevention: [
      "Maintain healthy body weight — excess weight dramatically increases the load on joints and is a significant risk factor for cruciate ligament rupture and arthritis progression.",
      "Regular exercise at appropriate intensity — the 'weekend warrior' pattern (sedentary during the week, intense activity on weekends) is a known risk factor for soft tissue injuries.",
      "Paw protection in extreme conditions: boots for hot pavement, cold surfaces, and areas treated with ice-melt chemicals.",
      "Regular nail trims — overgrown nails alter gait mechanics and increase stress on joints. See our <a href='/resources/how-to-trim-dog-nails-at-home' class='text-brand-start font-bold'>nail trimming guide</a>.",
      "Annual orthopedic assessment for high-risk breeds (Labradors, Goldens, German Shepherds, large breeds) starting at age 5.",
    ],
    faqs: [
      {
        q: "My dog is limping but not crying. Is he in pain?",
        a: "Yes, potentially. Dogs are stoic — they often don't vocalize pain the way humans do. A dog who is limping consistently but not crying may still be experiencing significant chronic pain, particularly in cases of arthritis or orthopedic conditions. The absence of crying is not a reliable indicator of pain absence. Behavioral signs of pain include: reducing activity, reluctance to climb stairs, difficulty rising after rest, and changes in social behavior.",
      },
      {
        q: "Can dogs limp from anxiety or stress?",
        a: "Psychogenic lameness (limping without a physical cause) exists in dogs but is genuinely rare. Before attributing limping to stress, a thorough physical exam and often imaging should rule out orthopedic causes. Dogs don't typically fake injuries, and a vet who sees a dog limping will examine for physical causes first and diagnose psychogenic lameness only after other causes are definitively excluded.",
      },
      {
        q: "How can I tell which leg my dog is limping on?",
        a: "Watch your dog from behind as they walk toward you. For front-leg lameness, the dog's head will bob DOWN toward the sound limb and UP when weight is placed on the affected limb (the head rises to offload the painful leg). For hind-leg lameness, watch the hips: the hip on the affected side will rise higher than normal as the dog tries to reduce weight on that leg. This is easier to see at a slow walk than a trot.",
      },
    ],
    relatedSlugs: ["what-is-hip-dysplasia-in-dogs", "senior-pet-care-guide", "complete-guide-to-pet-health"],
    pillarSlug: "complete-guide-to-pet-health",
    ctaFeature: "/vets",
    ctaText: "Book a Vet Appointment",
  },

  {
    slug: "why-is-my-dog-drinking-so-much-water",
    title: "Why Is My Dog Drinking So Much Water? Causes & When to Worry",
    seoTitle: "Why Is My Dog Drinking Too Much Water? Vet-Reviewed Guide 2026",
    shortTitle: "Excessive Dog Thirst",
    seoDescription: "Excessive thirst in dogs (polydipsia) is often an early sign of kidney disease, diabetes, or Cushing's disease. Learn the causes, how to measure your dog's intake, and when to see a vet.",
    category: "Symptom Guide",
    tags: ["Dog Health", "Symptoms", "Internal Medicine"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "9 Min Read",
    quickAnswer: "A dog drinking more than 100ml of water per kg of body weight per day is considered polydipsic (excessively thirsty). The most common causes are diabetes mellitus, kidney disease, Cushing's disease, and pyometra in intact females. Measure your dog's daily intake for 3 days, then call your vet — this symptom is almost always medically significant.",
    urgencyLevel: "urgent",
    urgencyLabel: "See vet within 2–3 days",
    introduction: `Increased water intake in dogs is one of the body's most reliable alarm systems for systemic disease. Unlike many symptoms that can be explained by behavioral or environmental factors, persistently increased thirst (polydipsia) accompanied by increased urination (polyuria) — a pairing so common it has its own medical abbreviation, PU/PD — is almost always a sign that something significant is happening internally.

The conditions most commonly responsible — kidney disease, diabetes mellitus, Cushing's disease, and pyometra — are all serious but most are manageable when caught early. The challenge is that the early stages of these conditions are often invisible except for the drinking change. This makes excessive thirst one of the most important early warning signs you can monitor.

How do you know if your dog is actually drinking too much? Measure it. This guide tells you how, explains the most likely causes based on your dog's age and other factors, and gives you a clear threshold for when this symptom requires same-day rather than scheduled attention.`,
    causes: [
      {
        title: "Diabetes mellitus",
        description: "When the body can't use glucose properly (either from insufficient insulin or insulin resistance), glucose spills into the urine, which pulls water with it, causing increased urination. Increased drinking compensates for the fluid loss. Classic presentation: increased thirst and urination, weight loss despite normal or increased appetite, often with a sweet or fruity smell to the breath. Common in middle-aged to older dogs, especially intact females and obese dogs.",
        severity: "serious",
      },
      {
        title: "Chronic kidney disease",
        description: "As kidney function declines, the kidneys lose their ability to concentrate urine. More water must be consumed to produce adequate urine volume to excrete waste products. Increased thirst is often the first noticeable sign — bloodwork changes (elevated BUN and creatinine) may lag behind clinical signs. Common in senior dogs of all breeds.",
        severity: "serious",
      },
      {
        title: "Cushing's disease (hyperadrenocorticism)",
        description: "Overproduction of cortisol (either from a pituitary tumor or adrenal tumor) causes a cluster of symptoms including PU/PD, pot-bellied appearance, thinning coat, muscle weakness, and increased appetite. PU/PD is the most common presenting symptom. Primarily affects middle-aged to older dogs, with Poodles, Dachshunds, Boxers, and Beagles overrepresented.",
        severity: "serious",
      },
      {
        title: "Pyometra",
        description: "A uterine infection in intact (unspayed) female dogs causes toxins that impair kidney function and trigger PU/PD. PU/PD is often the first sign noticed by owners, preceding more obvious symptoms (vaginal discharge, distended abdomen, vomiting). This is a life-threatening emergency — a pyometra-affected uterus can rupture. Any intact female dog showing increased thirst and urination requires urgent evaluation.",
        severity: "serious",
      },
      {
        title: "Liver disease",
        description: "The liver produces many hormones and processes toxins; liver dysfunction disrupts multiple systems including fluid regulation. Increased thirst may accompany jaundice (yellow tinge to skin and eyes), vomiting, ascites (fluid in the abdomen), and neurological signs in severe cases.",
        severity: "serious",
      },
      {
        title: "Hypercalcemia (elevated blood calcium)",
        description: "High blood calcium — from cancer, certain toxins (rat poison, excess vitamin D), or primary hyperparathyroidism — causes the kidneys to produce excess dilute urine, driving thirst. Often suspected when PU/PD accompanies lethargy, vomiting, and muscle weakness.",
        severity: "serious",
      },
      {
        title: "Medications",
        description: "Several commonly prescribed medications cause PU/PD as a side effect: prednisone and other corticosteroids (one of the most common causes), diuretics (furosemide), and phenobarbital (for seizures). If your dog started a new medication within weeks of the increased thirst, this is likely the cause — discuss with your prescribing vet before stopping any medication.",
        severity: "mild",
      },
      {
        title: "Heat and exercise",
        description: "Increased drinking in hot weather or after vigorous exercise is normal physiological compensation. This is only concerning if it persists when your dog is at normal temperature and resting, or if the amount seems out of proportion to the activity level.",
        severity: "mild",
      },
    ],
    emergencyWarnings: [
      "Intact female dog with excessive thirst and any vaginal discharge — potential pyometra emergency",
      "Excessive thirst combined with vomiting, lethargy, and reduced or no urination — kidney failure signs",
      "Dog unable to urinate despite frequent attempts — urinary blockage emergency (especially male cats and dogs)",
      "Sweet or fruity breath odor with excessive thirst — potential diabetic ketoacidosis, which is life-threatening",
      "Sudden onset of excessive thirst with weakness or collapse",
    ],
    homeCareTips: [
      "Measure water intake: for 3 consecutive days, fill your dog's water bowl with a measured amount at the start of each day, track additions, and measure what's left at the end. The normal intake range for a healthy dog is 50–100ml per kg of body weight per day. Write down the daily totals — your vet will need this information.",
      "Do NOT restrict water access. The kidneys may be using increased urination to compensate for a metabolic problem, and restricting water in this context is dangerous.",
      "Note associated symptoms: changes in urination frequency, color, or smell; changes in appetite; changes in energy; weight changes; any abnormal discharge. This information significantly helps with diagnosis.",
      "Collect a urine sample if possible: use a clean container to catch a midstream urine sample during the morning walk. Refrigerate and bring to the vet appointment. A fresh sample within 2 hours of collection provides the most diagnostically useful information.",
    ],
    whenToSeeVet: [
      "Any persistent increase in thirst lasting more than 3 days — this symptom is medically significant and warrants evaluation",
      "Increased thirst in an intact female dog — rule out pyometra urgently",
      "Increased thirst with any other symptoms: weight loss, vomiting, lethargy, changes in appetite, changes in coat condition",
      "Increased thirst that begins after starting a new medication — may require dose adjustment or alternative",
      "Increased thirst in a diabetic dog who is already on insulin — blood glucose may need regulation",
    ],
    prevention: [
      "Annual veterinary bloodwork from age 7 onward (age 5 for large breeds) — early kidney disease, diabetes, and Cushing's disease are all diagnosable before symptoms are obvious.",
      "Spay female dogs — eliminates pyometra risk entirely.",
      "Maintain healthy body weight — obesity is a significant risk factor for both diabetes and Cushing's disease.",
      "Keep fresh, clean water available at all times — don't mistake a dog drinking to compensate for insufficient access for pathological polydipsia.",
    ],
    faqs: [
      {
        q: "How much water should a dog drink in a day?",
        a: "The general guideline is 50–100ml of water per kilogram of body weight per day. A 20kg (44lb) dog should drink approximately 1–2 liters. Active dogs in warm weather will drink toward the high end. This is a guide — what matters more than hitting a number is whether your individual dog is drinking significantly more than their own baseline.",
      },
      {
        q: "My dog is drinking a lot but seems otherwise fine. Should I worry?",
        a: "Yes — seek veterinary evaluation. Many of the conditions causing PU/PD (kidney disease, Cushing's, early diabetes) are entirely asymptomatic except for the drinking change in their early stages. 'Otherwise fine' typically means the disease is early and eminently treatable. Waiting until other symptoms develop reduces the treatment window.",
      },
      {
        q: "Can anxiety cause a dog to drink more water?",
        a: "Yes, but this is overstated as a cause of PU/PD. Anxious dogs may drink more in specific situations (visitors arriving, thunderstorms), but persistent baseline increased thirst across all conditions is not a typical anxiety presentation. If your dog is drinking more consistently regardless of stress levels, medical causes should be investigated.",
      },
    ],
    relatedSlugs: ["why-is-my-dog-not-eating", "senior-pet-care-guide", "complete-guide-to-pet-health"],
    pillarSlug: "complete-guide-to-pet-health",
    ctaFeature: "/vets",
    ctaText: "Consult a Vet About This Symptom",
  },

  {
    slug: "why-does-my-dog-keep-licking-paws",
    title: "Why Does My Dog Keep Licking His Paws? Causes and Treatments",
    seoTitle: "Why Does My Dog Keep Licking Paws? All Causes Explained 2026",
    shortTitle: "Dog Licking Paws",
    seoDescription: "Chronic paw licking in dogs is almost always driven by allergies, pain, or anxiety — not habit. Learn the causes, how to examine the paws yourself, and the treatment options that actually work.",
    category: "Symptom Guide",
    tags: ["Dog Health", "Allergies", "Symptoms"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "10 Min Read",
    quickAnswer: "Dogs lick their paws chronically due to three main causes: environmental allergies (the most common), food allergies, or pain from a local injury or infection between the toes. The 'yeast and bacteria' you see as a secondary problem are almost always driven by an underlying allergy creating moist, inflamed skin. Treat the underlying cause, not just the infection.",
    urgencyLevel: "monitor",
    urgencyLabel: "Vet visit recommended within 1–2 weeks",
    introduction: `Paw licking that goes beyond normal post-walk cleaning and becomes a compulsive, frequent behavior — leaving the paws red, inflamed, stained (rust-brown from saliva), or raw — is a significant quality of life issue for dogs and an important diagnostic signal. Yet it's one of the most commonly undertreated symptoms in veterinary practice, often dismissed as "just a habit."

It is almost never "just a habit." Chronic paw licking in dogs is driven by discomfort: itching from allergies, pain from injury or infection, or anxiety causing self-soothing behavior. The licking itself creates secondary problems — the moist environment created by saliva promotes yeast and bacterial overgrowth, which causes more itching, which drives more licking. This cycle can continue for months or years without addressing the underlying cause.

Understanding whether you're looking at an allergy problem, a local injury or infection, or an anxiety behavior determines the entire treatment approach.`,
    causes: [
      {
        title: "Environmental allergies (atopic dermatitis)",
        description: "The most common cause of chronic paw licking. Grasses, pollens, mold spores, dust mites, and environmental chemicals trigger an allergic response in the skin — particularly the paws, face, ears, and groin. Atopy is seasonal in some dogs (worse in spring/fall with pollen peaks) and year-round in others. The paws are affected because they have direct contact with environmental allergens on the ground. Key diagnostic indicator: the licking improves when the dog is indoors and worsens after outdoor access.",
        severity: "moderate",
      },
      {
        title: "Food allergies",
        description: "Less common than environmental allergies (approximately 10–15% of all canine allergic disease), but important because they're year-round and don't respond to environmental allergen management. The most common food allergens in dogs are proteins: beef, chicken, dairy, and wheat. Food allergies cannot be diagnosed by a blood test — only a strict elimination diet trial (8–12 weeks of a novel or hydrolyzed protein diet with no other food inputs) is diagnostically valid.",
        severity: "moderate",
      },
      {
        title: "Contact allergy or irritant reaction",
        description: "Direct contact with chemicals — lawn fertilizers, pesticides, road salt, cleaning products on floors — can cause localized skin irritation specifically on the paws. Unlike systemic allergy, contact reactions are typically limited to the contact area. Wipe paws after outdoor walks and after exposures to potential irritants.",
        severity: "mild",
      },
      {
        title: "Interdigital cysts or furuncles",
        description: "Painful, fluid-filled cysts or bacterial abscesses between the toes cause dogs to lick and chew specifically at the affected foot. The licking is often localized to one foot and you may see a visible lump or swelling between the toe pads. Common in dogs who walk on rough surfaces, in certain breeds (English Bulldogs, Chinese Shar-Peis), and as a secondary complication of allergic skin disease.",
        severity: "moderate",
      },
      {
        title: "Yeast or bacterial paw infection",
        description: "Secondary to allergies in most cases — the inflamed, moist environment created by allergy-driven itching allows yeast (Malassezia) and bacteria (Staphylococcus) to overgrow. The hallmark of yeast infection is the rust-brown saliva staining combined with a distinctive corn-chip or musty odor. Bacterial infections produce more visible inflammation, discharge, and crusting. These infections must be treated, but treating them without addressing the underlying allergy causes rapid recurrence.",
        severity: "moderate",
      },
      {
        title: "Foreign body",
        description: "A grass seed, thorn, splinter, or piece of glass embedded between the toes causes acute-onset, localized paw licking — usually one foot, often one toe specifically. Check between each toe and pad carefully for any embedded material. Grass seeds (especially foxtails in the western US) can burrow through skin and are a veterinary emergency.",
        severity: "mild",
      },
      {
        title: "Anxiety or compulsive behavior",
        description: "Some dogs develop compulsive self-licking as an anxiety response — similar to OCD in humans, where the repetitive behavior provides temporary stress relief. This is most likely in dogs with diagnosed anxiety disorders, and the licking typically intensifies during stress events. Unlike allergy-driven licking, anxiety licking may be displaced — the dog may lick any accessible body part, not just the paws. This is a diagnosis of exclusion — rule out physical causes first.",
        severity: "mild",
      },
    ],
    emergencyWarnings: [
      "Sudden acute lameness combined with licking one specific paw — potential foreign body (especially grass seed in foxtail areas)",
      "Hot, swollen, painful area between the toes with discharge — abscess requiring immediate vet treatment",
      "Paw licking with systemic signs (lethargy, fever, loss of appetite) — potential spreading infection",
    ],
    homeCareTips: [
      "After outdoor walks, wipe each paw with a clean, damp cloth or baby wipe to remove contact allergens and irritants. Pay attention to the spaces between the toes.",
      "Use an Elizabethan collar (e-collar) or paw bootie during active licking episodes to break the lick-itch-lick cycle temporarily. This reduces the secondary infection risk but doesn't address the underlying cause.",
      "Examine each paw carefully: check between each toe for redness, swelling, foreign bodies, or cysts. Check each pad for cuts or cracks. Smell the paws — a corn-chip or musty odor indicates yeast overgrowth.",
      "Keep a paw licking diary: note severity, timing (after outdoor access? After specific activities? Seasonally?), and any other itch locations. This information is highly useful for your vet in determining whether the cause is environmental allergy, food allergy, or local.",
      "An oatmeal-based paw soak (colloidal oatmeal dissolved in cool water, 5-minute soak) provides temporary relief from allergy-driven itching. This is symptomatic relief — it doesn't address the cause.",
    ],
    whenToSeeVet: [
      "Licking that causes visible skin changes: redness, swelling, hair loss, raw or bleeding skin",
      "Rust-brown staining of paw fur — indicates chronic, significant licking",
      "Licking that is not responding to basic management (wiping paws, removing contact allergens)",
      "Any visible abnormality between the toes: swelling, lump, discharge, pain",
      "Seasonal or worsening pattern consistent with allergy — allergy management requires veterinary diagnosis and prescription treatment",
    ],
    prevention: [
      "Wipe paws after outdoor walks year-round — especially during high-pollen seasons and in areas treated with lawn chemicals or road salt.",
      "Discuss year-round allergy prevention with your vet if your dog has known atopy — preventive treatment during low-allergen seasons reduces the sensitization that drives worse flares.",
      "Address anxiety proactively — dogs with anxiety disorders benefit from behavioral intervention and, where appropriate, medication before compulsive behaviors develop.",
      "Regular paw checks as part of grooming — foreign bodies caught early before they burrow are much simpler to remove.",
    ],
    faqs: [
      {
        q: "Is it normal for dogs to lick their paws?",
        a: "Brief paw licking after walks, as a normal grooming behavior, is completely normal. What's not normal: licking that is frequent, prolonged, or compulsive; licking that is causing visible skin changes (redness, hair loss, rust staining); or licking combined with other itch signs (scratching ears, rubbing face, chewing groin). If you're asking whether it's normal, it probably isn't.",
      },
      {
        q: "What can I give my dog for paw allergies?",
        a: "Over-the-counter antihistamines (Benadryl/diphenhydramine) provide minimal benefit for canine allergic dermatitis — dogs process histamine differently from humans and antihistamines alone rarely adequately control allergy symptoms. Effective treatments require veterinary prescription: Apoquel (oclacitinib), Cytopoint (lokivetmab injection), or controlled Prednisone courses. For food allergies, a strict elimination diet is both diagnostic and curative.",
      },
      {
        q: "Why do dogs get rust-colored paws?",
        a: "The rust-brown or reddish staining on white or light-colored paws is caused by porphyrins — iron-containing compounds in dog saliva that oxidize and stain fur red-brown when the area is repeatedly wet. The staining itself is harmless, but it's a visible record of chronic licking, and the cause of that licking needs to be investigated.",
      },
    ],
    relatedSlugs: ["what-is-kennel-cough", "how-to-switch-dog-food-safely", "complete-guide-to-pet-health"],
    pillarSlug: "complete-guide-to-pet-health",
    ctaFeature: "/vets",
    ctaText: "Get an Allergy Assessment",
  },

  {
    slug: "dog-breathing-fast-at-rest",
    title: "My Dog Is Breathing Fast at Rest: When It's Normal and When It's Not",
    seoTitle: "Dog Breathing Fast at Rest: Causes & Emergency Signs 2026",
    shortTitle: "Dog Breathing Fast",
    seoDescription: "A dog breathing fast at rest can signal heart disease, pain, anxiety, or respiratory distress. Learn the normal respiratory rate, how to count it, and exactly when rapid breathing is an emergency.",
    category: "Symptom Guide",
    tags: ["Dog Health", "Emergency", "Respiratory"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "9 Min Read",
    quickAnswer: "A resting dog's normal respiratory rate is 15–30 breaths per minute. Count your dog's breaths for 30 seconds and double it. A consistent rate above 30 breaths per minute at rest — especially if accompanied by any effort to breathe, blue or pale gums, or lethargy — is an emergency requiring immediate veterinary evaluation.",
    urgencyLevel: "emergency",
    urgencyLabel: "Rate >30 bpm at rest: seek emergency vet",
    introduction: `The ability to monitor your dog's resting respiratory rate is one of the most valuable things you can learn as a pet owner — particularly if your dog has known heart disease, respiratory conditions, or is a brachycephalic breed (Bulldog, French Bulldog, Pug, Boston Terrier). Changes in resting respiratory rate are often the earliest detectable sign of cardiac decompensation — appearing days before a heart failure crisis.

For all dogs, knowing what's normal for your individual animal makes detecting what's abnormal significantly easier. A dog who normally breathes at 18 breaths per minute and is suddenly at 32 at rest is telling you something. A dog who has always breathed slightly faster at 28 per minute is probably fine — but you can only know that if you have a baseline.

This guide teaches you how to measure the respiratory rate accurately, explains the most common causes of rapid resting breathing, and gives you the clear warning signs that distinguish "this can wait until morning" from "go now."`,
    causes: [
      {
        title: "Heat and exercise recovery",
        description: "Panting and elevated respiratory rate during and immediately after exercise or in hot weather are completely normal. A dog who has just exercised or is in a warm environment will breathe faster. This is only concerning if it doesn't normalize within 10–15 minutes of rest in a cool environment, or if the dog seems distressed rather than just catching their breath.",
        severity: "mild",
      },
      {
        title: "Pain",
        description: "Pain from any source increases respiratory rate as part of the stress response. A dog who has recently injured themselves, is experiencing postoperative pain, or has significant chronic pain (uncontrolled arthritis, abdominal pain) may breathe faster at rest. Other pain signs: reluctance to move, vocalization when touched in a specific area, changes in posture, or not eating.",
        severity: "moderate",
      },
      {
        title: "Anxiety or stress",
        description: "Dogs experiencing anxiety (separation anxiety, phobia responses, generalized anxiety disorder) breathe faster as part of the physiological stress response. This is typically accompanied by other anxiety signs: panting, yawning, pacing, inability to settle, and the breathing normalizes as the stressor resolves.",
        severity: "mild",
      },
      {
        title: "Brachycephalic obstructive airway syndrome (BOAS)",
        description: "Flat-faced breeds (French Bulldogs, English Bulldogs, Pugs, Boston Terriers, Shih Tzus) have anatomically narrow airways — shortened skulls with soft tissue that hasn't reduced proportionally. This causes chronic mild-to-moderate respiratory compromise that most owners normalize because it's been present since the dog was a puppy. Snoring, stertor, exercise intolerance, and occasional cyanosis during exertion can all worsen and require surgical intervention.",
        severity: "moderate",
      },
      {
        title: "Heart disease (congestive heart failure)",
        description: "When heart disease progresses to heart failure, fluid accumulates in or around the lungs, reducing oxygen exchange and causing increased respiratory rate and effort. This is a life-threatening emergency in decompensated stages. Resting respiratory rate monitoring is the most sensitive early-warning tool for cardiac patients — a rate consistently above 30 bpm at rest warrants emergency evaluation.",
        severity: "serious",
      },
      {
        title: "Pleural effusion (fluid around the lungs)",
        description: "Fluid in the chest cavity compresses the lungs, causing rapid, shallow breathing and significant respiratory distress. Causes include heart failure, cancer, and infection. A dog with pleural effusion typically breathes with effort — elbows abducted (held away from the body), neck extended, and an orthopnea posture (can't lie comfortably on their side).",
        severity: "serious",
      },
      {
        title: "Pneumonia or respiratory infection",
        description: "Bacterial, viral, or aspiration pneumonia inflames and fills the airways with exudate, reducing oxygen exchange. Dogs with pneumonia typically have both a fast respiratory rate and obvious respiratory effort, often accompanied by cough, fever, and reduced exercise tolerance.",
        severity: "serious",
      },
    ],
    emergencyWarnings: [
      "Blue or purple tinge to the gums or tongue — cyanosis indicates dangerously low blood oxygen",
      "Breathing with noticeable effort: elbows held out from the body, neck extended, obvious abdominal pumping with each breath",
      "Open-mouth breathing in a dog who isn't hot and hasn't exercised",
      "Orthopnea — unable to lie down comfortably, prefers to stand with head extended",
      "Respiratory rate consistently above 30 breaths per minute at rest in a calm, cool environment",
      "Any brachycephalic dog (Bulldog, Frenchie, Pug) with worsening difficulty breathing",
    ],
    homeCareTips: [
      "Count the resting respiratory rate: watch your dog's chest rise and fall while they are truly at rest — lying down, calm, in a cool room. Count each rise of the chest (one rise = one breath) for 30 seconds and double it. Record this number. Do this 3 times at different rest periods to get an accurate baseline.",
      "For dogs with known heart disease: your vet may recommend keeping a written log of daily resting respiratory rate. A rate of 30+ on two consecutive mornings, or any single reading above 35, warrants an emergency call.",
      "Keep the environment cool — dogs with respiratory compromise are significantly more affected by heat. Air conditioning in warm months is not optional for cardiac or BOAS patients.",
      "Keep the dog calm and minimize physical exertion if breathing seems labored while evaluating the situation.",
    ],
    whenToSeeVet: [
      "Resting respiratory rate consistently above 30 breaths per minute — same day",
      "Any visible effort to breathe — emergency evaluation immediately",
      "Rapid breathing with blue or pale gums — critical emergency, go now",
      "Rapid breathing after any potential toxin exposure or trauma",
      "Rapid breathing in any brachycephalic breed that is worsening",
      "Rapid breathing in a dog with known heart disease — emergency call immediately",
    ],
    prevention: [
      "Establish and record your dog's normal resting respiratory rate now, before any problems — this baseline is invaluable when assessing change later.",
      "For dogs with known heart disease: daily resting respiratory rate monitoring at home, per your cardiologist's guidance, provides the earliest warning of decompensation.",
      "Brachycephalic owners: discuss BOAS surgical evaluation early — corrective procedures done before severe compromise develops produce better outcomes.",
      "Avoid exercise in heat for all dogs, particularly brachycephalic breeds and dogs with cardiac or respiratory conditions.",
    ],
    faqs: [
      {
        q: "What is a normal breathing rate for a dog?",
        a: "15–30 breaths per minute at rest is the normal range for adult dogs. Puppies breathe slightly faster. Large breeds tend to breathe at the lower end of the range; small breeds at the higher end. The individual dog's consistent baseline matters more than the absolute number — know your dog's normal.",
      },
      {
        q: "Why is my dog breathing fast and shaking?",
        a: "Rapid breathing combined with shaking strongly suggests pain or severe anxiety. Pain from any source triggers both the stress response (fast breathing) and muscle tension or trembling. If your dog is breathing fast and shaking and there's no obvious reason (no heat, no exercise, not a known thunderstorm-phobic during a storm), a vet evaluation is warranted — these combined symptoms often indicate significant discomfort.",
      },
      {
        q: "My dog breathes fast when sleeping. Is this normal?",
        a: "Fast breathing during REM sleep — along with leg twitching, small vocalizations, and rapid eye movements — is completely normal and indicates dreaming. However, labored or effortful breathing during sleep is not normal and should be evaluated. The distinction: dreaming-related fast breathing is regular and the dog seems otherwise restful; pathological fast breathing during sleep is often accompanied by discomfort, inability to settle in a comfortable position, or obvious respiratory effort.",
      },
    ],
    relatedSlugs: ["what-is-kennel-cough", "senior-pet-care-guide", "complete-guide-to-pet-health"],
    pillarSlug: "complete-guide-to-pet-health",
    ctaFeature: "/vets",
    ctaText: "Emergency Vet Guidance",
  },
];
