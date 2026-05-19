import { useState } from 'react';

const situations = [
  {
    id: "emergency",
    label: "No A/C — emergency in DFW summer",
    wait: "Same day (Charter pros) / 4-6 weeks (market rate)",
    detail: "DFW heat emergencies (95-110°F) are medically dangerous. Standard market wait in June-August is 4-6 weeks. ProLnk Charter Pros are routed emergency calls first — Charter membership includes priority dispatch protocols.",
    action: "Book ProLnk Charter Pro for same-day routing. Otherwise call 10+ HVAC companies immediately — one will have a cancellation."
  },
  {
    id: "new-install",
    label: "Planning a new HVAC system install",
    wait: "2-8 weeks depending on season",
    detail: "New installs are scheduled work — easier to book outside peak (April, August-September). Winter scheduling (Nov-Feb) typically has 3-5 day availability. Spring rush (March-April) fills fast as pros service equipment before summer.",
    action: "Schedule in February or October for best pricing and availability. Get 3 bids — shortage inflates pricing 15-25% in peak season."
  },
  {
    id: "tune-up",
    label: "Annual tune-up / preventive maintenance",
    wait: "1-4 weeks",
    detail: "Preventive maintenance is the biggest casualty of the shortage — pros deprioritize tune-ups for emergency calls. Skipping annual maintenance increases failure risk by 3x. DFW systems work 3,000+ hours/year vs national avg of 1,200.",
    action: "Book tune-ups in November or February when demand is lowest. Consider annual maintenance contract — pros prioritize contract customers."
  },
  {
    id: "repair",
    label: "Non-emergency repair (unusual sounds, reduced output)",
    wait: "1-3 weeks",
    detail: "Non-urgent repairs are triaged behind emergencies by all DFW HVAC companies. A compressor running inefficiently today becomes an emergency failure next week in 100°F heat. Catching problems early is critical.",
    action: "Describe symptoms clearly when booking — some repairs can be triaged to faster slots. If compressor-related, push for sooner."
  },
];

const stats = [
  { icon: "👷", label: "Open HVAC positions in DFW metro", value: "2,000+" },
  { icon: "📅", label: "Avg summer wait (non-emergency)", value: "4-6 wks" },
  { icon: "🎂", label: "Avg age of DFW HVAC technician", value: "47 yrs" },
  { icon: "🎓", label: "Apprentices graduating per year (DFW)", value: "~400" },
];

export default function DFWHVACTechShortage2026() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<typeof situations[0]|null>(null);

  function showGuide() {
    const s = situations.find(x=>x.id===situation);
    setResult(s || null);
  }

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔧</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW HVAC Technician Shortage 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Why DFW can't get enough techs — and how ProLnk Charter Pros change the equation</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#0F2040", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.3rem", fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "0.75rem" }}>📊 Why the Shortage Is Structural</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>DFW's HVAC workforce crisis has three compounding causes: (1) The aging workforce — half of all DFW techs will retire by 2032. (2) Training pipeline failure — DFW community colleges graduate ~400 apprentices per year against 500+ annual retirements plus 300+ demand-growth openings. (3) Demand surge — DFW added 150,000+ residents in 2025 alone, each with HVAC systems needing service. The result: summer emergency waits of 4-6 weeks during peak demand.</p>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>⭐ ProLnk Charter Pro Priority Routing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { label: "Standard Market", items: ["4-6 week summer wait", "First-come queue system", "No emergency prioritization", "Price spikes in peak season"] },
              { label: "ProLnk Charter Pro", items: ["Same-day emergency routing", "Priority dispatch protocol", "Locked pricing (no surge)", "Verified licensed techs"] },
            ].map((col, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", border: i===1?"1px solid #F5E642":"1px solid #1e3a5f" }}>
                <div style={{ color: i===1?"#F5E642":"#94a3b8", fontWeight: 700, marginBottom: "0.5rem" }}>{col.label}</div>
                {col.items.map((item, j) => (
                  <div key={j} style={{ color: i===1?"#4ade80":"#64748b", fontSize: "0.85rem", padding: "0.2rem 0" }}>
                    {i===1?"✅ ":"❌ "}{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 My Situation → HVAC Access Guide</h2>
          <select value={situation} onChange={e=>setSituation(e.target.value)} style={{ background: "#0A1628", color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", width: "100%", marginBottom: "0.75rem" }}>
            <option value="">Select your current situation</option>
            {situations.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button onClick={showGuide} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Show My HVAC Access Guide →</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628", borderRadius: 8, padding: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>Expected Wait: {result.wait}</div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.6, marginBottom: "0.75rem" }}>{result.detail}</p>
              <p style={{ color: "#4ade80", lineHeight: 1.6 }}>✅ {result.action}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#0A1628", fontWeight: 600, margin: "0.5rem 0" }}>Get priority HVAC access through ProLnk Charter — no summer waitlist</p>
          <div style={{ color: "#0A1628", fontWeight: 800 }}>prolnk.io — DFW Charter HVAC Priority Access</div>
        </div>
      </div>
    </div>
  );
}
