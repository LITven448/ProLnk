import { useState } from 'react';

type Symptom = "Running Constantly" | "Slow Flush" | "Jiggle Handle Fix" | "Leaking at Base" | "Toilet Rocks" | "Not Flushing";

const REPAIRS: Record<Symptom, { diagnosis: string; steps: string[]; parts: string }> = {
  "Running Constantly": {
    diagnosis: "Flapper not sealing or fill valve worn out. DFW hard water corrodes both fast.",
    steps: ["Remove tank lid", "Drop food coloring in tank — if color appears in bowl without flushing, flapper leaks", "Turn off supply valve at wall", "Flush to empty tank", "Unhook flapper chain, pull flapper off overflow tube pegs", "Snap new flapper onto pegs, reconnect chain with small slack", "Turn supply valve on, test"],
    parts: "Flapper: $5-10. Korky universal fits most DFW toilets.",
  },
  "Slow Flush": {
    diagnosis: "Clogged rim jets or low tank water level — common in DFW hard water areas.",
    steps: ["Check water level in tank — should be 1in below overflow tube top", "If low: adjust fill valve float upward (clockwise)", "If level is correct: inspect rim jets under bowl rim with mirror", "Use bent coat hanger to clear mineral deposits from jets", "Pour 1 cup white vinegar into overflow tube, let sit 2 hrs", "Flush multiple times to clear deposits"],
    parts: "No parts usually needed. Fill valve if broken: Fluidmaster 400A $12.",
  },
  "Jiggle Handle Fix": {
    diagnosis: "Chain caught or handle arm loose — easiest toilet repair possible.",
    steps: ["Remove tank lid", "Check chain is not tangled under flapper", "Adjust chain — hook 1in from flapper top", "If handle loose: tighten nut inside tank (reverse thread)", "If handle cracked: unscrew nut, remove arm, install new handle"],
    parts: "Replacement handle: $8-15. Most are universal fit.",
  },
  "Leaking at Base": {
    diagnosis: "Wax ring seal failure — common in older DFW homes as floors settle from clay soil.",
    steps: ["Confirm leak is from base (not supply line)", "Turn off supply valve, flush, sponge remaining water", "Disconnect supply line, unscrew two floor bolts", "Rock toilet gently and lift straight up", "Scrape old wax from floor flange and toilet horn", "Press new wax ring onto toilet horn (wax side down)", "Lower toilet onto bolts, press down firmly, tighten bolts evenly", "Reconnect supply, test"],
    parts: "Wax ring: $5-10. Use jumbo wax ring if floor is higher than flange.",
  },
  "Toilet Rocks": {
    diagnosis: "Loose floor bolts or uneven floor. Causes wax ring failure if ignored.",
    steps: ["Try tightening bolt caps at base", "If still rocks: slide plastic toilet shims under low side", "Score excess shim with knife and snap off", "Caulk around base with silicone (leave small gap at back)"],
    parts: "Toilet shims: $5. Silicone caulk: $6.",
  },
  "Not Flushing": {
    diagnosis: "Chain disconnected or flush valve cracked — check tank first before buying parts.",
    steps: ["Remove tank lid — check chain connection between handle arm and flapper", "If disconnected: reconnect with 1in slack", "Press flapper down by hand — if bowl drains, wrong flapper shape, replace", "If no water in tank: check supply valve is open", "If supply open and tank not filling: replace fill valve"],
    parts: "Chain ($3), flapper ($8), or fill valve Fluidmaster 400A ($12).",
  },
};

export default function DFWToiletRepairGuide2026() {
  const [symptom, setSymptom] = useState<Symptom>("Running Constantly");
  const repair = REPAIRS[symptom];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK - DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚽 DFW DIY Toilet Repair Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>Most toilet problems are DIY-fixable for under $25. Select your symptom.</p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12, fontSize: 14 }}>WHAT IS YOUR TOILET DOING?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(REPAIRS) as Symptom[]).map((s) => (
              <button key={s} onClick={() => setSymptom(s)} style={{ padding: "9px 14px", borderRadius: 8, border: "2px solid", borderColor: symptom === s ? "#F5E642″ : "#1e3a5f", background: symptom === s ? "#F5E642" : "transparent", color: symptom === s ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 20, marginBottom: 14, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>🔍 DIAGNOSIS</div>
          <div style={{ color: "#e2e8f0″, fontSize: 14 }}>{repair.diagnosis}</div>
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 20, marginBottom: 14, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>🔧 REPAIR STEPS</div>
          <ol style={{ margin: 0, paddingLeft: 20, color: "#e2e8f0″, lineHeight: 2, fontSize: 13 }}>
            {repair.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 20, marginBottom: 14, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>🛒 PARTS NEEDED</div>
          <div style={{ color: "#e2e8f0″, fontSize: 14 }}>{repair.parts}</div>
        </div>

        <div style={{ background: "#162d4a", borderRadius: 12, padding: 20, border: "1px solid #F5E642″ }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>💡 DFW NOTE</div>
          <div style={{ color: "#fef9c3″, fontSize: 14, lineHeight: 1.6 }}>DFW hard water corrodes flappers and fill valves faster than the national average. Replace proactively every 3-5 years rather than waiting for failure.</div>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk - Connecting DFW Homeowners with Trusted Pros - prolnk.io</div>
      </div>
    </div>
  );
}