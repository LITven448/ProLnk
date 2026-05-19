import { useState } from 'react';

const CHECKS: Record<string, string[]> = {
  foundation: [
    "Walk perimeter — look for diagonal cracks from window corners",
    "Check doors and windows — sticking = soil movement",
    "Look at interior floors with phone flashlight at low angle",
    "Basement or pier-and-beam? Pier homes shift more in DFW clay",
    "Ask for all previous foundation repair invoices and engineer reports",
  ],
  hvac: [
    "Find the label on the condenser unit — age is printed as manufacture date",
    "Inspect the air handler in attic or closet for rust, mold, or leaks",
    "Turn on heat and AC at thermostat — listen for rattles or delayed start",
    "Check supply and return vents for balance (all should push/pull equally)",
    "Ask when last serviced — DFW requires 2x per year minimum",
  ],
  plumbing: [
    "Turn on every faucet simultaneously — watch for pressure drop",
    "Flush toilets and run showers at same time",
    "Check under every sink cabinet for moisture stains or warped wood",
    "In pre-1985 homes, ask about sewer scope (clay pipes deteriorate)",
    "Look at water heater manufacture date — 10+ years = budget $1,200-2,000″,
  ],
  roof: [
    "Ask for roof permit history — DFW hail replacement is common",
    "Look for granule loss in gutters (grab a handful)",
    "Check attic for daylight gaps, wet insulation, or dark staining on decking",
    "Ask age — 15+ year roofs may not pass insurance in DFW",
    "Verify gutters are attached and sloped correctly",
  ],
};

const MISLEADING = [
  "Fresh paint — often hides water stains or wall damage",
  "New carpet — can hide damaged or uneven subfloor",
  "Staging furniture — makes rooms appear larger than they are",
  "Strong air freshener — can mask mold, pet odor, or smoke",
  ""Recent updates" — ask for permits; unpermitted work is a liability",
];

const QUESTIONS = [
  "Has there been any foundation work? Do you have the engineer report?",
  "How old is the roof? Were permits pulled for replacement?",
  "Any insurance claims on the property in the last 5 years?",
  "Why are the sellers moving?",
  "Any known issues with neighbors or HOA disputes?",
  "What have utility costs averaged monthly?",
  "Have there been any pest treatments?",
];

export default function DFWShowingGuide() {
  const [age, setAge] = useState("Pre-1990″);
  const [concern, setConcern] = useState("foundation");
  const [list, setList] = useState<string[]>([]);

  function buildChecklist() {
    const base = CHECKS[concern] || [];
    const extra = age === "Pre-1990″ ? ["Check for original galvanized or cast iron pipes", "Inspect for knob-and-tube wiring in attic"] : ["Verify builder warranty status if under 10 years"];
    setList([...base, ...extra]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#e8e8e8", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: "#F5E642″, letterSpacing: 2, marginBottom: 8 }}>BUYER TOOL</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 6 }}>DFW Home Showing Guide</h1>
        <p style={{ color: "#aaa", fontSize: 16, marginBottom: 36 }}>What to inspect in your 30-minute window. Don't let staging distract you.</p>

        {Object.entries(CHECKS).map(([cat, items]) => (
          <div key={cat} style={{ background: "#111e33″, borderRadius: 12, padding: 22, marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#F5E642″, marginBottom: 14, textTransform: "capitalize" }}>🔧 {cat.toUpperCase()}</div>
            {items.map((item, i) => (
              <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #2a3f5f" }}>• {item}</div>
            ))}
          </div>
        ))}

        <div style={{ background: "#1a0a08″, borderRadius: 12, padding: 22, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#ff6b6b", marginBottom: 14 }}>🚫 Don't Be Fooled By</div>
          {MISLEADING.map((m, i) => (
            <div key={i} style={{ fontSize: 14, color: "#e8b0b0″, marginBottom: 8 }}>⚠️ {m}</div>
          ))}
        </div>

        <div style={{ background: "#0d1f3a", borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#7dd3fc", marginBottom: 14 }}>❓ Ask the Listing Agent</div>
          {QUESTIONS.map((q, i) => (
            <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 8 }}>→ {q}</div>
          ))}
        </div>

        <div style={{ background: "#111e33″, borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#F5E642″, marginBottom: 18 }}>🔍 Build My Showing Checklist</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: "#aaa" }}>Home Age</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, background: "#1e2f4a", color: "#fff", border: "1px solid #2a3f5f", fontSize: 14 }}>
              {["Pre-1990″, "1990-2005", "2006-2015", "2016+"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, color: "#aaa" }}>Primary Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, background: "#1e2f4a", color: "#fff", border: "1px solid #2a3f5f", fontSize: 14 }}>
              {Object.keys(CHECKS).map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
            </select>
          </div>
          <button onClick={buildChecklist} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Build Checklist</button>
          {list.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {list.map((item, i) => (
                <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 10, display: "flex", gap: 10 }}>
                  <span style={{ color: "#F5E642″, fontWeight: 700 }}>{i + 1}.</span> {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
