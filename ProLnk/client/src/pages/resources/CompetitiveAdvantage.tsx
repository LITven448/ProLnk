import React from 'react';
import { useState } from "react";
import {
  Check, X, DollarSign, TrendingUp, Star, Users, Zap,
  Shield, Award, ChevronRight, Calculator,
} from "lucide-react";
import { Link } from "wouter";

// ─── Comparison data ──────────────────────────────────────────────────────────

const FEATURES = [
  { feature: "No pay-per-lead fees", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Angi charges $15–$85 per lead regardless of outcome" },
  { feature: "Network income (earn from referrals)", prolnk: true, angi: false, ha: false, thumbtack: false, note: "ProLnk's 4-level network income — unique in the industry" },
  { feature: "Keep 60%+ of every job", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Competitors take 15–40% via fees and mandatory packages" },
  { feature: "Algorithm-based lead ranking", prolnk: true, angi: "partial", ha: "partial", thumbtack: "partial", note: "ProLnk ranks by quality, reviews, and response rate — not ad spend" },
  { feature: "Fixed monthly subscription ($149)", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Angi & HA push annual memberships $300–$3,000+" },
  { feature: "Subscription income override", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Earn 12% recurring on every pro you refer — forever" },
  { feature: "Home origination rights", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Permanent revenue share from homes you bring to the platform" },
  { feature: "No bid wars / price race", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Thumbtack and HA pit pros against each other on price" },
  { feature: "AI-matched leads to your trade", prolnk: true, angi: false, ha: false, thumbtack: "partial", note: "ProLnk's AI only routes leads you actually service" },
  { feature: "DFW market intelligence", prolnk: true, angi: false, ha: false, thumbtack: false, note: "Real-time pricing data and demand signals (this page!)" },
  { feature: "Transparent commission dashboard", prolnk: true, angi: false, ha: false, thumbtack: false, note: "See every dollar, every source, in real time" },
  { feature: "Founding partner tier lock-in", prolnk: true, angi: false, ha: false, thumbtack: false, note: "$149/mo locked for life for Founding Partners" },
];

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    trade: "HVAC — Plano, TX",
    quote: "I was spending $1,400/month on Angi leads and closing maybe 30% of them. With ProLnk my cost is fixed at $149 and I'm not competing on price anymore. My margin went from 28% to 51% in two months.",
    stars: 5,
    saving: "$1,251/mo",
  },
  {
    name: "Daniela R.",
    trade: "Roofing — Arlington, TX",
    quote: "HomeAdvisor would give the same lead to 5 contractors. I'd spend $60 on the lead, waste an hour driving out, and lose the job to someone who underbid me. ProLnk changed the math entirely.",
    stars: 5,
    saving: "$820/mo",
  },
  {
    name: "Jeff W.",
    trade: "Plumbing — Fort Worth, TX",
    quote: "The network income is something I never expected. I've referred 4 plumbers and 2 electricians. That's an extra $380/month I'm earning just from helping friends get on the platform.",
    stars: 5,
    saving: "$380/mo network",
  },
  {
    name: "Sandra K.",
    trade: "General Contractor — McKinney, TX",
    quote: "Thumbtack kept raising their credit prices. I had no idea what my marketing spend would be month to month. ProLnk is $149, period. I can actually plan my business now.",
    stars: 5,
    saving: "$600/mo predictability",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CompetitiveAdvantage() {
  const [jobs, setJobs] = useState(8);
  const [avgJob, setAvgJob] = useState(600);
  const [angiLeadCost, setAngiLeadCost] = useState(45);
  const [closeRate, setCloseRate] = useState(35);

  // Angi cost model
  const leadsNeededForJobs = jobs / (closeRate / 100);
  const angiMonthly = Math.round(leadsNeededForJobs * angiLeadCost);
  const angiAnnual = angiMonthly * 12;
  const prolnkAnnual = 149 * 12;
  const annualSavings = angiAnnual - prolnkAnnual;
  const lifetimeSavings5yr = annualSavings * 5;

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e5e7eb", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Link href="/resources" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>Resources</Link>
          <ChevronRight size={14} color="#6b7280" />
          <span style={{ color: "#e5e7eb", fontSize: 13 }}>Why ProLnk Wins</span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e",
            fontWeight: 600, marginBottom: 16,
          }}>
            <Award size={12} /> ProLnk vs the Competition
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>
            Why Pros Are Leaving Angi, HomeAdvisor,<br />and Thumbtack for ProLnk
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
            The old platforms sell your leads to 5 competitors and charge you win or lose.
            ProLnk flips the model: fixed cost, network income, and jobs that actually match your trade.
          </p>
        </div>

        {/* ── Comparison Table ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18 }}>Feature Comparison</h2>
          <div style={{ background: "#1a1d27", borderRadius: 16, border: "1px solid #1e2330", overflow: "hidden" }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 110px 110px 110px 110px",
              padding: "14px 20px",
              background: "#141720",
              borderBottom: "1px solid #1e2330",
            }}>
              <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Feature</span>
              {(["ProLnk", "Angi", "HomeAdvisor", "Thumbtack"] as const).map((p, i) => (
                <span key={i} style={{
                  textAlign: "center",
                  fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
                  color: i === 0 ? "#22c55e" : "#6b7280",
                }}>
                  {p}
                </span>
              ))}
            </div>

            {FEATURES.map((row, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 110px 110px 110px",
                padding: "13px 20px",
                borderBottom: i < FEATURES.length - 1 ? "1px solid #1e2330" : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                alignItems: "center",
              }}>
                <div>
                  <div style={{ color: "#e5e7eb", fontSize: 14 }}>{row.feature}</div>
                  <div style={{ color: "#4b5563", fontSize: 11, marginTop: 2 }}>{row.note}</div>
                </div>
                {[row.prolnk, row.angi, row.ha, row.thumbtack].map((val, ci) => (
                  <div key={ci} style={{ textAlign: "center" }}>
                    {val === true
                      ? <Check size={18} color={ci === 0 ? "#22c55e" : "#22c55e"} />
                      : val === "partial"
                      ? <span style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600 }}>Partial</span>
                      : <X size={18} color="#ef4444" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Differentiators ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18 }}>What Makes ProLnk Different</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            <DiffCard
              icon={<DollarSign size={20} color="#22c55e" />}
              title="No Pay-Per-Lead"
              accent="#22c55e"
              body="Angi charges $15–$85 per lead, sent to up to 5 pros simultaneously. You pay whether you win or lose. ProLnk is $149/month flat — no surprise charges."
            />
            <DiffCard
              icon={<TrendingUp size={20} color="#3b82f6" />}
              title="4-Level Network Income"
              accent="#3b82f6"
              body="Refer a plumber, earn 1% of every job they do — forever. Their referrals earn you 0.5%. No other platform in the industry offers this. Angi keeps 100% of network growth."
            />
            <DiffCard
              icon={<Shield size={20} color="#f59e0b" />}
              title="60% Keeper Rate"
              accent="#f59e0b"
              body="Keep 60% of every job matched through ProLnk. HomeAdvisor's annual membership alone can cost $300–$3,000+, before you buy a single lead."
            />
            <DiffCard
              icon={<Zap size={20} color="#8b5cf6" />}
              title="AI Match — Not Bid Wars"
              accent="#8b5cf6"
              body="ProLnk's AI routes leads to the best-fit pro based on trade, area, and rating — not whoever undercuts the most. No more race to the bottom on price."
            />
          </div>
        </section>

        {/* ── Savings Calculator ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <Calculator size={18} color="#22c55e" />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Calculate Your Savings vs Angi</h2>
          </div>
          <div style={{ background: "#1a1d27", borderRadius: 16, border: "1px solid #1e2330", padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 28 }}>
              <SliderInput
                label="Jobs per month"
                value={jobs}
                min={1} max={40}
                onChange={setJobs}
                display={String(jobs)}
              />
              <SliderInput
                label="Average job value ($)"
                value={avgJob}
                min={100} max={5000} step={50}
                onChange={setAvgJob}
                display={`$${avgJob.toLocaleString()}`}
              />
              <SliderInput
                label="Avg Angi lead cost ($)"
                value={angiLeadCost}
                min={10} max={150}
                onChange={setAngiLeadCost}
                display={`$${angiLeadCost}`}
              />
              <SliderInput
                label="Your close rate (%)"
                value={closeRate}
                min={10} max={90}
                onChange={setCloseRate}
                display={`${closeRate}%`}
              />
            </div>

            {/* Results */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
              <CalcCard label="Angi cost / month" value={`$${angiMonthly.toLocaleString()}`} accent="#ef4444" sub={`${Math.round(leadsNeededForJobs)} leads × $${angiLeadCost}`} />
              <CalcCard label="ProLnk cost / month" value="$149" accent="#22c55e" sub="Flat subscription, no surprise fees" />
              <CalcCard label="Monthly savings" value={`$${Math.max(0, angiMonthly - 149).toLocaleString()}`} accent="#22c55e" sub="Straight to your bottom line" />
              <CalcCard label="5-year savings" value={`$${Math.max(0, lifetimeSavings5yr).toLocaleString()}`} accent="#f59e0b" sub="vs. staying on Angi forever" />
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18 }}>What Pros Are Saying</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(460px,1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "#1a1d27",
                borderRadius: 14,
                border: "1px solid #1e2330",
                padding: 24,
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.65, margin: "0 0 16px", fontStyle: "italic" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{t.trade}</div>
                  </div>
                  <div style={{
                    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
                    borderRadius: 8, padding: "4px 12px",
                    color: "#22c55e", fontSize: 12, fontWeight: 700,
                  }}>
                    Saves {t.saving}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(59,130,246,0.08) 100%)",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 18,
          padding: 36,
          textAlign: "center",
          marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
            Ready to Stop Paying Per Lead?
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 24px" }}>
            Join the Founding Partner program — $149/mo locked for life, network income from day one.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/founding-partner">
              <button style={{
                background: "#22c55e", color: "#fff",
                border: "none", borderRadius: 10,
                padding: "13px 28px", fontSize: 15, fontWeight: 700,
                cursor: "pointer",
              }}>
                Claim Your Founding Spot
              </button>
            </Link>
            <Link href="/dashboard/market">
              <button style={{
                background: "transparent", color: "#9ca3af",
                border: "1px solid #374151", borderRadius: 10,
                padding: "13px 28px", fontSize: 15, fontWeight: 600,
                cursor: "pointer",
              }}>
                View Market Intelligence
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DiffCard({ icon, title, accent, body }: { icon: React.ReactNode; title: string; accent: string; body: string }) {
  return (
    <div style={{
      background: "#1a1d27",
      borderRadius: 14,
      border: "1px solid #1e2330",
      padding: 22,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `${accent}1a`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14,
      }}>
        {icon}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function CalcCard({ label, value, accent, sub }: { label: string; value: string; accent: string; sub: string }) {
  return (
    <div style={{
      background: "#141720",
      borderRadius: 12,
      border: "1px solid #1e2330",
      padding: "18px 20px",
    }}>
      <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#4b5563", fontSize: 11, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function SliderInput({
  label, value, min, max, step = 1, onChange, display,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; onChange: (v: number) => void; display: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#9ca3af", fontSize: 13 }}>{label}</span>
        <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#22c55e" }}
      />
    </div>
  );
}
