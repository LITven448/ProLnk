import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Zap, CheckCircle, AlertTriangle, XCircle, ChevronRight,
  Shield, Minus, ExternalLink,
} from "lucide-react";
import { Link } from "wouter";

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
  blue: "#3B82F6",
  purple: "#A855F7",
  teal: "#14B8A6",
  orange: "#F97316",
};

type CheckStatus = "ok" | "warn" | "na";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  note?: string;
}

const INITIAL_CHECKLIST: CheckItem[] = [
  { id: "c1", label: "GFCI outlets in kitchen/bath/garage", status: "ok" },
  { id: "c2", label: "Arc fault circuit breakers (AFCI)", status: "ok" },
  { id: "c3", label: "No overloaded circuits", status: "ok" },
  { id: "c4", label: "Outdoor outlets weatherproof", status: "warn", note: "1 of 3 exterior outlets not sealed" },
  { id: "c5", label: "Panel in good condition", status: "ok" },
  { id: "c6", label: "No aluminum wiring (pre-1972 homes)", status: "na", note: "Built 2015 — not applicable" },
  { id: "c7", label: "Smoke detectors on each level", status: "ok" },
];

interface Upgrade {
  title: string;
  cost: string;
  diy: boolean;
  benefit: string;
  color: string;
}

const UPGRADES: Upgrade[] = [
  {
    title: "GFCI Outlets",
    cost: "$15–25 ea",
    diy: true,
    benefit: "Protects against electrical shock near water",
    color: D.cyan,
  },
  {
    title: "Whole-Home Surge Protector",
    cost: "$300–600",
    diy: false,
    benefit: "Protects smart home devices and appliances",
    color: D.blue,
  },
  {
    title: "EV Charger Level 2",
    cost: "$800–1,500",
    diy: false,
    benefit: "Future-proofs home for electric vehicle",
    color: D.green,
  },
  {
    title: "Smart Circuit Breaker",
    cost: "$200–400",
    diy: false,
    benefit: "Remote monitoring and circuit control",
    color: D.purple,
  },
  {
    title: "Generator Hookup",
    cost: "$1,200–2,500",
    diy: false,
    benefit: "Freeze-proof power during outages",
    color: D.amber,
  },
];

const STATUS_CONFIG: Record<CheckStatus, { icon: any; color: string; label: string }> = {
  ok: { icon: CheckCircle, color: D.green, label: "Good" },
  warn: { icon: AlertTriangle, color: D.amber, label: "Warning" },
  na: { icon: Minus, color: D.dim, label: "N/A" },
};

