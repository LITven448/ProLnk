import { useState } from 'react';

const investorData: Record<string, { metrics: string[]; thesis: string[] }> = {
  angel: {
    metrics: [
      "Pre-seed valuation: $4.2M — below comparable marketplace platforms at equivalent stage",
      "Seed target: $1.2M for 18 months runway — covers platform buildout and first 500 Pro activations",
      "Revenue at 500 Pros (break-even): $149/mo x 500 = $74,500 MRR + match fees",
      "Founder check size: $25K–$100K — SAFE note with 20% discount and $8M cap",
      "Expected exit: Series A in 18–24 months at $15–25M valuation based on comparable raises",
    ],
    thesis: [
      "DFW home services market is a $2.1B annual opportunity with no dominant platform",
      "Network income system creates viral Pro acquisition — every Pro recruits 2–4 others",
      "Home Health Vault data asset becomes independently valuable — licensing revenue by year 3",
      "Founder has deep DFW market knowledge and existing contractor relationships",
      "AI agent infrastructure means ProLnk can scale to 10,000 Pros with minimal headcount increase",
    ],
  },
  institutional: {
    metrics: [
      "Total addressable market (DFW alone): $2.1B annually in home services transactions",
      "Net revenue margin at scale: 85% — AI-driven operations eliminate most variable costs",
      "Network effect coefficient: each additional Pro increases value to all existing Pros and homeowners",
      "Data moat: Home Health Vault tracks 50M+ homes — creates proprietary matching intelligence",
      "Expansion thesis: DFW to Houston, Austin, San Antonio within 24 months of DFW profitability",
    ],
    thesis: [
      "Two-sided marketplace with network effects — winner-take-most dynamics in each metro",
      "Subscription + transaction model creates predictable recurring revenue with high LTV",
      "5-stream network income system locks in Pro base — switching cost is permanent income loss",
      "AI automation achieves 85% net margins — unit economics improve as scale increases",
      "Data asset (Home Health Vault) creates a second business — licensing to insurance, mortgage, proptech",
    ],
  },
  strategic: {
    metrics: [
      "130+ database tables built — full platform operational infrastructure already in place",
      "47 AI agents deployed — autonomous operations across marketing, finance, support, and engineering",
      "DFW pilot market: 8.1M residents, 3.2M housing units, $2.1B annual home services spend",
      "Waitlist phase validates demand before capital deployment — de-risked model",
      "Platform runs on $12K/month fixed costs at launch — extremely capital-efficient",
    ],
    thesis: [
      "Acquisition target for home services platforms, insurance companies, or real estate data providers",
      "Home Health Vault data is independently acquirable — structural home data is a premium asset",
      "Network of vetted contractors is a distribution asset — plugs into adjacent platforms immediately",
      "AI agent infrastructure is transferable — applicable to any service marketplace vertical",
      "DFW market entry creates proven playbook for national or international expansion",
    ],
  },
  family_office: {
    metrics: [
      "Conservative 5-year projection: 5,000 active Pros generating $22M ARR at 85% margin",
      "Home Health Vault licensing: $5–15M additional revenue stream by year 4",
      "Capital efficiency: every $1M invested translates to $8–12M in platform value at Series A",
      "Dividend potential: platform reaches profitability at 500 Pros — distributions possible by year 2",
      "Downside protection: physical contractor relationships and data asset retain value even in downside scenarios",
    ],
    thesis: [
      "Real assets underpin this business — home service contractors and real property data are recession-resilient",
      "Monthly subscription revenue (not transactional) provides income statement stability",
      "Texas market is structurally favorable — population growth, no state income tax, housing expansion",
      "Management team operates with AI leverage — low headcount, high output, minimal operational risk",
      "Clear exit paths: IPO, strategic acquisition, or continued cash-flowing private operation",
    ],
  },
};

const traction = [
  { label: "Platform Pages Built", value: "140+", icon: "🏗️" },
  { label: "Database Tables", value: "130+", icon: "🗄️" },
  { label: "AI Agents Deployed", value: "47", icon: "🤖" },
  { label: "Target Market Size", value: "$2.1B", icon: "💰" },
  { label: "Break-Even Pro Count", value: "500", icon: "📊" },
  { label: "Net Margin at Scale", value: "85%", icon: "📈" },
];

export default function ProLnkInvestorPage() {
  const [investorType, setInvestorType] = useState<string>("");
  const [showData, setShowData] = useState(false);

  const types = [
    { value: "angel", label: "👼 Angel Investor" },
    { value: "institutional", label: "🏦 Institutional VC" },
    { value: "strategic", label: "🤝 Strategic Investor" },
    { value: "family_office", label: "🏛️ Family Office" },
  ];

  const selected = investorData[investorType];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>SEED ROUND — PROLNK</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Invest in the Future of Home Services 🏠</h1>
        <p style={{ color: "#8899AA", fontSize: 18, marginBottom: 48 }}>ProLnk is building the dominant two-sided marketplace for home services in the DFW market — powered by AI, locked in by network economics.</p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 48 }}>
          {traction.map((t) => (
            <div key={t.label} style={{ background: "#111D2E", borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ color: "#F5E642", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{t.value}</div>
              <div style={{ color: "#8899AA", fontSize: 13 }}>{t.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🔒 The Moat: Why ProLnk Wins</h2>
          {[
            { title: "Home Health Vault Data Asset", desc: "Proprietary structural and health data on 50M+ US homes — a licensing business embedded in the platform" },
            { title: "5-Stream Network Income System", desc: "Pros earn from their own work, their recruits, subscriptions, homeowner leads, and origination rights — switching costs are permanent income loss" },
            { title: "AI-Driven Unit Economics", desc: "47 deployed AI agents handle marketing, support, finance, and operations — 85% net margins at scale with minimal headcount" },
            { title: "Network Effect Flywheel", desc: "More Pros → better homeowner coverage → more homeowner sign-ups → better Pro earnings → more Pro recruitment" },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: i < 3 ? "1px solid #1E2D42" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{m.title}</div>
              <div style={{ color: "#8899AA", fontSize: 14 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>📬 Express Interest in the Seed Round</h2>
          <p style={{ color: "#8899AA", fontSize: 14, marginBottom: 16 }}>We are raising $1.2M on a SAFE note. Select your investor profile to see relevant metrics and the investment thesis tailored to your perspective.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {types.map((t) => (
              <button key={t.value} onClick={() => { setInvestorType(t.value); setShowData(true); }}
                style={{ background: investorType === t.value ? "#F5E642" : "#1E2D42", color: investorType === t.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {t.label}
              </button>
            ))}
          </div>
          {showData && selected && (
            <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>📊 Metrics That Matter to You</div>
                {selected.metrics.map((m, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #F5E642" }}>{m}</div>)}
              </div>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>💡 Investment Thesis for Your Perspective</div>
                {selected.thesis.map((t, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #2D9CDB" }}>{t}</div>)}
              </div>
            </div>
          )}
          <div style={{ marginTop: 28, padding: 20, background: "#0A1628", borderRadius: 10, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 4 }}>📧 Contact Us</div>
            <div style={{ color: "#CBD5E1", fontSize: 14 }}>Reach out to andrew@prolnk.io to schedule a founder call and receive the full investor deck and financial model.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
