import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

const TIERS = [
  { name: "Starter", min: 0, max: 4, color: "#6B7280", commission: 0.05 },
  { name: "Silver", min: 5, max: 14, color: "#94A3B8", commission: 0.07 },
  { name: "Gold", min: 15, max: 29, color: "#F59E0B", commission: 0.09 },
  { name: "Platinum", min: 30, max: 999, color: "#8B5CF6", commission: 0.12 },
];

function getTier(referrals: number) {
  return TIERS.find(t => referrals >= t.min && referrals <= t.max) || TIERS[0];
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function GrowthCalculator() {
  const { user } = useAuth();
  const [referralsPerMonth, setReferralsPerMonth] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(2500);
  const [closeRate, setCloseRate] = useState(60);

  const tier = useMemo(() => getTier(referralsPerMonth), [referralsPerMonth]);
  const closedJobs = useMemo(() => Math.round(referralsPerMonth * (closeRate / 100)), [referralsPerMonth, closeRate]);
  const monthlyCommission = useMemo(() => closedJobs * avgJobValue * tier.commission, [closedJobs, avgJobValue, tier]);
  const annualCommission = useMemo(() => monthlyCommission * 12, [monthlyCommission]);

  const nextTier = useMemo(() => {
    const idx = TIERS.indexOf(tier);
    return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
  }, [tier]);

  const referralsToNextTier = useMemo(() => {
    if (!nextTier) return 0;
    return nextTier.min - referralsPerMonth;
  }, [nextTier, referralsPerMonth]);

  const nextTierBonus = useMemo(() => {
    if (!nextTier) return 0;
    return closedJobs * avgJobValue * (nextTier.commission - tier.commission) * 12;
  }, [nextTier, closedJobs, avgJobValue, tier]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Earnings Growth Calculator</h1>
          <p className="text-slate-400 mt-1">See exactly how much you can earn by growing your referral volume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Your Numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Referrals per month */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-300 font-medium">Referrals per month</label>
                    <span className="text-2xl font-bold text-white">{referralsPerMonth}</span>
                  </div>
                  <Slider
                    value={[referralsPerMonth]}
                    onValueChange={([v]) => setReferralsPerMonth(v)}
                    min={1}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1</span><span>30</span><span>60</span>
                  </div>
                </div>

                {/* Average job value */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-300 font-medium">Average job value</label>
                    <span className="text-2xl font-bold text-white">{formatCurrency(avgJobValue)}</span>
                  </div>
                  <Slider
                    value={[avgJobValue]}
                    onValueChange={([v]) => setAvgJobValue(v)}
                    min={500}
                    max={15000}
                    step={250}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$500</span><span>$7,500</span><span>$15,000</span>
                  </div>
                </div>

                {/* Close rate */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-300 font-medium">Close rate (% of referrals that become jobs)</label>
                    <span className="text-2xl font-bold text-white">{closeRate}%</span>
                  </div>
                  <Slider
                    value={[closeRate]}
                    onValueChange={([v]) => setCloseRate(v)}
                    min={10}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>10%</span><span>55%</span><span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier Progression */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Tier Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {TIERS.map(t => (
                    <div
                      key={t.name}
                      className={`p-3 rounded-lg text-center border-2 transition-all ${
                        t.name === tier.name
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-slate-700 bg-slate-800/30"
                      }`}
                    >
                      <div className="text-xs font-bold mb-1" style={{ color: t.color }}>{t.name}</div>
                      <div className="text-lg font-bold text-white">{(t.commission * 100).toFixed(0)}%</div>
                      <div className="text-xs text-slate-500">{t.min}+ refs</div>
                    </div>
                  ))}
                </div>
                {nextTier && referralsToNextTier > 0 && (
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-amber-400 text-sm font-medium">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Add {referralsToNextTier} more referral{referralsToNextTier > 1 ? "s" : ""}/month to reach{" "}
                      <strong>{nextTier.name}</strong> tier and earn an extra{" "}
                      <strong>{formatCurrency(nextTierBonus)}/year</strong>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            {/* Current Tier */}
            <Card className="bg-gradient-to-br from-violet-600 to-violet-800 border-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge className="mb-2 bg-white/20 text-white border-0">{tier.name} Tier</Badge>
                  <div className="text-4xl font-bold text-white">{(tier.commission * 100).toFixed(0)}%</div>
                  <div className="text-violet-200 text-sm">commission rate</div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Monthly Earnings</div>
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(monthlyCommission)}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {closedJobs} closed jobs × {formatCurrency(avgJobValue)} × {(tier.commission * 100).toFixed(0)}%
                </div>
              </CardContent>
            </Card>

            {/* Annual */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Annual Earnings</div>
                    <div className="text-2xl font-bold text-blue-400">{formatCurrency(annualCommission)}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Projected over 12 months</div>
              </CardContent>
            </Card>

            {/* Closed Jobs */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Closed Jobs/Month</div>
                    <div className="text-2xl font-bold text-amber-400">{closedJobs}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Link href="/dashboard/referrals">
              <div className="w-full p-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white text-center text-sm font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2">
                Start Referring Now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
