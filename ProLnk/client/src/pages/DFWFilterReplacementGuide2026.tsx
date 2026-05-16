import { useState } from 'react';

type SystemType = "Central Air Handler (Closet)" | "Central Air Handler (Attic)" | "Return Air Grille (Wall)" | "Window Unit" | "Mini-Split";

const GUIDES: Record<SystemType, { location: string; steps: string[]; sizes: string; reminder: string }> = {
  "Central Air Handler (Closet)": {
    location: "Filter slot on the air handler unit itself, typically at the top or side where large duct connects",
    steps: ["Turn off thermostat (set to OFF)", "Open air handler door or filter slot cover", "Note airflow direction arrow on current filter", "Slide old filter out carefully — hold over trash bag", "Insert new filter with arrow pointing TOWARD air handler (away from return)", "Close door/cover securely", "Turn thermostat back on", "Write install date on filter frame"],
    sizes: "Common DFW sizes: 16x20, 20x25, 16x25 — check your existing filter or measure slot",
    reminder: "DFW recommendation: replace every 30 days (not 90) — dust, pollen, and cedar are extreme here",
  },
  "Central Air Handler (Attic)": {
    location: "Filter is at the air handler unit in attic — often a bottom-mount pull-out slot",
    steps: ["Turn off thermostat", "Access attic safely — use proper ladder and lighting", "Locate filter slot on air handler", "Note arrow direction on old filter", "Remove old filter into bag to contain dust", "Insert new filter with arrow toward air handler (direction of airflow)", "Close slot cover", "Return thermostat to Auto"],
    sizes: "Attic units often use 20x25 or 20x20 — measure or check old filter",
    reminder: "DFW attics reach 140F+ in summer — check filter monthly and keep access hatch sealed",
  },
  "Return Air Grille (Wall)": {
    location: "Large wall grille (often hallway ceiling or wall) — filter is behind the grille",
    steps: ["Turn off HVAC at thermostat", "Open grille by unlatching or unscrewing corners", "Note arrow on old filter — arrow points INTO wall (toward ductwork/air handler)", "Remove old filter", "Insert new filter with arrow pointing AWAY from room (into duct)", "Latch or screw grille closed", "Reset thermostat"],
    sizes: "Return grille filters vary widely — measure opening or check existing filter label",
    reminder: "If your home has multiple return grilles, check each one — some may have filters, some may not",
  },
  "Window Unit": {
    location: "Filter is behind the front panel — pull the panel forward or lift to access",
    steps: ["Unplug window unit from outlet", "Remove or open front panel per unit instructions", "Slide out foam filter panel", "Wash foam filter with warm soapy water", "Rinse thoroughly, let dry COMPLETELY before reinstalling", "Reinsert filter and close panel", "Plug back in"],
    sizes: "Most window unit filters are washable foam — reuse after cleaning, replace if torn",
    reminder: "DFW dust clogs window unit filters fast — clean monthly during cooling season (April-October)",
  },
  "Mini-Split": {
    location: "Filters are inside the indoor wall unit — behind the front panel that swings open",
    steps: ["Turn off mini-split at remote or panel", "Lift front panel upward to open", "Slide out filter panels (usually 2)", "Vacuum loose dust, wash with warm water", "Let dry completely — wet filters damage unit", "Reinsert panels and close front cover", "Power back on"],
    sizes: "Mini-split filters are washable mesh panels — do not replace, only clean",
    reminder: "Mini-split filters need cleaning every 2-4 weeks during DFW summer — dirty filters ice up the coil",
  },
};

export default function DFWFilterReplacementGuide2026() {
  const [system, setSystem] = useState<SystemType>("Central Air Handler (Closet)");
  const guide = GUIDES[system];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK - DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌬️ DFW Air Filter Replacement Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Step-by-step HVAC filter replacement for DFW homes. Select your system type.</p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>SELECT YOUR SYSTEM TYPE</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(GUIDES) as SystemType[]).map((s) => (
              <button key={s} onClick={() => setSystem(s)} style={{ padding: "8px 12px", borderRadius: 8, border: "2px solid", borderColor: system === s ? "#F5E642" : "#1e3a5f", background: system === s ? "#F5E642" : "transparent", color: system === s ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 11 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📍 FILTER LOCATION</div>
          <div style={{ color: "#e2e8f0", fontSize: 14 }}>{guide.location}</div>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 12 }}>📋 STEP-BY-STEP</div>
          <ol style={{ margin: 0, paddingLeft: 20, color: "#e2e8f0", lineHeight: 2, fontSize: 14 }}>
            {guide.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📐 COMMON FILTER SIZES</div>
          <div style={{ color: "#e2e8f0", fontSize: 14 }}>{guide.sizes}</div>
        </div>

        <div style={{ background: "#162d4a", borderRadius: 12, padding: 20, border: "1px solid #F5E642" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 8 }}>⚠️ DFW REMINDER</div>
          <div style={{ color: "#fef9c3", fontSize: 14, lineHeight: 1.6 }}>{guide.reminder}</div>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk - Connecting DFW Homeowners with Trusted Pros - prolnk.io</div>
      </div>
    </div>
  );
}