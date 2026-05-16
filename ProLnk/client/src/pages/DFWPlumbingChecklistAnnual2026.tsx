import { useState } from 'react';

const CHECKLISTS = {
  new: [
    { id: 1, label: "Test all shutoff valves — main, toilet, sinks (turn fully off and back on)", priority: "high" },
    { id: 2, label: "Inspect supply lines under sinks and toilets for bulging", priority: "high" },
    { id: 3, label: "Check washing machine hoses — rubber hoses replace every 5 yrs", priority: "medium" },
    { id: 4, label: "Test exterior hose bibs for proper shutoff", priority: "medium" },
    { id: 5, label: "Check water heater for leaks or corrosion", priority: "medium" },
  ],
  mid: [
    { id: 1, label: "Test all shutoff valves — main, toilet, sinks, dishwasher", priority: "high" },
    { id: 2, label: "Inspect all supply lines — replace braided lines every 10 yrs", priority: "high" },
    { id: 3, label: "Flush water heater sediment (30 min task, annual)", priority: "high" },
    { id: 4, label: "Check water heater anode rod (replace if less than 1/2 inch)", priority: "medium" },
    { id: 5, label: "Inspect refrigerator ice maker supply line", priority: "medium" },
    { id: 6, label: "Check washing machine hoses — braided steel recommended", priority: "medium" },
    { id: 7, label: "Test exterior hose bibs for drips or hard operation", priority: "medium" },
    { id: 8, label: "Check for slow drains — early sign of buildup or root intrusion", priority: "low" },
  ],
  old: [
    { id: 1, label: "Test all shutoff valves — many seize in older DFW homes", priority: "high" },
    { id: 2, label: "Inspect all supply lines — replace if original equipment", priority: "high" },
    { id: 3, label: "Flush water heater and inspect for rust-colored water", priority: "high" },
    { id: 4, label: "Check water heater anode rod and heating elements", priority: "high" },
    { id: 5, label: "Inspect refrigerator, dishwasher, and ice maker lines", priority: "high" },
    { id: 6, label: "Replace washing machine rubber hoses with braided steel", priority: "high" },
    { id: 7, label: "Camera inspection of drain lines if not done in 5 yrs", priority: "medium" },
    { id: 8, label: "Test water pressure (should be 40–80 PSI)", priority: "medium" },
    { id: 9, label: "Inspect exterior hose bibs and irrigation shutoffs", priority: "medium" },
    { id: 10, label: "Check under all sinks for past leak stains or mold", priority: "high" },
    { id: 11, label: "Consider whole-home shutoff auto-detect system", priority: "low" },
  ],
};

export default function DFWPlumbingChecklistAnnual2026() {
  const [homeAge, setHomeAge] = useState<"new" | "mid" | "old">("mid");
  const [checked, setChecked] = useState<number[]>([]);

  const items = CHECKLISTS[homeAge];
  const toggle = (id: number) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const done = items.filter((i) => checked.includes(i.id)).length;
  const pColor = (p: string) =>
    p === "high" ? "#ef4444" : p === "medium" ? "#f97316" : "#22c55e";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔧</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Plumbing Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Annual plumbing inspection guide for Dallas-Fort Worth homeowners
          </p>
        </div>
        <div style={{ background: "#162030", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", borderLeft: "4px solid #3b82f6" }}>
          <p style={{ margin: 0, color: "#60a5fa", fontWeight: 600 }}>💧 DFW Water Hardness Note</p>
          <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>DFW water is extremely hard (15–25 GPG). Sediment buildup in water heaters is 2–3x faster than national average. Annual flushing is critical.</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.75rem" }}>🏠 Home Age</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(["new", "mid", "old"] as const).map((v) => (
              <button key={v} onClick={() => setHomeAge(v)}
                style={{ padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: homeAge === v ? "#F5E642" : "#2d3f58", color: homeAge === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "new" ? "Under 10 Yrs" : v === "mid" ? "10–25 Yrs" : "25+ Yrs"}
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
          <p style={{ color: "#94a3b8", margin: 0 }}>🔧 Need a DFW plumber? <span style={{ color: "#F5E642", fontWeight: 600 }}>Free quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}