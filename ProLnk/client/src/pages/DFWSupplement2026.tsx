import { useState } from 'react';

const situations = [
  {
    label: "Adjuster missed line items", emoji: "📝", color: "#ef4444",
    strategy: "Request a re-inspection or send a written supplement demand",
    steps: ["List every missing item with photo evidence", "Reference Xactimate line codes for each missed item", "Include code upgrade items: drip edge, ice shield, permits", "Submit supplement in writing — never verbally", "Typical supplement value: $2,000–$8,000 on DFW roof"],
    timeline: "7–21 days for insurer response",
  },
  {
    label: "Low Xactimate pricing used", emoji: "💲", color: "#f97316",
    strategy: "Provide contractor invoice showing market rate delta",
    steps: ["Get contractor to produce line-by-line Xactimate estimate", "Compare to adjuster scope line by line", "Document unit price discrepancies (e.g., $95 vs $135/sq)", "Request insurer use current Xactimate pricing for your zip", "If denied, escalate to TX Department of Insurance"],
    timeline: "14–30 days resolution",
  },
  {
    label: "O&P not included", emoji: "🏗️", color: "#eab308",
    strategy: "Demand Overhead and Profit as standard on large claims",
    steps: ["O&P (10% overhead + 10% profit) is standard on claims requiring 3+ trades", "Hail damage involving roofing + gutters + HVAC qualifies", "Write a demand letter citing Xactimate industry standard", "Include contractor O&P invoice as exhibit", "Typical O&P on DFW hail claim: $1,500–$4,500"],
    timeline: "7–14 days after demand letter",
  },
  {
    label: "Depreciation withheld too long", emoji: "⏳", color: "#22d3ee",
    strategy: "Submit RCV invoice immediately after repairs complete",
    steps: ["Keep all paid invoices from every contractor trade", "Submit RCV (Replacement Cost Value) demand within 180 days of claim", "Include final inspection certificate if required by insurer", "Request recoverable depreciation schedule upfront at adjuster visit", "Follow up weekly — TX law requires 15-day response"],
    timeline: "15–30 days after invoice submitted",
  },
  {
    label: "Full claim denial", emoji: "🚫", color: "#a855f7",
    strategy: "Invoke appraisal clause or file TDI complaint",
    steps: ["Request denial in writing with specific policy exclusion cited", "Hire a licensed public adjuster for independent assessment", "Invoke the APPRAISAL CLAUSE (most TX policies include it)", "File complaint at TDI.texas.gov if bad faith handling suspected", "Consult a TX insurance attorney — many work on contingency"],
    timeline: "30–90 days via appraisal process",
  },
];

export default function DFWSupplement2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? situations[selected] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📊</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Insurance Supplement Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Select your claim situation to get a supplement strategy</p>
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
          {situations.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: selected === i ? "#132240" : "#0f1e38",
                border: `2px solid ${selected === i ? s.color : "#1e3a5f"}`,
                borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
              }}
            >
              <span style={{ fontSize: 26 }}>{s.emoji}</span>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#132240", border: `2px solid ${active.color}`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{active.emoji}</div>
            <h2 style={{ color: "#F5E642", fontSize: 17, margin: "0 0 6px" }}>{active.label}</h2>
            <div style={{ background: active.color, color: "#0A1628", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
              Strategy: {active.strategy}
            </div>
            <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
              {active.steps.map((step, j) => (
                <div key={j} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: active.color, fontWeight: 800, minWidth: 18 }}>{j + 1}.</span>
                  <span style={{ color: "#cbd5e1", fontSize: 13 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 12, borderTop: "1px solid #1e3a5f", paddingTop: 12 }}>
              Expected Timeline: {active.timeline}
            </div>
          </div>
        )}

        <div style={{ background: "#132240", borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>💼 ProLnk Contractor Advantage</div>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>ProLnk DFW contractors are trained in supplement negotiation and Xactimate documentation. They submit supplements on your behalf — the average DFW supplement adds $3,200 to claim value.</p>
        </div>
      </div>
    </div>
  );
}
