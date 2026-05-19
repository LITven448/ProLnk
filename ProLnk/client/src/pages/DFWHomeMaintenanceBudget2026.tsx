import { useState } from 'react';

const categories = [
  { key: "hvac", label: "HVAC", icon: "🌡️", pct: 25, color: "#FF6B6B", desc: "Filters, tune-ups, eventual replacement. DFW systems run ~10 months/yr — budget high." },
  { key: "roof", label: "Roofing", icon: "🏠", pct: 20, color: "#FFB347″, desc: "Hail is the #1 DFW roof killer. Annual inspection + hail claim readiness is essential." },
  { key: "plumbing", label: "Plumbing", icon: "🚰", pct: 15, color: "#4FC3F7″, desc: "Includes water heater maintenance, leak repairs, sewer scoping every few years." },
  { key: "landscape", label: "Landscaping", icon: "🌿", pct: 15, color: "#66BB6A", desc: "Irrigation system, lawn care, tree trimming. DFW summers demand consistent watering." },
  { key: "misc", label: "Misc / Emergency", icon: "🛡️", pct: 25, color: "#CE93D8″, desc: "Appliance repair, electrical, pest control, unexpected repairs. Keep as liquid cash." },
];

export default function DFWHomeMaintenanceBudget2026() {
  const [homeValue, setHomeValue] = useState<number>(385000);
  const annual = Math.round(homeValue * 0.01);
  const monthly = Math.round(annual / 12);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "8px 0 4px" }}>DFW Home Maintenance Budget 2026</h1>
          <p style={{ color: "#8892A4″, fontSize: 15 }}>Enter your home value — get a monthly savings target by category.</p>
        </div>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#F5E642″ }}>🏠 Your DFW Home Value</label>
          <input type="range" min={150000} max={1500000} step={5000} value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642″, marginBottom: 10 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″ }}>${homeValue.toLocaleString()}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#8892A4″ }}>Annual Budget (1%)</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>${annual.toLocaleString()}/yr</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "#0A1628″, fontWeight: 700, textTransform: "uppercase" }}>Save Monthly</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#0A1628″ }}>${monthly.toLocaleString()}</div>
          </div>
          <div style={{ fontSize: 48 }}>🎯</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {categories.map(cat => {
            const catAnnual = Math.round(annual * cat.pct / 100);
            const catMonthly = Math.round(catAnnual / 12);
            return (
              <div key={cat.key} style={{ background: "#111E35″, borderRadius: 10, padding: "16px 18px", border: "1px solid #1E2D45" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{cat.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{cat.label}</span>
                    <span style={{ background: cat.color, color: "#0A1628″, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 800 }}>{cat.pct}%</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: cat.color }}>${catMonthly}/mo</div>
                    <div style={{ fontSize: 12, color: "#8892A4″ }}>${catAnnual.toLocaleString()}/yr</div>
                  </div>
                </div>
                <div style={{ height: 4, background: "#1E2D45″, borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${cat.pct * 4}%`, background: cat.color, borderRadius: 4 }} />
                </div>
                <p style={{ margin: "8px 0 0″, fontSize: 13, color: "#8892A4", lineHeight: 1.5 }}>{cat.desc}</p>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔧 When repairs come up, ProLnk gets you 3 DFW contractor quotes — fast and free.</div>
          <button style={{ marginTop: 12, background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Get Quotes Now →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568″, fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
