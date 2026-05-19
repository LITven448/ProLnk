import { useState } from 'react';

const scenarios = [
  { label: "Conservative", pros: 500, monthly: 149, margin: 0.85, cac: 50 },
  { label: "Base Case", pros: 1000, monthly: 149, margin: 0.85, cac: 35 },
  { label: "Optimistic", pros: 2500, monthly: 149, margin: 0.85, cac: 20 },
];

export default function ProLnkUnitEconomics() {
  const [active, setActive] = useState(1);
  const s = scenarios[active];
  const mrr = s.pros * s.monthly;
  const grossProfit = mrr * s.margin;
  const ltv = s.monthly * 36 * s.margin;
  const payback = s.cac / (s.monthly * s.margin);
  const ltvCac = ltv / s.cac;
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>📈 Unit Economics</div>
          <div style={{ fontSize: "1.1rem", color: "#94a3b8″, marginTop: "0.5rem" }}>Best-in-class margins with near-zero acquisition cost at scale</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["$0–$50″, "CAC (organic to paid)", "💸"], ["$5,364", "Charter Pro LTV (36mo avg)", "🏆"], ["85%", "Gross Margin", "📊"], ["2–4mo", "Payback Period", "⚡"]].map(([val, label, ico]) => (
            <div key={label} style={{ background: "#0F2040″, borderRadius: 12, padding: "1.25rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{ico}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F5E642″ }}>{val}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.78rem", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>🎯 Growth Scenario Projector</div>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {scenarios.map((sc, i) => (
            <button key={sc.label} onClick={() => setActive(i)} style={{ background: active === i ? "#F5E642″ : "#0F2040", color: active === i ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1.25rem", cursor: "pointer", fontWeight: 700 }}>
              {sc.label}
            </button>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            {[[`${s.pros.toLocaleString()}`, "Active Pros"], [`$${mrr.toLocaleString()}`, "Monthly Revenue"], [`$${grossProfit.toLocaleString()}`, "Gross Profit/mo"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#F5E642″ }}>{v}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.82rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid #1e3a5f", paddingTop: "1rem" }}>
            {[[`${ltvCac.toFixed(1)}x`, "LTV:CAC Ratio (target >3x)"], [`$${s.cac}`, "Blended CAC"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: ltvCac > 3 ? "#22c55e" : "#f59e0b" }}>{v}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.82rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.25rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>🔑 Why the Economics Work</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {["Pros self-onboard — zero sales team needed", "Referral cascade reduces paid CAC over time", "$149/mo price point vetted against contractor margins", "Network effect compounds match quality → retention"].map(r => (
              <div key={r} style={{ display: "flex", gap: "0.5rem", color: "#cbd5e1″, fontSize: "0.88rem" }}>
                <span style={{ color: "#F5E642″ }}>✓</span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}