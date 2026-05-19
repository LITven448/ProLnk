import { useState } from 'react';

const filterBrands = [
  { name: "Nordic Pure", merv: 13, price: "$$", best: "Cedar/Allergy Season", icon: "❄️", note: "Best MERV-13 value for DFW cedar season" },
  { name: "Filtrete 3M", merv: 12, price: "$$", best: "General Use", icon: "🔵", note: "Widely available at Home Depot/Lowes, great quality" },
  { name: "Honeywell", merv: 11, price: "$", best: "Budget-Conscious", icon: "🟡", note: "Reliable mid-range, good for mild seasons" },
  { name: "Aprilaire", merv: 16, price: "$$$", best: "Whole-Home Systems", icon: "🏠", note: "Media filter, requires whole-home setup" },
];

const concerns = ["Cedar Fever Season (Jan–Mar)", "Summer Dust & Heat", "Pet Dander", "Whole-Home Filtration", "Budget-Friendly"];
const budgets = ["Economy ($)", "Mid-Range ($$)", "Premium ($$$)"];

const recommend = (concern: string, budget: string) => {
  if (concern.includes("Cedar")) return "Nordic Pure MERV-13 — designed for high pollen loads in DFW cedar season.";
  if (concern.includes("Whole-Home")) return "Aprilaire MERV-16 media filter — best for whole-home systems.";
  if (budget.includes("Economy")) return "Honeywell MERV-11 — solid mid-range without overpaying.";
  if (budget.includes("Premium")) return "Nordic Pure or Filtrete 1500 — top MERV-13 performance.";
  return "Filtrete 3M MERV-12 — widely available and reliable for most DFW homes.";
};

export default function DFWHVACFilterBrandDFW2026() {
  const [concern, setConcern] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!concern || !budget) return;
    setResult(recommend(concern, budget));
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌬️ DFW HVAC Filter Brand Comparison 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>The right filter brand matters in DFW — cedar season, dust storms, and 100°F summers demand more than a cheap fiberglass panel.</p>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>⚠️ Why Cheap Fiberglass Is Never Right for DFW</h2>
          <p style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.6 }}>Fiberglass filters (MERV 1–4) capture less than 20% of pollen particles. During DFW cedar season, mountain cedar pollen saturates the air — a MERV-13 minimum is the industry standard for allergy protection. Cheap filters also allow dust to coat your evaporator coil, dropping efficiency and triggering breakdowns.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {filterBrands.map(b => (
            <div key={b.name} style={{ background: "#0F2040″, borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
              <div style={{ color: "#F5E642″, fontSize: 12, marginBottom: 4 }}>MERV {b.merv} · {b.price}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12 }}>{b.note}</div>
              <div style={{ color: "#64748b", fontSize: 11, marginTop: 6 }}>Best for: {b.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>🔍 Get Your DFW Filter Recommendation</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Primary DFW Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: "100%", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select concern...</option>
              {concerns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Budget Range</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: "100%", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select budget...</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Get Recommendation →</button>
          {result && <div style={{ marginTop: 16, background: "#0A1628″, borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted HVAC pros · <span style={{ color: "#F5E642″ }}>prolnk.io</span></div>
      </div>
    </div>
  );
}