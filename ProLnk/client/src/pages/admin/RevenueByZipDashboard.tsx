import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MapPin, DollarSign, TrendingUp, Users, AlertTriangle,
  Megaphone, Sparkles,
} from "lucide-react";

interface ZipRow {
  zip: string;
  city: string;
  leads: number;
  jobs: number;
  revenue: number;
  avgCommission: number;
  pros: number;
  revPerPro: number;
}

interface UnderperformingZip {
  zip: string;
  city: string;
  leads: number;
  revenue: number;
  issue: "conversion" | "coverage" | "pricing";
}

interface HeatCell {
  zip: string;
  revenue: number;
}

const TOP_ZIPS: ZipRow[] = [
  { zip: "76092", city: "Southlake",   leads: 312, jobs: 198, revenue: 94200, avgCommission: 476, pros: 14, revPerPro: 6729 },
  { zip: "75205", city: "Highland Park", leads: 289, jobs: 181, revenue: 88700, avgCommission: 490, pros: 12, revPerPro: 7392 },
  { zip: "76051", city: "Grapevine",   leads: 271, jobs: 164, revenue: 78300, avgCommission: 478, pros: 13, revPerPro: 6023 },
  { zip: "75024", city: "Plano",       leads: 258, jobs: 159, revenue: 74100, avgCommission: 466, pros: 15, revPerPro: 4940 },
  { zip: "75034", city: "Frisco",      leads: 244, jobs: 152, revenue: 71200, avgCommission: 468, pros: 16, revPerPro: 4450 },
  { zip: "76248", city: "Keller",      leads: 228, jobs: 141, revenue: 64800, avgCommission: 460, pros: 11, revPerPro: 5891 },
  { zip: "75013", city: "Allen",       leads: 214, jobs: 133, revenue: 59700, avgCommission: 449, pros: 10, revPerPro: 5970 },
  { zip: "75019", city: "Coppell",     leads: 201, jobs: 124, revenue: 55400, avgCommission: 447, pros: 9,  revPerPro: 6156 },
  { zip: "76262", city: "Roanoke",     leads: 188, jobs: 116, revenue: 51200, avgCommission: 441, pros: 8,  revPerPro: 6400 },
  { zip: "75028", city: "Flower Mound", leads: 179, jobs: 110, revenue: 47800, avgCommission: 435, pros: 10, revPerPro: 4780 },
  { zip: "76052", city: "Haslet",      leads: 162, jobs: 98,  revenue: 42100, avgCommission: 430, pros: 7,  revPerPro: 6014 },
  { zip: "75009", city: "Celina",      leads: 148, jobs: 91,  revenue: 38400, avgCommission: 422, pros: 6,  revPerPro: 6400 },
  { zip: "75023", city: "Plano",       leads: 141, jobs: 86,  revenue: 35900, avgCommission: 418, pros: 8,  revPerPro: 4488 },
  { zip: "76244", city: "Keller",      leads: 133, jobs: 80,  revenue: 32700, avgCommission: 409, pros: 7,  revPerPro: 4671 },
  { zip: "75033", city: "Frisco",      leads: 126, jobs: 76,  revenue: 30100, avgCommission: 396, pros: 6,  revPerPro: 5017 },
];

const UNDERPERFORMING: UnderperformingZip[] = [
  { zip: "75001", city: "Addison",    leads: 198, revenue: 12400, issue: "conversion" },
  { zip: "76039", city: "Euless",     leads: 174, revenue: 9800,  issue: "coverage" },
  { zip: "75006", city: "Carrollton", leads: 161, revenue: 8700,  issue: "pricing" },
  { zip: "76010", city: "Arlington",  leads: 154, revenue: 7600,  issue: "coverage" },
  { zip: "75115", city: "DeSoto",     leads: 143, revenue: 6200,  issue: "conversion" },
];

