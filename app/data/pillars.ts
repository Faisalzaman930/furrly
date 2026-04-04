export interface PillarClusterLink {
  slug: string;
  title: string;
  type: "how-to" | "symptom" | "breed" | "definition" | "guide" | "article";
}

export interface PillarChapter {
  title: string;
  summary: string;
  content: string;
  linkedSlug?: string;
}

export interface PillarPage {
  slug: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  seoDescription: string;
  category: "Complete Guide";
  tags: string[];
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  quickAnswer: string;
  introduction: string;
  chapters: PillarChapter[];
  clusterArticles: PillarClusterLink[];
  faqs: { q: string; a: string }[];
  ctaFeature: string;
  ctaText: string;
}

export const pillarPages: PillarPage[] = [
  {
    slug: "complete-guide-to-dog-training",
    title: "The Complete Guide to Dog Training: Methods, Science & What Actually Works",
    seoTitle: "Complete Dog Training Guide 2026: Methods & Science",
    shortTitle: "Dog Training Hub",
    seoDescription: "The definitive dog training guide — positive reinforcement science, how dogs learn, foundational commands, behavior problems, and choosing the right trainer. Everything in one comprehensive resource.",
    category: "Complete Guide",
    tags: ["Dog Training", "Behavior", "Expert Guide"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "25 Min Read",
    quickAnswer: "Effective dog training is grounded in behavioral science: dogs learn by association (classical conditioning) and consequence (operant conditioning). Reward-based positive reinforcement produces the fastest learning with the most durable results and no behavioral fallout. Every dog of any age can learn with the right approach, appropriate timing, and consistent practice.",
    introduction: `Dog training is the most misunderstood subject in pet ownership. Most people either overthink it (treating it as a complex discipline requiring years of study) or underthink it (assuming dogs should "just know" what's wanted after being told once). The reality is in between: training is a set of learnable, applicable principles that any owner with consistency and patience can use effectively.

The foundation is behavioral science — not dog-specific folk wisdom, not dominance theory (which has been thoroughly discredited), but the same principles of learning that apply to all mammals. Understanding how dogs actually learn makes you significantly more effective, because you can diagnose why something isn't working and adjust, rather than repeating the same approach and hoping for different results.

This guide covers the science of how dogs learn, the foundational behaviors every dog should know, common behavior problems and evidence-based solutions, and how to choose a trainer when professional help is needed. Each section links to deeper resources in our training library.`,
    chapters: [
      {
        title: "How Dogs Learn: The Science Every Owner Should Know",
        summary: "Classical conditioning, operant conditioning, timing, and why positive reinforcement works better than punishment.",
        content: `Dogs learn through two primary mechanisms: classical conditioning (learning by association) and operant conditioning (learning by consequence). Both are happening constantly — even when you're not intentionally training.

**Classical conditioning** is automatic, involuntary learning. The leash appears → the dog gets excited, because the leash has been consistently followed by walks. A specific tone of voice → the dog cowers, because that tone has been followed by unpleasant events. These associations form whether you intend them to or not, which means you're always training.

**Operant conditioning** is the mechanism you use deliberately in training. The dog does something → it's followed by a consequence → the probability of that behavior increases or decreases. Reward a behavior and it becomes more likely. Remove the dog's access to something rewarding (ignoring jumping) and that behavior becomes less likely. Add an unpleasant consequence and the behavior may decrease — but with documented side effects that make this approach the least preferred.

**Timing is everything.** The window for learning from a consequence is approximately 1–3 seconds. A reward or marker given 10 seconds after the behavior doesn't teach the dog what they did right. They're learning what they were doing at the moment the treat arrived. This is why so many owners say "he knows what he did wrong" when the dog looks guilty — the dog isn't feeling guilt. They're reading the owner's body language and reacting with appeasement behavior, not recognizing a connection to an event that happened 30 minutes ago.`,
        linkedSlug: "what-is-positive-reinforcement-dog-training",
      },
      {
        title: "The 5 Foundational Behaviors Every Dog Must Know",
        summary: "Sit, stay, come, leave it, and loose-leash walking — the safety and communication foundations.",
        content: `Five behaviors form the practical foundation for a well-functioning relationship with any dog. These are not tricks — they are safety and communication tools that make every other aspect of dog ownership more manageable.

**Sit:** The easiest behavior to teach and the prerequisite for almost everything else. Teach by luring from nose to above the head — the natural response is a sit. Mark (click or "yes") the instant the hindquarters touch the floor. Reward. Add the verbal cue only after the behavior is reliable.

**Stay:** Built from sit by extending duration (seconds → minutes), distance (1 foot → across the room), and distraction (quiet room → outdoors) incrementally. A reliable "stay" is a safety behavior — keeping a dog at a front door while guests arrive, or preventing them from bolting.

**Come (recall):** The most important safety behavior you can teach. Never call your dog for anything unpleasant. The word "come" must always predict something wonderful — it must be the most reliable predictor of excellent things in your dog's vocabulary. Practice in low-distraction settings before gradually adding challenges. See our full <a href="/resources/how-to-stop-dog-pulling-on-leash" class="text-brand-start font-bold">guide on building reliable outdoor behaviors</a>.

**Leave it:** Teaches disengagement from whatever the dog is approaching or focused on. Essential for preventing ingestion of toxic substances, redirecting from other dogs or wildlife, and teaching impulse control.

**Loose-leash walking:** The behavior most owners struggle with most. The rule is simple and absolute: the leash never, ever tightens as a result of pulling and still results in forward movement. See our <a href="/resources/how-to-stop-dog-pulling-on-leash" class="text-brand-start font-bold">complete leash training guide</a> for the full method.`,
        linkedSlug: "how-to-stop-dog-pulling-on-leash",
      },
      {
        title: "Common Behavior Problems: Evidence-Based Solutions",
        summary: "Separation anxiety, excessive barking, destructive behavior, leash reactivity — what works and what doesn't.",
        content: `**Separation anxiety:** A genuine anxiety disorder requiring systematic desensitization and often veterinary medication support. Not manageable through punishment or "toughing it out." See our <a href="/resources/how-to-help-dog-with-separation-anxiety" class="text-brand-start font-bold">complete separation anxiety guide</a>.

**Excessive barking:** The trigger type determines the solution. Alert barking (barking at noises/movement) is managed through environmental management and a "quiet" command. Demand barking (barking at owners for attention, food, play) is extinguished by consistently withholding the demanded resource. Anxiety barking requires addressing the underlying anxiety. Barking at other dogs may indicate leash reactivity requiring counter-conditioning.

**Destructive chewing:** Almost always a symptom of insufficient exercise, inadequate mental stimulation, or anxiety — not disobedience. Management (removing access to chewable items when unsupervised) plus enrichment (appropriate chews, food puzzles) plus exercise addresses the cause rather than just the symptom.

**Leash reactivity:** Reactive behavior toward other dogs, people, or stimuli on-leash is one of the most common and most mishandled behavior issues. It is typically driven by fear or frustration — not aggression. The treatment is counter-conditioning and desensitization below threshold, not correction. It requires patience, consistency, and often professional guidance.

**Jumping up:** Eliminated by removing the reward (turning away, removing eye contact, no touching) consistently every time the dog jumps. Simultaneously teaching and rewarding an alternative behavior (four paws on floor or a sit) accelerates the process. Inconsistency — allowing jumping sometimes — maintains the behavior indefinitely.`,
        linkedSlug: "how-to-help-dog-with-separation-anxiety",
      },
      {
        title: "Reading Your Dog: Body Language Basics",
        summary: "The calming signals, stress escalation ladder, and how to identify what your dog is actually communicating.",
        content: `Training is a two-way communication process. Becoming more skilled at reading your dog's body language is as important as becoming more skilled at communicating with them.

Dogs communicate continuously through their whole body — tail position and movement, ear carriage, eye tension, body weight distribution, and subtle signals like lip licking, yawning, and turning away. Most of these signals are missed by owners who are focused on the obvious (wagging tail = happy dog), missing the full picture (wagging tail + stiff body + hard stare = aroused, potentially reactive dog).

Understanding the calming signals your dog uses — the yawns, the sniffs, the head turns that signal mild discomfort — lets you intervene before stress escalates to a point where reactivity occurs. See our comprehensive <a href="/resources/how-to-read-dog-body-language" class="text-brand-start font-bold">body language guide</a> for the full breakdown.

Key principle: **Never punish growling.** A growl is communication — the last verbal warning before escalation. Suppressing growling through punishment doesn't reduce the underlying tension; it removes the warning, producing dogs who appear to bite without warning.`,
        linkedSlug: "how-to-read-dog-body-language",
      },
    ],
    clusterArticles: [
      { slug: "how-to-crate-train-a-puppy", title: "How to Crate Train a Puppy", type: "how-to" },
      { slug: "how-to-stop-dog-pulling-on-leash", title: "How to Stop Dog Pulling on Leash", type: "how-to" },
      { slug: "how-to-read-dog-body-language", title: "How to Read Dog Body Language", type: "how-to" },
      { slug: "how-to-help-dog-with-separation-anxiety", title: "How to Help a Dog With Separation Anxiety", type: "how-to" },
      { slug: "what-is-positive-reinforcement-dog-training", title: "What Is Positive Reinforcement Training?", type: "definition" },
      { slug: "best-dog-training-apps", title: "Best Dog Training Apps Tested", type: "article" },
      { slug: "puppy-socialization-masterclass", title: "Puppy Socialization Masterclass", type: "guide" },
    ],
    faqs: [
      { q: "What is the best dog training method?", a: "Positive reinforcement — reward-based training — has the strongest scientific evidence base and is recommended by the American Veterinary Society of Animal Behavior. It produces the fastest learning, most durable behaviors, and no behavioral fallout. Punishment-based methods can suppress behaviors but produce documented side effects including increased anxiety and aggression." },
      { q: "Can you train an old dog new tricks?", a: "Yes — adult and senior dogs learn well with positive reinforcement. The nervous system's ability to form new learned associations doesn't diminish significantly with age in most dogs. Some senior dogs have reduced hearing or vision that requires adapting training approaches, but learning itself remains possible." },
      { q: "How long should dog training sessions be?", a: "5–10 minutes for most dogs, 2–4 minutes for puppies and dogs with low frustration tolerance. Multiple short sessions spread throughout the day produce faster learning than one long session. End sessions while the dog is still engaged and successful, not when they're losing interest — ending on success builds positive association with training." },
    ],
    ctaFeature: "/playdates",
    ctaText: "Practice Training in Real Social Scenarios",
  },

  {
    slug: "complete-guide-to-puppy-care",
    title: "The Complete Puppy Care Guide: Week-by-Week Through the First Year",
    seoTitle: "Complete Puppy Care Guide 2026: Week-by-Week First Year",
    shortTitle: "Puppy Care Hub",
    seoDescription: "Everything you need for puppy care in the first year: vaccination schedule, socialization window, housetraining, crate training, first vet visits, and monthly milestones. The definitive new puppy guide.",
    category: "Complete Guide",
    tags: ["Puppies", "New Owners", "Expert Guide"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "28 Min Read",
    quickAnswer: "The first year of puppy ownership is the highest-stakes period of a dog's life. The socialization window (8–16 weeks) shapes behavioral baseline for years. The vaccination schedule protects against fatal diseases. Housetraining requires 2–4 weeks of intensive supervision. Getting each of these right in sequence creates the foundation for a decade or more of partnership.",
    introduction: `Bringing home a puppy is one of the most rewarding things a person can do — and one of the most front-loaded in terms of time, consistency, and decision-making. The first year involves more choices and more critical developmental windows than any subsequent year of the dog's life.

The good news: most of the complexity is concentrated in the first 4–5 months. The vaccination series, the socialization window, the housetraining, and the foundational behavior patterns are all established in this early period. After that, ownership becomes significantly more manageable.

This guide walks through each phase of the first year, linking to detailed individual resources on each major topic, so you have both the overview map and the deep-dive details when you need them.`,
    chapters: [
      {
        title: "Weeks 1–4 at Home (8–12 Weeks): Setup, Safety, and the Vet",
        summary: "The immediate priorities: vet visit, vaccination, puppy-proofing, and establishing routine.",
        content: `**First 72 hours:** Schedule a veterinary appointment within 3 days of bringing the puppy home. The vet will confirm vaccination status, check for parasites, establish the vaccination and deworming schedule, and give you breed-specific guidance. Bring all paperwork from the breeder or rescue organization.

**Vaccination schedule (standard DHPP/DA2PP):**
- 6–8 weeks: First DHPP (distemper, hepatitis, parainfluenza, parvo) + Bordetella
- 10–12 weeks: Second DHPP + Leptospirosis
- 14–16 weeks: Third DHPP + Rabies
- 1 year: Boosters
- After: Follow your vet's recommended schedule

Until the series is complete (16 weeks), avoid: public ground where unknown dogs may have been, dog parks, pet store floors, and areas with unknown sanitation history. The socialization window overlap with the vaccination series creates the "parvo paradox" — see our <a href="/resources/puppy-socialization-masterclass" class="text-brand-start font-bold">puppy socialization guide</a> for safe early socialization approaches.

**Immediate priorities at home:**
- Begin housetraining from day one with a strict schedule
- Introduce the crate immediately using positive association
- Establish consistent feeding times (3x daily until 12 weeks, 2x daily after)
- Baby-gate access to one or two rooms only — expand as reliability is established`,
        linkedSlug: "how-to-potty-train-a-puppy",
      },
      {
        title: "Weeks 4–8 (12–16 Weeks): The Socialization Window",
        summary: "The most important developmental period: maximizing positive exposure while managing vaccination risk.",
        content: `The period from 8–16 weeks is the primary socialization window — when positive exposure to new stimuli creates "normal" and safe associations that last a lifetime. Missing this window doesn't produce a broken dog, but it does produce a dog who will require significantly more work to become comfortable in novel situations.

**Target experiences:**
- 100 different people (varying age, appearance, clothing, mobility devices)
- Multiple floor surfaces (grass, gravel, metal, tile, carpet)
- Variety of sounds (traffic, children, appliances, music)
- Other animals — carefully selected healthy, vaccinated dogs in safe environments
- Handling (paws, ears, mouth, tail) by multiple people
- Veterinary-type handling (examination position)

**Safe socialization before full vaccination:**
Carry the puppy in a bag or arms through high-stimulation environments — the puppy gets full sensory exposure without paw contact with potentially contaminated ground. Puppy classes (with vaccination requirements) at certified trainers are the highest-value socialization investment available.

See our comprehensive <a href="/resources/puppy-socialization-masterclass" class="text-brand-start font-bold">socialization masterclass</a> for the complete protocol including the parvo-safety balance.`,
        linkedSlug: "puppy-socialization-masterclass",
      },
      {
        title: "Months 4–6: Adolescence Begins",
        summary: "Fear periods, adolescent selective hearing, and why this phase requires patience.",
        content: `Around 4–6 months, many puppies enter a secondary fear period — a developmental phase where previously neutral stimuli suddenly seem threatening. A puppy who walked past the garbage truck without issue at 12 weeks may suddenly be terrified of it at 16 weeks. This is temporary and normal. The response is to not force exposure during this phase — give distance from the feared stimulus, reward calm observation, and allow the fear to resolve rather than flooding through it.

This period also often overlaps with teething (chewing increases dramatically) and the beginning of adolescent selective hearing — a puppy who was reliably responding to their name and basic cues may begin appearing to "forget" everything. This is often developmentally normal as hormonal changes affect attention and drive. Maintain consistent training; don't abandon it because it seems to be regressing.

Physical changes: consider spay/neuter timing discussion with your vet. Current evidence suggests waiting until growth plates close (which varies by breed and size) before spay/neuter in large breeds — discuss the timing with your veterinarian.`,
      },
      {
        title: "Months 6–12: Deepening the Foundation",
        summary: "Expanding training, socialization, and building toward adult reliability.",
        content: `By month six, the puppy should have: reliable housetraining (very few accidents), basic command responses in low-distraction environments, comfortable crate acceptance, and established daily routines. If any of these are missing, address them explicitly rather than assuming they'll resolve with time.

**Training progression:** Begin proofing behaviors against distraction — take training outdoors, to different neighborhoods, to training classes. A behavior that only works in the kitchen isn't a reliable behavior. Introduce "leave it" in real scenarios. Work on loose-leash walking in increasingly challenging environments.

**Exercise adjustment:** After 18 months (earlier for smaller breeds) you can begin incorporating higher-impact exercise. Before growth plates close, stick to moderate exercise without forced sustained running or repetitive jumping.

**Building independence:** Gradually extending alone time, building reliable behavior in low-supervision scenarios, and establishing the dog's comfort with their own company prevents separation anxiety from developing in the second year when work schedules may change.`,
      },
    ],
    clusterArticles: [
      { slug: "how-to-crate-train-a-puppy", title: "How to Crate Train a Puppy", type: "how-to" },
      { slug: "how-to-potty-train-a-puppy", title: "How to Potty Train a Puppy", type: "how-to" },
      { slug: "puppy-socialization-masterclass", title: "Puppy Socialization Masterclass", type: "guide" },
      { slug: "first-time-dog-owner-complete-guide", title: "First-Time Dog Owner Complete Guide", type: "guide" },
      { slug: "what-is-parvo-in-dogs", title: "What Is Parvo in Dogs?", type: "definition" },
      { slug: "french-bulldog-complete-guide", title: "French Bulldog Owner Guide", type: "breed" },
      { slug: "golden-retriever-complete-guide", title: "Golden Retriever Owner Guide", type: "breed" },
    ],
    faqs: [
      { q: "What should I do in the first week with a new puppy?", a: "The first week priorities: vet visit (within 72 hours), establish feeding schedule (3x daily), begin housetraining immediately with a strict schedule, introduce the crate with positive association, and keep the environment calm. Resist the urge to immediately expose the puppy to many visitors — the first week should be boring, calm, and focused on routine establishment." },
      { q: "When should I start training my puppy?", a: "Immediately — the day you bring them home. Puppies start learning from the moment they arrive: whether the crate predicts good things or bad things, whether sitting produces attention or jumping does, whether the crate is a safe space or a punishment. 'Training' begins with every interaction. Formal sessions can begin at 8 weeks with 2-3 minute sessions several times daily." },
      { q: "How much sleep does a puppy need?", a: "Young puppies sleep 16–18 hours per day. This is necessary for brain development and physical growth. A puppy who isn't getting adequate rest (because they're constantly being held, played with, or stimulated) becomes overtired and develops 'witching hour' hyperactivity — the puppy equivalent of an overtired toddler melting down. Structured nap periods in the crate are part of good puppy management." },
    ],
    ctaFeature: "/adoption",
    ctaText: "Find Your Puppy Through Furrly Adoption",
  },

  {
    slug: "complete-guide-to-pet-health",
    title: "The Complete Pet Health Guide: Prevention, Symptoms & Veterinary Care",
    seoTitle: "Complete Pet Health Guide 2026: Prevention & Vet Care",
    shortTitle: "Pet Health Hub",
    seoDescription: "The definitive pet health guide — preventive care schedules, how to recognize serious symptoms, what bloodwork reveals, emergency signs, and how to build a relationship with your vet. Dogs and cats.",
    category: "Complete Guide",
    tags: ["Pet Health", "Veterinary Care", "Prevention"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "30 Min Read",
    quickAnswer: "Proactive pet health care — annual or biannual vet exams, age-appropriate preventive care, and owner-level monitoring of key health indicators — catches most serious conditions in their manageable early stages. The biggest single determinant of pet longevity and quality of life isn't treatment advances; it's whether problems are found early enough to treat effectively.",
    introduction: `Modern veterinary medicine can do extraordinary things: cancer chemotherapy, total hip replacement, cardiac surgery, corneal transplants. But the most impactful thing in pet health isn't any of those interventions — it's the annual or biannual exam that catches kidney disease at Stage 1 rather than Stage 3, identifies the dental disease that was silently driving chronic pain for months, or detects the lymph node enlargement that leads to a lymphoma diagnosis with a treatment window rather than without one.

Prevention and early detection are the unglamorous foundations of pet longevity. This guide covers the preventive care schedule that keeps most pets healthy, the symptom patterns that indicate when veterinary attention is urgent rather than optional, and the owner-level monitoring skills that make you an effective early-warning system for your own animal.`,
    chapters: [
      {
        title: "The Preventive Care Calendar: What Happens at Each Age",
        summary: "Vaccination schedules, parasite prevention, senior bloodwork, and dental care by age.",
        content: `**Puppies and kittens (8 weeks – 1 year):**
The vaccination series, parasite prevention, and initial behavior foundation. Regular vet check-ins every 3–4 weeks until the series is complete.

**Young adults (1–7 years):**
Annual wellness exams, DHPP and rabies boosters per vet recommendation, heartworm and flea/tick prevention year-round in endemic areas, dental examination. Spay/neuter follow-up assessment. The foundation of this period is consistent prevention — most young, healthy animals require minimal emergency care if preventive protocols are followed.

**Middle age (7–9 years):**
Senior bloodwork begins — baseline renal values, thyroid, CBC. Dental cleaning schedule review with your vet. Blood pressure measurement for cats especially. Orthopedic assessment for large-breed dogs. Twice-annual examinations recommended.

**Senior (9+ years):**
Twice-annual examinations as standard, not optional. Complete bloodwork twice yearly. More frequent dental care as periodontal disease accelerates. Pain assessment for osteoarthritis (affects 80% of dogs over 8). Quality-of-life monitoring. See our <a href="/resources/senior-pet-care-guide" class="text-brand-start font-bold">complete senior pet care guide</a>.`,
        linkedSlug: "senior-pet-care-guide",
      },
      {
        title: "Reading Symptoms: When to Call vs. When to Go",
        summary: "Clear triage guidance for the most common symptoms — emergency, urgent, and monitor.",
        content: `The hardest judgment for pet owners is assessing symptom severity. Veterinary practices are appropriately cautious — they'll always say "if in doubt, bring them in." But not every symptom requires immediate emergency evaluation. Developing the judgment to distinguish urgent from watchful-waiting reduces both unnecessary stress and emergency vet bills.

**Always emergency: go immediately**
- Difficulty breathing, labored breathing, open-mouth breathing in cats
- Suspected bloat/GDV (unproductive retching + distended abdomen in large dogs)
- Collapse, extreme weakness, inability to stand
- Pale, white, or blue-tinged gums
- Suspected toxin ingestion
- Seizures lasting more than 2 minutes

**Same-day evaluation**
- Non-weight-bearing lameness
- Vomiting more than 3 times in a day
- Complete appetite loss in a puppy
- Any urinary straining without urine production (especially in male cats)
- Eye injuries or sudden vision change

**Monitor for 24 hours (call your vet for guidance)**
- Single vomiting episode in an otherwise normal adult dog
- Single missed meal in a healthy adult dog
- Mild limp with full weight-bearing

**Symptom guides in our library:**
- <a href="/resources/why-is-my-dog-not-eating" class="text-brand-start font-bold">Why is my dog not eating?</a>
- <a href="/resources/why-is-my-dog-limping" class="text-brand-start font-bold">Why is my dog limping?</a>
- <a href="/resources/dog-breathing-fast-at-rest" class="text-brand-start font-bold">Dog breathing fast at rest</a>
- <a href="/resources/why-is-my-dog-drinking-so-much-water" class="text-brand-start font-bold">Excessive thirst in dogs</a>`,
        linkedSlug: "why-is-my-dog-not-eating",
      },
      {
        title: "What Bloodwork Tells You (And When to Ask For It)",
        summary: "Understanding the CBC, metabolic panel, thyroid, and when each is indicated.",
        content: `Annual bloodwork in senior pets isn't a luxury — it's the most reliable early detection tool available. Many conditions that significantly affect quality of life and lifespan are entirely asymptomatic in early stages, detectable only on bloodwork.

**The Complete Blood Count (CBC):**
Measures red blood cells (anemia?), white blood cells (infection, inflammation, certain cancers), and platelets (clotting ability). The differential white count can indicate specific types of infection or systemic disease.

**The Comprehensive Metabolic Panel:**
Kidney values (BUN, creatinine, and importantly SDMA — ask specifically for this newer marker that detects kidney disease earlier), liver enzymes (ALT, ALP), blood glucose (diabetes), total protein, albumin, and electrolytes. This panel screens the body's major metabolic systems simultaneously.

**Thyroid:**
T4 is standard. Hypothyroidism (low) is extremely common in senior dogs; hyperthyroidism (high) is the most common endocrine disease in senior cats. Add this to any senior wellness bloodwork.

**Urinalysis:**
Complements the metabolic panel — kidney function assessment, infection screening, glucose and protein in urine. Should be performed concurrently with bloodwork, not as an either/or.

For senior cats especially — starting at age 10 — SDMA, T4, blood pressure, and urinalysis form a critical early-detection quartet for the four most common age-related diseases: kidney disease, hyperthyroidism, hypertension, and diabetes.`,
      },
    ],
    clusterArticles: [
      { slug: "why-is-my-dog-not-eating", title: "Why Is My Dog Not Eating?", type: "symptom" },
      { slug: "why-is-my-dog-limping", title: "Why Is My Dog Limping?", type: "symptom" },
      { slug: "why-is-my-dog-drinking-so-much-water", title: "Why Is My Dog Drinking So Much Water?", type: "symptom" },
      { slug: "dog-breathing-fast-at-rest", title: "Dog Breathing Fast at Rest", type: "symptom" },
      { slug: "why-does-my-dog-keep-licking-paws", title: "Why Does My Dog Keep Licking Paws?", type: "symptom" },
      { slug: "what-is-kennel-cough", title: "What Is Kennel Cough?", type: "definition" },
      { slug: "what-is-parvo-in-dogs", title: "What Is Parvo in Dogs?", type: "definition" },
      { slug: "what-is-hip-dysplasia-in-dogs", title: "What Is Hip Dysplasia?", type: "definition" },
      { slug: "what-is-bloat-in-dogs", title: "What Is Bloat / GDV in Dogs?", type: "definition" },
      { slug: "senior-pet-care-guide", title: "Senior Pet Care Guide", type: "guide" },
      { slug: "how-to-trim-dog-nails-at-home", title: "How to Trim Dog Nails at Home", type: "how-to" },
      { slug: "best-pet-health-parenting-apps", title: "Best Pet Health Tracking Apps", type: "article" },
    ],
    faqs: [
      { q: "How often should I take my dog to the vet?", a: "Once annually for healthy adult dogs (1–7 years). Twice annually for puppies during their first year (every 3–4 weeks until vaccinations are complete), senior dogs (7+ years), and any dog managing a chronic health condition. Cats, who are exceptional at masking illness, benefit from twice-annual exams from middle age onward. Annual visits for routine dogs should include physical exam, weight, dental assessment, and parasite prevention review." },
      { q: "What vaccinations does my dog need?", a: "Core vaccines for all dogs: DHPP (distemper, hepatitis, parainfluenza, parvovirus) and rabies. Non-core vaccines based on lifestyle and geography: Bordetella (boarding, grooming, dog parks), Leptospirosis (exposure to wildlife, standing water), Lyme (tick-endemic regions), canine influenza (exposure risk). Your vet will recommend the appropriate schedule based on your dog's risk factors." },
      { q: "Should I get pet insurance?", a: "Pet insurance is most valuable when purchased before conditions develop (ideally at 8 weeks of age) because pre-existing conditions are excluded from coverage. The financial case is strongest for: breeds with known health risks (Frenchies, Goldens, large breeds with orthopedic risks), owners who would want to pursue treatment for cancer or emergency surgery, and owners without substantial savings for unexpected $3,000–10,000 vet bills. Calculate the real annual cost including premiums, deductibles, and typical reimbursement rates for your specific policy." },
    ],
    ctaFeature: "/vets",
    ctaText: "Access Veterinary Support in the Furrly App",
  },

  {
    slug: "complete-guide-to-pet-nutrition",
    title: "The Complete Pet Nutrition Guide: What to Feed, How Much, and Why",
    seoTitle: "Complete Pet Nutrition Guide 2026: Feeding Dogs & Cats",
    shortTitle: "Pet Nutrition Hub",
    seoDescription: "The definitive pet nutrition guide — understanding pet food labels, AAFCO standards, caloric calculation, life-stage nutrition, raw vs. kibble, and common feeding mistakes. Vet-reviewed.",
    category: "Complete Guide",
    tags: ["Nutrition", "Feeding", "Pet Health"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "22 Min Read",
    quickAnswer: "Feed a pet food with an AAFCO complete nutrition statement for the appropriate life stage, from named protein sources, at an amount that maintains ideal body condition. The three biggest feeding mistakes are: overfeeding (the leading cause of preventable disease in pets), rapid food transitions (preventable digestive upset), and choosing food based on marketing rather than label content.",
    introduction: `Pet food is a $50+ billion annual industry in the United States. It is also one of the most confusingly marketed consumer product categories in existence — "premium," "holistic," "natural," and "ancestral" are printed on bags without any regulatory meaning attached to them. Meanwhile, the regulated information that actually tells you what the food contains and whether it meets nutritional standards is printed in small text near the bottom.

This guide cuts through the marketing to explain what the regulated portions of pet food labels actually mean, how to calculate appropriate portions, what the science says about different feeding approaches, and the most common feeding mistakes that veterinarians see daily. Every dog and cat owner will find actionable changes here — because almost no one is feeding optimally without intentional study.`,
    chapters: [
      {
        title: "Reading Pet Food Labels: The Regulated Information",
        summary: "AAFCO statements, ingredient lists, guaranteed analysis, and what they actually tell you.",
        content: `**The AAFCO nutritional adequacy statement** is the most important line on any pet food label. It tells you two things: (1) whether the food meets complete nutrition standards for a specific life stage, and (2) how that was determined.

"Formulated to meet AAFCO nutrient profiles" means the recipe was calculated on paper to meet minimums. "Substantiated by feeding trials" means it was actually tested on animals. Feeding trials are a higher standard.

Life stage matters: "for growth and reproduction" (puppy/kitten), "for adult maintenance," or "for all life stages." "All life stages" meets the more demanding puppy standards — it's appropriate for any age but may exceed the caloric density needed for sedentary adult dogs.

**The ingredient list:** Ingredients are listed by pre-cooking weight. "Chicken" first sounds good but chicken is 70% water — after cooking, it may contribute less protein than "chicken meal" (dried, concentrated) listed lower. Read the first 5 ingredients together as a group.

**Dry matter basis calculation:** The only way to compare foods with different moisture levels (dry kibble vs. canned vs. raw). Subtract moisture from 100 to get dry matter %. Divide nutrient % by dry matter % and multiply by 100. See our full label-reading guide: <a href="/resources/how-to-read-pet-food-labels" class="text-brand-start font-bold">How to Read a Pet Food Label</a>.`,
        linkedSlug: "how-to-read-pet-food-labels",
      },
      {
        title: "Caloric Calculation and Body Condition Scoring",
        summary: "How to calculate daily caloric needs and assess whether your pet is at a healthy weight.",
        content: `**Caloric calculation (rough baseline for dogs):**
- Resting energy requirement (RER): 70 × (body weight in kg)^0.75
- Multiply by activity factor: 1.6 for neutered adult, 1.8 for intact adult, 2.0 for active working dog, 1.4 for weight loss

For a neutered 25kg (55lb) adult dog:
RER: 70 × (25)^0.75 = 70 × 11.18 = 782 kcal/day
Maintenance: 782 × 1.6 = 1,250 kcal/day

This is a starting point — individual metabolism varies. The most important calibration tool is body condition score.

**Body condition score (BCS):** A 1-9 scale where 4-5 is ideal. How to assess:
- Run your hands over the ribcage: you should feel each rib individually without pressing hard, but not see them
- From above, the dog should have a visible waist behind the ribs
- From the side, there should be a slight abdominal tuck

An overweight dog (BCS 6-7+) has ribs that require firm pressure to feel. The consequences are not cosmetic — obesity significantly increases the risk of arthritis, diabetes, cardiac disease, and cancer, and reduces average lifespan by 2+ years.

**Treat accounting:** Treats are calories. If you give significant treats, reduce the meal accordingly. A 25kg dog maintained at 1,250 kcal/day can only accommodate approximately 125 calories of treats (10% of daily intake) before the total exceeds requirement.`,
      },
      {
        title: "Life Stage Nutrition: Puppies, Adults, Seniors",
        summary: "How nutritional requirements change throughout a pet's life.",
        content: `**Puppies:**
Growth requires more protein, calcium, phosphorus, and total calories per unit body weight than adult maintenance. Large-breed puppies have specific requirements: too much calcium accelerates bone growth faster than structural integrity can support, contributing to orthopedic problems. Feed large-breed puppy food (with lower calcium/phosphorus ratios) rather than standard puppy food for dogs expected to exceed 55 lbs at maturity.

**Adult dogs:**
Maintenance nutrition from 12–18 months (18–24 months for giant breeds) until approximately 7 years. The primary enemy of adult nutrition is overfeeding — age-related metabolic slowdown means caloric needs decrease but feeding amounts often don't.

**Senior dogs:**
Current AAFCO doesn't define a "senior" life stage — "senior" on a bag is marketing, not a regulated designation. Senior nutritional needs depend on the individual dog's health status. Kidney disease requires phosphorus restriction. Cardiac disease may require sodium restriction. Weight management often requires reduced total calories and higher fiber. Work with your vet to adjust senior nutrition based on bloodwork and body condition rather than defaulting to any "senior" formula.

**Cats: obligate carnivores:**
Cats have specific essential nutrients (taurine, arachidonic acid, preformed vitamin A) that they cannot synthesize from precursors. These must come from animal tissue. Dogs can adapt to plant-derived precursors; cats cannot. Never feed a cat dog food as a primary diet.`,
      },
    ],
    clusterArticles: [
      { slug: "how-to-read-pet-food-labels", title: "How to Read Pet Food Labels", type: "guide" },
      { slug: "how-to-switch-dog-food-safely", title: "How to Switch Dog Food Safely", type: "how-to" },
      { slug: "best-pet-diet-nutrition-apps", title: "Best Pet Diet Tracking Apps", type: "article" },
    ],
    faqs: [
      { q: "Is raw food better than kibble for dogs?", a: "The evidence is mixed. Raw diets can provide excellent nutrition when properly formulated (the typical concern is nutritional imbalance in DIY raw diets). Commercial raw diets from reputable manufacturers that meet AAFCO feeding trial standards are a reasonable option. The primary concerns with raw: bacterial contamination (Salmonella, Listeria — significant risk for immunocompromised household members) and the higher cost. There is no strong scientific evidence that raw diets outperform complete, high-quality commercial kibble for typical pet health outcomes." },
      { q: "How do I know if my dog is at a healthy weight?", a: "Use body condition score rather than weight alone — breeds vary enormously in ideal weight range. The rib test is the most accessible home assessment: run flat hands along the ribcage. You should feel each individual rib without pressing hard, but you shouldn't see the ribs visually. If you can't feel ribs without significant pressure, the dog is overweight. If ribs are clearly visible, the dog is underweight." },
      { q: "How many times a day should I feed my dog?", a: "Twice daily for adult dogs is standard and preferable to once daily for most breeds — it maintains more stable blood glucose, reduces hunger-driven behavior issues, and for deep-chested breeds, may reduce bloat risk compared to one large meal. Puppies under 12 weeks need three meals daily. Senior dogs with certain metabolic conditions may need different schedules — follow your vet's guidance." },
    ],
    ctaFeature: "/vets",
    ctaText: "Get a Personalized Nutrition Assessment",
  },
];
