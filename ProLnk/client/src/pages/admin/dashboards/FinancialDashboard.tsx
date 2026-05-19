import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  DollarSign, TrendingUp, CreditCard, PieChart, ArrowUpRight,
  ArrowDownRight, Receipt, Banknote, BarChart3, AlertTriangle,
} from "lucide-react";

const REVENUE_DATA = [42, 58, 51, 67, 73, 89, 95, 88, 102, 118, 131, 147];
const PAYOUT_DATA  = [28, 38, 34, 44, 48, 59, 63, 58, 68, 78, 87, 98];

export default function FinancialDashboard() {
  return (
    <AdminLayout title="Financial Dashboard" subtitle="Revenue, payouts, commissions, and financial forecasts">
      <div className="p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: D.bg, minHeight: "100%" }}>
        {/* Pre-Launch Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#00D4FF15", border: "1px solid #00D4FF33" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "#00D4FF" }} />
          <div>
            <span className="text-xs font-bold" style={{ color: "#00D4FF" }}>Pre-Launch Mode</span>
            <span className="text-xs ml-2" style={{ color: "#7B809A" }}>Data shown represents projections and targets. Live metrics will populate after launch.</span>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Monthly Revenue" value="$147K" sub="All sources combined" trend={12.4} color={D.green} sparkline={REVENUE_DATA} icon={<DollarSign className="w-4 h-4" />} />
          <MetricCard label="Payouts This Month" value="$98K" sub="To 112 active partners" trend={12.6} color={D.cyan} sparkline={PAYOUT_DATA} icon={<Banknote className="w-4 h-4" />} />
          <MetricCard label="Net Margin" value="33.3%" sub="After partner payouts" trend={-0.8} color={D.amber} icon={<PieChart className="w-4 h-4" />} />
          <MetricCard label="ARR Projection" value="$1.76M" sub="Based on current trajectory" trend={18.2} color={D.purple} icon={<TrendingUp className="w-4 h-4" />} />
        </div>

        {/* ── Revenue vs Payouts + Revenue Streams ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DCard className="lg:col-span-2">
            <SectionHeader title="Revenue vs Payouts" subtitle="Monthly ($K) — last 12 months" />
            <div className="flex items-end gap-1" style={{ height: 160 }}>
              {REVENUE_DATA.map((rev, i) => {
                const pay = PAYOUT_DATA[i];
                const maxVal = Math.max(...REVENUE_DATA);
                const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
                return (
                  <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
                    <div className="w-full flex flex-col items-center gap-0.5" style={{ height: 130 }}>
                      <div className="w-full flex items-end gap-0.5" style={{ height: "100%" }}>
                        <div className="flex-1 rounded-t-sm" style={{ height: `${(rev/maxVal)*100}%`, background: `linear-gradient(180deg, ${D.green}, ${D.green}80)`, minHeight: 2 }} />
                        <div className="flex-1 rounded-t-sm" style={{ height: `${(pay/maxVal)*100}%`, background: `linear-gradient(180deg, ${D.cyan}, ${D.cyan}80)`, minHeight: 2 }} />
                      </div>
                    </div>
                    <span className="text-[9px]" style={{ color: D.dim }}>{months[i]}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: D.green }} /><span className="text-xs" style={{ color: D.muted }}>Revenue</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: D.cyan }} /><span className="text-xs" style={{ color: D.muted }}>Payouts</span></div>
            </div>
          </DCard>

          <DCard>
            <SectionHeader title="Revenue Streams" subtitle="By source" />
            <DonutChart
              size={110}
              segments={[
                { label: "Job Commissions",  value: 89, color: D.green },
                { label: "Subscriptions",    value: 34, color: D.cyan },
                { label: "Media / Ads",      value: 18, color: D.amber },
                { label: "TrustyPro Leads",  value: 6,  color: D.purple },
              ]}
            />
            <div className="mt-4 space-y-2">
              {[
                { label: "Commission Rate (avg)", value: "8.2%",  color: D.green },
                { label: "Sub Revenue / Partner", value: "$303",  color: D.cyan },
                { label: "Media CPM",             value: "$14.20",color: D.amber },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-1" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <span className="text-xs" style={{ color: D.muted }}>{s.label}</span>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </DCard>
        </div>

        {/* ── Recent Payouts + Pending ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Recent Payouts" subtitle="Last 10 partner payouts" />
            <DataTable
              accentCol="partner"
              columns={[
                { key: "partner",  label: "Partner" },
                { key: "amount",   label: "Amount",  align: "right" },
                { key: "jobs",     label: "Jobs",    align: "right" },
                { key: "status",   label: "Status" },
                { key: "date",     label: "Date",    align: "right" },
              ]}
              rows={[
                { partner: "Apex Roofing DFW",    amount: "$4,368", jobs: 14, status: <StatusBadge status="success" />, date: "Apr 15" },
                { partner: "DFW Plumbing Pro",    amount: "$3,432", jobs: 11, status: <StatusBadge status="success" />, date: "Apr 15" },
                { partner: "Texas HVAC Masters",  amount: "$2,808", jobs: 9,  status: <StatusBadge status="success" />, date: "Apr 14" },
                { partner: "Lone Star Electric",  amount: "$2,496", jobs: 8,  status: <StatusBadge status="success" />, date: "Apr 14" },
                { partner: "Premier Landscaping", amount: "$1,872", jobs: 6,  status: <StatusBadge status="pending" />, date: "Apr 16" },
                { partner: "DFW Plumbing Pro",    amount: "$950",   jobs: 3,  status: <StatusBadge status="pending" />, date: "Apr 16" },
              ]}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Financial Forecast" subtitle="Next 6 months projection" />
            <BarChart
              data={["May","Jun","Jul","Aug","Sep","Oct"].map((m, i) => ({
                label: m, value: [162, 178, 196, 215, 237, 261][i],
              }))}
              color={D.green}
              height={130}
            />
            <div className="mt-4 space-y-3">
              {[
                { label: "Q2 Revenue Target",    value: 487, max: 600, color: D.green },
                { label: "Annual Target: $1.76M",value: 147*4, max: 1760, color: D.cyan },
                { label: "Payout Reserve",        value: 82, max: 100, color: D.amber },
              ].map(g => (
                <ProgressBar key={g.label} label={g.label} value={g.value} max={g.max} color={g.color} />
              ))}
            </div>
          </DCard>
        </div>

        {/* ── Tax + Disputes + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Tax & Compliance" subtitle="YTD financial summary" />
            <div className="space-y-2">
              {[
                { label: "Gross Revenue (YTD)",     value: "$874K",  color: D.green },
                { label: "Partner Payouts (YTD)",   value: "$583K",  color: D.cyan },
                { label: "Net Revenue (YTD)",        value: "$291K",  color: D.text },
                { label: "Estimated Tax Liability",  value: "$72.8K", color: D.amber },
                { label: "1099s to Issue",           value: "112",    color: D.muted },
                { label: "Open Disputes",            value: "2",      color: D.red },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <span className="text-sm" style={{ color: D.muted }}>{s.label}</span>
                  <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </DCard>

          <DCard>
            <SectionHeader title="Financial Activity" subtitle="Last 24 hours" />
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              <ActivityItem time="12:00 PM" type="success" message="Payout batch: $4,368 to Apex Roofing — Stripe transfer confirmed" icon={<Banknote className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:30 AM" type="success" message="Commission recorded: Job #4821 — $8,400 gross, $689 commission" icon={<DollarSign className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:00 AM" type="warning" message="Dispute #D-012: $285 held pending resolution — DFW Plumbing" icon={<AlertTriangle className="w-3.5 h-3.5" />} />
              <ActivityItem time="10:30 AM" type="success" message="Subscription renewal: 8 Pro partners — $2,424 MRR confirmed" icon={<CreditCard className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:45 AM"  type="info"    message="Media invoice: Apex Insurance DFW — $1,200 for April" icon={<Receipt className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:00 AM"  type="success" message="Monthly revenue milestone: $147K — highest month on record" icon={<TrendingUp className="w-3.5 h-3.5" />} />
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
