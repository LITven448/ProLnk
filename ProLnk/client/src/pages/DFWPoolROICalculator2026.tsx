import { useState } from 'react';

export default function DFWPoolROICalculator2026() {
  const [poolCost, setPoolCost] = useState(75000);
  const [yearsToStay, setYearsToStay] = useState(8);
  const [neighborhood, setNeighborhood] = useState<"budget"|"mid"|"luxury">("mid");
  const [hasFeatures, setHasFeatures] = useState({ spa: false, waterfall: false, lighting: false });

  const neighborhoodData = {
    budget: { label: "Starter ($250K-$350K)", valueAdd: 18000, roiMod: 0.7 },
    mid: { label: "Mid-Range ($350K-$550K)", valueAdd: 25000, roiMod: 1.0 },
    luxury: { label: "Luxury ($550K+)", valueAdd: 32000, roiMod: 1.2 },
  };

  const nd = neighborhoodData[neighborhood];
  const featureBonus = (hasFeatures.spa ? 4000 : 0) + (hasFeatures.waterfall ? 2000 : 0) + (hasFeatures.lighting ? 1500 : 0);
  const valueAdded = nd.valueAdd + featureBonus;
  const annualMaintenance = 2400;
  const totalMaintenance = annualMaintenance * yearsToStay;
  const enjoymentValue = yearsToStay * 3500;
  const netPosition = valueAdded - (poolCost - valueAdded) + enjoymentValue - totalMaintenance;
  const roiPct = Math.round((valueAdded / poolCost) * 100);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏊‍♂️🌴</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW Pool ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>DFW — 100°F summers make pools a lifestyle necessity</p>
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>Pool Installation Cost ($)</span>
            <span style={{ color: "#F5E642", fontWeight: 700 }}>${poolCost.toLocaleString()}</span>
          </div>
          <input type="range" min={55000} max={120000} step={2500} value={poolCost}
            onChange={e => setPoolCost(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642" }} />
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 10 }}>Neighborhood Tier</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["budget","mid","luxury"] as const).map(n => (
              <button key={n} onClick={() => setNeighborhood(n)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600,
                  borderColor: neighborhood === n ? "#F5E642" : "#1e3a5f",
                  background: neighborhood === n ? "#0d2444" : "transparent", color: neighborhood === n ? "#F5E642" : "#94a3b8" }}>
                {neighborhoodData[n].label} — +${neighborhoodData[n].valueAdd.toLocaleString()} typical value
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#132038", borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 10 }}>Premium Features (boost resale value)</div>
          {[
            { key: "spa" as const, label: "Attached Spa / Hot Tub", bonus: "+$4,000" },
            { key: "waterfall" as const, label: "Water Feature / Waterfall", bonus: "+$2,000" },
            { key: "lighting" as const, label: "LED Lighting & Automation", bonus: "+$1,500" },
          ].map(({ key, label, bonus }) => (
            <div key={key} onClick={() => setHasFeatures(prev => ({ ...prev, [key]: !prev[key] }))}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" }}>
              <span style={{ fontSize: 13, color: hasFeatures[key] ? "#F5E642" : "#94a3b8" }}>{hasFeatures[key] ? "✓" : "○"} {label}</span>
              <span style={{ fontSize: 12, color: "#22c55e" }}>{bonus}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 18 }}>📊 Pool ROI Results</h2>
          {[
            { label: "Total Installation Cost", val: `$${poolCost.toLocaleString()}` },
            { label: "Resale Value Added", val: `$${valueAdded.toLocaleString()}`, highlight: true },
            { label: "Resale ROI", val: `${roiPct}%`, highlight: true },
            { label: "Annual Maintenance", val: `$${annualMaintenance.toLocaleString()}/yr` },
            { label: `${yearsToStay}-Year Total Maintenance`, val: `-$${totalMaintenance.toLocaleString()}` },
            { label: "Lifestyle Value (DFW summers)", val: `$${enjoymentValue.toLocaleString()}`, highlight: false },
          ].map(({ label, val, highlight }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>{label}</span>
              <span style={{ fontWeight: 700, color: highlight ? "#F5E642" : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2444", border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 14, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 6px" }}>🌡️ DFW Pool Reality</p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>DFW pools are usable 8+ months/year vs 4-5 months nationally. In luxury DFW neighborhoods, no pool can reduce your buyer pool by 40%. Mid-range neighborhoods see 20-30% value bump.</p>
        </div>
      </div>
    </div>
  );
}
