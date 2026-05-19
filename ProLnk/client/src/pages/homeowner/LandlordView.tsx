import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Building2, Users, DollarSign, Wrench, Calendar, AlertTriangle,
  CheckCircle, Clock, TrendingUp, Plus, FileText, ClipboardCheck,
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";

const properties = [
  {
    address: "4821 Crestview Dr",
    city: "Frisco, TX",
    tenant: "Marcus & Alicia Reid",
    leaseEnd: new Date("2025-10-31"),
    monthlyRent: 2100,
    status: "occupied" as const,
    lastInspection: "Jan 15, 2025",
  },
  {
    address: "1102 Oakshire Ln",
    city: "Plano, TX",
    tenant: "Jordan Whitfield",
    leaseEnd: new Date("2025-07-14"),
    monthlyRent: 1750,
    status: "expiring" as const,
    lastInspection: "Dec 3, 2024",
  },
  {
    address: "308 Willow Creek Ct",
    city: "McKinney, TX",
    tenant: "Priya Nair",
    leaseEnd: new Date("2026-03-31"),
    monthlyRent: 1550,
    status: "occupied" as const,
    lastInspection: "Feb 20, 2025",
  },
];

const maintenanceRequests = [
  {
    id: 1,
    address: "1102 Oakshire Ln",
    description: "Garbage disposal not working, won't turn on at all",
    urgency: "high" as const,
    daysOpen: 3,
  },
  {
    id: 2,
    address: "4821 Crestview Dr",
    description: "Slow drain in master bathroom shower",
    urgency: "medium" as const,
    daysOpen: 7,
  },
  {
    id: 3,
    address: "308 Willow Creek Ct",
    description: "Window screen torn in back bedroom",
    urgency: "low" as const,
    daysOpen: 14,
  },
];

const financials = [
  { label: "Rent Income", value: 5400, color: "#14b8a6" },
  { label: "Mortgage", value: 3200, color: "#64748b" },
  { label: "Maintenance", value: 420, color: "#f59e0b" },
  { label: "Vacancy", value: 0, color: "#6b7280" },
];

const maxFinancial = 5400;

const statusConfig = {
  occupied: { badge: "bg-emerald-500/20 text-emerald-400", label: "Occupied" },
  expiring: { badge: "bg-amber-500/20 text-amber-400", label: "Expiring Soon" },
  vacant: { badge: "bg-red-500/20 text-red-400", label: "Vacant" },
};

const urgencyConfig = {
  high: { badge: "bg-red-500/20 text-red-400", label: "High" },
  medium: { badge: "bg-amber-500/20 text-amber-400", label: "Medium" },
  low: { badge: "bg-slate-500/20 text-slate-400", label: "Low" },
};

