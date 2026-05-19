import { useState } from 'react';

export default function DFWHomeFlippingGuide2026() {
  const [purchasePrice, setPurchasePrice] = useState(200000);
  const [arv, setArv] = useState(320000);

  const maxBid = arv * 0.70;
  const renobudget = maxBid - purchasePrice;
  const potentialProfit = arv - purchasePrice - Math.max(renobudget, 0) - arv * 0.08;
  const feasible = purchasePrice <= maxBid && renobudget >= 20000;

  const hotZips = [
    { zip: "75116″, city: "Duncanville", avgFlipProfit: 42000, flipTime: "4-6 mo", emoji: "🔥" },
    { zip: "75211″, city: "West Dallas", avgFlipProfit: 58000, flipTime: "3-5 mo", emoji: "🔥" },
    { zip: "76116″, city: "Ft Worth (West)", avgFlipProfit: 47000, flipTime: "4-6 mo", emoji: "🔥" },
    { zip: "75217″, city: "Southeast Dallas", avgFlipProfit: 38000, flipTime: "5-7 mo", emoji: "⭐" },
    { zip: "76103″, city: "East Ft Worth", avgFlipProfit: 35000, flipTime: "5-7 mo", emoji: "⭐" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔨</div>
          <h1 style={{ color: "#F5E642″, fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW Home Flipping Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>Fix-and-flip strategy, best zip codes, and feasibility calculator for DFW investors</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Avg Flip Profit", value: "$44K", emoji: "💰" },
            { label: "Avg Flip Time", value: "4.8 mo", emoji: "⏱️" },
            { label: "Active Flippers", value: "2,800+", emoji: "👷" },
            { label: "ROI Avg", value: "22%", emoji: "📈" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#112240″, borderRadius: 12, padding: "18px 12px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ color: "#F5E642″, fontSize: 22, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Flip Feasibility Calculator (70% Rule)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: 14 }}>Purchase Price: <span style={{ color: "#F5E642", fontWeight: 700 }}>${purchasePrice.toLocaleString()}</span></label>
              <input type="range" min={100000} max={400000} step={5000} value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: "#F5E642″ }} />
            </div>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: 14 }}>After Repair Value (ARV): <span style={{ color: "#F5E642", fontWeight: 700 }}>${arv.toLocaleString()}</span></label>
              <input type="range" min={150000} max={600000} step={5000} value={arv} onChange={(e) => setArv(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: "#F5E642″ }} />
            </div>
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 12, padding: 20, border: `2px solid ${feasible ? "#4ade80" : "#f87171"}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Max Bid (70% ARV)", value: `$${maxBid.toLocaleString()}`, color: "#F5E642″ },
                { label: "Reno Budget", value: renobudget >= 0 ? `$${renobudget.toLocaleString()}` : "Overpaid", color: renobudget >= 0 ? "#94a3b8″ : "#f87171" },
                { label: "Selling Costs (8%)", value: `$${(arv * 0.08).toLocaleString()}`, color: "#94a3b8″ },
                { label: "Potential Profit", value: `$${Math.round(potentialProfit).toLocaleString()}`, color: potentialProfit > 0 ? "#4ade80″ : "#f87171" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ color: item.color, fontSize: 18, fontWeight: 700 }}>{item.value}</div>
                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, textAlign: "center", color: feasible ? "#4ade80″ : "#f87171", fontWeight: 700, fontSize: 16 }}>
              {feasible ? "DEAL IS FEASIBLE — Run the numbers with your contractor" : "DEAL DOES NOT WORK AT THIS PRICE — Negotiate lower or find better ARV"}
            </div>
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Hottest DFW Flip Zip Codes 2026</h2>
          {hotZips.map((z) => (
            <div key={z.zip} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ color: "#F5E642″, fontWeight: 700 }}>{z.emoji} {z.zip}</span>
              <span style={{ color: "#fff" }}>{z.city}</span>
              <span style={{ color: "#4ade80″ }}>Avg ${z.avgFlipProfit.toLocaleString()} profit</span>
              <span style={{ color: "#94a3b8″, fontSize: 14 }}>{z.flipTime}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
            <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>
              🔧 <strong style={{ color: "#F5E642″ }}>ProLnk connects flippers to trade contractors fast.</strong> Get matched with licensed GCs, plumbers, electricians, and HVAC pros in your target zip code — same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
