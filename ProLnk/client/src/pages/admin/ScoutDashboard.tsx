import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart,
  DCard, ActivityItem, ProgressBar,
} from "@/components/DashboardShared";
import { Users, TrendingUp, Award, MapPin } from "lucide-react";

const SCOUTS = [
  { name: "Marcus Williams", zip: "75034″, week: 9, month: 34, earnings: "$612", tier: "Gold" },
  { name: "Janelle Torres",  zip: "75078″, week: 7, month: 28, earnings: "$504", tier: "Gold" },
  { name: "Devon Okafor",    zip: "75093″, week: 6, month: 21, earnings: "$378", tier: "Silver" },
  { name: "Priya Shah",      zip: "75056″, week: 5, month: 18, earnings: "$324", tier: "Silver" },
  { name: "Cody Brennan",    zip: "75035″, week: 5, month: 17, earnings: "$306", tier: "Silver" },
  { name: "Tamika Ross",     zip: "75024″, week: 4, month: 14, earnings: "$252", tier: "Bronze" },
  { name: "Luis Garza",      zip: "75070″, week: 3, month: 11, earnings: "$198", tier: "Bronze" },
  { name: "Amber Nguyen",    zip: "75007″, week: 3, month: 9,  earnings: "$162", tier: "Bronze" },
];

const TIER_COLORS: Record<string, string> = {
  Gold:   D.amber,
  Silver: D.muted,
  Bronze: D.orange,
};

const FUNNEL = [
  { label: "Visits",         value: 284, max: 284, color: D.cyan   },
  { label: "Conversations",  value: 147, max: 284, color: D.blue   },
  { label: "Signups",        value: 47,  max: 284, color: D.teal   },
  { label: "Verified",       value: 38,  max: 284, color: D.green  },
  { label: "Active",         value: 31,  max: 284, color: D.purple },
];

const DAILY = [
  { label: "Mon", value: 5 },
  { label: "Tue", value: 8 },
  { label: "Wed", value: 6 },
  { label: "Thu", value: 9 },
  { label: "Fri", value: 7 },
  { label: "Sat", value: 7 },
  { label: "Sun", value: 5 },
];

const ACTIVITY = [
  { time: "2h ago",   message: "Marcus W. signed up 3 pros in 75034″, type: "success" as const },
  { time: "4h ago",   message: "Janelle T. completed door-to-door run — 75078 (12 visits)", type: "info" as const },
  { time: "6h ago",   message: "Devon O. recruited first homeowner from job site at 75093″, type: "success" as const },
  { time: "Yesterday",message: "Priya S. hit Silver tier — bonus unlocked ($50)", type: "success" as const },
  { time: "Yesterday",message: "Cody B. flagged duplicate signup in 75035 — resolved", type: "warning" as const },
];

const ZONES = [
  { zip: "75034″, top: "12%",  left: "20%", color: `${D.cyan}55`,   label: "75034" },
  { zip: "75078″, top: "30%",  left: "55%", color: `${D.purple}55`, label: "75078" },
  { zip: "75093″, top: "55%",  left: "70%", color: `${D.amber}55`,  label: "75093" },
  { zip: "75056″, top: "65%",  left: "30%", color: `${D.teal}55`,   label: "75056" },
  { zip: "75035″, top: "40%",  left: "10%", color: `${D.blue}55`,   label: "75035" },
];

export default function ScoutDashboard() {
  const [_tab, setTab] = useState("leaderboard");

  const tableColumns = [
    { key: "name",     label: "Scout Name" },
    { key: "zip",      label: "Territory (ZIP)" },
    { key: "week",     label: "Signups (Wk)",  align: "right" as const },
    { key: "month",    label: "Signups (Mo)",  align: "right" as const },
    { key: "earnings", label: "Earnings",      align: "right" as const },
    { key: "tierBadge",label: "Tier",          align: "center" as const },
  ];

  const tableRows = SCOUTS.map(s => ({
    name:      s.name,
    zip:       s.zip,
    week:      s.week,
    month:     s.month,
    earnings:  s.earnings,
    tierBadge: (
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
        style={{ color: TIER_COLORS[s.tier], backgroundColor: `${TIER_COLORS[s.tier]}20` }}
      >
        {s.tier}
      </span>
    ),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6″ style={{ background: D.bg, minHeight: "100vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Scout Performance</h1>
            <p className="text-sm mt-1″ style={{ color: D.muted }}>Field agent leaderboard, territories, and conversion funnel</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          <MetricCard label="Active Scouts"    value="12″      sub="Across 8 ZIP territories"   color={D.cyan}   icon={<Users className="w-4 h-4" />}    trend={8}  />
          <MetricCard label="Signups This Wk"  value="47″      sub="Up from 39 last week"        color={D.green}  icon={<TrendingUp className="w-4 h-4" />} trend={20} />
          <MetricCard label="Avg Per Scout"    value="3.9/wk"  sub="Target is 4.5/wk"            color={D.amber}  icon={<MapPin className="w-4 h-4″ />}    trend={-3} />
          <MetricCard label="Top Scout Bonus"  value="$180″    sub="Marcus W. — this week"       color={D.purple} icon={<Award className="w-4 h-4" />}    trend={12} />
        </div>

        {/* Leaderboard */}
        <DCard>
          <SectionHeader title="Scout Leaderboard" subtitle="Ranked by signups this week" />
          <DataTable columns={tableColumns} rows={tableRows} accentCol="name" />
        </DCard>

        {/* Territory Map + Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>

          {/* Territory Map */}
          <DCard>
            <SectionHeader title="Territory Map" subtitle="Active coverage zones by ZIP" />
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                height: 220,
                background: "#0A0D14″,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {ZONES.map(z => (
                <div
                  key={z.zip}
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    top: z.top, left: z.left,
                    width: 64, height: 64,
                    backgroundColor: z.color,
                    border: `1px solid ${z.color.replace("55", "99")}`,
                    backdropFilter: "blur(4px)",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="text-[11px] font-bold" style={{ color: D.text }}>{z.label}</span>
                </div>
              ))}
              <div
                className="absolute bottom-2 right-3 text-[10px] font-semibold"
                style={{ color: D.dim }}
              >
                DFW Metro · 5 active zones
              </div>
            </div>
          </DCard>

          {/* Conversion Funnel */}
          <DCard>
            <SectionHeader title="Conversion Funnel" subtitle="This week — all scouts combined" />
            <div className="space-y-4 mt-2″>
              {FUNNEL.map(f => (
                <div key={f.label}>
                  <div className="flex justify-between mb-1″>
                    <span className="text-xs" style={{ color: D.muted }}>{f.label}</span>
                    <span className="text-xs font-semibold" style={{ color: D.text }}>{f.value.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={f.value} max={f.max} color={f.color} showPct={false} />
                </div>
              ))}
            </div>
          </DCard>
        </div>

        {/* Daily Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          <DCard>
            <SectionHeader title="Daily Signups" subtitle="Last 7 days across all scouts" />
            <BarChart data={DAILY} color={D.teal} height={140} />
          </DCard>

          <DCard>
            <SectionHeader title="Recent Activity" subtitle="Latest scout field reports" />
            <div>
              {ACTIVITY.map((a, i) => (
                <ActivityItem key={i} time={a.time} message={a.message} type={a.type} />
              ))}
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
