import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  TrendingUp, Users, ArrowDown, Clock, CheckCircle, Zap, BarChart2,
} from "lucide-react";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  purple: "#A855F7″,
  teal: "#14B8A6″,
  blue: "#3B82F6″,
};

const FUNNEL_STAGES = [
  { label: "Site Visit",    count: 12400, prev: null,  convRate: null,   color: D.blue },
  { label: "Email Capture", count: 2840,  prev: 12400, convRate: 22.9,   color: D.purple },
  { label: "Waitlist",      count: 1247,  prev: 2840,  convRate: 43.9,   color: D.cyan },
  { label: "Applied",       count: 412,   prev: 1247,  convRate: 33.0,   color: D.teal },
  { label: "Approved",      count: 287,   prev: 412,   convRate: 69.7,   color: D.green },
  { label: "Onboarded",     count: 198,   prev: 287,   convRate: 69.0,   color: "#84CC16″ },
  { label: "First Job",     count: 167,   prev: 198,   convRate: 84.3,   color: D.amber },
  { label: "Active 90d",    count: 147,   prev: 167,   convRate: 88.0,   color: D.green },
];

const COHORT_DATA = [
  { stage: "Applied", jan: 100, feb: 100, mar: 100, apr: 100 },
  { stage: "Approved", jan: 72, feb: 68, mar: 74, apr: 71 },
  { stage: "Onboarded", jan: 49, feb: 45, mar: 53, apr: 50 },
  { stage: "First Job", jan: 42, feb: 38, mar: 46, apr: 44 },
  { stage: "Active 90d", jan: 37, feb: 32, mar: 41, apr: 39 },
];

const DROPOFF_INSIGHTS = [
  {
    from: "Site Visit → Email",
    dropPct: 77.1,
    reason: "No clear value prop above the fold",
    action: "Redesigned hero section with income calculator",
    lift: "+4.2% capture",
  },
  {
    from: "Email → Waitlist",
    dropPct: 56.1,
    reason: "Long confirmation form, 12 fields",
    action: "Reduced to 4 required fields, moved extras to onboarding",
    lift: "+8.7% completion",
  },
  {
    from: "Waitlist → Applied",
    dropPct: 67.0,
    reason: "Unclear application expectations",
    action: "Added progress indicator and estimated completion time",
    lift: "+5.1% conversion",
  },
  {
    from: "Applied → Approved",
    dropPct: 30.3,
    reason: "Missing trade verification documents",
    action: "DocuSign prompt sent at 24h if docs missing",
    lift: "+3.8% approval",
  },
  {
    from: "Approved → Onboarded",
    dropPct: 31.0,
    reason: "No nudge after approval email",
    action: "3-touch onboarding sequence with video walkthroughs",
    lift: "+6.2% onboarding",
  },
];

const CHANNEL_DATA = [
  { name: "Organic Search", value: 44, color: D.green },
  { name: "Partner Referral", value: 28, color: D.cyan },
  { name: "Direct", value: 18, color: D.purple },
  { name: "Paid", value: 10, color: D.amber },
];

const AB_TESTS = [
  {
    test: "CTA Button: 'Join Waitlist' vs 'Start Earning'",
    winner: "'Start Earning'",
    lift: "+18.3% CTR",
    deployed: "Feb 2026″,
    color: D.green,
  },
  {
    test: "Email subject: name personalization",
    winner: "Personalized subject lines",
    lift: "+11.4% open rate",
    deployed: "Mar 2026″,
    color: D.cyan,
  },
  {
    test: "Application flow: single page vs multi-step",
    winner: "Multi-step with progress bar",
    lift: "+9.1% completion",
    deployed: "Apr 2026″,
    color: D.purple,
  },
];

const FONT = "'Inter', system-ui, sans-serif";

export default function FunnelAnalyticsDashboard() {
  const [activeDropoff, setActiveDropoff] = useState<number | null>(null);
  const maxCount = FUNNEL_STAGES[0].count;

  return (
    <AdminLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "28px 24px", fontFamily: FONT, color: D.text }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: D.cyan + "22″, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 style={{ width: 18, height: 18, color: D.cyan }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: D.text, margin: 0 }}>Funnel Analytics</h1>
              <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>Every step from visitor to active partner</p>
            </div>
          </div>
        </div>

        {/* Waterfall funnel */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "22px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <TrendingUp style={{ width: 15, height: 15, color: D.cyan }} />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>Full Funnel Waterfall</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FUNNEL_STAGES.map((stage, i) => {
              const barPct = (stage.count / maxCount) * 100;
              return (
                <div key={stage.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <div style={{ width: 110, fontSize: 12, color: D.muted, textAlign: "right", flexShrink: 0 }}>{stage.label}</div>
                    <div style={{ flex: 1, background: D.border, borderRadius: 6, height: 26, overflow: "hidden" }}>
                      <div style={{
                        width: `${barPct}%`,
                        height: "100%",
                        background: stage.color,
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 10,
                        transition: "width 0.4s ease",
                        minWidth: 60,
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#000″ }}>{stage.count.toLocaleString()}</span>
                      </div>
                    </div>
                    {stage.convRate !== null && (
                      <div style={{ width: 72, flexShrink: 0, textAlign: "right" }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: stage.convRate >= 70 ? D.green : stage.convRate >= 50 ? D.amber : D.red,
                        }}>{stage.convRate}% conv.</span>
                      </div>
                    )}
                  </div>
                  {i < FUNNEL_STAGES.length - 1 && (
                    <div style={{ display: "flex", paddingLeft: 122, marginBottom: 2 }}>
                      <ArrowDown style={{ width: 12, height: 12, color: D.dim }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Cohort comparison */}
          <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Users style={{ width: 15, height: 15, color: D.purple }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>Monthly Cohort Progression</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={COHORT_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3″ stroke={D.border} />
                <XAxis dataKey="stage" tick={{ fill: D.muted, fontSize: 10 }} />
                <YAxis tick={{ fill: D.muted, fontSize: 10 }} unit="%" />
                <Tooltip
                  contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }}
                  labelStyle={{ color: D.text }}
                  itemStyle={{ color: D.muted }}
                />
                <Line type="monotone" dataKey="jan" stroke={D.cyan} strokeWidth={2} dot={false} name="Jan '26″ />
                <Line type="monotone" dataKey="feb" stroke={D.purple} strokeWidth={2} dot={false} name="Feb '26″ />
                <Line type="monotone" dataKey="mar" stroke={D.green} strokeWidth={2} dot={false} name="Mar '26″ />
                <Line type="monotone" dataKey="apr" stroke={D.amber} strokeWidth={2} dot={false} name="Apr '26″ />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
              {[["Jan '26″, D.cyan], ["Feb '26″, D.purple], ["Mar '26", D.green], ["Apr '26″, D.amber]].map(([label, color]) => (
                <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 2, borderRadius: 2, background: color as string }} />
                  <span style={{ fontSize: 11, color: D.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel attribution */}
          <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Zap style={{ width: 15, height: 15, color: D.amber }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>Channel Attribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={CHANNEL_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {CHANNEL_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }}
                  itemStyle={{ color: D.text }}
                  formatter={(v: number) => `${v}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {CHANNEL_DATA.map(c => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color }} />
                    <span style={{ fontSize: 12, color: D.muted }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drop-off deep dive */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <ArrowDown style={{ width: 15, height: 15, color: D.red }} />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>Drop-off Deep Dive</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DROPOFF_INSIGHTS.map((d, i) => (
              <div
                key={d.from}
                onClick={() => setActiveDropoff(activeDropoff === i ? null : i)}
                style={{
                  background: activeDropoff === i ? D.red + "10″ : D.surface,
                  border: `1px solid ${activeDropoff === i ? D.red + "44" : D.border}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{d.from}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: D.red + "22″, color: D.red }}>
                      -{d.dropPct}% drop
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: D.green }}>{d.lift}</span>
                </div>
                {activeDropoff === i && (
                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ background: D.red + "12″, borderRadius: 8, padding: "10px 12px" }}>
                      <p style={{ fontSize: 10, color: D.red, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px", fontWeight: 700 }}>Root Cause</p>
                      <p style={{ fontSize: 12, color: D.muted, margin: 0 }}>{d.reason}</p>
                    </div>
                    <div style={{ background: D.green + "12″, borderRadius: 8, padding: "10px 12px" }}>
                      <p style={{ fontSize: 10, color: D.green, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px", fontWeight: 700 }}>Action Taken</p>
                      <p style={{ fontSize: 12, color: D.muted, margin: 0 }}>{d.action}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 8 }}>
          {/* Time to conversion */}
          <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Clock style={{ width: 15, height: 15, color: D.teal }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>Time to Conversion</h2>
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: D.cyan }}>6.2</div>
              <div style={{ fontSize: 13, color: D.muted }}>avg days: application → first active job</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: D.green + "18″, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: D.green, margin: 0 }}>1</p>
                <p style={{ fontSize: 11, color: D.muted, margin: "4px 0 0″ }}>Best case (days)</p>
              </div>
              <div style={{ background: D.red + "18″, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: D.red, margin: 0 }}>47</p>
                <p style={{ fontSize: 11, color: D.muted, margin: "4px 0 0″ }}>Worst case (days)</p>
              </div>
            </div>
          </div>

          {/* A/B tests */}
          <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <CheckCircle style={{ width: 15, height: 15, color: D.green }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>A/B Test Impact</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {AB_TESTS.map(test => (
                <div key={test.test} style={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <p style={{ fontSize: 12, color: D.text, margin: 0, fontWeight: 600, lineHeight: 1.4 }}>{test.test}</p>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: test.color,
                      whiteSpace: "nowrap",
                      background: test.color + "22″,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}>{test.lift}</span>
                  </div>
                  <p style={{ fontSize: 11, color: D.muted, margin: 0 }}>Winner: <span style={{ color: test.color }}>{test.winner}</span> — {test.deployed}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
