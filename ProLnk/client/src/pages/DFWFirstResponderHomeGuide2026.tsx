import { useState } from 'react';

export default function DFWFirstResponderHomeGuide2026() {
  const [role, setRole] = useState("");

  const programs: Record<string, { title: string; icon: string; detail: string }[]> = {
    police: [
      { icon: "🏘️", title: "Good Neighbor Next Door", detail: "HUD program: 50% off list price on HUD homes in designated DFW revitalization areas. Officers must live in home 3 years." },
      { icon: "💵", title: "Homes for Texas Heroes", detail: "Up to 5% down payment assistance + below-market interest rate through TSAHC. No repayment if you stay 3 years." },
      { icon: "🔗", title: "ProLnk Charter Priority", detail: "First responders get top-tier matching speed and Charter waitlist priority on the ProLnk platform." },
    ],
    fire: [
      { icon: "🏘️", title: "Good Neighbor Next Door", detail: "Firefighters qualify for 50% HUD home discount in revitalization zones. Strong inventory in south Dallas and Fort Worth." },
      { icon: "💵", title: "Homes for Texas Heroes", detail: "Fire personnel qualify for TSAHC DPA program — 3–5% down payment grant, no repayment required." },
      { icon: "🛠️", title: "ProLnk Network Trades", detail: "Connect with licensed HVAC, electrical, and plumbing pros who give first responder discounts in the ProLnk network." },
    ],
    ems: [
      { icon: "💵", title: "Homes for Texas Heroes DPA", detail: "EMS personnel qualify — 5% down payment assistance, competitive fixed rate through participating Texas lenders." },
      { icon: "🏠", title: "FHA with DPA Layer", detail: "Combine FHA 3.5% down with TSAHC grant to minimize cash to close. Works on DFW homes up to $450K." },
      { icon: "📋", title: "Employer-Assisted Programs", detail: "Some DFW hospital systems and county EMS agencies offer homebuyer assistance — check your HR department." },
    ],
    military: [
      { icon: "🎖️", title: "VA + Hero Programs Stack", detail: "Military first responders can often layer VA loan benefits with TSAHC programs for maximum DPA." },
      { icon: "🏡", title: "Texas Veterans Land Board", detail: "Low-rate home improvement loans for qualifying Texas veteran first responders up to $150K." },
      { icon: "💰", title: "Property Tax Exemption", detail: "Disabled veteran first responders may qualify for full property tax exemption — average $8K/yr savings in DFW." },
    ],
  };

  const labels: Record<string, string> = { police: "Law Enforcement 👮", fire: "Firefighter 🚒", ems: "EMS / Paramedic 🚑", military: "Military / Veteran FR 🎖️" };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚒</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW First Responder Home Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Exclusive programs for DFW first responders — most go unclaimed every year.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>Select your first responder type:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.keys(labels).map(k => (
              <button key={k} onClick={() => setRole(k)}
                style={{ background: role === k ? "#F5E642" : "#0f172a", color: role === k ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>

        {role && programs[role] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18 }}>Your Program Guide:</h2>
            {programs[role].map((p, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.icon} {p.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{p.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: "#F5E642", marginBottom: 12 }}>📍 DFW First Responder Housing Facts</h3>
          <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>TSAHC Homes for Texas Heroes has no income cap for most first responders</li>
            <li>Good Neighbor Next Door inventory updates weekly at HUD.gov — act fast on listings</li>
            <li>DFW revitalization zones include South Dallas, East Fort Worth, and parts of Garland</li>
            <li>Average first responder in DFW earns $58K–$85K — comfortably qualifies for $250–350K homes</li>
          </ul>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk First Responder Charter</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>First responders get Charter-tier priority on the ProLnk platform — fastest contractor matching in DFW.</div>
        </div>
      </div>
    </div>
  );
}