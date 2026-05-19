import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  TrendingUp, Users, DollarSign, Zap, ArrowRight,
  ChevronDown, ChevronUp, Star, Award, Calculator,
  Briefcase, Info, CloudRain, Calendar,
} from "lucide-react";

const TIERS = [
  { id: "t1", label: "Tier 1", subLabel: "New Partner", keep: 0.40, color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  { id: "t2", label: "Tier 2", subLabel: "10+ Matches", keep: 0.55, color: "#2dd4bf", bg: "rgba(45,212,191,0.12)" },
  { id: "t3", label: "Tier 3", subLabel: "50+ Matches", keep: 0.65, color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  { id: "founding", label: "Founding", subLabel: "Locked Rate", keep: 0.72, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
];

const TIER_COMPARE_COLS = [
  { key: "keep", label: "Commission Keep" },
  { key: "override", label: "Network Override" },
  { key: "sub", label: "Subscription Override" },
  { key: "locked", label: "Rate Locked Forever" },
];

const TIER_COMPARE_DATA: Record<string, Record<string, string>> = {
  t1: { keep: "40%", override: "7%", sub: "12%", locked: "No" },
  t2: { keep: "55%", override: "7%", sub: "12%", locked: "No" },
  t3: { keep: "65%", override: "7%", sub: "12%", locked: "No" },
  founding: { keep: "72%", override: "7%", sub: "12%", locked: "Yes" },
};

const COMPETITOR_KEEP = 0.28;
const OVERRIDE_JOB = 0.07;
const OVERRIDE_SUB = 0.12;
const SUB_FEE = 149;

type Scenario = "solo" | "recruit" | "storm";

function SliderInput({
  label, value, min, max, step, format, onChange, color = "#2dd4bf",
}: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void; color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
          className="w-24 text-right text-sm font-bold rounded-lg px-2 py-1 focus:outline-none"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            color,
            colorScheme: "dark",
          }}
        />
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div className="absolute left-0 h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full opacity-0 cursor-pointer h-5"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 bg-[#0A1628] transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)`, zIndex: 1, borderColor: color }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function AnimatedBar({ label, value, maxValue, color, isHighlight }: {
  label: string; value: number; maxValue: number; color: string; isHighlight?: boolean;
}) {
  const pct = Math.max((value / maxValue) * 100, 2);
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="text-xs font-bold" style={{ color: isHighlight ? color : "rgba(255,255,255,0.4)" }}>
        {value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `$${value}`}
      </div>
      <div className="w-full flex items-end" style={{ height: "80px" }}>
        <div
          className="w-full rounded-t-lg transition-all duration-500"
          style={{
            height: `${pct}%`,
            backgroundColor: color,
            opacity: isHighlight ? 1 : 0.3,
            boxShadow: isHighlight ? `0 0 16px ${color}50` : "none",
          }}
        />
      </div>
      <div className="text-xs text-center leading-tight" style={{ color: isHighlight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}>
        {label}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color = "#2dd4bf" }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="rounded-2xl p-4 border" style={{ backgroundColor: `${color}0d`, borderColor: `${color}25` }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: `${color}90` }}>{label}</p>
      <p className="text-xl font-bold leading-none" style={{ color }}>{value}</p>
      {sub && <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</p>}
    </div>
  );
}

