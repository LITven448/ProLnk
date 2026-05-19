import { useState } from 'react';

const redFlags = [
  { label: "Out-of-state license plates", emoji: "🚗", score: 9, detail: "Local DFW contractors do not need to drive in from Oklahoma or Louisiana after a storm. Out-of-state plates = storm chaser following the hail trail." },
  { label: "Door-to-door same day as storm", emoji: "🚪", score: 8, detail: "Professional contractors have booked schedules. Anyone knocking your door within 24 hours of a storm is a chaser, not a local." },
  { label: "I was already working nearby", emoji: "🤥", score: 7, detail: "Classic storm chaser script. Verified ProLnk contractors provide project addresses and references — ask for them." },
  { label: "Pressure to sign AOB immediately", emoji: "✍️", score: 10, detail: "Assignment of Benefits hands over your insurance rights. Once signed, you lose control of your claim. NEVER sign AOB under pressure." },
  { label: "No local DFW business address", emoji: "📍", score: 8, detail: "A Google search should show a real DFW storefront, not a mailbox at a UPS Store. Ask for their physical address and verify it." },
  { label: "Cannot show TX contractor license", emoji: "📋", score: 9, detail: "Texas requires roofing contractors to register. Ask for their TDLR number and verify at tdlr.texas.gov before any signature." },
  { label: "Only need $500 deposit to start", emoji: "💵", score: 7, detail: "Legitimate contractors work off insurance proceeds. Large upfront cash requests fund their gas to the next storm city." },
];

export default function DFWStormClockGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) { next.delete(i); setTotalScore(prev => prev - redFlags[i].score); }
    else { next.add(i); setTotalScore(prev => prev + redFlags[i].score); }
    setChecked(next);
  };

  const risk = totalScore >= 20 ? { label: "HIGH SCAM RISK", color: "#ef4444″ } : totalScore >= 10 ? { label: "MODERATE RISK", color: "#f97316" } : { label: "LOW RISK", color: "#22c55e" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚨</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Storm Chaser Avoidance Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 14 }}>Check every red flag you have seen — get a scam risk score</p>
        </div>

        <div style={{ background: "#132240″, border: `2px solid ${risk.color}`, borderRadius: 14, padding: "14px 20px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ color: "#94a3b8″, fontSize: 12, marginBottom: 4 }}>Current Scam Risk Score: {totalScore}</div>
          <div style={{ color: risk.color, fontWeight: 800, fontSize: 20 }}>{risk.label}</div>
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
          {redFlags.map((f, i) => (
            <button
              key={i}
              onClick={() => { toggle(i); setSelected(i === selected ? null : i); }}
              style={{
                background: checked.has(i) ? "#1a0a0a" : "#0f1e38″,
                border: `2px solid ${checked.has(i) ? "#ef4444" : "#1e3a5f"}`,
                borderRadius: 12, padding: "12px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12, textAlign: "left", width: "100%",
              }}
            >
              <span style={{ fontSize: 22 }}>{checked.has(i) ? "☑️" : "⬜"}</span>
              <span style={{ fontSize: 22 }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e2e8f0″, fontWeight: 600, fontSize: 14 }}>{f.label}</div>
                {selected === i && <div style={{ color: "#94a3b8″, fontSize: 12, marginTop: 4 }}>{f.detail}</div>}
              </div>
              <span style={{ color: "#ef4444″, fontWeight: 800, fontSize: 14 }}>+{f.score}</span>
            </button>
          ))}
        </div>

        <div style={{ background: "#132240″, borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🛡️ ProLnk Eliminates This Risk</div>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Every ProLnk DFW contractor is pre-verified: TX license confirmed, insurance on file, local address verified, zero AOB pressure. Get matched in minutes after a storm.</p>
        </div>
      </div>
    </div>
  );
}
