import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  CheckSquare, Square, ChevronDown, ChevronUp, Wrench,
  Camera, DollarSign, Home, Sparkles, ArrowRight,
  Truck, ShieldCheck, Lightbulb, Key, Wind,
} from "lucide-react";

type Mode = "selling" | "moving";

interface CheckItem {
  id: string;
  label: string;
  cost?: string;
  needsPro: boolean;
  trade?: string;
}

interface Phase {
  title: string;
  sub: string;
  color: string;
  items: CheckItem[];
}

const SELLING_PHASES: Phase[] = [
  {
    title: "Phase 1 — Prep",
    sub: "2–3 months out",
    color: "border-teal-500",
    items: [
      { id: "s1",  label: "Declutter every room (donate, sell, store)", cost: undefined, needsPro: false },
      { id: "s2",  label: "Deep clean: carpets, windows, appliances",  cost: "$200–$500", needsPro: true, trade: "Cleaning" },
      { id: "s3",  label: "Landscaping — curb appeal refresh",         cost: "$300–$900", needsPro: true, trade: "Landscaping" },
      { id: "s4",  label: "Minor repairs: drywall, caulking, hardware",cost: "$150–$400", needsPro: true, trade: "Handyman" },
      { id: "s5",  label: "Pre-listing home inspection",               cost: "$350–$500", needsPro: true, trade: "Inspector" },
      { id: "s6",  label: "Touch-up paint on walls and trim",          cost: "$200–$600", needsPro: true, trade: "Painting" },
    ],
  },
  {
    title: "Phase 2 — List",
    sub: "1 month out",
    color: "border-purple-500",
    items: [
      { id: "s7",  label: "Professional photography session",          cost: "$200–$400", needsPro: true, trade: "Photographer" },
      { id: "s8",  label: "Set pricing strategy with agent",           cost: undefined,   needsPro: false },
      { id: "s9",  label: "Stage home (rent furniture if needed)",     cost: "$500–$2K",  needsPro: true, trade: "Staging" },
      { id: "s10", label: "Schedule open house date",                  cost: undefined,   needsPro: false },
      { id: "s11", label: "Clean and organize garage / basement",      cost: undefined,   needsPro: false },
    ],
  },
  {
    title: "Phase 3 — Close",
    sub: "2 weeks out",
    color: "border-blue-500",
    items: [
      { id: "s12", label: "Final walkthrough with buyer",              cost: undefined,   needsPro: false },
      { id: "s13", label: "Transfer utilities — cancel or transfer",   cost: undefined,   needsPro: false },
      { id: "s14", label: "USPS change of address",                    cost: undefined,   needsPro: false },
      { id: "s15", label: "Arrange moving company or truck rental",    cost: "$400–$1.5K",needsPro: true, trade: "Movers" },
      { id: "s16", label: "Forward mail and update subscriptions",     cost: undefined,   needsPro: false },
    ],
  },
];

const MOVING_PHASES: Phase[] = [
  {
    title: "Week 1 — Basics",
    sub: "First days in new home",
    color: "border-teal-500",
    items: [
      { id: "m1",  label: "Change all door locks",                     cost: "$150–$300", needsPro: true, trade: "Locksmith" },
      { id: "m2",  label: "Deep clean entire home before unpacking",   cost: "$200–$500", needsPro: true, trade: "Cleaning" },
      { id: "m3",  label: "Set up utilities: electric, gas, water",    cost: undefined,   needsPro: false },
      { id: "m4",  label: "Locate main water shutoff and breaker box", cost: undefined,   needsPro: false },
      { id: "m5",  label: "Replace HVAC air filter",                   cost: "$15–$40",   needsPro: false },
    ],
  },
  {
    title: "Month 1 — Systems Check",
    sub: "First 30 days",
    color: "border-purple-500",
    items: [
      { id: "m6",  label: "HVAC inspection and tune-up",               cost: "$80–$150",  needsPro: true, trade: "HVAC" },
      { id: "m7",  label: "Plumbing — check for leaks under sinks",    cost: undefined,   needsPro: false },
      { id: "m8",  label: "Test smoke and CO detectors",               cost: undefined,   needsPro: false },
      { id: "m9",  label: "Pest control treatment",                    cost: "$100–$250", needsPro: true, trade: "Pest Control" },
      { id: "m10", label: "Electrical outlets and panel inspection",   cost: "$100–$200", needsPro: true, trade: "Electrician" },
    ],
  },
  {
    title: "Month 2–3 — Settle In",
    sub: "Getting comfortable",
    color: "border-blue-500",
    items: [
      { id: "m11", label: "Touch-up paint / repair nail holes",        cost: "$100–$300", needsPro: true, trade: "Painting" },
      { id: "m12", label: "Set up HomeOwner Vault profile",            cost: undefined,   needsPro: false },
      { id: "m13", label: "Enroll in annual maintenance plan",         cost: undefined,   needsPro: false },
      { id: "m14", label: "Get roof inspected (if >5 years)",          cost: "$150–$350", needsPro: true, trade: "Roofing" },
      { id: "m15", label: "Landscape and lawn care setup",             cost: "$150–$400", needsPro: true, trade: "Landscaping" },
    ],
  },
];

