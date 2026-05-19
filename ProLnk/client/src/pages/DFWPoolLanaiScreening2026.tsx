import { useState } from 'react';

const situations = [
  { id: "open", label: "Open Pool, No Enclosure", icon: "🏊" },
  { id: "covered", label: "Pool with Pergola/Shade", icon: "⛱️" },
  { id: "pollen", label: "Heavy Pollen Problem", icon: "🌿" },
  { id: "mosquito", label: "Mosquito/Insect Issue", icon: "🦟" },
];

const guides: Record<string, { feasibility: string; cost: string; timeline: string; steps: string[]; hoaNote: string }> = {
  open: {
    feasibility: "Excellent Candidate",
    cost: "$15,000 - $35,000",
    timeline: "6-10 weeks",
    steps: [
      "📐 Measure pool perimeter + deck area for enclosure footprint",
      "🏛️ Submit HOA approval request (required in most DFW communities)",
      "📋 Pull City of Dallas/Fort Worth building permit (structural required)",
      "🔩 Aluminum frame installation — requires concrete footings in DFW clay soil",
      "🕸️ Fiberglass screen installation (18x14 mesh for mosquitoes)",
      "✅ City inspection and certificate of occupancy",
    ],
    hoaNote: "⚠️ HOA approval is mandatory in 85% of DFW neighborhoods. Submit detailed drawings.",
  },
  covered: {
    feasibility: "Great Starting Point",
    cost: "$12,000 - $28,000",
    timeline: "4-8 weeks",
    steps: [
      "🔍 Assess existing structure — pergola may serve as partial frame",
      "📐 Engineer review of existing structure load capacity (required in DFW)",
      "🏛️ HOA approval for enclosure conversion",
      "🔩 Extend/reinforce frame to create full enclosure",
      "🕸️ Screen all open panels including roof",
      "✅ Permit and final inspection",
    ],
    hoaNote: "⚠️ Converting an existing pergola to screened enclosure requires new permit even if pergola was already approved.",
  },
  pollen: {
    feasibility: "High ROI for DFW",
    cost: "$15,000 - $32,000",
    timeline: "6-10 weeks",
    steps: [
      "📊 DFW pollen season: Feb-May — screen enclosure eliminates 90% of pollen",
      "🕸️ Use 20x20 mesh screen for ultra-fine pollen filtration",
      "📐 Full enclosure with gasketed door seals for maximum pollen block",
      "🔩 Aluminum frame rated for DFW 100mph wind zone (required by code)",
      "🏛️ HOA + permit process (allow 4-6 weeks pre-construction)",
      "✅ Post-install: still skim water surface weekly during peak pollen",
    ],
    hoaNote: "✅ Pollen control is a compelling argument in HOA approval requests — document your case.",
  },
  mosquito: {
    feasibility: "Most Popular DFW Use Case",
    cost: "$15,000 - $35,000",
    timeline: "6-10 weeks",
    steps: [
      "🦟 DFW mosquito season: April-October — enclosure is most effective solution",
      "🕸️ 18x14 mesh fiberglass screen is the standard mosquito barrier",
      "🚪 Self-closing, self-latching screen doors are code-required",
      "💡 Consider solar-powered lighting inside enclosure",
      "🏛️ HOA + city permit required",
      "✅ Maintain positive pressure if possible to minimize gaps",
    ],
    hoaNote: "✅ Mosquito prevention is well-received by HOA boards — frame request around community health.",
  },
};

export default function DFWPoolLanaiScreening2026() {
  const [situation, setSituation] = useState("");
  const guide = situation ? guides[situation] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Pool Screen Enclosure Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Growing trend in DFW — screen enclosures combat pollen, mosquitoes, and debris year-round</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 28 }}>
          {[["🌿","DFW Pollen","90% reduction with proper mesh"],["🦟","Mosquitoes","April-October season in DFW"],["🍂","Debris","Eliminates most leaf and dirt cleanup"],["🌞","UV Protection","Optional UV-blocking screen available"]].map(([icon,t,d])=>(
            <div key={t} style={{ background: "#0f2035", borderRadius: 10, padding: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <div><div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{t}</div><div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>{d}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🏡 Select Your Pool Situation</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)}
                style={{ padding: "14px 12px", borderRadius: 10, border: `2px solid ${situation===s.id?"#F5E642":"#1e3a5f"}`, background: situation===s.id?"#1e3a5f":"#0A1628", color: "#fff", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontWeight: situation===s.id?700:400, fontSize: 13, marginTop: 4, color: situation===s.id?"#F5E642":"#fff" }}>{s.label}</div>
              </button>
            ))}
          </div>

          {guide && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                {[["Feasibility", guide.feasibility],["Estimated Cost", guide.cost],["Timeline", guide.timeline]].map(([label,val])=>(
                  <div key={label} style={{ background: "#0f2035", borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{val}</div>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: "#0f2035", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13 }}>{step}</div>
              ))}
              <div style={{ background: "#1e2a4a", borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 13, borderLeft: "3px solid #F5E642" }}>{guide.hoaNote}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>Ready for a DFW screen enclosure quote?</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>ProLnk connects you with licensed DFW screen enclosure contractors</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get DFW Enclosure Quotes 🏗️</button>
        </div>
      </div>
    </div>
  );
}