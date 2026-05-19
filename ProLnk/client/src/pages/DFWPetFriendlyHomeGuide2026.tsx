import { useState } from 'react';

const petProfiles = [
  {
    pet: "Large Dog (60+ lbs)",
    icon: "🐕",
    mods: [
      { label: "Flooring", detail: "LVP (luxury vinyl plank) — scratch/claw resistant, waterproof, easy clean. Avoid hardwood." },
      { label: "Fence", detail: "6-ft privacy fence min — labs and retrievers can clear 5 ft. Check HOA rules in DFW." },
      { label: "Doggy Door", detail: "Large flap with energy seal — dual-flap magnetic closure to maintain HVAC efficiency." },
      { label: "Yard gate", detail: "Double-gate airlock prevents escape when entering; latch at 54\" height min." },
    ],
    cost: "$4,500–12,000″,
  },
  {
    pet: "Small Dog (under 25 lbs)",
    icon: "🐩",
    mods: [
      { label: "Flooring", detail: "LVP or tile — avoids splinters from hardwood; easy to clean accidents." },
      { label: "Fence", detail: "4-ft wood or vinyl; add coyote roller on top in Frisco/Allen/McKinney areas." },
      { label: "Doggy Door", detail: "Small flap with magnetic seal; install at pet height (varies by breed)." },
      { label: "HVAC filter", detail: "Upgrade to MERV-13 filter and run HVAC fan continuously — captures dander." },
    ],
    cost: "$2,000–6,000″,
  },
  {
    pet: "Cat (indoor/outdoor)",
    icon: "🐱",
    mods: [
      { label: "Catio", detail: "Screened outdoor enclosure attached to window — keeps cat safe, no yard required." },
      { label: "Window screens", detail: "Heavy-duty pet-proof screens (26-gauge aluminum) — cats push through standard screens." },
      { label: "Flooring", detail: "LVP preferred; cats scratch wood floors at baseboards — add painted MDF base." },
      { label: "Cat door", detail: "Install interior cat door between laundry and living — litter box containment." },
    ],
    cost: "$1,500–5,000″,
  },
  {
    pet: "Multiple Pets",
    icon: "🐾",
    mods: [
      { label: "Whole-home air", detail: "Install whole-home air purifier on HVAC + MERV-13 filters; change monthly." },
      { label: "Mudroom station", detail: "Built-in pet washing station — dog wash sink near garage entry, $1,200–3,000." },
      { label: "LVP throughout", detail: "Replace all carpet with LVP — odors embed in carpet fibers permanently." },
      { label: "Outdoor run", detail: "Side yard dog run with gravel or concrete base — contains mess, separates pets." },
    ],
    cost: "$8,000–25,000″,
  },
];

export default function DFWPetFriendlyHomeGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const profile = selected !== null ? petProfiles[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐾</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW Pet-Friendly Home Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            65%+ of DFW households have pets — here is how to upgrade your home for them.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🐾 Select Your Pet Type</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {petProfiles.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? "#1a3a6b" : "#0A1628″, border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: "14px", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 28 }}>{p.icon}</div>
                <div style={{ color: "#E8EAF0″, fontWeight: 600, marginTop: 6 }}>{p.pet}</div>
                <div style={{ color: "#F5E642″, fontSize: 13, marginTop: 2 }}>Est. {p.cost}</div>
              </button>
            ))}
          </div>
        </div>

        {profile && (
          <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>
              {profile.icon} Recommended Modifications — {profile.pet}
            </h2>
            <div style={{ display: "grid", gap: 10 }}>
              {profile.mods.map((m, i) => (
                <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ color: "#94A3B8″, fontSize: 14 }}>{m.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, background: "#1a3a6b", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <span style={{ color: "#F5E642″, fontWeight: 700 }}>💰 Total estimated investment: {profile.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 12px" }}>❄️ Pet Door + HVAC Energy Tip</h2>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>DFW summers hit 100°F+ — a poorly sealed pet door can cost $30–60/month in lost cooling. Choose dual-flap magnetic-seal doors (brands: PetSafe, Endura Flap) and size correctly for your pet. Install on an interior wall or insulated door only — never on a window.</p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔨</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Get Pet-Friendly Home Pros</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk connects DFW pet owners with flooring, fencing, and HVAC contractors.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
