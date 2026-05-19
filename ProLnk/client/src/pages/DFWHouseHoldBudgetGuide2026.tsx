import { useState } from 'react';

export default function DFWHouseHoldBudgetGuide2026() {
  const [homeValue, setHomeValue] = useState(385000);
  const [annualIncome, setAnnualIncome] = useState(95000);

  const monthly = annualIncome / 12;
  const mortgage = Math.round(homeValue * 0.006);
  const propTax = Math.round((homeValue * 0.02) / 12);
  const insurance = 267;
  const utilities = 442;
  const maintenance = Math.round((homeValue * 0.015) / 12);
  const total = mortgage + propTax + insurance + utilities + maintenance;
  const pct = Math.round((total / monthly) * 100);

  const rows = [
    { label: "🏠 Mortgage (PITI est.)", val: mortgage, ideal: "28-32%" },
    { label: "🏛️ Property Tax", val: propTax, ideal: "~2% annually" },
    { label: "🛡️ Homeowners Insurance", val: insurance, ideal: "$267/mo avg" },
    { label: "⚡ Utilities", val: utilities, ideal: "$442/mo avg" },
    { label: "🔧 Maintenance Reserve", val: maintenance, ideal: "1-2%/yr" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW Household Budget Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Where DFW homeowners actually spend their money</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642″, fontSize: 13, display: "block", marginBottom: 8 }}>🏠 Home Value</label>
            <input type="range" min={200000} max={800000} step={5000} value={homeValue}
              onChange={e => setHomeValue(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginTop: 8 }}>${homeValue.toLocaleString()}</div>
          </div>
          <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642″, fontSize: 13, display: "block", marginBottom: 8 }}>💰 Annual Income</label>
            <input type="range" min={40000} max={300000} step={5000} value={annualIncome}
              onChange={e => setAnnualIncome(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginTop: 8 }}>${annualIncome.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ background: "#132038″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>📊 Monthly Cost Breakdown</h2>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0″, borderBottom: i < rows.length - 1 ? "1px solid #1e3a5f" : "none" }}>
              <div>
                <div style={{ fontSize: 14 }}>{r.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 12 }}>{r.ideal}</div>
              </div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16 }}>${r.val.toLocaleString()}/mo</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 16,
            borderTop: "2px solid #F5E642″ }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Total Monthly Housing</div>
            <div style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700 }}>${total.toLocaleString()}/mo</div>
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <span style={{ background: pct <= 32 ? "#16a34a" : pct <= 40 ? "#d97706″ : "#dc2626",
              color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 13 }}>
              {pct}% of monthly income {pct <= 32 ? "✅ Ideal" : pct <= 40 ? "⚠️ Stretched" : "🚨 Over Budget"}
            </span>
          </div>
        </div>

        <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 12 }}>💡 DFW Budget Facts 2026</h3>
          <ul style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>DFW median home price: $385,000 (up 3.2% YoY)</li>
            <li>Property tax avg: 2.0-2.5% — among highest in US (no income tax tradeoff)</li>
            <li>Homeowners insurance avg: $267/mo — storms drive rates up</li>
            <li>DFW utility avg: $442/mo — summer AC peaks June-Sept</li>
            <li>Rule of thumb: Keep total housing under 32% of gross income</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
