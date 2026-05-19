import { useState } from 'react';

export default function DFWFoundationROICalculator2026() {
  const [repairCost, setRepairCost] = useState(12000);
  const [homeValue, setHomeValue] = useState(420000);
  const [yearsToStay, setYearsToStay] = useState(7);

  const valueProtected = Math.round(homeValue * 0.15);
  const noRepairDiscount = Math.round(homeValue * 0.18);
  const repairRoi = Math.round(((valueProtected - repairCost) / repairCost) * 100);
  const annualProtection = Math.round(valueProtected / yearsToStay);
  const insuranceSaving = 400;
  const totalBenefit = valueProtected + insuranceSaving * yearsToStay;
  const netGain = totalBenefit - repairCost;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏗️🔩</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW Foundation Repair ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 14 }}>DFW clay soil — protect your largest asset</p>
        </div>

        {[
          { label: "Foundation Repair Cost ($)", value: repairCost, set: setRepairCost, min: 2000, max: 40000, step: 500 },
          { label: "Current Home Value ($)", value: homeValue, set: setHomeValue, min: 150000, max: 900000, step: 10000 },
          { label: "Years Planning to Stay", value: yearsToStay, set: setYearsToStay, min: 1, max: 20, step: 1 },
        ].map(({ label, value, set, min, max, step }) => (
          <div key={label} style={{ background: "#132038″, borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#94a3b8″ }}>{label}</span>
              <span style={{ color: "#F5E642″, fontWeight: 700 }}>{value.toLocaleString()}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={e => set(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
          </div>
        ))}

        <div style={{ background: "#132038″, borderRadius: 12, padding: 24, marginTop: 8 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 18 }}>📊 Financial Impact Analysis</h2>
          {[
            { label: "Value at Risk (Unrepaired)", val: `-$${noRepairDiscount.toLocaleString()}`, danger: true },
            { label: "Value Protected by Repairing", val: `$${valueProtected.toLocaleString()}`, highlight: true },
            { label: "Annual Insurance Savings", val: `$${insuranceSaving}/yr`, highlight: false },
            { label: "Total Benefit Over Stay Period", val: `$${totalBenefit.toLocaleString()}`, highlight: true },
            { label: "Net Financial Position", val: netGain > 0 ? `+$${netGain.toLocaleString()}` : `-$${Math.abs(netGain).toLocaleString()}`, highlight: netGain > 0 },
            { label: "Protection ROI", val: `${repairRoi}%`, highlight: true },
          ].map(({ label, val, highlight, danger }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: 14, color: "#94a3b8″ }}>{label}</span>
              <span style={{ fontWeight: 700, color: danger ? "#ef4444″ : highlight ? "#F5E642" : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          {[
            { icon: "⚠️", title: "Without Repair", desc: "Buyers discount 15-25% or walk away. DFW clay soil expands 4-6 inches seasonally." },
            { icon: "✅", title: "After Repair", desc: "Transferable warranty adds value. Most DFW lenders require foundation cert for financing." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "#132038″, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2444″, border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 14, textAlign: "center" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 6px" }}>🏡 DFW Insight</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Expansive clay soil affects 60% of DFW homes. Foundation issues are the #1 deal-killer in DFW real estate — repair now before listing to maximize sale price.</p>
        </div>
      </div>
    </div>
  );
}
