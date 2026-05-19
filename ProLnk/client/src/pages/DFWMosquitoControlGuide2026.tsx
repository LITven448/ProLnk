import { useState } from 'react';

const recMap: Record<string, Record<string, { rec: string; cost: string; note: string }>> = {
  small: {
    low: { rec: "DIY larvicide tablets + standing water elimination", cost: "$20–$50/season", note: "Weekly inspection of gutters and birdbaths" },
    moderate: { rec: "Professional barrier spray (monthly April–Oct)", cost: "$60–$90/visit", note: "Most popular DFW option" },
    severe: { rec: "In2Care station network + barrier spray combo", cost: "$150–$250/mo", note: "Targets breeding cycle at source" },
  },
  medium: {
    low: { rec: "Barrier spray every 3–4 weeks", cost: "$80–$120/visit", note: "Add Bt dunks to any standing water" },
    moderate: { rec: "Misting system install + barrier spray", cost: "$1,800–$3,500 install + $50/mo refill", note: "Best ROI for mid-size yards" },
    severe: { rec: "In2Care stations + automated misting system", cost: "$2,500–$5,000 install", note: "Kills larvae before they hatch" },
  },
  large: {
    low: { rec: "Quarterly professional treatment", cost: "$100–$150/quarter", note: "Sufficient for low pressure seasons" },
    moderate: { rec: "Automated misting system (16+ nozzles)", cost: "$3,500–$6,000 install", note: "Covers full perimeter reliably" },
    severe: { rec: "Full integrated system: misting + In2Care + barrier", cost: "$5,000–$8,000 install", note: "Commercial-grade protection" },
  },
};

export default function DFWMosquitoControlGuide2026() {
  const [size, setSize] = useState("medium");
  const [severity, setSeverity] = useState("moderate");
  const result = recMap[size]?.[severity];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Pest Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🦟 DFW Mosquito Control Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Spring rains create standing water across DFW — prime mosquito breeding grounds. West Nile Virus risk peaks July–September in North Texas.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌧️", label: "Breeding Trigger", val: "Standing water" },
            { icon: "🧬", label: "WNV Risk Zone", val: "North Texas" },
            { icon: "📅", label: "Peak Season", val: "April – October" },
            { icon: "⚡", label: "Top Pro Method", val: "Barrier Spray" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🔬 Treatment Methods</h2>
          {[
            { name: "In2Care Stations", desc: "Attracts and kills egg-laying females, spreads biological larvicide to breeding sites", best: "Yards with water features" },
            { name: "Barrier Spray", desc: "Pyrethrin applied to foliage where mosquitoes rest; lasts 3–4 weeks", best: "Most DFW residential yards" },
            { name: "Misting System", desc: "Automated timed release, programmable dawn/dusk cycles", best: "Large properties, high-use yards" },
          ].map((t) => (
            <div key={t.name} style={{ marginBottom: "0.75rem", padding: "0.85rem", background: "#0A1628″, borderRadius: 8, border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{t.name}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{t.desc}</div>
              <div style={{ color: "#F5E642″, fontSize: "0.8rem" }}>Best for: {t.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧮 Treatment Finder</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Yard Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="small">Small (&lt;5,000 sqft)</option>
                <option value="medium">Medium (5K–15K sqft)</option>
                <option value="large">Large (15K+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Mosquito Pressure</label>
              <select value={severity} onChange={(e) => setSeverity(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="low">Low (few bites)</option>
                <option value="moderate">Moderate (active at dusk)</option>
                <option value="severe">Severe (can't go outside)</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.25rem" }}>{result.rec}</div>
              <div style={{ color: "#22c55e", fontSize: "0.85rem" }}>Estimated cost: {result.cost}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: "0.25rem" }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}