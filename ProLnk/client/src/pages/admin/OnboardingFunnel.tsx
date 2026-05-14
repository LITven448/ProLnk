import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DataTable, BarChart, DCard } from "@/components/DashboardShared";
import { Users, TrendingDown, Clock, Zap } from "lucide-react";

const FUNNEL_STAGES = [
  { label: "Visited",   count: 2840, color: D.cyan },
  { label: "Applied",   count: 412,  color: D.blue },
  { label: "Approved",  count: 287,  color: D.purple },
  { label: "Onboarded", count: 198,  color: D.amber },
  { label: "Active",    count: 147,  color: D.green },
];

const DROP_OFF = [
  { from: "Visited → Applied",   lost: 2428, pct: "85.5%", reason: "No follow-through after page view",   fix: "Retarget" },
  { from: "Applied → Approved",  lost: 125,  pct: "30.3%", reason: "Missing insurance doc",               fix: "Remind" },
  { from: "Approved → Onboarded",lost: 89,   pct: "31.0%", reason: "Didn't complete profile",             fix: "Prompt" },
  { from: "Onboarded → Active",  lost: 51,   pct: "25.8%", reason: "No job claimed within 14 days",       fix: "Coach" },
];

const COHORT_CHART = [
  { label: "Dec", value: 18 },
  { label: "Jan", value: 22 },
  { label: "Feb", value: 19 },
  { label: "Mar", value: 14 },
  { label: "Apr", value: 11 },
  { label: "May", value: 9 },
];

const STUCK = [
  { name: "Marcus T.", days: 21, stage: "Approved",  email: "marcus.t@email.com" },
  { name: "Renée H.",  days: 18, stage: "Onboarded", email: "renee.h@email.com" },
  { name: "Dev P.",    days: 14, stage: "Applied",   email: "dev.p@email.com" },
  { name: "Sam W.",    days: 12, stage: "Approved",  email: "sam.w@email.com" },
  { name: "Aiko L.",   days: 8,  stage: "Onboarded", email: "aiko.l@email.com" },
];

export default function OnboardingFunnel() {
  const maxCount = FUNNEL_STAGES[0].count;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div>
          <h1 className="text-2xl font-black" style={{ color: D.text }}>Onboarding Funnel</h1>
          <p className="text-sm mt-1" style={{ color: D.muted }}>Partner application-to-active conversion analytics</p>
        </div>

        {/* Conversion rate cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Overall Conversion" value="5.2%" sub="Visited → Active" trend={8} color={D.green} icon={<TrendingDown className="w-4 h-4" />} />
          <MetricCard label="Apply → Approve"    value="69.7%" sub="287 of 412"       trend={3} color={D.cyan}  icon={<Users className="w-4 h-4" />} />
          <MetricCard label="Approve → Onboard"  value="69.0%" sub="198 of 287"       trend={-2} color={D.amber} icon={<Clock className="w-4 h-4" />} />
          <MetricCard label="Onboard → Active"   value="74.2%" sub="147 of 198"       trend={5} color={D.purple} icon={<Zap className="w-4 h-4" />} />
        </div>

        {/* Funnel visualization */}
        <DCard>
          <SectionHeader title="Funnel Stages" subtitle="Count and drop-off at each stage" />
          <div className="flex flex-col gap-3">
            {FUNNEL_STAGES.map((stage, i) => {
              const widthPct = (stage.count / maxCount) * 100;
              const dropPct = i === 0 ? null : (((FUNNEL_STAGES[i - 1].count - stage.count) / FUNNEL_STAGES[i - 1].count) * 100).toFixed(1);
              return (
                <div key={stage.label} className="flex items-center gap-4">
                  <div className="w-20 text-right text-xs font-semibold flex-shrink-0" style={{ color: D.muted }}>{stage.label}</div>
                  <div className="flex-1 relative h-9 rounded-lg overflow-hidden" style={{ backgroundColor: D.border }}>
                    <div
                      className="h-full rounded-lg flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${widthPct}%`, background: `linear-gradient(90deg, ${stage.color}50, ${stage.color})` }}
                    >
                      <span className="text-xs font-bold" style={{ color: D.bg }}>{stage.count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-20 flex-shrink-0 text-xs" style={{ color: dropPct ? D.red : D.muted }}>
                    {dropPct ? `▼ ${dropPct}%` : "100%"}
                  </div>
                </div>
              );
            })}
          </div>
        </DCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drop-off analysis */}
          <DCard>
            <SectionHeader title="Drop-off Analysis" subtitle="Where partners fall out and why" />
            <DataTable
              columns={[
                { key: "from",   label: "Transition" },
                { key: "lost",   label: "Lost",  align: "right" },
                { key: "pct",    label: "% Lost", align: "right" },
                { key: "reason", label: "Top Reason" },
                { key: "action", label: "",      align: "center" },
              ]}
              rows={DROP_OFF.map(row => ({
                from:   row.from,
                lost:   row.lost.toLocaleString(),
                pct:    <span style={{ color: D.red, fontWeight: 600 }}>{row.pct}</span>,
                reason: <span style={{ color: D.muted, fontSize: 12 }}>{row.reason}</span>,
                action: (
                  <button
                    className="px-2 py-1 rounded-md text-xs font-semibold transition-colors"
                    style={{ backgroundColor: `${D.cyan}20`, color: D.cyan, border: `1px solid ${D.cyan}40` }}
                  >
                    {row.fix}
                  </button>
                ),
              }))}
            />
          </DCard>

          {/* Time-to-convert bar chart */}
          <DCard>
            <SectionHeader title="Time-to-Convert" subtitle="Avg days from application to first active job" />
            <BarChart data={COHORT_CHART} color={D.purple} height={160} />
          </DCard>
        </div>

        {/* Stuck applications */}
        <DCard>
          <SectionHeader title="Stuck Applications" subtitle="Partners stalled >7 days — needs nudge" />
          <div className="space-y-2">
            {STUCK.map((app, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: `${D.amber}20`, color: D.amber }}
                  >
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: D.text }}>{app.name}</p>
                    <p className="text-xs" style={{ color: D.muted }}>{app.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs" style={{ color: D.muted }}>Stage</p>
                    <p className="text-sm font-semibold" style={{ color: D.cyan }}>{app.stage}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: D.muted }}>Days Stuck</p>
                    <p className="text-sm font-bold" style={{ color: app.days > 14 ? D.red : D.amber }}>{app.days}d</p>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    style={{ backgroundColor: `${D.green}20`, color: D.green, border: `1px solid ${D.green}40` }}
                  >
                    Nudge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
