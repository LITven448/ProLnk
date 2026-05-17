import { useState } from 'react';

const codeEras = [
  { vintage: "Pre-1970", ibcVersion: "Pre-IBC (Local Codes)", notes: "No statewide standard; city-by-city rules, minimal energy requirements", energy: "None", fire: "Basic egress only" },
  { vintage: "1970-1989", ibcVersion: "BOCA / SBC Hybrid", notes: "DFW cities adopted Southern Building Code, first electrical standards", energy: "None", fire: "Smoke detectors required post-1982" },
  { vintage: "1990-2002", ibcVersion: "SBC 1994 / Pre-IBC", notes: "Transitional era, improved structural requirements, first insulation mandates", energy: "IECC 1993 partial", fire: "CO detectors emerging" },
  { vintage: "2003-2011", ibcVersion: "IBC 2003 / IRC 2003", notes: "Texas adopted IBC; major shift in structural, fire, and accessibility standards", energy: "IECC 2006", fire: "Interconnected smoke alarms required" },
  { vintage: "2012-2018", ibcVersion: "IBC 2009 / IRC 2012", notes: "Energy codes tightened significantly; improved insulation, window efficiency", energy: "IECC 2012", fire: "Carbon monoxide detectors required" },
  { vintage: "2019-2022", ibcVersion: "IBC 2015 / IRC 2015", notes: "DFW cities began IBC 2015 adoption with local amendments", energy: "IECC 2015", fire: "Arc-fault interrupters expanded" },
  { vintage: "2023-Present", ibcVersion: "IBC 2021 / IRC 2021", notes: "Most DFW cities now on IBC/IRC 2021 with Texas amendments; highest efficiency standards", energy: "IECC 2021", fire: "Full AFCI/GFCI coverage" },
];

const majorChanges = [
  { change: "Energy Efficiency", old2006: "R-19 wall insulation typical", new2021: "R-20+ walls, R-49 attic, blower door testing required" },
  { change: "Windows", old2006: "U-factor 0.60 allowed", new2021: "U-factor 0.32 max, solar heat gain coefficient 0.25" },
  { change: "HVAC Ducts", old2006: "Duct leakage 15% allowed", new2021: "Duct leakage 4% max, tested and verified" },
  { change: "Fire Separation", old2006: "1-hour garage separation", new2021: "Enhanced fire blocking, improved penetration sealing" },
  { change: "Egress Windows", old2006: "5.7 sq ft min opening", new2021: "Same but clarified sill height, emergency escape routes" },
  { change: "Electrical", old2006: "AFCI in bedrooms only", new2021: "AFCI in nearly all living spaces, GFCI expanded" },
];

export default function DFWTexasBuildingCodeHistory2026() {
  const [selectedVintage, setSelectedVintage] = useState("");
  const [activeTab, setActiveTab] = useState("timeline");

  const matchedEra = codeEras.find(e => e.vintage === selectedVintage);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Texas Building Code History 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>How Dallas-Fort Worth building codes evolved — from local rules to IBC 2021</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {["timeline", "changes", "lookup"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, backgroundColor: activeTab === tab ? "#F5E642" : "#1e2d45", color: activeTab === tab ? "#0A1628" : "#94a3b8" }}>
              {tab === "timeline" ? "📅 Timeline" : tab === "changes" ? "⚡ 2006→2021 Changes" : "🔍 Home Lookup"}
            </button>
          ))}
        </div>

        {activeTab === "timeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {codeEras.map((era, i) => (
              <div key={i} style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div><span style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>{era.vintage}</span><span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 12 }}>{era.ibcVersion}</span></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ backgroundColor: "#0f2027", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#60a5fa" }}>⚡ {era.energy}</span>
                    <span style={{ backgroundColor: "#0f2027", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#f87171" }}>🔥 {era.fire}</span>
                  </div>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: "8px 0 0" }}>{era.notes}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "changes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginBottom: 8 }}>Major differences between IBC 2006 and IBC 2021 in DFW</p>
            {majorChanges.map((c, i) => (
              <div key={i} style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 14 }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{c.change}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ backgroundColor: "#0f2027", borderRadius: 6, padding: 10 }}><div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>IBC 2006 (OLD)</div><div style={{ color: "#f87171", fontSize: 13 }}>{c.old2006}</div></div>
                  <div style={{ backgroundColor: "#0f2027", borderRadius: 6, padding: 10 }}><div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>IBC 2021 (CURRENT)</div><div style={{ color: "#4ade80", fontSize: 13 }}>{c.new2021}</div></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "lookup" && (
          <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 16 }}>🏠 Find Your Home's Applicable Code Era</h3>
            <select value={selectedVintage} onChange={e => setSelectedVintage(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 14, marginBottom: 16 }}>
              <option value="">Select your home's build year range...</option>
              {codeEras.map(e => <option key={e.vintage} value={e.vintage}>{e.vintage}</option>)}
            </select>
            {matchedEra && (
              <div style={{ backgroundColor: "#0A1628", borderRadius: 10, padding: 16 }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📋 Code Profile: {matchedEra.vintage}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ backgroundColor: "#1e2d45", borderRadius: 6, padding: 10 }}><div style={{ color: "#94a3b8", fontSize: 11 }}>Code Standard</div><div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{matchedEra.ibcVersion}</div></div>
                  <div style={{ backgroundColor: "#1e2d45", borderRadius: 6, padding: 10 }}><div style={{ color: "#94a3b8", fontSize: 11 }}>Energy Code</div><div style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600 }}>{matchedEra.energy}</div></div>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: "0 0 12px" }}>{matchedEra.notes}</p>
                <div style={{ backgroundColor: "#1e2d45", borderRadius: 8, padding: 12, borderLeft: "3px solid #F5E642" }}>
                  <p style={{ color: "#F5E642", fontSize: 12, margin: 0, fontWeight: 600 }}>⚠️ Grandfathering Note: Homes built under older codes are not required to upgrade unless performing major renovations. Additions and major remodels must meet current IBC 2021 standards.</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#475569", fontSize: 11 }}>ProLnk DFW · Building Code History Reference · 2026</div>
      </div>
    </div>
  );
}
