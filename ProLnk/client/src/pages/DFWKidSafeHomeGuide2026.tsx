import { useState } from 'react';

const ageGroups = [
  {
    age: "0–1 (Infant)",
    items: [
      { icon: "🔌", text: "GFCI outlets on all accessible circuits — TX code requires in new builds" },
      { icon: "🚪", text: "Stair gates top + bottom — hardware-mounted only at top of stairs" },
      { icon: "💊", text: "Lock all medication, cleaning supplies, and chemicals in high cabinet" },
      { icon: "🪟", text: "Window stops — prevent opening more than 4 inches on upper floors" },
      { icon: "🛁", text: "Water heater set to 120°F max — prevents scalding in under 2 sec" },
    ],
  },
  {
    age: "2–4 (Toddler)",
    items: [
      { icon: "🪟", text: "Window guards on all 2nd-floor windows — not the emergency egress" },
      { icon: "🏊", text: "Pool fence 4-ft min with self-latching gate — TX law, enforced in DFW" },
      { icon: "🗄️", text: "Anchor all tall furniture — bookshelves, dressers, TVs to wall studs" },
      { icon: "🔒", text: "Cabinet locks on all lower cabinets (kitchen + bath)" },
      { icon: "🔥", text: "Stove knob covers — prevent accidental ignition" },
    ],
  },
  {
    age: "5–9 (School Age)",
    items: [
      { icon: "🏊", text: "Pool alarm + pool cover weight-rated for child — layer of protection" },
      { icon: "🔫", text: "Gun safe required — biometric or keyed, TX law strongly recommended" },
      { icon: "🧹", text: "Store lawn chemicals in locked shed — mower fuel too" },
      { icon: "🧲", text: "Blind cord safety — replace with cordless or retrofit with breakaway" },
      { icon: "🚗", text: "Garage door auto-reverse test — lift sensor test per CPSC guideline" },
    ],
  },
  {
    age: "10+ (Preteen)",
    items: [
      { icon: "🔒", text: "Router parental controls + smart home device access limits" },
      { icon: "🔑", text: "Key lockboxes for emergency access — teach kids procedure" },
      { icon: "🏊", text: "Pool rules posted — no diving depth markers, adult supervision rules" },
      { icon: "🔧", text: "Teach safe tool use — locked workshop when unsupervised" },
      { icon: "📱", text: "Smart doorbell + camera reviewed monthly for activity" },
    ],
  },
];

export default function DFWKidSafeHomeGuide2026() {
  const [selected, setSelected] = useState<number>(0);
  const group = ageGroups[selected];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👶</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW Kid-Safe Home Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            Texas-specific childproofing priorities — pool laws, GFCI requirements, and more.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🎯 Select Your Child's Age Group</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {ageGroups.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#E8EAF0", border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "10px 6px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                {g.age}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {group.items.map((item, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "#CBD5E1″ }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🏊 Texas Pool Fence Law (Critical)</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {[["Minimum fence height", "4 feet on all sides"], ["Gate requirement", "Self-latching, self-closing, opens outward away from pool"], ["Climb resistance", "No footholds within 45\" of latch"], ["Door alarms", "Required on house doors opening directly to pool area"], ["Fine for violation", "Up to $500/day in many DFW municipalities"]].map(([k, v]) => (
              <div key={k as string} style={{ background: "#0A1628″, borderRadius: 8, padding: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94A3B8″, fontSize: 14 }}>{k}</span>
                <span style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Get Childproofing Pros</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk connects DFW families with licensed electricians, pool fencing, and home safety pros.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
