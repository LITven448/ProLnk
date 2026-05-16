import { useState } from 'react';

const windowTypes = [
  { type: "Single-Pane (Aluminum)", dfwLife: 12, sealLife: 8, icon: "🪟", note: "Poor DFW performer — UV degrades fast" },
  { type: "Double-Pane Vinyl", dfwLife: 20, sealLife: 15, icon: "🪟", note: "Most common, solid DFW choice" },
  { type: "Double-Pane Wood Frame", dfwLife: 15, sealLife: 12, icon: "🏡", note: "DFW heat warps wood — avoid new installs" },
  { type: "Triple-Pane Vinyl", dfwLife: 25, sealLife: 20, icon: "⭐", note: "Best energy performance in DFW heat" },
  { type: "Fiberglass Frame", dfwLife: 30, sealLife: 22, icon: "💎", note: "Premium — handles DFW thermal cycling best" },
];

const symptoms = [
  { symptom: "Fog or moisture between panes", meaning: "Seal failure — gas has escaped", priority: "Replace within 1 year", color: "#f97316" },
  { symptom: "Drafts around closed windows", meaning: "Weatherstripping or frame failure", priority: "Seal or replace", color: "#F5E642" },
  { symptom: "Condensation on inside surface", meaning: "Humidity issue, not window failure", priority: "Check HVAC humidity levels", color: "#22c55e" },
  { symptom: "Cracked or warped frames", meaning: "Thermal cycling damage", priority: "Likely needs replacement", color: "#f97316" },
  { symptom: "Visible frame rot or mold", meaning: "Wood frame failure", priority: "Replace immediately", color: "#ef4444" },
  { symptom: "Hard to open/close", meaning: "Frame distortion from heat", priority: "Evaluate for replacement", color: "#F5E642" },
];

export default function DFWWindowLifespanGuide2026() {
  const [selectedType, setSelectedType] = useState("Double-Pane Vinyl");
  const [windowAge, setWindowAge] = useState(12);
  const [hasFog, setHasFog] = useState(false);

  const selected = windowTypes.find(w => w.type === selectedType)!;
  const sealRemaining = Math.max(0, selected.sealLife - windowAge);
  const frameRemaining = Math.max(0, selected.dfwLife - windowAge);
  const sealPct = Math.min(100, Math.round((windowAge / selected.sealLife) * 100));

  const getStatus = () => {
    if (hasFog) return { label: "Seal Failure — Replace Soon", color: "#ef4444" };
    if (sealRemaining === 0) return { label: "Seal End of Life", color: "#ef4444" };
    if (frameRemaining === 0) return { label: "Full Replacement Recommended", color: "#ef4444" };
    if (sealRemaining <= 3) return { label: "Seal Nearing End", color: "#f97316" };
    if (sealPct >= 70) return { label: "Monitor for Fogging", color: "#F5E642" };
    return { label: "Good Condition", color: "#22c55e" };
  };

  const status = getStatus();

  const energySavings = Math.round(((selected.dfwLife - Math.min(windowAge, selected.dfwLife)) / selected.dfwLife) * 30);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪟</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Window Lifespan Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>DFW UV and heat cycles attack window seals faster than almost anywhere in the US</p>
        </div>

        <div style={{ background: "#1e3a5f33", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #1e3a5f", fontSize: 14, color: "#94a3b8" }}>
          ☀️ <strong style={{ color: "#F5E642" }}>DFW UV Index:</strong> Dallas-Fort Worth ranks in the top 15 sunniest US metros. Sustained UV exposure degrades argon gas seals in double-pane windows 20–30% faster than northern climates. New windows in DFW can cut cooling costs by <strong style={{ color: "#fff" }}>15–25%</strong>.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>🪟 Window Type</label>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px", fontSize: 13 }}>
              {windowTypes.map(w => <option key={w.type} value={w.type}>{w.icon} {w.type}</option>)}
            </select>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>{selected.note}</div>
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>📅 Window Age: {windowAge} years</label>
            <input type="range" min={1} max={35} value={windowAge} onChange={e => setWindowAge(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, cursor: "pointer", fontSize: 14 }}>
              <input type="checkbox" checked={hasFog} onChange={e => setHasFog(e.target.checked)} style={{ accentColor: "#F5E642", width: 16, height: 16 }} />
              <span style={{ color: "#94a3b8" }}>🌫️ Fogging between panes?</span>
            </label>
          </div>
        </div>

        <div style={{ background: status.color + "15", border: `2px solid ${status.color}`, borderRadius: 14, padding: 24, textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
            <div><div style={{ color: "#94a3b8", fontSize: 13 }}>Seal Remaining</div><div style={{ fontSize: 32, fontWeight: 900, color: status.color }}>{sealRemaining} yrs</div></div>
            <div><div style={{ color: "#94a3b8", fontSize: 13 }}>Frame Life Left</div><div style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>{frameRemaining} yrs</div></div>
            <div><div style={{ color: "#94a3b8", fontSize: 13 }}>Energy Savings if Replaced</div><div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>~{energySavings}%</div></div>
          </div>
          <div style={{ marginTop: 12, color: "#e2e8f0", fontWeight: 600 }}>{status.label}</div>
        </div>

        <div style={{ background: "#111d35", borderRadius: 12, border: "1px solid #1e3a5f", overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e3a5f" }}><span style={{ color: "#F5E642", fontWeight: 700 }}>🔍 Symptom Diagnosis Guide</span></div>
          {symptoms.map((s, i) => (
            <div key={i} style={{ padding: "12px 18px", borderBottom: i < symptoms.length - 1 ? "1px solid #0A1628" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: s.color }}>{s.symptom}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{s.meaning}</div>
                </div>
                <div style={{ color: s.color, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{s.priority}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
