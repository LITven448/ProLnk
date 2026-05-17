import { useState } from 'react';

export default function DFWRoofingEstimateScope2026() {
  const [selected, setSelected] = useState("");

  const elements = [
    { id: "shingle", icon: "🏠", label: "Shingle Specification", verify: "Confirm exact brand (GAF, Owens Corning, CertainTeed), product line (Timberline HDZ, Duration), and color name. Vague architectural shingle is insufficient — manufacturer and product line required for warranty.", required: true },
    { id: "underlayment", icon: "📄", label: "Underlayment Type", verify: "Must specify synthetic underlayment (preferred for DFW heat) vs felt 30lb. Synthetic is superior in DFW attic temps exceeding 160F — felt degrades faster.", required: true },
    { id: "drip", icon: "🌧️", label: "Drip Edge Specification", verify: "Specify metal type (aluminum or galvanized), profile (D-style or L-style), and color. Must match fascia color. DFW code requires drip edge at eaves AND rakes.", required: true },
    { id: "boots", icon: "🔧", label: "Pipe Boot Brand", verify: "Specify brand (Perma-Boot, E-Z Flex, Lead). Avoid generic rubber boots — UV degradation in DFW sun causes failures within 5-7 years. Silicone or lead boots preferred.", required: true },
    { id: "ridge", icon: "🔝", label: "Ridge Cap Brand", verify: "Must match shingle manufacturer for warranty compliance. Using off-brand ridge cap voids most manufacturer warranties. Specify ventilated vs non-ventilated.", required: true },
    { id: "starter", icon: "📏", label: "Starter Strip", verify: "Manufacturer-specific starter strips required for full warranty. Generic starter strips or cut shingles used as starters are a warranty violation on most premium lines.", required: true },
    { id: "tearoff", icon: "🔨", label: "Tear-Off vs Overlay", verify: "DFW code allows maximum 2 layers. Overlay on existing layer reduces warranty. Confirm tear-off includes disposal of all old material. Overlays are not recommended.", required: true },
    { id: "permit", icon: "📋", label: "Permit Responsibility", verify: "Confirm who pulls the permit — contractor should, not homeowner. Verify permit fee included in estimate. Unpermitted roofs cause issues at resale and may void insurance claims.", required: true },
    { id: "cleanup", icon: "🧹", label: "Cleanup Protocol", verify: "Specify magnetic nail sweep included, debris removal from gutters, and haul-away of old materials. DFW contracts should include daily cleanup if multi-day project.", required: false },
    { id: "warranty", icon: "📜", label: "Warranty Terms", verify: "Get both manufacturer warranty (material defects, 25-50 years) AND workmanship warranty (installation errors, 2-10 years) in writing. Confirm warranty transferability at home sale.", required: false },
  ];

  const sel = elements.find(e => e.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Roofing Estimate Scope of Work Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>
            What must be in every DFW roofing estimate and what to verify
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
          {elements.map(e => (
            <button key={e.id} onClick={() => setSelected(e.id === selected ? "" : e.id)}
              style={{ background: selected === e.id ? "#F5E642" : "#1E293B", color: selected === e.id ? "#0A1628" : "#fff",
                border: "1px solid " + (e.required ? "#F5E642" : "#475569"), borderRadius: 8, padding: "12px 14px",
                cursor: "pointer", fontSize: 13, textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{e.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{e.label}</div>
                <div style={{ fontSize: 11, color: selected === e.id ? "#0A1628" : (e.required ? "#F5E642" : "#94A3B8") }}>
                  {e.required ? "Required" : "Recommended"}
                </div>
              </div>
            </button>
          ))}
        </div>

        {sel && (
          <div style={{ background: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>{sel.icon} {sel.label} — What to Verify</h2>
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>{sel.verify}</p>
          </div>
        )}

        {!sel && (
          <div style={{ background: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "center" }}>
            <div style={{ color: "#475569", fontSize: 14 }}>Click any estimate element above to see what to verify</div>
          </div>
        )}

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#EF4444", fontSize: 15, marginBottom: 12 }}>Red Flags in DFW Estimates</h2>
          {[
            "No permit mentioned — avoid any contractor who suggests skipping permits",
            "Shingle listed as just architectural without brand or product line",
            "No separate workmanship warranty — manufacturer warranty only",
            "Overlay proposed on unknown existing layer count",
            "Price far below DFW market — often means cutting corners on accessories",
          ].map((r, i) => (
            <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: "#EF4444" }}>!</span>{r}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569", fontSize: 12 }}>
          ProLnk Roofing Estimate Guide 2026 | Know what every DFW estimate should include
        </div>
      </div>
    </div>
  );
}
