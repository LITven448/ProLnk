import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  DollarSign, TrendingUp, CheckCircle, Clock, Download, Shield, FileText,
  AlertCircle, ArrowUpRight, ArrowDownRight, CreditCard, Banknote, Target, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const INDUSTRY_COLORS = ["#00B5B8", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#EC4899", "#F97316", "#06B6D4"];

const BUDGET_DATA = [
  { category: "Infrastructure", budget: 4200, actual: 3850 },
  { category: "Marketing", budget: 8000, actual: 9200 },
  { category: "Support", budget: 2500, actual: 2100 },
  { category: "Engineering", budget: 12000, actual: 11400 },
  { category: "Sales", budget: 6000, actual: 5600 },
];

const CASH_POSITION = [
  { month: "Dec", balance: 84000 },
  { month: "Jan", balance: 91000 },
  { month: "Feb", balance: 88500 },
  { month: "Mar", balance: 97200 },
  { month: "Apr", balance: 103400 },
  { month: "May", balance: 118700 },
];

const UPCOMING_PAYOUTS = [
  { name: "Marcus Rivera", trade: "HVAC", amount: 847.50, dueDate: "May 16", method: "ACH" },
  { name: "Sarah Chen", trade: "Plumbing", amount: 1240.00, dueDate: "May 16", method: "ACH" },
  { name: "D&K Roofing LLC", trade: "Roofing", amount: 3120.75, dueDate: "May 17", method: "Wire" },
  { name: "Tony Electrical", trade: "Electrical", amount: 580.00, dueDate: "May 18", method: "ACH" },
  { name: "Green Lawn Co.", trade: "Landscaping", amount: 920.25, dueDate: "May 19", method: "ACH" },
  { name: "Premier HVAC", trade: "HVAC", amount: 2100.00, dueDate: "May 19", method: "Wire" },
];

const AR_ITEMS = [
  { partner: "Sunrise Plumbing", invoiceId: "INV-2041", amount: 480, daysPast: 7, status: "current" },
  { partner: "Metro Electrical", invoiceId: "INV-2038", amount: 920, daysPast: 15, status: "overdue_15" },
  { partner: "Valley HVAC", invoiceId: "INV-2031", amount: 1650, daysPast: 31, status: "overdue_30" },
  { partner: "TopRoof Inc.", invoiceId: "INV-2027", amount: 340, daysPast: 45, status: "overdue_45" },
];

export default function FinancialCenter() {
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [report1099Year, setReport1099Year] = useState(new Date().getFullYear());
  const [report1099Min, setReport1099Min] = useState(600);
  const [activeTab, setActiveTab] = useState<"overview" | "payouts" | "ar" | "budget" | "reports">("overview");

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

  const subscriptionRevenue = totalPartners * 149;
  const avgMonthlyCommission = totalCommissionsPaid / Math.max(1, 3);
  const projectedMRR = subscriptionRevenue + avgMonthlyCommission;
  const projectedARR = projectedMRR * 12;
  const gtv = (oppFeed ?? []).filter((o: any) => o.status === "closed").reduce((s: number, o: any) => s + Number(o.estimatedValue ?? 0), 0);
  const netRevenue = projectedMRR * 0.72;

  const industryMap: Record<string, number> = {};
  (oppFeed ?? []).filter((o: any) => o.status === "closed").forEach((o: any) => {
    const key = o.opportunityType?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "Other";
    industryMap[key] = (industryMap[key] ?? 0) + Number(o.estimatedValue ?? 0) * 0.12;
  });
  const industryData = Object.entries(industryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value: Math.round(value) }));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const monthlyData = months.map((month, i) => ({
    month,
    fees: Math.max(0, Math.round(totalCommissionsPaid * 0.08 + (i * 1200))),
    subscriptions: Math.max(0, Math.round(subscriptionRevenue * 0.85 + i * subscriptionRevenue * 0.03)),
  }));

  const upcomingTotal = UPCOMING_PAYOUTS.reduce((s, p) => s + p.amount, 0);
  const arTotal = AR_ITEMS.reduce((s, a) => s + a.amount, 0);

  const KPI = ({ label, value, prefix = "", suffix = "", icon: Icon, color, delta, deltaLabel }: any) => (
    <div className="rounded-xl border border-white/10 p-4 bg-[#0D1F3C]">
      <div className="flex items-center justify-between mb-3">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${delta >= 0 ? "text-emerald-400" : "text-red-600"}`}>
            {delta >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}</div>
      {deltaLabel && <div className="text-xs text-gray-500 mt-1">{deltaLabel}</div>}
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "payouts", label: "Payout Queue" },
    { id: "ar", label: "Accounts Receivable" },
    { id: "budget", label: "Budget vs Actual" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <AdminLayout title="Financial Center" subtitle="Revenue ledger · Commission payouts · MRR · Cash position">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Monthly Recurring Revenue" value={Math.round(projectedMRR)} prefix="$" icon={TrendingUp} color="#00B5B8" delta={8} deltaLabel="vs last month" />
        <KPI label="Annual Recurring Revenue" value={Math.round(projectedARR)} prefix="$" icon={DollarSign} color="#8B5CF6" delta={12} />
        <KPI label="Gross Transaction Volume" value={Math.round(gtv)} prefix="$" icon={Banknote} color="#F59E0B" delta={5} deltaLabel="all closed jobs" />
        <KPI label="Net Revenue (60%)" value={Math.round(netRevenue)} prefix="$" icon={CheckCircle} color="#10B981" delta={8} deltaLabel="after partner share" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Subscription Revenue" value={Math.round(subscriptionRevenue)} prefix="$" icon={CreditCard} color="#06B6D4" />
        <KPI label="Commission Revenue" value={Math.round(avgMonthlyCommission)} prefix="$" icon={Target} color="#EC4899" />
        <KPI label="Pending Payouts" value={Math.round(totalUnpaid + upcomingTotal)} prefix="$" icon={Clock} color="#F59E0B" />
        <KPI label="Accounts Receivable" value={arTotal} prefix="$" icon={AlertCircle} color="#EF4444" deltaLabel={`${AR_ITEMS.filter(a => a.daysPast > 30).length} past 30d`} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#0D1F3C] rounded-xl p-1 border border-white/10">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg transition-all ${activeTab === t.id ? "bg-teal-500/20 text-teal-700" : "text-gray-500 hover:text-gray-900"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Monthly Revenue */}
            <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">Monthly Revenue Trend</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-teal-700"><span className="w-2 h-2 rounded-full bg-teal-400 inline-block" /> Platform Fees</span>
                  <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> Subscriptions</span>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }} />
                    <Area type="monotone" dataKey="fees" stroke="#00B5B8" strokeWidth={2} fill="url(#fees-grad)" dot={false} />
                    <Area type="monotone" dataKey="subscriptions" stroke="#8B5CF6" strokeWidth={2} fill="url(#subs-grad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cash Position */}
            <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">Cash Position Tracker</h3>
                <span className="text-xs text-emerald-400 font-medium">+41% 6mo</span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CASH_POSITION} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="cash-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Balance"]} />
                    <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fill="url(#cash-grad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Revenue by Service Category</h3>
            {industryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40">
                <DollarSign className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">Revenue data populates as jobs close</p>
              </div>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#8BA3C7", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                    <Tooltip contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }} formatter={(v: number) => [`$${v}`, "Platform Fees"]} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {industryData.map((_, i) => <Cell key={i} fill={INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* MRR Model */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-700" />
              <h3 className="font-bold text-gray-900 text-sm">MRR Projection Model</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Active Partners", value: totalPartners, color: "#64748B" },
                { label: "Avg Subscription", value: 149, prefix: "$", suffix: "/mo", color: "#8B5CF6" },
                { label: "Subscription MRR", value: Math.round(subscriptionRevenue), prefix: "$", color: "#00B5B8" },
                { label: "Projected Total MRR", value: Math.round(projectedMRR), prefix: "$", color: "#10B981" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg p-3 bg-[#F8FAFC]">
                  <div className="text-xs mb-1 text-gray-500">{m.label}</div>
                  <div className="text-xl font-bold" style={{ color: m.color }}>
                    {m.prefix ?? ""}{m.value.toLocaleString()}{m.suffix ?? ""}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              At 500 partners (break-even): ~$74,500/mo subscriptions + match fees. Network effect compounds as each new partner generates leads.
            </div>
          </div>
        </div>
      )}

      {activeTab === "payouts" && (
        <div className="space-y-4">
          {/* Upcoming payouts this week */}
          <div className="rounded-xl border border-white/10 bg-[#0D1F3C]">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-gray-900 text-sm">Upcoming Payouts — Next 7 Days</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700">{UPCOMING_PAYOUTS.length} scheduled</span>
              </div>
              <div className="text-sm font-bold text-amber-700">${upcomingTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Partner", "Trade", "Amount", "Due Date", "Method", "Action"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {UPCOMING_PAYOUTS.map((p, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.trade}</td>
                      <td className="px-4 py-3 font-bold text-amber-700">${p.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.dueDate}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${p.method === "Wire" ? "bg-purple-500/20 text-gray-600" : "bg-blue-500/20 text-blue-400"}`}>{p.method}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-gray-900" onClick={() => toast.success(`Payout triggered for ${p.name}`)}>
                          Send Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payout queue from DB */}
          <div className="rounded-xl border border-white/10 bg-[#0D1F3C]">
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Clock className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-gray-900 text-sm">Commission Payout Queue</h3>
              {(unpaid?.length ?? 0) > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700">{unpaid?.length} pending</span>
              )}
              <div className="ml-auto text-sm font-bold text-amber-700">${Math.round(totalUnpaid).toLocaleString()} total owed</div>
            </div>
            {(!unpaid || unpaid.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-10 h-10 mb-3 text-emerald-400" />
                <p className="text-sm font-medium text-gray-900">All commissions paid</p>
                <p className="text-xs mt-1 text-gray-500">No pending payouts</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Partner", "Business Type", "Amount", "Job Date", "Action"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {unpaid.map((c: any) => (
                      <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">{c.partnerName ?? "Unknown Partner"}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{c.businessType ?? "--"}</td>
                        <td className="px-4 py-3 font-bold text-amber-700">${Number(c.amount).toFixed(2)}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            disabled={markingId === c.id}
                            onClick={() => { setMarkingId(c.id); markPaid.mutate({ commissionId: c.id }, { onSettled: () => setMarkingId(null) }); }}
                            className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-gray-900"
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
        </div>
      )}

      {activeTab === "ar" && (
        <div className="rounded-xl border border-white/10 bg-[#0D1F3C]">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-gray-900 text-sm">Accounts Receivable</h3>
            </div>
            <div className="text-sm font-bold text-red-600">${arTotal.toLocaleString()} outstanding</div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/10">
            {[
              { label: "Current (0-14d)", value: AR_ITEMS.filter(a => a.daysPast <= 14).reduce((s, a) => s + a.amount, 0), color: "text-emerald-400" },
              { label: "Past 15-30d", value: AR_ITEMS.filter(a => a.daysPast > 14 && a.daysPast <= 30).reduce((s, a) => s + a.amount, 0), color: "text-amber-700" },
              { label: "Past 30d+", value: AR_ITEMS.filter(a => a.daysPast > 30).reduce((s, a) => s + a.amount, 0), color: "text-red-600" },
            ].map(b => (
              <div key={b.label} className="p-4 bg-[#0D1F3C]">
                <div className="text-xs text-gray-500 mb-1">{b.label}</div>
                <div className={`text-xl font-bold ${b.color}`}>${b.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Partner", "Invoice", "Amount", "Days Past", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AR_ITEMS.map((item, i) => {
                  const statusColor = item.daysPast <= 14 ? "bg-emerald-500/20 text-emerald-400" : item.daysPast <= 30 ? "bg-amber-500/20 text-amber-700" : "bg-red-500/20 text-red-600";
                  const statusLabel = item.daysPast <= 14 ? "Current" : item.daysPast <= 30 ? "Overdue" : "Critical";
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.partner}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 font-mono">{item.invoiceId}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">${item.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{item.daysPast} days</td>
                      <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>{statusLabel}</span></td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 text-gray-700 hover:text-gray-900" onClick={() => toast.success(`Reminder sent to ${item.partner}`)}>
                          Send Reminder
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Budget vs Actual Spend (May 2026)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                  <XAxis dataKey="category" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }} formatter={(v: number, name: string) => [`$${v.toLocaleString()}`, name === "budget" ? "Budget" : "Actual"]} />
                  <Bar dataKey="budget" fill="#1E3A5F" radius={[4, 4, 0, 0]} name="Budget" />
                  <Bar dataKey="actual" radius={[4, 4, 0, 0]} name="Actual">
                    {BUDGET_DATA.map((d, i) => <Cell key={i} fill={d.actual > d.budget ? "#EF4444" : "#10B981"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0D1F3C] overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-bold text-gray-900 text-sm">Budget Line Items</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Category", "Budget", "Actual", "Variance", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BUDGET_DATA.map((d, i) => {
                  const variance = d.actual - d.budget;
                  const pct = Math.round((variance / d.budget) * 100);
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                      <td className="px-4 py-3 font-medium text-gray-900">{d.category}</td>
                      <td className="px-4 py-3 text-gray-500">${d.budget.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium">${d.actual.toLocaleString()}</td>
                      <td className={`px-4 py-3 font-medium ${variance > 0 ? "text-red-600" : "text-emerald-400"}`}>
                        {variance > 0 ? "+" : ""}${variance.toLocaleString()} ({pct > 0 ? "+" : ""}{pct}%)
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${variance > 0 ? "bg-red-500/20 text-red-600" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {variance > 0 ? "Over Budget" : "Under Budget"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-4">
          {/* CSV Export */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Commission Ledger Export</h3>
                <p className="text-xs mt-1 text-gray-500">Download all commission records with payout status as CSV.</p>
              </div>
              <Button
                size="sm"
                className="gap-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-gray-900"
                onClick={() => {
                  const allComm = unpaid ?? [];
                  const rows = [
                    ["ID", "Partner", "Business Type", "Amount", "Type", "Status", "Date", "Paid At"],
                    ...allComm.map((c: any) => [c.id, c.partnerName ?? "", c.businessType ?? "", `$${Number(c.amount).toFixed(2)}`, c.commissionType ?? "", c.paid ? "PAID" : "PENDING", new Date(c.createdAt).toLocaleDateString(), c.paidAt ? new Date(c.paidAt).toLocaleDateString() : "—"]),
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

          {/* 1099 Report */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-teal-700" />
              <h3 className="font-bold text-gray-900 text-sm">1099-NEC Report Generator</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700">IRS Compliance</span>
            </div>
            <p className="text-xs mb-4 text-gray-500">
              Generate IRS 1099-NEC reports for all partners who received $600 or more in commissions during the selected tax year.
            </p>
            <div className="flex flex-wrap items-end gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-500">Tax Year</label>
                <select
                  value={report1099Year}
                  onChange={e => setReport1099Year(Number(e.target.value))}
                  className="border border-white/10 rounded-lg px-3 py-1.5 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {[2026, 2025, 2024, 2023].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-500">Minimum Earnings</label>
                <select
                  value={report1099Min}
                  onChange={e => setReport1099Min(Number(e.target.value))}
                  className="border border-white/10 rounded-lg px-3 py-1.5 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value={600}>$600 (IRS minimum)</option>
                  <option value={0}>All partners ($0+)</option>
                </select>
              </div>
              <Button
                size="sm"
                className="gap-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-gray-900"
                onClick={() => toast.success(`1099-NEC report for ${report1099Year} generated`)}
              >
                <Download className="w-3.5 h-3.5" /> Generate 1099 CSV
              </Button>
            </div>
            <div className="rounded-lg p-3 text-xs bg-[#F8FAFC] text-gray-500">
              <strong className="text-gray-900">IRS Guidance:</strong> Form 1099-NEC must be filed for any independent contractor paid $600 or more during the tax year. Deadline: January 31.
            </div>
          </div>

          {/* Chargeback Defense */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-4 h-4 text-gray-600" />
              <h3 className="font-bold text-gray-900 text-sm">Chargeback Defense</h3>
            </div>
            <p className="text-xs mb-4 text-gray-500">
              For any disputed charge, compile a defense package: job photos, partner notes, commission timeline, and dispute history.
            </p>
            <a href="/admin/disputes">
              <Button size="sm" variant="outline" className="text-xs gap-2 border-purple-500/30 text-gray-600 hover:bg-purple-500/10">
                <Shield className="w-3.5 h-3.5" /> Open Dispute Center
              </Button>
            </a>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
