import { useState } from 'react';

const eras = [
  {
    era: "Pre-1990s: Hail Was Invisible",
    icon: "☁️",
    desc: "Hailstorms hit DFW, but insurance claims were minimal and roofing replacement was treated as a long-term lifecycle event. Few homeowners knew their roofs could be damaged without visible leaks. Documentation was minimal.",
    fact: "DFW averages 4-6 significant hail events per year",
  },
  {
    era: "1990s: Insurance Industry Wakes Up",
    icon: "📋",
    desc: "Major hail events in 1992, 1995, and 1999 produced unprecedented insurance claims across DFW. Insurers began mapping storm tracks, developing hail-size documentation standards, and writing DFW-specific underwriting guidelines. The modern DFW roofing insurance market was born.",
    fact: "DFW hail claims 10x national average per square mile",
  },
  {
    era: "2012: The $2.4B Storm",
    icon: "⛈️",
    desc: "The April 2012 hailstorm became the defining event in DFW roofing history. $2.4 billion in insured losses across a single storm system. Storm chaser contractors flooded DFW from every state. Roofing crews ran door-to-door. Homeowners couldn't tell legitimate pros from opportunists.",
    fact: "$2.4B insured loss — largest single hail event in Texas history at the time",
  },
  {
    era: "2013-2018: Storm Chaser Era",
    icon: "🚐",
    desc: "Out-of-state contractors dominated DFW roofing for years post-2012. Work quality varied wildly. The Texas Department of Insurance began tracking contractor fraud. Local roofing companies fought back with certification programs and reputation marketing.",
    fact: "Estimated 60% of post-storm DFW roofing done by out-of-state crews in peak years",
  },
  {
    era: "2019-2026: Class 4 & ProLnk",
    icon: "🏆",
    desc: "Class 4 impact-resistant shingles became the DFW standard — adopted years ahead of other US markets. Insurance discounts drove uptake. ProLnk entered the market to solve the verification problem: connecting homeowners with vetted DFW-based roofing professionals with documented track records.",
    fact: "Class 4 shingles can reduce DFW homeowner premiums 20-30%",
  },
];

export default function DFWRoofingDFWHistoryGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏚️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>DFW Roofing History Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>How Dallas-Fort Worth became the storm roofing capital of America</p>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "20px 24px", marginBottom: 36, color: "#0A1628" }}>
          <strong>Key Insight:</strong> DFW averages 4-6 significant hail events per year. The 2012 superstorm alone caused $2.4B in insured losses. Storm chasers exploited the chaos — ProLnk was built to fix this trust gap permanently.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {eras.map((e, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#F5E642" : "#1e2d45",
                color: selected === i ? "#0A1628" : "#94a3b8",
                border: "none", borderRadius: 8, padding: "8px 14px",
                cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              {e.icon} {e.era.split(":")[0]}
            </button>
          ))}
        </div>

        <div style={{ background: "#1e2d45", borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{eras[selected].icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F5E642", margin: "0 0 16px" }}>{eras[selected].era}</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{eras[selected].desc}</p>
          <div style={{ background: "#0A1628", borderRadius: 8, padding: "12px 18px" }}>
            <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 14 }}>⚡ {eras[selected].fact}</span>
          </div>
        </div>

        <div style={{ marginTop: 32, background: "#1e2d45", borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#F5E642", fontWeight: 700, marginTop: 0 }}>🎯 ProLnk's Roofing Solution</h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
            ProLnk pre-vetted DFW roofing professionals are licensed, insured, and locally accountable. No storm chasers. No out-of-state crews. Every job tracked in the Home Health Vault — giving homeowners documentation that follows the home forever.
          </p>
        </div>
      </div>
    </div>
  );
}
