import { useState } from 'react';

const MISSES = [
  "Smell — mold, pets, smoke, and musty basements are invisible on video",
  "Actual room dimensions — wide-angle lenses make rooms look 40% larger",
  "Noise levels — tours are silent; ask for a video call during peak traffic hours",
  "Neighbor activity — you won't see the adjacent property or hear the road",
  "Natural light accuracy — staged lighting obscures east/west window orientation",
  "Foundation cracks — cameras skip corners and floor transitions",
  "HVAC equipment condition — typically not shown",
];

const PHOTO_TACTICS = [
  "Fish-eye lens bedrooms — ask for measurements in writing",
  "Only showing 3 of 4 sides of the exterior — ask for all 4″,
  "No street-facing photo — usually hiding something adjacent",
  "Vacant home with fresh paint — may be covering stains or damage",
  "Cropped backyard shots — ask for aerial or fence-line view",
  "Rendering overlays on new construction — not finished photos",
];

const DFW_QUESTIONS = [
  "Has there been any foundation movement or repair? Please share engineer reports.",
  "What is the age of the HVAC units? Have they been serviced this year?",
  "Has the home ever flooded or been in a FEMA flood zone?",
  "Can you show me all 4 exterior elevations on video call?",
  "Can you walk me through the attic via video to show insulation and any signs of moisture?",
  "What is the actual square footage per tax records, not listing description?",
];

const LOCATION_STRATEGIES: Record<string, { strategy: string[]; requests: string[] }> = {
  "Out of State": {
    strategy: [
      "Schedule a live FaceTime tour with the listing agent — not a pre-recorded video",
      "Request a separate video of all closets, garage, attic, and utility spaces",
      "Hire a local buyer's agent who can physically visit and report back",
      "Use Google Street View for historical street-level photos of the neighborhood",
    ],
    requests: [
      "Request full video walkthrough starting from street approach",
      "Ask agent to walk exterior full perimeter during call",
      "Request inspector photos from pre-listing inspection if available",
      "Ask for utility bills from last 12 months",
    ],
  },
  "In DFW (30+ min away)": {
    strategy: [
      "Virtual tour to pre-screen — only schedule in-person if 3+ criteria met",
      "Look up DCAD (Dallas Central Appraisal District) for tax history and accurate sqft",
      "Cross-reference HAR.com and Zillow listing dates — long days on market is a signal",
      "Check Google Maps satellite view for roof condition and lot shape",
    ],
    requests: [
      "Request live video call walkthrough of foundation walls, HVAC, and attic",
      "Ask agent to show the street and adjacent homes from driveway",
      "Request water heater and HVAC manufacture sticker photos",
    ],
  },
  "International": {
    strategy: [
      "Do not purchase DFW real estate sight-unseen without a trusted local proxy",
      "Hire a buyer's agent and a home inspector before going under contract",
      "All DFW virtual listings should be verified against DCAD records",
      "Request a 30-minute live video tour with agent walking every room",
    ],
    requests: [
      "Full exterior video — all 4 sides, roof line, and driveway",
      "All rooms with lights off to check natural light sources",
      "Video of HVAC units with model numbers visible",
      "Neighborhood drive from listing agent on same call",
    ],
  },
};

export default function DFWVirtualTourGuide() {
  const [location, setLocation] = useState("In DFW (30+ min away)");
  const [showing, setShowing] = useState(false);
  const data = LOCATION_STRATEGIES[location];

  return (
    <div style={{ background: "#f9f6f0″, minHeight: "100vh", fontFamily: "Georgia, serif", color: "#1a1a1a", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 13, color: "#888″, marginBottom: 8 }}>🖥️ DFW BUYER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: "#0A1628″, marginBottom: 6 }}>DFW Virtual Tour Guide</h1>
        <p style={{ color: "#555″, fontSize: 16, marginBottom: 36 }}>What virtual tours hide, and how to fill the gaps before you commit.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginBottom: 14 }}>🚫 What Virtual Tours Miss</h2>
        {MISSES.map((m, i) => (
          <div key={i} style={{ background: "#fff3f3″, border: "1px solid #fcc", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 14 }}>⚠️ {m}</div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginTop: 32, marginBottom: 14 }}>📸 Misleading Photography Tactics</h2>
        {PHOTO_TACTICS.map((t, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 14 }}>🔍 {t}</div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1628″, marginTop: 32, marginBottom: 14 }}>❓ DFW-Specific Questions to Ask</h2>
        {DFW_QUESTIONS.map((q, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 14 }}>→ {q}</div>
        ))}

        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 24, marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#0A1628″, marginBottom: 18 }}>📍 Strategy by Buyer Location</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Where Are You Buying From?</label>
            <select value={location} onChange={e => { setLocation(e.target.value); setShowing(false); }} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc", fontSize: 14 }}>
              {Object.keys(LOCATION_STRATEGIES).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button onClick={() => setShowing(true)} style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Get Strategy</button>
          {showing && data && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontWeight: 700, color: "#0A1628″, marginBottom: 10 }}>Your Virtual Tour Strategy</div>
              {data.strategy.map((s, i) => <div key={i} style={{ fontSize: 14, color: "#444″, marginBottom: 10, paddingLeft: 14, borderLeft: "3px solid #0A1628" }}>• {s}</div>)}
              <div style={{ fontWeight: 700, color: "#0A1628″, marginTop: 18, marginBottom: 10 }}>What to Request from Agent</div>
              {data.requests.map((r, i) => <div key={i} style={{ fontSize: 14, color: "#444″, marginBottom: 10 }}>✅ {r}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
