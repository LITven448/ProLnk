import { useState } from 'react';

interface StainCategory {
  id: string;
  label: string;
  icon: string;
  characteristics: string[];
  diagnosis: string;
  action: string;
  urgency: string;
}

const categories: StainCategory[] = [
  {
    id: "water",
    label: "Water Stains",
    icon: "💧",
    characteristics: [
      "Brown ring on ceiling",
      "Yellow/tan ceiling stain",
      "White tide marks on wall",
      "Drip streaks on wall",
    ],
    diagnosis: "Brown rings indicate an active leak above — the stain boundary is still absorbing moisture. Yellow or tan stains with no soft drywall suggest an old, dried leak that may have self-resolved (e.g., condensation from a single event). White tide marks on walls are typically mineral deposits from evaporated water, not an active leak. Drip streaks that are still damp require immediate professional evaluation.",
    action: "For brown rings: press gently — if drywall is soft or spongy, the leak is active. Call a plumber immediately. For yellow historical stains: inspect attic above on a dry day for any residual moisture or mold before assuming resolved.",
    urgency: "Active brown ring = urgent. Historical yellow stain = schedule inspection within 30 days.",
  },
  {
    id: "foundation",
    label: "Foundation Stains",
    icon: "🏗️",
    characteristics: [
      "White powdery deposits on concrete/block",
      "White crystalline crust on brick",
      "Dark wet patches on foundation wall",
      "Orange/rust staining on concrete",
    ],
    diagnosis: "White powdery or crystalline deposits (efflorescence) are mineral salts left behind as water moves through concrete or masonry and evaporates. Efflorescence itself is cosmetic — but it confirms water is moving through your foundation. Dark wet patches indicate active water intrusion. Orange rust staining indicates oxidizing rebar inside the concrete — a structural concern.",
    action: "Efflorescence: improve exterior grading and drainage to reduce water pressure against foundation. Dark wet patches: waterproofing assessment needed. Rust staining: structural engineer consultation recommended.",
    urgency: "Efflorescence = monitor. Wet patches = schedule assessment. Rust = priority consultation.",
  },
  {
    id: "mold",
    label: "Mold vs. Mildew",
    icon: "🦠",
    characteristics: [
      "Black or green fuzzy spots on walls/ceiling",
      "White powdery surface growth in bathroom",
      "Musty smell without visible growth",
      "Pink or orange slime in shower",
    ],
    diagnosis: "DFW average humidity of 60–70% makes both mold and mildew common. Mildew is surface-level (typically white or gray, flat, powdery) and found in high-humidity bathrooms — treatable with surface cleaners. Mold is typically black, green, or dark and may penetrate drywall, insulation, or framing. Musty smell without visible growth often indicates mold inside walls or under flooring. Pink/orange slime is Serratia bacteria (loves moisture, not dangerous but indicates chronic humidity).",
    action: "Surface mildew: ventilate, use mildew-resistant paint. Visible mold larger than 10 sq ft: professional remediation required. Musty smell with no visible source: professional moisture assessment and possible drywall exploratory work.",
    urgency: "Surface mildew = DIY. Mold patches = schedule remediation. Hidden mold smell = urgent assessment.",
  },
  {
    id: "hvac",
    label: "HVAC Drip Stains",
    icon: "❄️",
    characteristics: [
      "Rust-colored drips around air handler unit",
      "Water stain below attic air handler",
      "Mineral crust on condensate drain pan",
      "Wet insulation near HVAC closet",
    ],
    diagnosis: "Rust-colored drips around an air handler (typically in attic or utility closet) indicate the condensate drain pan has been overflowing — often because the primary drain line is clogged with algae or debris. This is one of the most common DFW summer HVAC failures. Mineral crust in the drain pan confirms standing water that has evaporated repeatedly. Wet insulation near the unit means the overflow has been ongoing long enough to saturate building materials.",
    action: "Clear condensate drain line with compressed air or algaecide tablets (preventive maintenance, $15–30/year). If insulation is wet: replace immediately — wet insulation promotes mold within 48 hours in DFW summer conditions.",
    urgency: "Rust drips = HVAC tune-up this week. Wet insulation = same-day remediation.",
  },
  {
    id: "hardwater",
    label: "Hard Water Stains",
    icon: "🚿",
    characteristics: [
      "White or gray film on faucets/fixtures",
      "Blue-green staining on copper fixtures",
      "Calcium crust around shower head",
      "Cloudy glass shower doors",
    ],
    diagnosis: "DFW water hardness ranges 300–500 ppm (very hard), among the highest in Texas. This leaves calcium and magnesium deposits on every surface that contacts tap water. Blue-green staining on copper or brass fixtures indicates slightly acidic water reacting with copper — common in North Texas and indicates the need for a pH test. Calcium crust on shower heads reduces water flow and spray pattern over time.",
    action: "Remove existing deposits: white vinegar soak for faucets/shower heads (30–60 min), commercial calcium remover for glass. Prevention: whole-home water softener ($1,200–2,500 installed) or point-of-use filters for drinking water. Annual descaling of water heater anode rod extends life 3–5 years in DFW hard water conditions.",
    urgency: "Cosmetic = routine maintenance. Blue-green copper staining = schedule water test.",
  },
];

const stainCharacteristics: Record<string, string[]> = {
  water: ["Brown ring on ceiling", "Yellow/tan ceiling stain", "White tide marks on wall", "Drip streaks on wall"],
  foundation: ["White powdery deposits", "White crystalline crust on brick", "Dark wet patches", "Orange/rust staining"],
  mold: ["Black or green fuzzy spots", "White powdery surface growth", "Musty smell", "Pink or orange slime"],
  hvac: ["Rust-colored drips near HVAC", "Water stain below air handler", "Mineral crust in drain pan", "Wet insulation near HVAC"],
  hardwater: ["White film on fixtures", "Blue-green staining", "Calcium crust on shower head", "Cloudy glass doors"],
};

