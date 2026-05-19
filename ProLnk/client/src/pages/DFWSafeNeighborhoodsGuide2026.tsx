import { useState } from 'react';

const priorities: Record<string, { checklist: string[]; areas: string[] }> = {
  "Low Crime Rate": {
    checklist: ["Check NeighborhoodScout.com for crime index (aim <20)","Visit DPD or local PD crime map portals","Drive through at 8am, 3pm, and 10pm","Look for visible code enforcement (no abandoned cars/trash)","Ask neighbors directly — knock on 3 doors"],
    areas: ["Southlake","Colleyville","Westlake","Highland Park","University Park"],
  },
  "Family Safety": {
    checklist: ["Check Megan Law/sex offender registry for the block","Verify school zone safety — traffic patterns near schools","Look for sidewalks, crosswalks, and street lighting","Research HOA enforcement history","Check city crime stats by category (violent vs property)"],
    areas: ["Frisco","Allen","Flower Mound","Coppell","Keller"],
  },
  "Investment Security": {
    checklist: ["Compare 5-year crime trend (improving vs worsening)","Check commercial development pipeline nearby","Review HOA financial health and reserve funds","Look at code enforcement violations on Zillow/public records","Assess neighboring properties for deferred maintenance"],
    areas: ["Prosper","McKinney","Celina","Trophy Club","Midlothian"],
  },
  "Urban Safety": {
    checklist: ["Use Dallas PD crime map for block-level data","Check specific crime types (auto theft is high metro-wide)","Visit at multiple times including evenings","Research neighborhood association activity","Look for recent business investment as leading indicator"],
    areas: ["Uptown Dallas","Bishop Arts","Legacy West","Addison","Las Colinas"],
  },
};

export default function DFWSafeNeighborhoodsGuide2026() {
  const [selected, setSelected] = useState<string>("");

  const result = selected ? priorities[selected] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Safest Neighborhoods Guide 2026</h1>
          <p style={{ color: "#9BA3B2", fontSize: 16 }}>Research safety the right way — tools, tactics, and DFW-specific areas</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[{ icon: "🔍", title: "NeighborhoodScout", desc: "Crime index 1–100, lower is safer" },{ icon: "🗺️", title: "Local PD Crime Maps", desc: "DPD, FWP, Plano PD all publish portals" },{ icon: "🏠", title: "HOA Quality", desc: "Active HOAs correlate with lower crime" },{ icon: "👥", title: "Talk to Neighbors", desc: "Best signal — knock on 3 doors" }].map(card => (
            <div key={card.title} style={{ background: "#0F1E35", borderRadius: 12, padding: 20, border: "1px solid #1E3A5F" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 600, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: "#9BA3B2", fontSize: 14 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, marginBottom: 32, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🎯 What Matters Most to You?</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {Object.keys(priorities).map(p => (
              <button key={p} onClick={() => setSelected(p)} style={{ padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", background: selected === p ? "#F5E642" : "#1A2E48", color: selected === p ? "#0A1628" : "#E8EAF0", fontWeight: 600, fontSize: 14 }}>{p}</button>
            ))}
          </div>
          {result && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#0A1628", borderRadius: 10, padding: 20, border: "1px solid #1E3A5F" }}>
                <h3 style={{ color: "#F5E642", marginBottom: 12, fontSize: 15 }}>✅ Research Checklist</h3>
                {result.checklist.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#CBD5E1" }}>
                    <span style={{ color: "#4ADE80", flexShrink: 0 }}>•</span><span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0A1628", borderRadius: 10, padding: 20, border: "1px solid #1E3A5F" }}>
                <h3 style={{ color: "#F5E642", marginBottom: 12, fontSize: 15 }}>📍 Top DFW Areas</h3>
                {result.areas.map(area => (
                  <div key={area} style={{ padding: "8px 0", borderBottom: "1px solid #1A2E48", fontSize: 14 }}>{area}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 12 }}>📌 DFW Safety Reality</h2>
          <p style={{ color: "#9BA3B2", lineHeight: 1.7 }}>Auto theft is the most common crime metro-wide — park in garages when possible. Suburbs like Southlake and Colleyville consistently rank in Texas top-10 safest. Urban neighborhoods vary dramatically block-by-block — always check at the specific address level, not just the neighborhood name.</p>
        </div>
      </div>
    </div>
  );
}

