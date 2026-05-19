import { useState } from 'react';

const TOOL_KITS: Record<string, { tools: string[]; tip: string }> = {
  "New Homeowner": {
    tools: ["🔧 Adjustable wrench (water shutoffs)", "⚡ Non-contact voltage tester", "🔩 Allen wrench set (faucets/furniture)", "🔌 Cordless drill + bit set", "📏 Tape measure 25ft"],
    tip: "Start here — these 5 tools handle 80% of first-year homeowner tasks.",
  },
  "1-3 Years": {
    tools: ["All Starter tools", "🪛 Needle nose pliers", "🔫 Caulk gun", "🔍 Stud finder", "📐 Level 24in", "🔨 Hammer 16oz"],
    tip: "Add these as you tackle caulking, hanging, and more precise work.",
  },
  "Experienced DIYer": {
    tools: ["All above", "🪚 Circular saw", "🔧 Pipe wrench", "🌡️ Infrared thermometer", "🔦 Inspection camera", "📦 GFCI outlet tester"],
    tip: "Full toolkit for plumbing, electrical inspection, and carpentry.",
  },
};

export default function DFWDIYToolsGuide2026() {
  const [level, setLevel] = useState<string>("New Homeowner");
  const kit = TOOL_KITS[level];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧰 DFW DIY Essential Tools Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>The right tools save money and prevent damage. Select your experience level for a personalized kit recommendation.</p>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>SELECT YOUR EXPERIENCE LEVEL</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {Object.keys(TOOL_KITS).map((l) => (
              <button key={l} onClick={() => setLevel(l)} style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid", borderColor: level === l ? "#F5E642" : "#1e3a5f", background: level === l ? "#F5E642" : "transparent", color: level === l ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 16 }}>RECOMMENDED TOOL KIT — {level.toUpperCase()}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {kit.tools.map((t, i) => (
              <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid #1e3a5f", fontSize: 15, color: "#e2e8f0" }}>{t}</li>
            ))}
          </ul>
          <div style={{ marginTop: 16, background: "#162d4a", borderRadius: 8, padding: 14, color: "#F5E642", fontSize: 14 }}>💡 {kit.tip}</div>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>🔧 DFW-SPECIFIC NOTES</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8", lineHeight: 1.8, fontSize: 14 }}>
            <li>Adjustable wrench is essential — DFW water pressure can loosen fittings over time</li>
            <li>Voltage tester is non-negotiable — older DFW homes may lack GFCI protection</li>
            <li>Allen/hex keys handle most faucet brands sold at local DFW hardware stores</li>
            <li>Cordless drill with Phillips + flathead bits covers 90% of assembly tasks</li>
          </ul>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>
          ProLnk · Connecting DFW Homeowners with Trusted Pros · prolnk.io
        </div>
      </div>
    </div>
  );
}