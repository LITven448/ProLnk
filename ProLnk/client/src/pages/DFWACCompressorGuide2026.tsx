import { useState } from 'react';

const symptoms = [
  "AC runs but no cooling",
  "Loud banging or clanking on startup",
  "Trips breaker repeatedly",
  "Hard start / slow to start",
  "Refrigerant leak confirmed",
  "System over 12 years old",
];

export default function DFWACCompressorGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState("");

  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const evaluate = () => {
    if (selected.length === 0) { setResult("Select at least one symptom."); return; }
    const severeSymptoms = ["Loud banging or clanking on startup", "Trips breaker repeatedly", "Refrigerant leak confirmed"];
    const hasSevere = selected.some(s => severeSymptoms.includes(s));
    const isOld = selected.includes("System over 12 years old");
    const hardStart = selected.includes("Hard start / slow to start");

    if (hasSevere && isOld) {
      setResult("High likelihood of compressor failure — replacement recommended. DFW heat accelerates compressor wear. If the unit is 12+ years old and showing mechanical symptoms, replacing the full system is more cost-effective than a compressor swap ($1,200-$2,500 for compressor vs $5,500-$9,000 for new system with warranty). Get 3 quotes from licensed HVAC contractors.");
    } else if (hardStart && !isOld) {
      setResult("Hard Start Kit recommended first. A hard start capacitor kit ($150-$300 installed) reduces startup current draw by 50%, extending compressor life significantly — especially in DFW heat where compressors cycle hundreds of times per month. Have a tech evaluate refrigerant charge and capacitor health too.");
    } else if (hasSevere) {
      setResult("Compressor issue detected. DFW diagnosis cost: $75-$150 service call. Compressor replacement: $1,200-$2,500 parts + labor. If refrigerant type is R-22 (pre-2010 systems), replacement is more practical as R-22 is scarce and expensive. Ask your tech about refrigerant compatibility before approving any repair.");
    } else {
      setResult("Symptoms suggest a minor issue — capacitor, refrigerant charge, or electrical. A $75-$150 diagnostic visit should identify the cause. Most DFW compressor failures follow a failing run capacitor (cheap fix: $150-$250). Have the tech check superheat and subcooling to verify proper refrigerant charge.");
    }
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚙️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW AC Compressor Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>The heart of your AC — symptoms, hard start kits, refrigerant compatibility, and when to replace vs repair</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🔧 DFW Compressor Key Facts</h2>
          {[
            ["⚙️", "Most expensive single part", "Compressor replacement: $1,200-$2,500; often triggers full system replacement"],
            ["🌡️", "DFW heat impact", "DFW compressors cycle 2,000-3,000 times/summer; heat accelerates wear on capacitors and windings"],
            ["⚡", "Hard start kit", "Reduces startup amp draw 50%; extends compressor life 2-5 years; $150-$300 installed"],
            ["🧪", "Refrigerant compatibility", "R-410A (2010+) vs R-22 (older); mixing types destroys compressor — confirm with tech"],
            ["🚨", "Replace vs repair threshold", "If compressor cost exceeds 50% of new system cost and unit is 10+ years old — replace the system"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642", fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🩺 Compressor Symptom Diagnosis</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Select all symptoms you are experiencing:</p>
          {symptoms.map(s => (
            <div key={s} onClick={() => toggle(s)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 8, background: selected.includes(s) ? "#1e3a5f" : "#162032", border: selected.includes(s) ? "1px solid #F5E642" : "1px solid #334155", cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{selected.includes(s) ? "✅" : "⬜"}</span>
              <span style={{ color: "#e2e8f0", fontSize: 14 }}>{s}</span>
            </div>
          ))}
          <button onClick={evaluate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%", marginTop: 12 }}>Diagnose Compressor Issue</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569", fontSize: 13 }}>ProLnk · DFW AC Compressor Expertise · 2026</div>
      </div>
    </div>
  );
}
