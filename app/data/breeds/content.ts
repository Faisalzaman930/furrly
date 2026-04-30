import type { BreedDoc } from "./types";

function scoreLabel(n: number | null, labels: [string, string, string]): string {
  if (n === null) return labels[1];
  if (n <= 2) return labels[0];
  if (n >= 4) return labels[2];
  return labels[1];
}

function pick<T>(n: number | null, low: T, mid: T, high: T): T {
  if (n === null) return mid;
  if (n <= 2) return low;
  if (n >= 4) return high;
  return mid;
}

export interface BreedContent {
  overview: string;
  temperament: string;
  careGrooming: string;
  healthLifespan: string;
  suitability: string;
  faqs: { q: string; a: string }[];
}

export function generateBreedContent(b: BreedDoc): BreedContent {
  const s = b.scores;
  const name = b.name;
  const group = b.group ?? "dog";
  const size = b.size ?? "medium-sized";
  const lifeSpan = b.lifeSpan ?? "10–14 years";
  const weight = b.weight ?? "varies";
  const height = b.height ?? "varies";
  const animalSingular = "dog";

  // ── Overview ─────────────────────────────────────────────────────────────
  const aptLabel = scoreLabel(s.apartmentFriendly, ["better suited to homes with space", "adaptable to most living situations", "well-suited to apartment living"]);
  const noviceLabel = scoreLabel(s.goodForNovice, ["best matched with experienced owners", "manageable for most owners", "an excellent choice for first-time dog owners"]);
  const overview = `The ${name} is a ${size.toLowerCase()} ${group.toLowerCase()} known for its ${scoreLabel(s.friendliness, ["independent", "balanced", "outgoing"])} nature and ${scoreLabel(s.intelligence, ["straightforward", "capable", "highly intelligent"])} mind. ${aptLabel.charAt(0).toUpperCase() + aptLabel.slice(1)}, the ${name} is ${noviceLabel}. Typically standing ${height} and weighing ${weight}, this breed has a life expectancy of ${lifeSpan}, making it a ${b.lifeSpanYears && b.lifeSpanYears >= 13 ? "long-lived companion" : "devoted companion"} for the right family.

Originally classified within the ${group} group, the ${name} brings a distinct combination of traits that sets it apart. ${pick(s.energy, `On the calmer end of the energy spectrum, the ${name} is content with moderate daily activity.`, `The ${name} has a moderate energy level that suits an active household without being overwhelming.`, `The ${name} is a high-energy breed that thrives with plenty of daily exercise and mental stimulation.`)} ${pick(s.affectionate, `While not the most demonstrative breed, the ${name} forms loyal bonds with its family.`, `Affectionate with its family, the ${name} strikes a healthy balance between independence and closeness.`, `Deeply affectionate, the ${name} loves being close to its people and forms strong bonds with every member of the household.`)}`;

  // ── Temperament ───────────────────────────────────────────────────────────
  const kidLine = pick(s.kidFriendly,
    `Around children, the ${name} can be reserved and does best in households with older, calmer kids.`,
    `The ${name} generally gets along well with children, especially when socialised from puppyhood.`,
    `The ${name} is famously gentle and patient with children of all ages, making it a wonderful family ${animalSingular}.`
  );
  const dogLine = pick(s.dogFriendly,
    `With other dogs the ${name} can be selective, and careful introductions are recommended.`,
    `The ${name} is generally sociable with other dogs, particularly when introduced properly.`,
    `The ${name} tends to love the company of other dogs and typically does well in multi-pet households.`
  );
  const strangerLine = pick(s.strangerFriendly,
    `Around strangers, the ${name} is naturally reserved and can make an effective watchdog.`,
    `The ${name} warms up to strangers at a steady pace and is neither overly suspicious nor blindly trusting.`,
    `Friendly and open with new people, the ${name} rarely meets a stranger it doesn't like.`
  );
  const barkLine = pick(s.barkiness,
    `This breed tends to be quiet and won't alert you to every passing noise.`,
    `The ${name} barks at a moderate level — enough to alert you, not enough to disturb the neighbours.`,
    `The ${name} can be vocal and will readily alert you to visitors or unusual activity.`
  );
  const temperament = `${pick(s.friendliness, `The ${name} has an independent, self-sufficient character`, `The ${name} is an even-tempered, well-balanced breed`, `The ${name} has a famously warm and sociable temperament`)} that makes it ${pick(s.sensitivity, "a resilient, unfussy companion", "responsive to its environment without being overly sensitive", "highly attuned to its family's emotions and moods")}. ${kidLine} ${dogLine}

${strangerLine} ${barkLine} ${pick(s.wanderlust, "This breed has a low wanderlust potential and is unlikely to roam.", "The " + name + " has moderate wanderlust — a secure garden is always recommended.", "The " + name + " has a strong urge to explore, so a well-fenced yard and reliable recall training are essential.")} ${pick(s.preyDrive, "Prey drive is low, making off-lead exercise relatively safe in open areas.", "The " + name + " has a moderate prey drive — keep an eye on small animals nearby.", "A strong prey drive means the " + name + " should be kept on a lead around wildlife and small pets.")}`;

  // ── Care & Grooming ───────────────────────────────────────────────────────
  const shed = pick(s.shedding, "minimal shedder", "moderate shedder", "heavy shedder");
  const groomLine = pick(s.easyToGroom,
    `Grooming the ${name} requires commitment — regular brushing, professional trims, and attention to coat maintenance are part of ownership.`,
    `Grooming is straightforward with regular brushing and occasional professional grooming to keep the coat in good condition.`,
    `The ${name} is low-maintenance in the grooming department — a quick brush a few times a week is usually sufficient.`
  );
  const droolLine = pick(s.drooling, "drools very little", "drools occasionally", "can drool quite a bit, so keep a towel handy");
  const exerciseLine = pick(s.exerciseNeeds,
    `Exercise needs are modest — a couple of short walks per day and some indoor play will keep a ${name} happy and healthy.`,
    `Plan for at least 45–60 minutes of exercise daily. The ${name} enjoys walks, fetch, and interactive play sessions.`,
    `The ${name} needs vigorous daily exercise — at least 1–2 hours of activity to stay physically and mentally balanced. Without enough stimulation, this breed can become destructive.`
  );
  const trainLine = pick(s.easyToTrain,
    `Training requires patience and consistency. The ${name} responds best to positive reinforcement and short, engaging sessions.`,
    `The ${name} is moderately easy to train and responds well to clear, reward-based methods.`,
    `The ${name} is highly trainable and picks up new commands quickly, making it a joy to work with.`
  );
  const careGrooming = `The ${name} is a ${shed}, which ${pick(s.shedding, "means very little vacuuming — great for allergy-sensitive households", "means regular hoovering is part of life with this breed", "means significant coat management both on the dog and around your home")}. ${groomLine} The ${name} ${droolLine}.

${exerciseLine} ${pick(s.playfulness, "Playtime is lower on the priority list for this breed, though enrichment toys and puzzle feeders are always welcomed.", "Interactive games and toys are a great supplement to daily walks and help keep the " + name + " mentally sharp.", "Highly playful and energetic, the " + name + " loves interactive games, agility, and any activity that challenges both body and mind.")}

${trainLine} ${pick(s.intelligence, "While not the quickest learner, the " + name + " is steady and reliable once trained.", "Smart and attentive, the " + name + " benefits from varied training to prevent boredom.", "Exceptionally intelligent, the " + name + " excels at obedience, agility, and advanced trick training — and needs the mental challenge.")} ${pick(s.mouthiness, "Mouthiness is not a major trait in this breed.", "Like many breeds, puppies go through a mouthy phase that fades with consistent bite-inhibition training.", "This breed can be mouthy — early bite-inhibition training and providing plenty of chew toys is strongly recommended.")}`;

  // ── Health & Lifespan ─────────────────────────────────────────────────────
  const healthLine = pick(s.health,
    `The ${name} can be prone to certain hereditary conditions. Responsible breeders will health-test their dogs — always ask for documented clearances.`,
    `Overall a hardy breed, the ${name} benefits from routine vet check-ups and preventive care.`,
    `The ${name} is considered a robust, healthy breed with fewer inherited conditions than many pedigrees.`
  );
  const weightLine = pick(s.weightGain,
    `Weight gain is not a major concern for most ${name}s, though a balanced diet and regular exercise are always important.`,
    `The ${name} has a moderate tendency to gain weight — monitor portion sizes and avoid too many treats.`,
    `The ${name} can be prone to weight gain. Measure meals carefully, limit treats, and ensure adequate daily exercise to keep them at a healthy weight.`
  );
  const healthLifespan = `With a life expectancy of ${lifeSpan}, the ${name} is a ${b.lifeSpanYears && b.lifeSpanYears >= 13 ? "long-lived breed — a serious commitment" : "medium-lived breed"}. ${healthLine}

Common health areas to discuss with your vet for ${group.toLowerCase()} breeds like the ${name} include joint health, dental hygiene, and routine parasite prevention. ${weightLine} Pet insurance is strongly recommended from puppyhood — it provides peace of mind and helps manage unexpected veterinary costs throughout your ${name}'s life.`;

  // ── Suitability ──────────────────────────────────────────────────────────
  const suitability = `The ${name} is ${pick(s.goodForNovice, "best suited to experienced dog owners", "a good fit for a wide range of owners", "one of the most approachable breeds for first-time owners")} who can provide ${pick(s.exerciseNeeds, "a calm, low-activity lifestyle", "regular daily exercise and mental engagement", "an active lifestyle with plenty of outdoor time")}. ${pick(s.apartmentFriendly, "A home with outdoor space is strongly preferred.", "This breed can adapt to apartment life provided exercise needs are met.", "Compact living spaces are no problem for this breed.")}

${pick(s.toleratesAlone, "The " + name + " handles alone time well and is less likely to develop separation anxiety.", "Like most dogs, the " + name + " is happiest when not left alone for extended periods.", "The " + name + " does not cope well with long periods alone and can develop separation anxiety — this breed thrives in homes where someone is present most of the day.")} ${pick(s.toleratesCold, "Cold climates suit this breed well.", "The " + name + " manages moderate climates comfortably.", "This breed prefers warmer climates and should be protected from extreme cold.")} ${pick(s.toleratesHot, "Hot weather should be approached with caution — ensure shade, water, and avoid exercise in peak heat.", "The " + name + " handles warm weather reasonably well with standard precautions.", "The " + name + " tolerates heat well, though fresh water and shade should always be available.")}

In summary, the ${name} is a ${pick(s.friendliness, "loyal and independent", "versatile and well-rounded", "sociable and loving")} ${group.toLowerCase()} that ${pick(s.trainability, "rewards patient, experienced owners", "fits well into a variety of households", "is relatively easy to integrate into family life")}. Do thorough research, meet the breed in person if possible, and connect with a reputable breeder or rescue before bringing a ${name} home.`;

  // ── FAQs ─────────────────────────────────────────────────────────────────
  const faqs: { q: string; a: string }[] = [
    {
      q: `Is the ${name} good with kids?`,
      a: pick(s.kidFriendly,
        `The ${name} can be good with older, calmer children but may not be the best fit for homes with very young kids. Early socialisation and supervised interactions are key.`,
        `Yes, the ${name} generally gets on well with children. As with any breed, supervised interactions and early socialisation produce the best results.`,
        `The ${name} is known for being patient and gentle with children of all ages, making it a popular family choice.`
      ),
    },
    {
      q: `How much exercise does a ${name} need?`,
      a: pick(s.exerciseNeeds,
        `The ${name} has modest exercise needs. Two short walks a day and some indoor play are typically sufficient to keep this breed healthy and content.`,
        `A ${name} needs around 45–60 minutes of exercise daily. A mix of walks, off-lead play, and mental stimulation keeps them balanced and well-behaved.`,
        `The ${name} is a high-energy breed that needs at least 1–2 hours of vigorous exercise every day. Activities like fetch, hiking, and agility are ideal.`
      ),
    },
    {
      q: `Does the ${name} shed a lot?`,
      a: pick(s.shedding,
        `No — the ${name} is a minimal shedder, making it a popular option for households concerned about allergies or keeping the home clean.`,
        `The ${name} sheds a moderate amount. Regular brushing a few times per week helps manage loose fur.`,
        `Yes, the ${name} is a heavy shedder. Daily brushing, regular vacuuming, and seasonal grooming appointments are part of owning this breed.`
      ),
    },
    {
      q: `Is the ${name} easy to train?`,
      a: pick(s.easyToTrain,
        `Training a ${name} requires patience and experience. This breed responds best to consistent positive reinforcement and short, engaging sessions.`,
        `The ${name} is moderately easy to train. Positive reinforcement, consistency, and early socialisation produce a well-mannered dog.`,
        `Yes — the ${name} is highly trainable and eager to please. It picks up commands quickly and thrives with regular training sessions and mental challenges.`
      ),
    },
    {
      q: `How big does a ${name} get?`,
      a: `A ${name} typically stands ${height ?? "varies"} and weighs ${weight ?? "varies"}. They are classified as ${size?.toLowerCase() ?? "medium-sized"}.`,
    },
    {
      q: `What is the ${name}'s life expectancy?`,
      a: `The ${name} has a typical life expectancy of ${lifeSpan}. Regular veterinary care, a balanced diet, and adequate exercise all contribute to a long, healthy life.`,
    },
    {
      q: `Is the ${name} good for first-time owners?`,
      a: pick(s.goodForNovice,
        `The ${name} is better suited to owners with prior dog experience. Its independent nature and training requirements benefit from a confident, consistent handler.`,
        `With the right research and commitment, the ${name} can be a rewarding choice for first-time owners. Puppy classes and consistent routines make a big difference.`,
        `Yes — the ${name} is widely regarded as one of the better breeds for first-time owners thanks to its adaptable temperament and trainability.`
      ),
    },
    {
      q: `Does the ${name} bark a lot?`,
      a: pick(s.barkiness,
        `The ${name} is a relatively quiet breed and won't alert bark excessively — a plus for apartment living or noise-sensitive households.`,
        `The ${name} barks at a moderate level. It will alert you to visitors but isn't known for excessive vocalisation.`,
        `The ${name} can be a vocal breed. Training a "quiet" cue early and providing adequate mental stimulation helps manage excessive barking.`
      ),
    },
  ];

  return { overview, temperament, careGrooming, healthLifespan, suitability, faqs };
}
