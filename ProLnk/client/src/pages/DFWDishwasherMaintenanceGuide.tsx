import { useState } from "react";

const HARDNESS_LEVELS = [
  { label: "Moderate (10-15 gpg)", value: "moderate", cleanMonths: 3 },
  { label: "Hard (15-20 gpg)", value: "hard", cleanMonths: 2 },
  { label: "Very Hard (20-25 gpg)", value: "very_hard", cleanMonths: 1 },
  { label: "Extreme (25+ gpg — Plano/Frisco)", value: "extreme", cleanMonths: 1 },
];

const CLEANERS: Record<string, { product: string; method: string; cost: string }> = {
  moderate: { product: "Finish Dishwasher Cleaner", method: "Run empty cycle with cleaner every 3 months", cost: "$5-8″ },
  hard: { product: "Citric Acid Powder", method: "2 tbsp in bottom rack, hot cycle, repeat monthly", cost: "$3-5″ },
  very_hard: { product: "Citric Acid + Vinegar rinse", method: "Monthly citric acid cycle + weekly white vinegar rinse aid top-off", cost: "$4-6″ },
  extreme: { product: "Citric Acid (heavy dose)", method: "3 tbsp citric acid monthly + dedicated descaling product quarterly", cost: "$5-8″ },
};

export default function DFWDishwasherMaintenanceGuide() {
  const [hardness, setHardness] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<null | { cleanFreq: string; product: string; method: string; cost: string; symptoms: string[] }>(null);

  function calculate() {
    if (!hardness || !age) return;
    const ageNum = parseInt(age);
    const level = HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const cleaner = CLEANERS[hardness];
    const symptoms: string[] = [];
    if (ageNum > 5) symptoms.push("🔴 Spray arm clogs likely — inspect and unclog ports");
    if (hardness === "extreme" || hardness === "very_hard") symptoms.push("⚠️ White film on dishes = active calcium deposit — descale now");
    if (ageNum > 8) symptoms.push("⚠️ Heating element scale reducing efficiency — professional descale may be needed");
    symptoms.push("📋 Check door gasket for mineral buildup — wipe monthly with damp cloth");
    setResult({
      cleanFreq: "Deep clean every " + level.cleanMonths + " month" + (level.cleanMonths > 1 ? "s" : ""),
      product: cleaner.product,
      method: cleaner.method,
      cost: cleaner.cost,
      symptoms,
    });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "6px 14px", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🍽️ Dishwasher Maintenance — DFW Hard Water</h1>
        <p style={{ color: "#94A3B8″, marginBottom: 24, lineHeight: 1.6 }}>
          DFW hard water leaves calcium scale on every surface water touches — spray arm ports clog, heating elements lose efficiency, and dishes come out with a white chalky film. Cleaning frequency that works in Houston or Austin is not enough in DFW.
        </p>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📊 Your DFW Dishwasher Maintenance Plan</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>DFW Water Hardness</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)}
                style={{ width: "100%", background: "#1E2D42″, border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="">Select hardness level</option>
                {HARDNESS_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#94A3B8″, marginBottom: 6 }}>Dishwasher Age (years)</label>
              <input type="number" min={0} max={25} value={age} onChange={e => setAge(e.target.value)}
                style={{ width: "100%", background: "#1E2D42″, border: "1px solid #2A3F5C", borderRadius: 8, padding: "10px 14px", color: "#E8EDF5", fontSize: 15, boxSizing: "border-box" }} />
            </div>
            <button onClick={calculate}
              style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Build My Maintenance Schedule
            </button>
          </div>
        </div>
        {result && (
          <div style={{ background: "#111C2E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>Your DFW Dishwasher Plan</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>CLEANING FREQUENCY</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.cleanFreq}</div>
              </div>
              <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>PRODUCT COST</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5E642″ }}>{result.cost} per treatment</div>
              </div>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#94A3B8″, marginBottom: 4 }}>RECOMMENDED CLEANER</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F5E642″, marginBottom: 4 }}>{result.product}</div>
              <div style={{ fontSize: 13, color: "#94A3B8″ }}>{result.method}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8″, marginBottom: 8 }}>DFW-SPECIFIC WATCH ITEMS</div>
              {result.symptoms.map((s, i) => (
                <div key={i} style={{ background: "#1E2D42″, borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 6 }}>{s}</div>
              ))}
            </div>
          </div>
        )}
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🍋 Citric Acid vs Commercial Cleaner</h3>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12 }}>
              <strong style={{ color: "#F5E642″ }}>Citric Acid — </strong><span style={{ color: "#94A3B8" }}>Best for DFW calcium scale. Non-toxic, food-safe, dissolves mineral deposits more effectively than most commercial products. Buy in bulk powder.</span>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12 }}>
              <strong style={{ color: "#F5E642″ }}>Commercial Cleaners (Finish, Affresh) — </strong><span style={{ color: "#94A3B8" }}>Convenient and effective for routine maintenance. Less effective on heavy DFW scale buildup than citric acid.</span>
            </div>
            <div style={{ background: "#1E2D42″, borderRadius: 8, padding: 12 }}>
              <strong style={{ color: "#F5E642″ }}>White Vinegar — </strong><span style={{ color: "#94A3B8" }}>Do NOT use regularly — acidity degrades rubber door seals over time. Use only occasionally as rinse aid booster.</span>
            </div>
          </div>
        </div>
        <div style={{ background: "#111C2E", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🚿 Spray Arm Clog Check (Critical in DFW)</h3>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#94A3B8″ }}>
            <div>🔧 Remove spray arms (usually twist-off) every 6 months</div>
            <div>🪡 Poke each port with a toothpick — calcium plugs are invisible until you check</div>
            <div>🧪 Soak arms in citric acid solution for 30 minutes to dissolve buildup</div>
            <div>💧 Dishes with spots in upper rack = top spray arm clogged first</div>
          </div>
        </div>
      </div>
    </div>
  );
}
