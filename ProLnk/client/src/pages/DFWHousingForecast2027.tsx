import { useState } from 'react';

export default function DFWHousingForecast2027() {
  const [horizon, setHorizon] = useState(3);

  const getAnalysis = () => {
    if (horizon <= 1) return { rec: "Rent", reason: "Short horizon — avoid transaction costs. Rates still normalizing.", color: "#f97316" };
    if (horizon <= 3) return { rec: "Buy (Cautiously)", reason: "3-5% appreciation likely. Lock in rate now, refinance when rates drop.", color: "#F5E642" };
    return { rec: "Buy Now", reason: "Long horizon captures full appreciation + tech corridor premium. Strong buy.", color: "#4ade80" };
  };

  const analysis = getAnalysis();
  const projectedAppreciation = (385000 * Math.pow(1.04, horizon)).toFixed(0);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔮</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW Housing Forecast 2027</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>Expert predictions and investment analysis for Dallas-Fort Worth real estate</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "2027 Appreciation", value: "3-5%", sub: "Expert consensus range", emoji: "📈" },
            { label: "Rate Forecast", value: "5.8-6.2%", sub: "30yr fixed by Q4 2027", emoji: "💵" },
            { label: "Tech Corridor", value: "+8-12%", sub: "Plano/Allen premium", emoji: "💻" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#112240", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.emoji}</div>
              <div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: "#fff", fontSize: 13, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Buy vs Rent Analyzer</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8", fontSize: 14 }}>Investment Horizon: <span style={{ color: "#F5E642", fontWeight: 700 }}>{horizon} year{horizon !== 1 ? "s" : ""}</span></label>
            <input type="range" min={1} max={10} step={1} value={horizon} onChange={(e) => setHorizon(Number(e.target.value))}
              style={{ width: "100%", marginTop: 8, accentColor: "#F5E642" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 12 }}>
              <span>1 yr</span><span>10 yrs</span>
            </div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 12, padding: 20, border: `2px solid ${analysis.color}` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
            <div style={{ color: analysis.color, fontSize: 24, fontWeight: 800 }}>{analysis.rec}</div>
            <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 8 }}>{analysis.reason}</div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#112240", borderRadius: 8, padding: 12 }}>
                <div style={{ color: "#64748b", fontSize: 12 }}>Projected Home Value</div>
                <div style={{ color: "#F5E642", fontSize: 20, fontWeight: 700 }}>${Number(projectedAppreciation).toLocaleString()}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>From $385K median in {horizon}yr{horizon !== 1 ? "s" : ""}</div>
              </div>
              <div style={{ background: "#112240", borderRadius: 8, padding: 12 }}>
                <div style={{ color: "#64748b", fontSize: 12 }}>Equity Gain at 4%/yr</div>
                <div style={{ color: "#4ade80", fontSize: 20, fontWeight: 700 }}>+${(Number(projectedAppreciation) - 385000).toLocaleString()}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Before transaction costs</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💻 Tech Corridor Growth Drivers</h2>
          {[
            { co: "Toyota HQ", city: "Plano", jobs: "4,000+", impact: "High" },
            { co: "JPMorgan Chase", city: "Plano", jobs: "6,000+", impact: "Very High" },
            { co: "Liberty Mutual", city: "Plano", jobs: "3,000+", impact: "High" },
            { co: "Samsung Austin", city: "Allen/McKinney", jobs: "2,000+", impact: "High" },
            { co: "Raytheon", city: "McKinney", jobs: "3,500+", impact: "High" },
          ].map((item) => (
            <div key={item.co} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ color: "#fff", fontWeight: 600 }}>{item.co}</span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>{item.city}</span>
              <span style={{ color: "#4ade80", fontSize: 14 }}>{item.jobs} jobs</span>
              <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{item.impact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}