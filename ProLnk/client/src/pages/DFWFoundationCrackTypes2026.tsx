import { useState } from 'react';

const cracks = [
  { type: "Hairline crack (under 1/16\")", icon: "〰️", classification: "Normal", urgency: "low", color: "#86efac", detail: "Thermal movement in DFW’s 100°F+ summers causes minor concrete expansion and contraction. Hairline cracks under 1/16\" with no displacement are cosmetic. Monitor annually. Seal with elastomeric caulk if near moisture entry point.", action: "Monitor — no structural concern" },
  { type: "L-shaped crack at door/window corner", icon: "📐", classification: "Clay Movement", urgency: "medium", color: "#fde68a", detail: "The most common DFW foundation crack. Expansive clay soils exert 40,000+ lbs per sq ft during wet seasons. Diagonal cracks from corners indicate differential settlement. If crack is under 1/4\" and stable, repair cosmetically. If widening, call engineer.", action: "Monitor + foundation inspection recommended" },
  { type: "Wide horizontal crack (over 1/4\")", icon: "📏", classification: "Serious Structural", urgency: "critical", color: "#fca5a5", detail: "Horizontal cracks in stem walls or basement (rare in DFW) indicate lateral soil pressure overwhelming the wall. This is a serious structural warning. Do not delay — lateral wall failure can occur. Contact a licensed structural engineer immediately.", action: "Immediate structural engineer required" },
  { type: "Stair-step crack in brick veneer", icon: "🧱", classification: "Foundation Movement", urgency: "high", color: "#fca5a5", detail: "Stair-step cracking follows mortar joints and indicates differential settlement in DFW clay soils. Common after DFW droughts. The foundation is moving unevenly. Severity depends on crack width and displacement. Over 1/4\" width or any lateral displacement = engineer required.", action: "Foundation inspection within 30 days" },
  { type: "Vertical crack at post-tension tendon", icon: "⚡", classification: "Post-Tension Related", urgency: "medium", color: "#fde68a", detail: "DFW heavily uses post-tension slab foundations. Vertical cracks at regular intervals may indicate a broken tendon. POST-TENSION SLABS REQUIRE SPECIALIZED REPAIR — never attempt DIY pier installation on PT slabs without engineer approval. Tendon repair costs $800–1,500 per tendon.", action: "PT slab specialist required" },
];

export default function DFWFoundationCrackTypes2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏗️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW Foundation Crack Classification Guide 2026</h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Every crack type, what it means, and how urgent it is for DFW clay-soil homes</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.8rem", marginBottom: "2rem" }}>
          {[
            { icon: "🏠", label: "DFW Slab Type", val: "Post-tension" },
            { icon: "🌱", label: "Soil Type", val: "Expansive clay" },
            { icon: "📊", label: "DFW Homes Affected", val: "60%+ have cracks" },
            { icon: "🌡️", label: "Soil Pressure", val: "40,000 lbs/sq ft" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0f2035", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem" }}>{c.icon}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.3rem" }}>{c.label}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "0.85rem", marginTop: "0.2rem" }}>{c.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Crack Description → Classification + Urgency</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {cracks.map((c, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? "#1a3a5c" : "#0f2035", borderRadius: 10, padding: "1rem 1.2rem", cursor: "pointer", border: `1px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{c.icon} {c.type}</span>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ background: c.color + "33", color: c.color, borderRadius: 5, padding: "0.1rem 0.5rem", fontSize: "0.75rem", fontWeight: 700 }}>{c.classification}</span>
                  <span style={{ color: "#F5E642" }}>{selected === i ? "▲" : "▼"}</span>
                </div>
              </div>
              {selected === i && (
                <div style={{ marginTop: "0.8rem", borderTop: "1px solid #2a4a6c", paddingTop: "0.8rem" }}>
                  <div style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "0.6rem" }}>{c.detail}</div>
                  <div style={{ color: c.color, fontWeight: 700 }}>✅ Recommended Action: {c.action}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: "0.8rem" }}>
          ProLnk DFW Foundation Guide 2026 · Crack Classification Reference · Connect with licensed DFW foundation engineers
        </div>
      </div>
    </div>
  );
}