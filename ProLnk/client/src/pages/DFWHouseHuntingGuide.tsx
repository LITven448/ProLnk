import { useState } from 'react';

const ZONES = {
  "Downtown/Uptown": { suburbs: ["Uptown", "Oak Lawn", "Deep Ellum"], commute: "No car needed", hoa: "High ($300-800/mo)", school: "Dallas ISD — research campus-specific" },
  "North Corridor (75/DNT)": { suburbs: ["Plano", "Allen", "Frisco", "McKinney"], commute: "30-50 min to downtown", hoa: "Moderate ($100-300/mo)", school: "Plano ISD / Frisco ISD — top-rated" },
  "East Corridor (30/80)": { suburbs: ["Mesquite", "Garland", "Rowlett", "Rockwall"], commute: "25-40 min to downtown", hoa: "Low ($50-150/mo)", school: "Rockwall ISD — high-rated, smaller" },
  "West Corridor (30/20)": { suburbs: ["Arlington", "Grand Prairie", "Mansfield", "Midlothian"], commute: "30-55 min to downtown", hoa: "Low-moderate", school: "Mansfield ISD / Arlington ISD" },
  "South Corridor (35E/67)": { suburbs: ["Cedar Hill", "Duncanville", "DeSoto", "Lancaster"], commute: "25-40 min to downtown", hoa: "Low ($0-150/mo)", school: "Cedar Hill ISD — improving rapidly" },
};

const MUST_HAVES_MAP: Record<string, string[]> = {
  "Top schools": ["North Corridor (75/DNT)", "East Corridor (30/80)"],
  "Low HOA": ["South Corridor (35E/67)", "East Corridor (30/80)"],
  "Walkability": ["Downtown/Uptown"],
  "New construction": ["North Corridor (75/DNT)", "West Corridor (30/20)"],
  "Affordability": ["South Corridor (35E/67)", "East Corridor (30/80)"],
};

const RED_FLAGS = [
  "Foundation cracks wider than 1/8 inch — DFW clay soil shifts constantly",
  "No seller disclosure on foundation repairs — always ask for engineer report",
  "Backup of sewer smell — old clay pipes in pre-1990 homes",
  "HVAC unit older than 12 years — replacements run $8K-15K in DFW heat",
  "Pool with no recent inspection — DFW pools face major UV/heat wear",
  "Backing to commercial or busy road — resale impact is significant",
];

const TRACK_FIELDS = ["Year Built", "Roof Age", "HVAC Age", "HOA Fee", "School District", "Foundation Type", "Last Sold Price", "Days on Market", "Flood Zone (FEMA)", "Recent Permits"];

export default function DFWHouseHuntingGuide() {
  const [destination, setDestination] = useState("Downtown Dallas");
  const [mustHave, setMustHave] = useState("Top schools");
  const [results, setResults] = useState<string[]>([]);

  function findZones() {
    const matches = MUST_HAVES_MAP[mustHave] || [];
    setResults(matches);
  }

  return (
    <div style={{ background: "#f9f6f0″, minHeight: "100vh", fontFamily: "Georgia, serif", color: "#1a1a1a", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 13, color: "#888″, marginBottom: 8 }}>🏡 DFW BUYER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: "#0A1628″, marginBottom: 6 }}>DFW House Hunting Guide</h1>
        <p style={{ color: "#555″, fontSize: 16, marginBottom: 36 }}>Organize your DFW home search by corridor, track what matters, and avoid the rookie mistakes.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginBottom: 16 }}>📍 DFW Search Zones by Corridor</h2>
        {Object.entries(ZONES).map(([zone, info]) => (
          <div key={zone} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "18px 22px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{zone}</div>
            <div style={{ fontSize: 14, color: "#444″ }}>🏙 Suburbs: {info.suburbs.join(", ")}</div>
            <div style={{ fontSize: 14, color: "#444″ }}>🚗 Commute: {info.commute}</div>
            <div style={{ fontSize: 14, color: "#444″ }}>🏘 HOA: {info.hoa}</div>
            <div style={{ fontSize: 14, color: "#444″ }}>🎓 School: {info.school}</div>
          </div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginTop: 32, marginBottom: 14 }}>📋 What to Track Per Home</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
          {TRACK_FIELDS.map(f => (
            <div key={f} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "10px 14px", fontSize: 14 }}>✅ {f}</div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginBottom: 14 }}>🚨 DFW Red Flags</h2>
        <div style={{ marginBottom: 32 }}>
          {RED_FLAGS.map((f, i) => (
            <div key={i} style={{ background: "#fff3f3″, border: "1px solid #fcc", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 14 }}>⚠️ {f}</div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginBottom: 16 }}>🔍 Find Your Zone</h2>
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Commute Destination</label>
            <input value={destination} onChange={e => setDestination(e.target.value)} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }} placeholder="e.g. Frisco, Legacy West, Medical District" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Top Must-Have</label>
            <select value={mustHave} onChange={e => setMustHave(e.target.value)} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }}>
              {Object.keys(MUST_HAVES_MAP).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button onClick={findZones} style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Find My Zones</button>
          {results.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Recommended Corridors:</div>
              {results.map(r => {
                const z = ZONES[r as keyof typeof ZONES];
                return (
                  <div key={r} style={{ background: "#eef6ff", borderRadius: 8, padding: "12px 16px", marginBottom: 8, fontSize: 14 }}>
                    <strong>{r}</strong> — {z?.suburbs.join(", ")}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
