import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, AlertTriangle, MapPin, Users, Zap, BarChart2
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type TimeFilter = "24h" | "7d" | "30d";

interface ZipCell {
  zip: string;
  city: string;
  leads: number;
}

interface HotZip {
  zip: string;
  city: string;
  leads: number;
  avgScore: number;
  coverage: number;
  opportunity: number;
}

interface GapAlert {
  zip: string;
  city: string;
  leads: number;
  pros: number;
}

interface TradeSlice {
  trade: string;
  pct: number;
  color: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────
const GRID_CELLS: ZipCell[] = [
  { zip: "75034″, city: "Frisco", leads: 38 },
  { zip: "75035″, city: "Frisco", leads: 22 },
  { zip: "75033″, city: "Frisco", leads: 11 },
  { zip: "75025″, city: "Plano", leads: 29 },
  { zip: "75024″, city: "Plano", leads: 17 },
  { zip: "75023″, city: "Plano", leads: 8 },
  { zip: "75070″, city: "McKinney", leads: 44 },
  { zip: "75071″, city: "McKinney", leads: 19 },
  { zip: "75072″, city: "McKinney", leads: 7 },
  { zip: "75013″, city: "Allen", leads: 31 },
  { zip: "75002″, city: "Allen", leads: 14 },
  { zip: "75009″, city: "Celina", leads: 3 },
  { zip: "75068″, city: "Little Elm", leads: 26 },
  { zip: "75056″, city: "The Colony", leads: 12 },
  { zip: "75010″, city: "Carrollton", leads: 9 },
  { zip: "75007″, city: "Carrollton", leads: 4 },
  { zip: "75006″, city: "Carrollton", leads: 16 },
  { zip: "75011″, city: "Carrollton", leads: 0 },
  { zip: "75063″, city: "Irving", leads: 21 },
  { zip: "75061″, city: "Irving", leads: 6 },
  { zip: "75062″, city: "Irving", leads: 13 },
  { zip: "75038″, city: "Irving", leads: 2 },
  { zip: "75039″, city: "Irving", leads: 18 },
  { zip: "75050″, city: "Grand Prairie", leads: 10 },
  { zip: "75051″, city: "Grand Prairie", leads: 5 },
  { zip: "75052″, city: "Grand Prairie", leads: 33 },
  { zip: "75054″, city: "Grand Prairie", leads: 1 },
  { zip: "75201″, city: "Dallas", leads: 27 },
  { zip: "75202″, city: "Dallas", leads: 15 },
  { zip: "75203″, city: "Dallas", leads: 8 },
  { zip: "75204″, city: "Dallas", leads: 35 },
  { zip: "75205″, city: "Dallas", leads: 20 },
  { zip: "75206″, city: "Dallas", leads: 42 },
  { zip: "75207″, city: "Dallas", leads: 11 },
  { zip: "75208″, city: "Dallas", leads: 6 },
  { zip: "75209″, city: "Dallas", leads: 24 },
  { zip: "75210″, city: "Dallas", leads: 3 },
  { zip: "75211″, city: "Dallas", leads: 16 },
  { zip: "75212″, city: "Dallas", leads: 9 },
  { zip: "75214″, city: "Dallas", leads: 28 },
  { zip: "75215″, city: "Dallas", leads: 4 },
  { zip: "75216″, city: "Dallas", leads: 13 },
  { zip: "75217″, city: "Dallas", leads: 7 },
  { zip: "75218″, city: "Dallas", leads: 37 },
  { zip: "75219″, city: "Dallas", leads: 23 },
  { zip: "75220″, city: "Dallas", leads: 0 },
  { zip: "75221″, city: "Dallas", leads: 19 },
  { zip: "75224″, city: "Dallas", leads: 5 },
];

const HOT_ZIPS: HotZip[] = [
  { zip: "75070″, city: "McKinney", leads: 44, avgScore: 87, coverage: 6, opportunity: 95 },
  { zip: "75206″, city: "Dallas", leads: 42, avgScore: 79, coverage: 4, opportunity: 91 },
  { zip: "75218″, city: "Dallas", leads: 37, avgScore: 84, coverage: 5, opportunity: 88 },
  { zip: "75034″, city: "Frisco", leads: 38, avgScore: 91, coverage: 9, opportunity: 85 },
  { zip: "75204″, city: "Dallas", leads: 35, avgScore: 76, coverage: 3, opportunity: 94 },
  { zip: "75052″, city: "Grand Prairie", leads: 33, avgScore: 72, coverage: 2, opportunity: 97 },
  { zip: "75013″, city: "Allen", leads: 31, avgScore: 88, coverage: 7, opportunity: 82 },
  { zip: "75025″, city: "Plano", leads: 29, avgScore: 85, coverage: 8, opportunity: 78 },
  { zip: "75218″, city: "Dallas", leads: 28, avgScore: 80, coverage: 4, opportunity: 86 },
  { zip: "75068″, city: "Little Elm", leads: 26, avgScore: 83, coverage: 3, opportunity: 92 },
];

const GAP_ALERTS: GapAlert[] = [
  { zip: "75052″, city: "Grand Prairie", leads: 33, pros: 2 },
  { zip: "75204″, city: "Dallas", leads: 35, pros: 1 },
  { zip: "75068″, city: "Little Elm", leads: 26, pros: 1 },
];

const TRADE_SLICES: TradeSlice[] = [
  { trade: "Roofing", pct: 34, color: "bg-amber-500″ },
  { trade: "HVAC", pct: 24, color: "bg-blue-500″ },
  { trade: "Plumbing", pct: 18, color: "bg-cyan-500″ },
  { trade: "Electrical", pct: 14, color: "bg-yellow-500″ },
  { trade: "Other", pct: 10, color: "bg-slate-500″ },
];

const TIME_FILTERS: { label: string; value: TimeFilter }[] = [
  { label: "Last 24h", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
function cellColor(leads: number): string {
  if (leads === 0) return "bg-slate-800 text-slate-600″;
  if (leads <= 5) return "bg-teal-900 text-teal-500″;
  if (leads <= 15) return "bg-teal-700 text-teal-300″;
  if (leads <= 30) return "bg-teal-500 text-white";
  return "bg-teal-400 text-slate-900 animate-pulse";
}

function opportunityColor(score: number): string {
  if (score >= 90) return "text-red-400″;
  if (score >= 80) return "text-amber-400″;
  return "text-slate-300″;
}

function coverageColor(coverage: number): string {
  if (coverage <= 2) return "text-red-400″;
  if (coverage <= 4) return "text-amber-400″;
  return "text-emerald-400″;
}

// ─── DonutChart (CSS/SVG) ────────────────────────────────────────────────────────
function TradeDonut() {
  const radius = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const COLORS = ["#F59E0B", "#3B82F6″, "#06B6D4", "#EAB308", "#64748B"];

  const segments = TRADE_SLICES.map((slice, i) => {
    const dash = (slice.pct / 100) * circumference;
    const gap = circumference - dash;
    const seg = (
      <circle
        key={slice.trade}
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={COLORS[i]}
        strokeWidth={18}
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
    );
    offset += dash;
    return seg;
  });

  return (
    <div className="flex items-center gap-6″>
      <svg width={120} height={120} className="flex-shrink-0″>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1E293B" strokeWidth={18} />
        {segments}
        <text x={cx} y={cy + 5} textAnchor="middle" className="fill-white" fontSize={11} fontWeight="bold">
          Leads
        </text>
      </svg>
      <div className="space-y-2″>
        {TRADE_SLICES.map((slice, i) => (
          <div key={slice.trade} className="flex items-center gap-2″>
            <div className={`w-2.5 h-2.5 rounded-full ${slice.color} flex-shrink-0`} />
            <span className="text-slate-300 text-xs w-20″>{slice.trade}</span>
            <span className="text-white text-xs font-semibold">{slice.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function LeadHeatMap() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("7d");
  const [hoveredZip, setHoveredZip] = useState<ZipCell | null>(null);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4″>
          <div>
            <h1 className="text-2xl font-bold text-white">Lead Heat Map</h1>
            <p className="text-slate-400 mt-1″>Where demand is hottest right now</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1″>
            {TIME_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setTimeFilter(f.value)}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  timeFilter === f.value
                    ? "bg-teal-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trend banner */}
        <div className="flex items-center gap-3 bg-teal-900/20 border border-teal-600/25 rounded-lg px-4 py-3″>
          <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0″ />
          <p className="text-slate-300 text-sm">
            Lead volume <span className="text-teal-300 font-semibold">up 23%</span> vs. last week —
            post-storm activity concentrated in North Frisco and McKinney ZIPs.
          </p>
        </div>

        {/* Heat map grid */}
        <Card className="bg-[#111C2D] border-slate-700″>
          <CardContent className="p-5″>
            <div className="flex items-center justify-between mb-4″>
              <h3 className="text-white font-semibold text-sm flex items-center gap-2″>
                <MapPin className="w-4 h-4 text-teal-400″ /> DFW ZIP Zone Density
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500″>
                <div className="flex items-center gap-1.5″>
                  <div className="w-3 h-3 rounded bg-slate-800″ /> 0
                </div>
                <div className="flex items-center gap-1.5″>
                  <div className="w-3 h-3 rounded bg-teal-900″ /> 1–5
                </div>
                <div className="flex items-center gap-1.5″>
                  <div className="w-3 h-3 rounded bg-teal-700″ /> 6–15
                </div>
                <div className="flex items-center gap-1.5″>
                  <div className="w-3 h-3 rounded bg-teal-500″ /> 16–30
                </div>
                <div className="flex items-center gap-1.5″>
                  <div className="w-3 h-3 rounded bg-teal-400 animate-pulse" /> 30+
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-8 gap-1″>
              {GRID_CELLS.map(cell => (
                <div
                  key={cell.zip}
                  onMouseEnter={() => setHoveredZip(cell)}
                  onMouseLeave={() => setHoveredZip(null)}
                  className={`relative aspect-square rounded flex flex-col items-center justify-center cursor-default transition-all ${cellColor(cell.leads)} hover:ring-1 hover:ring-white/20`}
                >
                  <span className="text-[8px] font-mono leading-none">{cell.zip}</span>
                  {cell.leads > 0 && (
                    <span className="text-[9px] font-bold leading-none mt-0.5″>{cell.leads}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Hover tooltip */}
            {hoveredZip && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-300″>
                <MapPin className="w-3.5 h-3.5 text-teal-400″ />
                <span className="font-mono text-white">{hoveredZip.zip}</span>
                <span className="text-slate-400″>{hoveredZip.city}</span>
                <span className="text-teal-300 font-semibold">{hoveredZip.leads} leads</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top 10 hottest ZIPs */}
        <Card className="bg-[#111C2D] border-slate-700″>
          <CardContent className="p-5″>
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2″>
              <Zap className="w-4 h-4 text-amber-400″ /> Top 10 Hottest ZIPs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wide">
                    <th className="text-left pb-2 pr-4″>ZIP</th>
                    <th className="text-left pb-2 pr-4″>City</th>
                    <th className="text-right pb-2 pr-4″>Leads</th>
                    <th className="text-right pb-2 pr-4″>Avg Score</th>
                    <th className="text-right pb-2 pr-4″>Coverage</th>
                    <th className="text-right pb-2″>Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800″>
                  {HOT_ZIPS.map((row, i) => (
                    <tr
                      key={row.zip + i}
                      className={`${row.opportunity >= 90 ? "bg-red-900/10" : row.opportunity >= 80 ? "bg-amber-900/10" : ""}`}
                    >
                      <td className="py-2.5 pr-4 font-mono text-white">{row.zip}</td>
                      <td className="py-2.5 pr-4 text-slate-300″>{row.city}</td>
                      <td className="py-2.5 pr-4 text-right">
                        <span className={`font-semibold ${row.leads >= 40 ? "text-teal-300" : "text-slate-300"}`}>
                          {row.leads}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-right text-slate-300″>{row.avgScore}</td>
                      <td className={`py-2.5 pr-4 text-right font-medium ${coverageColor(row.coverage)}`}>
                        {row.coverage} pro{row.coverage !== 1 ? "s" : ""}
                      </td>
                      <td className={`py-2.5 text-right font-bold ${opportunityColor(row.opportunity)}`}>
                        {row.opportunity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trade breakdown + coverage gaps side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>

          {/* Trade breakdown donut */}
          <Card className="bg-[#111C2D] border-slate-700″>
            <CardContent className="p-5″>
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2″>
                <BarChart2 className="w-4 h-4 text-blue-400″ /> Lead Distribution by Trade
              </h3>
              <TradeDonut />
            </CardContent>
          </Card>

          {/* Coverage gap alerts */}
          <Card className="bg-[#111C2D] border-slate-700″>
            <CardContent className="p-5″>
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2″>
                <AlertTriangle className="w-4 h-4 text-amber-400″ /> Coverage Gap Alerts
              </h3>
              <div className="space-y-3″>
                {GAP_ALERTS.map(alert => (
                  <div
                    key={alert.zip}
                    className="flex items-center justify-between gap-4 bg-amber-900/15 border border-amber-500/20 rounded-lg px-4 py-3″
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5″>
                        <span className="font-mono text-white text-sm">{alert.zip}</span>
                        <span className="text-slate-400 text-sm">{alert.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-amber-300″>
                          <Zap className="w-3 h-3 inline mr-0.5″ />
                          {alert.leads} leads
                        </span>
                        <span className="text-red-400″>
                          <Users className="w-3 h-3 inline mr-0.5″ />
                          only {alert.pros} pro{alert.pros !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-amber-500/40 text-amber-300 text-xs flex-shrink-0″
                    >
                      Urgent
                    </Badge>
                  </div>
                ))}
                <p className="text-slate-500 text-xs mt-2″>
                  ZIPs with {">"} 25 leads and fewer than 3 active pros serving the area.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </AdminLayout>
  );
}
