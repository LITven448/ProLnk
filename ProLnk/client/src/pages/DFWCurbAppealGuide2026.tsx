import { useState } from 'react';

const homeStyles = ["Ranch", "Colonial", "Craftsman", "Modern", "Tudor", "Mediterranean"];
const priorities: Record<string, { item: string; roi: string; cost: string; emoji: string }[]> = {
  Ranch: [
    { item: "Fresh Exterior Paint", roi: "55%", cost: "$3,500–$7,000", emoji: "🎨" },
    { item: "New Front Door", roi: "75%", cost: "$1,500–$3,000", emoji: "🚪" },
    { item: "Landscape Refresh", roi: "50%", cost: "$2,000–$5,000", emoji: "🌿" },
    { item: "Driveway Repair", roi: "40%", cost: "$800–$3,000", emoji: "🛣️" },
    { item: "House Numbers & Mailbox", roi: "35%", cost: "$150–$500", emoji: "📬" },
  ],
  Colonial: [
    { item: "New Front Door", roi: "75%", cost: "$1,500–$3,000", emoji: "🚪" },
    { item: "Shutters & Trim Paint", roi: "60%", cost: "$1,000–$2,500", emoji: "🖼️" },
    { item: "Fresh Exterior Paint", roi: "55%", cost: "$4,000–$8,000", emoji: "🎨" },
    { item: "Landscape Refresh", roi: "50%", cost: "$2,000–$5,000", emoji: "🌿" },
    { item: "Driveway Sealing", roi: "38%", cost: "$300–$900", emoji: "🛣️" },
  ],
  Craftsman: [
    { item: "Fresh Exterior Paint", roi: "55%", cost: "$3,500–$7,000", emoji: "🎨" },
    { item: "Porch Refresh", roi: "65%", cost: "$2,000–$5,000", emoji: "🏡" },
    { item: "New Front Door", roi: "75%", cost: "$1,500–$3,000", emoji: "🚪" },
    { item: "Landscape Refresh", roi: "50%", cost: "$2,000–$5,000", emoji: "🌿" },
    { item: "House Numbers & Mailbox", roi: "35%", cost: "$150–$500", emoji: "📬" },
  ],
  Modern: [
    { item: "Driveway Pavers", roi: "45%", cost: "$8,000–$20,000", emoji: "🛣️" },
    { item: "Landscape — Minimalist", roi: "52%", cost: "$3,000–$7,000", emoji: "🌿" },
    { item: "New Front Door", roi: "75%", cost: "$2,000–$5,000", emoji: "🚪" },
    { item: "Exterior Paint — Neutral", roi: "55%", cost: "$4,000–$9,000", emoji: "🎨" },
    { item: "Entry Lighting Upgrade", roi: "40%", cost: "$500–$2,000", emoji: "💡" },
  ],
  Tudor: [
    { item: "Fresh Exterior Paint", roi: "55%", cost: "$5,000–$10,000", emoji: "🎨" },
    { item: "Landscape Refresh", roi: "50%", cost: "$3,000–$6,000", emoji: "🌿" },
    { item: "New Front Door", roi: "75%", cost: "$2,000–$4,000", emoji: "🚪" },
    { item: "Driveway Repair", roi: "40%", cost: "$1,000–$3,500", emoji: "🛣️" },
    { item: "House Numbers & Mailbox", roi: "35%", cost: "$200–$600", emoji: "📬" },
  ],
  Mediterranean: [
    { item: "Stucco Touch-Up & Paint", roi: "58%", cost: "$3,000–$8,000", emoji: "🎨" },
    { item: "Landscape — Drought-Tolerant", roi: "52%", cost: "$3,000–$7,000", emoji: "🌿" },
    { item: "New Front Door", roi: "75%", cost: "$2,000–$5,000", emoji: "🚪" },
    { item: "Tile Entry Path", roi: "45%", cost: "$2,000–$6,000", emoji: "🛣️" },
    { item: "Outdoor Lighting", roi: "40%", cost: "$800–$2,500", emoji: "💡" },
  ],
};

export default function DFWCurbAppealGuide2026() {
  const [selected, setSelected] = useState("Ranch");
  const list = priorities[selected] ?? [];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏡</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Curb Appeal Guide 2026</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>Top upgrades for the Dallas–Fort Worth market by home style</p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>Select your home style:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {homeStyles.map(s => (
              <button key={s} onClick={() => setSelected(s)}
                style={{ padding: "0.5rem 1.1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: selected === s ? "#F5E642" : "#1e3a5f", color: selected === s ? "#0A1628" : "#cbd5e1", fontWeight: 700 }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {list.map((item, i) => (
            <div key={i} style={{ background: "#0f2040", borderRadius: 12, padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>#{i + 1} — {item.item}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: 2 }}>Typical cost: {item.cost}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: "1.2rem" }}>{item.roi}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>avg ROI</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", background: "#0f2040", borderRadius: 12, padding: "1.25rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          💡 <strong style={{ color: "#F5E642" }}>DFW Pro Tip:</strong> First impressions drive 55% of buyer decisions. In DFW's competitive market, curb appeal upgrades typically return $1.40–$1.75 per $1 spent.
        </div>
      </div>
    </div>
  );
}
