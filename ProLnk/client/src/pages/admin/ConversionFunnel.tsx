import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, DCard, MetricCard, SectionHeader, BarChart, DonutChart, StatusBadge } from "@/components/DashboardShared";
import { Filter, TrendingDown, ArrowRight, Beaker, Users } from "lucide-react";

const FUNNEL_STAGES = [
  { stage: "Visitor",   count: 18420, color: D.blue   },
  { stage: "Waitlist",  count: 4127,  color: D.cyan   },
  { stage: "Applied",   count: 1863,  color: D.teal   },
  { stage: "Approved",  count: 892,   color: D.green  },
  { stage: "Active",    count: 614,   color: D.lime   },
];

const DROPOFF = [
  { from: "Visitor → Waitlist",  entered: 18420, dropped: 14293, cr: 22.4, delta: 3.1  },
  { from: "Waitlist → Applied",  entered: 4127,  dropped: 2264,  cr: 45.1, delta: -1.8 },
  { from: "Applied → Approved",  entered: 1863,  dropped: 971,   cr: 47.9, delta: 5.4  },
  { from: "Approved → Active",   entered: 892,   dropped: 278,   cr: 68.8, delta: 2.2  },
];

const AB_TESTS = [
  {
    name: "Waitlist CTA Copy",
    variantA: { label: "Join Waitlist", cr: 19.2 },
    variantB: { label: "Claim Your Spot", cr: 23.8 },
    winner: "B",
    lift: 24,
    status: "Complete",
    n: "6,240 visitors",
  },
  {
    name: "Signup Form Length",
    variantA: { label: "5-field form", cr: 44.2 },
    variantB: { label: "3-field form", cr: 51.7 },
    winner: "B",
    lift: 17,
    status: "Complete",
    n: "3,812 waitlist",
  },
  {
    name: "Email Subject Line",
    variantA: { label: "Confirmation email", cr: 34.1 },
    variantB: { label: "Personalized subject", cr: 38.6 },
    winner: "B",
    lift: 13,
    status: "Running",
    n: "1,940 signups",
  },
];

const CHANNEL_DATA = [
  { label: "Organic Search", value: 38, color: D.cyan   },
  { label: "Direct",         value: 24, color: D.blue   },
  { label: "Referral",       value: 18, color: D.green  },
  { label: "Social",         value: 13, color: D.purple },
  { label: "Paid",           value: 7,  color: D.amber  },
];

