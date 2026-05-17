import { useState } from 'react';

const buildingTypes = [
  { id: "single-res", label: "Single-Family Home (DFW)", icon: "🏠", system: "Split-System DX", desc: "Standard DFW residential HVAC: outdoor condensing unit plus indoor air handler. Refrigerant (R-410A or R-454B) circulates between units. Direct expansion cooling — refrigerant directly cools air over evaporator coil.", pros: ["Lower first cost than chilled water", "Simple maintenance", "Widely serviced in DFW", "Efficient at residential scale"], cons: ["Less humidity control than chilled water", "Fixed capacity unless variable speed", "Refrigerant leaks costly to find"] },
  { id: "large-home", label: "Large DFW Home 4,000+ sqft", icon: "🏡", system: "Multi-Zone DX with VRF", desc: "Variable Refrigerant Flow (VRF) system. Single outdoor unit serves multiple indoor units via refrigerant piping. Each zone independently controlled. Common in DFW custom homes where duct runs would be excessive.", pros: ["Individual zone control", "High efficiency at part load", "No ductwork runs", "Energy metering by zone"], cons: ["Higher first cost ($25-40 per sqft installed)", "Complex refrigerant circuit", "Specialized service technicians required"] },
  { id: "small-commercial", label: "DFW Small Commercial under 10,000 sqft", icon: "🏪", system: "Packaged DX Rooftop Unit", desc: "All-in-one package unit on roof. Compressor, condenser, evaporator in single cabinet. Ductwork distributes conditioned air. Dominant DFW small commercial system due to flat roof construction and simple service access.", pros: ["All equipment on roof — no mechanical room", "Easy replacement", "Standardized service", "Low installation cost"], cons: ["Exposed to DFW hail", "Lower efficiency than split systems", "Limited zoning without VAV"] },
  { id: "mid-commercial", label: "DFW Mid-Size Commercial 10K-100K sqft", icon: "🏢", system: "DX Rooftop plus VAV Distribution", desc: "Multiple packaged DX units feed Variable Air Volume (VAV) boxes throughout space. Each VAV modulates airflow to zone. Central DX cooling with flexible zone control. Common in DFW office parks and retail.", pros: ["Flexible zoning", "Scalable for DFW tenant build-outs", "DX efficiency plus VAV savings", "Industry standard for TX commercial"], cons: ["Complex controls", "VAV box maintenance", "Requires building automation system"] },
  { id: "large-commercial", label: "Large Commercial or Campus DFW", icon: "🏗️", system: "Chilled Water System", desc: "Central chiller plant produces chilled water distributed to air handling units. NOT direct expansion — water carries cooling, not refrigerant. More common in large DFW office towers, hospitals, and universities.", pros: ["Very efficient at scale (0.5-0.6 kW per ton)", "Excellent humidity control", "Long equipment life (25-30 years)", "Centralized plant management"], cons: ["Very high first cost", "Requires dedicated mechanical plant", "Complex water treatment", "Not practical under 100K sqft"] },
  { id: "server-room", label: "DFW Server Room or Data Center", icon: "🖥️", system: "Precision DX or CRAC Unit", desc: "Computer Room Air Conditioning (CRAC) uses DX refrigerant circuit sized for server heat loads (sensible only, no latent). Often downflow units. In DFW data centers, redundant DX units with economizer mode during cooler months.", pros: ["Precise temperature control", "High sensible heat ratio (SHR 0.85+)", "24/7 reliable operation", "Redundancy built-in"], cons: ["High energy use per ton", "Specialized refrigerant circuit", "DFW 102 degree F limits economizer hours"] },
];

export default function DFWHVACDirectExpansion2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = buildingTypes.find(b => b.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW Direct Expansion HVAC Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>DX vs Chilled Water — System Selection for North Texas Buildings</p>
        </div>
        <div style={{ background: "#F5E64222", border: "1px solid #F5E64244", borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔬 DX vs Chilled Water — The Core Difference</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#F5E642", marginBottom: 4 }}>Direct Expansion (DX)</div>
              <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>Refrigerant flows directly to air handler coil. Air touches refrigerant coil. 90%+ of DFW residential and small commercial.</div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93c5fd", marginBottom: 4 }}>Chilled Water</div>
              <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>Chiller produces 44°F water. Water pipes to AHU coils. Air touches water coil. Large DFW commercial buildings.</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16, fontSize: 14, fontWeight: 600, color: "#94a3b8" }}>Select your DFW building type:</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
          {buildingTypes.map(b => (
            <button key={b.id} onClick={() => setSelected(b.id)} style={{ background: selected === b.id ? "#F5E64222" : "#1e2d45", border: `1px solid ${selected === b.id ? "#F5E642" : "#334155"}`, borderRadius: 10, padding: "14px", textAlign: "left", cursor: "pointer", color: "#fff" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: selected === b.id ? "#F5E642" : "#e2e8f0" }}>{b.label}</div>
              <div style={{ marginTop: 6, fontSize: 11, color: "#F5E642", fontWeight: 600 }}>{b.system}</div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1e2d45", border: "1px solid #F5E642", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{active.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 4 }}>{active.system}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, marginBottom: 14 }}>{active.desc}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", marginBottom: 6 }}>Pros in DFW</div>
                {active.pros.map(p => <div key={p} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 3 }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5", marginBottom: 6 }}>Cons in DFW</div>
                {active.cons.map(c => <div key={c} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 3 }}>• {c}</div>)}
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: 24, fontSize: 11, color: "#475569", textAlign: "center" }}>R-410A phase-out underway — new DFW installs moving to R-454B (lower GWP). Factor into system selection • ProLnk 2026</div>
      </div>
    </div>
  );
}
