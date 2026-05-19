import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  BarChart3, MapPin, Home, TrendingUp, Wrench, AlertTriangle,
  Calendar, DollarSign, CheckCircle, Clock, ChevronRight
} from "lucide-react";

const properties = [
  {
    id: "A",
    address: "4821 Crestview Dr",
    city: "Frisco, TX 75034",
    yearBuilt: 2008,
    estValue: 415000,
    healthScore: 82,
    status: "healthy" as const,
    lastService: "Apr 28",
    openIssues: 1,
    mapTop: "38%",
    mapLeft: "35%",
  },
  {
    id: "B",
    address: "1102 Oakshire Ln",
    city: "Plano, TX 75075",
    yearBuilt: 2001,
    estValue: 270000,
    healthScore: 71,
    status: "attention" as const,
    lastService: "Mar 15",
    openIssues: 3,
    mapTop: "55%",
    mapLeft: "62%",
  },
];

const upcomingItems = [
  { prop: "A", task: "HVAC filter replacement", due: "May 18", category: "HVAC" },
  { prop: "B", task: "Roof inspection follow-up", due: "May 22", category: "Roofing" },
  { prop: "A", task: "Gutter cleaning", due: "Jun 3", category: "Exterior" },
  { prop: "B", task: "Water heater flush", due: "Jun 10", category: "Plumbing" },
];

const valueHistory = [
  { month: "Jun", a: 405, b: 258 },
  { month: "Jul", a: 407, b: 260 },
  { month: "Aug", a: 408, b: 261 },
  { month: "Sep", a: 410, b: 263 },
  { month: "Oct", a: 411, b: 265 },
  { month: "Nov", a: 412, b: 266 },
  { month: "Dec", a: 412, b: 267 },
  { month: "Jan", a: 413, b: 268 },
  { month: "Feb", a: 413, b: 268 },
  { month: "Mar", a: 414, b: 269 },
  { month: "Apr", a: 415, b: 270 },
  { month: "May", a: 415, b: 270 },
];

const maxBarValue = 690;

function HealthRing({ score, color }: { score: number; color: string }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  return (
    <div className="relative" style={{ width: 75, height: 75 }}>
      <svg width={75} height={75} viewBox="0 0 75 75">
        <circle cx={37.5} cy={37.5} r={radius} fill="none" stroke="#1e293b" strokeWidth={7} />
        <circle
          cx={37.5} cy={37.5} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 37.5 37.5)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-white">{score}</span>
        <span className="text-[9px] text-slate-400 leading-none">/ 100</span>
      </div>
    </div>
  );
}

const statusConfig = {
  healthy: { border: "border-l-emerald-500", badge: "bg-emerald-500/20 text-emerald-400", label: "Healthy", color: "#10b981" },
  attention: { border: "border-l-amber-500", badge: "bg-amber-500/20 text-amber-400", label: "Needs Attention", color: "#f59e0b" },
  critical: { border: "border-l-red-500", badge: "bg-red-500/20 text-red-400", label: "Critical", color: "#ef4444" },
};

