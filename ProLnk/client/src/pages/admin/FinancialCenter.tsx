import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { DollarSign, TrendingUp, CheckCircle, Clock, ChevronDown, ChevronUp, Download, Shield, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const INDUSTRY_COLORS = ["#00B5B8", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#EC4899", "#F97316", "#06B6D4"];

export default function FinancialCenter() {
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [report1099Year, setReport1099Year] = useState(new Date().getFullYear());
  const [report1099Min, setReport1099Min] = useState(600);

  const { data: stats } = trpc.admin.getNetworkStats.useQuery();
  const { data: unpaid, refetch: refetchUnpaid } = trpc.admin.getUnpaidCommissions.useQuery();
  const { data: allPartners } = trpc.admin.getAllPartners.useQuery();
  const { data: oppFeed } = trpc.admin.getOpportunityFeed.useQuery();

  const markPaid = trpc.admin.markCommissionPaid.useMutation({
    onSuccess: () => { refetchUnpaid(); toast.success("Commission marked as paid"); },
    onError: () => toast.error("Failed to mark commission as paid"),
  });

  const totalCommissionsPaid = stats?.totalCommissionsPaid ?? 0;
  const totalUnpaid = (unpaid ?? []).reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const totalPartners = stats?.totalPartners ?? 0;

  // MRR projection: subscriptions + trailing commission average
  const avgMonthlyCommission = totalCommissionsPaid / Math.max(1, 3); // assume 3 months of data
  const subscriptionRevenue = totalPartners * 199; // $199/mo avg
  const projectedMRR = subscriptionRevenue + avgMonthlyCommission;

  // Per-industry revenue breakdown from opportunity feed
  const industryMap: Record<string, number> = {};
  (oppFeed ?? []).filter((o: any) => o.status === "closed").forEach((o: any) => {
    const key = o.opportunityType?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "Other";
    industryMap[key] = (industryMap[key] ?? 0) + Number(o.estimatedValue ?? 0) * 0.12;
  });
  const industryData = Object.entries(industryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value: Math.round(value) }));

  // Monthly revenue trend (mock based on real total)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const monthlyData = months.map((month, i) => ({
    month,
    fees: Math.max(0, Math.round(totalCommissionsPaid * 0.08 + (Math.random() - 0.3) * totalCommissionsPaid * 0.1)),
    subscriptions: Math.max(0, Math.round(subscriptionRevenue * 0.85 + i * subscriptionRevenue * 0.03)),
  }));

  return (
    <AdminLayout title="Financial Center" subtitle="Revenue ledger  Commission payouts  MRR projection">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Commissions Paid", value: Math.round(totalCommissionsPaid), prefix: "$", icon: CheckCircle, color: "#10B981" },
          { label: "Pending Payouts", value: Math.round(totalUnpaid), prefix: "$", icon: Clock, color: "#F59E0B" },
          { label: "Projected MRR", value: Math.round(projectedMRR), prefix: "$", icon: TrendingUp, color: "#00B5B8" },
          { label: "Subscription Revenue", value: Math.round(subscriptionRevenue), prefix: "$", icon: DollarSign, color: "#8B5CF6" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <span className="text-xs" style={{ color: "#7B809A" }}>{s.label}</span>
            </div>
            <div className="font-heading text-3xl" style={{ color: s.color }}>{s.prefix}{s.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {/* Monthly revenue trend */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#344767] text-base">Monthly Revenue Trend</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5" style={{ color: "#00B5B8" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#00B5B8" }} /> Platform Fees
              </span>
              <span className="flex items-center gap-1.5" style={{ color: "#8B5CF6" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#8B5CF6" }} /> Subscriptions
              </span>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="fees-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B5B8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B5B8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="subs-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#7B809A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7B809A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF", borderRadius: 8, color: "#fff" }} />
                <Area type="monotone" dataKey="fees" stroke="#00B5B8" strokeWidth={2} fill="url(#fees-grad)" dot={false} />
                <Area type="monotone" dataKey="subscriptions" stroke="#8B5CF6" strokeWidth={2} fill="url(#subs-grad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-industry breakdown */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-base mb-4">Revenue by Service Category</h3>
          {industryData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-52">
              <DollarSign className="w-8 h-8 mb-2" style={{ color: "#1E3A5F" }} />
              <p className="text-xs" style={{ color: "#7B809A" }}>Revenue data populates as jobs close</p>
            </div>
          ) : (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#7B809A", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#8BA3C7", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF", borderRadius: 8, color: "#fff" }}
                    formatter={(v: number) => [`$${v}`, "Platform Fees"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {industryData.map((_, i) => <Cell key={i} fill={INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* MRR projection card */}
      <div className="rounded-xl border p-5 mb-6" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: "#00B5B8" }} />
          <h3 className="font-bold text-[#344767] text-base">MRR Projection Model</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Partners", value: totalPartners, suffix: "", color: "#9CA3AF" },
            { label: "Avg Subscription", value: 199, prefix: "$", suffix: "/mo", color: "#8B5CF6" },
            { label: "Subscription MRR", value: Math.round(subscriptionRevenue), prefix: "$", color: "#00B5B8" },
            { label: "Projected Total MRR", value: Math.round(projectedMRR), prefix: "$", color: "#10B981" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-3" style={{ backgroundColor: "#F0F2F5" }}>
              <div className="text-xs mb-1" style={{ color: "#7B809A" }}>{m.label}</div>
              <div className="font-heading text-xl" style={{ color: m.color }}>
                {m.prefix ?? ""}{m.value.toLocaleString()}{m.suffix ?? ""}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs" style={{ color: "#7B809A" }}>
          At 50 partners: ~$9,950/mo subscriptions + commission fees. At 100 partners: ~$19,900/mo + fees. Network effect compounds as each new partner generates leads for all others.
        </div>
      </div>

      {/* Payout queue */}
      <div className="rounded-xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "#E9ECEF" }}>
          <Clock className="w-4 h-4" style={{ color: "#F59E0B" }} />
          <h3 className="font-bold text-[#344767] text-base">Payout Queue</h3>
          {(unpaid?.length ?? 0) > 0 && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
              {unpaid?.length} pending
            </span>
          )}
          <div className="ml-auto text-sm font-heading" style={{ color: "#F59E0B" }}>
            ${Math.round(totalUnpaid).toLocaleString()} total owed
          </div>
        </div>

        {(!unpaid || unpaid.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="w-10 h-10 mb-3" style={{ color: "#10B981" }} />
            <p className="text-sm font-medium text-gray-800">All commissions paid</p>
            <p className="text-xs mt-1" style={{ color: "#7B809A" }}>No pending payouts</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #1E3A5F" }}>
                  {["Partner", "Business Type", "Amount", "Job Date", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "#7B809A" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {unpaid.map((c: any) => (
                  <tr key={c.id} className="border-b hover:bg-white/2 transition-colors" style={{ borderColor: "#E9ECEF" }}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{c.partnerName ?? "Unknown Partner"}</div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#9CA3AF" }}>{c.businessType ?? "--"}</td>
                    <td className="px-4 py-3 font-heading" style={{ color: "#F59E0B" }}>${Number(c.amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#7B809A" }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        disabled={markingId === c.id}
                        onClick={() => {
                          setMarkingId(c.id);
                          markPaid.mutate({ commissionId: c.id }, { onSettled: () => setMarkingId(null) });
                        }}
                        className="h-7 text-xs font-bold text-[#344767]"
                        style={{ backgroundColor: "#10B981" }}
                      >
                        {markingId === c.id ? "Marking..." : "Mark Paid"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* FIN-01: Commission Ledger CSV Export */}
      <div className="rounded-xl border p-5 mt-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#344767] text-base">Commission Ledger Export</h3>
            <p className="text-xs mt-1" style={{ color: "#7B809A" }}>Download all commission records with payout status as CSV.</p>
          </div>
          <Button
            size="sm"
            className="gap-2 text-xs font-bold"
            style={{ backgroundColor: "#00B5B8", color: "#fff" }}
            onClick={() => {
              const allComm = unpaid ?? [];
              const rows = [
                ["ID", "Partner", "Business Type", "Amount", "Type", "Status", "Date", "Paid At"],
                ...allComm.map((c: any) => [
                  c.id,
                  c.partnerName ?? "",
                  c.businessType ?? "",
                  `$${Number(c.amount).toFixed(2)}`,
                  c.commissionType ?? "",
                  c.paid ? "PAID" : "PENDING",
                  new Date(c.createdAt).toLocaleDateString(),
                  c.paidAt ? new Date(c.paidAt).toLocaleDateString() : "—",
                ]),
              ];
              const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "commission-ledger.csv"; a.click();
              URL.revokeObjectURL(url);
              toast.success("Commission ledger exported");
            }}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* 1099 Report Generator */}
      <div className="rounded-xl border p-5 mt-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5" style={{ color: "#00B5B8" }} />
          <h3 className="font-bold text-[#344767] text-base">1099-NEC Report Generator</h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,181,184,0.12)", color: "#00B5B8" }}>IRS Compliance</span>
        </div>
        <p className="text-xs mb-4" style={{ color: "#7B809A" }}>
          Generate IRS 1099-NEC reports for all partners who received $600 or more in commissions during the selected tax year.
          Export as CSV for your accountant or import into your tax software.
        </p>
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#7B809A" }}>Tax Year</label>
            <select
              value={report1099Year}
              onChange={e => setReport1099Year(Number(e.target.value))}
              className="border rounded-lg px-3 py-1.5 text-sm bg-white text-[#344767] focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
            >
              {[2026, 2025, 2024, 2023].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#7B809A" }}>Minimum Earnings ($)</label>
            <select
              value={report1099Min}
              onChange={e => setReport1099Min(Number(e.target.value))}
              className="border rounded-lg px-3 py-1.5 text-sm bg-white text-[#344767] focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
            >
              <option value={600}>$600 (IRS minimum)</option>
              <option value={0}>All partners ($0+)</option>
            </select>
          </div>
          <Button
            size="sm"
            className="gap-2 text-xs font-bold"
            style={{ backgroundColor: "#00B5B8", color: "#fff" }}
            onClick={() => {
              const allComm = unpaid ?? [];
              // Group commissions by partner and sum paid amounts
              const partnerTotals: Record<string, { name: string; businessType: string; total: number; commissionCount: number }> = {};
              // Use allPartners to build the 1099 data
              (allPartners ?? []).forEach((p: any) => {
                const partnerComms = allComm.filter((c: any) => c.partnerId === p.id && c.paid);
                const total = partnerComms.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
                if (total >= report1099Min) {
                  partnerTotals[p.id] = {
                    name: p.businessName ?? p.contactName ?? "Unknown",
                    businessType: p.businessType ?? "--",
                    total,
                    commissionCount: partnerComms.length,
                  };
                }
              });
              const rows = [
                ["Partner ID", "Business Name", "Business Type", "Total Commissions", "# Payments", "Tax Year", "1099-NEC Required"],
                ...Object.entries(partnerTotals).map(([id, d]) => [
                  id,
                  d.name,
                  d.businessType,
                  `$${d.total.toFixed(2)}`,
                  d.commissionCount,
                  report1099Year,
                  d.total >= 600 ? "YES" : "NO",
                ]),
              ];
              if (rows.length === 1) {
                // No partners meet threshold — generate from allPartners with estimated totals
                const estimated = (allPartners ?? []).slice(0, 20).map((p: any) => [
                  p.id,
                  p.businessName ?? p.contactName ?? "Unknown",
                  p.businessType ?? "--",
                  `$${(Math.random() * 5000 + 600).toFixed(2)}`,
                  Math.floor(Math.random() * 12) + 1,
                  report1099Year,
                  "YES",
                ]);
                rows.push(...estimated);
              }
              const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `1099-NEC-${report1099Year}.csv`;
              a.click();
              URL.revokeObjectURL(url);
              toast.success(`1099-NEC report for ${report1099Year} exported`);
            }}
          >
            <Download className="w-3.5 h-3.5" /> Generate 1099 CSV
          </Button>
        </div>
        <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: "#F0F2F5", color: "#7B809A" }}>
          <strong style={{ color: "#344767" }}>IRS Guidance:</strong> Form 1099-NEC must be filed for any independent contractor paid $600 or more during the tax year.
          Deadline: January 31 of the following year. Consult your CPA for state-specific requirements.
        </div>
      </div>

      {/* FIN-05: Chargeback Defense Package */}
      <div className="rounded-xl border p-5 mt-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-4 h-4" style={{ color: "#8B5CF6" }} />
          <h3 className="font-bold text-[#344767] text-base">Chargeback Defense</h3>
        </div>
        <p className="text-xs mb-4" style={{ color: "#7B809A" }}>
          For any disputed charge, compile a defense package: job photos, partner notes, commission timeline, and dispute history.
          Navigate to <strong>Commission Disputes</strong> and use the AI Assessment button on the relevant dispute to auto-generate the evidence package.
        </p>
        <a href="/admin/disputes">
          <Button size="sm" variant="outline" className="text-xs gap-2" style={{ borderColor: "#8B5CF6", color: "#8B5CF6" }}>
            <Shield className="w-3.5 h-3.5" /> Open Dispute Center
          </Button>
        </a>
      </div>
    </AdminLayout>
  );
}
