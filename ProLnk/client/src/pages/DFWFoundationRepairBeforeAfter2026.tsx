import { useState } from 'react';

const stages = [
  {
    stage: "Before Repair",
    icon: "🚪",
    items: ["Doors stick or won't latch — seasonal or year-round", "Visible cracks in drywall (diagonal from corners)", "Sloping floors — place marble, watch it roll", "Gaps between walls and ceiling or floor", "Brick veneer cracks in stair-step pattern"],
  },
  {
    stage: "During Repair",
    icon: "🔨",
    items: ["Loud banging or popping as piers are pressed", "Temporary settling — some cracks may widen briefly", "Dust throughout home if tunneling is required", "Disruption to landscaping near foundation edges", "Work typically takes 1–3 days for DFW homes"],
  },
  {
    stage: "After Repair",
    icon: "✅",
    items: ["Doors need re-adjustment — frames shifted back", "Cosmetic drywall repair required (cracks now reopened)", "Monitor 90 days — some additional movement is normal", "Plumbing check recommended (pipes shift with foundation)", "Final inspection and transferable warranty documentation"],
  },
];

export default function DFWFoundationRepairBeforeAfter2026() {
  const [active, setActive] = useState<number>(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW Foundation Repair Before/After Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "0.5rem" }}>What to expect at every stage — from diagnosis to the 90-day monitoring window</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
          {[
            { icon: "🏗️", label: "Most Common Cause", val: "DFW clay soil" },
            { icon: "📏", label: "Typical DFW Job", val: "15–25 piers" },
            { icon: "📅", label: "Monitor Window", val: "90 days post-repair" },
            { icon: "💵", label: "DFW Avg Cost", val: "$5K–$20K" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0f2035″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{c.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.75rem", marginTop: "0.3rem" }}>{c.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.9rem", marginTop: "0.2rem" }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {stages.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ flex: 1, padding: "0.8rem", borderRadius: 8, border: `2px solid ${active === i ? "#F5E642" : "#1e3a5f"}`, background: active === i ? "#1a3a5c" : "#0f2035″, color: active === i ? "#F5E642" : "#94a3b8", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", transition: "all 0.2s" }}>
              {s.icon} {s.stage}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f", minHeight: 220 }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>{stages[active].icon} {stages[active].stage}</h2>
          <ul style={{ margin: 0, padding: "0 0 0 1.2rem" }}>
            {stages[active].items.map((item, i) => (
              <li key={i} style={{ color: "#cbd5e1″, lineHeight: 1.8, marginBottom: "0.3rem" }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#1a1a2e", borderRadius: 10, padding: "1.2rem", marginTop: "1.5rem", border: "1px solid #F5E64233″ }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0, fontSize: "1rem" }}>⚠️ DFW-Specific Warning</h3>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.6 }}>
            DFW's expansive clay soil means foundation repair is a management process, not a one-time fix. Even after proper pier installation, seasonal moisture changes will cause minor movement. The 90-day monitoring window is critical — document everything with photos and contact your contractor if movement exceeds 1/4 inch.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk DFW Foundation Guide 2026 · Before/After Repair Expectations · Connect with vetted DFW foundation pros
        </div>
      </div>
    </div>
  );
}