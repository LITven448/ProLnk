import { useState } from 'react';

const CHECKLISTS = {
  new: [
    { id: 1, label: "Test all GFCI outlets — press TEST button, verify outlet goes dead", priority: "high" },
    { id: 2, label: "Test smoke detectors — press test button, replace if >7 yrs", priority: "high" },
    { id: 3, label: "Test CO detectors — press test button, replace if >5 yrs", priority: "high" },
    { id: 4, label: "Check outdoor GFCI outlets and covers for weathering", priority: "medium" },
    { id: 5, label: "Look for any warm outlet covers or switch plates", priority: "medium" },
  ],
  mid: [
    { id: 1, label: "Test all GFCI outlets — kitchen, bathrooms, garage, exterior", priority: "high" },
    { id: 2, label: "Test smoke detectors — replace batteries and units over 7 yrs", priority: "high" },
    { id: 3, label: "Test CO detectors — replace units over 5 yrs", priority: "high" },
    { id: 4, label: "Check panel for breakers that trip frequently (note which ones)", priority: "high" },
    { id: 5, label: "Look for warm or discolored outlet or switch covers", priority: "high" },
    { id: 6, label: "Check outdoor GFCI and weatherproof covers", priority: "medium" },
    { id: 7, label: "Inspect visible wiring in garage, basement, attic for fraying", priority: "medium" },
    { id: 8, label: "Verify panel label is accurate and legible", priority: "low" },
  ],
  old: [
    { id: 1, label: "Test all GFCI outlets — add where missing (kitchen, bath, garage)", priority: "high" },
    { id: 2, label: "Test smoke and CO detectors — upgrade to combo units if absent", priority: "high" },
    { id: 3, label: "Check panel type — Federal Pacific or Zinsco panels are fire risks", priority: "high" },
    { id: 4, label: "Look for aluminum branch wiring (silver wires = high risk)", priority: "high" },
    { id: 5, label: "Check for 2-prong ungrounded outlets — should be updated", priority: "high" },
    { id: 6, label: "Inspect visible wiring for cloth or rubber insulation (update)", priority: "high" },
    { id: 7, label: "Check for warm outlet covers, burning smell, or discoloration", priority: "high" },
    { id: 8, label: "Note any double-tapped breakers in panel (fire hazard)", priority: "high" },
    { id: 9, label: "Test outdoor GFCI outlets and check for weatherproofing", priority: "medium" },
    { id: 10, label: "Get electrical inspection from licensed DFW electrician", priority: "medium" },
    { id: 11, label: "Verify panel capacity — 200A minimum recommended today", priority: "medium" },
  ],
};

export default function DFWElectricalChecklistAnnual2026() {
  const [homeAge, setHomeAge] = useState<"new" | "mid" | "old">("mid");
  const [checked, setChecked] = useState<number[]>([]);

  const items = CHECKLISTS[homeAge];
  const toggle = (id: number) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const done = items.filter((i) => checked.includes(i.id)).length;
  const pColor = (p: string) =>
    p === "high" ? "#ef4444″ : p === "medium" ? "#f97316" : "#22c55e";

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚡</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Electrical Safety Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>
            Annual electrical safety inspection for Dallas-Fort Worth homeowners
          </p>
        </div>
        <div style={{ background: "#162030″, borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", borderLeft: "4px solid #ef4444" }}>
          <p style={{ margin: 0, color: "#f87171″, fontWeight: 600 }}>🔥 Fire Risk Reminder</p>
          <p style={{ margin: "0.25rem 0 0″, color: "#94a3b8", fontSize: "0.9rem" }}>Electrical fires are the #2 cause of home fires in Texas. Federal Pacific and Zinsco panels remain common in DFW homes built 1950–1990 and are known fire risks.</p>
        </div>
        <div style={{ background: "#1e2d45″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642″, fontWeight: 600, marginBottom: "0.75rem" }}>🏠 Home Age</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(["new", "mid", "old"] as const).map((v) => (
              <button key={v} onClick={() => setHomeAge(v)}
                style={{ padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: homeAge === v ? "#F5E642″ : "#2d3f58", color: homeAge === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "new" ? "Under 15 Yrs" : v === "mid" ? "15–35 Yrs" : "35+ Yrs"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e2d45″, borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94a3b8″ }}>Progress</span>
          <span style={{ color: "#F5E642″, fontWeight: 700 }}>{done}/{items.length} complete</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item) => (
            <div key={item.id} onClick={() => toggle(item.id)}
              style={{ background: checked.includes(item.id) ? "#162030″ : "#1e2d45", borderRadius: 10, padding: "1rem 1.25rem",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem",
                border: `1px solid ${checked.includes(item.id) ? "#F5E642" : "transparent"}` }}>
              <span style={{ fontSize: "1.4rem" }}>{checked.includes(item.id) ? "✅" : "⬜"}</span>
              <span style={{ flex: 1, textDecoration: checked.includes(item.id) ? "line-through" : "none", color: checked.includes(item.id) ? "#64748b" : "#e2e8f0″ }}>
                {item.label}
              </span>
              <span style={{ background: pColor(item.priority), borderRadius: 6, padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem", background: "#1e2d45″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0 }}>⚡ Need a DFW electrician? <span style={{ color: "#F5E642", fontWeight: 600 }}>Free quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}