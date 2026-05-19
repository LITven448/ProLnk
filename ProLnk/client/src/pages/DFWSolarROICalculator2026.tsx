import { useState } from 'react';

export default function DFWSolarROICalculator2026() {
  const [systemKw, setSystemKw] = useState(10);
  const [monthlyBill, setMonthlyBill] = useState(220);
  const [roofAge, setRoofAge] = useState(8);
  const [addBattery, setAddBattery] = useState(false);

  const costPerKw = 2800;
  const grossCost = systemKw * costPerKw;
  const itcCredit = Math.round(grossCost * 0.30);
  const batteryCost = addBattery ? 12000 : 0;
  const batteryCredit = addBattery ? Math.round(batteryCost * 0.30) : 0;
  const netCost = grossCost - itcCredit + batteryCost - batteryCredit;
  const annualGenKwh = systemKw * 1650;
  const dfwRate = 0.135;
  const annualSavings = Math.round(annualGenKwh * dfwRate);
  const monthlySavings = Math.round(annualSavings / 12);
  const batteryBonus = addBattery ? 480 : 0;
  const totalAnnual = annualSavings + batteryBonus;
  const paybackYears = (netCost / totalAnnual).toFixed(1);
  const net25 = totalAnnual * 25 - netCost;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>☀️⚡</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW Solar ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>ERCOT grid + 30% ITC — North Texas solar economics</p>
        </div>

        {[
          { label: "System Size (kW)", value: systemKw, set: setSystemKw, min: 4, max: 20, step: 1 },
          { label: "Monthly Electric Bill ($)", value: monthlyBill, set: setMonthlyBill, min: 60, max: 500, step: 10 },
          { label: "Roof Age (years)", value: roofAge, set: setRoofAge, min: 0, max: 25, step: 1 },
        ].map(({ label, value, set, min, max, step }) => (
          <div key={label} style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>{value}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={e => set(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
        ))}

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, color: "#94a3b8" }}>Add ERCOT Battery Storage</div>
            <div style={{ fontSize: 12, color: "#475569" }}>+$12K gross / +$8.4K net after ITC — outage protection</div>
          </div>
          <button onClick={() => setAddBattery(!addBattery)}
            style={{ padding: "8px 18px", borderRadius: 8, border: "2px solid", cursor: "pointer", fontWeight: 700, fontSize: 13,
              borderColor: "#F5E642", background: addBattery ? "#F5E642" : "transparent", color: addBattery ? "#0A1628" : "#F5E642" }}>
            {addBattery ? "✓ Added" : "+ Add"}
          </button>
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginTop: 8 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 18 }}>📊 Solar ROI Results</h2>
          {[
            { label: "Gross System Cost", val: `$${grossCost.toLocaleString()}` },
            { label: "30% Federal ITC Credit", val: `-$${itcCredit.toLocaleString()}`, highlight: true },
            { label: "Net Cost After Credits", val: `$${netCost.toLocaleString()}` },
            { label: "Annual Energy Production", val: `${annualGenKwh.toLocaleString()} kWh` },
            { label: "Monthly Bill Savings", val: `$${monthlySavings}/mo`, highlight: true },
            { label: "Payback Period", val: `${paybackYears} years`, highlight: true },
            { label: "25-Year Net Savings", val: `$${net25.toLocaleString()}`, highlight: true },
          ].map(({ label, val, highlight }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
              <span style={{ fontWeight: 700, color: highlight ? "#F5E642" : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        {roofAge > 15 && (
          <div style={{ background: "#2a1010", border: "1px solid #ef4444", borderRadius: 10, padding: 14, marginTop: 14 }}>
            <p style={{ color: "#ef4444", fontWeight: 700, margin: "0 0 4px" }}>⚠️ Roof Age Warning</p>
            <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Roof is {roofAge} years old. Solar installers typically require roof under 15 years. Consider bundling roof + solar for maximum combined ITC benefit.</p>
          </div>
        )}

        <div style={{ background: "#0d2444", border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 14, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 6px" }}>☀️ DFW Solar Fact</p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>DFW averages 230+ sunny days/year — among the highest in Texas. ERCOT deregulation means you can sell excess back at peak rates during summer demand spikes.</p>
        </div>
      </div>
    </div>
  );
}
