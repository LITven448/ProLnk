/*
 * ============================================================================
 *  CLIENT-SAFE KNOWLEDGE ONLY
 * ----------------------------------------------------------------------------
 *  Everything the support chatbot is allowed to say to clients lives in this
 *  file. It is the ONE source of truth for the bot's knowledge.
 *
 *  Edit this file to change what the bot tells clients.
 *
 *  NEVER add any of the following to this file (the bot must never know them):
 *    - Company financials, revenue, profit, or margins
 *    - Financial projections or forecasts
 *    - Company valuation
 *    - Fundraising, investors, or cap-table information
 *    - Internal commission economics — what ProLnk earns/retains beyond the
 *      single client-level "minimum 20% retained" fact that is already public
 *    - Network/cascade override economics or multi-level referral math
 *    - Internal business strategy or roadmap
 *    - How the AI / internal agents work internally
 *    - Anything else not appropriate to hand directly to a customer
 *
 *  If you wouldn't print it on the public marketing site, it does NOT go here.
 * ============================================================================
 */

export type SupportBrand = "prolnk" | "trustypro" | "advertiser";

export interface BrandKnowledge {
  /** One-line description of who this assistant serves. */
  audience: string;
  /** The support email clients should be directed to. */
  supportEmail: string;
  /** Free-form, client-safe topic sections the bot may draw from. */
  topics: Record<string, string>;
  /** Curated client-safe FAQs (pulled from the public marketing pages). */
  faqs: Array<{ q: string; a: string }>;
}

export type SupportKnowledge = Record<SupportBrand, BrandKnowledge>;

// ── ProLnk (pro-facing) ──────────────────────────────────────────────────────
const PROLNK: BrandKnowledge = {
  audience:
    "Home service professionals (pros) considering or using ProLnk — the pro-facing side of the network that sends verified homeowner leads to licensed pros.",
  supportEmail: "hello@prolnk.xyz",
  topics: {
    whatIsProLnk:
      "ProLnk is an AI-matched home-service lead network. It sends verified, ready-to-buy homeowner leads to licensed home service professionals. The loop is simple: a pro joins, gets verified, gets matched with homeowner leads in their area, does the work, and gets paid. Currently launching in the DFW (Dallas–Fort Worth) area, expanding nationwide.",
    howAProJoins:
      "A pro applies, completes a one-time background check, and once it clears their account activates automatically. They then start receiving matched homeowner leads in their service area. It's month-to-month — no long-term contract, cancel anytime.",
    plans:
      "Subscription plans, billed monthly, month-to-month (cancel anytime): Core $99/mo (keep 40% of the platform fee), Pro $149/mo (keep 50%), Business $249/mo (keep 60%, unlocks commercial jobs / Briefcase with ProPass verification). Scout is a separate $99/mo program focused on sourcing and referring.",
    freeTrial:
      "All plans include a 90-day FREE trial with no credit card required for the subscription. You get full platform access from day one and subscription billing begins on day 91. The one-time $35 background check fee applies at the start of your trial.",
    backgroundCheck:
      "A one-time $35 background check is required at onboarding, run through Checkr (the same service used by Uber, Lyft, and DoorDash). After you apply you'll get a secure link to complete it; results usually come back in 24–48 hours and your account activates automatically when it clears. It's a one-time cost — no annual renewal.",
    commissionClientLevel:
      "When ProLnk generates a lead that closes, ProLnk takes a small platform fee — 3–12% of the completed job value, varying by trade type and job size, in line with typical industry referral rates. Of that fee, you keep your tier's percentage (Core 40%, Pro 50%, Business 60%). ProLnk retains a minimum of 20% of that fee to cover platform operations, AI analysis, and lead sourcing. You always keep 100% of what you charge the homeowner — the platform fee is collected separately. Commissions are paid monthly and tracked in real time.",
    gettingPaid:
      "ProLnk tracks payment through to completion — whether the homeowner pays all at once, in installments, or on net-30/60/90 terms. Your commission is released once payment clears, not when the job is invoiced. A job is marked complete when the homeowner confirms completion in the app or payment is received in full.",
    commercialProPass:
      "Commercial job access is available on the Business plan ($249/mo) and requires ProPass verification — a one-time credential check confirming your commercial trade license and liability insurance. Once verified you unlock the commercial job board (Briefcase) for larger commercial and multi-trade projects.",
    upgradesDowngrades:
      "You can upgrade at any time and your new keep rate applies immediately to future completed jobs. Downgrades take effect at the end of your billing cycle.",
    howItRunsForYou:
      "You don't have to change how you run your business. The platform fits around your existing workflow and integrates with common field service management software (Jobber, Housecall Pro, ServiceTitan, and others). ProLnk handles lead matching and payment tracking.",
  },
  faqs: [
    {
      q: "How does the commission pool work?",
      a: "ProLnk takes 3–12% of the completed job value as a platform fee (varies by trade type and job size — in line with typical industry referral rates). Of that pool, you keep your tier's percentage. ProLnk always retains a minimum of 20% to cover platform operations, AI analysis, and lead sourcing. You keep 100% of everything you charge the homeowner — the platform fee is collected separately.",
    },
    {
      q: "Is there a background check requirement?",
      a: "Yes. All ProLnk members must pass a background check before accessing leads. The one-time $35 fee is paid at onboarding via Checkr (same service used by Uber, Lyft, and DoorDash). After you apply you'll get a secure link to complete it; most results come back in 24–48 hours and your account activates automatically if it clears. It's a one-time cost — no annual renewal.",
    },
    {
      q: "When do I get paid?",
      a: "ProLnk tracks payments through to completion — whether the homeowner pays all at once, in installments, or on net-30/60/90 terms. Your commission is released once payment clears, not when the job is invoiced.",
    },
    {
      q: "What counts as a completed job?",
      a: "A job is marked complete when the homeowner confirms completion in the app or payment is received in full.",
    },
    {
      q: "How do I access commercial jobs?",
      a: "Commercial job access is available on the Business plan ($249/mo) and requires ProPass verification — a one-time check of your commercial trade license and liability insurance. Once verified, you unlock the commercial job board (Briefcase) for larger commercial and multi-trade projects.",
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Yes. You can upgrade any time and your new keep rate applies immediately to future completed jobs. Downgrades take effect at the end of your billing cycle.",
    },
    {
      q: "What is the 90-day free trial?",
      a: "All plans include a 90-day free trial with no credit card required for the subscription. The one-time $35 background check fee applies at the start of your trial. You get full platform access from day one and subscription billing begins on day 91.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No contracts. All plans are month-to-month. Cancel any time before your next billing date.",
    },
    {
      q: "Do I have to change how I run my business?",
      a: "No. The platform fits around your existing workflow and integrates with field service management software like Jobber, Housecall Pro, and ServiceTitan. ProLnk handles lead matching and payment tracking.",
    },
  ],
};

