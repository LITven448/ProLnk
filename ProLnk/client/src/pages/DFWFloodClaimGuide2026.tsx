import { useState } from 'react';

export default function DFWFloodClaimGuide2026() {
  const [floodSource, setFloodSource] = useState<string | null>(null);

  type FloodInfo = { coverage: string; color: string; steps: string[] };
  const floodData: Record<string, FloodInfo> = {
    storm: {
      coverage: "⚠️ Likely NOT covered by standard homeowner policy",
      color: "#EF4444",
      steps: [
        "🚨 Standard HO policy EXCLUDES surface water flooding",
        "📋 Check if you have NFIP or private flood policy",
        "📸 Document ALL damage before moving anything",
        "💧 Remove standing water within 24 hours — mold clock starts",
        "📞 Call NFIP/flood insurer first, then homeowner insurer",
        "🧾 Keep ALL receipts for mitigation work",
        "🏚️ File for FEMA disaster assistance if DFW declared disaster area",
      ],
    },
    pipe: {
      coverage: "✅ Likely covered by standard homeowner policy",
      color: "#22C55E",
      steps: [
        "🔧 Shut off main water supply immediately",
        "📸 Photograph burst pipe AND all water damage",
        "📹 Video entire affected area before cleanup",
        "📞 Call insurer within 24 hours — sudden loss covered",
        "💨 Begin drying within 24 hours (mold risk)",
        "🧾 Hire licensed water mitigation company — save invoices",
        "📝 Document temporary repairs (tarps, fans) for reimbursement",
      ],
    },
    sewer: {
      coverage: "⚠️ Covered only with sewer backup rider",
      color: "#F59E0B",
      steps: [
        "🚫 Do NOT use any drains or toilets until cleared",
        "📋 Check policy for sewer/drain backup endorsement",
        "📸 Document all contaminated areas (Category 3 water)",
        "☣️ Sewage is biohazard — requires professional remediation",
        "📞 Call insurer AND city utilities department",
        "🧾 Get remediation scope in writing before work starts",
        "🏥 Health risk: vacate home until professionally cleared",
      ],
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Flood Insurance Claim Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Know your coverage before the water rises — DFW flood realities</p>
        </div>

        <div style={{ backgroundColor: "#7F1D1D", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: "4px solid #EF4444" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#FCA5A5", marginBottom: 8 }}>🚨 Critical: Standard HO Policies Don't Cover Floods</h2>
          <p style={{ color: "#FEE2E2", fontSize: 14, margin: 0 }}>Flooding from storms, rivers, or surface water requires a SEPARATE flood policy (NFIP or private). Mold clock starts at 24-48 hours — act fast regardless of coverage.</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What caused your flooding?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["storm", "🌧️ Storm/Surface Water"], ["pipe", "🔧 Burst Pipe/Appliance"], ["sewer", "🚽 Sewer Backup"]].map(([key, label]) => (
              <button key={key} onClick={() => setFloodSource(floodSource === key ? null : key)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: floodSource === key ? "#F5E642" : "#334155", backgroundColor: floodSource === key ? "#F5E64220" : "transparent", color: floodSource === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {floodSource && floodData[floodSource] && (
          <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "#0F172A", marginBottom: 16, color: floodData[floodSource].color, fontWeight: 700, fontSize: 15 }}>{floodData[floodSource].coverage}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {floodData[floodSource].steps.map((step, i) => (
                <li key={i} style={{ color: "#E2E8F0", fontSize: 14 }}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>🔗 ProLnk: Vetted Water Mitigation Pros</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>IICRC-certified water damage contractors in DFW — 24/7 emergency response, works with all insurers.</p>
        </div>
      </div>
    </div>
  );
}