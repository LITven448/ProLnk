import { useState } from 'react';

export default function DFWHVACROICalculator2026() {
  const [hvacAge, setHvacAge] = useState(12);
  const [seer, setSeer] = useState(10);
  const [systemCost, setSystemCost] = useState(8500);
  const [monthlyBill, setMonthlyBill] = useState(220);

  const newSeer = 18;
  const efficiencyGain = (newSeer - seer) / newSeer;
  const hvacShare = 0.48;
  const monthlySavings = Math.round(monthlyBill * hvacShare * efficiencyGain);
  const annualSavings = monthlySavings * 12;
  const paybackYears = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : "N/A";
  const tenYearSavings = annualSavings * 10 - systemCost;
  const rebate = 2000;
  const netCost = systemCost - rebate;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>❄️🔥</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW HVAC Upgrade ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>North Texas climate — see your real payback timeline</p>
        </div>

        {[
          { label: "Current HVAC Age (years)", value: hvacAge, set: setHvacAge, min: 1, max: 25, step: 1 },
          { label: "Current SEER Rating", value: seer, set: setSeer, min: 8, max: 16, step: 1 },
          { label: "New System Cost ($)", value: systemCost, set: setSystemCost, min: 5000, max: 18000, step: 500 },
          { label: "Monthly Electric Bill ($)", value: monthlyBill, set: setMonthlyBill, min: 80, max: 500, step: 10 },
        ].map(({ label, value, set, min, max, step }) => (
          <div key={label} style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>{value.toLocaleString()}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={e => set(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
        ))}

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginTop: 8 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 18 }}>📊 Your ROI Results</h2>
          {[
            { label: "New System SEER", val: `${newSeer} SEER`, note: "Industry standard upgrade" },
            { label: "Federal Tax Credit (30% ITC)", val: `$${rebate.toLocaleString()}`, note: "2026 eligible" },
            { label: "Net System Cost", val: `$${netCost.toLocaleString()}` },
            { label: "Monthly Savings", val: `$${monthlySavings}/mo`, highlight: true },
            { label: "Annual Savings", val: `$${annualSavings.toLocaleString()}/yr`, highlight: true },
            { label: "Payback Period", val: `${paybackYears} years`, highlight: true },
            { label: "10-Year Net Savings", val: tenYearSavings > 0 ? `$${tenYearSavings.toLocaleString()}` : "Still recouping", highlight: tenYearSavings > 0 },
          ].map(({ label, val, note, highlight }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <div>
                <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
                {note && <div style={{ fontSize: 11, color: "#475569" }}>{note}</div>}
              </div>
              <span style={{ fontWeight: 700, color: highlight ? "#F5E642" : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2444", border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 20, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 6px" }}>🌡️ DFW Tip</p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>DFW summers average 100°F+ for 30+ days. HVAC over age 10 loses 5-7% efficiency per year — upgrading now locks in savings before peak season.</p>
        </div>
      </div>
    </div>
  );
}
