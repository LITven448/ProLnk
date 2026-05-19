import { useState } from 'react';

const urgencyMap: Record<string, string[]> = {
  "1950s": ["Full electrical rewire — knob-and-tube risk", "Cast iron sewer line replacement", "Foundation pier repair (original slab)"],
  "1960s": ["Panel upgrade from 60A to 200A", "Galvanized pipe replacement", "HVAC full system replacement"],
  "1970s": ["Panel upgrade from 100A to 200A", "Poly-B or galvanized pipe relining", "Roof and attic insulation overhaul"],
  "1980s": ["HVAC replacement (35–40 yr units)", "Window replacement for energy efficiency", "Foundation crack sealing and drainage"],
};

export default function GarlandHomeownerGuide2026() {
  const [decade, setDecade] = useState<string>("");

  const repairs = urgencyMap[decade] || [];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          GARLAND, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Garland Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Garland is one of the oldest established cities in DFW, with a significant housing stock dating back
          to the 1950s and 1960s. Many homes still carry their original electrical panels, cast iron sewer lines,
          and galvanized supply pipes — all well past their design life. ProLnk connects Garland homeowners
          with licensed trades specializing in upgrades and replacements that older homes demand.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🏚️", label: "Home Stock Era", value: "1950–1990" },
            { icon: "⚡", label: "Most Urgent Need", value: "Electrical" },
            { icon: "🔩", label: "Plumbing Type", value: "Cast Iron" },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "#0F1F3D", borderRadius: 12, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ color: "#F5E642", fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: "#94A3B8", fontSize: 12 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F1F3D", borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🏠 Your Home Decade → Most Urgent Repair Category
          </h2>
          <select
            value={decade}
            onChange={(e) => setDecade(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035", color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your home build decade...</option>
            <option value="1950s">1950s</option>
            <option value="1960s">1960s</option>
            <option value="1970s">1970s</option>
            <option value="1980s">1980s</option>
          </select>
          {repairs.length > 0 && (
            <div>
              {repairs.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < repairs.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F5E642", color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0A1628", marginBottom: 8 }}>
            Garland Upgrades Start Here
          </div>
          <div style={{ color: "#0A1628", fontSize: 15, marginBottom: 16 }}>
            ProLnk connects Garland homeowners with licensed electricians, plumbers, and HVAC pros fast.
          </div>
          <button style={{ backgroundColor: "#0A1628", color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
