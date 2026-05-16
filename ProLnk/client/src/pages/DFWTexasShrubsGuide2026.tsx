import { useState } from 'react';

const shrubs = [
  { name: "Texas Sage (Cenizo)", emoji: "💜", bloom: "Purple (rain-triggered)", water: "Very Low", deer: true, sun: "Full Sun", detail: "Blooms after rain — DFW locals call it the barometer bush. Silver-green foliage year-round, stunning purple flowers. Near-zero maintenance." },
  { name: "Dwarf Yaupon Holly", emoji: "🌿", bloom: "White (insignificant)", water: "Low", deer: true, sun: "Full Sun–Shade", detail: "Evergreen, extremely adaptable to DFW conditions. No pruning needed to stay compact. Tolerates both clay and drought." },
  { name: "Turk's Cap", emoji: "🌺", bloom: "Red (summer–fall)", water: "Low–Medium", deer: true, sun: "Part Shade–Shade", detail: "Hummingbird and butterfly magnet. Thrives in shaded DFW spots where most plants struggle. Spreads naturally over time." },
  { name: "Possumhaw Holly", emoji: "🍒", bloom: "White spring / Red winter berries", water: "Low", deer: false, sun: "Full Sun–Part Shade", detail: "Stunning red berries persist all winter providing wildlife food and visual interest. Deciduous — berries visible on bare branches." },
];

const recs: Record<string, Record<string, string>> = {
  sunny: { pollinator: "Texas Sage", screen: "Dwarf Yaupon Holly", lowwater: "Texas Sage" },
  shade: { pollinator: "Turk's Cap", screen: "Dwarf Yaupon Holly", lowwater: "Turk's Cap" },
  mixed: { pollinator: "Turk's Cap", screen: "Possumhaw Holly", lowwater: "Texas Sage" },
};

export default function DFWTexasShrubsGuide2026() {
  const [location, setLocation] = useState("sunny");
  const [goalS, setGoalS] = useState("pollinator");
  const [selected, setSelected] = useState<string | null>(null);

  const rec = recs[location]?.[goalS] ?? "Texas Sage";

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌿</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Texas Native Shrubs Guide 2026</h1>
          <p style={{ color: "#94A3B8", margin: 0 }}>Native shrubs for DFW landscaping — drought-proof, deer-resistant, zero-fuss options for North Texas</p>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🎯 DFW Shrub Selector</h2>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Planting Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5", border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="sunny">Full Sun / South-facing</option>
                <option value="shade">Shade / North-facing</option>
                <option value="mixed">Mixed Sun / Partial</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Primary Goal</label>
              <select value={goalS} onChange={e => setGoalS(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5", border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="pollinator">Attract Pollinators / Hummingbirds</option>
                <option value="screen">Privacy Screen / Border</option>
                <option value="lowwater">Lowest Water Use</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "1rem", background: "#F5E642", borderRadius: 8, padding: "1rem", color: "#0A1628", fontWeight: 600 }}>
            ✅ Best DFW shrub for your situation: <span style={{ fontSize: "1.1rem" }}>{rec}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {shrubs.map(s => (
            <div key={s.name} onClick={() => setSelected(selected === s.name ? null : s.name)} style={{ background: selected === s.name ? "#1E3A5F" : "#0F2040", border: `1px solid ${selected === s.name ? "#F5E642" : "#1E3A5F"}`, borderRadius: 10, padding: "1.25rem", cursor: "pointer" }}>
              <div style={{ fontSize: "2rem" }}>{s.emoji}</div>
              <h3 style={{ color: "#F5E642", margin: "0.5rem 0 0.25rem" }}>{s.name}</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <span style={{ background: "#0A1628", color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>☀️ {s.sun}</span>
                <span style={{ background: "#0A1628", color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>💧 {s.water}</span>
                {s.deer && <span style={{ background: "#0A1628", color: "#22C55E", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>🦌 Deer-Resistant</span>}
              </div>
              <div style={{ color: "#94A3B8", fontSize: "0.8rem", marginBottom: "0.5rem" }}>🌸 {s.bloom}</div>
              {selected === s.name && <p style={{ color: "#CBD5E1", fontSize: "0.9rem", margin: 0 }}>{s.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8", margin: "0 0 1rem" }}>Need a DFW landscaper to install native shrubs the right way?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}