import { useState } from 'react';

const grasses = [
  { name: "Gulf Muhly", emoji: "🌾", height: "3–4 ft", season: "Fall (pink plumes)", invasive: false, water: "Low", detail: "The showstopper of DFW fall gardens. Stunning pink-purple plumes from September through November. Truly native to Texas, low water, full sun." },
  { name: "Pink Muhly", emoji: "🌸", height: "2–3 ft", season: "Fall (pink plumes)", invasive: false, water: "Low", detail: "Shorter, more compact version of Gulf Muhly. Great for smaller DFW spaces. Same dramatic fall color, easier to fit in borders." },
  { name: "Miscanthus", emoji: "🎋", height: "4–8 ft", season: "Late Summer–Fall", invasive: false, water: "Medium", detail: "Large statement grass for DFW. Not native but not invasive in most DFW areas. Large feathery plumes. Needs more water than native options." },
  { name: "Mexican Feather Grass", emoji: "⚠️", height: "1–2 ft", season: "Spring–Summer", invasive: true, water: "Very Low", detail: "CAUTION: Listed as invasive in Texas. Despite being sold at nurseries, avoid planting in DFW — seeds spread aggressively into natural areas." },
];

const recs: Record<string, Record<string, string>> = {
  small: { native: "Pink Muhly", drama: "Gulf Muhly", border: "Pink Muhly" },
  medium: { native: "Gulf Muhly", drama: "Miscanthus", border: "Gulf Muhly" },
  large: { native: "Gulf Muhly", drama: "Miscanthus", border: "Miscanthus" },
};

export default function DFWOrnamentalGrassesGuide2026() {
  const [size, setSize] = useState("medium");
  const [style, setStyle] = useState("native");
  const [selected, setSelected] = useState<string | null>(null);

  const rec = recs[size]?.[style] ?? "Gulf Muhly";

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌾</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Ornamental Grasses Guide 2026</h1>
          <p style={{ color: "#94A3B8", margin: 0 }}>Ornamental grasses for DFW — including invasive alerts to protect North Texas ecosystems</p>
        </div>

        <div style={{ background: "#3B0000", borderRadius: 10, padding: "1rem", marginBottom: "1.5rem", border: "1px solid #EF4444" }}>
          <strong style={{ color: "#F87171" }}>⚠️ DFW Invasive Alert:</strong>
          <span style={{ color: "#FCA5A5", marginLeft: 8 }}>Mexican Feather Grass is sold in DFW nurseries but is invasive in Texas. Do not plant it in or near natural areas.</span>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🎯 DFW Ornamental Grass Finder</h2>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Garden Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5", border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="small">Small garden / border accent</option>
                <option value="medium">Medium garden / mixed bed</option>
                <option value="large">Large space / mass planting</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: "#94A3B8", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Style Goal</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5", border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="native">Strictly Native / Eco-friendly</option>
                <option value="drama">Maximum Visual Drama</option>
                <option value="border">Low Border / Edging</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "1rem", background: "#F5E642", borderRadius: 8, padding: "1rem", color: "#0A1628", fontWeight: 600 }}>
            ✅ Best DFW ornamental grass for your space: <span style={{ fontSize: "1.1rem" }}>{rec}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {grasses.map(g => (
            <div key={g.name} onClick={() => setSelected(selected === g.name ? null : g.name)} style={{ background: selected === g.name ? "#1E3A5F" : g.invasive ? "#1A0000" : "#0F2040", border: `1px solid ${g.invasive ? "#EF4444" : selected === g.name ? "#F5E642" : "#1E3A5F"}`, borderRadius: 10, padding: "1.25rem", cursor: "pointer" }}>
              <div style={{ fontSize: "2rem" }}>{g.emoji}</div>
              <h3 style={{ color: g.invasive ? "#F87171" : "#F5E642", margin: "0.5rem 0 0.25rem" }}>{g.name}</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <span style={{ background: "#0A1628", color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>📏 {g.height}</span>
                <span style={{ background: "#0A1628", color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>💧 {g.water}</span>
                {g.invasive && <span style={{ background: "#7F1D1D", color: "#FCA5A5", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>⚠️ Invasive in TX</span>}
              </div>
              {selected === g.name && <p style={{ color: "#CBD5E1", fontSize: "0.9rem", margin: 0 }}>{g.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8", margin: "0 0 1rem" }}>Need a DFW landscaper for ornamental grass installation?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}