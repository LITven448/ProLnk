import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Slider } from "@/components/ui/slider";
import { DollarSign, TrendingUp, Zap, Users, Calculator, Info, Network, Home, RefreshCw } from "lucide-react";

const TIERS = [
  { id: "t1", label: "Tier 1",  subtitle: "New",        color: "#64748b", keepRate: 0.12, minMatches: 0,   minLabel: "Starting" },
  { id: "t2", label: "Tier 2",  subtitle: "10 matches", color: "#0891b2", keepRate: 0.20, minMatches: 10,  minLabel: "10 matches" },
  { id: "t3", label: "Tier 3",  subtitle: "50 matches", color: "#6366f1", keepRate: 0.35, minMatches: 50,  minLabel: "50 matches" },
  { id: "t4", label: "Tier 4",  subtitle: "100 matches",color: "#d97706", keepRate: 0.50, minMatches: 100, minLabel: "100 matches" },
  { id: "t5", label: "Tier 5",  subtitle: "500 matches",color: "#16a34a", keepRate: 0.70, minMatches: 500, minLabel: "500 matches" },
];

const OVERRIDE_RATES = [0.01, 0.005, 0.0025, 0.001];

const JOB_CATEGORIES = [
  { label: "HVAC",              avg: 850  },
  { label: "Roofing",           avg: 8500 },
  { label: "Plumbing",          avg: 600  },
  { label: "Electrical",        avg: 750  },
  { label: "Pest Control",      avg: 350  },
  { label: "Landscaping",       avg: 1200 },
  { label: "Foundation Repair", avg: 6500 },
  { label: "Painting",          avg: 3200 },
];

const SUBSCRIPTION_FEE = 149;
const PRO_SUBSCRIPTION = 199;
const SUBSCRIPTION_OVERRIDE_RATE = 0.10;

