import { useState } from 'react';

type Tolerance = "low" | "medium" | "high";

interface Strategy {
  name: string;
  minBudget: number;
  maxBudget: number;
  tolerance: Tolerance;
  monthlyRent: number;
  desc: string;
  emoji: string;
}

export default function DFWHouseHackingGuide2026() {
  const [budget, setBudget] = useState(450000);
  const [tolerance, setTolerance] = useState<Tolerance>("medium");

  const strategies: Strategy[] = [
    {
      name: "Duplex Hack",
      minBudget: 380000,
      maxBudget: 600000,
      tolerance: "low",
      monthlyRent: 1800,
      desc: "Live in one unit, rent the other. Most passive option with minimal landlord work.",
      emoji: "🏠",
    },
    {
      name: "Triplex/Fourplex",
      minBudget: 480000,
      maxBudget: 750000,
      tolerance: "medium",
      monthlyRent: 3600,
      desc: "Live in one unit, rent 2-3 others. More management but strong cash flow.",
      emoji: "🏢",
    },
    {
      name: "ADU Add-on",
      minBudget: 320000,
      maxBudget: 550000,
      tolerance: "medium",
      monthlyRent: 1400,
      desc: "Buy SFR with ADU or build one. Garage conversion or backyard cottage.",
      emoji: "🏡",
    },
    {
      name: "Room by Room",
      minBudget: 280000,
      maxBudget: 450000,
      tolerance: "high",
      monthlyRent: 2400,
      desc: "Rent individual rooms. Highest cash flow, most landlord involvement.",
      emoji: "🛏️",
    },
  ];

  const matching = strategies.filter(s =>
    budget >= s.minBudget &&
    budget <= s.maxBudget &&
    (tolerance === "high" || s.tolerance === tolerance || (tolerance === "medium" && s.tolerance !== "high"))
  );

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔑</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 800, margin: "8px 0" }}>DFW House Hacking Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>Live for free (or close to it) in DFW by letting your tenants pay your mortgage</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "DFW Duplex Range", value: "$400-550K", emoji: "🏠" },
            { label: "Typical Offset", value: "$1,200-2,000", emoji: "💰" },
            { label: "FHA Down Payment", value: "3.5%", emoji: "🏦" },
            { label: "Break-even Rate", value: "65% of hackers", emoji: "✅" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#112240", borderRadius: 12, padding: "18px 12px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginTop: 8 }}>{s.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 28, marginBottom: 32, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Strategy Finder</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14 }}>Budget: <span style={{ color: "#F5E642", fontWeight: 700 }}>${budget.toLocaleString()}</span></label>
              <input type="range" min={250000} max={750000} step={10000} value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: "#F5E642" }} />
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 14 }}>Landlord Tolerance:</label>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {(["low", "medium", "high"] as Tolerance[]).map(t => (
                  <button key={t} onClick={() => setTolerance(t)}
                    style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                      background: tolerance === t ? "#F5E642" : "#0A1628", color: tolerance === t ? "#0A1628" : "#94a3b8" }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {matching.length === 0 ? (
            <div style={{ textAlign: "center", color: "#f87171", padding: 20 }}>Adjust budget or tolerance to see strategies</div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {matching.map((s) => (
                <div key={s.name} style={{ background: "#0A1628", borderRadius: 12, padding: 20, border: "1px solid #F5E642" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontSize: 24 }}>{s.emoji}</span>
                      <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 20, marginLeft: 8 }}>{s.name}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#4ade80", fontWeight: 700 }}>+${s.monthlyRent.toLocaleString()}/mo rental income</div>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>Budget: ${s.minBudget.toLocaleString()}-${s.maxBudget.toLocaleString()}</div>
                    </div>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 12, marginBottom: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏙️ Best DFW Cities for House Hacking</h2>
          {[
            { city: "Garland", reason: "Low entry prices, strong rental demand, near DART rail", rating: "A" },
            { city: "Irving", reason: "Near DFW airport, corporate tenants, walkable areas", rating: "A" },
            { city: "Fort Worth", reason: "Affordable duplexes, growing job market, up-and-coming areas", rating: "A-" },
            { city: "Grand Prairie", reason: "Mid-point DFW location, value pricing, stable tenants", rating: "B+" },
            { city: "Mesquite", reason: "Affordable entry, suburban demand, family renters", rating: "B+" },
          ].map((c) => (
            <div key={c.city} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ color: "#F5E642", fontWeight: 700, minWidth: 110 }}>{c.city}</span>
              <span style={{ color: "#94a3b8", fontSize: 13, flex: 1, padding: "0 16px" }}>{c.reason}</span>
              <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "2px 10px", fontWeight: 700, fontSize: 14 }}>{c.rating}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#112240", borderRadius: 12, padding: 16, border: "1px solid #F5E642" }}>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
            🔧 <strong style={{ color: "#F5E642" }}>ProLnk connects house hackers to licensed contractors</strong> for unit turns, ADU builds, and renovation projects across all DFW cities.
          </p>
        </div>
      </div>
    </div>
  );
}
