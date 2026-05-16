import { useState } from 'react';

const warrantyYears: Record<string, { covered: string[]; excluded: string[] }> = {
  "Year 1": {
    covered: ["Workmanship defects", "HVAC systems", "Plumbing", "Electrical", "Structural issues", "Roofing installation"],
    excluded: ["Owner-caused damage", "Normal wear and tear", "Cosmetic issues after 30 days"],
  },
  "Years 2-3": {
    covered: ["HVAC systems", "Plumbing distribution", "Electrical systems", "Structural"],
    excluded: ["Workmanship (expired)", "Cosmetic defects", "Appliances (manufacturer warranty applies)"],
  },
  "Years 4-10": {
    covered: ["Structural defects", "Load-bearing walls", "Foundation", "Roof structure"],
    excluded: ["HVAC (manufacturer warranty applies)", "Plumbing fixtures", "Electrical components"],
  },
  "Year 10+": {
    covered: ["Major structural defects only", "Foundation failure", "Roof structure collapse"],
    excluded: ["All systems", "Workmanship", "Most components"],
  },
};

export default function DFWNewBuilderWarrantyGuide2026() {
  const [selectedYear, setSelectedYear] = useState("Year 1");
  const [claimStep, setClaimStep] = useState(0);

  const claimSteps = [
    "📸 Document defect with photos and video immediately",
    "📝 Submit written notice to builder within warranty period",
    "📬 Send via certified mail — keep tracking receipt",
    "⏳ Builder has 14 days to respond in Texas",
    "🔍 Request independent inspection if builder denies claim",
    "⚖️ File with Texas TRCC if dispute continues",
  ];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13 }}>🏠 ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW New Builder Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>
          Understanding your builder warranty in DFW — what is covered, for how long, and how to file a claim before time runs out.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "🔨", label: "1-Year Workmanship", desc: "Defects in materials and labor" },
            { icon: "⚙️", label: "2-Year Systems", desc: "HVAC, plumbing, electrical" },
            { icon: "🏗️", label: "10-Year Structural", desc: "Foundation, load-bearing walls" },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", fontSize: 14, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>🔎 Warranty Year Checker</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {Object.keys(warrantyYears).map((yr) => (
              <button key={yr} onClick={() => setSelectedYear(yr)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                  backgroundColor: selectedYear === yr ? "#F5E642" : "#1e3a5f", color: selectedYear === yr ? "#0A1628" : "#fff" }}>
                {yr}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: 8 }}>✅ Still Covered</div>
              {warrantyYears[selectedYear].covered.map((c) => (
                <div key={c} style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 6 }}>• {c}</div>
              ))}
            </div>
            <div>
              <div style={{ color: "#f87171", fontWeight: 700, marginBottom: 8 }}>❌ Not Covered</div>
              {warrantyYears[selectedYear].excluded.map((e) => (
                <div key={e} style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 6 }}>• {e}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "#F5E642" }}>⚠️ What Voids Your Warranty</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>These actions can eliminate your builder warranty coverage entirely.</p>
          {["Using a third-party contractor for repairs without builder approval", "Owner-caused damage from misuse or neglect", "Unauthorized modifications to HVAC, plumbing, or electrical systems", "Skipping required maintenance (filters, caulking, grading)", "Water damage from owner-installed fixtures leaking"].map((w) => (
            <div key={w} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#f87171", fontSize: 16 }}>🚫</span>
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>{w}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>📋 How to File a Claim</h2>
          {claimSteps.map((step, i) => (
            <div key={i} onClick={() => setClaimStep(i)} style={{ display: "flex", gap: 12, marginBottom: 12, cursor: "pointer",
              padding: "10px 14px", borderRadius: 8, backgroundColor: claimStep === i ? "#1e3a5f" : "transparent" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: claimStep === i ? "#F5E642" : "#1e3a5f",
                color: claimStep === i ? "#0A1628" : "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: claimStep === i ? "#fff" : "#94a3b8", fontSize: 14 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🏠</div>
          <div style={{ fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>Track All Warranties in ProLnk Home Health Vault</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>Never miss a warranty deadline — store documents, set expiration alerts, and link your home to licensed pros.</div>
        </div>
      </div>
    </div>
  );
}
