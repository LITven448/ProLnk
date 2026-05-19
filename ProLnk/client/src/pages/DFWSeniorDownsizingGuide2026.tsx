import { useState } from 'react';

const priorities = [
  {
    id: "maintenance",
    label: "Low Maintenance",
    icon: "🛠️",
    communities: ["Lantana (Bartonville)", "Viridian (Arlington)", "Provence at Northlake"],
    details: "HOA-managed exterior, lawn, and irrigation. Look for vinyl siding or brick-only exteriors. No wood fencing. Zero-scaping options in west DFW.",
    homeTips: ["Single-story slab foundation", "Brick or fiber cement exterior only", "HOA covers lawn + irrigation", "Attached garage (no steps)"],
  },
  {
    id: "community",
    label: "55+ Community",
    icon: "🏘️",
    communities: ["Frisco Lakes (Frisco)", "Del Webb at Trinity Falls (McKinney)", "Sun City Texas (Georgetown, near DFW)", "Pecan Plantation (Granbury)"],
    details: "Age-qualified communities with amenity centers, pools, pickleball, and on-site social directors. Typically HOA $300-600/mo includes exterior maintenance.",
    homeTips: ["Gated security", "Clubhouse + pool + fitness", "Pickleball courts", "Social programming year-round"],
  },
  {
    id: "accessibility",
    label: "Accessibility First",
    icon: "♿",
    communities: ["McKinney", "Flower Mound", "Southlake"],
    details: "Single-story homes with wide hallways, roll-in showers, and zero-step entry. Many DFW builders offer universal design packages for $15-30K.",
    homeTips: ["Zero-step entry + wide doorways (36\")", "Roll-in shower + grab bars", "Lever door + faucet handles", "Single-story with no split-level"],
  },
  {
    id: "location",
    label: "Near Family",
    icon: "👨‍👩‍👧",
    communities: ["Allen", "Plano", "Prosper", "Celina"],
    details: "Proximity to adult children in north DFW suburbs. Many seniors choose north corridor for school districts near grandchildren. 20-30 min to DFW airport.",
    homeTips: ["Proximity to grandchildren school districts", "Guest room for visits", "Close to HEB + medical centers", "Easy highway access (75, 121, DNT)"],
  },
];

const sellPrep = [
  { icon: "🎨", task: "Interior repaint (neutral tones)", cost: "$3,500–6,000″ },
  { icon: "🌿", task: "Landscaping refresh + mulch", cost: "$800–2,500″ },
  { icon: "❄️", task: "HVAC service + filter replacement", cost: "$150–500″ },
  { icon: "🚿", task: "Re-caulk baths + kitchen", cost: "$300–600″ },
  { icon: "💡", task: "Update light fixtures + switches", cost: "$1,200–3,000″ },
  { icon: "🪟", task: "Window cleaning + screen repair", cost: "$400–900″ },
];

export default function DFWSeniorDownsizingGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const profile = selected !== null ? priorities[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏡</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW Senior Downsizing Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            Moving from a large family home to the right smaller home in DFW -- your complete guide.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🎯 What Matters Most to You?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {priorities.map((p, i) => (
              <button key={p.id} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? "#1a3a6b" : "#0A1628″, border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: 14, cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 26 }}>{p.icon}</div>
                <div style={{ color: "#E8EAF0″, fontWeight: 600, marginTop: 6, fontSize: 14 }}>{p.label}</div>
              </button>
            ))}
          </div>
        </div>

        {profile && (
          <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>
              {profile.icon} {profile.label} -- DFW Options
            </h2>
            <p style={{ color: "#94A3B8″, fontSize: 14, marginBottom: 16 }}>{profile.details}</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "#F5E642″, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Top DFW Communities:</div>
              {profile.communities.map((c) => (
                <div key={c} style={{ background: "#0A1628″, borderRadius: 6, padding: "8px 12px", marginBottom: 6, fontSize: 14, color: "#CBD5E1" }}>📍 {c}</div>
              ))}
            </div>
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>What to Look For:</div>
              {profile.homeTips.map((tip) => (
                <div key={tip} style={{ fontSize: 13, color: "#94A3B8″, padding: "4px 0" }}>{"✅"} {tip}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🏠 Pre-Sale Home Prep Checklist</h2>
          <p style={{ color: "#94A3B8″, fontSize: 13, marginBottom: 14 }}>These updates maximize sale price before listing your family home.</p>
          <div style={{ display: "grid", gap: 8 }}>
            {sellPrep.map((item) => (
              <div key={item.task} style={{ background: "#0A1628″, borderRadius: 8, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: "#CBD5E1″ }}>{item.task}</span>
                </div>
                <span style={{ color: "#F5E642″, fontWeight: 600, fontSize: 13, flexShrink: 0 }}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Prep Your Home for Sale</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk connects DFW seniors with painters, handymen, and landscapers to maximize sale price.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
