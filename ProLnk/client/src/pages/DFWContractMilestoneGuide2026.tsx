import { useState } from 'react';

const projects = [
  { type: "Kitchen Remodel", milestones: ["25% — Cabinet delivery & demo complete", "25% — Rough-in plumbing/electrical inspected", "35% — Cabinets hung, counters installed", "5% — Final walkthrough passed", "10% — Retainage: punch list cleared"] },
  { type: "Bathroom Addition", milestones: ["20% — Foundation/framing complete", "25% — Rough-in plumbing/electrical inspected", "35% — Tile, fixtures, drywall done", "10% — Final inspection passed", "10% — Retainage: final sign-off"] },
  { type: "Room Addition", milestones: ["20% — Foundation poured & inspected", "25% — Framing & roofing complete", "30% — MEP rough-ins inspected", "15% — Drywall, paint, trim complete", "10% — Retainage: CO issued"] },
  { type: "Roof Replacement", milestones: ["40% — Materials delivered to site", "50% — Tear-off and new roof installed", "10% — Retainage: final inspection passed"] },
];

export default function DFWContractMilestoneGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = projects.find(p => p.type === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          💰 DFW Contractor Payment Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Milestone Payment Structure Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Structure milestone payments correctly to protect your project and ensure work quality at every stage of your DFW home improvement project.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>📌 Golden Rules of Milestone Payments</h2>
          {[
            "Never pay more than 10% upfront before any work begins",
            "Tie every payment to a verifiable, inspectable milestone",
            "Always hold 10% retainage until final punch list is cleared",
            "Require lien waiver from contractor and all subs at each milestone",
            "Never pay in cash — always check, ACH, or credit card for documentation",
          ].map((rule, i) => (
            <div key={i} style={{ color: "#cbd5e1", padding: "0.4rem 0", borderBottom: "1px solid #0f172a", display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#F5E642" }}>#{i + 1}</span> {rule}
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 Milestone Schedule by Project Type</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Select your project type:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {projects.map(p => (
              <button key={p.type} onClick={() => setSelected(p.type)} style={{
                background: selected === p.type ? "#F5E642" : "#0f172a",
                color: selected === p.type ? "#0A1628" : "#fff",
                border: "1px solid #334155", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{p.type}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>{info.type} — Payment Schedule</div>
              {info.milestones.map((m, i) => (
                <div key={i} style={{ color: "#cbd5e1", padding: "0.4rem 0", borderBottom: "1px solid #1e293b", display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#F5E642" }}>✓</span> {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>🏦 Retainage: The Most Important 10%</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            Retainage is the final 10% withheld until <strong style={{ color: "#F5E642" }}>every punch list item is complete and final inspection is passed</strong>. This is your leverage to ensure the contractor finishes every detail. In Texas, retainage is standard practice and legally enforceable in your contract. Never release it early.
          </p>
        </div>
      </div>
    </div>
  );
}
