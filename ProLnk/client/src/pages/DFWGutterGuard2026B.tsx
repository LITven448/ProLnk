import { useState } from 'react';

const treeTypes = ["Oak (heavy debris + acorns)", "Pine (needles + sap)", "Pecan (hulls + nuts)", "Elm / Hackberry (small leaves)", "No significant trees"];
const gutterHistories = ["Never cleaned — clogged frequently", "Cleaned 1x per year — manageable", "Cleaned 2x per year — minimal clog", "Installed guards already — not working"];

const recommendations: Record<string, Record<string, { guard: string; rating: string; warning: string }>> = {
  "Oak (heavy debris + acorns)": {
    "Never cleaned — clogged frequently": { guard: "Micro-Mesh (stainless steel)", rating: "Best for DFW oaks", warning: "Acorns will still accumulate on top — annual roof cleaning still needed." },
    "Cleaned 1x per year — manageable": { guard: "Micro-Mesh (aluminum or steel)", rating: "Good fit", warning: "Micro-mesh handles oak leaves well. Acorns bypass most guards — expect some debris." },
    "Cleaned 2x per year — minimal clog": { guard: "Reverse Curve or Micro-Mesh", rating: "Either works", warning: "With low clog history you may not need premium micro-mesh. Basic reverse curve can work." },
    "Installed guards already — not working": { guard: "Replace with Stainless Steel Micro-Mesh", rating: "Upgrade recommended", warning: "Most cheap guards fail on DFW oaks. Upgrade to .030 stainless micro-mesh for best results." },
  },
  "Pine (needles + sap)": {
    "Never cleaned — clogged frequently": { guard: "Micro-Mesh (fine weave) ONLY", rating: "Critical choice", warning: "Pine needles defeat ALL other guard types. Only fine micro-mesh works. Sap will still bind debris to mesh — clean annually." },
    "Cleaned 1x per year — manageable": { guard: "Fine Micro-Mesh", rating: "Strongly recommended", warning: "Pine sap + DFW heat = debris welded to guards. Plan for annual flush-down." },
    "Cleaned 2x per year — minimal clog": { guard: "Fine Micro-Mesh", rating: "Best investment", warning: "Guards will reduce your cleaning but not eliminate it for pine trees." },
    "Installed guards already — not working": { guard: "Remove old guard + install fine micro-mesh", rating: "Must upgrade", warning: "Surface tension and foam guards completely fail on pine needles. Do not reinstall." },
  },
  "No significant trees": {
    "Never cleaned — clogged frequently": { guard: "Basic Micro-Mesh or Screen Guard", rating: "Good fit", warning: "Without tree debris your main enemy is DFW wind-blown debris and roof granules. Screen guards work well." },
    "Cleaned 1x per year — manageable": { guard: "Screen or Reverse Curve", rating: "Either works", warning: "Low debris load means mid-tier guards are sufficient." },
    "Cleaned 2x per year — minimal clog": { guard: "May not need guards", rating: "Evaluate ROI", warning: "Without tree debris and minimal clogs, guard installation ROI may not justify cost." },
    "Installed guards already — not working": { guard: "Check for granule buildup", rating: "Likely a granule issue", warning: "Roof granules from aging shingles commonly block guards with no trees. May indicate roof replacement needed." },
  },
};

export default function DFWGutterGuard2026B() {
  const [tree, setTree] = useState<string | null>(null);
  const [history, setHistory] = useState<string | null>(null);
  const result = tree && history ? (recommendations[tree]?.[history] ?? null) : null;

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🍂</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Gutter Guard Deep Dive 2026 — Part 2</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>The honest truth about gutter guards in DFW — find what actually works for your trees</p>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>🌳 Select Your DFW Tree Type</h2>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {treeTypes.map((t, i) => (<button key={i} onClick={() => setTree(t)} style={{ padding: "0.5rem 0.9rem", borderRadius: 8, border: tree === t ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: tree === t ? "#F5E642" : "transparent", color: tree === t ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}>{t}</button>))}
          </div>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>🪣 Your Gutter History</h2>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {gutterHistories.map((h, i) => (<button key={i} onClick={() => setHistory(h)} style={{ padding: "0.5rem 0.9rem", borderRadius: 8, border: history === h ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: history === h ? "#F5E642" : "transparent", color: history === h ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}>{h}</button>))}
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>✅ DFW Recommendation</h2>
            <div style={{ padding: "0.75rem", borderRadius: 8, backgroundColor: "#0d2040″, marginBottom: "0.75rem" }}>
              <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 0.25rem 0" }}>{result.guard}</p>
              <p style={{ color: "#4aff8c", fontSize: "0.88rem", margin: 0 }}>Rating: {result.rating}</p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: 8, backgroundColor: "#2a1010″, borderLeft: "3px solid #ff9f4a" }}>
              <p style={{ color: "#ffcc88″, fontSize: "0.88rem", margin: 0 }}>⚠️ {result.warning}</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>🌸 DFW Pollen Warning</h2>
          <p style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.7 }}>No gutter guard eliminates DFW spring pollen. DFW cedar, oak, and elm pollen seasons (Feb–April) create fine dust that passes through all guard types. Annual spring flush is required regardless of guard type installed.</p>
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>🍂 Find DFW Gutter Guard Installers on ProLnk — Compare Free Estimates</p>
        </div>
      </div>
    </div>
  );
}
