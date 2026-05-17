import { useState } from 'react';

const stats = [
  { icon: "⛈️", value: "5.7", label: "Hail events per year in DFW", note: "vs. 2.1 US average" },
  { icon: "📅", value: "April", label: "Most active hail month", note: "March-May peak season" },
  { icon: "⚪", value: "1-in-3", label: "Years with golf-ball+ hail", note: "1.75\" diameter or larger" },
  { icon: "🛡️", value: "40%", label: "Reduction in claim frequency", note: "Class 4 impact-resistant shingles" },
  { icon: "💰", value: "$18K", label: "Average DFW hail claim", note: "2023 TDI data" },
  { icon: "📍", value: "Collin/Denton", label: "Highest hail frequency counties", note: "Tornado Alley corridor" },
];

const locations = [
  "Plano / Allen / McKinney",
  "Fort Worth / Keller / Southlake",
  "Dallas / Irving / Garland",
  "Frisco / Prosper / Celina",
  "Arlington / Grand Prairie / Mansfield",
  "Denton / Flower Mound / Lewisville",
];

const roofAges = ["0-5 years old", "6-10 years old", "11-15 years old", "16-20 years old", "21+ years old"];

const assessments: Record<string, string> = {
  "0-5 years old": "Good news - a new roof should handle minor hail. After any storm with 1\"+ hail, inspect flashing, valleys, and soft metals (gutters, vents) for damage even if shingles look fine.",
  "6-10 years old": "Mid-life roof in a prime hail zone. After any significant event, have a licensed roofer inspect for bruising on shingle granules - storm damage is often invisible to the untrained eye.",
  "11-15 years old": "Roof approaching replacement window in DFW. Any hail event of 1.5\"+ warrants a full inspection and insurance claim review. Granule loss is likely even without visible holes.",
  "16-20 years old": "High risk zone. At 15-20 years, DFW asphalt shingles have minimal impact resistance left. A single significant hail event may constitute full replacement. Document with photos immediately after storms.",
  "21+ years old": "Replacement strongly recommended before next hail season. At 20+ years, DFW shingles are past manufacturer life expectancy. Insurance may apply depreciation, reducing payout significantly.",
};

export default function DFWRoofingHailFact2026() {
  const [location, setLocation] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [result, setResult] = useState("");

  const handleAssess = () => {
    if (!location || !roofAge) return;
    const advice = assessments[roofAge] || "Select your roof age for a personalized assessment.";
    setResult(`${location}: ${advice}`);
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>PROLNK - DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌨️ DFW Hail Facts & Statistics Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>DFW is one of the most hail-prone metro areas in the United States. Every homeowner in North Texas should understand local hail risk before their next roof decision.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "#0F2040", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: "#fff", fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>📊 Class 4 Shingles - Are They Worth It in DFW?</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>Class 4 impact-resistant shingles (UL 2218 rated) cost 15-25% more than standard shingles. In DFW, most major insurers offer premium discounts of 20-28% for Class 4 roofs. Over a 20-year roof life, DFW homeowners typically save $3,000-8,000 in premium reductions - more than offsetting the upgrade cost.</p>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🔍 DFW Location + Roof Age → Hail Risk Assessment</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Your DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select area...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Approximate Roof Age</label>
            <select value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select age...</option>
              {roofAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <button onClick={handleAssess} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Get Hail Risk Assessment →</button>
          {result && <div style={{ marginTop: 16, background: "#0A1628", borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted roofing pros · <span style={{ color: "#F5E642" }}>prolnk.io</span></div>
      </div>
    </div>
  );
}
