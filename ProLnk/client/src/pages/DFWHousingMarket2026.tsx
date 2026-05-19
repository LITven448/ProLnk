import { useState } from 'react';

export default function DFWHousingMarket2026() {
  const [budget, setBudget] = useState(350000);

  const submarkets = [
    { name: "Frisco", medianPrice: 620000, dom: 18, growth: 7.2, emoji: "🔥" },
    { name: "Prosper", medianPrice: 580000, dom: 21, growth: 6.8, emoji: "🔥" },
    { name: "Celina", medianPrice: 490000, dom: 24, growth: 8.1, emoji: "🔥" },
    { name: "McKinney", medianPrice: 450000, dom: 26, growth: 5.4, emoji: "⭐" },
    { name: "Allen", medianPrice: 430000, dom: 28, growth: 5.1, emoji: "⭐" },
    { name: "Garland", medianPrice: 310000, dom: 35, growth: 3.9, emoji: "✅" },
    { name: "Mesquite", medianPrice: 280000, dom: 38, growth: 3.2, emoji: "✅" },
    { name: "Grand Prairie", medianPrice: 295000, dom: 36, growth: 3.5, emoji: "✅" },
  ];

  const getRecommendation = () => {
    if (budget >= 550000) return submarkets.filter(s => s.medianPrice <= budget * 1.1).slice(0, 2);
    if (budget >= 400000) return submarkets.filter(s => s.medianPrice <= budget * 1.1).slice(0, 3);
    return submarkets.filter(s => s.medianPrice <= budget).slice(0, 3);
  };

  const recs = getRecommendation();

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW Housing Market 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>Data-driven overview of the Dallas-Fort Worth real estate landscape</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Median Home Price", value: "$385K", change: "+4% YoY", emoji: "💰" },
            { label: "Days on Market", value: "32″, change: "Down from 45 in 2024", emoji: "📅" },
            { label: "Inventory", value: "2.1 mo", change: "Seller’s market", emoji: "📦" },
            { label: "Price/SqFt", value: "$178″, change: "+3.8% YoY", emoji: "📐" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#112240″, borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.emoji}</div>
              <div style={{ color: "#F5E642″, fontSize: 22, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{stat.change}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Submarket Finder — Enter Your Budget</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, fontSize: 14 }}>Budget: <span style={{ color: "#F5E642", fontWeight: 700 }}>${budget.toLocaleString()}</span></label>
            <input type="range" min={200000} max={800000} step={10000} value={budget} onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: "100%", marginTop: 8, accentColor: "#F5E642″ }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 12 }}>
              <span>$200K</span><span>$800K</span>
            </div>
          </div>
          <h3 style={{ color: "#fff", fontSize: 16, marginBottom: 12 }}>Recommended Submarkets:</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {recs.map((s) => (
              <div key={s.name} style={{ background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
                <div style={{ fontSize: 20 }}>{s.emoji}</div>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                <div style={{ color: "#94a3b8″, fontSize: 13, marginTop: 4 }}>Median: ${(s.medianPrice / 1000).toFixed(0)}K</div>
                <div style={{ color: "#94a3b8″, fontSize: 13 }}>{s.dom} days on market</div>
                <div style={{ color: "#4ade80″, fontSize: 13 }}>+{s.growth}% growth</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏆 Hottest Submarkets 2026</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                  {["Submarket", "Median Price", "Days on Market", "YoY Growth", "Outlook"].map(h => (
                    <th key={h} style={{ color: "#94a3b8″, fontSize: 13, padding: "8px 12px", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submarkets.map((s) => (
                  <tr key={s.name} style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <td style={{ padding: "10px 12px", color: "#fff" }}>{s.emoji} {s.name}</td>
                    <td style={{ padding: "10px 12px", color: "#F5E642″ }}>${(s.medianPrice / 1000).toFixed(0)}K</td>
                    <td style={{ padding: "10px 12px", color: "#94a3b8″ }}>{s.dom} days</td>
                    <td style={{ padding: "10px 12px", color: "#4ade80″ }}>+{s.growth}%</td>
                    <td style={{ padding: "10px 12px", color: s.emoji === "🔥" ? "#f97316″ : s.emoji === "⭐" ? "#F5E642" : "#4ade80" }}>
                      {s.emoji === "🔥" ? "Hot" : s.emoji === "⭐" ? "Strong" : "Stable"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 20, background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
            <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>
              🔧 <strong style={{ color: "#F5E642″ }}>ProLnk connects you to vetted contractors in every DFW submarket.</strong> Whether you are buying, renovating, or investing — get matched with the right pro in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}