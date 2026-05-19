import { useState } from 'react';

const useCases = [
  "Window AC unit (5,000-12,000 BTU)",
  "Space heater",
  "Holiday / string lights (outdoor)",
  "Power tools (workshop/garage)",
  "Home office equipment",
  "Outdoor patio lights",
  "Refrigerator / large appliance",
  "EV charger (Level 1)",
];

type ComplianceLevel = "safe" | "caution" | "danger";

const checks: Record<string, { compliance: ComplianceLevel; gauge: string; gfci: boolean; maxLength: string; recommendation: string }> = {
  "Window AC unit (5,000-12,000 BTU)": { compliance: "danger", gauge: "12 AWG minimum (20A rated)", gfci: false, maxLength: "6 feet max", recommendation: "DFW summers = AC running 12+ hrs/day. Extension cord = fire risk. Install a dedicated 20A circuit instead. ~$200-400 with electrician." },
  "Space heater": { compliance: "danger", gauge: "12 AWG minimum", gfci: false, maxLength: "Do not use", recommendation: "Space heaters + extension cords = leading cause of home fires. NEVER use extension cord. Plug directly into wall outlet only." },
  "Holiday / string lights (outdoor)": { compliance: "caution", gauge: "16 AWG minimum outdoor-rated", gfci: true, maxLength: "25 feet max per run", recommendation: "DFW outdoor humidity requires outdoor-rated GFCI extension cords. Use weatherproof cords rated for outdoor use. Do not daisy-chain more than 3 strands." },
  "Power tools (workshop/garage)": { compliance: "caution", gauge: "12 AWG (yellow jacket) for high-draw tools", gfci: false, maxLength: "50 feet max", recommendation: "Use 12 AWG yellow jacket extension cords for saws, compressors. DFW garages often lack dedicated circuits — consider adding one for workshop." },
  "Home office equipment": { compliance: "safe", gauge: "14 AWG minimum (surge protector preferred)", gfci: false, maxLength: "15 feet max", recommendation: "Use a quality surge protector, not a basic power strip. ERCOT grid events can spike voltage. Protects computers and monitors." },
  "Outdoor patio lights": { compliance: "safe", gauge: "16 AWG outdoor-rated", gfci: true, maxLength: "25 feet", recommendation: "Must use GFCI extension cord outdoors. DFW humidity and rain require weatherproof rated cords. Replace any cracked or brittle outdoor cords (heat degrades them)." },
  "Refrigerator / large appliance": { compliance: "danger", gauge: "Not recommended — ever", gfci: false, maxLength: "Do not use", recommendation: "Refrigerators should ONLY be plugged directly into a dedicated outlet. Extension cords cause motor damage and fire risk. Call electrician to add outlet if needed." },
  "EV charger (Level 1)": { compliance: "danger", gauge: "Not recommended", gfci: false, maxLength: "Do not use", recommendation: "Level 1 EV chargers draw 12A continuously for 8-12 hours. Extension cords overheat with sustained draws. Install dedicated 20A outlet in garage. ~$150-300 with electrician." },
};

const complianceStyle: Record<ComplianceLevel, { bg: string; border: string; label: string }> = {
  safe: { bg: "#0a2a0a", border: "#22c55e", label: "✅ Generally Safe" },
  caution: { bg: "#1a1a00", border: "#eab308", label: "⚠️ Use with Caution" },
  danger: { bg: "#7f1d1d", border: "#ef4444", label: "🚨 Fire Hazard — Do Not Use" },
};

export default function DFWExtensionCordSafetyGuide2026() {
  const [useCase, setUseCase] = useState("");
  const result = useCase ? checks[useCase] : null;
  const style = result ? complianceStyle[result.compliance] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 14, marginBottom: 8 }}>⚡ DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Extension Cord Safety</h1>
        <p style={{ color: "#94a3b8", marginBottom: 24 }}>DFW homes are large — extension cords seem convenient, but they cause hundreds of house fires per year in Texas. Check your use case.</p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>🔍 Safety Compliance Check</h2>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>What are you plugging in?</label>
          <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select your use case...</option>
            {useCases.map(u => <option key={u}>{u}</option>)}
          </select>

          {result && style && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: 10, padding: 18, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: style.border, marginBottom: 8 }}>{style.label}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><div style={{ fontSize: 12, color: "#94a3b8" }}>Min. Gauge</div><div style={{ fontWeight: 700 }}>{result.gauge}</div></div>
                  <div><div style={{ fontSize: 12, color: "#94a3b8" }}>GFCI Required</div><div style={{ fontWeight: 700 }}>{result.gfci ? "Yes — outdoors" : "No"}</div></div>
                  <div><div style={{ fontSize: 12, color: "#94a3b8" }}>Max Length</div><div style={{ fontWeight: 700 }}>{result.maxLength}</div></div>
                </div>
                <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{result.recommendation}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>📏 AWG Gauge Quick Guide</h2>
          {[["16 AWG (thin, light duty)","Lamps, phone chargers, string lights"],["14 AWG (medium)","TVs, computers, fans"],["12 AWG (heavy, yellow jacket)","Power tools, AC units, shop equipment"],["10 AWG (extra heavy)","Rarely needed — just add a circuit"]].map(([g, u]) => (
            <div key={g as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e3a5f", fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>{g}</span><span style={{ color: "#94a3b8" }}>{u}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
          🏅 Add a Circuit Instead — TDLR Electricians via ProLnk
        </div>
      </div>
    </div>
  );
}