const HEAT_CELLS: HeatCell[] = [
  { zip: "76092", revenue: 94200 }, { zip: "75205", revenue: 88700 }, { zip: "76051", revenue: 78300 },
  { zip: "75024", revenue: 74100 }, { zip: "75034", revenue: 71200 }, { zip: "76248", revenue: 64800 },
  { zip: "75013", revenue: 59700 }, { zip: "75019", revenue: 55400 }, { zip: "76262", revenue: 51200 },
  { zip: "75028", revenue: 47800 }, { zip: "76052", revenue: 42100 }, { zip: "75009", revenue: 38400 },
  { zip: "75023", revenue: 35900 }, { zip: "76244", revenue: 32700 }, { zip: "75033", revenue: 30100 },
  { zip: "75001", revenue: 12400 }, { zip: "76039", revenue: 9800  }, { zip: "75006", revenue: 8700  },
  { zip: "76010", revenue: 7600  }, { zip: "75115", revenue: 6200  }, { zip: "75077", revenue: 4800  },
  { zip: "75080", revenue: 4200  }, { zip: "75104", revenue: 3900  }, { zip: "76011", revenue: 3400  },
  { zip: "75201", revenue: 2800  }, { zip: "76002", revenue: 2200  }, { zip: "76063", revenue: 1900  },
  { zip: "75089", revenue: 1600  }, { zip: "75149", revenue: 1200  }, { zip: "75150", revenue: 900   },
  { zip: "76065", revenue: 700   }, { zip: "75048", revenue: 500   }, { zip: "75044", revenue: 300   },
  { zip: "75020", revenue: 200   }, { zip: "76058", revenue: 100   }, { zip: "75071", revenue: 50    },
  { zip: "75022", revenue: 2100  }, { zip: "75050", revenue: 1800  }, { zip: "75051", revenue: 1500  },
  { zip: "75052", revenue: 1300  }, { zip: "76053", revenue: 1100  }, { zip: "76054", revenue: 900   },
  { zip: "76060", revenue: 800   }, { zip: "76061", revenue: 600   }, { zip: "76062", revenue: 400   },
  { zip: "76064", revenue: 250   }, { zip: "75061", revenue: 180   }, { zip: "75062", revenue: 120   },
];

const TREND_DATA = [
  { month: "Dec", "76092": 12400, "75205": 11200, "76051": 9800 },
  { month: "Jan", "76092": 15800, "75205": 14100, "76051": 12400 },
  { month: "Feb", "76092": 22100, "75205": 19800, "76051": 17200 },
  { month: "Mar", "76092": 38400, "75205": 34700, "76051": 29800 },
  { month: "Apr", "76092": 71200, "75205": 65400, "76051": 54800 },
  { month: "May", "76092": 94200, "75205": 88700, "76051": 78300 },
];

const NEW_ZIPS = [
  { zip: "75078", city: "Prosper",  firstRev: "$3,200" },
  { zip: "75409", city: "Anna",     firstRev: "$1,800" },
  { zip: "76240", city: "Gunter",   firstRev: "$900"   },
];

const ISSUE_LABELS: Record<UnderperformingZip["issue"], { label: string; color: string; bg: string }> = {
  conversion: { label: "Conversion Problem", color: "text-red-300",    bg: "bg-red-900/20 border-red-700/40" },
  coverage:   { label: "Coverage Gap",       color: "text-amber-300",  bg: "bg-amber-900/20 border-amber-700/40" },
  pricing:    { label: "Pricing Issue",      color: "text-blue-300",   bg: "bg-blue-900/20 border-blue-700/40" },
};

function revenueToColor(revenue: number, max: number): string {
  const pct = Math.min(revenue / max, 1);
  const light = Math.round(15 + pct * 35);
  if (pct === 0) return "bg-slate-800/30";
  if (pct < 0.1) return "bg-teal-950/60";
  if (pct < 0.25) return "bg-teal-900/70";
  if (pct < 0.5) return "bg-teal-800";
  if (pct < 0.75) return "bg-teal-600";
  return "bg-teal-400";
}

