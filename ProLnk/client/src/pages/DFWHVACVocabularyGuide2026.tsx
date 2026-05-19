import { useState } from 'react';

const hvacConcerns = [
  {
    concern: "❄️ Cooling",
    terms: [
      { word: "SEER2″, def: "Seasonal Energy Efficiency Ratio 2 — updated 2023 efficiency standard. DFW requires 15.2 SEER2 minimum for new installs. Higher = lower electric bills." },
      { word: "Ton", def: "Cooling capacity unit: 1 ton = 12,000 BTU/hr of heat removed. A 2,000 sq ft DFW home typically needs 4–5 tons." },
      { word: "Superheat", def: "Temperature of refrigerant vapor above its boiling point — technicians measure this to verify proper refrigerant charge on fixed-orifice systems." },
      { word: "Subcooling", def: "Temperature of liquid refrigerant below its condensing point — measured on TXV systems to confirm correct charge. Target typically 10–15 degrees F." },
      { word: "Evaporator Coil", def: "Indoor coil where refrigerant absorbs heat from your home air. Located in the air handler above the furnace." },
    ],
  },
  {
    concern: "🔥 Heating",
    terms: [
      { word: "AFUE", def: "Annual Fuel Utilization Efficiency — furnace efficiency rating. 80% AFUE means 80 cents of every dollar of gas becomes heat. DFW minimum: 80% AFUE." },
      { word: "Heat Exchanger", def: "Metal component in a furnace that separates combustion gases from your breathing air. A cracked heat exchanger is a CO hazard — replace the furnace." },
      { word: "Two-Stage", def: "Furnace or AC that operates at low (70%) and high (100%) capacity — more efficient and quieter than single-stage, better humidity control in DFW." },
      { word: "Variable Speed", def: "Blower motor that adjusts airflow continuously — best humidity control for DFW summers, quietest operation, lowest energy use." },
      { word: "Heat Strip", def: "Electric resistance heating element in heat pumps — backup heat when outdoor temps drop below 35 degrees F. Expensive to run; ensure heat pump runs first." },
    ],
  },
  {
    concern: "💨 Airflow",
    terms: [
      { word: "CFM", def: "Cubic Feet per Minute — airflow rate. Each room needs proper CFM for temperature balance. Manual D calculation determines correct duct sizing." },
      { word: "Static Pressure", def: "Air pressure resistance in your duct system. High static pressure strains equipment and reduces airflow — often caused by undersized ducts or dirty filters." },
      { word: "MERV", def: "Minimum Efficiency Reporting Value — filter rating 1–16. MERV 8 balances air quality and airflow. MERV 13 and above can restrict airflow in standard systems." },
      { word: "Manual D", def: "ACCA calculation method for duct sizing — ensures each room gets correct CFM. Required for new installations in DFW permits." },
      { word: "Return Air", def: "Ductwork that pulls air back to the air handler to be conditioned. Undersized returns are the most common DFW HVAC problem." },
    ],
  },
  {
    concern: "🌡️ Refrigerant",
    terms: [
      { word: "R-410A", def: "Common refrigerant in systems installed 2010–2024. Being phased out — systems using R-410A cannot be serviced after 2025 stock depletes." },
      { word: "R-454B", def: "Next-generation refrigerant (Puron Advance) replacing R-410A. Lower global warming potential. Required in new DFW installs starting 2025." },
      { word: "Refrigerant Charge", def: "Amount of refrigerant in the system. Too little (undercharged) or too much (overcharged) both reduce efficiency and damage the compressor." },
      { word: "Condenser", def: "Outdoor unit where refrigerant releases heat to the outside air. DFW summer heat makes condensers work hardest — keep coils clean." },
      { word: "TXV", def: "Thermostatic Expansion Valve — metering device that controls refrigerant flow into the evaporator coil based on suction superheat." },
    ],
  },
];

export default function DFWHVACVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = hvacConcerns[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌬️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW HVAC Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, margin: 0 }}>HVAC terms every DFW homeowner needs before calling an AC company</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {hvacConcerns.map((hc, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642″ : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {hc.concern}
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
