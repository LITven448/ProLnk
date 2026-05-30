import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Slider } from "@/components/ui/slider";
import {
  DollarSign, TrendingUp, Zap, Users, Calculator, Info, Network,
  Home, RefreshCw, Share2, Copy, Check, BarChart2, ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  { id: "t1", label: "Tier 1",  subtitle: "New",         color: "#64748b", keepRate: 0.12, minMatches: 0,   minLabel: "Starting" },
  { id: "t2", label: "Tier 2",  subtitle: "10 matches",  color: "#0891b2", keepRate: 0.20, minMatches: 10,  minLabel: "10 matches" },
  { id: "t3", label: "Tier 3",  subtitle: "50 matches",  color: "#6366f1", keepRate: 0.35, minMatches: 50,  minLabel: "50 matches" },
  { id: "t4", label: "Tier 4",  subtitle: "100 matches", color: "#d97706", keepRate: 0.50, minMatches: 100, minLabel: "100 matches" },
  { id: "t5", label: "Tier 5",  subtitle: "500 matches", color: "#16a34a", keepRate: 0.70, minMatches: 500, minLabel: "500 matches" },
];

const OVERRIDE_RATES = [0.01, 0.005, 0.0025, 0.001];

const JOB_CATEGORIES = [
  { label: "HVAC",              avg: 850,  poolPct: 0.12 },
  { label: "Roofing",           avg: 8500, poolPct: 0.10 },
  { label: "Plumbing",          avg: 600,  poolPct: 0.12 },
  { label: "Electrical",        avg: 750,  poolPct: 0.12 },
  { label: "Pest Control",      avg: 350,  poolPct: 0.15 },
  { label: "Landscaping",       avg: 1200, poolPct: 0.10 },
  { label: "Foundation Repair", avg: 6500, poolPct: 0.08 },
  { label: "Painting",          avg: 3200, poolPct: 0.10 },
];

const SUBSCRIPTION_FEE = 149;
const PRO_SUBSCRIPTION = 199;
const SUBSCRIPTION_OVERRIDE_RATE = 0.10;
const INDUSTRY_REFERRAL_RATE = 0.275;

