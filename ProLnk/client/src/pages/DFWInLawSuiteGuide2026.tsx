import { useState } from 'react';

const spaces = [
  { label: "Attached garage (2-car)", conversion: "Frame interior, add HVAC mini-split, rough-in bath + kitchenette, insulate door", cost: "$55–80K", sqft: "400–500 sq ft" },
  { label: "Bonus room above garage", conversion: "Add exterior stair access, extend HVAC or add mini-split, add bath rough-in", cost: "$45–70K", sqft: "350–600 sq ft" },
  { label: "Unused formal dining + flex room", conversion: "Reconfigure layout, pocket door partition, add kitchenette plumbing", cost: "$30–55K", sqft: "300–450 sq ft" },
  { label: "Detached garage or workshop", conversion: "Full insulation, HVAC, separate panel, bath + kitchenette, separate meter", cost: "$70–120K", sqft: "500–700 sq ft" },
];

const adaItems = [
  { icon: "🚿", label: "Roll-in shower (36\" min entry)" },
  { icon: "🚽", label: "Grab bars — toilet + shower (ADA placement)" },
  { icon: "🚪", label: "32\" clear doorways min (36\" preferred)" },
  { icon: "💡", label: "Rocker light switches at 48\" max height" },
  { icon: "🧴", label: "Lever faucet handles (easier grip)" },
  { icon: "🛏️", label: "Single-story layout — no step entry" },
];

export default function DFWInLawSuiteGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏡</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW In-Law Suite Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            Convert an existing space into a comfortable, code-compliant in-law suite in DFW.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🏗️ Choose Your Available Space</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {spaces.map((s, i) => (
              <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? "#1a3a6b" : "#0A1628″, border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: 14, cursor: "pointer" }}>
                <div style={{ fontWeight: 600 }}>{s.label} <span style={{ color: "#94A3B8″, fontSize: 13 }}>({s.sqft})</span></div>
                {selected === i && (
                  <div style={{ marginTop: 10, fontSize: 14 }}>
                    <div style={{ color: "#94A3B8″, marginBottom: 8 }}>📋 {s.conversion}</div>
                    <div style={{ color: "#F5E642″, fontWeight: 700 }}>💰 Estimated: {s.cost}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 4px" }}>❄️ HVAC Options</h2>
          <p style={{ color: "#94A3B8″, fontSize: 13, marginBottom: 16 }}>Choose the right approach for your conversion type.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[["Extend existing HVAC", "$3–8K", "Works when main system has capacity; requires ductwork run"], ["Mini-split ductless system", "$4–10K", "Best for detached or garage — fully independent, highly efficient"], ["Dual mini-split (heat + cool)", "$6–12K", "Two zones for sleeping + living area; no ductwork needed"]].map(([name, cost, desc]) => (
              <div key={name as string} style={{ background: "#0A1628″, borderRadius: 8, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{name}</span>
                  <span style={{ color: "#F5E642″, fontWeight: 700 }}>{cost}</span>
                </div>
                <div style={{ color: "#94A3B8″, fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>♿ ADA Accessibility Checklist</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {adaItems.map((item) => (
              <div key={item.label} style={{ background: "#0A1628″, borderRadius: 8, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: "#CBD5E1″ }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#1a3a6b", borderRadius: 8, padding: 12, fontSize: 13, color: "#94A3B8″ }}>
            ⚠️ <strong style={{ color: "#F5E642″ }}>Kitchenette vs Full Kitchen:</strong> Kitchenette (microwave + mini-fridge + sink) requires no additional permit in most DFW cities. Full kitchen with range requires a separate permit and zoning review.
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔨</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Get In-Law Suite Contractors</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk matches you with DFW remodelers who have completed in-law suite conversions.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
