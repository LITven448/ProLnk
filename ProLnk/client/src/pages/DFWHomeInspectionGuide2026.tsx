import { useState } from 'react';

const findings = [
  { id: "foundation", label: "Foundation Issues", icon: "🏗️", strategy: "In DFW, foundation movement is the #1 concern due to expansive clay soils. Cracks > 1/4\" or stair-step cracks are serious. Request a foundation engineer report and negotiate repair costs or price reduction. Budget $5,000–$20,000 for pier repair.", negotiation: "Ask for credit at closing — sellers rarely want to fix foundation before sale.", severity: "critical" },
  { id: "hvac", label: "HVAC Age/Condition", icon: "🌡️", strategy: "DFW HVAC systems work harder than almost anywhere in the US. A unit over 12 years old is near end-of-life. Replacement cost: $4,000–$8,000. If unit is 10+ years, negotiate a $2,000–$3,000 allowance at closing.", negotiation: "Request home warranty covering HVAC for first year.", severity: "high" },
  { id: "roof", label: "Roof Condition", icon: "🏠", strategy: "DFW hail storms are frequent. Inspect for missing/curling shingles, granule loss in gutters. Roof replacement: $8,000–$15,000 for average DFW home. Check if seller filed any insurance claims — hidden damage is common.", negotiation: "If roof is 10+ years old, negotiate $3,000–$5,000 credit or seller-paid replacement.", severity: "high" },
  { id: "electrical", label: "Electrical Panel", icon: "⚡", strategy: "Older DFW homes may have Federal Pacific or Zinsco panels — fire hazards. Panel replacement: $2,000–$3,500. Any double-tapped breakers or ungrounded outlets are red flags. 200-amp service required for modern homes.", negotiation: "Safety items are negotiation gold — request repair or credit before closing.", severity: "high" },
  { id: "plumbing", label: "Plumbing Issues", icon: "🚰", strategy: "Pre-1980 DFW homes may have galvanized or polybutylene pipes (recalled). Sewer scoping is essential — root intrusion in DFW clay soils is common. Sewer line replacement: $4,000–$12,000.", negotiation: "Sewer scope is a separate $200–$400 inspection — always worth it. Request repair credit if issues found.", severity: "medium" },
  { id: "insulation", label: "Insulation/Energy", icon: "🌿", strategy: "DFW summers are brutal. Insufficient attic insulation (should be R-38 minimum) drives up cooling costs dramatically. Also check for air sealing around penetrations. Improvement cost: $1,500–$3,000.", negotiation: "Rarely a deal-breaker — use as leverage for other concessions.", severity: "low" },
];

export default function DFWHomeInspectionGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = findings.find(f => f.id === selected);
  const severityColor = (s: string) => s === "critical" ? "#FF4444" : s === "high" ? "#F5E642" : s === "medium" ? "#88AAFF" : "#66BB6A";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW Home Inspection Guide 2026</h1>
          <p style={{ color: "#8892A4", fontSize: 15 }}>Tap a finding to get your DFW-specific negotiation strategy.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {findings.map(f => (
            <div key={f.id} onClick={() => setSelected(selected === f.id ? null : f.id)} style={{ background: selected === f.id ? "#1A2E50" : "#111E35", border: `2px solid ${selected === f.id ? "#F5E642" : "#1E2D45"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: severityColor(f.severity), fontWeight: 700, textTransform: "uppercase" }}>{f.severity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active && (
          <div style={{ background: "#111E35", borderRadius: 12, padding: 24, border: `2px solid ${severityColor(active.severity)}`, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{active.icon}</span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#F5E642", margin: 0 }}>{active.label}</h2>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8892A4", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>What It Means in DFW</div>
              <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{active.strategy}</p>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 14, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 700, marginBottom: 4 }}>💡 Negotiation Move</div>
              <p style={{ margin: 0, fontSize: 14, color: "#C8D0E0" }}>{active.negotiation}</p>
            </div>
          </div>
        )}

        <div style={{ background: "#111E35", borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔧 Got inspection items? ProLnk gets you 3 contractor bids fast — before your option period ends.</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Get Repair Quotes →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568", fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
