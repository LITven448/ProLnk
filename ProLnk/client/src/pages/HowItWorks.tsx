import { useState, type ElementType } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  UserPlus, Zap, Briefcase, Network,
  Camera, Users, CheckCircle, ArrowRight,
  DollarSign, TrendingUp,
} from "lucide-react";

const NAVY = "#0A1628″;
const NAVY2 = "#0f1e35″;
const TEAL = "#14b8a6″;
const TEAL_DIM = "rgba(20,184,166,0.12)";
const YELLOW = "#F5E642″;
const TEXT = "#e2e8f0″;
const MUTED = "#94a3b8″;
const BORDER = "rgba(255,255,255,0.08)";

const PRO_STEPS = [
  {
    num: "01″,
    icon: UserPlus,
    title: "Join the Network",
    body: "Create your contractor profile in minutes. Set your trade, service area, and availability. Founding Network members lock in $149/mo with a 90-day free trial — no charge until day 91.",
    tag: "90-day free trial",
  },
  {
    num: "02″,
    icon: Zap,
    title: "Get Matched",
    body: "Our AI matches homeowner job requests to your trade and location in real time. Leads appear directly in your Lead Inbox — no bidding wars, no cold calling, no chasing down referrals.",
    tag: "AI-powered matching",
  },
  {
    num: "03″,
    icon: Briefcase,
    title: "Win the Job",
    body: "Review the homeowner's request, upload photos, and send your quote through the platform. Close the deal, do the work, and receive your payout on the 1st of the month. You keep 72%.",
    tag: "72% yours to keep",
  },
  {
    num: "04″,
    icon: Network,
    title: "Build Your Network",
    body: "Recruit other contractors to ProLnk and earn override income from their jobs — forever. 5 active recruits averaging $5K/mo in jobs adds $1,750/mo to your check with no extra work from you.",
    tag: "Passive override income",
  },
];

const HOMEOWNER_STEPS = [
  {
    num: "01″,
    icon: Camera,
    title: "Scan or Submit",
    body: "Upload photos through TrustyPro for an instant AI home health scan, or fill out a quick job request form describing the work needed. No account required to get started.",
    tag: "Free, no account needed",
  },
  {
    num: "02″,
    icon: Users,
    title: "Get Matched",
    body: "Our AI matches your request to verified, licensed contractors in your area. Up to 3 vetted pros receive your lead and will contact you within 24 hours. Urgent jobs are prioritized.",
    tag: "Within 24 hours",
  },
  {
    num: "03″,
    icon: CheckCircle,
    title: "Choose the Best",
    body: "Compare quotes from multiple contractors, review their verification status and history, and choose the pro you trust most. You're never pressured — take the time you need.",
    tag: "You decide, no pressure",
  },
];