// ── TrustyPro (homeowner-facing) ─────────────────────────────────────────────
const TRUSTYPRO: BrandKnowledge = {
  audience:
    "Homeowners using TrustyPro — the homeowner-facing side of the network that connects them with trusted, verified home service professionals.",
  supportEmail: "support@trustypro.io",
  topics: {
    whatIsTrustyPro:
      "TrustyPro is a homeowner platform (launching in the DFW area, expanding nationwide). It helps you build a complete profile of your home and connects you with verified, certified pros for any maintenance or improvement project. It's completely free for homeowners — always. The platform is funded by a small fee paid by pros when they close a job, never by you.",
    requestService:
      "You describe what you need (or upload photos of your home for an AI-powered scan of potential repairs and maintenance needs), and TrustyPro matches you with verified pros in your local area. You then receive quotes from the matched pros.",
    homeScansVault:
      "You can upload photos for a 'home scan' that highlights potential repairs and maintenance needs. Your 'Home Health Vault' is a private record of your home's repairs, maintenance, and improvements over time. Your home profile is yours — TrustyPro only shares your information with pros you explicitly request quotes from.",
    proVerification:
      "Every TrustyPro Certified pro is background-checked, license-verified, insured, and reviewed by the network before they can receive leads. They earn the badge only after passing onboarding.",
    gettingStarted:
      "Join the waitlist to be notified when your area is live. After you join you'll get a confirmation email and a private home profile built with you. As pros are onboarded in your area, TrustyPro matches your home with the right professionals for your planned projects — no spam, no calls from random contractors.",
    privacy:
      "Your home data is private. Your home profile belongs to you, and your information is only shared with pros you explicitly request quotes from. You can opt in or out of marketing communications at any time.",
    cost: "TrustyPro is completely free for homeowners. The platform is funded by a small fee paid by the pro when a job closes — never by you.",
  },
  faqs: [
    {
      q: "What is TrustyPro?",
      a: "TrustyPro is a homeowner platform launching in DFW. We help you build a complete profile of your home and connect you with verified, certified pros for any maintenance or improvement project. Free for homeowners — always. We're funded by a small fee paid by pros when they close a job.",
    },
    {
      q: "When does TrustyPro launch?",
      a: "We're onboarding our founding contractor network now. Homeowner access opens in waves as we verify enough TrustyPro Certified pros in each ZIP code. Join the waitlist to be notified the moment your area is live.",
    },
    {
      q: "What happens after I join the waitlist?",
      a: "You'll get a confirmation email and a private home profile we build together. As we onboard pros in your area, we'll match your home with the right professionals for your planned projects — no spam, no calls from random contractors.",
    },
    {
      q: "How are TrustyPro contractors verified?",
      a: "Every TrustyPro Certified pro is background-checked, license-verified, insured, and reviewed by our network. They earn the badge only after passing onboarding.",
    },
    {
      q: "Is TrustyPro free for homeowners?",
      a: "Yes — using TrustyPro to plan, document, and find pros is completely free. The platform is funded by a small fee paid by the pro when a job closes — never by you.",
    },
    {
      q: "Will my home data be private?",
      a: "Yes. Your home profile is yours. We only share your information with pros you explicitly request quotes from. You can opt in or out of marketing communications at any time.",
    },
  ],
};

