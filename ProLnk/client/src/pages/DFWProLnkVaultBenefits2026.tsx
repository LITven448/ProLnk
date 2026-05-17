import { useState } from 'react';

type Benefit = { id: number; icon: string; title: string; subtitle: string; detail: string; value: string; items: string[] };

const benefits: Benefit[] = [
  {
    id: 1,
    icon: "📋",
    title: "Automatic Job Documentation",
    subtitle: "Every pro visit becomes a permanent record",
    detail: "When a ProLnk pro completes a job at your home, the work is automatically logged to your Vault — date, trade, scope, photos if provided. No more digging through emails or receipts.",
    value: "Saves 2–5 hours per year in paperwork. Eliminates disputes with future buyers about work history.",
    items: ["Timestamped job records", "Contractor identity verified", "Linked to address permanently", "Searchable by trade or date"]
  },
  {
    id: 2,
    icon: "🛡️",
    title: "Warranty Tracking",
    subtitle: "Never miss a warranty window again",
    detail: "Roof replaced? HVAC installed? Vault tracks the warranty period for every major system and sends alerts before coverage expires so you can act while protected.",
    value: "DFW homeowners lose an average of $1,200/year in warranty claims simply because they do not know coverage is still active.",
    items: ["System-by-system warranty log", "Expiration alerts (30/60/90 days)", "Manufacturer warranty and labor warranty tracked", "Sharable with insurance agent"]
  },
  {
    id: 3,
    icon: "💰",
    title: "Resale Value Documentation",
    subtitle: "$5,000–$15,000 premium at sale",
    detail: "Buyers pay more for homes with documented maintenance history. A Vault report at closing proves the home has been cared for — and removes buyer uncertainty that typically drives lowball offers.",
    value: "Independent real estate data shows documented maintenance homes sell for 3–7% more in DFW. On a $400K home that is $12,000–$28,000.",
    items: ["Formatted report for closing package", "Trade-by-trade maintenance timeline", "Major system age documentation", "Increases buyer confidence measurably"]
  },
  {
    id: 4,
    icon: "📁",
    title: "Insurance Claim Support",
    subtitle: "Pre-organized documentation when you need it most",
    detail: "After a hail storm or plumbing failure, insurers want proof of prior condition and maintenance history. Vault delivers this instantly — reducing claim processing time and improving outcomes.",
    value: "Documented maintenance history reduces claim disputes and can prevent coverage denial on pre-existing condition grounds.",
    items: ["Pre-loss condition documentation", "Maintenance history proves due diligence", "Contractor verification for insurer", "Exportable claim support packet"]
  },
  {
    id: 5,
    icon: "🏦",
    title: "Refinance Documentation",
    subtitle: "Appraisers reward documented homes",
    detail: "Appraisers adjust value based on condition and maintenance. A Vault report showing systematic upkeep supports higher appraisal values and smoother lender review.",
    value: "On a cash-out refi, a higher appraisal means more accessible equity. Vault can support $5K–$20K in additional appraised value.",
    items: ["Appraisal-ready condition summary", "Major system replacement dates", "Energy efficiency upgrade documentation", "Sharable directly with appraiser"]
  }
];

export default function DFWProLnkVaultBenefits2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = benefits.find(b => b.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>ProLnk Home Health Vault — Complete Benefits Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Everything the Vault does for DFW homeowners — and the real dollar value behind each benefit</p>
        </div>
        <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {benefits.map(b => (
            <button key={b.id} onClick={() => setSelected(selected === b.id ? null : b.id)}
              style={{ background: selected === b.id ? "#1a2744" : "#0f1f3d", border: `2px solid ${selected === b.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 20, textAlign: "left", cursor: "pointer", color: "#fff", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: selected === b.id ? "#F5E642" : "#fff" }}>{b.title}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{b.subtitle}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F5E642", fontSize: 20 }}>{selected === b.id ? "▲" : "▼"}</span>
              </div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1a2744", border: "2px solid #F5E642", borderRadius: 16, padding: 28 }}>
            <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>{active.icon} {active.title}</h2>
            <p style={{ marginBottom: 16, lineHeight: 1.7 }}>{active.detail}</p>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <span style={{ color: "#F5E642", fontSize: 13 }}>💵 DOLLAR VALUE</span>
              <p style={{ marginTop: 4, color: "#94a3b8" }}>{active.value}</p>
            </div>
            <ul style={{ paddingLeft: 20 }}>{active.items.map((item, i) => <li key={i} style={{ marginBottom: 6, color: "#cbd5e1" }}>{item}</li>)}</ul>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", fontWeight: 800, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>Start Your Vault — prolnk.io</a>
            </div>
          </div>
        )}
        {!active && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24 }}>Select a benefit above to see the full Vault value guide</div>}
        <div style={{ textAlign: "center", marginTop: 40, color: "#475569", fontSize: 13 }}>ProLnk.io · Home Health Vault · Built for DFW Homeowners · 2026</div>
      </div>
    </div>
  );
}
