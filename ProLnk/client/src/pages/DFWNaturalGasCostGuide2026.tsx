import { useState } from 'react';

export default function DFWNaturalGasCostGuide2026() {
  const [homeSize, setHomeSize] = useState(2000);
  const [hasGasRange, setHasGasRange] = useState(true);
  const [hasGasDryer, setHasGasDryer] = useState(true);

  const THERM_RATE = 0.85;
  const furnaceThermBase = homeSize / 1000 * 70;
  const waterHeatTherms = 22;
  const rangeTherms = hasGasRange ? 8 : 0;
  const dryerTherms = hasGasDryer ? 5 : 0;
  const totalTherms = Math.round(furnaceThermBase + waterHeatTherms + rangeTherms + dryerTherms);
  const totalCost = (totalTherms * THERM_RATE).toFixed(0);

  const seasons = [
    { season: "☀️ Summer", furnace: 0, water: 22, other: rangeTherms + dryerTherms, note: "Furnace off — water heater dominates" },
    { season: "🍂 Fall/Spring", furnace: Math.round(furnaceThermBase * 0.4), water: 22, other: rangeTherms + dryerTherms, note: "Shoulder season — furnace 30-50% runtime" },
    { season: "❄️ Winter", furnace: Math.round(furnaceThermBase), water: 22, other: rangeTherms + dryerTherms, note: "Peak — furnace uses 60-75% of gas bill" },
  ];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔥</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW Natural Gas Cost Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: "1.1rem" }}>DFW gas costs by season — avg $0.85/therm from Atmos Energy</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[["$0.85/therm", "DFW Avg Gas Rate"], ["50–150 therms", "Furnace in Winter/mo"], ["15–30 therms", "Water Heater/mo"]].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", textAlign: "center", border: "1px solid #2A3F5F" }}>
              <div style={{ color: "#F5E642″, fontSize: "1.5rem", fontWeight: 700 }}>{val}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.85rem", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🧮 Your Gas Cost Estimate (Winter Peak)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Home Size (sq ft)</label>
              <input type="number" value={homeSize} onChange={e => setHomeSize(Number(e.target.value))}
                style={{ width: "100%", backgroundColor: "#0A1628″, border: "1px solid #2A3F5F", borderRadius: 8, padding: "0.75rem", color: "#E8EDF5", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={hasGasRange} onChange={e => setHasGasRange(e.target.checked)} style={{ width: 16, height: 16 }} />
                <span style={{ color: "#94A3B8″ }}>Gas Range/Stove</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={hasGasDryer} onChange={e => setHasGasDryer(e.target.checked)} style={{ width: 16, height: 16 }} />
                <span style={{ color: "#94A3B8″ }}>Gas Dryer</span>
              </label>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
            {[["🏠 Furnace", `${Math.round(furnaceThermBase)} therms`, `$${(furnaceThermBase * THERM_RATE).toFixed(0)}`],
              ["🚿 Water Heater", `${waterHeatTherms} therms`, `$${(waterHeatTherms * THERM_RATE).toFixed(0)}`],
              ["🍳 Range", `${rangeTherms} therms`, `$${(rangeTherms * THERM_RATE).toFixed(0)}`],
              ["👕 Dryer", `${dryerTherms} therms`, `$${(dryerTherms * THERM_RATE).toFixed(0)}`]
            ].map(([label, therms, cost]) => (
              <div key={label} style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "1rem", textAlign: "center" }}>
                <div style={{ marginBottom: 4 }}>{label}</div>
                <div style={{ color: "#94A3B8″, fontSize: "0.8rem" }}>{therms}</div>
                <div style={{ color: "#F5E642″, fontWeight: 700 }}>{cost}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", backgroundColor: "#0A1628″, borderRadius: 8, padding: "1rem" }}>
            <div style={{ color: "#F5E642″, fontSize: "2.2rem", fontWeight: 700 }}>${totalCost}/mo</div>
            <div style={{ color: "#94A3B8″, fontSize: "0.85rem" }}>{totalTherms} therms × $0.85 (winter peak estimate)</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>📅 Gas Cost by Season</h2>
          {seasons.map(({ season, furnace, water, other, note }) => {
            const total = (furnace + water + other) * THERM_RATE;
            return (
              <div key={season} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0″, borderBottom: "1px solid #2A3F5F" }}>
                <div><div style={{ fontWeight: 600 }}>{season}</div><div style={{ color: "#94A3B8″, fontSize: "0.8rem" }}>{note}</div></div>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1.2rem" }}>${total.toFixed(0)}/mo</div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", padding: "1.5rem", backgroundColor: "#1E2D45″, borderRadius: 12, border: "1px solid #F5E642" }}>
          <div style={{ fontSize: "1.5rem" }}>🔥</div>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4 }}>Reduce Your Gas Bill — Get Furnace Quotes</div>
          <div style={{ color: "#94A3B8″, fontSize: "0.9rem" }}>ProLnk connects you with DFW HVAC pros for furnace tune-ups and replacements</div>
        </div>
      </div>
    </div>
  );
}