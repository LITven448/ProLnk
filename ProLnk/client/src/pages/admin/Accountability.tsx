import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, TrendingDown, Minus, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const GOALS = [
  {
    category: "ProLnk",
    color: "#00C2CB",
    items: [
      { label: "Active Partners (DFW)", target: 100, current: 67, unit: "partners" },
      { label: "Monthly Jobs Logged", target: 500, current: 312, unit: "jobs" },
      { label: "AI Opportunities Generated", target: 1000, current: 743, unit: "leads" },
      { label: "Commission Revenue (MRR)", target: 15000, current: 9840, unit: "$", prefix: true },
      { label: "Partner Approval Rate", target: 85, current: 78, unit: "%", suffix: true },
    ],
  },
  {
    category: "TrustyPro",
    color: "#82D616",
    items: [
      { label: "Homeowner Signups", target: 500, current: 287, unit: "homeowners" },
      { label: "Home Profiles Created", target: 400, current: 198, unit: "profiles" },
      { label: "AI Scans Completed", target: 800, current: 541, unit: "scans" },
      { label: "Subscription Revenue (MRR)", target: 10000, current: 4300, unit: "$", prefix: true },
      { label: "Homeowner Retention Rate", target: 90, current: 84, unit: "%", suffix: true },
    ],
  },
  {
    category: "ProLnk Media",
    color: "#FBB140",
    items: [
      { label: "Active Advertisers", target: 50, current: 12, unit: "advertisers" },
      { label: "ZIP Clusters Sold", target: 200, current: 48, unit: "clusters" },
      { label: "Ad Revenue (MRR)", target: 20000, current: 3600, unit: "$", prefix: true },
      { label: "Click-Through Rate", target: 4.5, current: 3.2, unit: "%", suffix: true },
      { label: "Advertiser Renewal Rate", target: 80, current: 67, unit: "%", suffix: true },
    ],
  },
];

const WEEKLY_ACTIONS = [
  { label: "Review pending partner applications", status: "done", owner: "Admin", due: "Mon" },
  { label: "Send weekly partner broadcast", status: "done", owner: "Admin", due: "Mon" },
  { label: "Process commission payouts", status: "pending", owner: "Finance", due: "Fri" },
  { label: "Review AI opportunity accuracy", status: "pending", owner: "AI Team", due: "Wed" },
  { label: "Homeowner outreach for draft profiles", status: "overdue", owner: "TrustyPro", due: "Tue" },
  { label: "Media advertiser follow-ups", status: "pending", owner: "Media", due: "Thu" },
  { label: "Update partner leaderboard", status: "done", owner: "Admin", due: "Mon" },
  { label: "Review integration health", status: "pending", owner: "Tech", due: "Wed" },
];

function getStatusIcon(status: string) {
  if (status === "done") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (status === "overdue") return <AlertCircle className="w-4 h-4 text-red-400" />;
  return <Clock className="w-4 h-4 text-yellow-400" />;
}

function getStatusBadge(status: string) {
  if (status === "done") return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Done</Badge>;
  if (status === "overdue") return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Overdue</Badge>;
  return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
}

function getTrend(current: number, target: number) {
  const pct = (current / target) * 100;
  if (pct >= 90) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  if (pct >= 60) return <Minus className="w-4 h-4 text-yellow-400" />;
  return <TrendingDown className="w-4 h-4 text-red-400" />;
}

function formatValue(val: number, prefix?: boolean, suffix?: string, unit?: string) {
  if (prefix) return `$${val.toLocaleString()}`;
  if (suffix) return `${val}%`;
  return `${val.toLocaleString()} ${unit ?? ""}`;
}

export default function Accountability() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Accountability Dashboard</h1>
            <p className="text-slate-400 text-sm">Goals vs. actuals across all three businesses — updated weekly</p>
          </div>
        </div>

        {/* KPI Goals by Business */}
        {GOALS.map((biz) => (
          <div key={biz.category}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: biz.color }}>
              {biz.category} — Q2 2026 Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {biz.items.map((item) => {
                const pct = Math.min(100, Math.round((item.current / item.target) * 100));
                const isGood = pct >= 80;
                const isMid = pct >= 50 && pct < 80;
                return (
                  <Card key={item.label} className="bg-slate-800/60 border-slate-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-slate-300">{item.label}</CardTitle>
                        {getTrend(item.current, item.target)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-bold">
                          {formatValue(item.current, item.prefix, item.suffix ? "%" : undefined, item.unit)}
                        </span>
                        <span className="text-slate-500">
                          of {formatValue(item.target, item.prefix, item.suffix ? "%" : undefined, item.unit)}
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className="h-2"
                        style={{
                          ["--progress-color" as string]: isGood ? "#10b981" : isMid ? "#f59e0b" : "#ef4444",
                        }}
                      />
                      <p className={`text-xs font-medium ${isGood ? "text-emerald-400" : isMid ? "text-yellow-400" : "text-red-400"}`}>
                        {pct}% of goal
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Weekly Action Items */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Weekly Action Items</h2>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400 font-medium">Task</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Owner</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Due</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {WEEKLY_ACTIONS.map((action, i) => (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(action.status)}
                          <span className="text-slate-200">{action.label}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-400">{action.owner}</td>
                      <td className="p-4 text-slate-400">{action.due}</td>
                      <td className="p-4">{getStatusBadge(action.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
