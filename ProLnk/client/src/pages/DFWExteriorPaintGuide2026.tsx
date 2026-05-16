import { useState } from 'react';

const styles = ["Traditional", "Modern Farmhouse", "Contemporary", "Mediterranean", "Craftsman"];
const hoaOptions = ["No HOA", "HOA — Flexible", "HOA — Strict"];

const recs: Record<string, Record<string, { palette: string[]; brand: string; notes: string }>> = {
  Traditional: {
    "No HOA": { palette: ["Agreeable Gray SW7029", "Accessible Beige SW7036", "Antique White SW6119"], brand: "Sherwin-Williams Emerald", notes: "Warm neutrals with white trim dominate DFW traditional sales." },
    "HOA — Flexible": { palette: ["Accessible Beige SW7036", "Navajo White SW6126", "Balanced Beige SW7037"], brand: "Sherwin-Williams Emerald", notes: "HOA-safe tans and greiges with consistent trim whites." },
    "HOA — Strict": { palette: ["Navajo White SW6126", "Balanced Beige SW7037", "Creamy SW7012"], brand: "Behr Marquee", notes: "Stick to pre-approved HOA palette — confirm before purchase." },
  },
  "Modern Farmhouse": {
    "No HOA": { palette: ["Extra White SW7006", "Alabaster SW7008", "Mindful Gray SW7016"], brand: "Sherwin-Williams Emerald", notes: "White or off-white body with black window trim and dark accents sell fast in DFW." },
    "HOA — Flexible": { palette: ["Alabaster SW7008", "Mindful Gray SW7016", "Accessible Beige SW7036"], brand: "Sherwin-Williams Emerald", notes: "Near-white and light gray keep modern farmhouse look within HOA range." },
    "HOA — Strict": { palette: ["Accessible Beige SW7036", "Creamy SW7012", "Balanced Beige SW7037"], brand: "Behr Marquee", notes: "Verify board approval before any farmhouse white — some HOAs restrict stark whites." },
  },
  Contemporary: {
    "No HOA": { palette: ["Urbane Bronze SW7048", "Peppercorn SW7674", "Iron Ore SW7069"], brand: "Sherwin-Williams Emerald", notes: "Deep charcoals and warm grays dominate contemporary DFW new builds." },
    "HOA — Flexible": { palette: ["Dovetail SW7018", "Peppercorn SW7674", "Mindful Gray SW7016"], brand: "Sherwin-Williams Emerald", notes: "Mid-tone grays offer contemporary look with HOA compatibility." },
    "HOA — Strict": { palette: ["Mindful Gray SW7016", "Agreeable Gray SW7029", "Repose Gray SW7015"], brand: "Behr Marquee", notes: "Light-to-mid grays are broadly HOA-approved across DFW communities." },
  },
  Mediterranean: {
    "No HOA": { palette: ["Antique White SW6119", "Creamy SW7012", "Ivoire SW6127"], brand: "Sherwin-Williams Duration", notes: "Warm off-whites on stucco — UV-resistant formula critical for Texas sun." },
    "HOA — Flexible": { palette: ["Creamy SW7012", "Ivoire SW6127", "Navajo White SW6126"], brand: "Sherwin-Williams Duration", notes: "Golden tones approved by most DFW Mediterranean HOAs." },
    "HOA — Strict": { palette: ["Navajo White SW6126", "Creamy SW7012", "Accessible Beige SW7036"], brand: "Behr Marquee", notes: "Classic stucco tones meet nearly all DFW HOA standards." },
  },
  Craftsman: {
    "No HOA": { palette: ["Sage SW6185", "Clary Sage SW6178", "Dried Thyme SW6186"], brand: "Sherwin-Williams Emerald", notes: "Earthy greens and warm taupes highlight Craftsman character in DFW." },
    "HOA — Flexible": { palette: ["Balanced Beige SW7037", "Accessible Beige SW7036", "Clary Sage SW6178"], brand: "Sherwin-Williams Emerald", notes: "Muted earth tones keep Craftsman character within flexible HOA rules." },
    "HOA — Strict": { palette: ["Accessible Beige SW7036", "Navajo White SW6126", "Balanced Beige SW7037"], brand: "Behr Marquee", notes: "Neutral earth tones are universally HOA-safe — accent doors can add personality." },
  },
};

export default function DFWExteriorPaintGuide2026() {
  const [style, setStyle] = useState("Traditional");
  const [hoa, setHoa] = useState("No HOA");
  const rec = recs[style]?.[hoa];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🎨</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Exterior Paint Colors 2026</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>What sells — and what HOAs allow — in the Dallas–Fort Worth market</p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>Home Style:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {styles.map(s => (
              <button key={s} onClick={() => setStyle(s)} style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                background: style === s ? "#F5E642" : "#1e3a5f", color: style === s ? "#0A1628" : "#cbd5e1", fontWeight: 700 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>HOA Restrictions:</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {hoaOptions.map(h => (
              <button key={h} onClick={() => setHoa(h)} style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                background: hoa === h ? "#F5E642" : "#1e3a5f", color: hoa === h ? "#0A1628" : "#cbd5e1", fontWeight: 700, flex: 1 }}>{h}</button>
            ))}
          </div>
        </div>

        {rec && (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>Recommended: <strong style={{ color: "#F5E642" }}>{rec.brand}</strong> — UV-resistant formula built for Texas heat</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
              {rec.palette.map((color, i) => (
                <div key={i} style={{ background: "#1e3a5f", borderRadius: 8, padding: "0.85rem 1.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>🖌️</span>
                  <span style={{ fontWeight: 700 }}>Option {i + 1}: {color}</span>
                </div>
              ))}
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", borderTop: "1px solid #1e3a5f", paddingTop: "1rem" }}>💡 {rec.notes}</div>
          </div>
        )}

        <div style={{ marginTop: "1.5rem", background: "#0f2040", borderRadius: 12, padding: "1.25rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          ☀️ <strong style={{ color: "#F5E642" }}>DFW Climate Note:</strong> Texas UV exposure fades standard paint 40% faster. Always specify UV-resistant exterior paint — Sherwin-Williams Emerald or Behr Marquee rated for Zone 8 heat.
        </div>
      </div>
    </div>
  );
}
