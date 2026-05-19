import { useState } from 'react';

type Decision = {
  id: string;
  label: string;
  icon: string;
  options: { label: string; recommendation: string; reasoning: string; dfwNote: string }[];
};

const decisions: Decision[] = [
  {
    id: "repair-replace",
    label: "Repair vs. Replace",
    icon: "🔧",
    options: [
      { label: "Unit is under 10 years old", recommendation: "Repair", reasoning: "Under 10 years: repair cost under $1,000 almost always makes sense. Equipment has half its life ahead.", dfwNote: "DFW tip: If repair is under the '$5,000 rule' (age × repair cost < $5,000), repair wins." },
      { label: "Unit is 10–15 years old", recommendation: "Depends on repair cost", reasoning: "Middle zone. If repair exceeds $800 or involves the compressor, replacement is likely smarter.", dfwNote: "DFW tip: R-410A units from 2015+ still have value. R-22 units from this era: replace immediately." },
      { label: "Unit is 15+ years old", recommendation: "Replace", reasoning: "A 15+ year unit has 0–3 years left. Any major repair is money lost. New unit = warranty + efficiency gains.", dfwNote: "DFW tip: A new 18 SEER2 unit saves $300–$600/year in DFW electricity vs a 10 SEER2 unit." },
    ],
  },
  {
    id: "seer",
    label: "Which SEER2 Level?",
    icon: "⚡",
    options: [
      { label: "Budget-focused", recommendation: "14–15 SEER2″, reasoning: "Texas minimum is 14 SEER2. Meets code, lower upfront cost, but higher long-term electricity.", dfwNote: "DFW tip: Running 8–10 months/year means SEER matters more here than anywhere in the US." },
      { label: "Balanced value", recommendation: "16–18 SEER2″, reasoning: "Sweet spot. Pays back premium in 4–6 years via DFW electricity savings. Most recommended.", dfwNote: "DFW tip: 16 SEER2 single-speed saves ~$200/yr over 14 SEER2. Variable speed adds comfort." },
      { label: "Maximum efficiency", recommendation: "20+ SEER2 Variable", reasoning: "Best long-term ROI if staying 10+ years. Variable speed = whisper quiet, perfect humidity control.", dfwNote: "DFW tip: Variable speed is worth it in DFW for humidity control alone — even ignoring electricity." },
    ],
  },
  {
    id: "gas-heat-pump",
    label: "Gas Furnace vs. Heat Pump",
    icon: "🌡️",
    options: [
      { label: "DFW mild winters, cost-focused", recommendation: "Heat Pump", reasoning: "DFW winters rarely drop below 30°F for extended periods. Heat pumps are 300% efficient vs gas 95%.", dfwNote: "DFW tip: Add a gas or electric backup strip for the 5–10 days/year below 25°F. Best of both worlds." },
      { label: "Occasional hard freeze", recommendation: "Dual Fuel", reasoning: "Heat pump for 90% of heating, gas backup kicks in below 35°F. Most efficient system for DFW.", dfwNote: "DFW tip: Dual fuel is the #1 choice for DFW homeowners wanting maximum efficiency + reliability." },
      { label: "All-gas preference", recommendation: "Gas Furnace 96 AFUE", reasoning: "If you prefer gas reliability, 96 AFUE is the efficiency sweet spot. 80 AFUE wastes 20% heat.", dfwNote: "DFW tip: DFW gas prices are low. Full gas makes sense if your home already has a gas line." },
    ],
  },
  {
    id: "diy-tech",
    label: "DIY vs. Call a Tech?",
    icon: "🛠️",
    options: [
      { label: "Unit not cooling — it's hot", recommendation: "Call tech immediately", reasoning: "No-cool in DFW summer is an emergency. Most causes (refrigerant, capacitor, contactor) require a licensed tech.", dfwNote: "DFW tip: Book morning slots — techs are booked solid by noon June–August. Use a company with emergency rates." },
      { label: "Drain line clog or water drip", recommendation: "Try DIY first", reasoning: "Pour vinegar into the drain port. If flow resumes, done. If pan is overflowing, call — float switch may be needed.", dfwNote: "DFW tip: Install a float switch for $30 DIY. It auto-shuts the system if the drain clogs." },
      { label: "Filter, thermostat, or circuit", recommendation: "DIY", reasoning: "Filter change, thermostat replacement, and breaker reset are safe homeowner tasks. No EPA certification needed.", dfwNote: "DFW tip: If the thermostat shows 'waiting' for 5+ min, that's normal short-cycle protection — not a failure." },
    ],
  },
  {
    id: "brand",
    label: "Which Brand?",
    icon: "🏷️",
    options: [
      { label: "Best reliability + support", recommendation: "Trane or Carrier", reasoning: "Strongest dealer networks in DFW. Parts available same-day at most supply houses. 10-year warranty standard.", dfwNote: "DFW tip: Trane has the largest independent dealer network in North Texas. Carrier close second." },
      { label: "Best value / mid-tier", recommendation: "Lennox or Rheem", reasoning: "Slightly lower upfront cost, comparable reliability. Lennox has excellent SEER2 ratings at mid price.", dfwNote: "DFW tip: Lennox XC21 is a top-selling unit in DFW for the efficiency-to-cost ratio." },
      { label: "Budget / builder-grade", recommendation: "Goodman or Amana", reasoning: "Owned by Daikin. Decent reliability. Good for rentals or homes you plan to sell in 5 years.", dfwNote: "DFW tip: Goodman units handle DFW heat adequately. Upgrade to 16+ SEER2 even in this tier." },
    ],
  },
];

export default function DFWHVACDecisionMaker() {
  const [active, setActive] = useState<string | null>(null);
  const [choice, setChoice] = useState<number | null>(null);

  const dec = decisions.find(d => d.id === active);
  const rec = dec && choice !== null ? dec.options[choice] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🧭</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HVAC Decision Maker</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>DFW-specific guidance on the 5 decisions that matter most</p>
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
          {decisions.map(d => (
            <button key={d.id} onClick={() => { setActive(d.id === active ? null : d.id); setChoice(null); }}
              style={{ background: active === d.id ? "#1e3a5f" : "#1e293b", border: active === d.id ? "1px solid #F5E642″ : "1px solid #334155", borderRadius: 10, padding: "14px 18px", cursor: "pointer", textAlign: "left", color: "#fff", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{d.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 16 }}>{d.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 18 }}>{active === d.id ? "🔼" : "🔽"}</span>
            </button>
          ))}
        </div>

        {dec && (
          <div style={{ background: "#1e293b", border: "1px solid #334155″, borderRadius: 12, padding: 22, marginBottom: 28 }}>
            <div style={{ color: "#94a3b8″, fontWeight: 600, marginBottom: 14 }}>Your situation:</div>
            <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
              {dec.options.map((opt, i) => (
                <button key={i} onClick={() => setChoice(i)}
                  style={{ background: choice === i ? "#1e3a5f" : "#0A1628″, border: choice === i ? "1px solid #F5E642" : "1px solid #334155", borderRadius: 8, padding: "11px 16px", cursor: "pointer", color: "#fff", textAlign: "left", fontWeight: 500 }}>
                  {choice === i ? "✅" : "⬜"} {opt.label}
                </button>
              ))}
            </div>

            {rec && (
              <div style={{ borderTop: "1px solid #334155″, paddingTop: 18 }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 20, marginBottom: 10 }}>→ {rec.recommendation}</div>
                <p style={{ color: "#cbd5e1″, lineHeight: 1.6, marginBottom: 12 }}>{rec.reasoning}</p>
                <div style={{ background: "#0A1628″, borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid #F5E642" }}>
                  <span style={{ color: "#F5E642″, fontWeight: 700 }}>🤠 DFW-specific: </span>
                  <span style={{ color: "#cbd5e1″ }}>{rec.dfwNote}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", padding: 20, background: "#1e293b", borderRadius: 12 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔧 Get a DFW HVAC pro opinion</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: "0 0 16px" }}>ProLnk connects you with vetted North Texas HVAC technicians for free quotes.</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Join ProLnk Waitlist</button>
        </div>
      </div>
    </div>
  );
}
