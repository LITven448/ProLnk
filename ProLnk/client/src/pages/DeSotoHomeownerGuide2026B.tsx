import { useState } from 'react';

const subdivisions = [
  { era: "Pre-2000″, label: "Pre-2000 Home", tips: ["Original HVAC likely end-of-life — schedule full system inspection", "Check attic insulation (R-38+ needed for humid microclimate)", "Inspect crawlspace/slab for moisture intrusion from Cedar Hill proximity"] },
  { era: "2000-2008″, label: "2000–2008 Build", tips: ["First HVAC replacement cycle now due (15–18 yr lifespan)", "Expanding clay soil causes slab movement — check door frames & cracks", "Inspect roof decking for early moisture damage from humidity"] },
  { era: "2009-2015″, label: "2009–2015 Build", tips: ["HVAC approaching mid-life — clean coils, check refrigerant levels", "Foundation settling common on DeSoto clay-heavy lots", "Verify attic ventilation meets current humidity control standards"] },
  { era: "2016+", label: "2016+ New Build", tips: ["Annual HVAC filter changes critical in humid microclimate", "Monitor foundation perimeter moisture with soaker hose system", "Check siding/trim for early moisture intrusion on newer wood composites"] }
];

const challenges = [
  { icon: "💧", title: "Humid Microclimate", desc: "Cedar Hill State Park proximity creates above-average humidity vs north DFW" },
  { icon: "🏗️", title: "Clay Soil Expansion", desc: "Heavy clay soils cause slab movement — monitor foundation perimeter moisture" },
  { icon: "❄️", title: "HVAC Replacement Wave", desc: "2000–2015 subdivisions entering first full HVAC replacement cycle in 2025–2026″ },
  { icon: "🌿", title: "Tree Root Intrusion", desc: "Mature trees near Cedar Hill State Park increase sewer line root risk" }
];

export default function DeSotoHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = subdivisions.find(s => s.era === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DeSoto TX Homeowner Deep Dive 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "0.95rem" }}>Part 2 — Humid Microclimate, Clay Soil & Subdivision-Era Maintenance</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {challenges.map(c => (
            <div key={c.title} style={{ background: "#111e35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{c.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 4 }}>{c.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: 4 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginTop: 0 }}>📅 Select Your Home's Subdivision Era</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {subdivisions.map(s => (
              <button key={s.era} onClick={() => setSelected(s.era)}
                style={{ background: selected === s.era ? "#F5E642″ : "#1e3a5f", color: selected === s.era ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                {s.label}
              </button>
            ))}
          </div>
          {current && (
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>DeSoto Maintenance Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569″, fontSize: "0.9rem" }}>Select an era above to see your DeSoto-specific maintenance guide.</div>}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginTop: 0 }}>🔧 Year-Round DeSoto Priorities</h2>
          {["Spring: Inspect slab perimeter after winter freeze cycles", "Summer: Check HVAC performance under extreme humidity load", "Fall: Clear gutters before cedar/oak leaf drop near state park", "Winter: Insulate pipes — DeSoto gets occasional hard freezes"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk connects DeSoto homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
