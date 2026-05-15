import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  DollarSign,
  TrendingUp,
  Wrench,
  Droplets,
  Home,
  Zap,
  Leaf,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Wind,
} from "lucide-react";

const CATEGORIES = [
  { label: "HVAC", icon: Wind, allocated: 800, spent: 320, color: "#0891b2" },
  { label: "Plumbing", icon: Droplets, allocated: 600, spent: 180, color: "#3b82f6" },
  { label: "Roofing", icon: Home, allocated: 500, spent: 0, color: "#8b5cf6" },
  { label: "Electrical", icon: Zap, allocated: 400, spent: 210, color: "#f59e0b" },
  { label: "Landscaping", icon: Leaf, allocated: 300, spent: 130, color: "#10b981" },
  { label: "Other", icon: Wrench, allocated: 1600, spent: 1000, color: "#ec4899" },
];

const MONTHLY = [
  { month: "Jan", budgeted: 350, actual: 280 },
  { month: "Feb", budgeted: 350, actual: 410 },
  { month: "Mar", budgeted: 350, actual: 300 },
  { month: "Apr", budgeted: 350, actual: 490 },
  { month: "May", budgeted: 350, actual: 360 },
];

const UPCOMING = [
  { service: "HVAC Tune-Up", estimate: 180, priority: "critical", months: 1 },
  { service: "Roof Inspection", estimate: 250, priority: "planned", months: 3 },
  { service: "Water Heater Flush", estimate: 120, priority: "planned", months: 4 },
  { service: "Electrical Panel Check", estimate: 200, priority: "critical", months: 2 },
];

const TIPS = [
  {
    tip: "HVAC tune-up prevents emergency calls",
    savings: "$1,800",
    icon: Wind,
  },
  {
    tip: "Roof cleaning extends lifespan by 5–10 years",
    savings: "$8,500",
    icon: Home,
  },
  {
    tip: "Fix plumbing drips before they become leaks",
    savings: "$2,200",
    icon: Droplets,
  },
];

const ANNUAL = 4200;
const SPENT = 1840;
const REMAINING = ANNUAL - SPENT;
const SPENT_PCT = Math.round((SPENT / ANNUAL) * 100);

function MiniDonut({ allocated, spent, color }: { allocated: number; spent: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(spent / allocated, 1);
  const filled = pct * circ;
  return (
    <svg width={44} height={44} className="-rotate-90 shrink-0">
      <circle cx={22} cy={22} r={r} fill="none" stroke="#1e3a5f" strokeWidth={5} />
      <circle
        cx={22}
        cy={22}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarChart() {
  const maxVal = Math.max(...MONTHLY.flatMap((m) => [m.budgeted, m.actual]));
  return (
    <div className="flex items-end gap-3 h-32 mt-4">
      {MONTHLY.map((m) => {
        const bH = (m.budgeted / maxVal) * 100;
        const aH = (m.actual / maxVal) * 100;
        return (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-0.5 w-full justify-center h-24">
              <div
                className="flex-1 rounded-t-sm bg-teal-500/30 border border-teal-500/40"
                style={{ height: `${bH}%` }}
                title={`Budgeted: $${m.budgeted}`}
              />
              <div
                className="flex-1 rounded-t-sm bg-teal-400"
                style={{ height: `${aH}%` }}
                title={`Actual: $${m.actual}`}
              />
            </div>
            <span className="text-xs text-slate-500">{m.month}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function HomeMaintenanceBudget() {
  const [_open, _setOpen] = useState(false);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Maintenance Budget Planner</h1>
          <p className="text-slate-400 text-sm mt-1">Plan and track your annual home maintenance spend</p>
        </div>

        {/* Annual Budget Overview */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-teal-400" />
            <h2 className="font-semibold text-white">Annual Budget Overview</h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-white">${ANNUAL.toLocaleString()}</span>
            <span className="text-sm text-slate-400">per year</span>
          </div>
          <div className="w-full h-3 bg-[#0A1628] rounded-full overflow-hidden my-3">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${SPENT_PCT}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-slate-400">Spent </span>
              <span className="font-semibold text-teal-400">${SPENT.toLocaleString()}</span>
              <span className="text-slate-500 ml-1">({SPENT_PCT}%)</span>
            </div>
            <div>
              <span className="text-slate-400">Remaining </span>
              <span className="font-semibold text-white">${REMAINING.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Budget by Category */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Budget by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const pct = Math.min(Math.round((cat.spent / cat.allocated) * 100), 100);
              return (
                <div key={cat.label} className="bg-[#0A1628] rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      <span className="text-xs font-medium text-slate-300">{cat.label}</span>
                    </div>
                    <MiniDonut allocated={cat.allocated} spent={cat.spent} color={cat.color} />
                  </div>
                  <p className="text-base font-bold text-white">${cat.allocated}</p>
                  <p className="text-xs text-slate-500">
                    ${cat.spent} spent · {pct}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actual vs Planned Chart */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-white">Actual vs Planned</h2>
            <div className="flex gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 inline-block rounded-sm bg-teal-500/30 border border-teal-500/40" /> Budgeted
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 inline-block rounded-sm bg-teal-400" /> Actual
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Jan – May 2026</p>
          <BarChart />
        </div>

        {/* Upcoming Expenses */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Upcoming Expenses</h2>
          <div className="space-y-3">
            {UPCOMING.map((item) => (
              <div key={item.service} className="flex items-center justify-between bg-[#0A1628] rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.priority === "critical" ? "bg-red-400" : "bg-teal-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{item.service}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.priority === "critical"
                            ? "bg-red-900/40 text-red-400 border border-red-700/50"
                            : "bg-teal-900/40 text-teal-400 border border-teal-700/50"
                        }`}
                      >
                        {item.priority === "critical" ? "Critical" : "Planned"}
                      </span>
                      <span className="text-xs text-slate-500">{item.months}mo recommended</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">${item.estimate}</span>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost-Saving Tips */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="font-semibold text-white">Cost-Saving Tips</h2>
          </div>
          <div className="space-y-3">
            {TIPS.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.tip} className="flex items-center gap-3 bg-amber-900/10 border border-amber-700/20 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">{tip.tip}</p>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">
                      Save avg {tip.savings}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-400 transition-colors text-white font-semibold text-base shadow-lg shadow-teal-500/20">
          Create Budget Plan
        </button>
      </div>
    </HomeownerLayout>
  );
}