function leaseColor(date: Date): string {
  const days = Math.floor((date.getTime() - Date.now()) / 86400000);
  if (days < 60) return "#ef4444";
  if (days < 180) return "#f59e0b";
  return "#10b981";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(date: Date): number {
  return Math.max(0, Math.floor((date.getTime() - Date.now()) / 86400000));
}

export default function LandlordView() {
  const totalRent = properties.reduce((s, p) => s + p.monthlyRent, 0);
  const openRequests = maintenanceRequests.length;
  const netIncome = financials[0].value - financials.slice(1).reduce((s, f) => s + f.value, 0);

  // Timeline: sort leases by end date, find earliest and latest for positioning
  const sorted = [...properties].sort((a, b) => a.leaseEnd.getTime() - b.leaseEnd.getTime());
  const timelineStart = Date.now();
  const timelineEnd = new Date("2026-04-30").getTime();
  const timelineRange = timelineEnd - timelineStart;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="h-6 w-6 text-teal-400" />
                Landlord Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Manage your rental portfolio from one place</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-8 bg-teal-600 hover:bg-teal-500 text-white text-xs gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add Property
              </Button>
              <Button size="sm" variant="outline" className="h-8 border-slate-600 text-slate-300 hover:bg-slate-800 text-xs gap-1">
                <FileText className="h-3.5 w-3.5" />
                Generate Lease Renewal
              </Button>
              <Button size="sm" variant="outline" className="h-8 border-slate-600 text-slate-300 hover:bg-slate-800 text-xs gap-1">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Request Inspection
              </Button>
            </div>
          </div>

          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, label: "Properties Managed", value: `${properties.length}`, sub: "Active" },
              { icon: Users, label: "Current Occupancy", value: "100%", sub: "All occupied" },
              { icon: DollarSign, label: "Monthly Rent Income", value: `$${totalRent.toLocaleString()}/mo`, sub: "Gross" },
              { icon: Wrench, label: "Maintenance Requests", value: `${openRequests} open`, sub: "Needs action" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <Card key={label} className="bg-slate-900 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-lg font-bold text-white mt-1 leading-tight">{value}</p>
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

          {/* Property roster table */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-teal-400" />
                Property Roster
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-700">
                      {["Address", "Tenant", "Lease End", "Monthly Rent", "Status", "Last Inspection"].map(h => (
                        <th key={h} className="text-left text-slate-400 px-4 py-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p, i) => {
                      const cfg = statusConfig[p.status];
                      return (
                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-white font-medium">{p.address}</p>
                            <p className="text-slate-500">{p.city}</p>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{p.tenant}</td>
                          <td className="px-4 py-3 text-slate-300">{formatDate(p.leaseEnd)}</td>
                          <td className="px-4 py-3 text-white font-medium">${p.monthlyRent.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <Badge className={`text-[10px] ${cfg.badge}`}>{cfg.label}</Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{p.lastInspection}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Middle row: maintenance + lease timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Maintenance queue */}
            <Card className="lg:col-span-3 bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-teal-400" />
                  Maintenance Request Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {maintenanceRequests.map((req) => {
                  const cfg = urgencyConfig[req.urgency];
                  return (
                    <div key={req.id} className="p-3 bg-slate-800 rounded-lg flex items-start gap-3">
                      <Badge className={`text-[10px] shrink-0 mt-0.5 ${cfg.badge}`}>{cfg.label}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400">{req.address}</p>
                        <p className="text-sm text-white mt-0.5">{req.description}</p>
                        <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Open {req.daysOpen} {req.daysOpen === 1 ? "day" : "days"}
                        </p>
                      </div>
                      <Link href="/trustypro/book">
                        <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-500 text-white px-3 shrink-0">
                          Assign Pro
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Lease expiry timeline */}
            <Card className="lg:col-span-2 bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-400" />
                  Lease Expiry Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-slate-500 mb-4">Next 12 months</p>
                <div className="relative">
                  {/* Timeline bar */}
                  <div className="h-1.5 bg-slate-700 rounded-full mb-6" />

                  {/* Lease dots */}
                  {sorted.map((p, i) => {
                    const pct = Math.min(100, Math.max(0, ((p.leaseEnd.getTime() - timelineStart) / timelineRange) * 100));
                    const color = leaseColor(p.leaseEnd);
                    return (
                      <div
                        key={i}
                        className="absolute"
                        style={{ left: `${pct}%`, top: -20, transform: "translateX(-50%)" }}
                      >
                        <div
                          className="w-3 h-3 rounded-full ring-2 ring-offset-1 ring-offset-slate-900"
                          style={{ background: color, ringColor: color }}
                        />
                        <div className="mt-2 text-[9px] text-slate-400 whitespace-nowrap" style={{ transform: "translateX(-30%)" }}>
                          {formatDate(p.leaseEnd)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 space-y-2">
                  {sorted.map((p, i) => {
                    const days = daysUntil(p.leaseEnd);
                    const color = leaseColor(p.leaseEnd);
                    return (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                          <span className="text-slate-300 truncate max-w-[140px]">{p.address}</span>
                        </div>
                        <span className="text-slate-400 shrink-0">{days}d left</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-4 pt-3 border-t border-slate-800">
                  {[["#ef4444", "<60 days"], ["#f59e0b", "<6 months"], ["#10b981", ">6 months"]].map(([c, label]) => (
                    <div key={label} className="flex items-center gap-1 text-[10px] text-slate-400">
                      <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                      {label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial summary */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-teal-400" />
                Monthly Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Bar chart */}
                <div className="space-y-3">
                  {financials.map((f) => {
                    const pct = f.value === 0 ? 0 : (f.value / maxFinancial) * 100;
                    return (
                      <div key={f.label} className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-28 shrink-0">{f.label}</span>
                        <div className="flex-1 h-5 bg-slate-800 rounded overflow-hidden">
                          <div
                            className="h-full rounded flex items-center px-2 transition-all"
                            style={{ width: `${pct}%`, background: f.color, minWidth: pct > 0 ? 24 : 0 }}
                          >
                            {pct > 8 && (
                              <span className="text-[10px] text-white font-medium">
                                ${f.value.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {pct <= 8 && (
                          <span className="text-xs text-slate-400 w-10 shrink-0">
                            ${f.value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Net income callout */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-800/60 rounded-xl border border-teal-500/20">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Monthly Net Income</p>
                  <p className="text-4xl font-bold text-teal-400 mt-1">${netIncome.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">After mortgage + maintenance</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    {Math.round((netIncome / financials[0].value) * 100)}% margin
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </HomeownerLayout>
  );
}
