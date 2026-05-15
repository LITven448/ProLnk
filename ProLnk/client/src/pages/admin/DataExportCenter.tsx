import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Download, FileSpreadsheet, FileJson, FileText, Clock, CheckCircle,
  Database, Terminal, Calendar, Filter, ChevronDown, Loader2,
  BarChart2, Users, Home, DollarSign, Receipt,
} from "lucide-react";

type ExportFormat = "CSV" | "Excel" | "JSON";

interface ExportPreset {
  id: string;
  name: string;
  description: string;
  format: ExportFormat;
  lastExported: string;
  rowCount: number;
  icon: React.ElementType;
  iconColor: string;
}

const PRESETS: ExportPreset[] = [
  {
    id: "partners",
    name: "Partner List",
    description: "All active partners with contact info, tier, and trade",
    format: "CSV",
    lastExported: "May 14, 2026",
    rowCount: 312,
    icon: Users,
    iconColor: "text-teal-400",
  },
  {
    id: "commissions",
    name: "Commission History",
    description: "All payouts with amounts, dates, and partner attribution",
    format: "CSV",
    lastExported: "May 13, 2026",
    rowCount: 2847,
    icon: DollarSign,
    iconColor: "text-green-400",
  },
  {
    id: "homeowners",
    name: "Homeowner Waitlist",
    description: "All homeowner signups with contact info and service interest",
    format: "CSV",
    lastExported: "May 14, 2026",
    rowCount: 1438,
    icon: Home,
    iconColor: "text-blue-400",
  },
  {
    id: "lead_performance",
    name: "Lead Performance",
    description: "Lead source, quality scores, conversion rates, and revenue",
    format: "Excel",
    lastExported: "May 10, 2026",
    rowCount: 891,
    icon: BarChart2,
    iconColor: "text-purple-400",
  },
  {
    id: "revenue",
    name: "Monthly Revenue Report",
    description: "All revenue broken down by stream and month",
    format: "Excel",
    lastExported: "May 1, 2026",
    rowCount: 24,
    icon: BarChart2,
    iconColor: "text-amber-400",
  },
  {
    id: "1099",
    name: "1099 Export",
    description: "Partners requiring 1099-NEC with YTD total earnings",
    format: "CSV",
    lastExported: "Jan 31, 2026",
    rowCount: 58,
    icon: Receipt,
    iconColor: "text-rose-400",
  },
];

const EXPORT_HISTORY = [
  { id: 1, type: "Partner List", date: "May 14, 2026 9:12am", rows: 312, size: "48 KB" },
  { id: 2, type: "Homeowner Waitlist", date: "May 14, 2026 8:55am", rows: 1438, size: "210 KB" },
  { id: 3, type: "Commission History", date: "May 13, 2026 4:30pm", rows: 2847, size: "1.1 MB" },
  { id: 4, type: "Custom Export", date: "May 12, 2026 2:14pm", rows: 540, size: "88 KB" },
  { id: 5, type: "Lead Performance", date: "May 10, 2026 11:00am", rows: 891, size: "320 KB" },
  { id: 6, type: "Partner List", date: "May 8, 2026 3:22pm", rows: 298, size: "44 KB" },
  { id: 7, type: "1099 Export", date: "Jan 31, 2026 10:01am", rows: 58, size: "14 KB" },
  { id: 8, type: "Monthly Revenue Report", date: "May 1, 2026 12:00pm", rows: 24, size: "92 KB" },
  { id: 9, type: "Custom Export", date: "Apr 28, 2026 5:47pm", rows: 1120, size: "182 KB" },
  { id: 10, type: "Homeowner Waitlist", date: "Apr 25, 2026 9:30am", rows: 1201, size: "174 KB" },
];

const ENTITY_TYPES = ["Partners", "Leads", "Payments", "Homeowners"];
const FIELD_OPTIONS: Record<string, string[]> = {
  Partners: ["ID", "Name", "Email", "Phone", "Trade", "Tier", "ZipCode", "JoinDate", "TotalEarnings", "JobsCompleted"],
  Leads: ["ID", "Source", "ZipCode", "Service", "QualityScore", "Status", "CreatedAt", "ConvertedAt", "Revenue"],
  Payments: ["ID", "PartnerID", "Amount", "Type", "Date", "Status", "PayoutMethod"],
  Homeowners: ["ID", "Name", "Email", "Phone", "ZipCode", "ServiceNeeded", "SignupDate", "Status"],
};

