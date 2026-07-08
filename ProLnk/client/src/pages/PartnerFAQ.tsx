import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  ChevronDown, ChevronUp, Search, MessageCircle,
  Rocket, DollarSign, Network, Wrench, Star, HelpCircle, ShieldAlert, Users,
} from "lucide-react";

type FAQ = {
  q: string;
  a: string;
};

type Category = {
  id: string;
  label: string;
  icon: any;
  color: string;
  faqs: FAQ[];
};

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Rocket,
    color: "text-blue-400",
    faqs: [
      {
        q: "How do I get my first lead?",
        a: "Once you complete your profile (license, insurance COI, and service area), ProLnk's matching algorithm will begin routing homeowner requests to you. Most partners receive their first lead within 7–14 days of a complete profile. Make sure your service area zip codes are accurate and your trade specialties are fully listed — the algorithm weighs both heavily.",
      },
      {
        q: "Is early access still open?",
        a: "Yes — early access is open. Join the waitlist now and you'll be among the first partners activated when matching goes live in DFW. Applications are reviewed in the order received, and you can check your position anytime on the waitlist status page.",
      },
      {
        q: "What do I need to sign up as a partner?",
        a: "To fully activate your account you need: (1) a valid state contractor license for each trade you offer, (2) a Certificate of Insurance (COI) showing at least $1M general liability, (3) a completed W-9 for tax purposes, and (4) a linked bank account for commission payouts via Stripe Connect. You can start the signup process without all documents and upload them within 30 days.",
      },
      {
        q: "Is there a free trial?",
        a: "New members receive a free trial before their subscription begins — plans start at $99/month. You will not be charged until your trial ends, and you can cancel anytime during the trial with no obligation.",
      },
    ],
  },
  {
    id: "commission",
    label: "Commission & Payments",
    icon: DollarSign,
    color: "text-teal-400",
    faqs: [
      {
        q: "How does the commission keep rate work?",
        a: "The pro completing the job keeps a share of the platform fee ProLnk collects — 40% on Core, 50% on Pro, and 60% on Business. For example, if ProLnk charges a $500 platform fee on a roofing job and you're on the Business plan, you receive $300 back and ProLnk retains $200. The platform fee itself is 6–15% of the job value, so your keep rate grows with your plan.",
      },
      {
        q: "When do I get paid?",
        a: "Commissions are paid weekly every Thursday via Stripe Connect to your linked bank account. The minimum payout threshold is $25. If your balance is below $25, it rolls over to the next week. All payments are fully itemized in your Commission Ledger with job-level detail.",
      },
      {
        q: "What happens if I dispute a commission?",
        a: "Submit a written dispute through your Commission Ledger within 30 days of the payment date. ProLnk's Finance team will investigate and respond within 10 business days. While your dispute is under review, the disputed amount is held in escrow — no clawback occurs until the dispute is resolved. If you're unsatisfied with the resolution, you may escalate to binding AAA arbitration per the Partner Agreement.",
      },
      {
        q: "Can a commission be clawed back?",
        a: "Yes, but only in specific circumstances: if the underlying job is cancelled or disputed by the homeowner after payment, or if the job is found to be fraudulent. ProLnk will always send written notice at least 5 business days before any clawback, giving you time to respond. Clawbacks are deducted from future payments rather than charged back to your bank account.",
      },
      {
        q: "Do I need to submit a W-9?",
        a: "Yes. A valid W-9 (for U.S. partners) is required before your first commission payment is released. If you don't submit a W-9, IRS rules require ProLnk to withhold 24% backup withholding tax on all payments. You'll also receive a Form 1099-NEC in January for any year in which your total commissions equal or exceed $600.",
      },
    ],
  },
  {
    id: "network-income",
    label: "Network Income",
    icon: Network,
    color: "text-purple-400",
    faqs: [
      {
        q: "What is the 4-level network income?",
        a: "Network Income is a multi-level override commission system available to members. When partners you recruit complete jobs, you earn a percentage of the platform fees from those jobs — 4 levels deep. Level 1 (direct recruits): 7% of job fees. Level 2: 4%. Level 3: 2%. Level 4: 1%. You also earn subscription overrides: 12% / 6% / 3% / 1.5% on the monthly subscriptions of each level. This is separate from your direct job commissions.",
      },
      {
        q: "Is Network Income an MLM?",
        a: "Network Income is a legitimate override commission structure common in many B2B platforms. Critically, earnings are derived entirely from real job completions and actual paid subscriptions — not from recruitment fees. No partner is required to recruit anyone. You can earn your full direct commission without ever recruiting a single person. ProLnk publishes an annual income disclosure statement in compliance with FTC guidelines.",
      },
      {
        q: "What are Origination Rights?",
        a: "When you help a homeowner enroll their home in the ProLnk Home Health Vault, you earn 5% of all platform fees generated by that home — permanently. If that home generates $10,000 in platform fees over 10 years, you earn $500. Origination Rights survive even if you later cancel your subscription, and they transfer to your estate. This is one of the most valuable long-term assets in the platform.",
      },
      {
        q: "How do I track my network's earnings?",
        a: "Your Network Income dashboard (in the Partner Portal under 'Network Tree') shows you a visual tree of all your recruited partners, their job volumes, and the override commissions you've earned at each level. You can drill down by level, partner, or date range. All Network Income is included in your weekly commission payout alongside direct commissions.",
      },
    ],
  },
  {
    id: "fsm",
    label: "FSM Integration",
    icon: Wrench,
    color: "text-orange-400",
    faqs: [
      {
        q: "Can I integrate my Jobber or HCP account?",
        a: "Yes. ProLnk supports native two-way sync with Jobber, Housecall Pro (HCP), ServiceTitan, and FieldEdge. Once connected, jobs completed in your FSM automatically sync to ProLnk — no manual entry required. Photos uploaded in your FSM are automatically ingested by ProLnk's AI Opportunity Engine. Setup takes about 5 minutes via the Integrations tab in your Partner Settings.",
      },
      {
        q: "What if I don't use FSM software?",
        a: "You can log jobs manually through the ProLnk platform or Field OS mobile app. Simply tap 'Log Job,' upload 2–5 photos, and enter the job details. The AI Opportunity Engine processes your photos within minutes and surfaces any detected opportunities. Manual logging is fully supported and produces the same commission results as FSM integration.",
      },
      {
        q: "Does FSM integration cost extra?",
        a: "No. FSM integration is included in all subscription tiers at no additional charge. ProLnk uses standard OAuth connections and read-only access to your FSM data for job syncing — we never modify your existing FSM records.",
      },
      {
        q: "What data does ProLnk pull from my FSM?",
        a: "ProLnk pulls: job completion status, invoice amounts, customer first name and city (not full address), and photos attached to the job. We never pull customer full addresses, contact information, or payment details from your FSM. A full data usage disclosure is available in the FSM Integration settings screen.",
      },
    ],
  },
  {
    id: "trustypro",
    label: "TrustyPro",
    icon: Star,
    color: "text-yellow-400",
    faqs: [
      {
        q: "What is the difference between ProLnk and TrustyPro?",
        a: "ProLnk is the partner network for service professionals — commission tracking, network income, and lead management. TrustyPro is the consumer-facing marketplace where homeowners find vetted service pros. As a ProLnk partner, you automatically have a public profile on TrustyPro's directory. The two platforms share the same backend — earnings, reviews, and job history appear on both.",
      },
      {
        q: "Do I need a separate TrustyPro account?",
        a: "No. Your ProLnk partner account automatically creates and manages your TrustyPro public profile. You can customize your TrustyPro listing (photos, bio, service highlights) from the ProLnk Partner Portal under 'My TrustyPro Profile.'",
      },
      {
        q: "How are TrustyPro reviews handled?",
        a: "Homeowners who receive service from you can leave a verified review on TrustyPro after job completion. Reviews are tied to confirmed jobs in the system — no anonymous or unverified reviews are allowed. You can respond publicly to any review from your Partner Portal. Reviews factor into your Partner Priority Score (PPS), which determines your lead routing priority.",
      },
    ],
  },
  {
    id: "objections",
    label: "Common Objections",
    icon: ShieldAlert,
    color: "text-rose-400",
    faqs: [
      {
        q: "I tried Angi and it didn't work. Why would ProLnk be different?",
        a: "This is the most common thing we hear — and it's a fair concern. Angi sells the same lead to multiple contractors simultaneously, creating a race to the bottom on price. ProLnk matches one contractor to one homeowner based on trade, availability, certifications, and location — and only after the homeowner has confirmed the specific service they need. You're not bidding against five other people for a lead that may have already booked someone. The model is structurally different. If Angi burned you, we understand — but the reason it burned you is exactly what ProLnk was built to fix.",
      },
      {
        q: "I don't have time to upload photos between jobs. Is this really worth the effort?",
        a: "The photo documentation process takes 60–90 seconds per job using the Field OS mobile app. You tap three buttons: start job, take photos, submit. The AI Opportunity Engine processes them automatically — you don't write descriptions or tag items. The 90 seconds on each job creates a documented record that: (1) improves your match quality over time, (2) generates Home Origination Rights that pay you permanently, and (3) builds a competitive photo portfolio that homeowners see before choosing you. The return on 90 seconds compounds significantly.",
      },
      {
        q: "Is this MLM?",
        a: "No — and here's the clear distinction: In an MLM, you pay to join, and your income comes primarily from recruiting other people who also pay to join. ProLnk's network income is derived entirely from real job completions and actual paid subscriptions — not from recruitment fees. There is no recruitment fee. You can earn your full direct commission without ever recruiting a single person. The 4-level override is a bonus structure available to members on top of their direct earnings. ProLnk publishes an annual income disclosure statement in compliance with FTC guidelines. If someone in your circle raises the MLM concern, share that disclosure — it answers the question with data.",
      },
      {
        q: "What if I recruit someone who outcompetes me for leads in my area?",
        a: "ProLnk's matching algorithm routes leads based on Partner Priority Score (PPS), availability, and specialization — not arbitrary selection. If you recruit a competitor in your exact trade and zip code, you will both be matched to different homeowners based on your respective scores. There is no scenario where recruiting a partner causes your lead volume to drop — the homeowner pool is far larger than the partner pool in every DFW market. More partners in your network = more override income for you, not fewer leads. The platform is designed with this tension in mind: your recruits help you, not hurt you.",
      },
    ],
  },
  {
    id: "partner-qa",
    label: "Real Partner Q&A",
    icon: Users,
    color: "text-teal-400",
    faqs: [
      {
        q: "\"I'm a licensed plumber in Frisco but I also do some HVAC work. Can I list both trades?\" — James O., Irving TX",
        a: "Yes. You can list up to three primary trades on your ProLnk profile, and each trade requires separate license verification. If you hold a plumbing license and a Type A HVAC license, you can be matched as both a plumber and an HVAC tech — independently. Your Partner Priority Score is calculated per trade, so strong reviews in plumbing won't drag down your HVAC score if you're newer to that trade on the platform. You can add or remove trades at any time from Partner Settings.",
      },
      {
        q: "\"My wife handles our admin. Can she access my partner dashboard without having her own account?\" — Marcus T., DFW",
        a: "Yes. ProLnk supports up to 3 authorized admin users per partner account. You can grant your spouse, office manager, or bookkeeper 'Admin Access' from the Team tab in your Partner Settings. Admins can view commission ledgers, run reports, upload documents, and manage job logs — but cannot change banking information or commission splits without the primary account holder's verification. This is designed specifically for husband-wife operations and small business teams.",
      },
      {
        q: "\"What happens after I apply — how long until I'm activated?\" — Elena P., Dallas",
        a: "Applications are reviewed in the order received, and early access is open. DFW partners are activated in waves as matching goes live, and we'll notify you by email as your activation approaches. Your application date locks your place in line even if your documents aren't fully uploaded yet — file early, complete documents later.",
      },
    ],
  },
];

