import { useState } from 'react';

const plumbingConcerns = [
  {
    concern: "🚰 Drains and Vents",
    terms: [
      { word: "P-Trap", def: "Curved pipe under every sink and shower that holds a water seal, blocking sewer gas from entering your home. Required by Texas plumbing code." },
      { word: "S-Trap", def: "Old-style trap that siphons dry — banned in modern plumbing because it lets sewer gas pass. Found in pre-1990 DFW homes." },
      { word: "DWV", def: "Drain-Waste-Vent — the complete drainage system. Drain pipes carry waste down; vent pipes carry sewer gas up and out the roof." },
      { word: "Wet Vent", def: "Pipe that serves as both a drain and a vent — allowed in Texas for certain fixture combinations to reduce pipe runs." },
      { word: "Clean-Out", def: "Capped access point in drain piping where a snake or hydro-jetter can be inserted to clear blockages without dismantling pipes." },
    ],
  },
  {
    concern: "🔧 Valves and Fittings",
    terms: [
      { word: "Ball Valve", def: "Quarter-turn valve with a ball that rotates to open/close — fast, reliable shutoff. Preferred for main water shutoffs in DFW." },
      { word: "Gate Valve", def: "Multi-turn valve that slides a gate to control flow — found in older DFW homes. Prone to failure when left closed for years." },
      { word: "PRV", def: "Pressure Reducing Valve — mounted at the main water entry, reduces city water pressure (often 100+ PSI in DFW) to safe 60–80 PSI." },
      { word: "SharkBite", def: "Push-to-connect fitting that requires no soldering — connects to copper, PEX, or CPVC. Approved for DFW residential use inside walls." },
      { word: "Compression Fitting", def: "Fitting that seals by compressing a brass ring (ferrule) onto the pipe — common on supply lines to toilets and faucets." },
    ],
  },
  {
    concern: "💧 Water Supply",
    terms: [
      { word: "Backflow Preventer", def: "Device that prevents contaminated water from flowing backward into the clean supply. Required by DFW cities on all irrigation systems." },
      { word: "Expansion Tank", def: "Small tank connected to water heater that absorbs pressure from thermal expansion. Required in DFW closed systems (with PRV)." },
      { word: "PEX", def: "Cross-linked polyethylene flexible pipe — flexible, freeze-resistant, and now the most common supply pipe in new DFW construction." },
      { word: "CPVC", def: "Chlorinated PVC pipe used for hot and cold supply lines — common in DFW homes built 1980–2005. Brittle with age; handle carefully." },
      { word: "Sweating Pipes", def: "Condensation forming on cold supply pipes — normal in DFW summer humidity. Insulate pipes to prevent drips onto wood and drywall." },
    ],
  },
  {
    concern: "🔩 Joints and Connections",
    terms: [
      { word: "Solder Joint", def: "Copper-to-copper connection made by heating the joint and flowing solder into the gap. Requires a plumbing license in Texas for supply lines." },
      { word: "Sweat Fitting", def: "Another term for a soldered copper fitting — the process of soldering is called sweating the pipe." },
      { word: "Dielectric Union", def: "Fitting that joins copper and galvanized steel pipes without causing galvanic corrosion — required wherever copper meets iron." },
      { word: "Fernco", def: "Flexible rubber coupling (brand name) used to connect pipes of different materials or sizes — common in DFW repair work." },
      { word: "Flux", def: "Paste applied before soldering copper that cleans the metal and helps solder flow into the joint. Wash off residue after soldering." },
    ],
  },
];

export default function DFWPlumbingVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = plumbingConcerns[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🚿</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Plumbing Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, margin: 0 }}>Plumbing terms every DFW homeowner needs before calling a plumber</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {plumbingConcerns.map((pc, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642″ : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {pc.concern}
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
