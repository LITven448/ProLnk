import { useState } from 'react';

const brands = [
  { name: "Pentair IntelliChlor", icon: "🔵", rating: 4.7, price: "$600-900", cellLife: "3-5 yrs", notes: "Most popular in DFW, excellent auto-clean" },
  { name: "Hayward AquaRite", icon: "🟢", rating: 4.5, price: "$500-750", cellLife: "3-5 yrs", notes: "Solid reliability, T-Cell-15 for large pools" },
  { name: "CircuPool SI-40", icon: "🟡", rating: 4.3, price: "$400-600", cellLife: "4-6 yrs", notes: "Self-cleaning, best warranty in class" },
];

const ages = ["0-1 yr", "1-2 yrs", "2-3 yrs", "3-4 yrs", "4-5 yrs", "5+ yrs"];

const maintenanceGuide: Record<string, string[]> = {
  "0-1 yr": ["✅ Check salt level monthly (2700-3400 ppm)", "✅ Inspect cell every 3 months", "✅ Keep pH 7.2-7.8 to protect cell", "✅ Run cell inspection cycle quarterly"],
  "1-2 yrs": ["🔍 Acid wash cell if output drops below 70%", "🔍 Inspect plates for calcium deposits", "✅ Test cell output via control panel", "✅ DFW hard water — clean every 90 days"],
  "2-3 yrs": ["⚠️ Schedule professional cell inspection", "⚠️ Acid wash if calcium visible on plates", "🔍 Check amperage output matches spec", "✅ Consider flow sensor calibration"],
  "3-4 yrs": ["⚠️ Cell nearing mid-life — monitor output weekly", "⚠️ Acid wash every 60 days in DFW", "🔍 Inspect wiring and flow switch", "🛒 Budget for replacement: $200-500 for cell"],
  "4-5 yrs": ["🚨 End of typical DFW cell lifespan", "🚨 Test output — replace if below 50%", "⚠️ Acid wash monthly to extend life", "🛒 Order replacement cell now to avoid downtime"],
  "5+ yrs": ["🚨 Replace cell immediately", "🚨 Failing cell strains chlorinator board", "💰 Replacement cost: $200-500 cell only", "💰 Full unit replacement: $500-900 installed"],
};

export default function DFWPoolSaltCell2026() {
  const [brand, setBrand] = useState("");
  const [age, setAge] = useState("");

  const guide = age ? maintenanceGuide[age] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧂</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Salt Chlorinator Cell Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>DFW hard water is tough on salt cells — quarterly acid washes are essential</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setBrand(b.name)}
              style={{ background: brand === b.name ? "#1e3a5f" : "#0f2035", border: `2px solid ${brand === b.name ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 16, cursor: "pointer" }}>
              <div style={{ fontSize: 28 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
              <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 4 }}>{b.price} · {b.cellLife}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{b.notes}</div>
              <div style={{ color: "#F5E642", marginTop: 8, fontSize: 13 }}>⭐ {b.rating}/5</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🔧 Get Your Maintenance Guide</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {ages.map(a => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: "8px 16px", borderRadius: 8, border: `2px solid ${age === a ? "#F5E642" : "#1e3a5f"}`, background: age === a ? "#F5E642" : "#1e3a5f", color: age === a ? "#0A1628" : "#fff", cursor: "pointer", fontWeight: age === a ? 700 : 400 }}>
                {a}
              </button>
            ))}
          </div>
          {guide && (
            <div>
              <h3 style={{ color: "#F5E642", marginBottom: 12 }}>Cell Age: {age} — Action Plan</h3>
              {guide.map((item, i) => (
                <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 14 }}>{item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: "#F5E642", marginBottom: 12 }}>⚠️ DFW-Specific Warning Signs</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Low chlorine despite high output setting", "White calcium scale on cell plates", "Cell output below 70% of rated capacity", "Error codes: no-flow, low salt, inspect cell"].map((w, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>🚨 {w}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>Need a salt cell inspection or replacement?</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>ProLnk connects you with DFW pool pros who specialize in salt systems</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Find a DFW Pool Pro 🔧</button>
        </div>
      </div>
    </div>
  );
}