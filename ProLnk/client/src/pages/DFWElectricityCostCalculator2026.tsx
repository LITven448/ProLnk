import { useState } from 'react';

export default function DFWElectricityCostCalculator2026() {
  const [homeSize, setHomeSize] = useState(2000);
  const [hvacAge, setHvacAge] = useState(8);

  const KWH_RATE = 0.13;
  const seerPenalty = hvacAge > 15 ? 1.5 : hvacAge > 10 ? 1.2 : 1.0;
  const hvacKwh = Math.round((homeSize / 1000) * 4000 * seerPenalty);
  const waterHeatKwh = 350;
  const applianceKwh = Math.round(homeSize / 2000 * 300);
  const totalKwh = hvacKwh + waterHeatKwh + applianceKwh;
  const totalCost = (totalKwh * KWH_RATE).toFixed(0);
  const hvacCost = (hvacKwh * KWH_RATE).toFixed(0);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🧮</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW Electricity Cost Calculator 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: "1.1rem" }}>Calculate your monthly DFW home electricity cost — avg rate $0.13/kWh</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[["$0.13/kWh", "DFW Avg Rate"], ["3,000–5,000″, "HVAC kWh/mo (Summer)"], ["55%", "HVAC Share of Bill"]].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", textAlign: "center", border: "1px solid #2A3F5F" }}>
              <div style={{ color: "#F5E642″, fontSize: "1.5rem", fontWeight: 700 }}>{val}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.85rem", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>⚡ Your Electricity Cost Estimate</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Home Size (sq ft)</label>
              <input type="number" value={homeSize} onChange={e => setHomeSize(Number(e.target.value))}
                style={{ width: "100%", backgroundColor: "#0A1628″, border: "1px solid #2A3F5F", borderRadius: 8, padding: "0.75rem", color: "#E8EDF5", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>HVAC Age (years)</label>
              <input type="number" value={hvacAge} onChange={e => setHvacAge(Number(e.target.value))}
                style={{ width: "100%", backgroundColor: "#0A1628″, border: "1px solid #2A3F5F", borderRadius: 8, padding: "0.75rem", color: "#E8EDF5", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {[["🌬️ HVAC", `${hvacKwh.toLocaleString()} kWh`, `$${hvacCost}`],
                ["🚿 Water Heater", `${waterHeatKwh} kWh`, `$${(waterHeatKwh * KWH_RATE).toFixed(0)}`],
                ["🏠 Appliances", `${applianceKwh} kWh`, `$${(applianceKwh * KWH_RATE).toFixed(0)}`]
              ].map(([label, kwh, cost]) => (
                <div key={label} style={{ backgroundColor: "#1E2D45″, borderRadius: 8, padding: "1rem", textAlign: "center" }}>
                  <div style={{ marginBottom: 4 }}>{label}</div>
                  <div style={{ color: "#94A3B8″, fontSize: "0.85rem" }}>{kwh}</div>
                  <div style={{ color: "#F5E642″, fontWeight: 700 }}>{cost}/mo</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #2A3F5F", paddingTop: "1rem", textAlign: "center" }}>
              <div style={{ color: "#94A3B8″, fontSize: "0.9rem" }}>Estimated Monthly Total</div>
              <div style={{ color: "#F5E642″, fontSize: "2.5rem", fontWeight: 700 }}>${totalCost}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.85rem" }}>{totalKwh.toLocaleString()} kWh at $0.13/kWh</div>
              {hvacAge > 10 && <div style={{ color: "#FF8C00″, fontSize: "0.9rem", marginTop: 8 }}>⚠️ Aging HVAC adding ~${Math.round((seerPenalty - 1) * hvacKwh * KWH_RATE)}/mo in extra cost</div>}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>💡 How to Reduce Your Bill</h2>
          {[["🌡️ Raise thermostat to 78°F", "Saves $30-60/mo vs 72°F — biggest single lever"],
            ["📱 Install smart thermostat", "Schedule setbacks save 10-15% — Ecobee/Nest work best in DFW"],
            ["🔧 Annual HVAC tune-up", "Clean coils + refrigerant check maintains rated SEER — costs $150, saves $300+/yr"],
            ["🏠 Seal duct leaks", "Average 25% duct loss in DFW — sealing saves $50-100/mo"]
          ].map(([action, detail]) => (
            <div key={action} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0″, borderBottom: "1px solid #2A3F5F" }}>
              <div style={{ fontWeight: 600 }}>{action}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.85rem", maxWidth: "55%", textAlign: "right" }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "1.5rem", backgroundColor: "#1E2D45″, borderRadius: 12, border: "1px solid #F5E642" }}>
          <div style={{ fontSize: "1.5rem" }}>⚡</div>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4 }}>Get HVAC Quotes from DFW Pros</div>
          <div style={{ color: "#94A3B8″, fontSize: "0.9rem" }}>ProLnk matches you with verified HVAC contractors — free estimates, no commitment</div>
        </div>
      </div>
    </div>
  );
}