import { useState } from 'react';

export default function DFWHomeownerVeteranGuide2026() {
  const [status, setStatus] = useState("");

  const programs: Record<string, { title: string; icon: string; detail: string }[]> = {
    active: [
      { icon: "🏠", title: "VA Purchase Loan", detail: "0% down, no PMI, competitive rates. Best mortgage product available for DFW homes." },
      { icon: "📝", title: "IRRRL Streamline Refi", detail: "Reduce your VA loan rate with minimal paperwork — no appraisal required in most cases." },
      { icon: "🛠️", title: "VA SAH/SHA Grants", detail: "Up to $109K for disabled veterans needing home modifications for independent living." },
    ],
    disabled: [
      { icon: "♿", title: "VHAP Modification Program", detail: "Veteran Housing Assistance Program — ramps, widened doors, roll-in showers for service-connected disabilities." },
      { icon: "🏡", title: "Texas Veterans Land Board", detail: "Low-interest home improvement loans up to $150K for qualifying Texas veterans." },
      { icon: "💰", title: "Property Tax Exemption", detail: "100% disabled Texas veterans pay $0 property tax — major DFW savings (avg $6K–12K/yr)." },
    ],
    surviving: [
      { icon: "🤝", title: "Surviving Spouse VA Loan", detail: "Unremarried surviving spouses retain full VA loan benefit — 0% down, no PMI." },
      { icon: "📋", title: "DIC + Housing Grant", detail: "Dependency and Indemnity Compensation may pair with SAH/SHA grants for eligible spouses." },
      { icon: "🔗", title: "ProLnk Charter Priority", detail: "Veteran households get priority matching with ProLnk-verified contractors at no extra cost." },
    ],
    guard: [
      { icon: "📅", title: "90+ Days Active = VA Eligibility", detail: "National Guard/Reserve members with 90+ days active duty qualify for full VA loan benefits." },
      { icon: "🏦", title: "Texas VLB Home Improvement", detail: "Texas Veterans Land Board offers 3.24% fixed improvement loans regardless of federal VA status." },
      { icon: "🛡️", title: "Hazlewood Act Benefit", detail: "Not housing-specific but education hours can free up budget — indirect homeownership boost." },
    ],
  };

  const labels: Record<string, string> = { active: "Active Duty / Veteran", disabled: "Disabled Veteran (10%+)", surviving: "Surviving Spouse", guard: "Guard / Reserve" };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Veteran Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Veteran-specific programs for DFW homeownership — benefits most veterans never fully use.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>Select your veteran status:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.keys(labels).map(k => (
              <button key={k} onClick={() => setStatus(k)}
                style={{ background: status === k ? "#F5E642" : "#0f172a", color: status === k ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>

        {status && programs[status] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18 }}>Your Available Programs:</h2>
            {programs[status].map((p, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.icon} {p.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{p.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: "#F5E642", marginBottom: 12 }}>📍 DFW Veteran Housing Resources</h3>
          <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Dallas VA Regional Loan Center: 1-888-768-2132</li>
            <li>Texas Veterans Land Board: texasveterans.com — home improvement loans</li>
            <li>DFW has 300K+ veterans — strong contractor network serving VA borrowers</li>
            <li>Tarrant County and Collin County offer veteran property tax freeze programs</li>
          </ul>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk Veteran Priority Access</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>Veteran households receive Charter-tier matching with vetted DFW contractors who honor military service.</div>
        </div>
      </div>
    </div>
  );
}