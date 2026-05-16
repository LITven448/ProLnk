import { useState } from 'react';

export default function DFWWeekendProjectsGuide2026() {
  const [skill, setSkill] = useState<string>("beginner");

  const projects = [
    {
      id: "paint",
      icon: "🖌️",
      title: "Paint One Interior Room",
      skill: "beginner",
      hours: "6–8 hrs",
      cost: "$80–150",
      detail: "Prime, edge, and roll one room. DFW heat means fast drying — perfect weekend project. Use Sherwin-Williams Emerald for one-coat coverage on most walls.",
    },
    {
      id: "caulk",
      icon: "🪟",
      title: "Caulk Exterior Windows & Doors",
      skill: "beginner",
      hours: "3–4 hrs",
      cost: "$20–40",
      detail: "DFW heat and cold cycles crack exterior caulk every 2–3 years. Removing old caulk and applying new DAP sealant stops air and water intrusion — and lowers energy bills.",
    },
    {
      id: "fan",
      icon: "💨",
      title: "Install a Ceiling Fan",
      skill: "intermediate",
      hours: "2–3 hrs",
      cost: "$60–200",
      detail: "Essential in DFW — a ceiling fan makes a room feel 4–6 degrees cooler. If there is an existing light box, swap is straightforward. New location requires a fan-rated box install first.",
    },
    {
      id: "flapper",
      icon: "🚽",
      title: "Replace Toilet Flapper",
      skill: "beginner",
      hours: "30 min",
      cost: "$8–15",
      detail: "A running toilet wastes 200 gallons per day in DFW — that shows up fast on your water bill. Turn off supply, swap the flapper. Parts at Home Depot for under $10.",
    },
    {
      id: "attic",
      icon: "🏠",
      title: "Add Attic Insulation Baffles",
      skill: "intermediate",
      hours: "4–6 hrs",
      cost: "$40–80",
      detail: "DFW attics hit 140°F in summer. Baffles keep soffit vents clear so hot air escapes. Install foam baffles between rafters before blown insulation. Huge impact on cooling bills.",
    },
    {
      id: "dimmer",
      icon: "🔆",
      title: "Replace Switches with Dimmers",
      skill: "intermediate",
      hours: "2–3 hrs",
      cost: "$30–60",
      detail: "Lutron Caséta dimmers work with LED bulbs and add instant modern feel. Turn off breaker, swap the switch, restore power. Transforms dining rooms and living areas.",
    },
    {
      id: "weatherstrip",
      icon: "🌬️",
      title: "Replace Door Weatherstripping",
      skill: "beginner",
      hours: "2–3 hrs",
      cost: "$20–50",
      detail: "North Texas winds push cold air in during winters and hot air in during summers. V-seal weatherstrip on all exterior doors is a beginner project with immediate energy impact.",
    },
  ];

  const skillLevels = ["beginner", "intermediate"];
  const visible = skill === "all" ? projects : projects.filter((p) => p.skill === skill);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🛠️</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#F5E642", margin: 0 }}>DFW Weekend Projects 2026</h1>
          <p style={{ color: "#8B9AB5", marginTop: "0.5rem" }}>Complete in one weekend — matched to your skill level</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {[...skillLevels, "all"].map((s) => (
            <button
              key={s}
              onClick={() => setSkill(s)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 20,
                border: `1px solid ${skill === s ? "#F5E642" : "#1E3050"}`,
                background: skill === s ? "#F5E642" : "#0F1E35",
                color: skill === s ? "#0A1628" : "#8B9AB5",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.85rem",
                textTransform: "capitalize",
              }}
            >
              {s === "all" ? "All Levels" : s}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {visible.map((p) => (
            <div key={p.id} style={{ background: "#0F1E35", border: "1px solid #1E3050", borderRadius: 10, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ fontWeight: 600 }}>{p.title}</span>
                    <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem" }}>
                      <span style={{ color: "#F5E642" }}>{p.cost}</span>
                      <span style={{ color: "#8B9AB5" }}>⏱ {p.hours}</span>
                    </div>
                  </div>
                  <p style={{ color: "#8B9AB5", margin: "0.4rem 0 0", fontSize: "0.85rem", lineHeight: 1.5 }}>{p.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", background: "#0F1E35", borderRadius: 10, padding: "1.25rem", border: "1px solid #1E3050", textAlign: "center" }}>
          <p style={{ color: "#8B9AB5", margin: 0, fontSize: "0.9rem" }}>
            🔗 Project too big for one weekend? <span style={{ color: "#F5E642", fontWeight: 600 }}>ProLnk</span> connects you to DFW pros who can finish it fast.
          </p>
        </div>
      </div>
    </div>
  );
}
