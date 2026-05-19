import { useState } from 'react';

const seasonalChecklist: Record<string, string[]> = {
  "1990-2000": ["HVAC full replacement (25+ yrs)", "Pool resurfacing and equipment audit", "Foundation assessment — east Allen clay zones"],
  "2001-2010": ["Pool pump and filter service", "HVAC tune-up and coil cleaning", "Roof inspection for granule loss"],
  "2011-2020": ["Irrigation system efficiency audit", "Window and door seal check", "Attic insulation top-up"],
};

export default function AllenHomeownerGuide2026() {
  const [homeAge, setHomeAge] = useState<string>("");

  const checklist = seasonalChecklist[homeAge] || [];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          ALLEN, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Allen Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Allen is a mature DFW suburb where 1990s–2010s homes are hitting simultaneous maintenance milestones.
          With over 35% pool ownership, pool service is a top trade demand. East Allen sits on clay-heavy
          soil that shifts aggressively with seasonal moisture swings, making foundation care non-negotiable.
          HVAC systems installed in the 1990s and early 2000s are reaching end-of-life — proactive replacement
          avoids emergency summer failures.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🏊", label: "Pool Ownership Rate", value: "35%+" },
            { icon: "🏚️", label: "Dominant Home Era", value: "1990–2010" },
            { icon: "⚡", label: "Top Trade Need", value: "HVAC + Pool" },
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
            📅 Your Home Age → Seasonal Checklist
          </h2>
          <select
            value={homeAge}
            onChange={(e) => setHomeAge(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035", color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your home age range...</option>
            <option value="1990-2000">1990 – 2000</option>
            <option value="2001-2010">2001 – 2010</option>
            <option value="2011-2020">2011 – 2020</option>
          </select>
          {checklist.length > 0 && (
            <div>
              {checklist.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < checklist.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F5E642", color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0A1628", marginBottom: 8 }}>
            Allen Pros Ready for Your Job
          </div>
          <div style={{ color: "#0A1628", fontSize: 15, marginBottom: 16 }}>
            ProLnk matches Allen homeowners with vetted local pros in HVAC, pool, foundation, and more.
          </div>
          <button style={{ backgroundColor: "#0A1628", color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
