import { useState } from 'react';

type PropertyType = "sfr" | "duplex" | "corner";

interface CityRule {
  allowed: boolean;
  maxSqFt: number;
  setback: string;
  permit: string;
  notes: string;
}

export default function DFWADUGuide2026() {
  const [propertyType, setPropertyType] = useState<PropertyType>("sfr");
  const [city, setCity] = useState("Dallas");

  const cityRules: Record<string, CityRule> = {
    Dallas: { allowed: true, maxSqFt: 1500, setback: "5ft sides/rear", permit: "$800-1,400", notes: "Allows detached ADU. No owner-occupancy required." },
    Plano: { allowed: true, maxSqFt: 800, setback: "5ft rear", permit: "$600-1,000", notes: "Must be owner-occupied primary. Garage conversion preferred." },
    Frisco: { allowed: false, maxSqFt: 0, setback: "N/A", permit: "N/A", notes: "ADUs not currently permitted. City actively lobbying for change." },
    Arlington: { allowed: true, maxSqFt: 1000, setback: "7ft sides/rear", permit: "$700-1,200", notes: "Internal ADUs (basement/attic) easier to approve." },
    Irving: { allowed: true, maxSqFt: 900, setback: "5ft rear", permit: "$650-1,100", notes: "Garage conversions allowed, detached requires variance." },
    McKinney: { allowed: false, maxSqFt: 0, setback: "N/A", permit: "N/A", notes: "Currently restricted. City reviewing ordinance in 2026." },
    Garland: { allowed: true, maxSqFt: 1200, setback: "5ft sides/rear", permit: "$700-1,200", notes: "More permissive than most DFW suburbs." },
    Mesquite: { allowed: true, maxSqFt: 800, setback: "6ft rear", permit: "$500-900", notes: "Owner-occupancy required. Garage conversion is easiest path." },
  };

  const cities = Object.keys(cityRules);
  const rules = cityRules[city];

  const aduTypes = [
    { type: "Garage Conversion", cost: "$80,000-110,000", time: "3-5 mo", income: "$1,200-1,500/mo", pros: "Lowest cost, no footprint expansion", cons: "Limited sq ft, lose parking" },
    { type: "Detached New Build", cost: "$110,000-150,000", time: "5-8 mo", income: "$1,400-1,800/mo", pros: "Most privacy, higher rent potential", cons: "Higher cost, permit complexity" },
    { type: "Basement or Attic", cost: "$70,000-100,000", time: "3-4 mo", income: "$1,100-1,400/mo", pros: "No exterior changes, faster permit", cons: "Ceiling height limitations" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW ADU Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>Accessory Dwelling Unit regulations, costs, and rental income potential across DFW cities</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Build Cost Range", value: "$80-150K", emoji: "💰" },
            { label: "Rental Income", value: "$1,200-1,800", emoji: "🏠" },
            { label: "Payback Period", value: "6-9 yrs", emoji: "⏱️" },
            { label: "Value Add", value: "+$120-200K", emoji: "📈" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#112240", borderRadius: 12, padding: "18px 12px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🏙️ ADU Feasibility by City</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14, display: "block", marginBottom: 8 }}>Select City:</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #1e3a5f", background: "#0A1628", color: "#fff", fontSize: 15 }}>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14, display: "block", marginBottom: 8 }}>Property Type:</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["sfr", "duplex", "corner"] as PropertyType[]).map(t => (
                  <button key={t} onClick={() => setPropertyType(t)}
                    style={{ flex: 1, padding: "10px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                      background: propertyType === t ? "#F5E642" : "#0A1628", color: propertyType === t ? "#0A1628" : "#94a3b8" }}>
                    {t === "sfr" ? "🏠 SFR" : t === "duplex" ? "🏢 Duplex" : "📐 Corner Lot"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 12, padding: 20, border: `2px solid ${rules.allowed ? "#4ade80" : "#f87171"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{rules.allowed ? "✅" : "❌"}</span>
              <div>
                <div style={{ color: rules.allowed ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: 20 }}>
                  ADUs {rules.allowed ? "ALLOWED" : "NOT PERMITTED"} in {city}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>{rules.notes}</div>
              </div>
            </div>
            {rules.allowed && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Max Sq Ft", value: `${rules.maxSqFt.toLocaleString()} sqft` },
                  { label: "Setbacks", value: rules.setback },
                  { label: "Permit Cost", value: rules.permit },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#112240", borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ color: "#F5E642", fontWeight: 700 }}>{item.value}</div>
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔨 ADU Build Options Comparison</h2>
          {aduTypes.map((a) => (
            <div key={a.type} style={{ background: "#0A1628", borderRadius: 10, padding: 16, marginBottom: 12, border: "1px solid #1e3a5f" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16 }}>{a.type}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#4ade80", fontWeight: 700 }}>{a.income}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{a.cost} build</div>
                </div>
              </div>
              <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ color: "#4ade80", fontSize: 13 }}>Pros: {a.pros}</div>
                <div style={{ color: "#f87171", fontSize: 13 }}>Cons: {a.cons}</div>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 8 }}>Timeline: {a.time}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#112240", borderRadius: 12, padding: 16, border: "1px solid #F5E642" }}>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
            🔧 <strong style={{ color: "#F5E642" }}>ProLnk connects you with ADU-specialist contractors in DFW</strong> — architects, general contractors, and permit experts who know your city's rules.
          </p>
        </div>
      </div>
    </div>
  );
}
