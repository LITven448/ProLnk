import { useState } from 'react';

const patternRules = [
  { icon: "📐", title: "Start at Exterior Corners", desc: "Corners carry concentrated point loads. DFW engineers place first piers at all 4 corners — these anchor the leveling baseline for the rest of the pattern." },
  { icon: "🏗️", title: "Exterior Wall Spacing: 7–10 Feet", desc: "DFW standard exterior pier spacing. Wider for lighter structures, tighter for 2-story or heavy brick. Spacing reflects load distribution across DFW clay bearing capacity." },
  { icon: "🔩", title: "Interior Load-Bearing Walls: 8–12 Feet", desc: "Interior piers support beam loads beneath load-bearing walls. Spacing varies by span length and DFW soil bearing capacity from elevation survey data." },
  { icon: "📊", title: "Elevation Survey Drives Everything", desc: "DFW engineers run elevation shots across the slab (typically 6-inch grid) before planning piers. The low areas — where settlement is greatest — get tighter pier spacing." },
  { icon: "🟤", title: "DFW Clay Type Affects Spacing", desc: "Dark Blackland clay (central DFW) = tighter pattern. Sandy loam (far north DFW, Denton County) = can space wider. Highly expansive zones may require 5-foot spacing near problem corners." },
];

const situations = [
  { label: "Corner of house dropping, rest stable", recommendation: "Corner + Adjacent Piers Only", detail: "Targeted repair — corner pier plus 1–2 flanking piers on each wall extending from the corner. Isolates the repair without over-piering." },
  { label: "Full side of house dropping uniformly", recommendation: "Full Exterior Wall Run", detail: "7–10 foot spacing along the entire affected wall. Engineer may recommend interior support piers if the wall is load-bearing." },
  { label: "Multiple areas dropping across the slab", recommendation: "Full Elevation Survey First", detail: "When 3+ areas show movement, skip spot repairs. Full elevation survey defines a comprehensive pattern — more cost effective than repeated spot repairs." },
  { label: "New construction on DFW clay lot", recommendation: "Drilled Bell-Bottom Grid Pattern", detail: "New construction bell-bottoms typically on 8-foot grid. Placed before pour. DFW engineers specify depth to stable clay stratum, typically 10–25 feet." },
  { label: "Pier-and-beam foundation settling", recommendation: "Interior Grid + Exterior Perimeter", detail: "Pier-and-beam DFW homes need both perimeter and interior beam support. Engineer maps beam layout to determine pier placement under each beam intersection." },
];

export default function DFWFoundationDrillPattern2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW Foundation Pier Drilling Pattern Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>
            How DFW engineers determine where piers go — elevation surveys, load paths, soil data
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {patternRules.map((r, i) => (
            <div key={i} style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 18, border: "1px solid #1e3a5f", display: "flex", gap: 14 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</div>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{r.title}</div>
                <div style={{ color: "#94a3b8″, fontSize: 13, lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 24, border: "1px solid #1e3a5f", marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🔍 Your DFW Repair Situation</h2>
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
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 15, marginBottom: 6 }}>✅ {situations[selected].recommendation}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].detail}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 18, border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>📋 What to Ask Your DFW Foundation Company</h3>
          {["Will you provide an elevation map showing current drop measurements?", "How many piers are proposed and at what spacing?", "What is the target depth to stable clay stratum?", "Is this pattern based on the elevation survey or a standard quote?"].map((q, i) => (
            <div key={i} style={{ color: "#94a3b8″, fontSize: 13, marginBottom: 8 }}>• {q}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28, color: "#475569″, fontSize: 12 }}>
          ProLnk DFW Foundation Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
