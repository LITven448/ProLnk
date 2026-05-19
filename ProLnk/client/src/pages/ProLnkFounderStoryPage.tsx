import { useState } from 'react';

const stakeholders = [
  { role: "Investor", emoji: "💼", story: ["Serial entrepreneur with hands-on trade experience", "Witnessed contractor fraud destroy a family member's home equity", "Built ProLnk because no existing solution addressed trust + income together", "DFW native — 15 years of local market relationship building", "Revenue-first builder: launched waitlist before raising a dollar"] },
  { role: "Homeowner", emoji: "🏠", story: ["Andrew hired 3 contractors in one year — 2 ghosted after deposit", "Lost $4,200 to an unlicensed HVAC company with fake reviews", "Realized the problem was structural: no accountability, no recourse", "ProLnk was built so no homeowner faces what his family did", "Every product decision runs through: would this protect my mom?"] },
  { role: "Pro / Contractor", emoji: "🔧", story: ["Spent time riding along with HVAC techs and plumbers in DFW", "Saw that great tradespeople were losing to cheap, unvetted competitors", "Built the 5-stream income system to reward loyalty and quality", "Equity structure gives founding pros permanent origination rights", "Mission: make skilled trades the most financially rewarding career path"] },
  { role: "Team / Hire", emoji: "👥", story: ["Operator-founder who builds before he hires", "Expects ownership mentality — not a task-taker culture", "Will be transparent about metrics, runway, and hard decisions", "First hires get meaningful equity + meaningful autonomy", "DFW-based team with remote flexibility for the right people"] },
];

const timeline = [
  { year: "2022″, event: "First contractor fraud experience — the seed of the idea" },
  { year: "2023″, event: "Market validation — 200+ conversations with DFW pros and homeowners" },
  { year: "2024″, event: "Architecture designed, commission system finalized, AI agent plan built" },
  { year: "2025″, event: "Full-stack platform built — 130+ DB tables, 80+ pages, 47 AI agents" },
  { year: "2026″, event: "Waitlist launch → seed round → DFW go-live (May–Q3 2026)" },
];

export default function ProLnkFounderStoryPage() {
  const [active, setActive] = useState(0);
  const s = stakeholders[active];
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>👤 Founder Story</div>
          <div style={{ fontSize: "1.1rem", color: "#94a3b8″, marginTop: "0.5rem" }}>Andrew Frakes — built ProLnk because the problem was personal</div>
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.75rem", border: "1px solid #1e3a5f", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            {[["DFW Native", "15 years of local market relationships", "📍"], ["Operator-Founder", "Builds first, raises second", "⚙️"], ["Mission-Driven", "Lost $4K to contractor fraud personally", "🎯"]].map(([t, d, ico]) => (
              <div key={t} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem" }}>{ico}</div>
                <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: "0.95rem", marginTop: "0.25rem" }}>{t}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.82rem", marginTop: "0.25rem" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>📅 Founder Timeline</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {timeline.map(t => (
              <div key={t.year} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, minWidth: 42, fontSize: "0.88rem" }}>{t.year}</div>
                <div style={{ color: "#cbd5e1″, fontSize: "0.9rem", lineHeight: 1.5 }}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>💬 Why This Founder — Select Your Role</div>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {stakeholders.map((st, i) => (
            <button key={st.role} onClick={() => setActive(i)} style={{ background: active === i ? "#F5E642″ : "#0F2040", color: active === i ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600 }}>
              {st.emoji} {st.role}
            </button>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", border: "2px solid #F5E642" }}>
          {s.story.map(line => (
            <div key={line} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.65rem", color: "#cbd5e1″, fontSize: "0.9rem" }}>
              <span style={{ color: "#F5E642″ }}>→</span>{line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}