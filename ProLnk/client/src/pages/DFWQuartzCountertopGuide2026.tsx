import { useState } from 'react';

const quartzBrands = [
  { name: "Silestone", origin: "Spain", uvRating: "★★★★★", heatRating: "★★☆☆☆", priceRange: "$65–$95/sqft", bestFor: "High-traffic kitchens" },
  { name: "MSI Calacatta", origin: "USA/India", uvRating: "★★★★☆", heatRating: "★★☆☆☆", priceRange: "$55–$80/sqft", bestFor: "Budget-conscious elegance" },
  { name: "Cambria", origin: "USA (MN)", uvRating: "★★★★★", heatRating: "★★☆☆☆", priceRange: "$75–$110/sqft", bestFor: "Lifetime warranty buyers" },
];

const priorityGuide: Record<string, { brand: string; reason: string }> = {
  "UV Stability (south-facing windows)": { brand: "Silestone or Cambria", reason: "Both offer superior UV inhibitors — critical for DFW south-facing kitchens that get intense afternoon sun." },
  "Hard Water Resistance": { brand: "MSI Calacatta", reason: "Lighter veining hides DFW hard water deposits better; use pH-neutral cleaner only." },
  "Value / Budget": { brand: "MSI Calacatta", reason: "Strong value at $55–$80/sqft without sacrificing DFW-proven durability." },
  "Lifetime Warranty": { brand: "Cambria", reason: "Only major brand with transferable lifetime warranty — strong resale value in DFW market." },
};

export default function DFWQuartzCountertopGuide2026() {
  const [priority, setPriority] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>DFW Quartz Countertop Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Engineered quartz is the #1 countertop choice in DFW — here is what local homeowners need to know before buying.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "☀️", title: "UV Stability Matters", body: "DFW south-facing kitchens get brutal afternoon sun. Quartz with UV inhibitors prevents yellowing over time — always ask your fabricator." },
            { icon: "🌡️", title: "Not Heat-Resistant", body: "Unlike granite, quartz is resin-bonded. Hot pots can crack or discolor the surface. Always use trivets — no exceptions in DFW kitchens." },
            { icon: "💧", title: "DFW Hard Water Warning", body: "DFW water (hardness 15–25 gpg) leaves calcium deposits on quartz. Use only pH-neutral cleaners. Avoid Windex, bleach, or vinegar." },
            { icon: "🔧", title: "Low Maintenance", body: "No sealing required — ever. Quartz is non-porous, resists bacteria, and holds up to DFW cooking demands with just soap and water." },
          ].map((c) => (
            <div key={c.title} style={{ background: "#1a2744″, borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 600, marginBottom: "0.4rem" }}>{c.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{c.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>Brand Comparison: DFW Top 3</h2>
        <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#1a2744″ }}>
                {["Brand", "Origin", "UV Rating", "Heat Rating", "Price/sqft", "Best For"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem", textAlign: "left", color: "#F5E642″ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quartzBrands.map((b, i) => (
                <tr key={b.name} style={{ background: i % 2 === 0 ? "#0f1f3d" : "#0A1628″ }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{b.name}</td>
                  <td style={{ padding: "0.75rem", color: "#94a3b8″ }}>{b.origin}</td>
                  <td style={{ padding: "0.75rem" }}>{b.uvRating}</td>
                  <td style={{ padding: "0.75rem" }}>{b.heatRating}</td>
                  <td style={{ padding: "0.75rem", color: "#F5E642″ }}>{b.priceRange}</td>
                  <td style={{ padding: "0.75rem", color: "#94a3b8″ }}>{b.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>🎯 Find Your DFW Quartz Match</h2>
        <div style={{ background: "#1a2744″, borderRadius: 12, padding: "1.5rem" }}>
          <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>WHAT MATTERS MOST TO YOU?</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #2d3f6b", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="">— Select your priority —</option>
            {Object.keys(priorityGuide).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          {priority && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Recommended: {priorityGuide[priority].brand}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{priorityGuide[priority].reason}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", background: "#1a2744″, borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🔑 DFW Pro Tip</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Request a seam map from your fabricator before installation. DFW kitchen islands over 60″ will have visible seams — knowing placement upfront avoids surprises.</div>
        </div>
      </div>
    </div>
  );
}