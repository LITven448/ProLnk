import { useState } from 'react';

export default function DFWWaterDamageGuide2026() {
  const [damageSource, setDamageSource] = useState<string | null>(null);

  type WaterInfo = { coverage: string; color: string; timeline: string[]; actions: string[] };
  const waterData: Record<string, WaterInfo> = {
    pipe: {
      coverage: "✅ Covered — sudden/accidental pipe burst",
      color: "#22C55E",
      timeline: ["Hour 1-4: Shut off water, call insurer, start documentation", "Hour 4-24: Water extraction by certified mitigation company", "Day 1-5: Industrial drying (dehumidifiers + air movers)", "Day 5-7: Moisture testing before any reconstruction", "Week 2+: Mold testing, then reconstruction begins"],
      actions: ["🔧 Shut main water immediately", "📸 Document before ANY cleanup", "📞 Call insurer same day", "💧 Water extraction within 24 hours — mandatory", "🌬️ Professional drying 3-5 days", "🔬 Mold test after drying"],
    },
    roof: {
      coverage: "✅ Covered — sudden roof leak from storm",
      color: "#F59E0B",
      timeline: ["Hour 1-2: Emergency tarp to stop active leak", "Hour 2-24: Document all interior damage, call insurer", "Day 1-3: Water extraction and initial drying", "Day 3-7: Monitor moisture levels with meters", "Week 2+: Roof repair + interior reconstruction"],
      actions: ["🏠 Emergency tarp same day (save receipts)", "📸 Photo roof damage AND interior water path", "📞 Call insurer within 24-48 hours", "💧 Extract standing water immediately", "🌬️ Dry affected drywall/insulation 3-5 days", "🔬 Test for mold before closing up walls"],
    },
    appliance: {
      coverage: "✅ Usually covered — sudden appliance failure",
      color: "#22C55E",
      timeline: ["Hour 1: Disconnect appliance, shut water supply", "Hour 1-24: Document damage, call insurer", "Day 1-3: Professional water extraction and drying", "Day 3-5: Moisture readings to confirm drying complete", "Week 1-2: Replace appliance + repair affected areas"],
      actions: ["🔌 Disconnect appliance power/water", "📸 Document appliance failure AND all damage", "📞 File claim — appliance malfunction = sudden loss", "💧 Extract water within 24 hours", "📝 Keep failed appliance for adjuster inspection", "🔬 Test for mold if drywall was saturated"],
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Water Damage Recovery Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Act within 24 hours — insurers can deny claims for delayed mitigation</p>
        </div>

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: "4px solid #EF4444" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#FCA5A5", marginBottom: 10 }}>⏱️ The Clock Is Running</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["24 hours: Water extraction required to prevent mold", "48 hours: Mold begins growing in wet drywall/insulation", "72 hours: Insurer can argue you failed to mitigate — claim denied", "3-5 days: Complete structural drying required before reconstruction"].map((item, i) => (
              <div key={i} style={{ color: "#E2E8F0", fontSize: 13 }}>⏰ {item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What caused the water damage?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["pipe", "🔧 Burst Pipe"], ["roof", "🏠 Roof Leak"], ["appliance", "🍳 Appliance Failure"]].map(([key, label]) => (
              <button key={key} onClick={() => setDamageSource(damageSource === key ? null : key)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: damageSource === key ? "#F5E642" : "#334155", backgroundColor: damageSource === key ? "#F5E64220" : "transparent", color: damageSource === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {damageSource && waterData[damageSource] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <div style={{ color: waterData[damageSource].color, fontWeight: 700, fontSize: 15, marginBottom: 14 }}>{waterData[damageSource].coverage}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Recovery Timeline</h3>
              {waterData[damageSource].timeline.map((t, i) => (
                <div key={i} style={{ color: "#E2E8F0", fontSize: 13, padding: "6px 0", borderBottom: i < waterData[damageSource].timeline.length - 1 ? "1px solid #334155" : "none" }}>{t}</div>
              ))}
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Immediate Actions</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {waterData[damageSource].actions.map((a, i) => <li key={i} style={{ color: "#E2E8F0", fontSize: 14 }}>{a}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>🔗 ProLnk: 24/7 DFW Water Mitigation</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>IICRC-certified pros, emergency response, direct insurance billing — get matched in minutes.</p>
        </div>
      </div>
    </div>
  );
}