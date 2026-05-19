import { useState } from 'react';

const tasks = {
  "30": [
    { id: 1, icon: "🔑", task: "Change all exterior door locks", priority: "critical" },
    { id: 2, icon: "🚰", task: "Locate main water shutoff valve", priority: "critical" },
    { id: 3, icon: "⚡", task: "Find electrical panel & label breakers", priority: "critical" },
    { id: 4, icon: "🔥", task: "Locate gas shutoff valve", priority: "critical" },
    { id: 5, icon: "🚨", task: "Test all smoke & CO detectors", priority: "critical" },
    { id: 6, icon: "🌡️", task: "Schedule HVAC inspection & filter change", priority: "high" },
    { id: 7, icon: "📋", task: "Locate HOA docs & rules (if applicable)", priority: "medium" },
    { id: 8, icon: "🏦", task: "Set up homestead exemption (save up to $1,200/yr in DFW)", priority: "high" },
  ],
  "60": [
    { id: 9, icon: "🔧", task: "Get 3 contractor quotes for any inspection items", priority: "high" },
    { id: 10, icon: "🌿", task: "Inspect sprinkler system & adjust heads", priority: "medium" },
    { id: 11, icon: "🪟", task: "Check all window & door seals for air leaks", priority: "medium" },
    { id: 12, icon: "🧹", task: "Clean dryer vent (fire hazard if clogged)", priority: "high" },
    { id: 13, icon: "🚿", task: "Flush water heater sediment", priority: "medium" },
    { id: 14, icon: "📞", task: "Introduce yourself to neighbors", priority: "low" },
  ],
  "90": [
    { id: 15, icon: "🏠", task: "Schedule full exterior walkthrough for caulk/paint needs", priority: "medium" },
    { id: 16, icon: "🌳", task: "Trim trees away from roofline (DFW storms)", priority: "high" },
    { id: 17, icon: "💧", task: "Check gutters & downspout drainage", priority: "high" },
    { id: 18, icon: "🔌", task: "Install GFCI outlets in kitchen/bath if missing", priority: "medium" },
    { id: 19, icon: "📄", task: "File all warranties & manuals in one folder", priority: "low" },
    { id: 20, icon: "🛡️", task: "Review homeowner insurance coverage", priority: "high" },
  ],
};

export default function DFWNewHomeownerChecklist2026() {
  const [activeDay, setActiveDay] = useState<"30" | "60" | "90">("30");
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };

  const priorityColor = (p: string) =>
    p === "critical" ? "#FF4444" : p === "high" ? "#F5E642" : p === "medium" ? "#88AAFF" : "#888";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW New Homeowner Checklist 2026</h1>
          <p style={{ color: "#8892A4", fontSize: 15 }}>Your first 90 days — DFW specific. Don't skip the foundation shutoffs.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#111E35", borderRadius: 12, padding: 6 }}>
          {(["30", "60", "90"] as const).map(d => (
            <button key={d} onClick={() => setActiveDay(d)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: activeDay === d ? "#F5E642" : "transparent", color: activeDay === d ? "#0A1628" : "#8892A4" }}>
              Day {d}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tasks[activeDay].map(t => (
            <div key={t.id} onClick={() => toggle(t.id)} style={{ display: "flex", alignItems: "center", gap: 14, background: checked.has(t.id) ? "#0D2A1A" : "#111E35", borderRadius: 10, padding: "14px 16px", cursor: "pointer", border: `1px solid ${checked.has(t.id) ? "#2A6" : "#1E2D45"}`, transition: "all 0.15s" }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, textDecoration: checked.has(t.id) ? "line-through" : "none", color: checked.has(t.id) ? "#4A7" : "#E8EAF0" }}>{t.task}</div>
                <div style={{ fontSize: 12, color: priorityColor(t.priority), marginTop: 2, textTransform: "uppercase", fontWeight: 700 }}>{t.priority}</div>
              </div>
              <span style={{ fontSize: 20 }}>{checked.has(t.id) ? "✅" : "⬜"}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: "#111E35", borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 18 }}>⚡ Need a contractor? ProLnk connects you with vetted DFW pros — free quotes, no hassle.</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Get Free Quotes →</button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568", fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
