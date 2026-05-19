import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import {
  Wind,
  Droplets,
  Zap,
  Wrench,
  Paintbrush,
  Hammer,
  ScanLine,
  Phone,
  DollarSign,
  Download,
  Camera,
  ChevronRight,
} from "lucide-react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const T = {
  bg:      "#0A1628″,
  surface: "#0F1F38″,
  card:    "#0d1c33″,
  teal:    "#0D9488″,
  tealDim: "rgba(13,148,136,0.12)",
  border:  "rgba(255,255,255,0.08)",
  muted:   "rgba(255,255,255,0.45)",
  faint:   "rgba(255,255,255,0.20)",
  white:   "#FFFFFF",
  green:   "#10B981″,
  amber:   "#F59E0B",
  blue:    "#3B82F6″,
  purple:  "#8B5CF6″,
  orange:  "#F97316″,
};

// ─── Phases ──────────────────────────────────────────────────────────────────
const PHASES = ["Quote", "Approved", "Scheduled", "In Progress", "Complete"] as const;
type Phase = typeof PHASES[number];

// ─── Active projects ─────────────────────────────────────────────────────────
const ACTIVE_PROJECTS = [
  {
    id: "p1″,
    name: "Kitchen Remodel",
    trade: "Carpentry",
    pro: "Cornerstone Carpentry",
    currentPhase: "In Progress" as Phase,
    pctComplete: 65,
    nextMilestone: "Cabinet installation",
    nextDate: "May 18, 2026″,
    color: T.amber,
    icon: Hammer,
  },
  {
    id: "p2″,
    name: "Main Panel Upgrade",
    trade: "Electrical",
    pro: "Volt Pro Electric",
    currentPhase: "Scheduled" as Phase,
    pctComplete: 30,
    nextMilestone: "Permit inspection",
    nextDate: "May 22, 2026″,
    color: "#FBBF24″,
    icon: Zap,
  },
];

// ─── Timeline events ──────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: "Mar 2022″,
    title: "Home added to ProLnk",
    desc: "2847 Maple Ridge Dr onboarded into Home Health Vault",
    amount: null,
    hasPhotos: false,
    icon: ScanLine,
    color: T.teal,
  },
  {
    id: 2,
    date: "Jun 2022″,
    title: "HVAC System Installed",
    desc: "Full 3-ton Trane HVAC replacement — Arctic Air HVAC",
    amount: 4200,
    hasPhotos: true,
    icon: Wind,
    color: "#06B6D4″,
  },
  {
    id: 3,
    date: "Sep 2022″,
    title: "Home Health Scan",
    desc: "AI photo scan — 12 items flagged, 3 resolved",
    amount: null,
    hasPhotos: true,
    icon: ScanLine,
    color: T.purple,
  },
  {
    id: 4,
    date: "Feb 2023″,
    title: "Water Heater Flush",
    desc: "Preventative maintenance — FlowRight Plumbing",
    amount: 95,
    hasPhotos: false,
    icon: Droplets,
    color: T.blue,
  },
  {
    id: 5,
    date: "Oct 2023″,
    title: "Deck Board Replacement",
    desc: "40 linear ft of composite decking — Cornerstone Carpentry",
    amount: 1340,
    hasPhotos: true,
    icon: Hammer,
    color: T.orange,
  },
  {
    id: 6,
    date: "Jan 2024″,
    title: "Panel Inspection & GFCI",
    desc: "Updated 8 GFCI outlets + full panel check — Volt Pro Electric",
    amount: 275,
    hasPhotos: false,
    icon: Zap,
    color: "#FBBF24″,
  },
  {
    id: 7,
    date: "Jun 2024″,
    title: "Exterior Paint Touch-Up",
    desc: "South and west facades — FineLine Painting Co.",
    amount: 820,
    hasPhotos: true,
    icon: Paintbrush,
    color: T.orange,
  },
  {
    id: 8,
    date: "Dec 2024″,
    title: "Bathroom Faucet Replacement",
    desc: "Master bath Delta faucet + supply lines — FlowRight Plumbing",
    amount: 210,
    hasPhotos: false,
    icon: Droplets,
    color: T.blue,
  },
  {
    id: 9,
    date: "Mar 2025″,
    title: "HVAC Annual Tune-Up",
    desc: "Filter, coils, refrigerant check — Arctic Air HVAC",
    amount: 189,
    hasPhotos: false,
    icon: Wind,
    color: "#06B6D4″,
  },
  {
    id: 10,
    date: "Nov 2025″,
    title: "Home Health Scan",
    desc: "AI scan updated — 4 new items, 2 resolved since last scan",
    amount: null,
    hasPhotos: true,
    icon: ScanLine,
    color: T.purple,
  },
  {
    id: 11,
    date: "Mar 2026″,
    title: "Emergency Plumbing Call",
    desc: "Burst supply line under kitchen sink — FlowRight Plumbing",
    amount: 340,
    hasPhotos: true,
    icon: Wrench,
    color: "#EF4444″,
  },
  {
    id: 12,
    date: "Apr 2026″,
    title: "HVAC Tune-Up",
    desc: "Spring service — Arctic Air HVAC",
    amount: 189,
    hasPhotos: false,
    icon: Wind,
    color: "#06B6D4″,
  },
];

const TOTAL = 8420;

