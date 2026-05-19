import { useState } from 'react';

const projects = [
  { label: "Plumbing Repair", store: "Home Depot", reason: "More DFW locations, strong plumbing aisle, tool rental for drain snakes", icon: "🔧" },
  { label: "Appliance Purchase", store: "Lowes", reason: "Better appliance selection, quieter stores, superior delivery scheduling in DFW", icon: "🍳" },
  { label: "Pro Contractor Job", store: "Home Depot", reason: "Pro Xtra program, dedicated pro desk, contractor pricing at all 20+ DFW locations", icon: "🏗️" },
  { label: "Flooring & Tile", store: "Lowes", reason: "Better flooring showrooms in DFW stores, easier installation scheduling", icon: "🏠" },
  { label: "Tool Rental", store: "Home Depot", reason: "Home Depot Tool Rental available at most DFW locations — Lowes does not offer rental", icon: "⚙️" },
  { label: "Garden & Outdoor", store: "Home Depot", reason: "Larger garden centers at DFW locations, better seasonal inventory", icon: "🌿" },
  { label: "Customer Service", store: "Lowes", reason: "Consistently higher customer service ratings in DFW metro surveys", icon: "⭐" },
  { label: "Lumber & Framing", store: "Home Depot", reason: "Larger lumber yards at DFW stores, better stock of dimensional lumber", icon: "🪵" },
];

export default function DFWHomeDepotVsLowes2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = projects.find(p => p.label === selected);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏪</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Home Depot vs Lowes 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Which store wins for your project in the Dallas-Fort Worth metro</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
            <div style={{ textAlign: "center", padding: "12px 24px", backgroundColor: "#f96302″, borderRadius: 8, fontWeight: 700, fontSize: 14 }}>🟠 Home Depot — 22 DFW Locations</div>
            <div style={{ textAlign: "center", padding: "12px 24px", backgroundColor: "#004990″, borderRadius: 8, fontWeight: 700, fontSize: 14 }}>🔵 Lowes — 21 DFW Locations</div>
          </div>
          <p style={{ color: "#94a3b8″, fontSize: 13, textAlign: "center", margin: 0 }}>Both chains have strong DFW coverage — the right choice depends on your project type</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>Select Your Project Type</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {projects.map(p => (
            <button key={p.label} onClick={() => setSelected(p.label)}
              style={{ backgroundColor: selected === p.label ? "#F5E642″ : "#111f3a", color: selected === p.label ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px 14px", cursor: "pointer", fontWeight: 600, fontSize: 13, textAlign: "left" }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 24, border: "2px solid #F5E642″ }}>
            <div style={{ fontSize: 13, color: "#94a3b8″, marginBottom: 4 }}>Best store for {result.label}:</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>🏆 {result.store}</div>
            <p style={{ color: "#cbd5e1″, fontSize: 14, margin: 0 }}>{result.reason}</p>
            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#0A1628″, borderRadius: 8, fontSize: 13, color: "#94a3b8" }}>
              💡 ProLnk pros shop contractor supply houses for the best material pricing — ask your matched pro about sourcing options.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
