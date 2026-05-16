import { useState } from 'react';

const budgets = ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K+"];

const kitchens: Record<string, { scope: string[]; roi: string; sqft: string; permit: string; timeline: string; notes: string }> = {
  "Under $10K": {
    scope: ["Freestanding grill ($1,500–$3,000)", "Portable countertop station", "String lights + fan", "Mini-fridge (optional)"],
    roi: "50–60%", sqft: "60–100 sq ft",
    permit: "No permit required for freestanding/portable setup",
    timeline: "1–2 weeks",
    notes: "Perfect starter outdoor kitchen — freestanding equipment can move if you relocate. DFW 9-month season means near-daily use value."
  },
  "$10K–$25K": {
    scope: ["Built-in grill ($2,500–$5,000)", "Concrete or tile countertop", "Under-counter refrigerator", "Basic lighting", "Partial shade structure"],
    roi: "60–70%", sqft: "100–200 sq ft",
    permit: "Permit required for gas line connection — typical DFW cities: $150–$400",
    timeline: "3–6 weeks",
    notes: "Most popular DFW outdoor kitchen tier. Gas line permit required — hire licensed plumber for hookup. Concrete countertops handle DFW heat best."
  },
  "$25K–$50K": {
    scope: ["Premium built-in grill + side burners ($4,000–$8,000)", "Granite or concrete counters", "Built-in refrigerator + ice maker", "Pergola with fan + lighting", "Bar seating", "Outdoor speakers"],
    roi: "65–75%", sqft: "200–350 sq ft",
    permit: "Permit for gas line + electrical + structure — budget $500–$1,500 for permits",
    timeline: "6–10 weeks",
    notes: "DFW buyers pay premium for full outdoor kitchen with pergola. Granite counters handle 100F+ heat without expansion issues."
  },
  "$50K+": {
    scope: ["Professional grill + smoker + pizza oven", "Full granite kitchen suite", "Outdoor fridge + dishwasher + sink", "Covered pavilion with ceiling fans", "TV + audio system", "Pool bar integration"],
    roi: "70–80%", sqft: "350–600+ sq ft",
    permit: "Full permit package — gas, electrical, structural — $1,500–$4,000. May require HOA approval.",
    timeline: "12–20 weeks",
    notes: "Premium outdoor living room. In DFW $500K+ home market, this tier adds $40K–$70K in buyer perceived value. Pool integration maximizes ROI."
  },
};

export default function DFWOutdoorKitchenGuide2026() {
  const [budget, setBudget] = useState("Under $10K");
  const kit = kitchens[budget];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🍖</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Outdoor Kitchen Guide 2026</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>9-month outdoor season makes this one of DFW highest-ROI upgrades</p>
        </div>
        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>Your Budget:</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {budgets.map(b => (
              <button key={b} onClick={() => setBudget(b)}
                style={{ padding: "0.6rem 1.2rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: budget === b ? "#F5E642" : "#1e3a5f",
                  color: budget === b ? "#0A1628" : "#cbd5e1", fontWeight: 700, flex: 1 }}>{b}</button>
            ))}
          </div>
        </div>
        {kit && (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: "1.2rem" }}>📐 {kit.sqft}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Typical footprint</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: "1.2rem" }}>{kit.roi} ROI</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>DFW avg return</div>
              </div>
            </div>
            <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>Scope:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
              {kit.scope.map((s, i) => <div key={i} style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>✅ {s}</div>)}
            </div>
            <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }}>📋 Permit Requirements</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{kit.permit}</div>
            </div>
            <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }}>⏱️ Timeline</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{kit.timeline}</div>
            </div>
            <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: "0.75rem", color: "#94a3b8", fontSize: "0.9rem" }}>💡 {kit.notes}</div>
          </div>
        )}
        <div style={{ marginTop: "1.5rem", background: "#0f2040", borderRadius: 12, padding: "1.25rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          ☀️ <strong style={{ color: "#F5E642" }}>DFW Outdoor Season:</strong> March through November = 9 months of outdoor cooking weather. Use granite or concrete countertops rated for DFW heat. Always pull gas line permits through your city.
        </div>
      </div>
    </div>
  );
}
