export interface TemplateSection {
  title: string;
  items: string[];
}

export interface TemplateDoc {
  slug: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  seoDescription: string;
  icon: string;
  tier: 1 | 2 | 3;
  category: string;
  targetKeywords: string[];
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  /** One-sentence answer shown in the hero */
  quickAnswer: string;
  intro: string;
  whenYouNeedIt: string[];
  whatToInclude: TemplateSection[];
  stateNotes: string;
  templateText: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  downloadFormats: string[];
}

export const templateDocs: TemplateDoc[] = [
  // ─── TIER 1 ────────────────────────────────────────────────────────────────

  {
    slug: "pet-custody-agreement-template",
    title: "Pet Custody Agreement Template (Free, Editable)",
    seoTitle: "Pet Custody Agreement Template — Free Download 2026",
    shortTitle: "Pet Custody Agreement",
    seoDescription: "Free pet custody agreement template for separating couples, roommates, or co-owners. Covers visitation schedules, vet decision rights, expenses, and what happens if one party can't care for the pet.",
    icon: "⚖️",
    tier: 1,
    category: "Legal & Ownership",
    targetKeywords: ["pet custody agreement template", "free pet custody agreement template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "7 Min Read",
    quickAnswer: "A pet custody agreement is a written contract between two people who share ownership of a pet, covering who the pet lives with, visitation rights, who pays vet bills, and how disputes are resolved.",
    intro: `When couples separate, roommates part ways, or co-owners disagree about a pet's living arrangements, a written pet custody agreement prevents confusion, conflict, and expensive legal disputes. While pets are legally classified as personal property in most U.S. states, courts increasingly recognise the emotional bonds involved — and a signed agreement gives both parties clear, enforceable terms without going to court.

This free template covers every clause a complete pet custody agreement should include. It's written in plain language that non-lawyers can actually read and understand. Download it, fill in the highlighted fields, and both parties sign. For complex disputes involving significant assets or prior conflict, consult a family law attorney who handles pet custody — it's an increasingly specialised area.`,
    whenYouNeedIt: [
      "Separating couples who jointly own a pet",
      "Roommates who adopted a pet together and are moving apart",
      "Two households sharing care of a pet long-term (e.g., family members)",
      "Anyone who wants a written record of agreed-upon pet arrangements before a dispute arises",
    ],
    whatToInclude: [
      {
        title: "Pet identification",
        items: ["Name, species, breed, colour, date of birth", "Microchip number and registration details", "Current licence tag number", "Description of any distinguishing markings"],
      },
      {
        title: "Primary residence",
        items: ["Which party the pet lives with as their primary home", "Address of the primary residence", "What triggers a change in primary residence (e.g., relocation)"],
      },
      {
        title: "Visitation / parenting time schedule",
        items: ["Regular schedule (e.g., every other weekend, alternating weeks)", "Holiday schedule (Christmas, Thanksgiving, etc.)", "Notice required to request additional time", "Pickup and drop-off logistics"],
      },
      {
        title: "Veterinary care",
        items: ["Who is the primary decision-maker for routine care", "How emergency decisions are made when both parties must agree", "Which vet the pet sees (and who must be notified of changes)", "Who holds the medical records"],
      },
      {
        title: "Financial responsibilities",
        items: ["How routine vet costs are split", "How emergency vet costs are split", "Who pays for food, grooming, boarding", "What happens if one party cannot pay their share"],
      },
      {
        title: "Dispute resolution",
        items: ["Process for resolving disagreements (mediation before litigation)", "Governing state law", "What happens if a party relocates out of state"],
      },
    ],
    stateNotes: `**California:** Courts may award sole or joint custody based on the pet's best interest (AB 2274, effective 2019). A signed agreement is strong evidence of both parties' original intentions.\n\n**New York:** Pets remain personal property legally, but courts have discretion. Written agreements are enforceable as contracts.\n\n**All states:** This template is a civil contract, not a court order. For court-ordered custody (e.g., as part of a divorce decree), a family law attorney must file the agreement with the court.`,
    templateText: `PET CUSTODY AGREEMENT

This Pet Custody Agreement ("Agreement") is entered into as of [DATE] by and between:

Party A: [FULL LEGAL NAME], residing at [ADDRESS] ("Party A")
Party B: [FULL LEGAL NAME], residing at [ADDRESS] ("Party B")

collectively referred to as the "Parties."

1. PET IDENTIFICATION
The Parties are the co-owners of the following pet:
  Name: [PET NAME]
  Species / Breed: [SPECIES / BREED]
  Date of Birth (approx.): [DOB]
  Colour / Markings: [DESCRIPTION]
  Microchip Number: [MICROCHIP NUMBER]
  Licence Tag Number: [TAG NUMBER]

2. PRIMARY RESIDENCE
[PET NAME] shall reside primarily with [PARTY A / PARTY B] at the address listed above.
The non-primary party shall have the access and visitation rights described in Section 3.

3. VISITATION SCHEDULE
Regular Schedule: [PET NAME] shall spend time with [PARTY B / PARTY A] as follows:
  [e.g., Every other weekend, Friday 6pm to Sunday 6pm]
  [e.g., Every Wednesday overnight]

Holiday Schedule:
  [e.g., Christmas Eve with Party A; Christmas Day with Party B, alternating annually]
  [e.g., Thanksgiving with Party B in even years, Party A in odd years]

Pick-up and Drop-off: The non-primary party shall [pick up / receive delivery of] [PET NAME] at [LOCATION]. Travel costs are the responsibility of [SPECIFY].

Notice: Either party wishing to modify the schedule must provide [NUMBER] days' written notice.

4. VETERINARY CARE
Primary Veterinarian: [VET CLINIC NAME, ADDRESS, PHONE]

Routine Care: Decisions about routine veterinary care (vaccinations, check-ups, non-emergency procedures) shall be made by [PARTY A / PARTY B / jointly].

Emergency Care: In a medical emergency, the party currently in possession of [PET NAME] is authorised to seek emergency veterinary care immediately and shall notify the other party as soon as reasonably possible.

Major Procedures (estimated cost over $[AMOUNT]): Both Parties must agree in writing before proceeding, except in life-threatening emergencies.

Medical Records: Shall be held by [PARTY A / PARTY B] and made available to both parties upon request within [NUMBER] days.

5. FINANCIAL RESPONSIBILITIES
Routine veterinary costs: [SPLIT %] Party A / [SPLIT %] Party B
Emergency veterinary costs: [SPLIT %] Party A / [SPLIT %] Party B
Food and supplies: [SPECIFY ARRANGEMENT]
Grooming: [SPECIFY ARRANGEMENT]
Boarding (when required): [SPECIFY ARRANGEMENT]

Payment method: Each party shall pay their share directly to the provider / reimburse the other party within [NUMBER] days of receiving an invoice.

6. RELOCATION
If the primary party plans to relocate more than [DISTANCE] miles from their current address, they shall provide [NUMBER] days' written notice to the other party. The Parties agree to renegotiate the visitation schedule in good faith within [NUMBER] days of such notice.

7. DEATH OR INCAPACITY
If [PET NAME] passes away, both Parties shall be notified promptly. Decisions regarding remains, memorial services, and costs shall be [specify arrangement].

If either party is unable to care for [PET NAME] temporarily, the other party shall have first right of temporary care before a third party is engaged.

If either party permanently relinquishes care, full ownership transfers to the remaining party.

8. DISPUTE RESOLUTION
The Parties agree to attempt mediation before initiating legal proceedings. If mediation fails, disputes shall be resolved under the laws of the State of [STATE].

9. AMENDMENTS
This Agreement may be amended only by a written document signed by both Parties.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire understanding between the Parties with respect to [PET NAME]'s custody and care and supersedes any prior verbal agreements.

IN WITNESS WHEREOF, the Parties have signed this Agreement as of the date first written above.

Party A Signature: _________________________ Date: __________
Print Name: _________________________________

Party B Signature: _________________________ Date: __________
Print Name: _________________________________

Witness (optional): _________________________ Date: __________`,
    faqs: [
      { q: "Is a pet custody agreement legally binding?", a: "Yes — as a civil contract between two parties, it is legally enforceable. Courts treat it like any other property agreement. For it to be held up, both parties must have signed voluntarily, the terms must be clear, and it must not violate state law. Having it notarised strengthens its enforceability." },
      { q: "What if my ex refuses to follow the agreement?", a: "You can take the matter to small claims court (for financial disputes under your state's limit) or file a civil lawsuit for breach of contract. In states like California where courts consider the pet's best interest, you may also request a modified custody order through family court." },
      { q: "Do I need a lawyer to write a pet custody agreement?", a: "Not for a straightforward shared-care arrangement between two cooperative parties. This template covers all standard clauses. If your situation involves significant assets, prior restraining orders, or contested ownership, consult a family law attorney." },
      { q: "Can this template be used for cats, rabbits, birds, or other pets?", a: "Yes. The template works for any domesticated pet. Simply fill in the correct species and breed information in Section 1. Note that some states have specific regulations for certain exotic animals — verify ownership legality separately." },
    ],
    relatedSlugs: ["pet-medical-history-template", "pet-adoption-contract-template", "pet-trust-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)"],
  },

  {
    slug: "pet-medical-history-template",
    title: "Pet Medical History Template (Free, Printable)",
    seoTitle: "Pet Medical History Template — Free Printable & Editable 2026",
    shortTitle: "Pet Medical History",
    seoDescription: "Free pet medical history template covering vaccinations, medications, allergies, surgeries, and vet visits. Printable PDF and editable Word/Google Docs version for dogs, cats, and all pets.",
    icon: "🏥",
    tier: 1,
    category: "Health Records",
    targetKeywords: ["pet medical history template", "pet health record template", "pet medical record template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "6 Min Read",
    quickAnswer: "A pet medical history template is a single document that records your pet's vaccinations, medications, allergies, surgeries, weight history, and vet contacts — giving any vet, boarder, or emergency clinic instant access to your pet's complete health picture.",
    intro: `Every vet visit, vaccination, medication, and health event in your pet's life is a data point. When those data points are scattered across multiple clinics, scribbled on appointment cards, or stored only in your memory, gaps emerge — and gaps in medical history can lead to duplicate treatments, missed drug interactions, or misdiagnosis in emergencies.

A pet medical history document consolidates everything in one place. It travels with your pet to new vets, boarding facilities, pet sitters, and emergency clinics. It's the single most useful document a pet owner can maintain — and this free template makes it straightforward to keep updated.`,
    whenYouNeedIt: [
      "Moving to a new city and registering with a new vet",
      "Boarding your pet or using a pet sitter",
      "Visiting an emergency vet clinic that doesn't have your records",
      "Adopting a pet with an unknown medical history",
      "Managing a pet with a chronic condition, allergies, or multiple medications",
    ],
    whatToInclude: [
      {
        title: "Pet identification",
        items: ["Name, species, breed, sex, date of birth", "Microchip number, licence number", "Owner name and emergency contact", "Insurance policy number (if applicable)"],
      },
      {
        title: "Vaccination record",
        items: ["Vaccine name, date administered, lot number, administering vet", "Next due date for each vaccine", "Rabies certificate number and expiry"],
      },
      {
        title: "Medications & supplements",
        items: ["Current medications: name, dose, frequency, prescribing vet", "Past medications with dates", "Supplements and dosages"],
      },
      {
        title: "Allergies & adverse reactions",
        items: ["Known drug allergies", "Food allergies or intolerances", "Environmental allergies", "Reaction to anaesthesia or specific procedures"],
      },
      {
        title: "Medical history",
        items: ["Surgeries with dates and outcomes", "Major illnesses or diagnoses", "Hospitalisations", "Weight history (useful for dosing and condition tracking)"],
      },
      {
        title: "Vet contacts",
        items: ["Primary vet name, clinic, phone, address", "Specialist contacts (cardiologist, dermatologist, etc.)", "Emergency clinic name and address"],
      },
    ],
    stateNotes: `**Rabies certificates:** All states require a current rabies vaccination certificate. Keep the original and include a copy in this document. Many boarding facilities and groomers require it on file.\n\n**Heartworm prevention:** Year-round prevention is recommended in all U.S. states by the American Heartworm Society. Document monthly preventative dosing here.\n\n**Interstate travel:** If you cross state lines with your pet, a Certificate of Veterinary Inspection (CVI or health certificate) is often required — separate from this document, but your medical history makes obtaining it much faster.`,
    templateText: `PET MEDICAL HISTORY RECORD

━━━━━━━━━━━━━━━━━━━━━━━━
PET INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━
Name: ___________________________
Species: _____________ Breed: _____________
Sex: _______ Neutered/Spayed: Yes / No
Date of Birth: ___________________________
Colour / Markings: ___________________________
Microchip Number: ___________________________
Licence Number: ___________________________

Owner Name: ___________________________
Phone: ___________________________
Emergency Contact: ___________________________
Pet Insurance Provider & Policy #: ___________________________

━━━━━━━━━━━━━━━━━━━━━━━━
VACCINATION RECORD
━━━━━━━━━━━━━━━━━━━━━━━━
Vaccine | Date Given | Due Date | Vet/Clinic | Lot #
---------|------------|----------|------------|------
Rabies   |            |          |            |
Distemper (DHPP / FVRCP) | | | |
Bordetella (Kennel Cough) | | | |
Leptospirosis | | | |
Lyme      |            |          |            |
Influenza |            |          |            |
Other: ___ |           |          |            |
Other: ___ |           |          |            |

Rabies Certificate Number: _____________________ Expiry: ____________

━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT MEDICATIONS & SUPPLEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━
Medication / Supplement | Dose | Frequency | Start Date | Prescribing Vet
------------------------|------|-----------|------------|----------------
                        |      |           |            |
                        |      |           |            |
                        |      |           |            |

Flea / Tick Prevention: ___________________ Monthly / Quarterly
Heartworm Prevention: ____________________ Monthly

━━━━━━━━━━━━━━━━━━━━━━━━
ALLERGIES & ADVERSE REACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━
Known drug allergies: ___________________________
Food allergies / intolerances: ___________________________
Environmental allergies: ___________________________
Reaction to anaesthesia or procedures: ___________________________
Other: ___________________________

━━━━━━━━━━━━━━━━━━━━━━━━
MEDICAL HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━
Date | Condition / Procedure | Treatment / Notes | Vet/Clinic
-----|----------------------|-------------------|----------
     |                      |                   |
     |                      |                   |
     |                      |                   |
     |                      |                   |
     |                      |                   |

━━━━━━━━━━━━━━━━━━━━━━━━
WEIGHT HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━
Date | Weight | Notes
-----|--------|------
     |        |
     |        |
     |        |

━━━━━━━━━━━━━━━━━━━━━━━━
VETERINARY CONTACTS
━━━━━━━━━━━━━━━━━━━━━━━━
Primary Vet: _______________________________
Clinic: _______________________________
Phone: _______________________________
Address: _______________________________

Specialist (if any): _______________________________
Specialty: _______________________________
Phone: _______________________________

Emergency Clinic: _______________________________
Address: _______________________________
24hr Phone: _______________________________

━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━
_______________________________________________
_______________________________________________
_______________________________________________

Last updated: _____________ By: _____________`,
    faqs: [
      { q: "How often should I update my pet's medical history?", a: "After every vet visit, vaccination, new medication, or health event. Set a reminder to review the full document every 6 months to ensure it's current. If your pet has a chronic condition, review it at every vet appointment." },
      { q: "Should I share this with my pet sitter or boarder?", a: "Yes. Give your sitter or boarder a copy with current vaccinations, medications, allergies, and your emergency vet contact highlighted. You don't need to share your pet's full surgical history — a one-page summary with critical current information is usually sufficient." },
      { q: "Does this replace vet records?", a: "No — your vet maintains official clinical records. This template is your personal copy and summary, useful for reference, travel, emergencies, and changing vets. Always request official records from your vet when changing clinics." },
      { q: "What's the difference between a medical history and a vaccination record?", a: "A vaccination record covers only vaccines. A medical history is comprehensive — it includes vaccines, medications, allergies, diagnoses, surgeries, weight, and vet contacts. This template covers all of it." },
    ],
    relatedSlugs: ["pet-vaccination-record-template", "pet-health-record-template", "pet-sitting-contract-template-free"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)", "Printable A4"],
  },

  {
    slug: "pet-sitting-contract-template-free",
    title: "Free Pet Sitting Contract Template (Editable PDF & Word)",
    seoTitle: "Free Pet Sitting Contract Template — Editable 2026",
    shortTitle: "Pet Sitting Contract",
    seoDescription: "Free pet sitting contract template for professional pet sitters and dog walkers. Covers services, rates, cancellation policy, emergency authorisation, liability, and payment terms. Editable PDF and Word.",
    icon: "🐾",
    tier: 1,
    category: "Pet Sitting & Care",
    targetKeywords: ["pet sitter contract template free", "pet sitting contract template free", "pet sitting contract template", "free pet sitting contract template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "8 Min Read",
    quickAnswer: "A pet sitting contract is a written agreement between a pet owner and a pet sitter specifying the services to be provided, rates, cancellation policy, emergency authorisation, and liability terms. It protects both parties and professionalises the arrangement.",
    intro: `Pet sitting is a business, even when it's done by a neighbour or a friend-of-a-friend. A written contract protects the pet sitter from liability for pre-existing conditions and unclear instructions, and protects the owner by confirming exactly what services were agreed upon and what happens in an emergency.

Whether you're a professional pet sitter growing your business or a pet owner hiring someone for the first time, this free contract template establishes clear, professional terms that prevent the most common disputes: unclear scope of service, liability for injuries, payment disagreements, and emergency decision-making authority.`,
    whenYouNeedIt: [
      "Hiring a pet sitter for in-home pet sitting",
      "Hiring a dog walker for regular or one-off walks",
      "Running a pet sitting business and formalising client agreements",
      "Using a neighbour or acquaintance (a written agreement prevents misunderstandings)",
    ],
    whatToInclude: [
      {
        title: "Parties and dates",
        items: ["Owner full name, address, phone, email", "Pet sitter full name, address, phone, email", "Service start and end dates"],
      },
      {
        title: "Services",
        items: ["Specific services agreed (in-home sitting, walks, feeding, medication administration)", "Visit frequency and duration", "Overnight arrangements (if applicable)"],
      },
      {
        title: "Rates and payment",
        items: ["Rate per visit / per day / per week", "Payment due date and method", "Late payment terms", "Holiday surcharge (if applicable)"],
      },
      {
        title: "Cancellation policy",
        items: ["Notice period required for cancellation", "Refund or credit policy", "Last-minute cancellation fee"],
      },
      {
        title: "Emergency authorisation",
        items: ["Authority to seek emergency vet care", "Emergency vet contact details", "Spending limit authorised without owner approval"],
      },
      {
        title: "Liability",
        items: ["Pet sitter liability for injury or illness", "Owner acknowledgement of pet's health status", "Liability for damage to property"],
      },
    ],
    stateNotes: `**Business licensing:** Some states and municipalities require pet sitters to hold a business licence. Check your local requirements before operating professionally.\n\n**Insurance:** Professional pet sitters should carry pet sitter liability insurance (providers include Pet Sitters International and NAPPS). This contract should reference your insurance policy number if you carry it.\n\n**Medication administration:** Some states require that administering prescription medication (including insulin injections) be done only by a licensed vet tech or under vet supervision. Verify your state's requirements if medication administration is part of the service.`,
    templateText: `PET SITTING SERVICE AGREEMENT

This Pet Sitting Service Agreement ("Agreement") is entered into as of [DATE] between:

Pet Owner: [OWNER FULL NAME]
Address: [ADDRESS]
Phone: [PHONE] | Email: [EMAIL]

Pet Sitter: [SITTER FULL NAME]
Business Name (if applicable): [BUSINESS NAME]
Address: [ADDRESS]
Phone: [PHONE] | Email: [EMAIL]

1. PET INFORMATION
Pet Name: _____________ Species/Breed: _____________
Age: _____ Sex: _____ Neutered/Spayed: Yes / No
Microchip #: _____________ Vet Clinic: _____________
Vet Phone: _____________ Last Vet Visit: _____________
Known medical conditions: _________________________________
Current medications: _________________________________
Dietary restrictions / allergies: _________________________________
Behavioural notes (aggression, anxiety, escape risk): _________________________________

2. SERVICES
Service Dates: From [START DATE] to [END DATE]
Services to be provided:
  ☐ In-home pet sitting (owner's home)
  ☐ Dog walking: [NUMBER] walks per day, [DURATION] minutes each
  ☐ Feeding: [NUMBER] times per day — food and amount: [DETAILS]
  ☐ Medication administration: [DETAILS]
  ☐ Overnight stay: ☐ Yes ☐ No
  ☐ Other: _________________________________

Key / access arrangements: _________________________________

3. RATES AND PAYMENT
Rate: $[AMOUNT] per [day / visit / week]
Estimated total: $[TOTAL]
Holiday surcharge: $[AMOUNT] per day (applicable dates: [DATES])
Payment due: [DATE / upon return / weekly]
Payment method: ☐ Cash ☐ Venmo ☐ PayPal ☐ Bank transfer ☐ Other: _____
Late payment fee: $[AMOUNT] after [NUMBER] days overdue

4. CANCELLATION POLICY
Owner cancellations: [NUMBER] days' notice required for full refund.
  Cancellations with less than [NUMBER] days' notice: [REFUND / CREDIT POLICY]
Sitter cancellations: [NUMBER] days' notice will be provided. Owner will receive a full refund.

5. EMERGENCY AUTHORISATION
Owner authorises the Pet Sitter to seek emergency veterinary care from the vet listed above or, if unavailable, from the nearest emergency clinic, if the Pet Sitter reasonably believes the pet requires immediate treatment.

Emergency spending limit (without owner approval): $[AMOUNT]
Owner acknowledges responsibility for all approved emergency veterinary costs.

Owner emergency contact (while away):
Name: ______________________ Phone: ______________________
Alternate contact: ______________________ Phone: ______________________

6. OWNER REPRESENTATIONS
Owner represents that:
(a) The pet is in good health and has not exhibited symptoms of illness in the past [NUMBER] days.
(b) The pet's vaccinations are current (records attached: ☐ Yes ☐ No).
(c) The pet has not bitten, scratched, or shown aggression toward a person in the past [NUMBER] months, except as noted in Section 2.
(d) Owner has disclosed all known behavioural issues that could pose a risk.

7. LIABILITY
The Pet Sitter agrees to provide care with reasonable diligence and good judgement. The Pet Sitter shall not be held liable for illness, injury, or death resulting from:
  - A pre-existing medical condition not disclosed by the Owner
  - An accident or injury that could not reasonably have been prevented
  - Escape by a pet with a known or unknown escape history not disclosed to the Sitter

Owner agrees to indemnify the Pet Sitter against claims arising from bites, scratches, or injuries caused by the pet to third parties while in the Sitter's care, where such behaviour was not disclosed in advance.

8. ENTIRE AGREEMENT
This Agreement constitutes the entire understanding between the Parties and supersedes any prior verbal arrangements.

Owner Signature: _______________________ Date: ___________
Print Name: _______________________

Pet Sitter Signature: _______________________ Date: ___________
Print Name: _______________________`,
    faqs: [
      { q: "Do I need a new contract for every client as a pet sitter?", a: "Yes — or at minimum a new signed service agreement form for each booking period. Some sitters use a master contract with a supplemental booking form for each new visit. Either approach is fine as long as the key terms (services, dates, rates, emergency authorisation) are documented and signed for each engagement." },
      { q: "What if the pet sitter is a friend — do I still need a contract?", a: "Yes. Informal arrangements are the most common source of disputes. Even a simple signed agreement prevents misunderstandings about payment, what's expected, and who's responsible if something goes wrong. Protect the friendship by being clear in writing." },
      { q: "Should the contract mention pet insurance?", a: "If the pet has insurance, include the policy number and insurer in Section 1 so the sitter can reference it in an emergency. If the sitter has professional liability insurance, they should include their policy details in their header." },
      { q: "What's a reasonable emergency spending limit?", a: "Most owners set this between $200 and $500 — enough to cover an emergency consultation and basic stabilising treatment without requiring the sitter to spend beyond their means. For pets with known health conditions, a higher limit may be appropriate." },
    ],
    relatedSlugs: ["pet-sitting-invoice-template", "pet-medical-history-template", "pet-addendum-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)"],
  },

  {
    slug: "pet-sitting-invoice-template",
    title: "Pet Sitting Invoice Template (Free, Professional)",
    seoTitle: "Pet Sitting Invoice Template — Free Download 2026",
    shortTitle: "Pet Sitting Invoice",
    seoDescription: "Free professional pet sitting invoice template for dog walkers and pet sitters. Itemises walks, overnight stays, holiday rates, and add-on services. Editable PDF, Word, and Google Docs.",
    icon: "🧾",
    tier: 1,
    category: "Pet Sitting & Care",
    targetKeywords: ["pet sitting invoice template", "pet sitter invoice template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "5 Min Read",
    quickAnswer: "A pet sitting invoice is a professional billing document that itemises services rendered (walks, sitting visits, overnights), rates, dates, applicable holiday surcharges, and payment terms. It gives clients a clear record and makes your business look professional.",
    intro: `Issuing invoices is one of the fastest ways to look professional as a pet sitter or dog walker — and one of the fastest ways to get paid reliably. Clients who receive itemised invoices pay faster and dispute less than clients billed verbally or by message.

This free template covers every line item a pet sitting invoice typically needs: per-visit or per-day rates, overnight charges, medication administration fees, holiday surcharges, and a clear payment terms section. Download it in the format you prefer, add your branding, and issue it to every client after every service period.`,
    whenYouNeedIt: [
      "Running a professional pet sitting or dog walking business",
      "Billing clients after a pet sitting period (especially multi-day or complex bookings)",
      "Needing a record of services for your tax filings",
      "Clients who request an itemised receipt",
    ],
    whatToInclude: [
      { title: "Header", items: ["Your business name, logo, address, phone, email", "Invoice number (sequential for accounting)", "Invoice date and payment due date"] },
      { title: "Client details", items: ["Client full name, address, phone, email", "Pet name(s) and species"] },
      { title: "Itemised services", items: ["Service description (e.g., '30-min dog walk', 'Overnight pet sitting')", "Date(s) of service", "Quantity (number of visits/days)", "Unit rate", "Line total"] },
      { title: "Additional fees", items: ["Holiday surcharge", "Medication administration fee", "Additional pet fee", "Key copy/return fee if applicable"] },
      { title: "Payment total and terms", items: ["Subtotal, any applicable tax, grand total", "Accepted payment methods", "Due date and late fee policy"] },
    ],
    stateNotes: `**Self-employment tax:** In the U.S., pet sitting income is self-employment income. Issue yourself a record of every invoice for quarterly estimated tax purposes (IRS Form 1040-ES). Keep invoices for 3 years minimum.\n\n**Sales tax:** Most states do not tax pet sitting services, but a few do. Check your state's department of revenue if you operate in CA, TX, OH, or PA.`,
    templateText: `────────────────────────────────
[YOUR BUSINESS NAME]
[ADDRESS] | [CITY, STATE, ZIP]
[PHONE] | [EMAIL] | [WEBSITE]
────────────────────────────────

                                    INVOICE

Invoice #: ________________
Date: ________________
Due Date: ________________

BILL TO:
[CLIENT FULL NAME]
[ADDRESS]
[CITY, STATE, ZIP]
[PHONE] | [EMAIL]

PET(S): [PET NAME(S)]

────────────────────────────────
SERVICE DETAILS
────────────────────────────────
Description              | Dates          | Qty | Rate   | Total
------------------------|----------------|-----|--------|--------
Dog walk (30 min)        | [DATE RANGE]   |     | $      | $
Dog walk (60 min)        | [DATE RANGE]   |     | $      | $
In-home pet sitting      | [DATE RANGE]   |     | $      | $
Overnight stay           | [DATE RANGE]   |     | $      | $
Medication administration| [DATE RANGE]   |     | $      | $
Additional pet           | [DATE RANGE]   |     | $      | $
Holiday surcharge        | [DATES]        |     | $      | $
Other: _______________   |                |     | $      | $

────────────────────────────────
Subtotal:                                              $
Tax ([   ]%):                                          $
────────────────────────────────
TOTAL DUE:                                             $
────────────────────────────────

PAYMENT TERMS
Payment is due by [DUE DATE].
Accepted methods: ☐ Cash ☐ Venmo (@________) ☐ PayPal (__________) ☐ Zelle ☐ Bank transfer
Late payment fee: $[AMOUNT] per [NUMBER] days after due date.

Please reference Invoice #[NUMBER] with your payment.

NOTES / SUMMARY OF VISIT:
_________________________________________________________
_________________________________________________________

Thank you for trusting us with [PET NAME]!`,
    faqs: [
      { q: "How often should I invoice clients?", a: "For recurring clients (weekly walks), invoice weekly or biweekly. For one-off bookings (holiday sitting), invoice at the end of the service period or, for bookings over $200, request a deposit up front with the balance due on completion." },
      { q: "Should I charge tax on pet sitting services?", a: "In most U.S. states, pet sitting and dog walking are not subject to sales tax. However, some states do tax personal services. Check your state's revenue department. You should always report pet sitting income as self-employment income on your federal taxes." },
      { q: "What's a reasonable late payment fee?", a: "Most freelance service businesses charge 1.5–3% of the outstanding amount per month (or a flat fee of $10–$25 per week). Whatever you set, it must be disclosed in your contract or on your invoice before services are rendered." },
    ],
    relatedSlugs: ["pet-sitting-contract-template-free", "pet-medical-history-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)", "Excel (.xlsx)"],
  },

  {
    slug: "pet-adoption-contract-template",
    title: "Pet Adoption Contract Template (Free, Editable)",
    seoTitle: "Pet Adoption Contract Template — Free Download 2026",
    shortTitle: "Pet Adoption Contract",
    seoDescription: "Free pet adoption contract template for rescues, shelters, and private rehomers. Covers adoption fees, spay/neuter requirements, return policy, care standards, and home visit rights.",
    icon: "🏠",
    tier: 1,
    category: "Adoption & Rehoming",
    targetKeywords: ["pet adoption contract template", "simple pet adoption contract template", "pet adoption agreement template", "pet adoption form template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "8 Min Read",
    quickAnswer: "A pet adoption contract is a legally binding agreement between an adopter and a rescue or rehomer specifying the adoption fee, care requirements, spay/neuter obligations, return policy if the adoption doesn't work out, and the rehomer's right to reclaim the animal if welfare standards aren't met.",
    intro: `Whether you're a rescue organisation processing dozens of adoptions per year, a private individual rehoming a litter, or a foster family transitioning a pet to their forever home, a written adoption contract protects the animal first and both parties second.

The sites ranking for this search query today are generic legal template services with no specialisation in animal welfare. Their templates miss critical clauses that are standard in professional rescue practice: return obligations, welfare check rights, and breed-specific restrictions. This template is written for pet people, by pet people.`,
    whenYouNeedIt: [
      "A rescue or shelter organisation processing adoptions",
      "A private individual rehoming a pet from a litter or unexpected situation",
      "A foster family transitioning their foster pet to an adopter",
      "Anyone who wants written commitment from an adopter before surrendering an animal",
    ],
    whatToInclude: [
      { title: "Pet identification", items: ["Name, species, breed, age, sex, microchip number", "Vaccination and health status at time of adoption", "Known behavioural characteristics"] },
      { title: "Adoption fee", items: ["Amount and what it covers (spay/neuter, vaccines, microchip)", "Refund policy", "Receipt acknowledgement"] },
      { title: "Adopter obligations", items: ["Minimum care standards (food, shelter, vet care)", "Spay/neuter requirement and deadline", "No-rehome clause (must return to rescue, not surrender to shelter)", "Prohibition on commercial use (no breeding, no resale)"] },
      { title: "Return policy", items: ["Adopter's obligation to return the pet to this rescue/rehomer", "Process for requesting a return", "What happens if the rescue cannot accept immediately"] },
      { title: "Rescue rights", items: ["Right to conduct home visits", "Right to reclaim if welfare standards aren't met", "Right of first refusal if adopter can no longer keep the pet"] },
    ],
    stateNotes: `**Enforceable provisions:** Return-to-rescue clauses and no-resale clauses are generally enforceable as contract terms in all states. Courts have upheld rescues' rights to reclaim animals when adopters violated care obligations.\n\n**Dangerous breed restrictions:** Some states or municipalities have breed-specific legislation (BSL) that may affect your ability to adopt out certain breeds. Verify local laws before placing pit bull type dogs, Rottweilers, or other regulated breeds.\n\n**Tax-deductible donations:** If your rescue is a 501(c)(3), adoption fees may be partially tax-deductible (the portion exceeding the fair market value of the animal). Consult a tax professional for specifics.`,
    templateText: `PET ADOPTION CONTRACT

This Pet Adoption Contract ("Agreement") is entered into as of [DATE] by and between:

Rescue / Rehomer: [ORGANISATION OR INDIVIDUAL NAME] ("Rescue")
Address: [ADDRESS] | Phone: [PHONE] | Email: [EMAIL]

Adopter: [FULL NAME] ("Adopter")
Address: [ADDRESS] | Phone: [PHONE] | Email: [EMAIL]

1. PET IDENTIFICATION
Name: _____________ Species / Breed: _____________
Date of Birth (approx.): _____________ Sex: _____________
Microchip Number: _____________ Tag/Licence #: _____________
Vaccinations current as of: _____________ (records attached: ☐ Yes ☐ No)
Spayed / Neutered: ☐ Yes ☐ No — if No, required by: [DATE]
Known health conditions: _________________________________
Known behavioural characteristics: _________________________________

2. ADOPTION FEE
Adoption fee: $[AMOUNT]
This fee covers: ☐ Microchip ☐ Vaccines ☐ Spay/Neuter ☐ Deworming ☐ Flea treatment ☐ Other: ___
This fee is ☐ refundable / ☐ non-refundable in the event of return.

Adopter acknowledges receipt of the pet described above and has paid the adoption fee in full.

3. ADOPTER OBLIGATIONS
The Adopter agrees to:
(a) Provide adequate food, clean water, shelter, exercise, and veterinary care for the pet's lifetime.
(b) Keep the pet as an indoor pet / allowed outdoors only under supervision [select as applicable].
(c) Have the pet spayed / neutered by [DATE] if not already done, and provide proof to the Rescue within [NUMBER] days.
(d) Keep the pet's microchip registration updated with current contact information.
(e) Not sell, give away, re-home, or surrender the pet to any shelter, pound, or third party without first contacting the Rescue and offering to return the pet.
(f) Not use the pet for commercial breeding, dogfighting, or any form of commercial exploitation.
(g) Notify the Rescue of any change of address within [NUMBER] days.

4. RETURN POLICY
If the Adopter is unable or unwilling to continue caring for the pet for any reason, the Adopter agrees to contact the Rescue first. The Rescue will make reasonable efforts to accept the return within [NUMBER] days.

The Adopter shall not surrender the pet to any animal control facility or shelter without first exhausting the return process with the Rescue.

5. RESCUE RIGHTS
The Rescue reserves the right to:
(a) Conduct a courtesy home visit within [NUMBER] days of adoption, by appointment.
(b) Reclaim the pet if the Adopter fails to meet the care obligations in Section 3, with [NUMBER] days' written notice and an opportunity to remedy the issue.
(c) Exercise the right of first refusal if the Adopter can no longer keep the pet.

6. HEALTH DISCLOSURE
The Rescue represents that the pet is in the best health known at the time of adoption and has disclosed all known health conditions. The Rescue does not warrant against hidden or undiscovered conditions. Adopter is encouraged to schedule a vet examination within [NUMBER] days of adoption.

7. LIABILITY
The Adopter assumes full responsibility for any injury, damage, or loss caused by the pet from the date of adoption. The Rescue shall not be liable for any costs arising from undisclosed or subsequent health or behavioural issues beyond what is stated in Section 6.

8. GOVERNING LAW
This Agreement is governed by the laws of the State of [STATE].

Rescue Representative: _______________________ Date: ___________
Print Name / Title: _______________________

Adopter Signature: _______________________ Date: ___________
Print Name: _______________________

Co-Adopter Signature (if applicable): _______________________ Date: ___________`,
    faqs: [
      { q: "What is a no-rehome clause and is it enforceable?", a: "A no-rehome clause requires the adopter to return the pet to the rescue rather than rehoming or surrendering it independently. These clauses are generally enforceable as contract terms. Courts have ruled in rescues' favour in cases where adopters violated them, particularly when the rescue sought to reclaim the animal from unsafe or neglectful situations." },
      { q: "Can a rescue legally take back an adopted pet?", a: "Yes, if the adoption contract includes a reclaim provision that the adopter signed. The rescue must typically give written notice and an opportunity to remedy the issue first, unless the animal's welfare is in immediate danger. Consult a local attorney if you need to invoke this clause." },
      { q: "Do private individuals rehoming a pet need a contract?", a: "It's strongly recommended. Even for a single litter rehoming, a signed contract creates a paper trail, confirms the adopter's commitments, and provides a return path if the placement doesn't work. It also protects you from liability if the animal causes injury after placement." },
    ],
    relatedSlugs: ["pet-adoption-certificate-template", "pet-medical-history-template", "pet-custody-agreement-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)"],
  },

  {
    slug: "pet-obituary-template",
    title: "Pet Obituary Template (Free, Heartfelt)",
    seoTitle: "Pet Obituary Template — Free Download & Examples 2026",
    shortTitle: "Pet Obituary",
    seoDescription: "Free pet obituary template with examples and writing guidance. Honour your dog, cat, or any beloved pet with a meaningful tribute. Printable, shareable, and completely free.",
    icon: "🌿",
    tier: 1,
    category: "Pet Loss & Memorial",
    targetKeywords: ["pet obituary template", "dog obituary template", "cat obituary template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "6 Min Read",
    quickAnswer: "A pet obituary is a written tribute that honours your pet's life — their personality, the joy they brought, the memories they created. It doesn't need to follow a formal structure. This template gives you a framework so that even in grief, you have a starting point.",
    intro: `Losing a pet is losing a family member. The grief is real, the void is immediate, and the instinct to honour them — to put into words what they meant — is one of the most human responses to loss.

A pet obituary doesn't need to follow the formal conventions of a human obituary. It can be as personal, as funny, as specific, and as emotional as you need it to be. What matters is that it captures something true about who they were.

This template gives you a framework and examples to draw from. Use as much or as little as serves you. There is no wrong way to write about someone you loved.`,
    whenYouNeedIt: [
      "After the loss of a pet, to process grief through writing",
      "To share a tribute on social media, a memorial page, or with family",
      "To include in a memorial service programme",
      "To submit to a local newspaper's pet loss section",
      "To preserve in a memory box or scrapbook",
    ],
    whatToInclude: [
      { title: "The opening", items: ["Their name, species, breed", "Dates (born and passed)", "One sentence that captures who they were"] },
      { title: "Their personality", items: ["Signature quirks and habits", "Favourite things (people, toys, places, foods)", "What they were afraid of, what made them brave", "How they made people feel"] },
      { title: "The story", items: ["How you found each other", "A favourite memory or two", "What they meant to the family", "How they changed your life"] },
      { title: "The goodbye", items: ["Who they leave behind", "Where they are buried or their ashes are kept", "A line about what you'll miss most", "A message to them"] },
    ],
    stateNotes: `Grief is universal and this template has no state-specific considerations. If you are struggling with the loss of a pet, the Association for Pet Loss and Bereavement (aplb.org) offers free counselling resources and online support groups.`,
    templateText: `IN LOVING MEMORY OF [PET NAME]

[PET NAME] — [BREED / SPECIES]
[BIRTH DATE (or approximate year)] – [DATE OF PASSING]

─────────────────────────────────

[PET NAME] came into our lives on [DATE / YEAR] and left a mark on our hearts that no words can fully capture.

[He / She / They] was [describe their personality in 2–3 sentences — their quirks, their spirit, what made them uniquely themselves].

Example: "Milo was a 12-year-old Golden Retriever who approached every single day as though it were the best day he'd ever had. He believed every person he met had come specifically to see him. He was wrong about very little."

─────────────────────────────────

[Write 2–3 sentences about how you found each other or how they came into your life.]

Example: "We found each other at the city shelter on a Tuesday afternoon. She had been there for six weeks and no one had chosen her yet. She chose us."

─────────────────────────────────

[Share 1–2 specific memories that capture their essence.]

Example: "He spent the last three summers convinced he could catch the neighbourhood squirrel. He couldn't. He never stopped trying. We admired that about him."

─────────────────────────────────

[Write about what they meant to the family and how they changed your life.]

Example: "Luna taught our children what it means to love something wholly and without condition. She was gentle with our youngest when words were hard and patience was needed. She knew before we did when someone was sad."

─────────────────────────────────

[PET NAME] is survived by [list family members, other pets, etc.].

[He / She / They] is buried [location] / [His / Her / Their] ashes rest [location].

We will miss [specific thing] most of all. We are better for having known [him / her / them].

Until we meet again, [PET NAME].

─────────────────────────────────
[FAMILY NAME(S)]
[DATE]`,
    faqs: [
      { q: "Can I submit a pet obituary to a newspaper?", a: "Many local newspapers accept pet obituaries, sometimes in a dedicated pets section or as a paid classified. Contact your local paper's editorial or classified department. Some online publications like The Dodo and BringFido also accept pet tributes." },
      { q: "How long should a pet obituary be?", a: "As long as it needs to be. Newspaper submissions typically run 150–300 words. A tribute for family and friends, a memorial page, or a personal record can be as long as feels right. Some of the most powerful pet obituaries are a single paragraph." },
      { q: "Is it okay to include humour in a pet obituary?", a: "Absolutely. Celebrating your pet's personality — including the funny, the ridiculous, the absurd — is one of the most honest ways to honour them. Many of the most beloved pet obituaries are funny, because they capture a real animal, not a sentimentalised idea of one." },
    ],
    relatedSlugs: ["pet-medical-history-template", "pet-custody-agreement-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)", "Printable A5"],
  },

  {
    slug: "pet-addendum-to-lease-agreement-template",
    title: "Pet Addendum to Lease Agreement Template (Free)",
    seoTitle: "Pet Addendum to Lease Agreement Template — Free 2026",
    shortTitle: "Pet Lease Addendum",
    seoDescription: "Free pet addendum to lease agreement template for landlords and tenants. Covers pet deposit, monthly pet rent, approved pets, damage liability, noise and nuisance clauses, and removal conditions.",
    icon: "🏢",
    tier: 1,
    category: "Legal & Ownership",
    targetKeywords: ["pet addendum to lease agreement template", "pet addendum template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "7 Min Read",
    quickAnswer: "A pet addendum is a legal supplement to a residential lease agreement that specifies the terms under which a tenant may keep a pet: which pets are permitted, the pet deposit amount, monthly pet rent, damage liability, and conditions under which the pet must be removed from the property.",
    intro: `Standard lease agreements are silent on pets — or prohibit them outright. A pet addendum is the middle path: it gives tenants the right to keep specific pets under defined conditions, and gives landlords documented protections against damage, liability, and nuisance.

For tenants, a signed pet addendum is the written proof that your pet is allowed — essential if there's ever a dispute with a new property manager. For landlords, it clarifies exactly which pets are permitted, documents the deposit, and establishes the conditions for removal. Without it, both parties are operating on verbal assumptions.`,
    whenYouNeedIt: [
      "A tenant wants to add a pet to an existing lease",
      "A landlord is updating their lease package to include pet terms",
      "A new tenant has a pet and wants written permission before signing",
      "A tenant is adding a second or third pet not covered by the original lease terms",
    ],
    whatToInclude: [
      { title: "Approved pets", items: ["Species, breed, and name of approved pet(s)", "Weight limit (common: under 25 lbs, under 50 lbs)", "Number of pets permitted"] },
      { title: "Financial terms", items: ["Pet security deposit amount and refund conditions", "Monthly pet rent (if any)", "Damage liability in excess of deposit"] },
      { title: "Tenant obligations", items: ["Waste disposal requirements", "Noise and nuisance standards", "Vaccination and licence requirements", "Flea treatment before vacating"] },
      { title: "Removal conditions", items: ["Conditions triggering required removal of the pet", "Notice period given before removal is enforced", "What happens if tenant refuses to comply"] },
    ],
    stateNotes: `**Service animals and ESAs:** Under the Fair Housing Act, landlords must permit service animals and emotional support animals (ESAs) regardless of a no-pets policy. They cannot charge pet deposits for service animals or ESAs. This addendum is for pets — not service animals or ESAs.\n\n**Security deposit limits:** Many states cap total security deposits (including pet deposits). CA: 2 months' rent (unfurnished), TX: no statutory cap but must be reasonable, NY: 1 month's rent maximum for most residential leases. Check your state law before setting deposit amounts.\n\n**Breed restrictions:** Landlords may prohibit specific breeds in most states, but some cities (e.g., Denver) have repealed local breed bans. Verify local law.`,
    templateText: `PET ADDENDUM TO RESIDENTIAL LEASE AGREEMENT

This Pet Addendum ("Addendum") supplements the Residential Lease Agreement dated [ORIGINAL LEASE DATE] between:

Landlord: [LANDLORD/PROPERTY MANAGEMENT NAME]
Address: [PROPERTY ADDRESS]

Tenant(s): [TENANT FULL NAME(S)]
Property: [FULL RENTAL ADDRESS, UNIT NUMBER]

Lease Term: [ORIGINAL LEASE START DATE] to [ORIGINAL LEASE END DATE]

1. APPROVED PETS
The following pet(s) are approved to reside at the property:

Pet 1: Name: ________ Species: ________ Breed: ________ Approx. Weight: ________ lbs
Pet 2: Name: ________ Species: ________ Breed: ________ Approx. Weight: ________ lbs

No additional pets are permitted without written approval from the Landlord.
Weight limit per pet: ________ lbs. Pets exceeding this limit are not approved.

2. PET SECURITY DEPOSIT
A non-refundable pet fee / refundable pet deposit of $[AMOUNT] is due upon signing this Addendum.
  ☐ This is a non-refundable pet fee.
  ☐ This is a refundable pet deposit, subject to deductions for pet-related damages as outlined in Section 4.

3. MONTHLY PET RENT
Tenant agrees to pay an additional monthly pet rent of $[AMOUNT] per pet / for all approved pets.
This amount is included in / added to the monthly rent of $[AMOUNT].

4. TENANT OBLIGATIONS
Tenant agrees to:
(a) Keep all pet waste promptly cleaned up from the property, common areas, and surrounding grounds.
(b) Ensure pets do not cause noise disturbances (excessive barking, howling) that unreasonably disturb other tenants or neighbours.
(c) Keep pets up to date on all vaccinations required by local ordinance and provide proof to Landlord upon request.
(d) Ensure pets are licensed with the city/county as required by law.
(e) Keep pets on a leash in all common areas.
(f) Treat the property for fleas prior to vacating, at Tenant's expense, regardless of whether fleas are present at move-out.

5. DAMAGE LIABILITY
Tenant is responsible for all damage caused by the pet(s) exceeding normal wear and tear. If damage costs exceed the pet deposit, Tenant agrees to pay the balance owed within [NUMBER] days of receiving an itemised statement.

6. REMOVAL OF PET
The Landlord may require the pet(s) to be permanently removed from the property if:
(a) The pet causes documented damage exceeding $[AMOUNT].
(b) The pet causes a verified noise complaint or aggression incident.
(c) Tenant fails to maintain vaccinations, licences, or leash requirements after written notice.
(d) Tenant brings an additional unapproved pet onto the property.

The Landlord will provide [NUMBER] days' written notice before requiring removal, except in the case of an emergency (e.g., pet bite incident).

7. ENTIRE AGREEMENT
This Addendum is incorporated into and made part of the original Lease Agreement. All other terms of the Lease remain in full force and effect.

Landlord Signature: _______________________ Date: ___________
Print Name: _______________________

Tenant Signature: _______________________ Date: ___________
Print Name: _______________________

Tenant Signature (if multiple tenants): _______________________ Date: ___________`,
    faqs: [
      { q: "Can my landlord charge a pet deposit on top of my security deposit?", a: "In most states, yes — but total deposits (security + pet) are often capped by state law. California caps total deposits at 2 months' rent for unfurnished units. New York caps at 1 month's rent total. Check your state's landlord-tenant statutes for your specific limit." },
      { q: "Can my landlord refuse to allow my ESA or service animal?", a: "No. Under the Fair Housing Act, landlords must accommodate service animals and ESAs regardless of no-pets policies and cannot charge pet deposits for them. This addendum is for pets — service animals and ESAs are governed by the FHA and ADA, not a lease addendum." },
      { q: "What happens if I get a pet without telling my landlord?", a: "This likely violates your lease, which can result in a formal notice to remove the pet or, ultimately, eviction proceedings. Most landlords prefer to negotiate a pet addendum than go through eviction — if you already have a pet, approaching your landlord proactively with a proposed addendum is a better outcome for everyone." },
    ],
    relatedSlugs: ["pet-custody-agreement-template", "pet-medical-history-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)"],
  },

  // ─── TIER 2 ────────────────────────────────────────────────────────────────

  {
    slug: "pet-vaccination-record-template",
    title: "Pet Vaccination Record Template (Free, Printable)",
    seoTitle: "Pet Vaccination Record Template — Free Printable 2026",
    shortTitle: "Vaccination Record",
    seoDescription: "Free pet vaccination record template for dogs and cats. Track all vaccines, due dates, lot numbers, and vet details. Covers both the 'pet vaccination record template' and 'pet shot record template' keywords.",
    icon: "💉",
    tier: 2,
    category: "Health Records",
    targetKeywords: ["pet vaccination record template", "pet shot record template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "5 Min Read",
    quickAnswer: "A pet vaccination record template tracks every vaccine your pet has received — the name, date, due date, lot number, and administering vet — in a single printable document you can take to any vet, boarder, or groomer.",
    intro: `Boarding facilities, groomers, daycares, and dog parks increasingly require proof of up-to-date vaccinations before admitting your pet. A complete vaccination record in hand means instant access to that proof — and ensures you never miss a due date.

This template covers all core vaccines for dogs and cats, with columns for lot numbers (useful in the event of a vaccine recall), administering vet, and next due date. Download, print, and take it to your next vet appointment to fill in your pet's history.`,
    whenYouNeedIt: [
      "Booking a boarding facility or groomer that requires vaccination proof",
      "Taking your pet across state lines (many states require current rabies cert)",
      "Switching vets and needing a personal copy of vaccine history",
      "Monitoring due dates to avoid lapses in coverage",
    ],
    whatToInclude: [
      { title: "Core vaccines — dogs", items: ["Rabies (required by law in all states)", "Distemper-Parvovirus (DHPP)", "Bordetella (Kennel Cough)", "Leptospirosis", "Canine Influenza", "Lyme (if applicable by region)"] },
      { title: "Core vaccines — cats", items: ["Rabies", "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)", "FeLV (Feline Leukaemia — for outdoor cats)"] },
      { title: "Record fields per vaccine", items: ["Vaccine name and brand", "Date administered", "Due date / expiry", "Lot number", "Administering vet and clinic", "Certificate number (rabies)"] },
    ],
    stateNotes: `**Rabies law:** All 50 U.S. states legally require rabies vaccination for dogs. Most require it for cats. Some require a 3-year vaccine (not all clinics carry it — ask specifically). Your rabies certificate is a separate legal document; keep the original and record the number here.\n\n**AAHA guidelines:** The AAHA Canine Vaccination Guidelines (2022) classify vaccines as core (all dogs should receive) and non-core (based on risk). Distemper combo (DHPP) and rabies are core. Bordetella, leptospirosis, Lyme, and influenza are non-core — discuss with your vet based on your dog's lifestyle.`,
    templateText: `PET VACCINATION RECORD

Pet Name: _____________________  Species: _______________
Breed: _____________________  Sex: ___  DOB: ___________
Microchip #: _____________________
Owner: _____________________  Phone: ___________________

PRIMARY VETERINARIAN
Clinic: _____________________  Phone: ___________________
Address: _____________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOG VACCINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vaccine         | Date     | Due Date | Lot #   | Vet/Clinic
----------------|----------|----------|---------|------------
Rabies (1yr)    |          |          |         |
Rabies (3yr)    |          |          |         |
DHPP (1yr)      |          |          |         |
DHPP (3yr)      |          |          |         |
Bordetella      |          |          |         |
Leptospirosis   |          |          |         |
Lyme            |          |          |         |
Canine Influenza|          |          |         |
Other:          |          |          |         |

Rabies Certificate #: ___________________  Expiry: ____________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAT VACCINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vaccine         | Date     | Due Date | Lot #   | Vet/Clinic
----------------|----------|----------|---------|------------
Rabies (1yr)    |          |          |         |
Rabies (3yr)    |          |          |         |
FVRCP (1yr)     |          |          |         |
FVRCP (3yr)     |          |          |         |
FeLV            |          |          |         |
FIV             |          |          |         |
Other:          |          |          |         |

Rabies Certificate #: ___________________  Expiry: ____________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPCOMING DUE DATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vaccine: ___________________  Due: ___________________
Vaccine: ___________________  Due: ___________________
Vaccine: ___________________  Due: ___________________

Notes: ________________________________________

Last updated: ____________  By: ____________`,
    faqs: [
      { q: "How often does my dog need vaccines?", a: "Core vaccines (rabies, DHPP) are typically given at 1 year after puppy series, then every 3 years for most adult dogs. Non-core vaccines like Bordetella may require annual or biannual boosters depending on exposure. Always follow your vet's recommendation — AAHA publishes updated vaccination guidelines every few years." },
      { q: "What is a rabies certificate and where do I get one?", a: "A rabies certificate is an official document signed by the administering vet confirming your pet received a rabies vaccination. You receive it at the time of vaccination. Keep the original — boarding facilities, groomers, and some states require the signed original, not a photocopy." },
      { q: "My boarding facility requires vaccines — is this form sufficient?", a: "This template is for your personal records. Boarding facilities typically want to see official vet-issued certificates (especially the signed rabies certificate) or a letter from your vet confirming current vaccination status. Bring both this record (for your reference) and your official certificates." },
    ],
    relatedSlugs: ["pet-medical-history-template", "pet-health-record-template", "pet-sitting-contract-template-free"],
    downloadFormats: ["PDF", "Google Docs", "Printable A4"],
  },

  {
    slug: "pet-health-record-template",
    title: "Pet Health Record Template (Free, Comprehensive)",
    seoTitle: "Pet Health Record Template — Free Download 2026",
    shortTitle: "Pet Health Record",
    seoDescription: "Free comprehensive pet health record template. Tracks vet visits, weight, medications, diagnoses, and preventative care for dogs and cats. Editable PDF and Word.",
    icon: "📋",
    tier: 2,
    category: "Health Records",
    targetKeywords: ["pet health record template", "pet medical record template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "5 Min Read",
    quickAnswer: "A pet health record template is an ongoing log of every vet visit, diagnosis, weight measurement, and preventative care event in your pet's life — a complete health timeline in one document.",
    intro: `A vaccination record tells you when your pet last had their shots. A health record tells you everything. Weight trends over time. When that recurring ear infection first appeared. Which antibiotic worked last time and which caused a stomach upset. What the vet said at the last annual and what they recommended for follow-up.

This information is invaluable when you switch vets, move cities, or face a complex health situation where history matters. Keep this record updated after every vet visit.`,
    whenYouNeedIt: [
      "Managing a pet with a chronic condition (allergies, diabetes, arthritis)",
      "Switching vets or moving to a new city",
      "Tracking a puppy or kitten's growth and development",
      "Preparing for senior pet appointments where history is especially important",
    ],
    whatToInclude: [
      { title: "Visit log", items: ["Date, clinic, vet name, reason for visit", "Findings / diagnosis", "Treatment prescribed", "Follow-up required"] },
      { title: "Weight log", items: ["Date, weight in lbs/kg", "Trend note (stable, gaining, losing)", "BCS (Body Condition Score) if recorded by vet"] },
      { title: "Preventative care", items: ["Flea/tick prevention: product, dose, dates", "Heartworm prevention: product, dose, dates", "Dental cleanings with dates"] },
      { title: "Test results", items: ["Bloodwork dates and summary findings", "Urinalysis, faecal, or imaging results", "Heartworm test dates and results"] },
    ],
    stateNotes: `No state-specific legal requirements. Keep this document alongside your official vet records — request copies of bloodwork and imaging reports from your vet to attach here.`,
    templateText: `PET HEALTH RECORD

Pet Name: _____________________  Breed: _______________
DOB: _________  Sex: ___  Microchip #: _______________
Owner: _____________________  Phone: ___________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VET VISIT LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date | Clinic / Vet | Reason | Findings / Diagnosis | Treatment | Follow-up
-----|-------------|--------|---------------------|-----------|----------
     |             |        |                     |           |
     |             |        |                     |           |
     |             |        |                     |           |
     |             |        |                     |           |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEIGHT LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date | Weight | BCS (1–9) | Notes
-----|--------|-----------|------
     |        |           |
     |        |           |
     |        |           |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PREVENTATIVE CARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Flea/Tick Product: _______________  Dose: ___  Dates applied: ___________
Heartworm Product: _______________  Dose: ___  Dates given: ___________
Last dental cleaning: _______________  Next due: _______________
Last faecal test: _______________  Result: _______________
Last heartworm test: _______________  Result: _______________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOODWORK & TEST RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date | Test | Key Findings | Vet Recommendation
-----|------|-------------|--------------------
     |      |             |
     |      |             |

Notes / Ongoing conditions: ________________________________
________________________________`,
    faqs: [
      { q: "What's the difference between this and a vaccination record?", a: "A vaccination record tracks only vaccines. This health record tracks the full picture: every vet visit, weight trend, preventative care, and test result. Use both — the vaccination record for quick reference and this for comprehensive history." },
      { q: "Should I keep digital or paper records?", a: "Both. Keep a printed copy in your pet's folder at home (useful for emergencies when phones die or apps are unavailable) and a digital copy in your email or cloud storage for easy sharing with vets. Some vet clinics also offer client portals — check whether yours does." },
    ],
    relatedSlugs: ["pet-vaccination-record-template", "pet-medical-history-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)", "Printable A4"],
  },

  {
    slug: "pet-adoption-certificate-template",
    title: "Pet Adoption Certificate Template (Free, Printable)",
    seoTitle: "Pet Adoption Certificate Template — Free Printable 2026",
    shortTitle: "Adoption Certificate",
    seoDescription: "Free pet adoption certificate template for rescues, shelters, and foster families. Beautiful printable certificate commemorating a pet's adoption day. Editable PDF and Word.",
    icon: "🎓",
    tier: 2,
    category: "Adoption & Rehoming",
    targetKeywords: ["pet adoption certificate template", "pet adoption agreement template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "4 Min Read",
    quickAnswer: "A pet adoption certificate is a commemorative document given to adopters at the time of adoption — a meaningful keepsake marking the day their pet officially joined the family. Rescues and shelters often issue them alongside the legal adoption contract.",
    intro: `An adoption certificate is not a legal document — it's a gift. It marks the moment a pet's life changed, and it gives adopters something tangible to celebrate and keep. Rescues that issue beautiful, well-designed certificates report that adopters share them on social media, frame them, and remember the rescue fondly for years.

If you're running a rescue, this small gesture generates word-of-mouth, builds emotional connection to your organisation, and celebrates the lives you're changing. If you're an adopter whose rescue didn't issue one, print one yourself.`,
    whenYouNeedIt: [
      "A rescue issuing a commemorative certificate at adoption",
      "A foster family celebrating a successful placement",
      "An adopter wanting a personal keepsake of adoption day",
    ],
    whatToInclude: [
      { title: "Certificate fields", items: ["Pet's name", "Adoption date", "Adopter's name(s)", "Rescue or shelter name", "Optional: a short message or pledge from the adopter"] },
    ],
    stateNotes: `This is a commemorative document only and has no legal weight. For the legally binding adoption agreement, use our Pet Adoption Contract Template.`,
    templateText: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

          CERTIFICATE OF ADOPTION

          This certifies that on this day,

          [ADOPTION DATE]

          [PET NAME]

          [Breed / Species]

          was officially adopted by

          [ADOPTER NAME(S)]

          and welcomed into a loving forever home.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

          Issued by:
          [RESCUE / SHELTER NAME]

          Authorised by: _________________________

          "Every pet deserves a family. Every family deserves the right pet."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADOPTER'S PLEDGE (OPTIONAL):

I, [ADOPTER NAME], pledge to provide [PET NAME] with a loving home, proper veterinary care,
and a life full of joy for as long as I am able.

Signature: _________________________ Date: ____________`,
    faqs: [
      { q: "Is an adoption certificate a legal document?", a: "No. It is a commemorative keepsake only. The legal agreement is a separate pet adoption contract (signed by both parties) that covers adoption fees, return policy, and care obligations. Both documents should be issued at adoption." },
      { q: "Can I make this certificate look more professional?", a: "Yes — open the Word or Google Docs version and add your rescue's logo, change the fonts, and add a border or graphic. Canva also has free certificate templates that you can customise. The more beautiful the certificate, the more likely adopters are to frame it and share it." },
    ],
    relatedSlugs: ["pet-adoption-contract-template", "pet-medical-history-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)", "Printable landscape"],
  },

  {
    slug: "pet-trust-template",
    title: "Pet Trust Template: Protecting Your Pet in Your Will",
    seoTitle: "Pet Trust Template — Free Guide & Template 2026",
    shortTitle: "Pet Trust",
    seoDescription: "Free pet trust template with guidance on how to legally provide for your pet after you die. Covers trustee selection, care instructions, funding, and what happens to remaining assets.",
    icon: "📜",
    tier: 2,
    category: "Legal & Ownership",
    targetKeywords: ["pet trust template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "9 Min Read",
    quickAnswer: "A pet trust is a legally recognised trust that sets aside funds for a named pet's care and designates a trustee to manage those funds and a caregiver to provide daily care — all continuing after the pet owner's death. Pet trusts are now recognised in all 50 U.S. states.",
    intro: `Your dog or cat will almost certainly outlive their current living situation — whether through your death, incapacity, or a life change you haven't anticipated. Without a legal plan, your pet becomes personal property in your estate: subject to distribution according to a will that may not reflect your wishes, or worse, surrendered to a shelter.

A pet trust is the most legally robust way to ensure your pet is cared for by someone you trust, with adequate funds, according to instructions you've left behind. This guide explains how pet trusts work and provides a template you can take to an estate attorney to formalise.`,
    whenYouNeedIt: [
      "Estate planning — anyone who owns a pet should have a plan",
      "Elderly pet owners or those with a health condition",
      "Owners of long-lived pets (parrots, tortoises, horses) who may outlive multiple owners",
      "Anyone who wants to ensure their pet is not surrendered to a shelter in the event of their incapacity or death",
    ],
    whatToInclude: [
      { title: "Trust funding", items: ["How much money is set aside for the pet's care", "Where the funds are held", "What happens to remaining funds when the pet dies"] },
      { title: "Trustee", items: ["Who manages the money", "Trustee compensation (if any)", "What the trustee can and cannot spend funds on", "Successor trustee if primary cannot serve"] },
      { title: "Caregiver", items: ["Who provides daily care", "Whether caregiver and trustee are the same person (not recommended)", "Caregiver compensation", "Backup caregiver"] },
      { title: "Care instructions", items: ["Diet and feeding routine", "Vet contacts and medical history", "Exercise and enrichment needs", "Any behavioural notes"] },
      { title: "Enforcement", items: ["Who monitors compliance", "What happens if caregiver is not meeting the pet's needs", "How disputes are resolved"] },
    ],
    stateNotes: `**All 50 states:** Pet trusts are legally recognised in all U.S. states and the District of Columbia under the Uniform Trust Code or equivalent state statutes. They are enforceable by a court.\n\n**Recommended funding:** A common rule of thumb is 3–5 years of annual pet care costs. For a healthy dog costing $1,500/year, a $5,000–$7,500 trust is reasonable. For exotic, long-lived, or high-need animals, fund proportionally more.\n\n**Do not rely on a will alone:** Leaving your pet "to" someone in a will is not a pet trust. A will can be contested, takes months to probate, and provides no ongoing enforcement. A trust takes effect immediately upon your incapacity or death.`,
    templateText: `PET TRUST AGREEMENT

This Pet Trust Agreement ("Trust") is established by [YOUR FULL NAME] ("Grantor"), residing at [ADDRESS], effective [DATE / upon the Grantor's death or incapacity].

1. PURPOSE
The purpose of this Trust is to provide for the care, maintenance, and welfare of the Grantor's pet(s) described in Section 2, during each pet's lifetime.

2. COVERED PETS
This Trust covers the following pets:
  Name: _____________ Species/Breed: _____________ DOB: _____________
  Microchip #: _____________ Current Vet: _____________

Additional pets may be added by written amendment during the Grantor's lifetime.

3. TRUSTEE
Primary Trustee: [FULL NAME], residing at [ADDRESS]
Phone: [PHONE] | Email: [EMAIL]

Successor Trustee (if primary cannot serve): [FULL NAME], residing at [ADDRESS]

The Trustee shall hold and manage Trust assets for the benefit of the pet(s) and shall make distributions to the Caregiver as needed for the pet(s)' care.

Trustee compensation: $[AMOUNT] per [month/year] / None.

4. CAREGIVER
Primary Caregiver: [FULL NAME], residing at [ADDRESS]
Phone: [PHONE] | Email: [EMAIL]
Relationship to Grantor: [RELATIONSHIP]

Backup Caregiver: [FULL NAME], residing at [ADDRESS]

The Caregiver shall provide daily care for the pet(s) in accordance with Section 6. The Trustee shall reimburse or pay directly for reasonable expenses incurred by the Caregiver on behalf of the pet(s).

Caregiver compensation: $[AMOUNT] per [month/year] / None.

5. TRUST FUNDING
Initial Trust assets: $[AMOUNT] / [describe asset: e.g., "the sum of $10,000 from account ending in ####"]
Ongoing funding: [Describe any additional sources, e.g., life insurance proceeds]
Disbursement limit: The Trustee may disburse up to $[AMOUNT] per [month/year] for routine care without further authorisation.
Emergency expenditures over $[AMOUNT] require notification to [PERSON].

6. CARE INSTRUCTIONS
Veterinarian: [VET CLINIC NAME] | Phone: [PHONE] | Address: [ADDRESS]
Emergency Vet: [CLINIC NAME] | Phone: [PHONE]

Diet: [BRAND, AMOUNT, FREQUENCY]
Exercise: [ROUTINE]
Medications: [LIST CURRENT MEDICATIONS AND DOSES]
Behavioural notes: [RELEVANT BEHAVIOURS, FEARS, PREFERENCES]
Special care needs: [ANY SPECIFIC REQUIREMENTS]

Full care instructions are attached as Exhibit A (recommended).

7. TERMINATION
This Trust terminates upon the death of the last surviving pet named herein. Upon termination, remaining Trust assets shall be distributed to: [NAME OF PERSON OR CHARITY].

If the Grantor wishes remaining assets to benefit an animal rescue, suggested organisations include: [NAME AND EIN OF PREFERRED CHARITY].

8. ENFORCEMENT
[NAME OF ENFORCER OR REMAINDERMAN] shall have the right to petition a court of competent jurisdiction to enforce the terms of this Trust if the Trustee or Caregiver fails to meet their obligations.

9. GOVERNING LAW
This Trust is governed by the laws of the State of [STATE].

Grantor Signature: _______________________ Date: ___________
Print Name: _______________________

Notary (recommended): _______________________ Date: ___________`,
    faqs: [
      { q: "Do I need a lawyer to create a pet trust?", a: "To create a legally binding, court-enforceable pet trust, yes — working with an estate attorney is strongly recommended. This template is a starting-point document for your attorney consultation, not a substitute for legal advice. The drafting cost is typically $300–$800 as part of an overall estate plan." },
      { q: "Can I just leave my pet to someone in my will?", a: "You can name a beneficiary for your pet in a will, but a will alone has significant limitations: it takes months to probate, it can be contested, and it provides no ongoing enforcement or care instructions. A pet trust is more robust and takes effect immediately upon your incapacity." },
      { q: "How much should I fund a pet trust?", a: "A common guideline is to estimate annual care costs × (expected remaining lifespan + 2 buffer years). A healthy 3-year-old dog with ~10 years remaining, costing $1,500/year, would suggest a $18,000 trust minimum. Over-funding is generally better than under-funding — remaining assets can go to a named charity." },
    ],
    relatedSlugs: ["pet-custody-agreement-template", "pet-adoption-contract-template"],
    downloadFormats: ["PDF", "Google Docs", "Word (.docx)"],
  },

  {
    slug: "lost-pet-poster-template",
    title: "Lost Pet Poster Template (Free, Printable & Digital)",
    seoTitle: "Lost Pet Poster Template — Free Printable & Digital 2026",
    shortTitle: "Lost Pet Poster",
    seoDescription: "Free lost pet poster template for missing dogs and cats. Printable flyer + digital version for social media. Designed to include the right information to maximise your chance of finding your pet.",
    icon: "🔍",
    tier: 2,
    category: "Lost & Found",
    targetKeywords: ["lost pet poster template", "lost pet flyer template free", "free lost pet template", "free missing pet flyer template"],
    publishDate: "April 2026",
    lastUpdated: "April 2026",
    readTime: "6 Min Read",
    quickAnswer: "An effective lost pet poster needs four things above everything else: a clear recent photo, your contact phone number in large text, the last known location and date, and a reward mention (even 'reward offered' without an amount increases response rates significantly).",
    intro: `Every hour matters when a pet goes missing. The fastest action you can take is getting a well-designed poster up in the neighbourhood and shared digitally — but a poorly designed poster (blurry photo, too much text, tiny contact number) gets ignored.

This template is designed based on what actually generates tips: maximum visual impact, minimum reading friction. The phone number is the largest element. The photo is high-contrast. The key details are scannable at a distance.

Download, fill in your pet's details, print in colour at A4 or letter size, and post at eye level in a 1-mile radius of the last sighting. Share the digital version to Nextdoor, local Facebook groups, and Instagram.`,
    whenYouNeedIt: [
      "Your pet has escaped or gone missing",
      "You need something to print and post in your neighbourhood immediately",
      "You need a digital version to share on social media and Nextdoor",
      "You found someone else's pet and need a 'found pet' version (simply change the header)",
    ],
    whatToInclude: [
      { title: "Must-haves (above the fold)", items: ["Large bold header: LOST DOG / LOST CAT / FOUND PET", "Clear recent photo (cropped close to the pet's face)", "Phone number in the largest font on the page", "Reward mentioned (even without amount)"] },
      { title: "Key details", items: ["Pet name, species, breed, colour", "Age, sex, weight (approx.)", "Distinguishing features (markings, missing eye, limps)", "Last seen: date, time, specific location"] },
      { title: "Context that helps", items: ["Collar / tag / microchip details", "Whether the pet is fearful and may hide", "Any medical needs that create urgency", "Last known direction of travel if known"] },
    ],
    stateNotes: `**Microchip reunions:** If your pet is microchipped, call the microchip registry immediately and flag them as missing — this is separate from postering and takes 2 minutes. Also contact local vets, groomers, and shelters directly (don't assume they check online registries). In the U.S., HomeAgain and PetLink are the largest registries.\n\n**Nextdoor and Facebook:** Posting in local neighbourhood groups dramatically extends reach beyond physical posters. Include your location, pet name, and contact number in every post.`,
    templateText: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     ██╗      ██████╗ ███████╗████████╗
     ██║     ██╔═══██╗██╔════╝╚══██╔══╝
     ██║     ██║   ██║███████╗   ██║
     ██║     ██║   ██║╚════██║   ██║
     ███████╗╚██████╔╝███████║   ██║
     ╚══════╝ ╚═════╝ ╚══════╝   ╚═╝

     [LOST DOG / LOST CAT / FOUND PET]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     [ATTACH CLEAR, CLOSE-UP PHOTO HERE]
     — print in colour for best results —

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     CALL OR TEXT:
     📞 [YOUR PHONE NUMBER — LARGE FONT]

     REWARD OFFERED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PET DETAILS:
Name: [PET NAME] — responds to "[CALL NAME]"
Species/Breed: [BREED AND COLOUR]
Age: [AGE]   Sex: [M/F]   Weight: ~[WEIGHT] lbs

Distinguishing features:
[e.g., White spot on chest / Missing left ear / Limps on right front leg]

Collar: [COLOUR AND TYPE / No collar]
Microchipped: Yes / No

LAST SEEN:
Date & Time: [DATE], approximately [TIME]
Location: [STREET, NEAREST CROSS STREET, NEIGHBOURHOOD]
Direction: [If known — e.g., "heading north on Oak Street"]

IMPORTANT:
[PET NAME] is [friendly / shy and may hide from strangers / has a medical condition and needs medication — please do not delay calling].

If you see [PET NAME], please do not chase — call or text immediately.
Email: [YOUR EMAIL]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Also posted on Nextdoor · [LOCAL FB GROUP] · Furrly Lost & Found
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    faqs: [
      { q: "Should I include the reward amount on the poster?", a: "It's generally recommended to say 'Reward offered' without specifying the amount. Specifying a large amount can attract dishonest responses; specifying a small amount may reduce response rate. 'Reward offered' captures the motivational benefit without anchoring the amount." },
      { q: "What size should I print lost pet posters?", a: "A4 (210x297mm) or US Letter (8.5x11in) for general posting. Consider printing a few in A3/11x17 for high-traffic spots. Laminate posters at key locations (traffic lights, park entrances) to protect them from weather." },
      { q: "Where should I post lost pet flyers?", a: "Within 1 mile of the last sighting: telephone poles, community boards, pet store windows, vet clinic notice boards. Also post at local shelters, groomers, daycares, and dog parks. Digitally: Nextdoor, local Facebook community groups, Instagram with your location tagged, and PetFBI.org." },
      { q: "My pet is shy and might not come when called. What should I note on the poster?", a: "Include a note like 'Very shy — please do not chase, just call us immediately.' Include your emergency contact prominently. Ask callers to observe and report the location rather than attempting to catch the pet — a frightened pet will run from strangers, and a tip about their location is more useful than a failed catch attempt." },
    ],
    relatedSlugs: ["pet-medical-history-template", "pet-custody-agreement-template"],
    downloadFormats: ["PDF (print)", "PNG (social media)", "Google Docs", "Word (.docx)"],
  },
];

export const templatesByTier = {
  tier1: templateDocs.filter(t => t.tier === 1),
  tier2: templateDocs.filter(t => t.tier === 2),
  tier3: templateDocs.filter(t => t.tier === 3),
};

export const templateCategories = [...new Set(templateDocs.map(t => t.category))];
