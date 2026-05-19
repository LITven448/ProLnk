import { useState } from 'react';

const CHECKLISTS = {
  slab: [
    { id: 1, label: "Walk full perimeter — look for cracks in brick or foundation", freq: "Annual" },
    { id: 2, label: "Check all interior doors for sticking or misalignment", freq: "Quarterly" },
    { id: 3, label: "Inspect windows — gaps, hard to open/close, cracked sills", freq: "Quarterly" },
    { id: 4, label: "Roll marble on floors to test for unlevel areas", freq: "Quarterly" },
    { id: 5, label: "Measure soil moisture 6\" from foundation (July–Aug critical)", freq: "Monthly Jul-Aug" },
    { id: 6, label: "Run soaker hose if soil pulling away from foundation", freq: "Monthly Jul-Aug" },
    { id: 7, label: "Inspect drainage — all water drains away from home", freq: "Annual" },
    { id: 8, label: "Check gutters — clean and directing water 5ft+ from home", freq: "Annual" },
    { id: 9, label: "Look for new cracks wider than 1/4 inch anywhere", freq: "Quarterly" },
    { id: 10, label: "Document and photograph any new cracks with date", freq: "Quarterly" },
  ],
  pier: [
    { id: 1, label: "Walk full perimeter — look for cracks or pier exposure", freq: "Annual" },
    { id: 2, label: "Check pier and beam crawl space for moisture or rot", freq: "Annual" },
    { id: 3, label: "Inspect all interior doors for sticking or misalignment", freq: "Quarterly" },
    { id: 4, label: "Roll marble on floors to test for unlevel areas", freq: "Quarterly" },
    { id: 5, label: "Check crawl space vents — clear and functional", freq: "Annual" },
    { id: 6, label: "Look for sagging floor areas (soft spots)", freq: "Quarterly" },
    { id: 7, label: "Inspect drainage — all water drains away from home", freq: "Annual" },
    { id: 8, label: "Measure soil moisture 6\" from foundation (July–Aug)", freq: "Monthly Jul-Aug" },
    { id: 9, label: "Document and photograph any new cracks with date", freq: "Quarterly" },
  ],
};

export default function DFWFoundationChecklistAnnual2026() {
  const [homeType, setHomeType] = useState<"slab" | "pier">("slab");
  const [checked, setChecked] = useState<number[]>([]);

  const items = CHECKLISTS[homeType];
  const toggle = (id: number) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const done = items.filter((i) => checked.includes(i.id)).length;
  const freqColor = (f: string) =>
    f.includes("Jul") ? "#f97316" : f === "Annual" ? "#3b82f6" : "#8b5cf6";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Foundation Checklist 2026
          </h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Annual DIY foundation monitoring for Dallas-Fort Worth clay soil conditions
          </p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.75rem" }}>🏗️ Foundation Type</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {(["slab", "pier"] as const).map((v) => (
              <button key={v} onClick={() => setHomeType(v)}
                style={{ padding: "0.5rem 1.5rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: homeType === v ? "#F5E642" : "#2d3f58", color: homeType === v ? "#0A1628" : "#e2e8f0", fontWeight: 600 }}>
                {v === "slab" ? "🧱 Slab" : "🪵 Pier & Beam"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: "#162030", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", borderLeft: "4px solid #f97316" }}>
          <p style={{ margin: 0, color: "#fb923c", fontWeight: 600 }}>⚠️ DFW Clay Soil Warning</p>
          <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>July–August critical: DFW expansive clay shrinks dramatically. Maintain consistent soil moisture to prevent differential movement.</p>
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
                border: `1px solid ${checked.includes(item.id) ? "#F5E642" : "transparent"}` }}>
              <span style={{ fontSize: "1.4rem" }}>{checked.includes(item.id) ? "✅" : "⬜"}</span>
              <span style={{ flex: 1, textDecoration: checked.includes(item.id) ? "line-through" : "none", color: checked.includes(item.id) ? "#64748b" : "#e2e8f0" }}>
                {item.label}
              </span>
              <span style={{ background: freqColor(item.freq), borderRadius: 6, padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                {item.freq}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem", background: "#1e2d45", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>🏗️ Foundation issue? <span style={{ color: "#F5E642", fontWeight: 600 }}>Get free DFW pro quotes at ProLnk.io</span></p>
        </div>
      </div>
    </div>
  );
}