import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Calendar, Target, ArrowUp, ArrowDown } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";
import { trpc } from "@/lib/trpc";

// Historical monthly data (last 12 months)
const HISTORICAL = [
  { month: "May '25", gmv: 42000, fees: 4200, commissions: 3800, partners: 18 },
  { month: "Jun '25", gmv: 48000, fees: 4800, commissions: 4320, partners: 21 },
  { month: "Jul '25", gmv: 55000, fees: 5500, commissions: 4950, partners: 24 },
  { month: "Aug '25", gmv: 61000, fees: 6100, commissions: 5490, partners: 27 },
  { month: "Sep '25", gmv: 58000, fees: 5800, commissions: 5220, partners: 29 },
  { month: "Oct '25", gmv: 67000, fees: 6700, commissions: 6030, partners: 32 },
  { month: "Nov '25", gmv: 72000, fees: 7200, commissions: 6480, partners: 35 },
  { month: "Dec '25", gmv: 65000, fees: 6500, commissions: 5850, partners: 36 },
  { month: "Jan '26", gmv: 58000, fees: 5800, commissions: 5220, partners: 37 },
  { month: "Feb '26", gmv: 63000, fees: 6300, commissions: 5670, partners: 39 },
  { month: "Mar '26", gmv: 78000, fees: 7800, commissions: 7020, partners: 42 },
  { month: "Apr '26", gmv: 85000, fees: 8500, commissions: 7650, partners: 45 },
];

// Seasonal multipliers by month (0=Jan)
const SEASONAL = [0.82, 0.85, 1.10, 1.20, 1.25, 1.30, 1.20, 1.15, 1.10, 1.05, 0.90, 0.85];

function projectNext3Months(lastGmv: number, partnerGrowthRate: number, scenario: string) {
  const multipliers = { conservative: 0.95, base: 1.0, optimistic: 1.08 };
  const mult = multipliers[scenario as keyof typeof multipliers] || 1.0;
  const months = ["May '26", "Jun '26", "Jul '26"];
  return months.map((month, i) => {
    const seasonalIdx = (4 + i) % 12; // May=4, Jun=5, Jul=6
    const seasonal = SEASONAL[seasonalIdx];
    const growth = Math.pow(1 + partnerGrowthRate / 100, i + 1);
    const gmv = Math.round(lastGmv * seasonal * growth * mult);
    return {
      month,
      gmv,
      fees: Math.round(gmv * 0.10),
      commissions: Math.round(gmv * 0.09),
      projected: true,
    };
  });
}

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export default function RevenueForecast() {
  const [scenario, setScenario] = useState("base");
  const [growthRate, setGrowthRate] = useState(8);

  const lastGmv = HISTORICAL[HISTORICAL.length - 1].gmv;
  const projected = useMemo(() => projectNext3Months(lastGmv, growthRate, scenario), [lastGmv, growthRate, scenario]);

  const chartData = [
    ...HISTORICAL.map(h => ({ ...h, projected: false })),
    ...projected,
  ];

  const totalProjectedGmv = projected.reduce((s, p) => s + p.gmv, 0);
  const totalProjectedFees = projected.reduce((s, p) => s + p.fees, 0);
  const currentQuarterGmv = HISTORICAL.slice(-3).reduce((s, h) => s + h.gmv, 0);
  const qoqGrowth = ((totalProjectedGmv - currentQuarterGmv) / currentQuarterGmv) * 100;

  const scenarioColors = { conservative: "#94A3B8", base: "#6366F1", optimistic: "#22C55E" };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Revenue Forecast</h1>
            <p className="text-slate-500 text-sm mt-1">90-day GMV projection based on historical trends and partner growth</p>
          </div>
          <div className="flex gap-3">
            <Select value={scenario} onValueChange={setScenario}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="base">Base Case</SelectItem>
                <SelectItem value="optimistic">Optimistic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={String(growthRate)} onValueChange={v => setGrowthRate(Number(v))}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4% Partner Growth/mo</SelectItem>
                <SelectItem value="6">6% Partner Growth/mo</SelectItem>
                <SelectItem value="8">8% Partner Growth/mo</SelectItem>
                <SelectItem value="12">12% Partner Growth/mo</SelectItem>
                <SelectItem value="15">15% Partner Growth/mo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="text-xs text-slate-500 mb-1">Current Month GMV</div>
              <div className="text-2xl font-bold text-slate-800">{formatCurrency(lastGmv)}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> +8.9% vs last month
              </div>
            </CardContent>
          </Card>
          <Card className="border-indigo-200">
            <CardContent className="pt-4">
              <div className="text-xs text-slate-500 mb-1">Projected Q2 GMV</div>
              <div className="text-2xl font-bold text-indigo-700">{formatCurrency(totalProjectedGmv)}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${qoqGrowth >= 0 ? "text-green-600" : "text-red-500"}`}>
                {qoqGrowth >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {qoqGrowth >= 0 ? "+" : ""}{qoqGrowth.toFixed(1)}% QoQ
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-xs text-slate-500 mb-1">Projected Q2 Platform Fees</div>
              <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalProjectedFees)}</div>
              <div className="text-xs text-slate-400 mt-1">10% platform fee rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-xs text-slate-500 mb-1">Scenario</div>
              <Badge
                className={`text-sm px-3 py-1 ${
                  scenario === "optimistic" ? "bg-green-100 text-green-700" :
                  scenario === "conservative" ? "bg-slate-100 text-slate-600" :
                  "bg-indigo-100 text-indigo-700"
                }`}
              >
                {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
              </Badge>
              <div className="text-xs text-slate-400 mt-1">{growthRate}% monthly partner growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> GMV Trend & 90-Day Forecast
              <span className="ml-auto text-xs text-slate-400 font-normal">Dashed = projected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => `$${v / 1000}K`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="gmv"
                    stroke="#6366F1"
                    strokeWidth={2}
                    fill="url(#gmvGrad)"
                    name="GMV"
                  />
                  <Line
                    type="monotone"
                    dataKey="fees"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={false}
                    name="Platform Fees"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Projection Table */}
        <Card>
          <CardHeader><CardTitle className="text-base">90-Day Projection Detail</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 text-xs font-semibold text-slate-500 uppercase">Month</th>
                  <th className="text-right p-2 text-xs font-semibold text-slate-500 uppercase">GMV</th>
                  <th className="text-right p-2 text-xs font-semibold text-slate-500 uppercase">Platform Fees</th>
                  <th className="text-right p-2 text-xs font-semibold text-slate-500 uppercase">Commissions Paid</th>
                  <th className="text-right p-2 text-xs font-semibold text-slate-500 uppercase">Net Revenue</th>
                </tr>
              </thead>
              <tbody>
                {projected.map(p => (
                  <tr key={p.month} className="border-b hover:bg-slate-50">
                    <td className="p-2 font-medium text-indigo-700">{p.month} <Badge className="ml-1 text-xs bg-indigo-50 text-indigo-600">Projected</Badge></td>
                    <td className="p-2 text-right font-semibold">{formatCurrency(p.gmv)}</td>
                    <td className="p-2 text-right text-green-600">{formatCurrency(p.fees)}</td>
                    <td className="p-2 text-right text-amber-600">{formatCurrency(p.commissions)}</td>
                    <td className="p-2 text-right font-bold text-slate-800">{formatCurrency(p.fees - Math.round(p.commissions * 0.1))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
