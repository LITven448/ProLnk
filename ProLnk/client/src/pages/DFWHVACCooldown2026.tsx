import { useState } from 'react';

const cooldownData = [
  { rate: "1°F+ per hour", label: "Optimal", color: "#22c55e", desc: "System performing well for DFW design day" },
  { rate: "0.5–1°F per hour", label: "Marginal", color: "#F5E642″, desc: "May struggle on 100°F+ days — schedule tune-up" },
  { rate: "Less than 0.5°F", label: "Failing", color: "#ef4444″, desc: "System undersized or needs repair immediately" },
];

const situations = [
  { id: "nochange", label: "Home won't cool at all on 100°F day", result: "System failure or refrigerant loss — emergency service needed. DFW peak load demands full capacity." },
  { id: "slow", label: "Takes 4+ hours to drop 2°F", result: "Undersized for DFW design conditions (103°F). A properly sized 2-stage or variable speed unit drops 1°F/hr consistently." },
  { id: "cycles", label: "AC runs constantly but barely cools", result: "Check filter, coils, and refrigerant charge. DFW units run 14–18 hrs/day in July — constant run without cooling = problem." },
  { id: "fine", label: "Drops 1°F per hour steadily", result: "Your system is correctly sized and performing. Variable speed systems do this without ever running at full blast." },
];

export default function DFWHVACCooldown2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>❄️ DFW AC Cooldown Rate Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          On a DFW design day — 100°F+ outside, 75°F target inside — your system should drop indoor temp at least 1°F per hour. Anything less signals a problem. Here's how to interpret your AC’s performance.
        </p>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>📊 Cooldown Rate Benchmarks</h2>
        <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
          {cooldownData.map(row => (
            <div key={row.rate} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem 1.25rem", borderLeft: `4px solid ${row.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>{row.rate}</span>
                <span style={{ color: row.color, fontWeight: 700, fontSize: "0.9rem" }}>{row.label}</span>
              </div>
              <div style={{ color: "#94a3b8″, fontSize: "0.875rem", marginTop: "0.25rem" }}>{row.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🔍 What Are You Observing?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? "#1e3a5f" : "#111d35″, border: `2px solid ${selected === s.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642″, borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>🔧 Assessment</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}

        <div style={{ background: "#111d35″, borderRadius: 10, padding: "1.25rem", marginTop: "1.5rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>💡 2-Stage vs Variable Speed in DFW</div>
          <p style={{ color: "#94a3b8″, lineHeight: 1.65, margin: 0 }}>Standard single-stage units run at 100% or off. In DFW's sustained heat, this causes temperature swings and humidity problems. 2-stage and variable speed units maintain 1°F/hr drops without constant cycling — far better for comfort and equipment longevity in Texas summers.</p>
        </div>
      </div>
    </div>
  );
}