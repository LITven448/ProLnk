import { useState } from "react";
import { Link } from "wouter";

const METRICS = [
  { label: "Founding Network Price", value: "$149/mo", sub: "locked for life" },
  { label: "Founding Spots", value: "2,125", sub: "Charter + Founding tiers" },
  { label: "Service Categories", value: "93", sub: "trades covered" },
  { label: "Addressable Homes", value: "800K+", sub: "DFW metro market" },
  { label: "Income Streams", value: "5", sub: "per partner" },
];

const UNIT_ECONOMICS = [
  { milestone: "500 Pros", mrr: "$74.5K", note: "Breakeven" },
  { milestone: "2,125 Founding Pros", mrr: "$316K", note: "Founding tier filled" },
  { milestone: "10,000 Pros", mrr: "$1.49M", note: "Blended avg ~$149/mo" },
];

const TRACTION_ITEMS = [
  "Charter tier (25 spots) — filling now",
  "Founding tier (100 total) — open for applications",
  "800,000+ DFW homes targeted for Home Health Vault",
  "TrustyPro AI visual scan system live",
  "93 trade categories mapped to DFW service density",
];

export default function InvestorPage() {
  const [ndaChecked, setNdaChecked] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#080b12", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <header style={{ borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#22c55e" }}>ProLnk</span>
          <span style={{ color: "#64748b", fontSize: 12, marginLeft: 8 }}>× TrustyPro</span>
        </Link>
        <span style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase" }}>Confidential — Not for Distribution</span>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "80px 40px 60px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 11, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
          Pre-Seed Investment Opportunity
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: "#f8fafc" }}>
          ProLnk + TrustyPro<br />
          <span style={{ color: "#22c55e" }}>The Network That Owns the Home</span>
        </h1>
        <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 40px" }}>
          A two-sided marketplace for home services with a permanent data moat — 800K+ DFW homes,
          5-stream income model, and 93 trade categories. Founding network now open.
        </p>
        <a
          href="mailto:andrew@lit-ventures.com?subject=ProLnk%20Investor%20Deck%20Request"
          style={{ display: "inline-block", background: "#22c55e", color: "#000", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}
        >
          Request Investor Deck
        </a>
      </section>

      {/* Key Metrics */}
      <section style={{ maxWidth: 1000, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>Key Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e", marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontSize: 13, color: "#f1f5f9", fontWeight: 600, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Model Diagram */}
      <section style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 40 }}>Business Model</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
          {[
            { label: "Homeowners", icon: "🏠", sub: "Need quotes, health tracking" },
            null,
            { label: "ProLnk Platform", icon: "⚡", sub: "AI matching + 5-stream income" },
            null,
            { label: "Service Pros", icon: "🔧", sub: "93 trade categories" },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 8px" }}>
                <div style={{ width: 40, height: 2, background: "#22c55e" }} />
                <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #22c55e" }} />
              </div>
            ) : (
              <div key={item.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 24px", textAlign: "center", minWidth: 160 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{item.sub}</div>
              </div>
            )
          )}
        </div>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { title: "ProLnk", desc: "Connects service professionals with homeowners. AI-matched leads, 5-tier commission network." },
            { title: "TrustyPro", desc: "Home Health Vault — AI visual scan + permanent property data. Connects homeowners to vetted pros." },
          ].map((b) => (
            <div key={b.title} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Unit Economics */}
      <section style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 40 }}>Unit Economics at Scale</h2>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0d1117", borderBottom: "1px solid #1e293b" }}>
            {["Milestone", "Est. MRR", "Note"].map((h) => (
              <div key={h} style={{ padding: "12px 20px", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>
          {UNIT_ECONOMICS.map((row, i) => (
            <div key={row.milestone} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < UNIT_ECONOMICS.length - 1 ? "1px solid #1e293b" : "none" }}>
              <div style={{ padding: "16px 20px", fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{row.milestone}</div>
              <div style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{row.mrr}</div>
              <div style={{ padding: "16px 20px", fontSize: 13, color: "#94a3b8" }}>{row.note}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#475569", marginTop: 16 }}>
          Based on $149/mo subscription × active pro count. Blended avg used for 10K projection.
          Net margin target: 85% at scale.
        </p>
      </section>

      {/* Traction */}
      <section style={{ maxWidth: 700, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 32 }}>Traction</h2>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "28px 32px" }}>
          <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "#22c55e", fontWeight: 600, marginBottom: 20 }}>
            Waitlist open — Charter spots filling
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {TRACTION_ITEMS.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>
                <span style={{ color: "#22c55e", fontSize: 16, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Competitive Moat */}
      <section style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 32 }}>Competitive Moat</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { icon: "🏦", title: "Home Health Vault", desc: "50M+ homes long-term. Structural + health data as a permanent platform asset." },
            { icon: "🔒", title: "Network Lock-In", desc: "5-stream income makes switching cost prohibitive for founding partners." },
            { icon: "🤖", title: "AI Feedback Loop", desc: "Match quality improves continuously. Data moat compounds over time." },
            { icon: "⚖️", title: "Patent Pending", desc: "Network income system and lead matching algorithm protected." },
          ].map((m) => (
            <div key={m.title} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "20px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{m.title}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NDA + Financials */}
      <section style={{ maxWidth: 700, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "36px 40px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>Detailed Financials</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>
            Full financial projections, cap table, and use-of-funds breakdown available under NDA.
            Check the box below to confirm you are viewing this information as a prospective investor
            and agree to maintain confidentiality.
          </p>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 24 }}>
            <input
              type="checkbox"
              checked={ndaChecked}
              onChange={(e) => { setNdaChecked(e.target.checked); if (!e.target.checked) setShowFinancials(false); }}
              style={{ marginTop: 2, accentColor: "#22c55e", width: 16, height: 16, flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
              I confirm I am a prospective investor or authorized party. I agree to keep all financial
              details, projections, and business information strictly confidential and not share or
              distribute this information without written consent from ProLnk / LIT Ventures.
            </span>
          </label>
          {ndaChecked && !showFinancials && (
            <button
              onClick={() => setShowFinancials(true)}
              style={{ background: "#22c55e", color: "#000", border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
            >
              View Financial Summary
            </button>
          )}
          {showFinancials && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Pre-seed Ask", value: "$750K", note: "SAFE, $8M cap" },
                  { label: "Use of Funds", value: "18 mo runway", note: "Eng, GTM, AI infra" },
                  { label: "Break-even", value: "500 Pros", note: "~$74.5K MRR" },
                  { label: "Target Round", value: "Seed: $3M", note: "12 months post-launch" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 10, padding: "16px" }}>
                    <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>{item.value}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{item.note}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, borderTop: "1px solid #1e293b", paddingTop: 16 }}>
                Full financial model, detailed projections, and investor deck available on request.
                Contact <a href="mailto:andrew@lit-ventures.com" style={{ color: "#22c55e" }}>andrew@lit-ventures.com</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "60px 24px 100px", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", marginBottom: 16 }}>Ready to Learn More?</h2>
        <p style={{ fontSize: 15, color: "#64748b", marginBottom: 32, lineHeight: 1.7 }}>
          We're building the network infrastructure for the $600B home services market.
          Founding spots are limited. Deck and data room available on request.
        </p>
        <a
          href="mailto:andrew@lit-ventures.com?subject=ProLnk%20Investor%20Deck%20Request"
          style={{ display: "inline-block", background: "#22c55e", color: "#000", fontWeight: 700, fontSize: 16, padding: "16px 40px", borderRadius: 10, textDecoration: "none" }}
        >
          Request Investor Deck
        </a>
        <div style={{ marginTop: 20, fontSize: 13, color: "#334155" }}>
          andrew@lit-ventures.com · DFW, Texas · Founded 2024
        </div>
      </section>

    </div>
  );
}
