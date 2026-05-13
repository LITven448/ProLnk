import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, Users, Home, ArrowRight } from "lucide-react";

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

const CONTRACTOR_FAQS: FAQItem[] = [
  {
    q: "How do I join ProLnk?",
    a: "Join the Founding Network at prolnk.io. Founding members lock in $149/mo forever — that rate never increases. The founding network has 2,125 spots total across four tiers: Charter (25 spots), Founding (100), Level 3 (400), and Level 4 (1,600). Once spots fill, the waitlist closes. Founding members get a 90-day free trial — no charge until day 91.",
  },
  {
    q: "How does the matching work?",
    a: "When a homeowner submits a job request, our AI matches it to pros by trade, service area, availability, and quality score. You receive the lead in real time via the Lead Inbox. You review the job details, send a quote, and if selected you win the work. There's no auction — leads are routed based on fit, not who bids highest.",
  },
  {
    q: "How do I get paid?",
    a: "Payouts go to your bank account via direct deposit on the 1st of every month. The minimum payout threshold is $50. You keep 72% of every job you close through the platform. Earnings are tracked in your Commission Ledger dashboard and you receive an itemized statement each month.",
  },
  {
    q: "What is the 4-level override income?",
    a: "When you recruit another contractor into ProLnk, you earn a percentage of every job they close — permanently. The cascade works like this: 7% on every job your direct recruits close, 4% on their recruits' jobs, 2% on the next level, and 1% four levels deep. This is passive income that scales as your network grows. 5 active recruits averaging $5,000/month in jobs = $1,750/mo added to your check with no extra work.",
  },
  {
    q: "What is the 90-day free trial?",
    a: "No credit card charge occurs for your first 90 days on the platform. You receive full access to the Lead Inbox, matching, and network tools during the trial. If you cancel before day 90, you are never billed. After day 90, your locked founding rate of $149/mo begins. This is available only to founding network members.",
  },
  {
    q: "How is ProLnk different from Angi or HomeAdvisor?",
    a: "Three major differences: (1) We do not charge per lead — you pay $149/mo flat and every lead you receive is included. (2) You keep 72% of job value, not 30-40% after platform fees and lead costs. (3) You own your network. Every contractor you recruit builds your passive override income stream — something Angi and HomeAdvisor do not offer. ProLnk is designed to make you more money over time, not extract fees from every transaction.",
  },
  {
    q: "What subscription override do I earn on recruits?",
    a: "When someone you recruit signs up and pays their $149/mo subscription, you earn 12% of that subscription recurring monthly — $17.88/mo per recruit as long as they remain active. Your recruits' recruits earn you 6%, the next level earns 3%, and four levels deep earns 1.5%. This stacks on top of the job override income.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The $149/mo subscription covers full platform access including the Lead Inbox, commission tracking, network tools, and 24/7 AI agent support. The only revenue share is the 28% platform fee on closed jobs. No per-lead charges, no listing fees, no upgrade tiers.",
  },
];

const HOMEOWNER_FAQS: FAQItem[] = [
  {
    q: "How do I get quotes from contractors?",
    a: "Submit your job request at /get-quotes. Describe the work needed, upload photos if available, and enter your address. Our AI matches your request to vetted pros in your area within 24 hours. You'll receive contact from up to 3 qualified contractors and can compare quotes before choosing.",
  },
  {
    q: "Is it free for homeowners?",
    a: "Yes, always. Homeowners never pay ProLnk anything. Getting quotes, receiving matches, communicating with contractors, and comparing bids is completely free. Contractors pay the platform subscription — you benefit from the system at zero cost.",
  },
  {
    q: "Is my home data private?",
    a: "Yes. Your Home Health Vault data — including photos, repair history, and home health records — is owned by you and never sold to third parties. You control who sees your data. ProLnk does not sell homeowner data to insurance companies, advertisers, or data brokers. Your data is used only to match you with relevant contractors.",
  },
  {
    q: "What is TrustyPro?",
    a: "TrustyPro is ProLnk's AI-powered home health scan product. Upload photos of your home and TrustyPro's AI analyzes visible conditions — roof wear, siding damage, HVAC age indicators, foundation signs — and generates a Home Health Report. It's like a digital home inspection you can run yourself. TrustyPro is available at trustypro.io.",
  },
  {
    q: "How are contractors vetted?",
    a: "Every contractor on ProLnk goes through a three-step verification: (1) License verification against state contractor licensing databases, (2) insurance check to confirm active general liability and workers compensation coverage, and (3) background check through our screening partner. Contractors who fail any check are not activated on the platform. You can see each pro's verification status on their profile.",
  },
  {
    q: "How quickly will I hear from contractors?",
    a: "After you submit a job request, AI matching runs within minutes. Contractors receive your lead in real time and typically reach out within 2–24 hours depending on trade demand in your area. For urgent jobs like water damage or HVAC failure, mark the request as urgent and you'll be prioritized in the queue.",
  },
  {
    q: "What if I am unhappy with the contractor I chose?",
    a: "You are never locked in. You choose which contractor to hire — ProLnk only makes introductions. If a contractor fails to show, does poor work, or behaves unprofessionally, you can report the issue through the platform. Reported contractors are reviewed and removed if problems are confirmed. We stand behind the quality of our network.",
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
              <span style={{
                background: TEAL, color: "#000", fontWeight: 700, fontSize: 13,
                padding: "8px 18px", borderRadius: 8, cursor: "pointer",
              }}>Join Network</span>
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

          {/* Contractor Section */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={20} color={TEAL} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT }}>For Contractors</h2>
                <p style={{ margin: 0, fontSize: 13, color: MUTED }}>Joining, earning, and building your network</p>
              </div>
            </div>
            <FAQGroup items={CONTRACTOR_FAQS} />
          </div>

          {/* Homeowner Section */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Home size={20} color={TEAL} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT }}>For Homeowners</h2>
                <p style={{ margin: 0, fontSize: 13, color: MUTED }}>Getting quotes, privacy, and contractor quality</p>
              </div>
            </div>
            <FAQGroup items={HOMEOWNER_FAQS} />
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
              <Link href="/how-it-works">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${BORDER}`, color: TEXT, fontWeight: 600, fontSize: 14,
                  padding: "12px 28px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)",
                }}>
                  See How It Works
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
