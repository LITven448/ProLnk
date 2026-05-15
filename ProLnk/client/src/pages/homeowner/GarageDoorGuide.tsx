import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp,
  Wrench, Calendar, Zap, DollarSign, ExternalLink, Info,
} from "lucide-react";

const D = {
  bg: "#0D0F14",
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8",
  dim: "#555B72",
  cyan: "#00D4FF",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF4444",
  teal: "#14B8A6",
  purple: "#A855F7",
};

type SafeStatus = "ok" | "warn" | "fail";

interface SafeItem {
  id: string;
  label: string;
  detail: string;
  status: SafeStatus;
}

const INITIAL_CHECKS: SafeItem[] = [
  { id: "c1", label: "Auto-reverse test", detail: "Place 2×4 on ground — door should reverse on contact", status: "ok" },
  { id: "c2", label: "Photo-eye sensors aligned", detail: "Indicator light should be solid green on both units", status: "ok" },
  { id: "c3", label: "Manual release cord accessible", detail: "Red cord should hang clearly and pull freely", status: "ok" },
  { id: "c4", label: "Balance test", detail: "Disconnect opener, lift manually — should stay at 3 ft", status: "warn" },
  { id: "c5", label: "Springs show no gaps or corrosion", detail: "Inspect torsion springs above door for rust or separation", status: "ok" },
  { id: "c6", label: "All hardware tight", detail: "Check hinges, roller brackets, and track bolts for looseness", status: "fail" },
];

const MAINTENANCE = [
  { task: "Spring checkup", frequency: "Annually", cost: "$75–$150", diy: false, color: D.cyan },
  { task: "Lubrication (white lithium grease)", frequency: "Every 6 months", cost: "DIY ~$8", diy: true, color: D.green },
  { task: "Track cleaning", frequency: "Quarterly", cost: "DIY free", diy: true, color: D.teal },
  { task: "Full safety inspection", frequency: "Annual", cost: "$50–$100", diy: false, color: D.purple },
];

const WARNING_SIGNS = [
  { title: "Loud grinding noise", body: "Grinding when operating usually signals worn rollers, loose hardware, or a failing opener motor. Continued use will accelerate damage — schedule service within 7 days." },
  { title: "Slow movement", body: "A door that takes 15+ seconds to open or close likely has a weak battery, misaligned tracks, or insufficient lubrication. Check the opener battery first, then lubricate all moving parts." },
  { title: "Door reverses randomly", body: "Unexpected reversal indicates a photo-eye obstruction, misaligned sensors, or a faulty control board. Clean sensors with a dry cloth and verify alignment before calling a tech." },
  { title: "Gap at bottom", body: "A visible light gap along the bottom seal means the rubber weatherstrip has hardened or the floor is uneven. Replacement weatherstrip costs $20–$50 at hardware stores." },
  { title: "Sagging sections", body: "Sagging panels indicate broken springs or damaged hinges. Do not attempt spring repair yourself — springs are under extreme tension and are a common cause of serious injury. Call a pro." },
];

const STATUS_ICON: Record<SafeStatus, JSX.Element> = {
  ok:   <CheckCircle style={{ width: 18, height: 18, color: D.green }} />,
  warn: <AlertTriangle style={{ width: 18, height: 18, color: D.amber }} />,
  fail: <XCircle style={{ width: 18, height: 18, color: D.red }} />,
};

const STATUS_LABEL: Record<SafeStatus, string> = {
  ok: "Pass",
  warn: "Attention",
  fail: "Fail",
};

