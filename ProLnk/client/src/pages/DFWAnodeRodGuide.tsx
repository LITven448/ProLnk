import { useState } from "react";

const DFW_HARDNESS_LEVELS = [
  { label: "Moderate (10-15 gpg)", value: "moderate", months: 36 },
  { label: "Hard (15-20 gpg)", value: "hard", months: 24 },
  { label: "Very Hard (20-25 gpg)", value: "very_hard", months: 18 },
  { label: "Extreme (25+ gpg — Plano/Frisco)", value: "extreme", months: 12 },
];

const ROD_TYPES: Record<string, { type: string; reason: string; cost: string }> = {
  moderate: { type: "Magnesium", reason: "Best for moderate DFW hardness — maximum protection", cost: "$20-35" },
  hard: { type: "Magnesium", reason: "Still effective — inspect annually for depletion", cost: "$20-35" },
  very_hard: { type: "Aluminum/Zinc combo", reason: "DFW hard water depletes magnesium fast", cost: "$25-45" },
  extreme: { type: "Aluminum/Zinc combo", reason: "Magnesium rods dissolve in under 2 years in Plano/Frisco water", cost: "$25-45" },
};

export default function DFWAnodeRodGuide() {
  const [age, setAge] = useState("");
  const [hardness, setHardness] = useState("");
  const [result, setResult] = useState<null | { freq: string; rodType: string; reason: string; cost: string; risk: string }>(null);

  function calculate() {
    if (!age || !hardness) return;
    const ageNum = parseInt(age);
    const level = DFW_HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const rod = ROD_TYPES[hardness];
    let risk = "Low — rod likely still active";
    if (ageNum > level.months / 12) risk = "🔴 High — rod likely depleted, tank corroding now";
    else if (ageNum > (level.months / 12) * 0.75) risk = "⚠️ Moderate — inspect immediately";
    setResult({ freq: "Every " + level.months + " months in your DFW zone", rodType: rod.type, reason: rod.reason, cost: rod.cost, risk });
  }

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#F5E642", color: "#0A1628", padding: "6px 14px", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔩 Anode Rod Guide — DFW Water Heaters</h1>
        <p style={{ color: "#94A3B8", marginBottom: 24, lineHeight: 1.6 }}>
          The anode rod is your water heater&apos;s sacrificial protector — it corrodes so the tank does not. In DFW&apos;s hard water (15-25+ gpg), anode rods deplete 40-60% faster than the national average. A depleted rod means tank rust begins immediately.
        </p>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>📊 What Type and How Often for DFW?</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8", marginBottom: 6 }}>Years Since Last Rod Check</label>
              <input type="number" min={0} max={20} value={age} onChange={e => setAge(e.target.value)}
                style={{ width: "100%", background: "#1E2D42", border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8", marginBottom: 6 }}>DFW Water Hardness</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)}
                style={{ width: "100%", background: "#1E2D42", border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="">Select hardness level</option>
                {DFW_HARDNESS_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Get My Rod Recommendation
            </button>
          </div>
        </div>
        {result && (
          <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>Your DFW Anode Rod Plan</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#1E2D42", borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>REPLACEMENT FREQUENCY</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642" }}>{result.freq}</div>
              </div>
              <div style={{ background: "#1E2D42", borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>CURRENT TANK RISK</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{result.risk}</div>
              </div>
            </div>
            <div style={{ background: "#1E2D42", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>RECOMMENDED ROD TYPE</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#F5E642", marginBottom: 4 }}>{result.rodType}</div>
              <div style={{ fontSize: 13, color: "#94A3B8" }}>{result.reason}</div>
              <div style={{ fontSize: 13, color: "#F5E642", marginTop: 6 }}>Typical cost: {result.cost}</div>
            </div>
          </div>
        )}
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>🧲 Magnesium vs Aluminum vs Zinc</h3>
          <div style={{ display: "grid", gap: 10, fontSize: 13 }}>
            <div style={{ background: "#1E2D42", borderRadius: 8, padding: 12 }}><strong style={{ color: "#F5E642" }}>Magnesium — </strong><span style={{ color: "#94A3B8" }}>Best protection, fastest depletion in hard water. Good for 10-15 gpg zones.</span></div>
            <div style={{ background: "#1E2D42", borderRadius: 8, padding: 12 }}><strong style={{ color: "#F5E642" }}>Aluminum — </strong><span style={{ color: "#94A3B8" }}>Slower depletion in hard water. Good for 15-20 gpg DFW zones.</span></div>
            <div style={{ background: "#1E2D42", borderRadius: 8, padding: 12 }}><strong style={{ color: "#F5E642" }}>Aluminum/Zinc Combo — </strong><span style={{ color: "#94A3B8" }}>Best balance for DFW extreme hardness. Zinc reduces sulfide odor common with softened water.</span></div>
          </div>
        </div>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>⚠️ Signs Your Rod Is Gone</h3>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#94A3B8" }}>
            <div>🦨 Rotten egg smell from hot water = depleted rod + sulfur bacteria</div>
            <div>🟤 Rusty or discolored hot water = tank walls corroding now</div>
            <div>💧 Water heater over 6 years with no rod check = assume depleted in DFW</div>
            <div>🔊 Popping sounds during heating = sediment from unprotected corrosion</div>
          </div>
        </div>
      </div>
    </div>
  );
}
