import { useState } from 'react';

const focusMap: Record<string, string[]> = {
  historic: ["Aging cast-iron plumbing — repipe priority", "Electrical panel upgrade (60A/100A to 200A)", "Foundation crack monitoring and pier repair"],
  transitional: ["Irrigation system optimization", "Foundation settling — pier and beam check", "HVAC upgrade cycle (15+ yr units)"],
  new: ["Builder-grade material warranty review", "Irrigation leak detection", "Attic insulation and ventilation audit"],
};

export default function McKinneyHomeownerGuide2026() {
  const [era, setEra] = useState<string>("");

  const result = focusMap[era] || [];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          MCKINNEY, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          McKinney Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8″, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          McKinney is a city of two eras — a charming historic downtown with pre-1990 homes that carry aging
          infrastructure, and a booming outer ring of new construction pushing its boundaries north. Each zone
          has distinct maintenance needs. Historic neighborhoods wrestle with original plumbing and panels;
          newer areas face irrigation overuse and early foundation settling on clay-heavy lots.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🏛️", label: "Historic Homes", value: "Pre-1990″ },
            { icon: "🔧", label: "Top Trade Need", value: "Plumbing" },
            { icon: "📈", label: "Growth Rate", value: "Top 10 US" },
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
            🏘️ Your Neighborhood Age → Maintenance Focus
          </h2>
          <select
            value={era}
            onChange={(e) => setEra(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035″, color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your neighborhood era...</option>
            <option value="historic">Historic (pre-1990)</option>
            <option value="transitional">Transitional (1990–2010)</option>
            <option value="new">New Construction (2011+)</option>
          </select>
          {result.length > 0 && (
            <div>
              {result.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0″, borderBottom: i < result.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F5E642″, color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0A1628″, marginBottom: 8 }}>
            Connect with a McKinney Pro Now
          </div>
          <div style={{ color: "#0A1628″, fontSize: 15, marginBottom: 16 }}>
            ProLnk matches you with licensed tradespeople who know McKinney neighborhoods.
          </div>
          <button style={{ backgroundColor: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
