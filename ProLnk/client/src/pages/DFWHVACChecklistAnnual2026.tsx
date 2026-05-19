import { useState } from 'react';

const ITEMS = {
  all: [
    { id: 1, label: "Replace air filter (monthly in DFW summer)", priority: "high" },
    { id: 2, label: "Clear condensate drain line (bleach flush)", priority: "high" },
    { id: 3, label: "Inspect evaporator coil for ice or buildup", priority: "high" },
    { id: 4, label: "Clean condenser coil fins (outdoor unit)", priority: "high" },
    { id: 5, label: "Check refrigerant charge / look for oil spots", priority: "high" },
    { id: 6, label: "Replace UV germicidal bulb if installed", priority: "medium" },
    { id: 7, label: "Calibrate thermostat accuracy (±2°F)", priority: "medium" },
    { id: 8, label: "Inspect ductwork for leaks, sags, disconnects", priority: "medium" },
    { id: 9, label: "Run SEER performance baseline test", priority: "medium" },
    { id: 10, label: "Lubricate blower motor bearings", priority: "medium" },
    { id: 11, label: "Test all supply and return air vents open", priority: "low" },
    { id: 12, label: "Check electrical connections and capacitors", priority: "low" },
  ],
  new: [
    { id: 1, label: "Replace air filter (monthly in DFW summer)", priority: "high" },
    { id: 6, label: "Replace UV germicidal bulb if installed", priority: "medium" },
    { id: 7, label: "Calibrate thermostat accuracy (±2°F)", priority: "medium" },
    { id: 11, label: "Test all supply and return air vents open", priority: "low" },
  ],
  old: [
    { id: 1, label: "Replace air filter (monthly in DFW summer)", priority: "high" },
    { id: 2, label: "Clear condensate drain line (bleach flush)", priority: "high" },
    { id: 3, label: "Inspect evaporator coil for ice or buildup", priority: "high" },
    { id: 4, label: "Clean condenser coil fins (outdoor unit)", priority: "high" },
    { id: 5, label: "Check refrigerant charge / look for oil spots", priority: "high" },
    { id: 6, label: "Replace UV germicidal bulb if installed", priority: "medium" },
    { id: 7, label: "Calibrate thermostat accuracy (±2°F)", priority: "medium" },
    { id: 8, label: "Inspect ductwork for leaks, sags, disconnects", priority: "medium" },
    { id: 9, label: "Run SEER performance baseline test", priority: "medium" },
    { id: 10, label: "Lubricate blower motor bearings", priority: "medium" },
    { id: 11, label: "Test all supply and return air vents open", priority: "low" },
    { id: 12, label: "Check electrical connections and capacitors", priority: "low" },
  ],
};

export default function DFWHVACChecklistAnnual2026() {
  const [age, setAge] = useState<"all" | "new" | "old">("all");
  const [checked, setChecked] = useState<number[]>([]);

  const items = ITEMS[age];
  const toggle = (id: number) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const done = items.filter((i) => checked.includes(i.id)).length;
  const pColor = (p: string) =>
    p === "high" ? "#ef4444" : p === "medium" ? "#f97316" : "#22c55e";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Annual HVAC Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Dallas-Fort Worth complete HVAC inspection guide — beat the heat before June
          </p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.75rem" }}>⚙️ System Age</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(["all", "new", "old"] as const).map((v) => (
              <button key={v} onClick={() => setAge(v)}
                style={{ padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: age === v ? "#F5E642" : "#2d3f58", color: age === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "all" ? "All Systems" : v === "new" ? "Under 5 Yrs" : "5+ Years"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#94a3b8" }}>Progress</span>
          <span style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem" }}>{done}/{items.length} complete</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item) => (
            <div key={item.id} onClick={() => toggle(item.id)}
              style={{ background: checked.includes(item.id) ? "#162030" : "#1e2d45", borderRadius: 10, padding: "1rem 1.25rem",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem",
                border: `1px solid ${checked.includes(item.id) ? "#F5E642" : "transparent"}`, transition: "all 0.15s" }}>
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
          <p style={{ color: "#94a3b8", margin: 0 }}>🔧 Need a DFW HVAC pro? <span style={{ color: "#F5E642", fontWeight: 600 }}>Get free quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}