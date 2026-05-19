import { useState } from 'react';

const eras = [
  {
    era: "1960s-1980s: First Wave Problems",
    icon: "🏗️",
    desc: "Early DFW suburban developments built on expansive black clay soils without adequate engineering. Builders used shallow slabs. By the late 1970s, thousands of homes showed cracks, sticking doors, and sloping floors. Homeowners had no vocabulary for what was happening.",
    fact: "Montecito clay shrinks 15-20% in drought — most extreme in US",
  },
  {
    era: "1980s: Pier-and-Beam to Slab Transition",
    icon: "🔧",
    desc: "Builders switched from pier-and-beam to post-tension slabs, solving some problems but creating new ones. Post-tension slabs distribute load better but fail differently when clay moves. A new wave of foundation issues emerged in neighborhoods built 1982-1992.",
    fact: "Post-tension slab failures often cost $40K+ to repair",
  },
  {
    era: "1990s-2000s: Industry Explosion",
    icon: "💼",
    desc: "Foundation repair became a major DFW industry. Dozens of companies formed. Pier installation became the standard fix. Lifetime warranties became marketing tools. Homeowners struggled to distinguish legitimate repairs from oversold solutions.",
    fact: "DFW has 3x more foundation repair companies per capita than the national average",
  },
  {
    era: "2010s: Science Catches Up",
    icon: "🔬",
    desc: "Structural engineers began publishing DFW-specific research. Watering programs, root barriers, and proper drainage gained recognition. The industry professionalized — but bad actors remained common. ProLnk was built partly in response to this trust gap.",
    fact: "60% of DFW homes show some foundation movement over 10 years",
  },
  {
    era: "2020s: Data-Driven Era",
    icon: "📊",
    desc: "LIDAR surveys, soil moisture monitoring, and AI-powered assessment tools emerged. ProLnk's Home Health Vault captures foundation history permanently — giving future buyers and sellers verified data for the first time in DFW history.",
    fact: "ProLnk Home Health Vault: first permanent DFW foundation record system",
  },
];

export default function DFWFoundationDFWHistoryGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>DFW Foundation History Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>How DFW learned — the hard way — about expansive clay soils</p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "20px 24px", marginBottom: 36, color: "#0A1628" }}>
          <strong>Key Fact:</strong> DFW has more foundation repair companies per capita than any US metro. Decades of building on expansive black clay without adequate engineering created a permanent maintenance challenge for 2.8M+ homes.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {eras.map((e, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#F5E642″ : "#1e2d45",
                color: selected === i ? "#0A1628″ : "#94a3b8",
                border: "none", borderRadius: 8, padding: "8px 14px",
                cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              {e.icon} {e.era.split(":")[0]}
            </button>
          ))}
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{eras[selected].icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F5E642″, margin: "0 0 16px" }}>{eras[selected].era}</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{eras[selected].desc}</p>
          <div style={{ background: "#0A1628″, borderRadius: 8, padding: "12px 18px" }}>
            <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14 }}>📌 {eras[selected].fact}</span>
          </div>
        </div>

        <div style={{ marginTop: 32, background: "#1e2d45″, borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#F5E642″, fontWeight: 700, marginTop: 0 }}>🏆 Why This Matters for ProLnk</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.6, margin: 0 }}>
            Foundation work is DFW's highest-stakes home service — average repair $8K-$25K. ProLnk connects homeowners with verified foundation specialists and stores results permanently in the Home Health Vault, creating the first trusted DFW foundation data record.
          </p>
        </div>
      </div>
    </div>
  );
}
