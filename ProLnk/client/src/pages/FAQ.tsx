import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, Users, Home, Building2, ArrowRight } from "lucide-react";

const NAVY = "#0A1628";
const NAVY2 = "#0f1e35";
const TEAL = "#14b8a6";
const TEAL_DIM = "rgba(20,184,166,0.12)";
const TEXT = "#e2e8f0";
const MUTED = "#94a3b8";
const BORDER = "rgba(255,255,255,0.08)";

interface FAQItem {
  q: string;
  a: string;
}

const PARTNER_FAQS: FAQItem[] = [
  {
    q: "How does photo-to-lead work exactly?",
    a: "When you finish a job, you snap a photo of any visible home system — the HVAC unit outside, the electrical panel, the roof edge, a water heater. That photo is uploaded to ProLnk. Our AI analyzes it for condition indicators: granule loss on the roof, estimated age of the HVAC, brand of the electrical panel. If the AI detects a service opportunity, a ProLnk admin reviews the finding, and if approved, the associated homeowner receives a personalized outreach offering to connect them with a qualified contractor. No manual effort required on your end after the upload.",
  },
  {
    q: "When do I get paid?",
    a: "Payouts go to your bank account via direct deposit on the 1st of every month. The minimum payout threshold is $50. You keep 72% of every job you close through the platform. Earnings are tracked in your Commission Ledger dashboard and you receive an itemized statement each month. Network override income — from your recruits and their recruits — is calculated and paid on the same schedule.",
  },
  {
    q: "Can I join if I'm not in DFW?",
    a: "Yes. The Founding Network is open nationally. We launched in DFW first because that's home base, but founding members are joining from Texas, Florida, Georgia, Arizona, Colorado, and beyond. Your service area is set during onboarding. Leads will be matched to your geography. The 2,125 founding spots are not region-capped — they fill on a first-come basis regardless of location.",
  },
  {
    q: "What happens if a lead doesn't book?",
    a: "You are not charged for leads that don't convert. The $149/mo flat subscription covers full platform access regardless of how many leads you receive or how many book. There are no per-lead fees, no conversion minimums, no penalty for non-converts. We track conversion rates on our end to improve lead quality over time — if we're sending bad leads, that's our problem to fix, not yours.",
  },
  {
    q: "How does the network income work?",
    a: "When you recruit another contractor into ProLnk, you earn a percentage of every job they close — permanently. The cascade: 7% on jobs your direct recruits close, 4% on their recruits' jobs, 2% on the next level down, and 1% four levels deep. On top of that, you earn subscription overrides: 12% of every $149/mo your direct recruits pay ($17.88/mo per recruit), 6% from their recruits, 3% and 1.5% for levels three and four. These compound as your network grows. 10 active recruits averaging $5,000/month in platform jobs generates over $3,500/mo in override income alone.",
  },
  {
    q: "Is the $149/mo locked forever?",
    a: "Yes, for founding network members. The $149/mo rate is locked permanently — it never increases as long as you maintain an active subscription. After the founding period closes (at 2,125 members or 5,000 homes in the vault, whichever comes first), the standard rate will be higher. Founding members are grandfathered at $149 forever. If you cancel and re-subscribe after the founding window closes, you lose the locked rate and pay the then-current price.",
  },
];

const HOMEOWNER_FAQS: FAQItem[] = [
  {
    q: "How does TrustyPro verify contractors?",
    a: "Every contractor on ProLnk goes through a three-step verification: (1) License verification against state contractor licensing databases for the relevant trade, (2) insurance check confirming active general liability and workers compensation coverage, and (3) a background screening through our screening partner. Contractors who fail any check are not activated. You can see each pro's verification badges on their profile before any contact is made.",
  },
  {
    q: "Is my home data private?",
    a: "Yes. Your Home Health Vault data — including photos, health records, repair history, and AI findings — is owned by you. We never sell homeowner data to insurance companies, advertisers, or data brokers. Your data is used exclusively to match you with relevant contractors and track your home's condition over time. You can request full deletion of your data at any time. We comply with CCPA and GDPR data rights.",
  },
  {
    q: "How is TrustyPro different from Angi or HomeAdvisor?",
    a: "Three key differences: (1) We don't sell your contact info to 8 contractors who then spam you for weeks. You get matched to a small number of verified pros appropriate for your specific job. (2) We verify every contractor — license, insurance, and background — before they appear on the platform. Angi and HomeAdvisor have faced class action suits over unverified listings. (3) The Home Health Vault tracks your home's condition over time, not just one transaction. TrustyPro is designed to be a long-term home health partner, not a one-time lead mill.",
  },
  {
    q: "What does the home health score measure?",
    a: "The Home Health Score (0–100) is a composite measure of your home's visible condition across six categories: roofing, HVAC, plumbing, electrical, exterior, and safety. It is generated from AI analysis of photos you upload or that a visiting contractor captures with your permission. A score of 80+ means your home systems appear well-maintained. Below 60 indicates maintenance items that should be addressed. The score is for informational purposes only and is not a licensed inspection. It does not affect your insurance rates or property value directly.",
  },
  {
    q: "Is TrustyPro free to use?",
    a: "Yes, always. Homeowners never pay ProLnk or TrustyPro anything. Getting quotes, receiving AI health reports, reviewing contractors, and tracking your home's condition is free. Contractors pay the platform subscription — you benefit at zero cost. We may in the future offer premium Home Health Vault features for homeowners who want deeper analytics or historical tracking, but the core service will always be free.",
  },
];

