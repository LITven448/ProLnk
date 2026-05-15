import React from 'react';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  DollarSign, Users, RefreshCw, Home, Zap,
  ArrowRight, ChevronDown, ChevronUp,
} from "lucide-react";
import { Link } from "wouter";

const NAVY = "#0B1F3A";
const YELLOW = "#F5C842";
const YELLOW_BG = "rgba(245,200,66,0.10)";
const YELLOW_BORDER = "rgba(245,200,66,0.30)";

interface StreamCardProps {
  number: string;
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  how: string;
  math: string;
  timeline?: string;
  extra?: React.ReactNode;
  accentColor?: string;
}

function StreamCard({ number, title, icon: Icon, how, math, timeline, extra, accentColor = YELLOW }: StreamCardProps) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid #E5E7EB`,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    }}>
      <div style={{
        background: NAVY,
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{
          width: 52, height: 52,
          borderRadius: 14,
          background: `${accentColor}22`,
          border: `1.5px solid ${accentColor}50`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={24} color={accentColor} />
        </div>
        <div>
          <div style={{ color: accentColor, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            Stream {number}
          </div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>{title}</h2>
        </div>
      </div>
      <div style={{ padding: "24px 28px" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            How It Works
          </div>
          <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{how}</p>
        </div>
        <div style={{
          background: YELLOW_BG,
          border: `1px solid ${YELLOW_BORDER}`,
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: timeline ? 14 : 0,
        }}>
          <div style={{ color: "#78350F", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            The Math
          </div>
          <p style={{ color: "#92400E", fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>{math}</p>
        </div>
        {timeline && (
          <div style={{ color: "#6B7280", fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>
            {timeline}
          </div>
        )}
        {extra && <div style={{ marginTop: 16 }}>{extra}</div>}
      </div>
    </div>
  );
}

function NetworkTree() {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
        Your Override Network (2,125 positions)
      </div>
      {[
        { label: "You", sub: "7% of their commissions", bg: YELLOW, color: NAVY, count: "—" },
        { label: "Your 8 Direct Recruits (L1)", sub: "7% of their commissions", bg: NAVY, color: "#fff", count: "8" },
        { label: "L2 — Their Recruits", sub: "4% of their commissions", bg: "#1E3A5F", color: "#D1D5DB", count: "64" },
        { label: "L3 — L2's Recruits", sub: "2% of their commissions", bg: "#243B55", color: "#9CA3AF", count: "512" },
        { label: "L4 — Deepest Level", sub: "1% of their commissions", bg: "#2D3748", color: "#6B7280", count: "1,541" },
      ].map((row, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 6,
          paddingLeft: i * 16,
        }}>
          <div style={{
            background: row.bg, borderRadius: 8,
            padding: "8px 14px", flex: 1,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ color: row.color, fontSize: 13, fontWeight: 700 }}>{row.label}</div>
              <div style={{ color: `${row.color}99`, fontSize: 11 }}>{row.sub}</div>
            </div>
            <div style={{ color: row.color, fontSize: 16, fontWeight: 800, opacity: 0.7 }}>{row.count}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IncomeSlider() {
  const [jobs, setJobs] = useState(8);
  const [recruits, setRecruits] = useState(12);
  const avgJob = 1000;
  const platformFee = 0.10;
  const yourKeep = 0.72;
  const jobIncome = Math.round(jobs * avgJob * platformFee * yourKeep);
  const overrideIncome = Math.round(recruits * 4 * avgJob * platformFee * yourKeep * 0.07);
  const subIncome = Math.round(recruits * 149 * 0.12);
  const leadIncome = Math.round(recruits * 0.5 * 50);
  const origIncome = Math.round(jobs * 2 * avgJob * platformFee * 0.015);
  const total = jobIncome + overrideIncome + subIncome + leadIncome + origIncome;

  return (
    <div style={{ background: NAVY, borderRadius: 20, padding: 28, color: "#fff" }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>Your Income Estimate</h3>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <label style={{ color: "#D1D5DB", fontSize: 13 }}>Jobs per month: <strong style={{ color: YELLOW }}>{jobs}</strong></label>
        </div>
        <input type="range" min={1} max={40} value={jobs} onChange={e => setJobs(Number(e.target.value))}
          style={{ width: "100%", accentColor: YELLOW }} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <label style={{ color: "#D1D5DB", fontSize: 13 }}>Active L1 Recruits: <strong style={{ color: YELLOW }}>{recruits}</strong></label>
        </div>
        <input type="range" min={0} max={100} value={recruits} onChange={e => setRecruits(Number(e.target.value))}
          style={{ width: "100%", accentColor: YELLOW }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Stream 1: Job Commission", val: `$${jobIncome.toLocaleString()}/mo` },
          { label: "Stream 2: Network Override", val: `$${overrideIncome.toLocaleString()}/mo` },
          { label: "Stream 3: Sub Override", val: `$${subIncome.toLocaleString()}/mo` },
          { label: "Stream 4: Lead Fees", val: `$${leadIncome.toLocaleString()}/mo` },
          { label: "Stream 5: Origination", val: `$${origIncome.toLocaleString()}/mo` },
        ].map((row, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ color: "#9CA3AF", fontSize: 10, marginBottom: 3 }}>{row.label}</div>
            <div style={{ color: YELLOW, fontSize: 16, fontWeight: 800 }}>{row.val}</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
        <div style={{ color: "#9CA3AF", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Est. Monthly Total</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: YELLOW }}>${total.toLocaleString()}/mo</div>
        <div style={{ color: "#6B7280", fontSize: 11, marginTop: 4 }}>Based on $1,000 avg job value, 10% platform fee, $149/mo subscriptions</div>
      </div>
    </div>
  );
}

export default function NetworkIncomeSystem() {
  return (
    <>
      <Helmet>
        <title>Network Income System — 5 Ways ProLnk Pays You | ProLnk</title>
        <meta name="description" content="Discover the 5 income streams available to ProLnk partners: job commissions, network overrides, subscription income, per-lead fees, and permanent home origination rights." />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#FAFAF9", color: NAVY, fontFamily: "'Inter', sans-serif" }}>

        {/* Hero */}
        <div style={{ background: NAVY, color: "#fff", padding: "60px 20px 56px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: YELLOW_BG, border: `1px solid ${YELLOW_BORDER}`,
            borderRadius: 24, padding: "6px 16px", marginBottom: 20,
          }}>
            <Zap size={13} color={YELLOW} />
            <span style={{ color: YELLOW, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>NETWORK INCOME SYSTEM</span>
          </div>
          <h1 style={{
            fontSize: "clamp(26px,5vw,42px)", fontWeight: 900, margin: "0 0 18px",
            maxWidth: 760, marginLeft: "auto", marginRight: "auto", lineHeight: 1.15,
          }}>
            The ProLnk Network Income System —<br />
            <span style={{ color: YELLOW }}>5 Ways Your Business Works For You</span>
          </h1>
          <p style={{
            color: "#94A3B8", fontSize: 16, maxWidth: 620,
            margin: "0 auto 32px", lineHeight: 1.7,
          }}>
            Traditional contractors trade time for money. ProLnk partners build systems that generate income whether they're on a job or not.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply">
              <button style={{
                background: YELLOW, color: NAVY, border: "none",
                borderRadius: 12, padding: "14px 30px",
                fontSize: 15, fontWeight: 800, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                Claim Your Founding Spot <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/resources/academy">
              <button style={{
                background: "transparent", color: "#D1D5DB",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12, padding: "14px 24px",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}>
                Learn in the Academy
              </button>
            </Link>
          </div>
        </div>

        {/* Overview strip */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "20px 20px" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "Stream 1", desc: "Job Commission (72%)" },
              { label: "Stream 2", desc: "Network Override (4 levels)" },
              { label: "Stream 3", desc: "Subscription Override" },
              { label: "Stream 4", desc: "Per-Lead Homeowner Fee" },
              { label: "Stream 5", desc: "Home Origination Rights" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#F8FAFC", borderRadius: 10, padding: "8px 14px",
                border: "1px solid #E5E7EB", fontSize: 13,
              }}>
                <span style={{ color: YELLOW, fontWeight: 800, fontSize: 11 }}>{s.label}</span>
                <span style={{ color: "#6B7280" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stream cards */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <StreamCard
              number="1"
              title="Job Commission (72% Keep)"
              icon={DollarSign}
              how="Upload photos of your work to your profile → AI detects service opportunities at that home → homeowner requests a quote → you book the job → ProLnk charges a 10% platform fee → you keep 72% of that fee directly."
              math="$8,400 job × 10% platform fee = $840 fee. You keep 72% = $604.80 your commission on a single job."
              timeline="Paid after homeowner confirms job complete. No waiting 30 days — payment releases within 48 hours of confirmation."
              accentColor={YELLOW}
            />

            <StreamCard
              number="2"
              title="Network Override (4 Levels, 7/4/2/1%)"
              icon={Users}
              how="Recruit another licensed pro into ProLnk. Every time they complete a job, you automatically earn a percentage of their commission — without doing any work on that job."
              math="Your L1 recruit earns $604.80 on a job → you earn 7% = $42.34 passively. 12 active recruits each doing 4 jobs/month = $2,040.48/month in override income from L1 alone."
              extra={<NetworkTree />}
              accentColor="#3B82F6"
            />

            <StreamCard
              number="3"
              title="Subscription Override (Recurring Monthly)"
              icon={RefreshCw}
              how="Every pro you recruit pays a $149/month platform subscription. You earn a percentage of their subscription fee every month for as long as they remain active — with no cap."
              math="10 recruits × $149/mo × 12% = $178.80/month recurring. That income arrives every month whether or not you do any jobs. 50 recruits = $894/mo in pure subscription override."
              timeline="Processed on the 1st of each month. Direct deposit to your linked bank account."
              accentColor="#22C55E"
            />

            <StreamCard
              number="4"
              title="Per-Lead Homeowner Fee ($25–100)"
              icon={Home}
              how="Bring homeowners to the TrustyPro platform and earn a per-lead fee when they qualify. No recruiting required — just connect homeowners who need services with the platform."
              math="$25–$100 per qualified homeowner. Qualifies when: they complete their property profile AND book their first service. 20 homeowners/month at $60 avg = $1,200/month in lead fees."
              timeline="Lead fee paid within 7 days of homeowner's first job completion. Fee amount negotiated in your partner agreement."
              accentColor="#A855F7"
            />

            <StreamCard
              number="5"
              title="Home Origination Rights (Permanent Revenue)"
              icon={Zap}
              how="Available to Charter and Founding tier members only. When you add a home to the Home Health Vault — by documenting a job there — you claim permanent origination rights to that property."
              math="100 homes × avg 2 jobs/year × $1,000 avg fee × 1.5% origination = $3,000/year in permanent passive income. These rights never expire. A home you originate in 2026 pays you in 2031."
              timeline="Rights are recorded permanently in the Vault the moment you document the first job at that property. Origination income compounds as more jobs occur at your originated homes."
              accentColor="#EC4899"
            />

          </div>

          {/* Income slider */}
          <div style={{ marginTop: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, margin: "0 0 10px" }}>
                Calculate Your Potential
              </h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>
                Slide to your volume and see estimated income across all 5 streams
              </p>
            </div>
            <IncomeSlider />
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 48,
            background: NAVY,
            borderRadius: 20,
            padding: "40px 36px",
            textAlign: "center",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: YELLOW_BG, border: `1px solid ${YELLOW_BORDER}`,
              borderRadius: 20, padding: "5px 14px", marginBottom: 16,
              fontSize: 11, color: YELLOW, fontWeight: 700, letterSpacing: "0.06em",
            }}>
              WAITLIST CLOSES AT 500 FOUNDING MEMBERS
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>
              Ready to Build Your Own System?
            </h3>
            <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              Founding Members lock in the $149/month rate, access all 5 income streams from day one, and receive priority placement in the matching algorithm.
            </p>
            <Link href="/apply">
              <button style={{
                background: YELLOW, color: NAVY, border: "none",
                borderRadius: 12, padding: "15px 36px",
                fontSize: 16, fontWeight: 800, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>
                Claim Your Founding Spot <ArrowRight size={18} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