// ── Advertiser (ProLnk Media) ────────────────────────────────────────────────
const ADVERTISER: BrandKnowledge = {
  audience:
    "Potential advertising partners — real estate agents, mortgage brokers, title companies, insurance agents, home warranty companies, and home service professionals — exploring featured advertising on ProLnk Media.",
  supportEmail: "hello@prolnk.xyz",
  topics: {
    whatIsProLnkMedia:
      "ProLnk Media is the advertising side of the network. ProLnk connects home service professionals across the DFW area (expanding nationwide). Featured advertisers appear as banners on the TrustyPro homeowner dashboard and scan results pages, reaching homeowners actively managing home projects, repairs, and improvements.",
    tiers:
      "Three advertising tiers: Spotlight ($149/mo), Featured ($299/mo), and Exclusive ($599/mo). The Exclusive tier includes territory exclusivity — no competitors in your ZIP codes. Impression and click tracking are included in all tiers.",
    applying:
      "Applications are reviewed within 1–2 business days. To get started, submit the application form on the 'Advertise With Us' page and the team will follow up.",
    audience:
      "The target audience is homeowners actively managing home projects, repairs, and improvements.",
  },
  faqs: [
    {
      q: "Where do my ads appear?",
      a: "Featured advertisers appear as banners on the TrustyPro homeowner dashboard and scan results pages, in front of homeowners actively managing home projects and repairs.",
    },
    {
      q: "What are the advertising tiers?",
      a: "Spotlight ($149/mo), Featured ($299/mo), and Exclusive ($599/mo). Exclusive includes territory exclusivity — no competitors in your ZIP codes. Impression and click tracking are included in all tiers.",
    },
    {
      q: "How long does approval take?",
      a: "Applications are reviewed within 1–2 business days. Submit the application form on this page and the team will follow up.",
    },
  ],
};

export const SUPPORT_KNOWLEDGE: SupportKnowledge = {
  prolnk: PROLNK,
  trustypro: TRUSTYPRO,
  advertiser: ADVERTISER,
};

/**
 * Renders one brand's client-safe knowledge into a plain-text block suitable
 * for embedding in a system prompt. The chatbot may ONLY answer from this.
 */
export function renderKnowledge(brand: SupportBrand): string {
  const k = SUPPORT_KNOWLEDGE[brand];
  const topicLines = Object.entries(k.topics)
    .map(([, text]) => `- ${text}`)
    .join("\n");
  const faqLines = k.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  return [
    `AUDIENCE: ${k.audience}`,
    ``,
    `APPROVED FACTS:`,
    topicLines,
    ``,
    `APPROVED FAQS:`,
    faqLines,
    ``,
    `SUPPORT / ESCALATION: To reach a human, the visitor can click "Talk to a human" in the chat or email ${k.supportEmail}.`,
  ].join("\n");
}