export default function StainRemovalGuide() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  const toggleChar = (char: string) => {
    setSelectedChars((prev) =>
      prev.includes(char) ? prev.filter((c) => c !== char) : [...prev, char]
    );
  };

  const getBestMatch = (): StainCategory | null => {
    if (selectedChars.length === 0) return null;
    let best: StainCategory | null = null;
    let bestCount = 0;
    for (const cat of categories) {
      const matches = cat.characteristics.filter((c) => selectedChars.includes(c)).length;
      if (matches > bestCount) {
        bestCount = matches;
        best = cat;
      }
    }
    return best;
  };

  const match = getBestMatch();

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #0f2a4a 100%)", padding: "72px 24px 56px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#60a5fa", fontWeight: 600, letterSpacing: "2px", marginBottom: "14px" }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 800, margin: "0 0 18px", lineHeight: 1.15 }}>
          DFW Stain & Damage Guide — Identify and Fix Common Home Surface Problems
        </h1>
        <p style={{ fontSize: "17px", color: "#94a3b8″, maxWidth: "620px", margin: "0 auto" }}>
          DFW's hard water, humid summers, and clay soil create predictable stain patterns. Know what you’re looking at before you call a pro — or panic.
        </p>
      </div>

      {/* Stain Encyclopedia */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 24px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "32px" }}>Stain Encyclopedia</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ background: "#111d35″, borderRadius: "12px", border: "1px solid #1e3a5f", overflow: "hidden" }}>
              <button
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                style={{ width: "100%", background: "none", border: "none", padding: "24px 28px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", textAlign: "left", color: "#fff" }}>
                <span style={{ fontSize: "28px" }}>{cat.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "18px" }}>{cat.label}</div>
                  <div style={{ color: "#60a5fa", fontSize: "13px", marginTop: "3px" }}>{cat.characteristics.slice(0, 2).join(" · ")}</div>
                </div>
                <span style={{ color: "#60a5fa", fontSize: "20px" }}>{selectedCategory === cat.id ? "−" : "+"}</span>
              </button>
              {selectedCategory === cat.id && (
                <div style={{ padding: "0 28px 28px", borderTop: "1px solid #1e3a5f" }}>
                  <div style={{ marginTop: "20px", marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>WHAT YOU'RE SEEING</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {cat.characteristics.map((c) => (
                        <span key={c} style={{ background: "#0d1f38″, border: "1px solid #1e3a5f", borderRadius: "6px", padding: "4px 10px", fontSize: "13px", color: "#94a3b8" }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>DIAGNOSIS</div>
                    <p style={{ color: "#cbd5e1″, fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{cat.diagnosis}</p>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>WHAT TO DO</div>
                    <p style={{ color: "#cbd5e1″, fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{cat.action}</p>
                  </div>
                  <div style={{ background: "#0d1f38″, borderRadius: "8px", padding: "12px 16px", borderLeft: "3px solid #f59e0b" }}>
                    <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "13px" }}>URGENCY: </span>
                    <span style={{ color: "#94a3b8″, fontSize: "13px" }}>{cat.urgency}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Identifier */}
      <div style={{ background: "#0d1f38″, padding: "56px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "8px" }}>🔍 Stain Identifier Tool</h2>
          <p style={{ color: "#94a3b8″, fontSize: "14px", marginBottom: "32px" }}>Select every characteristic that matches what you're seeing. We'll identify the likely cause.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {Object.entries(stainCharacteristics).map(([catId, chars]) => {
              const cat = categories.find((c) => c.id === catId);
              return (
                <div key={catId}>
                  <div style={{ fontSize: "13px", color: "#60a5fa", fontWeight: 600, marginBottom: "10px" }}>{cat?.icon} {cat?.label}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {chars.map((char) => {
                      const active = selectedChars.includes(char);
                      return (
                        <button key={char} onClick={() => toggleChar(char)}
                          style={{ padding: "8px 14px", borderRadius: "8px", border: `1px solid ${active ? "#60a5fa" : "#1e3a5f"}`, background: active ? "#1e3a5f" : "transparent", color: active ? "#fff" : "#94a3b8″, fontSize: "13px", cursor: "pointer" }}>
                          {active ? "✓ " : ""}{char}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {match && (
            <div style={{ marginTop: "32px", background: "#111d35″, borderRadius: "12px", padding: "24px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{match.icon} Most Likely: <strong>{match.label}</strong></div>
              <p style={{ color: "#94a3b8″, fontSize: "14px", lineHeight: 1.6, marginBottom: "12px" }}>{match.diagnosis.split(".")[0]}.</p>
              <div style={{ background: "#0d1f38″, borderRadius: "8px", padding: "12px 16px", borderLeft: "3px solid #f59e0b" }}>
                <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "13px" }}>URGENCY: </span>
                <span style={{ color: "#94a3b8″, fontSize: "13px" }}>{match.urgency}</span>
              </div>
            </div>
          )}
          {selectedChars.length > 0 && !match && (
            <div style={{ marginTop: "24px", color: "#94a3b8″, fontSize: "14px" }}>Select more characteristics to narrow the diagnosis.</div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "72px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>Not Sure What You're Looking At?</h2>
        <p style={{ color: "#94a3b8″, fontSize: "16px", marginBottom: "28px" }}>Get a professional assessment from a vetted DFW pro — most inspections are free or low-cost.</p>
        <a href="/trustypro/book" style={{ background: "#60a5fa", color: "#0A1628″, padding: "16px 40px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get a Professional Assessment ↗
        </a>
      </div>
    </div>
  );
}
