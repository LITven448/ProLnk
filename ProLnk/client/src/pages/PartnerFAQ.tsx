import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HelpCircle, ChevronDown, ChevronUp, Network, DollarSign, Calendar, Shield, Clock, Home, MapPin, Zap, Users, Share2 } from "lucide-react";

interface FAQItem {
  category: string;
  icon: LucideIcon;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Commissions",
    icon: Network,
    question: "How does the commission cascade work?",
    answer:
      "ProLnk uses a 4-level network override on top of your direct commissions. When a pro you recruited closes a job, you earn 7% of the job value. When their recruit closes a job, you earn 4%. The third level pays you 2%, and the fourth level pays 1%. These override earnings are passive — they stack on top of every job your network closes, forever. The cascade only applies to pros you directly or indirectly recruited; it does not reduce what those pros keep.",
  },
  {
    category: "Commissions",
    icon: DollarSign,
    question: "What is the platform fee?",
    answer:
      "ProLnk charges a platform fee of 6–15% of the total job value, depending on the trade category. Specialty trades (e.g., structural, electrical panel upgrades) carry higher fees due to increased vetting costs. Your keep rate — 40% to 78% depending on your tier — is calculated after the platform fee. So on a $2,000 roofing job with a 10% platform fee, the net job value is $1,800, and a Company-tier partner keeps 72% = $1,296.",
  },
  {
    category: "Payments",
    icon: Calendar,
    question: "When do I get paid?",
    answer:
      "Payouts are processed monthly on the 15th for all commissions earned in the prior calendar month. You need a minimum balance of $25 to receive a payout. Payments are delivered via Stripe Connect directly to your linked bank account. If your balance is below $25, it rolls forward to the next month. Override earnings from your network are batched in the same monthly cycle.",
  },
  {
    category: "Status",
    icon: Shield,
    question: "Can I lose my Founding Network status?",
    answer:
      "No. Founding Network status is permanent once granted. Your tier rate, network position, and origination rights are locked in for the life of your account. The Founding Network waitlist closes at 500 approved applications — after that, new partners enter at standard rates. Your seat is already secured.",
  },
  {
    category: "Status",
    icon: Clock,
    question: "What happens after my 90-day trial?",
    answer:
      "After your 90-day trial ends, your $149/month Founding Network subscription begins automatically via the payment method you provided at signup. This rate is locked in permanently — you will never pay more than $149/month regardless of future price increases. If you cancel before the trial ends, you revert to the Scout free tier and lose your Founding Network position. Cancellation requests must be submitted 48 hours before your billing date.",
  },
  {
    category: "Income",
    icon: Home,
    question: "How do home origination rights work?",
    answer:
      "When you document a home in the ProLnk Home Health Vault — by completing a job there or uploading an assessment — you earn 1.5% of every future job booked at that address, permanently. There is no expiration. If a homeowner hires three different pros over five years for plumbing, HVAC, and roofing, you receive 1.5% of each job's value each time, without doing additional work. This compounds as your documented home count grows.",
  },
  {
    category: "Coverage",
    icon: MapPin,
    question: "Is ProLnk only in DFW?",
    answer:
      "ProLnk is launching in the Dallas-Fort Worth metro as its first market. National expansion is planned for Q3 2026, with Houston, Austin, and Phoenix as the next three markets. If you operate outside DFW, you can still join the waitlist and will be activated when your market launches. Your Founding Network status and tier rate travel with you regardless of market.",
  },
  {
    category: "Leads",
    icon: Zap,
    question: "How are leads assigned?",
    answer:
      "Leads are distributed by the ProLnk AI Lead Distributor, which matches homeowner requests to pros using three weighted factors: trade match (does your license cover this work type?), proximity (are you within the homeowner's service radius?), and PPS score (your Pro Performance Score, based on response rate, close rate, and review rating). Higher-tier partners receive first-look on all matched leads before Scout-tier partners in the same area.",
  },
  {
    category: "Platform",
    icon: Users,
    question: "What is TrustyPro?",
    answer:
      "TrustyPro is the homeowner-facing brand in the ProLnk ecosystem. When a homeowner visits TrustyPro.io, they submit a service request that flows into the ProLnk lead matching system. As a ProLnk partner, you receive leads that originate from TrustyPro homeowners — the two brands are the same platform, just presenting a different face to each side of the marketplace. You never need to interact with TrustyPro directly; all your work happens in the ProLnk partner portal.",
  },
  {
    category: "Growth",
    icon: Share2,
    question: "How do I invite other pros to my network?",
    answer:
      "Every partner has a unique referral link: prolnk.io/join?ref=YOUR_CODE. Share this link with other licensed pros in your trade network. When they sign up and are approved, they become your Level-1 recruits and you immediately begin earning 7% network overrides on their closed jobs. Your referral code is visible in your partner profile under 'Grow Your Network.' You can also share a QR code version for in-person networking.",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export default function PartnerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-teal-400" />
            Partner FAQ
          </h1>
          <p className="text-slate-400 mt-1">
            Everything you need to know about the ProLnk partner program.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-teal-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="space-y-2">
          {filtered.map((faq, i) => {
            const globalIdx = FAQS.indexOf(faq);
            const isOpen = openIndex === globalIdx;
            const Icon: LucideIcon = faq.icon;
            return (
              <div
                key={globalIdx}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? "bg-slate-800 border-slate-600"
                    : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                }`}
              >
                <button
                  className="w-full flex items-start gap-3 p-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                >
                  <div className="rounded-lg p-1.5 bg-teal-500/10 border border-teal-500/20 shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{faq.category}</span>
                    <p className="text-white text-sm font-medium mt-0.5">{faq.question}</p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 mt-1" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-9 border-l border-slate-700 pl-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6 text-center">
          <p className="text-white font-semibold mb-1">Still have questions?</p>
          <p className="text-slate-400 text-sm mb-4">
            Our partner success team typically responds within 2 business hours.
          </p>
          <a
            href="mailto:partners@prolnk.io"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-colors"
          >
            Email Partner Support
          </a>
        </div>
      </div>
    </div>
  );
}