const PROLNK_FAQS: FAQItem[] = [
  {
    q: "What is the founding network?",
    a: "The founding network is the initial 2,125 contractors who join ProLnk before the platform opens to the general public. It is structured in four tiers: Charter (25 spots), Founding (100 spots), Level 3 (400 spots), and Level 4 (1,600 spots). Charter members get the best override rates and earliest access. All founding members lock in $149/mo forever. The founding network closes when either all 2,125 spots fill or 5,000 homes are registered in the Home Health Vault.",
  },
  {
    q: "When will ProLnk launch fully?",
    a: "The founding network waitlist is live now. The lead matching algorithm — where pros receive and respond to real homeowner leads — is targeted for Q3 2026. Full platform launch including payments, pro activation, and the commission ledger is planned for late 2026. The current phase is waitlist-only: we're validating demand, building the contractor base, and collecting home data before turning on matching. Founding members get first access the moment matching goes live.",
  },
  {
    q: "Is the network income system an MLM?",
    a: "No, and here's the distinction: In an MLM, participants primarily make money by recruiting — the product is secondary. In ProLnk, income comes from real home service jobs closed on the platform. You earn on recruiting (subscription overrides) and on jobs (job overrides), but the foundation is actual work delivered to real homeowners. There is no buy-in inventory, no product to resell, and no pressure to recruit. You can join, do zero recruiting, and earn 72% of every job you close. The network income layer is optional and additive — not the core model.",
  },
  {
    q: "What happens to my origination rights if I cancel?",
    a: "Origination rights — your permanent share of platform fees from homes you bring into the vault — are tied to your active subscription. If you cancel, your origination rights are paused but not permanently terminated. You have a 90-day window to resubscribe and restore your rights. After 90 days of non-payment, origination rights on your homes lapse and are redistributed to the platform pool. This policy exists to protect homeowners from being attached to inactive contractors indefinitely.",
  },
];

function FAQGroup({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: isOpen ? TEAL_DIM : "rgba(255,255,255,0.03)",
              border: `1px solid ${isOpen ? "rgba(20,184,166,0.3)" : BORDER}`,
              borderRadius: 10,
              overflow: "hidden",
              transition: "all 0.2s ease",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                gap: 16,
              }}
            >
              <span style={{ color: isOpen ? TEAL : TEXT, fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>
                {item.q}
              </span>
              <span style={{ color: TEAL, flexShrink: 0 }}>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 22px 20px", color: MUTED, fontSize: 14, lineHeight: 1.75 }}>
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ — ProLnk Home Services Network</title>
        <meta name="description" content="Answers to common questions for contractors and homeowners on the ProLnk platform. Learn about joining, matching, payments, and the founding network." />
      </Helmet>

      <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: TEXT }}>

        {/* Nav */}
        <nav style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/">
            <span style={{ fontWeight: 800, fontSize: 20, color: TEAL, cursor: "pointer", letterSpacing: "-0.5px" }}>ProLnk</span>
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/how-it-works"><span style={{ color: MUTED, fontSize: 14, cursor: "pointer" }}>How It Works</span></Link>
            <Link href="/commission-calculator"><span style={{ color: MUTED, fontSize: 14, cursor: "pointer" }}>Calculator</span></Link>
            <Link href="/join">
              <span style={{ background: TEAL, color: "#000", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 8, cursor: "pointer" }}>
                Join Network
              </span>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "72px 24px 56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.2)`, borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ color: TEAL, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Frequently Asked Questions</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1 }}>
            Got questions? We have answers.
          </h1>
          <p style={{ color: MUTED, fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            Everything contractors and homeowners need to know about ProLnk, the Founding Network, and how the platform works.
          </p>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 100px" }}>

          {/* For Partners */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={20} color={TEAL} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT }}>For Partners</h2>
                <p style={{ margin: 0, fontSize: 13, color: MUTED }}>Photo-to-lead, payouts, network income, and membership</p>
              </div>
            </div>
            <FAQGroup items={PARTNER_FAQS} />
          </div>

          {/* For Homeowners */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Home size={20} color={TEAL} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT }}>For Homeowners</h2>
                <p style={{ margin: 0, fontSize: 13, color: MUTED }}>Verification, privacy, health scores, and how we're different</p>
              </div>
            </div>
            <FAQGroup items={HOMEOWNER_FAQS} />
          </div>

          {/* About ProLnk */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={20} color={TEAL} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT }}>About ProLnk</h2>
                <p style={{ margin: 0, fontSize: 13, color: MUTED }}>The founding network, launch timeline, business model, and origination rights</p>
              </div>
            </div>
            <FAQGroup items={PROLNK_FAQS} />
          </div>

          {/* CTA Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${NAVY2} 0%, rgba(20,184,166,0.08) 100%)`,
            border: `1px solid rgba(20,184,166,0.2)`,
            borderRadius: 16,
            padding: "40px 36px",
            textAlign: "center",
          }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 700 }}>Still have questions?</h3>
            <p style={{ margin: "0 0 28px", color: MUTED, fontSize: 14 }}>
              Our team responds to all inquiries within one business day.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/join">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: TEAL, color: "#000", fontWeight: 700, fontSize: 14,
                  padding: "12px 28px", borderRadius: 10, cursor: "pointer",
                }}>
                  Join the Network <ArrowRight size={16} />
                </span>
              </Link>
              <a href="mailto:andrew@lit-ventures.com" style={{ textDecoration: "none" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${BORDER}`, color: TEXT, fontWeight: 600, fontSize: 14,
                  padding: "12px 28px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)",
                }}>
                  Email Us Directly
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
