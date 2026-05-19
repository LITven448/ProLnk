import { useState } from 'react';

export default function TrustyProScanTechnology() {
  const [useCase, setUseCase] = useState("water");

  const useCases: Record<string, { label: string; icon: string; detects: string[] }> = {
    water: { label: "Water / Moisture", icon: "💧", detects: ["Active moisture intrusion", "Staining from prior leaks", "Hidden pipe condensation", "Mold-risk zone flagging"] },
    foundation: { label: "Foundation", icon: "🏗️", detects: ["Hairline and structural cracks", "Differential settling patterns", "Corner stress indicators", "Slab heave markers"] },
    roof: { label: "Roof & Gutters", icon: "🏠", detects: ["Missing or lifted shingles", "Gutter separation and overflow zones", "Flashing gaps at chimney", "UV degradation scoring"] },
    hvac: { label: "HVAC & Ducts", icon: "❄️", detects: ["Visible rust and corrosion", "Filter condition estimate", "Duct separation flags", "Condenser fin damage"] },
    electrical: { label: "Electrical", icon: "⚡", detects: ["Exposed wiring indicators", "Panel labeling gaps", "Scorch marks near outlets", "Breaker box condition"] },
    general: { label: "General Condition", icon: "🔍", detects: ["Paint and surface wear scoring", "Door and window alignment", "Floor finish condition", "Ceiling water shadows"] },
  };

  const steps = [
    { icon: "📱", label: "Open TrustyPro", desc: "Launch scan mode in the app" },
    { icon: "🎥", label: "Sweep the area", desc: "Slow pan — AI captures frames" },
    { icon: "🤖", label: "AI processes", desc: "On-device analysis in seconds" },
    { icon: "📋", label: "Report generated", desc: "Condition score + findings list" },
    { icon: "🔧", label: "Contractor match", desc: "ProLnk dispatches the right pro" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🔬</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>TrustyPro Scan Technology</h1>
        <p style={{ fontSize: 18, color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
          AI-powered visual inspection through your phone camera. No special hardware. No facial recognition. Ever.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
          {Object.entries(useCases).map(([key, val]) => (
            <button key={key} onClick={() => setUseCase(key)}
              style={{ background: useCase === key ? "#F5E642″ : "#112240", color: useCase === key ? "#0A1628" : "#94a3b8",
                border: "1px solid " + (useCase === key ? "#F5E642″ : "#1e3a5f"), borderRadius: 8, padding: "8px 14px",
                cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
              {val.icon} {val.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: "28px 24px", border: "1px solid #F5E642", marginBottom: 40 }}>
          <div style={{ textAlign: "center", fontSize: 40, marginBottom: 8 }}>{useCases[useCase].icon}</div>
          <h2 style={{ color: "#F5E642″, textAlign: "center", marginTop: 0, marginBottom: 16 }}>
            What TrustyPro Detects: {useCases[useCase].label}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {useCases[useCase].detects.map(d => (
              <div key={d} style={{ background: "#0A1628″, borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#F5E642″, fontSize: 16 }}>✓</span>
                <span style={{ color: "#cbd5e1″, fontSize: 13 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, textAlign: "center", marginBottom: 24 }}>How a Scan Works</h2>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#112240″, borderRadius: 12, padding: "20px 16px", minWidth: 120, textAlign: "center", border: "1px solid #1e3a5f", flex: "0 0 auto" }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 13, margin: "6px 0 4px" }}>{s.label}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "24px", border: "1px solid #1e3a5f", textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
          <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 18, marginBottom: 4 }}>Privacy-First by Design</div>
          <div style={{ color: "#94a3b8″, fontSize: 14 }}>No facial recognition. No biometrics. No third-party data sales. Scan data stays on your device until you share it.</div>
        </div>
      </div>
    </div>
  );
}
