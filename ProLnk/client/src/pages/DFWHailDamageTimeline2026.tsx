import { useState } from 'react';

const timeline = [
  { day: "Same Day", emoji: "⚡", range: "Day 0″, color: "#ef4444", actions: ["Document ALL exterior damage with photos and video", "Place tarps on any breached roof sections", "Check attic for water intrusion", "Do NOT discard damaged materials — they are evidence"] },
  { day: "Days 1–3″, emoji: "📞", range: "Days 1–3", color: "#f97316", actions: ["Call insurance company to open a claim", "Get at least 2 contractor estimates", "Do NOT accept verbal estimates — get written Xactimate scopes", "Request ALE (Additional Living Expense) if home is unlivable"] },
  { day: "Days 7–14″, emoji: "🧑‍💼", range: "Days 7–14", color: "#eab308", actions: ["Adjuster inspection — have your contractor present", "Review scope of loss line by line", "Identify code upgrade items (usually $3K–15K underpaid)", "Request supplement if adjuster misses line items"] },
  { day: "Days 15–30″, emoji: "📄", range: "Days 15–30", color: "#22d3ee", actions: ["Receive Actual Cash Value (ACV) check", "Review recoverable depreciation schedule", "Sign contract with chosen DFW contractor", "Permit pulled — work can begin"] },
  { day: "Days 30–60″, emoji: "🏠", range: "Days 30–60", color: "#22c55e", actions: ["Roof installation scheduled and completed", "Final inspection by city inspector", "Submit recoverable depreciation invoice to insurer", "Receive final RCV (Replacement Cost Value) payment"] },
];

export default function DFWHailDamageTimeline2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? timeline[selected] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📅</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Post-Hail Timeline Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 14 }}>Select a phase to see what you should be doing</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 28, position: "relative" }}>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{t.emoji}</div>
                {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: "#1e3a5f", minHeight: 20 }} />}
              </div>
              <button
                onClick={() => setSelected(i === selected ? null : i)}
                style={{
                  flex: 1, background: selected === i ? "#132240″ : "#0f1e38",
                  border: `2px solid ${selected === i ? t.color : "#1e3a5f"}`,
                  borderRadius: 12, padding: "12px 16px", cursor: "pointer", textAlign: "left",
                  marginBottom: i < timeline.length - 1 ? 12 : 0,
                }}
              >
                <div style={{ color: t.color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{t.range}</div>
                <div style={{ color: "#e2e8f0″, fontWeight: 700, fontSize: 15 }}>{t.day}</div>
              </button>
            </div>
          ))}
        </div>

        {active && (
          <div style={{ background: "#132240″, border: `2px solid ${active.color}`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 18, margin: "0 0 16px" }}>{active.emoji} {active.day} — {active.range}</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {active.actions.map((a, j) => (
                <div key={j} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: active.color, fontWeight: 800 }}>→</span>
                  <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#132240″, borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🏠 ProLnk DFW Tip</div>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Texas law gives you 2 years to file a hail claim (1 year for wind). Do not rush — but do not wait past day 30 to open your claim or you risk underpayment.</p>
        </div>
      </div>
    </div>
  );
}
