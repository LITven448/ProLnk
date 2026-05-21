import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, GitBranch, TrendingUp, Award, Clock, Zap,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { trpc } from "@/lib/trpc";

// Founding tier definitions
const TIERS = [
  {
    name: "Charter",
    capacity: 25,
    color: "#f59e0b",
    colorDim: "#f59e0b33",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    description: "Founding circle — original 25 visionaries",
    multiplier: "Each Charter can build a downline of 2,100 pros",
    monthlyFee: 149,
    networkDepth: 4,
  },
  {
    name: "Founding",
    capacity: 100,
    color: "#8b5cf6",
    colorDim: "#8b5cf633",
    badge: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    description: "First 100 beyond Charter",
    multiplier: "Each Founding can build a downline of 84 pros",
    monthlyFee: 149,
    networkDepth: 3,
  },
  {
    name: "L3",
    capacity: 400,
    color: "#06b6d4",
    colorDim: "#06b6d433",
    badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    description: "Third-level network builders",
    multiplier: "Each L3 can build a downline of 4 pros",
    monthlyFee: 149,
    networkDepth: 2,
  },
  {
    name: "L4",
    capacity: 1600,
    color: "#22c55e",
    colorDim: "#22c55e33",
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
    description: "Ground-floor network members",
    multiplier: "Entry point to the founding network",
    monthlyFee: 149,
    networkDepth: 1,
  },
];

const TOTAL_CAPACITY = TIERS.reduce((s, t) => s + t.capacity, 0);

// Mock day-over-day velocity (last 7 days)
const VELOCITY_DATA = [
  { day: "Mon", signups: 3, referrals: 1 },
  { day: "Tue", signups: 7, referrals: 3 },
  { day: "Wed", signups: 5, referrals: 2 },
  { day: "Thu", signups: 12, referrals: 5 },
  { day: "Fri", signups: 9, referrals: 4 },
  { day: "Sat", signups: 14, referrals: 7 },
  { day: "Sun", signups: 6, referrals: 2 },
];

