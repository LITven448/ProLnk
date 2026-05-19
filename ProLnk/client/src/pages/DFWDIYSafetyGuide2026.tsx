import { useState } from 'react';

type TaskKey = "Electrical" | "Gas & Plumbing" | "Structural" | "HVAC" | "Cosmetic" | "Minor Plumbing" | "Light Fixtures";

const CLASSIFICATIONS: Record<TaskKey, { level: "DANGER" | "SAFE" | "CAUTION"; label: string; reason: string; emoji: string }> = {
  "Electrical": { level: "DANGER", label: "NEVER DIY", emoji: "🚫", reason: "Panel work, new circuits, or outlet wiring in DFW can be fatal and void homeowners insurance. Requires licensed electrician." },
  "Gas & Plumbing": { level: "DANGER", label: "NEVER DIY", emoji: "🚫", reason: "Gas line work in DFW requires a licensed plumber. A leak can cause explosion or CO poisoning." },
  "Structural": { level: "DANGER", label: "NEVER DIY", emoji: "🚫", reason: "Load-bearing walls, beams, and DFW foundation work require structural engineer plus licensed contractor." },
  "HVAC": { level: "DANGER", label: "NEVER DIY", emoji: "🚫", reason: "Refrigerant handling is EPA-regulated and illegal without certification. DFW heat makes HVAC failure life-threatening." },
  "Cosmetic": { level: "SAFE", label: "SAFE TO DIY", emoji: "✅", reason: "Painting, caulking, patching nail holes, and trim work are low-risk and great DIY projects." },
  "Minor Plumbing": { level: "SAFE", label: "SAFE TO DIY", emoji: "✅", reason: "Faucet replacement, toilet flapper, and showerhead swap are beginner-friendly. Turn off water first!" },
  "Light Fixtures": { level: "CAUTION", label: "DIY WITH CARE", emoji: "⚠️", reason: "Swapping a fixture is safe ONLY if you turn off the breaker, verify with voltage tester, and no new wiring is needed." },
};

const COLORS = { DANGER: "#ef4444″, SAFE: "#22c55e", CAUTION: "#f59e0b" };

export default function DFWDIYSafetyGuide2026() {
  const [task, setTask] = useState<TaskKey>("Electrical");
  const result = CLASSIFICATIONS[task];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK - DFW SAFETY GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🦺 DFW DIY Safety Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>Know your limits. Some DFW home repairs are dangerous, illegal, or will void your insurance if done DIY. Select a task type to check.</p>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12, fontSize: 14 }}>SELECT TASK TYPE</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(CLASSIFICATIONS) as TaskKey[]).map((t) => (
              <button key={t} onClick={() => setTask(t)} style={{ padding: "9px 16px", borderRadius: 8, border: "2px solid", borderColor: task === t ? "#F5E642″ : "#1e3a5f", background: task === t ? "#F5E642" : "transparent", color: task === t ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 28, marginBottom: 24, border: "2px solid", borderColor: COLORS[result.level] }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{result.emoji}</div>
          <div style={{ color: COLORS[result.level], fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{result.label}</div>
          <div style={{ color: "#e2e8f0″, fontSize: 15, lineHeight: 1.7 }}>{result.reason}</div>
          {result.level === "DANGER" && (
            <div style={{ marginTop: 16, background: "#1a0a0a", borderRadius: 8, padding: 14, color: "#fca5a5″, fontSize: 13 }}>Call a licensed DFW pro. ProLnk can connect you within minutes.</div>
          )}
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 24, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>📋 DFW SAFETY RULES</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8″, lineHeight: 2, fontSize: 14 }}>
            <li>Always turn off power at breaker before any electrical work</li>
            <li>DFW building permits required for structural, electrical, plumbing changes</li>
            <li>Unpermitted work can block home sale and void insurance claims</li>
            <li>When in doubt, get a licensed pro quote first</li>
          </ul>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>
          ProLnk - Connecting DFW Homeowners with Trusted Pros - prolnk.io
        </div>
      </div>
    </div>
  );
}