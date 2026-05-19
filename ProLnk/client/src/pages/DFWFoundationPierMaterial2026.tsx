import { useState } from 'react';

const materials = [
  {
    name: "Steel Push Piers",
    icon: "🔩",
    desc: "Galvanized or powder-coated steel driven to load-bearing stratum. Most common in DFW severe settlement cases.",
    lifespan: "25–50+ years",
    best: "Deep, severe settlement; older DFW homes with concrete slabs"
  },
  {
    name: "Concrete Bell-Bottom",
    icon: "🔔",
    desc: "Drilled pier with flared bottom bell. Transfers load to stable clay below the active zone. DFW classic method.",
    lifespan: "30–50 years",
    best: "New construction and major DFW repairs where drilling access exists"
  },
  {
    name: "Pressed Concrete Piles",
    icon: "🧱",
    desc: "Precast concrete cylinders pressed in sequence. Fast install, lower cost. Most common DFW method for budget repairs.",
    lifespan: "10–25 years",
    best: "Moderate DFW settlement, cost-conscious homeowners"
  },
  {
    name: "Helical Steel Piers",
    icon: "🌀",
    desc: "Steel shaft with helical plates screwed into stable soil. Load capacity verifiable at install by torque measurement.",
    lifespan: "25–50 years",
    best: "DFW new construction, additions, tight access, light loads"
  },
  {
    name: "Composite Piers",
    icon: "🟦",
    desc: "Hybrid plastic/fiber materials. Corrosion-resistant, no moisture absorption. Newer option gaining DFW traction.",
    lifespan: "20–40 years",
    best: "DFW areas with aggressive soil chemistry or high moisture"
  },
];

const situations = [
  { label: "Severe DFW settlement (2\"+ drop)", material: "Steel Push Piers", reason: "Deep pile driven to bedrock handles extreme DFW clay expansion/contraction cycles." },
  { label: "Moderate cracks, limited budget", material: "Pressed Concrete Piles", reason: "Most affordable DFW option for moderate settlement. Multiple installers, competitive pricing." },
  { label: "New home addition or sunroom", material: "Helical Steel Piers", reason: "Torque-verified load capacity at install. Ideal for new DFW structures before slab is poured." },
  { label: "Historical DFW home (pre-1970)", material: "Steel Push Piers or Bell-Bottom", reason: "Older DFW foundations need deep load transfer. Steel or bell-bottom provides permanent correction." },
  { label: "Tight side yard, no drill rig access", material: "Pressed Concrete Piles", reason: "Manual press equipment fits in tight DFW yards. No heavy drilling rig required." },
];

export default function DFWFoundationPierMaterial2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW Foundation Pier Material Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>
            Steel, concrete, helical, composite — what DFW soil demands from each
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {materials.map((m, i) => (
            <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 18, border: "1px solid #1e3a5f", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15 }}>{m.name}</span>
                </div>
                <span style={{ color: "#94a3b8″, fontSize: 18 }}>{expanded === i ? "▲" : "▼"}</span>
              </div>
              {expanded === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1e3a5f" }}>
                  <div style={{ color: "#e2e8f0″, fontSize: 13, marginBottom: 10 }}>{m.desc}</div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "8px 12px", flex: 1 }}>
                      <div style={{ color: "#F5E642″, fontSize: 11, fontWeight: 700, marginBottom: 2 }}>LIFESPAN</div>
                      <div style={{ color: "#94a3b8″, fontSize: 13 }}>{m.lifespan}</div>
                    </div>
                    <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "8px 12px", flex: 2 }}>
                      <div style={{ color: "#F5E642″, fontSize: 11, fontWeight: 700, marginBottom: 2 }}>BEST FOR</div>
                      <div style={{ color: "#94a3b8″, fontSize: 13 }}>{m.best}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 24, border: "1px solid #1e3a5f", marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🏠 Your DFW Repair Situation</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? "#F5E642″ : "#0A1628",
                  color: selected === i ? "#0A1628″ : "#e2e8f0",
                  border: "1px solid " + (selected === i ? "#F5E642″ : "#1e3a5f"),
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", fontSize: 14, fontWeight: selected === i ? 700 : 400,
                }}>{s.label}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, backgroundColor: "#0A1628″, borderRadius: 10, padding: 18, border: "1px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 15, marginBottom: 6 }}>✅ Recommended: {situations[selected].material}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].reason}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: "#475569″, fontSize: 12 }}>
          ProLnk DFW Foundation Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