export default function CommissionCalculator() {
  const [tierIdx, setTierIdx]               = useState(0);
  const [jobsPerMonth, setJobsPerMonth]     = useState(10);
  const [avgJobValue, setAvgJobValue]       = useState(1200);
  const [l1ProCount, setL1ProCount]         = useState(5);
  const [l2ProCount, setL2ProCount]         = useState(10);
  const [homeownerLeads, setHomeownerLeads] = useState(3);
  const [leadFee, setLeadFee]               = useState(50);
  const [selectedCat, setSelectedCat]       = useState<string | null>(null);

  const tier = TIERS[tierIdx];

  const calc = useMemo(() => {
    const stream1 = jobsPerMonth * avgJobValue * tier.keepRate;

    const l1Override = l1ProCount * avgJobValue * OVERRIDE_RATES[0] * jobsPerMonth;
    const l2Override = l2ProCount * avgJobValue * OVERRIDE_RATES[1] * jobsPerMonth;
    const stream2 = l1Override + l2Override;

    const l1Sub = l1ProCount * PRO_SUBSCRIPTION * SUBSCRIPTION_OVERRIDE_RATE;
    const stream3 = l1Sub;

    const stream4 = homeownerLeads * leadFee;

    const stream5 = 0;

    const total = stream1 + stream2 + stream3 + stream4 + stream5;
    const annual = total * 12;

    return { stream1, stream2, stream3, stream4, stream5, l1Override, l2Override, l1Sub, total, annual };
  }, [tier, jobsPerMonth, avgJobValue, l1ProCount, l2ProCount, homeownerLeads, leadFee]);

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n).toLocaleString()}`;

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#00B5B8]" />
            5-Stream Commission Calculator
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            ProLnk pays across 5 income streams. Adjust sliders to project your total monthly earnings.
          </p>
        </div>

        {/* Tier selector */}
        <div className="bg-card border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Commission Tier</p>
          <div className="grid grid-cols-5 gap-2">
            {TIERS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTierIdx(i)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                  i === tierIdx
                    ? "border-[#00B5B8] bg-[#00B5B8]/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-[#00B5B8]/50"
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                {t.label}
                <span className="text-[10px] text-muted-foreground">{(t.keepRate * 100).toFixed(0)}% keep</span>
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

        {/* Stream 1 — Direct Jobs */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00B5B8]/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#00B5B8]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 1 — Direct Job Commission</p>
              <p className="text-xs text-muted-foreground">You keep {(tier.keepRate * 100).toFixed(0)}% of every matched job value</p>
            </div>
            <span className="ml-auto text-base font-bold text-[#00B5B8]">{fmt(calc.stream1)}/mo</span>
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
                  onClick={() => { setAvgJobValue(cat.avg); setSelectedCat(cat.label); }}
                  className={`px-2 py-1 rounded-full text-[10px] border transition-colors ${
                    selectedCat === cat.label
                      ? "bg-[#00B5B8]/10 border-[#00B5B8] text-[#00B5B8]"
                      : "border-border text-muted-foreground hover:border-[#00B5B8]/50"
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
        </div>

        {/* Stream 2 — Network Overrides */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
              <Network className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 2 — Network Job Override</p>
              <p className="text-xs text-muted-foreground">Earn 1% on L1, 0.5% on L2 of their job earnings</p>
            </div>
            <span className="ml-auto text-base font-bold text-purple-500">{fmt(calc.stream2)}/mo</span>
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
          <div className="text-xs text-muted-foreground">
            L1: {l1ProCount} pros × ${avgJobValue.toLocaleString()} × {jobsPerMonth} jobs × 1% = {fmt(calc.l1Override)}&nbsp;&nbsp;
            L2: {l2ProCount} pros × ${avgJobValue.toLocaleString()} × {jobsPerMonth} jobs × 0.5% = {fmt(calc.l2Override)}
          </div>
        </div>

        {/* Stream 3 — Subscription Override */}
        <div className="bg-card border rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 3 — Subscription Override</p>
              <p className="text-xs text-muted-foreground">10% of your L1 recruits' $199/mo platform fee = $19.90/pro/mo</p>
            </div>
            <span className="ml-auto text-base font-bold text-green-500">{fmt(calc.stream3)}/mo</span>
          </div>
          <p className="text-xs text-muted-foreground pl-9">
            {l1ProCount} L1 pros × $199 × 10% = {fmt(calc.l1Sub)}/mo recurring
          </p>
        </div>

        {/* Stream 4 — Homeowner Override */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <Home className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Stream 4 — Homeowner Lead Referral</p>
              <p className="text-xs text-muted-foreground">Per-lead fee for homeowners you source</p>
            </div>
            <span className="ml-auto text-base font-bold text-amber-500">{fmt(calc.stream4)}/mo</span>
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

        {/* Total */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Monthly Total",    value: fmt(calc.total),  sub: "All 5 streams combined",    icon: TrendingUp, color: "text-green-500",    bg: "bg-green-50" },
            { label: "Annual Projection",value: fmt(calc.annual), sub: `${tier.label} tier, ${jobsPerMonth * 12} jobs/yr`, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
          ].map(card => (
            <div key={card.label} className="bg-card border rounded-xl p-5 space-y-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <p className="text-[10px] text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        {tierIdx < TIERS.length - 1 && (
          <div className="bg-gradient-to-r from-[#0A1628] to-[#0d2040] rounded-xl p-5 text-white space-y-2">
            <p className="text-sm font-semibold">Upgrade to {TIERS[tierIdx + 1].label}</p>
            <p className="text-xs text-white/70">
              At {TIERS[tierIdx + 1].label} ({(TIERS[tierIdx + 1].keepRate * 100).toFixed(0)}% keep rate), your monthly Stream 1 alone would be{" "}
              <strong className="text-[#00B5B8]">
                {fmt(jobsPerMonth * avgJobValue * TIERS[tierIdx + 1].keepRate)}
              </strong>
              {" "}— {fmt(jobsPerMonth * avgJobValue * (TIERS[tierIdx + 1].keepRate - tier.keepRate))} more per month.
            </p>
            <a href="/dashboard/tier" className="inline-flex items-center gap-1 text-xs text-[#00B5B8] hover:text-[#00B5B8]/80 font-medium mt-1">
              View tier requirements <Zap className="w-3 h-3" />
            </a>
          </div>
        )}

        <div className="bg-card border rounded-xl p-4">
          <p className="text-xs font-semibold text-foreground mb-2">Stream Breakdown</p>
          {[
            { label: "Stream 1: Direct Commission", value: calc.stream1, color: "#00B5B8" },
            { label: "Stream 2: Network Overrides",  value: calc.stream2, color: "#8b5cf6" },
            { label: "Stream 3: Sub Overrides",      value: calc.stream3, color: "#22c55e" },
            { label: "Stream 4: Homeowner Leads",    value: calc.stream4, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 py-1.5">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{fmt(s.value)}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${calc.total > 0 ? (s.value / calc.total) * 100 : 0}%`, background: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Estimates only. Actual earnings depend on job values, conversion rates, and your network activity.
          Stream 5 (Home Origination Rights) not shown — contact ProLnk for origination details.
        </p>
      </div>
    </PartnerLayout>
  );
}
