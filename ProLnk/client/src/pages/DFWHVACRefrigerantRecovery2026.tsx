import { useState } from 'react';

const refrigerantData: Record<string, { recovery: string; notes: string; newCharge: string }> = {
  "R-410A": {
    recovery: "Required — EPA Section 608 mandates recovery before system removal",
    notes: "R-410A cannot be vented. Must be recovered into certified cylinder. Can be reclaimed and recycled.",
    newCharge: "New systems use R-454B or R-32 (lower GWP alternatives)"
  },
  "R-22": {
    recovery: "Critical — R-22 is phased out and expensive ($50-100/lb)",
    notes: "Recovered R-22 stored separately, cannot be mixed. Reclaim cost may offset value. Very limited supply.",
    newCharge: "New system will use R-410A or newer low-GWP refrigerant"
  },
  "R-32": {
    recovery: "Required — mild flammability, certified tech required",
    notes: "Newer refrigerant in high-efficiency systems. Lower GWP than R-410A. Recovery straightforward.",
    newCharge: "Same or R-454B depending on manufacturer"
  },
  "R-454B": {
    recovery: "Required — certified recovery equipment needed",
    notes: "Newest standard refrigerant for new installs. Low GWP, mildly flammable (A2L rated).",
    newCharge: "R-454B (Puron Advance) — current preferred DFW option"
  }
};

const systemTypes = ["Replacement", "Repair Leak", "System Decommission"];

export default function DFWHVACRefrigerantRecovery2026() {
  const [refrigerant, setRefrigerant] = useState("R-410A");
  const [systemType, setSystemType] = useState("Replacement");
  const [showResult, setShowResult] = useState(false);

  const result = refrigerantData[refrigerant];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>❄️ Refrigerant Recovery Guide</h1>
        <p style={{ color: "#9BA3B8", marginBottom: 28, lineHeight: 1.6 }}>
          EPA Section 608 makes it illegal to vent refrigerant into the atmosphere. Every DFW HVAC replacement must include certified recovery. Here's what that means for your system.
        </p>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 16 }}>⚠️ EPA Section 608 Requirements</h2>
          <ul style={{ color: "#C8CEDF", lineHeight: 2, paddingLeft: 20 }}>
            <li>Only EPA-certified technicians may recover refrigerant</li>
            <li>Venting is a federal violation — fines up to $44,539 per day</li>
            <li>Recovery required before any component removal</li>
            <li>Technician must document recovery on service record</li>
          </ul>
        </div>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 16 }}>🔧 Recovery Guide Tool</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Current Refrigerant Type</label>
            <select value={refrigerant} onChange={e => { setRefrigerant(e.target.value); setShowResult(false); }}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              {Object.keys(refrigerantData).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Service Type</label>
            <select value={systemType} onChange={e => { setSystemType(e.target.value); setShowResult(false); }}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              {systemTypes.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>
            Show Recovery Guide
          </button>
        </div>

        {showResult && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: "2px solid #F5E642" }}>
            <h3 style={{ color: "#F5E642", marginBottom: 12 }}>📋 {refrigerant} — {systemType}</h3>
            <div style={{ marginBottom: 10 }}><span style={{ color: "#9BA3B8" }}>Recovery Requirement: </span><span style={{ color: "#FFFFFF" }}>{result.recovery}</span></div>
            <div style={{ marginBottom: 10 }}><span style={{ color: "#9BA3B8" }}>Key Notes: </span><span style={{ color: "#FFFFFF" }}>{result.notes}</span></div>
            <div><span style={{ color: "#9BA3B8" }}>New System Charge: </span><span style={{ color: "#F5E642" }}>{result.newCharge}</span></div>
            <div style={{ marginTop: 16, padding: 12, background: "#111E33", borderRadius: 8, color: "#9BA3B8", fontSize: 13 }}>
              💡 Ask your tech: "Will you provide a recovery certificate?" Reputable DFW pros always document this.
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33", borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642" }}>ProLnk DFW:</strong> All ProLnk-verified HVAC pros are EPA Section 608 certified and provide recovery documentation on every job.
        </div>
      </div>
    </div>
  );
}