import { useState } from 'react';

const priorities: Record<string, string[]> = {
  "2005-2010": ["Foundation inspection (clay soil movement)", "HVAC system replacement (15-20 yrs old)", "HOA exterior compliance audit"],
  "2011-2015": ["HVAC filter/coil service", "Attic insulation check", "Irrigation system tune-up"],
  "2016-2020": ["Roof inspection (hail damage)", "Water heater maintenance", "Window seal integrity check"],
};

export default function FriscoHomeownerGuide2026() {
  const [buildYear, setBuildYear] = useState<string>("");

  const result = priorities[buildYear] || [];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          FRISCO, TX — HOMEOWNER GUIDE 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Frisco Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          One of the fastest-growing cities in America, Frisco has added 100,000+ residents since 2010.
          Homes built between 2005 and 2020 dominate the landscape — and they are now hitting critical
          maintenance windows at the same time. Clay soil expansion creates foundation stress, HVAC units
          installed at construction are 10–15 years old, and dense HOA communities add compliance pressure
          on top of standard upkeep.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🏗️", label: "Avg Home Age", value: "12 Years" },
            { icon: "🌡️", label: "HOA Density", value: "High" },
            { icon: "🏠", label: "Median Home Value", value: "$540K" },
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
            🔍 Your Home Build Year → Top 3 Maintenance Priorities
          </h2>
          <select
            value={buildYear}
            onChange={(e) => setBuildYear(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 10, backgroundColor: "#162035", color: "#fff", border: "1px solid #1E3A5F", fontSize: 16, marginBottom: 20 }}
          >
            <option value="">Select your home build era...</option>
            <option value="2005-2010">2005 – 2010</option>
            <option value="2011-2015">2011 – 2015</option>
            <option value="2016-2020">2016 – 2020</option>
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
            Get Matched with a Frisco Pro Today
          </div>
          <div style={{ color: "#0A1628", fontSize: 15, marginBottom: 16 }}>
            ProLnk connects Frisco homeowners with licensed, vetted local tradespeople — fast.
          </div>
          <button style={{ backgroundColor: "#0A1628", color: "#F5E642", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Find a Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
