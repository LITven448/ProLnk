import { useState } from 'react';

export default function DFWElectricServiceEntranceGuide2026() {
  const [issue, setIssue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const issues: Record<string, string> = {
    "Power out to entire house": "📞 CALL ONCOR FIRST: 888-313-4747. Full outages affecting the meter and everything before it are Oncor responsibility. Check Oncor outage map before calling. Do not touch the weatherhead or service entrance cable.",
    "Weatherhead or mast damaged": "👷 YOUR ELECTRICIAN: The weatherhead (conduit at roof), mast, and service entrance cable from mast to meter are customer-owned. A TDLR licensed electrician must repair before Oncor will reconnect service.",
    "Meter socket damaged": "⚠️ SHARED: Oncor owns the meter itself. The meter socket (the enclosure the meter plugs into) is customer-owned. Electrician repairs socket; Oncor reinstalls meter.",
    "Breakers tripping repeatedly": "👷 YOUR ELECTRICIAN: Panel and all downstream wiring is customer property. Repeated breaker trips indicate overload, short circuit, or failing breaker — schedule an electrical inspection.",
    "Burning smell at meter": "🚨 EMERGENCY: Call 911, then Oncor immediately. Evacuate if smell is strong. Arcing at the meter base is a fire emergency. Do not attempt to disconnect power yourself.",
    "Overhead wires to house sagging": "📞 CALL ONCOR: The service drop (wires from utility pole to weatherhead) belongs to Oncor. Sagging or downed service drop wires are their responsibility. Stay 30 ft away from downed wires.",
    "Underground service issue": "📞 CALL ONCOR: Underground service from the transformer vault to your meter is Oncor property. If you suspect underground cable damage, call Oncor and 811 (call before you dig) immediately.",
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏗️</span>
          <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 12 }}>DFW ELECTRICAL GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Service Entrance Guide 2026</h1>
        <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 28 }}>The path from Oncor&apos;s grid to your panel — and who owns each part</p>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>⚡ Service Entry: Who Owns What</h2>
          {[["Utility Pole to Weatherhead", "🔴 Oncor owns", "Service drop wires — Oncor responsibility"],["Weatherhead & Mast", "🟡 Customer owns", "Metal conduit and cap at roofline"],["Service Entrance Cable", "🟡 Customer owns", "Wire from mast down to meter socket"],["Meter Socket", "🟡 Customer owns", "Box that meter plugs into on exterior wall"],["Electric Meter", "🔴 Oncor owns", "Oncor installs, reads, and removes"],["Main Panel & Breakers", "🟡 Customer owns", "All wiring inside panel and downstream"]].map(([component, owner, note]) => (
              <div key={component} style={{ display: "flex", gap: 14, marginBottom: 12, padding: "10px 0", borderBottom: "1px solid #1E2F4F" }}>
                <span style={{ minWidth: 180, color: "#E8EAF0", fontWeight: 600, fontSize: 13 }}>{component}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, color: owner.includes("Oncor") ? "#F87171" : "#4ADE80" }}>{owner}</div>
                  <div style={{ color: "#94A3B8", fontSize: 12 }}>{note}</div>
                </div>
              </div>
            ))}
        </div>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>🏘️ Overhead vs Underground Service in DFW</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🔌 Overhead Service</div>
              <ul style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Common in pre-2000 DFW subdivisions</li>
                <li>Wires visible from pole to house</li>
                <li>Weatherhead at roofline</li>
                <li>Vulnerable to storm damage</li>
                <li>Lower upfront install cost</li>
              </ul>
            </div>
            <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🌐 Underground Service</div>
              <ul style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Standard in newer DFW developments</li>
                <li>Transformer pad on street or yard</li>
                <li>No weatherhead needed</li>
                <li>More storm-resilient</li>
                <li>Higher install cost, easier maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🔍 Service Issue → Who to Call</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: "#1E2F4F", color: "#E8EAF0", border: "1px solid #2D4A7A", borderRadius: 8, padding: "10px 14px", fontSize: 14, flex: 1, minWidth: 200 }}>
              <option value="">Select your issue...</option>
              {Object.keys(issues).map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <button onClick={() => issue && setResult(issues[issue])} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Check</button>
          </div>
          {result && <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14, color: "#E8EAF0", fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}