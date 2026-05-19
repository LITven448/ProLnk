import { useState } from 'react';

const decades = [
  { era: "Pre-1960s", label: "Before AC", pop: "~400K", desc: "DFW was a modest regional hub. Summers meant suffering — screen porches, wet sheets, sleeping outside. Population barely tolerable." },
  { era: "1960s", label: "AC Arrives", pop: "~1.1M", desc: "Window units hit middle-class homes. Builders started closing in porches. DFW began its transformation as people realized summer was livable." },
  { era: "1970s", label: "Central Air Spreads", pop: "~2.4M", desc: "Central AC became standard in new builds. Population surged. No-shade-tree lots became normal — why plant trees when you have 3-ton units?" },
  { era: "1980s", label: "Sun Belt Boom", pop: "~3.9M", desc: "Open-concept floor plans flourished — AC made large interior spaces comfortable. DFW became a top relocation destination nationwide." },
  { era: "1990s", label: "McMansion Era", pop: "~5.2M", desc: "Vaulted ceilings, two-story entries, massive square footage. All possible only with oversized AC systems. Energy bills soared but no one cared." },
  { era: "2000s", label: "Efficiency Push", pop: "~6.1M", desc: "SEER ratings introduced. DFW homebuilders began right-sizing systems. 14 SEER became the floor. Dual-zone systems entered luxury builds." },
  { era: "2010s", label: "Smart AC", pop: "~7.4M", desc: "Smart thermostats, variable-speed compressors, ERCOT demand response programs. AC became a connected home system, not just a box." },
  { era: "2020s", label: "Crisis & Reckoning", pop: "~8.1M", desc: "Winter Storm Uri exposed grid fragility. Heat pump adoption accelerated. 15 SEER2 mandate hit 2023. DFW leads US in heat pump installs per capita." },
];

export default function DFWAirConditioningHistory2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>❄️</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642", marginBottom: "0.5rem" }}>DFW Air Conditioning History Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>How AC built the Dallas-Fort Worth metroplex</p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            Before central air conditioning, Dallas-Fort Worth summers routinely hit <strong style={{ color: "#F5E642" }}>105°F+</strong> — making the region nearly uninhabitable for large populations. 
            AC did not just cool homes; it <strong style={{ color: "#F5E642" }}>created modern DFW</strong>. Today, 99.8% of DFW homes have AC — the highest penetration rate in the United States.
          </p>
        </div>

        <p style={{ color: "#94a3b8", marginBottom: "1rem", fontSize: "0.9rem" }}>Select a decade to explore ACs impact:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {decades.map((d, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.6rem 0.3rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642" : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50" : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.2s" }}>
              {d.era}
            </button>
          ))}
        </div>

        {(() => { const d = decades[selected]; return (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F5E642" }}>{d.era} — {d.label}</h2>
              <span style={{ background: "#1a2f50", border: "1px solid #F5E642", borderRadius: 8, padding: "0.3rem 0.8rem", color: "#F5E642", fontSize: "0.85rem", fontWeight: 600 }}>
                Population: {d.pop}
              </span>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>{d.desc}</p>
          </div>
        ); })()}

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642", fontWeight: 700, marginBottom: "1rem" }}>🏠 ACs Architectural Legacy in DFW</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[["Large Open Layouts","AC made 2,500+ sq ft standard; no need for cross-ventilation"],["No Shade Trees","Builders skipped tree canopy — shade matters less with 3-ton units"],["Interior Garages","Attached garages replaced breezeways; AC connects the whole home"],["Sealed Envelopes","Airtight construction replaced screened porches and operable windows"]].map(([t,d],i)=>(
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", border: "1px solid #1e3a5f" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.3rem", fontSize: "0.9rem" }}>{t}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#0f2040", borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Need AC service in DFW? </span>
          <span style={{ color: "#F5E642", fontWeight: 700 }}>ProLnk connects you with vetted HVAC pros instantly. 🔗</span>
        </div>
      </div>
    </div>
  );
}
