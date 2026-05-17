import { useState } from 'react';

const valleyIssues = [
  { type: "Open Valley", issue: "Rust or cracked metal flashing", repair: "Replace valley metal with 26-gauge galvalume. Clean shingle edges. Apply ice and water shield underlayment beneath new metal." },
  { type: "Open Valley", issue: "DFW hail damage to flashing", repair: "Insurance claim — hail dents reduce metal lifespan. Full valley replacement during roof job. Document with photos before repair." },
  { type: "Woven Valley", issue: "Leaking at shingle overlap", repair: "Woven valleys are not recommended in DFW — high rainfall exceeds weaving capacity. Convert to open valley with metal flashing." },
  { type: "Closed Cut Valley", issue: "Granule loss at cut line", repair: "Re-cut with fresh shingle edge. Apply butyl caulk at cut line. Ice and water shield re-application if deck is exposed." },
  { type: "Any Valley", issue: "DFW heavy rain leak", repair: "Verify ice and water shield extends 18 inches up each side. Check valley metal gauge — minimum 26-gauge for DFW rain events." },
];

export default function DFWRoofingValleyGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Roof Valley Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: 28 }}>The most common DFW leak location — understanding roof valleys, valley types, and when yours needs repair.</p>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          ⛈️ Roof valleys channel ALL water from two roof planes — DFW storms test them hard every spring.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Three Valley Types Compared</h2>
        <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
          {[
            { type: "Open Valley", icon: "🔩", desc: "Exposed metal flashing visible in valley. Best for DFW — handles heavy rain flow, easy to inspect, longest lifespan.", rec: "Recommended" },
            { type: "Woven Valley", icon: "🔀", desc: "Shingles overlap and weave through valley. Common in DIY and low-bid installs. Not recommended for DFW rain volume.", rec: "Not Recommended" },
            { type: "Closed Cut Valley", icon: "✂️", desc: "One shingle layer cut straight over the other. Acceptable in DFW with proper ice and water shield and careful installation.", rec: "Acceptable" },
          ].map((v) => (
            <div key={v.type} style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{v.icon} {v.type}</div>
                <div style={{ color: v.rec === "Recommended" ? "#22c55e" : v.rec === "Not Recommended" ? "#ef4444" : "#f59e0b", fontSize: 13, fontWeight: 700 }}>{v.rec}</div>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{v.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>DFW Valley Requirements</h2>
        <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
          {[
            { icon: "🧊", label: "Ice and Water Shield", val: "Required in valley — extends 18 inches up each side minimum" },
            { icon: "⚙️", label: "Metal Gauge", val: "26-gauge galvalume minimum — thinner flashing dents in DFW hail" },
            { icon: "🔧", label: "Nailing Pattern", val: "Nails placed 1 inch minimum from valley centerline to prevent punctures" },
            { icon: "🌧️", label: "Valley Width", val: "Open valley should be 4–6 inches wide at ridge, 10–12 inches at eave" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: 8, padding: "10px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔍 Select Valley Type + Issue</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {valleyIssues.map((v, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {v.type} — {v.issue}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Repair Approach</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>{valleyIssues[selected].repair}</div>
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🏠 Get a Free DFW Roof Inspection</div>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>ProLnk connects you with DFW roofing contractors who inspect valleys first — the most commonly missed leak source.</div>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Inspection →</button>
        </div>
      </div>
    </div>
  );
}
