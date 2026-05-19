import { useState } from 'react';

export default function DFWHomeEquityCalculator2026B() {
  const [homeValue, setHomeValue] = useState(385000);
  const [mortgageBalance, setMortgageBalance] = useState(290000);
  const [extraPayment, setExtraPayment] = useState(100);

  const equity = homeValue - mortgageBalance;
  const equityPct = Math.round((equity / homeValue) * 100);
  const annualAppreciation = Math.round(homeValue * 0.05);
  const extraSavings = 28000;
  const helocMax = Math.round(equity * 0.85);

  const accessOptions = [
    { label: "🏦 HELOC", detail: "Variable rate, revolving credit, draw period 10yr", max: helocMax },
    { label: "📋 Home Equity Loan", detail: "Fixed rate, lump sum, fully amortized", max: Math.round(equity * 0.80) },
    { label: "🔄 Cash-Out Refi", detail: "New first mortgage, reset term, closing costs apply", max: Math.round(equity * 0.75) },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📈</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW Home Equity Calculator 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Build equity faster — DFW appreciation + paydown strategies</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          {[
            { label: "🏠 Home Value", val: homeValue, set: setHomeValue, min: 150000, max: 900000, step: 5000 },
            { label: "💳 Mortgage Balance", val: mortgageBalance, set: setMortgageBalance, min: 50000, max: 700000, step: 5000 },
          ].map((s, i) => (
            <div key={i} style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
              <label style={{ color: "#F5E642", fontSize: 13, display: "block", marginBottom: 8 }}>{s.label}</label>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                onChange={e => s.set(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F5E642" }} />
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginTop: 8 }}>${s.val.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { icon: "💎", label: "Current Equity", val: `$${equity.toLocaleString()}`, sub: `${equityPct}% of value` },
            { icon: "📊", label: "DFW 5% Appreciation", val: `+$${annualAppreciation.toLocaleString()}`, sub: "avg per year" },
            { icon: "💰", label: "Extra $100/mo Saves", val: `$${extraSavings.toLocaleString()}`, sub: "on 30yr loan" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#132038", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ color: "#F5E642", fontSize: 18, fontWeight: 700 }}>{c.val}</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>{c.label}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ color: "#F5E642", fontSize: 17, margin: 0 }}>⚡ Extra Payment Impact</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>Extra/mo: $</span>
              <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))}
                style={{ width: 70, background: "#0A1628", border: "1px solid #F5E642", borderRadius: 6,
                  color: "#F5E642", padding: "4px 8px", fontSize: 14 }} />
            </div>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>
            Adding <strong style={{ color: "#F5E642" }}>${extraPayment}/mo</strong> to principal on a $385K 30-year loan at 7% saves roughly
            <strong style={{ color: "#F5E642" }}> ${(extraSavings * (extraPayment / 100)).toLocaleString()} in interest</strong> and cuts 2-4 years off your loan.
            DFW appreciation of 5%/yr adds another ~<strong style={{ color: "#F5E642" }}>${annualAppreciation.toLocaleString()}/yr</strong> in passive equity.
          </div>
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🏦 Equity Access Options</h2>
          {accessOptions.map((o, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0", borderBottom: i < accessOptions.length - 1 ? "1px solid #1e3a5f" : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>{o.detail}</div>
              </div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>Up to ${o.max.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
