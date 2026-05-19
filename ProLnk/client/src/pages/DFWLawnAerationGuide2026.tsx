import { useState } from 'react';

const recMap: Record<string, Record<string, { rec: string; method: string; cost: string; note: string }>> = {
  small: {
    clay: { rec: "Core aeration in September + overseed with ryegrass", method: "Core aeration (plug removal)", cost: "$150–$200″, note: "Clay breaks up best with physical plug removal" },
    loam: { rec: "Liquid aeration works well for loam soils", method: "Liquid aeration spray", cost: "$80–$130″, note: "Easier on lawn, good for well-maintained yards" },
    sandy: { rec: "Aeration less critical — focus on top dressing", method: "Top dress with compost", cost: "$100–$150″, note: "Sandy soil rarely compacts like DFW clay" },
  },
  medium: {
    clay: { rec: "Core aerate + ryegrass overseed for winter color", method: "Core aeration (Sept–Oct)", cost: "$200–$280″, note: "Do twice/year if Bermuda is heavily used" },
    loam: { rec: "Annual core or liquid aeration in fall", method: "Core or liquid aeration", cost: "$150–$220″, note: "Liquid is faster, core is more effective long-term" },
    sandy: { rec: "Top dress with compost + light aeration", method: "Light core aeration", cost: "$120–$180″, note: "Overseed ryegrass for winter color" },
  },
  large: {
    clay: { rec: "Professional core aeration essential — rent or hire", method: "Commercial core aerator", cost: "$280–$400+", note: "Two passes in different directions for DFW clay" },
    loam: { rec: "Annual aeration + overseeding program", method: "Core aeration + overseed", cost: "$220–$350″, note: "Great candidate for ryegrass winter program" },
    sandy: { rec: "Focus budget on compost top dressing", method: "Top dress + spot aeration", cost: "$200–$320″, note: "Sandy large lawns need organic matter more than aeration" },
  },
};

export default function DFWLawnAerationGuide2026() {
  const [size, setSize] = useState("medium");
  const [soil, setSoil] = useState("clay");
  const result = recMap[size]?.[soil];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Lawn Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🌱 DFW Lawn Aeration Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>DFW's heavy clay soil compacts hard — aeration is the single highest-ROI lawn treatment for most North Texas homeowners.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "📅", label: "Best Timing", val: "Sept – Oct" },
            { icon: "🌱", label: "Overseed Option", val: "Annual Ryegrass" },
            { icon: "💰", label: "Avg DFW Cost", val: "$150–$300″ },
            { icon: "🔄", label: "Frequency", val: "1–2x per year" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>⚖️ Core vs Liquid Aeration</h2>
          {[
            { name: "Core (Plug) Aeration", pros: "Most effective for DFW clay, allows deep water penetration", cons: "Cores left on lawn for 1–2 weeks", ideal: "Bermuda & St. Augustine lawns in clay soil" },
            { name: "Liquid Aeration", pros: "No cores, faster application, good for maintenance", cons: "Less effective on severely compacted clay", ideal: "Loam soils or follow-up treatment" },
          ].map((t) => (
            <div key={t.name} style={{ marginBottom: "0.75rem", padding: "0.85rem", background: "#0A1628″, borderRadius: 8, border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{t.name}</div>
              <div style={{ color: "#22c55e", fontSize: "0.82rem" }}>✅ {t.pros}</div>
              <div style={{ color: "#f97316″, fontSize: "0.82rem" }}>⚠️ {t.cons}</div>
              <div style={{ color: "#F5E642″, fontSize: "0.82rem" }}>Best for: {t.ideal}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧮 Aeration Recommendation Tool</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Lawn Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="small">Small (&lt;3,000 sqft)</option>
                <option value="medium">Medium (3K–8K sqft)</option>
                <option value="large">Large (8K+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Soil Type</label>
              <select value={soil} onChange={(e) => setSoil(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="clay">Clay (most of DFW)</option>
                <option value="loam">Loam / Mixed</option>
                <option value="sandy">Sandy</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.25rem" }}>{result.rec}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Method: {result.method}</div>
              <div style={{ color: "#22c55e", fontSize: "0.85rem" }}>Estimated cost: {result.cost}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.82rem", marginTop: "0.25rem" }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}