export default function PartnerFAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter(
      (faq) =>
        search === "" ||
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.faqs.length > 0 && (activeCategory === "all" || activeCategory === cat.id));

  const totalFAQs = CATEGORIES.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <>
      <Helmet>
        <title>Partner FAQ | ProLnk</title>
        <meta name="description" content="Frequently asked questions for ProLnk service professionals — commissions, network income, FSM integration, and more." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-4">
              <HelpCircle className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-300 font-medium">Partner Help Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-slate-400 text-lg mb-6">
              {totalFAQs} answers covering everything you need to know about ProLnk.
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-400">No results found</h3>
              <p className="text-sm text-slate-500 mt-1">Try a different search term or browse all categories.</p>
              <button onClick={() => setSearch("")} className="mt-4 text-sm text-teal-400 hover:underline">
                Clear search
              </button>
            </div>
          )}

          <div className="space-y-10">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                    <h2 className="text-lg font-bold text-white">{cat.label}</h2>
                    <span className="text-xs text-slate-500 ml-1">{cat.faqs.length} questions</span>
                  </div>

                  <div className="space-y-2">
                    {cat.faqs.map((faq, idx) => {
                      const key = `${cat.id}-${idx}`;
                      const isOpen = openItems.has(key);
                      return (
                        <div
                          key={key}
                          className={`rounded-xl border transition-all ${
                            isOpen
                              ? "bg-slate-800/80 border-teal-500/30"
                              : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                          }`}
                        >
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                          >
                            <span className={`text-sm font-semibold leading-snug ${isOpen ? "text-white" : "text-slate-200"}`}>
                              {faq.q}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5">
                              <div className="border-t border-slate-700 pt-4">
                                <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support CTA */}
          <div className="mt-14 bg-gradient-to-br from-teal-900/40 to-slate-800/60 border border-teal-700/30 rounded-2xl p-8 text-center">
            <MessageCircle className="w-10 h-10 text-teal-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-slate-400 text-sm mb-5">
              Our partner support team is available Monday–Friday, 8am–6pm CT.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@prolnk.xyz"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Support
              </a>
              <Link href="/partner-resources">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  Browse Resource Center
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
