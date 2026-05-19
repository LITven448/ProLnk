import { useState } from 'react';

const locations = [
  {
    id: "trinity",
    label: "Trinity River Corridor (Fort Worth, Irving, Dallas riverside)",
    waterTable: "2-12 feet",
    risk: "High",
    detail: "Seasonal water table fluctuation is extreme — 2 feet in wet season, 12+ feet in drought. This cyclic expansion/contraction is the primary driver of DFW foundation movement. Sump systems rarely needed (water table drops in summer), but foundation drainage is critical.",
    tips: ["Install French drains minimum 6\" from foundation", "Soaker hose system to maintain moisture in drought", "Grade all landscaping away at 6:1 slope"]
  },
  {
    id: "lake-adjacent",
    label: "Lake-Adjacent (Grapevine, Rockwall, Lewisville, Ray Hubbard)",
    waterTable: "4-18 feet",
    risk: "Medium-High",
    detail: "Lake-adjacent areas maintain higher sustained moisture. Foundations experience less drought-stress but more hydrostatic pressure. Older homes (pre-1990) in these zones often show upward heaving from persistent moisture rather than settlement.",
    tips: ["Monitor for interior door alignment changes (upward heave)", "Ensure gutters discharge 10+ feet from foundation", "Consider moisture barrier if crawl space exists"]
  },
  {
    id: "upland",
    label: "Upland / Ridge Areas (Plano, Allen, Frisco high points)",
    waterTable: "20-40+ feet",
    risk: "Medium",
    detail: "Deep water table means hydrostatic pressure is not a concern. However, these areas experience the most dramatic soil moisture swings — clay shrinks severely in drought, expanding rapidly after rain. This is the mechanical cause of most DFW pier repairs.",
    tips: ["Soaker hose in summer is highest ROI investment", "Water table not a concern — focus on surface moisture management", "Root barrier if trees within 20 feet"]
  },
  {
    id: "lowland",
    label: "Lowland / Retention Areas (flood-plain adjacent)",
    waterTable: "1-6 feet",
    risk: "Very High",
    detail: "High, persistent water table. Hydrostatic pressure on slab perimeter. Rare DFW basements in these zones require active sump pump systems. Foundations may show lateral movement from soil saturation. Flood insurance implications apply.",
    tips: ["Annual foundation inspection required", "Sump pump if basement/below-grade space exists", "Never plant water-hungry trees within 30 feet"]
  },
];

export default function DFWFoundationClayWatTable2026() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<typeof locations[0]|null>(null);

  function showGuide() {
    const loc = locations.find(l => l.id === location);
    setResult(loc || null);
    if (!loc) setResult(null);
  }

  const riskColor = (r: string) => r.includes("Very")?"#ef4444":r.includes("High")?"#f97316":r.includes("Medium")?"#fbbf24":"#4ade80";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌊</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW Water Table and Foundation Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>How DFW water table depth affects your foundation — by location type</p>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "0.75rem" }}>🧱 DFW Expansive Clay + Water = Movement</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>DFW sits on the Austin Chalk and Eagle Ford Shale formations covered by Blackland Prairie clay — the most expansive soil type in North America. Clay shrinks 3-5% in volume during drought and swells 8-12% when saturated. Water table proximity controls how extreme these swings are. Homes near the water table experience constant pressure and movement; upland homes face the worst drought-induced settlement.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "📏", label: "DFW water table range", value: "2-40+ ft" },
            { icon: "🌧️", label: "Clay volume swing (wet/dry)", value: "3-12%" },
            { icon: "🏠", label: "DFW homes on expansive clay", value: "~85%" },
            { icon: "💧", label: "Capillary rise through concrete", value: "Up to 4 ft" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0F2040", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.3rem", fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 My Location → Water Table + Foundation Guide</h2>
          <select value={location} onChange={e=>setLocation(e.target.value)} style={{ background: "#0A1628", color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", width: "100%", marginBottom: "0.75rem" }}>
            <option value="">Select your DFW location type</option>
            {locations.map(l=><option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
          <button onClick={showGuide} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Show My Foundation Water Guide →</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628", borderRadius: 8, padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ color: "#F5E642", fontWeight: 700 }}>Water Table: {result.waterTable}</span>
                <span style={{ color: riskColor(result.risk), fontWeight: 700 }}>Risk: {result.risk}</span>
              </div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.6, marginBottom: "0.75rem" }}>{result.detail}</p>
              <div>
                <div style={{ color: "#4ade80", fontWeight: 600, marginBottom: "0.4rem" }}>✅ Action Items:</div>
                {result.tips.map((t, i) => <div key={i} style={{ color: "#94a3b8", fontSize: "0.85rem", padding: "0.25rem 0" }}>• {t}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#0A1628", fontWeight: 600, margin: "0.5rem 0" }}>Get a DFW foundation assessment from verified local pros</p>
          <div style={{ color: "#0A1628", fontWeight: 800 }}>prolnk.io — Verified DFW Foundation Specialists</div>
        </div>
      </div>
    </div>
  );
}
