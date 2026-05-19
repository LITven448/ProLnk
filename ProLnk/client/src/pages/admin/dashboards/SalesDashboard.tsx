import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  TrendingUp, Users, Target, DollarSign, Zap, Award,
  UserPlus, BarChart3, ArrowRight, Star, AlertTriangle,
} from "lucide-react";

export default function SalesDashboard() {
  return (
    <AdminLayout title="Sales Dashboard" subtitle="Partner acquisition, lead conversion, and tier performance">
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
          <MetricCard label="New Partners (MTD)" value="14" sub="Month-to-date applications" trend={27.3} color={D.cyan} sparkline={[3,5,4,7,6,8,9,11,12,14]} icon={<UserPlus className="w-4 h-4" />} />
          <MetricCard label="Lead → Job Rate" value="31%" sub="Avg across all tiers" trend={-1.4} color={D.green} icon={<Target className="w-4 h-4" />} />
          <MetricCard label="Avg Deal Size" value="$2,847" sub="Per closed job" trend={8.8} color={D.amber} icon={<DollarSign className="w-4 h-4" />} />
          <MetricCard label="Partner Pipeline" value="38" sub="Applications in review" trend={14.2} color={D.purple} sparkline={[18,22,25,28,31,34,36,38]} icon={<Users className="w-4 h-4" />} />
        </div>

        {/* ── Tier Performance + Conversion Funnel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Tier Breakdown */}
          <DCard>
            <SectionHeader title="Partner Tier Mix" subtitle="Active partners by tier" />
            <DonutChart
              size={110}
              segments={[
                { label: "Elite",  value: 18, color: D.amber },
                { label: "Pro",    value: 47, color: D.cyan },
                { label: "Connect",  value: 47, color: D.muted },
              ]}
            />
            <div className="mt-4 space-y-3">
              {[
                { tier: "Elite", count: 18, revenue: "$8,200/mo avg", color: D.amber },
                { tier: "Pro",   count: 47, revenue: "$3,100/mo avg", color: D.cyan },
                { tier: "Connect", count: 47, revenue: "$890/mo avg",   color: D.muted },
              ].map(t => (
                <div key={t.tier} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-sm font-semibold" style={{ color: D.text }}>{t.tier}</span>
                    <span className="text-xs" style={{ color: D.muted }}>({t.count})</span>
                  </div>
                  <span className="text-xs" style={{ color: D.muted }}>{t.revenue}</span>
                </div>
              ))}
            </div>
          </DCard>

          {/* Conversion Funnel */}
          <DCard className="lg:col-span-2">
            <SectionHeader title="Sales Funnel" subtitle="Partner acquisition pipeline" />
            <div className="space-y-3 mt-2">
              {[
                { stage: "Waitlist Signup",    count: 284, color: D.cyan,   pct: 100 },
                { stage: "Application Started",count: 198, color: D.blue,   pct: 70 },
                { stage: "Application Submitted",count: 142, color: D.purple, pct: 50 },
                { stage: "Under Review",       count: 89,  color: D.amber,  pct: 31 },
                { stage: "Approved",           count: 67,  color: D.orange, pct: 24 },
                { stage: "Onboarded & Active", count: 112, color: D.green,  pct: 39 },
              ].map(s => (
                <div key={s.stage} className="flex items-center gap-3">
                  <span className="text-xs w-40 flex-shrink-0" style={{ color: D.muted }}>{s.stage}</span>
                  <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: D.border }}>
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all"
                      style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}60, ${s.color})` }}
                    >
                      <span className="text-xs font-bold text-white">{s.count}</span>
                    </div>
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: D.dim }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </DCard>
        </div>

        {/* ── Monthly Partner Growth + Top Performers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Partner Growth" subtitle="New partners per month" />
            <BarChart
              data={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
                label: m, value: [4,6,5,8,7,9,8,11,10,13,12,14][i],
              }))}
              color={D.cyan}
              height={140}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Top Performers" subtitle="Highest revenue generated this month" />
            <DataTable
              accentCol="revenue"
              columns={[
                { key: "name",    label: "Partner" },
                { key: "tier",    label: "Tier" },
                { key: "jobs",    label: "Jobs",    align: "right" },
                { key: "revenue", label: "Revenue", align: "right" },
                { key: "rate",    label: "Conv %",  align: "right" },
              ]}
              rows={[
                { name: "Apex Roofing DFW",    tier: "Elite",  jobs: 14, revenue: "$4,368", rate: "41%" },
                { name: "DFW Plumbing Pro",    tier: "Elite",  jobs: 11, revenue: "$3,432", rate: "38%" },
                { name: "Texas HVAC Masters",  tier: "Pro",    jobs: 9,  revenue: "$2,808", rate: "35%" },
                { name: "Lone Star Electric",  tier: "Pro",    jobs: 8,  revenue: "$2,496", rate: "32%" },
                { name: "Premier Landscaping", tier: "Connect",  jobs: 6,  revenue: "$1,872", rate: "28%" },
              ]}
            />
          </DCard>
        </div>

        {/* ── Lead Source + Tier Upgrade Pipeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Lead Source Breakdown" subtitle="Where opportunities originate" />
            <div className="space-y-3">
              {[
                { source: "Job Photo AI",        count: 127, pct: 59, color: D.purple },
                { source: "TrustyPro Homeowners",count: 48,  pct: 22, color: D.green },
                { source: "Partner Referrals",   count: 24,  pct: 11, color: D.cyan },
                { source: "Direct Homeowner",    count: 15,  pct: 7,  color: D.amber },
              ].map(s => (
                <ProgressBar key={s.source} label={`${s.source} (${s.count})`} value={s.pct} color={s.color} />
              ))}
            </div>
          </DCard>

          <DCard>
            <SectionHeader title="Tier Upgrade Pipeline" subtitle="Partners ready for promotion" />
            <div className="space-y-3">
              {[
                { name: "Premier Landscaping", from: "Connect", to: "Pro",   score: 87, color: D.cyan },
                { name: "Frisco Handyman Co.", from: "Connect", to: "Pro",   score: 82, color: D.cyan },
                { name: "Texas HVAC Masters",  from: "Pro",   to: "Elite", score: 91, color: D.amber },
                { name: "Allen Roofing LLC",   from: "Pro",   to: "Elite", score: 88, color: D.amber },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between py-2.5 rounded-xl px-3" style={{ backgroundColor: D.surface }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: D.text }}>{p.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs" style={{ color: D.muted }}>{p.from}</span>
                      <ArrowRight className="w-3 h-3" style={{ color: p.color }} />
                      <span className="text-xs font-semibold" style={{ color: p.color }}>{p.to}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black" style={{ color: p.color }}>{p.score}</p>
                    <p className="text-[10px]" style={{ color: D.muted }}>Score</p>
                  </div>
                </div>
              ))}
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
