import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  TrendingUp, DollarSign, Users, Shield, Zap, Globe,
  BarChart3, Lock, Brain, ChevronDown, ChevronUp,
  Mail, ArrowRight, CheckCircle, Star
} from "lucide-react";

const HERO_STATS = [
  { value: "$600B", label: "TAM", sub: "US Home Services" },
  { value: "$120B", label: "SAM", sub: "Referral-Addressable" },
  { value: "85%", label: "Net Margin", sub: "At scale" },
  { value: "14.4×", label: "LTV:CAC", sub: "Unit economics" },
  { value: "500″, label: "Break-even", sub: "Active pros" },
  { value: "2,125″, label: "Founding Spots", sub: "Charter + Founding" },
];

const REVENUE_STREAMS = [
  {
    icon: DollarSign,
    color: "#22c55e",
    title: "Stream 1: Direct Commission",
    range: "12–70% per match",
    desc: "Tiered by volume. New partners earn 12%; top-tier (500+ matches) earn 70%. Match value grows with partner tenure.",
    tiers: ["Tier 1 (New): 12%", "Tier 2 (10 matches): 20%", "Tier 3 (50): 35%", "Tier 4 (100+): 50%", "Tier 5 (500+): 70%"],
  },
  {
    icon: Users,
    color: "#3b82f6″,
    title: "Stream 2: Network Override",
    range: "1–4% per level (4 levels)",
    desc: "Partners earn override on every job completed by pros in their recruited network — 4 levels deep.",
    tiers: ["Level 1 recruits: 1%", "Level 2 recruits: 0.5%", "Level 3 recruits: 0.25%", "Level 4 recruits: 0.1%"],
  },
  {
    icon: TrendingUp,
    color: "#a855f7″,
    title: "Stream 3: Subscription Override",
    range: "10% recurring",
    desc: "Every pro you refer pays $149/mo. You earn 10% of their subscription — permanently, as long as they're active.",
    tiers: ["$149/mo partner subscription", "10% recurring override", "Perpetual while active", "No cap"],
  },
  {
    icon: Globe,
    color: "#f59e0b",
    title: "Stream 4: Homeowner Override",
    range: "$25–$100 per qualified lead",
    desc: "Partners who source homeowners earn a negotiated per-lead fee on every qualified homeowner they bring to the platform.",
    tiers: ["Typical range: $25–$100″, "Based on lead quality", "Negotiated per partner", "Ongoing per lead"],
  },
  {
    icon: Lock,
    color: "#06b6d4″,
    title: "Stream 5: Home Origination",
    range: "Permanent revenue share",
    desc: "Help a homeowner add their property to the Home Health Vault. Earn a permanent share of all platform fees tied to that home — forever.",
    tiers: ["Home added to Vault", "Permanent revenue right", "Platform fees shared", "No expiration"],
  },
];

const UNIT_ECONOMICS = [
  { milestone: "500 Pros", mrr: "$74.5K", margin: "—", note: "Breakeven" },
  { milestone: "2,125 Founding Pros", mrr: "$316K", margin: "78%", note: "Founding tiers filled" },
  { milestone: "5,000 Pros", mrr: "$745K", margin: "82%", note: "Series A territory" },
  { milestone: "10,000 Pros", mrr: "$1.49M", margin: "85%", note: "Target steady state" },
];

const MOAT = [
  { icon: Brain, color: "#22c55e", title: "Home Health Vault", desc: "50M+ homes targeted. Structural + health data as a permanent, compounding platform asset. Locked to the property, not the user." },
  { icon: Lock, color: "#3b82f6″, title: "Network Lock-In", desc: "5-stream income makes switching prohibitive. A partner earning commissions across 4 levels of a network has no rational path to leave." },
  { icon: Zap, color: "#a855f7″, title: "AI Feedback Loop", desc: "Match quality compounds as the model trains on closed jobs. After 500K photos the detection model becomes an uncopyable asset." },
  { icon: Shield, color: "#f59e0b", title: "Patent Pending", desc: "Network income system and AI lead matching algorithm are protected. Provisional filed; continuation strategy in place." },
];

const TRACTION = [
  "Charter tier (25 spots) — filling now",
  "800,000+ DFW homes mapped across 93 trade categories",
  "TrustyPro AI visual scan system live for homeowners",
  "Full platform built: partner portal, admin, AI pipeline, email flows",
  "47 AI agents orchestrating operations autonomously",
  "Railway + TiDB production stack live, Cloudflare DNS active",
];

const TEAM = [
  {
    initials: "AF",
    name: "Andrew Frakes",
    title: "Founder & CEO",
    bio: "Systems entrepreneur and founder of ProLnk and TrustyPro. Based in DFW, Texas. Building the network infrastructure layer for the $600B home services market — combining AI-powered lead matching, a 5-stream income model for service professionals, and the Home Health Vault targeting 50M+ homes.",
    email: "andrew@lit-ventures.com",
    gradient: "linear-gradient(135deg, #22c55e, #0ea5e9)",
  },
];

const CAP_TABLE_PLACEHOLDERS = [
  { party: "Andrew Frakes (Founder)", stake: "~85%", note: "Pre-seed, pre-dilution" },
  { party: "Pre-Seed Investors (SAFE)", stake: "TBD", note: "$8M valuation cap" },
  { party: "Option Pool (Reserved)", stake: "~10%", note: "For key hires post-seed" },
  { party: "Advisors", stake: "~5%", note: "Vesting over 2 years" },
];

function StreamCard({ stream, open, onToggle }: { stream: typeof REVENUE_STREAMS[0]; open: boolean; onToggle: () => void }) {
  const Icon = stream.icon;
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: `${stream.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={18} color={stream.color} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9″ }}>{stream.title}</div>
            <div style={{ fontSize: 12, color: stream.color, marginTop: 2 }}>{stream.range}</div>
          </div>
        </div>
        {open ? <ChevronUp size={16} color="#475569″ /> : <ChevronDown size={16} color="#475569" />}
      </button>
      {open && (
        <div style={{ padding: "0 22px 20px", borderTop: "1px solid #1e293b" }}>
          <p style={{ fontSize: 13, color: "#94a3b8″, lineHeight: 1.7, margin: "16px 0 12px" }}>{stream.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stream.tiers.map(t => (
              <span key={t} style={{ fontSize: 11, background: `${stream.color}12`, border: `1px solid ${stream.color}30`, color: stream.color, borderRadius: 6, padding: "3px 10px", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InvestorPage() {
  const [openStream, setOpenStream] = useState<number | null>(0);
  const [ndaChecked, setNdaChecked] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);
  const [showDeckForm, setShowDeckForm] = useState(false);
  const [deckForm, setDeckForm] = useState({ name: "", firm: "", email: "" });

  function handleDeckRequest(e: React.FormEvent) {
    e.preventDefault();
    const subject = `ProLnk Investor Deck Request — ${deckForm.firm}`;
    const body = `Name: ${deckForm.name}\nFirm: ${deckForm.firm}\nEmail: ${deckForm.email}`;
    window.location.href = `mailto:andrew@lit-ventures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowDeckForm(false);
  }

  return (
    <>
      <Helmet>
        <title>ProLnk — Investor Overview</title>
        <meta name="description" content="ProLnk is building the network economy for home services. Pre-seed investment opportunity — $600B TAM, 5-stream income model, permanent data moat." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#080b12″, color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>

        {/* Nav */}
        <header style={{ borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#080b12″, zIndex: 50 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#22c55e" }}>ProLnk</span>
            <span style={{ color: "#334155″, fontSize: 12 }}>× TrustyPro</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 10, color: "#334155″, letterSpacing: "0.12em", textTransform: "uppercase" }}>Confidential — Not for Distribution</span>
            <a
              href="mailto:andrew@lit-ventures.com?subject=ProLnk%20Investor%20Deck%20Request"
              style={{ fontSize: 12, color: "#22c55e", textDecoration: "none", fontWeight: 600, border: "1px solid #22c55e30″, borderRadius: 6, padding: "6px 12px" }}
            >
              Request Deck
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ textAlign: "center", padding: "90px 40px 70px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: "5px 16px", fontSize: 11, color: "#22c55e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>
            <Star size={11} />
            Pre-Seed Investment Opportunity · DFW, Texas
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5.5vw, 54px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24, color: "#f8fafc", letterSpacing: "-0.02em" }}>
            ProLnk is building the<br />
            <span style={{ color: "#22c55e" }}>network economy for home services</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94a3b8″, lineHeight: 1.75, maxWidth: 660, margin: "0 auto 48px" }}>
            A two-sided marketplace with a permanent data moat — AI-powered lead matching,
            a 5-stream income model that locks in service professionals, and the Home Health Vault
            targeting 50M+ US homes.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowDeckForm(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#000″, fontWeight: 800, fontSize: 15, padding: "15px 34px", borderRadius: 10, border: "none", cursor: "pointer" }}
            >
              Request Investor Deck <ArrowRight size={16} />
            </button>
            <a
              href="mailto:andrew@lit-ventures.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#94a3b8″, fontWeight: 600, fontSize: 15, padding: "15px 34px", borderRadius: 10, border: "1px solid #1e293b", textDecoration: "none" }}
            >
              <Mail size={16} /> Contact Founder
            </a>
          </div>

          {/* Deck Request Form */}
          {showDeckForm && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "40px", maxWidth: 440, width: "100%" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9″, marginBottom: 6 }}>Request Investor Deck</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>We'll follow up within 24 hours with the full deck and data room access.</p>
                <form onSubmit={handleDeckRequest} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { key: "name", label: "Your Name", placeholder: "Jane Smith" },
                    { key: "firm", label: "Firm / Organization", placeholder: "Sequoia Capital" },
                    { key: "email", label: "Email Address", placeholder: "jane@firm.com" },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569″, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{field.label}</label>
                      <input
                        required
                        type={field.key === "email" ? "email" : "text"}
                        value={deckForm[field.key as keyof typeof deckForm]}
                        onChange={e => setDeckForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        style={{ width: "100%", background: "#0d1117″, border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button type="submit" style={{ flex: 1, background: "#22c55e", color: "#000″, border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                      Send Request
                    </button>
                    <button type="button" onClick={() => setShowDeckForm(false)} style={{ flex: 1, background: "#1e293b", color: "#94a3b8″, border: "none", padding: "12px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* Market Metrics */}
        <section style={{ maxWidth: 1100, margin: "0 auto 90px", padding: "0 24px" }}>
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#334155″, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>Market & Business Metrics</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {HERO_STATS.map(s => (
              <div key={s.label} style={{ background: "#0d1117″, border: "1px solid #1e293b", borderRadius: 12, padding: "24px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.02em", marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9″, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#334155″ }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Size Breakdown */}
        <section style={{ maxWidth: 860, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 8, textAlign: "center" }}>Market Opportunity</h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 40 }}>Three concentric markets, one platform</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { label: "TAM", value: "$600B", desc: "Total US home services market — plumbing, HVAC, electrical, roofing, landscaping, and 90+ other trades.", color: "#22c55e" },
              { label: "SAM", value: "$120B", desc: "Referral-addressable segment — pros who use or would use a lead network platform. ~20% of total market.", color: "#3b82f6″ },
              { label: "SOM (Yr 3)", value: "$12M", desc: "Serviceable obtainable market — 3,000 founding partners across 5–8 US metros at $149/mo + match fees.", color: "#a855f7″ },
            ].map(m => (
              <div key={m.label} style={{ background: "#0f172a", border: `1px solid ${m.color}30`, borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{m.label}</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: m.color, marginBottom: 12, letterSpacing: "-0.02em" }}>{m.value}</div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Model — 5 Streams */}
        <section style={{ maxWidth: 860, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 8, textAlign: "center" }}>5 Revenue Streams Per Partner</h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 40 }}>Every partner earns from 5 independent income channels — creating strong retention economics</p>
          {REVENUE_STREAMS.map((stream, i) => (
            <StreamCard
              key={stream.title}
              stream={stream}
              open={openStream === i}
              onToggle={() => setOpenStream(openStream === i ? null : i)}
            />
          ))}
          <div style={{ marginTop: 20, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "16px 20px" }}>
            <p style={{ fontSize: 13, color: "#4ade80″, margin: 0, lineHeight: 1.6 }}>
              <strong>Why this matters:</strong> A founding partner earning across all 5 streams — especially the network cascade and origination rights — creates income so entangled with the platform that churn becomes economically irrational. This is structural retention, not preference-based.
            </p>
          </div>
        </section>

        {/* Unit Economics */}
        <section style={{ maxWidth: 860, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 40, textAlign: "center" }}>Unit Economics at Scale</h2>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", background: "#080b12″, borderBottom: "1px solid #1e293b" }}>
              {["Milestone", "Est. MRR", "Net Margin", "Note"].map(h => (
                <div key={h} style={{ padding: "12px 20px", fontSize: 11, fontWeight: 700, color: "#334155″, letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</div>
              ))}
            </div>
            {UNIT_ECONOMICS.map((row, i) => (
              <div key={row.milestone} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", borderBottom: i < UNIT_ECONOMICS.length - 1 ? "1px solid #1e293b" : "none", background: i % 2 === 0 ? "transparent" : "#0d1117″ }}>
                <div style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#f1f5f9″ }}>{row.milestone}</div>
                <div style={{ padding: "16px 20px", fontSize: 14, fontWeight: 800, color: "#22c55e" }}>{row.mrr}</div>
                <div style={{ padding: "16px 20px", fontSize: 14, color: "#64748b" }}>{row.margin}</div>
                <div style={{ padding: "16px 20px", fontSize: 13, color: "#94a3b8″ }}>{row.note}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#334155″, marginTop: 14 }}>
            Based on $149/mo × active pro count. 85% net margin target at 10K pros.
            Break-even at 500 pros = $74.5K MRR.
          </p>
        </section>

        {/* Traction */}
        <section style={{ maxWidth: 780, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 32, textAlign: "center" }}>Traction</h2>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "32px 36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: "4px 14px", fontSize: 11, color: "#22c55e", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              LIVE — Charter spots filling now
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {TRACTION.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, fontSize: 14, color: "#cbd5e1″, lineHeight: 1.6 }}>
                  <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Competitive Moat */}
        <section style={{ maxWidth: 860, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 8, textAlign: "center" }}>Competitive Moat</h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 40 }}>Four structural advantages that compound over time</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {MOAT.map(m => {
              const Icon = m.icon;
              return (
                <div key={m.title} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "22px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${m.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={20} color={m.color} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9″, marginBottom: 8 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{m.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section style={{ maxWidth: 780, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 32, textAlign: "center" }}>Team</h2>
          {TEAM.map(t => (
            <div key={t.name} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "32px 36px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 76, height: 76, borderRadius: "50%", background: t.gradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#000″ }}>{t.initials}</div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9″, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 700, marginBottom: 16 }}>{t.title}</div>
                <p style={{ fontSize: 14, color: "#94a3b8″, lineHeight: 1.75, margin: "0 0 16px" }}>{t.bio}</p>
                <a href={`mailto:${t.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", textDecoration: "none" }}>
                  <Mail size={13} /> {t.email}
                </a>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#475569″, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Advisory Board (Forming)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {["Operations: Former VP Ops, ServiceMaster", "Technology: ML Engineer, mapping systems", "Finance: PE-backed home services operator", "Legal: IP attorney, platform businesses"].map(a => (
                <div key={a} style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#334155″, marginTop: 1 }}>→</span> {a}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NDA + Financials */}
        <section style={{ maxWidth: 700, margin: "0 auto 90px", padding: "0 24px" }}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "40px 44px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <BarChart3 size={20} color="#22c55e" />
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9″, margin: 0 }}>Detailed Financials</h2>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24, lineHeight: 1.65 }}>
              Full projections, cap table, use-of-funds breakdown, and SAFE terms available under NDA.
              Check the box to confirm you are a prospective investor and agree to maintain confidentiality.
            </p>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 24 }}>
              <input
                type="checkbox"
                checked={ndaChecked}
                onChange={e => { setNdaChecked(e.target.checked); if (!e.target.checked) setShowFinancials(false); }}
                style={{ marginTop: 3, accentColor: "#22c55e", width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: "#94a3b8″, lineHeight: 1.65 }}>
                I confirm I am a prospective investor or authorized party. I agree to keep all financial details,
                projections, and business information strictly confidential and not share or distribute this
                information without written consent from ProLnk / LIT Ventures.
              </span>
            </label>
            {ndaChecked && !showFinancials && (
              <button
                onClick={() => setShowFinancials(true)}
                style={{ background: "#22c55e", color: "#000″, border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                View Financial Summary
              </button>
            )}
            {showFinancials && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                  {[
                    { label: "Pre-seed Ask", value: "$750K", note: "SAFE, $8M valuation cap" },
                    { label: "Use of Funds", value: "18 mo runway", note: "Eng, GTM, AI infrastructure" },
                    { label: "Break-even", value: "500 Pros", note: "~$74.5K MRR" },
                    { label: "Target Round", value: "Seed: $3M", note: "12 months post-launch" },
                  ].map(item => (
                    <div key={item.label} style={{ background: "#080b12″, border: "1px solid #1e293b", borderRadius: 10, padding: "18px" }}>
                      <div style={{ fontSize: 11, color: "#334155″, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#22c55e", marginBottom: 4 }}>{item.value}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{item.note}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "#334155″, lineHeight: 1.65, borderTop: "1px solid #1e293b", paddingTop: 16, margin: 0 }}>
                  Full financial model, detailed projections, and investor deck available on request.
                  Contact <a href="mailto:andrew@lit-ventures.com" style={{ color: "#22c55e" }}>andrew@lit-ventures.com</a>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Cap Table Basics */}
        <section style={{ maxWidth: 700, margin: "0 auto 90px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9″, marginBottom: 8, textAlign: "center" }}>Cap Table Basics</h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 32 }}>Preliminary — subject to change at close</p>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", background: "#080b12″, borderBottom: "1px solid #1e293b" }}>
              {["Party", "Stake", "Notes"].map(h => (
                <div key={h} style={{ padding: "12px 20px", fontSize: 11, fontWeight: 700, color: "#334155″, letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</div>
              ))}
            </div>
            {CAP_TABLE_PLACEHOLDERS.map((row, i) => (
              <div key={row.party} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", borderBottom: i < CAP_TABLE_PLACEHOLDERS.length - 1 ? "1px solid #1e293b" : "none", background: i % 2 === 0 ? "transparent" : "#0d1117″ }}>
                <div style={{ padding: "15px 20px", fontSize: 14, color: "#f1f5f9″ }}>{row.party}</div>
                <div style={{ padding: "15px 20px", fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{row.stake}</div>
                <div style={{ padding: "15px 20px", fontSize: 13, color: "#64748b" }}>{row.note}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#334155″, marginTop: 14 }}>
            Full cap table, vesting schedules, and SAFE terms available in the data room under NDA.
          </p>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", padding: "60px 24px 110px", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9″, marginBottom: 14 }}>Ready to Learn More?</h2>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: 36, lineHeight: 1.75 }}>
            We're building the network infrastructure for the $600B home services market.
            Founding spots are limited. Full deck and data room available on request.
          </p>
          <button
            onClick={() => setShowDeckForm(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#000″, fontWeight: 800, fontSize: 16, padding: "16px 40px", borderRadius: 10, border: "none", cursor: "pointer" }}
          >
            Request Investor Deck <ArrowRight size={16} />
          </button>
          <div style={{ marginTop: 22, fontSize: 13, color: "#1e293b" }}>
            andrew@lit-ventures.com · DFW, Texas · Founded 2024
          </div>
        </section>

      </div>
    </>
  );
}
