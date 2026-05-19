import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  AlertTriangle, CheckCircle, XCircle, Bug, Calendar,
  DollarSign, ShieldCheck, Phone, ChevronDown, ChevronUp,
} from "lucide-react";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  teal: "#14B8A6″,
  orange: "#F97316″,
  purple: "#A855F7″,
};

type CheckStatus = "ok" | "warn" | "bad";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
}

const CHECKLIST: CheckItem[] = [
  { id: "c1″, label: "Exterior caulk gaps sealed", status: "ok" },
  { id: "c2″, label: "No standing water in yard", status: "warn" },
  { id: "c3″, label: "Firewood stored away from house", status: "ok" },
  { id: "c4″, label: "Door sweeps installed", status: "ok" },
  { id: "c5″, label: "Gutters clean", status: "warn" },
  { id: "c6″, label: "No mulch against foundation", status: "bad" },
];

const STATUS_ICON = {
  ok: { Icon: CheckCircle, color: D.green, label: "Done" },
  warn: { Icon: AlertTriangle, color: D.amber, label: "Attention" },
  bad: { Icon: XCircle, color: D.red, label: "Action Needed" },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface PestRow {
  name: string;
  color: string;
  peak: number[];
}

const PESTS: PestRow[] = [
  { name: "Fire Ants",   color: D.red,    peak: [2,3,4,5,6,7,8,9] },
  { name: "Mosquitoes",  color: D.purple,  peak: [3,4,5,6,7,8,9] },
  { name: "Termites",    color: D.orange,  peak: [2,3,4,5] },
  { name: "Roaches",     color: D.amber,   peak: [0,1,2,3,4,5,6,7,8,9,10,11] },
  { name: "Rodents",     color: D.cyan,    peak: [9,10,11,0,1] },
  { name: "Spiders",     color: D.teal,    peak: [4,5,6,7,8] },
];

interface TreatmentCard {
  pest: string;
  method: string;
  cost: string;
  pro: boolean;
  color: string;
  tip: string;
}

const TREATMENTS: TreatmentCard[] = [
  {
    pest: "Fire Ants",
    method: "Granule bait + mound drench",
    cost: "$15 DIY",
    pro: false,
    color: D.red,
    tip: "Broadcast bait in dry weather. Treat each mound individually within 48hrs.",
  },
  {
    pest: "Mosquitoes",
    method: "Yard treatment (barrier spray)",
    cost: "$80–150 professional",
    pro: true,
    color: D.purple,
    tip: "Treat shrubs and shady areas monthly. Eliminate standing water first.",
  },
  {
    pest: "Termites",
    method: "Professional inspection + bait stations",
    cost: "$500–2,000 professional",
    pro: true,
    color: D.orange,
    tip: "Never disturb suspected termite mud tubes — disruption spreads the colony.",
  },
  {
    pest: "Roaches",
    method: "Gel bait stations + perimeter spray",
    cost: "$25–50 DIY",
    pro: false,
    color: D.amber,
    tip: "Place bait behind appliances and under sinks. Never spray over bait — this repels roaches away from bait.",
  },
  {
    pest: "Rodents",
    method: "Exclusion + snap traps or bait stations",
    cost: "$200–400 professional",
    pro: true,
    color: D.cyan,
    tip: "Seal entry points first — steel wool + caulk gaps. Poison bait indoors risks secondary pet poisoning.",
  },
];

export default function PestControlGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<CheckItem[]>(CHECKLIST);

  function cycleStatus(id: string) {
    const order: CheckStatus[] = ["bad", "warn", "ok"];
    setChecklist(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const i = order.indexOf(item.status);
        return { ...item, status: order[(i + 1) % 3] };
      })
    );
  }

  const okCount = checklist.filter(c => c.status === "ok").length;

  return (
    <HomeownerLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "24px 16px", maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Bug size={22} color={D.green} />
            <h1 style={{ color: D.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Pest Control Guide</h1>
          </div>
          <p style={{ color: D.muted, fontSize: 14, margin: 0 }}>Keep Texas bugs outside</p>
          <p style={{ color: D.dim, fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
            DFW's warm climate supports year-round pest pressure. Fire ants, mosquitoes, roaches, and termites are the top 4 threats to DFW homes.
          </p>
        </div>

        {/* Season alert */}
        <div style={{
          background: "#1C1200″, border: `1px solid ${D.amber}33`, borderRadius: 10,
          padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 28,
        }}>
          <AlertTriangle size={18} color={D.amber} style={{ marginTop: 1, flexShrink: 0 }} />
          <div>
            <span style={{ color: D.amber, fontWeight: 600, fontSize: 13 }}>May — Termite Swarm Season</span>
            <p style={{ color: D.muted, fontSize: 13, margin: "4px 0 0″ }}>
              Inspect crawl spaces and wood for frass (sawdust-like droppings). Winged termites near windows are a red flag.
            </p>
          </div>
        </div>

        {/* Pest threat calendar */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
            <Calendar size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Pest Threat Calendar
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ color: D.muted, textAlign: "left", padding: "4px 8px 8px 0″, fontWeight: 500, minWidth: 90 }}>Pest</th>
                  {MONTHS.map(m => (
                    <th key={m} style={{ color: D.dim, fontWeight: 400, padding: "4px 3px 8px", textAlign: "center", minWidth: 30 }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PESTS.map(pest => (
                  <tr key={pest.name}>
                    <td style={{ color: pest.color, padding: "5px 8px 5px 0″, fontWeight: 600, whiteSpace: "nowrap" }}>{pest.name}</td>
                    {MONTHS.map((_, idx) => (
                      <td key={idx} style={{ padding: "5px 3px", textAlign: "center" }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: 4, margin: "0 auto",
                          background: pest.peak.includes(idx) ? pest.color + "44″ : D.surface,
                          border: pest.peak.includes(idx) ? `1px solid ${pest.color}66` : `1px solid ${D.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {pest.peak.includes(idx) && (
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: pest.color }} />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prevention checklist */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, margin: 0 }}>
              <ShieldCheck size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
              Prevention Checklist
            </h2>
            <span style={{
              background: okCount === checklist.length ? D.green + "22″ : D.amber + "22",
              color: okCount === checklist.length ? D.green : D.amber,
              fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
            }}>
              {okCount}/{checklist.length} complete
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {checklist.map(item => {
              const cfg = STATUS_ICON[item.status];
              return (
                <button
                  key={item.id}
                  onClick={() => cycleStatus(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: D.surface, border: `1px solid ${D.border}`,
                    borderRadius: 8, padding: "10px 14px", cursor: "pointer", textAlign: "left",
                    transition: "border-color 0.15s",
                  }}
                >
                  <cfg.Icon size={18} color={cfg.color} style={{ flexShrink: 0 }} />
                  <span style={{ color: D.text, fontSize: 14, flex: 1 }}>{item.label}</span>
                  <span style={{ color: cfg.color, fontSize: 12, fontWeight: 600 }}>{cfg.label}</span>
                </button>
              );
            })}
          </div>
          <p style={{ color: D.dim, fontSize: 12, marginTop: 12 }}>Tap any item to cycle its status.</p>
        </div>

        {/* Treatment guide */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 14 }}>
            <DollarSign size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Treatment Guide
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TREATMENTS.map(t => {
              const isOpen = expanded === t.pest;
              return (
                <div
                  key={t.pest}
                  style={{
                    background: D.card, border: `1px solid ${D.border}`,
                    borderRadius: 12, overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : t.pest)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "14px 16px", cursor: "pointer", background: "transparent",
                      border: "none", textAlign: "left",
                    }}
                  >
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: t.color, flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: D.text, fontWeight: 600, fontSize: 14 }}>{t.pest}</div>
                      <div style={{ color: D.muted, fontSize: 12, marginTop: 2 }}>{t.method}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        background: t.pro ? D.orange + "22″ : D.green + "22",
                        color: t.pro ? D.orange : D.green,
                        fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                      }}>
                        {t.pro ? "Pro Only" : "DIY OK"}
                      </span>
                      <span style={{ color: D.teal, fontSize: 13, fontWeight: 600 }}>{t.cost}</span>
                      {isOpen ? <ChevronUp size={16} color={D.dim} /> : <ChevronDown size={16} color={D.dim} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{
                      background: D.surface, borderTop: `1px solid ${D.border}`,
                      padding: "12px 16px",
                    }}>
                      <p style={{ color: D.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{t.tip}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: `linear-gradient(135deg, ${D.teal}15, ${D.green}10)`,
          border: `1px solid ${D.teal}44`, borderRadius: 12, padding: 24, textAlign: "center",
        }}>
          <Phone size={22} color={D.teal} style={{ marginBottom: 8 }} />
          <h3 style={{ color: D.text, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
            Ready to protect your home?
          </h3>
          <p style={{ color: D.muted, fontSize: 13, marginBottom: 16 }}>
            Get quotes from DFW's top-rated pest control pros — screened and licensed.
          </p>
          <button style={{
            background: D.teal, color: "#000″, fontWeight: 700, fontSize: 14,
            padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer",
          }}>
            Schedule Pest Control
          </button>
        </div>

      </div>
    </HomeownerLayout>
  );
}
