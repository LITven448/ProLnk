import { useState } from 'react';

const trees = [
  { name: "Live Oak", emoji: "🌳", lifespan: "200+ years", type: "Evergreen", drought: "High", shade: "Dense", detail: "The iconic DFW tree. Evergreen, massive canopy, incredibly long-lived. Perfect anchor tree for any DFW property." },
  { name: "Texas Cedar Elm", emoji: "🍂", lifespan: "100+ years", type: "Deciduous", drought: "High", shade: "Medium-Dense", detail: "DFW native, fast-growing, excellent shade. Fall color. Tolerates both drought and wet conditions." },
  { name: "Bur Oak", emoji: "🪨", lifespan: "300+ years", type: "Deciduous", drought: "Very High", shade: "Dense", detail: "Massive and majestic. Slow to establish but virtually indestructible once rooted in DFW clay." },
  { name: "Texas Redbud", emoji: "🌸", lifespan: "20-30 years", type: "Deciduous", drought: "Medium", shade: "Light", detail: "Stunning pink-purple spring blooms before leaves appear. Perfect understory or accent tree for DFW yards." },
];

const recommendations: Record<string, Record<string, string>> = {
  small: { shade: "Texas Redbud", anchor: "Cedar Elm", wildlife: "Texas Redbud" },
  medium: { shade: "Cedar Elm", anchor: "Live Oak", wildlife: "Live Oak" },
  large: { shade: "Bur Oak", anchor: "Live Oak", wildlife: "Bur Oak" },
};

export default function DFWTexasNativeTrees2026() {
  const [yardSize, setYardSize] = useState("medium");
  const [goal, setGoal] = useState("shade");
  const [selected, setSelected] = useState<string | null>(null);

  const rec = recommendations[yardSize]?.[goal] ?? "Live Oak";

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌳</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Texas Native Trees Guide 2026</h1>
          <p style={{ color: "#94A3B8″, margin: 0 }}>Best native trees for DFW properties — drought-tolerant, long-lived, proven in North Texas clay</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your Perfect DFW Native Tree</h2>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Yard Size</label>
              <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="small">Small (&lt;5,000 sqft)</option>
                <option value="medium">Medium (5,000–15,000 sqft)</option>
                <option value="large">Large (15,000+ sqft)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="shade">Shade & Cooling</option>
                <option value="anchor">Anchor / Statement Tree</option>
                <option value="wildlife">Wildlife Habitat</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "1rem", background: "#F5E642″, borderRadius: 8, padding: "1rem", color: "#0A1628", fontWeight: 600 }}>
            ✅ Recommended for your DFW yard: <span style={{ fontSize: "1.1rem" }}>{rec}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {trees.map(t => (
            <div key={t.name} onClick={() => setSelected(selected === t.name ? null : t.name)} style={{ background: selected === t.name ? "#1E3A5F" : "#0F2040″, border: `1px solid ${selected === t.name ? "#F5E642" : "#1E3A5F"}`, borderRadius: 10, padding: "1.25rem", cursor: "pointer" }}>
              <div style={{ fontSize: "2rem" }}>{t.emoji}</div>
              <h3 style={{ color: "#F5E642″, margin: "0.5rem 0 0.25rem" }}>{t.name}</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>{t.type}</span>
                <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>⏳ {t.lifespan}</span>
                <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>💧 Drought: {t.drought}</span>
              </div>
              {selected === t.name && <p style={{ color: "#CBD5E1″, fontSize: "0.9rem", margin: 0 }}>{t.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8″, margin: "0 0 1rem" }}>Need a DFW landscaping pro to plant or advise on native trees?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}