function ProgressRing({ pct }: { pct: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  const color = pct >= 80 ? "#10B981" : pct >= 50 ? "#14b8a6" : "#F59E0B";
  return (
    <div className="relative w-36 h-36">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} fill="none" stroke="#1e2d45" strokeWidth="12" />
        <circle
          cx="72" cy="72" r={r}
          fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white leading-none">{pct}%</span>
        <span className="text-xs text-slate-400 mt-0.5">complete</span>
      </div>
    </div>
  );
}

export default function MovingChecklist() {
  const [mode, setMode] = useState<Mode>("selling");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Record<string, boolean>>({ 0: true });

  const phases = mode === "selling" ? SELLING_PHASES : MOVING_PHASES;
  const allItems = phases.flatMap((p) => p.items);
  const total = allItems.length;
  const done = allItems.filter((it) => checked[it.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const togglePhase = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  const proItems = allItems.filter((it) => it.needsPro && !checked[it.id]);
  const proTotal = proItems
    .map((it) => {
      if (!it.cost) return 0;
      const match = it.cost.match(/\$?([\d,]+)/);
      return match ? parseInt(match[1].replace(",", ""), 10) : 0;
    })
    .reduce((a, b) => a + b, 0);

  const modeIcon = mode === "selling" ? Home : Truck;
  const ModeIcon = modeIcon;

  return (
    <HomeownerLayout homeownerName="" homeownerAddress="">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <ModeIcon className="w-8 h-8 text-teal-400" />
            Moving Checklist
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Sell smarter, move easier — track every step</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-[#0a1020] rounded-xl w-fit border border-slate-700/50">
          {(["selling", "moving"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setChecked({}); setOpen({ 0: true }); }}
              className={`
                px-6 py-2 rounded-lg text-sm font-bold transition-all
                ${mode === m
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-900/30"
                  : "text-slate-400 hover:text-slate-200"}
              `}
            >
              {m === "selling" ? "Selling My Home" : "Moving In"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Checklist Phases */}
          <div className="lg:col-span-2 space-y-4">
            {phases.map((phase, pi) => (
              <div key={pi} className={`bg-[#0f1829] rounded-2xl border border-slate-700/50 overflow-hidden border-l-4 ${phase.color}`}>
                <button
                  onClick={() => togglePhase(pi)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/30 transition-colors"
                >
                  <div>
                    <span className="text-sm font-bold text-white">{phase.title}</span>
                    <span className="text-xs text-slate-500 ml-2">{phase.sub}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {phase.items.filter((it) => checked[it.id]).length}/{phase.items.length}
                    </span>
                    {open[pi]
                      ? <ChevronUp className="w-4 h-4 text-slate-500" />
                      : <ChevronDown className="w-4 h-4 text-slate-500" />
                    }
                  </div>
                </button>

                {open[pi] && (
                  <div className="px-5 pb-4 space-y-2.5">
                    {phase.items.map((item) => {
                      const done = checked[item.id];
                      return (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${done ? "bg-teal-500/5" : "bg-slate-800/30"}`}
                        >
                          <button
                            onClick={() => toggle(item.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {done
                              ? <CheckSquare className="w-5 h-5 text-teal-400" />
                              : <Square className="w-5 h-5 text-slate-500" />
                            }
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${done ? "line-through text-slate-500" : "text-slate-200"}`}>
                              {item.label}
                            </p>
                            {item.cost && (
                              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                Est. {item.cost}
                              </p>
                            )}
                          </div>
                          {item.needsPro && !done && (
                            <button className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 transition-colors whitespace-nowrap">
                              Find Pro
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar: Score + Estimates */}
          <div className="space-y-4">
            {/* Progress Ring */}
            <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-white mb-4">
                {mode === "selling" ? "Get Ready to Sell" : "Move-In Progress"}
              </h3>
              <ProgressRing pct={pct} />
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                {done} of {total} tasks complete
              </p>
            </div>

            {/* Estimate Card */}
            {mode === "selling" && (
              <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Home Prep Estimate</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Getting this home market-ready:
                </p>
                <p className="text-lg font-black text-amber-400 mb-1">$3,400 – $7,200</p>
                <p className="text-xs text-slate-500 mb-4">in prep improvements</p>
                <button className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                  Get Quotes for All Work
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Remaining Pro Work */}
            {proItems.length > 0 && (
              <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Pro Work Needed</h3>
                </div>
                <div className="space-y-2 mb-4">
                  {proItems.slice(0, 5).map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 truncate mr-2">{it.trade ?? "Pro"}</span>
                      <span className="text-slate-500 whitespace-nowrap">{it.cost ?? "—"}</span>
                    </div>
                  ))}
                  {proItems.length > 5 && (
                    <p className="text-xs text-slate-600">+{proItems.length - 5} more tasks</p>
                  )}
                </div>
                {proTotal > 0 && (
                  <p className="text-xs text-slate-500 mb-3">
                    Rough low-end total:{" "}
                    <span className="text-white font-bold">${proTotal.toLocaleString()}+</span>
                  </p>
                )}
                <button className="w-full py-2.5 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                  Find Vetted Pros
                </button>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                {mode === "selling" ? (
                  <>
                    <li>• Deep clean adds $1,500–$3K to perceived value</li>
                    <li>• First impressions: buyers decide in 8 seconds</li>
                    <li>• Pre-listing inspection prevents surprises at closing</li>
                  </>
                ) : (
                  <>
                    <li>• Change locks within 24 hours of moving in</li>
                    <li>• Document the home condition day one for insurance</li>
                    <li>• HVAC filter: replace now, then every 90 days</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
