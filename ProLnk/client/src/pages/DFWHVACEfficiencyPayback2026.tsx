import { useState } from 'react';

export default function DFWHVACEfficiencyPayback2026() {
  const [currentSEER, setCurrentSEER] = useState(10);
  const [monthlyBill, setMonthlyBill] = useState(250);

  const upgradeCost15 = 6500;
  const upgradeCost18 = 9500;
  const savings15 = monthlyBill * (1 - currentSEER / 15) * 0.6;
  const savings18 = monthlyBill * (1 - currentSEER / 18) * 0.6;
  const payback15 = savings15 > 0 ? (upgradeCost15 / (savings15 * 12)).toFixed(1) : "N/A";
  const payback18 = savings18 > 0 ? (upgradeCost18 / (savings18 * 12)).toFixed(1) : "N/A";

  const comparisons = [
    { label: "15 SEER2 vs 10 SEER", payback: "5-7 yrs", climate: "DFW 8-mo AC season accelerates ROI" },
    { label: "18 SEER2 vs 10 SEER", payback: "6-9 yrs", climate: "Best ROI with variable-speed blower" },
    { label: "Variable speed vs single stage", payback: "4-7 yrs", climate: "Humidity control adds comfort value" },
    { label: "18 SEER2 vs 15 SEER2″, payback: "8-12 yrs", climate: "Marginal; consider if replacing coil too" },
  ];

  const facts = [
    { icon: "🌡️", fact: "DFW runs AC 8+ months per year vs 4-5 months in northern states" },
    { icon: "⚡", fact: "Every SEER point above 14 saves ~6-8% on cooling costs in DFW" },
    { icon: "🏠", fact: "Proper sizing (Manual J) critical — oversized units short-cycle, ruining humidity control" },
    { icon: "💰", fact: "Federal tax credit: 30% of cost up to $600 for qualifying high-efficiency systems" },
    { icon: "🔄", fact: "Variable speed compressors reduce wear — often extend equipment life 3-5 years" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW HVAC Upgrade Payback Period Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>
            When HVAC efficiency upgrades pay back in the Dallas-Fort Worth climate
          </p>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #F5E642″ }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>⚙️ Payback Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: 12, display: "block", marginBottom: 6 }}>Current System SEER Rating</label>
              <input type="range" min={8} max={14} value={currentSEER} onChange={e => setCurrentSEER(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F5E642″ }} />
              <div style={{ color: "#F5E642″, fontWeight: 700, textAlign: "center" }}>{currentSEER} SEER</div>
            </div>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: 12, display: "block", marginBottom: 6 }}>Monthly Electric Bill ($)</label>
              <input type="range" min={100} max={600} step={10} value={monthlyBill} onChange={e => setMonthlyBill(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F5E642″ }} />
              <div style={{ color: "#F5E642″, fontWeight: 700, textAlign: "center" }}>${monthlyBill}/mo</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#94A3B8″, fontSize: 12 }}>15 SEER2 Upgrade (~$6,500)</div>
              <div style={{ color: "#F5E642″, fontSize: 22, fontWeight: 800 }}>{payback15} yrs</div>
              <div style={{ color: "#4ADE80″, fontSize: 12 }}>~${savings15.toFixed(0)}/mo savings</div>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#94A3B8″, fontSize: 12 }}>18 SEER2 Upgrade (~$9,500)</div>
              <div style={{ color: "#F5E642″, fontSize: 22, fontWeight: 800 }}>{payback18} yrs</div>
              <div style={{ color: "#4ADE80″, fontSize: 12 }}>~${savings18.toFixed(0)}/mo savings</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>📊 DFW Payback Comparisons</h2>
          {comparisons.map((c, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 14, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{c.label}</div>
                <div style={{ color: "#94A3B8″, fontSize: 12 }}>{c.climate}</div>
              </div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", marginLeft: 12 }}>{c.payback}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>💡 DFW Climate Facts</h2>
          {facts.map((f, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 12, marginBottom: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>{f.icon}</span>
              <span style={{ color: "#CBD5E1″, fontSize: 13 }}>{f.fact}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569″, fontSize: 12 }}>
          ProLnk — DFW HVAC Efficiency Guide 2026 | Estimates based on DFW climate data
        </div>
      </div>
    </div>
  );
}
