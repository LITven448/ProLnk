import { useState } from 'react';

const decadeMap: Record<string, { icon: string; title: string; urgency: string; detail: string }[]> = {
  "1950s-1960s": [
    { icon: "⚡", title: "Electrical Panel & Wiring", urgency: "High", detail: "Knob-and-tube or aluminum wiring common. Full rewire and 200A panel upgrade critical for safety and insurance." },
    { icon: "🚿", title: "Cast Iron Pipe Replacement", urgency: "High", detail: "60-70 year old drain lines corroding. Camera inspection + replacement with PVC before full failure." },
    { icon: "🏗️", title: "Foundation Repair", urgency: "High", detail: "Pier-and-beam homes need reblocking. Slab-on-grade shows significant settling after 60+ years on Arlington clay." },
    { icon: "🪟", title: "Window & Door Weatherization", urgency: "Medium", detail: "Original single-pane windows waste $200+/mo in cooling. Upgrade to double-pane — rebates available." },
  ],
  "1970s-1980s": [
    { icon: "🔌", title: "Panel Upgrade to 200A", urgency: "High", detail: "100A panels can't support EV chargers, heat pumps, or home offices. Upgrade now before code change." },
    { icon: "🏠", title: "Brick Mortar Repointing", urgency: "Medium", detail: "Mid-century brick homes need mortar inspection every 20 years. Cracks allow water infiltration." },
    { icon: "💧", title: "Galvanized Pipe Assessment", urgency: "Medium", detail: "Galvanized supply lines corrode internally. Low water pressure is the first sign — replace with copper or PEX." },
    { icon: "❄️", title: "HVAC Replacement", urgency: "High", detail: "Units 40+ years old. R-22 refrigerant unavailable. Replace with high-efficiency split system — saves $150+/mo." },
  ],
  "1990s-2000s": [
    { icon: "🏚️", title: "Foundation Monitoring", urgency: "Medium", detail: "30-year-old slabs on Arlington clay soil show door/window sticking. Monitor cracks quarterly." },
    { icon: "🌧️", title: "Roof Inspection", urgency: "Medium", detail: "25-35 year shingles near end of life. Arlington saw 8 hail events 2022-2025. Get a free inspection." },
    { icon: "🛁", title: "Polybutylene Pipe Check", urgency: "High", detail: "PB pipe used 1990-1995 is failing nationwide. Check supply lines — replace immediately if present." },
    { icon: "🎨", title: "Exterior Envelope Sealing", urgency: "Low", detail: "Caulk around windows, doors, and penetrations. Reduces cooling load 15% in Arlington summers." },
  ],
  "2010s-2020s": [
    { icon: "🛡️", title: "Warranty Documentation", urgency: "Low", detail: "Gather builder warranty docs and appliance manuals. Many 10-year structural warranties expire this decade." },
    { icon: "🌿", title: "Irrigation Audit", urgency: "Low", detail: "Smart controllers save 30% on Arlington water bills. Check heads for coverage and leak." },
    { icon: "🔥", title: "HVAC Filter & Coil Clean", urgency: "Low", detail: "Units in best shape — stay on quarterly filter schedule. Register for AT&T Stadium event-day HVAC surge alerts." },
    { icon: "🌳", title: "Tree Clearance from Roof", urgency: "Medium", detail: "New growth trees approaching roof line. 10-foot clearance minimum to prevent storm damage." },
  ],
};

export default function ArlingtonHomeownerGuide2026() {
  const [selected, setSelected] = useState("1970s-1980s");
  const decades = Object.keys(decadeMap);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏟️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "12px 0 4px" }}>Arlington TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Large diverse city · 1950s-2020s vintage mix · Mid-century brick homes · AT&T Stadium zone</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>
            🏟️ <strong style={{ color: "#F5E642" }}>Stadium District Note:</strong> Homes within 2 miles of AT&T Stadium experience increased traffic, parking, and vibration during events. Check foundation and driveway crack patterns annually if in the stadium zone.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642", marginBottom: 14 }}>Select Your Home Decade</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {decades.map(d => (
            <button key={d} onClick={() => setSelected(d)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: selected === d ? "#F5E642" : "#1e3a5f", backgroundColor: selected === d ? "#F5E642" : "transparent", color: selected === d ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              {d}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {decadeMap[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{item.title}</span>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: item.urgency === "High" ? "#7f1d1d" : item.urgency === "Medium" ? "#78350f" : "#14532d", color: item.urgency === "High" ? "#fca5a5" : item.urgency === "Medium" ? "#fcd34d" : "#86efac" }}>{item.urgency}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🔗 Find a trusted Arlington contractor today</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk matches Arlington homeowners with verified local pros — no guesswork.</p>
        </div>
      </div>
    </div>
  );
}