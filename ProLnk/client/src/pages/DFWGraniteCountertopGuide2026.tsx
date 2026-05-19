import { useState } from 'react';

const graniteTypes = [
  { name: "Black Pearl", color: "Dark/Black", sealFreq: "Every 2 years", etching: "Low risk", priceRange: "$45–$70/sqft" },
  { name: "Colonial White", color: "White/Gray", sealFreq: "Annually", etching: "High risk", priceRange: "$50–$75/sqft" },
  { name: "Giallo Ornamental", color: "Gold/Cream", sealFreq: "Every 18 mo", etching: "Medium risk", priceRange: "$40–$65/sqft" },
  { name: "Blue Pearl", color: "Blue/Silver", sealFreq: "Annually", etching: "Low risk", priceRange: "$55–$80/sqft" },
];

const concernGuide: Record<string, { tip: string; graniteRec: string }> = {
  "DFW hard water deposits on light granite": { tip: "Use pH-neutral granite cleaner only. Acidic cleaners (vinegar, lemon) etch and dull light granite fast in DFW hard water conditions.", graniteRec: "Choose darker granite like Black Pearl or Blue Pearl — deposits are far less visible." },
  "Forgetting to reseal": { tip: "Set a phone reminder every October (before holiday cooking season). DFW granite needs annual sealing to resist the region hard water.", graniteRec: "Darker granites buy you more time between sealings — some can go 2+ years." },
  "Heat from DFW cooking": { tip: "Granite is naturally heat-resistant — you can place hot pots directly on the surface without damage, unlike quartz.", graniteRec: "Any granite works. This is a granite advantage over quartz in DFW kitchens." },
  "Resale value in DFW market": { tip: "Granite consistently ranks as a top ROI upgrade in DFW home sales per HAR data. Natural stone resonates with buyers.", graniteRec: "Colonial White or Giallo Ornamental are perennial DFW buyer favorites." },
};

export default function DFWGraniteCountertopGuide2026() {
  const [concern, setConcern] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>DFW Granite Countertop Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Natural granite is timeless — but DFW hard water and acidic cleaning products destroy unsealed granite fast. Here is what to know.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "💧", title: "Seal Annually — No Exceptions", body: "DFW water (hardness 15–25 gpg) leaves mineral deposits on unsealed granite. Seal every 12 months with penetrating sealer. Light granites may need more frequent sealing." },
            { icon: "🌡️", title: "Heat Resistant — Unlike Quartz", body: "Granite is natural stone and handles hot cookware directly. This is a major advantage for DFW kitchens. No trivets required, though padding protects the sealant." },
            { icon: "🧪", title: "Avoid Acidic Cleaners", body: "Vinegar, lemon, bleach, and many household sprays etch granite and destroy the sealer. Use only pH-neutral granite cleaner. DFW hard water already stresses the surface." },
            { icon: "🪨", title: "Every Slab Is Unique", body: "Unlike quartz, no two granite slabs are identical. Visit DFW showrooms (Daltile, Floor & Decor) to select your exact slab — photos online do not capture the full variation." },
          ].map((c) => (
            <div key={c.title} style={{ background: "#1a2744", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.4rem" }}>{c.title}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{c.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.25rem", marginBottom: "1rem" }}>Popular DFW Granite Options</h2>
        <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#1a2744" }}>
                {["Granite", "Color Family", "Seal Frequency", "Etching Risk", "DFW Price"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem", textAlign: "left", color: "#F5E642" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {graniteTypes.map((g, i) => (
                <tr key={g.name} style={{ background: i % 2 === 0 ? "#0f1f3d" : "#0A1628" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{g.name}</td>
                  <td style={{ padding: "0.75rem", color: "#94a3b8" }}>{g.color}</td>
                  <td style={{ padding: "0.75rem" }}>{g.sealFreq}</td>
                  <td style={{ padding: "0.75rem", color: g.etching === "High risk" ? "#ef4444" : g.etching === "Low risk" ? "#22c55e" : "#F5E642" }}>{g.etching}</td>
                  <td style={{ padding: "0.75rem", color: "#F5E642" }}>{g.priceRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.25rem", marginBottom: "1rem" }}>🎯 DFW Granite Concern Guide</h2>
        <div style={{ background: "#1a2744", borderRadius: 12, padding: "1.5rem" }}>
          <label style={{ color: "#94a3b8", fontSize: "0.85rem" }}>WHAT IS YOUR MAIN CONCERN?</label>
          <select
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #2d3f6b", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="">— Select your concern —</option>
            {Object.keys(concernGuide).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          {concern && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.4rem" }}>Recommended Granite: {concernGuide[concern].graniteRec}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{concernGuide[concern].tip}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", background: "#1a2744", borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🔑 DFW Pro Tip</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Ask your fabricator for a water test on your chosen slab. Drip water on it — if it absorbs in under 4 minutes, it needs sealing before installation. Most DFW fabricators will seal on-site if you ask.</div>
        </div>
      </div>
    </div>
  );
}