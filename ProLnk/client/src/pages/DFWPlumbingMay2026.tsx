import { useState } from 'react';

const concerns = [
  { label: "Leaky faucet / dripping pipes", priority: "🔴 High — fix now before summer water bills spike", action: "Replace washers or cartridge; DFW water rates peak June-Aug" },
  { label: "Outdoor irrigation system", priority: "🔴 High — May is ideal startup window", action: "Inspect heads, check backflow, set controller to 2x/week schedule" },
  { label: "Water heater over 8 years old", priority: "🟡 Medium — inspect before summer demand", action: "Flush sediment, check anode rod; avg life 8-12 yrs in DFW hard water" },
  { label: "Low water pressure", priority: "🟡 Medium — diagnose now", action: "Check pressure regulator (common in older DFW homes); ideal 45-65 PSI" },
  { label: "Sewer odors or slow drains", priority: "🔴 High — roots are growing in May", action: "Tree root intrusion peaks in spring; camera inspection recommended" },
  { label: "No immediate concerns", priority: "🟢 Low — preventive check recommended", action: "Annual plumbing inspection in May sets up a trouble-free summer" },
];

export default function DFWPlumbingMay2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · MAY 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🔧 DFW Plumbing Guide — May 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          May is DFW's driest spring month before the brutal summer heat arrives. It’s the perfect window
          to fix drips, start irrigation, and inspect your water heater before demand surges in June.
          DFW hard water (avg 300+ PPM) accelerates pipe and heater wear — don't wait.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "💧", stat: "300+ PPM", label: "DFW avg water hardness" },
            { icon: "📈", stat: "18-25%", label: "Typical summer water bill spike" },
            { icon: "🏠", stat: "8-12 yrs", label: "Avg water heater lifespan here" },
            { icon: "🌡️", stat: "100°F+", label: "DFW days expected June-Aug 2026″ },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642″, fontSize: "1.3rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>Select Your Plumbing Concern</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {concerns.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444″,
                border: selected === i ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 8, padding: "0.8rem 1rem", color: "#fff",
                textAlign: "left", cursor: "pointer", fontSize: "0.95rem",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444″, borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              {concerns[selected].priority}
            </div>
            <p style={{ color: "#cbd5e1″, margin: 0 }}>{concerns[selected].action}</p>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642″, borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            🔧 Get a Free Plumbing Quote via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>
            Licensed DFW plumbers · Background-checked · Responses in under 2 hours
          </div>
        </div>
      </div>
    </div>
  );
}