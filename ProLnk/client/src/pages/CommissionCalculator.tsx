/**
 * Partner Commission Calculator
 * Interactive what-if tool showing projected earnings based on tier, job size, and referral volume.
 * Wave 19 — autonomous build
 */
import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Zap, Users, Calculator, Info } from "lucide-react";

// ─── Commission rates by tier ─────────────────────────────────────────────────
const TIERS = [
  { id: "scout",      label: "Scout",      color: "#64748b", commRate: 0.10, refRate: 0.03, minJobs: 0 },
  { id: "pro",        label: "Pro",        color: "#0A1628", commRate: 0.12, refRate: 0.04, minJobs: 5 },
  { id: "crew",       label: "Crew",       color: "#6366f1", commRate: 0.14, refRate: 0.05, minJobs: 15 },
  { id: "company",    label: "Company",    color: "#d4af37", commRate: 0.15, refRate: 0.06, minJobs: 40 },
  { id: "enterprise", label: "Enterprise", color: "#94a3b8", commRate: 0.15, refRate: 0.07, minJobs: 100 },
];

const JOB_CATEGORIES = [
  { label: "HVAC Service",        avg: 850  },
  { label: "Roofing",             avg: 8500 },
  { label: "Plumbing",            avg: 600  },
  { label: "Electrical",          avg: 750  },
  { label: "Pest Control",        avg: 350  },
  { label: "Landscaping",         avg: 1200 },
  { label: "Pool Service",        avg: 450  },
  { label: "Foundation Repair",   avg: 6500 },
  { label: "Painting (Exterior)", avg: 3200 },
  { label: "Window Replacement",  avg: 4800 },
];

