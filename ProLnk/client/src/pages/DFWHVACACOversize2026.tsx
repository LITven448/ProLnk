import { useState } from 'react';

const concerns = [
  { id: "shortcycles", label: "AC turns off quickly", icon: "🔄",
    answer: "Short-cycling is the #1 sign of an oversized AC in DFW. Your system cools the air temperature fast but shuts off before removing enough humidity. In DFW summers (70–80% humidity), this leaves homes feeling clammy even at 72°F. Solution: Manual J load calculation to confirm correct sizing." },
  { id: "humid", label: "House feels humid despite AC running", icon: "💧",
    answer: "Humidity control in DFW requires the AC to run in longer cycles. An oversized unit cools quickly and shuts off — it never reaches steady-state dehumidification. Properly sized units run 15–20 minute cycles minimum. Many DFW builders oversize 20–30% to avoid callbacks — it feels cool at first but creates long-term humidity problems." },
  { id: "newbuild", label: "New construction sizing concern", icon: "🏗️",
    answer: "DFW builders frequently oversize AC systems by 20–30%. This is not a mistake — it reduces warranty callbacks. An oversized system will cool fast and homeowners rarely complain about 'too much cooling.' The humidity problem takes a season or two to become apparent. Always request the Manual J calculation from your builder." },
  { id: "replacing", label: "Replacing my AC unit", icon: "🔧",
    answer: "If replacing an older DFW unit, do NOT automatically replace with the same tonnage. The old unit may have been oversized to begin with. A proper Manual J load calculation costs $100–$300 and can save thousands by right-sizing. Also check if home improvements (insulation, windows) have reduced your actual cooling load." },
  { id: "mold", label: "Mold or musty smell concerns", icon: "🍃",
    answer: "Mold in DFW HVAC is often linked to oversized systems. High humidity from short-cycling creates ideal mold conditions in ductwork and on coils. If you're seeing mold or musty odors, request a Manual J and consider a variable-speed system that runs longer at lower capacity — far better for DFW humidity control." },
];

export default function DFWHVACACOversize2026() {
  const [selected, setSelected] = useState("");

  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Oversized AC Problems Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto" }}>
            In Dallas-Fort Worth, bigger is NOT better for air conditioning. Learn why oversized systems create the exact problems DFW homeowners complain about most.
          </p>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>⚠️ The DFW Oversizing Problem</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem" }}>
            {[
              { icon: "📏", stat: "20–30%", label: "DFW homes oversized by builders on average" },
              { icon: "💧", stat: "70–80%", label: "DFW summer outdoor relative humidity" },
              { icon: "🔄", stat: "Short-cycle", label: "Oversized AC shuts off before dehumidifying" },
              { icon: "📋", stat: "Manual J", label: "The only correct way to size a DFW AC system" },
            ].map(s => (
              <div key={s.stat} style={{ background: "#0A1628", borderRadius: 8, padding: "0.875rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem" }}>{s.icon}</div>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem", margin: "4px 0" }}>{s.stat}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔎 Select Your Concern</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {concerns.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id === selected ? "" : c.id)}
                style={{ background: selected === c.id ? "#1e3a5f" : "#0A1628", border: `2px solid ${selected === c.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.875rem 1rem", cursor: "pointer", color: "#e2e8f0", textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.2s" }}
              >
                <span style={{ fontSize: "1.25rem" }}>{c.icon}</span>
                <span style={{ fontWeight: selected === c.id ? 700 : 400 }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: "#112240", borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642", margin: "0 0 0.75rem" }}>{active.icon} {active.label}</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{active.answer}</p>
          </div>
        )}

        <div style={{ background: "#112240", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
            🏠 Need a Manual J calculation or DFW HVAC sizing consultation? <span style={{ color: "#F5E642" }}>ProLnk connects you with licensed HVAC professionals.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
