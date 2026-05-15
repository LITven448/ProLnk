import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Home,
  MapPin,
  Bell,
  ArrowUpRight,
  Hammer,
  Bath,
  Thermometer,
  TreePine,
  School,
  Activity,
  Construction,
  BarChart2,
  CalendarCheck,
} from "lucide-react";

const VALUE_HISTORY = [
  { year: "2021", value: 392000 },
  { year: "2022", value: 418000 },
  { year: "2023", value: 445000 },
  { year: "2024", value: 471000 },
  { year: "2025", value: 485000 },
];

const ROI_IMPROVEMENTS = [
  { label: "Kitchen remodel", valueAdd: 18000, roi: 85, icon: Hammer, color: "#f59e0b" },
  { label: "Bathroom update", valueAdd: 12000, roi: 71, icon: Bath, color: "#0891b2" },
  { label: "New roof", valueAdd: 8000, roi: 61, icon: Home, color: "#10b981" },
  { label: "HVAC upgrade", valueAdd: 5000, roi: 54, icon: Thermometer, color: "#8b5cf6" },
  { label: "Landscaping", valueAdd: 4000, roi: 107, icon: TreePine, color: "#22c55e" },
];

const VALUE_FACTORS = [
  { label: "School district", detail: "Frisco ISD — Excellent", impact: "+5%", icon: School, positive: true },
  { label: "Recent sales nearby", detail: "12 sales in 90 days, trending up", impact: "+2.1%", icon: TrendingUp, positive: true },
  { label: "Infrastructure projects", detail: "I-380 expansion — connectivity boost", impact: "+1.4%", icon: Construction, positive: true },
  { label: "Market conditions", detail: "DFW growing — low inventory", impact: "+3.2%", icon: BarChart2, positive: true },
];

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

const fmtFull = (n: number) =>
  `$${n.toLocaleString()}`;

export default function HomeValueTracker() {
  const [alertValue, setAlertValue] = useState("500000");
  const [alertSet, setAlertSet] = useState(false);

  const handleSetAlert = () => {
    if (alertValue) setAlertSet(true);
  };

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-6 max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Home Value Tracker</h1>
          <p className="text-gray-400 mt-1">Watch your investment grow</p>
        </div>

        {/* Current Value Card */}
        <div className="bg-[#0F2035] rounded-2xl p-6 border border-[#1E3A5F]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Current estimated value</p>
              <p className="text-5xl font-bold text-white">{fmtFull(485000)}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">+$14,200 (3.0%) vs last year</span>
              </div>
              <p className="text-gray-500 text-xs mt-2">Estimated via ATTOM property data</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center min-w-[120px]">
              <Home className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-emerald-400 font-bold text-lg">+3.0%</p>
              <p className="text-gray-400 text-xs">YoY growth</p>
            </div>
          </div>
        </div>

        {/* Value History Chart */}
        <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
          <h2 className="text-white font-semibold mb-4">5-Year Value History</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={VALUE_HISTORY} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="year" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                tickFormatter={(v) => fmt(v)}
              />
              <Tooltip
                contentStyle={{ background: "#0F2035", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }}
                formatter={(v: number) => [fmtFull(v), "Est. Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0d9488"
                strokeWidth={2.5}
                fill="url(#valueGrad)"
                dot={{ fill: "#0d9488", r: 4 }}
                activeDot={{ r: 6, fill: "#14b8a6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Neighborhood Comparison */}
        <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-teal-400" />
            <h2 className="text-white font-semibold">Neighborhood Comparison</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Your home", value: "$485K", highlight: true },
              { label: "Neighborhood avg", value: "$472K", highlight: false },
              { label: "Frisco 75034 median", value: "$468K", highlight: false },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-xl p-3 text-center border ${s.highlight ? "bg-teal-500/10 border-teal-500/30" : "bg-[#152236] border-[#1E3A5F]"}`}
              >
                <p className={`text-xl font-bold ${s.highlight ? "text-teal-400" : "text-white"}`}>{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-emerald-400 text-sm font-medium">You're 2.8% above neighborhood avg</p>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
          <h2 className="text-white font-semibold mb-1">ROI Calculator</h2>
          <p className="text-gray-400 text-sm mb-4">Which improvements add the most value?</p>
          <div className="space-y-3">
            {ROI_IMPROVEMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-[#152236] rounded-xl p-3 border border-[#1E3A5F]"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.label}</p>
                    <p className="text-gray-400 text-xs">+{fmtFull(item.valueAdd)} added value</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 font-bold text-sm">{item.roi}% ROI</p>
                  </div>
                  <button className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shrink-0 transition-colors">
                    Schedule Pro
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Factors affecting value */}
        <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
          <h2 className="text-white font-semibold mb-4">Factors Affecting Your Value</h2>
          <div className="grid grid-cols-2 gap-3">
            {VALUE_FACTORS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="bg-[#152236] rounded-xl p-3 border border-[#1E3A5F]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-teal-400" />
                    <p className="text-white text-sm font-medium">{f.label}</p>
                  </div>
                  <p className="text-gray-400 text-xs mb-1.5">{f.detail}</p>
                  <span className="text-emerald-400 text-xs font-semibold">{f.impact}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Alert */}
        <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-teal-400" />
            <h2 className="text-white font-semibold">Value Alert</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Get notified when your home value reaches a target amount.
          </p>
          {alertSet ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-400 text-sm font-medium">
                Alert set for {alertValue ? `$${Number(alertValue).toLocaleString()}` : ""}
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={alertValue}
                  onChange={(e) => setAlertValue(e.target.value)}
                  placeholder="500000"
                  className="w-full bg-[#152236] border border-[#1E3A5F] rounded-xl pl-7 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
                />
              </div>
              <button
                onClick={handleSetAlert}
                className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                Set Alert
              </button>
            </div>
          )}
        </div>
      </div>
    </HomeownerLayout>
  );
}
