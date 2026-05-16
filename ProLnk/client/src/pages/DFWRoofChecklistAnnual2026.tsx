import { useState } from 'react';

const CHECKLISTS = {
  new: [
    { id: 1, label: "Check gutters for granule accumulation (early wear sign)", priority: "medium" },
    { id: 2, label: "Inspect ridge cap shingles for lifting", priority: "medium" },
    { id: 3, label: "Check all flashing at chimney, skylights, vents", priority: "high" },
    { id: 4, label: "Inspect soffit and fascia for any rot or gaps", priority: "low" },
    { id: 5, label: "Attic check: any daylight visible? (immediate action)", priority: "high" },
  ],
  mid: [
    { id: 1, label: "Check gutters for heavy granule accumulation", priority: "high" },
    { id: 2, label: "Look for lifted, curled, or cracked shingles", priority: "high" },
    { id: 3, label: "Inspect ridge cap for cracking or gaps", priority: "high" },
    { id: 4, label: "Check all flashing at chimney, skylights, vents", priority: "high" },
    { id: 5, label: "Inspect soffit and fascia for rot, paint peeling, gaps", priority: "medium" },
    { id: 6, label: "Attic check: daylight, moisture stains, or mold?", priority: "high" },
    { id: 7, label: "Post-hail: look for dents on gutters and AC fins", priority: "high" },
    { id: 8, label: "Check roof valleys for debris buildup", priority: "medium" },
  ],
  old: [
    { id: 1, label: "Check gutters — heavy granule loss means replacement soon", priority: "high" },
    { id: 2, label: "Count lifted, curled, cracked, or missing shingles", priority: "high" },
    { id: 3, label: "Inspect ridge cap — full replacement may be needed", priority: "high" },
    { id: 4, label: "Check all flashing — reseal or replace as needed", priority: "high" },
    { id: 5, label: "Inspect soffit and fascia for rot, damage, pest entry", priority: "high" },
    { id: 6, label: "Attic: daylight, moisture stains, mold, wet insulation?", priority: "high" },
    { id: 7, label: "Post-hail: document damage for insurance claim", priority: "high" },
    { id: 8, label: "Measure roof deck sag from attic (major structural concern)", priority: "high" },
    { id: 9, label: "Get professional inspection quote — replacement likely near", priority: "medium" },
    { id: 10, label: "Check drip edge for rust, gaps, or missing sections", priority: "medium" },
  ],
};

export default function DFWRoofChecklistAnnual2026() {
  const [roofAge, setRoofAge] = useState<"new" | "mid" | "old">("mid");
  const [checked, setChecked] = useState<number[]>([]);

  const items = CHECKLISTS[roofAge];
  const toggle = (id: number) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const done = items.filter((i) => checked.includes(i.id)).length;
  const pColor = (p: string) =>
    p === "high" ? "#ef4444" : p === "medium" ? "#f97316" : "#22c55e";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏚️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Roof Inspection Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Post-winter and post-hail season roof inspection for North Texas homes
          </p>
        </div>
        <div style={{ background: "#162030", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", borderLeft: "4px solid #ef4444" }}>
          <p style={{ margin: 0, color: "#f87171", fontWeight: 600 }}>🌩️ DFW Hail Season Alert</p>
          <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>DFW averages 4–7 hail events per year. Inspect after every storm. Insurance claims must be filed within 1 year of event.</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.75rem" }}>🏠 Roof Age</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(["new", "mid", "old"] as const).map((v) => (
              <button key={v} onClick={() => setRoofAge(v)}
                style={{ padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: roofAge === v ? "#F5E642" : "#2d3f58", color: roofAge === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "new" ? "Under 7 Yrs" : v === "mid" ? "7–15 Yrs" : "15+ Yrs"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94a3b8" }}>Progress</span>
          <span style={{ color: "#F5E642", fontWeight: 700 }}>{done}/{items.length} complete</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item) => (
            <div key={item.id} onClick={() => toggle(item.id)}
              style={{ background: checked.includes(item.id) ? "#162030" : "#1e2d45", borderRadius: 10, padding: "1rem 1.25rem",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem",
                border: `1px solid ${checked.includes(item.id) ? "#F5E642" : "transparent"}` }}>
              <span style={{ fontSize: "1.4rem" }}>{checked.includes(item.id) ? "✅" : "⬜"}</span>
              <span style={{ flex: 1, textDecoration: checked.includes(item.id) ? "line-through" : "none", color: checked.includes(item.id) ? "#64748b" : "#e2e8f0" }}>
                {item.label}
              </span>
              <span style={{ background: pColor(item.priority), borderRadius: 6, padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem", background: "#1e2d45", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>🏚️ Need a DFW roofer? <span style={{ color: "#F5E642", fontWeight: 600 }}>Free quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}