export default function GarageDoorGuide() {
  const [checks, setChecks] = useState<SafeItem[]>(INITIAL_CHECKS);
  const [openWarning, setOpenWarning] = useState<number | null>(null);

  function cycleStatus(id: string) {
    setChecks(prev => prev.map(c => {
      if (c.id !== id) return c;
      const next: Record<SafeStatus, SafeStatus> = { ok: "warn", warn: "fail", fail: "ok" };
      return { ...c, status: next[c.status] };
    }));
  }

  const passCount = checks.filter(c => c.status === "ok").length;
  const score = Math.round((passCount / checks.length) * 100);

  return (
    <HomeownerLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "28px 24px", fontFamily: "'Inter', system-ui, sans-serif", color: D.text }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: D.cyan + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench style={{ width: 18, height: 18, color: D.cyan }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: D.text, margin: 0 }}>Garage Door Guide</h1>
              <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>Your home's largest moving part</p>
            </div>
          </div>
        </div>

        {/* Door stats card */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20, display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, color: D.dim, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Door Type</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: D.text, margin: 0 }}>2-car insulated steel</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: D.dim, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Installed</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: D.amber, margin: 0 }}>2015 — 10 years old</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: D.dim, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Last Service</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: D.red, margin: 0 }}>Unknown</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: score >= 80 ? D.green : score >= 60 ? D.amber : D.red }}>{score}%</div>
              <p style={{ fontSize: 11, color: D.muted, margin: 0 }}>Safety Score</p>
            </div>
          </div>
        </div>

        {/* Safety checklist */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <CheckCircle style={{ width: 16, height: 16, color: D.cyan }} />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: D.text, margin: 0 }}>Safety Test Checklist</h2>
            <span style={{ fontSize: 12, color: D.muted, marginLeft: 4 }}>Click status to update</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {checks.map(item => (
              <div key={item.id} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <button
                  onClick={() => cycleStatus(item.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 1, flexShrink: 0 }}
                  title="Click to update"
                >
                  {STATUS_ICON[item.status]}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: D.text, margin: 0 }}>{item.label}</p>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 20,
                      background: item.status === "ok" ? D.green + "22" : item.status === "warn" ? D.amber + "22" : D.red + "22",
                      color: item.status === "ok" ? D.green : item.status === "warn" ? D.amber : D.red,
                    }}>{STATUS_LABEL[item.status]}</span>
                  </div>
                  <p style={{ fontSize: 12, color: D.muted, margin: "4px 0 0" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance guide */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Calendar style={{ width: 16, height: 16, color: D.teal }} />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: D.text, margin: 0 }}>Maintenance Guide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
            {MAINTENANCE.map(m => (
              <div key={m.task} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: "16px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, marginBottom: 10 }} />
                <p style={{ fontSize: 14, fontWeight: 600, color: D.text, margin: "0 0 4px" }}>{m.task}</p>
                <p style={{ fontSize: 12, color: D.muted, margin: "0 0 8px" }}>{m.frequency}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.cost}</span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: m.diy ? D.green + "22" : D.amber + "22",
                    color: m.diy ? D.green : D.amber,
                  }}>{m.diy ? "DIY" : "Pro"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning signs */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <AlertTriangle style={{ width: 16, height: 16, color: D.amber }} />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: D.text, margin: 0 }}>Warning Signs</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WARNING_SIGNS.map((w, i) => (
              <div key={w.title} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenWarning(openWarning === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", color: D.text }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <AlertTriangle style={{ width: 14, height: 14, color: D.amber, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{w.title}</span>
                  </div>
                  {openWarning === i
                    ? <ChevronUp style={{ width: 16, height: 16, color: D.muted }} />
                    : <ChevronDown style={{ width: 16, height: 16, color: D.muted }} />
                  }
                </button>
                {openWarning === i && (
                  <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${D.border}` }}>
                    <p style={{ fontSize: 13, color: D.muted, margin: "12px 0 0", lineHeight: 1.6 }}>{w.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Replacement guide */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Info style={{ width: 16, height: 16, color: D.purple }} />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: D.text, margin: 0 }}>Replacement Guide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: D.muted, marginBottom: 4 }}>When to Replace</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: D.text, margin: 0 }}>10–15 years of age or repeated costly repairs</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: D.muted, marginBottom: 4 }}>Installed Cost</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: D.cyan, margin: 0 }}>$800–$3,500</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: D.muted, marginBottom: 4 }}>Insulation (DFW Climate)</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: D.text, margin: 0 }}>R-13 or higher recommended for DFW heat</p>
            </div>
          </div>
        </div>

        {/* Smart upgrade */}
        <div style={{ background: D.teal + "18", border: `1px solid ${D.teal}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <Zap style={{ width: 22, height: 22, color: D.teal, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: "0 0 3px" }}>Smart Upgrade Available</p>
            <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>Smart garage door opener: <strong style={{ color: D.teal }}>$250–$400</strong> — adds remote access, activity alerts, and package delivery notifications.</p>
          </div>
        </div>

        {/* CTA */}
        <button style={{
          background: `linear-gradient(135deg, ${D.cyan}, ${D.teal})`,
          color: "#000",
          border: "none",
          borderRadius: 12,
          padding: "14px 28px",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <ExternalLink style={{ width: 16, height: 16 }} />
          Schedule Service
        </button>

      </div>
    </HomeownerLayout>
  );
}