export default function ElectricalGuide() {
  const [checklist, setChecklist] = useState<CheckItem[]>(INITIAL_CHECKLIST);

  function cycleStatus(id: string) {
    setChecklist(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const next: CheckStatus = item.status === "ok" ? "warn" : item.status === "warn" ? "na" : "ok";
        return { ...item, status: next };
      })
    );
  }

  const okCount = checklist.filter(i => i.status === "ok").length;
  const applicableCount = checklist.filter(i => i.status !== "na").length;
  const score = applicableCount > 0 ? Math.round((okCount / applicableCount) * 100) : 100;
  const scoreColor = score >= 80 ? D.green : score >= 60 ? D.amber : D.red;

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.amber}20` }}>
              <Zap className="w-5 h-5" style={{ color: D.amber }} />
            </div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Electrical Guide</h1>
          </div>
          <p className="text-sm ml-14" style={{ color: D.muted }}>Keep your home safe and powered</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: main content */}
          <div className="xl:col-span-2 space-y-6">

            {/* Safety First Banner */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${D.red}15`, border: `1px solid ${D.red}40` }}>
              <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: D.red }} />
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: D.red }}>Electrical fires are the #3 cause of home fires</p>
                <p className="text-xs" style={{ color: D.muted }}>
                  Regular inspections save lives. The NFPA estimates 51,000 electrical fires occur annually in U.S. homes, causing $1.3B in property damage.
                </p>
              </div>
            </div>

            {/* Your Panel */}
            <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${D.cyan}20` }}>
                  <Zap className="w-4 h-4" style={{ color: D.cyan }} />
                </div>
                <h2 className="text-base font-bold" style={{ color: D.text }}>Your Panel</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Panel Capacity", value: "200-amp" },
                  { label: "Installed", value: "2015" },
                  { label: "Age", value: "10 years" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: D.surface }}>
                    <p className="text-lg font-black" style={{ color: D.cyan }}>{stat.value}</p>
                    <p className="text-xs" style={{ color: D.muted }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: `${D.amber}12`, border: `1px solid ${D.amber}30` }}>
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: D.amber }} />
                <p className="text-xs" style={{ color: D.muted }}>
                  Your panel is 10 years old — <strong style={{ color: D.amber }}>next inspection recommended by 2026.</strong> Panels typically last 25–40 years but should be inspected every 10 years.
                </p>
              </div>
            </div>

            {/* Safety Checklist */}
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Safety Checklist</span>
                <span className="text-xs font-bold" style={{ color: scoreColor }}>{okCount} of {checklist.length} complete</span>
              </div>
              <div className="divide-y" style={{ borderColor: D.border }}>
                {checklist.map(item => {
                  const cfg = STATUS_CONFIG[item.status];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => cycleStatus(item.id)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all hover:opacity-80"
                      style={{ background: "transparent" }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: cfg.color }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: D.text }}>{item.label}</p>
                        {item.note && <p className="text-xs mt-0.5" style={{ color: D.muted }}>{item.note}</p>}
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: `${cfg.color}20`, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upgrade Guide */}
            <div>
              <div className="mb-4">
                <h2 className="text-base font-bold" style={{ color: D.text }}>Upgrade Guide</h2>
                <p className="text-xs mt-0.5" style={{ color: D.muted }}>Prioritized by safety impact and cost</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UPGRADES.map(upg => (
                  <div key={upg.title} className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${upg.color}20` }}
                      >
                        <Zap className="w-4 h-4" style={{ color: upg.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold mb-1" style={{ color: D.text }}>{upg.title}</p>
                        <p className="text-xs mb-2" style={{ color: D.muted }}>{upg.benefit}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black" style={{ color: upg.color }}>{upg.cost}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              background: upg.diy ? `${D.green}20` : `${D.amber}20`,
                              color: upg.diy ? D.green : D.amber,
                            }}
                          >
                            {upg.diy ? "DIY Possible" : "Pro Required"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Texas-Specific */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${D.blue}12`, border: `1px solid ${D.blue}30` }}>
              <ExternalLink className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: D.blue }} />
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: D.blue }}>Texas After Uri 2021</p>
                <p className="text-sm" style={{ color: D.text }}>
                  <strong style={{ color: D.cyan }}>47% of DFW homeowners</strong> added a whole-home generator or hookup following Winter Storm Uri.
                  Generator hookups start at $1,200 and provide freeze-proof power continuity.
                </p>
              </div>
            </div>

            {/* DIY Limits */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${D.red}10`, border: `1px solid ${D.red}30` }}>
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: D.red }} />
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: D.red }}>Never DIY These</p>
                <p className="text-sm mb-2" style={{ color: D.text }}>
                  Panel work, new circuits, and underground wiring <strong style={{ color: D.red }}>require a licensed electrician</strong> by Texas state law.
                </p>
                <p className="text-xs" style={{ color: D.muted }}>
                  Unpermitted electrical work can void homeowner's insurance and create fire hazards that aren't detectable until a short circuit occurs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">

            {/* Score */}
            <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-4" style={{ color: D.text }}>Safety Score</h2>
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="52" fill="none" strokeWidth="10" stroke={`${scoreColor}20`} />
                    <circle
                      cx="64" cy="64" r="52" fill="none" strokeWidth="10"
                      stroke={scoreColor}
                      strokeDasharray={String(2 * Math.PI * 52)}
                      strokeDashoffset={String(2 * Math.PI * 52 - (score / 100) * (2 * Math.PI * 52))}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black" style={{ color: scoreColor }}>{score}</span>
                    <span className="text-xs font-semibold" style={{ color: D.muted }}>/100</span>
                  </div>
                </div>
                <span className="text-sm font-bold" style={{ color: scoreColor }}>
                  {score >= 80 ? "Safe" : score >= 60 ? "Fair" : "At Risk"}
                </span>
              </div>
            </div>

            {/* Checklist Summary */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: D.text }}>Checklist Status</h2>
              {[
                { label: "Good", count: checklist.filter(i => i.status === "ok").length, color: D.green },
                { label: "Warning", count: checklist.filter(i => i.status === "warn").length, color: D.amber },
                { label: "N/A", count: checklist.filter(i => i.status === "na").length, color: D.dim },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-xs" style={{ color: D.muted }}>{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.count}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${D.amber}15, ${D.orange}15)`, border: `1px solid ${D.amber}40` }}>
              <Zap className="w-8 h-8 mx-auto mb-2" style={{ color: D.amber }} />
              <p className="text-sm font-bold mb-1" style={{ color: D.text }}>Find an Electrician</p>
              <p className="text-xs mb-4" style={{ color: D.muted }}>
                Licensed, background-checked electricians in your area. Free quotes on any job.
              </p>
              <Link href="/trustypro/book?trade=electrical">
                <div
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all hover:opacity-90"
                  style={{ background: D.amber, color: "#000" }}
                >
                  Book an Electrician
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Inspection cadence */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: D.text }}>Inspection Cadence</h2>
              <div className="space-y-2.5">
                {[
                  { when: "Every 10 years", what: "Panel inspection by licensed electrician" },
                  { when: "Every 5 years", what: "GFCI outlet test and reset" },
                  { when: "Annually", what: "Smoke detector battery replacement" },
                  { when: "Before buying", what: "Full electrical inspection required" },
                  { when: "After storms", what: "Check for tripped breakers and surge damage" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: D.cyan, minWidth: 80 }}>{row.when}</span>
                    <span className="text-xs" style={{ color: D.muted }}>{row.what}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
