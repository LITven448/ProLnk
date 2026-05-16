import { useState } from 'react';

type Task = { id: string; label: string; icon: string; diy: boolean; permitRequired: boolean; reason: string; warning?: string };

const tasks: Task[] = [
  { id: "paint", label: "Interior/Exterior Paint", icon: "🎨", diy: true, permitRequired: false, reason: "Straightforward DIY — prep is 80% of the job. Sand, prime, cut edges, roll.", },
  { id: "caulk", label: "Caulking Windows & Doors", icon: "🪟", diy: true, permitRequired: false, reason: "Easy DIY with a $6 caulk gun. Removes air leaks that cost you hundreds/yr in DFW summers.", },
  { id: "gutter", label: "Gutter Cleaning", icon: "🍂", diy: true, permitRequired: false, reason: "Safe DIY if single-story. Use a ladder stabilizer. Do it before every DFW storm season.", },
  { id: "lawn", label: "Lawn & Minor Landscaping", icon: "🌿", diy: true, permitRequired: false, reason: "Mowing, edging, basic planting — all DIY. Irrigation repairs DIY if simple head replacement.", },
  { id: "fixtures", label: "Light Fixtures & Switches", icon: "💡", diy: true, permitRequired: false, reason: "Replacing like-for-like fixtures is DIY. Always kill power at breaker first. No permit needed.", warning: "DO NOT touch panel wiring, new circuits, or sub-panels — hire a licensed electrician.", },
  { id: "electrical-panel", label: "Electrical Panel Work", icon: "⚡", diy: false, permitRequired: true, reason: "Texas requires a licensed electrician for any panel work. Fire and electrocution risk. Permit required — inspected by city.", warning: "This is non-negotiable. Insurance may void claims for unpermitted electrical work.", },
  { id: "gas", label: "Gas Lines & Appliances", icon: "🔥", diy: false, permitRequired: true, reason: "Texas state law: all gas work requires a licensed plumber or gas fitter. Explosion risk. Always permitted.", warning: "Even a small gas leak can be fatal. Never DIY gas line work.", },
  { id: "foundation", label: "Foundation Repair", icon: "🏗️", diy: false, permitRequired: true, reason: "Foundation work in DFW requires a licensed structural engineer + licensed contractor. Permit required in most DFW cities.", warning: "DIY pier installation voids future warranty and can make existing movement worse.", },
  { id: "hvac-replace", label: "HVAC System Replacement", icon: "🌡️", diy: false, permitRequired: true, reason: "Texas requires licensed HVAC contractor for replacement. EPA 608 certification required for refrigerant handling.", warning: "Unpermitted HVAC work can prevent home sale. Always pull permit.", },
  { id: "roof", label: "Roof Replacement", icon: "🏠", diy: false, permitRequired: true, reason: "Most DFW cities require permit for full replacement. Fall risk is severe. Licensed roofer required for insurance claims.", warning: "Insurance will not pay hail claims on roofs with prior unpermitted DIY work.", },
];

export default function DFWDIYvsProGuide2026() {
  const [filter, setFilter] = useState<"all" | "diy" | "pro">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = tasks.filter(t => filter === "all" ? true : filter === "diy" ? t.diy : !t.diy);
  const active = tasks.find(t => t.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔨</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW DIY vs Pro Guide 2026</h1>
          <p style={{ color: "#8892A4", fontSize: 15 }}>Know what's safe to DIY in Texas and what requires a licensed pro + permit.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#111E35", borderRadius: 12, padding: 6 }}>
          {([["all", "All Tasks", "📋"], ["diy", "✅ Safe DIY", "✅"], ["pro", "⛔ Hire a Pro", "⛔"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: filter === key ? "#F5E642" : "transparent", color: filter === key ? "#0A1628" : "#8892A4" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {filtered.map(t => (
            <div key={t.id} onClick={() => setSelected(selected === t.id ? null : t.id)} style={{ background: selected === t.id ? "#1A2E50" : "#111E35", border: `2px solid ${selected === t.id ? "#F5E642" : "#1E2D45"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.label}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <span style={{ background: t.diy ? "#1A4A2A" : "#4A1A1A", color: t.diy ? "#66BB6A" : "#FF6B6B", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{t.diy ? "✅ DIY OK" : "⛔ Hire Licensed Pro"}</span>
                    {t.permitRequired && <span style={{ background: "#2A2A1A", color: "#F5E642", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>📋 Permit Required</span>}
                  </div>
                </div>
                <span style={{ fontSize: 18, color: "#8892A4" }}>{selected === t.id ? "▲" : "▼"}</span>
              </div>
              {selected === t.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1E2D45" }}>
                  <p style={{ margin: "0 0 10px", fontSize: 14, lineHeight: 1.6 }}>{t.reason}</p>
                  {t.warning && <div style={{ background: "#4A1A1A", borderRadius: 8, padding: 12, borderLeft: "3px solid #FF4444" }}>
                    <span style={{ fontSize: 13, color: "#FF8888" }}>⚠️ {t.warning}</span>
                  </div>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔧 Need a licensed DFW contractor? ProLnk connects you with verified pros — free quotes.</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find Licensed Pros →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568", fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
