import { useState } from 'react';

const stages = [
  { year: "Move-in", label: "Day 1: Document Everything", icon: "📸", tasks: ["Photograph unit model/serial numbers", "Register equipment for warranty", "Test all vents and zones", "Locate the condensate drain cleanout", "Set up 85°F away, 78°F home, 75°F night"], budget: "Time only", warning: "" },
  { year: "Year 1", label: "First Full Year", icon: "📅", tasks: ["Spring tune-up (March–April)", "Monthly filters May–October", "Quarterly drain flush", "Fall tune-up (September)", "Document first summer electricity bill"], budget: "$250–$400", warning: "" },
  { year: "Years 2–5", label: "Routine Maintenance Phase", icon: "🔧", tasks: ["Bi-annual tune-ups every year", "Replace capacitor if it hasn't been done (often fails at year 3–5)", "Test refrigerant charge", "Inspect ductwork for leaks", "Consider smart thermostat upgrade"], budget: "$300–$600/yr", warning: "" },
  { year: "Years 6–10", label: "Watch for First Repairs", icon: "⚠️", tasks: ["Contactor replacement likely (year 7–9)", "Blower motor bearing lubrication", "Coil cleaning (evaporator + condenser)", "Duct pressure test", "Get a second opinion on any repair over $500"], budget: "$400–$900/yr", warning: "If compressor fails in year 8–10: strongly consider replacement" },
  { year: "Years 10–13", label: "Decision Zone", icon: "🧭", tasks: ["Apply the '$5,000 rule' to every repair", "Get replacement quotes to compare", "Evaluate refrigerant type (R-22 = replace now)", "Assess energy efficiency vs new equipment", "Plan replacement budget: $5,000–$12,000"], budget: "$500–$1,500/yr", warning: "This is the make-or-break window. Build your replacement fund now." },
  { year: "Years 13–16", label: "Prepare for Replacement", icon: "💰", tasks: ["Repair only emergency failures", "Get 3 quotes from different contractors", "Evaluate heat pump vs dual-fuel vs gas", "Research utility rebates (Oncor, Reliant, etc.)", "Plan installation for spring (March–April) for best pricing"], budget: "$600–$2,000 repairs + replacement budget", warning: "Do not do major repairs in this window. Save that money toward new equipment." },
  { year: "Year 15–18", label: "Replacement", icon: "🏗️", tasks: ["Install 16–18 SEER2 minimum", "Consider variable speed for DFW humidity", "Upgrade thermostat to smart (Ecobee/Nest)", "Inspect and seal ductwork during install", "Register new equipment immediately"], budget: "$6,000–$14,000", warning: "" },
  { year: "Post-Replace", label: "Start the Clock Again", icon: "🔄", tasks: ["New 10-year parts + labor warranty", "First tune-up at 1 year", "Reset all documentation", "Enjoy 30–40% lower electricity bills", "Expect 15–18 years from new equipment"], budget: "$250–$350/yr maintenance", warning: "" },
];

const homeAges = ["Brand new / just bought", "1–5 years old", "6–10 years old", "11–15 years old", "15+ years old"];
const ageMap: Record<string, number> = {
  "Brand new / just bought": 0,
  "1–5 years old": 1,
  "6–10 years old": 3,
  "11–15 years old": 4,
  "15+ years old": 6,
};

export default function DFWHVACCompleteTimeline() {
  const [homeAge, setHomeAge] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const currentIdx = homeAge ? ageMap[homeAge] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📆</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HVAC Complete Ownership Timeline</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>From move-in to replacement — the full DFW HVAC journey</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 18, marginBottom: 28 }}>
          <label style={{ color: "#F5E642", fontWeight: 700, display: "block", marginBottom: 10 }}>How old is your current HVAC? → Jump to your stage</label>
          <select value={homeAge} onChange={e => { setHomeAge(e.target.value); setExpanded(ageMap[e.target.value] ?? null); }}
            style={{ width: "100%", padding: "10px 14px", background: "#0A1628", color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 15 }}>
            <option value="">Show full timeline</option>
            {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 2, background: "#1e3a5f" }} />
          {stages.map((stage, i) => {
            const isCurrent = currentIdx === i;
            const isExpanded = expanded === i;
            return (
              <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                <div style={{ position: "absolute", left: -24, top: 14, width: 14, height: 14, borderRadius: "50%", background: isCurrent ? "#F5E642" : "#334155", border: isCurrent ? "3px solid #fff" : "2px solid #475569" }} />
                <div onClick={() => setExpanded(isExpanded ? null : i)}
                  style={{ background: isCurrent ? "#1e3a5f" : "#1e293b", border: isCurrent ? "1px solid #F5E642" : "1px solid #334155", borderRadius: 10, padding: "14px 18px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>{stage.year}</span>
                      <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{stage.icon} {stage.label}</div>
                      {isCurrent && <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginTop: 4 }}>← YOU ARE HERE</div>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#22c55e", fontWeight: 700, fontSize: 13 }}>{stage.budget}</div>
                      <span style={{ fontSize: 18 }}>{isExpanded ? "🔼" : "🔽"}</span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 14, borderTop: "1px solid #334155", paddingTop: 14 }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {stage.tasks.map((t, j) => <li key={j} style={{ color: "#cbd5e1", fontSize: 14, padding: "4px 0" }}>✅ {t}</li>)}
                      </ul>
                      {stage.warning && (
                        <div style={{ marginTop: 12, background: "#450a0a", borderRadius: 8, padding: "10px 14px", color: "#fca5a5", fontSize: 14 }}>
                          ⚠️ {stage.warning}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 32, padding: 20, background: "#1e293b", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🔧 Get a DFW HVAC pro for your stage</div>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>ProLnk matches you with the right North Texas HVAC contractor for your situation.</p>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Join ProLnk Waitlist</button>
        </div>
      </div>
    </div>
  );
}
