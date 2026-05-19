import { useState } from 'react';

const breakerTypes = ["Standard", "GFCI", "AFCI", "Dual-Function AFCI/GFCI"];
const patterns = ["Trips immediately", "Trips after a few minutes", "Trips randomly", "Won't reset"];

const diagnoses: Record<string, Record<string, string>> = {
  "Standard": {
    "Trips immediately": "Overloaded circuit — AC + appliances sharing same circuit. Unplug devices, reset, redistribute load.",
    "Trips after a few minutes": "Sustained overload. DFW AC units draw 15-20A — check if sharing with kitchen appliances.",
    "Trips randomly": "Possible arc fault or loose wiring. DFW home settling causes wire connections to loosen. Call electrician.",
    "Won't reset": "Short circuit or failed breaker. Do not force. Call licensed electrician (TDLR).",
  },
  "GFCI": {
    "Trips immediately": "Ground fault detected — moisture likely. Common in DFW bathrooms, kitchens, garages. Dry area and retry.",
    "Trips after a few minutes": "Intermittent ground fault. Check for moisture intrusion around DFW windows/foundations.",
    "Trips randomly": "Faulty GFCI breaker or moisture issue. GFCI breakers should be tested monthly.",
    "Won't reset": "Failed GFCI or active ground fault present. Replace GFCI or call electrician.",
  },
  "AFCI": {
    "Trips immediately": "Arc fault detected — potential wiring danger. Do not override. Call electrician immediately.",
    "Trips after a few minutes": "Arcing condition in circuit. DFW house settling can loosen wire connections causing arcs.",
    "Trips randomly": "Nuisance tripping (some appliances trigger AFCI) or real arc fault. Have electrician verify.",
    "Won't reset": "Active arc fault condition. Emergency — call TDLR-licensed electrician now.",
  },
  "Dual-Function AFCI/GFCI": {
    "Trips immediately": "Either ground fault or arc fault. Check for moisture first, then call electrician.",
    "Trips after a few minutes": "Sustained fault condition. Do not ignore — dual breakers protect from two fire risks.",
    "Trips randomly": "Complex fault or nuisance trip. Electrician needed to diagnose.",
    "Won't reset": "Active fault. Emergency — shut off main if needed, call electrician.",
  },
};

export default function DFWBreakerTrippingGuide2026() {
  const [breakerType, setBreakerType] = useState("");
  const [pattern, setPattern] = useState("");
  const result = breakerType && pattern ? diagnoses[breakerType]?.[pattern] : null;
  const isEmergency = result?.toLowerCase().includes("emergency") || result?.toLowerCase().includes("immediately");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 14, marginBottom: 8 }}>⚡ DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Breaker Keeps Tripping?</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>DFW homes run heavy AC loads year-round. Here's why your breaker trips — and what to do.</p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>🔍 Diagnose Your Breaker</h2>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Breaker Type</label>
          <select value={breakerType} onChange={e => setBreakerType(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 15 }}>
            <option value="">Select breaker type...</option>
            {breakerTypes.map(b => <option key={b}>{b}</option>)}
          </select>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Trip Pattern</label>
          <select value={pattern} onChange={e => setPattern(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select pattern...</option>
            {patterns.map(p => <option key={p}>{p}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: isEmergency ? "#7f1d1d" : "#0a2a0a", border: `1px solid ${isEmergency ? "#ef4444" : "#22c55e"}`, borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{isEmergency ? "🚨 EMERGENCY" : "✅ Diagnosis"}</div>
              <div style={{ color: "#e2e8f0", lineHeight: 1.6 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>⚠️ DFW-Specific Causes</h2>
          {[["🌡️ AC Overload", "DFW summers push AC to run 8-12 hrs/day. Units on shared circuits cause constant overloads."],["🏠 House Settling", "DFW clay soil causes foundation movement, loosening wire connections over time."],["💧 Moisture Intrusion", "Summer humidity triggers GFCI trips in bathrooms, garages, and outdoor circuits."],["🔌 Aging Panels", "Many DFW homes (1980s-2000s) have undersized 100A panels that can't handle modern loads."]].map(([t, d]) => (
            <div key={t as string} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{t}</div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{d}</div>
            </div>
          ))}
          <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
            🏅 TDLR-Licensed DFW Electricians Available via ProLnk
          </div>
        </div>
      </div>
    </div>
  );
}
