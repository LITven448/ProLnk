import { useState } from 'react';

const severityLevels = [
  {
    level: "Minimal",
    gutterCheck: "No granules in gutters after rain",
    shingleCheck: "Uniform color, no bare spots",
    hailHistory: "No recent hail",
    action: "No action needed — inspect annually",
    urgency: "low",
    timeline: "Next inspection: 1 year"
  },
  {
    level: "Moderate",
    gutterCheck: "Handful of granules in gutters",
    shingleCheck: "Minor color variation, no bare spots yet",
    hailHistory: "1-2 minor hail events in past 3 years",
    action: "Schedule professional inspection — may have 2-4 years remaining",
    urgency: "medium",
    timeline: "Schedule inspection within 60 days"
  },
  {
    level: "Significant",
    gutterCheck: "Cup or more of granules per rain event",
    shingleCheck: "Visible bare/bald spots on multiple shingles",
    hailHistory: "Major hail event (1 inch+) in past 2 years",
    action: "File insurance claim — DFW hail damage is typically covered",
    urgency: "high",
    timeline: "Contact insurance adjuster within 30 days"
  },
  {
    level: "Severe",
    gutterCheck: "Heavy granule deposits, gutters clogging",
    shingleCheck: "Widespread bald spots, cracking, or missing shingles",
    hailHistory: "Multiple hail events or recent severe storm",
    action: "Emergency replacement needed — active leak risk",
    urgency: "critical",
    timeline: "Get 3 bids immediately — replace within 30 days"
  }
];

const urgencyColor: Record<string, string> = { low: "#22C55E", medium: "#F59E0B", high: "#EF4444", critical: "#DC2626" };

export default function DFWRoofGranuleTest2026() {
  const [gutterLevel, setGutterLevel] = useState("");
  const [baldSpots, setBaldSpots] = useState("");
  const [hailHistory, setHailHistory] = useState("");
  const [result, setResult] = useState<typeof severityLevels[0] | null>(null);

  function assess() {
    if (!gutterLevel || !baldSpots || !hailHistory) return;
    let score = 0;
    if (gutterLevel === "cup") score += 2;
    if (gutterLevel === "heavy") score += 3;
    if (gutterLevel === "handful") score += 1;
    if (baldSpots === "minor") score += 1;
    if (baldSpots === "visible") score += 2;
    if (baldSpots === "widespread") score += 3;
    if (hailHistory === "minor") score += 1;
    if (hailHistory === "major") score += 2;
    if (hailHistory === "multiple") score += 3;
    if (score <= 1) setResult(severityLevels[0]);
    else if (score <= 3) setResult(severityLevels[1]);
    else if (score <= 5) setResult(severityLevels[2]);
    else setResult(severityLevels[3]);
  }

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", fontWeight: 700, letterSpacing: 1 }}>DFW ROOF GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>🏠 Shingle Granule Loss Test</h1>
        <p style={{ color: "#9BA3B8", marginBottom: 28, lineHeight: 1.6 }}>
          DFW hail seasons accelerate shingle granule loss — the #1 indicator your roof needs replacement. Here's how to test yours.
        </p>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 12 }}>🌧️ How to Check After Rain</h2>
          <ul style={{ color: "#C8CEDF", lineHeight: 2, paddingLeft: 20 }}>
            <li>Wait 24 hours after a rain event, then check gutters</li>
            <li>Granules look like coarse sand in gray, black, or brown</li>
            <li>Check downspout splash zones too</li>
            <li>Binoculars from ground: look for bald/shiny shingle patches</li>
            <li>DFW average roof lifespan: 15-20 years (hail cuts this short)</li>
          </ul>
        </div>

        <div style={{ background: "#111E33", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 16 }}>🔍 Granule Loss Assessment</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Granules in gutters after rain?</label>
            <select value={gutterLevel} onChange={e => setGutterLevel(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="none">None visible</option>
              <option value="handful">Small handful</option>
              <option value="cup">Cup or more</option>
              <option value="heavy">Heavy — gutters clogging</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Bald/bare spots on shingles?</label>
            <select value={baldSpots} onChange={e => setBaldSpots(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="none">None visible</option>
              <option value="minor">Minor color variation</option>
              <option value="visible">Visible bald spots</option>
              <option value="widespread">Widespread — multiple areas</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#9BA3B8", fontSize: 13, marginBottom: 6 }}>Recent hail history in your zip?</label>
            <select value={hailHistory} onChange={e => setHailHistory(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", border: "1px solid #2A3A5A", color: "#E8EAF0", fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="none">No hail in 3+ years</option>
              <option value="minor">1-2 minor events</option>
              <option value="major">1 major event (1"+ hail)</option>
              <option value="multiple">Multiple events in 2 years</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>
            Assess My Roof
          </button>
        </div>

        {result && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: `2px solid ${urgencyColor[result.urgency]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ color: "#FFFFFF", margin: 0 }}>Granule Loss: {result.level}</h3>
              <span style={{ background: urgencyColor[result.urgency], color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 13 }}>
                {result.urgency.toUpperCase()}
              </span>
            </div>
            <div style={{ color: "#F5E642", fontWeight: 600, marginBottom: 10 }}>📋 {result.action}</div>
            <div style={{ color: "#9BA3B8", fontSize: 13 }}>⏱️ {result.timeline}</div>
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33", borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642" }}>ProLnk DFW:</strong> Get 3 verified roofing bids within 24 hours. All ProLnk roofers carry insurance and provide written inspection reports.
        </div>
      </div>
    </div>
  );
}