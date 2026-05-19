import { useState } from "react";

const MACHINE_TYPES = [
  { label: "Front-Load", value: "front" },
  { label: "Top-Load (Agitator)", value: "top_agitator" },
  { label: "Top-Load (HE / No Agitator)", value: "top_he" },
];

const HARDNESS_LEVELS = [
  { label: "Moderate (10-15 gpg)", value: "moderate", drumMonths: 3, hoseYears: 5 },
  { label: "Hard (15-20 gpg)", value: "hard", drumMonths: 2, hoseYears: 4 },
  { label: "Very Hard (20-25 gpg)", value: "very_hard", drumMonths: 1, hoseYears: 3 },
  { label: "Extreme (25+ gpg — Plano/Frisco)", value: "extreme", drumMonths: 1, hoseYears: 3 },
];

const MACHINE_TIPS: Record<string, { moldRisk: string; detergentNote: string; cleanMethod: string }> = {
  front: {
    moldRisk: "🔴 HIGH — DFW humidity + front-load door seal = prime mold conditions. Leave door open always.",
    detergentNote: "Use HE detergent only, use LESS than label says — DFW hard water creates extra soap scum",
    cleanMethod: "Affresh tablet or citric acid monthly cycle + wipe drum seal with vinegar weekly",
  },
  top_agitator: {
    moldRisk: "Low — open design resists mold well in DFW humidity",
    detergentNote: "Standard detergent, reduce by 25% — hard water reduces lather but soap buildup is real",
    cleanMethod: "Citric acid or Affresh tablet every 2-3 months, wipe under agitator base",
  },
  top_he: {
    moldRisk: "Moderate — closed drum traps humidity in DFW conditions",
    detergentNote: "HE detergent required, use minimum dose — DFW water makes excess suds a bigger problem",
    cleanMethod: "Monthly Affresh tablet + wipe drum rim and gasket area quarterly",
  },
};

export default function DFWWashingMachineGuide() {
  const [machineType, setMachineType] = useState("");
  const [hardness, setHardness] = useState("");
  const [result, setResult] = useState<null | { drumFreq: string; hoseLife: string; moldRisk: string; detergentNote: string; cleanMethod: string }>(null);

  function calculate() {
    if (!machineType || !hardness) return;
    const level = HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const tips = MACHINE_TIPS[machineType];
    setResult({
      drumFreq: "Clean drum every " + level.drumMonths + " month" + (level.drumMonths > 1 ? "s" : ""),
      hoseLife: "Replace hoses every " + level.hoseYears + " years (DFW mineral stress)",
      moldRisk: tips.moldRisk,
      detergentNote: tips.detergentNote,
      cleanMethod: tips.cleanMethod,
    });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "6px 14px", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧺 Washing Machine Guide — DFW</h1>
        <p style={{ color: "#94A3B8″, marginBottom: 24, lineHeight: 1.6 }}>
          Two DFW-specific issues attack your washing machine: hard water creates soap scum and mineral scale inside the drum and hoses, while DFW&apos;s humidity turns front-load washer door seals into mold factories. This guide addresses both.
        </p>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📊 Your DFW Washer Maintenance Plan</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>Machine Type</label>
              <select value={machineType} onChange={e => setMachineType(e.target.value)}
                style={{ width: "100%", background: "#1E2D42″, border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="">Select machine type</option>
                {MACHINE_TYPES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
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
              Build My Washer Plan
            </button>
          </div>
        </div>
        {result && (
          <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>Your DFW Washer Recommendations</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>DRUM CLEANING</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.drumFreq}</div>
              </div>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>FILL HOSE LIFESPAN</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.hoseLife}</div>
              </div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>MOLD RISK — DFW HUMIDITY FACTOR</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.moldRisk}</div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>DETERGENT NOTE FOR DFW WATER</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.detergentNote}</div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>CLEANING METHOD</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.cleanMethod}</div>
            </div>
          </div>
        )}
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🧴 DFW Hard Water and Laundry Detergent</h3>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>Hard water reduces soap lather — many DFW residents use too much detergent to compensate, creating residue buildup in drum, pump filter, and on clothes.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>Use liquid detergent over powder in DFW — powder does not dissolve as completely in hard water.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>Add 1/2 cup washing soda (not baking soda) to boost detergent effectiveness in hard DFW water without oversudsing.</div>
          </div>
        </div>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>⚠️ DFW-Specific Warning Signs</h3>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#94A3B8″ }}>
            <div>🦠 Musty smell from front-load = mold in door seal — clean with bleach solution immediately</div>
            <div>🟡 Gray or stiff laundry = soap scum from excess detergent + hard water combination</div>
            <div>💧 Water pooling under machine = fill hose mineral crack — replace immediately</div>
            <div>🔊 Rattling during spin = loose hose fitting stressed by DFW water pressure and mineral buildup</div>
          </div>
        </div>
      </div>
    </div>
  );
}
