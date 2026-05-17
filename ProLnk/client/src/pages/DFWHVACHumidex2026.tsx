import { useState } from 'react';

const situations = [
  { id: "stuffy", label: "House feels stuffy at 75°F — but thermostat says it's right", result: "Classic DFW humidity problem. Your HVAC is hitting the temp target but not removing enough moisture. Ideal indoor RH is 45–50%. Above 55%, 75°F feels like 82°F. Have your HVAC tech check the evaporator coil — it should be producing 1–2 gallons of condensate per hour in DFW summer." },
  { id: "sweating", label: "Windows or walls sweating on inside", result: "Indoor humidity is too high — likely above 60% RH. In DFW, this means your AC is short-cycling (not running long enough to dehumidify) or the evaporator is dirty. A whole-home dehumidifier ($1,200–2,000 installed) solves this for homes that can't maintain RH with AC alone." },
  { id: "feelshot", label: "Family says 95°F outside feels worse than 100°F days last year", result: "Humidity is the difference. 95°F at 60% humidity = heat index of 114°F. 100°F at 30% = heat index of 103°F. DFW humidity spikes after rain events — check the heat index, not just temp. Your HVAC should keep indoor RH below 50% even on these days." },
  { id: "musty", label: "Musty smell when AC runs", result: "Mold or mildew in the ductwork or on the evaporator coil — common in DFW when humidity stays high. Have the coil cleaned and ducts inspected. Left untreated, this circulates spores through the home. UV light sanitizers ($300–600) are a long-term fix." },
  { id: "comfort", label: "Home feels comfortable but utility bill is very high", result: "Your system may be oversized. Oversized AC cools quickly but short-cycles — never runs long enough to dehumidify properly, and uses more energy per hour. DFW homes need Manual J load calculations to properly size replacement equipment." },
];

export default function DFWHVACHumidex2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>💧 DFW Humidity & Heat Index Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.6 }}>
          In DFW, your HVAC fights two battles: temperature AND humidity. At 95°F and 50% humidity, the heat index hits 107°F. A properly functioning system maintains 75°F AND 45–50% relative humidity — that's what comfort actually means in North Texas.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌡️", label: "Target Indoor Temp", val: "75°F" },
            { icon: "💧", label: "Target Indoor RH", val: "45–50%" },
            { icon: "🥵", label: "95°F + 50% RH Feels Like", val: "107°F" },
            { icon: "😌", label: "75°F + 47% RH Feels Like", val: "75°F" },
          ].map(card => (
            <div key={card.label} style={{ background: "#111d35", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{card.icon}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{card.label}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "0.95rem" }}>{card.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642", marginBottom: "1rem" }}>🔍 What's Your DFW Comfort Situation?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? "#1e3a5f" : "#111d35", border: `2px solid ${selected === s.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: "0.5rem" }}>🌬️ Guide</div>
            <p style={{ color: "#e2e8f0", lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}
      </div>
    </div>
  );
}