export default function CommissionCalculator() {
  const [tierIdx, setTierIdx]               = useState(0);
  const [jobsPerMonth, setJobsPerMonth]     = useState(10);
  const [avgJobValue, setAvgJobValue]       = useState(1200);
  const [l1ProCount, setL1ProCount]         = useState(5);
  const [l2ProCount, setL2ProCount]         = useState(10);
  const [homeownerLeads, setHomeownerLeads] = useState(3);
  const [leadFee, setLeadFee]               = useState(50);
  const [selectedCat, setSelectedCat]       = useState<string | null>(null);
  const [simJobValue, setSimJobValue]       = useState(2500);
  const [simPoolPct, setSimPoolPct]         = useState(0.12);
  const [copied, setCopied]                 = useState(false);

  const tier = TIERS[tierIdx];

  const calc = useMemo(() => {
    const stream1 = jobsPerMonth * avgJobValue * tier.keepRate;
    const l1Override = l1ProCount * avgJobValue * OVERRIDE_RATES[0] * jobsPerMonth;
    const l2Override = l2ProCount * avgJobValue * OVERRIDE_RATES[1] * jobsPerMonth;
    const stream2 = l1Override + l2Override;
    const l1Sub = l1ProCount * PRO_SUBSCRIPTION * SUBSCRIPTION_OVERRIDE_RATE;
    const stream3 = l1Sub;
    const stream4 = homeownerLeads * leadFee;
    const total = stream1 + stream2 + stream3 + stream4;
    const annual = total * 12;
    return { stream1, stream2, stream3, stream4, l1Override, l2Override, l1Sub, total, annual };
  }, [tier, jobsPerMonth, avgJobValue, l1ProCount, l2ProCount, homeownerLeads, leadFee]);

  const sim = useMemo(() => {
    const pool = simJobValue * simPoolPct;
    const yourCut = pool * tier.keepRate;
    const prolnkFee = pool * (1 - tier.keepRate);
    const networkOverride = pool * 0.07;
    const industryFee = simJobValue * INDUSTRY_REFERRAL_RATE;
    const savings = industryFee - prolnkFee;
    return { pool, yourCut, prolnkFee, networkOverride, industryFee, savings };
  }, [simJobValue, simPoolPct, tier]);

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n).toLocaleString()}`;

  const handleShare = () => {
    const params = new URLSearchParams({
      tier: String(tierIdx),
      jobs: String(jobsPerMonth),
      avg: String(avgJobValue),
      l1: String(l1ProCount),
      l2: String(l2ProCount),
    });
    const url = `${window.location.origin}/commission-calculator?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calculator className="w-6 h-6 text-teal-400" />
              5-Stream Commission Calculator
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              ProLnk pays across 5 income streams. Adjust sliders to project your total monthly earnings.
            </p>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-sm text-slate-300 hover:border-teal-400/50 hover:text-teal-400 transition-all shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Tier selector */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Commission Tier</p>
          <div className="grid grid-cols-5 gap-2">
            {TIERS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTierIdx(i)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                  i === tierIdx
                    ? "border-teal-400 bg-teal-400/10 text-foreground"
                    : "border-slate-600 text-muted-foreground hover:border-teal-400/50"
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                {t.label}
                <span className="text-[10px] text-muted-foreground">{(t.keepRate * 100).toFixed(0)}%</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              Unlocks at: <strong className="text-foreground">{tier.minLabel}</strong>
            </span>
            <span>
              You keep: <strong className="text-foreground">{(tier.keepRate * 100).toFixed(0)}% of job value</strong>
            </span>
          </div>
        </div>

        {/* ── Live Job Simulator ── */}
        <div className="bg-slate-800 border border-teal-400/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 bg-teal-400/5 border-b border-teal-400/20 flex items-center gap-2">
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-teal-400">Live Job Simulator</span>
            <span className="ml-auto text-xs text-slate-500">Enter a single job — see exactly how the money splits</span>
          </div>
          <div className="p-5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-muted-foreground">Job Value</label>
                  <span className="font-bold text-white">${simJobValue.toLocaleString()}</span>
                </div>
                <Slider min={200} max={20000} step={100} value={[simJobValue]}
                  onValueChange={([v]) => setSimJobValue(v)} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-muted-foreground">Commission Pool %</label>
                  <span className="font-bold text-white">{(simPoolPct * 100).toFixed(0)}%</span>
                </div>
                <Slider min={0.03} max={0.15} step={0.01} value={[simPoolPct]}
                  onValueChange={([v]) => setSimPoolPct(v)} />
                <div className="flex flex-wrap gap-1.5">
                  {[3, 8, 10, 12, 15].map(p => (
                    <button key={p}
                      onClick={() => setSimPoolPct(p / 100)}
                      className={`px-2 py-0.5 rounded-full text-[10px] border transition-colors ${
                        simPoolPct === p / 100
                          ? "bg-teal-400/10 border-teal-400 text-teal-400"
                          : "border-slate-600 text-slate-500 hover:border-teal-400/50"
                      }`}>
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Breakdown rows */}
            <div className="rounded-xl overflow-hidden border border-slate-700 divide-y divide-slate-700">
              {[
                { label: "Commission pool", sub: `${(simPoolPct * 100).toFixed(0)}% of job value`, value: sim.pool, color: "text-slate-300", note: "" },
                { label: "Your cut", sub: `${(tier.keepRate * 100).toFixed(0)}% of pool (${tier.label})`, value: sim.yourCut, color: "text-teal-400", note: "→ direct earnings" },
                { label: "ProLnk platform fee", sub: `${((1 - tier.keepRate) * 100).toFixed(0)}% of pool`, value: sim.prolnkFee, color: "text-slate-500", note: "→ platform operations" },
                { label: "Network override (L1 upline)", sub: "7% of pool flows up to your sponsor", value: sim.networkOverride, color: "text-indigo-400", note: "→ passive to upline" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3 bg-slate-900/40">
                  <div>
                    <div className="text-sm font-medium text-slate-200">{row.label}</div>
                    <div className="text-xs text-slate-500">{row.sub}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-bold ${row.color}`}>{fmt(row.value)}</div>
                    {row.note && <div className="text-[10px] text-slate-600">{row.note}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Industry comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-4">
                <div className="text-xs text-red-400 font-semibold mb-1">Industry Average</div>
                <div className="text-2xl font-black text-red-400">{fmt(sim.industryFee)}</div>
                <div className="text-xs text-slate-500 mt-1">27.5% referral fee on full job value</div>
              </div>
              <div className="bg-teal-950/40 border border-teal-700/40 rounded-xl p-4">
                <div className="text-xs text-teal-400 font-semibold mb-1">Your ProLnk Fee</div>
                <div className="text-2xl font-black text-teal-400">{fmt(sim.prolnkFee)}</div>
                <div className="text-xs text-slate-500 mt-1">
                  Save <span className="text-teal-400 font-bold">{fmt(sim.savings)}</span> vs industry
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stream 1 — Direct Jobs */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-400/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 1 — Direct Job Commission</p>
              <p className="text-xs text-muted-foreground">You keep {(tier.keepRate * 100).toFixed(0)}% of every matched job value</p>
            </div>
            <span className="ml-auto text-base font-bold text-teal-400">{fmt(calc.stream1)}/mo</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-muted-foreground">Average Job Value</label>
              <span className="font-bold">${avgJobValue.toLocaleString()}</span>
            </div>
            <Slider min={200} max={15000} step={100} value={[avgJobValue]}
              onValueChange={([v]) => { setAvgJobValue(v); setSelectedCat(null); }} />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {JOB_CATEGORIES.map(cat => (
                <button key={cat.label}
                  onClick={() => { setAvgJobValue(cat.avg); setSelectedCat(cat.label); setSimJobValue(cat.avg); setSimPoolPct(cat.poolPct); }}
                  className={`px-2 py-1 rounded-full text-[10px] border transition-colors ${
                    selectedCat === cat.label
                      ? "bg-teal-400/10 border-teal-400 text-teal-400"
                      : "border-slate-600 text-muted-foreground hover:border-teal-400/50"
                  }`}>
                  {cat.label} (${cat.avg >= 1000 ? `${(cat.avg/1000).toFixed(1)}k` : cat.avg})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-muted-foreground">Jobs per Month</label>
              <span className="font-bold">{jobsPerMonth} jobs</span>
            </div>
            <Slider min={1} max={100} step={1} value={[jobsPerMonth]}
              onValueChange={([v]) => setJobsPerMonth(v)} />
          </div>

          {/* Monthly scenario builder */}
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" /> Monthly Scenario Builder
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Conservative", jobs: Math.max(1, Math.floor(jobsPerMonth * 0.5)), color: "text-slate-400" },
                { label: "Expected",     jobs: jobsPerMonth,                                color: "text-teal-400" },
                { label: "Optimistic",   jobs: Math.floor(jobsPerMonth * 1.75),             color: "text-green-400" },
              ].map(s => (
                <div key={s.label} className="bg-slate-800 rounded-lg p-3">
                  <div className={`text-xs font-semibold mb-1 ${s.color}`}>{s.label}</div>
                  <div className="text-xs text-slate-500 mb-2">{s.jobs} jobs/mo</div>
                  <div className={`text-sm font-bold ${s.color}`}>
                    {fmt(s.jobs * avgJobValue * tier.keepRate)}/mo
                  </div>
                  <div className="text-[10px] text-slate-600">
                    {fmt(s.jobs * avgJobValue * tier.keepRate * 12)}/yr
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stream 2 — Network Overrides */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Network className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 2 — Network Job Override</p>
              <p className="text-xs text-muted-foreground">Earn 1% on L1, 0.5% on L2 of their job earnings</p>
            </div>
            <span className="ml-auto text-base font-bold text-purple-400">{fmt(calc.stream2)}/mo</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-muted-foreground">Level 1 Pros (direct recruits)</label>
              <span className="font-bold">{l1ProCount} pros</span>
            </div>
            <Slider min={0} max={100} step={1} value={[l1ProCount]}
              onValueChange={([v]) => setL1ProCount(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-muted-foreground">Level 2 Pros (their recruits)</label>
              <span className="font-bold">{l2ProCount} pros</span>
            </div>
            <Slider min={0} max={200} step={5} value={[l2ProCount]}
              onValueChange={([v]) => setL2ProCount(v)} />
          </div>
          <div className="text-xs text-muted-foreground bg-slate-900/60 rounded-lg px-3 py-2">
            L1: {l1ProCount} pros × ${avgJobValue.toLocaleString()} × {jobsPerMonth} jobs × 1% = <strong className="text-slate-200">{fmt(calc.l1Override)}</strong>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            L2: {l2ProCount} pros × ${avgJobValue.toLocaleString()} × {jobsPerMonth} jobs × 0.5% = <strong className="text-slate-200">{fmt(calc.l2Override)}</strong>
          </div>
        </div>

        {/* Stream 3 — Subscription Override */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 3 — Subscription Override</p>
              <p className="text-xs text-muted-foreground">10% of your L1 recruits' $199/mo platform fee = $19.90/pro/mo</p>
            </div>
            <span className="ml-auto text-base font-bold text-green-400">{fmt(calc.stream3)}/mo</span>
          </div>
          <p className="text-xs text-muted-foreground pl-9">
            {l1ProCount} L1 pros × $199 × 10% = <strong className="text-slate-200">{fmt(calc.l1Sub)}/mo recurring</strong>
          </p>
        </div>

        {/* Stream 4 — Homeowner Override */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Home className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 4 — Homeowner Lead Referral</p>
              <p className="text-xs text-muted-foreground">Per-lead fee for homeowners you source</p>
            </div>
            <span className="ml-auto text-base font-bold text-amber-400">{fmt(calc.stream4)}/mo</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-muted-foreground">Leads/Month</label>
                <span className="font-bold">{homeownerLeads}</span>
              </div>
              <Slider min={0} max={50} step={1} value={[homeownerLeads]}
                onValueChange={([v]) => setHomeownerLeads(v)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-muted-foreground">Fee per Lead</label>
                <span className="font-bold">${leadFee}</span>
              </div>
              <Slider min={25} max={150} step={5} value={[leadFee]}
                onValueChange={([v]) => setLeadFee(v)} />
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Monthly Total",     value: fmt(calc.total),  sub: "All 5 streams combined",               icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Annual Projection", value: fmt(calc.annual), sub: `${tier.label} · ${jobsPerMonth * 12} jobs/yr`, icon: Zap,        color: "text-yellow-400", bg: "bg-yellow-500/10" },
          ].map(card => (
            <div key={card.label} className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs font-medium text-slate-400">{card.label}</p>
              <p className="text-[10px] text-slate-500">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* ProLnk vs Industry side-by-side */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-foreground">You on ProLnk vs. Industry Average</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-700">
            <div className="p-5 bg-red-950/20">
              <div className="text-xs font-semibold text-red-400 mb-3">Industry Average</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Referral fee</span>
                  <span className="text-red-400 font-bold">25–30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly to platform</span>
                  <span className="text-slate-300 font-bold">{fmt(jobsPerMonth * avgJobValue * INDUSTRY_REFERRAL_RATE)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Passive income</span>
                  <span className="text-slate-500 font-bold">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rate locked?</span>
                  <span className="text-red-400 font-bold">No</span>
                </div>
              </div>
            </div>
            <div className="p-5 bg-teal-950/20">
              <div className="text-xs font-semibold text-teal-400 mb-3">ProLnk Founding</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">You keep</span>
                  <span className="text-teal-400 font-bold">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Your earnings</span>
                  <span className="text-teal-400 font-bold">{fmt(calc.stream1)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Passive income</span>
                  <span className="text-teal-400 font-bold">{fmt(calc.stream2 + calc.stream3)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rate locked?</span>
                  <span className="text-teal-400 font-bold">Forever</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 bg-teal-500/5 border-t border-teal-500/20 text-xs text-teal-300 font-medium">
            ProLnk saves you{" "}
            <strong>
              {fmt(Math.max(0, jobsPerMonth * avgJobValue * INDUSTRY_REFERRAL_RATE - (jobsPerMonth * avgJobValue * (1 - tier.keepRate) * simPoolPct)))}
            </strong>{" "}
            per month in platform fees vs. the industry average.
          </div>
        </div>

        {/* Tier upgrade nudge */}
        {tierIdx < TIERS.length - 1 && (
          <div className="bg-gradient-to-r from-[#0A1628] to-[#0d2040] border border-teal-400/20 rounded-xl p-5 text-white space-y-2">
            <p className="text-sm font-semibold">Upgrade to {TIERS[tierIdx + 1].label}</p>
            <p className="text-xs text-white/70">
              At {TIERS[tierIdx + 1].label} ({(TIERS[tierIdx + 1].keepRate * 100).toFixed(0)}% keep rate), your Stream 1 alone would be{" "}
              <strong className="text-teal-400">
                {fmt(jobsPerMonth * avgJobValue * TIERS[tierIdx + 1].keepRate)}
              </strong>
              {" "}— {fmt(jobsPerMonth * avgJobValue * (TIERS[tierIdx + 1].keepRate - tier.keepRate))} more per month.
            </p>
            <Link href="/dashboard/tier" className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-medium mt-1">
              View tier requirements <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Stream breakdown bar */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <p className="text-xs font-semibold text-foreground mb-3">Stream Breakdown</p>
          {[
            { label: "Stream 1: Direct Commission", value: calc.stream1, color: "#2dd4bf" },
            { label: "Stream 2: Network Overrides",  value: calc.stream2, color: "#a78bfa" },
            { label: "Stream 3: Sub Overrides",      value: calc.stream3, color: "#4ade80" },
            { label: "Stream 4: Homeowner Leads",    value: calc.stream4, color: "#fbbf24" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 py-1.5">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{fmt(s.value)}</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${calc.total > 0 ? (s.value / calc.total) * 100 : 0}%`, background: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Estimates only. Actual earnings depend on job values, conversion rates, and network activity.
          Stream 5 (Home Origination Rights) not shown — contact ProLnk for origination details.
        </p>
      </div>
    </PartnerLayout>
  );
}
