import { useState } from 'react';

const situations = [
  { label: "Builder-grade 3-tab shingles, ready to replace", recommendation: "Architectural (Laminate)", reason: "3-tab is flat — no shadow line, no dimension. Architectural shingles create visible depth from ground level, especially under DFW sun angles." },
  { label: "HOA requires wood shake look", recommendation: "Architectural — Shake Profile", reason: "Premium architectural shingles mimic wood shake texture. Shadow line makes the comparison convincing from street view." },
  { label: "Slate-look HOA neighborhood", recommendation: "Architectural — Slate Profile", reason: "Laminate layers create the irregular surface that casts shadow like real slate. DFW afternoon sun enhances this effect dramatically." },
  { label: "Budget replacement, functional only", recommendation: "3-Tab (with caveat)", reason: "3-tab is cheaper but flat. In DFW hail risk zones, insurance adjusters note 3-tab more often for total replacement claims — worth considering." },
  { label: "Resale prep, want curb appeal", recommendation: "Architectural — Premium Color", reason: "Shadow line adds perceived value. DFW buyers can spot architectural vs 3-tab from the driveway. It influences appraisal and offers." },
  { label: "High wind zone (DFW tornado corridor)", recommendation: "Architectural Class 4 Impact", reason: "Architectural shingles with Class 4 impact rating. Thicker laminate layers resist wind uplift and hail better than 3-tab." },
];

export default function DFWRoofingShingleShadowLine2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW Architectural Shingle Shadow Line Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>
            Why architectural shingles look dramatically better in DFW — and how to identify the difference
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "📐", title: "3-Tab Shingles", sub: "Flat profile, no shadow", points: ["Single layer asphalt", "Flat, uniform appearance", "No dimensional depth", "Older DFW standard"], color: "#475569″ },
            { icon: "🌟", title: "Architectural (Laminate)", sub: "Shadow line = dimension", points: ["Multiple bonded layers", "Raised shadow strip visible", "Mimics slate or wood shake", "DFW new standard"], color: "#F5E642″ },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 20, border: `1px solid ${item.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: item.color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12, marginBottom: 12 }}>{item.sub}</div>
              {item.points.map((p, j) => (
                <div key={j} style={{ color: "#e2e8f0″, fontSize: 12, marginBottom: 4 }}>• {p}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f", marginBottom: 28 }}>
          <h3 style={{ color: "#F5E642″, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>☀️ Why DFW Sun Angle Matters</h3>
          <div style={{ color: "#94a3b8″, fontSize: 13, lineHeight: 1.7 }}>
            DFW sits at ~33° latitude. The sun angle creates strong raking light across roof surfaces, especially in morning and late afternoon. This raking light is what makes the shadow line on architectural shingles visible from the street. The dimensional appearance is not just aesthetics — it signals material quality to buyers, appraisers, and adjusters.
          </div>
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 24, border: "1px solid #1e3a5f", marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🔍 Your DFW Shingle Situation</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? "#F5E642″ : "#0A1628",
                  color: selected === i ? "#0A1628″ : "#e2e8f0",
                  border: "1px solid " + (selected === i ? "#F5E642″ : "#1e3a5f"),
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", fontSize: 14, fontWeight: selected === i ? 700 : 400,
                }}>{s.label}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, backgroundColor: "#0A1628″, borderRadius: 10, padding: 18, border: "1px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 15, marginBottom: 6 }}>✅ {situations[selected].recommendation}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].reason}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: "#475569″, fontSize: 12 }}>
          ProLnk DFW Roofing Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
