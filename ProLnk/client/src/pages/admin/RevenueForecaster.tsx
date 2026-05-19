import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp, DollarSign, Target, Zap, BarChart3, ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine, Area, AreaChart, BarChart, Bar,
} from "recharts";

const MONTHLY_FEE = 149;
const BREAKEVEN_PROS = 500;

function calcMRR(pros: number): number {
  return pros * MONTHLY_FEE;
}

function calcJobCommission(pros: number): number {
  const avgJobsPerProPerMonth = 8;
  const avgJobValue = 450;
  const avgCommissionRate = 0.18;
  return Math.round(pros * avgJobsPerProPerMonth * avgJobValue * avgCommissionRate * 0.15);
}

function buildGrowthProjection(targetPros: number): { month: string; pros: number; subMRR: number; jobMRR: number; total: number }[] {
  const months: { month: string; pros: number; subMRR: number; jobMRR: number; total: number }[] = [];
  const now = new Date(2026, 4, 1);
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  for (let i = 0; i <= 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const label = `${monthNames[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`;

    let pros: number;
    if (i <= 3) {
      pros = Math.round(targetPros * 0.1 * (i / 3));
    } else if (i <= 12) {
      const linear = targetPros * 0.1 + (targetPros * 0.5 - targetPros * 0.1) * ((i - 3) / 9);
      pros = Math.round(linear);
    } else {
      const exp = targetPros * 0.5 * Math.pow(targetPros / 500, (i - 12) / 12);
      pros = Math.min(Math.round(exp), targetPros * 2);
    }

    const subMRR = calcMRR(pros);
    const jobMRR = calcJobCommission(pros);
    months.push({ month: label, pros, subMRR, jobMRR, total: subMRR + jobMRR });
  }
  return months;
}

const TIER_BENCHMARKS = [
  { pros: 500,   label: "Break-even",   subMRR: 74500,   jobMRR: 0,      desc: "Operating costs covered" },
  { pros: 2125,  label: "All Founding", subMRR: 316525,  jobMRR: 45000,  desc: "Full founding tier filled" },
  { pros: 5000,  label: "Scale",        subMRR: 745000,  jobMRR: 180000, desc: "Mid-market penetration" },
  { pros: 10000, label: "Leader",       subMRR: 1490000, jobMRR: 520000, desc: "Regional dominance" },
];

const CURRENT_MRR = 0;
const MONTHLY_BURN = 18000;

