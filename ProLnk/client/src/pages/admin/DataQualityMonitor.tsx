import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Database, AlertTriangle, CheckCircle, RefreshCw, Search,
  ChevronRight, Clock, Zap,
} from "lucide-react";

const CATEGORY_SCORES = [
  { label: "Partner profiles",    pct: 89, color: "#F59E0B" },
  { label: "Property records",    pct: 76, color: "#EF4444" },
  { label: "Lead data",           pct: 97, color: "#10B981" },
  { label: "Commission records",  pct: 99, color: "#10B981" },
];

const ISSUES = [
  {
    count: 147,
    entity: "partners",
    field: "insurance expiry date",
    action: "Add field requirement",
    severity: "amber",
  },
  {
    count: 312,
    entity: "properties",
    field: "year built",
    action: "Trigger ATTOM enrichment",
    severity: "amber",
  },
  {
    count: 28,
    entity: "homeowner profiles",
    field: "ZIP code",
    action: "Send completion prompt",
    severity: "amber",
  },
];

const COMPLETENESS = [
  { entity: "Partners",    total: 1240, fields: 24, complete: 89, trend: "+2%" },
  { entity: "Homeowners",  total: 4820, fields: 16, complete: 94, trend: "+4%" },
  { entity: "Properties",  total: 6100, fields: 30, complete: 76, trend: "—"   },
  { entity: "Leads",       total: 8930, fields: 12, complete: 97, trend: "+1%" },
  { entity: "Commissions", total: 3410, fields: 8,  complete: 99, trend: "—"   },
];

const DUPES = [
  { name: "Marcus HVAC Solutions / Marcus Johnson HVAC",  type: "Partner" },
  { name: "123 Oak St, Phoenix / 123 Oak Street, Phoenix", type: "Property" },
  { name: "Elena R. / Elena Rodriguez",                    type: "Partner" },
];

function scoreColor(n: number) {
  if (n >= 95) return "#10B981";
  if (n >= 85) return "#F59E0B";
  return "#EF4444";
}

function RingScore({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = scoreColor(score);
  return (
    <div className="relative w-36 h-36 flex items-center justify-center mx-auto">
      <svg width={144} height={144} className="-rotate-90" style={{ position: "absolute" }}>
        <circle cx={72} cy={72} r={r} fill="none" stroke="#1E293B" strokeWidth={10} />
        <circle cx={72} cy={72} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="text-center z-10">
        <p className="text-4xl font-bold text-white">{score}</p>
        <p className="text-xs text-slate-400">/ 100</p>
      </div>
    </div>
  );
}

export default function DataQualityMonitor() {
  const [running, setRunning] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);

  function runAudit() {
    setRunning(true);
    setTimeout(() => setRunning(false), 2800);
  }

  const overallScore = 94;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F0F2F5] pb-16">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-6">
          <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Database size={22} className="text-[#17C1E8]" />
                <h1 className="text-2xl font-bold text-slate-800">Data Quality Monitor</h1>
              </div>
              <p className="text-slate-500 text-sm">Clean data drives better outcomes</p>
            </div>
            <Button onClick={runAudit} disabled={running}
              className="bg-[#17C1E8] hover:bg-[#0EA5D0] text-white gap-2 rounded-xl">
              {running ? <><RefreshCw size={16} className="animate-spin" /> Running Audit…</> : <><Zap size={16} /> Run Full Audit Now</>}
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 space-y-8">

          {/* Quality Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-[#0A1628] rounded-2xl p-6 flex flex-col items-center">
              <p className="text-slate-300 text-sm mb-4">Overall Quality Score</p>
              <RingScore score={overallScore} />
              <Badge className="mt-4 bg-emerald-500 text-white border-none text-sm px-4">Good</Badge>
            </div>
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-slate-600 font-semibold mb-4">Category Scores</p>
              <div className="space-y-4">
                {CATEGORY_SCORES.map((c) => (
                  <div key={c.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{c.label}</span>
                      <span className="font-bold" style={{ color: c.color }}>{c.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issues */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" /> Issues Detected
            </h2>
            <div className="space-y-3">
              {ISSUES.filter((_, i) => !dismissed.includes(i)).map((issue, i) => (
                <div key={i}
                  className="bg-white rounded-xl border-l-4 border-amber-400 border border-slate-200 shadow-sm p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-slate-800 font-medium text-sm">
                      <span className="text-amber-600 font-bold">{issue.count}</span>{" "}
                      {issue.entity} missing <span className="font-semibold">{issue.field}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg">
                      {issue.action}
                    </Button>
                    <button onClick={() => setDismissed(d => [...d, i])}
                      className="text-slate-400 hover:text-slate-600 text-xs px-2">✕</button>
                  </div>
                </div>
              ))}
              {dismissed.length === ISSUES.length && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-500" />
                  <span className="text-emerald-700 text-sm font-medium">All issues resolved or dismissed.</span>
                </div>
              )}
            </div>
          </section>

          {/* Completeness Table */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Data Completeness</h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-500 text-xs uppercase tracking-wide">
                    <th className="px-5 py-3">Entity</th>
                    <th className="px-5 py-3">Records</th>
                    <th className="px-5 py-3">Fields Tracked</th>
                    <th className="px-5 py-3">Completeness</th>
                    <th className="px-5 py-3">Trend</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {COMPLETENESS.map((row) => (
                    <tr key={row.entity} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-slate-800">{row.entity}</td>
                      <td className="px-5 py-3 text-slate-500">{row.total.toLocaleString()}</td>
                      <td className="px-5 py-3 text-slate-500">{row.fields}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full"
                              style={{ width: `${row.complete}%`, background: scoreColor(row.complete) }} />
                          </div>
                          <span className="font-semibold" style={{ color: scoreColor(row.complete) }}>
                            {row.complete}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-500">{row.trend}</td>
                      <td className="px-5 py-3">
                        <button className="text-[#17C1E8] hover:underline text-xs font-medium flex items-center gap-1">
                          Fix <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Duplicate Detection */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Search size={18} className="text-slate-500" /> Duplicate Detection
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle size={16} className="text-amber-500" />
                <span className="text-amber-800 text-sm">
                  Scanning for duplicate partner records… Found{" "}
                  <span className="font-bold">{DUPES.length}</span> potential duplicates
                </span>
                <Button size="sm" variant="outline" className="ml-auto border-amber-300 text-amber-700 text-xs rounded-lg hover:bg-amber-50">
                  Review All
                </Button>
              </div>
              <div className="space-y-2">
                {DUPES.map((d, i) => (
                  <div key={i}
                    className="flex items-center justify-between text-sm px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-700">{d.name}</span>
                    <Badge variant="outline" className="text-xs">{d.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Last Audit */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3 text-sm text-slate-600">
            <Clock size={16} className="text-slate-400" />
            <span>
              Full data audit completed <strong>May 14 at 2:00 AM</strong>.{" "}
              Next scheduled: <strong>May 21</strong>.
            </span>
          </section>

        </div>
      </div>
    </AdminLayout>
  );
}
