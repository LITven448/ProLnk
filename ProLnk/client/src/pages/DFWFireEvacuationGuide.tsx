import { useState } from 'react';

export default function DFWFireEvacuationGuide() {
  const [floors, setFloors] = useState(1);
  const [bedrooms, setBedrooms] = useState(3);
  const [hasKids, setHasKids] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [meetingPoint, setMeetingPoint] = useState("front_street");
  const [plan, setPlan] = useState<string[] | null>(null);

  function generatePlan() {
    const steps: string[] = [
      "🚨 ALERT: Smoke detector sounds — yell FIRE and start timer (2 min to exit)",
      "📍 PRIMARY EXIT: Each bedroom identifies closest door or window exit",
      floors > 1 ? "🪜 SECOND FLOOR: Keep escape ladder in each upper bedroom (attach to window sill)" : "🏠 SINGLE STORY: All rooms have direct window egress — practice unlocking",
      `🛏️ ${bedrooms} BEDROOMS: Assign exit routes on a floor plan sketch tonight`,
      "🚪 DOOR CHECK: Always feel door before opening — hot = use alternate exit",
      hasKids ? "👶 KIDS: Assign adult to each child — practice room-to-room night drill monthly" : "👤 ADULTS ONLY: Each person responsible for own exit — meet outside",
      hasPets ? "🐾 PETS: Assign one person as pet wrangler — do NOT delay evacuation for pets" : "",
      meetingPoint === "front_street" ? "🏁 MEETING POINT: End of driveway at street" : meetingPoint === "neighbors" ? "🏁 MEETING POINT: Neighbor's driveway (pre-arrange with neighbor)" : "🏁 MEETING POINT: Corner of street (good if driveway blocked)",
      "📞 CALL 911 from outside — never re-enter",
      "🔒 HVAC: Modern systems auto-shutoff on smoke detection — verify yours does",
      "🔋 DETECTORS: Test smoke detectors monthly, replace batteries every 6 months (spring/fall)",
    ].filter(Boolean) as string[];
    setPlan(steps);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Fire Evacuation Plan for DFW Homes</h1>
      <p style={{ color: "#94a3b8″, marginBottom: 24 }}>
        DFW homes average 2,400+ sq ft — larger than the national average. More bedrooms and stories mean evacuation planning is critical. NFPA says you have less than 2 minutes once a smoke alarm sounds.
      </p>

      <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 16 }}>🏗️ Your Home Layout</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Number of Stories</label>
            <select value={floors} onChange={e => setFloors(Number(e.target.value))} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60″, color: "#fff", border: "1px solid #2d4a7a" }}>
              {[1,2,3].map(n => <option key={n} value={n}>{n} {n === 1 ? "story" : "stories"}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Bedrooms</label>
            <select value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60″, color: "#fff", border: "1px solid #2d4a7a" }}>
              {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} bedrooms</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={hasKids} onChange={e => setHasKids(e.target.checked)} style={{ accentColor: "#F5E642″ }} />
            <span style={{ color: "#94a3b8″ }}>Children in home</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={hasPets} onChange={e => setHasPets(e.target.checked)} style={{ accentColor: "#F5E642″ }} />
            <span style={{ color: "#94a3b8″ }}>Pets</span>
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Preferred Meeting Point</label>
          <select value={meetingPoint} onChange={e => setMeetingPoint(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60″, color: "#fff", border: "1px solid #2d4a7a" }}>
            <option value="front_street">End of driveway at street</option>
            <option value="neighbors">Neighbor's driveway</option>
            <option value="corner">Street corner</option>
          </select>
        </div>
        <button onClick={generatePlan} style={{ background: "#F5E642″, color: "#0A1628", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Generate My Evacuation Plan
        </button>
      </div>

      {plan && (
        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 16 }}>📋 Your Evacuation Plan</h2>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {plan.map((step, i) => <li key={i} style={{ marginBottom: 10, color: "#cbd5e1″, lineHeight: 1.5 }}>{step}</li>)}
          </ol>
        </div>
      )}

      <div style={{ background: "#0f2240″, borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ Equipment Needed</div>
        <ul style={{ color: "#94a3b8″, margin: 0, paddingLeft: 18, fontSize: 14 }}>
          {floors > 1 && <li>Second-story escape ladder ($30-60 at Home Depot)</li>}
          <li>Smoke detector in every bedroom and hallway</li>
          <li>Carbon monoxide detector near sleeping areas</li>
          <li>Fire extinguisher in kitchen (Class ABC)</li>
        </ul>
      </div>
    </div>
  );
}
