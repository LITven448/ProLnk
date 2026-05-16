import { useState } from 'react';

export default function DFWKitchenROICalculator2026() {
  const [remodelType, setRemodelType] = useState<"minor"|"mid"|"major">("mid");
  const [homeValue, setHomeValue] = useState(420000);

  const configs = {
    minor: { cost: 15000, roi: 0.72, label: "Minor Refresh", items: ["Cabinets painted","New hardware","Countertop refresh","Appliance updates"] },
    mid: { cost: 45000, roi: 0.62, label: "Mid-Range Remodel", items: ["Semi-custom cabinets","Granite/quartz counters","New appliances","Flooring update"] },
    major: { cost: 85000, roi: 0.54, label: "Major Renovation", items: ["Custom cabinets","Premium appliances","Layout changes","High-end finishes"] },
  };

  const cfg = configs[remodelType];
  const valueAdded = Math.round(cfg.cost * cfg.roi);
  const roiPct = Math.round(cfg.roi * 100);
  const netCost = cfg.cost - valueAdded;
  const recoupYears = Math.ceil(netCost / 8000);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🍳🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW Kitchen Remodel ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>DFW market data — maximize your kitchen investment</p>
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Remodel Type</div>
          <div style={{ display: "flex", gap: 10 }}>
            {(["minor","mid","major"] as const).map(t => (
              <button key={t} onClick={() => setRemodelType(t)}
                style={{ flex: 1, padding: "10px 4px", borderRadius: 8, border: "2px solid", cursor: "pointer", fontSize: 12, fontWeight: 700,
                  borderColor: remodelType === t ? "#F5E642" : "#1e3a5f",
                  background: remodelType === t ? "#F5E642" : "#0d2444",
                  color: remodelType === t ? "#0A1628" : "#94a3b8" }}>
                {configs[t].label}<br/><span style={{ fontWeight: 400 }}>${configs[t].cost.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>Current Home Value</span>
            <span style={{ color: "#F5E642", fontWeight: 700 }}>${homeValue.toLocaleString()}</span>
          </div>
          <input type="range" min={200000} max={900000} step={10000} value={homeValue}
            onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642" }} />
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginTop: 8 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 18 }}>📊 Your ROI Results</h2>
          {[
            { label: "Remodel Investment", val: `$${cfg.cost.toLocaleString()}` },
            { label: "DFW Resale Value Added", val: `$${valueAdded.toLocaleString()}`, highlight: true },
            { label: "Return on Investment", val: `${roiPct}%`, highlight: true },
            { label: "Out-of-Pocket Net Cost", val: `$${netCost.toLocaleString()}` },
            { label: "Post-Reno Home Value", val: `$${(homeValue + valueAdded).toLocaleString()}`, highlight: true },
            { label: "Years to Recoup via Appreciation", val: `~${recoupYears} yrs` },
          ].map(({ label, val, highlight }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
              <span style={{ fontWeight: 700, color: highlight ? "#F5E642" : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: 16, marginTop: 14 }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>✅ {cfg.label} Includes</div>
          {cfg.items.map(i => <div key={i} style={{ fontSize: 13, color: "#94a3b8", padding: "3px 0" }}>• {i}</div>)}
        </div>

        <div style={{ background: "#0d2444", border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 14, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 6px" }}>🏡 DFW Market Insight</p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>DFW buyers rank kitchen as #1 selling factor. Minor refreshes outperform major renovations in ROI — focus on counters, cabinets, and appliances for highest return.</p>
        </div>
      </div>
    </div>
  );
}
