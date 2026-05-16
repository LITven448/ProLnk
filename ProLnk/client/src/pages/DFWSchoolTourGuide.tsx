import { useState } from 'react';

const WHY_MATTERS = [
  "School ratings directly impact home resale value — even if you have no kids",
  "Top-rated ISD boundary = faster appreciation, higher comps, more buyer demand",
  "DFW school boundaries can shift — always verify with the ISD directly, not Zillow",
  "TEA, Niche, and GreatSchools all rate the same school differently — understand why",
];

const RATING_SOURCES = [
  { name: "TEA (Texas Education Agency)", url: "tea.texas.gov", what: "State accountability ratings (A-F). Legally mandated. Most objective for academic performance." },
  { name: "Niche.com", url: "niche.com", what: "Combines test scores, reviews, diversity, and teacher data. Perceived as lifestyle-weighted." },
  { name: "GreatSchools.org", url: "greatschools.org", what: "Equity-focused. Highlights opportunity gaps. Often shows lower scores than Niche for same school." },
];

const TOUR_CHECKLIST = [
  "Schedule a campus visit — call the principal's office, not just admissions",
  "Visit during school hours, not at an open house event",
  "Ask about teacher retention rate — turnover reveals culture problems",
  "Ask about extracurricular depth: athletics, arts, STEM, dual credit programs",
  "Look at hallway bulletin boards — student work shows academic bar",
  "Observe student-teacher interactions in a hallway pass moment",
  "Ask about special needs services if applicable",
];

const AGE_PRIORITIES: Record<string, { criteria: string[]; districts: string[] }> = {
  "Elementary (K-5)": {
    criteria: [
      "Reading and math proficiency rates (TEA STAAR data)",
      "Class size — DFW average is 22; under 20 is a green flag",
      "Full-day Pre-K availability",
      "Campus safety record (request via open records if needed)",
      "Proximity to home — walkability or short bus route matters",
    ],
    districts: ["Frisco ISD", "Highland Park ISD", "Carroll ISD (Southlake)", "Allen ISD"],
  },
  "Middle School (6-8)": {
    criteria: [
      "Advanced / GT (Gifted & Talented) program availability",
      "Art, band, athletics program quality",
      "STAAR performance at 8th grade — math acceleration matters for HS",
      "Campus culture — visit during lunch period",
      "Dual-language programs if relevant",
    ],
    districts: ["Plano ISD", "Frisco ISD", "Rockwall ISD", "Grapevine-Colleyville ISD"],
  },
  "High School (9-12)": {
    criteria: [
      "AP and dual-credit course offerings",
      "College acceptance and scholarship data",
      "CTE (Career & Technical) programs for trade or tech tracks",
      "Sports and performing arts depth",
      "Graduation rate and dropout rate (TEA data)",
    ],
    districts: ["Highland Park ISD", "Lovejoy ISD", "Carroll ISD", "Frisco ISD"],
  },
  "No Kids (Resale Focus)": {
    criteria: [
      "ISD reputation drives buyer pool — focus on name recognition",
      "Average days on market for homes in top-rated ISD vs others",
      "Look at 5-year appreciation rates by ISD boundary",
      "Confirm your specific home is in the high-rated campus zone, not the adjacent lower one",
    ],
    districts: ["Highland Park ISD", "Carroll ISD (Southlake)", "Frisco ISD", "Lovejoy ISD"],
  },
};

export default function DFWSchoolTourGuide() {
  const [ageGroup, setAgeGroup] = useState("Elementary (K-5)");
  const [showing, setShowing] = useState(false);
  const data = AGE_PRIORITIES[ageGroup];

  return (
    <div style={{ background: "#f9f6f0", minHeight: "100vh", fontFamily: "Georgia, serif", color: "#1a1a1a", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>🎓 DFW BUYER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: "#0A1628", marginBottom: 6 }}>DFW School Tour Guide</h1>
        <p style={{ color: "#555", fontSize: 16, marginBottom: 36 }}>Even without kids, school ratings shape your home's future value. Know how to evaluate them.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628", marginBottom: 14 }}>📌 Why School Ratings Matter</h2>
        {WHY_MATTERS.map((w, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 14 }}>✅ {w}</div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628", marginTop: 32, marginBottom: 14 }}>📊 DFW Rating Sources — They Don't Agree</h2>
        {RATING_SOURCES.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "18px 20px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0A1628", marginBottom: 4 }}>📎 {s.name}</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>🌐 {s.url}</div>
            <div style={{ fontSize: 14, color: "#444" }}>{s.what}</div>
          </div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628", marginTop: 32, marginBottom: 14 }}>🏫 Campus Visit Checklist</h2>
        {TOUR_CHECKLIST.map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 14 }}>🔍 {item}</div>
        ))}

        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 24, marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#0A1628", marginBottom: 18 }}>🎯 Criteria by Child Age</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Child Age Group / Priority</label>
            <select value={ageGroup} onChange={e => { setAgeGroup(e.target.value); setShowing(false); }} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }}>
              {Object.keys(AGE_PRIORITIES).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button onClick={() => setShowing(true)} style={{ background: "#0A1628", color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Get Criteria</button>
          {showing && data && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontWeight: 700, color: "#0A1628", marginBottom: 10 }}>What to Evaluate</div>
              {data.criteria.map((c, i) => <div key={i} style={{ fontSize: 14, color: "#444", marginBottom: 10, paddingLeft: 14, borderLeft: "3px solid #0A1628" }}>• {c}</div>)}
              <div style={{ fontWeight: 700, color: "#0A1628", marginTop: 18, marginBottom: 10 }}>Top DFW Districts for This Priority</div>
              {data.districts.map((d, i) => (
                <div key={i} style={{ display: "inline-block", background: "#0A1628", color: "#F5E642", borderRadius: 6, padding: "4px 14px", marginRight: 8, marginBottom: 8, fontSize: 13, fontWeight: 700 }}>{d}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
