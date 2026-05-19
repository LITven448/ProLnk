import { useState } from 'react';

const nailers = [
  { brand: "Bostitch", icon: "🔨", type: "Coil", note: "Industry workhorse — reliable in DFW heat, widely serviced locally" },
  { brand: "Paslode", icon: "⚡", type: "Coil/Strip", note: "Cordless option useful on steep DFW pitches, good for nail-by-nail work" },
  { brand: "Hitachi/Metabo", icon: "🟠", type: "Coil", note: "Lightweight coil nailer, preferred by many DFW roofing crews for speed" },
];

const concerns = [
  "Wind uplift resistance",
  "Rust and corrosion over time",
  "Building code compliance",
  "Nail depth consistency",
  "Cost vs. quality tradeoff",
];

const guides: Record<string, string> = {
  "Wind uplift resistance": "Use 1.25-inch minimum ring-shank galvanized coil nails — ring shank adds 40% pull-out resistance vs. smooth shank, critical in DFW storm corridors.",
  "Rust and corrosion over time": "Galvanized coating is mandatory. DFW humidity and summer condensation will corrode ungalvanized nails within 3–5 years, loosening shingles.",
  "Building code compliance": "IRC requires minimum 1.25-inch nails for standard 3-tab and architectural shingles. 6-nail pattern required in high-wind zones (most of DFW qualifies).",
  "Nail depth consistency": "Set nailer pressure at 90–100 PSI for DFW temperatures. Heat expands air — check depth every 2 hours on 100°F days to prevent over-driven nails.",
  "Cost vs. quality tradeoff": "Bostitch coil nailers run $200–350. The nail quality matters more than nailer brand — never let a crew use smooth-shank or ungalvanized nails to save money.",
};

export default function DFWRoofingNailGunBrand2026() {
  const [concern, setConcern] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>PROLNK — DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔩 DFW Roofing Nailer & Fastener Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>DFW severe weather events — 70+ mph winds, golf-ball hail, and extreme heat cycles — make fastener quality one of the most critical factors in any roof replacement.</p>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 12 }}>📋 DFW Fastener Standards</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Nail Length", "1.25\" minimum (1.75\" for re-roof over OSB)"],["Nail Type","Coil preferred for DFW wind resistance"],["Coating","Hot-dip galvanized required — electro-galv is not enough"],["Pattern","6-nail for high-wind zone (standard DFW)"]].map(([k,v]) => (
              <div key={k} style={{ background: "#0A1628″, borderRadius: 8, padding: 12 }}>
                <div style={{ color: "#F5E642″, fontSize: 11, marginBottom: 4 }}>{k}</div>
                <div style={{ color: "#fff", fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
          {nailers.map(n => (
            <div key={n.brand} style={{ background: "#0F2040″, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{n.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{n.brand}</div>
              <div style={{ color: "#F5E642″, fontSize: 11, marginBottom: 6 }}>{n.type}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12 }}>{n.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>🔍 DFW Roofing Fastener Concern Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>What is your concern?</label>
            <select value={concern} onChange={e => { setConcern(e.target.value); setResult(guides[e.target.value] || ""); }} style={{ width: "100%", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select concern...</option>
              {concerns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {result && <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted roofing pros · <span style={{ color: "#F5E642″ }}>prolnk.io</span></div>
      </div>
    </div>
  );
}