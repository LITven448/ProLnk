import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, BarChart, DCard, StatusBadge } from "@/components/DashboardShared";
import { DollarSign, Clock, XCircle, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

const MONTHLY_PAYOUTS = [
  { label: "Dec",  value: 28400 },
  { label: "Jan",  value: 31200 },
  { label: "Feb",  value: 33600 },
  { label: "Mar",  value: 44100 },
  { label: "Apr",  value: 48700 },
  { label: "May",  value: 18400 },
];

type PayoutStatus = "Paid" | "Pending" | "Failed";

const PAYOUTS: {
  date: string; partner: string; amount: number;
  type: "Job" | "Referral" | "Override";
  status: PayoutStatus; transferId: string;
}[] = [
  { date: "May 13", partner: "Marcus Townsend",   amount: 1240, type: "Job",      status: "Paid",    transferId: "tr_3PxGqL2e..." },
  { date: "May 12", partner: "Renée Hutchins",    amount: 387,  type: "Referral", status: "Paid",    transferId: "tr_3PxFmH9a..." },
  { date: "May 12", partner: "Devon Patel",       amount: 826,  type: "Override", status: "Paid",    transferId: "tr_3PxE4C1b..." },
  { date: "May 11", partner: "Sam Whitmore",      amount: 2100, type: "Job",      status: "Paid",    transferId: "tr_3PxD7N5c..." },
  { date: "May 11", partner: "Aiko Lindqvist",    amount: 640,  type: "Job",      status: "Pending", transferId: "—" },
  { date: "May 10", partner: "Carlos Medina",     amount: 1890, type: "Job",      status: "Paid",    transferId: "tr_3PxC1M2d..." },
  { date: "May 10", partner: "Priya Nair",        amount: 285,  type: "Override", status: "Failed",  transferId: "tr_3PxBkZ8e..." },
  { date: "May 9",  partner: "James Okafor",      amount: 730,  type: "Referral", status: "Paid",    transferId: "tr_3PxA9Q3f..." },
  { date: "May 9",  partner: "Taylor Brooks",     amount: 1560, type: "Job",      status: "Pending", transferId: "—" },
  { date: "May 8",  partner: "Nadine Beaumont",   amount: 920,  type: "Job",      status: "Paid",    transferId: "tr_3Px89R7g..." },
];

const STATUS_COUNTS: Record<PayoutStatus, number> = { Paid: 247, Pending: 8, Failed: 2 };

const TYPE_COLOR: Record<string, string> = {
  Job:      D.cyan,
  Referral: D.amber,
  Override: D.purple,
};

export default function PayoutHistory() {
  const [filter, setFilter] = useState<PayoutStatus | null>(null);

  const visible = filter ? PAYOUTS.filter(p => p.status === filter) : PAYOUTS;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Payout History</h1>
            <p className="text-sm mt-1" style={{ color: D.muted }}>All partner commissions — job, referral, and override payouts</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: `${D.green}15`, color: D.green, border: `1px solid ${D.green}30` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: D.green }} />
              Stripe Connected • Live Mode
            </div>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ backgroundColor: `${D.cyan}15`, color: D.cyan, border: `1px solid ${D.cyan}30` }}
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Paid Out"  value="$284,000" sub="All time"       trend={18} color={D.green}  icon={<DollarSign className="w-4 h-4" />} sparkline={[28,31,34,44,49,18]} />
          <MetricCard label="This Month"      value="$18,400"  sub="May 2026"       trend={-62} color={D.cyan}  icon={<DollarSign className="w-4 h-4" />} />
          <MetricCard label="Pending"         value="$12,600"  sub="8 transfers"    color={D.amber}  icon={<Clock className="w-4 h-4" />} />
          <MetricCard label="Failed / Held"   value="$285"     sub="2 transfers"    color={D.red}    icon={<XCircle className="w-4 h-4" />} />
        </div>

        {/* Payout timeline */}
        <DCard>
          <SectionHeader title="Monthly Payout Volume" subtitle="Total commissions paid out per month" />
          <BarChart data={MONTHLY_PAYOUTS} color={D.green} height={160} />
        </DCard>

        {/* Filter pills + table */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader title="Payout Ledger" subtitle="10 most recent transfers" />
            <div className="flex items-center gap-2">
              {(["Paid", "Pending", "Failed"] as PayoutStatus[]).map(s => {
                const active = filter === s;
                const color = s === "Paid" ? D.green : s === "Pending" ? D.amber : D.red;
                return (
                  <button
                    key={s}
                    onClick={() => setFilter(active ? null : s)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: active ? `${color}30` : `${color}10`,
                      color: color,
                      border: `1px solid ${active ? color + "60" : color + "20"}`,
                    }}
                  >
                    {s}
                    <span className="font-black">{STATUS_COUNTS[s]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${D.border}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: D.surface }}>
                  {["Date", "Partner", "Amount", "Type", "Status", "Transfer ID", ""].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-left" style={{ color: D.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((p, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < visible.length - 1 ? `1px solid ${D.border}` : "none",
                      backgroundColor: i % 2 === 0 ? D.card : D.surface,
                    }}
                  >
                    <td className="px-4 py-3 text-xs" style={{ color: D.muted }}>{p.date}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: D.text }}>{p.partner}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: D.green }}>${p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold"
                        style={{ backgroundColor: `${TYPE_COLOR[p.type]}20`, color: TYPE_COLOR[p.type] }}
                      >
                        {p.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status === "Paid" ? "success" : p.status === "Pending" ? "pending" : "error"} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: D.dim }}>{p.transferId}</td>
                    <td className="px-4 py-3">
                      {p.status !== "Pending" && (
                        <button className="p-1 rounded transition-colors" style={{ color: D.muted }}>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm" style={{ color: D.dim }}>No {filter} payouts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
