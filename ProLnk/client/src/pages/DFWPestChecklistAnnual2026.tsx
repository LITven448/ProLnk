import { useState } from 'react';

const SCHEDULES: Record<string, { month: string; emoji: string; tasks: string[] }[]> = {
  house: [
    { month: "January", emoji: "🐭", tasks: ["Check all exterior gaps — seal with steel wool + caulk", "Inspect attic and crawl space for rodent signs", "Check garage door seals and weatherstripping"] },
    { month: "March", emoji: "🐜", tasks: ["Termite swarm season starts — look for mud tubes at foundation", "Check wood-to-soil contact around home perimeter", "Inspect wooden fences and decks for termite galleries"] },
    { month: "May", emoji: "🦟", tasks: ["Eliminate standing water — gutters, pots, tarps", "Check AC condensate pan drainage", "Treat birdbaths and ornamental ponds"] },
    { month: "July", emoji: "🔴", tasks: ["Fire ant mound treatment (broadcast + mound drench)", "Treat entire yard perimeter", "Focus on areas near A/C units and driveways"] },
    { month: "September", emoji: "🪲", tasks: ["Preventive perimeter treatment before fall migration", "Inspect crawl space and attic insulation for nesting"], },
    { month: "October", emoji: "🕷️", tasks: ["Seal gaps where overwintering pests enter", "Check around utility penetrations and pipe entries", "Apply residual barrier around foundation"] },
  ],
  condo: [
    { month: "January", emoji: "🐭", tasks: ["Check unit entry points — pipes, conduit, gaps around doors", "Report any rodent signs to HOA immediately"] },
    { month: "March", emoji: "🐜", tasks: ["Termite swarm season — look for swarmers near windows", "Report to HOA — shared walls mean shared liability"] },
    { month: "May", emoji: "🦟", tasks: ["Eliminate standing water on balcony", "Check A/C drip pan inside unit"] },
    { month: "July", emoji: "🔴", tasks: ["Fire ants on balconies or common areas — report to HOA", "Treat any private patio areas"] },
    { month: "September", emoji: "🪲", tasks: ["Request HOA perimeter treatment if not scheduled", "Inspect balcony door seals"] },
    { month: "October", emoji: "🕷️", tasks: ["Seal around all penetrations in unit walls", "Check window and door weatherstripping"] },
  ],
};

export default function DFWPestChecklistAnnual2026() {
  const [homeType, setHomeType] = useState<"house" | "condo">("house");
  const [expanded, setExpanded] = useState<string | null>("March");

  const schedule = SCHEDULES[homeType];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🐛</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Pest Inspection Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Year-round pest monitoring calendar for Dallas-Fort Worth homeowners
          </p>
        </div>
        <div style={{ background: "#162030", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", borderLeft: "4px solid #f97316" }}>
          <p style={{ margin: 0, color: "#fb923c", fontWeight: 600 }}>🐜 DFW Termite Risk</p>
          <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>DFW is in Termite Infestation Probability Zone 1 — highest risk in the US. Annual professional inspection strongly recommended. March–May is peak swarm season.</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.75rem" }}>🏠 Home Type</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {(["house", "condo"] as const).map((v) => (
              <button key={v} onClick={() => setHomeType(v)}
                style={{ padding: "0.5rem 1.5rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: homeType === v ? "#F5E642" : "#2d3f58", color: homeType === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "house" ? "🏠 House / Townhome" : "🏢 Condo / Apartment"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {schedule.map((s) => (
            <div key={s.month} style={{ background: "#1e2d45", borderRadius: 10, overflow: "hidden", border: `1px solid ${expanded === s.month ? "#F5E642" : "transparent"}` }}>
              <div onClick={() => setExpanded(expanded === s.month ? null : s.month)}
                style={{ padding: "1rem 1.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{s.emoji}</span>
                <span style={{ fontWeight: 700, flex: 1, color: "#F5E642" }}>{s.month}</span>
                <span style={{ color: "#94a3b8" }}>{expanded === s.month ? "▲" : "▼"}</span>
              </div>
              {expanded === s.month && (
                <div style={{ padding: "0 1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {s.tasks.map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#F5E642", marginTop: 2 }}>→</span>
                      <span style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem", background: "#1e2d45", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>🐛 Need a DFW pest control pro? <span style={{ color: "#F5E642", fontWeight: 600 }}>Free quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}