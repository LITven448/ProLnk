import { useState } from 'react';

const scenarios = [
  { id: "standard_reroof", label: "Standard reroof — same footprint", icon: "🏠",
    rec: "OSB",
    detail: "For a standard DFW reroof with no underlying damage, existing OSB decking is adequate if it is structurally sound. Inspect for soft spots, water damage, and delamination. Replace damaged panels before shingling. No mandatory upgrade required unless existing deck is failing.",
    upgrade: "Consider ZIP System if budget allows — it adds a built-in moisture barrier useful during DFW spring rain seasons when tear-off and re-install often span multiple days." },
  { id: "hail_damage", label: "Hail damage replacement", icon: "⛈️",
    rec: "Plywood",
    detail: "After DFW hail events, upgrading from OSB to plywood decking is a worthwhile investment during insurance-funded replacement. Plywood handles impact stress better and is less prone to edge swelling from moisture infiltration common when roofs are damaged.",
    upgrade: "If upgrading substrate during hail claim, confirm with your adjuster — many DFW insurance policies will cover substrate upgrade if existing decking is found damaged during inspection." },
  { id: "new_construction", label: "New DFW construction project", icon: "🏗️",
    rec: "ZIP System",
    detail: "For new construction in DFW, ZIP System sheathing is the premium choice — it combines structural sheathing with a built-in moisture barrier, eliminating the need for housewrap on vertical walls and felt on roof decks. Adds $800–$2,000 to typical DFW home project cost.",
    upgrade: "ZIP System's continuous air barrier improves energy efficiency — important for DFW's extreme summer cooling loads. Many high-performance DFW builders have made it standard." },
  { id: "wood_rot", label: "Existing deck has rot or damage", icon: "🍂",
    rec: "Plywood",
    detail: "When replacing damaged decking in DFW, plywood (15/32 or 19/32 CDX) outperforms OSB in moisture-compromised conditions. Plywood holds fasteners better at edges and is more forgiving if future moisture exposure occurs.",
    upgrade: "For areas with chronic leaks (valleys, penetrations), consider ZIP System panels in high-risk zones even if rest of deck is OSB — targeted upgrade for maximum protection at vulnerable points." },
  { id: "budget_project", label: "Budget-conscious reroof", icon: "💰",
    rec: "OSB",
    detail: "7/16 OSB is code-compliant and cost-effective for DFW reroofs. It performs adequately in normal conditions. Key: ensure proper installation, no gaps at panel edges, and H-clips for spans. OSB is appropriate when existing deck is sound and budget is constrained.",
    upgrade: "Even on a budget project, spending $200–$400 to upgrade valleys and penetrations to plywood is worthwhile — these are the highest-risk water infiltration zones in any DFW roof." },
];

const recColors: Record<string, string> = { OSB: "#f59e0b", Plywood: "#3b82f6″, "ZIP System": "#10b981" };

export default function DFWRoofingSubstrateGuide2026() {
  const [selected, setSelected] = useState("");

  const active = scenarios.find(s => s.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🪵</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Roofing Substrate Selection Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
            What goes under DFW shingles matters — especially in a hail zone with volatile spring weather. Know your substrate options before your reroof.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { name: "OSB", icon: "🟨", cost: "Lowest cost", desc: "Code-compliant, adequate for most DFW reroofs. 7/16\" standard. Susceptible to edge swelling if exposed to moisture.", color: "#f59e0b" },
            { name: "Plywood", icon: "🟦", cost: "Mid-range +10–15%", desc: "Stronger, better fastener holding at edges. Recommended for DFW hail zone upgrades. CDX 15/32 or 19/32.", color: "#3b82f6″ },
            { name: "ZIP System", icon: "🟩", cost: "Premium +20–30%", desc: "Built-in moisture barrier + structural sheathing. Best for new builds. Eliminates felt requirement.", color: "#10b981″ },
          ].map(s => (
            <div key={s.name} style={{ background: "#112240″, borderRadius: 10, padding: "1rem", borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 700, margin: "6px 0 2px" }}>{s.name}</div>
              <div style={{ color: "#F5E642″, fontSize: "0.75rem", marginBottom: 6 }}>{s.cost}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔎 Select Your Project Type</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id === selected ? "" : s.id)}
                style={{ background: selected === s.id ? "#1e3a5f" : "#0A1628″, border: `2px solid ${selected === s.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.875rem 1rem", cursor: "pointer", color: "#e2e8f0", textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.2s" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                <span style={{ fontWeight: selected === s.id ? 700 : 400 }}>{s.label}</span>
                {selected === s.id && <span style={{ marginLeft: "auto", background: recColors[s.rec], borderRadius: 4, padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{s.rec}</span>}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", borderLeft: `4px solid ${recColors[active.rec]}`, marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{active.icon}</span>
              <h3 style={{ color: "#F5E642″, margin: 0 }}>{active.label}</h3>
              <span style={{ background: recColors[active.rec], borderRadius: 4, padding: "2px 10px", fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Recommend: {active.rec}</span>
            </div>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: "0 0 0.75rem" }}>{active.detail}</p>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.875rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 600, fontSize: "0.85rem", marginBottom: 4 }}>⬆️ Upgrade Consideration</div>
              <p style={{ color: "#94a3b8″, fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{active.upgrade}</p>
            </div>
          </div>
        )}

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem" }}>
            🏠 Ready for DFW roofing bids? <span style={{ color: "#F5E642″ }}>ProLnk connects you with licensed contractors who specify correct substrate for your project.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
