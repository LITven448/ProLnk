import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "You can layer new shingles over old ones",
    verdict: "TRUE — BUT LIMITED",
    verdictColor: "#F59E0B",
    icon: "🏠",
    truth: "Texas building code allows up to 2 layers of shingles, but DFW roofers and insurers generally recommend full tear-off. A second layer traps heat (worsening DFW heat damage), adds 2–3 lbs per sq ft of weight, and hides decking rot that new shingles will not fix.",
    tip: "If your current roof already has 2 layers, full tear-off is your only legal option. Always ask your contractor before re-roofing.",
  },
  {
    id: 2,
    myth: "All impact-resistant shingles are Class 4″,
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🪨",
    truth: "Impact resistance is rated Class 1 through Class 4 per UL 2218. Only Class 4 qualifies for insurance discounts from most DFW carriers. Many shingles marketed as \"impact resistant\" are Class 1 or 2. Always request the UL 2218 test rating in writing.",
    tip: "Ask for the product data sheet and confirm UL 2218 Class 4 before signing any roofing contract in DFW.",
  },
  {
    id: 3,
    myth: "A new roof means no more leaks",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "💧",
    truth: "The quality of installation matters more than the shingle brand. Poor flashing around chimneys, skylights, and valleys is the #1 cause of leaks on brand-new DFW roofs. A cheap installer using premium shingles outperformed by an expert using standard shingles — every time.",
    tip: "Inspect flashings specifically during your post-installation walkthrough. Improperly sealed flashings are invisible until the first heavy DFW rain.",
  },
  {
    id: 4,
    myth: "I do not need a roof inspection after hail",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "⛈️",
    truth: "DFW averages 5–10 significant hail events per year. Hail damage is often invisible from the ground — granule loss and bruising damage asphalt below the surface, accelerating deterioration. Most DFW homeowner policies require timely claims after storms.",
    tip: "After any hail event over 3/4 inch (golf ball size is 1.75 inch), schedule a free inspection within 30 days.",
  },
];

export default function DFWRoofingMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Roofing Myths Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Roofing myths that cost DFW homeowners money — especially after hail season.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {myths.map((m) => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ backgroundColor: "#122040″, border: `2px solid ${selected === m.id ? "#F5E642" : "#1E3A5F"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>"{m.myth}"</p>
                  <span style={{ backgroundColor: m.verdictColor, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{m.verdict}</span>
                </div>
                <span style={{ color: "#F5E642″, fontSize: 20 }}>{selected === m.id ? "▲" : "▼"}</span>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 16, borderTop: "1px solid #1E3A5F", paddingTop: 16 }}>
                  <p style={{ color: "#CBD5E1″, lineHeight: 1.6, marginBottom: 12 }}>{m.truth}</p>
                  <div style={{ backgroundColor: "#0A1628″, borderLeft: "3px solid #F5E642", padding: "10px 14px", borderRadius: 6 }}>
                    <p style={{ color: "#F5E642″, fontSize: 13, fontWeight: 600 }}>💡 Pro Tip: {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, backgroundColor: "#122040″, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Get a Vetted DFW Roofer</p>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>ProLnk connects you with licensed, insured roofing contractors across Dallas-Fort Worth — no storm chasers.</p>
        </div>
      </div>
    </div>
  );
}
