import { useState } from 'react';

const systemSizes = [3, 5, 7, 10, 12, 15];

const incentives = [
  { name: "Federal Investment Tax Credit (ITC)", emoji: "🇺🇸", type: "Federal Tax Credit", rate: 0.30, description: "30% of total system cost credited against federal income tax. Applies through 2032, then steps down.", condition: "Must have federal tax liability. Carryforward allowed." },
  { name: "Texas Solar Property Tax Exemption", emoji: "🏠", type: "State Property Tax", flat: true, description: "100% of added home value from solar is exempt from Texas property tax assessment. Permanent benefit.", condition: "Must be primary residence. File Form 50-123 with county appraisal district." },
  { name: "SECO Loan Program", emoji: "⭐", type: "State Financing", flat: true, description: "Texas State Energy Conservation Office offers low-interest loans for solar at 1-3% APR for qualified buyers.", condition: "Income-qualified households. Up to $10,000 loan available." },
  { name: "Oncor Smart Thermostat Rebate", emoji: "🌡️", type: "Utility Rebate", flatAmount: 85, description: "$85 rebate per smart thermostat (Nest, Ecobee). Pairs with solar for optimal savings.", condition: "Oncor service territory (most of DFW). One per customer per year." },
  { name: "Oncor EV Charger Rebate", emoji: "⚡", type: "Utility Rebate", flatAmount: 250, description: "Up to $250 for Level 2 EV charger installation. Pairs with solar for daytime charging.", condition: "Oncor territory. Must use qualified installer." },
  { name: "Net Metering (Limited)", emoji: "🔄", type: "Utility Credit", flat: true, description: "Oncor allows net metering but caps exports at 50kW. Credit rates vary by retail provider — shop TXU, Reliant, Green Mountain for best solar buyback rates.", condition: "Deregulated market — choose your retail electricity provider carefully." },
];

const getItcCredit = (systemKw: number, costPerWatt = 2.85) => {
  const totalCost = systemKw * 1000 * costPerWatt;
  return totalCost * 0.30;
};

export default function DFWSolarIncentivesStack2026() {
  const [selectedSize, setSelectedSize] = useState(7);
  const [homeOwned, setHomeOwned] = useState(true);
  const [hasTaxLiability, setHasTaxLiability] = useState(true);
  const [activeTab, setActiveTab] = useState("calculator");

  const systemCost = selectedSize * 1000 * 2.85;
  const itcCredit = hasTaxLiability ? systemCost * 0.30 : 0;
  const utilityRebates = 85 + 250;
  const propTaxSavings = homeOwned ? selectedSize * 180 : 0;
  const totalIncentiveValue = itcCredit + utilityRebates + propTaxSavings;
  const netCost = systemCost - totalIncentiveValue;

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Solar Incentives Stack 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Layer every available incentive — Federal, State, Oncor, Net Metering, Property Tax</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {["calculator", "programs"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, backgroundColor: activeTab === tab ? "#F5E642" : "#1e2d45", color: activeTab === tab ? "#0A1628" : "#94a3b8" }}>
              {tab === "calculator" ? "🧮 Incentive Calculator" : "📋 All Programs"}
            </button>
          ))}
        </div>

        {activeTab === "calculator" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 15 }}>⚙️ Your System Configuration</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>System Size (kW)</label>
                  <select value={selectedSize} onChange={e => setSelectedSize(Number(e.target.value))} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 14 }}>
                    {systemSizes.map(s => <option key={s} value={s}>{s} kW (~${(s * 1000 * 2.85).toLocaleString()} system cost)</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: 10, backgroundColor: "#0A1628", borderRadius: 8 }}><input type="checkbox" checked={homeOwned} onChange={e => setHomeOwned(e.target.checked)} /><span style={{ color: "#cbd5e1", fontSize: 13 }}>Own my home</span></label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: 10, backgroundColor: "#0A1628", borderRadius: 8 }}><input type="checkbox" checked={hasTaxLiability} onChange={e => setHasTaxLiability(e.target.checked)} /><span style={{ color: "#cbd5e1", fontSize: 13 }}>Have federal tax liability</span></label>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>System Cost</div>
                <div style={{ color: "#f87171", fontSize: 22, fontWeight: 700 }}>${systemCost.toLocaleString()}</div>
              </div>
              <div style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>Total Incentives</div>
                <div style={{ color: "#4ade80", fontSize: 22, fontWeight: 700 }}>-${totalIncentiveValue.toLocaleString()}</div>
              </div>
              <div style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 14, textAlign: "center", border: "2px solid #F5E642" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>Net Cost to You</div>
                <div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>${Math.round(netCost).toLocaleString()}</div>
              </div>
            </div>

            <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 16 }}>
              <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 14 }}>💰 Incentive Breakdown</h3>
              {[
                { label: "30% Federal ITC", value: itcCredit, active: hasTaxLiability },
                { label: "Oncor Rebates (thermostat + EV)", value: utilityRebates, active: true },
                { label: "Property Tax Exemption (annual)", value: propTaxSavings, active: homeOwned },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? "1px solid #334155" : "none" }}>
                  <span style={{ color: item.active ? "#cbd5e1" : "#475569", fontSize: 13 }}>{item.label}</span>
                  <span style={{ color: item.active ? "#4ade80" : "#475569", fontWeight: 700 }}>{item.active ? `$${Math.round(item.value).toLocaleString()}` : "N/A"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {incentives.map((inc, i) => (
              <div key={i} style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 22 }}>{inc.emoji}</span><div><div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{inc.name}</div><div style={{ color: "#F5E642", fontSize: 11 }}>{inc.type}</div></div></div>
                  {inc.rate && <span style={{ backgroundColor: "#0A1628", borderRadius: 6, padding: "4px 10px", color: "#4ade80", fontWeight: 700, fontSize: 14 }}>{(inc.rate * 100).toFixed(0)}%</span>}
                  {inc.flatAmount && <span style={{ backgroundColor: "#0A1628", borderRadius: 6, padding: "4px 10px", color: "#4ade80", fontWeight: 700, fontSize: 14 }}>${inc.flatAmount}</span>}
                </div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: "0 0 8px" }}>{inc.description}</p>
                <div style={{ backgroundColor: "#0A1628", borderRadius: 6, padding: 8 }}><span style={{ color: "#F5E642", fontSize: 11 }}>✅ {inc.condition}</span></div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#475569", fontSize: 11 }}>ProLnk DFW · Solar Incentives Stack · 2026</div>
      </div>
    </div>
  );
}