function fmtDollar(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n}`;
}

export default function RevenueByZipDashboard() {
  const [hoveredZip, setHoveredZip] = useState<string | null>(null);
  const maxRev = Math.max(...HEAT_CELLS.map((c) => c.revenue));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/30 border border-teal-700/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Revenue by ZIP</h1>
              <p className="text-teal-300 text-sm">Where is the money coming from?</p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue",    value: "$887K",  sub: "All DFW ZIPs",     icon: DollarSign,  color: "text-teal-400"   },
            { label: "Top ZIP",          value: "76092",  sub: "Southlake",         icon: MapPin,      color: "text-purple-400" },
            { label: "Active ZIPs",      value: "48",     sub: "With revenue",      icon: TrendingUp,  color: "text-green-400"  },
            { label: "Total Pros",       value: "184",    sub: "Across all ZIPs",   icon: Users,       color: "text-amber-400"  },
          ].map((k) => (
            <div key={k.label} className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <k.icon className={`w-4 h-4 ${k.color}`} />
                <span className="text-slate-400 text-xs">{k.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{k.value}</div>
              <div className="text-slate-500 text-xs mt-1">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Top Performing ZIPs Table */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">Top 15 ZIPs by Revenue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-slate-700/50">
                  <th className="pb-3 text-left">#</th>
                  <th className="pb-3 text-left">ZIP</th>
                  <th className="pb-3 text-left">City</th>
                  <th className="pb-3 text-right">Leads</th>
                  <th className="pb-3 text-right">Jobs</th>
                  <th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Avg Comm.</th>
                  <th className="pb-3 text-right">Pros</th>
                  <th className="pb-3 text-right">Rev/Pro</th>
                  <th className="pb-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {TOP_ZIPS.map((row, i) => {
                  const isTop5 = i < 5;
                  return (
                    <tr
                      key={row.zip}
                      className={`border-b border-slate-800/60 transition-colors hover:bg-slate-800/30 ${isTop5 ? "bg-teal-900/10" : ""}`}
                    >
                      <td className="py-3 pr-2">
                        <span className={`text-xs font-bold ${isTop5 ? "text-teal-400" : "text-slate-500"}`}>{i + 1}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`font-mono font-semibold ${isTop5 ? "text-teal-300" : "text-slate-300"}`}>{row.zip}</span>
                      </td>
                      <td className="py-3 pr-4 text-slate-300">{row.city}</td>
                      <td className="py-3 text-right text-slate-400">{row.leads.toLocaleString()}</td>
                      <td className="py-3 text-right text-slate-300">{row.jobs.toLocaleString()}</td>
                      <td className="py-3 text-right font-semibold text-white">{fmtDollar(row.revenue)}</td>
                      <td className="py-3 text-right text-slate-400">${row.avgCommission}</td>
                      <td className="py-3 text-right text-slate-400">{row.pros}</td>
                      <td className="py-3 text-right text-green-400">{fmtDollar(row.revPerPro)}</td>
                      <td className="py-3 text-center">
                        <button className="text-xs bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 border border-teal-700/40 rounded-lg px-3 py-1 flex items-center gap-1 mx-auto transition-colors">
                          <Megaphone className="w-3 h-3" />
                          Target
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Heat Map */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Revenue Heat Map</h2>
          <p className="text-slate-400 text-sm mb-5">Hover a cell for ZIP details</p>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
            {HEAT_CELLS.map((cell) => (
              <div
                key={cell.zip}
                className={`relative rounded-lg p-2 cursor-pointer transition-all border ${revenueToColor(cell.revenue, maxRev)} border-slate-700/20 hover:scale-105`}
                onMouseEnter={() => setHoveredZip(cell.zip)}
                onMouseLeave={() => setHoveredZip(null)}
              >
                <div className="text-[10px] font-mono text-white/80 leading-tight">{cell.zip}</div>
                {hoveredZip === cell.zip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <div className="font-mono font-bold text-white">{cell.zip}</div>
                    <div className="text-teal-300">{fmtDollar(cell.revenue)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-slate-500">Low</span>
            <div className="flex gap-1">
              {["bg-teal-950/60","bg-teal-900/70","bg-teal-800","bg-teal-600","bg-teal-400"].map((c, i) => (
                <div key={i} className={`w-8 h-2 rounded ${c}`} />
              ))}
            </div>
            <span className="text-xs text-slate-500">High</span>
          </div>
        </div>

        {/* Revenue Trend by ZIP */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">Revenue Trend — Top 3 ZIPs</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value: number, name: string) => [`$${(value/1000).toFixed(1)}K`, name]}
              />
              <Line type="monotone" dataKey="76092" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4 }} name="76092 Southlake" />
              <Line type="monotone" dataKey="75205" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} name="75205 Highland Pk" />
              <Line type="monotone" dataKey="76051" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="76051 Grapevine" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Underperforming ZIPs */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Underperforming ZIPs</h2>
            <span className="text-slate-400 text-sm ml-1">— High leads, low revenue</span>
          </div>
          <div className="space-y-3">
            {UNDERPERFORMING.map((z) => {
              const issue = ISSUE_LABELS[z.issue];
              return (
                <div key={z.zip} className={`flex items-center gap-4 border rounded-xl p-4 ${issue.bg}`}>
                  <div className="font-mono font-bold text-slate-300 w-14">{z.zip}</div>
                  <div className="flex-1">
                    <div className="text-slate-300 text-sm font-medium">{z.city}</div>
                    <div className="text-slate-500 text-xs">{z.leads} leads → only {fmtDollar(z.revenue)} revenue</div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${issue.bg} ${issue.color}`}>
                    {issue.label}
                  </span>
                  <button className="text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg px-3 py-1 flex items-center gap-1 transition-colors">
                    <Megaphone className="w-3 h-3" />
                    Campaign
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* New to the Map */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border border-purple-700/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">New to the Map</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">3 ZIPs generated first revenue this month</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {NEW_ZIPS.map((z) => (
              <div key={z.zip} className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-purple-300">{z.zip}</div>
                  <div className="text-slate-400 text-xs">{z.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{z.firstRev}</div>
                  <div className="text-slate-500 text-xs">first revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
