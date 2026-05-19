import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "Power strips protect all my electronics",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🔌",
    truth: "Basic power strips provide only overload protection (against too many amps). DFW experiences frequent lightning-induced voltage spikes. True surge protection requires a UL 1449-rated surge protector or ideally a whole-home surge protector installed at your panel.",
    tip: "Install a whole-home surge protector at your main panel — it costs $150–$400 installed and protects every outlet.",
  },
  {
    id: 2,
    myth: "LED bulbs do not get hot",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "💡",
    truth: "LEDs produce significantly less heat than incandescent bulbs, but they do generate heat at the base/driver. Enclosed fixtures trap this heat, degrading LEDs prematurely. Always check for \"enclosed fixture rated\" labeling before installing in cans or sealed fixtures.",
    tip: "Look for the enclosed fixture rating on the LED bulb packaging — most standard LEDs lack it.",
  },
  {
    id: 3,
    myth: "Any electrician can do any electrical work in Texas",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "📋",
    truth: "Texas requires TDLR (Texas Department of Licensing and Regulation) licensure for electrical work. Apprentice, Journeyman, and Master Electrician are distinct license classes. Unlicensed electrical work voids homeowner insurance in Texas and creates liability during a home sale.",
    tip: "Verify your electrician at license.tdlr.texas.gov before any project — it takes 30 seconds.",
  },
  {
    id: 4,
    myth: "A tripping breaker just needs to be reset",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "⚡",
    truth: "Breakers trip for a reason — overloaded circuit, short circuit, or ground fault. Repeatedly resetting a tripping breaker without diagnosis is a fire hazard. DFW homes with older wiring (pre-1990) are especially at risk of undersized circuits that can overheat.",
    tip: "If a breaker trips more than twice in a week, call a licensed electrician for a circuit evaluation.",
  },
];

export default function DFWElectricalMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Electrical Myths Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Electrical misconceptions that create fire hazards and void insurance for DFW homeowners.</p>
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
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⚡ Get a Vetted DFW Electrician</p>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>ProLnk verifies TDLR licensure for every electrician in our Dallas-Fort Worth network.</p>
        </div>
      </div>
    </div>
  );
}