export default function RevenueForecaster() {
  const [proCount, setProCount] = useState(500);
  const [cashBalance, setCashBalance] = useState(85000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(18000);

  const subMRR = calcMRR(proCount);
  const jobMRR = calcJobCommission(proCount);
  const totalMRR = subMRR + jobMRR;

  const runwayMonths = monthlyExpenses > 0 ? Math.floor(cashBalance / monthlyExpenses) : 999;
  const spotsToBreakeven = Math.max(0, BREAKEVEN_PROS - proCount);

  const projection = useMemo(() => buildGrowthProjection(proCount), [proCount]);

  const breakEvenMonthIndex = projection.findIndex(m => m.pros >= BREAKEVEN_PROS);
  const breakEvenLabel = breakEvenMonthIndex >= 0 ? projection[breakEvenMonthIndex].month : "24+ mo";

  const fmtK = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` :
    n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K` : `$${n}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs">
        <p className="text-gray-400 mb-1″>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {fmtK(p.value)}</p>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6″>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <TrendingUp className="text-green-400″ size={24} />
              Revenue Forecaster
            </h1>
            <p className="text-gray-400 text-sm mt-1″>Model MRR projections based on founding member growth</p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1″>
            Live Model
          </Badge>
        </div>

        {/* Current MRR Meter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4″>
          <Card className="bg-gray-900 border-gray-800″>
            <CardContent className="pt-5″>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1″>Current MRR</p>
              <p className="text-3xl font-bold text-white">{fmtK(CURRENT_MRR)}</p>
              <p className="text-gray-500 text-xs mt-1″>Waitlist phase — subscriptions pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800″>
            <CardContent className="pt-5″>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1″>Modeled Sub MRR</p>
              <p className="text-3xl font-bold text-green-400″>{fmtK(subMRR)}</p>
              <p className="text-gray-500 text-xs mt-1″>at {proCount.toLocaleString()} pros × $149/mo</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800″>
            <CardContent className="pt-5″>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1″>Modeled Job Rev</p>
              <p className="text-3xl font-bold text-teal-400″>{fmtK(jobMRR)}</p>
              <p className="text-gray-500 text-xs mt-1″>Commission override on completed jobs</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800″>
            <CardContent className="pt-5″>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1″>Total MRR</p>
              <p className="text-3xl font-bold text-white">{fmtK(totalMRR)}</p>
              <p className="text-gray-500 text-xs mt-1 flex items-center gap-1″>
                <ArrowUpRight size={12} className="text-green-400″ />
                {Math.round((totalMRR / Math.max(MONTHLY_BURN, 1)) * 100)}% of burn covered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Slider */}
        <Card className="bg-gray-900 border-gray-800″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <Target size={16} className="text-green-400″ />
              Founding Member Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div>
              <div className="flex justify-between text-sm mb-2″>
                <span className="text-gray-400″>Pros on platform</span>
                <span className="text-white font-bold text-lg">{proCount.toLocaleString()} pros</span>
              </div>
              <Slider
                min={0}
                max={2125}
                step={25}
                value={[proCount]}
                onValueChange={([v]) => setProCount(v)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1″>
                <span>0</span>
                <span className="text-yellow-400″>500 → break-even</span>
                <span className="text-green-400″>2,125 → all founding</span>
              </div>
            </div>

            {/* Tier Benchmarks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2″>
              {TIER_BENCHMARKS.map(t => (
                <button
                  key={t.pros}
                  onClick={() => setProCount(t.pros)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    proCount === t.pros
                      ? "border-green-500 bg-green-500/10″
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600″
                  }`}
                >
                  <p className="text-xs text-gray-400″>{t.label}</p>
                  <p className="text-sm font-bold text-white">{t.pros.toLocaleString()} pros</p>
                  <p className="text-xs text-green-400″>{fmtK(t.subMRR + t.jobMRR)}/mo</p>
                  <p className="text-xs text-gray-500 mt-1″>{t.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Projection Chart */}
        <Card className="bg-gray-900 border-gray-800″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <BarChart3 size={16} className="text-teal-400″ />
              24-Month MRR Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={projection} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="subGrad" x1="0″ y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="jobGrad" x1="0″ y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6″ stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6″ stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3″ stroke="#1f2937" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280″, fontSize: 11 }} interval={3} />
                <YAxis tick={{ fill: "#6b7280″, fontSize: 11 }} tickFormatter={v => fmtK(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
                {breakEvenMonthIndex >= 0 && (
                  <ReferenceLine
                    x={projection[breakEvenMonthIndex].month}
                    stroke="#eab308″
                    strokeDasharray="4 4″
                    label={{ value: "Break-even", fill: "#eab308″, fontSize: 11 }}
                  />
                )}
                <Area type="monotone" dataKey="subMRR" name="Subscription MRR" stroke="#22c55e" fill="url(#subGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="jobMRR" name="Job Commission" stroke="#14b8a6″ fill="url(#jobGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6″>
          {/* Break-even Analysis */}
          <Card className="bg-gray-900 border-gray-800″>
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2″>
                <Target size={16} className="text-yellow-400″ />
                Break-even Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4″>
              <div className="bg-gray-800 rounded-lg p-4″>
                <div className="flex justify-between mb-2″>
                  <span className="text-gray-400 text-sm">Break-even threshold</span>
                  <span className="text-yellow-400 font-bold">{BREAKEVEN_PROS} pros</span>
                </div>
                <div className="flex justify-between mb-2″>
                  <span className="text-gray-400 text-sm">Current model count</span>
                  <span className="text-white font-bold">{proCount.toLocaleString()} pros</span>
                </div>
                <div className="flex justify-between mb-3″>
                  <span className="text-gray-400 text-sm">Spots to break-even</span>
                  <span className={`font-bold ${spotsToBreakeven === 0 ? "text-green-400" : "text-red-400"}`}>
                    {spotsToBreakeven === 0 ? "✓ Achieved" : `-${spotsToBreakeven} spots`}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2″>
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all"
                    style={{ width: `${Math.min((proCount / BREAKEVEN_PROS) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  {Math.min(Math.round((proCount / BREAKEVEN_PROS) * 100), 100)}% of break-even
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-yellow-300″>
                Projected break-even month: <strong>{breakEvenLabel}</strong> based on current scenario
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400″>Monthly burn rate</span>
                  <span className="text-white">{fmtK(MONTHLY_BURN)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400″>MRR at {BREAKEVEN_PROS} pros</span>
                  <span className="text-green-400″>{fmtK(calcMRR(BREAKEVEN_PROS))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400″>Net margin (at scale)</span>
                  <span className="text-green-400″>85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Runway Calculator */}
          <Card className="bg-gray-900 border-gray-800″>
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2″>
                <DollarSign size={16} className="text-teal-400″ />
                Runway Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4″>
              <div className="space-y-3″>
                <div>
                  <Label className="text-gray-400 text-xs">Cash Balance</Label>
                  <Input
                    type="number"
                    value={cashBalance}
                    onChange={e => setCashBalance(Number(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white mt-1″
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-xs">Monthly Expenses</Label>
                  <Input
                    type="number"
                    value={monthlyExpenses}
                    onChange={e => setMonthlyExpenses(Number(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white mt-1″
                  />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 space-y-3″>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Cash runway</span>
                  <span className={`font-bold text-lg ${runwayMonths >= 12 ? "text-green-400" : runwayMonths >= 6 ? "text-yellow-400" : "text-red-400"}`}>
                    {runwayMonths >= 999 ? "∞" : `${runwayMonths} months`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">MRR offsets burn by</span>
                  <span className="text-teal-400 font-bold">
                    {Math.min(Math.round((totalMRR / Math.max(monthlyExpenses, 1)) * 100), 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Net monthly cash need</span>
                  <span className={`font-bold ${monthlyExpenses - totalMRR <= 0 ? "text-green-400" : "text-white"}`}>
                    {monthlyExpenses - totalMRR <= 0 ? "Profitable" : fmtK(monthlyExpenses - totalMRR)}
                  </span>
                </div>
              </div>
              <div className={`rounded-lg p-3 text-xs border ${
                runwayMonths >= 18 ? "bg-green-500/10 border-green-500/20 text-green-300″ :
                runwayMonths >= 9 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-300″ :
                "bg-red-500/10 border-red-500/20 text-red-300″
              }`}>
                {runwayMonths >= 18
                  ? "Healthy runway — focus on growth"
                  : runwayMonths >= 9
                  ? "Moderate runway — accelerate pro signups"
                  : "Critical — raise capital or reduce burn immediately"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <Card className="bg-gray-900 border-gray-800″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <Zap size={16} className="text-purple-400″ />
              Revenue Mix — Today vs. Scale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6″>
              <div>
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Today (waitlist phase)</p>
                <div className="space-y-2″>
                  {[
                    { label: "Subscription revenue", pct: 100, color: "bg-green-500″ },
                    { label: "Job commission revenue", pct: 0, color: "bg-teal-500″ },
                  ].map(r => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1″>
                        <span className="text-gray-300″>{r.label}</span>
                        <span className="text-white">{r.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2″>
                        <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">At scale ({proCount.toLocaleString()} pros)</p>
                <div className="space-y-2″>
                  {[
                    { label: "Subscription revenue", pct: Math.round((subMRR / Math.max(totalMRR, 1)) * 100), color: "bg-green-500″ },
                    { label: "Job commission revenue", pct: Math.round((jobMRR / Math.max(totalMRR, 1)) * 100), color: "bg-teal-500″ },
                  ].map(r => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1″>
                        <span className="text-gray-300″>{r.label}</span>
                        <span className="text-white">{r.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2″>
                        <div className={`h-2 rounded-full ${r.color} transition-all`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
