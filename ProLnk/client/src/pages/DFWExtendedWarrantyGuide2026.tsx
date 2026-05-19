import { useState } from 'react';

type SystemType = "HVAC" | "Roof" | "Plumbing" | "Electrical" | "Appliances" | "Foundation";

const recommendations: Record<SystemType, { extended: boolean; rating: string; cost: string; reason: string; alternative: string }> = {
  "HVAC": { extended: true, rating: "⭐⭐⭐⭐⭐ Strongly Recommended", cost: "$150-400/yr manufacturer extended", reason: "HVAC repairs average $1,200-3,500 in DFW. One compressor failure pays for 5+ years of coverage. Register within 60 days of install.", alternative: "Use manufacturer extended warranty — NOT home warranty. Home warranty approval rates for HVAC are only 40-55%." },
  "Roof": { extended: false, rating: "⭐⭐ Skip It", cost: "$200-400/yr home warranty add-on", reason: "Home warranty plans rarely cover roofs adequately. Storm damage is homeowner insurance, not warranty. Install quality shingles and skip extended roof warranty.", alternative: "Invest in GAF or OC Duration shingles with lifetime warranty. Keep annual maintenance records instead." },
  "Plumbing": { extended: true, rating: "⭐⭐⭐ Worth Considering", cost: "$500-700/yr home warranty (bundled)", reason: "DFW homes on slab foundations face higher drain line risk. Service line coverage ($60-100/yr from utility) is worth it for exterior lines.", alternative: "Buy service line coverage from your utility (Oncor, Atmos) — often cheaper and more reliable than home warranty." },
  "Electrical": { extended: false, rating: "⭐⭐ Usually Not Worth It", cost: "$500-700/yr bundled home warranty", reason: "Electrical failures are infrequent and often homeowner insurance claims anyway. Panels over 20yr are excluded by most home warranty plans.", alternative: "Use the $500-700/yr home warranty premium to fund a dedicated savings account for repairs instead." },
  "Appliances": { extended: true, rating: "⭐⭐⭐⭐ Recommended for HVAC + Refrigerator", cost: "$100-300/yr per appliance extended", reason: "Refrigerators and HVAC are the only appliances where extended warranty reliably pays off. Skip for washer, dryer, oven.", alternative: "ProLnk tracks all appliance warranties so you never pay for something still under manufacturer coverage." },
  "Foundation": { extended: false, rating: "⭐ Do Not Buy", cost: "$0 — not available", reason: "Foundation warranties are builder warranties (10yr structural) or homeowner insurance riders. No third-party extended warranty product exists for foundations in DFW.", alternative: "Maintain drainage and grading, water foundation edges during drought. These prevent 80% of DFW foundation issues." },
};

export default function DFWExtendedWarrantyGuide2026() {
  const [system, setSystem] = useState<SystemType>("HVAC");
  const [showComparison, setShowComparison] = useState(false);

  const rec = recommendations[system];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13 }}>🏠 ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Extended Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>
          Home warranty plans in DFW cost $500-700/yr and deny 40-60% of claims. Here is when extended warranties are worth it — and when to skip them.
        </p>

        <div style={{ backgroundColor: "#2d1a0f", borderRadius: 12, padding: 16, marginBottom: 28, border: "1px solid #92400e", display: "flex", gap: 12 }}>
          <span style={{ fontSize: 22 }}>📊</span>
          <div>
            <div style={{ fontWeight: 800, color: "#fbbf24", marginBottom: 2 }}>Home warranty claim approval rate: 40-60%</div>
            <div style={{ color: "#fde68a", fontSize: 13 }}>Home warranty companies exclude pre-existing conditions, improper installation, and lack of maintenance — reasons that cover most DFW HVAC and plumbing claims.</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#F5E642" }}>🔍 Extended Warranty Recommendation by System</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {(Object.keys(recommendations) as SystemType[]).map((s) => (
              <button key={s} onClick={() => setSystem(s)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                  backgroundColor: system === s ? "#F5E642" : "#1e3a5f", color: system === s ? "#0A1628" : "#fff" }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: rec.extended ? "#0f2d1a" : "#2d0f0f", borderRadius: 10, padding: 20, border: `1px solid ${rec.extended ? "#4ade80" : "#f87171"}`, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: rec.extended ? "#4ade80" : "#f87171", fontSize: 15, marginBottom: 10 }}>
              {rec.extended ? "✅ " : "❌ "}{rec.rating}
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 6 }}>💰 Typical cost: <strong>{rec.cost}</strong></div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 10 }}>📋 Why: {rec.reason}</div>
            <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: 12 }}>
              <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>💡 BETTER ALTERNATIVE</div>
              <div style={{ color: "#cbd5e1", fontSize: 13 }}>{rec.alternative}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", margin: 0 }}>📊 Home Warranty vs ProLnk</h2>
            <button onClick={() => setShowComparison(!showComparison)}
              style={{ backgroundColor: "#1e3a5f", border: "none", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
              {showComparison ? "Hide" : "Show Comparison"}
            </button>
          </div>
          {showComparison && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", color: "#94a3b8" }}>Feature</th>
                    <th style={{ padding: "10px 12px", textAlign: "center", color: "#f87171" }}>Home Warranty Plan</th>
                    <th style={{ padding: "10px 12px", textAlign: "center", color: "#4ade80" }}>ProLnk + Manufacturer Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Annual cost", "$500-700/yr", "Free (vault) + direct warranty"],
                    ["Claim approval rate", "40-60%", "80-95% (manufacturer direct)"],
                    ["Contractor choice", "Their network only", "Your choice of licensed pro"],
                    ["Coverage exclusions", "Many (installation, age, maintenance)", "Per manufacturer terms — cleaner"],
                    ["Response time", "24-72 hours", "Same day with ProLnk network"],
                    ["Warranty tracking", "Manual", "Automatic via Home Health Vault"],
                  ].map(([feature, hw, pl]) => (
                    <tr key={feature} style={{ borderBottom: "1px solid #1e3a5f" }}>
                      <td style={{ padding: "10px 12px", color: "#cbd5e1" }}>{feature}</td>
                      <td style={{ padding: "10px 12px", textAlign: "center", color: "#f87171" }}>{hw}</td>
                      <td style={{ padding: "10px 12px", textAlign: "center", color: "#4ade80" }}>{pl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#F5E642" }}>✅ Extended Warranty Buying Checklist</h2>
          {["Only buy manufacturer extended warranty — not third-party", "Verify it covers parts AND labor (many cover only parts)", "Check exclusion list before purchasing", "Confirm your contractor is in their authorized network", "Store warranty documents in ProLnk Home Health Vault immediately", "Set a calendar reminder for warranty expiration date"].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#4ade80", fontSize: 16 }}>☑️</span>
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🏠</div>
          <div style={{ fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>Stop Paying for Home Warranty Plans You Cannot Use</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>ProLnk Home Health Vault tracks every warranty, connects you to vetted pros, and helps you file claims that actually get approved.</div>
        </div>
      </div>
    </div>
  );
}
