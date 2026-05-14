import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { DCard } from "@/components/DashboardShared";
import { toast } from "sonner";
import {
  AlertTriangle, CheckCircle2, Clock, Calendar, Users,
  ChevronRight, RefreshCw, Download, TrendingDown
} from "lucide-react";

const QUEUE = [
  { id: 1, name: "Sunrise HVAC", daysSince: 38, tier: "Founding", riskScore: "High", lastOutcome: "Needs Attention" },
  { id: 2, name: "Delta Roofing Co.", daysSince: 32, tier: "Charter", riskScore: "High", lastOutcome: "At Risk" },
  { id: 3, name: "Peak Electric", daysSince: 31, tier: "Founding", riskScore: "High", lastOutcome: "At Risk" },
  { id: 4, name: "BlueLine Plumbing", daysSince: 22, tier: "L3", riskScore: "Medium", lastOutcome: "Good Standing" },
  { id: 5, name: "All-Star HVAC", daysSince: 19, tier: "Founding", riskScore: "Medium", lastOutcome: "Good Standing" },
  { id: 6, name: "Swift Electrical", daysSince: 17, tier: "Charter", riskScore: "Medium", lastOutcome: "Needs Attention" },
  { id: 7, name: "Mountain Mechanical", daysSince: 11, tier: "L3", riskScore: "Low", lastOutcome: "Good Standing" },
  { id: 8, name: "Precision Plumbing", daysSince: 8, tier: "Founding", riskScore: "Low", lastOutcome: "Good Standing" },
  { id: 9, name: "TopTier Roofing", daysSince: 5, tier: "Charter", riskScore: "Low", lastOutcome: "Good Standing" },
  { id: 10, name: "ProFlow HVAC", daysSince: 3, tier: "L4", riskScore: "Low", lastOutcome: "Good Standing" },
];

const RECENT_LOG = [
  { name: "Precision Plumbing", date: "May 13", outcome: "Good Standing", notes: "Expanding into 2 new zip codes next month." },
  { name: "ProFlow HVAC", date: "May 12", outcome: "Good Standing", notes: "Hit Tier 3 milestone — very engaged." },
  { name: "BlueLine Plumbing", date: "May 11", outcome: "At Risk", notes: "Slower month, considering downgrade. Follow up." },
  { name: "Swift Electrical", date: "May 10", outcome: "Needs Attention", notes: "Not logging jobs — possible platform drop-off." },
  { name: "All-Star HVAC", date: "May 9", outcome: "Good Standing", notes: "Requested intro to commercial leads program." },
];

const OUTCOME_COLORS: Record<string, string> = {
  "Good Standing": "bg-green-500/15 text-green-300 border-green-500/30",
  "At Risk": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Needs Attention": "bg-red-500/15 text-red-300 border-red-500/30",
};

const RISK_COLORS: Record<string, string> = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-green-400",
};

const DAYS_ROW_COLOR = (days: number) => {
  if (days > 30) return "bg-red-500/5 border-l-2 border-red-500/50";
  if (days > 15) return "bg-amber-500/5 border-l-2 border-amber-500/30";
  return "";
};

