import { useState } from 'react';

const crackTypes = [
  { label: "Diagonal from door/window corner", severity: "medium", description: "Classic foundation movement indicator in DFW clay soil. Documents baseline and monitor monthly.", action: "Monitor & document — schedule foundation inspection if cracks widen beyond 1/4 inch" },
  { label: "Nail pops (small bumps in drywall)", severity: "low", description: "Usually normal settling, especially in homes under 5 years. DFW humidity swings cause wood movement.", action: "Repair cosmetically — nail, fill, repaint. Re-inspect in 6 months." },
  { label: "Stair-step cracks at corners", severity: "high", description: "Indicates differential foundation movement. Common in DFW after drought cycles when soil shrinks unevenly.", action: "Call a structural engineer immediately. Do not delay — this can worsen quickly." },
  { label: "Horizontal cracks on walls", severity: "critical", description: "Very serious — indicates lateral soil pressure or significant structural stress. Rare in drywall but critical.", action: "Stop using that area of the home. Call structural engineer today." },
  { label: "Random spider/hairline cracks", severity: "low", description: "Surface drywall compound shrinkage, very common in DFW due to humidity swings.", action: "Cosmetic repair only. No structural concern." },
  { label: "Wide gaps (>1/4 inch) at ceiling", severity: "high", description: "Gap between drywall and ceiling indicates active foundation movement or truss uplift.", action: "Document with photos and dates. Call foundation specialist within 30 days." }
];

const severityColor: Record<string, string> = { low: "#22C55E", medium: "#F59E0B", high: "#EF4444", critical: "#DC2626" };
const severityLabel: Record<string, string> = { low: "Low", medium: "Moderate", high: "High", critical: "Critical" };

export default function DFWFoundationDrywall2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [pattern, setPattern] = useState("Single crack");

  const crack = selected !== null ? crackTypes[selected] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", fontWeight: 700, letterSpacing: 1 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>🧱 Foundation Movement & Drywall</h1>
        <p style={{ color: "#9BA3B8", marginBottom: 28, lineHeight: 1.6 }}>
          DFW's expansive clay soil causes more foundation movement than almost anywhere in the US. Learn to read what your drywall is telling you about your foundation.
        </p>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 12 }}>📸 Document & Date Your Cracks</h2>
          <ul style={{ color: "#C8CEDF", lineHeight: 2, paddingLeft: 20 }}>
            <li>Photograph every crack with a ruler for scale</li>
            <li>Mark crack ends with pencil and date (month/year)</li>
            <li>Re-photograph monthly — growth rate matters most</li>
            <li>DFW cracks widen in summer drought, narrow in wet winters</li>
          </ul>
        </div>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 16 }}>🔍 Crack Assessment Tool</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Crack Pattern</label>
            <select value={pattern} onChange={e => setPattern(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              {["Single crack", "Multiple cracks same area", "Cracks throughout home", "New cracks after rain"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 10 }}>Select Crack Type</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {crackTypes.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, background: selected === i ? "#0D1F3C" : "#0A1628",
                  border: `1px solid ${selected === i ? "#F5E642" : "#2A3A5A"}`, color: "#E8EAF0", cursor: "pointer", fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {crack && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: `2px solid ${severityColor[crack.severity]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ color: "#FFFFFF", margin: 0 }}>{crack.label}</h3>
              <span style={{ background: severityColor[crack.severity], color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 13 }}>
                {severityLabel[crack.severity]} Risk
              </span>
            </div>
            <p style={{ color: "#C8CEDF", marginBottom: 12 }}>{crack.description}</p>
            <div style={{ padding: 12, background: "#111E33", borderRadius: 8, color: "#F5E642", fontSize: 14 }}>
              ✅ Recommended Action: {crack.action}
            </div>
            {pattern !== "Single crack" && (
              <div style={{ marginTop: 10, padding: 10, background: "#1A0A0A", borderRadius: 8, color: "#EF4444", fontSize: 13 }}>
                ⚠️ Multiple cracks or pattern "{pattern}" elevates concern — professional evaluation strongly recommended.
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33", borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642" }}>ProLnk DFW:</strong> Connect with verified foundation specialists and drywall contractors in the Metroplex. Get quotes within 24 hours.
        </div>
      </div>
    </div>
  );
}