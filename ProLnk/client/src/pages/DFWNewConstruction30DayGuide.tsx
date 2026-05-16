import { useState } from 'react';

const HOME_TYPES = [
  {
    type: "Single Family Production Home",
    icon: "🏠",
    tasks: [
      { day: "Day 1–3", priority: "🔴 Critical", task: "Walk every room and document ALL defects before moving furniture", detail: "Scratch every surface, open every cabinet, run every faucet. Your punch list window is limited — typically 30–60 days for builder warranty items." },
      { day: "Day 1–3", priority: "🔴 Critical", task: "Test every system: HVAC, plumbing, electrical, garage doors, appliances", detail: "Run all zones on your thermostat. Flush every toilet. Test every outlet with a phone charger. Test garage door auto-reverse sensor." },
      { day: "Day 1", priority: "🔴 Critical", task: "Start foundation watering immediately — DFW clay soil is critical", detail: "Install soaker hoses around the perimeter within 3 feet of foundation. Water 2–3x per week. DFW clay shrinks dramatically when dry and can crack your slab within months." },
      { day: "Day 1–7", priority: "🟡 Important", task: "Get all builder documents in one folder: warranty, manuals, permit list", detail: "Ask your builder for the permit closeout, structural warranty, and all appliance manuals on day 1. Many builders do not follow up." },
      { day: "Week 1", priority: "🟡 Important", task: "Meet your neighbors and introduce yourself", detail: "Neighbors often know builder quality issues, HOA dynamics, and local service providers. Introduce yourself within the first week." },
      { day: "Week 1", priority: "🟡 Important", task: "Register all appliances and builder warranty", detail: "Builder structural warranty registration is often required within 30 days. Set a calendar reminder." },
      { day: "Week 2–4", priority: "🟢 Soon", task: "Identify any settlement cracks and photograph with date stamps", detail: "Minor hairline cracks in drywall are normal. Document with photos. Structural cracks (wider than 1/4 inch, horizontal) need immediate builder contact." },
      { day: "Week 2–4", priority: "🟢 Soon", task: "Schedule independent home inspection", detail: "DFW new construction buyers often skip this — do not. An independent inspector often finds items your builder will not mention." },
    ],
    builderTemplate: "Subject: Punch List Items — [Address]

Dear [Builder Contact],

Following our walkthrough on [date], I am documenting the following items for repair under our new home warranty:

1. [Item] — [Location] — [Photo attached]
2. [Item] — [Location] — [Photo attached]

Please confirm receipt and provide a repair timeline within 5 business days.

Sincerely, [Your Name]",
  },
  {
    type: "Custom Build",
    icon: "🏗️",
    tasks: [
      { day: "Day 1", priority: "🔴 Critical", task: "Final walkthrough with builder before closing — do not close without it", detail: "Custom builds should have a formal punch list walkthrough documented in writing before you sign closing documents." },
      { day: "Day 1–3", priority: "🔴 Critical", task: "Document everything with photos and video before occupancy", detail: "Walk every room with your phone recording. This is your baseline for any future warranty claims." },
      { day: "Day 1", priority: "🔴 Critical", task: "Start DFW clay soil foundation watering protocol immediately", detail: "Even custom homes on piers need perimeter soil moisture management in DFW. Ask your builder for their specific recommendation." },
      { day: "Week 1", priority: "🟡 Important", task: "Get as-built drawings and all permits filed and stored", detail: "Custom builders should provide final as-built drawings. Request physical and digital copies on day 1." },
      { day: "Week 1", priority: "🟡 Important", task: "Commission a third-party home inspection for independent documentation", detail: "Even with a reputable builder, a third-party inspection provides an independent baseline for warranty claims." },
      { day: "Week 2–4", priority: "🟢 Soon", task: "Register all systems and warranties", detail: "Custom homes typically have multiple warranty registrations: structural, mechanical, roofing, windows. Track deadlines." },
    ],
    builderTemplate: "Subject: Custom Home Punch List — [Address]

Dear [Builder/Project Manager],

Per our walkthrough on [date], the following items require attention under the construction contract warranty:

1. [Item with location and photo reference]

Please provide a written response and completion timeline per our contract.

[Your Name]",
  },
];

export default function DFWNewConstruction30DayGuide() {
  const [selected, setSelected] = useState<string>("");
  const [showTemplate, setShowTemplate] = useState(false);
  const detail = HOME_TYPES.find((h) => h.type === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#F5E642", color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>🏡 First 30 Days in Your New DFW Home</h1>
          <p style={{ color: "#9BAAC5", fontSize: 16 }}>The first 30 days set the foundation — literally. DFW clay soil, strict builder warranty windows, and summer heat demand immediate action. Do not wait.</p>
        </div>

        <div style={{ background: "#1A0A00", border: "1px solid #F5A623", borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5A623", fontSize: 16, marginBottom: "0.75rem" }}>⚠️ DFW Clay Soil Warning — Act Day 1</h2>
          <p style={{ color: "#CBD5E8", fontSize: 14, lineHeight: 1.7 }}>North Texas sits on some of the most expansive clay soil in the country. When dry, it shrinks and pulls away from your foundation. Most DFW foundation failures in new construction occur in the first 2–3 years from improper moisture management — not poor construction. Install soaker hoses and start watering within your first week.</p>
        </div>

        <div style={{ background: "#111E35", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>📋 Your 30-Day Priority List</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {HOME_TYPES.map((h) => (
              <button key={h.type} onClick={() => { setSelected(h.type); setShowTemplate(false); }} style={{ background: selected === h.type ? "#F5E642" : "#0A1628", color: selected === h.type ? "#0A1628" : "#E8EDF5", border: `1px solid ${selected === h.type ? "#F5E642" : "#2A4A7F"}`, borderRadius: 6, padding: "0.6rem 1.25rem", fontSize: 14, cursor: "pointer", fontWeight: selected === h.type ? 700 : 400 }}>
                {h.icon} {h.type}
              </button>
            ))}
          </div>

          {detail ? (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {detail.tasks.map((t, i) => (
                  <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", border: `1px solid ${t.priority.includes("🔴") ? "#C0392B" : t.priority.includes("🟡") ? "#F5A623" : "#2ECC71"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{t.task}</span>
                      <span style={{ fontSize: 12, color: "#9BAAC5", whiteSpace: "nowrap", marginLeft: "1rem" }}>{t.day}</span>
                    </div>
                    <div style={{ color: "#9BAAC5", fontSize: 13, lineHeight: 1.6 }}>{t.detail}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowTemplate(!showTemplate)} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 6, padding: "0.6rem 1.5rem", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: "1rem" }}>
                {showTemplate ? "Hide" : "📧 Show"} Builder Contact Template
              </button>
              {showTemplate && (
                <div style={{ background: "#0A1628", border: "1px solid #F5E642", borderRadius: 8, padding: "1rem" }}>
                  <pre style={{ color: "#CBD5E8", fontSize: 13, whiteSpace: "pre-wrap", lineHeight: 1.6, margin: 0 }}>{detail.builderTemplate}</pre>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: "#9BAAC5", textAlign: "center", padding: "2rem" }}>Select your home type above to get your personalized 30-day list</div>
          )}
        </div>
      </div>
    </div>
  );
}

