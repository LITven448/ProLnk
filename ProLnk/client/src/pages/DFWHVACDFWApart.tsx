import { useState } from "react";

const factors = [
  {
    factor: "Extreme summer heat (100-110F)",
    impact: "DFW HVAC systems run 2,000-2,800 hours per summer — 3x the national average. This compresses 10 years of wear into 3-4 years for undersized or neglected equipment.",
  },
  {
    factor: "Rapid freeze-thaw cycles in winter",
    impact: "DFW averages 8-12 freeze events per winter, but rarely below 20F for long. Heat pumps struggle, emergency heat runs frequently, and pipes stress — all invisible to homeowners without monitoring.",
  },
  {
    factor: "High clay soil and foundation movement",
    impact: "DFW's expansive clay soil causes foundations to shift seasonally, cracking ductwork connections and reducing system efficiency by 15-30% without visible symptoms.",
  },
  {
    factor: "Year-round humidity battles",
    impact: "DFW sits at 60-80% relative humidity 8 months per year. Systems that do not properly dehumidify create mold risk, musty air, and 20-40% more cooling demand.",
  },
  {
    factor: "Rapid urban growth and contractor demand",
    impact: "DFW adds 50,000+ homes per year, creating chronic contractor shortages. In peak summer, average response time is 4-8 days — a real safety risk during heat waves.",
  },
  {
    factor: "Attic temps reaching 150-160F",
    impact: "DFW attics are extreme environments that degrade ductwork, insulation, and air handler components faster than any other US market. Most equipment is not rated for sustained attic temps this high.",
  },
  {
    factor: "Deregulated electricity market",
    impact: "DFW homeowners choose their electricity provider, creating enormous efficiency incentives. A properly maintained 16+ SEER system saves $600-$1,200/year vs. a neglected 12 SEER unit.",
  },
];

export default function DFWHVACDFWApart() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🌡️</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            Why DFW HVAC Is Unlike Any Other US Market
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            Seven factors combine in DFW that exist nowhere else in the country simultaneously. Understanding them is the difference between reactive emergency repairs and proactive home stewardship.
          </p>
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "16px", padding: "28px", marginBottom: "32px", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#F5E642", marginBottom: "12px" }}>🗺️ The 7 DFW Factors</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            Phoenix has heat but not humidity. Houston has humidity but not clay soil. Chicago has freeze cycles but not 110F summers. Only DFW combines all seven factors — which is why DFW HVAC requires specialized knowledge that general HVAC guides simply do not cover.
          </p>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select a DFW factor to see how it affects homeowners specifically
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {factors.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                backgroundColor: selected === i ? "#F5E642" : "#0F2040",
                color: selected === i ? "#0A1628" : "#fff",
                border: "1px solid " + (selected === i ? "#F5E642" : "#1e3a5f"),
                borderRadius: "10px",
                padding: "16px 20px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              {selected === i ? "✅" : "⚠️"} {item.factor}
              {selected === i && (
                <div style={{ marginTop: "10px", fontSize: "0.92rem", fontWeight: "400", color: "#0A1628", lineHeight: 1.6 }}>
                  📍 {item.impact}
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#F5E642", marginBottom: "10px" }}>🎯 Built for DFW Specifically</h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            ProLnk was built for the DFW market from the ground up — not adapted from a generic home services platform. Every matching algorithm, every contractor requirement, and every piece of content in our 3,200+ page library is DFW-specific by design.
          </p>
        </div>
      </div>
    </div>
  );
}