// ─── Phase bar ────────────────────────────────────────────────────────────────
function PhaseBar({ currentPhase, pct }: { currentPhase: Phase; pct: number }) {
  const idx = PHASES.indexOf(currentPhase);
  return (
    <div className="mt-3″>
      <div className="flex justify-between mb-1.5″>
        {PHASES.map((phase, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <span
              key={phase}
              className="text-[10px] font-semibold"
              style={{ color: active ? T.teal : done ? T.white : T.faint }}
            >
              {phase}
            </span>
          );
        })}
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background: T.border }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: T.teal }}
        />
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectTimeline() {
  const [detailOpen, setDetailOpen] = useState<string | null>(null);

  return (
    <HomeownerLayout>
      <div
        className="min-h-screen px-4 py-8 max-w-2xl mx-auto"
        style={{ background: T.bg, color: T.white }}
      >

        {/* Header */}
        <div className="mb-8″>
          <h1 className="text-3xl font-bold">Project Timeline</h1>
          <p className="text-sm mt-1″ style={{ color: T.muted }}>Your home improvement story</p>
        </div>

        {/* Active projects */}
        <section className="mb-10″>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4″
            style={{ color: T.muted }}
          >
            Active Projects
          </p>
          <div className="flex flex-col gap-4″>
            {ACTIVE_PROJECTS.map((proj) => {
              const Icon = proj.icon;
              const open = detailOpen === proj.id;
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl p-4″
                  style={{ background: T.surface, border: `1px solid ${T.border}` }}
                >
                  <div className="flex items-start justify-between gap-2″>
                    <div className="flex items-center gap-2″>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                        style={{ background: `${proj.color}1a` }}
                      >
                        <Icon size={18} color={proj.color} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{proj.name}</p>
                        <p className="text-xs mt-0.5″ style={{ color: T.muted }}>
                          {proj.trade} · {proj.pro}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0″
                      style={{ background: T.tealDim, color: T.teal }}
                    >
                      {proj.pctComplete}% done
                    </span>
                  </div>

                  <PhaseBar currentPhase={proj.currentPhase} pct={proj.pctComplete} />

                  <div
                    className="flex items-center justify-between mt-3 pt-3″
                    style={{ borderTop: `1px solid ${T.border}` }}
                  >
                    <div>
                      <p className="text-xs" style={{ color: T.muted }}>Next: {proj.nextMilestone}</p>
                      <p className="text-xs font-semibold mt-0.5″ style={{ color: T.teal }}>
                        {proj.nextDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setDetailOpen(open ? null : proj.id)}
                      className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      style={{ background: T.tealDim, color: T.teal }}
                    >
                      View Details
                      <ChevronRight size={13} />
                    </button>
                  </div>

                  {open && (
                    <div
                      className="mt-3 pt-3 rounded-xl p-3 text-xs leading-relaxed"
                      style={{ background: T.card, color: T.muted, borderTop: `1px solid ${T.border}` }}
                    >
                      Detailed project notes and files will appear here once connected to the ProLnk project
                      management system.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Vertical timeline */}
        <section className="mb-10″>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6″
            style={{ color: T.muted }}
          >
            Full History
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-[2px]"
              style={{ background: T.border }}
            />

            <div className="flex flex-col gap-6″>
              {TIMELINE_EVENTS.map((ev) => {
                const Icon = ev.icon;
                return (
                  <div key={ev.id} className="relative flex gap-4 pl-14″>
                    {/* Icon dot */}
                    <div
                      className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0″
                      style={{
                        background: `${ev.color}22`,
                        border: `2px solid ${ev.color}`,
                      }}
                    >
                      <Icon size={16} color={ev.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-1″>
                      <div className="flex items-start justify-between gap-2 mb-1″>
                        <div>
                          <p className="font-semibold text-sm">{ev.title}</p>
                          <p className="text-xs mt-0.5″ style={{ color: T.muted }}>{ev.desc}</p>
                        </div>
                        <div className="text-right shrink-0″>
                          <p className="text-xs" style={{ color: T.faint }}>{ev.date}</p>
                          {ev.amount != null && (
                            <p className="text-sm font-bold mt-0.5″ style={{ color: T.white }}>
                              ${ev.amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      {ev.hasPhotos && (
                        <button
                          className="flex items-center gap-1.5 text-xs font-semibold mt-1″
                          style={{ color: T.teal }}
                        >
                          <Camera size={12} />
                          View Photos
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Total investment */}
        <div
          className="rounded-2xl p-5 flex items-center justify-between mb-6″
          style={{ background: T.tealDim, border: `1px solid rgba(13,148,136,0.25)` }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1″ style={{ color: T.muted }}>
              Total Investment
            </p>
            <p className="text-2xl font-black">${TOTAL.toLocaleString()}</p>
            <p className="text-xs mt-0.5″ style={{ color: T.muted }}>
              in home improvements since 2022
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: T.tealDim }}
          >
            <DollarSign size={22} color={T.teal} />
          </div>
        </div>

        {/* Export */}
        <Button
          className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
          style={{ background: T.surface, color: T.white, border: `1px solid ${T.border}` }}
        >
          <Download size={16} color={T.teal} />
          Download Full History (PDF)
        </Button>

      </div>
    </HomeownerLayout>
  );
}
