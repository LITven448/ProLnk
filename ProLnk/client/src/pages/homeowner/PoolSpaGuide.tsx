import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Waves, CheckCircle, AlertTriangle, XCircle, ChevronRight,
  Droplets, Thermometer, FlaskConical, Calendar, DollarSign,
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
};

type CheckStatus = "done" | "warn" | "missed";

interface CheckItem {
  id: string;
  label: string;
  freq: string;
  status: CheckStatus;
}

const INITIAL_CHECKLIST: CheckItem[] = [
  { id: "c1", label: "Test water chemistry",           freq: "2x/week in summer", status: "done" },
  { id: "c2", label: "Check and empty skimmer baskets",freq: "Weekly",             status: "done" },
  { id: "c3", label: "Brush walls and steps",          freq: "Weekly",             status: "warn" },
  { id: "c4", label: "Backwash filter",                freq: "Monthly",            status: "done" },
  { id: "c5", label: "Check pump motor & filter pressure", freq: "Weekly",         status: "done" },
  { id: "c6", label: "Clean pool deck",                freq: "Monthly",            status: "missed" },
];

const CHEM_CARDS = [
  {
    label: "pH",
    range: "7.2 – 7.8",
    color: D.cyan,
    low: "Eye/skin irritation, equipment corrosion",
    high: "Cloudy water, chlorine loses effectiveness",
  },
  {
    label: "Chlorine",
    range: "1 – 3 ppm",
    color: D.green,
    low: "Algae growth, bacteria risk",
    high: "Bleached suits, eye irritation",
  },
  {
    label: "Alkalinity",
    range: "80 – 120 ppm",
    color: D.amber,
    low: "pH bounces wildly, equipment corrosion",
    high: "Cloudy water, pH hard to adjust",
  },
  {
    label: "Stabilizer (CYA)",
    range: "30 – 50 ppm",
    color: D.purple,
    low: "Chlorine burns off in hours from sun",
    high: "Chlorine lock — sanitizer stops working",
  },
];

const SEASONAL = [
  {
    season: "Open",
    months: "March",
    color: D.teal,
    tasks: [
      "Remove and store winter cover",
      "Reconnect equipment and prime pump",
      "Shock treat to 10 ppm chlorine",
      "Balance all chemicals",
      "Inspect for winter cracks or damage",
    ],
  },
  {
    season: "Summer Intensive",
    months: "June – August",
    color: D.amber,
    tasks: [
      "Check chemistry 2x per week",
      "Run pump 10–12 hours/day minimum",
      "Watch for evaporation — top off weekly",
      "Add algaecide at start of heat wave",
      "Shock after every big swim party",
    ],
  },
  {
    season: "Fall Closedown",
    months: "November",
    color: D.blue,
    tasks: [
      "Deep clean and balance water",
      "Blow out lines with compressor",
      "Add winter chemicals",
      "Lower water level 4–6 inches",
      "Cover tightly with winter cover",
    ],
  },
];

const COSTS = [
  { label: "Weekly service",         range: "$100 – $150/mo",   color: D.green },
  { label: "Equipment repair",       range: "$200 – $800",      color: D.amber },
  { label: "Resurfacing",            range: "$3,500 – $8,000",  color: D.red },
  { label: "Pool heater install",    range: "$1,500 – $3,000",  color: D.purple },
];

const STATUS_CFG: Record<CheckStatus, { icon: typeof CheckCircle; color: string; label: string }> = {
  done:   { icon: CheckCircle,  color: D.green, label: "Done" },
  warn:   { icon: AlertTriangle, color: D.amber, label: "Due" },
  missed: { icon: XCircle,       color: D.red,   label: "Missed" },
};