function FormatBadge({ format }: { format: ExportFormat }) {
  const colors: Record<ExportFormat, string> = {
    CSV: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    Excel: "bg-green-500/20 text-green-300 border border-green-500/30",
    JSON: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  };
  const icons: Record<ExportFormat, React.ElementType> = {
    CSV: FileText,
    Excel: FileSpreadsheet,
    JSON: FileJson,
  };
  const Icon = icons[format];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colors[format]}`}>
      <Icon size={11} />
      {format}
    </span>
  );
}

export default function DataExportCenter() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-05-14");
  const [entityType, setEntityType] = useState("Partners");
  const [selectedFields, setSelectedFields] = useState<string[]>(FIELD_OPTIONS["Partners"].slice(0, 6));
  const [exportFormat, setExportFormat] = useState<ExportFormat>("CSV");
  const [buildState, setBuildState] = useState<"idle" | "building" | "ready">("idle");

  function toggleField(field: string) {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  }

  function handleEntityChange(entity: string) {
    setEntityType(entity);
    setSelectedFields(FIELD_OPTIONS[entity].slice(0, 6));
  }

  function handleExportPreset(id: string) {
    setExporting(id);
    setTimeout(() => setExporting(null), 1800);
  }

  function handleBuildExport() {
    setBuildState("building");
    setTimeout(() => setBuildState("ready"), 2000);
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Export Center</h1>
          <p className="text-slate-400 text-sm mt-1">Get your data out in any format</p>
        </div>

        {/* Export Presets */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Export Presets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {PRESETS.map(preset => {
              const Icon = preset.icon;
              const isExporting = exporting === preset.id;
              return (
                <div
                  key={preset.id}
                  className="bg-[#111C30] border border-white/10 rounded-xl p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center">
                        <Icon size={18} className={preset.iconColor} />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{preset.name}</div>
                        <FormatBadge format={preset.format} />
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{preset.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {preset.lastExported}
                    </span>
                    <span>{preset.rowCount.toLocaleString()} rows</span>
                  </div>
                  <button
                    onClick={() => handleExportPreset(preset.id)}
                    disabled={isExporting}
                    className="w-full mt-1 flex items-center justify-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 text-sm font-medium rounded-lg py-2 transition-colors disabled:opacity-60"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Exporting…
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        Export Now
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Custom Export Builder */}
        <section className="bg-[#111C30] border border-white/10 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Custom Export Builder</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Date From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Date To</label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Entity Type</label>
              <div className="relative">
                <select
                  value={entityType}
                  onChange={e => handleEntityChange(e.target.value)}
                  className="w-full bg-[#0A1628] border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-teal-500/50"
                >
                  {ENTITY_TYPES.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2">Fields to Include</label>
            <div className="flex flex-wrap gap-2">
              {FIELD_OPTIONS[entityType].map(field => {
                const checked = selectedFields.includes(field);
                return (
                  <button
                    key={field}
                    onClick={() => toggleField(field)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      checked
                        ? "bg-teal-500/20 border-teal-500/50 text-teal-300"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    {checked && <CheckCircle size={10} className="inline mr-1" />}
                    {field}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Format</label>
              <div className="flex gap-2">
                {(["CSV", "Excel", "JSON"] as ExportFormat[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setExportFormat(f)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      exportFormat === f
                        ? "bg-teal-500/20 border-teal-500/50 text-teal-300"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto">
              <button
                onClick={handleBuildExport}
                disabled={buildState === "building" || selectedFields.length === 0}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors disabled:opacity-60"
              >
                {buildState === "building" ? (
                  <><Loader2 size={15} className="animate-spin" />Building…</>
                ) : buildState === "ready" ? (
                  <><CheckCircle size={15} />Download Ready</>
                ) : (
                  <><Database size={15} />Build Export</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Export History */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Export History</h2>
          <div className="bg-[#111C30] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Export Type</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-right px-5 py-3 font-medium">Rows</th>
                  <th className="text-right px-5 py-3 font-medium">Size</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {EXPORT_HISTORY.map(row => (
                  <tr key={row.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 text-white font-medium">{row.type}</td>
                    <td className="px-5 py-3 text-slate-400">{row.date}</td>
                    <td className="px-5 py-3 text-slate-300 text-right">{row.rows.toLocaleString()}</td>
                    <td className="px-5 py-3 text-slate-300 text-right">{row.size}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-medium transition-colors">
                        <Download size={12} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* API Access */}
        <section className="bg-[#111C30] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={18} className="text-teal-400" />
            <h2 className="text-base font-semibold text-white">API Access</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">Use our API to automate data exports and integrate with your BI tools.</p>
          <div className="bg-[#0A1628] border border-white/10 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <span className="text-teal-400">curl</span>{" "}
            <span className="text-amber-400">-X GET</span>{" "}
            <span className="text-green-300">"https://api.prolnk.io/v1/export/partners?format=csv&from=2026-01-01&to=2026-05-14"</span>{" "}
            \<br />
            {"  "}<span className="text-amber-400">-H</span>{" "}
            <span className="text-green-300">"Authorization: Bearer YOUR_API_KEY"</span>{" "}
            \<br />
            {"  "}<span className="text-amber-400">-o</span>{" "}
            <span className="text-green-300">partners_export.csv</span>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
