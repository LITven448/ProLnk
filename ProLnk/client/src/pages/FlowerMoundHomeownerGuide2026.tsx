import { useState } from 'react';

const sizeGuide = [
  { label: "2500–3000 sqft", budget: "$4,200–$5,800/yr", items: ["🌡️ HVAC service $350", "🏠 Roof inspection $250", "🌿 Lawn/irrigation $1,200", "🔍 Foundation check $200", "🛁 Plumbing flush $150"] },
  { label: "3000–4000 sqft", budget: "$5,800–$8,500/yr", items: ["🌡️ Dual-zone HVAC service $600", "🏠 Roof + gutters $450", "🌿 Full landscape $2,400", "🔍 Foundation + drainage $350", "⚡ Panel inspection $200"] },
  { label: "4000–5000 sqft", budget: "$8,500–$13,000/yr", items: ["🌡️ Multi-unit HVAC $900", "🏠 Premium roof inspection $650", "🌿 HOA-compliant landscaping $4,000", "🔍 Structural engineer visit $500", "🛁 Full plumbing scope $400"] },
  { label: "5000+ sqft", budget: "$13,000+/yr", items: ["🌡️ Commercial-grade HVAC mgmt $1,400", "🏠 Slate/tile roof specialist $1,000", "🌿 Landscape design contract $6,000+", "🔍 Annual structural inspection $750", "⚡ Generator service $400"] },
];

export default function FlowerMoundHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>
          ProLnk City Guide · Flower Mound TX
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
          🌸 Flower Mound Homeowner Guide 2026
        </h1>
        <p style={{ color: "#9BA8C0", marginBottom: 32, lineHeight: 1.6 }}>
          Flower Mound is one of DFW&apos;s most affluent suburbs — larger homes, higher HOA expectations, and premium contractor costs. Expansive clay soil means foundation monitoring is non-negotiable. Here is your size-matched maintenance budget guide.
        </p>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>⚠️ Top Flower Mound Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "🏗️", label: "Foundation", desc: "Slab on expansive clay — shifts seasonally" },
              { icon: "🌡️", label: "HVAC Scale", desc: "Larger homes = higher replacement cost ($8K–$18K)" },
              { icon: "🏘️", label: "HOA Density", desc: "Among highest HOA concentration in DFW" },
              { icon: "🌿", label: "Landscaping", desc: "Irrigation systems common — annual inspection needed" },
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#F5E642" }}>📐 Select Your Home Size → Annual Maintenance Budget</h2>
          <p style={{ color: "#9BA8C0", fontSize: 13, marginBottom: 16 }}>Flower Mound homes require more investment — know what to budget.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {sizeGuide.map((s, i) => (
              <button key={s.label} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: "#F5E642" }}>{sizeGuide[selected].label}</div>
              <div style={{ fontSize: 13, color: "#9BA8C0", marginBottom: 14 }}>Estimated Annual Budget: {sizeGuide[selected].budget}</div>
              {sizeGuide[selected].items.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 15 }}>
                  <span>✅</span> {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Find Flower Mound Specialists</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>ProLnk connects you with contractors who understand large-home complexity and HOA requirements.</div>
          <a href="/homeowner-signup" style={{ background: "#0A1628", color: "#F5E642", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}