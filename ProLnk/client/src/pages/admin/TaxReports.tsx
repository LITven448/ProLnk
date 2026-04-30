/**
 * Admin -- Tax Reports / 1099 Generator
 * Generates annual 1099-NEC summary for each partner over the $600 IRS threshold.
 * Brain Trust policy: issue for all partners over $600/year (IRS standard).
 */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { FileText, Download, AlertTriangle, CheckCircle, DollarSign, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const IRS_THRESHOLD = 600;

export default function TaxReports() {
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [exporting, setExporting] = useState(false);

  const { data: allPartners = [], isLoading: partnersLoading } = trpc.admin.getAllPartners.useQuery();
  const { data: allPaidCommissions = [], isLoading: commLoading } = trpc.admin.getAllPaidCommissions.useQuery();

  const isLoading = partnersLoading || commLoading;

  // Build per-partner annual totals
  const partnerTotals = useMemo(() => {
    const totals: Record<number, { partner: any; total: number; paidCount: number }> = {};

    // Note: We use unpaid commissions + all commissions from partner data
    // For a full 1099 report we aggregate from partner totalCommissionEarned
    // and supplement with unpaid commissions data
    const commissionData = allPaidCommissions as any[];
    commissionData.forEach((c: any) => {
      const paidDate = c.paidAt ? new Date(c.paidAt) : new Date(c.createdAt);
      if (paidDate.getFullYear() !== year) return;
      const pid = c.receivingPartnerId;
      if (!pid) return;
      if (!totals[pid]) {
        const partner = (allPartners as any[]).find(p => p.id === pid);
        if (!partner) return;
        totals[pid] = { partner, total: 0, paidCount: 0 };
      }
      totals[pid].total += Number(c.amount ?? 0);
      totals[pid].paidCount++;
    });

    return Object.values(totals).sort((a, b) => b.total - a.total);
  }, [allPaidCommissions, allPartners, year]);

  const above1099 = partnerTotals.filter(r => r.total >= IRS_THRESHOLD);
  const below1099 = partnerTotals.filter(r => r.total < IRS_THRESHOLD && r.total > 0);
  const totalPaid = partnerTotals.reduce((s, r) => s + r.total, 0);

  const exportCSV = () => {
    setExporting(true);
    try {
      const rows = [
        ["Year", "Partner ID", "Business Name", "Contact Email", "Total Paid ($)", "Commission Count", "1099 Required"],
        ...above1099.map(r => [
          year,
          r.partner.id,
          r.partner.businessName ?? "",
          r.partner.contactEmail ?? "",
          r.total.toFixed(2),
          r.paidCount,
          "YES",
        ]),
        ...below1099.map(r => [
          year,
          r.partner.id,
          r.partner.businessName ?? "",
          r.partner.contactEmail ?? "",
          r.total.toFixed(2),
          r.paidCount,
          "NO (below $600)",
        ]),
      ];
      const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prolnk-1099-${year}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`1099 report for ${year} exported`);
    } catch {
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tax Reports</h1>
            <p className="text-muted-foreground text-sm mt-1">
              1099-NEC annual commission summaries  IRS threshold: ${IRS_THRESHOLD}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={year}
              onChange={e => setYear(parseInt(e.target.value))}
              className="border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <Button onClick={exportCSV} disabled={exporting || above1099.length === 0} className="gap-2">
              <Download className="w-4 h-4" />
              {exporting ? "Exporting..." : `Export ${year} CSV`}
            </Button>
          </div>
        </div>

        {/* Policy banner */}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold">1099-NEC Policy</p>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
              Per IRS rules, a 1099-NEC must be issued to any non-employee (partner) paid $600 or more in a calendar year.
              This report identifies all qualifying partners. Consult your CPA before filing. Deadline: January 31 of the following year.
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: `Total Paid (${year})`, value: `$${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: "text-[#82D616]", bg: "bg-[#82D616]/10" },
            { label: "1099 Required", value: above1099.length, icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10" },
            { label: "Below Threshold", value: below1099.length, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
          ].map(m => (
            <div key={m.label} className="bg-card border rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
                <m.icon className={`w-4.5 h-4.5 ${m.color}`} />
              </div>
              <p className="text-2xl font-black text-foreground">{m.value}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* 1099 Required table */}
            {above1099.length > 0 && (
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b bg-amber-50 dark:bg-amber-950/20 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                    1099-NEC Required -- {above1099.length} partners
                  </span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-muted-foreground font-medium">Partner</th>
                      <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                      <th className="text-right px-4 py-3 text-muted-foreground font-medium">Commissions</th>
                      <th className="text-right px-4 py-3 text-muted-foreground font-medium">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {above1099.map(r => (
                      <tr key={r.partner.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{r.partner.businessName || "--"}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{r.partner.contactEmail}</td>
                        <td className="px-4 py-3 text-right font-mono text-foreground">{r.paidCount}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-[#82D616]">
                          ${r.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Below threshold table */}
            {below1099.length > 0 && (
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b bg-green-50 dark:bg-green-950/20 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-300 text-sm">
                    Below $600 Threshold -- No 1099 Required ({below1099.length} partners)
                  </span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-muted-foreground font-medium">Partner</th>
                      <th className="text-right px-4 py-3 text-muted-foreground font-medium">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {below1099.map(r => (
                      <tr key={r.partner.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{r.partner.businessName || r.partner.contactEmail}</td>
                        <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                          ${r.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {partnerTotals.length === 0 && (
              <div className="bg-card border rounded-xl p-8 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No paid commissions found for {year}</p>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
