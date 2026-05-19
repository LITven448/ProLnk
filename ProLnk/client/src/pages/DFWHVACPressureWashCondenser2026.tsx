import { useState } from 'react';

const conditionOptions = [
  {
    condition: "End of season (before summer)",
    diy: true,
    pro: false,
    steps: [
      "Turn off power at disconnect box first",
      "Remove large debris by hand — leaves, cottonwood, sticks",
      "Rinse coil fins from inside-out with garden hose (low pressure)",
      "Use commercial coil cleaner spray — let foam work 5-10 minutes",
      "Rinse again inside-out until water runs clear",
      "Allow to dry before restoring power"
    ],
    warnings: ["Never pressure wash from outside — bends aluminum fins", "Never use bleach — corrodes copper and aluminum"],
    when: "March/April before first cooling demand — DFW cottonwood season is peak clog time"
  },
  {
    condition: "After cottonwood season (May-June)",
    diy: true,
    pro: false,
    steps: [
      "Inspect coil fins — cottonwood fibers mat and block airflow",
      "Use soft brush or shop vac to remove fiber buildup",
      "Rinse fins from inside-out — do NOT power wash",
      "Check refrigerant line insulation for cottonwood accumulation",
      "Restore power and verify airflow is strong"
    ],
    warnings: ["Cottonwood matting can reduce efficiency 20-30%", "Don't neglect — blocked condenser = compressor failure risk"],
    when: "After visible cottonwood accumulation — usually late May in DFW"
  },
  {
    condition: "Heavily soiled or bent fins",
    diy: false,
    pro: true,
    steps: [
      "Call HVAC pro — fin straightening requires a fin comb tool",
      "Pro will perform chemical coil clean (stronger than DIY products)",
      "Fin comb straightens bent aluminum fins to restore airflow",
      "Check refrigerant charge after cleaning (efficiency test)",
      "Pro documents condition for insurance/warranty records"
    ],
    warnings: ["Bent fins reduce efficiency — can add 15-25% to cooling cost", "Do not attempt fin comb without training — can puncture coil"],
    when: "After hail events or if unit looks visually damaged"
  },
  {
    condition: "After hail event",
    diy: false,
    pro: true,
    steps: [
      "Do not attempt DIY cleaning after hail",
      "Call HVAC tech + your insurance adjuster",
      "Tech documents hail damage with photos before cleaning",
      "Insurance may cover full unit replacement if fins are severely damaged",
      "Coil replacement cost: $800-2,500 — usually covered by homeowner's insurance"
    ],
    warnings: ["Cleaning before documentation may void insurance claim", "DFW hail is the #1 cause of condenser replacement"],
    when: "Immediately after any hail event — check your unit within 48 hours"
  }
];

export default function DFWHVACPressureWashCondenser2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const opt = selected !== null ? conditionOptions[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>🌀 AC Condenser Cleaning Guide</h1>
        <p style={{ color: "#9BA3B8″, marginBottom: 28, lineHeight: 1.6 }}>
          Your outdoor DFW condenser battles 105°F heat, cottonwood, and hail. Keeping it clean can cut cooling bills 10-20%. The key rule: never pressure wash from outside.
        </p>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "2px solid #EF4444" }}>
          <h2 style={{ fontSize: 16, color: "#EF4444″, marginBottom: 12 }}>🚫 The #1 DFW Mistake</h2>
          <p style={{ color: "#C8CEDF", marginBottom: 8 }}>
            <strong style={{ color: "#FFFFFF" }}>Never pressure wash your condenser from the outside.</strong> The aluminum fins are incredibly delicate — even low-pressure washing from outside will bend them, blocking airflow and reducing efficiency permanently.
          </p>
          <p style={{ color: "#9BA3B8″, fontSize: 13 }}>
            ✅ Always rinse from <strong style={{ color: "#F5E642″ }}>inside out</strong> — remove the top panel, direct water downward through the coil from the inside.
          </p>
        </div>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 14 }}>🔧 Select Your Cleaning Situation</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {conditionOptions.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, background: selected === i ? "#0D1F3C" : "#0A1628″,
                  border: `1px solid ${selected === i ? "#F5E642" : "#2A3A5A"}`, color: "#E8EAF0″, cursor: "pointer", fontSize: 14 }}>
                <div>{c.condition}</div>
                <div style={{ fontSize: 12, color: "#9BA3B8″, marginTop: 2 }}>{c.when}</div>
              </button>
            ))}
          </div>
        </div>

        {opt && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: `2px solid ${opt.pro ? "#EF4444" : "#F5E642"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ color: "#FFFFFF", margin: 0 }}>{opt.condition}</h3>
              <span style={{ background: opt.pro ? "#EF4444″ : "#22C55E", color: "#FFFFFF", borderRadius: 6, padding: "4px 10px", fontWeight: 700, fontSize: 12 }}>
                {opt.pro ? "CALL A PRO" : "DIY OK"}
              </span>
            </div>
            <ol style={{ color: "#C8CEDF", paddingLeft: 20, lineHeight: 2, marginBottom: 14 }}>
              {opt.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div style={{ padding: 12, background: "#1A0A0A", borderRadius: 8 }}>
              <div style={{ color: "#EF4444″, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>⚠️ Warnings:</div>
              {opt.warnings.map((w, i) => (
                <div key={i} style={{ color: "#9BA3B8″, fontSize: 13 }}>• {w}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33″, borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642″ }}>ProLnk DFW:</strong> All ProLnk HVAC pros offer condenser cleaning and coil service. Book a certified tech and get quotes within 24 hours.
        </div>
      </div>
    </div>
  );
}