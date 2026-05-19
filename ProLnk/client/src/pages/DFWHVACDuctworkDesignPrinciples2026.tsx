import { useState } from 'react';

const symptoms = [
  { symptom: "Rooms too hot in summer", issue: "Undersized supply duct or high static pressure", fix: "Increase duct diameter by 1\" or add supply branch" },
  { symptom: "Weak airflow from vents", issue: "Excessive flex duct length or sharp bends", fix: "Replace with rigid duct, keep flex runs under 6 ft" },
  { symptom: "Loud HVAC noise at vents", issue: "Air velocity exceeds 800 FPM in supply", fix: "Upsize duct or add diffuser to reduce velocity" },
  { symptom: "High energy bills despite new AC", issue: "Return air undersized — system starved for air", fix: "Add dedicated return, target 600 FPM max" },
  { symptom: "Uneven room temperatures", issue: "Trunk-and-branch imbalance or missing dampers", fix: "Balance dampers, verify CFM at each register" },
];

export default function DFWHVACDuctworkDesignPrinciples2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌀</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW HVAC Ductwork Design Principles 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "0.5rem" }}>Engineering your ducts for DFW heat — velocity limits, balance, and common flex duct mistakes</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "📐", label: "System Types", val: "Trunk-Branch vs Spider" },
            { icon: "💨", label: "Supply Velocity Limit", val: "800 FPM max" },
            { icon: "🔄", label: "Return Velocity Limit", val: "600 FPM max" },
            { icon: "⚠️", label: "#1 DFW Error", val: "Undersized flex duct" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0f2035″, borderRadius: 10, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{c.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: "0.2rem" }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0, fontSize: "1.1rem" }}>🏠 Trunk-Branch vs Spider System</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#fff" }}>Trunk-and-Branch</strong> runs a large central trunk from the air handler with smaller branches tapping off — the DFW standard for 1,500–3,500 sq ft homes.
            <strong style={{ color: "#fff" }}> Spider/Plenum-Radial</strong> systems feed all runs from a central plenum box — common in DFW custom homes but requires precise balancing.
            Friction loss calculation: target 0.08–0.10 in. w.g. per 100 ft of equivalent duct length. Most DFW builders undersize flex to cut costs by 20–30%, creating the persistent hot-room problem.
          </p>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🔍 Symptom → Design Issue Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {symptoms.map((s, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? "#1a3a5c" : "#0f2035″, borderRadius: 10, padding: "1rem 1.2rem", cursor: "pointer", border: `1px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0″, fontWeight: 600 }}>🔧 {s.symptom}</span>
                <span style={{ color: "#F5E642″ }}>{selected === i ? "▲" : "▼"}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: "0.8rem", borderTop: "1px solid #2a4a6c", paddingTop: "0.8rem" }}>
                  <div style={{ color: "#fca5a5″, marginBottom: "0.4rem" }}>⚠️ <strong>Root Cause:</strong> {s.issue}</div>
                  <div style={{ color: "#86efac" }}>✅ <strong>Fix:</strong> {s.fix}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk DFW HVAC Guide 2026 · Ductwork Design Principles · Connect with certified DFW HVAC pros
        </div>
      </div>
    </div>
  );
}