import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "All foundation movement is bad",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "🏠",
    truth: "DFW sits on expansive clay soil (black clay / \"gumbo\"). Minor seasonal movement of 1/4 inch or less is completely normal as soil wets and dries. Only progressive or sudden movement requires professional evaluation.",
    tip: "Take photos of cracks twice a year — spring and fall — to track if movement is seasonal or progressing.",
  },
  {
    id: 2,
    myth: "Water softeners cause foundation issues",
    verdict: "NO CONNECTION",
    verdictColor: "#F59E0B",
    icon: "💧",
    truth: "There is no documented link between water softeners and foundation movement in DFW. Foundation issues here stem from moisture changes in expansive clay soil — not water chemistry from softeners.",
    tip: "Focus on maintaining consistent soil moisture around your foundation perimeter instead.",
  },
  {
    id: 3,
    myth: "Watering too much is as bad as too little",
    verdict: "TRUE",
    verdictColor: "#22C55E",
    icon: "🌊",
    truth: "Overwatering causes clay soil to expand excessively and standing water near your foundation creates hydrostatic pressure. Both over- and under-watering cause movement. The goal is consistent, moderate moisture year-round.",
    tip: "Use a soaker hose 18 inches from your foundation perimeter on a timer — especially during DFW droughts.",
  },
  {
    id: 4,
    myth: "Cracks always mean foundation failure",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "🔍",
    truth: "Hairline cracks under 1/16 inch wide in drywall or brick mortar are typically cosmetic and caused by normal settling. Horizontal cracks, stair-step cracks in brick, or cracks wider than 1/4 inch warrant professional inspection.",
    tip: "Insert a quarter into a crack — if it fits, call a foundation specialist for an assessment.",
  },
];

export default function DFWFoundationMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Foundation Myths Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Foundation facts for homeowners on DFW expansive clay soil.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {myths.map((m) => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ backgroundColor: "#122040", border: `2px solid ${selected === m.id ? "#F5E642" : "#1E3A5F"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>"{m.myth}"</p>
                  <span style={{ backgroundColor: m.verdictColor, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{m.verdict}</span>
                </div>
                <span style={{ color: "#F5E642", fontSize: 20 }}>{selected === m.id ? "▲" : "▼"}</span>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 16, borderTop: "1px solid #1E3A5F", paddingTop: 16 }}>
                  <p style={{ color: "#CBD5E1", lineHeight: 1.6, marginBottom: 12 }}>{m.truth}</p>
                  <div style={{ backgroundColor: "#0A1628", borderLeft: "3px solid #F5E642", padding: "10px 14px", borderRadius: 6 }}>
                    <p style={{ color: "#F5E642", fontSize: 13, fontWeight: 600 }}>💡 Pro Tip: {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, backgroundColor: "#122040", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏗️ Get a Vetted DFW Foundation Specialist</p>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>ProLnk connects you with licensed, reviewed foundation contractors serving the Dallas-Fort Worth area.</p>
        </div>
      </div>
    </div>
  );
}
