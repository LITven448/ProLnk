import { useState } from 'react';

type Strategy = "cashflow" | "appreciation";

interface Neighborhood {
  name: string;
  price: number;
  rent: number;
  capRate: number;
  cashflow: number;
  emoji: string;
}

export default function DFWInvestmentPropertyGuide2026() {
  const [budget, setBudget] = useState(300000);
  const [strategy, setStrategy] = useState<Strategy>("cashflow");

  const neighborhoods: Record<Strategy, Neighborhood[]> = {
    cashflow: [
      { name: "Garland", price: 285000, rent: 2100, capRate: 6.8, cashflow: 780, emoji: "💚" },
      { name: "Mesquite", price: 265000, rent: 1950, capRate: 6.5, cashflow: 720, emoji: "💚" },
      { name: "Grand Prairie", price: 295000, rent: 2200, capRate: 6.9, cashflow: 810, emoji: "💚" },
      { name: "Balch Springs", price: 240000, rent: 1800, capRate: 7.0, cashflow: 690, emoji: "💚" },
      { name: "Lancaster", price: 255000, rent: 1900, capRate: 6.7, cashflow: 730, emoji: "💚" },
    ],
    appreciation: [
      { name: "Frisco", price: 620000, rent: 3200, capRate: 4.8, cashflow: 240, emoji: "📈" },
      { name: "Allen", price: 430000, rent: 2600, capRate: 5.4, cashflow: 480, emoji: "📈" },
      { name: "McKinney", price: 450000, rent: 2700, capRate: 5.3, cashflow: 460, emoji: "📈" },
      { name: "Celina", price: 490000, rent: 2500, capRate: 4.7, cashflow: 180, emoji: "📈" },
      { name: "Prosper", price: 580000, rent: 3000, capRate: 4.9, cashflow: 210, emoji: "📈" },
    ],
  };

  const options = neighborhoods[strategy].filter(n => n.price <= budget * 1.1);
  const passesOnePercent = (n: Neighborhood) => (n.rent / n.price) >= 0.01;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW Investment Property Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>Cap rates, cash flow analysis, and neighborhood selector for DFW buy-and-hold investors</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "DFW Cap Rate Range", value: "5-7%", emoji: "📊" },
            { label: "Avg Gross Rent", value: "$2,150/mo", emoji: "🏠" },
            { label: "Vacancy Rate", value: "4.8%", emoji: "📉" },
            { label: "Price Growth (YoY)", value: "+4.0%", emoji: "📈" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#112240", borderRadius: 12, padding: "18px 12px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ Neighborhood Investment Finder</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14 }}>Budget: <span style={{ color: "#F5E642", fontWeight: 700 }}>${budget.toLocaleString()}</span></label>
              <input type="range" min={200000} max={700000} step={10000} value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: "#F5E642" }} />
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14 }}>Strategy:</label>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {(["cashflow", "appreciation"] as Strategy[]).map(s => (
                  <button key={s} onClick={() => setStrategy(s)}
                    style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                      background: strategy === s ? "#F5E642" : "#0A1628", color: strategy === s ? "#0A1628" : "#94a3b8" }}>
                    {s === "cashflow" ? "💚 Cash Flow" : "📈 Appreciation"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {options.length === 0 ? (
            <div style={{ textAlign: "center", color: "#f87171", padding: 20 }}>Increase budget to see {strategy} options</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {options.map((n) => (
                <div key={n.name} style={{ background: "#0A1628", borderRadius: 10, padding: 16, border: `1px solid ${passesOnePercent(n) ? "#4ade80" : "#1e3a5f"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 20 }}>{n.emoji}</span>
                      <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 18, marginLeft: 8 }}>{n.name}</span>
                      {passesOnePercent(n) && <span style={{ background: "#4ade80", color: "#0A1628", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, marginLeft: 8 }}>1% RULE</span>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#4ade80", fontWeight: 700 }}>${n.cashflow}/mo cash flow</div>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>Cap rate: {n.capRate}%</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>Price: <strong style={{ color: "#fff" }}>${n.price.toLocaleString()}</strong></span>
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>Rent: <strong style={{ color: "#fff" }}>${n.rent}/mo</strong></span>
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>Rent/Price: <strong style={{ color: "#fff" }}>{((n.rent / n.price) * 100).toFixed(2)}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 DFW Investor Quick Rules</h2>
          {[
            { rule: "1% Rule", desc: "Monthly rent must equal at least 1% of purchase price. Rare in DFW — mostly C-class markets." },
            { rule: "50% Rule", desc: "Assume 50% of gross rent covers expenses (taxes, insurance, vacancy, repairs, mgmt)." },
            { rule: "Cap Rate", desc: "NOI divided by Purchase Price. 5-7% is healthy in DFW. Below 4% is an appreciation play." },
            { rule: "Cash-on-Cash", desc: "Annual cash flow divided by cash invested. Target 8-12% in DFW cash flow markets." },
          ].map((r) => (
            <div key={r.rule} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", alignSelf: "flex-start" }}>{r.rule}</span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>{r.desc}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, background: "#0A1628", borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
              🔧 <strong style={{ color: "#F5E642" }}>ProLnk connects DFW landlords to vetted maintenance pros.</strong> Property turns, repairs, and renovations — matched in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