function StepCard({
  num, icon: Icon, title, body, tag, accent,
}: {
  num: string;
  icon: ElementType;
  title: string;
  body: string;
  tag: string;
  accent?: string;
}) {
  const color = accent ?? TEAL;
  return (
    <div style={{
      position: "relative",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${BORDER}`,
      borderRadius: 16,
      padding: "32px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `rgba(20,184,166,0.12)`,
          border: `1px solid rgba(20,184,166,0.25)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={22} color={color} />
        </div>
        <span style={{
          fontFamily: "monospace", fontSize: 38, fontWeight: 900,
          color: "rgba(255,255,255,0.05)", lineHeight: 1, userSelect: "none",
        }}>{num}</span>
      </div>
      <div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: TEXT }}>{title}</h3>
        <p style={{ margin: 0, color: MUTED, fontSize: 14, lineHeight: 1.7 }}>{body}</p>
      </div>
      <div style={{
        display: "inline-flex", alignSelf: "flex-start",
        background: `rgba(20,184,166,0.1)`, border: `1px solid rgba(20,184,166,0.2)`,
        borderRadius: 100, padding: "4px 12px",
      }}>
        <span style={{ color, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{tag}</span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [recruits, setRecruits] = useState(5);
  const [avgJob, setAvgJob] = useState(5000);

  const overrideL1 = recruits * avgJob * 0.07;
  const passiveMonthly = Math.round(overrideL1);

  return (
    <>
      <Helmet>
        <title>How It Works — ProLnk Home Services Network</title>
        <meta name="description" content="Learn how ProLnk works for contractors and homeowners. AI-powered lead matching, 72% job keep rate, and a 4-level network income system for trade professionals." />
      </Helmet>

      <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: TEXT }}>

        {/* Nav */}
        <nav style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/">
            <span style={{ fontWeight: 800, fontSize: 20, color: TEAL, cursor: "pointer", letterSpacing: "-0.5px" }}>ProLnk</span>
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/faq"><span style={{ color: MUTED, fontSize: 14, cursor: "pointer" }}>FAQ</span></Link>
            <Link href="/commission-calculator"><span style={{ color: MUTED, fontSize: 14, cursor: "pointer" }}>Calculator</span></Link>
            <Link href="/join">
              <span style={{
                background: TEAL, color: "#000″, fontWeight: 700, fontSize: 13,
                padding: "8px 18px", borderRadius: 8, cursor: "pointer",
              }}>Join Network</span>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "72px 24px 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.2)`, borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ color: TEAL, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Platform Overview</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: 1.05 }}>
            How ProLnk Works
          </h1>
          <p style={{ color: MUTED, fontSize: 17, maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
            A two-sided platform that connects homeowners with vetted contractors — powered by AI matching and a 5-stream income system.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>

          {/* FOR CONTRACTORS */}
          <div style={{ marginBottom: 88 }}>
            <div style={{ marginBottom: 36, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: TEAL_DIM,
                  border: `1px solid rgba(20,184,166,0.25)`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Briefcase size={18} color={TEAL} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.07em" }}>For Contractors</span>
              </div>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {PRO_STEPS.map((s) => (
                <StepCard key={s.num} {...s} />
              ))}
            </div>
          </div>

          {/* FOR HOMEOWNERS */}
          <div style={{ marginBottom: 88 }}>
            <div style={{ marginBottom: 36, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "rgba(245,230,66,0.1)",
                  border: `1px solid rgba(245,230,66,0.2)`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CheckCircle size={18} color={YELLOW} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: YELLOW, textTransform: "uppercase", letterSpacing: "0.07em" }}>For Homeowners</span>
              </div>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
              {HOMEOWNER_STEPS.map((s) => (
                <StepCard key={s.num} {...s} accent={YELLOW} />
              ))}
            </div>
          </div>

          {/* INCOME CALCULATOR TEASER */}
          <div style={{
            background: `linear-gradient(135deg, ${NAVY2} 0%, rgba(20,184,166,0.06) 100%)`,
            border: `1px solid rgba(20,184,166,0.2)`,
            borderRadius: 20,
            padding: "48px 40px",
            marginBottom: 88,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <TrendingUp size={20} color={TEAL} />
              <span style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.06em" }}>Network Income Preview</span>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.5px" }}>
              Build passive income while you work.
            </h2>
            <p style={{ margin: "0 0 36px", color: MUTED, fontSize: 15, maxWidth: 560, lineHeight: 1.6 }}>
              Recruit contractors to the network and earn 7% of every job they close — forever. Adjust the sliders to see what your override income could look like.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 600, marginBottom: 36 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, color: MUTED, fontWeight: 600, marginBottom: 10 }}>
                  Direct recruits active: <span style={{ color: TEXT }}>{recruits}</span>
                </label>
                <input
                  type="range" min={1} max={50} value={recruits}
                  onChange={(e) => setRecruits(Number(e.target.value))}
                  style={{ width: "100%", accentColor: TEAL }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: MUTED, marginTop: 4 }}>
                  <span>1</span><span>50</span>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: MUTED, fontWeight: 600, marginBottom: 10 }}>
                  Avg recruit jobs/mo: <span style={{ color: TEXT }}>${avgJob.toLocaleString()}</span>
                </label>
                <input
                  type="range" min={1000} max={20000} step={500} value={avgJob}
                  onChange={(e) => setAvgJob(Number(e.target.value))}
                  style={{ width: "100%", accentColor: TEAL }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: MUTED, marginTop: 4 }}>
                  <span>$1K</span><span>$20K</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{
                background: TEAL_DIM, border: `1px solid rgba(20,184,166,0.3)`,
                borderRadius: 14, padding: "20px 28px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <DollarSign size={28} color={TEAL} />
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: TEAL, lineHeight: 1 }}>
                    +${passiveMonthly.toLocaleString()}<span style={{ fontSize: 16, fontWeight: 500 }}>/mo</span>
                  </div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>
                    L1 override at 7% — {recruits} recruits × ${avgJob.toLocaleString()}
                  </div>
                </div>
              </div>
              <Link href="/commission-calculator">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${TEAL}`, color: TEAL, fontWeight: 700, fontSize: 14,
                  padding: "14px 28px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(20,184,166,0.05)",
                }}>
                  Full 5-Stream Calculator <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{
              background: `linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0.05) 100%)`,
              border: `1px solid rgba(20,184,166,0.25)`,
              borderRadius: 16, padding: "32px 28px",
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 700 }}>Ready to join?</h3>
              <p style={{ margin: "0 0 24px", color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                2,125 founding spots. $149/mo locked forever. 90-day free trial. The waitlist closes at 500 applications.
              </p>
              <Link href="/join">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: TEAL, color: "#000″, fontWeight: 700, fontSize: 14,
                  padding: "12px 24px", borderRadius: 10, cursor: "pointer",
                }}>
                  Claim Your Spot <ArrowRight size={16} />
                </span>
              </Link>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${BORDER}`,
              borderRadius: 16, padding: "32px 28px",
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 700 }}>Need a contractor?</h3>
              <p style={{ margin: "0 0 24px", color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                Submit a job request and get matched with up to 3 vetted contractors in your area within 24 hours. Always free.
              </p>
              <Link href="/get-quotes">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${BORDER}`, color: TEXT, fontWeight: 700, fontSize: 14,
                  padding: "12px 24px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)",
                }}>
                  Get Free Quotes <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
