import type { BreedDoc, CatBreedDoc } from "./types";

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

export function generateCatContent(b: CatBreedDoc): BreedContent {
  const s = b.scores;
  const name = b.name;
  const origin = b.origin ?? "unknown origin";
  const lifeSpan = b.lifeSpan ?? "12–16 years";
  const weight = b.weight ?? "varies";

  // ── Overview ──────────────────────────────────────────────────────────────
  const overview = `The ${name} is a ${scoreLabel(s.adaptability, ["somewhat selective", "adaptable", "highly versatile"])} cat of ${origin} origin, prized for its ${scoreLabel(s.affectionLevel, ["independent", "affectionate", "deeply loving"])} nature and ${scoreLabel(s.intelligence, ["calm", "capable", "keen and intelligent"])} personality. Weighing ${weight} with a typical life expectancy of ${lifeSpan}, this breed makes a ${scoreLabel(s.affectionLevel, ["loyal companion for those who appreciate independence", "wonderful companion for most households", "devoted companion that thrives on human connection"])}.
${pick(s.energyLevel, `On the quieter end of the energy spectrum, the ${name} enjoys a relaxed lifestyle and is happy to spend much of the day lounging.`, `The ${name} has a moderate energy level — active enough to play but equally happy to settle beside you.`, `The ${name} is a high-energy cat that loves to climb, chase, and explore. Plenty of enrichment and interactive play are essential.`)} ${pick(s.socialNeeds, `This breed is relatively self-sufficient and handles quiet households well.`, `The ${name} enjoys companionship but isn't overly demanding of attention.`, `Highly social by nature, the ${name} craves company and does best in homes where someone is around for much of the day.`)}`;

  // ── Temperament ──────────────────────────────────────────────────────────
  const childLine = pick(s.childFriendly,
    `Around children, the ${name} can be reserved and suits calmer households or families with older children.`,
    `The ${name} generally gets along well with children, especially when introduced calmly and given space to retreat.`,
    `The ${name} is known for its gentle patience with children of all ages, making it a wonderful family cat.`
  );
  const dogLine = pick(s.dogFriendly,
    `With dogs, the ${name} can be cautious and prefers a cat-only or carefully managed multi-pet household.`,
    `The ${name} can coexist with dogs when introductions are handled slowly and patiently.`,
    `The ${name} is dog-friendly and typically adapts well to multi-pet homes.`
  );
  const strangerLine = pick(s.strangerFriendly,
    `Around strangers, the ${name} is naturally reserved and may take time to warm up to new people.`,
    `The ${name} is generally friendly with new people, warming up steadily without being overly shy or clingy.`,
    `Sociable and confident, the ${name} tends to greet new people with curiosity rather than caution.`
  );
  const vocLine = pick(s.vocalisation,
    `This breed is on the quieter side, communicating more through body language than vocalisation.`,
    `The ${name} is moderately vocal — it will let you know when it wants attention, without being overly demanding.`,
    `The ${name} can be quite vocal and enjoys a good conversation with its owners.`
  );
  const temperament = `${pick(s.affectionLevel, `The ${name} has an independent, self-reliant character`, `The ${name} is an even-tempered, well-balanced cat`, `The ${name} is famously affectionate and people-oriented`)} with a ${scoreLabel(s.intelligence, ["steady", "capable", "sharp and curious"])} mind. ${childLine} ${dogLine}

${strangerLine} ${vocLine} ${pick(s.socialNeeds, "This breed handles solitude better than most and suits busy or single-person households.", "The " + name + " enjoys company but copes reasonably well when left alone for moderate periods.", "The " + name + " thrives on interaction and should not be left alone for long stretches without stimulation or a feline companion.")}`;

  // ── Care & Grooming ──────────────────────────────────────────────────────
  const groomLine = pick(s.grooming,
    `The ${name} is low-maintenance in the grooming department — a weekly brush is usually sufficient to keep the coat healthy.`,
    `Moderate grooming is needed: brush a few times per week and schedule occasional professional sessions.`,
    `The ${name} requires significant grooming commitment — daily brushing and regular professional grooming keep the coat free of mats and tangles.`
  );
  const shedLine = pick(s.sheddingLevel, "minimal shedder", "moderate shedder", "heavy shedder");
  const hypoNote = b.hypoallergenic
    ? `The ${name} is considered hypoallergenic — it produces less of the Fel d 1 protein than most breeds, making it a popular choice for allergy-sensitive households. No cat is 100% allergen-free, so spending time with the breed before adopting is always advised.`
    : `The ${name} is not considered hypoallergenic. Regular grooming and vacuuming help manage allergen levels in the home.`;
  const careGrooming = `The ${name} is a ${shedLine}. ${groomLine} ${hypoNote}

${pick(s.energyLevel, `Exercise needs are modest — a few short play sessions per day and access to a window perch or cat tree will keep the ${name} content.`, `Plan for at least two interactive play sessions daily. Wand toys, puzzle feeders, and climbing structures keep the ${name} physically and mentally engaged.`, `The ${name} needs abundant daily stimulation — vertical space, interactive toys, and regular active play are non-negotiable to prevent boredom and destructive behaviour.`)}

${pick(s.intelligence, "The " + name + " is content with simple enrichment — a comfortable bed and quiet routine suit this breed well.", "Intelligent and curious, the " + name + " enjoys puzzle feeders and rotating toys to stay mentally sharp.", "Exceptionally clever, the " + name + " thrives with clicker training, complex puzzle toys, and new challenges — mental stimulation is just as important as physical exercise.")}`;

  // ── Health & Lifespan ────────────────────────────────────────────────────
  const healthLine = pick(s.healthIssues,
    `The ${name} is considered a robust breed with fewer inherited health concerns than many pedigrees.`,
    `Overall a healthy breed, the ${name} benefits from routine vet check-ups and preventive care.`,
    `The ${name} can be prone to certain hereditary conditions. Ask breeders for documented health screenings and maintain regular vet visits.`
  );
  const indoorNote = b.indoor
    ? `Keeping the ${name} indoors significantly extends its life expectancy and protects it from outdoor hazards.`
    : `Whether kept indoors or allowed supervised outdoor access, the ${name} benefits from a stimulating, safe environment.`;
  const healthLifespan = `With a typical life expectancy of ${lifeSpan}, the ${name} is a long-term commitment. ${healthLine}

Routine health care — including annual vet visits, dental hygiene, parasite prevention, and appropriate vaccination — is essential for all cats. ${indoorNote} Pet insurance from kittenhood provides peace of mind and helps manage unexpected veterinary costs throughout your ${name}'s life.`;

  // ── Suitability ──────────────────────────────────────────────────────────
  const suitability = `The ${name} suits ${pick(s.adaptability, "owners who can provide a calm, consistent routine", "a wide range of households and lifestyles", "almost any living situation — apartments and houses alike")}. ${pick(s.socialNeeds, "Those who work long hours and prefer a more independent cat will find the " + name + " a comfortable match.", "This breed fits well in families, couples, and single-person households provided social needs are met.", "This is a breed for people who want an active, engaged companion — not a cat that's happy to be ignored.")}

${pick(s.childFriendly, "Households with very young children may want to consider a more tolerant breed.", "Families with children will find the " + name + " a pleasant housemate with proper introductions.", "The " + name + " is an excellent choice for families with children, known for its patience and playful spirit.")} ${pick(s.dogFriendly, "A cat-only household or careful managed introductions with dogs are recommended.", "With patience, the " + name + " can share a home with a dog.", "Dog owners will find the " + name + " one of the easier cats to integrate into a multi-pet home.")}

In summary, the ${name} is a ${pick(s.affectionLevel, "loyal and self-sufficient", "well-rounded and affectionate", "deeply loving and people-centred")} breed that ${pick(s.adaptability, "rewards patient, attentive owners", "fits comfortably into most households", "is relatively easy to integrate into daily life")}. Research breeders carefully or explore breed-specific rescues before bringing a ${name} home.`;

  // ── FAQs ─────────────────────────────────────────────────────────────────
  const faqs: { q: string; a: string }[] = [
    {
      q: `Is the ${name} good with children?`,
      a: pick(s.childFriendly,
        `The ${name} can be reserved around young children and suits calmer households. Supervised, gentle introductions are essential.`,
        `Yes — the ${name} generally gets along well with children. Calm introductions and giving the cat a safe retreat space produce the best results.`,
        `The ${name} is known for being patient and gentle with children of all ages, making it a great family cat.`
      ),
    },
    {
      q: `Is the ${name} hypoallergenic?`,
      a: b.hypoallergenic
        ? `Yes, the ${name} is considered hypoallergenic — it produces less of the Fel d 1 allergen than most breeds. No cat is 100% allergen-free, so spending time with the breed before adopting is always recommended.`
        : `No, the ${name} is not considered hypoallergenic. Regular grooming and air filtration help manage allergen levels.`,
    },
    {
      q: `How much grooming does the ${name} need?`,
      a: pick(s.grooming,
        `The ${name} is low-maintenance — a brush once a week is usually sufficient.`,
        `The ${name} needs moderate grooming: brush a few times per week to prevent tangles and reduce shedding.`,
        `The ${name} requires significant grooming. Daily brushing and regular professional grooming appointments are recommended.`
      ),
    },
    {
      q: `How vocal is the ${name}?`,
      a: pick(s.vocalisation,
        `The ${name} is a relatively quiet breed, communicating mostly through body language.`,
        `The ${name} is moderately vocal — it will let you know when it needs something without being excessively noisy.`,
        `The ${name} is a chatty breed that enjoys "talking" to its owners. Expect regular vocal check-ins throughout the day.`
      ),
    },
    {
      q: `Is the ${name} good with dogs?`,
      a: pick(s.dogFriendly,
        `The ${name} generally prefers a cat-only household or very carefully managed introductions with dogs.`,
        `With slow, patient introductions the ${name} can coexist comfortably with dogs.`,
        `The ${name} is typically dog-friendly and adapts well to multi-pet households.`
      ),
    },
    {
      q: `What is the ${name}'s life expectancy?`,
      a: `The ${name} typically lives ${lifeSpan}. Regular vet visits, a balanced diet, and keeping them in a safe environment all contribute to a long, healthy life.`,
    },
    {
      q: `Is the ${name} easy to care for?`,
      a: pick(s.adaptability,
        `The ${name} thrives with a consistent routine and a calm environment. It suits experienced cat owners who understand the breed's preferences.`,
        `The ${name} is relatively easy to care for and adapts well to different households with standard cat care.`,
        `Yes — the ${name} is one of the more adaptable breeds and suits a wide range of living situations and owner experience levels.`
      ),
    },
    {
      q: `Does the ${name} shed a lot?`,
      a: pick(s.sheddingLevel,
        `No — the ${name} is a minimal shedder. Great news for those concerned about cat hair on furniture.`,
        `The ${name} sheds moderately. Regular brushing a few times a week keeps loose fur under control.`,
        `Yes, the ${name} is a heavy shedder. Daily brushing and regular vacuuming are part of owning this breed.`
      ),
    },
  ];

  return { overview, temperament, careGrooming, healthLifespan, suitability, faqs };
}
