export interface SEOArticle {
  title: string;
  content: string; // HTML allowed
}

export interface FeatureSEOData {
  title: string;
  description: string;
  articles: SEOArticle[];
}

export const featureSEO: Record<string, FeatureSEOData> = {
  playdates: {
    title: "Expert Guides for Safe Pet Playdates",
    description: "Read our comprehensive, veterinary-approved guides on how to safely socialize your dog and maximize the benefits of pet playdates.",
    articles: [
      {
        title: "Puppy Socialization: The Critical Window (3 to 14 Weeks)",
        content: `
          <p class="mb-4">Puppies are most accepting of new experiences between <strong>3 and 14 weeks</strong> of age. Early socialization helps them become confident, well-adjusted adult dogs, severely reducing adult fear-based aggression and anxiety.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Go at Their Pace:</strong> Never force a puppy into a situation that scares them. Allow them to investigate new sights, sounds, and surfaces at their own speed.</li>
            <li><strong>Prioritize Positive Experiences:</strong> Keep interactions short and positive. Use high-value treats, praise, and toys to reward brave behavior and calm curiosity.</li>
            <li><strong>Health and Safety First:</strong> Until your veterinarian confirms they are fully immunized, <em>strictly avoid</em> high-traffic areas like dog parks or pet store floors. Instead, socialize them with friends' vaccinated, healthy, and calm pets in controlled environments like private backyards.</li>
          </ul>
        `
      },
      {
        title: "How to Host a Successful, Neutral-Ground Dog Playdate",
        content: `
          <p class="mb-4">Matching dogs based on temperament, size, and energy level is critical to prevent smaller or more timid dogs from being overwhelmed.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Select a Neutral Location:</strong> Meet in a neutral space (like a quiet park or a fenced area that is not "home turf" for either dog) to reduce territorial guarding behavior.</li>
            <li><strong>Manage Introductions:</strong> Start with a leashed, calm meet-and-greet off-territory. Keep leashes loose to avoid signaling tension (the "leash tension" naturally triggers anxiety). Allow them to sniff and observe each other at their own pace.</li>
            <li><strong>Provide Supplies but Hide High-Value Items:</strong> Bring plenty of water (multiple bowls are best), clean-up bags, and toys—but strictly avoid high-value toys or food-based puzzles that might trigger resource competition and fights.</li>
          </ul>
        `
      },
      {
        title: "Reading Dog Body Language: Play vs. Tension",
        content: `
          <p class="mb-4">Never leave dogs completely unattended. You must constantly watch for signs of overstimulation, such as excessive vocalization, stiff posturing, or one dog constantly pinning the other.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Positive Signs:</strong> Look for relaxed, sweeping wagging tails, "play bows" (front legs flat, rear in the air), bouncy movements, and role reversals (taking turns chasing each other).</li>
            <li><strong>Negative Signs:</strong> If a puppy seems fearful (tucked tail, pinned ears, lip licking, yawning), calmly move away from the situation. Do not coddle fearful behavior; instead, distract them with a toy or command to help them reset.</li>
            <li><strong>Intervention:</strong> If play gets too rough or stiff, interrupt it gently. Call the dogs away, have them take a water break, or walk them around on-leash to help them reset and calm down naturally.</li>
          </ul>
        `
      }
    ]
  },
  adoption: {
    title: "Essential Checklists & Guides for Adopting a Rescue Dog",
    description: "Preparing to bring a shelter dog into your home? Review our crucial checklists to ensure a smooth, permanent transition.",
    articles: [
      {
        title: "The '3-3-3 Rule' for Rescue Dogs",
        content: `
          <p class="mb-4">The 3-3-3 rule represents the standard phases of decompression a rescue dog goes through after leaving a shelter environment. Understanding this timeline is crucial to avoiding the heartbreak of early behavioral returns.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>The First 3 Days (Decompression):</strong> Your dog is overwhelmed. They may not eat, drink, or use the bathroom normally. They might hide under furniture or seem completely shut down. Do not force interaction. Establish a quiet "safe zone" (like an open crate) and let them exist.</li>
            <li><strong>The First 3 Weeks (Learning the Routine):</strong> Your dog begins to figure out your schedule and starts realizing this might be their permanent home. You will begin to see their true personality emerge, but this is also when behavioral issues (like counter-surfing or leash pulling) will surface as they test boundaries.</li>
            <li><strong>The First 3 Months (Complete Integration):</strong> The dog finally feels completely secure and bonded. The routine is set, and they recognize you as their safe harbor. Deep behavioral training can now take maximum effect.</li>
          </ul>
        `
      },
      {
        title: "The Ultimate First 24-Hours Adoption Checklist",
        content: `
          <p class="mb-4">The first 24 hours determine the baseline stress levels for the rest of your integration period. Be prepared before you bring them through the front door.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>The New Dog Shopping List:</strong> Have everything ready <em>before</em> pickup. You need: An appropriately sized crate, a secure martingale collar, a 6-foot standard leash (no retractables), ID tags, age-appropriate high-quality food, stainless steel bowls, and heavy-duty enzyme cleaners for inevitable accidents.</li>
            <li><strong>The Walk Before Entry:</strong> Do not just walk them straight into your living room. Take them for a 20-30 minute walk around the neighborhood and let them sniff heavily. This burns off shelter adrenaline and establishes a calm baseline.</li>
            <li><strong>Set Up a Safe Space:</strong> Create a dedicated, calm area (e.g., covered crate in a quiet corner of the bedroom or living room) for a new dog to decompress. Do not force them out if they choose to retreat here.</li>
          </ul>
        `
      },
      {
        title: "Dog-Proofing Your Home: Avoiding Triage",
        content: `
          <p class="mb-4">Shelter dogs are explorers. If a hazard exists, they will find it. A room-by-room guide to eliminating hazards:</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>The Kitchen & Bathrooms:</strong> Install child-proof latches on lower cabinets masking chemical cleaners. Ensure trash cans have locking lids. </li>
            <li><strong>The Living Room:</strong> Hide or bind loose electrical cords. Remove small, easily swallowed items (kid toys, remote controls, socks). </li>
            <li><strong>Toxic Plants:</strong> Identify every houseplant. Common hazards like Lilies, Philodendrons, and Sago Palms must be completely removed from the house, as ingestion can be rapidly fatal.</li>
          </ul>
        `
      }
    ]
  },
  fostering: {
    title: "Resources for Rescue Networks and Foster Parents",
    description: "Fostering saves millions of lives, but the logistics can be overwhelming. Learn how to manage the chaos effectively.",
    articles: [
      {
        title: "Introducing a Rescue Foster to Resident Pets",
        content: `
          <p class="mb-4">The absolute fastest way to ruin a foster experience is rushing the introduction to your personal pets. High stress environments trigger severe resource guarding.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>The 'Two Door' Policy:</strong> For the first 48 hours, the foster should not even see your resident pet. Keep them isolated in a separate room (like a guest bedroom). Exchange blankets and toys between the two rooms so they can smell each other without visual tracking.</li>
            <li><strong>The Parallel Walk:</strong> Have a friend or partner help you walk both dogs simultaneously, starting on opposite sides of the street. Gradually close the distance over 20 minutes if both dogs remain relaxed and focused on sniffing parallel lines, rather than staring at each other.</li>
            <li><strong>Removing All High-Value Controllers:</strong> Before they meet inside the house, pick up every single toy, bone, antler, and food bowl. Nothing should exist on the floor that they can fight over.</li>
          </ul>
        `
      },
      {
        title: "Managing Foster Supply Logistics",
        content: `
          <p class="mb-4">Fosters frequently burn out not because of the dogs, but because of the organizational chaos (coordinating vet drop-offs, picking up kibble across town, losing track of paperwork).</p>
          <p class="mb-4">Furrly attempts to solve this natively using our network routing logic, but fundamentally, you must maintain an analog or digital "Go-Bag" for every foster containing their microchip number, explicitly requested intake medication, and rescue-coordinator contact numbers. Never assume the rescue organization has perfectly centralized data; they are overwhelmed volunteers.</p>
        `
      }
    ]
  },
  vets: {
    title: "Veterinary Telehealth & Emergency Guides",
    description: "Not sure if it's an emergency? Read our veterinary-approved triage guides to know when to seek immediate medical attention.",
    articles: [
      {
        title: "Triage Basics: When is it Actually an Emergency?",
        content: `
          <p class="mb-4">Avoid the $800 midnight ER bill if you can, but never delay life-saving treatment for critical issues. Here is the baseline criteria for an immediate, non-negotiable ER trip:</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Breathing Difficulty:</strong> If your pet is open-mouth breathing (especially cats), has pale/blue gums, or is using their abdominal muscles heavily to breathe, this is a code-red cardiac or respiratory crisis.</li>
            <li><strong>Unproductive Retching:</strong> If a deep-chested dog is pacing, drooling, and trying to vomit but nothing is coming up, their abdomen may be swelling. This is GDV (Bloat) and is fatal within hours without surgical intervention.</li>
            <li><strong>Toxin Ingestion:</strong> Known ingestion of antifreeze, rat poison, grapes/raisins, xylitol (sugar-free gum), or large amounts of chocolate. Time is of the essence for inducing vomiting safely.</li>
            <li><strong>Paralysis or Extreme Lethargy:</strong> Sudden inability to use the hind legs (spinal issues) or a cat suddenly dragging their back legs (blood clots).</li>
          </ul>
        `
      },
      {
        title: "What to Prepare Before You Initiate a Telehealth Call",
        content: `
          <p class="mb-4">A virtual vet cannot physically touch your animal, so the data you provide them determines the effectiveness of the call. Optimize your triage speed by having these ready:</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Baseline Vit量ls (if you know how):</strong> Heart rate, breathing rate (breaths per minute while resting), and gum color (should be bubblegum pink, pressing on it should return color in under 2 seconds).</li>
            <li><strong>Exact Timelines:</strong> Don't just say "he vomited." The vet needs to know: "He vomited yellow bile 3 times starting at 2 PM, and had normal stool this morning."</li>
            <li><strong>Current Medications:</strong> A literal list of everything your pet takes, including over-the-counter supplements and tick preventative brands.</li>
          </ul>
        `
      }
    ]
  },
  lostfound: {
    title: "Actionable Guides for Recovering a Lost Pet",
    description: "Every second counts. Read our rapid-response guides for recovering missing dogs and cats using neighborhood networks.",
    articles: [
      {
        title: "The First 60 Minutes: What to Do When Your Pet Goes Missing",
        content: `
          <p class="mb-4">Panic wastes time. Here is the critical, systematic approach you must trigger the moment you realize your dog or cat has escaped.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Minute 1-10 (The Immediate Perimeter):</strong> Do not run frantically yelling their name, which can spook a frightened animal. Grab high-value, powerfully smelling treats (like hot dogs or cheese) and calmly walk the immediate perimeter. For dogs, check your literal neighbors' front yards. For cats, look immediately UP in nearby trees or under directly adjacent porches (cats rarely run far; they hide).</li>
            <li><strong>Minute 10-30 (The Digital Amber Alert):</strong> Trigger a Furrly Amber Alert to push notifications to locals in a 5-mile radius. Post clear, un-filtered photos to local Facebook Community boards and Nextdoor. Include cross-streets, collar descriptions, and whether the animal is skittish.</li>
            <li><strong>Minute 30-60 (Targeted Scent Stations):</strong> Take heavily soiled articles of your clothing (like a laundry basket shirt) and the pet's bed, and place them on your front porch and the exact point they escaped from. Animals navigate via scent, and this acts as a beacon if they get turned around.</li>
          </ul>
        `
      },
      {
        title: "Understanding Microchips vs. GPS Collars",
        content: `
          <p class="mb-4">The single biggest misconception pet owners have is assuming a microchip acts like a GPS tracker. It does not.</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Microchips (RFID):</strong> A microchip emits zero signal on its own. It is an entirely passive RFID tag. If a dog is lost, someone must physically capture the dog, put it in their car, drive to a shelter or vet, and scan it with a wand. <strong>Crucially:</strong> If you did not register your chip number in a national database with your current phone number, the chip is useless.</li>
            <li><strong>GPS Collars:</strong> These use cell towers or Bluetooth mesh networks (like AirTags) to actively ping the collar's location to your app. However, they are entirely dependent on battery life and cellular reception. They are fantastic for immediate recovery, but if the collar falls off, you lose the dog. Both layers of defense are required.</li>
          </ul>
        `
      }
    ]
  }
};
