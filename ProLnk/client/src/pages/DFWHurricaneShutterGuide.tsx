import { useState } from 'react';

const options = [
  {
    id: "impact_windows",
    name: "Impact-Resistant Windows",
    cost: "8,000 - 20,000″,
    dfwRating: 5,
    hoaFriendly: true,
    desc: "Permanent solution — no setup during storms. Rated for 140mph+ winds. Best ROI for DFW severe storms and hail.",
    tags: ["Permanent", "No setup required", "Insurance discount", "Resale value boost"],
  },
  {
    id: "storm_shutters",
    name: "Accordion Storm Shutters",
    cost: "3,000 - 8,000″,
    dfwRating: 4,
    hoaFriendly: true,
    desc: "Fold flat against house when not in use. HOA-friendly appearance. Deploy in minutes for incoming storms.",
    tags: ["Foldable", "Quick deploy", "HOA approved", "Lower cost than impact windows"],
  },
  {
    id: "panel_shutters",
    name: "Removable Panel Shutters",
    cost: "800 - 3,000″,
    dfwRating: 3,
    hoaFriendly: false,
    desc: "Store in garage, install before storms. Labor-intensive but budget-friendly. Visible when installed — check HOA.",
    tags: ["Budget option", "Store in garage", "Labor intensive", "Check HOA first"],
  },
  {
    id: "plywood",
    name: "Emergency Plywood Boarding",
    cost: "50 - 200″,
    dfwRating: 2,
    hoaFriendly: false,
    desc: "Last resort only. DFW doesn't get Category 3+ storms, but for extreme severe weather events this works short-term.",
    tags: ["Emergency only", "Cheapest option", "Not permanent", "HOA likely objects"],
  },
];

export default function DFWHurricaneShutterGuide() {
  const [homeType, setHomeType] = useState("single_family");
  const [hasHoa, setHasHoa] = useState(false);
  const [budget, setBudget] = useState("medium");
  const [recs, setRecs] = useState<typeof options | null>(null);

  function getRecommendations() {
    let filtered = [...options];
    if (hasHoa) filtered = filtered.filter(o => o.hoaFriendly);
    if (budget === "low") filtered = filtered.filter(o => o.dfwRating <= 3);
    if (budget === "high") filtered = filtered.filter(o => o.dfwRating >= 4);
    filtered.sort((a, b) => b.dfwRating - a.dfwRating);
    setRecs(filtered);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Storm Shutter Guide for DFW Homes</h1>
      <p style={{ color: "#94a3b8″, marginBottom: 8 }}>
        DFW does not get hurricanes — but spring severe storm season brings 2-inch hail, 80mph wind gusts, and damaging straight-line winds annually. The right protection depends on your home type and HOA rules.
      </p>
      <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "10px 14px", marginBottom: 24, fontSize: 14, color: "#93c5fd" }}>
        ⚠️ DFW Average: 5-7 severe hail events per year. Golf ball-sized hail (1.75in) can break standard windows.
      </div>

      <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 16 }}>⚙️ Your Situation</h2>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Home Type</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60″, color: "#fff", border: "1px solid #2d4a7a" }}>
            <option value="single_family">Single Family</option>
            <option value="townhome">Townhome</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Budget Range</label>
          <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60″, color: "#fff", border: "1px solid #2d4a7a" }}>
            <option value="low">Under $2,000</option>
            <option value="medium">$2,000 - $10,000</option>
            <option value="high">$10,000+</option>
          </select>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}>
          <input type="checkbox" checked={hasHoa} onChange={e => setHasHoa(e.target.checked)} style={{ accentColor: "#F5E642″ }} />
          <span style={{ color: "#94a3b8″ }}>My neighborhood has an HOA</span>
        </label>
        <button onClick={getRecommendations} style={{ background: "#F5E642″, color: "#0A1628", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Get DFW Recommendations
        </button>
      </div>

      {recs && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 12 }}>📋 Your Options (Best First)</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {recs.map((o, i) => (
              <div key={o.id} style={{ background: "#0f2240″, borderRadius: 10, padding: 16, borderLeft: i === 0 ? "4px solid #F5E642" : "4px solid #2d4a7a" }}>
                {i === 0 && <div style={{ color: "#F5E642″, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>TOP PICK FOR YOUR SITUATION</div>}
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{o.name}</div>
                <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>${o.cost} installed • DFW Rating: {"⭐".repeat(o.dfwRating)}</div>
                <p style={{ color: "#94a3b8″, fontSize: 14, margin: "0 0 8px" }}>{o.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {o.tags.map(t => <span key={t} style={{ background: "#1a3a60″, padding: "2px 8px", borderRadius: 4, fontSize: 12, color: "#60a5fa" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#0f2240″, borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ DFW-Specific Advice</div>
        <p style={{ color: "#94a3b8″, margin: 0, fontSize: 14 }}>Impact windows qualify for homeowner's insurance discounts in Texas — ask your insurer before purchasing. Most DFW homeowners see 5-15% premium reduction, which can offset the cost over 10 years.</p>
      </div>
    </div>
  );
}
