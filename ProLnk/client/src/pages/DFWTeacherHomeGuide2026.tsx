import { useState } from 'react';

export default function DFWTeacherHomeGuide2026() {
  const [situation, setSituation] = useState("");

  const programs: Record<string, { title: string; icon: string; detail: string }[]> = {
    firsttime: [
      { icon: "🏠", title: "Teacher Next Door (HUD)", detail: "K-12 teachers in Title I schools get 50% off HUD homes in designated areas. Must live there 3 years." },
      { icon: "💵", title: "Homes for Texas Heroes DPA", detail: "TSAHC offers 3–5% down payment assistance + reduced rate for certified Texas educators. No repayment required." },
      { icon: "📋", title: "My First Texas Home", detail: "30-year fixed, below-market rate + up to 5% DPA for first-time buyers. Income limits apply — most DFW teachers qualify." },
    ],
    experienced: [
      { icon: "🔁", title: "TSAHC Move-Up Program", detail: "Homes for Texas Heroes is not limited to first-time buyers — experienced teachers can use the 3% DPA grant too." },
      { icon: "🏫", title: "ISD Employer-Assisted Housing", detail: "Some DFW ISDs (check DISD, FWISD, Plano ISD) offer employer-assisted housing grants or forgivable loans for staff retention." },
      { icon: "🔗", title: "ProLnk Partner Program", detail: "School administrators and department heads qualify for ProLnk partner pricing on home services — contact us for program details." },
    ],
    administrator: [
      { icon: "🤝", title: "ProLnk School Partner Program", detail: "Principals and district administrators can refer staff to ProLnk and earn network income — a meaningful supplemental stream." },
      { icon: "🏦", title: "TSAHC No Income Cap Tiers", detail: "Higher-earning administrators may exceed some DPA income caps — work with TSAHC lender to find best fit." },
      { icon: "📊", title: "Investment Property Angle", label: "📊", detail: "Administrators buying in DFW affordable areas (Garland, Mesquite) can use FHA on primary, then rent and repeat." },
    ],
    student: [
      { icon: "🎓", title: "FHA 3.5% + DPA Stack", detail: "Education staff with 2+ years employment can use FHA as base and layer TSAHC DPA to minimize down payment." },
      { icon: "📍", title: "DFW Affordable Entry Points", detail: "Substitute and paraprofessional pay works in Garland, Mesquite, and South Fort Worth where median prices are $180–230K." },
      { icon: "💡", title: "Teacher Loan Forgiveness", detail: "PSLF forgiveness over 10 years can free up budget — factor in before deciding rent vs. buy." },
    ],
  };

  const labels: Record<string, string> = {
    firsttime: "First-Time Buyer 🏠",
    experienced: "Experienced Teacher 📚",
    administrator: "School Administrator 🏫",
    student: "Parapro / Support Staff 📝",
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Teacher Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>DFW educators have more homebuying power than they realize — use every program available.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>Select your educator situation:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.keys(labels).map(k => (
              <button key={k} onClick={() => setSituation(k)}
                style={{ background: situation === k ? "#F5E642" : "#0f172a", color: situation === k ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>

        {situation && programs[situation] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18 }}>Your Program Guide:</h2>
            {programs[situation].map((p, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.icon} {p.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{p.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: "#F5E642", marginBottom: 12 }}>📍 DFW Teacher Housing Facts 2026</h3>
          <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Average DFW teacher salary: $58K–$72K — qualifies for homes $220K–$300K with DPA stacking</li>
            <li>DISD, FWISD, and Plano ISD are exploring employer-assisted housing as a recruitment tool</li>
            <li>Teacher Next Door HUD inventory updates weekly — Title I school list on HUD.gov</li>
            <li>Garland ISD and Mesquite ISD areas have strong inventory under $230K</li>
          </ul>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk Educator Access</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>DFW educators get Charter waitlist priority and discounted home service matching through ProLnk.</div>
        </div>
      </div>
    </div>
  );
}