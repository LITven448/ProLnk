import { useState } from 'react';

const crackTypes = [
  { type: "Hairline (<1/16\")", severity: "Low", color: "#22c55e", action: "Monitor quarterly. Mark with pencil and date to track movement." },
  { type: "Moderate (1/16\"-1/4\")", severity: "Medium", color: "#eab308", action: "Structural evaluation recommended within 60 days. Check for ceiling cracks directly above." },
  { type: "Wide (>1/4\")", severity: "High", color: "#ef4444", action: "Urgent - load transfer issue likely. Get structural engineer evaluation before pier bids." },
  { type: "Stair-step pattern", severity: "High", color: "#ef4444", action: "Classic interior beam differential settlement. Multiple piers likely needed. Do not delay." },
];

const scenarios = [
  "Crack appeared suddenly after a dry spell",
  "Crack runs parallel to load-bearing wall above",
  "Ceiling crack directly above interior beam crack",
  "Crack has been stable for 10+ years",
  "Just bought the home - crack discovered at inspection",
  "Crack wider on one end (tapered)",
];

const answers: Record<string, string> = {
  "Crack appeared suddenly after a dry spell": "DFW clay soil shrinks dramatically in drought years (2022, 2023 were severe). Sudden cracks after drought = active settlement. Get elevation survey within 30 days.",
  "Crack runs parallel to load-bearing wall above": "This is the most serious interior beam crack pattern. The beam directly supports the wall load. Get a licensed structural engineer (P.E.) - not just a foundation company - for an independent assessment.",
  "Ceiling crack directly above interior beam crack": "Interior beam to ceiling crack alignment is a red flag for load transfer failure. Stop using the room directly above until evaluated. This is an urgent situation.",
  "Crack has been stable for 10+ years": "Stable cracks in DFW clay soil often reflect one-time settlement that has resolved. Annual photo documentation and a biennial elevation survey is appropriate - piers may not be needed.",
  "Just bought the home - crack discovered at inspection": "Order an independent elevation survey ($200-350) before any pier company bids. Sellers disclosure must be reviewed. Pre-existing piers may already address the movement.",
  "Crack wider on one end (tapered)": "Tapered cracks indicate rotational movement of the beam section - one end settled more than the other. Interior piers may require tunneling under the slab, which adds cost vs. perimeter piers.",
};

export default function DFWFoundationBeamCrack2026B() {
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>PROLNK - DFW FOUNDATION GUIDE 2026 (PART 2)</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏚️ DFW Foundation Interior Beam Crack Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Interior grade beam cracks are often more serious than perimeter cracks. They run beneath load-bearing walls and carry the weight of your home's interior structure.</p>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>📐 What Are Interior Grade Beams?</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>DFW post-tension and conventional slabs include interior grade beams - thickened concrete ribs that run beneath load-bearing interior walls. When these beams crack, the walls above can rack, causing ceiling cracks, sticking doors, and in severe cases, structural deflection. Interior pier work often requires tunneling or drilling through the slab - more invasive and expensive than perimeter work.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
          {crackTypes.map(c => (
            <div key={c.type} style={{ background: "#0F2040", borderRadius: 10, padding: 16, borderLeft: `4px solid ${c.color}` }}>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{c.type}</div>
              <div style={{ color: c.color, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>SEVERITY: {c.severity}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>{c.action}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🔍 Interior Crack → Severity Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Describe your situation</label>
            <select value={scenario} onChange={e => { setScenario(e.target.value); setResult(answers[e.target.value] || ""); }} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select scenario...</option>
              {scenarios.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted foundation engineers · <span style={{ color: "#F5E642" }}>prolnk.io</span></div>
      </div>
    </div>
  );
}
