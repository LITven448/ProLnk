import { useState } from 'react';

export default function DFWRoofingVentCalculator2026() {
  const [atticSqft, setAtticSqft] = useState<string>("");
  const [ratio, setRatio] = useState<"150″ | "300">("150");
  const [intakeVents, setIntakeVents] = useState<string>("");
  const [exhaustVents, setExhaustVents] = useState<string>("");

  const sqft = parseFloat(atticSqft) || 0;
  const requiredNFA = sqft / parseInt(ratio);
  const requiredIntake = requiredNFA / 2;
  const requiredExhaust = requiredNFA / 2;

  const soffit8x16 = 50;
  const ridge12 = 18;
  const gable = 144;

  const existingIntakeNFA = (parseFloat(intakeVents) || 0) * soffit8x16;
  const existingExhaustNFA = (parseFloat(exhaustVents) || 0) * ridge12;

  const intakeGap = Math.max(0, requiredIntake - existingIntakeNFA);
  const exhaustGap = Math.max(0, requiredExhaust - existingExhaustNFA);
  const adequate = sqft > 0 && intakeGap === 0 && exhaustGap === 0;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          🏠 DFW ROOFING TOOL 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Attic Ventilation Calculator</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          DFW attics can hit 160°F in summer. Proper Net Free Area (NFA) ventilation is critical — it extends shingle life, reduces AC load, and prevents moisture damage during North Texas humid spells.
        </p>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1.25rem" }}>📐 Attic Details</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>ATTIC SQUARE FOOTAGE</label>
            <input type="number" value={atticSqft} onChange={e => setAtticSqft(e.target.value)}
              placeholder="e.g. 1500″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", color: "#fff", fontSize: 16, boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>VENTILATION RATIO</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(["150″,"300"] as const).map(r => (
                <button key={r} onClick={() => setRatio(r)}
                  style={{ background: ratio === r ? "#F5E642″ : "#1e3a5f", color: ratio === r ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  1:{r} {r === "150″ ? "(Vapor Barrier)" : "(No Barrier)"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>SOFFIT VENTS (qty)</label>
              <input type="number" value={intakeVents} onChange={e => setIntakeVents(e.target.value)}
                placeholder="e.g. 12″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", color: "#fff", fontSize: 16, boxSizing: "border-box" }} />
              <div style={{ color: "#475569″, fontSize: 12, marginTop: "0.3rem" }}>Assumes 8x16 = 50 NFA each</div>
            </div>
            <div>
              <label style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>RIDGE/GABLE VENTS (qty)</label>
              <input type="number" value={exhaustVents} onChange={e => setExhaustVents(e.target.value)}
                placeholder="e.g. 4″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", color: "#fff", fontSize: 16, boxSizing: "border-box" }} />
              <div style={{ color: "#475569″, fontSize: 12, marginTop: "0.3rem" }}>Assumes ridge vent = 18 NFA/ft</div>
            </div>
          </div>
        </div>

        {sqft > 0 && (
          <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>📊 Your Ventilation Assessment</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { label: "Required Total NFA", value: `${requiredNFA.toFixed(0)} sq in` },
                { label: "Required Intake NFA", value: `${requiredIntake.toFixed(0)} sq in` },
                { label: "Required Exhaust NFA", value: `${requiredExhaust.toFixed(0)} sq in` },
                { label: "System Status", value: adequate ? "✅ Adequate" : "⚠️ Gaps Found" },
              ].map(item => (
                <div key={item.label} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem" }}>
                  <div style={{ color: "#94a3b8″, fontSize: 12 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#F5E642″ }}>{item.value}</div>
                </div>
              ))}
            </div>
            {!adequate && (
              <div style={{ background: "#7c3aed22″, border: "1px solid #7c3aed", borderRadius: 8, padding: "1rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>🔧 Gaps to Close</div>
                {intakeGap > 0 && <div style={{ color: "#fbbf24″, fontSize: 14 }}>Intake short {intakeGap.toFixed(0)} sq in — add {Math.ceil(intakeGap/50)} soffit vents</div>}
                {exhaustGap > 0 && <div style={{ color: "#fbbf24″, fontSize: 14, marginTop: "0.3rem" }}>Exhaust short {exhaustGap.toFixed(0)} sq in — add {Math.ceil(exhaustGap/18)} ft of ridge vent</div>}
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", color: "#475569″, fontSize: 13 }}>
          ProLnk · DFW Roofing Intelligence · 2026
        </div>
      </div>
    </div>
  );
}