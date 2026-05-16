import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "Closing vents saves energy",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "🌬️",
    truth: "Closing vents creates pressure imbalance in your duct system. DFW homes rely on balanced airflow — closed vents force your HVAC to work harder, increasing wear and energy bills. All vents should stay open.",
    tip: "If a room is too hot/cold, adjust dampers inside the ductwork — not the vent covers.",
  },
  {
    id: 2,
    myth: "Bigger HVAC is always better",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "📦",
    truth: "An oversized unit short-cycles — turns on and off too frequently — causing humidity problems, uneven temperatures, and premature wear. DFW homes need properly sized systems calculated by a Manual J load calculation.",
    tip: "Ask your HVAC contractor for a Manual J calculation before any replacement.",
  },
  {
    id: 3,
    myth: "Only fix HVAC when something breaks",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "🔥",
    truth: "DFW summers push systems to 95%+ capacity for months. Annual maintenance catches refrigerant leaks, dirty coils, and worn capacitors before they become $3,000+ failures during a 105°F July day.",
    tip: "Schedule spring tune-up in March before the heat season hits DFW.",
  },
  {
    id: 4,
    myth: "New filters every month is overkill",
    verdict: "FALSE",
    verdictColor: "#FF4444",
    icon: "🌿",
    truth: "DFW has high pollen seasons and construction dust year-round. Monthly 1-inch filter changes or quarterly 4-inch media filter changes protect your blower motor and coil from fouling.",
    tip: "Set a phone reminder on the 1st of each month to check your filter.",
  },
];

export default function DFWHVACMaintenanceMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW HVAC Maintenance Myths 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Common misconceptions that cost DFW homeowners money — busted.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {myths.map((m) => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ backgroundColor: "#122040", border: `2px solid ${selected === m.id ? "#F5E642" : "#1E3A5F"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>"{m.myth}"</p>
                  <span style={{ backgroundColor: m.verdictColor, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{m.verdict}</span>
                </div>
                <span style={{ color: "#F5E642", fontSize: 20 }}>{selected === m.id ? "▲" : "▼"}</span>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 16, borderTop: "1px solid #1E3A5F", paddingTop: 16 }}>
                  <p style={{ color: "#CBD5E1", lineHeight: 1.6, marginBottom: 12 }}>{m.truth}</p>
                  <div style={{ backgroundColor: "#0A1628", borderLeft: "3px solid #F5E642", padding: "10px 14px", borderRadius: 6 }}>
                    <p style={{ color: "#F5E642", fontSize: 13, fontWeight: 600 }}>💡 Pro Tip: {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, backgroundColor: "#122040", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔧 Get a Vetted DFW HVAC Pro</p>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>ProLnk matches you with licensed, background-checked HVAC contractors in your Dallas-Fort Worth zip code.</p>
        </div>
      </div>
    </div>
  );
}