export default function ConversionFunnel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxCount = FUNNEL_STAGES[0].count;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2" style={{ color: D.text }}>
              <Filter className="w-6 h-6" style={{ color: D.cyan }} />
              Conversion Funnel
            </h1>
            <p className="text-sm mt-1" style={{ color: D.muted }}>Visitor → Waitlist → Applied → Approved → Active</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: `${D.cyan}15`, color: D.cyan, border: `1px solid ${D.cyan}30` }}>
            <Users className="w-3.5 h-3.5" />
            Live Data · May 2026
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Visitors"    value="18,420"  sub="Last 30 days" trend={14}  color={D.blue}  icon={<Users className="w-4 h-4" />} sparkline={[12,14,15,16,17,18]} />
          <MetricCard label="Waitlist Signups"  value="4,127"   sub="22.4% CVR"    trend={8}   color={D.cyan}  icon={<Filter className="w-4 h-4" />} />
          <MetricCard label="Active Partners"   value="614"     sub="68.8% close"  trend={22}  color={D.green} icon={<TrendingDown className="w-4 h-4" />} />
          <MetricCard label="Overall CVR"       value="3.3%"    sub="Visitor→Active" trend={5}  color={D.lime}  icon={<ArrowRight className="w-4 h-4" />} />
        </div>

        {/* Funnel visualization */}
        <DCard>
          <SectionHeader title="Funnel Stages" subtitle="Count and width proportional to stage volume" />
          <div className="space-y-3 mt-4">
            {FUNNEL_STAGES.map((s, i) => {
              const width = (s.count / maxCount) * 100;
              const prevCount = i > 0 ? FUNNEL_STAGES[i - 1].count : s.count;
              const dropPct = i > 0 ? (((prevCount - s.count) / prevCount) * 100).toFixed(1) : null;
              const isHovered = hovered === i;
              return (
                <div key={s.stage}>
                  {i > 0 && (
                    <div className="flex items-center gap-2 py-1 px-2" style={{ color: D.red }}>
                      <TrendingDown className="w-3 h-3" />
                      <span className="text-xs font-semibold">−{dropPct}% drop-off ({(prevCount - s.count).toLocaleString()} lost)</span>
                    </div>
                  )}
                  <div
                    className="cursor-pointer rounded-xl transition-all"
                    style={{
                      width: `${Math.max(width, 20)}%`,
                      minWidth: 120,
                      backgroundColor: isHovered ? `${s.color}30` : `${s.color}18`,
                      border: `1px solid ${isHovered ? s.color + "80" : s.color + "30"}`,
                      padding: "12px 16px",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.stage}</span>
                      <span className="text-lg font-black" style={{ color: D.text }}>{(s.count ?? 0).toLocaleString()}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full" style={{ backgroundColor: `${s.color}20` }}>
                      <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: s.color, opacity: 0.6 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drop-off table */}
          <DCard>
            <SectionHeader title="Drop-off Analysis" subtitle="Conversion rate by transition step" />
            <div className="mt-3 overflow-x-auto rounded-xl" style={{ border: `1px solid ${D.border}` }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: D.surface }}>
                    {["Transition", "Entered", "Dropped", "CR%", "Δ30d"].map((h, i) => (
                      <th key={i} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-left" style={{ color: D.muted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DROPOFF.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < DROPOFF.length - 1 ? `1px solid ${D.border}` : "none", backgroundColor: i % 2 === 0 ? D.card : D.surface }}>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: D.text }}>{row.from}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: D.muted }}>{(row.entered ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: D.red }}>{(row.dropped ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs font-bold" style={{ color: D.green }}>{row.cr}%</td>
                      <td className="px-4 py-3 text-xs font-semibold" style={{ color: row.delta >= 0 ? D.green : D.red }}>
                        {row.delta >= 0 ? "+" : ""}{row.delta}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DCard>

          {/* Channel attribution donut */}
          <DCard>
            <SectionHeader title="Channel Attribution" subtitle="Waitlist signups by traffic source" />
            <DonutChart data={CHANNEL_DATA} size={160} />
            <div className="mt-3 space-y-2">
              {CHANNEL_DATA.map(ch => (
                <div key={ch.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span style={{ color: D.muted }}>{ch.label}</span>
                  </div>
                  <span className="font-bold" style={{ color: D.text }}>{ch.value}%</span>
                </div>
              ))}
            </div>
          </DCard>
        </div>

        {/* A/B Tests */}
        <DCard>
          <SectionHeader title="A/B Test Results" subtitle="Last 3 experiments — conversion rate lift" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {AB_TESTS.map(test => (
              <div key={test.name} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Beaker className="w-4 h-4" style={{ color: D.purple }} />
                    <span className="text-sm font-bold" style={{ color: D.text }}>{test.name}</span>
                  </div>
                  <StatusBadge status={test.status === "Complete" ? "success" : "pending"} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[test.variantA, test.variantB].map((v, vi) => {
                    const isWinner = (vi === 0 ? "A" : "B") === test.winner;
                    return (
                      <div key={vi} className="rounded-lg p-3" style={{ backgroundColor: isWinner ? `${D.green}15` : D.card, border: `1px solid ${isWinner ? D.green + "40" : D.border}` }}>
                        <div className="text-xs font-bold mb-1" style={{ color: isWinner ? D.green : D.muted }}>Variant {vi === 0 ? "A" : "B"} {isWinner ? "✓" : ""}</div>
                        <div className="text-xs" style={{ color: D.dim }}>{v.label}</div>
                        <div className="text-lg font-black mt-1" style={{ color: isWinner ? D.green : D.text }}>{v.cr}%</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: D.muted }}>{test.n}</span>
                  <span className="font-bold" style={{ color: D.lime }}>+{test.lift}% lift</span>
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
