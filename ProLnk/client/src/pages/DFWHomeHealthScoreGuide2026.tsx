import { useState } from 'react';

export default function DFWHomeHealthScoreGuide2026() {
  const [scores, setScores] = useState<Record<string, number>>({
    hvac: 0, foundation: 0, roof: 0, plumbing: 0, electrical: 0, pest: 0,
  });

  const systems = [
    { key: "hvac", icon: "❄️", label: "HVAC", weight: 0.25, tip: "1=12+ yrs old, 5=replaced last 5 yrs" },
    { key: "foundation", icon: "🧱", label: "Foundation", weight: 0.25, tip: "1=cracks/settling, 5=inspected + no issues" },
    { key: "roof", icon: "🪵", label: "Roof", weight: 0.20, tip: "1=15+ yrs old, 5=replaced last 7 yrs" },
    { key: "plumbing", icon: "💧", label: "Plumbing", weight: 0.15, tip: "1=galvanized/slow drains, 5=updated + flowing" },
    { key: "electrical", icon: "⚡", label: "Electrical", weight: 0.10, tip: "1=old panel/fuses, 5=200A updated panel" },
    { key: "pest", icon: "🪲", label: "Pest/Termite", weight: 0.05, tip: "1=active infestation, 5=annual treatment on file" },
  ];

  const totalScore = systems.reduce((sum, s) => sum + (scores[s.key] || 0) * s.weight, 0);
  const grade = totalScore >= 4.5 ? "A" : totalScore >= 3.5 ? "B" : totalScore >= 2.5 ? "C" : totalScore >= 1.5 ? "D" : totalScore > 0 ? "F" : null;
  const gradeColor = grade === "A" ? "#22C55E" : grade === "B" ? "#84CC16″ : grade === "C" ? "#EAB308" : grade === "D" ? "#F97316" : "#EF4444";
  const allScored = systems.every((s) => scores[s.key] > 0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏥</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Home Health Score Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Rate each system 1–5. Get your DFW home health grade instantly.</p>
        </div>

        {systems.map((s) => (
          <div key={s.key} style={{ background: "#1E2D45″, borderRadius: 12, padding: "16px 20px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 20, marginRight: 8 }}>{s.icon}</span>
                <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14 }}>{s.label}</span>
                <span style={{ color: "#475569″, fontSize: 11, marginLeft: 8 }}>({Math.round(s.weight * 100)}% weight)</span>
              </div>
              {scores[s.key] > 0 && (
                <div style={{ background: scores[s.key] >= 4 ? "#22C55E" : scores[s.key] >= 3 ? "#EAB308″ : "#EF4444", borderRadius: 6, padding: "2px 10px", color: "#fff", fontWeight: 800, fontSize: 14 }}>
                  {scores[s.key]}/5
                </div>
              )}
            </div>
            <div style={{ color: "#94A3B8″, fontSize: 11, marginBottom: 8 }}>{s.tip}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setScores((prev) => ({ ...prev, [s.key]: n }))} style={{
                  flex: 1, padding: "8px 0″, borderRadius: 6, border: "none", cursor: "pointer",
                  background: scores[s.key] === n ? "#F5E642″ : "#0A1628",
                  color: scores[s.key] === n ? "#0A1628″ : "#94A3B8",
                  fontWeight: 700, fontSize: 14,
                }}>{n}</button>
              ))}
            </div>
          </div>
        ))}

        {allScored && grade && (
          <div style={{ background: "#132137″, borderRadius: 12, padding: 24, marginBottom: 24, border: `2px solid ${gradeColor}`, textAlign: "center" }}>
            <div style={{ color: "#94A3B8″, fontSize: 14, marginBottom: 8 }}>Your DFW Home Health Grade</div>
            <div style={{ color: gradeColor, fontSize: 72, fontWeight: 900, lineHeight: 1 }}>{grade}</div>
            <div style={{ color: "#CBD5E1″, fontSize: 14, marginTop: 8 }}>
              Weighted Score: {totalScore.toFixed(2)} / 5.00
            </div>
            <div style={{ color: "#94A3B8″, fontSize: 12, marginTop: 12 }}>
              {grade === "A" && "🏆 Exceptional condition — document in Health Vault and command premium pricing."}
              {grade === "B" && "✅ Good shape — minor improvements will push to A grade and add resale value."}
              {grade === "C" && "⚠️ Average — 1–2 system upgrades needed before listing or negotiation."}
              {grade === "D" && "🚨 Below average — prioritize foundation and HVAC first in DFW market."}
              {grade === "F" && "🔴 Urgent attention required — multiple systems need professional evaluation."}
            </div>
          </div>
        )}

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>📊</div>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: 16, marginTop: 8 }}>Track Every System in ProLnk Vault</div>
          <div style={{ color: "#1E2D45″, fontSize: 13, marginTop: 6 }}>Your Health Score becomes a verified asset. Buyers pay more for documented homes in the DFW market.</div>
        </div>
      </div>
    </div>
  );
}
