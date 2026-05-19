import { useState } from 'react';

const homeStyles = ["Traditional / Craftsman", "Modern / Contemporary", "Mediterranean / Spanish", "Ranch / Farmhouse", "Colonial / Formal"];
const hoaOptions = ["No HOA", "HOA with restrictions", "HOA — colors pre-approved"];

const colorMap: Record<string, Record<string, { colors: string[]; note: string }>> = {
  "Traditional / Craftsman": {
    "No HOA": { colors: ["Weatherwood (brown-gray)", "Charcoal Gray", "Aged Cedar (light brown)"], note: "Traditional DFW homes pair best with warm earth tones. Weatherwood is #1 in DFW for this style." },
    "HOA with restrictions": { colors: ["Charcoal Gray", "Weatherwood", "Pewter Gray"], note: "Neutral grays are the safest HOA-compliant pick in DFW traditional neighborhoods." },
    "HOA — colors pre-approved": { colors: ["Refer to HOA color palette"], note: "Use your HOA-approved list. Ask ProLnk to match shingle samples to HOA color cards." },
  },
  "Modern / Contemporary": {
    "No HOA": { colors: ["Slate Gray", "Charcoal Black", "Pewter Gray"], note: "Dark or cool neutrals complement modern DFW architecture. Slate gray is highly popular in new DFW construction." },
    "HOA with restrictions": { colors: ["Slate Gray", "Pewter Gray"], note: "Most DFW modern HOAs allow cool grays. Avoid warm browns on contemporary homes." },
    "HOA — colors pre-approved": { colors: ["Refer to HOA color palette"], note: "Use your HOA-approved list. Ask ProLnk to match shingle samples to HOA color cards." },
  },
  "Mediterranean / Spanish": {
    "No HOA": { colors: ["Tile Red (composite)", "Terra Cotta", "Weatherwood"], note: "Warm earth tones match DFW Mediterranean roofs. Note: composite shingles can mimic tile look for HOA compliance." },
    "HOA with restrictions": { colors: ["Terra Cotta", "Weatherwood"], note: "Many DFW Mediterranean HOAs require warm red-brown palette." },
    "HOA — colors pre-approved": { colors: ["Refer to HOA color palette"], note: "Use your HOA-approved list." },
  },
};

export default function DFWShingleColorGuide2026() {
  const [style, setStyle] = useState<string | null>(null);
  const [hoa, setHoa] = useState<string | null>(null);

  const result = style && hoa ? (colorMap[style]?.[hoa] ?? null) : null;

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🎨</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Shingle Color Guide 2026</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>Best shingle colors for DFW homes — heat reflection, HOA compliance, curb appeal</p>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>🏠 Select Your Home Style</h2>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {homeStyles.map((s, i) => (
              <button key={i} onClick={() => setStyle(s)} style={{ padding: "0.5rem 1rem", borderRadius: 8, border: style === s ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: style === s ? "#F5E642" : "transparent", color: style === s ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📋 HOA Situation</h2>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {hoaOptions.map((h, i) => (
              <button key={i} onClick={() => setHoa(h)} style={{ padding: "0.5rem 1rem", borderRadius: 8, border: hoa === h ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: hoa === h ? "#F5E642" : "transparent", color: hoa === h ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>{h}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>🎨 Recommended DFW Shingle Colors</h2>
            {result.colors.map((c, i) => (<div key={i} style={{ padding: "0.5rem 0.75rem", marginBottom: "0.4rem", borderRadius: 6, backgroundColor: "#0d2040″, fontSize: "0.95rem" }}>✅ {c}</div>))}
            <p style={{ color: "#aaa", fontSize: "0.88rem", marginTop: "0.75rem" }}>{result.note}</p>
          </div>
        )}

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>🌡️ DFW Heat Reflection Reality Check</h2>
          {[["Light Gray / Tan", "Reflects up to 15°F vs dark shingles", "Best"],["Weatherwood (brown-gray)", "Mid-range heat reflection", "Good"],["Dark Brown", "Absorbs heat — +10-15°F attic temp impact", "Fair"],["Black / Dark Charcoal", "Maximum heat absorption — higher AC load in DFW summers", "Consider carefully"]].map(([color, impact, rating], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0″, borderBottom: i < 3 ? "1px solid #1e3a5f" : "none", fontSize: "0.9rem" }}>
              <span style={{ color: "#ccc" }}>{color}</span>
              <span style={{ color: "#aaa", maxWidth: "50%", textAlign: "right" }}>{impact} — <strong style={{ color: "#F5E642″ }}>{rating}</strong></span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>🎨 Get DFW Shingle Color Samples from ProLnk Roofing Pros — Free Match</p>
        </div>
      </div>
    </div>
  );
}
