import { useState } from 'react';

const electricalConcerns = [
  {
    concern: "⚡ Safety Devices",
    terms: [
      { word: "GFCI", def: "Ground Fault Circuit Interrupter — outlet or breaker that trips within 1/40th of a second when current leaks to ground. Required in DFW kitchens, baths, garages, and outdoor circuits since 1971." },
      { word: "AFCI", def: "Arc Fault Circuit Interrupter — breaker that detects dangerous arcing in wiring (loose connections, staple-pierced wires). Required in all DFW bedrooms, living areas, and hallways per 2014 NEC." },
      { word: "Dual-Function Breaker", def: "Single breaker providing both arc fault and ground fault protection — now required in DFW kitchens and bathrooms by 2023 NEC." },
      { word: "Tamper-Resistant Outlet", def: "Outlet with spring-loaded shutters that block foreign objects. Required in all new DFW residential construction since 2008 NEC." },
      { word: "Surge Protector", def: "Device that diverts voltage spikes to ground — whole-home units installed at the panel protect appliances from DFW lightning events." },
    ],
  },
  {
    concern: "🔌 Wiring Basics",
    terms: [
      { word: "AWG", def: "American Wire Gauge — wire sizing system. Lower number = thicker wire = more capacity. 14 AWG for 15A circuits, 12 AWG for 20A, 10 AWG for 30A." },
      { word: "Romex", def: "Brand name for NM-B (non-metallic) cable — flat sheathed wire used inside DFW home walls and ceilings. Not permitted outdoors or in conduit." },
      { word: "Hot", def: "Current-carrying wire (black or red) that delivers power to devices. Always assume it is live until tested." },
      { word: "Neutral", def: "Return wire (white) that completes the circuit back to the panel. Carries current — do not confuse with ground." },
      { word: "Ground", def: "Safety wire (bare copper or green) that provides a fault current path to trip the breaker. Carries no current during normal operation." },
    ],
  },
  {
    concern: "🏠 Panel and Service",
    terms: [
      { word: "Load Center", def: "The breaker panel (often called the fuse box) where circuits originate. DFW homes typically have 200A service; older homes may have 100A." },
      { word: "Service Entrance", def: "Point where utility wires enter your home — either underground or overhead. The utility owns up to the meter; you own from meter to panel." },
      { word: "Circuit Breaker", def: "Protective switch that automatically opens (trips) when overloaded. Two-pole breakers (240V) control large appliances; single-pole (120V) control standard circuits." },
      { word: "Main Disconnect", def: "Single breaker at top of panel that cuts all power to the home — required within 10 feet of the meter by NEC 230.85." },
      { word: "Bus Bar", def: "Metal bar in the panel where circuit breakers connect. Hot buses are insulated; neutral and ground buses are separate in main panels." },
    ],
  },
  {
    concern: "⚠️ Faults and Failures",
    terms: [
      { word: "Short Circuit", def: "Hot wire touches neutral or ground — creates massive current surge that trips the breaker immediately. Often caused by damaged insulation." },
      { word: "Overload", def: "Too many devices on one circuit draw more current than the wire can safely carry — breaker trips to prevent fire." },
      { word: "Arc Fault", def: "Unintended electrical discharge across a gap or through damaged insulation — leading cause of residential electrical fires in DFW." },
      { word: "Ampacity", def: "Maximum continuous current a wire can carry safely based on insulation rating and installation method. Exceed it and you create a fire risk." },
      { word: "Voltage Drop", def: "Loss of voltage over long wire runs — causes dim lights and poor appliance performance. Remedy: larger wire gauge for long runs." },
    ],
  },
];

export default function DFWElectricalVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = electricalConcerns[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Electrical Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, margin: 0 }}>Electrical terms every DFW homeowner needs before calling an electrician</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {electricalConcerns.map((ec, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642″ : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {ec.concern}
            </button>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 14, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginTop: 0, marginBottom: 18 }}>{active.concern} Terms</h2>
          {active.terms.map((term, i) => (
            <div key={i} onClick={() => setActiveTerm(activeTerm === i ? null : i)}
              style={{ background: activeTerm === i ? "#1a2d48″ : "#0d1b2e", border: `1px solid ${activeTerm === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 10, padding: "14px 18px", marginBottom: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: activeTerm === i ? "#F5E642″ : "#e2e8f0", fontSize: 16 }}>{term.word}</span>
                <span style={{ color: "#F5E642″, fontSize: 18 }}>{activeTerm === i ? "▲" : "▼"}</span>
              </div>
              {activeTerm === i && <p style={{ color: "#94a3b8″, fontSize: 14, margin: "10px 0 0", lineHeight: 1.6 }}>{term.def}</p>}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#475569″, fontSize: 13, marginTop: 28 }}>© 2026 ProLnk · DFW Home Services Platform</p>
      </div>
    </div>
  );
}
