import { useState } from 'react';

const issues = [
  { id: "standing", label: "Standing Water on Deck", icon: "💧" },
  { id: "equipment", label: "Water Near Equipment Pad", icon: "⚙️" },
  { id: "backwash", label: "Backwash Water Problem", icon: "🚰" },
  { id: "neighbor", label: "Runoff to Neighbor", icon: "🏠" },
];

const solutions: Record<string, { title: string; steps: string[]; cost: string; urgency: string }> = {
  standing: {
    title: "French Drain + Channel Drain System",
    urgency: "High — slip hazard and algae risk",
    cost: "$1,500 - $4,500",
    steps: [
      "📐 Assess current deck slope — minimum 1/8 inch per foot slope away from pool",
      "🔩 Install linear channel drain around pool perimeter (DFW standard: 4 inch drain)",
      "🌱 DFW clay soil drains poorly — connect drains to French drain or dry well",
      "🏗️ Resurface or re-slope deck sections that hold water (re-pour may be needed)",
      "✅ Ensure all drains flow to yard or storm sewer — not to pool or equipment",
      "📅 Inspect after every major DFW storm event (2+ inches in 1 hour)",
    ],
  },
  equipment: {
    title: "Equipment Pad Drainage and Grading",
    urgency: "Critical — rust and equipment damage risk",
    cost: "$800 - $2,500",
    steps: [
      "⚠️ Water near equipment = serious risk: pump motors, salt systems, heaters",
      "📐 Equipment pad must slope AWAY from motors — minimum 2% grade",
      "🔩 Install trench drain uphill of equipment pad to intercept water",
      "🏗️ Re-grade surrounding soil away from pad (DFW clay expands when wet)",
      "🌱 Add gravel bed around equipment for improved drainage",
      "✅ Seal any cracks in pad where water could pool under equipment",
    ],
  },
  backwash: {
    title: "Backwash Water Routing System",
    urgency: "Medium — neighbor and HOA compliance issue",
    cost: "$400 - $1,200",
    steps: [
      "🚰 DFW rule: backwash water must stay on your property OR go to sewer cleanout",
      "📐 Install backwash hose guide to direct water to back yard (away from street)",
      "🌱 Use backwash water to irrigate lawn — high in minerals, avoid repeat spotting",
      "🔩 Install dedicated backwash line to sanitary sewer cleanout (best solution)",
      "⚠️ NEVER direct backwash to storm drain — HOA/city violation in most DFW cities",
      "✅ Label backwash valve with direction for house sitters and renters",
    ],
  },
  neighbor: {
    title: "Property Line Runoff Correction",
    urgency: "High — neighbor relations and liability",
    cost: "$1,200 - $5,000",
    steps: [
      "🏠 Texas law: you cannot increase water flow to a neighbor's property",
      "📐 Survey drainage patterns during next major DFW rain event",
      "🔩 Install interceptor swale or berm along property line to redirect water",
      "🌱 Regrade lawn to direct pool runoff toward street or utility easement",
      "🏗️ French drain along property line as last resort",
      "✅ Document drainage correction — neighbor disputes are common in DFW",
    ],
  },
};

export default function DFWPoolDeckDrainage2026() {
  const [issue, setIssue] = useState("");
  const sol = issue ? solutions[issue] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌊</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Pool Deck Drainage Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>DFW clay soil absorbs water poorly — proper drainage is critical for equipment and safety</p>
        </div>

        <div style={{ background: "#1e2a4a", borderRadius: 10, padding: 14, marginBottom: 24, borderLeft: "4px solid #F5E642", fontSize: 13 }}>
          ⚠️ <strong style={{ color: "#F5E642" }}>DFW Clay Soil Alert:</strong> Expansive clay soil in DFW heaves and shifts when wet — drainage problems worsen over time and can crack your pool deck or shift equipment pads.
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🔧 Diagnose Your Drainage Issue</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
            {issues.map(is => (
              <button key={is.id} onClick={() => setIssue(is.id)}
                style={{ padding: "14px 12px", borderRadius: 10, border: `2px solid ${issue===is.id ? "#F5E642" : "#1e3a5f"}`, background: issue===is.id ? "#1e3a5f" : "#0A1628", color: "#fff", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 24 }}>{is.icon}</div>
                <div style={{ fontWeight: issue===is.id ? 700 : 400, fontSize: 13, marginTop: 4, color: issue===is.id ? "#F5E642" : "#fff" }}>{is.label}</div>
              </button>
            ))}
          </div>

          {sol && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>✅ Solution: {sol.title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: "#0f2035", borderRadius: 8, padding: 10 }}>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>Urgency</div>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{sol.urgency}</div>
                </div>
                <div style={{ background: "#0f2035", borderRadius: 8, padding: 10 }}>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>Estimated Cost</div>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{sol.cost}</div>
                </div>
              </div>
              {sol.steps.map((step, i) => (
                <div key={i} style={{ background: "#0f2035", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13 }}>{step}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>Need a drainage assessment for your DFW pool?</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>ProLnk connects you with DFW drainage and pool deck specialists</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get DFW Drainage Quotes 🌊</button>
        </div>
      </div>
    </div>
  );
}
