import { useState } from 'react';

const systems = [
  {
    id: "residential",
    label: "🏠 DFW Residential (Split System)",
    compressor: "Scroll Compressor",
    icon: "🌀",
    desc: "Scroll compressors dominate DFW residential installs — accounting for 90%+ of new split systems. Two interlocking spirals compress refrigerant with fewer moving parts, making them quieter and more reliable in DFW heat.",
    efficiency: "16–21 SEER2″,
    lifespan: "15–20 years",
    sound: "55–65 dB",
    note: "Best choice for North Texas homes under 5,000 sq ft. Handles DFW summer peak loads reliably.",
  },
  {
    id: "minisplit",
    label: "🏡 Ductless Mini-Split",
    compressor: "Rotary Compressor",
    icon: "🔄",
    desc: "Rotary compressors are compact and oil-injected — ideal for the smaller, high-frequency mini-split units used in DFW additions, garages, and sunrooms. They cycle continuously rather than using large on/off swings.",
    efficiency: "20–30 SEER2″,
    lifespan: "12–18 years",
    sound: "45–55 dB",
    note: "Preferred for DFW rooms without ductwork. Very efficient but smaller capacity per unit.",
  },
  {
    id: "premium",
    label: "⭐ Premium Variable Speed",
    compressor: "Variable Speed Scroll",
    icon: "🎛️",
    desc: "Variable speed scroll compressors modulate output from 25–100%, running at low capacity on DFW mild days and ramping up for peak heat. This eliminates the large energy spikes of single-stage systems and dramatically reduces humidity.",
    efficiency: "21–26 SEER2″,
    lifespan: "18–22 years",
    sound: "50–58 dB",
    note: "Best long-term ROI in DFW — humidity control is a major benefit in spring/fall shoulder seasons.",
  },
  {
    id: "older",
    label: "🔧 Older System (Pre-2010)",
    compressor: "Reciprocating Compressor",
    icon: "⚙️",
    desc: "Reciprocating (piston-style) compressors were standard before scroll technology matured. Louder, heavier, and less efficient. Most DFW reciprocating systems are now at end of useful life given the extreme summer thermal load.",
    efficiency: "8–12 SEER",
    lifespan: "10–15 years",
    sound: "65–75 dB",
    note: "If your DFW system is pre-2010 with reciprocating compressor, replacement ROI is typically under 5 years.",
  },
];

export default function DFWHVACCompressorTypes2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = systems.find(s => s.id === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          ❄️ DFW HVAC INTELLIGENCE 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>AC Compressor Types Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          The compressor is the heart of your DFW AC system. Understanding which type you have determines expected lifespan, efficiency ratings, and whether your system can handle 100°F+ Texas summers effectively.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
          {systems.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? "#F5E642″ : "#111f3c", color: selected === s.id ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.7rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {match ? (
          <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{match.icon}</div>
            <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#F5E642″, marginBottom: "0.5rem" }}>{match.compressor}</div>
            <p style={{ color: "#cbd5e1″, fontSize: 15, lineHeight: 1.7, marginBottom: "1.5rem" }}>{match.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              {[
                { label: "Efficiency", value: match.efficiency },
                { label: "Lifespan", value: match.lifespan },
                { label: "Sound Level", value: match.sound },
              ].map(item => (
                <div key={item.label} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", textAlign: "center" }}>
                  <div style={{ color: "#94a3b8″, fontSize: 12, marginBottom: "0.3rem" }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: "#F5E642″ }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>🌡️ DFW Note</div>
              <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>{match.note}</p>
            </div>
          </div>
        ) : (
          <div style={{ background: "#111f3c", borderRadius: 10, padding: "2rem", marginBottom: "2rem", textAlign: "center", color: "#475569″ }}>
            Select your system type above to see compressor details
          </div>
        )}

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.25rem" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>⚡ DFW Efficiency Reality</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            DFW homes run AC 7–9 months per year. Moving from a 10 SEER reciprocating system to a 20 SEER variable scroll can cut cooling costs by 50%+. At average DFW electricity rates of $0.13/kWh and 3-ton systems, this is $600–900 annually in savings.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: 13 }}>
          ProLnk · DFW HVAC Intelligence · 2026
        </div>
      </div>
    </div>
  );
}