import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  TrendingUp, Users, DollarSign, Zap, ArrowRight,
  ChevronDown, ChevronUp, Star, Award, Info,
  Briefcase, Calculator,
} from "lucide-react";

// --- Constants ----------------------------------------------------------------
const COMMISSION_TIERS = [
  { id: "charter", label: "Charter (40%)", pct: 0.40, color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
  { id: "founding", label: "Founding (55%)", pct: 0.55, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  { id: "company", label: "Company (65%)", pct: 0.65, color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
  { id: "enterprise", label: "Enterprise (72%)", pct: 0.72, color: "#2dd4bf", bg: "rgba(45,212,191,0.15)" },
];

const NETWORK_LEVELS = [
  { id: "solo", label: "Solo", description: "Just you", multiplier: 0 },
  { id: "building", label: "Building", description: "1–5 in your team", multiplier: 0.6 },
  { id: "established", label: "Established", description: "6–15 teammates", multiplier: 1.0 },
];

const COMPETITOR_KEEP_PCT = 0.28;
const NETWORK_JOB_OVERRIDE_PCT = 0.07;
const SUBSCRIPTION_OVERRIDE_PCT = 0.12;
const SUBSCRIPTION_MONTHLY_FEE = 149;

// --- SliderInput --------------------------------------------------------------
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
        <label className="text-sm font-semibold text-white/70">{label}</label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const v = Math.max(min, Math.min(max, Number(e.target.value)));
            onChange(v);
          }}
          className="w-24 text-right text-sm font-bold rounded-lg px-2 py-1 focus:outline-none focus:ring-2"
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
          className="absolute w-4 h-4 rounded-full border-2 bg-[#0A1628] transition-all"
          style={{ left: `calc(${pct}% - 8px)`, zIndex: 1, borderColor: color }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/20 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

// --- Bar Chart (pure CSS) -----------------------------------------------------
function BarChart({ data }: { data: { label: string; value: number; color: string; isHighlight?: boolean }[] }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((d) => {
        const heightPct = Math.max((d.value / maxVal) * 100, 2);
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-center" style={{ color: d.isHighlight ? d.color : "rgba(255,255,255,0.45)" }}>
              {d.value >= 1000 ? `$${(d.value / 1000).toFixed(0)}K` : `$${d.value}`}
            </div>
            <div className="w-full flex items-end" style={{ height: "96px" }}>
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: d.color,
                  opacity: d.isHighlight ? 1 : 0.38,
                  boxShadow: d.isHighlight ? `0 0 18px ${d.color}50` : "none",
                }}
              />
            </div>
            <div className="text-xs text-center leading-tight" style={{ color: d.isHighlight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>
              {d.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Stat Card ----------------------------------------------------------------
function StatCard({ label, value, sub, color = "#2dd4bf" }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="rounded-2xl p-4 border" style={{ backgroundColor: `${color}0d`, borderColor: `${color}25` }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: `${color}99` }}>{label}</p>
      <p className="text-xl font-bold leading-none" style={{ color }}>{value}</p>
      {sub && <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</p>}
    </div>
  );
}

// --- Main Component -----------------------------------------------------------
export default function GrowthCalculator() {
  const [jobsPerMonth, setJobsPerMonth] = useState(8);
  const [avgJobValue, setAvgJobValue] = useState(800);
  const [tierId, setTierId] = useState("founding");
  const [teamSize, setTeamSize] = useState(3);
  const [networkLevelId, setNetworkLevelId] = useState("building");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const tier = COMMISSION_TIERS.find((t) => t.id === tierId) ?? COMMISSION_TIERS[1];
  const networkLevel = NETWORK_LEVELS.find((n) => n.id === networkLevelId) ?? NETWORK_LEVELS[1];

  const calc = useMemo(() => {
    const grossJobRevenue = jobsPerMonth * avgJobValue;
    const ownJobEarnings = grossJobRevenue * tier.pct;
    const teamJobVolume = teamSize * jobsPerMonth * avgJobValue * networkLevel.multiplier;
    const networkOverride = teamJobVolume * NETWORK_JOB_OVERRIDE_PCT;
    const subscriptionOverride = teamSize * SUBSCRIPTION_MONTHLY_FEE * SUBSCRIPTION_OVERRIDE_PCT * networkLevel.multiplier;
    const totalMonthly = ownJobEarnings + networkOverride + subscriptionOverride;
    const annualProjection = totalMonthly * 12;
    const withoutProlnk = grossJobRevenue * COMPETITOR_KEEP_PCT;
    const uplift = totalMonthly - withoutProlnk;
    const upliftPct = withoutProlnk > 0 ? Math.round((uplift / withoutProlnk) * 100) : 0;

    return { grossJobRevenue, ownJobEarnings, networkOverride, subscriptionOverride, totalMonthly, annualProjection, withoutProlnk, uplift, upliftPct };
  }, [jobsPerMonth, avgJobValue, tier, teamSize, networkLevel]);

  const fmt = (v: number) => v >= 10000 ? `$${(v / 1000).toFixed(1)}K` : `$${Math.round(v).toLocaleString()}`;
  const fmtSimple = (v: number) => `$${Math.round(v).toLocaleString()}`;

  const barData = [
    { label: "Angi / HA", value: Math.round(calc.grossJobRevenue * 0.22), color: "#ef4444" },
    { label: "Thumbtack", value: Math.round(calc.grossJobRevenue * 0.28), color: "#f97316" },
    { label: "ProLnk Own", value: Math.round(calc.ownJobEarnings), color: "#2dd4bf" },
    { label: "ProLnk Total", value: Math.round(calc.totalMonthly), color: "#2dd4bf", isHighlight: true },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/"><span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span></Link>
        <Link href="/pro-waitlist">
          <button className="px-4 py-2 rounded-xl text-sm font-bold text-[#0A1628]" style={{ backgroundColor: "#2dd4bf" }}>
            Join Now
          </button>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2dd4bf", borderColor: "rgba(45,212,191,0.3)" }}>
            <Calculator className="w-3.5 h-3.5" />
            Income Calculator
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            How Much Will You <span style={{ color: "#2dd4bf" }}>Actually Earn?</span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Adjust the sliders to see your real income potential — including network income from your team. No gimmicks, just math.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Inputs */}
          <div className="rounded-2xl p-6 border space-y-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Your Numbers</p>

            <SliderInput
              label="Jobs Per Month"
              value={jobsPerMonth}
              min={1} max={50} step={1}
              format={(v) => `${v} jobs`}
              onChange={setJobsPerMonth}
              color="#2dd4bf"
            />

            <SliderInput
              label="Average Job Value"
              value={avgJobValue}
              min={200} max={5000} step={100}
              format={(v) => `$${v.toLocaleString()}`}
              onChange={setAvgJobValue}
              color="#a78bfa"
            />

            {/* Gross revenue callout */}
            <div className="flex items-center justify-between rounded-xl px-4 py-3 border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
              <span className="text-sm text-white/50">Monthly Job Revenue</span>
              <span className="font-bold text-white">{fmtSimple(calc.grossJobRevenue)}</span>
            </div>

            {/* Commission Tier */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-3">Commission Tier</label>
              <div className="grid grid-cols-2 gap-2">
                {COMMISSION_TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTierId(t.id)}
                    className="flex flex-col items-start gap-0.5 px-3 py-3 rounded-xl border-2 text-left transition-all"
                    style={{
                      borderColor: tierId === t.id ? `${t.color}60` : "rgba(255,255,255,0.08)",
                      backgroundColor: tierId === t.id ? t.bg : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span className="text-sm font-bold" style={{ color: tierId === t.id ? t.color : "rgba(255,255,255,0.6)" }}>
                      {t.label.split("(")[0].trim()}
                    </span>
                    <span className="text-xs" style={{ color: tierId === t.id ? `${t.color}90` : "rgba(255,255,255,0.3)" }}>
                      Keep {Math.round(t.pct * 100)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/8 pt-5 space-y-5">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Network Income</p>

              <SliderInput
                label="Pros You've Referred (team size)"
                value={teamSize}
                min={0} max={20} step={1}
                format={(v) => `${v} pros`}
                onChange={setTeamSize}
                color="#f59e0b"
              />

              {/* Network Level */}
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-3">Network Activity Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {NETWORK_LEVELS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNetworkLevelId(n.id)}
                      className="flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-xl border-2 text-center transition-all"
                      style={{
                        borderColor: networkLevelId === n.id ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.08)",
                        backgroundColor: networkLevelId === n.id ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <span className="text-xs font-bold" style={{ color: networkLevelId === n.id ? "#f59e0b" : "rgba(255,255,255,0.6)" }}>{n.label}</span>
                      <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{n.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="space-y-5">
            {/* Total monthly hero */}
            <div
              className="rounded-2xl p-6 border relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.12) 0%, rgba(45,212,191,0.04) 100%)", borderColor: "rgba(45,212,191,0.3)" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #2dd4bf, transparent)", transform: "translate(40%,-40%)" }}
              />
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Total Monthly Income</p>
              <p className="text-5xl font-bold text-white mb-1 transition-all duration-300">{fmt(calc.totalMonthly)}</p>
              <p className="text-sm text-teal-400/70">{fmt(calc.annualProjection)} / year</p>
              {calc.uplift > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(45,212,191,0.15)", color: "#2dd4bf" }}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {fmt(calc.uplift)} / mo more than alternatives
                </div>
              )}
            </div>

            {/* Breakdown cards */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Own Jobs" value={fmt(calc.ownJobEarnings)} sub={`${Math.round(tier.pct * 100)}% keep`} color="#2dd4bf" />
              <StatCard label="Net Override" value={fmt(calc.networkOverride)} sub="from team jobs" color="#f59e0b" />
              <StatCard label="Sub Override" value={fmt(calc.subscriptionOverride)} sub="from referrals" color="#a78bfa" />
            </div>

            {/* Chart */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-4 h-4 text-white/30" />
                <p className="text-sm font-semibold text-white/50">Monthly Keep: ProLnk vs. Alternatives</p>
              </div>
              <BarChart data={barData} />
              <p className="text-xs text-center mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                Based on published platform rates. Your results depend on market, job type, and activity.
              </p>
            </div>

            {/* Detailed breakdown toggle */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-white/50 hover:text-white transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Detailed Breakdown
                </span>
                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showBreakdown && (
                <div className="px-5 pb-5 space-y-2 pt-2" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  {[
                    { label: "Gross job revenue", value: fmtSimple(calc.grossJobRevenue), note: `${jobsPerMonth} jobs × ${fmtSimple(avgJobValue)}` },
                    { label: `Commission (${Math.round(tier.pct * 100)}% — ${tier.id})`, value: fmtSimple(calc.ownJobEarnings), color: "#2dd4bf" },
                    { label: `Network override (${teamSize} pros × 7% per job)`, value: fmtSimple(calc.networkOverride), color: "#f59e0b" },
                    { label: `Subscription override (${Math.round(SUBSCRIPTION_OVERRIDE_PCT * 100)}% × $${SUBSCRIPTION_MONTHLY_FEE}/mo)`, value: fmtSimple(calc.subscriptionOverride), color: "#a78bfa" },
                    { label: "Without ProLnk (avg competitor ~28%)", value: fmtSimple(calc.withoutProlnk), color: "#ef4444" },
                    { label: "Monthly uplift", value: `+${fmtSimple(calc.uplift)} (+${calc.upliftPct}%)`, color: "#2dd4bf" },
                  ].map(({ label, value, note, color }) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-xs text-white/45">{label}</p>
                        {note && <p className="text-xs text-white/25 mt-0.5">{note}</p>}
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: color ?? "rgba(255,255,255,0.8)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Annual CTA */}
            <div className="rounded-2xl p-5 border text-center" style={{ backgroundColor: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.2)" }}>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Annual Projection</p>
              <p className="text-4xl font-bold text-white mb-1 transition-all duration-300">{fmt(calc.annualProjection)}</p>
              <p className="text-xs text-white/35 mb-5">vs. {fmt(calc.withoutProlnk * 12)}/yr on other platforms</p>
              <Link href="/pro-waitlist">
                <button className="flex items-center justify-center gap-2 mx-auto px-8 py-3.5 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90" style={{ backgroundColor: "#2dd4bf" }}>
                  Join and Start Earning <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                Founding member spots limited · $149/mo locked forever
              </p>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Star, label: "Founding Rate", sub: "Locked forever" },
                { icon: Award, label: "No contracts", sub: "Cancel anytime" },
                { icon: Users, label: "5 income streams", sub: "Built to scale" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="rounded-xl p-3 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <Icon className="w-4 h-4 mx-auto mb-1.5 text-white/30" />
                  <p className="text-xs font-semibold text-white/55">{label}</p>
                  <p className="text-xs text-white/25">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center mt-12" style={{ color: "rgba(255,255,255,0.2)" }}>
          Projections are estimates based on published platform rates. Actual earnings depend on your market, job type, and activity level. Network override rates reflect Founding Tier cascade structure.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t text-center py-8 text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
        &copy; 2026 ProLnk &mdash; Growth Calculator &mdash;{" "}
        <Link href="/pro-waitlist">
          <span className="text-teal-400/60 hover:text-teal-400 cursor-pointer">Join the Founding Waitlist</span>
        </Link>
      </div>
    </div>
  );
}
