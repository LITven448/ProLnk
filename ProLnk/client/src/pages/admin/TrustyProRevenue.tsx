import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart, DCard } from "@/components/DashboardShared";
import { DollarSign, Camera, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

const MONTHLY_REVENUE = [
  { label: "Jun",  value: 14200 },
  { label: "Jul",  value: 16800 },
  { label: "Aug",  value: 15400 },
  { label: "Sep",  value: 19200 },
  { label: "Oct",  value: 21600 },
  { label: "Nov",  value: 18900 },
  { label: "Dec",  value: 22400 },
  { label: "Jan",  value: 24100 },
  { label: "Feb",  value: 23800 },
  { label: "Mar",  value: 26300 },
  { label: "Apr",  value: 27100 },
  { label: "May",  value: 28400 },
];

const LEAD_BREAKDOWN = [
  { trade: "Roofing",    sold: 48, avg: 89,  total: 4272 },
  { trade: "HVAC",       sold: 67, avg: 72,  total: 4824 },
  { trade: "Plumbing",   sold: 74, avg: 65,  total: 4810 },
  { trade: "Electrical", sold: 52, avg: 58,  total: 3016 },
  { trade: "Foundation", sold: 18, avg: 120, total: 2160 },
];

const TOP_ZIPS = [
  { zip: "75034″, city: "Frisco",   leads: 38, revenue: 2940 },
  { zip: "75035″, city: "Frisco",   leads: 31, revenue: 2480 },
  { zip: "75025″, city: "Plano",    leads: 27, revenue: 2210 },
  { zip: "75093″, city: "Plano",    leads: 24, revenue: 1870 },
  { zip: "75252″, city: "Dallas",   leads: 22, revenue: 1740 },
];

const MOM_TRENDS = [
  { label: "Scans",         change: 14,  positive: true  },
  { label: "Leads",         change: 8,   positive: true  },
  { label: "Subscriptions", change: -2,  positive: false },
];

export default function TrustyProRevenue() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6″ style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>TrustyPro Revenue</h1>
            <p className="text-sm mt-1″ style={{ color: D.muted }}>DFW market revenue breakdown — scans, leads, subscriptions</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: `${D.green}15`, color: D.green, border: `1px solid ${D.green}30` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: D.green }} />
            DFW Live Market
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          <MetricCard label="Monthly Revenue"     value="$28,400″ sub="May 2026"       trend={5}  color={D.green}  icon={<DollarSign className="w-4 h-4" />} sparkline={[14,17,15,19,22,19,22,24,24,26,27,28]} />
          <MetricCard label="Scan Revenue"        value="$4,200″  sub="209 scans"      trend={14} color={D.cyan}   icon={<Camera className="w-4 h-4" />} />
          <MetricCard label="Lead Revenue"        value="$18,600″ sub="259 leads sold" trend={8}  color={D.purple} icon={<TrendingUp className="w-4 h-4" />} />
          <MetricCard label="Subscription Rev."   value="$5,600″  sub="28 active subs" trend={-2} color={D.amber}  icon={<Users className="w-4 h-4" />} />
        </div>

        {/* Revenue trend chart */}
        <DCard>
          <SectionHeader title="12-Month Revenue Trend" subtitle="Monthly TrustyPro-specific revenue" />
          <BarChart data={MONTHLY_REVENUE} color={D.teal} height={180} />
        </DCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Revenue by source donut */}
          <DCard>
            <SectionHeader title="Revenue by Source" subtitle="Breakdown across lead, scan, and subscription fees" />
            <div className="flex items-center justify-center py-4″>
              <DonutChart
                size={140}
                segments={[
                  { label: "Lead fees",        value: 65, color: D.purple },
                  { label: "Scan fees",         value: 15, color: D.cyan   },
                  { label: "Pro subscriptions", value: 20, color: D.amber  },
                ]}
              />
            </div>
          </DCard>

          {/* MoM trends */}
          <DCard>
            <SectionHeader title="Month-over-Month" subtitle="Scans, leads, and subscriptions vs last month" />
            <div className="flex flex-col gap-4 pt-2″>
              {MOM_TRENDS.map((t, i) => {
                const Icon = t.change > 0 ? TrendingUp : t.change < 0 ? TrendingDown : Minus;
                const color = t.positive ? D.green : D.red;
                return (
                  <div key={i} className="flex items-center justify-between rounded-xl p-4″ style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
                    <span className="text-sm font-semibold" style={{ color: D.text }}>{t.label}</span>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>
                      <Icon className="w-4 h-4″ />
                      {t.change > 0 ? "+" : ""}{t.change}%
                    </div>
                  </div>
                );
              })}
            </div>
          </DCard>
        </div>

        {/* Lead revenue breakdown */}
        <DCard>
          <SectionHeader title="Lead Revenue by Trade" subtitle="Units sold, average price, and total revenue per category" />
          <DataTable
            columns={[
              { key: "trade",  label: "Trade Category" },
              { key: "sold",   label: "Leads Sold", align: "right" },
              { key: "avg",    label: "Avg Price",  align: "right" },
              { key: "total",  label: "Revenue",    align: "right" },
            ]}
            rows={LEAD_BREAKDOWN.map(row => ({
              trade: row.trade,
              sold:  row.sold,
              avg:   `$${row.avg}`,
              total: <span style={{ color: D.green, fontWeight: 700 }}>${row.total.toLocaleString()}</span>,
            }))}
            accentCol="trade"
          />
        </DCard>

        {/* Top revenue ZIPs */}
        <DCard>
          <SectionHeader title="Top Revenue ZIP Codes" subtitle="Highest-generating DFW zip codes this month" />
          <div className="space-y-3″>
            {TOP_ZIPS.map((z, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3″ style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
                <div className="flex items-center gap-3″>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ backgroundColor: `${D.cyan}20`, color: D.cyan }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: D.text }}>{z.zip}</p>
                    <p className="text-xs" style={{ color: D.muted }}>{z.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6″>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: D.muted }}>Leads</p>
                    <p className="text-sm font-bold" style={{ color: D.text }}>{z.leads}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: D.muted }}>Revenue</p>
                    <p className="text-sm font-bold" style={{ color: D.green }}>${z.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
