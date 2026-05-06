import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  TrendingUp, DollarSign, Users, Zap, Shield, Brain,
  Target, Globe, Award, AlertTriangle, CheckCircle, Clock,
} from "lucide-react";

const MONTHLY_REVENUE = [42, 58, 51, 67, 73, 89, 95, 88, 102, 118, 131, 147];
const PARTNER_GROWTH  = [12, 18, 22, 31, 38, 44, 52, 61, 70, 84, 97, 112];
const LEAD_FLOW       = [88, 102, 95, 118, 134, 121, 147, 162, 155, 178, 191, 214];

export default function ExecutiveDashboard() {
  return (
    <AdminLayout title="Executive Dashboard" subtitle="Platform-wide KPIs and strategic health">
      <div className="p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: D.bg, minHeight: "100%" }}>
        {/* Pre-Launch Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#00D4FF15", border: "1px solid #00D4FF33" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "#00D4FF" }} />
          <div>
            <span className="text-xs font-bold" style={{ color: "#00D4FF" }}>Pre-Launch Mode</span>
            <span className="text-xs ml-2" style={{ color: "#7B809A" }}>Data shown represents projections and targets. Live metrics will populate after launch.</span>
          </div>
        </div>

        {/* ── Top KPI Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Monthly Revenue"
            value="$147K"
            sub="Commissions + subscriptions"
            trend={12.4}
            color={D.green}
            sparkline={MONTHLY_REVENUE}
            icon={<DollarSign className="w-4 h-4" />}
          />
          <MetricCard
            label="Active Partners"
            value="112"
            sub="Verified + active this month"
            trend={15.5}
            color={D.cyan}
            sparkline={PARTNER_GROWTH}
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard
            label="Leads Generated"
            value="214"
            sub="AI-detected opportunities"
            trend={11.9}
            color={D.purple}
            sparkline={LEAD_FLOW}
            icon={<Brain className="w-4 h-4" />}
          />
          <MetricCard
            label="Homeowners Waitlisted"
            value="1,847"
            sub="TrustyPro + ProLnk combined"
            trend={22.1}
            color={D.amber}
            icon={<Shield className="w-4 h-4" />}
          />
        </div>

        {/* ── Second KPI Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Avg Commission / Job" value="$312" sub="Up from $284 last month" trend={9.9} color={D.teal} icon={<Award className="w-4 h-4" />} />
          <MetricCard label="Partner Retention" value="94.2%" sub="30-day active rate" trend={2.1} color={D.lime} icon={<CheckCircle className="w-4 h-4" />} />
          <MetricCard label="Lead → Job Conversion" value="31%" sub="Avg across all tiers" trend={-1.4} color={D.orange} icon={<Target className="w-4 h-4" />} />
          <MetricCard label="Platform Uptime" value="99.97%" sub="Last 30 days" trend={0} color={D.blue} icon={<Globe className="w-4 h-4" />} />
        </div>

        {/* ── Revenue + Partner Mix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Trend */}
          <DCard className="lg:col-span-2">
            <SectionHeader title="Revenue Trend" subtitle="Monthly commission + subscription revenue ($K)" />
            <BarChart
              data={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
                label: m, value: MONTHLY_REVENUE[i],
              }))}
              color={D.green}
              height={160}
            />
          </DCard>

          {/* Revenue Mix */}
          <DCard>
            <SectionHeader title="Revenue Mix" subtitle="By source" />
            <DonutChart
              size={110}
              segments={[
                { label: "Job Commissions",   value: 89, color: D.green },
                { label: "Subscriptions",     value: 34, color: D.cyan },
                { label: "Media / Ads",       value: 18, color: D.amber },
                { label: "TrustyPro Leads",   value: 6,  color: D.purple },
              ]}
            />
          </DCard>
        </div>

        {/* ── Strategic Goals + Top Partners ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Strategic Goals */}
          <DCard>
            <SectionHeader title="2025 Strategic Goals" subtitle="Progress to target" />
            <div className="space-y-4">
              {[
                { label: "Partner Network: 200 active",     value: 112, max: 200, color: D.cyan },
                { label: "Monthly Revenue: $300K",          value: 147, max: 300, color: D.green },
                { label: "Homeowner Waitlist: 5,000",       value: 1847, max: 5000, color: D.amber },
                { label: "TrustyPro Scans: 1,000",          value: 341, max: 1000, color: D.purple },
                { label: "DFW ZIP Coverage: 80%",           value: 62, max: 80, color: D.teal },
              ].map(g => (
                <ProgressBar key={g.label} label={g.label} value={g.value} max={g.max} color={g.color} />
              ))}
            </div>
          </DCard>

          {/* Top Partners */}
          <DCard>
            <SectionHeader title="Top Partners This Month" subtitle="By commission generated" />
            <DataTable
              accentCol="revenue"
              columns={[
                { key: "name",    label: "Partner" },
                { key: "tier",    label: "Tier" },
                { key: "jobs",    label: "Jobs",    align: "right" },
                { key: "revenue", label: "Revenue", align: "right" },
              ]}
              rows={[
                { name: "Apex Roofing DFW",    tier: "Elite",  jobs: 14, revenue: "$4,368" },
                { name: "DFW Plumbing Pro",    tier: "Elite",  jobs: 11, revenue: "$3,432" },
                { name: "Texas HVAC Masters",  tier: "Pro",    jobs: 9,  revenue: "$2,808" },
                { name: "Lone Star Electric",  tier: "Pro",    jobs: 8,  revenue: "$2,496" },
                { name: "Premier Landscaping", tier: "Connect",  jobs: 6,  revenue: "$1,872" },
              ]}
            />
          </DCard>
        </div>

        {/* ── Platform Health + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Platform Health */}
          <DCard>
            <SectionHeader title="Platform Health" subtitle="Real-time system status" />
            <div className="space-y-3">
              {[
                { name: "API Gateway",        status: "active",  latency: "42ms" },
                { name: "Photo AI Pipeline",  status: "active",  latency: "1.2s" },
                { name: "Lead Router",        status: "active",  latency: "88ms" },
                { name: "Comms (Resend)",     status: "active",  latency: "210ms" },
                { name: "Stripe Payments",    status: "active",  latency: "340ms" },
                { name: "Database (TiDB)",    status: "active",  latency: "18ms" },
                { name: "n8n Automation",     status: "active",  latency: "—" },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: s.status === "active" ? D.green : D.red }} />
                    <span className="text-sm" style={{ color: D.text }}>{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: D.muted }}>{s.latency}</span>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </DCard>

          {/* Recent Activity */}
          <DCard>
            <SectionHeader title="Recent Activity" subtitle="Last 24 hours across platform" />
            <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
              <ActivityItem time="12:02 PM" type="success" message="New Elite partner onboarded: Apex Roofing DFW — $412 first commission" icon={<Award className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:58 AM" type="info"    message="Photo AI detected 9 opportunities from 12 job photos — 3 HVAC, 4 roofing, 2 exterior" icon={<Brain className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:45 AM" type="warning" message="Storm Watch: Hail risk elevated for Frisco/Allen — 14 partners pre-alerted" icon={<AlertTriangle className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:30 AM" type="success" message="Payout batch processed: $2,140 to 6 partners via Stripe" icon={<DollarSign className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:15 AM" type="info"    message="TrustyPro: 4 new homeowner waitlist signups in ZIP 75034" icon={<Shield className="w-3.5 h-3.5" />} />
              <ActivityItem time="10:45 AM" type="success" message="Lead Router: 7 opportunities matched to verified partners — avg response 4.2 min" icon={<Zap className="w-3.5 h-3.5" />} />
              <ActivityItem time="10:30 AM" type="info"    message="Weekly partner digest queued: 112 active partners" icon={<Users className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:15 AM"  type="success" message="Post-storm surge: +34% roofing inquiries in 75035 — 8 leads routed" icon={<TrendingUp className="w-3.5 h-3.5" />} />
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
