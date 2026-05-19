import { useState } from 'react';

const budgetGuide: Record<string, { scope: string; land: string; build: string; timeline: string; trades: string[] }> = {
  "Under $500K": {
    scope: "Modest custom — 1,800–2,400 sqft, standard finishes, basic lot",
    land: "$80K–$150K lot in outer DFW suburbs",
    build: "$200/sqft — tight but doable with design-build firm",
    timeline: "12–14 months",
    trades: ["Framing crew", "Standard HVAC installer", "Basic electrical", "Stock cabinet install"],
  },
  "$500K–$800K": {
    scope: "Mid-range custom — 2,400–3,200 sqft, upgraded finishes, suburban lot",
    land: "$120K–$200K lot in established suburb",
    build: "$225–$275/sqft — design-build or boutique builder",
    timeline: "14–16 months",
    trades: ["Specialty tile setter", "Custom cabinet maker", "Smart home wiring", "Premium HVAC zoning"],
  },
  "$800K–$1.5M": {
    scope: "Luxury custom — 3,200–5,000 sqft, premium lot, architect-designed",
    land: "$200K–$500K lot in Southlake, Frisco, Highland Park corridors",
    build: "$300–$350/sqft — architect + general contractor",
    timeline: "16–20 months",
    trades: ["Custom metalwork", "Pool & outdoor living", "Home theater wiring", "Wine cellar build-out", "Landscape architect"],
  },
};

const phases = [
  { icon: "🗺️", label: "Land Acquisition", detail: "Lot + survey + soil test + utility check" },
  { icon: "📐", label: "Design", detail: "Architect or design-build — 8–15% of build cost" },
  { icon: "🏛️", label: "Permits", detail: "City submission — 4–12 weeks depending on jurisdiction" },
  { icon: "🏗️", label: "Construction", detail: "Foundation → frame → MEP → insulation → finishes" },
  { icon: "🔍", label: "Inspections", detail: "Independent inspector at foundation, frame, pre-drywall, final" },
  { icon: "🔑", label: "Close & Move-In", detail: "Certificate of occupancy → punch list → move-in" },
];

export default function DFWCustomHomeGuide2026() {
  const [budget, setBudget] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏠 PROLNK GUIDE — DFW CUSTOM HOMES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Custom Home Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>Build costs, timelines, architect vs design-build, and how ProLnk connects you to specialty trades during and after your build.</p>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>💰 Cost Benchmarks</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[["🏗️ Build Cost", "$200–$350/sqft", "Varies by finish level"],
            ["🌳 Land + Lot Dev", "+$50K–$150K", "Utility connections, grading, survey"],
            ["📐 Architect Fees", "8–15% of build", "Design-build saves 3–5%"],
            ["⏱️ Timeline", "12–18 months", "Plan for +20% buffer"]
          ].map(([icon, val, sub]) => (
            <div key={String(icon)} style={{ background: "#111d35″, border: "1px solid #1e3a5f", borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 18 }}>{val}</div>
              <div style={{ color: "#aab", fontSize: 13 }}>{sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🗓️ Build Phases</h2>
        <div style={{ marginBottom: 40 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 22, minWidth: 36 }}>{p.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.label}</div>
                <div style={{ color: "#aab", fontSize: 13 }}>{p.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>💵 Budget → Custom Home Scope</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {Object.keys(budgetGuide).map(b => (
            <button key={b} onClick={() => setBudget(budget === b ? "" : b)}
              style={{ background: budget === b ? "#F5E642″ : "#1a2e50", color: budget === b ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{b}</button>
          ))}
        </div>
        {budget && (
          <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 32 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{budget} Build</div>
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              <div><span style={{ color: "#aab" }}>Scope: </span>{budgetGuide[budget].scope}</div>
              <div><span style={{ color: "#aab" }}>Land: </span>{budgetGuide[budget].land}</div>
              <div><span style={{ color: "#aab" }}>Build Rate: </span>{budgetGuide[budget].build}</div>
              <div><span style={{ color: "#aab" }}>Timeline: </span>{budgetGuide[budget].timeline}</div>
              <div style={{ color: "#aab", marginTop: 8 }}>Specialty trades ProLnk can connect you with:</div>
              {budgetGuide[budget].trades.map((t, i) => <div key={i} style={{ color: "#7ef5a8″, fontSize: 13 }}>✅ {t}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 Connect with Specialty Trades via ProLnk</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>Custom home owners trust ProLnk to source verified specialty contractors during and after the build.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find Specialty Trades →</button>
        </div>
      </div>
    </div>
  );
}