function MonthTimeline({ jobs, jobValue, refs, tier }: { jobs: number; jobValue: number; refs: number; tier: typeof TIERS[0] }) {
  const months = Array.from({ length: 12 }, (_, mo) => {
    const activeRefs = Math.min(refs * (mo + 1), refs * 12);
    const tierBonus = mo >= 2 ? 1.1 : 1;
    const own = jobs * jobValue * tier.keep * tierBonus;
    const subOvr = activeRefs * SUB_FEE * 0.07;
    const jobOvr = activeRefs * jobs * jobValue * 0.01;
    return { mo: mo + 1, own: Math.round(own), subOvr: Math.round(subOvr), jobOvr: Math.round(jobOvr), total: Math.round(own + subOvr + jobOvr) };
  });

  const maxVal = Math.max(...months.map(m => m.total));

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="flex items-center gap-2 mb-5">
        <Calendar className="w-4 h-4" style={{ color: "#2dd4bf" }} />
        <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>Month 1–12 Income Projection</p>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 100 }}>
        {months.map(m => {
          const h = Math.max((m.total / maxVal) * 100, 4);
          return (
            <div key={m.mo} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ fontSize: 9, color: "#2dd4bf", fontWeight: 700, textAlign: "center" }}>
                {m.total >= 1000 ? `$${(m.total / 1000).toFixed(0)}K` : `$${m.total}`}
              </div>
              <div style={{
                width: "100%", background: `linear-gradient(to top, #2dd4bf, #3b82f6)`,
                borderRadius: "4px 4px 0 0", height: `${h}%`,
                opacity: 0.7 + (m.mo / 12) * 0.3,
              }} />
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>M{m.mo}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
        <span>Month 1: ${months[0].total.toLocaleString()}</span>
        <span>Month 12: ${months[11].total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function ScenarioPanel({ jobs, jobValue, tier }: { jobs: number; jobValue: number; tier: typeof TIERS[0] }) {
  const [scenario, setScenario] = useState<Scenario>("solo");

  const soloTotal = jobs * jobValue * tier.keep;
  const recruitTotal = (() => {
    const own = jobs * jobValue * tier.keep;
    const sub = 3 * SUB_FEE * 0.07;
    const job = 3 * jobs * jobValue * 0.01;
    return own + sub + job;
  })();
  const stormTotal = (() => {
    const stormJobs = jobs * 2.8;
    const own = stormJobs * jobValue * tier.keep;
    const sub = 3 * SUB_FEE * 0.07;
    const stormJobOvr = 3 * stormJobs * jobValue * 0.01;
    return own + sub + stormJobOvr;
  })();

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`;

  const panels: { id: Scenario; label: string; icon: typeof Users; color: string; value: number; desc: string }[] = [
    { id: "solo", label: "Solo — No Recruits", icon: DollarSign, color: "#2dd4bf", value: soloTotal, desc: "Just your own jobs, no network income" },
    { id: "recruit", label: "You + 3 Recruits", icon: Users, color: "#a78bfa", value: recruitTotal, desc: "Add 3 colleagues — watch passive income appear" },
    { id: "storm", label: "3-Hail-Event Month", icon: CloudRain, color: "#f59e0b", value: stormTotal, desc: "DFW storm surge: 2.8× normal job volume for roofers" },
  ];

  const active = panels.find(p => p.id === scenario)!;
  const Icon = active.icon;

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Scenario Toggle</p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {panels.map(p => {
          const PIcon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setScenario(p.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all"
              style={{
                borderColor: scenario === p.id ? `${p.color}60` : "rgba(255,255,255,0.1)",
                backgroundColor: scenario === p.id ? `${p.color}15` : "rgba(255,255,255,0.03)",
                color: scenario === p.id ? p.color : "rgba(255,255,255,0.4)",
              }}
            >
              <PIcon className="w-3.5 h-3.5" /> {p.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl p-5 border" style={{ backgroundColor: `${active.color}0d`, borderColor: `${active.color}30` }}>
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5" style={{ color: active.color }} />
          <span className="text-sm font-semibold" style={{ color: active.color }}>{active.label}</span>
        </div>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{active.desc}</p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-white">{fmt(active.value)}</span>
          <span className="text-sm pb-1" style={{ color: "rgba(255,255,255,0.3)" }}>/mo</span>
        </div>
        {scenario !== "solo" && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold" style={{ color: active.color }}>
            <TrendingUp className="w-3.5 h-3.5" />
            +{fmt(active.value - soloTotal)} vs solo ({Math.round(((active.value - soloTotal) / soloTotal) * 100)}% more)
          </div>
        )}
      </div>
    </div>
  );
}

export default function GrowthCalculator() {
  const [jobs, setJobs] = useState(8);
  const [jobValue, setJobValue] = useState(800);
  const [refs, setRefs] = useState(3);
  const [tierId, setTierId] = useState("founding");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[3];

  const calc = useMemo(() => {
    const gross = jobs * jobValue;
    const own = gross * tier.keep;
    const teamVol = refs * jobs * jobValue;
    const netOverride = teamVol * OVERRIDE_JOB;
    const subOverride = refs * SUB_FEE * OVERRIDE_SUB;
    const total = own + netOverride + subOverride;
    const annual = total * 12;
    const competitor = gross * COMPETITOR_KEEP;
    const uplift = total - competitor;
    const upliftPct = competitor > 0 ? Math.round((uplift / competitor) * 100) : 0;
    return { gross, own, netOverride, subOverride, total, annual, competitor, uplift, upliftPct };
  }, [jobs, jobValue, refs, tier]);

  const fmt = (v: number) => v >= 10000 ? `$${(v / 1000).toFixed(1)}K` : `$${Math.round(v).toLocaleString()}`;
  const fmtS = (v: number) => `$${Math.round(v).toLocaleString()}`;
  const maxBar = Math.max(calc.total, calc.gross * 0.5, 1);

  const bars = [
    { label: "Angi / HomeAdvisor", value: Math.round(calc.gross * 0.22), color: "#ef4444" },
    { label: "Thumbtack", value: Math.round(calc.gross * 0.28), color: "#f97316" },
    { label: "ProLnk Own", value: Math.round(calc.own), color: "#2dd4bf" },
    { label: "ProLnk Total", value: Math.round(calc.total), color: "#2dd4bf", isHighlight: true },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/"><span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span></Link>
        <Link href="/pro-waitlist">
          <button className="px-4 py-2 rounded-xl text-sm font-bold text-[#0A1628]" style={{ backgroundColor: "#2dd4bf" }}>
            Join Now
          </button>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2dd4bf", borderColor: "rgba(45,212,191,0.3)" }}
          >
            <Calculator className="w-3.5 h-3.5" />
            Income Calculator
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            How Much Will You <span style={{ color: "#2dd4bf" }}>Actually Earn?</span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Adjust the inputs to model your real income potential — including network override, recruits, and storm scenarios. No gimmicks, just math.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl p-6 border space-y-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Your Numbers</p>

            <SliderInput
              label="Monthly Jobs"
              value={jobs} min={1} max={50} step={1}
              format={(v) => `${v} jobs`}
              onChange={setJobs}
              color="#2dd4bf"
            />

            <SliderInput
              label="Average Job Value"
              value={jobValue} min={200} max={5000} step={100}
              format={(v) => `$${v.toLocaleString()}`}
              onChange={setJobValue}
              color="#a78bfa"
            />

            <SliderInput
              label="Referrals Per Month (new pros you recruit)"
              value={refs} min={0} max={20} step={1}
              format={(v) => `${v} refs`}
              onChange={setRefs}
              color="#f59e0b"
            />

            <div
              className="flex items-center justify-between rounded-xl px-4 py-3 border"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Monthly Job Revenue</span>
              <span className="font-bold text-white">{fmtS(calc.gross)}</span>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Tier Selection</label>
              <div className="grid grid-cols-2 gap-2">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTierId(t.id)}
                    className="flex flex-col items-start gap-0.5 px-3 py-3 rounded-xl border-2 text-left transition-all"
                    style={{
                      borderColor: tierId === t.id ? `${t.color}60` : "rgba(255,255,255,0.08)",
                      backgroundColor: tierId === t.id ? t.bg : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span className="text-sm font-bold" style={{ color: tierId === t.id ? t.color : "rgba(255,255,255,0.55)" }}>
                      {t.label}
                    </span>
                    <span className="text-xs" style={{ color: tierId === t.id ? `${t.color}80` : "rgba(255,255,255,0.25)" }}>
                      {t.subLabel} · Keep {Math.round(t.keep * 100)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div
              className="rounded-2xl p-6 border relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.12) 0%, rgba(45,212,191,0.04) 100%)", borderColor: "rgba(45,212,191,0.3)" }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #2dd4bf, transparent)", transform: "translate(40%,-40%)" }}
              />
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Monthly Commission</p>
              <p className="text-5xl font-bold text-white mb-1 transition-all duration-300">{fmt(calc.total)}</p>
              <p className="text-sm" style={{ color: "rgba(45,212,191,0.7)" }}>{fmt(calc.annual)} / year</p>
              {calc.uplift > 0 && (
                <div
                  className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "rgba(45,212,191,0.15)", color: "#2dd4bf" }}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  {fmt(calc.uplift)} / mo more than alternatives
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Own Jobs" value={fmt(calc.own)} sub={`${Math.round(tier.keep * 100)}% keep`} color="#2dd4bf" />
              <StatCard label="Net Override" value={fmt(calc.netOverride)} sub="from team jobs" color="#f59e0b" />
              <StatCard label="Sub Override" value={fmt(calc.subOverride)} sub="from referrals" color="#a78bfa" />
            </div>

            <div className="rounded-2xl p-5 border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Monthly Keep: ProLnk vs. Alternatives</p>
              </div>
              <div className="flex items-end gap-3" style={{ height: "128px" }}>
                {bars.map((b) => (
                  <AnimatedBar key={b.label} {...b} maxValue={maxBar} />
                ))}
              </div>
              <p className="text-xs text-center mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                Based on published platform rates. Results vary by market and activity.
              </p>
            </div>

            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)" }}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Detailed Breakdown
                </span>
                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showBreakdown && (
                <div className="px-5 pb-5 pt-2 space-y-2" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  {[
                    { label: "Gross job revenue", value: fmtS(calc.gross), note: `${jobs} jobs × ${fmtS(jobValue)}` },
                    { label: `Commission (${Math.round(tier.keep * 100)}% — ${tier.label})`, value: fmtS(calc.own), color: "#2dd4bf" },
                    { label: `Network override (${refs} refs × 7% per job)`, value: fmtS(calc.netOverride), color: "#f59e0b" },
                    { label: `Subscription override (12% × $149/mo)`, value: fmtS(calc.subOverride), color: "#a78bfa" },
                    { label: "Without ProLnk (avg competitor ~28%)", value: fmtS(calc.competitor), color: "#ef4444" },
                    { label: "Monthly uplift", value: `+${fmtS(calc.uplift)} (+${calc.upliftPct}%)`, color: "#2dd4bf" },
                  ].map(({ label, value, note, color }) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-2 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      <div>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                        {note && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>{note}</p>}
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: color ?? "rgba(255,255,255,0.8)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── MONTH 1-12 TIMELINE ── */}
        <div className="mt-10">
          <MonthTimeline jobs={jobs} jobValue={jobValue} refs={refs} tier={tier} />
        </div>

        {/* ── SCENARIO TOGGLE ── */}
        <div className="mt-6">
          <ScenarioPanel jobs={jobs} jobValue={jobValue} tier={tier} />
        </div>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            Tier Comparison
          </p>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Feature</th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      className="px-4 py-4 text-center text-xs font-bold"
                      style={{ color: tierId === t.id ? t.color : "rgba(255,255,255,0.45)" }}
                    >
                      {t.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIER_COMPARE_COLS.map((col, rowIdx) => (
                  <tr
                    key={col.key}
                    style={{ borderBottom: rowIdx < TIER_COMPARE_COLS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <td className="px-5 py-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{col.label}</td>
                    {TIERS.map((t) => {
                      const val = TIER_COMPARE_DATA[t.id][col.key];
                      const isActive = tierId === t.id;
                      return (
                        <td
                          key={t.id}
                          className="px-4 py-3 text-center text-sm font-bold"
                          style={{ color: isActive ? t.color : "rgba(255,255,255,0.45)", backgroundColor: isActive ? `${t.color}08` : "transparent" }}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl p-5 border text-center" style={{ backgroundColor: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.2)" }}>
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Annual Projection</p>
          <p className="text-4xl font-bold text-white mb-1 transition-all duration-300">{fmt(calc.annual)}</p>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
            vs. {fmt(calc.competitor * 12)}/yr on other platforms
          </p>
          <Link href="/pro-waitlist">
            <button
              className="flex items-center justify-center gap-2 mx-auto px-8 py-3.5 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90"
              style={{ backgroundColor: "#2dd4bf" }}
            >
              Join Now to Lock This Rate <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Founding member spots limited · $149/mo locked forever
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center mt-6">
          {[
            { icon: Star, label: "Founding Rate", sub: "Locked forever" },
            { icon: Award, label: "No contracts", sub: "Cancel anytime" },
            { icon: Users, label: "5 income streams", sub: "Built to scale" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="rounded-xl p-3 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }} />
              <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{sub}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-center mt-12" style={{ color: "rgba(255,255,255,0.2)" }}>
          Projections are estimates based on published rates. Actual earnings depend on your market, job type, and activity level.
        </p>
      </div>

      <div className="border-t text-center py-8 text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
        &copy; 2026 ProLnk &mdash; Growth Calculator &mdash;{" "}
        <Link href="/pro-waitlist">
          <span className="cursor-pointer" style={{ color: "rgba(45,212,191,0.6)" }}>Join the Founding Waitlist</span>
        </Link>
      </div>
    </div>
  );
}
