import { useState } from 'react';

const valueTiers = [
  { label: "Under $800K", tier: "ProLnk Standard", perks: ["✅ Verified local contractors", "✅ 3 competing quotes", "✅ Basic warranty tracking", "✅ HOA-compliant vetting"] },
  { label: "$800K–$1.2M", tier: "ProLnk Premium", perks: ["⭐ Priority contractor matching", "⭐ Specialty trades access", "⭐ Dedicated account manager", "⭐ Same-week scheduling"] },
  { label: "$1.2M–$2M", tier: "ProLnk Elite", perks: ["💎 White-glove concierge", "💎 Licensed estate contractors", "💎 Insurance-grade documentation", "💎 Annual home health report"] },
  { label: "$2M+", tier: "ProLnk Signature", perks: ["🏆 Named account executive", "🏆 Curated master-trades network", "🏆 24/7 emergency response", "🏆 Full home health vault integration"] },
];

export default function SouthlakeHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>
          ProLnk City Guide · Southlake TX
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
          💎 Southlake Homeowner Guide 2026
        </h1>
        <p style={{ color: "#9BA8C0", marginBottom: 32, lineHeight: 1.6 }}>
          Southlake is DFW&apos;s luxury benchmark — average home values above $950K, strict HOA aesthetics standards, and high-end finishes that demand specialty contractors. Cutting corners here costs 3x more to fix. Use your property value to find the right ProLnk service tier.
        </p>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>⚠️ Southlake-Specific Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "🏘️", label: "Strict HOA", desc: "Southlake HOA enforces exterior appearance rigorously" },
              { icon: "🪵", label: "Specialty Finishes", desc: "Stone, slate, custom millwork require licensed specialists" },
              { icon: "🌿", label: "Landscaping", desc: "Maintenance-intensive lots — irrigation + seasonal planting" },
              { icon: "🏗️", label: "Foundation", desc: "Premium homes still on expansive clay — monitor annually" },
            ].map((r) => (
              <div key={r.label} style={{ background: "#0A1628", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{r.label}</div>
                <div style={{ fontSize: 13, color: "#9BA8C0", marginTop: 4 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#F5E642" }}>🏡 Select Property Value → ProLnk Service Tier</h2>
          <p style={{ color: "#9BA8C0", fontSize: 13, marginBottom: 16 }}>Your home value determines the right level of contractor access and service.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {valueTiers.map((v, i) => (
              <button key={v.label} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {v.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 4 }}>{valueTiers[selected].tier}</div>
              <div style={{ fontSize: 13, color: "#9BA8C0", marginBottom: 14 }}>Recommended for {valueTiers[selected].label} homes</div>
              {valueTiers[selected].perks.map((p) => (
                <div key={p} style={{ marginBottom: 10, fontSize: 15 }}>{p}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Southlake Deserves the Best</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>ProLnk curates elite contractors who meet Southlake&apos;s exacting standards — no guesswork.</div>
          <a href="/homeowner-signup" style={{ background: "#0A1628", color: "#F5E642", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            Get Matched Now →
          </a>
        </div>
      </div>
    </div>
  );
}