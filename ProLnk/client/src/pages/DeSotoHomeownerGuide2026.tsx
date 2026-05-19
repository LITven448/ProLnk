import { useState } from 'react';

const serviceMap: Record<string, Record<string, string[]>> = {
  "2000-2010": {
    slab: ["Foundation inspection — expansive soil zone", "HVAC service (15–20 yr units)", "Roof granule check and reseal"],
    "pier-beam": ["Pier leveling and crawl space moisture check", "HVAC replacement", "Attic insulation upgrade"],
  },
  "2011-2020": {
    slab: ["Irrigation efficiency audit", "Roof hail damage inspection", "Water heater flush and anode check"],
    "pier-beam": ["Crawl space vapor barrier", "Window caulk and seal check", "HVAC filter and coil service"],
  },
};

export default function DeSotoHomeownerGuide2026() {
  const [ageRange, setAgeRange] = useState<string>("");
  const [foundationType, setFoundationType] = useState<string>("");

  const result = ageRange && foundationType ? (serviceMap[ageRange]?.[foundationType] || []) : [];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          DESOTO, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          DeSoto Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          DeSoto sits in southern Dallas County where a humid microclimate accelerates wear on roofing and
          HVAC systems compared to drier northern suburbs. Development surged in the 2000s–2015 window,
          meaning most homes are now 10–25 years old and hitting key maintenance milestones. The region
          sits on expansive clay soil — foundation monitoring is non-negotiable for long-term home value.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "💧", label: "Climate Factor", value: "Humid South DFW" },
            { icon: "🏗️", label: "Dominant Era", value: "2000s–2015" },
            { icon: "🌍", label: "Soil Type", value: "Expansive Clay" },
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
            🔍 Home Age + Foundation Type → Top Service Needs
          </h2>
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035", color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 16 }}
          >
            <option value="">Select your home age...</option>
            <option value="2000-2010">2000 – 2010</option>
            <option value="2011-2020">2011 – 2020</option>
          </select>
          <select
            value={foundationType}
            onChange={(e) => setFoundationType(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035", color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your foundation type...</option>
            <option value="slab">Slab Foundation</option>
            <option value="pier-beam">Pier & Beam Foundation</option>
          </select>
          {result.length > 0 && (
            <div>
              {result.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < result.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F5E642", color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0A1628", marginBottom: 8 }}>
            DeSoto Pros Available Now
          </div>
          <div style={{ color: "#0A1628", fontSize: 15, marginBottom: 16 }}>
            ProLnk matches DeSoto homeowners with vetted pros in HVAC, roofing, foundation, and more.
          </div>
          <button style={{ backgroundColor: "#0A1628", color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
