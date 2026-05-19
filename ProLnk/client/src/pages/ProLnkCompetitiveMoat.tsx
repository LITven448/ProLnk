import { useState } from 'react';

const competitors = [
  { type: "HomeAdvisor / Angi", emoji: "🔴", weakness: "Pay-per-lead model incentivizes volume over quality. No income system for pros. High churn." },
  { type: "Thumbtack", emoji: "🟠", weakness: "Pros pay per quote sent. Race-to-bottom pricing. No loyalty mechanics or referral engine." },
  { type: "Local Facebook Groups", emoji: "🟡", weakness: "No vetting, no accountability, no payment infrastructure. Trust is the core problem." },
  { type: "Traditional Franchise", emoji: "🔵", weakness: "High upfront cost ($50K+). Geographic lock-in. Corporate margin extraction. Slow innovation." },
];

const moats = [
  { id: "vault", title: "Home Health Vault", emoji: "🏠", color: "#F5E642″, desc: "50M+ homes with structural + health data. Grows with every homeowner interaction. Permanent data asset competitors cannot replicate — years of compounding lead time.", strength: "10 years to replicate" },
  { id: "network", title: "Network Income Lock-In", emoji: "🔗", color: "#22c55e", desc: "5-stream income system with 4-level referral cascade. A pro who has recruited 10 other pros earns from their activity — leaving ProLnk means losing that income permanently.", strength: "Switching cost: career-level" },
  { id: "ai", title: "AI Match Quality Flywheel", emoji: "🤖", color: "#818cf8″, desc: "Every completed job improves the matching model. More jobs = better matches = higher win rates = more pros stay = more jobs. Classic flywheel, powered by proprietary job outcome data.", strength: "Self-reinforcing moat" },
  { id: "ops", title: "Autonomous Ops Cost Advantage", emoji: "⚙️", color: "#f97316″, desc: "47 AI agents handle marketing, support, matching, fraud, payouts, compliance. At scale, headcount stays flat while revenue grows — no competitor can match our unit economics.", strength: "85% gross margin floor" },
];

export default function ProLnkCompetitiveMoat() {
  const [activeMoat, setActiveMoat] = useState(0);
  const [activeComp, setActiveComp] = useState<number|null>(null);
  const moat = moats[activeMoat];
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>🏰 Competitive Moat</div>
          <div style={{ fontSize: "1.1rem", color: "#94a3b8″, marginTop: "0.5rem" }}>Four structural advantages that compound over time</div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {moats.map((m, i) => (
            <button key={m.id} onClick={() => setActiveMoat(i)} style={{ background: activeMoat === i ? m.color : "#0F2040″, color: activeMoat === i ? "#0A1628" : "#fff", border: `1px solid ${activeMoat === i ? m.color : "#1e3a5f"}`, borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
              {m.emoji} {m.title}
            </button>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.75rem", border: `2px solid ${moat.color}`, marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>{moat.emoji} {moat.title}</div>
            <div style={{ background: `${moat.color}22`, color: moat.color, borderRadius: 6, padding: "0.3rem 0.75rem", fontSize: "0.8rem", fontWeight: 700 }}>{moat.strength}</div>
          </div>
          <div style={{ color: "#cbd5e1″, lineHeight: 1.6 }}>{moat.desc}</div>
        </div>
        <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>⚔️ Competitor Weaknesses — Click to Expand</div>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {competitors.map((c, i) => (
            <div key={c.type} onClick={() => setActiveComp(activeComp === i ? null : i)} style={{ background: "#0F2040″, borderRadius: 10, padding: "1rem 1.25rem", border: "1px solid #1e3a5f", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600 }}>{c.emoji} {c.type}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{activeComp === i ? "▲" : "▼"}</div>
              </div>
              {activeComp === i && <div style={{ color: "#94a3b8″, fontSize: "0.88rem", marginTop: "0.75rem", lineHeight: 1.5 }}>{c.weakness}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}