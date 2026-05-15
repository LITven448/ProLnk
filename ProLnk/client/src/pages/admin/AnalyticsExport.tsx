import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Download, FileText, Users, Briefcase, DollarSign, Home, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type ReportType = "partners" | "opportunities" | "commissions" | "jobs" | "leads";

const REPORT_OPTIONS: Array<{
  key: ReportType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}> = [
  { key: "partners", label: "Partners Report", description: "All partner accounts, tiers, contact info, and status", icon: Users, color: "#1B4FD8" },
  { key: "opportunities", label: "Opportunities Report", description: "AI-detected leads with confidence scores and routing history", icon: Briefcase, color: "#7C3AED" },
  { key: "commissions", label: "Commissions Report", description: "All commission records, amounts, and payment status", icon: DollarSign, color: "#059669" },
  { key: "jobs", label: "Jobs Report", description: "Logged jobs with service addresses, values, and completion status", icon: FileText, color: "#D97706" },
  { key: "leads", label: "TrustyPro Leads", description: "Homeowner leads from TrustyPro scans and requests", icon: Home, color: "#DC2626" },
];

function objectsToCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v).replace(/\r?\n/g, " ");
    return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(","), ...rows.map(r => headers.map(h => escape(r[h])).join(","))];
  return lines.join("\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AnalyticsExport() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("partners");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [exporting, setExporting] = useState(false);

  const utils = trpc.useUtils();

  const handleExport = async () => {
    setExporting(true);
    try {
      const data = await utils.admin.exportNetworkReport.fetch({
        reportType: selectedReport,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      if (!data || !data.rows || data.rows.length === 0) {
        toast.info("No data found for the selected report and date range.");
        return;
      }
      const csv = objectsToCSV(data.rows as Record<string, unknown>[]);
      const dateStr = new Date().toISOString().split("T")[0];
      downloadCSV(csv, `prolnk-${selectedReport}-${dateStr}.csv`);
      toast.success(`Exported ${data.rows.length} rows to CSV`);
    } catch (err) {
      toast.error("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const selected = REPORT_OPTIONS.find(r => r.key === selectedReport)!;

  return (
    <AdminLayout title="Analytics Export" subtitle="Download network data as CSV for external analysis">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Report type selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Select Report Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REPORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedReport(opt.key)}
                className="flex items-start gap-3 p-4 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: selectedReport === opt.key ? `${opt.color}08` : "transparent",
                  borderColor: selectedReport === opt.key ? `${opt.color}40` : "#e5e7eb",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${opt.color}15` }}
                >
                  <opt.icon className="w-4.5 h-4.5" style={{ color: opt.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{opt.label}</span>
                    {selectedReport === opt.key && (
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: opt.color }} />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date range filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Date Range (Optional)</h2>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            {(dateFrom || dateTo) && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-5 text-gray-400"
                onClick={() => { setDateFrom(""); setDateTo(""); }}
              >
                Clear
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">Leave blank to export all records.</p>
        </div>

        {/* Export button */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Ready to export</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {selected.label}{dateFrom ? ` from ${dateFrom}` : ""}{dateTo ? ` to ${dateTo}` : ""}
              </p>
            </div>
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="gap-2 text-white"
              style={{ backgroundColor: selected.color }}
            >
              {exporting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Exporting...</>
              ) : (
                <><Download className="w-4 h-4" /> Export CSV</>
              )}
            </Button>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700 border border-blue-100">
          <p className="font-medium mb-1">Export Notes</p>
          <ul className="space-y-1 text-xs text-blue-600 list-disc list-inside">
            <li>All exports are limited to 1,000 rows per download.</li>
            <li>Dates are exported in UTC. Convert to local time as needed.</li>
            <li>Sensitive fields (passwords, tokens) are never included.</li>
            <li>Use date filters to export specific time periods for large datasets.</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
