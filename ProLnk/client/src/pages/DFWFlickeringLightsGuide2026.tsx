import { useState } from 'react';

const patterns = [
  "Flickers briefly when turning on",
  "Flickers constantly",
  "Flickers when AC kicks on",
  "Flickers during storms",
  "Flickers in one room only",
  "Flickers throughout whole house",
];

type UrgencyLevel = "low" | "medium" | "high" | "emergency";

const diagnoses: Record<string, { cause: string; urgency: UrgencyLevel; action: string }> = {
  "Flickers briefly when turning on": { cause: "Normal inrush current for incandescent/LED. If LED, try a different bulb brand.", urgency: "low", action: "Replace bulb. If new LED flickers, switch to higher-quality LED or check dimmer compatibility." },
  "Flickers constantly": { cause: "Loose bulb, failing bulb, bad light switch, or loose wire connection.", urgency: "medium", action: "Tighten bulb. If still flickering, replace bulb. If persists, replace switch. If still ongoing, call electrician." },
  "Flickers when AC kicks on": { cause: "Voltage sag from AC startup draw. Very common in DFW summers when AC runs constantly.", urgency: "medium", action: "Normal with older panels. Upgrade to 200A panel or add dedicated AC circuit. Electrician evaluation recommended." },
  "Flickers during storms": { cause: "Oncor grid voltage fluctuations. DFW storms cause utility voltage swings.", urgency: "medium", action: "Install whole-home surge protector ($300-500). Protects appliances from ERCOT/Oncor voltage events." },
  "Flickers in one room only": { cause: "Loose wire connection in that room's circuit, or failing switch/outlet.", urgency: "high", action: "DFW house settling loosens wire connections. Call TDLR-licensed electrician to inspect connections in that circuit." },
  "Flickers throughout whole house": { cause: "DANGER — could be arc fault, loose neutral at panel, or Oncor service issue.", urgency: "emergency", action: "If sudden whole-home flickering: call Oncor (800-332-7143) first. If Oncor is fine, call electrician immediately — loose neutral is a fire and shock hazard." },
};

const urgencyColors: Record<UrgencyLevel, { bg: string; border: string; label: string }> = {
  low: { bg: "#0a2a0a", border: "#22c55e", label: "✅ Low Urgency" },
  medium: { bg: "#1a2a0a", border: "#eab308″, label: "⚠️ Medium Urgency" },
  high: { bg: "#2a1a0a", border: "#f97316″, label: "🔶 High Urgency" },
  emergency: { bg: "#7f1d1d", border: "#ef4444″, label: "🚨 EMERGENCY" },
};

export default function DFWFlickeringLightsGuide2026() {
  const [pattern, setPattern] = useState("");
  const diag = pattern ? diagnoses[pattern] : null;
  const colors = diag ? urgencyColors[diag.urgency] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 14, marginBottom: 8 }}>⚡ DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Flickering Lights Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>DFW homes face unique flicker causes — AC load surges, Oncor grid events, and foundation settling. Find your pattern below.</p>

        <div style={{ background: "#7f1d1d", border: "1px solid #ef4444″, borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <strong style={{ color: "#fca5a5″ }}>🚨 Arc Fault Warning:</strong>
          <span style={{ color: "#fca5a5″, fontSize: 14, marginLeft: 8 }}>If flickering is accompanied by burning smell, popping sounds, or scorched outlets — shut off the breaker and call an electrician immediately. This is a fire emergency.</span>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 16, fontSize: 18 }}>🔍 Diagnose Flicker Pattern</h2>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8″ }}>Describe the flickering</label>
          <select value={pattern} onChange={e => setPattern(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642″, borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select flicker pattern...</option>
            {patterns.map(p => <option key={p}>{p}</option>)}
          </select>

          {diag && colors && (
            <div style={{ marginTop: 20, background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: colors.border }}>{colors.label}</div>
              <div style={{ marginBottom: 8 }}><strong>Cause:</strong> <span style={{ color: "#94a3b8″ }}>{diag.cause}</span></div>
              <div><strong>Action:</strong> <span style={{ color: "#e2e8f0″ }}>{diag.action}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 16, fontSize: 18 }}>🌡️ DFW-Specific Causes</h2>
          {[["AC Startup Surge","DFW AC units starting up can drop voltage momentarily, causing lights to flicker. Normal but fixable with dedicated circuits."],["Oncor Grid Fluctuations","ERCOT grid events and DFW summer storms cause voltage swings. Whole-home surge protectors help."],["Foundation Settlement","DFW clay soil causes foundation movement. This loosens wire connections at outlets, switches, and junction boxes over years."],["Aging Wiring","Many DFW homes (pre-2000) have aluminum wiring or aging copper that needs inspection."]].map(([t, d]) => (
            <div key={t as string} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{t}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
          🏅 TDLR-Licensed DFW Electricians via ProLnk
        </div>
      </div>
    </div>
  );
}
