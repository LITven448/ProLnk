import { useState } from 'react';

const drillApps = [
  { app: "Hanging shelf bracket", floor: "Standard concrete", drill: "SDS-Plus rotary hammer", bit: "5/32\" carbide bit", anchor: "Sleeve anchor 1/4\"", warning: "" },
  { app: "Hanging shelf bracket", floor: "Post-tension slab", drill: "STOP — locate cables first", bit: "GPR scan required", anchor: "Surface mount only", warning: "⚠️ NEVER drill post-tension slab without GPR scan" },
  { app: "Anchor bolt for equipment", floor: "Standard concrete", drill: "SDS-Max rotary hammer", bit: "3/4\" carbide bit", anchor: "Wedge anchor 1/2\"", warning: "" },
  { app: "Anchor bolt for equipment", floor: "Post-tension slab", drill: "STOP — locate cables first", bit: "GPR scan required", anchor: "Epoxy anchor after scan", warning: "⚠️ Cutting a post-tension cable = catastrophic failure" },
  { app: "Light fixture box", floor: "Standard concrete", drill: "Regular hammer drill", bit: "3/16\" carbide bit", anchor: "Drop-in anchor 3/16\"", warning: "" },
  { app: "Light fixture box", floor: "Post-tension slab", drill: "STOP — locate cables first", bit: "GPR scan required", anchor: "Surface conduit only", warning: "⚠️ DFW homes built after 1980 likely post-tension" },
];

export default function DFWConcreteDrillGuide() {
  const [app, setApp] = useState("");
  const [floor, setFloor] = useState("");

  const result = drillApps.find(r => r.app === app && r.floor === floor);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔩</div>
        <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", marginBottom: "0.5rem" }}>DFW Concrete Drill Guide</h1>
        <p style={{ color: "#9BA3B5″, marginBottom: "2rem" }}>SDS vs regular drill, anchor types, and the #1 danger in DFW homes: post-tension slabs.</p>

        <div style={{ background: "#FF4444″, borderRadius: 8, padding: "1rem 1.5rem", marginBottom: "2rem", border: "2px solid #FF6666" }}>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>⚠️ DFW POST-TENSION SLAB WARNING</div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>Most DFW homes built after 1980 have post-tension slabs. Cutting a cable causes the entire slab to fail. Always get a GPR (ground-penetrating radar) scan before drilling any floor. Cost: $200–400. It's not optional.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginTop: 0 }}>SDS-Plus Rotary Hammer</h3>
            <p style={{ color: "#9BA3B5″ }}>Best for most DFW homeowner drilling. Hammers and rotates simultaneously. Much faster than regular hammer drill. Required for anything over 1/4″ in diameter.</p>
          </div>
          <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginTop: 0 }}>Wedge vs Sleeve vs Drop-In</h3>
            <p style={{ color: "#9BA3B5″ }}>Wedge anchor: strongest, permanent. Sleeve anchor: removable, medium duty. Drop-in: flush mount, requires setting tool. Match anchor to load — never guess.</p>
          </div>
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>Find Your Setup</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>Application</label>
              <select value={app} onChange={e => setApp(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select application...</option>
                {[...new Set(drillApps.map(r => r.app))].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>Floor Type</label>
              <select value={floor} onChange={e => setFloor(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select floor type...</option>
                {[...new Set(drillApps.map(r => r.floor))].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: result.warning ? "#3A1010″ : "#0D2A1A", borderRadius: 8, padding: "1.5rem", border: `2px solid ${result.warning ? "#FF4444" : "#F5E642"}` }}>
              {result.warning && <div style={{ color: "#FF6666″, fontWeight: 700, marginBottom: "1rem" }}>{result.warning}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>DRILL</div><div style={{ color: "#F5E642", fontWeight: 600 }}>{result.drill}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>BIT SIZE</div><div style={{ color: "#F5E642", fontWeight: 600 }}>{result.bit}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>ANCHOR</div><div style={{ color: "#F5E642", fontWeight: 600 }}>{result.anchor}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#9BA3B5″, margin: "0 0 1rem" }}>Need a pro who knows DFW concrete?</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Find a DFW Concrete Pro on ProLnk</button>
        </div>
      </div>
    </div>
  );
}
