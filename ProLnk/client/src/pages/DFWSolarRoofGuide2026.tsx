import { useState } from 'react';

type RoofAge = "new" | "old" | "replace";
type SolarInterest = "high" | "medium" | "low";

function getRecommendation(age: RoofAge, interest: SolarInterest) {
  if (age === "replace" && interest === "high") return { rec: "Tesla Solar Roof or Integrated Solar Shingles", reason: "Replacing anyway — bundling solar eliminates dual install cost. ROI: 8–12 years in DFW.", cost: "$35,000–$65,000 total" };
  if (age === "new" && interest === "high") return { rec: "Traditional Solar Panels on New Roof", reason: "New roof + separate panels = best flexibility. Choose panel-ready roofers.", cost: "$18,000–$30,000 for panels only" };
  if (interest === "medium") return { rec: "Panel-Ready Roof + Solar-Ready Wiring", reason: "Install roof now with solar prep. Add panels in 2–3 years when prices drop further.", cost: "$500–$1,500 solar prep add-on" };
  return { rec: "Standard Roof Replacement", reason: "Low solar interest or payback period too long. Revisit when utility rates increase further.", cost: "Standard replacement costs" };
}

export default function DFWSolarRoofGuide2026() {
  const [roofAge, setRoofAge] = useState<RoofAge>("replace");
  const [interest, setInterest] = useState<SolarInterest>("high");
  const result = getRecommendation(roofAge, interest);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "8px 0 4px" }}>DFW Solar Roof Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>DFW gets 234+ sunny days per year. Solar ROI is among the best in the country.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { icon: "🌞", title: "DFW Solar Potential", body: "5.7 peak sun hours/day average. One of the top 20 solar markets in the US. Utility rates rising 4–6% annually." },
            { icon: "💰", title: "Federal Tax Credit", body: "30% ITC (Investment Tax Credit) applies through 2032. $30K system = $9,000 direct tax credit. Stacks with TX rebates." },
            { icon: "🏠", title: "Tesla Solar Roof", body: "Glass tiles with embedded solar cells replace standard shingles. Premium aesthetics, higher cost, longer install time." },
            { icon: "⚡", title: "Traditional Panels", body: "Lower cost, faster install, easier maintenance. Works on any existing roof with 15+ years remaining life." },
          ].map(c => (
            <div key={c.title} style={{ background: "#132240″, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 5, fontSize: 14 }}>{c.title}</div>
              <div style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240″, borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 14, fontSize: 18 }}>Solar Roof vs Panels: Key Differences</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                  {["Factor", "Tesla Solar Roof", "Traditional Panels"].map(h => <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#94a3b8″ }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cost", "$35–65K", "$18–30K"],
                  ["Install Time", "5–10 days", "1–2 days"],
                  ["Aesthetics", "Seamless", "Visible on roof"],
                  ["Best For", "Full replace + solar", "Existing good roof"],
                  ["Warranty", "25 yr weather + power", "25 yr power"],
                ].map(([f, t, p]) => (
                  <tr key={f} style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <td style={{ padding: "10px 12px", color: "#94a3b8″ }}>{f}</td>
                    <td style={{ padding: "10px 12px", color: "#fff" }}>{t}</td>
                    <td style={{ padding: "10px 12px", color: "#22c55e" }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: "#132240″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 20, fontSize: 20 }}>🔧 Roof Age + Solar Interest → Decision Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#94a3b8″, marginBottom: 8, fontSize: 14 }}>Current Roof Status</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(["new", "old", "replace"] as RoofAge[]).map(r => (
                <button key={r} onClick={() => setRoofAge(r)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: roofAge === r ? "#F5E642″ : "#1e3a5f", color: roofAge === r ? "#0A1628" : "#fff" }}>
                  {r === "new" ? "New Roof (<5 yrs)" : r === "old" ? "Good Roof (5–15 yrs)" : "Needs Replacement"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#94a3b8″, marginBottom: 8, fontSize: 14 }}>Solar Interest Level</div>
            <div style={{ display: "flex", gap: 10 }}>
              {(["high", "medium", "low"] as SolarInterest[]).map(s => (
                <button key={s} onClick={() => setInterest(s)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: interest === s ? "#F5E642″ : "#1e3a5f", color: interest === s ? "#0A1628" : "#fff" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#F5E642″, marginBottom: 6 }}>{result.rec}</div>
            <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>💰 {result.cost}</div>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.6, fontSize: 14 }}>{result.reason}</p>
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#0A1628″, marginBottom: 6 }}>🏠 ProLnk connects you to DFW roofers certified to install both traditional and solar-integrated roofs.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Get a bundled roof + solar quote in one request. Vetted, local, and licensed.</div>
        </div>
      </div>
    </div>
  );
}
