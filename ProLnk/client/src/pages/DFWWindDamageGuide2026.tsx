import { useState } from 'react';

export default function DFWWindDamageGuide2026() {
  const [damageType, setDamageType] = useState<string | null>(null);

  type WindInfo = { deductible: string; color: string; coverage: string[]; contractors: string[] };
  const windData: Record<string, WindInfo> = {
    tornado: {
      deductible: "Wind/Hail deductible applies — typically 1-2% of dwelling value in TX",
      color: "#EF4444″,
      coverage: ["✅ Structure damage fully covered (minus deductible)", "✅ Personal property/contents covered", "✅ Additional Living Expense (ALE) if home uninhabitable", "⚠️ Separate wind/hail deductible — NOT your standard deductible", "📋 Get tornado path documentation from National Weather Service"],
      contractors: ["Emergency board-up and tarping — same day", "Structural engineer assessment before rebuild", "Roofing contractor for complete replacement", "General contractor for structural repairs"],
    },
    straightline: {
      deductible: "Wind/Hail deductible — DFW straight-line winds regularly hit 70-90 mph",
      color: "#F59E0B",
      coverage: ["✅ Wind damage covered under standard HO policy", "⚠️ Must prove wind (not pre-existing) caused damage", "📋 Get wind speed data from nearest weather station", "🔍 Fence and outbuilding coverage may have sub-limits", "📸 Document fallen trees, debris patterns for wind proof"],
      contractors: ["Tree removal with damage documentation", "Roof inspection — focus on lifted shingles and ridge caps", "Siding assessment for impact and uplift damage", "Fence and outbuilding repair"],
    },
    roof_only: {
      deductible: "Standard wind/hail deductible — consider IBHS Fortified upgrade",
      color: "#22C55E",
      coverage: ["✅ Storm-caused roof damage covered", "⚠️ Age and condition of existing roof matters — depreciation", "⚠️ If roof is 15+ years old, insurer may offer ACV not RCV", "📋 Get weather data to confirm storm event on claim date", "🔍 Matching requirement: TX law requires insurer to match materials"],
      contractors: ["Licensed roofing contractor with storm experience", "Request IBHS Fortified certification during rebuild", "Check if insurer offers premium discount for fortified roof"],
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌪️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>DFW Wind Damage Recovery Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>DFW leads Texas in straight-line wind events — know your deductible before you file</p>
        </div>

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: "4px solid #F5E642″ }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 12 }}>⚠️ Texas Wind vs Hail Deductibles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["TX insurers use a SEPARATE wind/hail deductible — often 1-2% of home value", "On a $400K home: your deductible is $4,000-$8,000 before coverage kicks in", "Wind and hail are treated the same deductible in most TX policies", "Immediately tarp any open roof or wall — insurer can deny for failure to mitigate", "Document damage BEFORE tarping — photo first, protect second"].map((item, i) => (
              <div key={i} style={{ color: "#E2E8F0″, fontSize: 13 }}>• {item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 12 }}>What type of wind event?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["tornado", "🌪️ Tornado"], ["straightline", "💨 Straight-Line Winds"], ["roof_only", "🏠 Roof Damage Only"]].map(([key, label]) => (
              <button key={key} onClick={() => setDamageType(damageType === key ? null : key)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: damageType === key ? "#F5E642″ : "#334155", backgroundColor: damageType === key ? "#F5E64220" : "transparent", color: damageType === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {damageType && windData[damageType] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <p style={{ color: windData[damageType].color, fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>💰 {windData[damageType].deductible}</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>Coverage Details</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {windData[damageType].coverage.map((c, i) => <li key={i} style={{ color: "#E2E8F0″, fontSize: 13 }}>{c}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>Contractors You Need</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {windData[damageType].contractors.map((c, i) => <li key={i} style={{ color: "#E2E8F0″, fontSize: 13 }}>🔧 {c}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>🔗 ProLnk: Vetted DFW Wind/Storm Contractors</h2>
          <p style={{ color: "#94A3B8″, fontSize: 14, margin: 0 }}>Emergency tarping to full rebuild — licensed pros with IBHS Fortified experience across DFW.</p>
        </div>
      </div>
    </div>
  );
}