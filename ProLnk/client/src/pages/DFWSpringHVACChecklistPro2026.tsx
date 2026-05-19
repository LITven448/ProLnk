import { useState } from 'react';

const systemTypes: Record<string, string[]> = {
  "Central Split System": [
    "🔲 Replace or clean air filter — install new before startup",
    "🔲 Clean evaporator coil — use no-rinse cleaner, let drain",
    "🔲 Clean condenser coil — flush fins top-down with low pressure",
    "🔲 Check refrigerant charge — subcooling and superheat targets per manufacturer",
    "🔲 Tighten all electrical connections — vibration loosens terminals over winter",
    "🔲 Calibrate thermostat — compare to calibrated thermometer",
    "🔲 Flush condensate drain — pour bleach solution, verify flow",
    "🔲 Clear 24\" clearance around outdoor unit",
    "🔲 First cool-down run: verify 18-22°F differential supply vs return",
    "🔲 Document findings in ProLnk job record",
  ],
  "Heat Pump": [
    "🔲 Replace filter — heat pumps run year-round, filters load faster",
    "🔲 Inspect reversing valve operation — test heat and cool modes",
    "🔲 Check refrigerant — heat pumps show charge issues faster in spring",
    "🔲 Clean both indoor and outdoor coils",
    "🔲 Flush condensate drain and check float switch",
    "🔲 Verify defrost board operation — run test cycle if available",
    "🔲 Check auxiliary heat strips — confirm no corrosion or burnout",
    "🔲 Temperature differential: 15-20°F in cooling mode",
    "🔲 Document all mode test results in ProLnk record",
  ],
  "Package Unit": [
    "🔲 Replace filter — access panel before any other work",
    "🔲 Clean both coils — package units trap more debris",
    "🔲 Inspect ductwork connection at unit — clay soil movement common in DFW",
    "🔲 Check refrigerant charge — subcooling/superheat",
    "🔲 Inspect drain pan and drain line — package units prone to standing water",
    "🔲 Test all electrical connections — package units vibrate more",
    "🔲 Verify economizer damper operation if equipped",
    "🔲 Temperature differential check at supply register",
    "🔲 Document unit condition and findings in ProLnk record",
  ],
  "Mini-Split": [
    "🔲 Clean washable filter in each head — rinse, dry, reinstall",
    "🔲 Clean indoor coil with coil cleaner spray",
    "🔲 Clean outdoor unit — clear debris from fins",
    "🔲 Check lineset insulation — DFW UV degrades it fast",
    "🔲 Verify refrigerant charge — mini-splits show overcharge symptoms in spring",
    "🔲 Test all operating modes from remote and app",
    "🔲 Check condensate drain at each head",
    "🔲 Verify temperature differential per head",
    "🔲 Document each zone condition separately in ProLnk record",
  ],
};

const types = Object.keys(systemTypes);

export default function DFWSpringHVACChecklistPro2026() {
  const [type, setType] = useState<string>(types[0]);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🌿</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>
            DFW Spring HVAC Pre-Season Checklist for Pros 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            DFW spring startup is your window to find problems before the 100°F days hit. Charter pros complete this full checklist on every spring visit.
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>Select System Type → Spring Startup Checklist</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: type === t ? "#F5E642″ : "#1a2f55",
                  color: type === t ? "#0A1628″ : "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {systemTypes[type].map((item, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#e2e8f0", border: "1px solid #1e3a5f" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>📋 Spring Scheduling Tip for DFW Pros</h2>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>
            March–April is your high-volume window. ProLnk Charter pros get priority match routing during pre-season demand spikes. Block your calendar in 2-hour windows and set availability in the app to capture the surge.
          </p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>Join ProLnk Charter — DFW HVAC Pros</p>
          <p style={{ color: "#1a2f55″, fontSize: 14, margin: 0 }}>Founding slots available at prolnk.io — waitlist closes at 500 Charter members</p>
        </div>
      </div>
    </div>
  );
}

