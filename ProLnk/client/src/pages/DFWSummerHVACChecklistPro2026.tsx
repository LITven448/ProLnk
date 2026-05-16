import { useState } from 'react';

const systemAgeMap: Record<string, string[]> = {
  "0-5 years": [
    "✅ Check refrigerant charge with manifold gauges — new systems rarely need recharge",
    "✅ Clean evaporator and condenser coils — DFW dust loads fast",
    "✅ Read capacitor μF — replace if within 10% of rated value",
    "✅ Inspect contactor for pitting — replace if arcing visible",
    "✅ Flush condensate drain with bleach solution",
    "✅ Replace or clean filter before startup",
    "✅ Verify temperature differential 18-22°F at supply vs return",
  ],
  "6-10 years": [
    "⚠️ Refrigerant charge check critical — leaks common at this age",
    "⚠️ Capacitor replacement likely needed — DFW summers degrade faster",
    "✅ Full coil cleaning both evaporator and condenser",
    "⚠️ Inspect contactor — replace proactively if original",
    "✅ Flush condensate drain — check float switch operation",
    "⚠️ Check blower motor amperage draw vs nameplate",
    "✅ Inspect electrical connections for oxidation",
    "✅ Temperature differential check — flag if under 16°F",
  ],
  "11-15 years": [
    "🔴 Refrigerant charge — document R22 vs 410A, inform homeowner of phase-out",
    "🔴 Replace capacitor as standard — do not test only",
    "🔴 Replace contactor proactively",
    "⚠️ Coil cleaning — check for coil damage, corrosion",
    "⚠️ Blower motor — check bearings, amperage draw",
    "⚠️ Condensate pan — check for rust, crack, or mold",
    "⚠️ Recommend full system eval — unit likely near EOL",
  ],
  "16+ years": [
    "🔴 Full system assessment — present replacement options",
    "🔴 Capacitor and contactor replacement standard",
    "🔴 Refrigerant charge — check for major leak before recharging",
    "🔴 Condensate pan likely corroded — inspect for bypass leaks",
    "⚠️ Document all findings for homeowner records and Home Health Vault",
    "⚠️ Efficiency calculation — present cost-of-operation comparison for new system",
  ],
};

const ages = Object.keys(systemAgeMap);

export default function DFWSummerHVACChecklistPro2026() {
  const [age, setAge] = useState<string>(ages[0]);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>❄️</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>
            DFW Summer HVAC Tune-Up Checklist for Pros 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            DFW summer kills capacitors, starves refrigerant charge, and clogs drains. Charter pros run this checklist on every tune-up — no exceptions.
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>Select System Age → Get Pro Checklist</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {ages.map(a => (
              <button
                key={a}
                onClick={() => setAge(a)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: age === a ? "#F5E642" : "#1a2f55",
                  color: age === a ? "#0A1628" : "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {systemAgeMap[age].map((item, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#e2e8f0", border: "1px solid #1e3a5f" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🌡️ DFW-Specific Reminders</h2>
          <ul style={{ color: "#94a3b8", fontSize: 14, paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>DFW ambient temps hit 105°F+ — high ambient reduces system capacity by up to 20%</li>
            <li>Capacitors rated for 85°F ambient degrade fast at DFW temps — replace proactively</li>
            <li>Condensate drains clog from clay soil dust — flush every visit</li>
            <li>Texas clay expansion/contraction can misalign ductwork — check at disconnects</li>
          </ul>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>ProLnk Charter HVAC Pros — DFW Founding Slots Open</p>
          <p style={{ color: "#1a2f55", fontSize: 14, margin: 0 }}>Join at prolnk.io — waitlist closes at 500 Charter members</p>
        </div>
      </div>
    </div>
  );
}

