import { useState } from 'react';

const valveTypes = [
  { name: "Single Stage Gas Valve", icon: "🔵", desc: "Opens fully or not at all — full heat output every call. Common in older DFW furnaces. Less efficient in mild DFW winters." },
  { name: "Dual Stage Gas Valve", icon: "🟢", desc: "First stage runs at ~65% capacity, second at 100%. Better matches DFW mild-cold days. More efficient, more comfortable." },
  { name: "Modulating Valve", icon: "🟡", desc: "Variable output 40–100%. Found in high-efficiency DFW systems (96%+ AFUE). Best comfort and efficiency for Texas climate swings." },
];

const ignitionTypes = [
  { name: "Standing Pilot Light", icon: "🕯️", note: "Pre-1990 DFW furnaces. Pilot stays lit year-round — wastes gas, no longer code-compliant for new installs." },
  { name: "Electronic Ignition (HSI)", icon: "⚡", note: "Hot surface ignitor — glows red-hot to light gas. Most common in 1990–2010 DFW furnaces. Ignitor itself fails ~$150 to replace." },
  { name: "Intermittent Pilot (IPI)", icon: "🔆", note: "Spark-lit pilot on demand. Used in some DFW mid-range systems. More reliable than standing pilot but adds ignition components." },
];

const concerns = [
  { label: "Furnace fires up then shuts off immediately", guide: "Classic gas valve or flame sensor issue. If flame sensor is dirty ($80–150 cleaning), it may misread and close the valve. If valve itself fails, replacement is $200–400 parts + labor." },
  { label: "No heat — no ignition attempt", guide: "Check thermostat signal first. If thermostat calls for heat but board shows no valve signal, the control board may have failed ($200–500). If board shows signal and valve does not open, valve is failed." },
  { label: "DFW humidity and valve operation", guide: "Winter DFW humidity (40–60% RH) can cause valve diaphragm stiffness in older units. If furnace works intermittently in wet weather but not dry, the valve diaphragm may be hardening — replacement recommended." },
  { label: "Gas smell near furnace", guide: "Do NOT attempt to diagnose. Evacuate and call Atmos Energy (DFW gas provider) at 1-888-286-6700. Could be valve seat leak — critical safety issue. Do not run HVAC until cleared." },
  { label: "Short cycling (on/off repeatedly)", guide: "If single-stage valve, system may be oversized for DFW climate — common in post-ice-storm over-spec situations. Also check heat exchanger for cracks which trigger high-limit cutoff." },
  { label: "Replacing gas valve — cost check", guide: "DFW HVAC labor: $100–150/hr. Gas valve part: $80–250 OEM (Honeywell, White-Rodgers). Total typical: $250–$500. If system over 15 years old, evaluate full furnace replacement vs repair." },
];

export default function DFWHVACGasValveGuide2026B() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642", fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🔥 DFW HVAC Gas Valve Guide (Part 2)
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.6 }}>
          Single vs dual stage furnace gas valves, ignition systems, DFW humidity effects, and failure diagnosis for North Texas homeowners.
        </p>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>Gas Valve Types</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {valveTypes.map((v, i) => (
            <div key={i} style={{ background: "#0f2040", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{v.icon}</span>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700 }}>{v.name}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.87rem", lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>Ignition System Types</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
          {ignitionTypes.map((ig, i) => (
            <div key={i} style={{ background: "#0f2040", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>{ig.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.3rem" }}>{ig.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.5 }}>{ig.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a00", border: "1px solid #F5E642", borderRadius: 10, padding: "1rem", marginBottom: "2rem" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.4rem" }}>⚠️ DFW Safety Note</div>
          <div style={{ color: "#e2e8f0", fontSize: "0.87rem", lineHeight: 1.6 }}>
            If you smell gas near your furnace, do not attempt diagnosis. Evacuate and call Atmos Energy: 1-888-286-6700. Gas valve seat leaks are a critical safety emergency.
          </div>
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Furnace Gas Behavior Assessment</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1a3a5c" : "#0f2040", border: `1px solid ${selectedConcern === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer", fontWeight: selectedConcern === i ? 700 : 400 }}>
              {c.label}
              {selectedConcern === i && (
                <div style={{ marginTop: "0.6rem", color: "#94a3b8", fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.6 }}>{c.guide}</div>
              )}
            </button>
          ))}
        </div>
        <div style={{ color: "#475569", fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — Gas Valve Reference 2026</div>
      </div>
    </div>
  );
}
