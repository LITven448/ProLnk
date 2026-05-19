import { useState } from 'react';

type Surface = "Bathtub/Shower" | "Kitchen Sink" | "Window Frame" | "Exterior Siding" | "Concrete/Masonry" | "Trim/Baseboards";

const GUIDES: Record<Surface, { caulkType: string; technique: string; cure: string; tip: string }> = {
  "Bathtub/Shower": { caulkType: "100% Silicone (mold-resistant)", technique: "Fill tub with water before caulking to pre-stretch joint. Cut tip small. Apply steady bead, smooth with wet finger dipped in soapy water.", cure: "24 hrs touch-dry, 72 hrs full cure. No water contact.", tip: "DFW hard water leaves mineral deposits — scrub with CLR before caulking or new caulk will not bond." },
  "Kitchen Sink": { caulkType: "Silicone (clear or white)", technique: "Remove old caulk fully with utility knife. Clean with isopropyl alcohol. Apply thin bead at sink-counter joint. Tool smooth immediately.", cure: "24-48 hrs before water exposure.", tip: "Use paintable caulk only if you plan to paint over it — silicone cannot be painted." },
  "Window Frame": { caulkType: "Paintable Latex Acrylic", technique: "Apply at window-to-siding joint on exterior. Work in shade — DFW sun causes latex to skin over too fast. Smooth with wet finger.", cure: "1 hr touch-dry, paint after 24 hrs.", tip: "Check DFW weather — do not caulk if rain is forecast within 24 hrs or temp is below 50F." },
  "Exterior Siding": { caulkType: "Paintable Urethane or Siliconized Latex", technique: "Fill all gaps over 1/4in with backer rod first. Apply caulk over backer rod. Tool smooth. Prime before painting.", cure: "24 hrs before painting.", tip: "DFW summer heat (100F+) means caulk cures faster — work in 2-3 ft sections." },
  "Concrete/Masonry": { caulkType: "Polyurethane or Self-Leveling Sealant", technique: "Use self-leveling sealant for horizontal cracks. Pour into crack and allow to flow level. For vertical, use non-sag urethane.", cure: "24-72 hrs depending on product.", tip: "DFW clay soil shifts — concrete cracks recur. Monitor annually and re-caulk as needed." },
  "Trim/Baseboards": { caulkType: "Paintable Latex (interior)", technique: "Apply thin bead at trim-wall junction. Smooth immediately with wet finger. Wipe excess with damp cloth. Paint after 2 hrs.", cure: "2 hrs before painting.", tip: "Tape adjacent surface with painter tape for clean lines on light-colored trim." },
};

export default function DFWCaulkingTechniqueGuide2026() {
  const [surface, setSurface] = useState<Surface>("Bathtub/Shower");
  const guide = GUIDES[surface];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK - DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔫 DFW Caulking Technique Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Proper caulking for the DFW climate. Choose your surface for the right caulk type and technique.</p>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>SELECT SURFACE TYPE</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(GUIDES) as Surface[]).map((s) => (
              <button key={s} onClick={() => setSurface(s)} style={{ padding: "9px 14px", borderRadius: 8, border: "2px solid", borderColor: surface === s ? "#F5E642" : "#1e3a5f", background: surface === s ? "#F5E642" : "transparent", color: surface === s ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>RECOMMENDED CAULK</div>
            <div style={{ color: "#e2e8f0", fontSize: 15 }}>🧴 {guide.caulkType}</div>
          </div>
          <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>TECHNIQUE</div>
            <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7 }}>{guide.technique}</div>
          </div>
          <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>CURE TIME</div>
            <div style={{ color: "#e2e8f0", fontSize: 14 }}>⏱️ {guide.cure}</div>
          </div>
          <div style={{ background: "#162d4a", borderRadius: 12, padding: 20, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>DFW PRO TIP</div>
            <div style={{ color: "#fef9c3", fontSize: 14, lineHeight: 1.7 }}>💡 {guide.tip}</div>
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>
          ProLnk - Connecting DFW Homeowners with Trusted Pros - prolnk.io
        </div>
      </div>
    </div>
  );
}