import { useState } from "react";

const HARDNESS_LEVELS = [
  { label: "Moderate (10-15 gpg)", value: "moderate", saltWeeks: 6, resinMonths: 24 },
  { label: "Hard (15-20 gpg)", value: "hard", saltWeeks: 4, resinMonths: 18 },
  { label: "Very Hard (20-25 gpg)", value: "very_hard", saltWeeks: 3, resinMonths: 12 },
  { label: "Extreme (25+ gpg — Plano/Frisco)", value: "extreme", saltWeeks: 2, resinMonths: 9 },
];

const SALT_TYPES: Record<string, { type: string; reason: string }> = {
  moderate: { type: "Solar Salt Crystals", reason: "Clean dissolution, low mushing risk, good for DFW moderate hardness" },
  hard: { type: "Solar Salt or Evaporated Pellets", reason: "Evaporated pellets dissolve cleaner in DFW humidity" },
  very_hard: { type: "Evaporated Salt Pellets", reason: "High purity needed — less bridging risk in DFW humidity + heavy workload" },
  extreme: { type: "Evaporated Salt Pellets (high purity)", reason: "Maximum purity required — softener runs constantly in Plano/Frisco, bridging is a major risk" },
};

export default function DFWSoftenerMaintenanceGuide() {
  const [age, setAge] = useState("");
  const [hardness, setHardness] = useState("");
  const [result, setResult] = useState<null | { saltFreq: string; saltType: string; saltReason: string; resinFreq: string; bridgeRisk: string }>(null);

  function calculate() {
    if (!age || !hardness) return;
    const ageNum = parseInt(age);
    const level = HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const salt = SALT_TYPES[hardness];
    let bridgeRisk = "Low";
    if (hardness === "extreme" || ageNum > 8) bridgeRisk = "🔴 High — check monthly for salt bridge";
    else if (hardness === "very_hard") bridgeRisk = "⚠️ Moderate — check every 6 weeks";
    setResult({
      saltFreq: "Add salt every " + level.saltWeeks + " weeks",
      saltType: salt.type,
      saltReason: salt.reason,
      resinFreq: "Clean resin every " + level.resinMonths + " months",
      bridgeRisk,
    });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "6px 14px", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧂 Water Softener Maintenance — DFW</h1>
        <p style={{ color: "#94A3B8″, marginBottom: 24, lineHeight: 1.6 }}>
          DFW has some of the hardest tap water in the United States. Your softener works 2-3x harder than units in softer-water cities, meaning maintenance windows shrink significantly. DFW&apos;s humidity also triggers salt bridges — a crust that forms across the tank, leaving water unsoftened.
        </p>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📊 Your DFW Maintenance Schedule</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>Softener Age (years)</label>
              <input type="number" min={0} max={25} value={age} onChange={e => setAge(e.target.value)}
                style={{ width: "100%", background: "#1E2D42″, border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>DFW Water Hardness</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)}
                style={{ width: "100%", background: "#1E2D42″, border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="">Select hardness level</option>
                {HARDNESS_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Generate My Maintenance Plan
            </button>
          </div>
        </div>
        {result && (
          <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>Your DFW Softener Plan</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>SALT SCHEDULE</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.saltFreq}</div>
              </div>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>RESIN CLEANING</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.resinFreq}</div>
              </div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>SALT TYPE FOR YOUR DFW WATER</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F5E642″, marginBottom: 4 }}>{result.saltType}</div>
              <div style={{ fontSize: 13, color: "#94A3B8″ }}>{result.saltReason}</div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>SALT BRIDGE RISK (DFW HUMIDITY FACTOR)</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{result.bridgeRisk}</div>
            </div>
          </div>
        )}
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🌉 The Salt Bridge Problem (DFW-Specific)</h3>
          <p style={{ fontSize: 13, color: "#94A3B8″, lineHeight: 1.6, marginBottom: 8 }}>
            DFW humidity causes salt crystals to fuse into a hard crust across the brine tank. The crust looks like salt level is fine, but water cannot reach the salt below — your softener runs regeneration cycles but produces zero soft water.
          </p>
          <div style={{ display: "grid", gap: 6, fontSize: 13 }}>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 10 }}>🔍 Test: Press down on salt surface. If it does not give, you have a bridge.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 10 }}>🔨 Fix: Use a broom handle to break crust — do not use sharp tools near tank walls.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 10 }}>🛡️ Prevent: Keep tank under 50% full, use high-purity pellets, check monthly in DFW.</div>
          </div>
        </div>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>❌ Signs Your DFW Softener Is Failing</h3>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#94A3B8″ }}>
            <div>🧼 Soap no longer lathers well = hard water passing through</div>
            <div>🧱 Scale returning on fixtures = softener not regenerating</div>
            <div>🦺 Resin beads in water = broken resin tank (replace unit)</div>
            <div>💰 Water bill spiking = softener regenerating too frequently</div>
          </div>
        </div>
      </div>
    </div>
  );
}
