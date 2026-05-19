import { useState } from 'react';

const typeMap: Record<string, string[]> = {
  slab: ["Foundation crack mapping and pier repair", "HVAC replacement (many 1980s–1990s units)", "Roof inspection for wind and hail damage"],
  "pier-beam": ["Pier and beam re-leveling", "Crawl space moisture barrier", "Subfloor and joist inspection"],
  brick: ["Mortar and tuckpointing inspection", "Window and door frame alignment check", "Attic insulation and ventilation upgrade"],
};

export default function MesquiteHomeownerGuide2026() {
  const [homeType, setHomeType] = useState<string>("");

  const priorities = typeMap[homeType] || [];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          MESQUITE, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Mesquite Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8″, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Mesquite is a working-class city east of Dallas with solid 1970s–1990s housing stock built to last.
          Many homes feature pier-and-beam foundations — durable but requiring periodic releveling.
          HVAC systems installed during the building boom are now 25–40 years old and overdue for replacement.
          ProLnk connects Mesquite homeowners to affordable, reliable trade pros who know the area.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🧱", label: "Home Style", value: "Brick, 1970s–90s" },
            { icon: "🏗️", label: "Foundation Type", value: "Pier & Beam" },
            { icon: "🌡️", label: "Top Trade Need", value: "HVAC Replace" },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "#0F1F3D", borderRadius: 12, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: "#94A3B8″, fontSize: 12 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F1F3D", borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🏠 Your Home Type → Priority Maintenance List
          </h2>
          <select
            value={homeType}
            onChange={(e) => setHomeType(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035″, color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your home type...</option>
            <option value="slab">Slab Foundation</option>
            <option value="pier-beam">Pier & Beam Foundation</option>
            <option value="brick">Brick Exterior (any foundation)</option>
          </select>
          {priorities.length > 0 && (
            <div>
              {priorities.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0″, borderBottom: i < priorities.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F5E642″, color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0A1628″, marginBottom: 8 }}>
            Mesquite Homeowners Get Fast Matches
          </div>
          <div style={{ color: "#0A1628″, fontSize: 15, marginBottom: 16 }}>
            ProLnk finds licensed, affordable Mesquite trade pros — no referral fees, no runaround.
          </div>
          <button style={{ backgroundColor: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
