import { useState } from 'react';

type TreeCover = "none" | "light" | "heavy";

const guardRec: Record<TreeCover, { guard: string; reason: string }> = {
  none: { guard: "Skip gutter guards", reason: "Low debris load. Clean twice yearly. Guards add cost with minimal benefit." },
  light: { guard: "Micro-mesh guards", reason: "Stops light leaf fall while allowing DFW spring rain flow. Best mid-range option." },
  heavy: { guard: "Professional micro-mesh + annual inspection", reason: "Heavy oak leaf drop clogs most guards. Even micro-mesh needs annual clearing." },
};

export default function DFWGutterGuide2026() {
  const [homeSqFt, setHomeSqFt] = useState(2000);
  const [trees, setTrees] = useState<TreeCover>("light");
  const gutterSize = homeSqFt > 3000 ? "6-inch" : "5-inch";
  const style = homeSqFt > 2500 ? "K-style seamless" : "K-style sectional or seamless";
  const { guard, reason } = guardRec[trees];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌧️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW Gutter Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>DFW spring rain events protect or destroy your foundation. Gutters are critical infrastructure.</p>
        </div>

        <div style={{ background: "#132240", borderRadius: 14, padding: 22, marginBottom: 24 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏗️ Foundation First — Why DFW Gutters Matter</div>
          <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>DFW sits on expansive clay soil. When gutters fail, concentrated water at the foundation causes differential settling — crack repairs cost $8,000–$40,000+. Proper gutters are the cheapest foundation protection you can buy.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { icon: "📏", title: "5\" vs 6\" Gutters", body: "6-inch handles 40% more water. Required for steep roofs, large roof areas, or homes in high-rain zones." },
            { icon: "🔄", title: "Seamless vs Sectional", body: "Seamless: fewer leak points, custom-cut on-site, $8–15/ft. Sectional: DIY-friendly, but joints leak over time in TX heat cycling." },
            { icon: "🍂", title: "Cleaning Schedule", body: "DFW: clean October–November after oak leaf drop, and April after spring debris. Skip one season = blockage risk." },
            { icon: "🌿", title: "Gutter Guards Reality", body: "No guard is maintenance-free. Micro-mesh is best but still needs annual check. Foam inserts fail in 2–3 years." },
          ].map(c => (
            <div key={c.title} style={{ background: "#132240", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 5, fontSize: 14 }}>{c.title}</div>
              <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 20, fontSize: 20 }}>🏠 Home Size + Tree Cover → Gutter Recommendation</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#94a3b8", display: "block", marginBottom: 10, fontSize: 14 }}>Home Size: <strong style={{ color: "#fff" }}>{homeSqFt.toLocaleString()} sq ft</strong></label>
            <input type="range" min={1000} max={5000} step={100} value={homeSqFt} onChange={e => setHomeSqFt(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#94a3b8", marginBottom: 8, fontSize: 14 }}>Tree Coverage</div>
            <div style={{ display: "flex", gap: 10 }}>
              {(["none", "light", "heavy"] as TreeCover[]).map(t => (
                <button key={t} onClick={() => setTrees(t)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: trees === t ? "#F5E642" : "#1e3a5f", color: trees === t ? "#0A1628" : "#fff" }}>{t === "none" ? "No Trees" : t === "light" ? "Light" : "Heavy"}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div><div style={{ color: "#94a3b8", fontSize: 12 }}>Recommended Size</div><div style={{ fontWeight: 700, color: "#F5E642", fontSize: 18 }}>{gutterSize}</div></div>
              <div><div style={{ color: "#94a3b8", fontSize: 12 }}>Recommended Style</div><div style={{ fontWeight: 700, color: "#F5E642", fontSize: 16 }}>{style}</div></div>
            </div>
            <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>Guard Recommendation</div>
              <div style={{ fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>{guard}</div>
              <div style={{ color: "#cbd5e1", fontSize: 13 }}>{reason}</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#0A1628", marginBottom: 6 }}>🏠 ProLnk connects you to DFW gutter pros who understand foundation-first drainage.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Get multiple quotes from pre-screened local installers — fast.</div>
        </div>
      </div>
    </div>
  );
}
