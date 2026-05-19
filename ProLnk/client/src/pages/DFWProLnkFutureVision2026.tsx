import { useState } from 'react';

const visions = [
  {
    id: "homeowner",
    label: "DFW Homeowner",
    emoji: "🏠",
    stages: [
      { year: "2026″, title: "DFW Launch", desc: "ProLnk goes live in Dallas-Fort Worth. Homeowners get instant access to verified pros in every major trade. Home Health Vault launches — your home gets a permanent digital health record." },
      { year: "2027″, title: "Predictive Maintenance", desc: "ProLnk AI analyzes your Vault data and sends alerts before systems fail. Your HVAC is 8 years old and entering DFW heat season — get a tune-up now and avoid a $6,000 emergency replacement in July." },
      { year: "2028″, title: "Instant Visual Assessment", desc: "Photo your concern, AI analyzes it, and a matched pro calls within the hour. No more describing drips to a scheduler who has no idea what you mean — just show it." },
      { year: "2029″, title: "Insurance Integration", desc: "ProLnk connects to your homeowner insurance. After a hail storm, your adjuster gets pre-populated damage photos from your pro visit within 24 hours. Claims close in days, not months." },
      { year: "2030+", title: "Universal Trust Layer", desc: "Every DFW homeowner trusts ProLnk the way they trust their own doctor. Every service need — routine maintenance or emergency crisis — starts with ProLnk." },
    ],
  },
  {
    id: "pro",
    label: "DFW Pro",
    emoji: "🔧",
    stages: [
      { year: "2026″, title: "Charter Membership", desc: "25 Charter pros lock in at 149 per month permanently. Early entry to the DFW market at the lowest rate the platform will ever offer. Lead feed starts flowing immediately at launch." },
      { year: "2027″, title: "Network Income Scales", desc: "Charter pros who recruited other pros begin earning 4-level network overrides. A Charter pro with 20 recruited pros earns passive income from every job those pros complete across DFW." },
      { year: "2028″, title: "Houston and Austin Expansion", desc: "ProLnk enters Houston and Austin. DFW Charter pros who referred pros into those markets earn override income on every job completed statewide — not just DFW." },
      { year: "2029″, title: "National Platform", desc: "ProLnk operates in 15+ major metros. DFW Charter pros with national recruits earn income from coast to coast. The network income streams originally locked in at launch now generate significant passive revenue." },
      { year: "2030+", title: "Category Dominant", desc: "ProLnk becomes the default platform for home services professional life — leads, income tracking, performance coaching, and business development all in one place." },
    ],
  },
  {
    id: "investor",
    label: "Seed Investor",
    emoji: "💼",
    stages: [
      { year: "2026″, title: "Waitlist Validation", desc: "ProLnk launches DFW waitlist and proves demand — target 500 pro applications and 5,000 homeowner home registrations in year one. Data package prepared for seed round." },
      { year: "2027″, title: "Revenue Positive", desc: "At 500 active paying pros the platform reaches break-even. At 1,000 pros the gross margin is 85% on 379K per month in recurring revenue. Unit economics are proven." },
      { year: "2028″, title: "Series A Ready", desc: "ProLnk enters two new major metros with proven DFW playbook. Retention rates, match conversion, and net promoter scores are benchmarked and investor-ready." },
      { year: "2029″, title: "Data Moat Established", desc: "Home Health Vault contains 500,000+ home records. The data asset itself becomes the defensible moat — no competitor can replicate years of home condition history." },
      { year: "2030+", title: "Exit or Public Markets", desc: "ProLnk operates at scale with 85%+ gross margin, autonomous AI operations, and a locked-in network of pros who cannot afford to leave. Multiple exit paths are available." },
    ],
  },
];

export default function DFWProLnkFutureVision2026() {
  const [active, setActive] = useState<string>("homeowner");
  const selected = visions.find((v) => v.id === active);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🚀</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>ProLnk Future Vision for DFW</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>2026 and Beyond — Select your perspective to see the roadmap</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
          {visions.map((v) => (
            <button key={v.id} onClick={() => setActive(v.id)}
              style={{ background: active === v.id ? "#F5E642″ : "#1e2d4a", border: "2px solid " + (active === v.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "0.8rem 1.5rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{v.emoji}</span>
              <span style={{ fontWeight: 700, color: active === v.id ? "#0A1628″ : "#F5E642", fontSize: "0.95rem" }}>{v.label}</span>
            </button>
          ))}
        </div>
        {selected && (
          <div>
            {selected.stages.map((stage, i) => (
              <div key={stage.year} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                  <div style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 900, fontSize: "0.75rem", padding: "0.3rem 0.5rem", borderRadius: 8, whiteSpace: "nowrap" }}>{stage.year}</div>
                  {i < selected.stages.length - 1 && <div style={{ width: 2, flex: 1, background: "#2d3f5e", marginTop: "0.5rem" }} />}
                </div>
                <div style={{ background: "#1e2d4a", border: "1px solid #2d3f5e", borderRadius: 12, padding: "1rem", flex: 1, marginBottom: i < selected.stages.length - 1 ? "0″ : "0" }}>
                  <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.3rem" }}>{stage.title}</div>
                  <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1.2rem", background: "#1e2d4a", borderRadius: 12, border: "2px solid #F5E642″ }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1.1rem" }}>🌟 The DFW Opportunity Is Now</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: "0.5rem" }}>Waitlist is open — 500 pro applications and 5,000 home registrations closes the founding round</div>
          <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.3rem" }}>prolnk.io — Built for DFW, expanding to the nation</div>
        </div>
      </div>
    </div>
  );
}
