import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Droplets, AlertTriangle, CheckCircle, ArrowRight, Thermometer } from "lucide-react";
import { Link } from "wouter";

const CITIES = [
  { city: "Frisco", ppm: 380 },
  { city: "Plano", ppm: 350 },
  { city: "Dallas", ppm: 320 },
  { city: "McKinney", ppm: 290 },
  { city: "Irving", ppm: 240 },
  { city: "Fort Worth", ppm: 180 },
];

const IMPACTS = [
  { label: "Water heater lifespan", reduction: "–40%", detail: "Scale buildup forces the heating element to work harder and fail sooner" },
  { label: "Dishwasher lifespan", reduction: "–30%", detail: "Mineral deposits clog spray arms and damage pumps" },
  { label: "Washing machine", reduction: "–25%", detail: "Hard water reduces detergent effectiveness and damages drum seals" },
  { label: "Pipes", reduction: "Scale buildup", detail: "Progressive restriction of flow, especially in water heater lines" },
  { label: "Fixtures & faucets", reduction: "Mineral deposits", detail: "Requires constant cleaning; finish damage accelerates over time" },
];

const SOLUTIONS = [
  { name: "Whole-home water softener", cost: "$800–1,500 installed", note: "Best solution — salt-based ion exchange removes hardness before it reaches your system", recommended: true },
  { name: "Tankless water heater", cost: "$1,200–2,800 installed", note: "Handles scale better than tank units; less surface area for buildup" },
  { name: "Annual water heater flush", cost: "$75–150/yr", note: "Removes accumulated sediment and extends life by 3–5 years" },
  { name: "Filtered shower heads", cost: "$40–120", note: "Reduces scale on fixtures and better for hair and skin" },
];

const CHECKLIST = [
  { id: "c1", label: "Flush water heater annually (October is ideal)", freq: "Annual" },
  { id: "c2", label: "Descale faucet aerators and shower heads", freq: "Quarterly" },
  { id: "c3", label: "Test water hardness with home kit", freq: "Annual" },
  { id: "c4", label: "Check water softener salt level", freq: "Monthly" },
  { id: "c5", label: "Inspect washing machine hoses for scale", freq: "Annual" },
  { id: "c6", label: "Run dishwasher with citric acid cleaner", freq: "Quarterly" },
];

export default function DFWHardWaterGuide() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setDone(prev => ({ ...prev, [id]: !prev[id] }));

  const maxPpm = Math.max(...CITIES.map(c => c.ppm));

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 72px" }}>

          {/* Hero */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#3b82f6",
              fontWeight: 600, marginBottom: 16,
            }}>
              <Droplets size={12} /> DFW Water Quality Guide
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 14px", lineHeight: 1.2 }}>
              DFW's Hard Water Is Silently Destroying Your Home — Here's What to Do
            </h1>
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 12, padding: "14px 18px",
            }}>
              <p style={{ color: "#fca5a5", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                <AlertTriangle size={14} style={{ display: "inline", marginRight: 6 }} />
                <strong>The threshold for "very hard" water is 180 PPM.</strong> Every major DFW city is at or above that level — and most are double or triple the threshold.
              </p>
            </div>
          </div>

          {/* City PPM Chart */}
          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid #1e2c45", padding: "24px 26px", marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
              <Droplets size={16} color="#3b82f6" /> DFW Water Hardness by City (PPM)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CITIES.map(c => {
                const pct = (c.ppm / maxPpm) * 100;
                const color = c.ppm >= 350 ? "#ef4444" : c.ppm >= 250 ? "#f59e0b" : "#3b82f6";
                return (
                  <div key={c.city}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>{c.city}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color }}>{c.ppm} PPM</span>
                    </div>
                    <div style={{ background: "#0A1628", borderRadius: 6, height: 10 }}>
                      <div style={{ background: color, borderRadius: 6, height: 10, width: `${pct}%`, transition: "width 0.3s" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: "#3b82f6" }} />
                <span style={{ fontSize: 11, color: "#6b7280" }}>180 PPM = "Very Hard" threshold (everything above is harmful)</span>
              </div>
            </div>
          </div>

          {/* What it destroys */}
          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid #1e2c45", padding: "24px 26px", marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 17, fontWeight: 700, color: "#fff" }}>
              What Hard Water Destroys in Your Home
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {IMPACTS.map(item => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  background: "#0A1628", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e2c45",
                }}>
                  <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{item.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#ef4444" }}>{item.reduction}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost impact */}
          <div style={{
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 14, padding: "20px 24px", marginBottom: 32,
          }}>
            <Thermometer size={18} color="#ef4444" style={{ marginBottom: 10 }} />
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#fff" }}>The Annual Cost to DFW Homeowners</h3>
            <p style={{ color: "#fca5a5", fontSize: 14, margin: 0, lineHeight: 1.65 }}>
              DFW homeowners spend an estimated <strong>$1,200/year more</strong> in water heater energy costs, appliance repairs, and fixture replacement compared to homeowners in soft-water cities — just because of hard water. A $1,200 water softener pays for itself in one year.
            </p>
          </div>

          {/* Solutions */}
          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid #1e2c45", padding: "24px 26px", marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 17, fontWeight: 700, color: "#fff" }}>Solutions — Ranked by Effectiveness</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOLUTIONS.map(s => (
                <div key={s.name} style={{
                  background: "#0A1628", borderRadius: 12, padding: "16px 18px",
                  border: s.recommended ? "1px solid rgba(34,197,94,0.3)" : "1px solid #1e2c45",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      {s.recommended
                        ? <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} />
                        : <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #374151", flexShrink: 0, marginTop: 3 }} />}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.name}</span>
                          {s.recommended && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.15)", borderRadius: 6, padding: "2px 8px" }}>
                              Recommended
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{s.note}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#14b8a6", flexShrink: 0 }}>{s.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance checklist */}
          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid #1e2c45", padding: "24px 26px", marginBottom: 36 }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 17, fontWeight: 700, color: "#fff" }}>Maintenance Checklist</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CHECKLIST.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, width: "100%",
                    background: done[item.id] ? "rgba(34,197,94,0.06)" : "#0A1628",
                    border: done[item.id] ? "1px solid rgba(34,197,94,0.2)" : "1px solid #1e2c45",
                    borderRadius: 10, padding: "12px 16px", cursor: "pointer", textAlign: "left",
                  }}
                >
                  {done[item.id]
                    ? <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                    : <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid #374151", flexShrink: 0 }} />}
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: done[item.id] ? "#6b7280" : "#e5e7eb", textDecoration: done[item.id] ? "line-through" : "none" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#141c2e", borderRadius: 6, padding: "2px 8px", flexShrink: 0 }}>
                    {item.freq}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 18 }}>
              A water heater flush is the #1 easiest way to add years to your appliances. Get it scheduled today.
            </p>
            <Link href="/homeowner-signup">
              <button style={{
                background: "#14b8a6", color: "#fff", border: "none",
                borderRadius: 10, padding: "14px 32px", fontSize: 15,
                fontWeight: 700, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Schedule Water Heater Service <ArrowRight size={16} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