export default function PoolSpaGuide() {
  const [items, setItems] = useState<CheckItem[]>(INITIAL_CHECKLIST);

  function cycleStatus(id: string) {
    const order: CheckStatus[] = ["done", "warn", "missed"];
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const next = order[(order.indexOf(item.status) + 1) % order.length];
      return { ...item, status: next };
    }));
  }

  const done = items.filter(i => i.status === "done").length;

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.cyan}20` }}>
              <Waves className="w-5 h-5" style={{ color: D.cyan }} />
            </div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Pool &amp; Spa Guide</h1>
          </div>
          <p className="text-sm ml-14" style={{ color: D.muted }}>Keep your outdoor oasis running</p>
        </div>

        {/* Your Pool Card */}
        <div className="mb-6 rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${D.cyan}10, ${D.blue}10)`, border: `1px solid ${D.cyan}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4" style={{ color: D.cyan }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.cyan }}>Your Pool</span>
          </div>
          <p className="text-sm" style={{ color: D.text }}>
            In-ground gunite pool, 15,000 gallons, installed 2017. Equipment last serviced <strong style={{ color: D.cyan }}>April 2026</strong>.
          </p>
          <p className="text-xs mt-2" style={{ color: D.muted }}>
            DFW has 450,000+ residential pools — one of the highest concentrations in the US. Summer temps mean constant maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: Checklist + Seasonal + Costs */}
          <div className="xl:col-span-2 space-y-6">

            {/* Monthly Checklist */}
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Monthly Maintenance Checklist</span>
                <span className="text-xs font-bold" style={{ color: D.green }}>{done}/{items.length} complete</span>
              </div>
              <div className="divide-y" style={{ borderColor: D.border }}>
                {items.map(item => {
                  const cfg = STATUS_CFG[item.status];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => cycleStatus(item.id)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:opacity-80 transition-opacity"
                      style={{ background: "transparent" }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: cfg.color }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: D.text }}>{item.label}</p>
                        <p className="text-xs" style={{ color: D.muted }}>{item.freq}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${cfg.color}20`, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chemical Guide */}
            <div>
              <h2 className="text-base font-bold mb-4" style={{ color: D.text }}>Chemical Target Ranges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHEM_CARDS.map(c => (
                  <div key={c.label} className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${c.color}30` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4" style={{ color: c.color }} />
                      <span className="text-sm font-bold" style={{ color: D.text }}>{c.label}</span>
                      <span className="ml-auto text-sm font-black" style={{ color: c.color }}>{c.range}</span>
                    </div>
                    <div className="space-y-1.5 mt-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold w-8 flex-shrink-0" style={{ color: D.red }}>LOW</span>
                        <span className="text-xs" style={{ color: D.muted }}>{c.low}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold w-8 flex-shrink-0" style={{ color: D.amber }}>HIGH</span>
                        <span className="text-xs" style={{ color: D.muted }}>{c.high}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Guide */}
            <div>
              <h2 className="text-base font-bold mb-4" style={{ color: D.text }}>Seasonal Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SEASONAL.map(s => (
                  <div key={s.season} className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${s.color}30` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" style={{ color: s.color }} />
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.season}</span>
                    </div>
                    <p className="text-xs mb-3 ml-6" style={{ color: D.muted }}>{s.months}</p>
                    <ul className="space-y-1.5">
                      {s.tasks.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="text-xs" style={{ color: D.muted }}>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Guide */}
            <div>
              <h2 className="text-base font-bold mb-4" style={{ color: D.text }}>DFW Cost Guide</h2>
              <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                {COSTS.map((c, i) => (
                  <div key={c.label} className="flex items-center gap-4 px-5 py-3.5" style={{ borderTop: i > 0 ? `1px solid ${D.border}` : undefined }}>
                    <DollarSign className="w-4 h-4 flex-shrink-0" style={{ color: c.color }} />
                    <span className="text-sm flex-1" style={{ color: D.text }}>{c.label}</span>
                    <span className="text-sm font-black" style={{ color: c.color }}>{c.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Progress ring */}
            <div className="rounded-2xl p-6 flex flex-col items-center" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-4 self-start" style={{ color: D.text }}>This Month</h2>
              {(() => {
                const pct = Math.round((done / items.length) * 100);
                const r = 52;
                const circ = 2 * Math.PI * r;
                const offset = circ - (pct / 100) * circ;
                const col = pct >= 80 ? D.green : pct >= 50 ? D.amber : D.red;
                return (
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" stroke={`${col}20`} />
                        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" stroke={col}
                          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                          style={{ transition: "stroke-dashoffset 0.8s ease" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black" style={{ color: col }}>{pct}%</span>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: D.muted }}>{done} of {items.length} tasks complete</span>
                  </div>
                );
              })()}
            </div>

            {/* DFW fact */}
            <div className="rounded-2xl p-4" style={{ background: `${D.teal}10`, border: `1px solid ${D.teal}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4" style={{ color: D.teal }} />
                <span className="text-xs font-bold" style={{ color: D.teal }}>DFW Summer Reality</span>
              </div>
              <p className="text-xs" style={{ color: D.muted }}>
                Dallas summer averages 100°F+. Pool chemistry drifts daily. Weekly testing is the minimum — twice-weekly keeps you ahead of algae.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${D.cyan}15, ${D.teal}15)`, border: `1px solid ${D.cyan}40` }}>
              <Waves className="w-8 h-8 mx-auto mb-2" style={{ color: D.cyan }} />
              <p className="text-sm font-bold mb-1" style={{ color: D.text }}>Find a Pool Pro</p>
              <p className="text-xs mb-4" style={{ color: D.muted }}>
                Licensed, vetted pool technicians in DFW. Free quotes, background-checked.
              </p>
              <Link href="/trustypro/book">
                <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ background: D.cyan, color: "#0D0F14" }}>
                  Find a Pool Pro
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Quick chemistry tips */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: D.text }}>Quick Chemistry Rules</h2>
              <div className="space-y-2">
                {[
                  "Always adjust pH before adding chlorine",
                  "Never mix chemicals together — add separately",
                  "Add chemicals at dusk to reduce burnoff",
                  "Run pump 30 min after adding chemicals",
                  "Shock after thunderstorms and big swim days",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: D.cyan }} />
                    <span className="text-xs" style={{ color: D.muted }}>{tip}</span>
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
