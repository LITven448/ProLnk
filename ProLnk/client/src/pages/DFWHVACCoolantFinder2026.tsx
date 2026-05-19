import { useState } from 'react';

const refrigerants = [
  { id: "r22″, label: "R-22 (Freon)", years: "Pre-2010", color: "#ef4444", icon: "🔴", desc: "Discontinued — no longer manufactured. Systems still running need stockpiled or reclaimed R-22. Extremely expensive to recharge ($100–$175/lb). If leaking, replacement is often smarter." },
  { id: "r410a", label: "R-410A (Puron)", years: "2010–2024″, color: "#3b82f6", icon: "🔵", desc: "Most common in DFW homes. Being phased down under AIM Act. Still available but rising in cost. Compatible refrigerant options emerging." },
  { id: "r32″, label: "R-32", years: "2025+", color: "#10b981", icon: "🟢", desc: "New single-component refrigerant. Lower GWP than R-410A. Used in some new split systems. Not backward compatible — requires new equipment." },
  { id: "r454b", label: "R-454B (Puron Advanced)", years: "2025+", color: "#8b5cf6″, icon: "🟣", desc: "Carrier and others use R-454B in new A2L-rated equipment. Lower GWP. Mildly flammable — requires updated service tools and certified techs." },
];

const ageMap: Record<string, string> = {
  "before2000″: "r22",
  "2000to2009″: "r22",
  "2010to2019″: "r410a",
  "2020to2024″: "r410a",
  "2025plus": "r32″,
};

export default function DFWHVACCoolantFinder2026() {
  const [age, setAge] = useState("");
  const [manualId, setManualId] = useState("");

  const guessedId = ageMap[age] || "";
  const activeId = manualId || guessedId;
  const active = refrigerants.find(r => r.id === activeId);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>❄️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW What Refrigerant Is In Your System Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
            Identify your DFW home's AC refrigerant type — critical for service, repairs, and understanding replacement costs.
          </p>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📋 How to Find Your Refrigerant</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
            {[
              { icon: "🏷️", step: "Step 1″, text: "Locate the outdoor condenser unit" },
              { icon: "🔍", step: "Step 2″, text: "Find the data plate (yellow or silver label)" },
              { icon: "📄", step: "Step 3″, text: "Look for Refrigerant Type or Charge" },
              { icon: "✅", step: "Step 4″, text: "Match the type below for service guidance" },
            ].map(s => (
              <div key={s.step} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem" }}>{s.icon}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600, fontSize: "0.85rem" }}>{s.step}</div>
                <div style={{ color: "#cbd5e1″, fontSize: "0.85rem", marginTop: 4 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔎 Estimate by System Age</h2>
          <select
            value={age}
            onChange={e => { setAge(e.target.value); setManualId(""); }}
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#0A1628″, color: "#e2e8f0", border: "1px solid #1e3a5f", fontSize: "1rem" }}
          >
            <option value="">Select your unit age range...</option>
            <option value="before2000″>Before 2000</option>
            <option value="2000to2009″>2000 to 2009</option>
            <option value="2010to2019″>2010 to 2019</option>
            <option value="2020to2024″>2020 to 2024</option>
            <option value="2025plus">2025 or newer</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {refrigerants.map(r => (
            <button
              key={r.id}
              onClick={() => { setManualId(r.id); setAge(""); }}
              style={{ background: activeId === r.id ? "#1e3a5f" : "#112240″, border: `2px solid ${activeId === r.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: "1rem", cursor: "pointer", color: "#e2e8f0", textAlign: "center", transition: "all 0.2s" }}
            >
              <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginTop: 4 }}>{r.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.78rem" }}>{r.years}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", borderLeft: `4px solid ${active.color}` }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.75rem" }}>{active.icon} {active.label}</h3>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>{active.desc}</p>
          </div>
        )}

        <div style={{ marginTop: "2rem", background: "#112240″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem" }}>
            🏠 Need a DFW HVAC pro for refrigerant service? <span style={{ color: "#F5E642″ }}>ProLnk connects you with licensed technicians in your area.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
