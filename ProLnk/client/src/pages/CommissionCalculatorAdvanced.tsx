import { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, Users, Calculator, Network,
  RefreshCw, ArrowRight, ChevronDown, ChevronUp, Zap, Check,
} from "lucide-react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";

const CHARTER_TIERS = [
  { id: "charter",  label: "Charter",  color: "#f59e0b", keepRate: 0.72, jobOverride: 0.07, subOverride: 0.12 },
  { id: "founding", label: "Founding", color: "#0891b2″, keepRate: 0.72, jobOverride: 0.07, subOverride: 0.12 },
  { id: "l3″,       label: "L3",       color: "#6366f1", keepRate: 0.72, jobOverride: 0.07, subOverride: 0.12 },
  { id: "l4″,       label: "L4",       color: "#16a34a", keepRate: 0.72, jobOverride: 0.07, subOverride: 0.12 },
];

const SUB_FEE = 149;
const MONTHLY_SUB = 149;

function fmt(n: number) {
  if (n >= 10000) return `$${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `$${(n / 1000).toFixed(2).replace(/\.?0+$/, "")}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

export default function CommissionCalculatorAdvanced() {
  const [tierIdx, setTierIdx]             = useState(1);
  const [jobs, setJobs]                   = useState(8);
  const [avgJob, setAvgJob]               = useState(3500);
  const [recruits, setRecruits]           = useState(5);
  const [recruitEarnings, setRecruitEarnings] = useState(2500);
  const [showHowTo, setShowHowTo]         = useState(false);

  const tier = CHARTER_TIERS[tierIdx];

  const calc = useMemo(() => {
    const s1 = jobs * avgJob * tier.keepRate;
    const s2 = recruits * recruitEarnings * tier.jobOverride;
    const s3 = recruits * MONTHLY_SUB * tier.subOverride;
    const total = s1 + s2 + s3;
    return { s1, s2, s3, total, annual: total * 12 };
  }, [tier, jobs, avgJob, recruits, recruitEarnings]);

  const tierComparisons = useMemo(() =>
    CHARTER_TIERS.map((t) => {
      const s1 = jobs * avgJob * t.keepRate;
      const s2 = recruits * recruitEarnings * t.jobOverride;
      const s3 = recruits * MONTHLY_SUB * t.subOverride;
      return { ...t, total: s1 + s2 + s3 };
    }),
    [jobs, avgJob, recruits, recruitEarnings]
  );

  const streams = [
    {
      label: "Stream 1 — Job Commission",
      sub: `${jobs} jobs × ${fmt(avgJob)} × ${(tier.keepRate * 100).toFixed(0)}%`,
      value: calc.s1,
      color: "#2dd4bf",
      icon: DollarSign,
    },
    {
      label: "Stream 2 — Network Override",
      sub: `${recruits} recruits × ${fmt(recruitEarnings)} × ${(tier.jobOverride * 100).toFixed(0)}%`,
      value: calc.s2,
      color: "#a78bfa",
      icon: Network,
    },
    {
      label: "Stream 3 — Subscription Override",
      sub: `${recruits} recruits × $${MONTHLY_SUB} × ${(tier.subOverride * 100).toFixed(0)}%`,
      value: calc.s3,
      color: "#34d399″,
      icon: RefreshCw,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8″>

        {/* Header */}
        <div className="text-center space-y-2″>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-400/5 text-teal-400 text-xs font-semibold mb-2″>
            <Calculator className="w-3.5 h-3.5″ /> Commission Calculator
          </div>
          <h1 className="text-4xl font-black tracking-tight">See exactly how much you can earn</h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Adjust the sliders to project your income across all 3 active commission streams.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6″>

          {/* LEFT — Scenario Builder */}
          <div className="space-y-5″>

            {/* Tier selector */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-4″>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Partner Tier</p>
              <div className="grid grid-cols-4 gap-2″>
                {CHARTER_TIERS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTierIdx(i)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-semibold transition-all ${
                      i === tierIdx
                        ? "border-teal-400 bg-teal-400/10 text-white"
                        : "border-slate-600 text-slate-400 hover:border-slate-500″
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500″>All founding tiers lock in $149/mo and 72% job keep rate.</p>
            </div>

            {/* Monthly jobs */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-3″>
              <div className="flex items-center gap-2″>
                <DollarSign className="w-4 h-4 text-teal-400″ />
                <span className="text-sm font-semibold">Job Volume</span>
              </div>
              <div className="space-y-3″>
                <div>
                  <div className="flex justify-between text-sm mb-1.5″>
                    <span className="text-slate-400″>Monthly jobs</span>
                    <span className="font-bold text-teal-400″>{jobs} jobs</span>
                  </div>
                  <Slider min={1} max={30} step={1} value={[jobs]} onValueChange={([v]) => setJobs(v)} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5″>
                    <span className="text-slate-400″>Average job value</span>
                    <span className="font-bold text-teal-400″>{fmt(avgJob)}</span>
                  </div>
                  <Slider min={500} max={20000} step={250} value={[avgJob]} onValueChange={([v]) => setAvgJob(v)} />
                  <div className="flex gap-1.5 mt-2″>
                    {[1000, 2500, 5000, 10000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAvgJob(v)}
                        className={`px-2 py-0.5 rounded-full text-[10px] border transition-colors ${
                          avgJob === v
                            ? "border-teal-400 bg-teal-400/10 text-teal-400″
                            : "border-slate-600 text-slate-500 hover:border-slate-500″
                        }`}
                      >
                        {fmt(v)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Network size */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-3″>
              <div className="flex items-center gap-2″>
                <Users className="w-4 h-4 text-purple-400″ />
                <span className="text-sm font-semibold">Your Network</span>
              </div>
              <div className="space-y-3″>
                <div>
                  <div className="flex justify-between text-sm mb-1.5″>
                    <span className="text-slate-400″>Direct recruits</span>
                    <span className="font-bold text-purple-400″>{recruits} partners</span>
                  </div>
                  <Slider min={0} max={50} step={1} value={[recruits]} onValueChange={([v]) => setRecruits(v)} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5″>
                    <span className="text-slate-400″>Avg recruit monthly earnings</span>
                    <span className="font-bold text-purple-400″>{fmt(recruitEarnings)}</span>
                  </div>
                  <Slider min={1000} max={10000} step={250} value={[recruitEarnings]} onValueChange={([v]) => setRecruitEarnings(v)} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Live Results */}
          <div className="space-y-5″>

            {/* Total callout */}
            <div className="bg-gradient-to-br from-teal-900/40 to-[#0A1628] border border-teal-400/30 rounded-2xl p-6 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1″>Total Monthly Earnings</p>
              <p className="text-6xl font-black text-teal-400 tracking-tight">{fmt(calc.total)}</p>
              <p className="text-slate-400 text-sm mt-1″>per month</p>
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-center gap-8″>
                <div>
                  <p className="text-xs text-slate-500″>Annual</p>
                  <p className="text-2xl font-black text-white">{fmt(calc.annual)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500″>Daily avg</p>
                  <p className="text-2xl font-black text-white">{fmt(calc.total / 30)}</p>
                </div>
              </div>
            </div>

            {/* Stream breakdown */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-3″>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Income Breakdown</p>
              {streams.map((s) => (
                <div key={s.label} className="space-y-1.5″>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2″>
                      <s.icon className="w-3.5 h-3.5″ style={{ color: s.color }} />
                      <span className="font-medium">{s.label}</span>
                    </div>
                    <span className="font-bold" style={{ color: s.color }}>{fmt(s.value)}/mo</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-5″>{s.sub}</p>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500″
                      style={{
                        width: `${calc.total > 0 ? Math.max(2, (s.value / calc.total) * 100) : 0}%`,
                        background: s.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tier comparison */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-3″>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your earnings by tier (same inputs)</p>
              {tierComparisons.map((t, i) => (
                <div
                  key={t.id}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    i === tierIdx ? "border border-teal-400/50 bg-teal-400/5″ : "border border-slate-700/50 bg-slate-900/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5″>
                    {i === tierIdx && <Check className="w-3.5 h-3.5 text-teal-400″ />}
                    {i !== tierIdx && <span className="w-3.5 h-3.5″ />}
                    <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="text-sm font-medium">{t.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${i === tierIdx ? "text-teal-400" : "text-slate-300"}`}>
                      {fmt(t.total)}/mo
                    </span>
                    <p className="text-[10px] text-slate-500″>{fmt(t.total * 12)}/yr</p>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-slate-600″>All founding tiers share the same commission rates — locked in for life.</p>
            </div>
          </div>
        </div>

        {/* How to reach $5k section */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center gap-2″>
              <Zap className="w-4 h-4 text-yellow-400″ />
              <span className="text-sm font-bold">How to reach $5,000/month</span>
            </div>
            {showHowTo ? <ChevronUp className="w-4 h-4 text-slate-400″ /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {showHowTo && (
            <div className="px-6 pb-6 space-y-3″>
              {[
                {
                  step: "1″,
                  title: "Complete 10 jobs/month at $3,500 avg",
                  value: fmt(10 * 3500 * 0.72),
                  color: "text-teal-400″,
                  desc: "That's 72% of $35,000 in job volume — your direct commission.",
                },
                {
                  step: "2″,
                  title: "Recruit 8 active partners",
                  value: fmt(8 * 2500 * 0.07),
                  color: "text-purple-400″,
                  desc: "7% override on their earnings flows passively every month.",
                },
                {
                  step: "3″,
                  title: "Collect subscription overrides",
                  value: fmt(8 * 149 * 0.12),
                  color: "text-green-400″,
                  desc: "12% of each partner's $149/mo subscription — recurring every month.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 bg-slate-900/50 rounded-xl p-4″>
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5″>
                    {s.step}
                  </div>
                  <div className="flex-1″>
                    <div className="flex items-center justify-between mb-1″>
                      <span className="text-sm font-semibold">{s.title}</span>
                      <span className={`text-sm font-bold ${s.color}`}>{s.value}/mo</span>
                    </div>
                    <p className="text-xs text-slate-500″>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 py-4″>
          <p className="text-slate-400 text-sm">
            Ready to start earning? Founding partner spots are limited.
          </p>
          <Link href="/apply">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-400 text-[#0A1628] font-bold text-base hover:bg-teal-300 transition-colors">
              Claim Your Spot <ArrowRight className="w-5 h-5″ />
            </button>
          </Link>
          <p className="text-xs text-slate-600″>
            Estimates only. Actual earnings depend on job volume, network activity, and market conditions.
          </p>
        </div>

      </div>
    </div>
  );
}
