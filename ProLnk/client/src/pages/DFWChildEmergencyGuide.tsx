import { useState } from 'react';

const byAge: Record<string, { skill: string; drill: string }[]> = {
  "toddler": [
    { skill: "Know your full name and parents' names", drill: "Practice daily — make it a game" },
    { skill: "Follow adult to safe room during tornado warning", drill: "Walk the route together weekly" },
    { skill: "Know to stay away from windows in storms", drill: "Point out windows and practice sitting away" },
  ],
  "elementary": [
    { skill: "Call 911 and give your address", drill: "Practice dialing (don't call) and reciting address" },
    { skill: "Know your tornado shelter room", drill: "Race to shelter room drill — time yourselves" },
    { skill: "Ice storm: do not go outside, fill water bottles", drill: "Walk through ice storm protocol before winter" },
    { skill: "Power outage: flashlight location, no candles", drill: "Practice finding flashlight in the dark" },
    { skill: "Fire: low crawl to exit, meet at street", drill: "Nighttime fire drill quarterly" },
  ],
  "middle": [
    { skill: "Full emergency protocol — tornado, fire, ice, power", drill: "Lead a family drill and debrief" },
    { skill: "Know how to turn off gas and water", drill: "Show them the shutoffs and let them try" },
    { skill: "Emergency contacts memorized (not just in phone)", drill: "Quiz them monthly" },
    { skill: "Charge backup battery bank before storm season", drill: "Assign as their responsibility each spring" },
  ],
  "high_school": [
    { skill: "Drive safely in DFW hail/ice — pull over, not under overpass", drill: "Practice conversation about storm driving rules" },
    { skill: "Know family's emergency meeting point outside neighborhood", drill: "Map out the route together" },
    { skill: "First aid basics — stop bleeding, call 911″, drill: "Take a Red Cross first aid course" },
    { skill: "Know home insurance and renter's basics", drill: "Review policy together once a year" },
  ],
};

const kitItems = [
  { item: "3-day water supply (1 gal/person/day)", priority: "Essential" },
  { item: "Non-perishable food (3-day supply)", priority: "Essential" },
  { item: "Flashlights + extra batteries", priority: "Essential" },
  { item: "First aid kit", priority: "Essential" },
  { item: "Battery-powered weather radio (NWS alerts)", priority: "Essential" },
  { item: "Kid activity kit (cards, books, games for power outage)", priority: "DFW Specific" },
  { item: "Extra pet food and water", priority: "If Applicable" },
  { item: "Portable phone charger (power bank)", priority: "Recommended" },
  { item: "Warm blankets (DFW ice storms knock out power in winter)", priority: "DFW Specific" },
  { item: "Copy of key documents in waterproof bag", priority: "Recommended" },
];

export default function DFWChildEmergencyGuide() {
  const [ageGroup, setAgeGroup] = useState("elementary");
  const [hasPool, setHasPool] = useState(false);
  const [showKit, setShowKit] = useState(false);

  const ageGroups = [
    { id: "toddler", label: "Toddler (2-5)" },
    { id: "elementary", label: "Elementary (6-11)" },
    { id: "middle", label: "Middle School (12-14)" },
    { id: "high_school", label: "High School (15-18)" },
  ];

  const skills = byAge[ageGroup] || [];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Child Emergency Preparedness for DFW</h1>
      <p style={{ color: "#94a3b8″, marginBottom: 24 }}>
        DFW kids face specific risks: tornado season (March-June), severe ice storms (Dec-Feb), and long power outages. Age-appropriate preparation gives kids confidence, not fear.
      </p>

      <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 16 }}>👶 Select Child Age Group</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {ageGroups.map(a => (
            <button key={a.id} onClick={() => setAgeGroup(a.id)}
              style={{ padding: "10px 14px", borderRadius: 8, border: `2px solid ${ageGroup === a.id ? "#F5E642" : "#2d4a7a"}`, background: ageGroup === a.id ? "#1a3a60″ : "#0A1628", color: ageGroup === a.id ? "#F5E642" : "#94a3b8", cursor: "pointer", fontWeight: 600, textAlign: "left" }}>
              {a.label}
            </button>
          ))}
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ accentColor: "#F5E642″ }} />
          <span style={{ color: "#94a3b8″ }}>Home has a pool (water safety emphasis)</span>
        </label>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 12 }}>📚 Skills and Drills by Age</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {skills.map((s, i) => (
            <div key={i} style={{ background: "#0f2240″, borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>✅ {s.skill}</div>
              <div style={{ color: "#F5E642″, fontSize: 13 }}>Drill: {s.drill}</div>
            </div>
          ))}
          {hasPool && (
            <div style={{ background: "#0f2240″, borderRadius: 10, padding: 14, borderLeft: "4px solid #60a5fa" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>🏊 Pool Safety — All Ages</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>No swimming during lightning. Know where the pool fence latch is — and that it must always be latched. Poison Control: 800-222-1222.</div>
            </div>
          )}
        </div>
      </div>

      <button onClick={() => setShowKit(!showKit)} style={{ background: "#0f2240″, color: "#F5E642", padding: "10px 20px", borderRadius: 8, border: "2px solid #F5E642", fontWeight: 700, cursor: "pointer", fontSize: 14, marginBottom: 20, width: "100%" }}>
        {showKit ? "Hide" : "Show"} Family Emergency Kit Checklist
      </button>

      {showKit && (
        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 12 }}>🎒 Family Emergency Kit</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {kitItems.map(k => (
              <div key={k.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#0A1628″, borderRadius: 8 }}>
                <span style={{ color: "#cbd5e1″, fontSize: 14 }}>☐ {k.item}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: k.priority === "Essential" ? "#7f1d1d" : k.priority === "DFW Specific" ? "#1e3a5f" : "#1a2e1a", color: k.priority === "Essential" ? "#fca5a5″ : k.priority === "DFW Specific" ? "#93c5fd" : "#86efac" }}>
                  {k.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#0f2240″, borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ DFW Parent Priority</div>
        <p style={{ color: "#94a3b8″, margin: 0, fontSize: 14 }}>The #1 DFW child emergency skill: knowing your tornado shelter room and being able to get there in the dark. Practice this drill at night without warning once per tornado season. Takes 5 minutes, could save their life.</p>
      </div>
    </div>
  );
}
