import { useState } from 'react';

const riskMap: Record<string, Record<string, { risk: string; rec: string; color: string }>> = {
  pre1980: {
    wood: { risk: "Very High", rec: "Annual soil treatment + Termidor barrier strongly recommended", color: "#ef4444″ },
    brick: { risk: "High", rec: "Bait system (Sentricon) + annual inspection", color: "#f97316″ },
    slab: { risk: "Moderate", rec: "Annual inspection + spot treatments as needed", color: "#eab308″ },
  },
  "1980-2000″: {
    wood: { risk: "High", rec: "Sentricon bait system + bi-annual inspections", color: "#f97316″ },
    brick: { risk: "Moderate", rec: "Annual inspection + perimeter bait stations", color: "#eab308″ },
    slab: { risk: "Low-Moderate", rec: "Bi-annual inspection sufficient", color: "#22c55e" },
  },
  post2000: {
    wood: { risk: "Moderate", rec: "Bait station perimeter + annual inspection", color: "#eab308″ },
    brick: { risk: "Low", rec: "Annual inspection as preventive measure", color: "#22c55e" },
    slab: { risk: "Low", rec: "Every 2-year inspection unless signs present", color: "#22c55e" },
  },
};

export default function DFWTermiteGuide2026() {
  const [age, setAge] = useState("pre1980″);
  const [material, setMaterial] = useState("wood");
  const result = riskMap[age]?.[material];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Pest Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🐜 DFW Termite Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Subterranean termites cause over $3 billion in Texas damage annually. DFW clay soil and humidity make it a prime termite zone.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "📅", label: "Swarm Season", val: "March – May" },
            { icon: "💰", label: "TX Annual Damage", val: "$3B+" },
            { icon: "🔍", label: "Inspect Frequency", val: "Annually" },
            { icon: "🏡", label: "DFW Risk Level", val: "High" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🔬 Treatment Comparison</h2>
          {[
            { name: "Sentricon Bait System", pro: "No chemicals in soil, kills colony", con: "Slower acting (weeks)", cost: "$1,200–$2,000/yr" },
            { name: "Termidor Soil Treatment", pro: "Fast, long-lasting barrier", con: "Chemical application required", cost: "$800–$1,500 one-time" },
          ].map((t) => (
            <div key={t.name} style={{ marginBottom: "1rem", padding: "1rem", background: "#0A1628″, borderRadius: 8, border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{t.name}</div>
              <div style={{ color: "#22c55e", fontSize: "0.85rem" }}>✅ {t.pro}</div>
              <div style={{ color: "#f97316″, fontSize: "0.85rem" }}>⚠️ {t.con}</div>
              <div style={{ color: "#F5E642″, fontSize: "0.85rem" }}>💲 {t.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧮 My Home Risk Calculator</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Home Age</label>
              <select value={age} onChange={(e) => setAge(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="pre1980″>Pre-1980</option>
                <option value="1980-2000″>1980–2000</option>
                <option value="post2000″>Post-2000</option>
              </select>
            </div>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Primary Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="wood">Wood Frame</option>
                <option value="brick">Brick</option>
                <option value="slab">Slab / Concrete</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Risk Level: {result.risk}</div>
              <div style={{ color: "#cbd5e1″ }}>Recommendation: {result.rec}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
