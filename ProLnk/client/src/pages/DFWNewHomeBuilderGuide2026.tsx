import { useState } from 'react';

const builders = [
  { name: "D.R. Horton", range: "$280K–$520K", focus: "Entry-level & move-up", warranty: "1/2/10″, caution: "High volume — inspect every phase" },
  { name: "Lennar", range: "$310K–$600K", focus: "Everything included", warranty: "1/2/10″, caution: "Watch structural upgrades closely" },
  { name: "Pulte", range: "$350K–$700K", focus: "Move-up & active adult", warranty: "1/2/10″, caution: "Upgrade pricing inflated 20–40%" },
  { name: "Highland Homes", range: "$400K–$900K", focus: "Semi-custom DFW", warranty: "1/2/10″, caution: "Lot premiums add fast — get itemized" },
];

const watchItems: Record<string, string[]> = {
  "Production Builder": ["Rushed framing timelines", "Standard grade fixtures unless upgraded", "Limited lot choice in later phases", "Warranty claims can be slow — document everything"],
  "Semi-Custom Builder": ["Change order costs escalate quickly", "Subcontractor inconsistency", "Material substitutions mid-build", "Allowances run over — set hard limits"],
  "Custom Builder": ["Lender approval complexity", "Timeline overruns common (plan +20%)", "Architect fees 8–15% of build cost", "Need independent inspector every phase"],
};

export default function DFWNewHomeBuilderGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [builderType, setBuilderType] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏗️ PROLNK GUIDE — DFW NEW CONSTRUCTION 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW New Home Builder Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>Top builders, upgrade traps, warranty limits, and why independent inspection is non-negotiable.</p>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>🏢 Top DFW Builders at a Glance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 40 }}>
          {builders.map(b => (
            <div key={b.name} onClick={() => setSelected(selected === b.name ? null : b.name)}
              style={{ background: selected === b.name ? "#1a2e50″ : "#111d35", border: `1px solid ${selected === b.name ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: 20, cursor: "pointer" }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{b.name}</div>
              <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 4 }}>{b.range}</div>
              <div style={{ color: "#aab", fontSize: 13, marginBottom: 4 }}>Focus: {b.focus}</div>
              <div style={{ color: "#aab", fontSize: 13 }}>Warranty: {b.warranty}</div>
              {selected === b.name && (
                <div style={{ marginTop: 12, background: "#0d1f3c", borderRadius: 8, padding: 12, color: "#F5E642″, fontSize: 13 }}>
                  ⚠️ {b.caution}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🔍 Upgrade vs Aftermarket</h2>
        <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 40 }}>
          {[["Flooring", "Builder adds $8–15/sqft", "Aftermarket saves 30–50% + better selection"],
            ["Kitchen Cabinets", "Builder upgrade: $5K–$20K", "Aftermarket cabinetry often higher quality"],
            ["Countertops", "Builder quartz: $4K–$8K premium", "Aftermarket quartz similar quality, less cost"],
            ["Lighting", "Builder allowance rarely covers quality", "Aftermarket post-close = full control"],
            ["Landscaping", "Builder basic sod only", "Aftermarket full design, irrigation, trees"]
          ].map(([item, builder, after]) => (
            <div key={item} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 12, borderBottom: "1px solid #1e3a5f", padding: "10px 0″, fontSize: 13 }}>
              <div style={{ color: "#F5E642″, fontWeight: 600 }}>{item}</div>
              <div style={{ color: "#aab" }}>🏗️ {builder}</div>
              <div style={{ color: "#7ef5a8″ }}>✅ {after}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🔎 Builder Type → What to Watch For</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {Object.keys(watchItems).map(t => (
            <button key={t} onClick={() => setBuilderType(builderType === t ? "" : t)}
              style={{ background: builderType === t ? "#F5E642″ : "#1a2e50", color: builderType === t ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{t}</button>
          ))}
        </div>
        {builderType && (
          <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 32 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>⚠️ {builderType} — Watch For:</div>
            {watchItems[builderType].map((w, i) => (
              <div key={i} style={{ color: "#dde", fontSize: 14, padding: "6px 0″, borderBottom: "1px solid #1e3a5f" }}>• {w}</div>
            ))}
          </div>
        )}

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 Get Independent Trades via ProLnk</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>Builder warranty gaps? ProLnk connects you with verified DFW tradespeople — no middleman, no markup.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Connect with a Pro →</button>
        </div>
      </div>
    </div>
  );
}