export default function NetworkGrowthDashboard() {
  const signupsQuery = trpc.admin?.getWaitlistSignups?.useQuery(undefined, {
    retry: false,
  });

  const rawSignups: any[] = signupsQuery?.data ?? [];

  const stats = useMemo(() => {
    const total = rawSignups.length;

    const byReferrals = [...rawSignups].sort(
      (a, b) => (b.referralCount ?? 0) - (a.referralCount ?? 0)
    ).slice(0, 5);

    let chartFilled = 0;
    let founding = 0;
    let l3 = 0;
    let l4 = 0;

    rawSignups.forEach(s => {
      if (chartFilled < 25) { chartFilled++; }
      else if (founding < 100) { founding++; }
      else if (l3 < 400) { l3++; }
      else { l4++; }
    });

    const tierFills = [chartFilled, founding, l3, Math.min(l4, 1600)];
    return { total, byReferrals, tierFills };
  }, [rawSignups]);

  const totalFilled = stats.tierFills.reduce((s, n) => s + n, 0);
  const pctFull = Math.round((totalFilled / TOTAL_CAPACITY) * 100);
  const spotsLeft = TOTAL_CAPACITY - totalFilled;

  const today7DaySignups = VELOCITY_DATA.reduce((s, d) => s + d.signups, 0);
  const avgDaily = Math.round(today7DaySignups / 7);
  const daysToFull = spotsLeft > 0 && avgDaily > 0 ? Math.ceil(spotsLeft / avgDaily) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <GitBranch className="text-violet-400" size={24} />
              Network Growth Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Founding tier fill rates, recruiting velocity, and top builders</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 px-3 py-1">
              {totalFilled.toLocaleString()} / {TOTAL_CAPACITY.toLocaleString()} filled
            </Badge>
            <Badge className={`px-3 py-1 ${spotsLeft <= 100 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-gray-700 text-gray-300 border-gray-600"}`}>
              {spotsLeft.toLocaleString()} spots left
            </Badge>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Waitlist", value: (rawSignups.length ?? 0).toLocaleString(), icon: <Users size={16} className="text-blue-400" />, sub: "Pro applicants" },
            { label: "Founding Slots Filled", value: `${pctFull}%`, icon: <Award size={16} className="text-amber-400" />, sub: `${totalFilled} of ${TOTAL_CAPACITY}` },
            { label: "7-Day Signups", value: today7DaySignups.toLocaleString(), icon: <TrendingUp size={16} className="text-green-400" />, sub: `~${avgDaily}/day avg` },
            { label: "Est. Days to Full", value: daysToFull > 0 ? `${daysToFull}d` : "Live", icon: <Clock size={16} className="text-teal-400" />, sub: "at current pace" },
          ].map(k => (
            <Card key={k.label} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-1">{k.icon}<p className="text-gray-400 text-xs uppercase tracking-wide">{k.label}</p></div>
                <p className="text-2xl font-bold text-white">{k.value}</p>
                <p className="text-gray-500 text-xs mt-1">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tier Tree Visualization */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <GitBranch size={16} className="text-violet-400" />
              Founding Network — Tier Fill
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {TIERS.map((tier, i) => {
              const filled = stats.tierFills[i] ?? 0;
              const pct = Math.round((filled / tier.capacity) * 100);
              const remaining = tier.capacity - filled;
              return (
                <div key={tier.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={`${tier.badge} text-xs px-2 py-0.5`}>{tier.name}</Badge>
                      <span className="text-sm text-gray-300">{tier.description}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">{filled} / {tier.capacity}</span>
                      <span className={`font-bold ${remaining === 0 ? "text-green-400" : remaining <= 5 ? "text-red-400" : "text-white"}`}>
                        {remaining === 0 ? "FULL" : `${remaining} left`}
                      </span>
                      <span className="text-gray-500 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${tier.color}99, ${tier.color})`,
                        boxShadow: pct > 0 ? `0 0 8px ${tier.color}66` : undefined,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{tier.multiplier}</p>
                </div>
              );
            })}

            {/* Overall */}
            <div className="pt-2 border-t border-gray-800">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300 font-medium">Overall network fill</span>
                <span className="text-white font-bold">{pctFull}% — {totalFilled.toLocaleString()} of {TOTAL_CAPACITY.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all"
                  style={{
                    width: `${pctFull}%`,
                    background: "linear-gradient(90deg, #f59e0b, #8b5cf6, #06b6d4, #22c55e)",
                    boxShadow: "0 0 12px #8b5cf655",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Multiplier Effect */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              Network Multiplier Effect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TIERS.map((tier, i) => {
                const filled = stats.tierFills[i] ?? 0;
                const potentialDownline =
                  tier.name === "Charter" ? 2100 :
                  tier.name === "Founding" ? 84 :
                  tier.name === "L3" ? 4 : 1;
                const totalPotential = filled * potentialDownline;
                return (
                  <div key={tier.name} className="rounded-lg border p-4 text-center" style={{ borderColor: `${tier.color}40`, background: tier.colorDim }}>
                    <Badge className={`${tier.badge} mb-2 text-xs`}>{tier.name}</Badge>
                    <p className="text-2xl font-bold text-white">{filled}</p>
                    <p className="text-xs text-gray-400">members filled</p>
                    <p className="text-sm font-bold mt-2" style={{ color: tier.color }}>
                      {totalPotential.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">max downline potential</p>
                    <p className="text-xs text-gray-500 mt-1">×{potentialDownline}/member</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recruiting Velocity */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <TrendingUp size={16} className="text-green-400" />
                Recruiting Velocity — This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={VELOCITY_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
                  <Bar dataKey="signups" name="New Signups" fill="#22c55e" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="referrals" name="Via Referral" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Recruiters */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                Top Recruiters Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.byReferrals.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Referral data will populate as signups come in
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.byReferrals.map((s, idx) => (
                    <div key={s.id ?? idx} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? "bg-amber-500 text-white" :
                        idx === 1 ? "bg-gray-400 text-white" :
                        idx === 2 ? "bg-amber-700 text-white" :
                        "bg-gray-700 text-gray-400"
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">
                          {s.name ?? s.email?.split("@")[0] ?? "Partner"}
                        </p>
                        <p className="text-xs text-gray-400">{s.trade ?? "Pro"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">{s.referralCount ?? 0}</p>
                        <p className="text-xs text-gray-500">referrals</p>
                      </div>
                      <div className="w-24 bg-gray-800 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-green-500"
                          style={{ width: `${Math.min(((s.referralCount ?? 0) / Math.max(stats.byReferrals[0]?.referralCount ?? 1, 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Avg referrals/member</p>
                  <p className="text-white font-bold">
                    {rawSignups.length > 0
                      ? (rawSignups.reduce((s, r) => s + (r.referralCount ?? 0), 0) / rawSignups.length).toFixed(1)
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Referred signups (total)</p>
                  <p className="text-white font-bold">
                    {rawSignups.reduce((s, r) => s + (r.referralCount ?? 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waitlist Close Alert */}
        <Card className="border border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Award size={20} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold text-sm">Founding Network Closing Condition</p>
                <p className="text-gray-400 text-sm mt-1">
                  Waitlist closes when <strong className="text-white">500 pro applications</strong> and{" "}
                  <strong className="text-white">5,000 homes</strong> are registered — whichever comes first.
                  Currently at <strong className="text-amber-400">{rawSignups.length} pros</strong>.
                  {rawSignups.length >= 500 ? " Threshold reached — close the waitlist." : ` ${500 - rawSignups.length} pros to go.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
