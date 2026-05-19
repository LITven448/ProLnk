import { useState } from 'react';

const findings = [
  { id: "two_units", label: "Two Outdoor Units Visible", emoji: "🔄", desc: "Two-story DFW homes should have two separate HVAC systems — one per floor. Single system for two stories = undersized, overworked, higher failure rate in DFW heat.", assessment: "Count outdoor condenser units from the street or alley. One unit for two stories = flag for inspection. Two units = properly sized.", severity: "High" },
  { id: "rust", label: "Rust on AC Unit Edges", emoji: "🟤", desc: "Surface rust forming on the edges or bottom panel of the outdoor condenser unit signals age and weather exposure. In DFW, rust accelerates after 10–12 years due to heat cycling.", assessment: "Light surface rust = 8-12 yr old system. Significant rust with panel warping = replacement likely within 2-3 years. Get age confirmed at inspection.", severity: "Medium" },
  { id: "pads", label: "Ground Pads Settled Unevenly", emoji: "📐", desc: "AC condenser units sit on concrete or composite pads. In DFW expansive clay, these pads shift. A tilted unit stresses refrigerant lines and shortens compressor life.", assessment: "Stand at driveway and look at the pad angle. More than 5-degree tilt = flag. Combined with old age = deduct significantly from offer.", severity: "Medium" },
  { id: "insulation", label: "Refrigerant Line Insulation Condition", emoji: "🌡️", desc: "The two copper refrigerant lines running from outdoor unit to interior should be wrapped in foam insulation. Cracked or missing insulation = efficiency loss and potential refrigerant leak.", assessment: "Look for the two copper lines exiting the outdoor unit. Cracked black foam = deferred maintenance. Bare copper with no insulation = immediate flag.", severity: "Medium" },
];

export default function DFWHVACDriveBy2026B() {
  const [selected, setSelected] = useState<string | null>(null);

  const severityColor = (s: string) => s === "High" ? "#ef4444″ : s === "Medium" ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌡️ DFW HVAC Drive-By Assessment Guide 2026 (Part 2)</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 10, fontSize: 15 }}>Advanced drive-by HVAC assessment techniques for DFW pre-purchase evaluation — what experienced buyers look for before scheduling a full inspection.</p>
        <div style={{ background: "#1e2d45″, borderRadius: 8, padding: "10px 14px", marginBottom: 28 }}>
          <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12 }}>Part 2 of 2</span>
          <span style={{ color: "#94a3b8″, fontSize: 12, marginLeft: 8 }}>See Part 1 for basic drive-by HVAC assessment. This guide covers advanced indicators.</span>
        </div>

        <div style={{ color: "#F5E642″, fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>SELECT A FINDING TYPE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {findings.map(f => (
            <div key={f.id} onClick={() => setSelected(selected === f.id ? null : f.id)}
              style={{ background: selected === f.id ? "#132035″ : "#0d1a2b", border: "1px solid " + (selected === f.id ? "#F5E642" : "#1e2d45"), borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{f.emoji}</span>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{f.label}</div>
                </div>
                <span style={{ background: severityColor(f.severity) + "22″, color: severityColor(f.severity), fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>{f.severity}</span>
              </div>
              <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>{f.desc}</p>
              {selected === f.id && (
                <div style={{ marginTop: 14, background: "#1e2d45″, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔍 Drive-By Assessment</div>
                  <p style={{ color: "#e2e8f0″, fontSize: 13 }}>{f.assessment}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#132035″, border: "1px solid #F5E642", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 Get a ProLnk HVAC Pro for Full Assessment</div>
          <p style={{ color: "#94a3b8″, fontSize: 13 }}>Drive-by flags are pre-offer tools only. Charter HVAC pros on ProLnk provide full pre-purchase HVAC inspections, age verification, refrigerant pressure testing, and written condition reports.</p>
        </div>
      </div>
    </div>
  );
}
