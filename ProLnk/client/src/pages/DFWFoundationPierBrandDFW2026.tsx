import { useState } from 'react';

const pierSystems = [
  { name: "Ram Jack", icon: "🔩", warranty: "Lifetime", focus: "Nationwide", note: "Powder-coated steel piers, strong warranty, franchised model across DFW" },
  { name: "Perma-Pier", icon: "🏗️", warranty: "25-Year", focus: "Texas-Focused", note: "Deep concrete piers, Texas-specific engineering, strong local reputation" },
  { name: "Olshan Foundation", icon: "🏛️", warranty: "Lifetime", focus: "Oldest in DFW", note: "Est. 1933, bell-bottom pier option, longest track record in North Texas" },
  { name: "HD Foundations", icon: "🟡", warranty: "Lifetime", focus: "DFW Specialty", note: "DFW-focused, poly foam injection + pier options, fast turnaround" },
];

const situations = [
  "Cracks in brick veneer (diagonal)",
  "Sticking doors or windows",
  "Sloping floors (>1 inch over 10 ft)",
  "Visible gap at roofline or soffit",
  "Previous repair — piers already in place",
  "Just moved in — unknown history",
];

const guides: Record<string, string> = {
  "Cracks in brick veneer (diagonal)": "Diagonal brick cracks signal differential settlement — get at least 2 bids from Ram Jack or Perma-Pier. Expect 8–15 piers.",
  "Sticking doors or windows": "Early-stage sign. May not need piers yet — get a free elevation report first to confirm movement.",
  "Sloping floors (>1 inch over 10 ft)": "Advanced movement. Olshan or HD Foundations recommended — interior piers likely required alongside perimeter.",
  "Visible gap at roofline or soffit": "Significant settlement. Full structural report needed before any pier work begins. Multiple companies warranted.",
  "Previous repair — piers already in place": "Get an independent elevation survey first. Existing piers may need transfer pads or additional coverage.",
  "Just moved in — unknown history": "Order an independent foundation inspection ($300–600) before any company bids. ProLnk can connect you.",
};

export default function DFWFoundationPierBrandDFW2026() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>PROLNK — DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏗️ DFW Foundation Pier Brand & System Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Not all pier systems are equal. DFW expansive clay soil demands companies with deep local experience and warranties that survive ownership changes.</p>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 12 }}>✅ How ProLnk Vets Foundation Companies</h2>
          <ul style={{ color: "#94a3b8", fontSize: 13, lineHeight: 2, paddingLeft: 20 }}>
            <li>Texas Structural Engineering stamp required on all designs</li>
            <li>Minimum 5-year field history in DFW market</li>
            <li>Transferable warranty — must survive home sale</li>
            <li>Post-repair elevation survey included in contract</li>
          </ul>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {pierSystems.map(p => (
            <div key={p.name} style={{ background: "#0F2040", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
              <div style={{ color: "#F5E642", fontSize: 12, marginBottom: 4 }}>{p.warranty} Warranty · {p.focus}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{p.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🔍 DFW Situation → Company Selection Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>What are you seeing?</label>
            <select value={situation} onChange={e => { setSituation(e.target.value); setResult(guides[e.target.value] || ""); }} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select your situation...</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted foundation pros · <span style={{ color: "#F5E642" }}>prolnk.io</span></div>
      </div>
    </div>
  );
}