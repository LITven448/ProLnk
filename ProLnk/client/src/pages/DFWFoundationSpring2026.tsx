import { useState } from 'react';

const foundationTypes = [
  {
    label: "Slab Foundation",
    checklist: [
      "Walk perimeter: look for cracks wider than 1/4 inch or stair-step brick cracks",
      "Check interior floors for unevenness (roll a ball — it should stop quickly)",
      "Inspect expansion joints for gaps or heaving after spring rains",
      "Start soaker hose program now: 30 min/day, 12 inches from foundation",
      "Ensure gutters drain 6+ feet away from foundation",
      "Document any new cracks with photos and date for baseline comparison",
    ],
  },
  {
    label: "Pier & Beam Foundation",
    checklist: [
      "Inspect crawl space for standing water from spring rain — must dry within 48 hrs",
      "Check wood beams for rot or termite damage (spring is prime termite season)",
      "Look for sagging floors or doors that newly stick — signs of pier settlement",
      "Ensure crawl space vents are open for summer airflow",
      "Verify vapor barrier is intact — DFW clay soil releases moisture upward",
      "Grade soil away from foundation: 1 inch drop per foot for first 6 feet",
    ],
  },
  {
    label: "Not sure / mixed",
    checklist: [
      "Have a foundation inspector identify your system type — free with most inspections",
      "DFW homes built before 1980 are often pier & beam; after 1980 usually slab",
      "Spring is the best time to establish a baseline — moisture levels are moderate",
      "Document all door and window operation now; compare again in August",
      "Ensure landscaping irrigation is balanced on all sides of home",
      "Consider a moisture meter reading at 4 corners of slab as baseline",
    ],
  },
];

export default function DFWFoundationSpring2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · SPRING 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🏗️ DFW Foundation Spring 2026 Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.7 }}>
          DFW's Expansive Black Clay soil is the #1 cause of foundation damage in North Texas.
          Spring rain swells the clay; summer drought shrinks it. This cycle — repeated every year —
          causes more foundation movement than anywhere else in the US. Act now while moisture levels
          are still moderate and repair costs are lowest.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌧️", stat: "4.8\"", label: "DFW May avg rainfall" },
            { icon: "☀️", stat: "-8\"", label: "Soil shrink by August" },
            { icon: "💰", stat: "$4K-$25K", label: "Avg DFW foundation repair cost" },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.2rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", border: "1px solid #F5E642", borderRadius: 10, padding: "1.2rem", marginBottom: "2rem" }}>
          <strong style={{ color: "#F5E642" }}>⚠️ DFW Foundation Rule #1:</strong>
          <span style={{ color: "#cbd5e1" }}> Keep soil moisture consistent year-round. Wet in spring + bone dry in summer = cracked slab. A soaker hose program started in May is your best defense.</span>
        </div>

        <h2 style={{ color: "#F5E642", marginBottom: "1rem" }}>Select Your Foundation Type</h2>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {foundationTypes.map((f, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444",
                border: selected === i ? "2px solid #F5E642" : "2px solid transparent",
                borderRadius: 8, padding: "0.7rem 1.2rem", color: "#fff",
                cursor: "pointer", fontSize: "0.95rem",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444", borderRadius: 12, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642", marginTop: 0 }}>Spring 2026 Checklist — {foundationTypes[selected].label}</h3>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {foundationTypes[selected].checklist.map((item, i) => (
                <li key={i} style={{ color: "#cbd5e1", marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            🏗️ Get a Foundation Inspection Quote via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>Licensed DFW structural engineers · Free estimates · Warranty-backed repairs</div>
        </div>
      </div>
    </div>
  );
}