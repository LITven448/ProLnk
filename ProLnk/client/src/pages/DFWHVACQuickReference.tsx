import { useState } from 'react';

const homeTypes = ["Single-story slab", "Two-story", "Older home (pre-2000)", "New construction", "Rental/investment"];

const baseCards = [
  { icon: "🌡️", title: "Temperature Setpoints", items: ["Home: 78°F", "Away: 85°F (never off)", "Sleeping: 75°F", "Emergency heat: 68°F"] },
  { icon: "📅", title: "Filter Schedule (DFW)", items: ["May–Oct: Monthly", "Nov–Apr: Every 60 days", "Use MERV 8–11″, "Never MERV 16+"] },
  { icon: "⚙️", title: "Tune-Up Timing", items: ["Spring: March–April", "Fall: September–October", "Cost: $89–$149″, "Book early — fills fast"] },
  { icon: "💧", title: "Drain Line Care", items: ["Flush monthly (May–Oct)", "Use 1 cup white vinegar", "Install float switch", "Check pan quarterly"] },
  { icon: "⚡", title: "Energy Benchmarks", items: ["Avg DFW bill: $180–$260/mo", "Each °F = 6–8% savings", "14 SEER2 min (TX law)", "18+ SEER2 = best ROI"] },
  { icon: "🔧", title: "Refrigerant Types", items: ["Pre-2010: R-22 (legacy)", "2010–2023: R-410A", "2024+: R-454B (new)", "Only EPA 608 tech can add"] },
  { icon: "🏗️", title: "Lifespan Benchmarks", items: ["AC unit: 12–18 years", "Furnace: 18–25 years", "Ductwork: 25–30 years", "Thermostat: 10+ years"] },
  { icon: "📞", title: "When to Call Immediately", items: ["Ice on refrigerant lines", "Water near air handler", "Burning smell from vents", "No cool air above 85°F outside"] },
  { icon: "💰", title: "Common Repair Costs", items: ["Service call: $89–$150″, "Capacitor: $150–$300", "Contactor: $150–$350", "Compressor: $1,400–$2,800"] },
];

const extraCards: Record<string, { icon: string; title: string; items: string[] }[]> = {
  "Two-story": [
    { icon: "🏠", title: "Two-Story Tips", items: ["Upstairs always 3–5°F warmer", "Consider dual-zone system", "Inspect attic insulation annually", "Upper unit works 20% harder"] },
  ],
  "Older home (pre-2000)": [
    { icon: "🕰️", title: "Older Home Priorities", items: ["Check for R-22 system", "Duct leakage test critical", "Insulation upgrade = big ROI", "Consider full system replacement"] },
  ],
  "New construction": [
    { icon: "🏗️", title: "New Construction Notes", items: ["Builder warranties: 1–2 years", "Register equipment immediately", "Test all zones at move-in", "Document serial numbers now"] },
  ],
  "Rental/investment": [
    { icon: "🏘️", title: "Rental Property Tips", items: ["Install smart thermostat + alerts", "Set tenant max setpoint: 76°F", "Quarterly filter checks", "Budget $800–$1,200/unit/year"] },
  ],
};

export default function DFWHVACQuickReference() {
  const [homeType, setHomeType] = useState("");

  const cards = homeType && extraCards[homeType]
    ? [...baseCards, ...extraCards[homeType]]
    : baseCards;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>📋</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HVAC Quick Reference</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>Everything you need at a glance — customized for North Texas</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 18, marginBottom: 28 }}>
          <label style={{ color: "#F5E642″, fontWeight: 700, display: "block", marginBottom: 10 }}>Your home type → customized cards</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: "#0A1628″, color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 15 }}>
            <option value="">Standard DFW reference</option>
            {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ background: "#1e293b", border: "1px solid #334155″, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{card.icon}</span>
                <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15 }}>{card.title}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {card.items.map((item, j) => (
                  <li key={j} style={{ color: "#cbd5e1″, fontSize: 14, padding: "4px 0", borderBottom: j < card.items.length - 1 ? "1px solid #1e3a5f" : "none" }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32, padding: 20, background: "#1e293b", borderRadius: 12 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔧 Need a DFW HVAC pro?</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: "0 0 16px" }}>ProLnk connects you with vetted North Texas HVAC technicians.</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Join ProLnk Waitlist</button>
        </div>
      </div>
    </div>
  );
}
