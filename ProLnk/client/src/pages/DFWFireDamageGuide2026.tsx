import { useState } from 'react';

export default function DFWFireDamageGuide2026() {
  const [damageExtent, setDamageExtent] = useState<string | null>(null);

  type FireInfo = { scope: string; timeline: string[]; actions: string[] };
  const fireData: Record<string, FireInfo> = {
    minor: {
      scope: "Small fire/contained — structure likely intact, smoke damage primary concern",
      timeline: ["Day 1: Board up, secure structure, document everything", "Day 1-3: Professional smoke/soot assessment — ozone treatment", "Day 3-10: Contents cleaning and pack-out if needed", "Week 2-4: HVAC cleaning, odor remediation", "Month 1-2: Paint, flooring, finish work"],
      actions: ["🚒 Get fire dept clearance before re-entering", "📸 Document every room — smoke travels farther than fire", "📞 Call insurer same day — file structure + contents claim", "🌫️ Don't run HVAC — spreads smoke particles through ducts", "🧾 Smoke damage is often underestimated — get specialist", "🏠 ALE coverage: hotel costs covered while repairs happen", "📦 Contents claim separate — itemize every damaged item"],
    },
    partial: {
      scope: "Partial loss — structural damage to rooms/sections, full rebuild of affected areas",
      timeline: ["Day 1: Emergency board-up, tarp roof breaches, call insurer", "Day 1-7: Structural assessment by engineer — safety clearance", "Week 1-2: Debris removal, contents pack-out and inventory", "Week 2-4: Smoke/soot remediation entire structure", "Month 1-6: Reconstruction of damaged sections"],
      actions: ["🚒 Do NOT enter until fire marshal clears", "📸 Document before any board-up or debris removal", "📞 Call insurer immediately — assign adjuster within 48 hrs", "🏨 File ALE claim: hotel + meals + storage all covered", "📦 Contents claim: list every item lost (replacement value)", "🔍 Smoke damage extends beyond burn area — assess all rooms", "👷 Get independent contractor estimate before accepting offer"],
    },
    total: {
      scope: "Total loss — full rebuild, maximum policy payout scenario",
      timeline: ["Day 1-3: Secure site, document ruins, insurer assigns adjuster", "Week 1-2: Structural engineer assessment, total loss declaration", "Week 2-4: Contents inventory from memory + receipts", "Month 1-3: Settlement negotiation — do NOT accept first offer", "Month 3-18: Rebuild or relocate decision + execution"],
      actions: ["🏨 ALE covers hotel/rental for full rebuild duration (18+ mo)", "📋 Total loss: insurer pays dwelling limit + contents limit", "🚫 Do NOT accept first settlement — supplement aggressively", "📞 Consider public adjuster for total loss — 10-15% fee worth it", "📦 Contents: create full inventory, use credit card statements", "🔑 Mortgage company may control insurance payout — know your rights", "👨‍⚖️ Texas law: insurer must pay undisputed amounts within 5 days"],
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Fire Damage Recovery Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Smoke damage is always worse than it looks — claim it all</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {[["🚒", "Safety first — get fire dept clearance before re-entering"], ["📸", "Document BEFORE any cleanup or board-up work"], ["📞", "Call insurer same day — Texas law starts their clock"], ["🏨", "ALE (hotel + meals) starts immediately — use it"], ["📝", "Contents claim is SEPARATE from structure — file both"]].map(([icon, text], i) => (
            <div key={i} style={{ backgroundColor: "#1E293B", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: "#E2E8F0", fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What is your damage extent?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["minor", "🔥 Minor / Smoke"], ["partial", "🏚️ Partial Loss"], ["total", "💥 Total Loss"]].map(([key, label]) => (
              <button key={key} onClick={() => setDamageExtent(damageExtent === key ? null : key)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: damageExtent === key ? "#F5E642" : "#334155", backgroundColor: damageExtent === key ? "#F5E64220" : "transparent", color: damageExtent === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {damageExtent && fireData[damageExtent] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <p style={{ color: "#F5E642", fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>{fireData[damageExtent].scope}</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Recovery Timeline</h3>
              {fireData[damageExtent].timeline.map((t, i) => (
                <div key={i} style={{ color: "#E2E8F0", fontSize: 13, padding: "6px 0", borderBottom: i < fireData[damageExtent].timeline.length - 1 ? "1px solid #334155" : "none" }}>{t}</div>
              ))}
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Action Steps</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {fireData[damageExtent].actions.map((a, i) => <li key={i} style={{ color: "#E2E8F0", fontSize: 13 }}>{a}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>🔗 ProLnk: Licensed DFW Fire Restoration Contractors</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>IICRC fire/smoke certified pros, board-up to rebuild — matched to your zip code.</p>
        </div>
      </div>
    </div>
  );
}