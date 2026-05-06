import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  Wrench, Clock, MapPin, CheckCircle, AlertTriangle, Zap,
  RefreshCw, Webhook, Activity, Users, Camera, TrendingUp,
} from "lucide-react";

export default function OperationsDashboard() {
  return (
    <AdminLayout title="Operations Dashboard" subtitle="Job pipeline, partner ops, integrations, and coverage">
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
          <MetricCard label="Jobs In Pipeline" value="47" sub="Active across all partners" trend={8.2} color={D.cyan} icon={<Wrench className="w-4 h-4" />} sparkline={[22,28,31,35,38,42,44,47]} />
          <MetricCard label="Avg Job Completion" value="3.2 days" sub="From lead to closed" trend={-5.1} color={D.green} icon={<Clock className="w-4 h-4" />} />
          <MetricCard label="ZIP Codes Covered" value="62 / 80" sub="DFW target coverage" trend={6.4} color={D.amber} icon={<MapPin className="w-4 h-4" />} sparkline={[41,44,48,52,55,58,60,62]} />
          <MetricCard label="Photos Processed" value="1,284" sub="This month via AI pipeline" trend={18.7} color={D.purple} icon={<Camera className="w-4 h-4" />} sparkline={[88,102,118,134,147,162,178,191]} />
        </div>

        {/* ── Job Pipeline + Coverage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Job Stage Funnel */}
          <DCard className="lg:col-span-2">
            <SectionHeader title="Job Stage Funnel" subtitle="Active jobs by stage" />
            <div className="space-y-3 mt-2">
              {[
                { stage: "Lead Detected",      count: 214, color: D.cyan,   pct: 100 },
                { stage: "Partner Matched",    count: 178, color: D.blue,   pct: 83 },
                { stage: "Partner Accepted",   count: 134, color: D.purple, pct: 63 },
                { stage: "Job Scheduled",      count: 98,  color: D.amber,  pct: 46 },
                { stage: "Job In Progress",    count: 47,  color: D.orange, pct: 22 },
                { stage: "Completed & Billed", count: 31,  color: D.green,  pct: 14 },
              ].map(s => (
                <div key={s.stage} className="flex items-center gap-3">
                  <span className="text-xs w-36 flex-shrink-0" style={{ color: D.muted }}>{s.stage}</span>
                  <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ backgroundColor: D.border }}>
                    <div
                      className="h-full rounded-lg flex items-center px-2 transition-all"
                      style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}60, ${s.color})` }}
                    >
                      <span className="text-xs font-bold text-white">{s.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DCard>

          {/* Coverage Breakdown */}
          <DCard>
            <SectionHeader title="Coverage Mix" subtitle="By service category" />
            <DonutChart
              size={110}
              segments={[
                { label: "Roofing",     value: 28, color: D.cyan },
                { label: "HVAC",        value: 22, color: D.green },
                { label: "Plumbing",    value: 18, color: D.amber },
                { label: "Electrical",  value: 14, color: D.purple },
                { label: "Landscaping", value: 10, color: D.teal },
                { label: "Other",       value: 8,  color: D.dim },
              ]}
            />
          </DCard>
        </div>

        {/* ── Integration Health + Active Jobs Table ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Integration Health */}
          <DCard>
            <SectionHeader title="Integration Health" subtitle="Connected systems status" />
            <div className="space-y-2">
              {[
                { name: "n8n Automation",       status: "active",  lastSync: "2 min ago",  events: 847 },
                { name: "Resend Email",          status: "active",  lastSync: "1 min ago",  events: 231 },
                { name: "Stripe Payments",       status: "active",  lastSync: "5 min ago",  events: 28 },
                { name: "Photo AI (Vision API)", status: "active",  lastSync: "3 min ago",  events: 87 },
                { name: "Google Maps",           status: "active",  lastSync: "Live",        events: 412 },
                { name: "Service Titan",         status: "pending", lastSync: "Not synced", events: 0 },
                { name: "Buildium",              status: "pending", lastSync: "Not synced", events: 0 },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.status === "active" ? D.green : D.amber }} />
                    <span className="text-sm" style={{ color: D.text }}>{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: D.dim }}>{s.lastSync}</span>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </DCard>

          {/* Active Jobs */}
          <DCard>
            <SectionHeader title="Active Jobs" subtitle="Currently in progress" />
            <DataTable
              accentCol="partner"
              columns={[
                { key: "partner",  label: "Partner" },
                { key: "category", label: "Category" },
                { key: "stage",    label: "Stage" },
                { key: "value",    label: "Value", align: "right" },
              ]}
              rows={[
                { partner: "Apex Roofing",    category: "Roofing",    stage: "In Progress", value: "$8,400" },
                { partner: "DFW Plumbing",    category: "Plumbing",   stage: "Scheduled",   value: "$2,100" },
                { partner: "TX HVAC Masters", category: "HVAC",       stage: "Accepted",    value: "$3,800" },
                { partner: "Lone Star Elec.", category: "Electrical", stage: "Scheduled",   value: "$1,600" },
                { partner: "Premier Landscape",category: "Landscape", stage: "In Progress", value: "$1,200" },
                { partner: "DFW Plumbing",    category: "Plumbing",   stage: "Accepted",    value: "$950" },
              ]}
            />
          </DCard>
        </div>

        {/* ── Weekly Job Volume + Ops Feed ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Weekly Job Volume" subtitle="Jobs completed per week (last 12 weeks)" />
            <BarChart
              data={[1,2,3,4,5,6,7,8,9,10,11,12].map((w, i) => ({
                label: `W${w}`, value: [8,11,9,14,12,16,13,18,15,21,19,24][i],
              }))}
              color={D.cyan}
              height={140}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Operations Feed" subtitle="Last 12 hours" />
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              <ActivityItem time="12:00 PM" type="success" message="Job #4821 completed: Apex Roofing — $8,400 billed, commission queued" icon={<CheckCircle className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:45 AM" type="info"    message="3 new jobs scheduled for tomorrow — HVAC, roofing, plumbing" icon={<Clock className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:30 AM" type="warning" message="Job #4818: Partner response delayed 2+ hours — auto-escalation triggered" icon={<AlertTriangle className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:00 AM" type="success" message="Photo pipeline: 12 photos processed, 9 opportunities detected" icon={<Camera className="w-3.5 h-3.5" />} />
              <ActivityItem time="10:30 AM" type="info"    message="Coverage expansion: ZIP 75013 added — 2 partners assigned" icon={<MapPin className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:45 AM"  type="success" message="n8n webhook: 47 automation events processed, 0 failures" icon={<Webhook className="w-3.5 h-3.5" />} />
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
