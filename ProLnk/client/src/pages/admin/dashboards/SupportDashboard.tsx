import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  HeadphonesIcon, Star, AlertTriangle, CheckCircle, Clock,
  MessageSquare, ThumbsUp, Users, Home, Shield,
} from "lucide-react";

export default function SupportDashboard() {
  return (
    <AdminLayout title="Support Dashboard" subtitle="Partner support, disputes, homeowner CRM, and satisfaction">
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
          <MetricCard label="Open Tickets" value="7" sub="Avg resolution: 4.2 hrs" trend={-18.2} color={D.amber} icon={<MessageSquare className="w-4 h-4" />} sparkline={[14,12,11,9,8,10,7,7]} />
          <MetricCard label="Partner Satisfaction" value="4.7 / 5" sub="Based on 89 ratings" trend={3.1} color={D.green} icon={<Star className="w-4 h-4" />} />
          <MetricCard label="Open Disputes" value="2" sub="Commission disputes" trend={-33.3} color={D.red} icon={<AlertTriangle className="w-4 h-4" />} />
          <MetricCard label="Homeowner NPS" value="72" sub="Net Promoter Score" trend={8.2} color={D.cyan} icon={<ThumbsUp className="w-4 h-4" />} />
        </div>

        {/* ── Ticket Volume + Category Mix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DCard className="lg:col-span-2">
            <SectionHeader title="Support Ticket Volume" subtitle="Tickets per week (last 12 weeks)" />
            <BarChart
              data={[1,2,3,4,5,6,7,8,9,10,11,12].map((w, i) => ({
                label: `W${w}`, value: [14,12,11,9,8,10,7,9,6,8,7,7][i],
              }))}
              color={D.amber}
              height={140}
            />
          </DCard>
          <DCard>
            <SectionHeader title="Ticket Categories" subtitle="By type" />
            <DonutChart
              size={110}
              segments={[
                { label: "Commission",  value: 12, color: D.amber },
                { label: "Onboarding", value: 9,  color: D.cyan },
                { label: "Tech Issues",value: 8,  color: D.red },
                { label: "Lead Quality",value: 6, color: D.purple },
                { label: "Other",      value: 4,  color: D.dim },
              ]}
            />
          </DCard>
        </div>

        {/* ── Open Tickets + Disputes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Open Tickets" subtitle="Requiring attention" />
            <DataTable
              accentCol="partner"
              columns={[
                { key: "partner",  label: "Partner" },
                { key: "issue",    label: "Issue" },
                { key: "priority", label: "Priority" },
                { key: "age",      label: "Age",     align: "right" },
              ]}
              rows={[
                { partner: "DFW Plumbing Pro",    issue: "Commission discrepancy",  priority: <StatusBadge status="error" />,   age: "6h" },
                { partner: "Frisco Handyman",     issue: "Lead quality complaint",  priority: <StatusBadge status="warning" />, age: "4h" },
                { partner: "Allen Roofing LLC",   issue: "Onboarding — stuck",      priority: <StatusBadge status="warning" />, age: "2h" },
                { partner: "TX HVAC Masters",     issue: "App login issue",         priority: <StatusBadge status="pending" />, age: "1h" },
                { partner: "Premier Landscaping", issue: "Payout not received",     priority: <StatusBadge status="error" />,   age: "8h" },
                { partner: "Lone Star Electric",  issue: "Coverage zone question",  priority: <StatusBadge status="pending" />, age: "30m" },
                { partner: "Apex Roofing DFW",    issue: "Tier upgrade inquiry",    priority: <StatusBadge status="active" />,  age: "15m" },
              ]}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Commission Disputes" subtitle="Active dispute resolution" />
            <div className="space-y-3">
              {[
                {
                  partner: "DFW Plumbing Pro",
                  amount: "$285",
                  reason: "Job #4809 — homeowner disputed completion",
                  status: "Under Review",
                  color: D.amber,
                },
                {
                  partner: "Premier Landscaping",
                  amount: "$156",
                  reason: "Job #4801 — commission rate discrepancy",
                  status: "Pending Info",
                  color: D.red,
                },
              ].map(d => (
                <div key={d.partner} className="p-4 rounded-xl" style={{ backgroundColor: D.surface, border: `1px solid ${d.color}30` }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold" style={{ color: D.text }}>{d.partner}</p>
                    <span className="text-sm font-black" style={{ color: d.color }}>{d.amount}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: D.muted }}>{d.reason}</p>
                  <StatusBadge status="warning" />
                </div>
              ))}
              <div className="p-4 rounded-xl text-center" style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
                <CheckCircle className="w-6 h-6 mx-auto mb-1" style={{ color: D.green }} />
                <p className="text-xs" style={{ color: D.muted }}>No other open disputes</p>
              </div>
            </div>
          </DCard>
        </div>

        {/* ── Homeowner CRM + Satisfaction ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Homeowner CRM" subtitle="Recent homeowner interactions" />
            <DataTable
              accentCol="homeowner"
              columns={[
                { key: "homeowner", label: "Homeowner" },
                { key: "zip",       label: "ZIP" },
                { key: "status",    label: "Status" },
                { key: "lastAction",label: "Last Action" },
              ]}
              rows={[
                { homeowner: "Sarah M.",    zip: "75034", status: <StatusBadge status="active" />,  lastAction: "Scan uploaded" },
                { homeowner: "James K.",    zip: "75013", status: <StatusBadge status="pending" />, lastAction: "Awaiting match" },
                { homeowner: "Lisa T.",     zip: "75035", status: <StatusBadge status="success" />, lastAction: "Pro hired" },
                { homeowner: "Robert H.",   zip: "75024", status: <StatusBadge status="active" />,  lastAction: "Waitlisted" },
                { homeowner: "Amanda C.",   zip: "75034", status: <StatusBadge status="success" />, lastAction: "Review submitted" },
                { homeowner: "David W.",    zip: "75070", status: <StatusBadge status="pending" />, lastAction: "Signed up" },
              ]}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Partner Satisfaction" subtitle="Ratings by tier" />
            <div className="space-y-4">
              {[
                { tier: "Elite",  rating: 4.9, reviews: 18, color: D.amber },
                { tier: "Pro",    rating: 4.7, reviews: 47, color: D.cyan },
                { tier: "Connect",  rating: 4.4, reviews: 24, color: D.muted },
              ].map(t => (
                <div key={t.tier} className="p-3 rounded-xl" style={{ backgroundColor: D.surface }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold" style={{ color: D.text }}>{t.tier} Partners</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{ color: t.color, fill: t.color }} />
                      <span className="text-sm font-black" style={{ color: t.color }}>{t.rating}</span>
                      <span className="text-xs" style={{ color: D.muted }}>({t.reviews})</span>
                    </div>
                  </div>
                  <ProgressBar value={t.rating} max={5} color={t.color} showPct={false} />
                </div>
              ))}
              <div className="p-3 rounded-xl" style={{ backgroundColor: D.surface }}>
                <SectionHeader title="Support Activity" />
                <ActivityItem time="11:30 AM" type="success" message="Ticket #T-047 resolved: commission discrepancy corrected for Apex Roofing" icon={<CheckCircle className="w-3.5 h-3.5" />} />
                <ActivityItem time="10:45 AM" type="warning" message="Dispute #D-012 escalated: DFW Plumbing — awaiting homeowner confirmation" icon={<AlertTriangle className="w-3.5 h-3.5" />} />
              </div>
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