export default function CommissionCalculator() {
  const [tierIdx, setTierIdx] = useState(0);
  const [jobsPerMonth, setJobsPerMonth] = useState(10);
  const [avgJobValue, setAvgJobValue] = useState(1200);
  const [referralsPerMonth, setReferralsPerMonth] = useState(3);
  const [conversionRate, setConversionRate] = useState(40);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const tier = TIERS[tierIdx];

  const calc = useMemo(() => {
    const closedReferrals = Math.round(referralsPerMonth * (conversionRate / 100));
    const referralEarnings = closedReferrals * avgJobValue * tier.refRate;
    const commissionEarnings = jobsPerMonth * avgJobValue * tier.commRate;
    const totalMonthly = referralEarnings + commissionEarnings;
    const totalAnnual = totalMonthly * 12;
    const projectedJobs = jobsPerMonth * 12;
    return { closedReferrals, referralEarnings, commissionEarnings, totalMonthly, totalAnnual, projectedJobs };
  }, [tier, jobsPerMonth, avgJobValue, referralsPerMonth, conversionRate]);

  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n).toLocaleString()}`;

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#00B5B8]" />
            Commission Calculator
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Adjust the sliders to project your monthly and annual earnings at any tier.
          </p>
        </div>

        {/* Tier selector */}
        <div className="bg-card border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Tier</p>
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
                <span className="text-[10px] text-muted-foreground">{(t.commRate * 100).toFixed(0)}%</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              Commission rate: <strong className="text-foreground">{(tier.commRate * 100).toFixed(0)}%</strong>
            </span>
            <span>
              Referral rate: <strong className="text-foreground">{(tier.refRate * 100).toFixed(0)}%</strong>
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="bg-card border rounded-xl p-5 space-y-6">
          <p className="text-sm font-semibold text-foreground">Adjust Your Numbers</p>

          {/* Job category quick-select */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Average Job Value</label>
              <span className="text-sm font-bold text-foreground">${avgJobValue.toLocaleString()}</span>
            </div>
            <Slider
              min={200} max={15000} step={100}
              value={[avgJobValue]}
              onValueChange={([v]) => { setAvgJobValue(v); setSelectedCategory(null); }}
              className="w-full"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {JOB_CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => { setAvgJobValue(cat.avg); setSelectedCategory(cat.label); }}
                  className={`px-2 py-1 rounded-full text-[10px] border transition-colors ${
                    selectedCategory === cat.label
                      ? "bg-[#00B5B8]/10 border-[#00B5B8] text-[#00B5B8]"
                      : "border-border text-muted-foreground hover:border-[#00B5B8]/50"
                  }`}
                >
                  {cat.label} (${cat.avg >= 1000 ? `${(cat.avg/1000).toFixed(1)}k` : cat.avg})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Jobs Logged / Month</label>
              <span className="text-sm font-bold text-foreground">{jobsPerMonth} jobs</span>
            </div>
            <Slider
              min={1} max={100} step={1}
              value={[jobsPerMonth]}
              onValueChange={([v]) => setJobsPerMonth(v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Referrals Sent / Month</label>
              <span className="text-sm font-bold text-foreground">{referralsPerMonth} referrals</span>
            </div>
            <Slider
              min={0} max={50} step={1}
              value={[referralsPerMonth]}
              onValueChange={([v]) => setReferralsPerMonth(v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Referral Conversion Rate</label>
              <span className="text-sm font-bold text-foreground">{conversionRate}%</span>
            </div>
            <Slider
              min={5} max={90} step={5}
              value={[conversionRate]}
              onValueChange={([v]) => setConversionRate(v)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Commission Earnings", value: fmt(calc.commissionEarnings), sub: `${jobsPerMonth} jobs × ${fmt(avgJobValue)} × ${(tier.commRate*100).toFixed(0)}%`, icon: DollarSign, color: "text-[#00B5B8]", bg: "bg-[#00B5B8]/10" },
            { label: "Referral Earnings", value: fmt(calc.referralEarnings), sub: `${calc.closedReferrals} closed × ${fmt(avgJobValue)} × ${(tier.refRate*100).toFixed(0)}%`, icon: Users, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" },
            { label: "Monthly Total", value: fmt(calc.totalMonthly), sub: "Commission + Referrals", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" },
            { label: "Annual Projection", value: fmt(calc.totalAnnual), sub: `${calc.projectedJobs} jobs/yr at ${tier.label} tier`, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
          ].map(card => (
            <div key={card.label} className="bg-card border rounded-xl p-4 space-y-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <p className="text-[10px] text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Tier upgrade nudge */}
        {tierIdx < TIERS.length - 1 && (
          <div className="bg-gradient-to-r from-[#0A1628] to-[#0d2040] rounded-xl p-5 text-white space-y-2">
            <p className="text-sm font-semibold">Upgrade to {TIERS[tierIdx + 1].label} tier</p>
            <p className="text-xs text-white/70">
              At {TIERS[tierIdx + 1].label} tier ({(TIERS[tierIdx + 1].commRate * 100).toFixed(0)}% commission / {(TIERS[tierIdx + 1].refRate * 100).toFixed(0)}% referral),
              your monthly earnings would be{" "}
              <strong className="text-[#00B5B8]">
                {fmt((jobsPerMonth * avgJobValue * TIERS[tierIdx + 1].commRate) + (Math.round(referralsPerMonth * conversionRate / 100) * avgJobValue * TIERS[tierIdx + 1].refRate))}
              </strong>
              {" "}— that's{" "}
              <strong className="text-[#F5E642]">
                {fmt(((jobsPerMonth * avgJobValue * TIERS[tierIdx + 1].commRate) + (Math.round(referralsPerMonth * conversionRate / 100) * avgJobValue * TIERS[tierIdx + 1].refRate)) - calc.totalMonthly)} more per month
              </strong>.
            </p>
            <a href="/dashboard/tier" className="inline-flex items-center gap-1 text-xs text-[#00B5B8] hover:text-[#00B5B8]/80 font-medium mt-1">
              View tier requirements <Zap className="w-3 h-3" />
            </a>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Estimates based on current tier rates. Actual earnings depend on job values, partner tier, and conversion rates.
        </p>
      </div>
    </PartnerLayout>
  );
}
