import { useState } from 'react';

const HOME_SIZES = ["Under 1,500 sqft", "1,500–2,500 sqft", "2,500–3,500 sqft", "Over 3,500 sqft"];
const SYMPTOMS = ["Weak airflow in rooms", "Noisy ductwork", "Hot/cold spots", "High energy bills", "System short-cycling"];

const PRESSURE_GUIDANCE: Record<string, Record<string, { reading: string; check: string }>> = {
  "Under 1,500 sqft": {
    "Weak airflow in rooms": { reading: "Static pressure likely above 0.5 in. w.g.", check: "Inspect return air filter and duct sizing — small homes often have undersized returns." },
    "Noisy ductwork": { reading: "Pressure spike at supply plenum — target 0.2–0.3 in. w.g.", check: "Add return grille or enlarge flex duct diameter." },
    "Hot/cold spots": { reading: "Imbalanced branch pressures — check each run", check: "Adjust balancing dampers; verify DFW Manual D calculation." },
    "High energy bills": { reading: "Total external static likely 0.6+ in. w.g.", check: "Clean coil and blower wheel — DFW dust buildup common." },
    "System short-cycling": { reading: "Pressure drop at coil may indicate icing", check: "Measure refrigerant pressures; verify 400 CFM/ton airflow." },
  },
  "1,500–2,500 sqft": {
    "Weak airflow in rooms": { reading: "Acceptable static: 0.3–0.5 in. w.g. total", check: "Check for pinched flex duct — DFW attic heat collapses flex runs." },
    "Noisy ductwork": { reading: "Velocities above 900 FPM cause noise", check: "Upsize trunk duct or add second return path." },
    "Hot/cold spots": { reading: "Branch duct pressure loss > 0.05 in. w.g.", check: "Balance dampers at supply boot; verify zoning controls." },
    "High energy bills": { reading: "Duct leakage likely — test at 25 Pa", check: "Seal mastic at joints; DFW attics reach 150°F, accelerating duct failure." },
    "System short-cycling": { reading: "Check suction pressure — DFW summers demand 410A at 115–120 psi", check: "Verify refrigerant charge; clean condenser coil." },
  },
  "2,500–3,500 sqft": {
    "Weak airflow in rooms": { reading: "Multi-zone static imbalance — map each zone", check: "Install Magnehelic gauge at each zone damper; DFW zoning is common." },
    "Noisy ductwork": { reading: "Supply trunk velocity above 1,000 FPM", check: "Add duct liner or reduce velocity with larger main trunk." },
    "Hot/cold spots": { reading: "Upstairs zone typically over-pressured in DFW", check: "Adjust zone damper schedule; add bypass damper." },
    "High energy bills": { reading: "External static above 0.8 in. w.g. wastes 15–20% energy", check: "Replace 1-inch filter with 4-inch media filter." },
    "System short-cycling": { reading: "Oversized equipment common in DFW new builds", check: "Run Manual J — many DFW homes are 1–2 tons oversized." },
  },
  "Over 3,500 sqft": {
    "Weak airflow in rooms": { reading: "Multiple systems — isolate which unit is underperforming", check: "Test each system separately; DFW large homes often run 3–5 ton units." },
    "Noisy ductwork": { reading: "High-velocity systems may exceed 1,200 FPM in mains", check: "Design for 600–900 FPM in trunk — add supply plenum volume." },
    "Hot/cold spots": { reading: "Multi-system zoning pressure conflicts", check: "Install static pressure controller; consult DFW HVAC engineer." },
    "High energy bills": { reading: "Combined static loss on 2+ systems multiplies cost", check: "Audit each air handler separately with manometer." },
    "System short-cycling": { reading: "Staging mismatch — variable speed equipment needed", check: "Upgrade to 2-stage or modulating system for DFW load profile." },
  },
};

export default function DFWHVACPressureMap() {
  const [size, setSize] = useState("");
  const [symptom, setSymptom] = useState("");

  const result = size && symptom ? PRESSURE_GUIDANCE[size]?.[symptom] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Pressure Map 📊</h1>
        <p style={{ color: "#94a3b8″, fontSize: 15, marginBottom: 32 }}>
          Understanding static pressure throughout your DFW HVAC system — where to measure, what readings mean, and DFW-specific design pressure requirements.
        </p>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📐 Pressure Assessment Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Home Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select home size...</option>
              {HOME_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Symptom</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select symptom...</option>
              {SYMPTOMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📏 Expected Reading</div>
              <p style={{ color: "#e2e8f0″, fontSize: 14, marginBottom: 16 }}>{result.reading}</p>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🔧 What to Check</div>
              <p style={{ color: "#e2e8f0″, fontSize: 14 }}>{result.check}</p>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[["🏠 Return Static", "Measure 6 inches from blower — target: 0.1–0.2 in. w.g."], ["❄️ Supply Static", "Measure at supply plenum — target: 0.2–0.3 in. w.g."], ["🌡️ DFW Design Req.", "Total ESP 0.5 in. w.g. for ENERGY STAR certification"], ["📋 Manometer", "Digital manometer from Dwyer or Fieldpiece — around $80″]].map(([label, desc]) => (
            <div key={label as string} style={{ background: "#0f2040″, borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label as string}</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#475569″, fontSize: 12 }}>
          ProLnk connects DFW homeowners with HVAC pros who know static pressure. © 2026 ProLnk
        </div>
      </div>
    </div>
  );
}