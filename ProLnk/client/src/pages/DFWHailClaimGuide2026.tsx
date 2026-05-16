import { useState } from 'react';

export default function DFWHailClaimGuide2026() {
  const [damageType, setDamageType] = useState<string | null>(null);

  const checklist: Record<string, string[]> = {
    roof: [
      "📸 Photo every damaged shingle from ground and ladder",
      "📹 Video walk entire roofline before any repairs",
      "📋 Note date/time storm hit (use weather.gov)",
      "📞 Call insurer within 48 hours — not 72",
      "🚫 Do NOT sign Assignment of Benefits (AOB)",
      "🧾 Get 3 local contractor bids before adjuster visit",
      "📝 Request itemized adjuster report in writing",
      "⚡ Supplement claim if estimate misses materials",
    ],
    siding: [
      "📸 Photo each dented panel with ruler for scale",
      "📹 Video entire exterior — all 4 sides",
      "🔍 Check AC condenser fins — common hail target",
      "📞 Call insurer within 48 hours",
      "🚫 Do NOT sign AOB — you lose claim control",
      "🧾 Get matching siding estimate (TX law requires match)",
      "📝 Document pre-existing vs new damage clearly",
      "⚡ Request re-inspection if first offer is low",
    ],
    vehicles: [
      "📸 Photo all dents with natural lighting",
      "📹 Video sweep of entire vehicle",
      "📋 File comprehensive claim, not collision",
      "📞 Call insurer same day — some have photo apps",
      "🔍 Check for glass damage — often separate deductible",
      "🧾 Use insurer-preferred shop OR get 2 independent bids",
      "📝 Keep rental car receipts if covered",
      "⚡ Dispute if PDR estimate misses hidden damage",
    ],
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⛈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Hail Insurance Claim Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Step-by-step for North Texas hailstorm claims — protect your settlement</p>
        </div>

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>⚠️ Critical Rules</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Document damage SAME DAY — weather changes evidence", "Call insurer within 48 hours — many TX policies require it", "NEVER sign Assignment of Benefits (AOB) — you lose control", "Get 3 contractor bids BEFORE adjuster arrives", "Supplement the claim if adjuster misses line items"].map((r, i) => (
              <li key={i} style={{ color: "#E2E8F0", fontSize: 14, display: "flex", gap: 8 }}><span style={{ color: "#F5E642" }}>✓</span>{r}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What was damaged?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["roof", "🏠 Roof"], ["siding", "🏗️ Siding"], ["vehicles", "🚗 Vehicles"]].map(([key, label]) => (
              <button key={key} onClick={() => setDamageType(damageType === key ? null : key)} style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid", borderColor: damageType === key ? "#F5E642" : "#334155", backgroundColor: damageType === key ? "#F5E64220" : "transparent", color: damageType === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>{label}</button>
            ))}
          </div>
        </div>

        {damageType && (
          <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>Documentation Checklist</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {checklist[damageType].map((item, i) => (
                <li key={i} style={{ color: "#E2E8F0", fontSize: 14 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>🔗 ProLnk Connects You to Vetted DFW Contractors</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Get 3 hail-experienced contractor bids fast — no AOB pressure, licensed & insured pros only.</p>
        </div>
      </div>
    </div>
  );
}