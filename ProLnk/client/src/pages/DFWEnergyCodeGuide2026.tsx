import { useState } from 'react';

type EnergyReq = { applies: boolean; requirements: { label: string; value: string; note: string }[] };
type EnergyData = Record<string, EnergyReq>;

const energyData: EnergyData = {
  "New Construction": {
    applies: true,
    requirements: [
      { label: "Attic Insulation", value: "R-38 minimum", note: "IECC 2021 Climate Zone 3 (DFW). R-49 recommended for max efficiency." },
      { label: "Wall Insulation", value: "R-13 + R-5 continuous", note: "Cavity + continuous foam on exterior or R-20 cavity only." },
      { label: "Foundation / Floor", value: "R-10 perimeter", note: "Slab-on-grade: 2 ft vertical or horizontal perimeter insulation." },
      { label: "Window U-Factor", value: "0.30 or less", note: "Lower U-factor = better insulation. Double-pane low-E required." },
      { label: "Window SHGC", value: "0.25 or less", note: "Solar Heat Gain Coefficient. Critical for DFW summer heat." },
      { label: "Air Sealing", value: "3 ACH50 max", note: "Blower door test required. 3 air changes per hour at 50 pascals." },
      { label: "HVAC Efficiency", value: "SEER2 14.3 min", note: "Minimum for DFW Climate Zone 3. Variable speed preferred." },
      { label: "Duct Leakage", value: "4% max total leakage", note: "Ducts must be tested and sealed. Mastic or metal tape only." },
    ],
  },
  "Major Renovation (permits >$75K)": {
    applies: true,
    requirements: [
      { label: "Attic Insulation", value: "R-38 if accessible", note: "Applies to attic areas disturbed during renovation scope." },
      { label: "Wall Insulation", value: "R-13 if walls opened", note: "Any wall opened during scope must be insulated to current code." },
      { label: "Windows (replaced)", value: "U-0.30 / SHGC-0.25″, note: "Any window replaced as part of permitted scope must meet 2021 IECC." },
      { label: "HVAC (replaced)", value: "SEER2 14.3 min", note: "New equipment must meet minimum efficiency. Sized per Manual J." },
      { label: "Air Sealing", value: "Best effort", note: "Blower door test not always required for renovations but encouraged." },
      { label: "Duct Work (replaced)", value: "4% max leakage", note: "Replaced duct sections must be tested and sealed per IECC." },
    ],
  },
  "Window Replacement Only": {
    applies: true,
    requirements: [
      { label: "Window U-Factor", value: "0.30 or less", note: "Applies when window replacement is permitted (typically yes in DFW)." },
      { label: "Window SHGC", value: "0.25 or less", note: "Limits solar heat gain — important for west and south facing windows." },
      { label: "Energy Label", value: "NFRC label required", note: "Windows must have National Fenestration Rating Council certified label." },
    ],
  },
  "HVAC Replacement Only": {
    applies: true,
    requirements: [
      { label: "Cooling Efficiency", value: "SEER2 14.3 minimum", note: "Effective Jan 2023. New SEER2 rating accounts for external static pressure." },
      { label: "Heating Efficiency", value: "HSPF2 7.5 min (heat pump)", note: "Gas furnaces: 80% AFUE minimum. 96% AFUE recommended for DFW." },
      { label: "Load Calculation", value: "Manual J required", note: "Proper sizing required. Oversized systems short-cycle and reduce humidity control." },
    ],
  },
  "Cosmetic Renovation (<$75K permits)": {
    applies: false,
    requirements: [
      { label: "Energy Code", value: "Not triggered", note: "Projects under $75K in permitted work do not trigger IECC compliance." },
      { label: "Best Practice", value: "Voluntary upgrades encouraged", note: "Consider air sealing and insulation upgrades even when not required — DFW summers justify it." },
    ],
  },
};

export default function DFWEnergyCodeGuide2026() {
  const [projectType, setProjectType] = useState("New Construction");

  const { applies, requirements } = energyData[projectType];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>⚡</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800″, color: "#F5E642", marginTop: "8px" }}>DFW Energy Code Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "8px" }}>Texas adopted IECC 2021 for new construction and major renovations. DFW is in Climate Zone 3 — hot summers drive strict window and air sealing requirements. Know what applies to your project before permitting.</p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ color: "#94a3b8″, fontSize: "13px", display: "block", marginBottom: "6px" }}>Project Type</label>
          <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px", color: "#fff", fontSize: "14px", minWidth: "300px" }}>
            {Object.keys(energyData).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ backgroundColor: applies ? "#0f2a1a" : "#1e293b", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", border: `1px solid ${applies ? "#16a34a" : "#334155"}`, display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>{applies ? "⚠️" : "✅"}</span>
          <p style={{ color: applies ? "#4ade80″ : "#94a3b8", fontWeight: "600" }}>
            {applies ? "IECC 2021 Energy Code APPLIES to this project type" : "Energy Code NOT triggered for this project type"}
          </p>
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <h2 style={{ color: "#F5E642″, fontWeight: "700", marginBottom: "16px" }}>Energy Requirements — {projectType}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {requirements.map(req => (
              <div key={req.label} style={{ backgroundColor: "#0f172a", borderRadius: "8px", padding: "14px", display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", alignItems: "start" }}>
                <div>
                  <p style={{ fontWeight: "600″, color: "#e2e8f0", fontSize: "14px", marginBottom: "4px" }}>{req.label}</p>
                  <p style={{ color: "#94a3b8″, fontSize: "13px" }}>{req.note}</p>
                </div>
                <div style={{ backgroundColor: "#F5E642″, color: "#0A1628", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", fontWeight: "800", textAlign: "center", whiteSpace: "nowrap" }}>{req.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "🌡️", title: "DFW Climate Zone 3″, body: "Hot-humid climate means windows and air sealing are critical. SHGC limits protect against intense summer sun." },
            { icon: "💰", title: "Energy Savings", body: "Proper insulation and air sealing can cut DFW cooling bills 20-40%. Code minimums are the floor, not the target." },
            { icon: "🔍", title: "Who Enforces It", body: "Building departments verify compliance at permit and inspection. Energy code violations can delay CO issuance." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642″, fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8″, fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