export default function PropertyPortfolio() {
  const totalValue = properties.reduce((s, p) => s + p.estValue, 0);
  const avgHealth = Math.round(properties.reduce((s, p) => s + p.healthScore, 0) / properties.length);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-teal-400" />
              Property Portfolio
            </h1>
            <p className="text-slate-400 mt-1">Overview of all your properties and their condition</p>
          </div>

          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, label: "Total Properties", value: `${properties.length}`, sub: "Active" },
              { icon: DollarSign, label: "Total Home Value", value: `$${(totalValue / 1000).toFixed(0)}K`, sub: "Estimated" },
              { icon: TrendingUp, label: "Avg Health Score", value: `${avgHealth}/100`, sub: "Combined" },
              { icon: Wrench, label: "Annual Maint. Budget", value: "$4,200", sub: "Allocated" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <Card key={label} className="bg-slate-900 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-xl font-bold text-white mt-1">{value}</p>
                      <p className="text-xs text-teal-400 mt-0.5">{sub}</p>
                    </div>
                    <div className="p-2 bg-teal-400/10 rounded-lg">
                      <Icon className="h-4 w-4 text-teal-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map + Property cards row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Map placeholder */}
            <Card className="lg:col-span-2 bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  Portfolio Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  className="relative rounded-b-lg overflow-hidden"
                  style={{
                    height: 220,
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f2027 100%)",
                  }}
                >
                  {/* Grid lines */}
                  {[20, 40, 60, 80].map(pct => (
                    <div key={pct} className="absolute inset-0 border-slate-700/30" style={{ top: `${pct}%`, borderTopWidth: 1 }} />
                  ))}
                  {[25, 50, 75].map(pct => (
                    <div key={pct} className="absolute inset-y-0 border-slate-700/30" style={{ left: `${pct}%`, borderLeftWidth: 1 }} />
                  ))}

                  {/* Property pins */}
                  {properties.map(p => {
                    const cfg = statusConfig[p.status];
                    return (
                      <div
                        key={p.id}
                        className="absolute flex flex-col items-center"
                        style={{ top: p.mapTop, left: p.mapLeft, transform: "translate(-50%,-50%)" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-offset-1 ring-offset-slate-900"
                          style={{ background: cfg.color, ringColor: cfg.color }}
                        >
                          {p.id}
                        </div>
                        <span className="mt-1 text-[9px] text-slate-300 bg-slate-900/80 px-1 rounded whitespace-nowrap">{p.city}</span>
                      </div>
                    );
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 rounded px-2 py-1 text-[10px] text-slate-400">
                    DFW Metroplex
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property cards */}
            <div className="lg:col-span-3 space-y-3">
              {properties.map(p => {
                const cfg = statusConfig[p.status];
                return (
                  <Card
                    key={p.id}
                    className={`bg-slate-800 border-slate-700 border-l-4 ${cfg.border}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <HealthRing score={p.healthScore} color={cfg.color} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-white font-semibold text-sm">{p.address}</p>
                              <p className="text-xs text-slate-400">{p.city} · Built {p.yearBuilt}</p>
                            </div>
                            <Badge className={`text-[10px] shrink-0 ${cfg.badge}`}>{cfg.label}</Badge>
                          </div>
                          <div className="flex gap-3 mt-2 flex-wrap">
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <Clock className="h-3 w-3" />
                              Last: {p.lastService}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <AlertTriangle className="h-3 w-3 text-amber-400" />
                              {p.openIssues} open {p.openIssues === 1 ? "issue" : "issues"}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <DollarSign className="h-3 w-3 text-teal-400" />
                              ${(p.estValue / 1000).toFixed(0)}K est.
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-500 text-white px-3">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-slate-600 text-slate-300 hover:bg-slate-700 px-3">
                              Schedule Service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom row: upcoming + value chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Upcoming items */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-400" />
                  Upcoming Tasks — All Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <Badge className="bg-teal-500/20 text-teal-400 text-[10px] w-5 h-5 flex items-center justify-center p-0 rounded-full shrink-0">
                      {item.prop}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{item.task}</p>
                      <p className="text-[10px] text-slate-500">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                      <Clock className="h-3 w-3" />
                      {item.due}
                    </div>
                    <ChevronRight className="h-3 w-3 text-slate-600" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Value trend chart */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-400" />
                  Portfolio Value (12 months, $K)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-1.5 h-32 mt-2">
                  {valueHistory.map((m) => {
                    const totalK = m.a + m.b;
                    const totalH = (totalK / maxBarValue) * 100;
                    const aH = (m.a / totalK) * totalH;
                    const bH = totalH - aH;
                    return (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5" title={`$${totalK}K`}>
                        <div className="w-full flex flex-col-reverse" style={{ height: 112 }}>
                          <div
                            className="w-full bg-teal-500/80 rounded-t-sm"
                            style={{ height: `${aH}%` }}
                          />
                          <div
                            className="w-full bg-teal-800/80"
                            style={{ height: `${bH}%` }}
                          />
                        </div>
                        <span className="text-[8px] text-slate-500">{m.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="w-2 h-2 rounded-sm bg-teal-500/80" />
                    Crestview Dr (A)
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <div className="w-2 h-2 rounded-sm bg-teal-800/80" />
                    Oakshire Ln (B)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
