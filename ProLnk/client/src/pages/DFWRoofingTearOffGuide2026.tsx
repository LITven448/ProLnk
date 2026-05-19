import { useState } from 'react';

const situations = [
  { label: "First roof replacement — 1 layer currently", rec: "Tear-Off", reason: "Start fresh. Inspect decking for hail damage, rot, or delamination — very common in DFW." },
  { label: "Already have 2 layers of shingles", rec: "Tear-Off Required", reason: "Texas building code prohibits a 3rd layer. Tear-off is mandatory at this point." },
  { label: "Insurance claim after hail storm", rec: "Tear-Off", reason: "Insurance typically pays for full tear-off. Insist on it — overlay voids most manufacturer warranties." },
  { label: "Budget-only replacement, confirmed solid decking", rec: "Overlay Possible", reason: "If decking is confirmed solid and only 1 existing layer, overlay is technically allowed but not recommended." },
  { label: "Selling home within 5 years", rec: "Tear-Off", reason: "Home inspectors flag overlay roofs. Buyers discount or request credits. Tear-off adds resale value." },
];

export default function DFWRoofingTearOffGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Tear-Off vs Overlay Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 28 }}>Should DFW roofers remove your old shingles? Almost always yes — here is why.</p>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          ⚡ Texas allows max 2 shingle layers. DFW hail damage makes deck inspection non-negotiable.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Why Tear-Off Wins in DFW</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "🔍", label: "Deck Inspection", val: "DFW hail regularly cracks OSB decking — impossible to see under overlay shingles" },
            { icon: "⚖️", label: "Weight Load", val: "DFW clay soil causes settling — extra 2-3 lbs per sq ft from overlay adds unnecessary stress" },
            { icon: "🛡️", label: "Warranty", val: "Most 30-year shingle warranties require complete tear-off for coverage to apply" },
            { icon: "💰", label: "Insurance", val: "Most hail claims fully fund tear-off — you are leaving money on the table with overlay" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Cost Comparison</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4 }}>✅ Tear-Off</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>+$1–2 per sq ft</div>
            <div style={{ color: "#94a3b8″, fontSize: 13 }}>Includes disposal, full deck inspection, valid warranty</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#ef4444″, fontWeight: 700, marginBottom: 4 }}>⚠️ Overlay</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Saves $500–1,500</div>
            <div style={{ color: "#94a3b8″, fontSize: 13 }}>But voids warranty, hides damage, limits future options</div>
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 What Is Your Situation?</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642″ : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642″, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Recommendation: {situations[selected].rec}</div>
            <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].reason}</div>
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🏠 Get a Free DFW Roofing Estimate</div>
          <div style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 12 }}>ProLnk connects you with licensed DFW roofers who always inspect the deck and provide honest tear-off assessments.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Estimate →</button>
        </div>
      </div>
    </div>
  );
}
