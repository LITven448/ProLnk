import { useState } from "react";

const HARDNESS_LEVELS = [
  { label: "Moderate (10-15 gpg)", value: "moderate", cleanMonths: 3, oring: "3-4 years" },
  { label: "Hard (15-20 gpg)", value: "hard", cleanMonths: 2, oring: "2-3 years" },
  { label: "Very Hard (20-25 gpg)", value: "very_hard", cleanMonths: 1, oring: "1-2 years" },
  { label: "Extreme (25+ gpg — Plano/Frisco)", value: "extreme", cleanMonths: 1, oring: "1-2 years" },
];

const REPLACEMENT_THRESHOLDS: Record<string, number> = {
  moderate: 12,
  hard: 10,
  very_hard: 8,
  extreme: 7,
};

export default function DFWDisposalMaintenanceGuide() {
  const [age, setAge] = useState("");
  const [hardness, setHardness] = useState("");
  const [result, setResult] = useState<null | {
    cleanFreq: string; oringLife: string; replaceAdvice: string; steps: string[]
  }>(null);

  function calculate() {
    if (!age || !hardness) return;
    const ageNum = parseInt(age);
    const level = HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const replaceAge = REPLACEMENT_THRESHOLDS[hardness];
    let replaceAdvice = "Unit in good service life range for DFW";
    if (ageNum >= replaceAge) replaceAdvice = "🔴 Replace now — past DFW water-adjusted service life (" + replaceAge + " years)";
    else if (ageNum >= replaceAge - 2) replaceAdvice = "⚠️ Plan replacement in 1-2 years — approaching DFW lifespan limit";
    setResult({
      cleanFreq: "Deep clean every " + level.cleanMonths + " month" + (level.cleanMonths > 1 ? "s" : ""),
      oringLife: "O-ring inspection every " + level.oring,
      replaceAdvice,
      steps: [
        "🧊 Ice cube method: dump 2 cups of ice + 1 cup rock salt, run 30 seconds — sharpens impellers and scrubs mineral scale",
        "🍋 Citric acid flush: dissolve 2 tbsp citric acid in 2 cups hot water, pour in with disposal off — let sit 15 min, flush",
        "🪥 Rubber splash guard: remove and scrub both sides monthly — mineral scale and food debris accumulate on underside",
        "🔩 Check mounting ring annually: DFW hard water corrodes the metal ring faster than soft-water markets",
        "💧 Always run cold water during use — hot water melts grease that then solidifies with scale deposits",
        "🌿 Deodorize: freeze citrus peels in ice cubes — citric acid + abrasion cleans and deodorizes simultaneously",
      ],
    });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "6px 14px", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚙️ Garbage Disposal Maintenance — DFW</h1>
        <p style={{ color: "#94A3B8″, marginBottom: 24, lineHeight: 1.6 }}>
          DFW&apos;s hard water creates mineral scale inside your disposal chamber over time — reducing grinding effectiveness, clogging the drain path, and attacking the O-ring seal. Disposals in DFW typically last 7-10 years vs the national average of 12+.
        </p>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📊 Your DFW Disposal Maintenance Plan</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>Disposal Age (years)</label>
              <input type="number" min={0} max={20} value={age} onChange={e => setAge(e.target.value)}
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
              Generate My Disposal Plan
            </button>
          </div>
        </div>
        {result && (
          <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>Your DFW Disposal Results</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>CLEANING FREQUENCY</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.cleanFreq}</div>
              </div>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>O-RING CHECK</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.oringLife}</div>
              </div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>REPLACEMENT OUTLOOK</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{result.replaceAdvice}</div>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>DFW Cleaning Steps</h3>
            {result.steps.map((step, i) => (
              <div key={i} style={{ background: "#1E2D42″, borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 6, lineHeight: 1.5 }}>{step}</div>
            ))}
          </div>
        )}
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🔧 What DFW Hard Water Does to O-Rings</h3>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>Calcium and magnesium ions in DFW water attack rubber O-rings over time — causing brittleness and micro-cracking that eventually leads to leaks under the sink.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>DFW O-rings fail 30-50% faster than in soft-water markets — inspect annually and replace at first sign of cracking or deformation.</div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12, color: "#94A3B8" }}>Replacement O-ring kits cost $5-15 and prevent water damage to cabinet floors — a common DFW insurance claim.</div>
          </div>
        </div>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>❌ Signs Your DFW Disposal Needs Attention</h3>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#94A3B8″ }}>
            <div>🐌 Slower grinding than before = impeller scale buildup — do ice + citric acid treatment</div>
            <div>💧 Dripping under sink = O-ring failure from mineral degradation</div>
            <div>🔊 Humming but not spinning = jammed by scale + food debris mix — use reset and wrench key</div>
            <div>🦠 Persistent odor after cleaning = deep mineral scale trapping organic matter — professional descale needed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