const TIER_BADGE: Record<string, string> = {
  Charter: "bg-blue-500/15 text-blue-300",
  Founding: "bg-purple-500/15 text-purple-300",
  L3: "bg-indigo-500/15 text-indigo-300",
  L4: "bg-cyan-500/15 text-cyan-300",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CAL_DOTS: Record<number, { count: number; color: string }> = {
  0: { count: 2, color: "bg-cyan-400" },
  1: { count: 3, color: "bg-cyan-400" },
  2: { count: 1, color: "bg-amber-400" },
  3: { count: 4, color: "bg-cyan-400" },
  4: { count: 2, color: "bg-green-400" },
  5: { count: 0, color: "" },
  6: { count: 1, color: "bg-cyan-400" },
};

export default function PartnerCheckIns() {
  const [scheduled, setScheduled] = useState<number[]>([]);
  const [bulkDone, setBulkDone] = useState(false);

  const overdue = QUEUE.filter(p => p.daysSince > 30);

  const handleSchedule = (id: number) => {
    setScheduled(prev => [...prev, id]);
    toast.success("Check-in scheduled");
  };

  const handleBulkSchedule = () => {
    setBulkDone(true);
    setScheduled(overdue.map(p => p.id));
    toast.success(`Scheduled ${overdue.length} check-ins for overdue partners`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partner Check-Ins</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor engagement, schedule outreach, and manage churn risk</p>
          </div>
          <button
            onClick={() => toast.info("CSV export coming soon")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* Overdue Alert Banner */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm font-medium flex-1">
            {overdue.length} partners haven't had a check-in in 30+ days — at churn risk
          </p>
          <button
            onClick={handleBulkSchedule}
            disabled={bulkDone}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              bulkDone
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {bulkDone ? <><CheckCircle2 className="w-3.5 h-3.5" /> Scheduled</> : <><RefreshCw className="w-3.5 h-3.5" /> Schedule all {overdue.length} overdue</>}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <DCard title="Due Today" value="8" icon={<Calendar className="w-5 h-5 text-blue-500" />} />
          <DCard title="Overdue" value={String(overdue.length)} icon={<TrendingDown className="w-5 h-5 text-red-500" />} />
          <DCard title="Completed This Week" value="24" icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} />
          <DCard title="Avg Response Time" value="4.2h" icon={<Clock className="w-5 h-5 text-amber-500" />} />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Check-in Queue — spans 2 cols */}
          <div className="col-span-2 bg-white rounded-xl border overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" /> Check-in Queue
              </h2>
              <span className="text-xs text-gray-400">{QUEUE.length} partners</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Partner</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">Days Since</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Tier</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">Risk</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Last Outcome</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {QUEUE.map(p => (
                    <tr key={p.id} className={`border-b last:border-0 hover:bg-gray-50/60 transition-colors ${DAYS_ROW_COLOR(p.daysSince)}`}>
                      <td className="px-4 py-2.5 font-medium text-gray-900">{p.name}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`font-semibold ${p.daysSince > 30 ? "text-red-500" : p.daysSince > 15 ? "text-amber-500" : "text-green-600"}`}>
                          {p.daysSince}d
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TIER_BADGE[p.tier] ?? "bg-gray-100 text-gray-600"}`}>
                          {p.tier}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`text-xs font-bold ${RISK_COLORS[p.riskScore]}`}>{p.riskScore}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${OUTCOME_COLORS[p.lastOutcome] ?? ""}`}>
                          {p.lastOutcome}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() => handleSchedule(p.id)}
                          disabled={scheduled.includes(p.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            scheduled.includes(p.id)
                              ? "bg-green-100 text-green-700 cursor-default"
                              : "bg-[#0A1628] hover:bg-[#0d2240] text-white"
                          }`}
                        >
                          {scheduled.includes(p.id) ? "Scheduled" : "Schedule"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: Calendar + Legend */}
          <div className="space-y-4">
            {/* Mini Calendar */}
            <div className="bg-white rounded-xl border p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" /> This Week
              </h2>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEK_DAYS.map(d => (
                  <div key={d} className="text-center text-xs text-gray-400 font-medium">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {WEEK_DAYS.map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 py-1">
                    <span className="text-xs text-gray-600 font-medium">{13 + i}</span>
                    <div className="flex flex-col items-center gap-0.5">
                      {CAL_DOTS[i]?.count > 0 &&
                        [...Array(Math.min(CAL_DOTS[i].count, 3))].map((_, j) => (
                          <div key={j} className={`w-1.5 h-1.5 rounded-full ${CAL_DOTS[i].color}`} />
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Scheduled</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> At Risk</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Completed</span>
              </div>
            </div>

            {/* Risk Color Legend */}
            <div className="bg-white rounded-xl border p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Risk Scoring</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-gray-700">&gt;30 days — High risk</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-gray-700">15–30 days — Medium</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-gray-700">&lt;15 days — Low risk</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Check-in Log */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Recent Check-in Log
            </h2>
          </div>
          <div className="divide-y">
            {RECENT_LOG.map((entry, i) => (
              <div key={i} className="px-5 py-3.5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="text-xs text-gray-400 w-14 flex-shrink-0 pt-0.5">{entry.date}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${OUTCOME_COLORS[entry.outcome] ?? ""}`}>
                      {entry.outcome}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{entry.notes}</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
