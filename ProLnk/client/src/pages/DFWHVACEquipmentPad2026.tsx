import { useState } from 'react';

const padTypes = [
  { icon: "🧱", name: "Concrete Pad", pros: ["Low initial cost", "Common in DFW installs pre-2010"], cons: ["Cracks as DFW clay shifts", "Settles unevenly, hard to relevel", "Absorbs moisture, degrades edges"], verdict: "Problematic in DFW long-term" },
  { icon: "🟦", name: "Composite Pad", pros: ["Resists DFW clay settlement", "Won't crack or absorb moisture", "Lightweight — easier to shim/level", "Preferred by DFW HVAC pros 2020+"], cons: ["Slightly higher upfront cost", "Must be sized to unit footprint"], verdict: "DFW recommended standard" },
];

const conditions = [
  { label: "Pad visually level, no equipment tilt", recommendation: "No Action Needed", detail: "Check annually. DFW clay moves each season — minor shifts are normal. Monitor for vibration changes which signal leveling issues." },
  { label: "Pad tilting 1/8\" (barely visible tilt)", recommendation: "Monitor — Level Within 6 Months", detail: "DFW efficiency impact begins around 1/4\". At 1/8\" you have time but schedule leveling before next cooling season." },
  { label: "Pad tilting 1/4\" or more", recommendation: "Level Immediately", detail: "1/4\" tilt in DFW is the threshold for efficiency loss. Refrigerant oil pooling in the compressor crankcase begins at this angle. Schedule HVAC tech." },
  { label: "Concrete pad cracked, unit wobbling", recommendation: "Replace Pad + Level Unit", detail: "Cracked DFW pads continue to settle unevenly. Replace with composite pad and reset unit level simultaneously." },
  { label: "New unit installation", recommendation: "Install Composite Pad", detail: "Specify composite pad at install. DFW clay movement makes concrete pad a long-term maintenance item. Spend the delta upfront." },
  { label: "Unit making vibration/noise on startup", recommendation: "Check Level First", detail: "Unlevel DFW units transmit vibration differently. Check level before diagnosing compressor or refrigerant issues — often the simpler fix." },
];

export default function DFWHVACEquipmentPad2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW HVAC Equipment Pad Leveling Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>
            DFW clay moves AC pads every year — here is when it matters and what to do
          </p>
        </div>

        <div style={{ backgroundColor: "#112240", borderRadius: 12, padding: 20, border: "1px solid #F5E642", marginBottom: 28 }}>
          <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 14, marginBottom: 8 }}>⚠️ DFW Soil Reality</div>
          <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>
            DFW Blackland Prairie clay expands and contracts with moisture. This seasonal movement shifts AC pads every 1–3 years. A 1/4-inch tilt is the HVAC industry threshold for efficiency loss — refrigerant oil fails to circulate properly in the compressor at this angle, increasing wear and reducing cooling output.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {padTypes.map((p, i) => (
            <div key={i} style={{ backgroundColor: "#112240", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{p.icon}</span>
                <div>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ color: "#475569", fontSize: 12 }}>{p.verdict}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>PROS</div>
                  {p.pros.map((item, j) => <div key={j} style={{ color: "#94a3b8", fontSize: 12, marginBottom: 3 }}>+ {item}</div>)}
                </div>
                <div>
                  <div style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CONS</div>
                  {p.cons.map((item, j) => <div key={j} style={{ color: "#94a3b8", fontSize: 12, marginBottom: 3 }}>− {item}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240", borderRadius: 12, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🔧 Your DFW Pad Condition</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {conditions.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? "#F5E642" : "#0A1628",
                  color: selected === i ? "#0A1628" : "#e2e8f0",
                  border: "1px solid " + (selected === i ? "#F5E642" : "#1e3a5f"),
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", fontSize: 14, fontWeight: selected === i ? 700 : 400,
                }}>{c.label}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, backgroundColor: "#0A1628", borderRadius: 10, padding: 18, border: "1px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>✅ {conditions[selected].recommendation}</div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{conditions[selected].detail}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 28, color: "#475569", fontSize: 12 }}>
          ProLnk DFW HVAC Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
